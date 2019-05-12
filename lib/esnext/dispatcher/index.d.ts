import Vessel from '../config/vessel';
import VideoConfig from '../config/video';
import Binder from '../dispatcher/binder';
import Dom from '../dispatcher/dom';
import ChimeeKernel from '../dispatcher/kernel';
import ChimeePlugin, { IChimeePluginConstructor } from '../dispatcher/plugin';
import Chimee from '../index';
import { IVideoKernelConstructor } from '../kernels/base';
import { ChimeePictureInPictureOnWindow } from '../plugin/picture-in-picture';
import PictureInPicture from '../plugin/picture-in-picture';
import { PluginConfig, PluginOption, SupportedKernelType, UserConfig, UserKernelsConfig } from '../typings/base';
declare global {
    interface Window {
        __chimee_picture_in_picture: ChimeePictureInPictureOnWindow;
    }
}
export interface IFriendlyDispatcher {
    getTopLevel: Dispatcher['getTopLevel'];
    sortZIndex: Dispatcher['sortZIndex'];
}
export default class Dispatcher {
    static getPluginConfig(id: string): PluginConfig | void | IChimeePluginConstructor;
    static hasInstalled(id: string): boolean;
    static hasInstalledKernel(key: SupportedKernelType): boolean;
    readonly inPictureInPictureMode: boolean;
    static install(config: PluginConfig | IChimeePluginConstructor): string;
    static installKernel(key: SupportedKernelType | {
        [key in SupportedKernelType]?: IVideoKernelConstructor;
    }, value?: IVideoKernelConstructor): void;
    static uninstall(id: string): void;
    static uninstallKernel(key: SupportedKernelType): void;
    binder: Binder;
    changeWatchable: boolean;
    containerConfig: Vessel;
    destroyed: true;
    dom: Dom;
    kernel: ChimeeKernel;
    kernelEventHandlerList: Array<(...args: any[]) => any>;
    order: string[];
    plugins: {
        [id: string]: ChimeePlugin;
        pictureInPicture?: PictureInPicture;
    };
    ready: Promise<void>;
    readySync: boolean;
    videoConfig: VideoConfig;
    videoConfigReady: boolean;
    vm: Chimee;
    zIndexMap: {
        inner: string[];
        outer: string[];
    };
    private silentLoadTempKernel;
    constructor(config: UserConfig, vm: Chimee);
    destroy(): void;
    exitPictureInPicture(): any;
    getPluginConfig(id: string): PluginConfig | void | IChimeePluginConstructor;
    hasUsed(id: string): boolean;
    load(srcOrOption: string | {
        box?: string;
        isLive?: boolean;
        kernels?: UserKernelsConfig;
        preset?: UserConfig['preset'];
        src: string;
    }, option?: {
        box?: string;
        isLive?: boolean;
        kernels?: UserKernelsConfig;
        preset?: UserConfig['preset'];
    }): void;
    onReady(): void;
    requestPictureInPicture(): Promise<any>;
    silentLoad(src: string, option?: {
        abort?: boolean;
        bias?: number;
        box?: string;
        duration?: number;
        immediate?: boolean;
        increment?: number;
        isLive?: boolean;
        kernels?: UserKernelsConfig;
        preset?: UserConfig['preset'];
        repeatTimes?: number;
    }): Promise<void | {}>;
    switchKernel({ video, kernel, config, notifyChange }: {
        config: {
            box: string;
            isLive: boolean;
            kernels: UserKernelsConfig;
            preset: UserConfig['preset'];
            src: string;
        };
        kernel: ChimeeKernel;
        notifyChange?: boolean;
        video: HTMLVideoElement;
    }): void;
    throwError(error: Error | string): void;
    unuse(id: string): void;
    use(option: string | PluginOption): Promise<ChimeePlugin>;
    private autoloadVideoSrcAtFirst;
    private changeUnwatchable;
    private createKernel;
    private getTopLevel;
    private initUserPlugin;
    private sortZIndex;
}
