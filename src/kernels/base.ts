export interface IVideoKernel {
  load(src: string): void;
  unload(): void;
  startLoad(src: string): void;
  stopLoad(): void;
  play(): void;
  pause(): void;
  refresh(): void;
  attachMedia(): void;
  seek(seconds: number): void;
  destroy(): void;
  on(key: string, fn: (...args: any[]) => any): void;
  off(key: string, fn: (...args: any[]) => any): void;
}
