import { Log } from 'chimee-helper';
import { CustEvent } from 'chimee-helper';
import { isNumber, deepAssign } from 'chimee-helper';
import Native from './native/index';
import defaultConfig from './config';

export default class Kernel extends CustEvent {
	/**
	 * kernelWrapper
	 * @param {any} wrap videoElement
	 * @param {any} option
	 * @class kernel
	 */
	constructor (videoElement, config) {
		super();
		this.tag = 'kernel';
		this.config = deepAssign({}, defaultConfig, config);
		this.video = videoElement;
		this.videokernel = this.selectKernel();
		this.bindEvents(this.videokernel, this.video);
		this.timer = null;
	}

	/**
	 * bind events
	 * @memberof kernel
	 */
	bindEvents (videokernel, video) {
		if (videokernel) {
			videokernel.on('mediaInfo', (mediaInfo) => {
				this.emit('mediaInfo', mediaInfo);
			});

			video.addEventListener('canplay', ()=> {
				clearTimeout(this.timer);
				this.timer = null;
			});
		}
	}

	/**
	 * select kernel
	 * @memberof kernel
	 */
	selectKernel () {
		const config = this.config;

		let box = config.box;
		if(!box) {
			if(config.src.indexOf('.flv') !== -1) {
				box = 'flv';
			} else if(config.src.indexOf('.m3u8') !== -1) {
				box = 'hls';
			} else if(config.src.indexOf('mp4') !== -1) {
				box = 'mp4';
			}
		}
		if(box !== 'native' && config.preset[box]) {
			Log.error(this.tag, 'need set preset config');
			return;
		}
		if (box === 'native') {
			return new Native(this.video, config);
		} else if (box === 'flv') {
			return new config.preset[box](this.video, config);
		} else if (box === 'hls') {
			return new config.preset[box](this.video, config);
		} else if(box === 'mp4') {
			if(config.preset[box] && config.preset[box].isSupport()) {
				return new config.preset[box](this.video, config);
			} else {
				Log.verbose(this.tag, 'browser is not support mp4 decode, auto switch native player');
				return new Native(this.video, config);
			}
		} else {
			Log.error(this.tag, 'not mactch any player, please check your config');
			return null;
		}
	}

	/**
	 * select attachMedia
	 * @memberof kernel
	 */
	attachMedia () {
		if (this.videokernel) {
			this.videokernel.attachMedia();
		} else {
			Log.error(this.tag, 'videokernel is not already, must init player');
		}
	}
	/**
	 * load source
	 * @param {string} src 
	 * @memberof kernel
	 */
	load (src) {
		this.config.src = src || this.config.src;
		if (this.videokernel && this.config.src) {
			this.videokernel.load(this.config.src);
			if(!this.timer) {
				this.timer = setTimeout(()=>{
					this.timer = null;
					this.pause();
					this.refresh();
				}, this.config.reloadTime);
			}
		} else {
			Log.error(this.tag, 'videokernel is not already, must init player');
		}
	}
	/**
	 * destory kernel
	 * @memberof kernel
	 */
	destroy () {
		if (this.videokernel) {
			this.videokernel.destroy();
			clearTimeout(this.timer);
			this.timer = null;
		} else {
			Log.error(this.tag, 'videokernel is not exit');
		}
	}
	/**
	 * to play
	 * @memberof kernel
	 */
	play () {
		if (this.videokernel) {
			this.videokernel.play();
		} else {
			Log.error(this.tag, 'videokernel is not already, must init player');
		}
	}
	/**
	 * pause
	 * @memberof kernel
	 */
	pause () {
		if (this.videokernel && this.config.src) {
			this.videokernel.pause();
		} else {
			Log.error(this.tag, 'videokernel is not already, must init player');
		}
	}
	/**
	 * get video currentTime
	 * @memberof kernel
	 */
	get currentTime () {
		if (this.videokernel) {
			return this.video.currentTime;
		}
		return 0;
	}
	/**
	 * seek to a point
	 * @memberof kernel
	 */
	seek (seconds) {
		if (!isNumber(seconds)) {
			Log.error(this.tag, 'seek params must be a number');
			return;
		}
		if(this.videokernel) {
			return this.videokernel.seek(seconds);
		} else {
			Log.error(this.tag, 'videokernel is not already, must init player');
		}
	}
	/**
	 * refresh kernel
	 * @memberof kernel
	 */
	refresh () {
		if(this.videokernel) {
			this.videokernel.refresh();
		} else {
			Log.error(this.tag, 'videokernel is not already, must init player');
		}
	}
	/**
	 * get video duration
	 * @memberof kernel
	 */
	get duration () {
		return this.video.duration;
	}
	/**
	 * get video volume
	 * @memberof kernel
	 */
	get volume () {
		return this.video.volume;
	}
	 /**
	 * set video volume
	 * @memberof kernel
	 */
	set volume (value) {
		this.video.volume = value;
	}
	/**
	 * get video muted
	 * @memberof kernel
	 */
	get muted () {
		return this.video.muted;
	}
	/**
	 * set video muted
	 * @memberof kernel
	 */
	set muted (muted) {
		this.video.muted = muted;
	}
	 /**
	 * get video buffer
	 * @memberof kernel
	 */
	get buffered () {
		return this.video.buffered;
	}
}
