import Chimee from 'index';
import flv from 'chimee-kernel-flv';

function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

describe('changeKernel', () => {
  test('property should change', async () => {
    const originFn = global.URL.revokeObjectURL;
    global.URL.revokeObjectURL = () => {};
    const chimee = new Chimee({
      wrapper: document.createElement('div'),
      isLive: false,
      box: 'native',
      autoload: false,
    });
    // test migrateKernelEvent
    chimee.on('heartbeat', () => {});
    // test bindEventOnVideo
    chimee.on('play', () => {});
    expect(chimee.isLive).toBe(false);
    expect(chimee.box).toBe('native');
    expect(chimee.preset).toEqual({});
    expect(chimee.kernels).toBe(undefined);
    chimee.load('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', {
      isLive: true,
      box: 'flv',
      kernels: {
        flv,
      },
    });
    await Promise.resolve();
    expect(chimee.isLive).toBe(true);
    expect(chimee.box).toBe('flv');
    expect(chimee.preset).toEqual({ flv });
    expect(chimee.kernels).toEqual({ flv });
    chimee.load('', {
      isLive: false,
      box: 'native',
      kernels: [],
    });
    await sleep(100);
    expect(chimee.isLive).toBe(false);
    expect(chimee.box).toBe('native');
    // 因为 preset 不为人知，所以这方面保持逻辑正确即可
    expect(chimee.preset).toEqual({ flv });
    expect(chimee.kernels).toEqual([]);
    global.URL.revokeObjectURL = originFn;
  });
});

