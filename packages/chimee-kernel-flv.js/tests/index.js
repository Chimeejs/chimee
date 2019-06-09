import ChimeeKernelFlvJs from '../lib/esnext/index';
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
    expect(ChimeeKernelFlvJs.isSupport()).to.equal(!process.env.TRAVIS);
  });
  it('base method', () => {
    const config = {
      src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
      box: 'flv',
      isLive: false,
    };
    const kernel = new ChimeeKernelFlvJs(videoElement, config, {
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
      src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
      box: 'flv',
      isLive: false,
    };
    kernel = new ChimeeKernelFlvJs(videoElement, config, {});
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
  it('seek', async () => {
    expect(kernel.video.currentTime).to.equal(0);
    kernel.load();
    expect(kernel.video.currentTime).to.equal(0);
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(() => {
      kernel.seek(10);
    }).not.to.throw();
  });
  it('play & pause', () => {
    expect(() => {
      kernel.attachMedia();
      kernel.load();
      kernel.play();
      kernel.pause();
    }).not.to.throw();
  });
  it('load & stopLoad', () => {
    expect(() => {
      kernel.attachMedia();
      kernel.load();
      kernel.play();
      kernel.pause();
      kernel.stopLoad();
    }).not.to.throw();
  });
});

describe('error branch', () => {
  let videoElement;
  beforeEach(() => {
    videoElement = document.createElement('video');
  });
  afterEach(() => {
    videoElement = null;
  });
  it('no video element', () => {
    expect(() => new ChimeeKernelFlvJs()).to.throw('video element passed in chimee-kernel-flv.js must be a HTMLVideoElement, but not undefined');
  });
  // it('no config', () => {
  //   expect(() => new ChimeeKernelFlvJs(videoElement)).to.throw('config of chimee-kernel-flv.js must be an Object but not undefined');
  // });
  it('error handler', done => {
    const config = {
      src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
      box: 'flv',
      isLive: false,
    };
    const kernel = new ChimeeKernelFlvJs(videoElement, config, {
      debug: true,
    });
    kernel.on('error', () => {
      done();
    });
    expect(() => kernel.flvKernel._emitter.emit('error', 'sth', 'sth')).not.to.throw();
  });
});

describe('mp4 test', () => {
  let videoElement;
  beforeEach(() => {
    videoElement = document.createElement('video');
  });
  afterEach(() => {
    videoElement = null;
  });
  it('play mp4', () => {
    const config = {
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      box: 'mp4',
      isLive: false,
    };
    const kernel = new ChimeeKernelFlvJs(videoElement, config, {
      debug: true,
    });
    expect(() => {
      kernel.attachMedia();
      kernel.load();
      kernel.play();
      kernel.pause();
    }).not.to.throw();
  });
});
