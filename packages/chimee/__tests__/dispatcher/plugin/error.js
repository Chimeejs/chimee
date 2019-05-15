import Plugin from 'dispatcher/plugin';
import Chimee from 'index';

describe("plugin's error", () => {
  let dispatcher;
  let player;
  let error;

  beforeEach(() => {
    player = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      isLive: false,
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      plugin: [],
      events: {},
    });

    dispatcher = player.dispatcher;

    error = new Error('i am an error');
  });

  afterEach(() => {
    player.destroy();
    dispatcher = null;
  });

  test('beforeCreate', () => {
    expect(() => new Plugin({
      id: 'err',
      beforeCreate() {
        throw error;
      },
    }, dispatcher)).toThrow(error.message);
  });

  test('create', () => {
    expect(() => new Plugin({
      id: 'err',
      create() {
        throw error;
      },
    }, dispatcher)).toThrow(error.message);
  });

  test('init', () => {
    const plugin = new Plugin({
      id: 'err',
      init() {
        throw error;
      },
    }, dispatcher);
    expect(() => plugin.runInitHook({})).toThrow(error.message);
  });

  test('inited', () => {
    const plugin = new Plugin({
      id: 'err',
      inited() {
        throw error;
      },
    }, dispatcher);
    expect(() => plugin.runInitedHook({})).toThrow(error.message);
  });

  test('inited with promise', async () => {
    const plugin = new Plugin({
      id: 'err',
      inited() {
        return new Promise(() => { throw error; });
      },
    }, dispatcher);
    let catcherr = false;
    try {
      await plugin.runInitedHook({});
    } catch (err) {
      catcherr = true;
      expect(err).toBe(error);
    }
    expect(catcherr).toBe(true);
  });

  test('inited with reject', async () => {
    const error = new Error('test');
    const plugin = new Plugin({
      id: 'err',
      inited() {
        return Promise.reject(error);
      },
    }, dispatcher);
    expect(plugin.runInitedHook({})).rejects.toBe(error);
  });
});
