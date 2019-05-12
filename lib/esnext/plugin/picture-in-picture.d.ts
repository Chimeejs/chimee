import Dispatcher from '../dispatcher/index';
import ChimeePlugin from '../dispatcher/plugin';
import { PluginConfig, PluginOption } from '../typings/base';
export declare type ChimeePictureInPictureOnWindow = {
    element?: HTMLVideoElement;
    plugin?: PictureInPicture;
    window?: Element;
};
declare global {
    interface Window {
        __chimee_picture_in_picture: ChimeePictureInPictureOnWindow;
    }
}
export default class PictureInPicture extends ChimeePlugin {
    $dom: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    hasStopRender: boolean;
    isShown: boolean;
    myStyle: {
        bottom: string | number;
        height: number;
        left: string | number;
        position: string;
        right: string | number;
        top: string | number;
        width: number;
        [key: string]: string | number;
    };
    constructor(config: PluginConfig, dispatcher: Dispatcher, option: PluginOption);
    closeCurrentPicture(): void;
    create(): void;
    exitPictureInPicture: () => Promise<void>;
    getContext(): void;
    hide(): void;
    inited: () => void;
    poller(fn: () => void): void;
    render(): void;
    requestPictureInPicture: ({ autoplay, }?: {
        autoplay?: boolean;
    }) => Promise<void>;
    setStyle(styles?: {
        [x: string]: string | number;
    }): void;
    show(): void;
}
