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
