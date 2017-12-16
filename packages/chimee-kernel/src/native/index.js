// @flow
import { CustEvent, isElement } from 'chimee-helper';
export default class NativeVideoKernel extends CustEvent {
  video: HTMLVideoElement;
  config: KernelConfig;
  customConfig: Object;
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
  }

  unload() {
    this.video.src = '';
    this.video.removeAttribute('src');
  }

  destroy() {
    if (isElement(this.video)) this.unload();
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
