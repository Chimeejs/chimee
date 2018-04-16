import Chimee from 'index';
import esFullscreen from 'es-fullscreen';

describe('chimee fullscreen', () => {
  let player;
  let wrapper;
  let originURLrevoke;

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

    wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    player = new Chimee(wrapper);
    originURLrevoke = global.URL.revokeObjectURL;
    global.URL.revokeObjectURL = () => {};
  });

  afterEach(() => {
    global.URL.revokeObjectURL = originURLrevoke;
    player.exitFullscreen();
    wrapper.parentNode.removeChild(wrapper);
    player.destroy();
    player = null;
  });

  test('wrapper', () => {
    const target = player.__dispatcher.dom.wrapper;
    const fn1 = jest.fn();
    player.$watch('isFullscreen', fn1);
    const fn2 = jest.fn();
    player.$watch('fullscreenElement', fn2);
    player.requestFullscreen('wrapper');
    expect(player.isFullscreen).toBe(true);
    expect(player.__dispatcher.dom[player.fullscreenElement]).toBe(target);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).lastCalledWith(true, false);
    expect(fn2).lastCalledWith('wrapper', undefined);
  });

  test('container', () => {
    const target = player.__dispatcher.dom.container;
    player.requestFullscreen('container');
    expect(player.isFullscreen).toBe(true);
    expect(player.__dispatcher.dom[player.fullscreenElement]).toBe(target);
  });

  test('video', () => {
    const target = player.__dispatcher.dom.videoElement;
    player.requestFullscreen('video');
    expect(player.isFullscreen).toBe(true);
    expect(player.__dispatcher.dom[player.fullscreenElement + 'Element']).toBe(target);
  });

  test('fullscreen event and fullscreenchange event', () => {
    const fn = jest.fn();
    const changeFn = jest.fn();
    player.on('fullscreen', fn);
    player.on('fullscreenchange', changeFn);
    player.fullscreen();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(changeFn).toHaveBeenCalledTimes(1);
    player.fullscreen(false);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(changeFn).toHaveBeenCalledTimes(2);
  });

  test('stop fullscreen', () => {
    const plugin = {
      name: 'stopFullscreen',
      events: {
        beforeFullscreen() {
          return false;
        },
      },
    };
    Chimee.install(plugin);
    const player = new Chimee({
      wrapper: document.createElement('div'),
      plugin: [ 'stopFullscreen' ],
    });
    expect(player.fullscreen()).toBe(false);
  });

  test('default to be false', () => {
    expect(player.isFullscreen).toBe(false);
    expect(player.fullscreenElement).toBe();
  });

  test('wrapper', () => {
    const target = player.__dispatcher.dom.wrapper;
    const fn1 = jest.fn();
    player.$watch('isFullscreen', fn1);
    const fn2 = jest.fn();
    player.$watch('fullscreenElement', fn2);
    player.requestFullscreen('wrapper');
    expect(player.isFullscreen).toBe(true);
    expect(player.__dispatcher.dom[player.fullscreenElement]).toBe(target);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).lastCalledWith(true, false);
    expect(fn2).lastCalledWith('wrapper', undefined);
  });

  test('container', () => {
    const target = player.__dispatcher.dom.container;
    player.requestFullscreen('container');
    expect(player.isFullscreen).toBe(true);
    expect(player.__dispatcher.dom[player.fullscreenElement]).toBe(target);
  });

  test('video', () => {
    const target = player.__dispatcher.dom.videoElement;
    player.requestFullscreen('video');
    expect(player.isFullscreen).toBe(true);
    expect(player.__dispatcher.dom[player.fullscreenElement + 'Element']).toBe(target);
  });

  test('plugin', () => {
    const wrapper = document.createElement('div');
    const player = new Chimee({
      wrapper,
      plugin: [ 'stopFullscreen' ],
    });
    document.body.appendChild(wrapper);
    const target = player.stopFullscreen.$dom;
    esFullscreen.open(target);
    expect(player.isFullscreen).toBe(true);
    expect(player.fullscreenElement).toBe(target);
    document.body.removeChild(wrapper);
  });
});
