import { EventEmitter } from 'events';
import { isElement } from 'toxic-predicate-functions';

export type NativeVideoKernelConfig = {
  src: string,
  isLive: boolean,
  box: string,
};

let tempCurrentTime: number = 0;

export default class NativeVideoKernel extends EventEmitter {
  public static isSupport() {
    return true;
  }

  private video: HTMLVideoElement;
  private config: NativeVideoKernelConfig;

  constructor(videoElement: HTMLVideoElement, config: NativeVideoKernelConfig, customConfig: any) {
    super();
    if (!isElement(videoElement)) {
      throw new Error(`You must pass in an legal video element but not ${typeof videoElement}`);
    }
    this.video = videoElement;
    this.config = config;
  }

  public load(src: string) {
    this.video.setAttribute('src', src);
    this.video.src = src;
  }

  public startLoad(src: string) {
    const currentTime = this.video.currentTime || tempCurrentTime;
    this.load(src);
    this.seek(currentTime);
  }

  // https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media
  public stopLoad() {
    tempCurrentTime = this.video.currentTime;
    this.video.src = '';
    this.video.removeAttribute('src');
  }

  public destroy() {
    if (isElement(this.video)) {
      this.stopLoad();
    }
  }

  public play() {
    return this.video.play();
  }

  public pause() {
    return this.video.pause();
  }

  public refresh() {
    this.video.src = this.config.src;
  }

  public attachMedia() {
    // do nothing
  }

  public seek(seconds: number) {
    this.video.currentTime = seconds;
  }
}
