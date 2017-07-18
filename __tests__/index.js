import Chimee from 'index';
import {Log, getAttr} from 'chimee-helper';
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
          box: 'mp4',
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
    beforeEach(() => {
      player = new Chimee({
        // 播放地址
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        // 直播:live 点播：vod
        type: 'vod',
        // 编解码容器
        box: 'mp4',
        // dom容器
        wrapper: 'body',
        plugin: [],
        events: {}
      });
    });
    test('buffered', () => {
      expect(typeof player.buffered.start).toBe('function');
      expect(typeof player.buffered.end).toBe('function');
      expect(typeof player.buffered.length).toBe('number');
    });
    test('duration', () => {
      expect(player.duration).toBe(player.__dispatcher.dom.videoElement.duration);
      expect(() => {player.duration = 40;}).toThrow();
    });
    test('volume', () => {
      expect(player.volume).toBe(player.__dispatcher.dom.videoElement.volume);
      player.volume = 1;
      expect(player.volume).toBe(1);
      expect(player.volume).toBe(player.__dispatcher.dom.videoElement.volume);
    });
    test('defaultMuted', () => {
      expect(player.defaultMuted).toBe(false);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'muted')).toBe(null);
      expect(player.__dispatcher.dom.videoElement.defaultMuted).toBe(false);
      player.defaultMuted = true;
      expect(player.defaultMuted).toBe(true);
      expect(player.__dispatcher.dom.videoElement.defaultMuted).toBe(true);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'muted')).toBe('');
    });
    test('muted', () => {
      expect(player.muted).toBe(false);
      player.muted = true;
      expect(player.muted).toBe(true);
      expect(player.muted).toBe(player.__dispatcher.dom.videoElement.muted);
    });
    test('currentTime', () => {
      expect(player.currentTime).toBe(player.__dispatcher.dom.videoElement.currentTime);
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
        expect(player.__dispatcher.dom.videoElement.src).toBe(player.src);
        done();
      }, 0);
    });
    test('autoplay', () => {
      player.autoplay = true;
      expect(player.autoplay).toBe(true);
      expect(player.__dispatcher.dom.videoElement.autoplay).toBe(true);
      player.autoplay = false;
      expect(player.autoplay).toBe(false);
      expect(player.__dispatcher.dom.videoElement.autoplay).toBe(false);
    });
    test('controls', () => {
      player.controls = true;
      expect(player.controls).toBe(true);
      expect(player.__dispatcher.dom.videoElement.controls).toBe(true);
      player.controls = false;
      expect(player.controls).toBe(false);
      expect(player.__dispatcher.dom.videoElement.controls).toBe(false);
    });
    test('loop', () => {
      player.loop = true;
      expect(player.loop).toBe(true);
      expect(player.__dispatcher.dom.videoElement.loop).toBe(true);
      player.loop = false;
      expect(player.loop).toBe(false);
      expect(player.__dispatcher.dom.videoElement.loop).toBe(false);
    });
    test('preload', () => {
      expect(player.preload).toBe();
      expect(player.__dispatcher.dom.videoElement.preload).toBe('');
      player.preload = 'none';
      expect(player.preload).toBe('none');
      expect(player.__dispatcher.dom.videoElement.preload).toBe('none');
      player.preload = 'auto';
      expect(player.preload).toBe('auto');
      expect(player.__dispatcher.dom.videoElement.preload).toBe('auto');
    });
    test('width', () => {
      player.width = 100;
      expect(player.width).toBe(100);
      expect(player.__dispatcher.dom.videoElement.width).toBe(100);
    });
    test('height', () => {
      player.height = 100;
      expect(player.height).toBe(100);
      expect(player.__dispatcher.dom.videoElement.height).toBe(100);
    });
    test('crossorigin', () => {
      player.crossorigin = 'use-credentials';
      expect(player.crossorigin).toBe('use-credentials');
      expect(player.__dispatcher.dom.videoElement.crossOrigin).toBe('use-credentials');
    });
    test('poster', () => {
      expect(player.poster).toBe('');
      expect(player.__dispatcher.dom.videoElement.poster).toBe('');
      const url = 'https://www.baidu.com/';
      player.poster = url;
      expect(player.poster).toBe(url);
      expect(player.__dispatcher.dom.videoElement.poster).toBe(url);
    });
    test('playsinline', () => {
      expect(player.playsinline).toBe(false);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'playsinline')).toBe(null);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'webkit-playsinline')).toBe(null);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'x5-video-player-type')).toBe(null);
      player.playsinline = true;
      expect(player.playsinline).toBe(true);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'playsinline')).toBe('true');
      expect(getAttr(player.__dispatcher.dom.videoElement, 'webkit-playsinline')).toBe('true');
      expect(getAttr(player.__dispatcher.dom.videoElement, 'x5-video-player-type')).toBe('h5');
    });
    test('x5VideoPlayerFullScreen', () => {
      expect(player.x5VideoPlayerFullScreen).toBe(false);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'x5-video-player-fullscreen')).toBe(null);
      player.x5VideoPlayerFullScreen = true;
      expect(player.x5VideoPlayerFullScreen).toBe(true);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'x5-video-player-fullscreen')).toBe('true');
    });
    test('xWebkitAirplay', () => {
      expect(player.xWebkitAirplay).toBe(false);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'x-webkit-airplay')).toBe(null);
      player.xWebkitAirplay = true;
      expect(player.xWebkitAirplay).toBe(true);
      expect(getAttr(player.__dispatcher.dom.videoElement, 'x-webkit-airplay')).toBe('true');
    });
    test('x5VideoOrientation', () => {
      expect(player.x5VideoOrientation).toBe();
       expect(getAttr(player.__dispatcher.dom.videoElement, 'x5-video-orientation')).toBe(null);
      player.x5VideoOrientation = 'landscape';
      expect(player.x5VideoOrientation).toBe('landscape');
      expect(getAttr(player.__dispatcher.dom.videoElement, 'x5-video-orientation')).toBe('landscape');
    });
    test('playbackRate', () => {
      expect(player.playbackRate).toBe(player.__dispatcher.dom.videoElement.playbackRate);
      player.playbackRate = 2;
      expect(player.playbackRate).toBe(player.__dispatcher.dom.videoElement.playbackRate);
      expect(player.playbackRate).toBe(2);
    });
    test('defaultPlaybackRate', () => {
      expect(player.defaultPlaybackRate).toBe(player.__dispatcher.dom.videoElement.defaultPlaybackRate);
      player.defaultPlaybackRate = 2;
      expect(player.defaultPlaybackRate).toBe(player.__dispatcher.dom.videoElement.defaultPlaybackRate);
      expect(player.defaultPlaybackRate).toBe(2);
    });
    test('disableRemotePlayback', () => {
      expect(player.__dispatcher.dom.videoElement.disableRemotePlayback).toBe(false);
      expect(player.disableRemotePlayback).toBe(false);
      player.disableRemotePlayback = true;
      expect(player.disableRemotePlayback).toBe(true);
    });
    videoReadOnlyProperties.forEach(key => {
      test(key, () => {
        expect(player[key]).toBe(player.__dispatcher.dom.videoElement[key]);
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
        box: 'mp4',
        // dom容器
        wrapper: 'body',
        plugin: [],
        events: {}
      });
    });
    afterEach(() => {
      player.destroy();
      // dispatcher.dom.__dispatcher.videoConfigReady = false;
      // dispatcher.videoConfigReady = false;
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
      player.attr('video', 'controls', true);
      expect(player.attr('video', 'controls')).toBe(null);
      player.__dispatcher.videoConfigReady = true;
      player.attr('video', 'controls', true);
      expect(player.attr('video', 'controls')).toBe('true');
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

});
