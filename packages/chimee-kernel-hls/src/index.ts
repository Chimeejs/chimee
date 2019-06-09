import { chimeeLog } from 'chimee-helper-log';
import { EventEmitter } from 'events';
import HlsCore from 'hls.js';
import { isElement } from 'toxic-predicate-functions';
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

export type HlsJSVideoKernelConfig = {
  src: string;
};

export type HlsJSCustomConfig = {
  debug?: boolean;
};

const defaultCustomConfig: HlsJSCustomConfig = {
  debug: false,
};

const LOG_TAG = 'chimee-kernel-hls';

export default class HlsJSVideoKernel extends EventEmitter implements IVideoKernel {
  public static isSupport() {
    return HlsCore.isSupported();
  }
  public config: HlsJSVideoKernelConfig;
  public customConfig: HlsJSCustomConfig;
  public hlsKernel: any;
  public version: string = process.env.VERSION;
  public video: HTMLVideoElement;

  constructor(videoElement: HTMLVideoElement, config: HlsJSVideoKernelConfig, customConfig: HlsJSCustomConfig = {}) {
    super();
    if (!isElement(videoElement)) { throw new Error(`video element passed in ${LOG_TAG} must be a HTMLVideoElement, but not ${typeof videoElement}`); }
    this.video = videoElement;
    this.config = config;
    this.customConfig = Object.assign({}, defaultCustomConfig, customConfig);
    this.hlsKernel = new HlsCore(this.customConfig);
    this.bindEvents();
    this.attachMedia();
    // If node.js version is lower than 10, there has not off method
    if (!this.off) {
      this.off = this.removeListener;
    }
  }

  public attachMedia() {
    return this.hlsKernel.attachMedia(this.video);
  }

  public bindEvents(remove: boolean = false) {
    const hlsKernel = this.hlsKernel;
    /* istanbul ignore else */
    if (hlsKernel) {
      hlsKernel[remove ? 'off' : 'on'](HlsCore.Events.ERROR, this.hlsErrorHandler);
    }
  }

  public destroy() {
    this.bindEvents(true);
    return this.hlsKernel.destroy();
  }

  public hlsErrorHandler = (event: string, data: any) => {
    this.emit('error', data);
    this.emit(event, data);

    /* istanbul ignore next */
    chimeeLog.error(LOG_TAG + (event ? ' ' + event : ''), data.details);
  }

  public load(src: string = this.config.src) {
    this.config.src = src;
    return this.hlsKernel.loadSource(src);
  }

  public pause() {
    return this.video.pause();
  }

  public play() {
    return this.video.play();
  }

  public refresh() {
    this.hlsKernel.stopLoad();
    return this.hlsKernel.loadSource(this.config.src);
  }

  public seek(seconds: number) {
    this.video.currentTime = seconds;
  }

  public startLoad() {
    return this.hlsKernel.startLoad();
  }

  public stopLoad() {
    return this.hlsKernel.stopLoad();
  }

  public unload() {
    return this.stopLoad();
  }
}
