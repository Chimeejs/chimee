import Chimee from 'index';
import { Log } from 'chimee-helper';

describe('Chimee static method', () => {
  const normalInstall = {
    name: 'normal install',
    level: 1,
  };
  class NormalFunctionInstall extends Chimee.plugin {
  }
  class GrandSon extends NormalFunctionInstall {
  }
  const outer = {
    name: 'outer',
    inner: false,
  };

  test('install', () => {
    expect(Chimee.install(normalInstall)).toBe('normalInstall');
    expect(Chimee.install(NormalFunctionInstall)).toBe('normalFunctionInstall');
    expect(Chimee.install(GrandSon)).toBe('grandSon');
    Chimee.install(GrandSon);
    expect(Log.data.warn[0]).toEqual([ 'Dispatcher', 'You have installed GrandSon again. And the older one will be replaced' ]);
  });

  test('getPluginConfig', () => {
    expect(() => Chimee.getPluginConfig()).toThrow();
    expect(Chimee.getPluginConfig('normal install')).toEqual(Object.assign(normalInstall, { id: 'normalInstall' }));
    expect(Chimee.getPluginConfig('normal function install')).toBe(NormalFunctionInstall);
  });

  test('hasInstalled', () => {
    expect(Chimee.hasInstalled('GrandSon')).toBe(true);
    expect(Chimee.hasInstalled('GrandMother')).toBe(false);
  });

  test('uninstall', () => {
    Chimee.install((outer));
    expect(Chimee.hasInstalled('outer')).toBe(true);
    Chimee.uninstall('outer');
    expect(Chimee.hasInstalled('outer')).toBe(false);
  });

  test('registerEvents', () => {
    expect(() => Chimee.registerEvents()).toThrow('The event name must be a string, but not undefined');
    expect(() => Chimee.registerEvents({ name: 'test' })).toThrow('The event target must be a string, but not undefined');
    expect(() => Chimee.registerEvents({ name: 'test', target: 'test' })).not.toThrow();
  });
});
