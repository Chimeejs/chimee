/* eslint-disable */
import tag from './flvTag.js';
import tagdemux from './tagdemux';
import error from '../utils/error'
class FlvParse {
    constructor() {
        this.tempUint8 = new Uint8Array();
        this.arrTag = [];
        this.index = 0;
        this.tempArr = [];
        this.stop = false;
        this.offset = 0;
        this.frist = true;
        this._hasAudio = false;
        this._hasVideo = false;
    }

    /**
     * 接受 外部的flv二进制数据
     */
    setFlv(uint8) {
        this.stop = false;
        this.arrTag = [];
        this.index = 0;
        this.tempUint8 = uint8;
        if (this.tempUint8.length > 13 && this.tempUint8[0] == 70 && this.tempUint8[1] == 76 && this.tempUint8[2] == 86) {
            this.probe(this.tempUint8.buffer);
            this.read(9); // 略掉9个字节的flv header tag
            this.read(4); // 略掉第一个4字节的 tag size
            this.parse();
            this.frist = false;
            return this.offset;
        } else if (!this.frist) {
            return this.parse();
        } else {
            return this.offset;
        }
    }
    probe(buffer) {
        const data = new Uint8Array(buffer);
        const mismatch = { match: false };

        if (data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01) {
            return mismatch;
        }

        const hasAudio = ((data[4] & 4) >>> 2) !== 0;
        const hasVideo = (data[4] & 1) !== 0;

        if (!hasAudio && !hasVideo) {
            return mismatch;
        }
        this._hasAudio = tagdemux._hasAudio = hasAudio;
        this._hasVideo = tagdemux._hasVideo = hasVideo;
        return {
            match: true,
            hasAudioTrack: hasAudio,
            hasVideoTrack: hasVideo
        };
    }

    /**
     * 开始解析
     */
    parse() {

        while (this.index < this.tempUint8.length && !this.stop) {
            this.offset = this.index;

            const t = new tag();
            if (this.tempUint8.length - this.index >= 11) {
                t.tagType = (this.read(1)[0]); // 取出tag类型
                t.dataSize = this.read(3); // 取出包体大小
                t.Timestamp = this.read(4); // 取出解码时间
                t.StreamID = this.read(3); // 取出stream id
            } else {
                this.stop = true;
                continue;
            }
            if (t.tagType == 18 || t.tagType == 8 || t.tagType == 9) {

            } else {
                throw new error('wrong tagType' + t.tagType);
            }
            if (this.tempUint8.length - this.index >= (this.getBodySum(t.dataSize) + 4)) {
                t.body = this.read(this.getBodySum(t.dataSize)); // 取出body
                if (t.tagType == 9 && this._hasVideo) {
                    this.arrTag.push(t);
                }
                if (t.tagType == 8 && this._hasAudio) {
                    this.arrTag.push(t);
                }
                if (t.tagType == 18) {
                    this.arrTag.push(t);
                }
                this.read(4);
            } else {
                this.stop = true;
                continue;
            }
            this.offset = this.index;
        }

        return this.offset;
    }
    read(length) {
        // let u8a = new Uint8Array(length);
        // u8a.set(this.tempUint8.subarray(this.index, this.index + length), 0);
        const u8a = this.tempUint8.slice(this.index, this.index + length);
        this.index += length;
        return u8a;
    }

    /**
     * 计算tag包体大小
     */
    getBodySum(arr) {
        let _str = '';
        _str += (arr[0].toString(16).length == 1 ? '0' + arr[0].toString(16) : arr[0].toString(16));
        _str += (arr[1].toString(16).length == 1 ? '0' + arr[1].toString(16) : arr[1].toString(16));
        _str += (arr[2].toString(16).length == 1 ? '0' + arr[2].toString(16) : arr[2].toString(16));
        return parseInt(_str, 16);
    }
}
export default new FlvParse();