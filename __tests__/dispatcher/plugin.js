import Dom from 'dispatcher/dom';
import Bus from 'dispatcher/bus';
import { Log, getAttr, isString, isNumber, isBoolean } from 'chimee-helper';
import Plugin from 'dispatcher/plugin';
import Dispatcher from 'dispatcher/index';
import VideoConfig from 'config/video';
import Chimee from 'index';
describe('dispatcher/plugin', () => {
  let dispatcher;
  let wrapper;
  beforeEach(() => {
    wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    dispatcher = {
      _sortZIndex: jest.fn(),
      kernel: {
        currentTime: 0,
        seek(value) {
          this.currentTime = value;
        },
      },
      throwError(error) {
        throw error;
      },
    };
    dispatcher.dom = new Dom(wrapper, dispatcher);
    dispatcher.videoConfig = new VideoConfig(dispatcher, {});
    dispatcher.bus = new Bus(dispatcher);
    Log.data.error = [];
    Log.data.warn = [];
  });
  afterEach(() => {
    wrapper.parentNode.removeChild(wrapper);
  });

  test('$emit', () => {
    const pluginE = new Plugin({
      id: 'e',
    }, dispatcher);
    expect(() => pluginE.$emit()).toThrow('emit key parameter must be String');
    pluginE.$emit('click');
    pluginE.$emit('xx_click');
    pluginE.$destroy();
  });

  test('$emitSync', () => {
    const pluginE = new Plugin({
      id: 'e',
    }, dispatcher);
    expect(() => pluginE.$emitSync()).toThrow('emitSync key parameter must be String');
    expect(pluginE.$emitSync('hello')).toBe(true);
    pluginE.$destroy();
  });

  test('$once', () => {
    const plugin = new Plugin({
      id: 'e',
    }, dispatcher);
    const fn = jest.fn();
    dispatcher.order = [ 'e' ];
    dispatcher.plugins = {
      e: {},
    };
    plugin.$once('hi', fn);
    expect(plugin.__dispatcher.bus.events.hi.main.e.length).toBe(1);
    expect(plugin.$emitSync('hi', 1)).toBe(true);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).lastCalledWith(1);
    delete dispatcher.order;
  });

  test('__checkArgsForOnAndOff', () => {
    const plugin = new Plugin({ id: 'check' }, dispatcher);
    expect(() => plugin.$on()).toThrow('key parameter must be String');
    expect(() => plugin.$on('1')).toThrow('fn parameter must be Function');
  });

  describe('video attr', () => {
    const dispatcher = new Dispatcher({
      wrapper: document.createElement('div'),
      // https://github.com/Chimeejs/chimee-kernel/issues/1
      // 因为没有默认垫底的选项
      box: 'native',
    }, {});
    const plugin = new Plugin({ id: 'normal' }, dispatcher);
    plugin.__init(dispatcher.videoConfig);
    beforeAll(() => {
      dispatcher.videoConfigReady = true;
    });
    test('buffered', () => {
      expect(typeof plugin.buffered.start).toBe('function');
      expect(typeof plugin.buffered.end).toBe('function');
      expect(typeof plugin.buffered.length).toBe('number');
    });
    test('duration', () => {
      expect(plugin.duration).toBe(dispatcher.dom.videoElement.duration);
      expect(() => { plugin.duration = 40; }).toThrow();
    });
    test('volume', () => {
      expect(plugin.volume).toBe(dispatcher.dom.videoElement.volume);
      plugin.volume = 1;
      expect(plugin.volume).toBe(1);
      expect(plugin.volume).toBe(dispatcher.dom.videoElement.volume);
    });
    test('muted', () => {
      expect(plugin.muted).toBe(false);
      plugin.muted = true;
      expect(plugin.muted).toBe(true);
      expect(plugin.$videoConfig.muted).toBe(true);
      expect(plugin.muted).toBe(dispatcher.dom.videoElement.muted);
    });
    test('currentTime', () => {
      expect(plugin.currentTime).toBe(dispatcher.dom.videoElement.currentTime);
      expect(plugin.currentTime).toBe(dispatcher.kernel.currentTime);
      plugin.currentTime = 99;
      expect(plugin.currentTime).toBe(99);
      expect(plugin.currentTime).toBe(dispatcher.kernel.currentTime);
    });
    test('src', done => {
      const url = 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4';
      plugin.src = url;
      setTimeout(() => {
        expect(plugin.src).toBe(url);
        expect(plugin.src).toBe(plugin.$videoConfig.src);
        expect(dispatcher.dom.videoElement.src).toBe(plugin.src);
        done();
      }, 0);
    });
    test('autoplay', () => {
      plugin.autoplay = true;
      expect(plugin.autoplay).toBe(true);
      expect(dispatcher.dom.videoElement.autoplay).toBe(true);
      plugin.autoplay = false;
      expect(plugin.autoplay).toBe(false);
      expect(dispatcher.dom.videoElement.autoplay).toBe(false);
    });
    test('controls', () => {
      plugin.controls = true;
      expect(plugin.controls).toBe(true);
      expect(dispatcher.dom.videoElement.controls).toBe(true);
      plugin.controls = false;
      expect(plugin.controls).toBe(false);
      expect(dispatcher.dom.videoElement.controls).toBe(false);
    });
    test('loop', () => {
      plugin.loop = true;
      expect(plugin.loop).toBe(true);
      expect(dispatcher.dom.videoElement.loop).toBe(true);
      plugin.loop = false;
      expect(plugin.loop).toBe(false);
      expect(dispatcher.dom.videoElement.loop).toBe(false);
    });
    test('preload', () => {
      expect(plugin.preload).toBe('auto');
      expect(dispatcher.dom.videoElement.preload).toBe('auto');
      plugin.preload = 'none';
      expect(plugin.preload).toBe('none');
      expect(dispatcher.dom.videoElement.preload).toBe('none');
      plugin.preload = 'auto';
      expect(plugin.preload).toBe('auto');
      expect(dispatcher.dom.videoElement.preload).toBe('auto');
    });
    test('width', () => {
      plugin.width = 100;
      expect(plugin.width).toBe(100);
      expect(dispatcher.dom.videoElement.width).toBe(100);
    });
    test('height', () => {
      plugin.height = 100;
      expect(plugin.height).toBe(100);
      expect(dispatcher.dom.videoElement.height).toBe(100);
    });
    test('crossorigin', () => {
      plugin.crossOrigin = 'use-credentials';
      expect(plugin.crossOrigin).toBe('use-credentials');
      expect(dispatcher.dom.videoElement.crossOrigin).toBe('use-credentials');
    });
    test('poster', () => {
      const url = 'https://www.baidu.com/';
      plugin.poster = url;
      expect(plugin.poster).toBe(url);
      expect(dispatcher.dom.videoElement.poster).toBe(url);
    });
    test('playsinline', () => {
      plugin.playsInline = true;
      expect(plugin.playsInline).toBe(true);
      expect(getAttr(dispatcher.dom.videoElement, 'playsinline')).toBe('');
      expect(getAttr(dispatcher.dom.videoElement, 'webkit-playsinline')).toBe('');
      expect(getAttr(dispatcher.dom.videoElement, 'x5-playsinline')).toBe('');
    });
    test('x5VideoPlayerFullscreen', () => {
      plugin.x5VideoPlayerFullscreen = true;
      expect(plugin.x5VideoPlayerFullscreen).toBe(true);
      expect(getAttr(dispatcher.dom.videoElement, 'x5-video-player-fullscreen')).toBe('true');
    });
    test('xWebkitAirplay', () => {
      plugin.xWebkitAirplay = true;
      expect(plugin.xWebkitAirplay).toBe(true);
      expect(getAttr(dispatcher.dom.videoElement, 'x-webkit-airplay')).toBe('true');
    });
    test('x5VideoOrientation', () => {
      plugin.x5VideoOrientation = 'landscape';
      expect(plugin.x5VideoOrientation).toBe('landscape');
      expect(getAttr(dispatcher.dom.videoElement, 'x5-video-orientation')).toBe('landscape');
    });
    // test('dispatcher is not ready', () => {
    //   dispatcher.videoConfigReady = false;
    //   expect(() => {plugin.height = 200;}).toThrow("You can't set height of video before videoConfig is ready");
    //   expect(plugin.height).toBe(100);
    //   expect(dispatcher.dom.videoElement.height).toBe(100);
    // });
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
      dispatcher.videoConfigReady = false;
    });
    test('$attr', () => {
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
      plugin.$attr('video', 'controls', true);
      expect(plugin.$attr('video', 'controls')).toBe(null);
      expect(Log.data.warn[0]).toEqual([ 'chimee',
        'normal is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger' ]);
      dispatcher.videoConfigReady = true;
      plugin.$attr('video', 'controls', true);
      expect(plugin.$attr('video', 'controls')).toBe('');
    });
    test('$attr on video property but it is not in videoconfig', () => {
      plugin.$attr('video', 'data-controls', true);
      expect(plugin.$attr('video', 'data-controls')).toBe(null);
      dispatcher.videoConfigReady = true;
      dispatcher.dom.__dispatcher.videoConfigReady = true;
      plugin.__init(new VideoConfig(dispatcher, {}));
      plugin.$attr('video', 'data-controls', true);
      expect(plugin.$attr('video', 'data-controls')).toBe('true');
    });
  });

  test('$bump to top', () => {
    const wrapper = document.createElement('div');
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
    Dispatcher.install(level1);
    Dispatcher.install(level2);
    Dispatcher.install(level3);
    Dispatcher.install(olevel1);
    Dispatcher.install(olevel2);
    Dispatcher.install(olevel3);
    const dispatcher = new Dispatcher({
      wrapper,
    }, {});
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
    dispatcher.destroy();
  });

  describe('throwError', () => {
    const error = new Error('i am an error');
    test('beforeCreate', () => {
      expect(() => new Plugin({
        id: 'err',
        beforeCreate() {
          throw error;
        },
      }, dispatcher)).toThrow(error.message);
    });
    test('create', () => {
      expect(() => new Plugin({
        id: 'err',
        create() {
          throw error;
        },
      }, dispatcher)).toThrow(error.message);
    });
    test('init', () => {
      const plugin = new Plugin({
        id: 'err',
        init() {
          throw error;
        },
      }, dispatcher);
      expect(() => plugin.__init({})).toThrow(error.message);
    });
    test('inited', () => {
      const plugin = new Plugin({
        id: 'err',
        inited() {
          throw error;
        },
      }, dispatcher);
      expect(() => plugin.__inited({})).toThrow(error.message);
    });
    test('inited with promise', async () => {
      const plugin = new Plugin({
        id: 'err',
        inited() {
          return new Promise(() => { throw error; });
        },
      }, dispatcher);
      let catcherr = false;
      try {
        await plugin.__inited({});
      } catch (err) {
        catcherr = true;
        expect(err).toBe(error);
      }
      expect(catcherr).toBe(true);
    });
    test('inited with reject', async () => {
      const plugin = new Plugin({
        id: 'err',
        inited() {
          return Promise.reject();
        },
      }, dispatcher);
      expect(plugin.__inited({})).rejects.toBe();
    });
  });
  describe('__removeEvents', () => {
    let plugin;
    beforeEach(() => {
      plugin = new Plugin({ id: 're' }, dispatcher);
    });
    afterEach(() => {
      plugin.$destroy();
    });
    test('empty event', () => {
      expect(() => plugin.__removeEvents('wow', () => {})).not.toThrow();
    });
    test('remove function do not exist', () => {
      plugin.__addEvents('wow', () => {});
      expect(() => plugin.__removeEvents('wow', () => {})).not.toThrow();
    });
    test('remove but event is not empty', () => {
      const fn = () => {};
      plugin.__addEvents('wow', () => {});
      plugin.__addEvents('wow', fn);
      expect(() => plugin.__removeEvents('wow', fn)).not.toThrow();
    });
  });
  describe('ready and readySync', () => {
    test('synchronize', () => {
      const plugin = new Plugin({ id: 'a' }, dispatcher);
      plugin.__inited();
      expect(plugin.readySync).toBe(true);
      expect(plugin.ready).resolves.toBe();
    });
    test('asynchronize with resolve', async () => {
      const plugin = new Plugin({
        id: 'b',
        inited() {
          return Promise.resolve(1);
        },
      }, dispatcher);
      plugin.__inited();
      await expect(plugin.ready).resolves.toBe(1);
      expect(plugin.readySync).toBe(true);
    });
    test('asynchronize with reject', async () => {
      const plugin = new Plugin({
        id: 'b',
        inited() {
          return Promise.reject();
        },
      }, dispatcher);
      plugin.__inited();
      await expect(plugin.ready).rejects.toBe();
      expect(plugin.readySync).toBe(false);
    });
  });

  test('$pluginOrder', () => {
    dispatcher.order = [ 'a', 'b', 'c' ];
    const plugin = new Plugin({ id: 'p' }, dispatcher);
    expect(plugin.$pluginOrder).toBe(dispatcher.order);
  });

  test('$plugins', () => {
    Dispatcher.install({ name: 'p' });
    dispatcher = new Dispatcher({ wrapper: document.createElement('div') }, {});
    dispatcher.use('p');
    expect(dispatcher.plugins.p.$plugins).toBe(dispatcher.plugins);
  });
});

describe('dispatcher/plugin => $watch', () => {
  let fn;
  let wrapper;
  beforeEach(() => {
    fn = jest.fn();
    wrapper = document.createElement('div');
  });
  test('normal watch', () => {
    const normalWatch = {
      name: 'normalWatch',
      data: {
        test: 1,
      },
      create() {
        this.unwatch = this.$watch('test', fn);
        this.$watch([ 'array' ], fn);
      },
    };
    Chimee.install(normalWatch);
    const player = new Chimee({
      wrapper,
      plugin: [ 'normalWatch' ],
    });
    player.normalWatch.test = 2;
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).lastCalledWith(2, 1);
    player.normalWatch.unwatch();
    player.normalWatch.test = 3;
    expect(fn).toHaveBeenCalledTimes(1);
  });
  test('videoConfig watch', () => {
    const videoConfigWatch = {
      name: 'videoConfigWatch',
      data: {
        test: 1,
      },
      create() {
        this.$videoConfig._realDomAttr.forEach(key => {
          this.$watch(key, fn);
        });
      },
    };
    Chimee.install(videoConfigWatch);
    const player = new Chimee({
      wrapper,
      plugin: [ 'videoConfigWatch' ],
    });
    let index = 0;
    player.__dispatcher.videoConfig._realDomAttr.forEach(key => {
      if ([ 'src' ].indexOf(key) > -1) return;
      if (key === 'preload') {
        const origin = player[key];
        player[key] = '123';
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith('none', origin);
        return;
      }
      if (isBoolean(player[key])) {
        player[key] = !player[key];
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith(player[key], !player[key]);
      }
      if (isNumber(player[key])) {
        player[key] = key === 'volume'
          ? player[key] / 2
          : player[key] + 1;
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith(player[key], key === 'volume'
          ? player[key] * 2
          : player[key] - 1
        );
      }
      if (isString(player[key])) {
        const origin = player[key];
        player[key] = '123';
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith('123', origin);
      }
    });
  });
  test('only accept string or array', () => {
    const errorWatch = {
      name: 'errorWatch',
      data: {
        test: 1,
      },
      create() {
        this.$watch(1, fn);
      },
    };
    Chimee.install(errorWatch);
    expect(() => new Chimee({
      wrapper,
      plugin: [ 'errorWatch' ],
    })).toThrow('$watch only accept string and Array<string> as key to find the target to spy on, but not 1, whose type is number');
  });
  test('unwatch nothing', () => {
    const player = new Chimee({
      wrapper,
      plugin: [ 'normalWatch' ],
    });
    player.normalWatch.__unwatchHandlers.pop();
    player.normalWatch.__unwatchHandlers.pop();
    player.normalWatch.unwatch();
  });
  describe('deep watch', () => {
    let player;
    beforeAll(() => {
      const deepWatch = {
        name: 'deepWatch',
        data: {
          test: {
            foo: 1,
          },
          arr: [ 1, 2, 3 ],
        },
        create() {
          this.$watch('test', fn, { deep: true });
          this.$watch('arr', fn, { deep: true });
        },
      };
      Chimee.install(deepWatch);
    });
    beforeEach(() => {
      player = new Chimee({
        wrapper,
        plugin: [ 'deepWatch' ],
      });
    });

    test('$set object', () => {
      player.deepWatch.$set(player.deepWatch.test, 'bar', 2);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.test, player.deepWatch.test);
      expect(player.deepWatch.test).toEqual({ foo: 1, bar: 2 });
    });

    test('$set object exist', () => {
      player.deepWatch.$set(player.deepWatch.test, 'foo', 2);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.test, player.deepWatch.test);
      expect(player.deepWatch.test).toEqual({ foo: 2 });
    });

    test('$del object', () => {
      player.deepWatch.$del(player.deepWatch.test, 'foo');
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.test, player.deepWatch.test);
      expect(player.deepWatch.test).toEqual({});
    });

    test('$del object did not exist', () => {
      player.deepWatch.$del(player.deepWatch.test, 'bar');
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.test, player.deepWatch.test);
      expect(player.deepWatch.test).toEqual({ foo: 1 });
    });

    test('$set array', () => {
      player.deepWatch.$set(player.deepWatch.arr, 3, 4);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.arr, player.deepWatch.arr);
      expect(player.deepWatch.arr).toEqual([ 1, 2, 3, 4 ]);
    });

    test('$del array', () => {
      player.deepWatch.$del(player.deepWatch.arr, 2);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.arr, player.deepWatch.arr);
      expect(player.deepWatch.arr).toEqual([ 1, 2, undefined ]);
    });

    test('destroy watcher', () => {
      expect(() => player.deepWatch.$destroy()).not.toThrow();
    });
  });

  describe('without deep watch', () => {
    let player;
    beforeAll(() => {
      const withoutDeepWatch = {
        name: 'withoutDeepWatch',
        data: {
          test: {
            foo: 1,
          },
          arr: [ 1, 2, 3 ],
        },
        create() {
          this.$watch('test', fn);
          this.$watch('arr', fn);
        },
      };
      Chimee.install(withoutDeepWatch);
    });
    beforeEach(() => {
      player = new Chimee({
        wrapper,
        plugin: [ 'withoutDeepWatch' ],
      });
      Log.data.warn = [];
    });
    test('$set', () => {
      player.$set(player.withoutDeepWatch.test, 'foo', 2);
      expect(player.withoutDeepWatch.test.foo).toBe(2);
      expect(Log.data.warn).toEqual([[ 'chimee', '{"foo":1} has not been deep watch. There is no need to use $set.' ]]);
    });
    test('$del', () => {
      player.$del(player.withoutDeepWatch.test, 'foo');
      expect(player.withoutDeepWatch.test.foo).toBe();
      expect(Log.data.warn).toEqual([[ 'chimee', '{"foo":1} has not been deep watch. There is no need to use $del.' ]]);
    });
    test('$set only support array and object', () => {
      expect(() => player.$set(1, '123', 2)).toThrow();
    });
    test('$del only support array and object', () => {
      expect(() => player.$del(1, '123')).toThrow();
    });
  });
});
