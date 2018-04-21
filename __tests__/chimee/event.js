import Chimee from 'index';
import { bind } from 'chimee-helper';

describe('chimee event method', () => {
  let player;
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

  beforeEach(() => {
    player = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: 'body',
      plugin: [],
      events: {},
    });
  });

  afterEach(() => {
    player.destroy();
    player = null;
  });

  test('emitSync', () => {
    expect(() => player.emitSync(1)).toThrow();
    expect(() => player.emitSync('click')).not.toThrow();
  });

  test('emit', async () => {
    expect(() => player.emit(1)).toThrow();
    await expect(() => player.emit('click')).not.toThrow();
    await expect(() => player.emit('play')).not.toThrow();
  });

  test('once', () => {
    expect(() => player.once('hello', function() {})).not.toThrow();
  });

  test('on', () => {
    expect(() => player.on('hello', function() {})).not.toThrow();
    expect(() => player.on('hello', 1)).toThrow();
    expect(() => player.on(1, function() {})).toThrow();
  });

  test('off', () => {
    expect(() => player.off('hello', function() {})).not.toThrow();
  });

  test('off from real dom', () => {
    expect(() => player.on('click', function() {})).not.toThrow();
    expect(() => player.off('click', function() {})).not.toThrow();
  });

  test('passive event', () => {
    expect(() => player.on('touchmove', function() {})).not.toThrow();
    expect(() => player.off('touchmove', function() {})).not.toThrow();
  });

  test('self processor event in emit', () => {
    const fn = jest.fn();
    player.on('beforeSilentLoad', fn);
    player.emit('silentLoad');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
