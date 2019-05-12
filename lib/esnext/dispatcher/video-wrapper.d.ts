import VideoConfig from '../config/video';
import { ChimeeDomElement } from '../const/dom';
import Dom from '../dispatcher/dom';
import Dispatcher from '../dispatcher/index';
import ChimeePlugin from '../dispatcher/plugin';
import { IVideoKernelConstructor } from '../kernels/base';
import { ChimeePictureInPictureOnWindow } from '../plugin/picture-in-picture';
import { BinderTarget, EventOptions, SupportedKernelType, UserConfig, UserKernelsConfig, VesselConfig } from '../typings/base';
declare global {
    interface Window {
        __chimee_picture_in_picture: ChimeePictureInPictureOnWindow;
    }
}
export default class VideoWrapper {
    readonly $container: Element;
    readonly $pluginOrder: string[];
    readonly $plugins: {
        [id: string]: ChimeePlugin;
    };
    readonly $video: HTMLVideoElement;
    readonly $wrapper: Element;
    container: VesselConfig;
    currentTime: number;
    protected dispatcher: Dispatcher;
    readonly fullscreenElement: Element | string | void;
    protected id: string;
    readonly inPictureInPictureMode: boolean;
    readonly isFullscreen: boolean | string;
    readonly pictureInPictureWindow: void | ChimeePictureInPictureOnWindow;
    readonly videoRequireGuardedAttributes: string[];
    autoload: boolean;
    autoplay: boolean;
    box: 'mp4' | 'hls' | 'flv' | '';
    readonly buffered: TimeRanges;
    readonly canPlayType: () => CanPlayTypeResult;
    readonly captureStream: () => void;
    changeWatchable: boolean;
    controls: boolean;
    readonly controlsList: boolean;
    crossOrigin: string;
    readonly currentSrc: string;
    readonly dataset: DOMStringMap;
    defaultMuted: boolean;
    defaultPlaybackRate: number;
    disableRemotePlayback: boolean;
    readonly duration: number;
    readonly ended: boolean;
    readonly error: MediaError;
    readonly exitFullscreen: Dom['exitFullscreen'];
    readonly focus: Dom['focus'];
    readonly fullscreen: Dom['fullscreen'];
    height: number;
    isLive: boolean;
    kernels: UserKernelsConfig;
    loop: boolean;
    muted: boolean;
    readonly networkState: number;
    readonly offsetHeight: number;
    readonly offsetLeft: number;
    readonly offsetParent: Element;
    readonly offsetTop: number;
    readonly offsetWidth: number;
    readonly pause: () => Promise<void>;
    readonly paused: boolean;
    readonly play: () => Promise<void>;
    playbackRate: number;
    playsInline: boolean;
    poster: string;
    preload: 'none' | 'auto' | 'metadata' | '';
    preset: {
        [key in SupportedKernelType]?: IVideoKernelConstructor;
    };
    presetConfig: {
        [x: string]: object;
    };
    readonly readyState: number;
    readonly requestFullscreen: Dom['requestFullscreen'];
    readonly seek: (n: number) => Promise<void>;
    readonly seekable: TimeRanges;
    readonly setSinkId: () => void;
    readonly sinkId: boolean;
    src: string;
    readonly startLoad: () => Promise<void>;
    readonly stopLoad: () => Promise<void>;
    readonly tabIndex: number;
    volume: number;
    width: number;
    x5VideoOrientation: 'landscape' | 'portrait' | undefined;
    x5VideoPlayerFullscreen: boolean;
    x5VideoPlayerType: 'h5' | undefined;
    xWebkitAirplay: boolean;
    private events;
    private unwatchHandlers;
    constructor({ dispatcher, id }: {
        dispatcher?: Dispatcher;
        id: string;
    });
    $attr(targetOrAttr: ChimeeDomElement | string, attrOrValue?: string, valueOrNothing?: string | void): string | void;
    $css(targetOrAttr: ChimeeDomElement | string, attrOrValue?: string, valueOrNothing?: string | void): string | void;
    $del(obj: any, property: string): void;
    $emit(key: string | {
        name: string;
        target: BinderTarget;
    }, ...args: any): Promise<any>;
    $emitSync(key: string | {
        name: string;
        target: BinderTarget;
    }, ...args: any): boolean;
    $fullscreen(flag?: boolean, element?: ChimeeDomElement): boolean;
    $off(key: string, fn: (...args: any[]) => any, options?: EventOptions): void;
    $on(key: string, fn: (...args: any[]) => any, options?: EventOptions): void;
    $once(key: string, fn: (...args: any[]) => any, options?: EventOptions): void;
    $set(obj: any, property: string | number, value: any): void;
    $silentLoad(src: string, option?: {
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
    }): Promise<void>;
    $watch(key: string | string[], handler: (...args: any[]) => any, { deep, diff, other, proxy, }?: {
        deep?: boolean;
        diff?: boolean;
        other?: any;
        proxy?: boolean;
    }): () => void;
    exitPictureInPicture(): Promise<any>;
    load(...args: any[]): Promise<void>;
    requestPictureInPicture(): Promise<any>;
    protected destroyVideoWrapper(): void;
    protected wrapAsVideo(videoConfig: VideoConfig): void;
    private addEvents;
    private getRealInfoForStyleAndAttr;
    private removeEvents;
}
