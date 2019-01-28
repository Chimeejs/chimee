import Chimee from 'index';
import { bind } from 'toxic-utils';
import { chimeeLog } from 'chimee-helper-log';
function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

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
    oldVideo = player.dispatcher.dom.videoElement;
    oldKernel = player.dispatcher.kernel;
    chimeeLog.data.warn = [];
    chimeeLog.data.error = [];
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
  //   oldVideo = player.dispatcher.dom.videoElement;
  //   oldKernel = player.dispatcher.kernel;
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
    expect(player.dispatcher.kernel).not.toBe(oldKernel);
    expect(player.dispatcher.dom.videoElement).toBe(video);
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
    expect(chimeeLog.data.warn).toEqual([[ "chimee's silentLoad", 'user abort the mission' ]]);
  });

  test('timeout', async () => {
    const option = {};
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    await Promise.resolve();
    player.currentTime = 3;
    oldVideo.dispatchEvent(new Event('timeupdate'));
    await expect(result).rejects.toEqual(new Error('The silentLoad for http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4 timed out. Please set a longer duration or check your network'));
    expect(chimeeLog.data.warn).toEqual([[ "chimee's silentLoad", 'The silentLoad for http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4 timed out. Please set a longer duration or check your network' ]]);
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
    expect(player.dispatcher.kernel).not.toBe(oldKernel);
    expect(player.dispatcher.dom.videoElement).toBe(video);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    player.src = 'http://cdn.toxicjohann.com/lostStar.mp4';
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
  });

  test('isLive', async () => {
    const option = { isLive: true };
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    Object.defineProperty(oldVideo, 'paused', { value: false });
    await sleep(100);
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
    expect(player.dispatcher.kernel).not.toBe(oldKernel);
    expect(player.dispatcher.dom.videoElement).toBe(video);
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
    expect(player.dispatcher.kernel).toBe(oldKernel);
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
    expect(player.dispatcher.kernel).not.toBe(oldKernel);
    expect(player.dispatcher.dom.videoElement).toBe(video);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    player.src = 'http://cdn.toxicjohann.com/lostStar.mp4';
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
  });

  test('unknow error', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    await sleep(100);
    // simulate video error
    video.dispatchEvent(new Event('error'));
    await expect(result).rejects.toEqual(new Error('unknow video error'));
    expect(player.dispatcher.kernel).toBe(oldKernel);
    expect(player.dispatcher.dom.videoElement).toBe(oldVideo);
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
    expect(chimeeLog.data.error).toEqual([[ "chimee's silentload", 'unknow video error' ]]);
  });

  test('video error', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    await sleep(100);
    video.error = { code: 4, message: 'MEDIA_ELEMENT_ERROR: Format error' };
    // simulate video error
    video.dispatchEvent(new Event('error'));
    await expect(result).rejects.toEqual(new Error('MEDIA_ELEMENT_ERROR: Format error'));
    expect(player.dispatcher.kernel).toBe(oldKernel);
    expect(player.dispatcher.dom.videoElement).toBe(oldVideo);
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
    expect(chimeeLog.data.error).toEqual([[ "chimee's silentload", 'MEDIA_ELEMENT_ERROR: Format error' ]]);
  });

  test('kernel error', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    await sleep(100);
    // simulate video error
    player.dispatcher.silentLoadTempKernel.videoKernel.emit('error', {
      errmsg: 'test error',
      errno: 500,
    });
    await expect(result).rejects.toEqual(new Error('test error'));
    expect(player.dispatcher.kernel).toBe(oldKernel);
    expect(player.dispatcher.dom.videoElement).toBe(oldVideo);
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
    expect(chimeeLog.data.error).toEqual([[ "chimee's silentload bump into a kernel error", 'test error' ]]);
  });

  test('error in repeat times', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', { repeatTimes: 1 });
    await Promise.resolve();
    video.error = { code: 4, message: 'MEDIA_ELEMENT_ERROR: Format error' };
    // simulate video error
    video.dispatchEvent(new Event('error'));
    await sleep(100);
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
    expect(player.dispatcher.kernel).not.toBe(oldKernel);
    expect(player.dispatcher.dom.videoElement).toBe(video);
    expect(player.src).toBe('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    expect(chimeeLog.data.error).toEqual([[ "chimee's silentload", 'MEDIA_ELEMENT_ERROR: Format error' ]]);
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
    expect(chimeeLog.data.error).toEqual([]);
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
