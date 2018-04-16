import Chimee from 'index';

describe('chimee life', () => {
  test('normal build', () => {
    expect(() => new Chimee({
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
    })
    ).not.toThrow();
  });

  test('string build', () => {
    let chimee;
    const element = document.createElement('div');
    element.id = 'wrapper';
    document.body.appendChild(element);
    expect(() => {
      chimee = new Chimee('#wrapper');
    }).not.toThrow();
    document.body.removeChild(element);
    chimee.destroy();
  });

  test('error build', () => {
    expect(() => new Chimee({})).toThrow();
    expect(() => new Chimee(1)).toThrow();
  });

  test('destroy', () => {
    const player = new Chimee({
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

    expect(player.destroyed).toBe(false);
    expect(() => player.destroy()).not.toThrow();
    expect(player.destroyed).toBe(true);
    expect(player.pause()).rejects.toThrow();
  });
});
