import Chimee from 'index';
import { isBoolean, isNumber, isString, Log } from 'chimee-helper';

describe("plugin's watch function", () => {
  let player;
  let fn;

  beforeAll(() => {
    const normalWatch = {
      name: 'normalWatch',
      data: {
        test: 1,
      },
      create() {
        this.unwatch = this.$watch('test', fn);
        this.$watch([ 'array' ], fn);
      },
    };
    Chimee.install(normalWatch);
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

    fn = jest.fn();
  });

  afterEach(() => {
    player.destroy();
  });

  test('normal watch', () => {
    player.use('normalWatch');
    player.normalWatch.test = 2;
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).lastCalledWith(2, 1);
    player.normalWatch.unwatch();
    player.normalWatch.test = 3;
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('videoConfig watch', () => {
    const videoConfigWatch = {
      name: 'videoConfigWatch',
      data: {
        test: 1,
      },
      create() {
        this.$videoConfig._realDomAttr.forEach(key => {
          this.$watch(key, fn);
        });
      },
    };
    Chimee.install(videoConfigWatch);
    player.use('videoConfigWatch');
    let index = 0;
    player.__dispatcher.videoConfig._realDomAttr.forEach(key => {
      if ([ 'src' ].indexOf(key) > -1) return;
      if (key === 'preload') {
        const origin = player[key];
        player[key] = '123';
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith('none', origin);
        return;
      }
      if (isBoolean(player[key])) {
        player[key] = !player[key];
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith(player[key], !player[key]);
      }
      if (isNumber(player[key])) {
        player[key] = key === 'volume'
          ? player[key] / 2
          : player[key] + 1;
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith(player[key], key === 'volume'
          ? player[key] * 2
          : player[key] - 1
        );
      }
      if (isString(player[key])) {
        const origin = player[key];
        player[key] = '123';
        expect(fn).toHaveBeenCalledTimes(++index);
        expect(fn).lastCalledWith('123', origin);
      }
    });
  });

  test('only accept string or array', () => {
    const errorWatch = {
      name: 'errorWatch',
      data: {
        test: 1,
      },
      create() {
        this.$watch(1, fn);
      },
    };
    Chimee.install(errorWatch);
    expect(() => new Chimee({
      wrapper: document.createElement('div'),
      plugin: [ 'errorWatch' ],
    })).toThrow('$watch only accept string and Array<string> as key to find the target to spy on, but not 1, whose type is number');
  });

  test('unwatch nothing', () => {
    player.use('normalWatch');
    player.normalWatch.__unwatchHandlers.pop();
    player.normalWatch.__unwatchHandlers.pop();
    player.normalWatch.unwatch();
  });

  describe('deep watch', () => {
    beforeAll(() => {
      const deepWatch = {
        name: 'deepWatch',
        data: {
          test: {
            foo: 1,
          },
          arr: [ 1, 2, 3 ],
        },
        create() {
          this.$watch('test', fn, { deep: true });
          this.$watch('arr', fn, { deep: true });
        },
      };
      Chimee.install(deepWatch);
    });

    beforeEach(() => {
      player.use('deepWatch');
    });

    test('$set object', () => {
      player.deepWatch.$set(player.deepWatch.test, 'bar', 2);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.test, player.deepWatch.test);
      expect(player.deepWatch.test).toEqual({ foo: 1, bar: 2 });
    });

    test('$set object exist', () => {
      player.deepWatch.$set(player.deepWatch.test, 'foo', 2);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.test, player.deepWatch.test);
      expect(player.deepWatch.test).toEqual({ foo: 2 });
    });

    test('$del object', () => {
      player.deepWatch.$del(player.deepWatch.test, 'foo');
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.test, player.deepWatch.test);
      expect(player.deepWatch.test).toEqual({});
    });

    test('$del object did not exist', () => {
      player.deepWatch.$del(player.deepWatch.test, 'bar');
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.test, player.deepWatch.test);
      expect(player.deepWatch.test).toEqual({ foo: 1 });
    });

    test('$set array', () => {
      player.deepWatch.$set(player.deepWatch.arr, 3, 4);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.arr, player.deepWatch.arr);
      expect(player.deepWatch.arr).toEqual([ 1, 2, 3, 4 ]);
    });

    test('$del array', () => {
      player.deepWatch.$del(player.deepWatch.arr, 2);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).lastCalledWith(player.deepWatch.arr, player.deepWatch.arr);
      expect(player.deepWatch.arr).toEqual([ 1, 2, undefined ]);
    });

    test('destroy watcher', () => {
      expect(() => player.deepWatch.$destroy()).not.toThrow();
    });
  });

  describe('without deep watch', () => {
    beforeAll(() => {
      const withoutDeepWatch = {
        name: 'withoutDeepWatch',
        data: {
          test: {
            foo: 1,
          },
          arr: [ 1, 2, 3 ],
        },
        create() {
          this.$watch('test', fn);
          this.$watch('arr', fn);
        },
      };
      Chimee.install(withoutDeepWatch);
    });

    beforeEach(() => {
      player.use('withoutDeepWatch');
      Log.data.warn = [];
    });

    test('$set', () => {
      player.$set(player.withoutDeepWatch.test, 'foo', 2);
      expect(player.withoutDeepWatch.test.foo).toBe(2);
      expect(Log.data.warn).toEqual([[ 'chimee', '{"foo":1} has not been deep watch. There is no need to use $set.' ]]);
    });

    test('$del', () => {
      player.$del(player.withoutDeepWatch.test, 'foo');
      expect(player.withoutDeepWatch.test.foo).toBe();
      expect(Log.data.warn).toEqual([[ 'chimee', '{"foo":1} has not been deep watch. There is no need to use $del.' ]]);
    });

    test('$set only support array and object', () => {
      expect(() => player.$set(1, '123', 2)).toThrow();
    });

    test('$del only support array and object', () => {
      expect(() => player.$del(1, '123')).toThrow();
    });
  });
});
