import Chimee from 'index';
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
