import IoLoader from '../io/io-loader';
import {CustEvent} from 'chimee-helper';
import {Log} from 'chimee-helper';
import work from 'webworkify';
const F2M = require('chimee-flv2fmp4');

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
      this.w = work(require.resolve('./transmuxer-worker'));
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

  arrivalDataCallback (data, byteStart, keyframePoint) {
  	let consumed = 0;
    if(!this.CPU) {
      this.CPU = new F2M();
      this.CPU.onInitSegment = this.onRemuxerInitSegmentArrival.bind(this);
      this.CPU.onMediaSegment = this.onRemuxerMediaSegmentArrival.bind(this);
      this.CPU.onError = this.onCPUError.bind(this);
      this.CPU.onMediaInfo = this.onMediaInfo.bind(this);
      this.CPU.seekCallBack = this.seekCallBack.bind(this);
    }
    if(keyframePoint) {
      this.keyframePoint = true;
      this.CPU.seek(keyframePoint);
    }
    consumed = this.CPU.setflv(data);
    return consumed;
  }

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

  onDemuxError (type, info) {
  	Log.error(this.tag, `DemuxError: type = ${type}, info = ${info}`);
    this.emit('DemuxError', type, info);
  }

  onMediaInfo (mediaInfo, o) {
    this.mediaInfo = mediaInfo;
    this.emit('mediaInfo', mediaInfo);
  }

  seekCallBack (t) {
  }

  onRemuxerInitSegmentArrival (data) {
    this.emit('mediaSegmentInit', data);
  }

  onRemuxerMediaSegmentArrival (data) {
    this.emit('mediaSegment', data);
  }

  onCPUError (handle) {
    this.emit('ERROR', handle.data);
  }

  getMediaInfo () {
    return this.mediaInfo;
  }

  pause () {
    this.loader.pause();
  }

  resume () {
     this.loader.resume();
  }

  isSeekable () {
    return this.mediaInfo.hasKeyframesIndex;
  }

  seek (keyframe) {
    if(!this.isSeekable()) {
      this.emit('ERROR', '这个flv视频不支持seek');
      return false;
    }
    this.loader = new IoLoader(this.config);
    this.loader.arrivalDataCallback = this.arrivalDataCallback.bind(this);
    this.loader.seek(keyframe.keyframePoint, false, keyframe.keyframetime);
  }

  destroy () {
    this.loader.destroy();
    this.loader = null;
    this.CPU = null;
  }

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
