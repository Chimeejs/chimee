import { CustEvent } from 'chimee-helper';
import defaultConfig from './config';
import { deepAssign } from 'chimee-helper';
/**
 * native player
 *
 * @export
 * @class Native
 */
export default class Native extends CustEvent {
  /**
   * Creates an instance of Native.
   * @param {any} videodom video dom
   * @param {any} config 
   * @memberof Native
   */
  constructor (videodom, config) {
    super();
    this.video = videodom;
    this.box = 'native';
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
    this.video.setAttribute('src', this.config.src);
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

  refresh () {
    this.video.src = this.config.src;
  }

  attachMedia () {

  }

  seek (seconds) {
    this.currentTimeLock = true;
    this.video.currentTime = seconds;
    this.currentTimeLock = false;
  }
}
