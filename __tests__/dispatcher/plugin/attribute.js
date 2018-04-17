import Plugin from 'dispatcher/plugin';
import Chimee from 'index';
import { bind } from 'chimee-helper';

describe("plugin's attributes", () => {
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

  test('penetrate', done => {
    const plugin = new Plugin({
      id: 'p',
      penetrate: true,
      events: {
        click() {
          done();
        },
      },
    }, dispatcher);
    dispatcher.order.unshift('p');
    dispatcher.plugins.p = plugin;
    plugin.$dom.click();
  });

  test('set operable to be true and change it', () => {
    const plugin = new Plugin({
      id: 'o',
      operable: false,
    }, dispatcher);
    expect(plugin.$operable).toBe(false);
    expect(plugin.$dom.style.pointerEvents).toBe('none');
    plugin.$operable = true;
    expect(plugin.$dom.style.pointerEvents).toBe('auto');
    expect(plugin.$operable).toBe(true);
    plugin.$operable = 3;
    expect(plugin.$dom.style.pointerEvents).toBe('auto');
    expect(plugin.$operable).toBe(true);
    plugin.$destroy();
  });

  test('use default operable', () => {
    const plugin = new Plugin({
      id: 'o',
    }, dispatcher, { operable: false });
    expect(plugin.$operable).toBe(false);
    expect(plugin.$dom.style.pointerEvents).toBe('none');
    plugin.$destroy();
  });

  describe('level', () => {
    let fn;
    beforeEach(() => {
      const originFn = dispatcher._sortZIndex;
      fn = jest.fn();
      dispatcher._sortZIndex = function(...args) {
        fn();
        bind(originFn, this)(...args);
      };
    });

    test('set level and change it', () => {
      const plugin = new Plugin({
        id: 'z',
        level: 1,
      }, dispatcher);
      expect(plugin.$level).toBe(1);
      expect(fn).toHaveBeenCalledTimes(0);
      plugin.$level = true;
      expect(plugin.$level).toBe(1);
      expect(fn).toHaveBeenCalledTimes(0);
      plugin.$level = 2;
      expect(plugin.$level).toBe(2);
      expect(fn).toHaveBeenCalledTimes(1);
      plugin.$destroy();
    });

    test('set the level by option', () => {
      const plugin = new Plugin({
        id: 'z',
      }, dispatcher, { level: 1 });
      expect(plugin.$level).toBe(1);
      expect(fn).toHaveBeenCalledTimes(0);
      plugin.$destroy();
    });
  });
});
