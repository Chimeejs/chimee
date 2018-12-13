import { chimeeLog } from 'chimee-helper-log';
import { IVideoKernel, IVideoKernelConstructor } from 'kernels/base';
import NativeVideoKernel from 'kernels/native';
import { isFunction, isNumber, isString } from 'lodash';
import { isElement } from 'toxic-predicate-functions';

const LOG_TAG = 'chimee';
const boxSuffixMap: { [x: string]: string } = {
  flv: '.flv',
  hls: '.m3u8',
  native: '.mp4',
};

// return the config box
// or choose the right one according to the src
export function getLegalBox({ src, box }: { src: string, box: string }): string {
  if (isString(box) && box) { return box; }
  src = src.toLowerCase();
  for (const key in boxSuffixMap) {
    if (boxSuffixMap.hasOwnProperty(key)) {
      const suffix = boxSuffixMap[key];
      if (src.indexOf(suffix) > -1) { return key; }
    }
  }
  return 'native';
}

export interface ChimeeKernelConfig {
  src: string;
  isLive: boolean;
  box: string;
  preset: {
    // TODO: use the concrete kernel declare here later
    [x: string]: IVideoKernelConstructor,
  };
  presetConfig: {
    [x: string]: object,
  };
}

export default class ChimeeKernel {
  public box: string;
  public boxConfig: object;
  public config: ChimeeKernelConfig;
  public videoElement: HTMLVideoElement;
  public videoKernel: IVideoKernel;

  constructor(videoElement: HTMLVideoElement, config: ChimeeKernelConfig) {
    if (!isElement(videoElement)) { throw new Error('You must pass in an video element to the chimee-kernel'); }
    this.config = config;
    this.videoElement = videoElement;
    this.initVideoKernel();
  }

  public destroy() {
    this.videoKernel.destroy();
  }

  public initVideoKernel() {
    const config = this.config;
    const box = getLegalBox(config);
    this.box = box;
    const VideoKernel = this.chooseVideoKernel(this.box, config.preset);

    if (!isFunction(VideoKernel)) {
      throw new Error(`We can't find video kernel for ${box}. Please check your config and make sure it's installed or provided`);
    }

    const customConfig = config.presetConfig[this.box];

    // TODO: nowaday, kernels all get config from one config
    // it's not a good way, because custom config may override kernel config
    // so we may remove this code when we check all the chimee-kernel-* setting
    if (customConfig) {
      // use Object.assign here as it can be faster
      // we may switch back to deep assign if object.assign can handle the case
      // deepAssign(config, customConfig);
      Object.assign(config, customConfig);
    }

    this.videoKernel = new (VideoKernel as IVideoKernelConstructor)(this.videoElement, config, customConfig);
  }

  public attachMedia() {
    this.videoKernel.attachMedia();
  }

  public load(src: string = this.config.src) {
    this.config.src = src;
    this.videoKernel.load(src);
  }

  public startLoad() {
    /* istanbul ignore if */
    if (!isFunction(this.videoKernel.startLoad)) { throw new Error('This video kernel do not support startLoad, please contact us on https://github.com/Chimeejs/chimee/issues'); }
    this.videoKernel.startLoad(this.config.src);
  }

  public stopLoad() {
    /* istanbul ignore else */
    if (isFunction(this.videoKernel.stopLoad)) { this.videoKernel.stopLoad(); }
  }

  public play() {
    this.videoKernel.play();
  }

  public pause() {
    this.videoKernel.pause();
  }

  get currentTime(): number {
    return this.videoElement.currentTime || 0;
  }

  public seek(seconds: number) {
    if (!isNumber(seconds)) {
      chimeeLog.error(LOG_TAG, `When you try to seek, you must offer us a number, but not ${typeof seconds}`);
      return;
    }
    this.videoKernel.seek(seconds);
  }

  public refresh() {
    this.videoKernel.refresh();
  }

  public on(key: string, fn: (...args: any[]) => any) {
    this.videoKernel.on(key, fn);
  }

  public off(key: string, fn: (...args: any[]) => any) {
    this.videoKernel.off(key, fn);
  }

  // choose the right video kernel according to the box setting
  private chooseVideoKernel(
    box: string,
    preset: { [x: string]: IVideoKernelConstructor; }): IVideoKernelConstructor {
    switch (box) {
      case 'native':
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
  private getMp4Kernel(Mp4Kernel: IVideoKernelConstructor | void): IVideoKernelConstructor {
    if (!Mp4Kernel || !isFunction(Mp4Kernel.isSupport) || !Mp4Kernel.isSupport()) {
      if (Mp4Kernel) {
        chimeeLog.warn(LOG_TAG, 'mp4 decode is not support in this browser, we will switch to the native video kernel');
      }
      this.box = 'native';
      return NativeVideoKernel;
    }
    return Mp4Kernel;
  }
}
