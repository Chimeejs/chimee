import { chimeeLog } from 'chimee-helper-log';
import { IVideoKernel, IVideoKernelConstructor } from 'kernels/base';
import NativeVideoKernel from 'kernels/native';
import { isFunction, isNumber, isString } from 'lodash';
import { isElement } from 'toxic-predicate-functions';
import { SupportedKernelType } from 'typings/base';

const LOG_TAG = 'chimee';
const boxSuffixMap: { [x: string]: string } = {
  flv: '.flv',
  hls: '.m3u8',
  native: '.mp4',
};

// return the config box
// or choose the right one according to the src
export function getLegalBox({ src, box }: { box: string, src: string }): string {
  if (isString(box) && box) { return box; }
  src = src.toLowerCase();
  for (const key in boxSuffixMap) {
    /* istanbul ignore next */
    if (boxSuffixMap.hasOwnProperty(key)) {
      const suffix = boxSuffixMap[key];
      if (src.indexOf(suffix) > -1) { return key; }
    }
  }
  return 'native';
}

export interface IChimeeKernelConfig {
  box: string;
  isLive: boolean;
  preset: {
    [key in SupportedKernelType]?: IVideoKernelConstructor;
  };
  presetConfig: {
    [x: string]: object,
  };
  src: string;
}

export default class ChimeeKernel {

  get currentTime(): number {
    return this.videoElement.currentTime || 0;
  }
  public box: string;
  public boxConfig: object;
  public config: IChimeeKernelConfig;
  public videoElement: HTMLVideoElement;
  public videoKernel: IVideoKernel;

  constructor(videoElement: HTMLVideoElement, config: IChimeeKernelConfig) {
    if (!isElement(videoElement)) { throw new Error('You must pass in an video element to the chimee-kernel'); }
    this.config = config;
    this.videoElement = videoElement;
    this.initVideoKernel();
  }

  public attachMedia() {
    this.videoKernel.attachMedia();
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

  public load(src: string = this.config.src) {
    this.config.src = src;
    this.videoKernel.load(src);
  }

  public off(key: string, fn: (...args: any[]) => any) {
    this.videoKernel.off(key, fn);
  }

  public on(key: string, fn: (...args: any[]) => any) {
    this.videoKernel.on(key, fn);
  }

  public pause() {
    this.videoKernel.pause();
  }

  public play() {
    this.videoKernel.play();
  }

  public refresh() {
    this.videoKernel.refresh();
  }

  public seek(seconds: number) {
    if (!isNumber(seconds)) {
      chimeeLog.error(LOG_TAG, `When you try to seek, you must offer us a number, but not ${typeof seconds}`);
      return;
    }
    this.videoKernel.seek(seconds);
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

  // choose the right video kernel according to the box setting
  private chooseVideoKernel(
    box: string,
    preset: { [key in SupportedKernelType]?: IVideoKernelConstructor; }): IVideoKernelConstructor {
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
