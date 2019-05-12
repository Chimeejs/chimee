import { RealChimeeDomElement } from '../const/dom';
import Dispatcher from '../dispatcher/index';
import { UserConfig } from '../typings/base';
export interface IFriendlyDom {
    autoFocusToVideo(element: Element, remove?: boolean): void;
}
export default class Dom {
    mouseInVideo: boolean;
    readonly videoExtendedNodes: Element[];
    container: Element;
    destroyed: boolean;
    dispatcher: Dispatcher;
    fullscreenElement: Element | 'wrapper' | 'container' | 'video' | void;
    isFullscreen: boolean | string;
    mouseInVideoValue: boolean;
    originHTML: string;
    plugins: {
        [x: string]: Element;
    };
    videoElement: HTMLVideoElement;
    videoExtendedNodesArray: Element[];
    videoRequireGuardedAttributes: string[];
    wrapper: Element;
    constructor(config: UserConfig, dispatcher: Dispatcher);
    destroy(): void;
    exitFullscreen(): boolean;
    focus(): void;
    fullscreen(request?: boolean, target?: RealChimeeDomElement): boolean;
    getAttr(target: RealChimeeDomElement, attr: string): string;
    getStyle(target: RealChimeeDomElement, attr: string): string;
    insertPlugin(id: string, el?: string | HTMLElement | {
        className?: string | string[];
        inner?: boolean;
        penetrate?: boolean;
    } | void, option?: {
        className?: string | string[];
        inner?: boolean;
        penetrate?: boolean;
    }): HTMLElement;
    installVideo(videoElement: HTMLVideoElement): HTMLVideoElement;
    isNodeInsideVideo(node: Element): boolean;
    migrateVideoRequiredGuardedAttributes(video: HTMLVideoElement): void;
    removePlugin(id: string): void;
    removeVideo(): HTMLVideoElement;
    requestFullscreen(target: RealChimeeDomElement): boolean;
    setAttr(target: RealChimeeDomElement, attr: string, val: string | void | number | boolean): void;
    setPluginsZIndex(plugins: string[]): void;
    setStyle(target: RealChimeeDomElement, attr: string, val: any): void;
    protected autoFocusToVideo(element: Element, remove?: boolean): void;
    private focusToVideo;
    private fullscreenMonitor;
}
