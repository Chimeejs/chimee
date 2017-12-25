import ChimeeKernelHls from '../src/index';
import chai from 'chai';
import { isFunction } from 'chimee-helper';
const { expect } = chai;
describe('chimee-kernel base requirement', () => {
  let videoElement;
  beforeEach(() => {
    videoElement = document.createElement('video');
  });
  afterEach(() => {
    videoElement = null;
  });
  it('isSupport', () => {
    expect(ChimeeKernelHls.isSupport()).to.equal(!process.env.TRAVIS);
  });
  it('base method', () => {
    const config = {
      src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
      box: 'hls',
      isLive: false,
    };
    const kernel = new ChimeeKernelHls(videoElement, config, {
      debug: true,
    });
    expect(kernel.config).to.deep.equal(config);
    expect(kernel.video).to.equal(videoElement);
    expect(isFunction(kernel.load)).to.equal(true);
    expect(isFunction(kernel.play)).to.equal(true);
    expect(isFunction(kernel.pause)).to.equal(true);
    expect(isFunction(kernel.refresh)).to.equal(true);
    expect(isFunction(kernel.attachMedia)).to.equal(true);
    expect(isFunction(kernel.seek)).to.equal(true);
    expect(isFunction(kernel.destroy)).to.equal(true);
    expect(isFunction(kernel.on)).to.equal(true);
    expect(isFunction(kernel.off)).to.equal(true);
    expect(isFunction(kernel.once)).to.equal(true);
    expect(isFunction(kernel.emit)).to.equal(true);
    kernel.destroy();
  });
});

describe('method it', () => {
  let kernel;
  let config;
  let videoElement;
  beforeEach(() => {
    videoElement = document.createElement('video');
    config = {
      src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
      box: 'hls',
      isLive: false,
    };
    kernel = new ChimeeKernelHls(videoElement, config, {});
  });
  afterEach(() => {
    kernel.destroy();
    videoElement = null;
    config = undefined;
  });
  it('refresh', async () => {
    expect(kernel.config.src).to.equal(config.src);
    const videoSrc = kernel.video.src;
    await kernel.refresh();
    expect(kernel.config.src).to.equal(config.src);
    expect(kernel.video.src).to.equal(videoSrc);
  });
  it('load', () => {
    expect(kernel.config.src).to.equal(config.src);
    const videoSrc = kernel.video.src;
    kernel.load();
    expect(kernel.config.src).to.equal(config.src);
    expect(kernel.video.src).to.equal(videoSrc);
  });
  it('seek', () => {
    expect(kernel.video.currentTime).to.equal(0);
    kernel.load();
    expect(kernel.video.currentTime).to.equal(0);
    kernel.seek(10);
    expect(kernel.video.currentTime).to.equal(10);
  });
  it('play & pause', () => {
    expect(() => {
      kernel.attachMedia();
      kernel.load();
      kernel.play();
      kernel.pause();
    }).not.to.throw();
  });
});

describe('error branch', () => {
  let videoElement;
  beforeEach(() => {
    videoElement = document.createElement('div');
  });
  afterEach(() => {
    videoElement = null;
  });
  it('no video element', () => {
    expect(() => new ChimeeKernelHls()).to.throw('video element passed in chimee-kernel-hls must be a HTMLVideoElement, but not undefined');
  });
  it('no config', () => {
    expect(() => new ChimeeKernelHls(videoElement)).to.throw('config of chimee-kernel-hls must be an Object but not undefined');
  });
  it('error handler', done => {
    const config = {
      src: 'http://cdn.toxicjohann.com',
      box: 'hls',
      isLive: false,
    };
    const kernel = new ChimeeKernelHls(videoElement, config, {
      debug: true,
    });
    kernel.on('error', () => {
      done();
    });
    expect(() => kernel.hlsKernel.trigger('hlsError', { type: 'test', details: 'something wrong', fatal: false })).not.to.throw();
  });
});
