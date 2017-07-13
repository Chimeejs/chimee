import { Log } from 'chimee-helper';
import { CustEvent } from 'chimee-helper';
import { isNumber } from 'chimee-helper';
import Mp4 from './mp4/index';
import Flv from './flv/index';
import Hls from './hls/index';

export default class Kernel extends CustEvent {
	/**
	 * 创建核心解码器
	 * @param {any} wrap 父层容器
	 * @param {any} option 整合参数
	 * @\ kernel
	 */
	constructor (videoElement, config) {
		super();
		this.tag = 'kernel';
		this.config = config;
		this.video = videoElement;
		this.videokernel = this.selectKernel();
		this.bindEvents(this.videokernel);
	}

	/**
	 * 绑定事件
	 * @memberof kernel
	 */
	bindEvents (videokernel) {
		if (videokernel) {
			videokernel.on('mediaInfo', (mediaInfo) => {
				this.emit('mediaInfo', mediaInfo);
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
					: 'mp4';

		if (box === 'mp4') {
			return new Mp4(this.video, config);
		} else if (box === 'flv') {
			return new Flv(this.video, config);
		} else if (box === 'hls') {
			return new Hls(this.video, config);
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
		if (this.videokernel && this.config.src) {
			this.videokernel.load(src);
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
