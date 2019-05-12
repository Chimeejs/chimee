import VideoConfig from '../config/video';
import Dispatcher from '../dispatcher/index';
import VideoWrapper from '../dispatcher/video-wrapper';
import { ComputedMap, PluginConfig, PluginEvents, PluginMethods, PluginOption } from '../typings/base';
export declare type IChimeePluginConstructor = new (...args: any[]) => ChimeePlugin;
export default class ChimeePlugin extends VideoWrapper {
    $autoFocus: boolean;
    $level: number;
    $operable: boolean;
    $config: PluginOption;
    $dom: HTMLElement;
    $inner: boolean;
    $penetrate: boolean;
    $videoConfig: VideoConfig;
    destroyed: boolean;
    ready: Promise<this>;
    readySync: boolean;
    VERSION: string;
    private autoFocusValue;
    private levelValue;
    private operableValue;
    constructor({ id, name, level, operable, beforeCreate, create, init, inited, destroy, events, data, computed, methods, el, penetrate, inner, autoFocus, className, }: PluginConfig, dispatcher: Dispatcher, option?: PluginOption);
    $bumpToTop(): void;
    $destroy(): void;
    $throwError(error: Error | string): void;
    beforeCreate?(obj: {
        computed: ComputedMap;
        data: any;
        events: PluginEvents;
        methods: PluginMethods;
    }, option: PluginOption): void;
    create?(): void;
    destroy?(): void;
    init?(config: VideoConfig): void;
    inited?(): void | Promise<void>;
    runInitedHook(): Promise<this> | this;
    runInitHook(videoConfig: VideoConfig): void;
}
