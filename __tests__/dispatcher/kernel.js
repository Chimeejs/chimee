import ChimeeKernel from 'dispatcher/kernel';
import NativeVideoKernel from 'kernels/native';
import { chimeeLog } from 'chimee-helper-log';
import ChimeeKernelFlv from 'chimee-kernel-flv';

describe('chimee kernel index.js', () => {
  let videoElement;
  let originURLrevoke;

  beforeEach(() => {
    videoElement = document.createElement('video');
    originURLrevoke = global.URL.revokeObjectURL;
    global.URL.revokeObjectURL = () => {};
  });

  afterEach(() => {
    videoElement = null;
    global.URL.revokeObjectURL = originURLrevoke;
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
      chimeeLog.data.warn = [];
      chimeeLog.data.error = [];
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
      expect(kernel.videoElement.currentTime).toBe(0);
      kernel.load();
      expect(kernel.videoElement.currentTime).toBe(0);
      kernel.seek(true);
      expect(chimeeLog.data.error[0]).toEqual([ 'chimee', 'When you try to seek, you must offer us a number, but not boolean' ]);
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

    test('stopLoad', () => {
      kernel.load();
      expect(videoElement.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
      kernel.seek(10);
      expect(kernel.videoElement.currentTime).toBe(10);
      expect(kernel.currentTime).toBe(10);
      kernel.stopLoad();
      expect(videoElement.src).toBe('');
    });

    test('startLoad', () => {
      kernel.load();
      expect(videoElement.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
      kernel.seek(10);
      expect(kernel.videoElement.currentTime).toBe(10);
      expect(kernel.currentTime).toBe(10);
      kernel.stopLoad();
      expect(videoElement.src).toBe('');
      kernel.startLoad();
      expect(videoElement.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
      expect(kernel.videoElement.currentTime).toBe(10);
      expect(kernel.currentTime).toBe(10);
    });

    test('event listener', () => {
      const fn = jest.fn();
      kernel.on('test', fn);
      kernel.videoKernel.emit('test', 'test');
      expect(fn).toHaveBeenCalledTimes(1);
      kernel.off('test', fn);
      kernel.videoKernel.emit('test', 'test');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('getMp4Kernel, provide nothing and got native', () => {
      const videoKernel = kernel.getMp4Kernel();
      expect(videoKernel).toBe(NativeVideoKernel);
    });

    test('getMp4Kernel, provide illegal class and got native', () => {
      const videoKernel = kernel.getMp4Kernel({});
      expect(videoKernel).toBe(NativeVideoKernel);
    });

    test('getMp4Kernel, provide legal class and got native', () => {
      class MP4 {
        static isSupport() {
          return false;
        }
      }
      const videoKernel = kernel.getMp4Kernel(MP4);
      expect(videoKernel).toBe(NativeVideoKernel);
    });

    test('getMp4Kernel, provide legal class and got mp4', () => {
      class MP4 {
        static isSupport() {
          return true;
        }
      }
      const videoKernel = kernel.getMp4Kernel(MP4);
      expect(videoKernel).toBe(MP4);
    });
  });

  test('flv create', () => {
    const config = {
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      box: 'flv',
      isLive: false,
      preset: {
        flv: ChimeeKernelFlv,
      },
      presetConfig: {},
    };
    const kernel = new ChimeeKernel(videoElement, config);
    expect(kernel.videoElement).toBe(videoElement);
    expect(kernel.box).toBe('flv');
    expect(kernel.videoKernel instanceof ChimeeKernelFlv).toBe(true);
    expect(kernel.config).toEqual(config);
    expect(() => kernel.destroy()).not.toThrow();
  });

  test('mp4 create', () => {
    const config = {
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      box: 'mp4',
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

  test('not support box', () => {
    const config = {
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      box: 'hahah',
      isLive: false,
      preset: {},
      presetConfig: {},
    };
    expect(() => new ChimeeKernel(videoElement, config)).toThrow('We currently do not support box hahah, please contact us through https://github.com/Chimeejs/chimee/issues.');
  });

  test('auto box detect', () => {
    const config = {
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      isLive: false,
      preset: {},
      presetConfig: {},
    };
    const kernel = new ChimeeKernel(videoElement, config);
    expect(kernel.videoElement).toBe(videoElement);
    expect(kernel.box).toBe('native');
    expect(kernel.videoKernel instanceof NativeVideoKernel).toBe(true);
    expect(() => kernel.destroy()).not.toThrow();
  });

  test('auto box detect', () => {
    const config = {
      src: 'http://cdn.toxicjohann.com/lostStar',
      isLive: false,
      preset: {},
      presetConfig: {},
    };
    const kernel = new ChimeeKernel(videoElement, config);
    expect(kernel.videoElement).toBe(videoElement);
    expect(kernel.box).toBe('native');
    expect(kernel.videoKernel instanceof NativeVideoKernel).toBe(true);
    expect(() => kernel.destroy()).not.toThrow();
  });

  test('must start with a video element', () => {
    expect(() => new ChimeeKernel()).toThrow('You must pass in an video element to the chimee-kernel');
  });

  test('must pass in with legal videoKernel', () => {
    const config = {
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      box: 'flv',
      isLive: false,
      preset: {},
      presetConfig: {},
    };
    expect(() => new ChimeeKernel(videoElement, config)).toThrow("We can't find video kernel for flv. Please check your config and make sure it's installed or provided");
  });
});
