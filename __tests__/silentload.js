import Chimee from 'index';
import {bind, Log} from 'chimee-helper';
describe('$silentLoad', () => {
  let player;
  let oldVideo;
  let oldKernel;
  let video;
  let originFn;
  beforeEach(() => {
    player = new Chimee({
      wrapper: document.createElement('div'),
      src: 'http://cdn.toxicjohann.com/lostStar.mp4'
    });
    oldVideo = player.__dispatcher.dom.videoElement;
    oldKernel = player.__dispatcher.kernel;
    Log.data.warn = [];
    Log.data.error = [];
    originFn = global.document.createElement;
    global.document.createElement = function (tag) {
      if(tag === 'video') {
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
    expect(Log.data.warn).toEqual([["chimee's silentLoad", 'user abort the mission']]);
  });
  test('timeout', async () => {
    const option = {};
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    await Promise.resolve();
    player.currentTime = 3;
    oldVideo.dispatchEvent(new Event('timeupdate'));
    await expect(result).rejects.toEqual(new Error('The silentLoad for http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4 timed out. Please set a longer duration or check your network'));
    expect(Log.data.warn).toEqual([["chimee's silentLoad", 'The silentLoad for http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4 timed out. Please set a longer duration or check your network']]);
  });
  test('immediate', async () => {
    const option = {immediate: true};
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
    Object.defineProperty(oldVideo, 'paused', {value: false});
    await Promise.resolve();
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
        beforeSilentLoad () {}
      }
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
      preset: {}
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
    expect(Log.data.error).toEqual([["chimee's silentload", 'unknow video error']]);
  });
  test('video error', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    await Promise.resolve();
    video.error = {code: 4, message: 'MEDIA_ELEMENT_ERROR: Format error'};
    // simulate video error
    video.dispatchEvent(new Event('error'));
    await expect(result).rejects.toEqual(new Error('MEDIA_ELEMENT_ERROR: Format error'));
    expect(player.__dispatcher.kernel).toBe(oldKernel);
    expect(player.__dispatcher.dom.videoElement).toBe(oldVideo);
    expect(player.src).toBe('http://cdn.toxicjohann.com/lostStar.mp4');
    expect(Log.data.error).toEqual([["chimee's silentload", 'MEDIA_ELEMENT_ERROR: Format error']]);
  });
  test('error in repeat times', async () => {
    const result = player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', {repeatTimes: 1});
    await Promise.resolve();
    video.error = {code: 4, message: 'MEDIA_ELEMENT_ERROR: Format error'};
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
    expect(Log.data.error).toEqual([["chimee's silentload", 'MEDIA_ELEMENT_ERROR: Format error']]);
  });
});
