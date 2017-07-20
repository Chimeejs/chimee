/**
* XHR firfox 直播 点播
* author songguangyu
* emil 522963130@qq.com
*/
// import Log from 'helper/log';
import handleRange from './handleRange';
import {CustEvent} from 'chimee-helper';

/**
 * MozChunkLoader
 * @class MozChunkLoader
 * @param {string} video url
 * @param  {object} range.from range.to
 */
export default class MozChunkLoader extends CustEvent {

  /**
   * broswer is support moz-chunk
   */
	static isSupport () {
    try {
      const xhr = new XMLHttpRequest();
      // Firefox 37- requires .open() to be called before setting responseType
      xhr.open('GET', 'https://example.com', true);
      xhr.responseType = 'moz-chunked-arraybuffer';
      return (xhr.responseType === 'moz-chunked-arraybuffer');
    } catch (e) {
      return false;
    }
  }

  constructor (src, config) {
    super();
    this.tag = 'mozChunkLoader';
  	this.xhr = null;
    this.src = src;
    this.config = config;
    this.totalLength = null;
    this.chunkSizeKB = 393216;
    this.range = {};
    this.bytesStart = 0;
  }
  /**
   * if don't need range don't set
   * @param  {object} range.from range.to
   */
  open (range) {
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open('GET', this.src, true);
    xhr.responseType = 'moz-chunked-arraybuffer';
    xhr.onreadystatechange = this.onReadyStateChange.bind(this);
    xhr.onprogress = this.onProgress.bind(this);
    xhr.onload = this.onLoadEnd.bind(this);
    xhr.onerror = this.onXhrError.bind(this);
    if(this.config.type === 'vod') {
      const r = range || {from: 0, to: -1};
      this.range.from = r.from;
      this.range.to = r.to;
      const headers = handleRange(r).headers;
      for(const i in headers) {
        xhr.setRequestHeader(i, headers[i]);
      }
    }
    xhr.send();
  }

  /**
   * abort request
   */
  abort () {
    this.xhr.onreadystatechange = null;
    this.xhr.onprogress = null;
    this.xhr.onload = null;
    this.xhr.onerror = null;
    this.xhr.abort();
    this.xhr = null;
  }

  /**
   * destroy xhr Object clean cache
   */
  destroy () {
    if(this.xhr) {
      this.abort();
      this.xhr.onreadystatechange = null;
      this.xhr.onprogress = null;
      this.xhr.onload = null;
      this.xhr.onerror = null;
      this.xhr = null;
    }
    this.totalLength = null;
    this.bytesStart = null;
    this.range = {};
  }

  /**
   * xhr onReadyStateChange
   */
  onReadyStateChange (e) {
    const xhr = this.xhr;
    if (xhr.readyState === 2) {
      if ((xhr.status < 200 && xhr.status > 299)) {
        const info = {
          from: this.range.from,
          to: this.range.to,
          url: this.src,
          msg: 'http Error: http code ' + xhr.status
        };
        this.emit(this.tag, info);
      }
    }
  }

  /**
   * xhr onProgress
   */
  onProgress (e) {
    if(!this.totalLength) {
      this.totalLength = e.total;
      if (e.total !== null && e.total !== 0) {
        this.totalLength = e.total;
      }
    }

    const chunk = e.target.response;
    this.arrivalDataCallback(chunk, this.bytesStart);
    this.bytesStart += chunk.byteLength;
  }

  /**
   * xhr onLoadEnd
   */
  onLoadEnd (e) {
    this.emit(this.tag, 'video load end');
  }

  /**
   * xhr onXhrError
   */
  onXhrError (e) {
    const info = {
      from: this.range.from,
      to: this.range.to,
      url: this.src,
      msg: e.constructor.name + ' ' + e.type
    };
    this.emit(this.tag, info);
  }
}
