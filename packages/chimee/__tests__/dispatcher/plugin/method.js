import Plugin from 'dispatcher/plugin';
import Chimee from 'index';

describe("plugin's method", () => {
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

  test('if you do not pass in an object into methods, we just omit it.', () => {
    const plugin = new Plugin({
      id: 'm1',
      methods: [ 'what' ],
    }, dispatcher);
    plugin.$destroy();
  });

  test('normal function behavior', () => {
    const fn = jest.fn();
    const plugin = new Plugin({
      id: 'm2',
      methods: {
        a: fn,
        b: fn,
      },
    }, dispatcher);
    plugin.a();
    expect(fn).toHaveBeenCalledTimes(1);
    plugin.b();
    expect(fn).toHaveBeenCalledTimes(2);
    plugin.$destroy();
    plugin.a();
    expect(fn).toHaveBeenCalledTimes(3);
    plugin.b();
    expect(fn).toHaveBeenCalledTimes(4);
  });

  test('throw error when methods contain somethin is not a function', () => {
    expect(() => new Plugin({
      id: 'm3',
      methods: {
        a: 1,
      },
    }, dispatcher))
      .toThrow('plugins methods must be Function');
  });

  test('methods binding', () => {
    let plugin;
    const fn = function() {
      expect(this).toBe(plugin);
    };
    plugin = new Plugin({
      id: 'm',
      methods: {
        fn,
      },
    }, dispatcher);
    plugin.fn();
    const { fn: theFn } = plugin;
    theFn();
  });
});
