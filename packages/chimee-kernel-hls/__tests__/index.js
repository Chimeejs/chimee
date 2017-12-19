import ChimeeKernelHls from '../src/index.js';
import { isFunction } from 'toxic-predicate-functions';
import { Log } from 'chimee-helper';
describe('chimee-kernel-hls', () => {
  let videoElement;
  beforeEach(() => {
    videoElement = document.createElement('video');
    Log.data.error = [];
  });
  afterEach(() => {
    videoElement = null;
  });
  test('fit in with videoKernel', () => {
    expect(ChimeeKernelHls.isSupport()).toBe(false);
    const config = {
      src: '',
      box: 'hls',
      isLive: false,
    };
    const customConfig = {
      debug: false,
    };
    const hlsKernel = new ChimeeKernelHls(videoElement, config, customConfig);
    expect(hlsKernel.config).toEqual(config);
    expect(hlsKernel.video).toBe(videoElement);
    expect(isFunction(hlsKernel.load)).toBe(true);
    expect(isFunction(hlsKernel.play)).toBe(true);
    expect(isFunction(hlsKernel.pause)).toBe(true);
    expect(isFunction(hlsKernel.refresh)).toBe(true);
    expect(isFunction(hlsKernel.attachMedia)).toBe(true);
    expect(isFunction(hlsKernel.seek)).toBe(true);
    expect(isFunction(hlsKernel.destroy)).toBe(true);
    expect(isFunction(hlsKernel.on)).toBe(true);
    expect(isFunction(hlsKernel.off)).toBe(true);
    expect(isFunction(hlsKernel.once)).toBe(true);
    expect(isFunction(hlsKernel.emit)).toBe(true);
    expect(Log.data.error.length).toBe(1);
    hlsKernel.destroy();
  });
  describe('method test', () => {
    let hlsKernel;
    let config;
    beforeEach(() => {
      videoElement = document.createElement('video');
      config = {
        src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
        box: 'hls',
        isLive: false,
      };
      hlsKernel = new ChimeeKernelHls(videoElement, config, {});
    });
    afterEach(() => {
      hlsKernel.destroy();
      videoElement = null;
      config = undefined;
    });
    // test('refresh', async () => {
    //   expect(hlsKernel.config.src).toBe(config.src);
    //   expect(hlsKernel.video.src).toBe('');
    //   await hlsKernel.refresh();
    //   expect(hlsKernel.config.src).toBe(config.src);
    //   expect(hlsKernel.video.src).toBe(config.src);
    // });
    // test('load', () => {
    //   expect(hlsKernel.config.src).toBe(config.src);
    //   expect(hlsKernel.video.src).toBe('');
    //   hlsKernel.load();
    //   expect(hlsKernel.config.src).toBe(config.src);
    //   expect(hlsKernel.video.src).toBe(config.src);
    // });
    // test('seek', () => {
    //   expect(hlsKernel.video.currentTime).toBe(0);
    //   hlsKernel.load();
    //   expect(hlsKernel.video.currentTime).toBe(0);
    //   hlsKernel.seek(10);
    //   expect(hlsKernel.video.currentTime).toBe(10);
    // });
    // test('seek without number', () => {
    //   const fn = jest.fn();
    //   hlsKernel.on('error', fn);
    //   expect(hlsKernel.video.currentTime).toBe(0);
    //   hlsKernel.load();
    //   expect(hlsKernel.video.currentTime).toBe(0);
    //   hlsKernel.seek(true);
    //   expect(Log.data.error[0]).toEqual(['chimee-kernel', 'When you try to seek, you must offer us a number, but not boolean']);
    //   expect(fn).toHaveBeenCalledTimes(1);
    //   expect(hlsKernel.video.currentTime).toBe(0);
    // });
    // test('currentTime', () => {
    //   expect(hlsKernel.video.currentTime).toBe(0);
    //   expect(hlsKernel.currentTime).toBe(0);
    //   hlsKernel.load();
    //   expect(hlsKernel.video.currentTime).toBe(0);
    //   expect(hlsKernel.currentTime).toBe(0);
    //   hlsKernel.seek(10);
    //   expect(hlsKernel.video.currentTime).toBe(10);
    //   expect(hlsKernel.currentTime).toBe(10);
    // });
    // test('play & pause', () => {
    //   const playFn = jest.fn();
    //   const pauseFn = jest.fn();
    //   const originPlay = videoElement.play;
    //   const originPause = videoElement.pause;
    //   videoElement.play = playFn;
    //   videoElement.pause = pauseFn;
    //   hlsKernel.load();
    //   expect(playFn).toHaveBeenCalledTimes(0);
    //   expect(pauseFn).toHaveBeenCalledTimes(0);
    //   hlsKernel.play();
    //   expect(playFn).toHaveBeenCalledTimes(1);
    //   expect(pauseFn).toHaveBeenCalledTimes(0);
    //   hlsKernel.pause();
    //   expect(playFn).toHaveBeenCalledTimes(1);
    //   expect(pauseFn).toHaveBeenCalledTimes(1);
    //   videoElement.play = originPlay;
    //   videoElement.pause = originPause;
    // });
    // test('attachMedia', () => {
    //   expect(() => hlsKernel.attachMedia()).not.toThrow();
    // });
  });
});
