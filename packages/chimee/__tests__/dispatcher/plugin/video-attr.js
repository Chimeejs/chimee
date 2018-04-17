import Plugin from 'dispatcher/plugin';
import Chimee from 'index';
import { getAttr } from 'chimee-helper';

describe("plugin's video attribute", () => {
  let dispatcher;
  let player;
  let plugin;

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

    plugin = new Plugin({ id: 'normal' }, dispatcher);
  });

  afterEach(() => {
    player.destroy();
    dispatcher = null;
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
