import { EventEmitter } from 'events';
import { isElement } from 'toxic-predicate-functions';
import { IVideoKernel } from './base';

export type NativeVideoKernelConfig = {
  src: string,
};

let tempCurrentTime: number = 0;
/**
 * Native video kernel class for native video player
 * It is much simpler than normal kernel
 */
export default class NativeVideoKernel extends EventEmitter implements IVideoKernel {
  public static isSupport() {
    return true;
  }
  private config: NativeVideoKernelConfig;
  private video: HTMLVideoElement;

  constructor(videoElement: HTMLVideoElement, config: NativeVideoKernelConfig = { src: '' }, customConfig: any) {
    super();
    if (!isElement(videoElement)) {
      throw new Error(`You must pass in an legal video element but not ${typeof videoElement}`);
    }
    this.video = videoElement;
    this.config = config;
  }

  public attachMedia() {
    // do nothing
  }

  public destroy() {
    if (isElement(this.video)) {
      this.stopLoad();
    }
  }

  public load(src: string) {
    this.video.setAttribute('src', src);
    this.video.src = src;
  }

  public pause() {
    return this.video.pause();
  }

  public play() {
    return this.video.play();
  }

  public refresh() {
    this.video.src = this.config.src;
  }

  public seek(seconds: number) {
    this.video.currentTime = seconds;
  }

  public startLoad(src: string) {
    const currentTime = typeof this.video.currentTime === 'number'
      ? this.video.currentTime
      : tempCurrentTime;
    this.load(src);
    this.seek(currentTime);
  }

  // https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media
  public stopLoad() {
    tempCurrentTime = this.video.currentTime;
    this.video.src = '';
    this.video.removeAttribute('src');
  }

  public unload() {
    // do nothing
  }
}
