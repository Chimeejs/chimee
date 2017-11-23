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
		const src = config.src.toLowerCase();
		// 根据 src 判断 box
		if(!box) {
			if(src.indexOf('.flv') !== -1) {
				box = 'flv';
			} else if(src.indexOf('.m3u8') !== -1) {
				box = 'hls';
			} else if(src.indexOf('.mp4') !== -1) {
				box = 'mp4';
			} else {
				// 如果 src 不存在或无法判断，继续采用 native 方案。
				box = 'native';
			}
		}
		// 如果是自定义 box，就检测 box 有没有安装
		// 因为 native 和 mp4 都可以有原生方案支持，所以不用检测。
		if((box !== 'native' && box !== 'mp4') && !config.preset[box]) {
			Log.error(this.tag, `You want to play for ${box}, but you have not installed the kernel.`);
			return;
		}
		// 调用各个 box
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
			if(!this.timer && this.box !== 'hls') {
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
