import {CustEvent} from 'chimee-helper';
import {Log} from 'chimee-helper';

export default class MSEController extends CustEvent {

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
    this.mimeCodec = 'video/mp4; codecs="avc1.640020,mp4a.40.2"';
    this.init();
  }
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

  onSourceOpen () {
    Log.verbose(this.tag, 'MediaSource onSourceOpen');
    this.mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
    this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec);
    this.sourceBuffer.addEventListener('error', this.e.onSourceBufferError);
    this.sourceBuffer.addEventListener('abort', () => console.log('sourceBuffer: abort'));
    this.sourceBuffer.addEventListener('updateend', () => {
      if(this.queue.length >= 1) {
        if(!this.sourceBuffer.updating) {
          const data = this.queue.shift();
          this.appendBuffer(data);
        }
      }
      this.emit('updateend');
    });
    this.emit('source_open');
    this.sourceBufferEvent();
  }

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

  doCleanupSourceBuffer () {
    Log.verbose('执行了一次垃圾回收');
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
          const removeEnd = currentTime - this._config.autoCleanupMinBackwardDuration;
          this.removeRangesList.push({start, end: removeEnd});
        }
      } else if (end < currentTime) {
        doRemove = true;
        this.removeRangesList.push({start, end});
      }
    }
    if(doRemove && !this.sourceBuffer.updating) {
      this.removeRangesList();
    }
  }

  removeRangesList () {
    for (let i = 0; i < this.removeRangesListi.length; i++) {
      if (this.sourceBuffer.updating) {
          continue;
      }
      const sb = this.sourceBuffer;
      const ranges = this.removeRangesList[i];
      while (ranges.length && !sb.updating) {
          const range = ranges.shift();
          sb.remove(range.start, range.end);
      }
    }
  }

  appendBuffer (data) {
    if(this.needCleanupSourceBuffer()) {
      this.doCleanupSourceBuffer();
    }
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

  onSourceEnded () {
    Log.verbose(this.TAG, 'MediaSource onSourceEnded');
  }

  onSourceClose () {
     Log.verbose(this.TAG, 'MediaSource onSourceClose');
     if (this.mediaSource && this.e !== null) {
        this.mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
        this.mediaSource.removeEventListener('sourceended', this.e.onSourceEnded);
        this.mediaSource.removeEventListener('sourceclose', this.e.onSourceClose);
      }
  }

  onSourceBufferError (e) {
    Log.Error(this.tag, `SourceBuffer Error: ${e}`);
  }

  seek (currentTime) {

  }

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
