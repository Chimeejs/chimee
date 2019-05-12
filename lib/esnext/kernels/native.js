import * as EventEmitter from 'events';
import { isElement } from 'toxic-predicate-functions';
let tempCurrentTime = 0;
export default class NativeVideoKernel extends EventEmitter {
    static isSupport() {
        return true;
    }
    constructor(videoElement, config = { src: '' }, customConfig) {
        super();
        if (!isElement(videoElement)) {
            throw new Error(`You must pass in an legal video element but not ${typeof videoElement}`);
        }
        this.video = videoElement;
        this.config = config;
    }
    attachMedia() {
    }
    destroy() {
        if (isElement(this.video)) {
            this.stopLoad();
        }
    }
    load(src) {
        this.video.setAttribute('src', src);
        this.video.src = src;
    }
    pause() {
        return this.video.pause();
    }
    play() {
        return this.video.play();
    }
    refresh() {
        this.video.src = this.config.src;
    }
    seek(seconds) {
        this.video.currentTime = seconds;
    }
    startLoad(src) {
        const currentTime = typeof this.video.currentTime === 'number'
            ? this.video.currentTime
            : tempCurrentTime;
        this.load(src);
        this.seek(currentTime);
    }
    stopLoad() {
        tempCurrentTime = this.video.currentTime;
        this.video.src = '';
        this.video.removeAttribute('src');
    }
    unload() {
    }
}
//# sourceMappingURL=native.js.map