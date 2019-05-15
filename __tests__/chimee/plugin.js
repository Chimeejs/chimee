import Chimee from 'index';

describe('chimee plugin method', () => {
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
      wrapper: document.createElement('div'),
      plugin: [],
      events: {},
    });
  });

  afterEach(() => {
    player.destroy();
    player = null;
  });

  test('use and unsue', () => {
    const normalInstall = {
      name: 'normal install',
      level: 1,
    };
    Chimee.install(normalInstall);

    expect(() => player.use('normalInstall')).not.toThrow();
    expect(() => player.use()).toThrow();
    expect(() => player.unuse('normalInstall')).not.toThrow();
  });
});
