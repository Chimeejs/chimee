/**
 * 代码借鉴了flv.js
 * 增加了自己的注释和写法
 */
/* eslint-disable */
class MP4 {

    static init() {
        MP4.types = {
            avc1: [],
            avcC: [],
            btrt: [],
            dinf: [],
            dref: [],
            esds: [],
            ftyp: [],
            hdlr: [],
            mdat: [],
            mdhd: [],
            mdia: [],
            mfhd: [],
            minf: [],
            moof: [],
            moov: [],
            mp4a: [],
            mvex: [],
            mvhd: [],
            sdtp: [],
            stbl: [],
            stco: [],
            stsc: [],
            stsd: [],
            stsz: [],
            stts: [],
            tfdt: [],
            tfhd: [],
            traf: [],
            trak: [],
            trun: [],
            trex: [],
            tkhd: [],
            vmhd: [],
            smhd: []
        };

        for (const name in MP4.types) {
            if (MP4.types.hasOwnProperty(name)) {
                MP4.types[name] = [
                    name.charCodeAt(0),
                    name.charCodeAt(1),
                    name.charCodeAt(2),
                    name.charCodeAt(3)
                ];
            }
        }

        const constants = MP4.constants = {};

        constants.FTYP = new Uint8Array([
            0x69, 0x73, 0x6F, 0x6D, // major_brand: isom		isom	MP4  Base Media v1 [IS0 14496-12:2003]	ISO	YES	video/mp4
            0x0, 0x0, 0x0, 0x1, // minor_version: 0x01
            0x69, 0x73, 0x6F, 0x6D, // isom
            0x61, 0x76, 0x63, 0x31 // avc1
        ]);

        constants.STSD_PREFIX = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags  version字段后会有一个entry count字段
            0x00, 0x00, 0x00, 0x01 // entry_count	根据entry的个数，每个entry会有type信息，如“vide”、“sund”等，根据type不同sample description会提供不同的信息，例如对于video track，会有“VisualSampleEntry”类型信息，对于audio track会有“AudioSampleEntry”类型信息。
        ]);

        constants.STTS = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00 // entry_count     0个索引
        ]);

        constants.STSC = constants.STCO = constants.STTS;

        constants.STSZ = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // sample_size
            0x00, 0x00, 0x00, 0x00 // sample_count
        ]);

        constants.HDLR_VIDEO = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // pre_defined
            0x76, 0x69, 0x64, 0x65, // handler_type: 'vide' 在media box中，该值为4个字符		“vide”— video track
            0x00, 0x00, 0x00, 0x00, // reserved: 3 * 4 bytes
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, // 保留位
            0x56, 0x69, 0x64, 0x65,
            0x6F, 0x48, 0x61, 0x6E,
            0x64, 0x6C, 0x65, 0x72, 0x00 // name: VideoHandler 长度不定		track type name，以‘\0’结尾的字符串
        ]);

        constants.HDLR_AUDIO = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // pre_defined
            0x73, 0x6F, 0x75, 0x6E, // handler_type: 'soun'在media box中，该值为4个字符		“soun”— audio track
            0x00, 0x00, 0x00, 0x00, // reserved: 3 * 4 bytes
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, // 保留位
            0x53, 0x6F, 0x75, 0x6E,
            0x64, 0x48, 0x61, 0x6E,
            0x64, 0x6C, 0x65, 0x72, 0x00 // name: SoundHandler 长度不定		track type name，以‘\0’结尾的字符串
        ]);

        constants.DREF = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x01, // entry_count 1个url
            // url	box开始
            0x00, 0x00, 0x00, 0x0C, // entry_size
            0x75, 0x72, 0x6C, 0x20, // type 'url '
            0x00, 0x00, 0x00, 0x01 // version(0) + flags 当“url”或“urn”的box flag为1时，字符串均为空。
        ]);

        // Sound media header
        constants.SMHD = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags	box版本，0或1，一般为0。
            0x00, 0x00, 0x00, 0x00 // balance(2) + reserved(2) 立体声平衡，[8.8] 格式值，一般为0，-1.0表示全部左声道，1.0表示全部右声道+2位保留位
        ]);

        // video media header
        constants.VMHD = new Uint8Array([
            0x00, 0x00, 0x00, 0x01, // version(0) + flags
            0x00, 0x00, // graphicsmode: 2 bytes 视频合成模式，为0时拷贝原始图像，否则与opcolor进行合成   //理论上是4位啊  暂时保留
            0x00, 0x00, 0x00, 0x00, // opcolor: 3 * 2 bytes ｛red，green，blue｝
            0x00, 0x00
        ]);
    }

    /**
     * 封装box
     */
    static box(type) {
        let size = 8;
        let result = null;
        const datas = Array.prototype.slice.call(arguments, 1);
        const arrayCount = datas.length;

        for (let i = 0; i < arrayCount; i++) {
            size += datas[i].byteLength;
        }
        // box头部大小
        result = new Uint8Array(size);
        result[0] = (size >>> 24) & 0xFF; // size
        result[1] = (size >>> 16) & 0xFF;
        result[2] = (size >>> 8) & 0xFF;
        result[3] = (size) & 0xFF;
        // 写入box的type
        result.set(type, 4); // type

        let offset = 8;
        for (let i = 0; i < arrayCount; i++) { // data body
            result.set(datas[i], offset);
            offset += datas[i].byteLength;
        }

        return result;
    }

    // 创建ftyp&moov
    static generateInitSegment(meta) {
        if (meta.constructor != Array) {
            meta = [meta];
        }
        const ftyp = MP4.box(MP4.types.ftyp, MP4.constants.FTYP);
        const moov = MP4.moov(meta);

        const result = new Uint8Array(ftyp.byteLength + moov.byteLength);
        result.set(ftyp, 0);
        result.set(moov, ftyp.byteLength);
        return result;
    }

    // Movie metadata box
    static moov(meta) {
        const mvhd = MP4.mvhd(meta[0].timescale, meta[0].duration); // /moov里面的第一个box
        const vtrak = MP4.trak(meta[0]);
        let atrak;
        if (meta.length > 1) {
            atrak = MP4.trak(meta[1]);
        }

        const mvex = MP4.mvex(meta);
        if (meta.length > 1) { return MP4.box(MP4.types.moov, mvhd, vtrak, atrak, mvex); } else { return MP4.box(MP4.types.moov, mvhd, vtrak, mvex); }
    }

    // Movie header box
    static mvhd(timescale, duration) {
        return MP4.box(MP4.types.mvhd, new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags     1位的box版本+3位flags   box版本，0或1，一般为0。（以下字节数均按version=0）
            0x00, 0x00, 0x00, 0x00, // creation_time    创建时间  （相对于UTC时间1904-01-01零点的秒数）
            0x00, 0x00, 0x00, 0x00, // modification_time   修改时间
            (timescale >>> 24) & 0xFF, // timescale: 4 bytes		文件媒体在1秒时间内的刻度值，可以理解为1秒长度
            (timescale >>> 16) & 0xFF,
            (timescale >>> 8) & 0xFF,
            (timescale) & 0xFF,
            (duration >>> 24) & 0xFF, // duration: 4 bytes	该track的时间长度，用duration和time scale值可以计算track时长，比如audio track的time scale = 8000, duration = 560128，时长为70.016，video track的time scale = 600, duration = 42000，时长为70
            (duration >>> 16) & 0xFF,
            (duration >>> 8) & 0xFF,
            (duration) & 0xFF,
            0x00, 0x01, 0x00, 0x00, // Preferred rate: 1.0   推荐播放速率，高16位和低16位分别为小数点整数部分和小数部分，即[16.16] 格式，该值为1.0（0x00010000）表示正常前向播放
            0x01, 0x00, 0x00, 0x00, // PreferredVolume(1.0, 2bytes) + reserved(2bytes)	与rate类似，[8.8] 格式，1.0（0x0100）表示最大音量
            0x00, 0x00, 0x00, 0x00, // reserved: 4 + 4 bytes	保留位
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, // 视频变换矩阵   线性代数
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x01, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
            0x00, 0x00, 0x00, 0x00, // ----begin pre_defined 6 * 4 bytes----
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, // pre-defined 保留位
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, // ----end pre_defined 6 * 4 bytes----
            0xFF, 0xFF, 0xFF, 0xFF // next_track_ID 下一个track使用的id号
        ]));
    }

    // Track box
    static trak(meta) {
        return MP4.box(MP4.types.trak, MP4.tkhd(meta), MP4.mdia(meta));
    }

    // Track header box
    static tkhd(meta) {
        let trackId = meta.id,
            duration = meta.duration;
        let width = meta.presentWidth,
            height = meta.presentHeight;

        return MP4.box(MP4.types.tkhd, new Uint8Array([
            0x00, 0x00, 0x00, 0x07, // version(0) + flags 1位版本 box版本，0或1，一般为0。（以下字节数均按version=0）按位或操作结果值，预定义如下：
            // 0x000001 track_enabled，否则该track不被播放；
            // 0x000002 track_in_movie，表示该track在播放中被引用；
            // 0x000004 track_in_preview，表示该track在预览时被引用。
            // 一般该值为7，1+2+4 如果一个媒体所有track均未设置track_in_movie和track_in_preview，将被理解为所有track均设置了这两项；对于hint track，该值为0
            // hint track  这个特殊的track并不包含媒体数据，而是包含了一些将其他数据track打包成流媒体的指示信息。
            0x00, 0x00, 0x00, 0x00, // creation_time	创建时间（相对于UTC时间1904-01-01零点的秒数）
            0x00, 0x00, 0x00, 0x00, // modification_time	修改时间
            (trackId >>> 24) & 0xFF, // track_ID: 4 bytes	id号，不能重复且不能为0
            (trackId >>> 16) & 0xFF,
            (trackId >>> 8) & 0xFF,
            (trackId) & 0xFF,
            0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes    保留位
            (duration >>> 24) & 0xFF, // duration: 4 bytes  	track的时间长度
            (duration >>> 16) & 0xFF,
            (duration >>> 8) & 0xFF,
            (duration) & 0xFF,
            0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes    保留位
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, // layer(2bytes) + alternate_group(2bytes)  视频层，默认为0，值小的在上层.track分组信息，默认为0表示该track未与其他track有群组关系
            0x00, 0x00, 0x00, 0x00, // volume(2bytes) + reserved(2bytes)    [8.8] 格式，如果为音频track，1.0（0x0100）表示最大音量；否则为0   +保留位
            0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x01, 0x00, 0x00, // 视频变换矩阵
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
            (width >>> 8) & 0xFF, // //宽度
            (width) & 0xFF,
            0x00, 0x00,
            (height >>> 8) & 0xFF, // 高度
            (height) & 0xFF,
            0x00, 0x00
        ]));
    }

    /**
     * “mdia”也是个container box，其子box的结构和种类还是比较复杂的。先来看一个“mdia”的实例结构树图。
     * 总体来说，“mdia”定义了track媒体类型以及sample数据，描述sample信息。一般“mdia”包含一个“mdhd”，
     * 一个“hdlr”和一个“minf”，其中“mdhd”为media header box，“hdlr”为handler reference box，
     * “minf”为media information box。
     *
     * mdia
     * 		mdhd
     * 		hdlr
     * 		minf
     * 			smhd
     * 			dinf
     * 				dref
     * 					url
     * 			stbl
     * 				stsd
     * 					mp4a
     * 						esds
     * 				stts
     * 				stsc
     * 				stsz
     * 				stco
     */
    static mdia(meta) {
        return MP4.box(MP4.types.mdia, MP4.mdhd(meta), MP4.hdlr(meta), MP4.minf(meta));
    }

    // Media header box
    static mdhd(meta) {
        const timescale = meta.timescale;
        const duration = meta.duration;
        return MP4.box(MP4.types.mdhd, new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags // version(0) + flags		box版本，0或1，一般为0。
            0x00, 0x00, 0x00, 0x00, // creation_time    创建时间
            0x00, 0x00, 0x00, 0x00, // modification_time修改时间
            (timescale >>> 24) & 0xFF, // timescale: 4 bytes    文件媒体在1秒时间内的刻度值，可以理解为1秒长度
            (timescale >>> 16) & 0xFF,
            (timescale >>> 8) & 0xFF,
            (timescale) & 0xFF,
            (duration >>> 24) & 0xFF, // duration: 4 bytes  track的时间长度
            (duration >>> 16) & 0xFF,
            (duration >>> 8) & 0xFF,
            (duration) & 0xFF,
            0x55, 0xC4, // language: und (undetermined) 媒体语言码。最高位为0，后面15位为3个字符（见ISO 639-2/T标准中定义）
            0x00, 0x00 // pre_defined = 0
        ]));
    }

    // Media handler reference box
    static hdlr(meta) {
        let data = null;
        if (meta.type === 'audio') {
            data = MP4.constants.HDLR_AUDIO;
        } else {
            data = MP4.constants.HDLR_VIDEO;
        }
        return MP4.box(MP4.types.hdlr, data);
    }

    /**
		 * “minf”存储了解释track媒体数据的handler-specific信息，media handler用这些信息将媒体时间映射到媒体数据并进行处理。“minf”中的信息格式和内容与媒体类型以及解释媒体数据的media handler密切相关，其他media handler不知道如何解释这些信息。“minf”是一个container box，其实际内容由子box说明。
    一般情况下，“minf”包含一个header box，一个“dinf”和一个“stbl”，其中，header box根据track type（即media handler type）分为“vmhd”、“smhd”、“hmhd”和“nmhd”，“dinf”为data information box，“stbl”为sample table box。下面分别介绍。

		 *
		 */
    // Media infomation box
    static minf(meta) {
        // header box根据track type（即media handler type）分为“vmhd”、“smhd”、“hmhd”和“nmhd”
        let xmhd = null;
        if (meta.type === 'audio') {
            xmhd = MP4.box(MP4.types.smhd, MP4.constants.SMHD);
        } else {
            xmhd = MP4.box(MP4.types.vmhd, MP4.constants.VMHD);
        }
        return MP4.box(MP4.types.minf, xmhd, MP4.dinf(), MP4.stbl(meta));
    }

    /**
     * Data Information Box
     * “dinf”解释如何定位媒体信息，是一个container box。“dinf”一般包含一个“dref”，即data reference box；
     * “dref”下会包含若干个“url”或“urn”，这些box组成一个表，用来定位track数据。
     * 简单的说，track可以被分成若干段，每一段都可以根据“url”或“urn”指向的地址来获取数据，
     * sample描述中会用这些片段的序号将这些片段组成一个完整的track。
     * 一般情况下，当数据被完全包含在文件中时，“url”或“urn”中的定位字符串是空的。
     */
    static dinf() {
        const result = MP4.box(MP4.types.dinf,
            MP4.box(MP4.types.dref, MP4.constants.DREF)
        );
        return result;
    }

    /**
		 * Sample Table Box（stbl）
    	*	“stbl”几乎是普通的MP4文件中最复杂的一个box了，首先需要回忆一下sample的概念。
 		* 	sample是媒体数据存储的单位，存储在media的chunk中，chunk和sample的长度均可互不相同，如下图所示。
			“stbl”是一个container box，其子box包括：sample description box（stsd）、
			 * time to sample box（stts）、sample size box（stsz或stz2）、
			 * sample to chunk box（stsc）、chunk offset box（stco或co64）、
			 * composition time to sample box（ctts）、sync sample box（stss）
			 * stsd”必不可少，且至少包含一个条目，该box包含了data reference box进行sample数据检索的信息。
			 * 没有“stsd”就无法计算media sample的存储位置。“stsd”包含了编码的信息，其存储的信息随媒体类型不同而不同。
			 * 			stbl
			 * 				stsd
			 * 					avc1
			 * 						avcC
			 * 				stts
			 * 				stsc
			 * 				stsz
			 * 				stco
		 */
    static stbl(meta) {
        const result = MP4.box(MP4.types.stbl, // type: stbl
            MP4.stsd(meta), // Sample Description Table
            MP4.box(MP4.types.stts, MP4.constants.STTS), // Time-To-Sample    因为stts的entry count 为0
            // 所以没有关键帧index 的stss
            // 也没有CTTS box CTTS是记录偏移量
            MP4.box(MP4.types.stsc, MP4.constants.STSC), // Sample-To-Chunk
            MP4.box(MP4.types.stsz, MP4.constants.STSZ), // Sample size
            MP4.box(MP4.types.stco, MP4.constants.STCO) // Chunk offset
        );
        return result;
    }

    /**
		 * Sample Description Box（stsd）
    		box header和version字段后会有一个entry count字段，
 * 			根据entry的个数，每个entry会有type信息，如“vide”、“sund”等，
 * 		根据type不同sample description会提供不同的信息，例如对于video track，
 * 会有“VisualSampleEntry”类型信息，对于audio track会有“AudioSampleEntry”类型信息。

		 * * 				stsd
			* 					mp4a
			* 						esds
			 *
			 *
			 *
			 *
			 * 		 4 bytes - length in total
					 4 bytes - 4 char code of sample description table (stsd)
					 4 bytes - version & flags
					 4 bytes - number of sample entries (num_sample_entries)
						 [
						    4 bytes - length of sample entry (len_sample_entry)
						    4 bytes - 4 char code of sample entry
						    ('len_sample_entry' - 8) bytes of data
						 ] (repeated 'num_sample_entries' times)
					(4 bytes - optional 0x00000000 as end of box marker )
		 */
    static stsd(meta) {
        if (meta.type === 'audio') {
            return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp4a(meta));
        } else {
            return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.avc1(meta));
        }
    }

    static mp4a(meta) {
        const channelCount = meta.channelCount;
        const sampleRate = meta.audioSampleRate;

        const data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // reserved(4) 6个字节，设置为0；
            0x00, 0x00, 0x00, 0x01, // reserved(2) + data_reference_index(2)
            0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes 保留位
            0x00, 0x00, 0x00, 0x00,
            0x00, channelCount, // channelCount(2) 单声道还是双声道
            0x00, 0x10, // sampleSize(2)
            0x00, 0x00, 0x00, 0x00, // reserved(4) 4字节保留位
            (sampleRate >>> 8) & 0xFF, // Audio sample rate 显然要右移16位才有意义	template unsigned int(32) samplerate = {timescale of media}<<16;
            (sampleRate) & 0xFF,
            0x00, 0x00
        ]);

        return MP4.box(MP4.types.mp4a, data, MP4.esds(meta));
    }

    static esds(meta) {
        const config = meta.config;
        const configSize = config.length;
        const data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version 0 + flags

            0x03, // descriptor_type    MP4ESDescrTag
            0x17 + configSize, // length3
            0x00, 0x01, // es_id
            0x00, // stream_priority

            0x04, // descriptor_type    MP4DecConfigDescrTag
            0x0F + configSize, // length
            0x40, // codec: mpeg4_audio
            /**
             *当objectTypeIndication为0x40时，为MPEG-4 Audio（MPEG-4 Audio generally is thought of as AAC
             * but there is a whole framework of audio codecs that can Go in MPEG-4 Audio including AAC, BSAC, ALS, CELP,
             * and something called MP3On4），如果想更细分format为aac还是mp3，
             * 可以读取MP4DecSpecificDescr层data[0]的前五位
             */
            0x15, // stream_type: Audio
            0x00, 0x00, 0x00, // buffer_size
            0x00, 0x00, 0x00, 0x00, // maxBitrate
            0x00, 0x00, 0x00, 0x00, // avgBitrate

            0x05 // descriptor_type MP4DecSpecificDescrTag
        ].concat([
            configSize
        ]).concat(
            config
        ).concat([
            0x06, 0x01, 0x02 // GASpecificConfig
        ]));
        return MP4.box(MP4.types.esds, data);
    }

    /**
     * 改版
     *stsd下的avc1视频解析
     */
    static avc1(meta) {
        const avcc = meta.avcc;
        let width = meta.codecWidth,
            height = meta.codecHeight;

        const data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // // reserved(4)    6个 保留位	Reserved：6个字节，设置为0；
            0x00, 0x00, 0x00, 0x01, // reserved(2) + {{{{data_reference_index(2)  数据引用索引}}}}
            0x00, 0x00, 0x00, 0x00, // pre_defined(2) + reserved(2)
            0x00, 0x00, 0x00, 0x00, // pre_defined: 3 * 4 bytes  3*4个字节的保留位
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            (width >>> 8) & 0xFF, // width: 2 bytes
            (width) & 0xFF,
            (height >>> 8) & 0xFF, // height: 2 bytes
            (height) & 0xFF,
            0x00, 0x48, 0x00, 0x00, // horizresolution: 4 bytes 常数
            0x00, 0x48, 0x00, 0x00, // vertresolution: 4 bytes 常数
            0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes 保留位
            0x00, 0x01, // frame_count
            // frame_count表明多少帧压缩视频存储在每个样本。默认是1,每样一帧;它可能超过1每个样本的多个帧数
            0x04, //	strlen compressorname: 32 bytes			String[32]
            // 32个8 bit    第一个8bit表示长度,剩下31个8bit表示内容
            0x67, 0x31, 0x31, 0x31, // compressorname: 32 bytes    翻译过来是g111
            0x00, 0x00, 0x00, 0x00, //
            0x00, 0x00, 0x00, 0x00, //
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00,
            0x00, 0x18, // depth 颜色深度
            0xFF, 0xFF // pre_defined = -1
        ]);
        return MP4.box(MP4.types.avc1, data, MP4.box(MP4.types.avcC, avcc));
    }

    // Movie Extends box
    static mvex(meta) {
        if (meta.length > 1) { return MP4.box(MP4.types.mvex, MP4.trex(meta[0]), MP4.trex(meta[1])); } else { return MP4.box(MP4.types.mvex, MP4.trex(meta[0])); }
    }

    // Track Extends box
    static trex(meta) {
        const trackId = meta.id;
        const data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) + flags
            (trackId >>> 24) & 0xFF, // track_ID
            (trackId >>> 16) & 0xFF,
            (trackId >>> 8) & 0xFF,
            (trackId) & 0xFF,
            0x00, 0x00, 0x00, 0x01, // default_sample_description_index
            0x00, 0x00, 0x00, 0x00, // default_sample_duration
            0x00, 0x00, 0x00, 0x00, // default_sample_size
            0x00, 0x01, 0x00, 0x01 // default_sample_flags
        ]);
        // if (meta.type !== 'video') {
        //     data[data.length - 1] = 0x00;
        // }
        return MP4.box(MP4.types.trex, data);
    }

    // Movie fragment box
    static moof(track, baseMediaDecodeTime) {
        return MP4.box(MP4.types.moof, MP4.mfhd(track.sequenceNumber), MP4.traf(track, baseMediaDecodeTime));
    }

    static mfhd(sequenceNumber) {
        const data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            (sequenceNumber >>> 24) & 0xFF, // sequence_number: int32
            (sequenceNumber >>> 16) & 0xFF,
            (sequenceNumber >>> 8) & 0xFF,
            (sequenceNumber) & 0xFF
        ]);
        return MP4.box(MP4.types.mfhd, data);
    }

    // Track fragment box
    static traf(track, baseMediaDecodeTime) {
        const trackId = track.id;

        // Track fragment header box
        const tfhd = MP4.box(MP4.types.tfhd, new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) & flags
            (trackId >>> 24) & 0xFF, // track_ID
            (trackId >>> 16) & 0xFF,
            (trackId >>> 8) & 0xFF,
            (trackId) & 0xFF
        ]));
        // Track Fragment Decode Time
        const tfdt = MP4.box(MP4.types.tfdt, new Uint8Array([
            0x00, 0x00, 0x00, 0x00, // version(0) & flags
            (baseMediaDecodeTime >>> 24) & 0xFF, // baseMediaDecodeTime: int32
            (baseMediaDecodeTime >>> 16) & 0xFF,
            (baseMediaDecodeTime >>> 8) & 0xFF,
            (baseMediaDecodeTime) & 0xFF
        ]));
        const sdtp = MP4.sdtp(track);
        const trun = MP4.trun(track, sdtp.byteLength + 16 + 16 + 8 + 16 + 8 + 8);

        return MP4.box(MP4.types.traf, tfhd, tfdt, trun, sdtp);
    }

    // Sample Dependency Type box
    static sdtp(track) {
        const samples = track.samples || [];
        const sampleCount = samples.length;
        const data = new Uint8Array(4 + sampleCount);
        // 0~4 bytes: version(0) & flags
        for (let i = 0; i < sampleCount; i++) {
            const flags = samples[i].flags;
            data[i + 4] = (flags.isLeading << 6) // is_leading: 2 (bit)
                |
                (flags.dependsOn << 4) // sample_depends_on
                |
                (flags.isDependedOn << 2) // sample_is_depended_on
                |
                (flags.hasRedundancy); // sample_has_redundancy
        }
        return MP4.box(MP4.types.sdtp, data);
    }

    // Track fragment run box
    static trun(track, offset) {
        const samples = track.samples || [];
        const sampleCount = samples.length;
        const dataSize = 12 + 16 * sampleCount;
        const data = new Uint8Array(dataSize);
        offset += 8 + dataSize;

        data.set([
            0x00, 0x00, 0x0F, 0x01, // version(0) & flags
            (sampleCount >>> 24) & 0xFF, // sample_count
            (sampleCount >>> 16) & 0xFF,
            (sampleCount >>> 8) & 0xFF,
            (sampleCount) & 0xFF,
            (offset >>> 24) & 0xFF, // data_offset
            (offset >>> 16) & 0xFF,
            (offset >>> 8) & 0xFF,
            (offset) & 0xFF
        ], 0);

        for (let i = 0; i < sampleCount; i++) {

            const duration = samples[i].duration;

            const size = samples[i].size;
            const flags = samples[i].flags;
            const cts = samples[i].cts;
            data.set([
                (duration >>> 24) & 0xFF, // sample_duration
                (duration >>> 16) & 0xFF,
                (duration >>> 8) & 0xFF,
                (duration) & 0xFF,
                (size >>> 24) & 0xFF, // sample_size
                (size >>> 16) & 0xFF,
                (size >>> 8) & 0xFF,
                (size) & 0xFF,
                (flags.isLeading << 2) | flags.dependsOn, // sample_flags
                (flags.isDependedOn << 6) | (flags.hasRedundancy << 4) | flags.isNonSync,
                0x00, 0x00, // sample_degradation_priority
                (cts >>> 24) & 0xFF, // sample_composition_time_offset
                (cts >>> 16) & 0xFF,
                (cts >>> 8) & 0xFF,
                (cts) & 0xFF
            ], 12 + 16 * i);
        }
        return MP4.box(MP4.types.trun, data);
    }

    static mdat(data) {
        return MP4.box(MP4.types.mdat, data);
    }

}

MP4.init();

export default MP4;