import Chimee from 'index';
import chimeeKernelFlv from 'chimee-kernel-flv';
test('redudant event bind on video', () => {
  const wrapper = document.createElement('div');
  const fn = jest.fn();
  const cfn = jest.fn();
  const wfn = jest.fn();
  const plugin = {
    name: 'redudantEventBind',
    events: {
      click: fn,
      c_click: cfn,
      w_click: wfn
    }
  };
  Chimee.install(plugin);
  const player = new Chimee({
    wrapper,
    plugin: ['redudantEventBind']
  });
  player.__dispatcher.dom.videoElement.dispatchEvent(new Event('click'));
  expect(fn).toHaveBeenCalledTimes(1);
  player.__dispatcher.dom.container.dispatchEvent(new Event('click'));
  expect(cfn).toHaveBeenCalledTimes(1);
  player.__dispatcher.dom.wrapper.dispatchEvent(new Event('click'));
  expect(wfn).toHaveBeenCalledTimes(1);
});

test('non extendable should not be set on dispatcher.plugins', () => {
  const plugin = {
    name: 'nonextendablePlugins',
    create () {
      expect(this.$plugins).not.toBe();
    }
  };
  Chimee.install(plugin);
  expect(() => new Chimee({
    wrapper: document.createElement('div'),
    plugin: ['nonextendablePlugins']
  })).not.toThrow();
});

test('load should use default preset and kernels if people do not pass one', () => {
  const wrapper = document.createElement('div');
  const chimee = new Chimee({
    src:
      'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
    isLive: false,
    kernels: {
      flv: chimeeKernelFlv
    },
    // 编解码容器
    box: 'flv', // flv hls native
    // dom容器
    wrapper,
  });
  expect(() => chimee.load('http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv')).not.toThrow();
});
