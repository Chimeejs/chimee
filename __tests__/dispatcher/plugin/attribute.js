import Plugin from 'dispatcher/plugin';
import Chimee from 'index';
import { bind, Log } from 'chimee-helper';

describe("plugin's attributes", () => {
  let dispatcher;
  let player;
  let originScrollTo;

  beforeAll(() => {
    originScrollTo = global.window.scrollTo;
    global.window.scrollTo = function() {};
  });

  afterAll(() => {
    global.window.scrollTo = originScrollTo;
  });

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
    test('$fullscreen', () => {
      const plugin = new Plugin({ id: 'normal' }, dispatcher);
      plugin.$fullscreen();
      plugin.$fullscreen(true);
      plugin.$fullscreen(false);
      plugin.$fullscreen();
      plugin.$fullscreen(false, 'container');
      plugin.$destroy();
    });

    test('fullscreen', () => {
      const plugin = new Plugin({ id: 'normal' }, dispatcher);
      plugin.fullscreen();
      plugin.fullscreen(true);
      plugin.fullscreen(false);
      plugin.fullscreen();
      plugin.fullscreen(false, 'container');
      plugin.$destroy();
    });

    describe('$attr & $css', () => {
      let plugin;

      beforeEach(() => {
        plugin = new Plugin({ id: 'normal' }, dispatcher);
      });

      afterEach(() => {
        plugin.$destroy();
      });

      test('$attr', () => {
        dispatcher.videoConfigReady = false;
        plugin.$attr('container', 'data-id', 1);
        expect(plugin.$attr('container', 'data-id')).toBe(null);
        dispatcher.dom.__dispatcher.videoConfigReady = true;
        plugin.$attr('data-id', '2');
        expect(plugin.$attr('data-id')).toBe('2');
      });

      test('$css', () => {
        expect(plugin.$css('container', 'z-index')).toBe('');
        plugin.$css('container', 'z-index', 10);
        expect(plugin.$css('container', 'z-index')).toBe('10');
      });

      test('$attr on video property', () => {
        dispatcher.videoConfigReady = false;
        plugin.$attr('video', 'controls', true);
        expect(plugin.$attr('video', 'controls')).toBe(null);
        expect(Log.data.warn[0]).toEqual([ 'chimee',
          'normal is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger' ]);
        dispatcher.videoConfigReady = true;
        plugin.$attr('video', 'controls', true);
        expect(plugin.$attr('video', 'controls')).toBe('');
      });

      test('$attr on video property but it is not in videoconfig', () => {
        dispatcher.videoConfigReady = false;
        plugin.$attr('video', 'data-controls', true);
        expect(plugin.$attr('video', 'data-controls')).toBe(null);
        dispatcher.videoConfigReady = true;
        dispatcher.dom.__dispatcher.videoConfigReady = true;
        plugin.__init(dispatcher.videoConfig);
        plugin.$attr('video', 'data-controls', true);
        expect(plugin.$attr('video', 'data-controls')).toBe('true');
      });
    });
  });

  test('$bump to top', () => {
    const level1 = {
      name: 'level1',
      level: 1,
    };
    const level2 = {
      name: 'level2',
      level: 2,
    };
    const level3 = {
      name: 'level3',
      level: 3,
    };
    const olevel1 = {
      name: 'olevel1',
      level: 1,
      inner: false,
    };
    const olevel2 = {
      name: 'olevel2',
      level: 2,
      inner: false,
    };
    const olevel3 = {
      name: 'olevel3',
      level: 3,
      inner: false,
    };
    Chimee.install(level1);
    Chimee.install(level2);
    Chimee.install(level3);
    Chimee.install(olevel1);
    Chimee.install(olevel2);
    Chimee.install(olevel3);
    dispatcher.use('level1');
    dispatcher.use('level2');
    dispatcher.use('level3');
    dispatcher.use('olevel1');
    dispatcher.use('olevel2');
    dispatcher.use('olevel3');
    expect(dispatcher._getTopLevel(true)).toBe(3);
    expect(dispatcher._getTopLevel(false)).toBe(3);
    expect(dispatcher.plugins.olevel3.$dom.style.zIndex).toBe('4');
    expect(dispatcher.plugins.olevel1.$dom.style.zIndex).toBe('2');
    expect(dispatcher.plugins.level3.$dom.style.zIndex).toBe('4');
    expect(dispatcher.plugins.level1.$dom.style.zIndex).toBe('2');
    dispatcher.plugins.level1.$bumpToTop();
    dispatcher.plugins.olevel1.$bumpToTop();
    expect(dispatcher.plugins.olevel3.$dom.style.zIndex).toBe('3');
    expect(dispatcher.plugins.olevel1.$dom.style.zIndex).toBe('4');
    expect(dispatcher.plugins.level3.$dom.style.zIndex).toBe('3');
    expect(dispatcher.plugins.level1.$dom.style.zIndex).toBe('4');
    expect(dispatcher._getTopLevel(true)).toBe(4);
    expect(dispatcher._getTopLevel(false)).toBe(4);
  });

  test('$pluginOrder', () => {
    dispatcher.order = [ 'a', 'b', 'c' ];
    const plugin = new Plugin({ id: 'p' }, dispatcher);
    expect(plugin.$pluginOrder).toBe(dispatcher.order);
  });

  test('$plugins', () => {
    Chimee.install({ name: 'p' });
    dispatcher.use('p');
    expect(dispatcher.plugins.p.$plugins).toBe(dispatcher.plugins);
  });

  describe('autoFocus', () => {
    test('normal', () => {
      Chimee.install({ name: 'autoFocus' });
      player.use('autoFocus');
      const plugin = player.$plugins.autoFocus;
      expect(plugin.$autoFocus).toBe(true);
      expect(document.activeElement).toBe(document.body);
      plugin.$dom.dispatchEvent(new Event('mouseup'));
      expect(document.activeElement).toBe(player.$video);
    });
    test('autoFocus is false', () => {
      Chimee.install({ name: 'autoFocus' });
      player.use('autoFocus');
      const plugin = player.$plugins.autoFocus;
      expect(plugin.$autoFocus).toBe(true);
      expect(document.activeElement).toBe(document.body);
      plugin.$autoFocus = false;
      plugin.$dom.dispatchEvent(new Event('mouseup'));
      expect(document.activeElement).not.toBe(player.$video);
    });
  });
});
