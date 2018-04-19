import Chimee from 'index';

describe("chimee's binder", () => {
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

  test('normal click event on video should trigger', () => {
    const fn = jest.fn();
    const plugin = {
      name: 'normal click event',
      events: {
        click: fn,
      },
    };
    Chimee.install(plugin);
    player.use(plugin.name);
    player.$video.click();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('normal mouseenter event on video should trigger', () => {
    const fn = jest.fn();
    const plugin = {
      name: 'normal mouseenter event',
      events: {
        mouseenter: fn,
      },
    };
    Chimee.install(plugin);
    player.use(plugin.name);
    player.$video.dispatchEvent(new Event('mouseenter'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('mouseenter event outside video should trigger', () => {
    const fn = jest.fn();
    const plugin = {
      name: 'normal mouseenter event outside video',
      events: {
        mouseenter: fn,
      },
    };
    Chimee.install(plugin);
    player.use(plugin.name);
    player.$wrapper.dispatchEvent(new Event('mouseenter'));
    expect(fn).toHaveBeenCalledTimes(0);
  });

  test('mouseenter event on penetrate plugin should trigger', done => {
    const fn = jest.fn();
    const plugin = {
      name: 'mouseenter on penetrate',
      penetrate: true,
      inited() {
        this.$dom.dispatchEvent(new Event('mouseenter'));
      },
      events: {
        mouseenter() {
          fn();
          expect(fn).toHaveBeenCalledTimes(1);
          done();
        },
      },
    };
    Chimee.install(plugin);
    player.use(plugin.name);
  });

  test('mouseleave from inside node to video should not trigger', async () => {
    const fn = jest.fn();
    const rawFn = jest.fn();
    const plugin = {
      name: 'mouseleave from inside node to video',
      penetrate: true,
      events: {
        mouseleave: fn,
      },
    };
    Chimee.install(plugin);
    const { $dom, $video } = await player.use(plugin.name);
    const event = new Event('mouseleave');
    event.relatedTarget = $video;
    $dom.addEventListener('mouseleave', rawFn);
    $dom.dispatchEvent(event);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(rawFn).toHaveBeenCalledTimes(1);
  });

  test('mouseenter video from inside node should not trigger', async () => {
    const fn = jest.fn();
    const rawFn = jest.fn();
    const plugin = {
      name: 'mouseenter video from inside node',
      penetrate: true,
      events: {
        mouseenter: fn,
      },
    };
    Chimee.install(plugin);
    const { $dom, $video } = await player.use(plugin.name);
    $dom.dispatchEvent(new Event('mouseenter'));
    const event = new Event('mouseenter');
    expect(fn).toHaveBeenCalledTimes(1);
    event.relatedTarget = $dom;
    $video.addEventListener('mouseenter', rawFn);
    $video.dispatchEvent(event);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(rawFn).toHaveBeenCalledTimes(1);
  });

  test('mouseleave video to outside should trigger', async () => {
    const fn = jest.fn();
    const rawFn = jest.fn();
    const plugin = {
      name: 'mouseleave video to outside',
      penetrate: true,
      events: {
        mouseleave: fn,
      },
    };
    Chimee.install(plugin);
    const { $dom, $video } = await player.use(plugin.name);
    $video.dispatchEvent(new Event('mouseenter'));
    const event = new Event('mouseleave');
    event.relatedTarget = $dom;
    $video.addEventListener('mouseleave', rawFn);
    $video.dispatchEvent(event);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(rawFn).toHaveBeenCalledTimes(1);
  });

  test('mouseenter to inside node child element should trigger', async () => {
    const fn = jest.fn();
    const rawFn = jest.fn();
    const plugin = {
      name: 'mouseenter inside node child node',
      penetrate: true,
      events: {
        mouseenter: fn,
      },
    };
    Chimee.install(plugin);
    const { $dom } = await player.use(plugin.name);
    const childnode = document.createElement('div');
    $dom.appendChild(childnode);
    $dom.addEventListener('mouseenter', rawFn);
    childnode.dispatchEvent(new Event('mouseenter', { bubbles: true }));
    expect(rawFn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
