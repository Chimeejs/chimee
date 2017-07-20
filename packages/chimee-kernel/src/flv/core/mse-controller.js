import {CustEvent} from 'chimee-helper';
import {Log} from 'chimee-helper';

export default class MSEController extends CustEvent {

  /**
   * mediasource 控制层
   * @class mediasource
   * @param {Element} videoElement
   * @param {object} config
   */
  constructor (videoElement, config) {
    super();
    this.video = videoElement;
    this.config = config;
    this.tag = 'mse-controller';
    this.e = {
      onSourceOpen: this.onSourceOpen.bind(this),
      onSourceEnded: this.onSourceEnded.bind(this),
      onSourceClose: this.onSourceClose.bind(this),
      onSourceBufferError: this.onSourceBufferError.bind(this)
    };
    this.queue = [];
    this.removeRangesList = [];
    this.removeBucketing = false;
    this.mimeCodec = 'video/mp4; codecs="avc1.640020,mp4a.40.2"';
    this.init();
  }

  /**
   * 初始化 控制层
   */
  init () {
    if (this.mediaSource) {
      Log.Error(this.tag, 'MediaSource has been attached to an HTMLMediaElement!');
      throw new Error('MediaSource has been attached to an HTMLMediaElement!');
    }
    const ms = this.mediaSource = new window.MediaSource();
    ms.addEventListener('sourceopen', this.e.onSourceOpen);
    ms.addEventListener('sourceended', this.e.onSourceEnded);
    ms.addEventListener('sourceclose', this.e.onSourceClose);
  }

  /**
   * mediaSource open
   */
  onSourceOpen () {
    Log.verbose(this.tag, 'MediaSource onSourceOpen');
    this.mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
    window.sou = this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec);
    this.sourceBuffer.addEventListener('error', this.e.onSourceBufferError);
    this.sourceBuffer.addEventListener('abort', () => console.log('sourceBuffer: abort'));
    this.sourceBuffer.addEventListener('updateend', () => {
      if(this.queue.length >= 1) {
        if(!this.sourceBuffer.updating) {
          if(this.needCleanupSourceBuffer()) {
            this.doCleanupSourceBuffer();
          } else {
            const data = this.queue.shift();
            this.appendBuffer(data);
          }
        }
      }
      this.emit('updateend');
    });
    this.emit('source_open');
    this.sourceBufferEvent();
  }

  /**
   * sourceBuffer 事件
   */
  sourceBufferEvent () {
    this.on('mediaSegment', (handler)=> {
      const data = handler.data;
      // if(this.needCleanupSourceBuffer()) {
      //   this.doCleanupSourceBuffer();
      // }
      if (this.sourceBuffer.updating || this.queue.length > 0) {
        // console.log(new Uint8Array(data));
        this.queue.push(data);
      } else {
        this.appendBuffer(data);
      }
    });

    this.on('mediaSegmentInit', (handler)=> {
      const data = handler.data;
      if (this.sourceBuffer.updating || this.queue.length > 0) {
        this.queue.push(data);
      } else {
       this.appendBuffer(data);
      }
    });
  }

  /**
   * 是否需要清除sourcebuffer 里的buffer
   */
  needCleanupSourceBuffer () {
    const currentTime = this.video.currentTime;

    const sb = this.sourceBuffer;
    const buffered = sb.buffered;

    if (buffered.length >= 1) {
        if (currentTime - buffered.start(0) >= this.config.autoCleanupMaxBackwardDuration) {
            return true;
        }
    }
    return false;
  }

  /**
   * 清除buffer
   */
  doCleanupSourceBuffer () {
    Log.verbose(this.tag, 'docleanBuffer');
    const currentTime = this.video.currentTime;
    const sb = this.sourceBuffer;
    const buffered = sb.buffered;
    let doRemove = false;
    for (let i = 0; i < buffered.length; i++) {
      const start = buffered.start(i);
      const end = buffered.end(i);

      if (start <= currentTime && currentTime < end + 3) {
        if (currentTime - start >= this.config.autoCleanupMaxBackwardDuration) {
          doRemove = true;
          const removeEnd = currentTime - this.config.autoCleanupMinBackwardDuration;
          this.removeRangesList.push({start, end: removeEnd});
        }
      } else if (end < currentTime) {
        doRemove = true;
        this.removeRangesList.push({start, end});
      }
    }
    if(doRemove && !this.sourceBuffer.updating) {
      this.cleanRangesList();
    }
  }

  /**
   * 清除bufferlist
   */
  cleanRangesList () {
    if (this.sourceBuffer.updating) {
      return;
    }
    const sb = this.sourceBuffer;
    while (this.removeRangesList.length && !sb.updating) {
      const ranges = this.removeRangesList.shift();
      sb.remove(ranges.start, ranges.end);
    }
  }

  /**
   * 往sourcebuffer里添加数据
   */
  appendBuffer (data) {
    try {
      this.sourceBuffer.appendBuffer(data);
    }catch(e) {
      if(e.code === 22) {
        // chrome 大概会有350M
        Log.verbose(this.TAG, 'MediaSource bufferFull');
        this.emit('bufferFull');
      }
    }
  }

  /**
   * sourcebuffer 结束
   */
  onSourceEnded () {
    Log.verbose(this.TAG, 'MediaSource onSourceEnded');
  }

  /**
   * sourcebuffer 关闭
   */
  onSourceClose () {
     Log.verbose(this.tag, 'MediaSource onSourceClose');
     if (this.mediaSource && this.e !== null) {
        this.mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
        this.mediaSource.removeEventListener('sourceended', this.e.onSourceEnded);
        this.mediaSource.removeEventListener('sourceclose', this.e.onSourceClose);
      }
  }

   /**
   * sourcebuffer 错误
   */
  onSourceBufferError (e) {
    Log.Error(this.tag, `SourceBuffer Error: ${e}`);
  }

  /**
   * 销毁
   */
  destroy () {
    if (this.mediaSource) {
        const ms = this.mediaSource;
        // pending segments should be discard
        this.queue = [];
        // remove all sourcebuffers
        const sb = this.sourceBuffer;
        if (sb) {
            if (ms.readyState !== 'closed') {
                ms.removeSourceBuffer(sb);
                sb.removeEventListener('error', this.e.onSourceBufferError);
                sb.removeEventListener('updateend', this.e.onSourceBufferUpdateEnd);
            }
            this.sourceBuffer = null;
        }
      if (ms.readyState === 'open') {
          try {
              ms.endOfStream();
          } catch (error) {
              Log.e(this.TAG, error.message);
          }
      }
      ms.removeEventListener('sourceopen', this.e.onSourceOpen);
      ms.removeEventListener('sourceended', this.e.onSourceEnded);
      ms.removeEventListener('sourceclose', this.e.onSourceClose);
      this.mediaSource = null;
    }

    if (this._mediaElement) {
        this._mediaElement.src = '';
        this._mediaElement.removeAttribute('src');
        this._mediaElement = null;
    }
    if (this._mediaSourceObjectURL) {
        window.URL.revokeObjectURL(this._mediaSourceObjectURL);
        this._mediaSourceObjectURL = null;
    }
  }
}
