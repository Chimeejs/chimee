export interface IVideoKernel {
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

export interface IVideoKernelConstructor {
  new(...args: any[]): IVideoKernel;
  isSupport(): boolean;
}
