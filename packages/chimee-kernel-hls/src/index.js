import HlsCore from 'hls.js';
import {CustEvent} from 'chimee-helper';
import defaultConfig from './config';
import {deepAssign} from 'chimee-helper';

export default class Hls extends CustEvent {

  static isSupport () {
    return HlsCore.isSupported();
  }

  static get version() {
    return __VERSION__;
  }

	constructor (videodom, config) {
    super();
    this.tag = 'HLS-player';
    this.video = videodom;
    this.box = 'hls';
    this.config = deepAssign({}, defaultConfig, config);
    this.hls = new HlsCore();
    this.bindEvents(this.hls);
    this.attachMedia();
  }

  internalPropertyHandle () {
    if(!Object.getOwnPropertyDescriptor) {
      return;
    }
    const _this = this;
    const time = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'currentTime');

    Object.defineProperty(this.video, 'currentTime', {
    	get: ()=> {
		    return time.get.call(_this.video);
		  },
      set: (t)=> {
        if(!_this.currentTimeLock) {
          throw new Error('can not set currentTime by youself');
        } else {
          return time.set.call(_this.video, t);
        }
      }
    });
  }

  bindEvents (hlsKernel) {
    if(hlsKernel) {
      hlsKernel.on(HlsCore.Events.ERROR, (event, data) => {
        // this.emit(this.tag, data);
      });

      hlsKernel.on(HlsCore.Events.LEVEL, (event, data) => {

      });
    }
    if(this.video && this.config.lockInternalProperty) {
      this.video.addEventListener('canplay', () => {
        this.internalPropertyHandle();
      });
    }
  }

  load () {
  	this.hls.loadSource(this.config.src);
  }

  attachMedia () {
  	this.hls.attachMedia(this.video);
  }

  play () {
  	return this.video.play();
  }

  destroy () {
  	return this.hls.destroy();
  }

  seek (seconds) {
  	this.currentTimeLock = true;
    // throttle(this._seek.bind(this, seconds), 200, {leading: false});
    this._seek(seconds);
  	this.currentTimeLock = false;
  }

  _seek (seconds) {
   this.video.currentTime = seconds;
  }

  pause () {
    return this.video.pause();
  }

  refresh () {
    this.hls.stopLoad();
    this.hls.loadSource(this.config.src);
  }
}
