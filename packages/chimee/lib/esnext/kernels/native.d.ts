/// <reference types="node" />
import * as EventEmitter from 'events';
import { IVideoKernel } from './base';
export declare type NativeVideoKernelConfig = {
    src: string;
};
export default class NativeVideoKernel extends EventEmitter implements IVideoKernel {
    static isSupport(): boolean;
    private config;
    private video;
    constructor(videoElement: HTMLVideoElement, config: NativeVideoKernelConfig, customConfig: any);
    attachMedia(): void;
    destroy(): void;
    load(src: string): void;
    pause(): void;
    play(): Promise<void>;
    refresh(): void;
    seek(seconds: number): void;
    startLoad(src: string): void;
    stopLoad(): void;
    unload(): void;
}
