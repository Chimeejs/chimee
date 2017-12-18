// @flow
import HlsCore from 'hls.js';
import { CustEvent, deepAssign, Log } from 'chimee-helper';
import defaultCustomConfig from './custom-config.js';

const LOG_TAG = 'chimee-kernel-hls';

export default class Hls extends CustEvent {
  version: string;
  video: HTMLVideoElement;
  config: Object;
  customConfig: Object;
  version = process.env.VERSION;
  hlsKernel: any

  static isSupport() {
    return HlsCore.isSupported();
  }

  constructor(videoElement: HTMLVideoElement, config: Object, customConfig: Object) {
    super();
    this.video = videoElement;
    this.config = config;
    this.customConfig = deepAssign({}, defaultCustomConfig, customConfig);
    this.hlsKernel = new HlsCore(this.customConfig);
    this.bindEvents();
    this.attachMedia();
  }

  bindEvents(remove: boolean = false) {
    const hlsKernel = this.hlsKernel;
    if (hlsKernel) {
      hlsKernel[remove ? 'off' : 'on'](HlsCore.Events.ERROR, this.hlsErrorHandler);
    }
  }

  load() {
    return this.hlsKernel.loadSource(this.config.src);
  }

  attachMedia() {
    return this.hlsKernel.attachMedia(this.video);
  }

  play() {
    return this.video.play();
  }

  destroy() {
    this.bindEvents(true);
    return this.hlsKernel.destroy();
  }

  seek(seconds: number) {
    this.video.currentTime = seconds;
  }

  pause() {
    return this.video.pause();
  }

  refresh() {
    this.hlsKernel.stopLoad();
    return this.hlsKernel.loadSource(this.config.src);
  }

  hlsErrorHandler(event: Event, data: Object) {
    this.emit('error', data);
    Log.error(LOG_TAG, JSON.stringify(data));
  }
}
