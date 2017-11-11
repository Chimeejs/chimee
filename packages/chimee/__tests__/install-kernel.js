import Chimee from 'index';
import chimeeKernelFlv from 'chimee-kernel-flv';
import { Log } from 'chimee-helper';
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
    expect(Log.data.warn[0]).toEqual([ 'chimee', 'You have alrady install a kenrle on flv, and now we will replace it' ]);
    Log.data.warn = [];
    Chimee.uninstallKernel('flv');
  });
});

describe('_createkernel', () => {
  beforeAll(() => {
    Chimee.installKernel('flv', chimeeKernelFlv);
  });
  afterEach(() => {
    Log.data.warn = [];
  });
  afterAll(() => {
    Chimee.uninstallKernel('flv', chimeeKernelFlv);
  });
  test('array kernels', () => {
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
    expect(Log.data.warn.length).toBe(0);
  });
  test('error array kernels', () => {
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
    expect(Log.data.warn[0]).toEqual([ 'chimee', 'You have not installed kernel for hls.' ]);
  });
  test('object kernels', () => {
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
    expect(Log.data.warn.length).toBe(0);
  });
});
