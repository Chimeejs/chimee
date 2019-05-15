import Plugin from 'dispatcher/plugin';
import Chimee from 'index';
import { chimeeLog } from 'chimee-helper-log';

describe("plugin's data and computed data", () => {
  let dispatcher;
  let player;

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
  });

  afterEach(() => {
    player.destroy();
    dispatcher = null;
  });

  test('normal data', () => {
    const plugin = new Plugin({
      id: 'd1',
      data: {
        a: 1,
      },
    }, dispatcher);
    expect(plugin.a).toBe(1);
    plugin.$destroy();
    expect(plugin.a).toBe(1);
  });

  test('when you have nothing in data, we do nothing', () => {
    const plugin = new Plugin({
      id: 'd2',
      data: [],
    }, dispatcher);
    plugin.$destroy();
  });

  describe('computed', () => {
    let dForComputed;
    let plugin;
    beforeEach(() => {
      plugin = new Plugin({
        id: 'c2',
        name: 'c2',
        computed: {
          a() { return 1; },
          b: {
            set(val) {
              return val;
            },
          },
          c: 2,
          d: {
            get() { return dForComputed; },
            set(val) { dForComputed = val; },
          },
          e: {
            get(value) { return value; },
          },
        },
      }, dispatcher);
    });

    test('wrong computed member', () => {
      expect(plugin.c).toBe();
      expect(chimeeLog.data.warn[0]).toEqual([ 'Dispatcher.plugin', "Wrong computed member 'c' defination in Plugin c2" ]);
    });

    test('one function return normal getter', () => {
      expect(plugin.a).toBe(1);
    });

    test('one function with setter is ok', () => {
      expect(plugin.b).toBe();
      plugin.b = 1;
      expect(plugin.b).toBe(1);
    });

    test('you can build your setter getter', () => {
      expect(plugin.d).toBe();
      plugin.d = 1;
      expect(plugin.d).toBe(1);
    });

    test('we can handle value for you', () => {
      expect(plugin.e).toBe();
      plugin.e = 3;
      expect(plugin.e).toBe(3);
    });
  });
});
