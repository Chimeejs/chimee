// @flow
import { CustEvent, isElement } from 'helper/index';

let tempCurrentTime: number = 0;

export default class NativeVideoKernel extends CustEvent {
  video: HTMLVideoElement;
  config: KernelConfig;
  customConfig: Object;
  /* istanbul ignore next  */
  static isSupport() {
    return true;
  }
  constructor(videoElement: HTMLVideoElement, config: KernelConfig, customConfig: Object) {
    super();
    if (!isElement(videoElement)) throw new Error(`You must pass in an legal video element but not ${typeof videoElement}`);
    this.video = videoElement;
    this.config = config;
    this.customConfig = customConfig;
  }

  load(src: string) {
    this.video.setAttribute('src', src);
    this.video.src = src;
  }

  startLoad(src: string) {
    /* istanbul ignore next */
    const currentTime = this.video.currentTime || tempCurrentTime;
    this.load(src);
    this.seek(currentTime);
  }

  // https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media
  stopLoad() {
    tempCurrentTime = this.video.currentTime;
    this.video.src = '';
    this.video.removeAttribute('src');
  }

  destroy() {
    /* istanbul ignore next  */
    if (isElement(this.video)) this.stopLoad();
  }

  play() {
    return this.video.play();
  }

  pause() {
    return this.video.pause();
  }

  refresh() {
    this.video.src = this.config.src;
  }

  attachMedia() {}

  seek(seconds: number) {
    this.video.currentTime = seconds;
  }
}
