import Chimee from 'index';
import {Log, getAttr, setAttr} from 'chimee-helper';
import {videoReadOnlyProperties} from 'helper/const';

describe('Chimee', () => {
  const normalInstall = {
    name: 'normal install',
    level: 1
  };
  class NormalFunctionInstall extends Chimee.plugin {
    constructor (...args) {
      super(...args);
    }
  }
  class GrandSon extends NormalFunctionInstall {
    constructor (...args) {
      super(...args);
    }
  }
  const outer = {
    name: 'outer',
    inner: false
  };

  let player;

  test('install', () => {
    expect(Chimee.install(normalInstall)).toBe('normalInstall');
    expect(Chimee.install(NormalFunctionInstall)).toBe('normalFunctionInstall');
    expect(Chimee.install(GrandSon)).toBe('grandSon');
    Chimee.install(GrandSon);
    expect(Log.data.warn[0]).toEqual(['Dispatcher', 'You have installed GrandSon again. And the older one will be replaced']);
  });

  test('getPluginConfig', () => {
    expect(() => Chimee.getPluginConfig()).toThrow();
    expect(Chimee.getPluginConfig('normal install')).toEqual(Object.assign(normalInstall, {id: 'normalInstall'}));
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

  describe('new Chimee', () => {
    test('normal build', () => {
      expect(() => {
        player = new Chimee({
          // 播放地址
          src: 'http://cdn.toxicjohann.com/lostStar.mp4',
          // 直播:live 点播：vod
          type: 'vod',
          // 编解码容器
          box: 'native',
          // dom容器
          wrapper: 'body',
          plugin: [],
          events: {}
        });
      }).not.toThrow();
    });
    test('string build', () => {
      let chimee;
      const element = document.createElement('div');
      element.id = 'wrapper';
      document.body.appendChild(element);
      expect(() => {
        chimee = new Chimee('#wrapper');
      }).not.toThrow();
      document.body.removeChild(element);
      chimee.destroy();
    });
    test('error build', () => {
      expect(() => new Chimee({})).toThrow();
      expect(() => new Chimee(1)).toThrow();
    });
  });

  describe('__throwError', () => {
    const error = new Error('hello, i am an error');
    let fn;
    beforeEach(() => {
      fn = jest.fn();
    });
    test('normal throw', () => {
      expect(() => player.__throwError(error)).toThrow(error.message);
    });
    test('string error', () => {
      expect(() => player.__throwError(error.message)).toThrow(error.message);
    });
    test('instance error handler', () => {
      player.config.errorHandler = fn;
      expect(() => player.__throwError(error)).not.toThrow();
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(error);
      delete player.config.errorHandler;
    });
    test('Chimee error handler', () => {
      Chimee.config.errorHandler = fn;
      expect(() => player.__throwError(error)).not.toThrow();
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(error);
      delete Chimee.config.errorHandler;
    });
    test('instance could not be silent', () => {
      player.config.silent = true;
      expect(() => player.__throwError(error)).toThrow();
      delete player.config.silent;
    });
    test('Chimee silent', () => {
      expect(Chimee.config.log.error).toBe();
      expect(Chimee.config.log.info).toBe();
      expect(Chimee.config.log.warn).toBe();
      expect(Chimee.config.log.debug).toBe();
      expect(Chimee.config.log.verbose).toBe();
      Chimee.config.silent = true;
      expect(Chimee.config.log.error).toBe(false);
      expect(Chimee.config.log.info).toBe(false);
      expect(Chimee.config.log.warn).toBe(false);
      expect(Chimee.config.log.debug).toBe(false);
      expect(Chimee.config.log.verbose).toBe(false);
      expect(() => player.__throwError(error)).not.toThrow();
      Chimee.config.silent = false;
      expect(Chimee.config.log.error).toBe(true);
      expect(Chimee.config.log.info).toBe(true);
      expect(Chimee.config.log.warn).toBe(true);
      expect(Chimee.config.log.debug).toBe(true);
      expect(Chimee.config.log.verbose).toBe(true);
      expect(() => player.__throwError(error)).toThrow();
      delete Chimee.config.silent;
    });
  });

  test('emitSync', () => {
    expect(() => player.emitSync(1)).toThrow();
    expect(() => player.emitSync('click')).not.toThrow();
  });

  test('emit', async () => {
    expect(() => player.emit(1)).toThrow();
    await expect(() => player.emit('click')).not.toThrow();
    await expect(() => player.emit('play')).not.toThrow();
  });

  test('once', () => {
    expect(() => player.once('hello', function () {})).not.toThrow();
  });

  test('on', () => {
    expect(() => player.on('hello', function () {})).not.toThrow();
    expect(() => player.on('hello', 1)).toThrow();
    expect(() => player.on(1, function () {})).toThrow();
  });

  test('off', () => {
    expect(() => player.off('hello', function () {})).not.toThrow();
  });

  test('use', () => {
    expect(() => player.use('GrandSon')).not.toThrow();
    expect(() => player.use()).toThrow();
  });

  test('unuse', () => {
    expect(() => player.unuse('GrandSon')).not.toThrow();
  });

  test('kernel method', () => {
    expect(player.play()).resolves.toBe();
    expect(() => player.seek(1)).not.toThrow();
  });

  describe('video attr', () => {
    let videoElement;
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
        events: {}
      });
      videoElement = player.__dispatcher.dom.videoElement;
    });
    test('buffered', () => {
      expect(typeof player.buffered.start).toBe('function');
      expect(typeof player.buffered.end).toBe('function');
      expect(typeof player.buffered.length).toBe('number');
    });
    test('duration', () => {
      expect(player.duration).toBe(videoElement.duration);
      expect(() => {player.duration = 40;}).toThrow();
    });
    test('volume', () => {
      expect(player.volume).toBe(videoElement.volume);
      player.volume = 1;
      expect(player.volume).toBe(1);
      expect(player.volume).toBe(videoElement.volume);
      videoElement.volume = 0.3;
      expect(player.volume).toBe(0.3);
      expect(player.volume).toBe(videoElement.volume);
    });
    test('defaultMuted', () => {
      expect(player.defaultMuted).toBe(false);
      expect(getAttr(videoElement, 'muted')).toBe(null);
      expect(videoElement.defaultMuted).toBe(false);
      player.defaultMuted = true;
      expect(player.defaultMuted).toBe(true);
      expect(videoElement.defaultMuted).toBe(true);
      expect(getAttr(videoElement, 'muted')).toBe('');
      videoElement.defaultMuted = false;
      expect(player.defaultMuted).toBe(false);
      expect(getAttr(videoElement, 'muted')).toBe(null);
    });
    test('muted', () => {
      expect(player.muted).toBe(false);
      player.muted = true;
      expect(player.muted).toBe(true);
      expect(player.muted).toBe(videoElement.muted);
      videoElement.muted = false;
      expect(player.muted).toBe(false);
      expect(player.muted).toBe(videoElement.muted);
    });
    test('currentTime', () => {
      expect(player.currentTime).toBe(videoElement.currentTime);
      expect(player.currentTime).toBe(player.__dispatcher.kernel.currentTime);
      player.currentTime = 99;
      expect(player.currentTime).toBe(99);
      expect(player.currentTime).toBe(player.__dispatcher.kernel.currentTime);
    });
    test('src', done => {
      const url = 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4';
      player.src = url;
      setTimeout(() => {
        expect(player.src).toBe(url);
        expect(videoElement.src).toBe(player.src);
        done();
      }, 0);
    });
    test('autoplay', () => {
      player.autoplay = true;
      expect(player.autoplay).toBe(true);
      expect(videoElement.autoplay).toBe(true);
      player.autoplay = false;
      expect(player.autoplay).toBe(false);
      expect(videoElement.autoplay).toBe(false);
      videoElement.autoplay = true;
      expect(player.autoplay).toBe(true);
      expect(videoElement.autoplay).toBe(true);
    });
    test('controls', () => {
      player.controls = true;
      expect(player.controls).toBe(true);
      expect(videoElement.controls).toBe(true);
      player.controls = false;
      expect(player.controls).toBe(false);
      expect(videoElement.controls).toBe(false);
      videoElement.controls = true;
      expect(player.controls).toBe(true);
      expect(videoElement.controls).toBe(true);
    });
    test('loop', () => {
      player.loop = true;
      expect(player.loop).toBe(true);
      expect(videoElement.loop).toBe(true);
      player.loop = false;
      expect(player.loop).toBe(false);
      expect(videoElement.loop).toBe(false);
      videoElement.loop = true;
      expect(player.loop).toBe(true);
      expect(videoElement.loop).toBe(true);
    });
    test('preload', () => {
      expect(player.preload).toBe('auto');
      expect(videoElement.preload).toBe('auto');
      player.preload = 'none';
      expect(player.preload).toBe('none');
      expect(videoElement.preload).toBe('none');
      player.preload = 'auto';
      expect(player.preload).toBe('auto');
      expect(videoElement.preload).toBe('auto');
    });
    describe('width', () => {
      test('player set', () => {
        player.width = 100;
        expect(player.width).toBe(100);
        expect(videoElement.width).toBe(100);
      });
      test('video set', () => {
        videoElement.width = 10;
        expect(player.width).toBe(10);
        expect(videoElement.width).toBe(10);
      });
      test('if videoConfig is not ready', () => {
        player.__dispatcher.videoConfigReady = false;
        player.preload = 'metadata';
        expect(player.preload).toBe('metadata');
        expect(videoElement.preload).toBe('auto');
      });
      test('set percentage', () => {
        player.width = '50%';
        expect(player.width).toBe('50%');
        expect(videoElement.width).toBe(50);
      });
      test('set pixel', () => {
        player.width = '50px';
        expect(player.width).toBe('50px');
        expect(videoElement.width).toBe(50);
      });
      test('sth wrong', () => {
        player.width = 'n%';
        expect(player.width).toBe(undefined);
        expect(videoElement.width).toBe(0);
      });
    });
    describe('height', () => {
      test('player set', () => {
        player.height = 100;
        expect(player.height).toBe(100);
        expect(videoElement.height).toBe(100);
      });
      test('video set', () => {
        videoElement.height = 10;
        expect(player.height).toBe(10);
        expect(videoElement.height).toBe(10);
      });
      test('if videoConfig is not ready', () => {
        player.__dispatcher.videoConfigReady = false;
        player.height = 20;
        expect(player.height).toBe(20);
        expect(videoElement.height).toBe(10);
      });
      test('set percentage', () => {
        player.height = '50%';
        expect(player.height).toBe('50%');
        expect(videoElement.height).toBe(50);
      });
      test('set pixel', () => {
        player.height = '50px';
        expect(player.height).toBe('50px');
        expect(videoElement.height).toBe(50);
      });
      test('sth wrong', () => {
        player.height = 'n%';
        expect(player.height).toBe(undefined);
        expect(videoElement.height).toBe(0);
      });
    });
    test('crossorigin', () => {
      expect(player.crossOrigin).toBe('');
      expect(videoElement.crossOrigin).toBe('');
      player.crossOrigin = 'use-credentials';
      expect(player.crossOrigin).toBe('use-credentials');
      expect(videoElement.crossOrigin).toBe('use-credentials');
      videoElement.crossOrigin = 'anonymous';
      expect(player.crossOrigin).toBe('anonymous');
      expect(videoElement.crossOrigin).toBe('anonymous');
    });
    test('poster', () => {
      expect(player.poster).toBe('');
      expect(videoElement.poster).toBe('');
      const url = 'https://www.baidu.com/';
      player.poster = url;
      expect(player.poster).toBe(url);
      expect(videoElement.poster).toBe(url);
    });
    test('playsinline', () => {
      expect(player.playsInline).toBe(false);
      expect(getAttr(videoElement, 'playsinline')).toBe(null);
      expect(getAttr(videoElement, 'webkit-playsinline')).toBe(null);
      expect(getAttr(videoElement, 'x5-video-player-type')).toBe(null);
      player.playsInline = true;
      expect(player.playsInline).toBe(true);
      expect(getAttr(videoElement, 'playsinline')).toBe('');
      expect(getAttr(videoElement, 'webkit-playsinline')).toBe('');
      expect(getAttr(videoElement, 'x5-video-player-type')).toBe('h5');
      videoElement.playsInline = false;
      expect(player.playsInline).toBe(false);
      expect(getAttr(videoElement, 'playsinline')).toBe('');
      expect(getAttr(videoElement, 'webkit-playsinline')).toBe('');
      expect(getAttr(videoElement, 'x5-video-player-type')).toBe('h5');
    });
    test('playsinline with videoconfigready = false', () => {
      player.__dispatcher.videoConfigReady = false;
      player.playsInline = true;
      expect(player.playsInline).toBe(true);
      expect(getAttr(videoElement, 'playsinline')).toBe(null);
      expect(getAttr(videoElement, 'webkit-playsinline')).toBe(null);
      expect(getAttr(videoElement, 'x5-video-player-type')).toBe(null);
    });
    test('get playsinline when playsInline of videoElement is undefined', () => {
      videoElement.playsInline = undefined;
      expect(player.playsInline).toBe(false);
    });
    test('x5VideoPlayerFullScreen', () => {
      expect(player.x5VideoPlayerFullScreen).toBe(false);
      expect(getAttr(videoElement, 'x5-video-player-fullscreen')).toBe(null);
      player.x5VideoPlayerFullScreen = true;
      expect(player.x5VideoPlayerFullScreen).toBe(true);
      expect(getAttr(videoElement, 'x5-video-player-fullscreen')).toBe('true');
      player.__dispatcher.videoConfigReady = false;
      player.x5VideoPlayerFullScreen = false;
      expect(player.x5VideoPlayerFullScreen).toBe(false);
      expect(getAttr(videoElement, 'x5-video-player-fullscreen')).toBe('true');
    });
    test('xWebkitAirplay', () => {
      expect(player.xWebkitAirplay).toBe(false);
      expect(getAttr(videoElement, 'x-webkit-airplay')).toBe(null);
      player.xWebkitAirplay = true;
      expect(player.xWebkitAirplay).toBe(true);
      expect(getAttr(videoElement, 'x-webkit-airplay')).toBe('true');
      setAttr(videoElement, 'x-webkit-airplay', undefined);
      expect(player.xWebkitAirplay).toBe(false);
      expect(getAttr(videoElement, 'x-webkit-airplay')).toBe(null);
    });
    test('x5VideoOrientation', () => {
      expect(player.x5VideoOrientation).toBe(null);
      expect(getAttr(videoElement, 'x5-video-orientation')).toBe(null);
      player.x5VideoOrientation = 'landscape';
      expect(player.x5VideoOrientation).toBe('landscape');
      expect(getAttr(videoElement, 'x5-video-orientation')).toBe('landscape');
    });
    test('playbackRate', () => {
      expect(player.playbackRate).toBe(videoElement.playbackRate);
      player.playbackRate = 2;
      expect(player.playbackRate).toBe(videoElement.playbackRate);
      expect(player.playbackRate).toBe(2);
      videoElement.playbackRate = 3;
      expect(player.playbackRate).toBe(videoElement.playbackRate);
      expect(player.playbackRate).toBe(3);
    });
    test('defaultPlaybackRate', () => {
      expect(player.defaultPlaybackRate).toBe(videoElement.defaultPlaybackRate);
      player.defaultPlaybackRate = 2;
      expect(player.defaultPlaybackRate).toBe(videoElement.defaultPlaybackRate);
      expect(player.defaultPlaybackRate).toBe(2);
      videoElement.defaultPlaybackRate = 3;
      expect(player.defaultPlaybackRate).toBe(videoElement.defaultPlaybackRate);
      expect(player.defaultPlaybackRate).toBe(3);
    });
    test('disableRemotePlayback', () => {
      expect(player.disableRemotePlayback).toBe(videoElement.disableRemotePlayback);
      player.disableRemotePlayback = true;
      expect(player.disableRemotePlayback).toBe(true);
      expect(videoElement.disableRemotePlayback).toBe(true);
      videoElement.disableRemotePlayback = false;
      expect(videoElement.disableRemotePlayback).toBe(false);
      expect(player.disableRemotePlayback).toBe(false);
    });
    videoReadOnlyProperties.forEach(key => {
      test(key, () => {
        expect(player[key]).toBe(videoElement[key]);
      });
    });
    describe('autoload', async () => {
      let loadCount;
      let resolveFn;
      beforeAll(() => {
        Chimee.install({
          name: 'autoloadtest',
          events: {
            load () {
              resolveFn(++loadCount);
            }
          }
        });
      });
      beforeEach(() => {
        loadCount = 0;
        player.use('autoloadtest');
      });
      test('default autoload', () => {
        expect(player.autoload).toBe(true);
      });
      test('autoload is false', () => {
        player.autoload = false;
        player.src = 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4';
        expect(loadCount).toBe(0);
      });
      test('autoload is true', async () => {
        player.autoload = true;
        const waiter = new Promise(resolve => {resolveFn = resolve;});
        player.src = 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4';
        await waiter;
        expect(loadCount).toBe(1);
      });
      test('_autoloadVideoSrcAtFirst', async () => {
        player = new Chimee({
          // 播放地址
          src: 'http://cdn.toxicjohann.com/lostStar.mp4',
          // 直播:live 点播：vod
          type: 'vod',
          // 编解码容器
          box: 'native',
          // dom容器
          wrapper: 'body',
          plugin: ['autoloadtest'],
          events: {},
          autoload: false
        });
        await player.ready;
        const waiter = new Promise(resolve => {resolveFn = resolve;});
        player.load('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
        await waiter;
        expect(loadCount).toBe(1);
      });
    });
  });

  describe('videoMethods', () => {
    test('canPlayType', () => {
      expect(typeof player.canPlayType('video/mp4')).toBe('string');
    });
  });

  test('destroy', () => {
    expect(player.destroyed).toBe(false);
    expect(() => player.destroy()).not.toThrow();
    expect(player.destroyed).toBe(true);
  });

  describe('$attr & $css', () => {
    let player;
    beforeEach(() => {
      player = new Chimee({
        // 播放地址
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        // 直播:live 点播：vod
        type: 'vod',
        // 编解码容器
        box: 'native',
        // dom容器
        wrapper: 'body',
        plugin: [],
        events: {}
      });
    });
    afterEach(() => {
      player.destroy();
    });
    test('attr', () => {
      player.attr('container', 'data-id', 1);
      expect(player.attr('container', 'data-id')).toBe('1');
    });
    test('css', () => {
      expect(player.css('container', 'z-index')).toBe('1');
      player.css('container', 'z-index', 10);
      expect(player.css('container', 'z-index')).toBe('10');
    });
    test('attr on video property', () => {
      player.__dispatcher.videoConfigReady = false;
      player.attr('video', 'controls', false);
      expect(player.attr('video', 'controls')).toBe(null);
      player.__dispatcher.videoConfigReady = true;
      player.attr('video', 'controls', false);
      expect(player.attr('video', 'controls')).toBe(null);
    });
    test('attr on video property but it is not in videoconfig', () => {
      player.__dispatcher.videoConfigReady = false;
      player.attr('video', 'data-controls', true);
      expect(player.attr('video', 'data-controls')).toBe(null);
      player.__dispatcher.videoConfigReady = true;
      player.attr('video', 'data-controls', true);
      expect(player.attr('video', 'data-controls')).toBe('true');
    });
  });
  test('focus', () => {
    const player = new Chimee(document.createElement('div'));
    expect(() => player.focus()).not.toThrow();
  });
  test('stop fullscreen', () => {
    const plugin = {
      name: 'stopFullScreen',
      events: {
        beforeFullScreen () {
          return false;
        }
      }
    };
    Chimee.install(plugin);
    const player = new Chimee({
      wrapper: document.createElement('div'),
      plugin: ['stopFullScreen']
    });
    expect(player.fullScreen()).toBe(false);
  });
});

describe('isFullScreen and fullScreenElement', () => {
  let player;
  beforeEach(() => {
    player = new Chimee(document.createElement('div'));
  });
  test('default to be false', () => {
    expect(player.isFullScreen).toBe(false);
    expect(player.fullScreenElement).toBe();
  });
  test('wrapper', () => {
    const target = player.__dispatcher.dom.wrapper;
    document.fullscreenElement = target;
    const fn1 = jest.fn();
    player.$watch('isFullScreen', fn1);
    const fn2 = jest.fn();
    player.$watch('fullScreenElement', fn2);
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(player.isFullScreen).toBe(true);
    expect(player.__dispatcher.dom[player.fullScreenElement]).toBe(target);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).lastCalledWith(true, false);
    expect(fn2).lastCalledWith('wrapper', undefined);
  });
  test('container', () => {
    const target = player.__dispatcher.dom.container;
    document.fullscreenElement = target;
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(player.isFullScreen).toBe(true);
    expect(player.__dispatcher.dom[player.fullScreenElement]).toBe(target);
  });
  test('video', () => {
    const target = player.__dispatcher.dom.videoElement;
    document.fullscreenElement = target;
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(player.isFullScreen).toBe(true);
    expect(player.__dispatcher.dom[player.fullScreenElement + 'Element']).toBe(target);
  });
  test('plugin', () => {
    const player = new Chimee({
      wrapper: document.createElement('div'),
      plugin: ['stopFullScreen']
    });
    const target = player.stopFullScreen.$dom;
    document.fullscreenElement = target;
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(player.isFullScreen).toBe(true);
    expect(player.fullScreenElement).toBe(target);
  });

  describe('$video, $container and $wrapper', () => {
    const wrapper = document.createElement('div');
    player = new Chimee(wrapper);
    const container = wrapper.childNodes[0];
    const video = container.childNodes[0];
    const elements = [video, container, wrapper];
    ['video', 'container', 'wrapper'].forEach((key, index) => {
      test('key', () => {
        Log.data.warn = [];
        expect(player['$' + key]).toEqual(elements[index]);
        expect(Log.data.warn.length).toBe(1);
        Log.data.warn = [];
      });
    });
  });
});
