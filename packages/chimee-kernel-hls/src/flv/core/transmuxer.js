import IoLoader from '../io/io-loader';
import {CustEvent} from 'chimee-helper';
import {Log} from 'chimee-helper';
import work from 'webworkify';
// const F2M = require('chimee-flv2fmp4');
import F2M from '../flvdecode/flv2fmp4';

/**
 * Transmuxer 控制层
 * @class Transmuxer
 * @param {mediaSource} mediaSource
 * @param {object} config
 */
export default class Transmuxer extends CustEvent {
	constructor (mediaSource, config) {
		super();
		this.config = {};
		this.tag = 'transmuxer';
    this.loader = null;
    this.CPU = null;
    this.keyframePoint = false;
    this.w = null;
    Object.assign(this.config, config);
    if(this.config.webWorker) {
      this.w = work('./transmuxer-worker');
      this.w.postMessage({cmd: 'init'});
      this.w.addEventListener('message', (e) => {
        this.parseCallback(e.data);
      });
    }
	}
   /**
   * instance ioloader
   */
	loadSource () {
    if(this.config.webWorker) {
      this.w.postMessage({cmd: 'loadSource'});
      // this.loader.arrivalDataCallback = this.arrivalDataCallbackWorker.bind(this);
    } else {
      this.loader = new IoLoader(this.config);
      this.loader.arrivalDataCallback = this.arrivalDataCallback.bind(this);
      this.loader.open();
    }
  }
  /**
   * data arrive to webworker
   */
  // arrivalDataCallbackWorker (data, byteStart, keyframePoint) {
  //   if(keyframePoint) {
  //     this.w.postMessage({cmd: 'seek', source: data});
  //   }
  //   this.w.postMessage({cmd: 'pipe', source: data});
  //   return;
  // }
   /**
   * loader data callback
   *  @param {arraybuffer} 数据
   *  @param {number} 开始的起点
   *  @param {keyframePoint} 关键帧点
   */
  arrivalDataCallback (data, byteStart, keyframePoint) {
  	let consumed = 0;
    if(!this.CPU) {
      this.CPU = new F2M();
      this.CPU.onInitSegment = this.onRemuxerInitSegmentArrival.bind(this);
      this.CPU.onMediaSegment = this.onRemuxerMediaSegmentArrival.bind(this);
      this.CPU.onError = this.onCPUError.bind(this);
      this.CPU.onMediaInfo = this.onMediaInfo.bind(this);
    }
    if(keyframePoint) {
      this.keyframePoint = true;
      this.CPU.seek(keyframePoint);
    }
    consumed = this.CPU.setflv(data);
    return consumed;
  }

  /**
   * loader data callback
   *  @param {arraybuffer} 数据
   */
  parseCallback (data) {
    switch(data.cmd) {
      case 'pipeCallback':
      data.source;
      break;
      case 'mediaSegmentInit':
      this.emit('mediaSegmentInit', data.source);
      break;
      case 'mediaSegment':
      this.emit('mediaSegment', data.source);
      break;
      case 'mediainfo':
      this.emit('mediainfo', data.source);
      break;
    }
  }

  /**
   * Demux error
   *  @param {string} 类型
   *  @param {string} 信息
   */
  onDemuxError (type, info) {
  	Log.error(this.tag, `DemuxError: type = ${type}, info = ${info}`);
    this.emit('DemuxError', type, info);
  }

  /**
   * Demux mediaInfo
   *  @param {object} 视频头信息
   */
  onMediaInfo (mediaInfo) {
    this.mediaInfo = mediaInfo;
    this.emit('mediaInfo', mediaInfo);
  }

  /**
   * remuxer init segment arrival
   *  @param {arraybuffer} 视频数据
   */
  onRemuxerInitSegmentArrival (data) {
    this.emit('mediaSegmentInit', data);
  }

  /**
   * remuxer  segment arrival
   *  @param {arraybuffer} 视频数据
   */
  onRemuxerMediaSegmentArrival (data) {
    this.emit('mediaSegment', data);
  }

  /**
   * cpu error
   *  @param {object} 错误信息
   */
  onCPUError (handle) {
    this.emit('ERROR', handle.data);
  }

  /**
   * get video mediaInfo
   */
  getMediaInfo () {
    return this.mediaInfo;
  }

   /**
   * stop loader
   */
  pause () {
    this.loader.pause();
  }

  /**
   * resume loader
   */
  resume () {
     this.loader.resume();
  }
   /**
   * flv can seek
   */
  isSeekable () {
    return this.mediaInfo.hasKeyframesIndex;
  }
  /**
   * video seek
   * @param {object} 关键帧集合
   */
  seek (keyframe) {
    if(!this.isSeekable()) {
      this.emit('ERROR', '这个flv视频不支持seek');
      return false;
    }
    this.loader = new IoLoader(this.config);
    this.loader.arrivalDataCallback = this.arrivalDataCallback.bind(this);
    this.loader.seek(keyframe.keyframePoint, false, keyframe.keyframetime);
  }

  /**
   * refresh
   */
  refresh () {
    this.pause();
    this.loader = new IoLoader(this.config);
    this.loader.arrivalDataCallback = this.arrivalDataCallback.bind(this);
    this.loader.open();
  }

  /**
   * destroy
   */
  destroy () {
    this.loader.destroy();
    this.loader = null;
    this.CPU = null;
  }

  /**
   * get nearlest keyframe
   */
  getNearlestKeyframe (times) {
    if(this.mediaInfo && this.mediaInfo.keyframesIndex) {
      const keyframesList = this.mediaInfo.keyframesIndex.times;
      const keyframesPositions = this.mediaInfo.keyframesIndex.filepositions;
      const binarySearch = function (list, val) {
        const length = list.length;
        const index = Math.floor(length / 2);
        if(length === 1) {
          const position = keyframesList.indexOf(list[0]);
          return {
            keyframetime: list[0],
            keyframePoint: keyframesPositions[position]
          };
        } else if(list[index] > val) {
          return binarySearch(list.slice(0, index), val);
        } else if (list[index] < val) {
          return binarySearch(list.slice(index), val);
        } else {
          const position = keyframesList.indexOf(list[0]);
          return {
            keyframetime: list[0],
            keyframePoint: keyframesPositions[position]
          };
        }
      };
      return binarySearch(keyframesList, times);
    } else {
      return 0;
    }
  }
}
