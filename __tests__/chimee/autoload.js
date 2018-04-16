import Chimee from 'index';

describe('chimee autoload attributes', () => {
  let player;
  let loadCount;
  let resolveFn;

  beforeAll(() => {
    Chimee.install({
      name: 'autoloadtest',
      events: {
        load() {
          console.log('load????');
          resolveFn(++loadCount);
        },
      },
    });
  });

  beforeEach(() => {
    player = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      isLive: false,
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: 'body',
      plugin: [],
      events: {},
    });

    loadCount = 0;
    player.use('autoloadtest');
  });

  afterEach(() => {
    player.destroy();
    player = null;
  });

  test('default autoload', () => {
    expect(player.autoload).toBe(true);
  });

  test('autoload is false', () => {
    player.autoload = false;
    player.src = 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4';
    expect(loadCount).toBe(0);
  });

  test('autoload is true', async () => {
    player.autoload = true;
    const waiter = new Promise(resolve => { resolveFn = resolve; });
    player.src = 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4';
    await waiter;
    expect(loadCount).toBe(1);
  });

  test('_autoloadVideoSrcAtFirst', async () => {
    player = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: 'body',
      plugin: [ 'autoloadtest' ],
      events: {},
      autoload: false,
    });
    await player.ready;
    const waiter = new Promise(resolve => { resolveFn = resolve; });
    player.load('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    await waiter;
    expect(loadCount).toBe(1);
  });
});
