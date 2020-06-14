import Chimee from 'index';
import { videoReadOnlyProperties } from 'helper/const';
import { getAttr, setAttr } from 'chimee-helper';

describe('chimee video attributes', () => {
  let player;
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
      events: {},
    });

    videoElement = player.__dispatcher.dom.videoElement;
  });

  afterEach(() => {
    player.destroy();
    player = null;
    videoElement = null;
  });

  test('buffered', () => {
    expect(typeof player.buffered.start).toBe('function');
    expect(typeof player.buffered.end).toBe('function');
    expect(typeof player.buffered.length).toBe('number');
  });

  test('duration', () => {
    expect(player.duration).toBe(videoElement.duration);
    expect(() => { player.duration = 40; }).toThrow();
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
    player.preload = null;
    expect(player.preload).toBe('none');
    expect(videoElement.preload).toBe('none');
    player.preload = 'metadata';
    expect(player.preload).toBe('metadata');
    expect(videoElement.preload).toBe('metadata');
    // need to run in browser
    // player.preload = '';
    // expect(player.preload).toBe('auto');
    // expect(videoElement.preload).toBe('auto');
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
      expect(videoElement.height).toBe(100);
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
    player.poster = 123;
    expect(player.poster).toBe('');
    expect(videoElement.poster).toBe('');
    const url = 'https://www.baidu.com/';
    player.poster = url;
    expect(player.poster).toBe(url);
    expect(videoElement.poster).toBe(url);
    player.__dispatcher.videoConfigReady = false;
    player.poster = 123;
    expect(player.poster).toBe('');
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
    expect(getAttr(videoElement, 'x5-playsinline')).toBe('');
    videoElement.playsInline = false;
    expect(player.playsInline).toBe(false);
    // expect(getAttr(videoElement, 'playsinline')).toBe(null);
    // expect(getAttr(videoElement, 'webkit-playsinline')).toBe(null);
    // expect(getAttr(videoElement, 'x5-video-player-type')).toBe(null);
  });

  test('playsinline with videoconfigready = false', () => {
    player.__dispatcher.videoConfigReady = false;
    player.playsInline = true;
    expect(player.playsInline).toBe(true);
    expect(getAttr(videoElement, 'playsinline')).toBe(null);
    expect(getAttr(videoElement, 'webkit-playsinline')).toBe(null);
    expect(getAttr(videoElement, 'x5-playsinline')).toBe(null);
  });

  test('x5VideoPlayerType', () => {
    expect(player.x5VideoPlayerType).toBe();
    expect(getAttr(videoElement, 'x5-video-player-type')).toBe(null);
    player.x5VideoPlayerType = 'h5-page';
    expect(player.x5VideoPlayerType).toBe('h5-page');
    expect(getAttr(videoElement, 'x5-video-player-type')).toBe('h5-page');
    player.x5VideoPlayerType = false;
    expect(player.x5VideoPlayerType).toBe();
    expect(getAttr(videoElement, 'x5-video-player-type')).toBe(null);
  });

  test('x5VideoPlayerType  with videoconfigready = false', () => {
    expect(player.x5VideoPlayerType).toBe();
    expect(getAttr(videoElement, 'x5-video-player-type')).toBe(null);
    player.__dispatcher.videoConfigReady = false;
    player.x5VideoPlayerType = 'h5-page';
    expect(player.x5VideoPlayerType).toBe();
    expect(getAttr(videoElement, 'x5-video-player-type')).toBe(null);
  });

  test('get playsinline when playsInline of videoElement is undefined', () => {
    videoElement.playsInline = undefined;
    expect(player.playsInline).toBe(false);
  });

  test('x5VideoPlayerFullscreen', () => {
    expect(player.x5VideoPlayerFullscreen).toBe(false);
    expect(getAttr(videoElement, 'x5-video-player-fullscreen')).toBe(null);
    player.x5VideoPlayerFullscreen = true;
    expect(player.x5VideoPlayerFullscreen).toBe(true);
    expect(getAttr(videoElement, 'x5-video-player-fullscreen')).toBe('true');
    player.__dispatcher.videoConfigReady = false;
    player.x5VideoPlayerFullscreen = false;
    expect(player.x5VideoPlayerFullscreen).toBe(false);
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
});
