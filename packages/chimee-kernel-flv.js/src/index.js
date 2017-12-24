// @flow
import FlvCore from 'flv.js';
import { CustEvent, deepAssign, Log, isElement, isObject } from 'chimee-helper';
import { autobind } from 'toxic-decorators';

const LOG_TAG = 'chimee-kernel-flv';

export default class Flv extends CustEvent {
  version: string;
  video: HTMLVideoElement;
  config: KernelConfig;
  customConfig: CustomConfig;
  version = process.env.VERSION;
  flvKernel: any

  static isSupport() {
    return FlvCore.isSupported();
  }

  constructor(videoElement: HTMLVideoElement, config: KernelConfig, customConfig: CustomConfig = {}) {
    super();
    if (!isElement(videoElement)) throw new Error(`video element passed in ${LOG_TAG} must be a HTMLVideoElement, but not ${typeof videoElement}`);
    if (!isObject(config)) throw new Error(`config of ${LOG_TAG} must be an Object but not ${typeof config}`);
    this.video = videoElement;
    this.config = config;
    const { src, isLive, box } = config;
    const {
      withCredentials,
      hasAudio,
      hasVideo,
      duration,
      filesize,
      segments,
    } = this.customConfig;
    const mediaDataSource = {
      url: src,
      type: box,
      isLive,
      withCredentials,
      hasAudio,
      hasVideo,
      duration,
      filesize,
      segments,
    };
    this.customConfig = deepAssign(mediaDataSource, customConfig);
    this.flvKernel = FlvCore.createPlayer(this.customConfig);
    this.bindEvents();
    this.attachMedia();
  }

  bindEvents(remove: boolean = false) {
    const flvKernel = this.flvKernel;
    if (flvKernel) {
      flvKernel[remove ? 'off' : 'on'](FlvCore.Events.ERROR, this.flvErrorHandler);
    }
  }

  load() {
    return this.flvKernel.load();
  }

  attachMedia() {
    return this.flvKernel.attachMediaElement(this.video);
  }

  play() {
    return this.video.play();
  }

  destroy() {
    this.bindEvents(true);
    this.flvKernel.detachMediaElement();
    return this.flvKernel.destroy();
  }

  seek(seconds: number) {
    this.video.currentTime = seconds;
  }

  pause() {
    return this.video.pause();
  }

  refresh() {
    this.flvKernel.unload();
    return this.flvKernel.load();
  }

  @autobind
  flvErrorHandler(event: string, data: Object) {
    this.emit('error', data);
    this.emit(event, data);
    Log.error(LOG_TAG + (event ? ' ' + event : ''), data.details);
  }
}
