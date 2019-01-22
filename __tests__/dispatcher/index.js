import Dispatcher from 'dispatcher/index';
import ChimeePlugin from 'dispatcher/plugin';
import { chimeeLog } from 'chimee-helper-log';
describe('dispatcher', () => {
  const normalInstall = {
    name: 'normal install',
    level: 1,
  };
  class NormalFunctionInstall extends ChimeePlugin {
  }
  class GrandSon extends NormalFunctionInstall {
  }
  const outer = {
    name: 'outer',
    inner: false,
  };
  const lowInner = {
    name: 'low inner',
    level: -1,
  };
  const lowOuter = {
    name: 'low outer',
    level: -1,
    inner: false,
  };

  beforeEach(() => {
    chimeeLog.data.warn = [];
  });

  test('install', () => {
    expect(() => Dispatcher.install()).toThrow("plugin's config must be an Object");
    expect(() => Dispatcher.install({})).toThrow("plugin's config must be an Object");
    expect(() => Dispatcher.install({ name: '' })).toThrow('plugin must have a legal name');
    expect(() => Dispatcher.install({ name: 1 })).toThrow('plugin must have a legal name');
    expect(() => Dispatcher.install(class Illegal {})).toThrow("Your are trying to install plugin Illegal, but it's not extends from Chimee.plugin.");
    expect(Dispatcher.install(normalInstall)).toBe('normalInstall');
    expect(Dispatcher.install(NormalFunctionInstall)).toBe('normalFunctionInstall');
    expect(Dispatcher.install(GrandSon)).toBe('grandSon');
    Dispatcher.install(GrandSon);
    expect(chimeeLog.data.warn[0]).toEqual([ 'Dispatcher', 'You have installed GrandSon again. And the older one will be replaced' ]);
  });

  test('getPluginConfig', () => {
    expect(() => Dispatcher.getPluginConfig()).toThrow();
    expect(Dispatcher.getPluginConfig('normal install')).toEqual(Object.assign(normalInstall, { id: 'normalInstall' }));
    expect(Dispatcher.getPluginConfig('normal function install')).toBe(NormalFunctionInstall);
  });

  test('hasInstalled', () => {
    expect(Dispatcher.hasInstalled('GrandSon')).toBe(true);
    expect(Dispatcher.hasInstalled('GrandMother')).toBe(false);
  });

  test('uninstall', () => {
    Dispatcher.install((outer));
    expect(Dispatcher.hasInstalled('outer')).toBe(true);
    Dispatcher.uninstall('outer');
    expect(Dispatcher.hasInstalled('outer')).toBe(false);
  });

  describe('use & unuse', () => {
    let vm,
      dispatcher;
    beforeAll(() => {
      vm = {};
      dispatcher = new Dispatcher({
        wrapper: document.createElement('div'),
      }, vm);
    });

    test('use empty', () => {
      expect(() => dispatcher.use()).toThrow('pluginConfig do not match requirement');
    });

    test('use sth we have not installed', () => {
      expect(() => dispatcher.use('nothing')).toThrow('You have not installed plugin nothing');
    });

    test('use by string', () => {
      dispatcher.use({ name: 'normal install' });
      expect(dispatcher.plugins.normalInstall.id).toBe('normalInstall');
      expect(vm.normalInstall.id).toBe('normalInstall');
    });

    test('use by function', () => {
      dispatcher.use('normal function install');
      expect(dispatcher.plugins.normalFunctionInstall instanceof NormalFunctionInstall).toBe(true);
      expect(vm.normalFunctionInstall instanceof NormalFunctionInstall).toBe(true);
      expect(dispatcher.order).toEqual([ 'normalInstall', 'normalFunctionInstall' ]);
      expect(vm.normalInstall.$dom.style.zIndex).toBe('3');
      expect(vm.normalFunctionInstall.$dom.style.zIndex).toBe('2');
    });

    test('use with alias', () => {
      dispatcher.use({ name: 'normal install', alias: 'another' });
      expect(dispatcher.plugins.another.id).toBe('another');
      expect(vm.another.id).toBe('another');
    });

    test('unuse nothing', () => {
      expect(() => dispatcher.unuse()).toThrow("Plugin's name must be a string");
    });

    test('unuse sth we have not installed', () => {
      expect(() => dispatcher.unuse('nothing')).not.toThrow();
    });

    test('unuse by string on function', () => {
      dispatcher.unuse('normalFunctionInstall');
      expect(dispatcher.plugins.normalFunctionInstall).toBe();
      expect(vm.normalFunctionInstall).toBe();
    });

    test('unuse by strng on object', () => {
      dispatcher.unuse('normalInstall');
      expect(dispatcher.plugins.normalInstall).toBe();
      expect(vm.normalInstall).toBe();
    });

    test('$destroy called checked', () => {
      const fn = jest.fn();
      const dispatcherO = new Dispatcher({
        wrapper: document.createElement('div'),
      }, vm);
      dispatcherO.plugins.test = {
        $destroy: fn,
      };
      dispatcherO.unuse('test');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    afterAll(() => {
      dispatcher.destroy();
    });
  });

  test('initUserPlugin', () => {
    const dispatcher = new Dispatcher({
      wrapper: document.createElement('div'),
      autoload: false,
    }, {});
    dispatcher.initUserPlugin('not a array');
    expect(chimeeLog.data.warn[0]).toEqual([ 'Dispatcher', 'UserConfig.plugin can only by an Array, but not "not a array" in string' ]);
    dispatcher.destroy();
  });

  test('destroy', () => {
    const dispatcher = new Dispatcher({
      wrapper: document.createElement('div'),
    }, {});
    Dispatcher.install(NormalFunctionInstall);
    dispatcher.use('normal function install');
    // await dispatcher.ready;
    dispatcher.destroy();
  });

  test('constructor', () => {
    expect(() => new Dispatcher()).toThrow('UserConfig must be an Object');
  });

  test('sortZIndex', () => {
    Dispatcher.install(outer);
    Dispatcher.install(lowInner);
    Dispatcher.install(lowOuter);
    const dispatcher = new Dispatcher({
      wrapper: document.createElement('div'),
    }, {});
    dispatcher.use('outer');
    expect(dispatcher.plugins.outer.$dom.style.zIndex).toBe('2');
    dispatcher.use('low outer');
    expect(dispatcher.plugins.lowOuter.$dom.style.zIndex).toBe('1');
    expect(dispatcher.plugins.outer.$dom.style.zIndex).toBe('3');
    dispatcher.use('low inner');
    expect(dispatcher.plugins.lowOuter.$dom.style.zIndex).toBe('1');
    expect(dispatcher.plugins.lowInner.$dom.style.zIndex).toBe('1');
    expect(dispatcher.plugins.outer.$dom.style.zIndex).toBe('3');
    dispatcher.order.push('what');
    dispatcher.use('normal install');
  });

  describe('readySync & ready', () => {
    const asyncPlugin = {
      name: 'async',
      inited() {
        return Promise.resolve();
      },
    };

    Dispatcher.install(asyncPlugin);

    test('synchronous plugins', () => {
      const dispatcher = new Dispatcher({
        wrapper: document.createElement('div'),
        plugin: [],
      }, {});
      expect(dispatcher.readySync).toBe(true);
      dispatcher.destroy();
    });

    test('asynchronous plugins', async () => {
      const dispatcher = new Dispatcher({
        wrapper: document.createElement('div'),
        plugin: [ 'async', 'normalInstall' ],
      }, {});
      expect(dispatcher.readySync).toBe(false);
      await dispatcher.ready;
      expect(dispatcher.readySync).toBe(true);
      dispatcher.destroy();
    });

    test('support plugins too', () => {
      const dispatcher = new Dispatcher({
        wrapper: document.createElement('div'),
        plugins: [ 'normalInstall' ],
      }, {});
      expect(dispatcher.plugins.normalInstall.id).toBe('normalInstall');
    });
  });

  describe('getTopLevel', () => {
    test('when plugin is empty', () => {
      const dispatcher = new Dispatcher({
        wrapper: document.createElement('div'),
      }, {});
      expect(dispatcher.getTopLevel(true)).toBe(0);
      expect(dispatcher.getTopLevel(false)).toBe(0);
      dispatcher.destroy();
    });
  });

  test('throwError', () => {
    const fn = jest.fn();
    const error = new Error('123');
    const dispatcher = new Dispatcher({
      wrapper: document.createElement('div'),
    }, {
      throwError: fn,
    });
    dispatcher.throwError(error);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).lastCalledWith(error);
  });

});
