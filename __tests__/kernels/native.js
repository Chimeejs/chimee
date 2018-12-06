import NativeVideoKernel from 'kernels/native';
import { bind } from 'toxic-utils';

describe('chimee-kernel native/index.js', () => {
  let originCreateElement;
  beforeAll(() => {
    originCreateElement = global.document.createElement;
    global.document.createElement = function(tag) {
      const element = bind(originCreateElement, document)(tag);
      if (tag === 'video') {
        element.play = function() {};
        element.pause = function() {};
      }
      return element;
    };
  });

  afterAll(() => {
    global.document.createElement = originCreateElement;
  });
  test('must provide videoElment', () => {
    expect(() => new NativeVideoKernel()).toThrow('You must pass in an legal video element but not undefined');
  });

  test('init with videoelement', () => {
    expect(() => new NativeVideoKernel(document.createElement('video'))).not.toThrow();
  });

  test('function do not throw error', () => {
    const nativeVideoKernel = new NativeVideoKernel(document.createElement('video'));
    expect(() => NativeVideoKernel.isSupport()).not.toThrow();
    expect(() => nativeVideoKernel.play()).not.toThrow();
    expect(() => nativeVideoKernel.pause()).not.toThrow();
    expect(() => nativeVideoKernel.refresh()).not.toThrow();
    expect(() => nativeVideoKernel.attachMedia()).not.toThrow();
    expect(() => nativeVideoKernel.seek(1)).not.toThrow();
    expect(() => nativeVideoKernel.load('abc')).not.toThrow();
    expect(() => nativeVideoKernel.startLoad('def')).not.toThrow();
    expect(() => nativeVideoKernel.startLoad('abc')).not.toThrow();
    expect(() => nativeVideoKernel.stopLoad()).not.toThrow();
    expect(() => nativeVideoKernel.destroy()).not.toThrow();
    delete nativeVideoKernel.video;
    expect(() => nativeVideoKernel.destroy()).not.toThrow();
  });
});
