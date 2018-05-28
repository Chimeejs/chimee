import Chimee from 'index';
import ChimeeKernelHls from 'chimee-kernel-hls';

function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

import { bind, Log } from 'chimee-helper';

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
    await sleep(100);
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
    await sleep(100);
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
    await sleep(100);
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
    await sleep(100);
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
    await sleep(100);
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
    await sleep(100);
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
    await sleep(100);
    expect(player.$video).not.toBe(oldVideo);
    expect(player.$video).toBe(video);
    expect(player.__dispatcher.kernel).not.toBe(oldKernel);
    expect(player.src).toBe('');
  });
});
