import { chimeeLog } from 'chimee-helper-log';
import { isFunction, isNumber, isString } from 'lodash';
import { isElement } from 'toxic-predicate-functions';
import NativeVideoKernel from '../kernels/native';
const LOG_TAG = 'chimee';
const boxSuffixMap = {
    flv: '.flv',
    hls: '.m3u8',
    native: '.mp4',
};
export function getLegalBox({ src, box }) {
    if (isString(box) && box) {
        return box;
    }
    src = src.toLowerCase();
    for (const key in boxSuffixMap) {
        if (boxSuffixMap.hasOwnProperty(key)) {
            const suffix = boxSuffixMap[key];
            if (src.indexOf(suffix) > -1) {
                return key;
            }
        }
    }
    return 'native';
}
export default class ChimeeKernel {
    get currentTime() {
        return this.videoElement.currentTime || 0;
    }
    constructor(videoElement, config) {
        if (!isElement(videoElement)) {
            throw new Error('You must pass in an video element to the chimee-kernel');
        }
        this.config = config;
        this.videoElement = videoElement;
        this.initVideoKernel();
    }
    attachMedia() {
        this.videoKernel.attachMedia();
    }
    destroy() {
        this.videoKernel.destroy();
    }
    initVideoKernel() {
        const config = this.config;
        const box = getLegalBox(config);
        this.box = box;
        const VideoKernel = this.chooseVideoKernel(this.box, config.preset);
        if (!isFunction(VideoKernel)) {
            throw new Error(`We can't find video kernel for ${box}. Please check your config and make sure it's installed or provided`);
        }
        const customConfig = config.presetConfig[this.box];
        if (customConfig) {
            Object.assign(config, customConfig);
        }
        this.videoKernel = new VideoKernel(this.videoElement, config, customConfig);
    }
    load(src = this.config.src) {
        this.config.src = src;
        this.videoKernel.load(src);
    }
    off(key, fn) {
        this.videoKernel.off(key, fn);
    }
    on(key, fn) {
        this.videoKernel.on(key, fn);
    }
    pause() {
        this.videoKernel.pause();
    }
    play() {
        this.videoKernel.play();
    }
    refresh() {
        this.videoKernel.refresh();
    }
    seek(seconds) {
        if (!isNumber(seconds)) {
            chimeeLog.error(LOG_TAG, `When you try to seek, you must offer us a number, but not ${typeof seconds}`);
            return;
        }
        this.videoKernel.seek(seconds);
    }
    startLoad() {
        if (!isFunction(this.videoKernel.startLoad)) {
            throw new Error('This video kernel do not support startLoad, please contact us on https://github.com/Chimeejs/chimee/issues');
        }
        this.videoKernel.startLoad(this.config.src);
    }
    stopLoad() {
        if (isFunction(this.videoKernel.stopLoad)) {
            this.videoKernel.stopLoad();
        }
    }
    chooseVideoKernel(box, preset) {
        switch (box) {
            case 'native':
                return NativeVideoKernel;
            case 'mp4':
                return this.getMp4Kernel(preset.mp4);
            case 'flv':
            case 'hls':
                return preset[box];
            default:
                throw new Error(`We currently do not support box ${box}, please contact us through https://github.com/Chimeejs/chimee/issues.`);
        }
    }
    getMp4Kernel(Mp4Kernel) {
        if (!Mp4Kernel || !isFunction(Mp4Kernel.isSupport) || !Mp4Kernel.isSupport()) {
            if (Mp4Kernel) {
                chimeeLog.warn(LOG_TAG, 'mp4 decode is not support in this browser, we will switch to the native video kernel');
            }
            this.box = 'native';
            return NativeVideoKernel;
        }
        return Mp4Kernel;
    }
}
//# sourceMappingURL=kernel.js.map