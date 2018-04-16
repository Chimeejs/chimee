import Chimee from 'index';

describe('$attr & $css', () => {
  let player;
  beforeAll(() => {
    Chimee.install({
      name: 'test',
    });
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

  test('attr', () => {
    player.attr('container', 'data-id', 1);
    expect(player.attr('container', 'data-id')).toBe('1');
  });

  test('css', () => {
    expect(player.css('container', 'z-index')).toBe('');
    player.use('test');
    expect(player.css('container', 'z-index')).toBe('1');
    player.css('container', 'z-index', 10);
    expect(player.css('container', 'z-index')).toBe('10');
  });

  test('attr on video property', () => {
    player.__dispatcher.videoConfigReady = false;
    player.attr('video', 'controls', false);
    expect(player.attr('video', 'controls')).toBe(null);
    player.__dispatcher.videoConfigReady = true;
    player.attr('video', 'controls', false);
    expect(player.attr('video', 'controls')).toBe(null);
  });

  test('attr on video property but it is not in videoconfig', () => {
    player.__dispatcher.videoConfigReady = false;
    player.attr('video', 'data-controls', true);
    expect(player.attr('video', 'data-controls')).toBe(null);
    player.__dispatcher.videoConfigReady = true;
    player.attr('video', 'data-controls', true);
    expect(player.attr('video', 'data-controls')).toBe('true');
  });
});
