import { CustEvent } from 'chimee-helper';
import defaultConfig from './config';
import { deepAssign } from 'chimee-helper';
/**
 * mp4解码器
 *
 * @export
 * @class Mp4
 */
export default class Mp4 extends CustEvent {
    /**
     * Creates an instance of Mp4.
     * @param {any} videodom video dom对象
     * @param {any} config 配置
     *
     * @memberof Mp4
     */
    constructor (videodom, config) {
        super();
        this.video = videodom;
        this.box = 'mp4';
        this.config = defaultConfig;
        deepAssign(this.config, config);
        this.bindEvents();
    }

    internalPropertyHandle () {
        if (!Object.getOwnPropertyDescriptor) {
            return;
        }
        const _this = this;
        const time = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'currentTime');

        Object.defineProperty(this.video, 'currentTime', {
            get: () => {
                return time.get.call(_this.video);
            },
            set: (t) => {
                if (!_this.currentTimeLock) {
                    throw new Error('can not set currentTime by youself');
                } else {
                    return time.set.call(_this.video, t);
                }
            }
        });
    }

    bindEvents () {
        if (this.video && this.config.lockInternalProperty) {
            this.video.addEventListener('canplay', () => {
                this.internalPropertyHandle();
            });
        }
    }

    load (src) {
        this.config.src = src || this.config.src;
        this.video.src = this.config.src;
    }

    unload () {
        this.video.src = '';
        this.video.removeAttribute('src');
    }

    destroy () {
        if (this.video) {
            this.unload();
        }
    }

    play () {
        return this.video.play();
    }

    pause () {
        return this.video.pause();
    }

    attachMedia () {

    }

    seek (seconds) {
        this.currentTimeLock = true;
        this.video.currentTime = seconds;
        this.currentTimeLock = false;
    }
}
