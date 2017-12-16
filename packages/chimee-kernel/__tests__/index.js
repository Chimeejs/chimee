import ChimeeKernel from '../src/index';
import NativeVideoKernel from '../src/native/index';
import { Log } from 'chimee-helper';

describe('chimee-kernel index.js', () => {
  let videoElement;
  beforeEach(() => {
    videoElement = document.createElement('video');
  });
  afterEach(() => {
    videoElement = null;
  });
  test('normal create', () => {
    const config = {
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      box: 'native',
      isLive: false,
      preset: {},
      presetConfig: {},
    };
    const kernel = new ChimeeKernel(videoElement, config);
    expect(kernel.videoElement).toBe(videoElement);
    expect(kernel.box).toBe('native');
    expect(kernel.videoKernel instanceof NativeVideoKernel).toBe(true);
    expect(kernel.config).toEqual(config);
    expect(() => kernel.destroy()).not.toThrow();
  });
  describe('method test', () => {
    let kernel;
    let config;
    beforeEach(() => {
      config = {
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        box: 'native',
        isLive: false,
        preset: {},
        presetConfig: {},
      };
      kernel = new ChimeeKernel(videoElement, config);
      Log.data.warn = [];
      Log.data.error = [];
    });
    afterEach(() => {
      kernel.destroy();
    });
    test('refresh', () => {
      expect(kernel.videoKernel.config.src).toBe(config.src);
      expect(kernel.videoElement.src).toBe('');
      kernel.refresh();
      expect(kernel.videoKernel.config.src).toBe(config.src);
      expect(kernel.videoElement.src).toBe(config.src);
    });
    test('load', () => {
      expect(kernel.videoKernel.config.src).toBe(config.src);
      expect(kernel.videoElement.src).toBe('');
      kernel.load();
      expect(kernel.videoKernel.config.src).toBe(config.src);
      expect(kernel.videoElement.src).toBe(config.src);
    });
    test('seek', () => {
      expect(kernel.videoElement.currentTime).toBe(0);
      kernel.load();
      expect(kernel.videoElement.currentTime).toBe(0);
      kernel.seek(10);
      expect(kernel.videoElement.currentTime).toBe(10);
    });
    test('seek without number', () => {
      const fn = jest.fn();
      kernel.on('error', fn);
      expect(kernel.videoElement.currentTime).toBe(0);
      kernel.load();
      expect(kernel.videoElement.currentTime).toBe(0);
      kernel.seek(true);
      expect(Log.data.error[0]).toEqual([ 'chimee-kernel', 'When you try to seek, you must offer us a number, but not boolean' ]);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(kernel.videoElement.currentTime).toBe(0);
    });
    test('currentTime', () => {
      expect(kernel.videoElement.currentTime).toBe(0);
      expect(kernel.currentTime).toBe(0);
      kernel.load();
      expect(kernel.videoElement.currentTime).toBe(0);
      expect(kernel.currentTime).toBe(0);
      kernel.seek(10);
      expect(kernel.videoElement.currentTime).toBe(10);
      expect(kernel.currentTime).toBe(10);
    });
    test('play & pause', () => {
      const playFn = jest.fn();
      const pauseFn = jest.fn();
      const originPlay = videoElement.play;
      const originPause = videoElement.pause;
      videoElement.play = playFn;
      videoElement.pause = pauseFn;
      kernel.load();
      expect(playFn).toHaveBeenCalledTimes(0);
      expect(pauseFn).toHaveBeenCalledTimes(0);
      kernel.play();
      expect(playFn).toHaveBeenCalledTimes(1);
      expect(pauseFn).toHaveBeenCalledTimes(0);
      kernel.pause();
      expect(playFn).toHaveBeenCalledTimes(1);
      expect(pauseFn).toHaveBeenCalledTimes(1);
      videoElement.play = originPlay;
      videoElement.pause = originPause;
    });
    test('attachMedia', () => {
      expect(() => kernel.attachMedia()).not.toThrow();
    });
    test('event listener', () => {
      const fn = jest.fn();
      kernel.on('error', fn);
      kernel.videoKernel.emit('error', 'test');
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
