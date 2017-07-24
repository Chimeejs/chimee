import Dom from 'dispatcher/dom';
import Bus from 'dispatcher/bus';
import {Log, getAttr, isString, isNumber, isBoolean} from 'chimee-helper';
import Plugin from 'dispatcher/plugin';
import Dispatcher from 'dispatcher/index';
import VideoConfig from 'dispatcher/video-config';
import Chimee from 'index';
describe('dispatcher/plugin', () => {
  let dispatcher;
  beforeEach(() => {
    const node = document.createElement('div');
    dispatcher = {
      _sortZIndex: jest.fn(),
      kernel: {
        currentTime: 0,
        seek (value) {
          this.currentTime = value;
        }
      },
      throwError (error) {
        throw error;
      }
    };
    dispatcher.dom = new Dom(node, dispatcher);
    dispatcher.videoConfig = new VideoConfig(dispatcher, {})
    dispatcher.bus = new Bus(dispatcher);
    Log.data.error = [];
    Log.data.warn = [];
  });

  test('illegal constructor', () => {
    expect(() => new Plugin()).toThrow('lack of dispatcher');
    expect(Log.data.error).toEqual([
      ['Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?']
    ]);
  });

  test('lack of id', () => {
    expect(() => new Plugin({}, dispatcher)).toThrow('id of PluginConfig must be string');
  });
  describe('class name support', () => {
    test('normal class name string', () => {
      const className = 'test-cls';
      const plugin = new Plugin({id: 'a', className}, dispatcher);
      expect(plugin.$dom.className).toBe(className);
      plugin.$destroy();
    });
    test('multiple class name string', () => {
      const className = 'test-cls a b c';
      const plugin = new Plugin({id: 'a', className}, dispatcher);
      expect(plugin.$dom.className).toBe(className);
      plugin.$destroy();
    });
    test('multiple class name array', () => {
      const className = ['test-cls', 'a', 'b', 'c'];
      const plugin = new Plugin({id: 'a', className}, dispatcher);
      expect(plugin.$dom.className).toBe('test-cls a b c');
      plugin.$destroy();
    });
  });
  test('base running', () => {
    const pluginA = new Plugin({id: 'a'}, dispatcher);
    expect(pluginA.$config).toEqual({name: undefined});
    expect(pluginA.$operable).toBe(true);
    expect(pluginA.$dom.style.pointerEvents).toBe('auto');
    expect(pluginA.$level).toBe(0);
    expect(pluginA.$dom).toBe(dispatcher.dom.plugins.a);
    pluginA.$destroy();
    expect(dispatcher.dom.plugins.a).toBe();
  });

  describe('init', () => {
    test('do nothing', () => {
      const pluginI1 = new Plugin({id: 'i2'}, dispatcher);
      const videoConfig = new VideoConfig(dispatcher, {});
      expect(pluginI1.$videoConfig).not.toBe();
      pluginI1.__init({});
      expect(pluginI1.$videoConfig).toEqual(videoConfig);
      pluginI1.$destroy();
    });
    test('change src by config pass in', () => {
      const pluginI2 = new Plugin({
        id: 'i2',
        init (config) {
          config.src = 'i am a test';
        }
      }, dispatcher);
      pluginI2.__init(pluginI2.$videoConfig);
      expect(pluginI2.$videoConfig.src).toBe('i am a test');
      pluginI2.$destroy();
    });
    test('change src by this', () => {
      const plugin = new Plugin({
        id: 'i3',
        init (config) {
          this.src = 'i am a test';
        }
      }, dispatcher);
      plugin.__init({});
      expect(plugin.$videoConfig.src).toBe('i am a test');
      plugin.$destroy();
    });
  });

  test('methods', () => {
    const pluginM1 = new Plugin({
      id: 'm1',
      methods: ['what']
    }, dispatcher);
    pluginM1.$destroy();
    const fn = jest.fn();
    const pluginM2 = new Plugin({
      id: 'm2',
      methods: {
        a: fn,
        b: fn
      }
    }, dispatcher);
    pluginM2.a();
    expect(fn).toHaveBeenCalledTimes(1);
    pluginM2.b();
    expect(fn).toHaveBeenCalledTimes(2);
    pluginM2.$destroy();
    pluginM2.a();
    expect(fn).toHaveBeenCalledTimes(3);
    pluginM2.b();
    expect(fn).toHaveBeenCalledTimes(4);
    expect(() => new Plugin({
      id: 'm3',
      methods: {
        a: 1
      }
    }, dispatcher))
    .toThrow('plugins methods must be Function');
  });

  test('methods binding', () => {
    const fn = function () {
      expect(this).toBe(plugin);
    };
    const plugin = new Plugin({
      id: 'm',
      methods: {
        fn
      }
    }, dispatcher);
    plugin.fn();
    const {fn: theFn} = plugin;
    theFn();
  });

  test('events', () => {
    const pluginE1 = new Plugin({
      id: 'e1',
      events: [1]
    }, dispatcher);
    expect(pluginE1.__events).toEqual({});
    pluginE1.$destroy();
    const fn1 = jest.fn();
    const pluginE2 = new Plugin({
      id: 'e2',
      events: {
        a: fn1,
        b: fn1
      }
    }, dispatcher);
    expect(pluginE2.__events.a).toEqual([fn1]);
    expect(pluginE2.__events.b).toEqual([fn1]);
    dispatcher.bus.events.a.main.e2[0]();
    dispatcher.bus.events.b.main.e2[0]();
    expect(fn1).toHaveBeenCalledTimes(2);
    pluginE2.__events.ahahah = 1;
    pluginE2.$destroy();
    expect(pluginE2.__events).toBe();
    expect(dispatcher.bus.events.a).toEqual({main: {}});
    expect(dispatcher.bus.events.b).toEqual({main: {}});
    expect(() => new Plugin({
      id: 'e3',
      events: {
        a: 1
      }
    }, dispatcher)).toThrow('plugins events hook must bind with Function');
  });

  test('data', () => {
    const pluginD1 = new Plugin({
      id: 'd1',
      data: {
        a: 1
      }
    }, dispatcher);
    expect(pluginD1.a).toBe(1);
    pluginD1.$destroy();
    expect(pluginD1.a).toBe(1);
    const pluginD2 = new Plugin({
      id: 'd2',
      data: []
    }, dispatcher);
    pluginD2.$destroy();
  });

  describe('computed', () => {
    let dForComputed;
    let pluginC2;
    beforeEach(() => {
      pluginC2 = new Plugin({
        id: 'c2',
        name: 'c2',
        computed: {
          a () {return 1;},
          b: {
            set (val) {
              return val;
            }
          },
          c: 2,
          d: {
            get () {return dForComputed;},
            set (val) {dForComputed = val;}
          },
          e: {
            get (value) {return value;}
          }
        }
      }, dispatcher);
    });
    test('wrong computed member', () => {
      expect(pluginC2.c).toBe();
      expect(Log.data.warn[0]).toEqual(['Dispatcher.plugin', "Wrong computed member 'c' defination in Plugin c2"]);
    });
    test('one function return normal getter', () => {
      expect(pluginC2.a).toBe(1);
    });
    test('one function with setter is ok', () => {
      expect(pluginC2.b).toBe();
      pluginC2.b = 1;
      expect(pluginC2.b).toBe(1);
    });
    test('you can build your setter getter', () => {
      expect(pluginC2.d).toBe();
      pluginC2.d = 1;
      expect(pluginC2.d).toBe(1);
    });
    test('we can handle value for you', () => {
      expect(pluginC2.e).toBe();
      pluginC2.e = 3;
      expect(pluginC2.e).toBe(3);
    });
  });

  test('create & destroy & inited', () => {
    const createAndDestroyCall = [];
    const pluginCD = new Plugin({
      id: 'cd',
      create () {createAndDestroyCall.push('create');},
      destroy () {createAndDestroyCall.push('destroy');},
      inited () {createAndDestroyCall.push('inited');}
    }, dispatcher);
    expect(createAndDestroyCall).toEqual(['create']);
    pluginCD.__inited();
    expect(createAndDestroyCall).toEqual(['create', 'inited']);
    expect(pluginCD.ready).resolves.toBe();
    pluginCD.$destroy();
    expect(createAndDestroyCall).toEqual(['create', 'inited', 'destroy']);
  });

  test('penetrate', done => {
    const dispatcher = new Dispatcher({wrapper: document.createElement('div')}, {});
    const pluginP = new Plugin({
      id: 'p',
      penetrate: true,
      events: {
        click () {
          done();
        }
      }
    }, dispatcher);
    dispatcher.order.unshift('p');
    dispatcher.plugins.p = pluginP;
    pluginP.$dom.click();
    pluginP.$destroy();
  });

  test('operable', () => {
    const pluginO = new Plugin({
      id: 'o',
      operable: false
    }, dispatcher);
    expect(pluginO.$operable).toBe(false);
    expect(pluginO.$dom.style.pointerEvents).toBe('none');
    pluginO.$operable = true;
    expect(pluginO.$dom.style.pointerEvents).toBe('auto');
    expect(pluginO.$operable).toBe(true);
    pluginO.$operable = 3;
    expect(pluginO.$dom.style.pointerEvents).toBe('auto');
    expect(pluginO.$operable).toBe(true);
    pluginO.$destroy();
    const pluginO1 = new Plugin({
      id: 'o'
    }, dispatcher, {operable: false});
    expect(pluginO1.$operable).toBe(false);
    expect(pluginO1.$dom.style.pointerEvents).toBe('none');
    pluginO1.$destroy();
  });

  test('level', () => {
    const pluginZ = new Plugin({
      id: 'z',
      level: 1
    }, dispatcher);
    expect(pluginZ.$level).toBe(1);
    expect(dispatcher._sortZIndex).toHaveBeenCalledTimes(0);
    pluginZ.$level = true;
    expect(pluginZ.$level).toBe(1);
    expect(dispatcher._sortZIndex).toHaveBeenCalledTimes(0);
    pluginZ.$level = 2;
    expect(pluginZ.$level).toBe(2);
    expect(dispatcher._sortZIndex).toHaveBeenCalledTimes(1);
    pluginZ.$destroy();
    const pluginZ1 = new Plugin({
      id: 'z'
    }, dispatcher, {level: 1});
    expect(pluginZ1.$level).toBe(1);
    expect(dispatcher._sortZIndex).toHaveBeenCalledTimes(1);
    pluginZ1.$destroy();
  });

  test('$emit', () => {
    const pluginE = new Plugin({
      id: 'e'
    }, dispatcher);
    expect(() => pluginE.$emit()).toThrow('$emit key parameter must be String');
    pluginE.$emit('click');
    pluginE.$emit('xx_click');
    pluginE.$destroy();
  });

  test('$emitSync', () => {
    const pluginE = new Plugin({
      id: 'e'
    }, dispatcher);
    expect(() => pluginE.$emitSync()).toThrow('$emitSync key parameter must be String');
    expect(pluginE.$emitSync('hello')).toBe(true);
    pluginE.$destroy();
  });

  test('$once', () => {
    const plugin = new Plugin({
      id: 'e'
    }, dispatcher);
    const fn = jest.fn();
    dispatcher.order = ['e'];
    dispatcher.plugins = {
      e: {}
    };
    plugin.$once('hi', fn);
    expect(plugin.__dispatcher.bus.events.hi.main.e.length).toBe(1);
    expect(plugin.$emitSync('hi', 1)).toBe(true);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).lastCalledWith(1);
    delete dispatcher.order;
  });

  test('__checkArgsForOnAndOff', () => {
    const plugin = new Plugin({id: 'check'}, dispatcher);
    expect(() => plugin.$on()).toThrow('key parameter must be String');
    expect(() => plugin.$on('1')).toThrow('fn parameter must be Function');
  });

  describe('video attr', () => {
    const dispatcher = new Dispatcher({wrapper: document.createElement('div')}, {});
    const plugin = new Plugin({id: 'normal'}, dispatcher);
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
      expect(() => {plugin.duration = 40;}).toThrow();
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
      expect(getAttr(dispatcher.dom.videoElement, 'x5-video-player-type')).toBe('h5');
    });
    test('x5VideoPlayerFullScreen', () => {
      plugin.x5VideoPlayerFullScreen = true;
      expect(plugin.x5VideoPlayerFullScreen).toBe(true);
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
    const plugin = new Plugin({id: 'normal'}, dispatcher);
    plugin.$fullScreen();
    plugin.$fullScreen(true);
    plugin.$fullScreen(false);
    plugin.$fullScreen();
    plugin.$fullScreen(false, 'container');
    plugin.$destroy();
  });

  test('fullScreen', () => {
    const plugin = new Plugin({id: 'normal'}, dispatcher);
    plugin.fullScreen();
    plugin.fullScreen(true);
    plugin.fullScreen(false);
    plugin.fullScreen();
    plugin.fullScreen(false, 'container');
    plugin.$destroy();
  });

  describe('$attr & $css', () => {
    let plugin;
    beforeEach(() => {
      plugin = new Plugin({id: 'normal'}, dispatcher);
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
      expect(Log.data.warn[0]).toEqual([ 'plugin',
          'Plugin normal is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger' ]);
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
      level: 1
    };
    const level2 = {
      name: 'level2',
      level: 2
    };
    const level3 = {
      name: 'level3',
      level: 3
    };
    const olevel1 = {
      name: 'olevel1',
      level: 1,
      inner: false
    };
    const olevel2 = {
      name: 'olevel2',
      level: 2,
      inner: false
    };
    const olevel3 = {
      name: 'olevel3',
      level: 3,
      inner: false
    };
    Dispatcher.install(level1);
    Dispatcher.install(level2);
    Dispatcher.install(level3);
    Dispatcher.install(olevel1);
    Dispatcher.install(olevel2);
    Dispatcher.install(olevel3);
    const dispatcher = new Dispatcher({
      wrapper
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
        beforeCreate () {
          throw error;
        }
      }, dispatcher)).toThrow(error.message);
    });
    test('create', () => {
      expect(() => new Plugin({
        id: 'err',
        create () {
          throw error;
        }
      }, dispatcher)).toThrow(error.message);
    });
    test('init', () => {
      const plugin = new Plugin({
        id: 'err',
        init () {
          throw error;
        }
      }, dispatcher);
      expect(() => plugin.__init({})).toThrow(error.message);
    });
    test('inited', () => {
      const plugin = new Plugin({
        id: 'err',
        inited () {
          throw error;
        }
      }, dispatcher);
      expect(() => plugin.__inited({})).toThrow(error.message);
    });
    test('inited with promise', async () => {
      const plugin = new Plugin({
        id: 'err',
        inited () {
          return new Promise(() => {throw error;})
        }
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
        inited () {
          return Promise.reject();
        }
      }, dispatcher);
      expect(plugin.__inited({})).rejects.toBe();
    });
  });
  describe('__removeEvents', () => {
    let plugin;
    beforeEach(() => {
      plugin = new Plugin({id: 're'}, dispatcher);
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
      const plugin = new Plugin({id: 'a'}, dispatcher);
      plugin.__inited();
      expect(plugin.readySync).toBe(true);
      expect(plugin.ready).resolves.toBe();
    });
    test('asynchronize with resolve', async () => {
      const plugin = new Plugin({
        id: 'b',
        inited () {
          return Promise.resolve(1);
        }
      }, dispatcher);
      plugin.__inited();
      await expect(plugin.ready).resolves.toBe(1);
      expect(plugin.readySync).toBe(true);
    });
    test('asynchronize with reject', async () => {
      const plugin = new Plugin({
        id: 'b',
        inited () {
          return Promise.reject();
        }
      }, dispatcher);
      plugin.__inited();
      await expect(plugin.ready).rejects.toBe();
      expect(plugin.readySync).toBe(false);
    });
  });

  test('$pluginOrder', () => {
    dispatcher.order = ['a', 'b', 'c'];
    const plugin = new Plugin({id: 'p',}, dispatcher);
    expect(plugin.$pluginOrder).toBe(dispatcher.order);
  });

  test('$plugins', () => {
    Dispatcher.install({name: 'p'});
    dispatcher = new Dispatcher({wrapper: document.createElement('div')}, {});
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
        test: 1
      },
      create () {
        this.unwatch = this.$watch('test', fn);
        this.$watch(['array'], fn);
      }
    };
    Chimee.install(normalWatch);
    const player = new Chimee({
      wrapper,
      plugin: ['normalWatch']
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
        test: 1
      },
      create () {
        this.$videoConfig._realDomAttr.forEach(key => {
          this.$watch(key, fn);
        });
      }
    };
    Chimee.install(videoConfigWatch);
    const player = new Chimee({
      wrapper,
      plugin: ['videoConfigWatch']
    });
    let index = 0;
    player.__dispatcher.videoConfig._realDomAttr.forEach(key => {
      if(['src'].indexOf(key) > -1) return;
      if(isBoolean(player[key])) {
        player[key] = !player[key];
        // console.warn(key, index, player[key]);
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith(player[key], !player[key]);
      }
      if(isNumber(player[key])) {
        player[key] = key === 'volume'
          ? player[key] / 2
          : player[key] + 1;
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith(player[key], key === 'volume'
          ? player[key] * 2
          : player[key] - 1
        );
      }
      if(isString(player[key])) {
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
        test: 1
      },
      create () {
        this.$watch(1, fn);
      }
    };
    Chimee.install(errorWatch);
    expect(() => new Chimee({
      wrapper,
      plugin: ['errorWatch']
    })).toThrow('$watch only accept string and Array<string> as key to find the target to spy on, but not 1, whose type is number');
  });
  test('unwatch nothing', () => {
    const player = new Chimee({
      wrapper,
      plugin: ['normalWatch']
    });
    player.normalWatch.__unwatchHandlers.pop();
    player.normalWatch.__unwatchHandlers.pop();
    player.normalWatch.unwatch();
  });
});
