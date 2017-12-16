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
