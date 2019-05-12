import { IVideoKernel, IVideoKernelConstructor } from '../kernels/base';
import { SupportedKernelType } from '../typings/base';
export declare function getLegalBox({ src, box }: {
    box: string;
    src: string;
}): string;
export interface IChimeeKernelConfig {
    box: string;
    isLive: boolean;
    preset: {
        [key in SupportedKernelType]?: IVideoKernelConstructor;
    };
    presetConfig: {
        [x: string]: object;
    };
    src: string;
}
export default class ChimeeKernel {
    readonly currentTime: number;
    box: string;
    boxConfig: object;
    config: IChimeeKernelConfig;
    videoElement: HTMLVideoElement;
    videoKernel: IVideoKernel;
    constructor(videoElement: HTMLVideoElement, config: IChimeeKernelConfig);
    attachMedia(): void;
    destroy(): void;
    initVideoKernel(): void;
    load(src?: string): void;
    off(key: string, fn: (...args: any[]) => any): void;
    on(key: string, fn: (...args: any[]) => any): void;
    pause(): void;
    play(): void;
    refresh(): void;
    seek(seconds: number): void;
    startLoad(): void;
    stopLoad(): void;
    private chooseVideoKernel;
    private getMp4Kernel;
}
