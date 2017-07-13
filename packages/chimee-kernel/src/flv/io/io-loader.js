/**
* 处理range的静态函数
* author songguangyu
* emil 522963130@qq.com
*/

import FetchLoader from './fetch';
import RangeLoader from './xhr-range';
import MozChunkLoader from './xhr-moz-chunk';
import {CustEvent} from 'chimee-helper';

export default class Ioloader extends CustEvent {

	/**
	* 处理io的调用器 缓存多余数据
	* @param  {object} video config
	*/
	constructor (config) {
		super();
		this.loader = null;
		this.config = {};
		Object.assign(this.config, config);
		this.selectLoader();
		this.bufferSize = 1024 * 1024 * 3; // initial size: 3MB
		this.cacheBuffer = new ArrayBuffer(this.bufferSize);
		this.cacheRemain = 0;
		this.stashByteStart = 0;
		this.enableStash = true;
		this.stashSize = 1024 * 384;
		this.resumeFrom = 0;
		this.currentRange = {};
		this.totalReceive = 0;
		this.seekPonit = 0;
	}

	/**
	* 自动选择io处理器
	*/
	selectLoader () {
		const config = this.config;
		const url = this.config.src;

		if(FetchLoader.isSupport()) {
			this.loader = new FetchLoader(url, config);
		} else if(MozChunkLoader.isSupport()) {
			this.loader = new MozChunkLoader(url, config);
		} else if(RangeLoader.isSupport()) {
			this.loader = new RangeLoader(url, config);
		}
		this.loader.arrivalDataCallback = this.onLoaderChunkArrival.bind(this);
	}

	/**
	* 数据接收器
	* @param  {arrayBuffer} chunk data
	* @param  {number} chunk byte postion
	*/
	onLoaderChunkArrival (chunk, byteStart, keyframePoint) {
		if(keyframePoint) {
			this.seekPonit = keyframePoint;
		}
		if(this.arrivalDataCallback) {
			this.totalReceive += chunk.byteLength;

			if (this.cacheRemain === 0 && this.stashByteStart === 0) {
          // This is the first chunk after seek action
         this.stashByteStart = byteStart;
      }
      if (this.cacheRemain + chunk.byteLength <= this.stashSize) {
          // 小于cache大小 则看做数据太小 进行缓存 不进行下发
        const stashArray = new Uint8Array(this.cacheBuffer, 0, this.stashSize);
        stashArray.set(new Uint8Array(chunk), this.cacheRemain);
        this.cacheRemain += chunk.byteLength;
      } else { // 大于cache大小的 则把数据放入播放器 溢出数据进行缓存
        let stashArray = new Uint8Array(this.cacheBuffer, 0, this.bufferSize);
        if (this.cacheRemain > 0) { // There're stash datas in buffer
          // dispatch the whole stashBuffer, and stash remain data
          // then append chunk to stashBuffer (stash)
          const buffer = this.cacheBuffer.slice(0, this.cacheRemain);
          let consumed = 0;
          if(this.seekPonit) {
          	consumed = this.arrivalDataCallback(buffer, this.stashByteStart, this.seekPonit);
          	this.seekPonit = 0;
          } else {
          	consumed = this.arrivalDataCallback(buffer, this.stashByteStart);
          }
          // const consumed = this.arrivalDataCallback(buffer, this.stashByteStart, keyframePoint);
          if (consumed < buffer.byteLength) {
            if (consumed > 0) {
              const remainArray = new Uint8Array(buffer, consumed);
              stashArray.set(remainArray, 0);
              this.cacheRemain = remainArray.byteLength;
              this.stashByteStart += consumed;
            }
          } else {
            this.cacheRemain = 0;
            this.stashByteStart += consumed;
          }
          if (this.cacheRemain + chunk.byteLength > this.bufferSize) {
            this.expandBuffer(this.cacheRemain + chunk.byteLength);
            stashArray = new Uint8Array(this.cacheBuffer, 0, this.bufferSize);
          }
          stashArray.set(new Uint8Array(chunk), this.cacheRemain);
          this.cacheRemain += chunk.byteLength;
        } else { // stash buffer empty, but chunkSize > stashSize (oh, holy shit)
          // dispatch chunk directly and stash remain data
          // const consumed = this.arrivalDataCallback(chunk, byteStart, keyframePoint);
          let consumed = 0;
          if(this.seekPonit) {
          	consumed = this.arrivalDataCallback(chunk, byteStart, this.seekPonit);
          	this.seekPonit = 0;
          } else {
          	consumed = this.arrivalDataCallback(chunk, byteStart);
          }
          if (consumed < chunk.byteLength) {
            const remain = chunk.byteLength - consumed;
            if (remain > this.bufferSize) {
              this.expandBuffer(remain);
              stashArray = new Uint8Array(this.cacheBuffer, 0, this.bufferSize);
            }
            stashArray.set(new Uint8Array(chunk, consumed), 0);
            this.cacheRemain += remain;
            this.stashByteStart = byteStart + consumed;
          }
        }
      }
		}
	}
	// 	if(this.arrivalDataCallback) {
	// 		this.totalReceive += chunk.byteLength;
	// 		if(this.cacheRemain) {
	// 			if(this.cacheRemain + chunk.byteLength > this.bufferSize) {
	// 				this.expandBuffer();
	// 			}
	// 			console.log(this.cacheRemain);
	// 			const stashArray = new Uint8Array(this.cacheBuffer, 0, this.bufferSize);
  //     	stashArray.set(new Uint8Array(chunk), this.cacheRemain);
	// 			this.cacheRemain = this.arrivalDataCallback(this.cacheBuffer, byteStart, this.seekPonit);
	// 			if(this.cacheRemain && this.cacheRemain < chunk.byteLength) {
	// 				this.initCacheBuffer();
	// 				const stashArray = new Uint8Array(this.cacheBuffer, 0, this.bufferSize);
  //     		stashArray.set(new Uint8Array(chunk.slice(this.cacheRemain)), 0);
	// 			}
	// 		} else {
	// 			this.cacheRemain = this.arrivalDataCallback(chunk, byteStart, this.seekPonit);
	// 		}

	// 	}
	// }
	/**
	* 清空缓存buffer
	*/
	initCacheBuffer () {
		this.cacheBuffer = new ArrayBuffer(this.bufferSize);
	}

	/**
	* 动态扩展buffer存储器大小
	* @param  {number} chunk byte size
	*/
	expandBuffer (expectedBytes) {
		let bufferNewSize = this.bufferSize;
		// while (bufferNewSize < expectedBytes) {
    //   bufferNewSize *= 2;
    // }
		if(bufferNewSize < expectedBytes) {
			bufferNewSize = expectedBytes;
		}
    this.cacheBuffer = new ArrayBuffer(bufferNewSize);
    this.bufferSize = bufferNewSize;
	}

	/**
	* 暂停
	*/
	pause () {
		// if (this.cacheRemain !== 0) {
  //     this.resumeFrom = this.stashByteStart;
  //     this.currentRange.to = this.stashByteStart - 1;
  //   } else {
  //      this.resumeFrom = this.currentRange.to + 1;
  //   }
		this.loader.pause();
	}

	/**
	* 打开连接
	*/
	open (StartBytes) {
		if(StartBytes === undefined) {
			StartBytes = 0;
		}
		this.loader.open({from: StartBytes, to: -1});
	}

	/**
	* 重新播放
	*/
	resume () {
    this.paused = false;
    const bytes = this.totalReceive;
    this.open(bytes);
  }

  /**
	* seek
	*/
  seek (bytes, dropCache, keyframePoint) {
  	this.loader.open({from: bytes, to: -1}, keyframePoint);
  }

	destroy () {
		this.pause();
		this.cacheBuffer = null;
	}
}
