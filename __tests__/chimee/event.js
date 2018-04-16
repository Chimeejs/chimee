import Chimee from 'index';

describe('chimee event method', () => {
  let player;
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
});
