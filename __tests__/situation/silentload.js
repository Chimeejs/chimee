import Chimee from 'index';
import ChimeeKernelHls from 'chimee-kernel-hls';
// import ChimeeKernelFlv from 'chimee-kernel-flv';
import { bind, Log } from 'chimee-helper';
describe('$silentLoad', () => {
  let player;
  let oldVideo;
  let oldKernel;
  let video;
  let originFn;

  beforeEach(() => {
    player = new Chimee({
      wrapper: document.createElement('div'),
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
    });
    oldVideo = player.__dispatcher.dom.videoElement;
    oldKernel = player.__dispatcher.kernel;
    Log.data.warn = [];
    Log.data.error = [];
    originFn = global.document.createElement;
    global.document.createElement = function(tag) {
      if (tag === 'video') {
        video = bind(originFn, document)(tag);
        return video;
      }
      return bind(originFn, document)(tag);
    };
  });

  afterEach(() => {
    global.document.createElement = originFn;
    player.destroy();
  });

  // need to mock chimeeKernelFlv function on jest
  // test('silentload should use default preset and kernels if people do not pass one', async () => {
  //   const wrapper = document.createElement('div');
  //   player = new Chimee({
  //     src:
  //       'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  //     isLive: false,
  //     preset: {
  //       flv: ChimeeKernelFlv
  //     },
  //     // 编解码容器
  //     box: 'flv', // flv hls native
  //     // dom容器
  //     wrapper
  //   });
  //   oldVideo = player.__dispatcher.dom.videoElement;
  //   oldKernel = player.__dispatcher.kernel;
  //   const result = player.silentLoad(
  //     'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  //     {
  //       immediate: true
  //     }
  //   );
  //   // simulate timeupdate beforechange
  //   oldVideo.dispatchEvent(new Event('timeupdate'));
  //   // simulate metadata loaded finished
  //   video.dispatchEvent(new Event('loadedmetadata'));
  //   // simulate canplayable
  //   video.dispatchEvent(new Event('canplay'));
  //   // simulate times up
  //   player.currentTime = 3;
  //   oldVideo.dispatchEvent(new Event('timeupdate'));
  //   await expect(result).resolves.toBe();
  // });


  test('normal run', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    await Promise.resolve();
    // simulate timeupdate beforechange
    oldVideo.dispatchEvent(new Event('timeupdate'));
    // simulate metadata loaded finished
    video.dispatchEvent(new Event('loadedmetadata'));
    // simulate canplayable
    video.dispatchEvent(new Event('canplay'));
    // simulate times up
    player.currentTime = 3;
    oldVideo.dispatchEvent(new Event('timeupdate'));
    await expect(result).resolves.toBe();
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.__dispatcher.dom.videoElement).toBe(video);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    player.src = 'http://cdn.toxicjohann.com/lostStar.mp4';
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
  });

  test('abort when ready', async () => {
    const option = {};
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    await Promise.resolve();
    // simulate timeupdate beforechange
    oldVideo.dispatchEvent(new Event('timeupdate'));
    // simulate metadata loaded finished
    video.dispatchEvent(new Event('loadedmetadata'));
    // simulate canplayable
    video.dispatchEvent(new Event('canplay'));
    // simulate times up
    player.currentTime = 3;
    oldVideo.dispatchEvent(new Event('timeupdate'));
    option.abort = true;
    await expect(result).rejects.toEqual(new Error('user abort the mission'));
  });

  test('abort at start', async () => {
    const option = {};
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    option.abort = true;
    await Promise.resolve();
    await expect(result).rejects.toEqual(new Error('user abort the mission'));
    expect(Log.data.warn).toEqual([[ "chimee's silentLoad", 'user abort the mission' ]]);
  });

  test('timeout', async () => {
    const option = {};
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    await Promise.resolve();
    player.currentTime = 3;
    oldVideo.dispatchEvent(new Event('timeupdate'));
    await expect(result).rejects.toEqual(new Error('The silentLoad for http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4 timed out. Please set a longer duration or check your network'));
    expect(Log.data.warn).toEqual([[ "chimee's silentLoad", 'The silentLoad for http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4 timed out. Please set a longer duration or check your network' ]]);
  });

  test('immediate', async () => {
    const option = { immediate: true };
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    Object.defineProperty(oldVideo, 'paused', { value: false });
    await Promise.resolve();
    Object.defineProperty(video, 'play', { value() {
      Promise.resolve().then(() => {
        video.dispatchEvent(new Event('play'));
      });
    } });
    // simulate timeupdate beforechange
    oldVideo.dispatchEvent(new Event('timeupdate'));
    // simulate metadata loaded finished
    video.dispatchEvent(new Event('loadedmetadata'));
    // simulate canplayable
    video.dispatchEvent(new Event('canplay'));
    await expect(result).resolves.toBe();
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.__dispatcher.dom.videoElement).toBe(video);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    player.src = 'http://cdn.toxicjohann.com/lostStar.mp4';
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
  });

  test('isLive', async () => {
    const option = { isLive: true };
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    Object.defineProperty(oldVideo, 'paused', { value: false });
    await Promise.resolve();
    Object.defineProperty(video, 'play', { value() {
      Promise.resolve().then(() => {
        video.dispatchEvent(new Event('play'));
      });
    } });
    // simulate timeupdate beforechange
    oldVideo.dispatchEvent(new Event('timeupdate'));
    // simulate metadata loaded finished
    video.dispatchEvent(new Event('loadedmetadata'));
    // simulate canplayable
    video.dispatchEvent(new Event('canplay'));
    await expect(result).resolves.toBe();
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.__dispatcher.dom.videoElement).toBe(video);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    player.src = 'http://cdn.toxicjohann.com/lostStar.mp4';
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
  });

  test('repeat times', async () => {
    const plugin = {
      name: 'silentLoadWithPlugin',
      events: {
        beforeSilentLoad() {},
      },
    };
    Chimee.install(plugin);
    player.use('silentLoadWithPlugin');
    const option = {
      duration: 3,
      bias: 1,
      repeatTimes: 5,
      increment: 2,
      omit: false,
      isLive: false,
      box: 'native',
      preset: {},
    };
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    await Promise.resolve();
    // simulate times up
    player.currentTime = 3;
    oldVideo.dispatchEvent(new Event('timeupdate'));
    expect(player.__dispatcher.kernel).toBe(oldKernel);
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    // simulate timeupdate beforechange
    oldVideo.dispatchEvent(new Event('timeupdate'));
    // simulate metadata loaded finished
    video.dispatchEvent(new Event('loadedmetadata'));
    // simulate canplayable
    video.dispatchEvent(new Event('canplay'));
    player.currentTime = 7;
    oldVideo.dispatchEvent(new Event('timeupdate'));
    await expect(result).resolves.toBe();
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.__dispatcher.dom.videoElement).toBe(video);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    player.src = 'http://cdn.toxicjohann.com/lostStar.mp4';
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
  });

  test('unknow error', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    await Promise.resolve();
    // simulate video error
    video.dispatchEvent(new Event('error'));
    await expect(result).rejects.toEqual(new Error('unknow video error'));
    expect(player.__dispatcher.kernel).toBe(oldKernel);
    expect(player.__dispatcher.dom.videoElement).toBe(oldVideo);
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
    expect(Log.data.error).toEqual([[ "chimee's silentload", 'unknow video error' ]]);
  });

  test('video error', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    await Promise.resolve();
    video.error = { code: 4, message: 'MEDIA_ELEMENT_ERROR: Format error' };
    // simulate video error
    video.dispatchEvent(new Event('error'));
    await expect(result).rejects.toEqual(new Error('MEDIA_ELEMENT_ERROR: Format error'));
    expect(player.__dispatcher.kernel).toBe(oldKernel);
    expect(player.__dispatcher.dom.videoElement).toBe(oldVideo);
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
    expect(Log.data.error).toEqual([[ "chimee's silentload", 'MEDIA_ELEMENT_ERROR: Format error' ]]);
  });

  test('kernel error', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    await Promise.resolve();
    // simulate video error
    player.__dispatcher._silentLoadTempKernel.videoKernel.emit('error', {
      errmsg: 'test error',
      errno: 500,
    });
    await expect(result).rejects.toEqual(new Error('test error'));
    expect(player.__dispatcher.kernel).toBe(oldKernel);
    expect(player.__dispatcher.dom.videoElement).toBe(oldVideo);
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
    expect(Log.data.error).toEqual([[ "chimee's silentload bump into a kernel error", 'test error' ]]);
  });

  test('error in repeat times', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', { repeatTimes: 1 });
    await Promise.resolve();
    video.error = { code: 4, message: 'MEDIA_ELEMENT_ERROR: Format error' };
    // simulate video error
    video.dispatchEvent(new Event('error'));
    await Promise.resolve();
    // simulate timeupdate beforechange
    oldVideo.dispatchEvent(new Event('timeupdate'));
    // simulate metadata loaded finished
    video.dispatchEvent(new Event('loadedmetadata'));
    // simulate canplayable
    video.dispatchEvent(new Event('canplay'));
    // simulate times up
    player.currentTime = 3;
    oldVideo.dispatchEvent(new Event('timeupdate'));
    await expect(result).resolves.toBe();
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.__dispatcher.dom.videoElement).toBe(video);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    expect(Log.data.error).toEqual([[ "chimee's silentload", 'MEDIA_ELEMENT_ERROR: Format error' ]]);
  });

  test('error remove', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', { immediate: true });
    await Promise.resolve();
    // simulate metadata loaded finished
    video.dispatchEvent(new Event('loadedmetadata'));
    // simulate canplayable
    video.dispatchEvent(new Event('canplay'));
    oldVideo.dispatchEvent(new Event('timeupdate'));
    await expect(result).resolves.toBe();
    video.dispatchEvent(new Event('error'));
    expect(Log.data.error).toEqual([]);
  });

  test('should not trigger play when we silentLoad', async () => {
    const fn = jest.fn();
    player.$on('play', fn);
    Object.defineProperty(oldVideo, 'paused', { value: false });
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', { immediate: true });
    await Promise.resolve();
    Object.defineProperty(video, 'play', { value() {
      Promise.resolve().then(() => {
        video.dispatchEvent(new Event('play'));
      });
    } });
    // simulate metadata loaded finished
    video.dispatchEvent(new Event('loadedmetadata'));
    // simulate canplayable
    video.dispatchEvent(new Event('canplay'));
    await expect(result).resolves.toBe();
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

describe('load', () => {
  let player;
  let oldVideo;
  let oldKernel;
  let video;
  let originFn;

  beforeEach(() => {
    player = new Chimee({
      wrapper: document.createElement('div'),
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
    });
    oldVideo = player.__dispatcher.dom.videoElement;
    oldKernel = player.__dispatcher.kernel;
    Log.data.warn = [];
    Log.data.error = [];
    originFn = global.document.createElement;
    global.document.createElement = function(tag) {
      if (tag === 'video') {
        video = bind(originFn, document)(tag);
        return video;
      }
      return bind(originFn, document)(tag);
    };
  });

  afterEach(() => {
    global.document.createElement = originFn;
    player.destroy();
  });

  test('load with different box', async () => {
    player.load('http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8', {
      box: 'hls',
      preset: {
        hls: ChimeeKernelHls,
      },
    });
    await Promise.resolve();
    expect(player.$video).not.toBe(oldVideo);
    expect(player.$video).toBe(video);
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
  });

  test('load with different box', async () => {
    player.load('http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8', {
      box: 'hls',
      preset: {
        hls: ChimeeKernelHls,
      },
    });
    await Promise.resolve();
    expect(player.$video).not.toBe(oldVideo);
    expect(player.$video).toBe(video);
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
  });

  test('load with different preset', async () => {
    player.load('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', {
      preset: {
        hls: ChimeeKernelHls,
      },
    });
    await Promise.resolve();
    expect(player.$video).not.toBe(oldVideo);
    expect(player.$video).toBe(video);
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
  });

  test('load with same box', async () => {
    player.load('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', {
      isLive: false,
      box: 'native',
    });
    await Promise.resolve();
    expect(player.$video).not.toBe(oldVideo);
    expect(player.$video).toBe(video);
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
  });

  test('load with one object', async () => {
    player.load({
      src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
      isLive: false,
      box: 'native',
    });
    await Promise.resolve();
    expect(player.$video).not.toBe(oldVideo);
    expect(player.$video).toBe(video);
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
  });

  test('load with one object without src', async () => {
    player.load({
      isLive: false,
      box: 'native',
      src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
    });
    await Promise.resolve();
    expect(player.$video).not.toBe(oldVideo);
    expect(player.$video).toBe(video);
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
  });

  test('use load to clear src', async () => {
    player.load({
      isLive: false,
      box: 'native',
    });
    await Promise.resolve();
    expect(player.$video).not.toBe(oldVideo);
    expect(player.$video).toBe(video);
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.src).toBe('');
  });
});
