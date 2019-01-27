import Chimee from 'index';
import chimeeKernelFlv from 'chimee-kernel-flv';
import { chimeeLog } from 'chimee-helper-log';
describe('installKernel', () => {
  test('normal install & uninstall', () => {
    Chimee.installKernel('flv', chimeeKernelFlv);
    expect(Chimee.hasInstalledKernel('flv')).toBe(true);
    Chimee.uninstallKernel('flv', chimeeKernelFlv);
    expect(Chimee.hasInstalledKernel('flv')).toBe(false);
  });

  test('object install', () => {
    Chimee.installKernel({ flv: chimeeKernelFlv });
    expect(Chimee.hasInstalledKernel('flv')).toBe(true);
    Chimee.uninstallKernel('flv', chimeeKernelFlv);
    expect(Chimee.hasInstalledKernel('flv')).toBe(false);
  });

  test('error kenel', () => {
    expect(() => Chimee.installKernel({ flv: 0 })).toThrow('The kernel you install on flv must be a Function, but not number');
  });

  test('replace warning', () => {
    Chimee.installKernel({ flv: chimeeKernelFlv });
    Chimee.installKernel({ flv: chimeeKernelFlv });
    expect(chimeeLog.data.warn[0]).toEqual([ 'chimee', 'You have alrady install a kernel on flv, and now we will replace it' ]);
    chimeeLog.data.warn = [];
    Chimee.uninstallKernel('flv');
  });
});

describe('createkernel', () => {
  let originURLrevoke;
  beforeAll(() => {
    Chimee.installKernel('flv', chimeeKernelFlv);
  });
  beforeEach(() => {
    chimeeLog.data.warn = [];
    chimeeLog.data.error = [];
    originURLrevoke = global.URL.revokeObjectURL;
    global.URL.revokeObjectURL = () => {};
  });

  afterEach(() => {
    global.URL.revokeObjectURL = originURLrevoke;
  });
  afterAll(() => {
    Chimee.uninstallKernel('flv', chimeeKernelFlv);
  });

  test('array<string> kernels', () => {
    expect(() => new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: [ 'flv' ],
    })).not.toThrow();
    expect(chimeeLog.data.warn.length).toBe(0);
  });

  test('error array<string> kernels', () => {
    expect(() => new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: [ 'hls' ],
    })).not.toThrow();
    expect(chimeeLog.data.warn[0]).toEqual([ 'chimee', 'You have not installed kernel for hls.' ]);
  });

  test('error type in array kernels', () => {
    expect(() => new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: [ 0 ],
    })).not.toThrow();
    expect(chimeeLog.data.warn[0]).toEqual([ 'chimee', 'If you pass in kernels as array, you must pass in kernels in string or function, but not number' ]);
  });

  test('object:[key: F] kernels', () => {
    expect(() => new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: {
        flv: chimeeKernelFlv,
      },
    })).not.toThrow();
    expect(chimeeLog.data.warn.length).toBe(0);
  });

  test('array<SingleKernelConfig> kernels, handler is string', () => {
    const flvConfig = {
      handler: 'flv',
      stashSize: 77,
    };
    const chimee = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: [ flvConfig ],
    });
    expect(chimeeLog.data.warn.length).toBe(0);
    expect(chimee.presetConfig.flv).toEqual(flvConfig);
  });

  test('array<SingleKernelConfig> kernels, handler is function', () => {
    const flvConfig = {
      name: 'flv',
      handler: chimeeKernelFlv,
      stashSize: 77,
    };
    const chimee = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: [ flvConfig ],
    });
    expect(chimeeLog.data.warn.length).toBe(0);
    expect(chimee.presetConfig.flv).toEqual(flvConfig);
  });

  test('array<SingleKernelConfig> kernels, handler is error type', () => {
    const flvConfig = {
      handler: 0,
      stashSize: 77,
    };
    expect(() => new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: [ flvConfig ],
    })).not.toThrow();
    expect(chimeeLog.data.warn[0]).toEqual([ 'chimee', "When you pass in an SingleKernelConfig in Array, you must clarify it's handler, we only support handler in string or function but not number" ]);
  });

  test('error array<SingleKernelConfig> kernels, handler is string', () => {
    const hlsConfig = {
      handler: 'hls',
      stashSize: 77,
    };
    expect(() => new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: [ hlsConfig ],
    })).not.toThrow();
    expect(chimeeLog.data.warn[0]).toEqual([ 'chimee', 'You have not installed kernel for hls.' ]);
  });

  test('object<SingleKernelConfig> kernels, handler is function', () => {
    const flvConfig = {
      handler: chimeeKernelFlv,
      stashSize: 77,
    };
    const chimee = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'flv',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: {
        flv: flvConfig,
      },
    });
    expect(chimeeLog.data.warn.length).toBe(0);
    expect(chimee.presetConfig.flv).toEqual(flvConfig);
  });

  test('array<SingleKernelConfig> kernels, handler is function without name', () => {
    class flv extends chimeeKernelFlv {}
    const flvConfig = {
      handler: flv,
      stashSize: 77,
    };
    const chimee = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'flv',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: [ flvConfig ],
    });
    expect(chimeeLog.data.warn.length).toBe(0);
    expect(chimee.presetConfig.flv).toEqual(flvConfig);
  });

  test('object<SingleKernelConfig> kernels, handler is string', () => {
    const flvConfig = {
      handler: 'flv',
      stashSize: 77,
    };
    const chimee = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'flv',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: {
        flv: flvConfig,
      },
    });
    expect(chimeeLog.data.warn.length).toBe(0);
    expect(chimee.presetConfig.flv).toEqual(flvConfig);
  });

  test('error object<SingleKernelConfig> kernels, handler is string', () => {
    const hlsConfig = {
      handler: 'hls',
      stashSize: 77,
    };
    expect(() => new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'flv',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: {
        hls: hlsConfig,
      },
    })).toThrow("We can't find video kernel for flv. Please check your config and make sure it's installed or provided");
    expect(chimeeLog.data.warn[0]).toEqual([ 'chimee', 'You have not installed kernel for hls.' ]);
  });

  test('object<SingleKernelConfig> kernels, handler is error type', () => {
    const flvConfig = {
      handler: 0,
      stashSize: 77,
    };
    expect(() => new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'flv',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: {
        flv: flvConfig,
      },
    })).toThrow("We can't find video kernel for flv. Please check your config and make sure it's installed or provided");
    expect(chimeeLog.data.warn[0]).toEqual([ 'chimee', "When you pass in an SingleKernelConfig in Object, you must clarify it's handler, we only support handler in string or function but not number" ]);
  });

  test('error type in object kernels', () => {
    expect(() => new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      kernels: {
        flv: 0,
      },
    })).not.toThrow();
    expect(chimeeLog.data.warn[0]).toEqual([ 'chimee', 'If you pass in kernels as object, you must pass in kernels in string or function, but not number' ]);
  });
});
