import Plugin from 'dispatcher/plugin';
import { Log } from 'chimee-helper';
import Chimee from 'index';

describe("plugin's lifecycle", () => {
  let dispatcher;
  let player;

  beforeEach(() => {
    player = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      isLive: false,
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: 'body',
      plugin: [],
      events: {},
    });

    dispatcher = player.__dispatcher;
  });

  afterEach(() => {
    player.destroy();
    dispatcher = null;
  });

  describe('consturctor', () => {
    test('illegal constructor', () => {
      expect(() => new Plugin()).toThrow('lack of dispatcher');
      expect(Log.data.error).toEqual([
        [ 'Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?' ],
      ]);
    });

    test('lack of id', () => {
      expect(() => new Plugin({}, dispatcher)).toThrow('id of PluginConfig must be string');
    });

    describe('class name support', () => {

      test('normal class name string', () => {
        const className = 'test-cls';
        const plugin = new Plugin({ id: 'a', className }, dispatcher);
        expect(plugin.$dom.className).toBe(className);
        plugin.$destroy();
      });

      test('multiple class name string', () => {
        const className = 'test-cls a b c';
        const plugin = new Plugin({ id: 'a', className }, dispatcher);
        expect(plugin.$dom.className).toBe(className);
        plugin.$destroy();
      });

      test('multiple class name array', () => {
        const className = [ 'test-cls', 'a', 'b', 'c' ];
        const plugin = new Plugin({ id: 'a', className }, dispatcher);
        expect(plugin.$dom.className).toBe('test-cls a b c');
        plugin.$destroy();
      });
    });

    test('base contructor check', () => {
      const plugin = new Plugin({ id: 'a' }, dispatcher);
      expect(plugin.$config).toEqual({ name: undefined });
      expect(plugin.$operable).toBe(true);
      expect(plugin.$dom.style.pointerEvents).toBe('auto');
      expect(plugin.$level).toBe(0);
      expect(plugin.$dom).toBe(dispatcher.dom.plugins.a);
      plugin.$destroy();
      expect(dispatcher.dom.plugins.a).toBe();
    });
  });

  describe('init', () => {

    test('do nothing', () => {
      const plugin = new Plugin({ id: 'i2' }, dispatcher);
      expect(plugin.$videoConfig).not.toBe();
      plugin.__init({});
      expect(plugin.$videoConfig).toEqual(dispatcher.videoConfig);
      plugin.$destroy();
    });

    test('change src by config pass in', () => {
      const plugin = new Plugin({
        id: 'i2',
        init(config) {
          config.src = 'i am a test';
        },
      }, dispatcher);
      plugin.__init(plugin.$videoConfig);
      expect(plugin.$videoConfig.src).toBe('i am a test');
      plugin.$destroy();
    });

    test('change src by this', () => {
      const plugin = new Plugin({
        id: 'i3',
        init() {
          this.src = 'i am a test';
        },
      }, dispatcher);
      plugin.__init({});
      expect(plugin.$videoConfig.src).toBe('i am a test');
      plugin.$destroy();
    });
  });

  test('create & destroy & inited', () => {
    const createAndDestroyCall = [];
    const plugin = new Plugin({
      id: 'cd',
      create() { createAndDestroyCall.push('create'); },
      destroy() { createAndDestroyCall.push('destroy'); },
      inited() { createAndDestroyCall.push('inited'); },
    }, dispatcher);
    expect(createAndDestroyCall).toEqual([ 'create' ]);
    plugin.__inited();
    expect(createAndDestroyCall).toEqual([ 'create', 'inited' ]);
    expect(plugin.ready).resolves.toBe();
    plugin.$destroy();
    expect(createAndDestroyCall).toEqual([ 'create', 'inited', 'destroy' ]);
  });
});
