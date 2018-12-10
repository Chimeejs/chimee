import { runRejectableQueue } from 'helper/utils';
describe('runRejectableQueue', async () => {
  test('empty', () => {
    expect(runRejectableQueue([])).resolves.toBe();
  });
  test('no function', () => {
    expect(runRejectableQueue([ 1, 2, 3 ])).resolves.toBe();
  });
  test('no function but has a false', () => {
    expect(runRejectableQueue([ 1, 2, false, 3 ])).rejects.toMatch('stop');
  });
  test('functions', () => {
    expect(runRejectableQueue([
      () => {},
      () => {},
      () => {},
    ])).resolves.toBe();
  });
  test('functions and promise', () => {
    expect(runRejectableQueue([
      () => {},
      Promise.resolve(),
      () => new Promise(resolve => resolve()),
    ])).resolves.toBe();
  });
  test('function and promise.reject', () => {
    expect(runRejectableQueue([
      () => {},
      Promise.reject(),
      () => new Promise(resolve => resolve()),
    ])).rejects.toMatch('stop');
  });
  test('function return promise.reject', () => {
    expect(runRejectableQueue([
      () => {},
      Promise.resolve(),
      () => new Promise((resolve, reject) => reject()),
    ])).rejects.toMatch('stop');
  });
  test('order', async () => {
    const checkArray = [];
    await expect(runRejectableQueue([
      () => checkArray.push(1),
      () => checkArray.push(2),
      () => false,
      () => checkArray.push(3),
      () => checkArray.push(4),
    ])).rejects.toMatch('stop');
    expect(checkArray).toEqual([ 1, 2 ]);
  });
  test('error catch', async () => {
    const error = new Error('i am an error');
    await expect(runRejectableQueue([
      () => {},
      () => {},
      () => { throw error; },
    ])).rejects.toBe(error);
  });
  test('reject info catch', async () => {
    await expect(runRejectableQueue([
      () => {},
      () => Promise.reject('abc'),
      () => {},
    ])).rejects.toBe('abc');
  });
});
