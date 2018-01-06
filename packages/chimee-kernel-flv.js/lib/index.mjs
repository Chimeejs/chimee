
/**
 * chimee-kernel-flv.js v0.1.0
 * (c) 2017-2018 toxic-johann
 * Released under MIT
 */

import _Object$getOwnPropertyDescriptor from 'babel-runtime/core-js/object/get-own-property-descriptor';
import _typeof from 'babel-runtime/helpers/typeof';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import FlvCore from 'flv.js';
import { CustEvent, Log, isElement, isObject } from 'chimee-helper';
import { autobind } from '../node_modules/toxic-decorators/lib/toxic-decorators.mjs';

var _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var LOG_TAG = 'chimee-kernel-flv.js';

var Flv = (_class = function (_CustEvent) {
  _inherits(Flv, _CustEvent);

  _createClass(Flv, null, [{
    key: 'isSupport',
    value: function isSupport() {
      return FlvCore.isSupported();
    }
  }]);

  function Flv(videoElement, config) {
    var customConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Flv);

    var _this = _possibleConstructorReturn(this, (Flv.__proto__ || _Object$getPrototypeOf(Flv)).call(this));

    _this.version = '0.1.0';

    if (!isElement(videoElement)) throw new Error('video element passed in ' + LOG_TAG + ' must be a HTMLVideoElement, but not ' + (typeof videoElement === 'undefined' ? 'undefined' : _typeof(videoElement)));
    if (!isObject(config)) throw new Error('config of ' + LOG_TAG + ' must be an Object but not ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
    _this.video = videoElement;
    _this.config = config;
    var src = config.src,
        isLive = config.isLive,
        box = config.box;
    var withCredentials = customConfig.withCredentials,
        hasAudio = customConfig.hasAudio,
        hasVideo = customConfig.hasVideo,
        duration = customConfig.duration,
        filesize = customConfig.filesize,
        segments = customConfig.segments;

    var mediaDataSource = {
      url: src,
      type: box,
      isLive: isLive,
      withCredentials: withCredentials,
      hasAudio: hasAudio,
      hasVideo: hasVideo,
      duration: duration,
      filesize: filesize
    };
    if (box !== 'mp4') mediaDataSource.segments = segments;
    _this.mediaDataSource = mediaDataSource;
    _this.customConfig = customConfig;
    _this.flvKernel = FlvCore.createPlayer(mediaDataSource, customConfig);
    _this.bindEvents();
    _this.attachMedia();
    return _this;
  }

  _createClass(Flv, [{
    key: 'bindEvents',
    value: function bindEvents() {
      var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var flvKernel = this.flvKernel;
      /* istanbul ignore else */
      if (flvKernel) {
        // $FlowFixMe: support computed key here
        flvKernel[remove ? 'off' : 'on'](FlvCore.Events.ERROR, this.flvErrorHandler);
      }
    }
  }, {
    key: 'load',
    value: function load() {
      return this.flvKernel.load();
    }
  }, {
    key: 'attachMedia',
    value: function attachMedia() {
      return this.flvKernel.attachMediaElement(this.video);
    }
  }, {
    key: 'play',
    value: function play() {
      return this.video.play();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.bindEvents(true);
      this.flvKernel.detachMediaElement();
      return this.flvKernel.destroy();
    }
  }, {
    key: 'seek',
    value: function seek(seconds) {
      this.video.currentTime = seconds;
    }
  }, {
    key: 'pause',
    value: function pause() {
      return this.video.pause();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.flvKernel.unload();
      return this.flvKernel.load();
    }
  }, {
    key: 'flvErrorHandler',
    value: function flvErrorHandler(event, data) {
      this.emit('error', data);
      this.emit(event, data);
      /* istanbul ignore next */
      Log.error(LOG_TAG + (event ? ' ' + event : ''), data.details);
    }
  }]);

  return Flv;
}(CustEvent), _applyDecoratedDescriptor(_class.prototype, 'flvErrorHandler', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'flvErrorHandler'), _class.prototype), _class);

export default Flv;
