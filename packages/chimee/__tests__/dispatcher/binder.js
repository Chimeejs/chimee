import Chimee from 'index';

describe('dispatcher/binder', () => {
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

  test('binder will clear kernel events which is forget to clear by upper layer', () => {
    player.__dispatcher.binder.on({
      target: 'kernel',
      name: 'heartbeat',
      id: 'illegal',
      fn: () => {},
    });
    expect(() => player.destroy()).not.toThrow();
  });

  test('binder triggersync isEventEmitalbe backup', () => {
    expect(() => player.__dispatcher.binder.triggerSync({})).not.toThrow();
  });

  test('binder emitsync isEventEmitalbe backup', () => {
    expect(() => player.__dispatcher.binder.emitSync({ name: 'hello' })).not.toThrow();
  });

  test('prettifyEventParameter without function', () => {
    expect(() => {
      player.__dispatcher.binder.on({
        name: 'what',
        target: 'plugin',
        stage: 'main',
      });
    }).toThrow('You must provide a function to handle with event what, but not undefined');
  });
});
