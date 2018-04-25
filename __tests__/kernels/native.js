import NativeVideoKernel from 'kernels/native';

describe('chimee-kernel native/index.js', () => {
  test('must provide videoElment', () => {
    expect(() => new NativeVideoKernel()).toThrow('You must pass in an legal video element but not undefined');
  });
});
