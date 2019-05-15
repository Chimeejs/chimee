import { runRejectableQueue, runStoppableQueue, deletePropertyIfItIsEmpty, transObjectAttrIntoArray, isSupportedKernelType } from 'helper/utils';
describe('runRejectableQueue', () => {
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
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject(),
      () => new Promise(resolve => resolve()),
    ])).rejects.toMatch('stop');
  });
  test('function return promise.reject', () => {
    expect(runRejectableQueue([
      () => {},
      Promise.resolve(),
      // eslint-disable-next-line prefer-promise-reject-errors
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
    const error = new Error('test');
    await expect(runRejectableQueue([
      () => {},
      () => Promise.reject(error),
      () => {},
    ])).rejects.toBe(error);
  });
});

test('runStoppableQueue', async () => {
  expect(runStoppableQueue([])).toBe(true);
  expect(runStoppableQueue([ 1, 2, 3 ])).toBe(true);
  expect(runStoppableQueue([ 1, 2, false, 3 ])).toBe(false);
  expect(runStoppableQueue([
    () => {},
    () => {},
    () => {},
  ])).toBe(true);
  expect(runStoppableQueue([
    () => {},
    Promise.resolve(),
    () => new Promise(resolve => resolve()),
  ])).toBe(true);
  const checkArray = [];
  await expect(runStoppableQueue([
    () => checkArray.push(1),
    () => checkArray.push(2),
    () => false,
    () => checkArray.push(3),
    () => checkArray.push(4),
  ])).toBe(false);
  expect(checkArray).toEqual([ 1, 2 ]);
});

describe('deletePropertyIfItIsEmpty', () => {
  expect(() => deletePropertyIfItIsEmpty()).not.toThrow();
  const obj = { a: {} };
  deletePropertyIfItIsEmpty(obj, 'a');
  expect(typeof obj.a).toBe('undefined');
  const obj1 = { a: { b: 2 } };
  deletePropertyIfItIsEmpty(obj1, 'a');
  expect(typeof obj1.a).not.toBe('undefined');
});

test('transObjectAttrIntoArray', () => {
  expect(transObjectAttrIntoArray({})).toEqual([]);
  expect(transObjectAttrIntoArray({ 1: 'a', 2: 'b' })).toEqual([ 'a', 'b' ]);
  expect(transObjectAttrIntoArray({ 1: 'a', 2: 'b' }, (b, a) => +a - +b)).toEqual([ 'b', 'a' ]);
});

test('isSupportedKernelType', () => {
  expect(isSupportedKernelType('flv')).toBe(true);
  expect(isSupportedKernelType('hls')).toBe(true);
  expect(isSupportedKernelType('mp4')).toBe(true);
  expect(isSupportedKernelType('')).toBe(false);
});
