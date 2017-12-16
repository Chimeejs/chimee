// @flow
import { Log, CustEvent, isNumber, deepAssign, isString, isFunction, isElement } from 'chimee-helper';
import NativeVideoKernel from './native/index';
import defaultConfig from './config';

const LOG_TAG = 'chimee-kernel';
const kernelEvents = [ 'mediaInfo', 'heartbeat', 'error' ];
const boxSuffixMap = {
  flv: '.flv',
  hls: '.m3u8',
  mp4: '.mp4',
};

export default class Kernel extends CustEvent {
  box: string;
  boxConfig: Object;
  config: KernelConfig;
  videoElement: HTMLVideoElement;
  videoKernel: VideoKernel;
  VERSION: string;
  VERSION = process.env.KERNEL_VERSION;
  /**
	 * kernelWrapper
	 * @param {any} wrap videoElement
	 * @param {any} option
	 * @class kernel
	 */
  constructor(videoElement: HTMLVideoElement, config: KernelConfig) {
    super();
    if (!isElement(videoElement)) throw new Error('You must pass in an video element to the chimee-kernel');
    // copy and maintain only one config for chimee-kernel
    // actually kernel is disposable in most situation nowaday
    this.config = deepAssign({}, defaultConfig, config);
    this.videoElement = videoElement;
    this.initVideoKernel();
    this.bindEvents(this.videoKernel);
  }

  destroy() {
    this.bindEvents(this.videoKernel, true);
    this.videoKernel.destroy();
  }

  initVideoKernel() {
    const config = this.config;
    const box = this.chooseBox(config);
    this.box = box;
    const VideoKernel = this.chooseVideoKernel(this.box, config.preset);

    if (!isFunction(VideoKernel)) throw new Error(`We can't find video kernel for ${box}. Please check your config and make sure it's installed or provided`);

    const customConfig = config.presetConfig[this.box] || {};

    // TODO: nowaday, kernels all get config from one config
    // it's not a good way, because custom config may override kernel config
    // so we may remove this code later
    deepAssign(config, customConfig);

    this.videoKernel = new VideoKernel(this.videoElement, config, customConfig);
  }

  // return the config box
  // or choose the right one according to the src
  chooseBox({ src, box }: { src: string, box: string }): string {
    if (isString(box) && box) return box;
    src = src.toLowerCase();
    for (const key in boxSuffixMap) {
      const suffix = boxSuffixMap[key];
      if (src.indexOf(suffix) > -1) return key;
    }
    return 'native';
  }

  // choose the right video kernel according to the box setting
  chooseVideoKernel(box: string, preset: { [string]: Function }): VideoKernel {
    switch (box) {
      case 'native':
        // $FlowFixMe: it's the same as videoKernel
        return NativeVideoKernel;
      case 'mp4':
        return this.getMp4Kernel(preset.mp4);
      case 'flv':
      case 'hls':
        return preset[box];
      default:
        throw new Error(`We currently do not support box ${box}, please contact us through https://github.com/Chimeejs/chimee/issues.`);
    }
  }

  // fetch the legal mp4 kernel
  // if it's not exist or not support
  // we will fall back to the native video kernel
  getMp4Kernel(mp4Kernel: VideoKernel | void): VideoKernel {
    const hasLegalMp4Kernel = mp4Kernel && isFunction(mp4Kernel.isSupport);
    // $FlowFixMe: we have make sure it's an kernel now
    const supportMp4Kernel = hasLegalMp4Kernel && mp4Kernel.isSupport();
    // $FlowFixMe: we have make sure it's an kernel now
    if (supportMp4Kernel) return mp4Kernel;
    if (hasLegalMp4Kernel) this.warnLog('mp4 decode is not support in this browser, we will switch to the native video kernel');
    this.box = 'native';
    // $FlowFixMe: it's the same as videoKernel
    return NativeVideoKernel;
  }

  errorLog(...args: Array<string>) {
    this.emit('error', new Error(args[0] || 'We have bump into a kernel error'));
    return Log.error(LOG_TAG, ...args);
  }

  warnLog(...args: Array<string>) {
    return Log.warn(LOG_TAG, ...args);
  }

  bindEvents(videoKernel: VideoKernel, remove: boolean = false) {
    kernelEvents.forEach(eventName => {
      // $FlowFixMe: we have make sure it's legal now
      videoKernel[remove ? 'off' : 'on'](eventName, ({ data } = {}) => {
        this.emit(eventName, data);
      });
    });
  }

  attachMedia() {
    this.videoKernel.attachMedia();
  }

  load(src: string = this.config.src) {
    this.config.src = src;
    console.log(src);
    this.videoKernel.load(src);
  }

  play() {
    this.videoKernel.play();
  }

  pause() {
    this.videoKernel.pause();
  }

  get currentTime(): number {
    return this.videoElement.currentTime || 0;
  }

  seek(seconds: number) {
    if (!isNumber(seconds)) {
      this.errorLog(`When you try to seek, you must offer us a number, but not ${typeof seconds}`);
      return;
    }
    this.videoKernel.seek(seconds);
  }
  refresh() {
    this.videoKernel.refresh();
  }
}
