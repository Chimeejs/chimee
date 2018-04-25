
/**
 * chimee-kernel v1.5.0-alpha
 * (c) 2017-2018 songguangyu
 * Released under MIT
 */

import _typeof from 'babel-runtime/helpers/typeof';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import { CustEvent, isElement, Log, isNumber, deepAssign, isString, isFunction } from 'chimee-helper';

var tempCurrentTime = 0;

var NativeVideoKernel = function (_CustEvent) {
  _inherits(NativeVideoKernel, _CustEvent);

  _createClass(NativeVideoKernel, null, [{
    key: 'isSupport',

    /* istanbul ignore next  */
    value: function isSupport() {
      return true;
    }
  }]);

  function NativeVideoKernel(videoElement, config, customConfig) {
    _classCallCheck(this, NativeVideoKernel);

    var _this = _possibleConstructorReturn(this, (NativeVideoKernel.__proto__ || _Object$getPrototypeOf(NativeVideoKernel)).call(this));

    if (!isElement(videoElement)) throw new Error('You must pass in an legal video element but not ' + (typeof videoElement === 'undefined' ? 'undefined' : _typeof(videoElement)));
    _this.video = videoElement;
    _this.config = config;
    _this.customConfig = customConfig;
    return _this;
  }

  _createClass(NativeVideoKernel, [{
    key: 'load',
    value: function load(src) {
      this.video.setAttribute('src', src);
      this.video.src = src;
    }
  }, {
    key: 'startLoad',
    value: function startLoad(src) {
      /* istanbul ignore next */
      var currentTime = this.video.currentTime || tempCurrentTime;
      this.load(src);
      this.seek(currentTime);
    }

    // https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media

  }, {
    key: 'stopLoad',
    value: function stopLoad() {
      tempCurrentTime = this.video.currentTime;
      this.video.src = '';
      this.video.removeAttribute('src');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      /* istanbul ignore next  */
      if (isElement(this.video)) this.stopLoad();
    }
  }, {
    key: 'play',
    value: function play() {
      return this.video.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      return this.video.pause();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.video.src = this.config.src;
    }
  }, {
    key: 'attachMedia',
    value: function attachMedia() {}
  }, {
    key: 'seek',
    value: function seek(seconds) {
      this.video.currentTime = seconds;
    }
  }]);

  return NativeVideoKernel;
}(CustEvent);

var defaultConfig = {
  isLive: false, // vod or live
  box: '', // box type : native mp4 hls flv
  preset: {},
  presetConfig: {}
};

var LOG_TAG = 'chimee-kernel';
var boxSuffixMap = {
  flv: '.flv',
  hls: '.m3u8',
  mp4: '.mp4'
};

var ChimeeKernel = function () {
  /**
  * kernelWrapper
  * @param {any} wrap videoElement
  * @param {any} option
  * @class kernel
  */
  function ChimeeKernel(videoElement, config) {
    _classCallCheck(this, ChimeeKernel);

    this.VERSION = '1.5.0-alpha';

    if (!isElement(videoElement)) throw new Error('You must pass in an video element to the chimee-kernel');
    // copy and maintain only one config for chimee-kernel
    // actually kernel is disposable in most situation nowaday
    this.config = deepAssign({}, defaultConfig, config);
    this.videoElement = videoElement;
    this.initVideoKernel();
  }

  _createClass(ChimeeKernel, [{
    key: 'destroy',
    value: function destroy() {
      this.videoKernel.destroy();
    }
  }, {
    key: 'initVideoKernel',
    value: function initVideoKernel() {
      var config = this.config;
      var box = this.chooseBox(config);
      this.box = box;
      var VideoKernel = this.chooseVideoKernel(this.box, config.preset);

      if (!isFunction(VideoKernel)) throw new Error('We can\'t find video kernel for ' + box + '. Please check your config and make sure it\'s installed or provided');

      var customConfig = config.presetConfig[this.box];

      // TODO: nowaday, kernels all get config from one config
      // it's not a good way, because custom config may override kernel config
      // so we may remove this code later
      if (customConfig) deepAssign(config, customConfig);

      this.videoKernel = new VideoKernel(this.videoElement, config, customConfig);
    }

    // return the config box
    // or choose the right one according to the src

  }, {
    key: 'chooseBox',
    value: function chooseBox(_ref) {
      var src = _ref.src,
          box = _ref.box;

      if (isString(box) && box) return box;
      src = src.toLowerCase();
      for (var key in boxSuffixMap) {
        var suffix = boxSuffixMap[key];
        if (src.indexOf(suffix) > -1) return key;
      }
      return 'native';
    }

    // choose the right video kernel according to the box setting

  }, {
    key: 'chooseVideoKernel',
    value: function chooseVideoKernel(box, preset) {
      switch (box) {
        case 'native':
          // $FlowFixMe: it's the same as videoKernel
          return NativeVideoKernel;
        case 'mp4':
          return this.getMp4Kernel(preset.mp4);
        case 'flv':
        case 'hls':
          return preset[box];
        default:
          throw new Error('We currently do not support box ' + box + ', please contact us through https://github.com/Chimeejs/chimee/issues.');
      }
    }

    // fetch the legal mp4 kernel
    // if it's not exist or not support
    // we will fall back to the native video kernel

  }, {
    key: 'getMp4Kernel',
    value: function getMp4Kernel(mp4Kernel) {
      var hasLegalMp4Kernel = mp4Kernel && isFunction(mp4Kernel.isSupport);
      // $FlowFixMe: we have make sure it's an kernel now
      var supportMp4Kernel = hasLegalMp4Kernel && mp4Kernel.isSupport();
      // $FlowFixMe: we have make sure it's an kernel now
      if (supportMp4Kernel) return mp4Kernel;
      if (hasLegalMp4Kernel) Log.warn(LOG_TAG, 'mp4 decode is not support in this browser, we will switch to the native video kernel');
      this.box = 'native';
      // $FlowFixMe: it's the same as videoKernel
      return NativeVideoKernel;
    }
  }, {
    key: 'attachMedia',
    value: function attachMedia() {
      this.videoKernel.attachMedia();
    }
  }, {
    key: 'load',
    value: function load() {
      var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.src;

      this.config.src = src;
      this.videoKernel.load(src);
    }
  }, {
    key: 'startLoad',
    value: function startLoad() {
      /* istanbul ignore if */
      if (!isFunction(this.videoKernel.startLoad)) throw new Error('This video kernel do not support startLoad, please contact us on https://github.com/Chimeejs/chimee/issues');
      this.videoKernel.startLoad(this.config.src);
    }
  }, {
    key: 'stopLoad',
    value: function stopLoad() {
      /* istanbul ignore else */
      if (isFunction(this.videoKernel.stopLoad)) this.videoKernel.stopLoad();
    }
  }, {
    key: 'play',
    value: function play() {
      this.videoKernel.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.videoKernel.pause();
    }
  }, {
    key: 'seek',
    value: function seek(seconds) {
      if (!isNumber(seconds)) {
        Log.error(LOG_TAG, 'When you try to seek, you must offer us a number, but not ' + (typeof seconds === 'undefined' ? 'undefined' : _typeof(seconds)));
        return;
      }
      this.videoKernel.seek(seconds);
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.videoKernel.refresh();
    }
  }, {
    key: 'on',
    value: function on(key, fn) {
      this.videoKernel.on(key, fn);
    }
  }, {
    key: 'off',
    value: function off(key, fn) {
      this.videoKernel.off(key, fn);
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this.videoElement.currentTime || 0;
    }
  }]);

  return ChimeeKernel;
}();

export default ChimeeKernel;
