import Chimee from 'index';
describe('kernel-events', () => {
  let chimee;
  beforeEach(() => {
    chimee = new Chimee({
      wrapper: document.createElement('div'),
    });
  });
  afterEach(() => {
    chimee.destroy();
  });
  test('heartbeat check', () => {
    const fn = jest.fn();
    chimee.on('heartbeat', fn);
    chimee.__dispatcher.kernel.emit('heartbeat');
    expect(fn).toHaveBeenCalledTimes(1);
  });
  test('mediaInfo check', () => {
    const fn = jest.fn();
    chimee.on('mediaInfo', fn);
    chimee.__dispatcher.kernel.emit('mediaInfo');
    expect(fn).toHaveBeenCalledTimes(1);
  });
  test('error check', () => {
    const fn = jest.fn();
    chimee.on('error', fn);
    expect(() => chimee.__dispatcher.kernel.emit('error')).toThrow();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
