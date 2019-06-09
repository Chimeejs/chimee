import { chimeeLog } from 'chimee-helper-log';
import { EventEmitter } from 'events';
import FlvCore from 'flv.js';
import { isElement } from 'toxic-predicate-functions';

const LOG_TAG = 'chimee-kernel-flv.js';

interface IVideoKernel {
  attachMedia(): void;
  destroy(): void;
  load(src: string): void;
  off(key: string, fn: (...args: any[]) => any): void;
  on(key: string, fn: (...args: any[]) => any): void;
  pause(): void;
  play(): void;
  refresh(): void;
  seek(seconds: number): void;
  startLoad(src: string): void;
  stopLoad(): void;
  unload(): void;
}

export type FlvJSVideoKernelConfig = {
  box: 'mp4' | 'hls' | 'flv' | '';
  isLive: boolean;
  src: string;
};

export default class Flv extends EventEmitter implements IVideoKernel {

  public static isSupport() {
    return FlvCore.isSupported();
  }
  public config: FlvJSVideoKernelConfig;
  public customConfig: FlvCore.Config;
  public flvKernel: FlvCore.Player;
  public mediaDataSource: FlvCore.MediaDataSource;
  public version: string = process.env.VERSION;
  public video: HTMLVideoElement;

  constructor(videoElement: HTMLVideoElement, config: FlvJSVideoKernelConfig, customConfig: Partial<FlvCore.Config & FlvCore.MediaDataSource> = {}) {
    super();
    if (!isElement(videoElement)) { throw new Error(`video element passed in ${LOG_TAG} must be a HTMLVideoElement, but not ${typeof videoElement}`); }
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
    } = customConfig;
    const mediaDataSource: FlvCore.MediaDataSource = {
      duration,
      filesize,
      hasAudio,
      hasVideo,
      isLive,
      type: box,
      url: src,
      withCredentials,
    };
    if (box !== 'mp4') { mediaDataSource.segments = segments; }
    this.mediaDataSource = mediaDataSource;
    this.customConfig = customConfig;
    this.flvKernel = FlvCore.createPlayer(mediaDataSource, customConfig);
    this.bindEvents();
    this.attachMedia();
    // If node.js version is lower than 10, there has not off method
    if (!this.off) {
      this.off = this.removeListener;
    }
  }

  public attachMedia() {
    return this.flvKernel.attachMediaElement(this.video);
  }

  public bindEvents(remove: boolean = false) {
    const flvKernel = this.flvKernel;
    /* istanbul ignore else */
    if (flvKernel) {
      flvKernel[remove ? 'off' : 'on'](FlvCore.Events.ERROR, this.flvErrorHandler);
    }
  }

  public destroy() {
    this.bindEvents(true);
    this.flvKernel.detachMediaElement();
    return this.flvKernel.destroy();
  }

  public flvErrorHandler = (event: string, data: any) => {
    this.emit('error', data);
    this.emit(event, data);
    /* istanbul ignore next */
    chimeeLog.error(LOG_TAG + (event ? ' ' + event : ''), data.details);
  }

  public load() {
    return this.flvKernel.load();
  }

  public pause() {
    return this.flvKernel.pause();
  }

  public play() {
    return this.flvKernel.play();
  }

  public refresh() {
    this.flvKernel.unload();
    return this.flvKernel.load();
  }

  public seek(seconds: number) {
    this.flvKernel.currentTime = seconds;
  }

  public startLoad() {
    return this.load();
  }

  public stopLoad() {
    return this.flvKernel.unload();
  }

  public unload() {
    return this.stopLoad();
  }
}
