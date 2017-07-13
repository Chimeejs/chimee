/**
* fetch firfox 直播 点播
* author songguangyu
* emil 522963130@qq.com
*/
import handleRange from './handleRange';
import {CustEvent} from 'chimee-helper';
import {Log} from 'chimee-helper';

export default class FetchLoader extends CustEvent {

	/**
   * broswer is support moz-chunk
   */
	static isSupport () {
		if(window.fetch && window.ReadableStream) {
			return true;
		} else {
			return false;
		}
	}

	/**
   * @param {string} video url
   * @param  {object} range.from range.to
   */

	constructor (src, config) {
		super();
		this.fetching = false;
		this.config = config;
		this.range = {
			from: 0,
			to: 500000
		};
		this.src = src;
		this.totalRange = null;
		this.block = 500000;
		this.reader = null;
		this.requestAbort = false;
		this.arrivalDataCallback = null;
		this.bytesStart = 0;
	}
	/**
   * if don't need range don't set
   * @param  {object} range.from range.to
   */
	open (range, keyframePoint) {
		this.requestAbort = false;
		const reqHeaders = new Headers();
		const r = range || {from: 0, to: -1};

		if(this.config.type === 'vod') {
			this.range.from = r.from;
			this.range.to = r.to;
			const headers = handleRange(r).headers;
			for(const i in headers) {
				reqHeaders.append(i, headers[i]);
			}
		}
    if(keyframePoint) {
    	this.bytesStart = 0;
    }
		this.req = new Request(this.src, {headers: reqHeaders});

		fetch(this.req).then((res)=>{
			// console.log(response.headers.get("Content-Range"));
			if(res.ok) {
				const reader = res.body.getReader();
				return this.pump(reader, keyframePoint);
			}
		});
	}

	/**
   * pause video
   */
	pause () {
		this.requestAbort = true;
	}

	/**
   * pump data
   */
	pump (reader, keyframePoint) { // ReadableStreamReader
    return reader.read().then((result) => {
        if (result.done) {
					Log.ver;
        	// trigger complete
        } else {
        	if (this.requestAbort === true) {
        		return reader.cancel();
        	}
        	const chunk = result.value.buffer;

        	if(this.arrivalDataCallback) {
        		this.arrivalDataCallback(chunk, this.bytesStart, keyframePoint);
        		this.bytesStart += chunk.byteLength;
        	}
        	return this.pump(reader);
        }
      });
	}
}
