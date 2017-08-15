import { Log } from 'chimee-helper';
import { CustEvent } from 'chimee-helper';
import { isNumber, deepAssign } from 'chimee-helper';
import Native from './native/index';
import defaultConfig from './config';

export default class Kernel extends CustEvent {
	/**
	 * 创建核心解码器
	 * @param {any} wrap 父层容器
	 * @param {any} option 整合参数
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
	 * 绑定事件
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
	 * 选择解码器
	 * @memberof kernel
	 */
	selectKernel () {
		const config = this.config;

		const box = config.box
			? config.box
			: config.src.indexOf('.flv') !== -1
				? 'flv'
				: config.src.indexOf('.m3u8') !== -1
					? 'hls'
					: 'native';

		if (box === 'native') {
			return new Native(this.video, config);
		} else if (box === 'flv') {
			return new config.preset[box](this.video, config);
		} else if (box === 'hls') {
			return new config.preset[box](this.video, config);
		} else {
			Log.error(this.tag, 'not mactch any player, please check your config');
			return null;
		}
	}

	attachMedia () {
		if (this.videokernel) {
			this.videokernel.attachMedia();
		} else {
			Log.error(this.tag, 'video player is not already, must init player');
		}
	}

	/**
	 * 启动加载
	 * @param {string} src 媒体资源地址
	 * @memberof kernel
	 */
	load (src) {
		this.config.src = src || this.config.src;
		console.log(this.config.reloadTime)
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
			Log.error(this.tag, 'video player is not already, must init player');
		}
	}
	/**
	 * 销毁kernel
	 * @memberof kernel
	 */
	destroy () {
		if (this.videokernel) {
			this.videokernel.destroy();
			clearTimeout(this.timer);
			this.timer = null;
		} else {
			Log.error(this.tag, 'player is not exit');
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
			Log.error(this.tag, 'video player is not already, must init player');
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
			Log.error(this.tag, 'video player is not already, must init player');
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
		return this.videokernel.seek(seconds);
	}

	refresh () {
		this.videokernel.refresh();
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
