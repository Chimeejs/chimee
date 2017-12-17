declare module 'chimee-kernel' {
  declare export default class ChimeeKernel extends CustEvent {
    box: string;
    boxConfig: Object;
    config: KernelConfig;
    videoElement: HTMLVideoElement;
    videoKernel: VideoKernel;
    VERSION: string;
    currentTime: number;
    destroy(): void;
    attachMedia(): void;
    load(src: string): void;
    play(): void;
    pause(): void;
    seek(seconds: number): void;
    refresh(): void;
  }
}

declare type KernelConfig = {
  src: string,
  isLive: boolean,
  box: string,
  preset: {
    [string]: Function,
  },
  presetConfig: {
    [string]: Object,
  },
};

declare export class VideoKernel extends Custevent {
  static isSupport(): boolean;
  constructor(videoElement: HTMLVideoElement, config: Object, customConfig: Object): void;
  video: HTMLVideoElement;
  config: Object;
  load(src: string): void;
  unload(): void;
  play(): void;
  pause(): void;
  refresh(): void;
  attachMedia(): void;
  seek(seconds: number): void;
  destroy(): void;
}
