import Plugin from 'dispatcher/plugin';
import Chimee from 'index';

describe("plugin's method", () => {
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
      wrapper: 'body',
      plugin: [],
      events: {},
    });

    dispatcher = player.__dispatcher;
  });

  afterEach(() => {
    player.destroy();
    dispatcher = null;
  });

  test('if you do not pass an object into events, we just omit it', () => {
    const plugin = new Plugin({
      id: 'e1',
      events: [ 1 ],
    }, dispatcher);
    expect(plugin.__events).toEqual({});
    plugin.$destroy();
  });

  test('normal events', () => {
    const fn1 = jest.fn();
    const plugin = new Plugin({
      id: 'e2',
      events: {
        a: fn1,
        b: fn1,
      },
    }, dispatcher);
    expect(plugin.__events.a).toEqual([ fn1 ]);
    expect(plugin.__events.b).toEqual([ fn1 ]);
    dispatcher.binder.buses.plugin.events.a.main.e2[0]();
    dispatcher.binder.buses.plugin.events.b.main.e2[0]();
    expect(fn1).toHaveBeenCalledTimes(2);
    plugin.__events.ahahah = 1;
    plugin.$destroy();
    expect(plugin.__events).toBe();
    expect(dispatcher.binder.buses.plugin.events.a).toEqual({ main: {} });
    expect(dispatcher.binder.buses.plugin.events.b).toEqual({ main: {} });
  });

  test('we will throw error if you contain something is not a function in the events.', () => {
    expect(() => new Plugin({
      id: 'e3',
      events: {
        a: 1,
      },
    }, dispatcher)).toThrow('plugins events hook must bind with Function');
  });

  test('$emit', () => {
    const plugin = new Plugin({
      id: 'e',
    }, dispatcher);
    expect(() => plugin.$emit()).toThrow('emit key parameter must be String');
    plugin.$emit('click');
    plugin.$emit('xx_click');
    plugin.$destroy();
  });

  test('$emitSync', () => {
    const plugin = new Plugin({
      id: 'e',
    }, dispatcher);
    expect(() => plugin.$emitSync()).toThrow('emitSync key parameter must be String');
    expect(plugin.$emitSync('hello')).toBe(true);
    plugin.$destroy();
  });

  test('$once', () => {
    const plugin = new Plugin({
      id: 'e',
    }, dispatcher);
    const fn = jest.fn();
    dispatcher.order = [ 'e' ];
    dispatcher.plugins = {
      e: plugin,
    };
    plugin.$once('hi', fn);
    expect(plugin.__dispatcher.binder.buses.plugin.events.hi.main.e.length).toBe(1);
    expect(plugin.$emitSync('hi', 1)).toBe(true);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).lastCalledWith(1);
  });
});
