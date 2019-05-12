import GlobalConfig from './config/global';
import Dispatcher from './dispatcher/index';
import ChimeePlugin, { IChimeePluginConstructor } from './dispatcher/plugin';
import VideoWrapper from './dispatcher/video-wrapper';
import { PluginOption, UserConfig } from './typings/base';
export default class Chimee extends VideoWrapper {
    static registerEvents({ name, target, }?: {
        name?: string;
        target?: string;
    }): void;
    readonly config: {
        errorHandler: (...args: any[]) => any | void;
    };
    destroyed: boolean;
    ready: Promise<void>;
    readySync: boolean;
    readonly version: string;
    static readonly config: GlobalConfig;
    static readonly getPluginConfig: typeof Dispatcher.getPluginConfig;
    static readonly hasInstalled: typeof Dispatcher.hasInstalled;
    static readonly hasInstalledKernel: typeof Dispatcher.hasInstalledKernel;
    static readonly install: typeof Dispatcher.install;
    static readonly installKernel: typeof Dispatcher.installKernel;
    static readonly plugin: IChimeePluginConstructor;
    static readonly uninstall: typeof Dispatcher.uninstall;
    static readonly uninstallKernel: typeof Dispatcher.uninstallKernel;
    constructor(rawConfig: UserConfig | string | Element);
    customThrowError(error: Error | string): any;
    destroy(): void;
    unuse(name: string): void;
    use(option: string | PluginOption): Promise<ChimeePlugin>;
}
