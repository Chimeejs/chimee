import Chimee from 'index';
import flv from 'chimee-kernel-flv';

describe('changeKernel', () => {
  test('property should change', async () => {
    const chimee = new Chimee({
      wrapper: document.createElement('div'),
      isLive: false,
      box: 'native',
      autoload: false,
    });
    expect(chimee.isLive).toBe(false);
    expect(chimee.box).toBe('native');
    expect(chimee.preset).toEqual({});
    expect(chimee.kernels).toBe(undefined);
    chimee.load('', {
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
    await Promise.resolve();
    expect(chimee.isLive).toBe(false);
    expect(chimee.box).toBe('native');
    // 因为 preset 不为人知，所以这方米啊保持逻辑正确即可
    expect(chimee.preset).toEqual({ flv });
    expect(chimee.kernels).toEqual([]);
  });
});

