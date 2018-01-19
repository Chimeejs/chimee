
/**
 * chimee-kernel-flv.js v0.2.0
 * (c) 2017-2018 toxic-johann
 * Released under MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _Object$getOwnPropertyDescriptor = _interopDefault(require('babel-runtime/core-js/object/get-own-property-descriptor'));
var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));
var _Object$getPrototypeOf = _interopDefault(require('babel-runtime/core-js/object/get-prototype-of'));
var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _possibleConstructorReturn = _interopDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));
var _inherits = _interopDefault(require('babel-runtime/helpers/inherits'));
var FlvCore = _interopDefault(require('flv.js'));
var chimeeHelper = require('chimee-helper');
var toxicDecorators = require('toxic-decorators');

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

    _this.version = '0.2.0';

    if (!chimeeHelper.isElement(videoElement)) throw new Error('video element passed in ' + LOG_TAG + ' must be a HTMLVideoElement, but not ' + (typeof videoElement === 'undefined' ? 'undefined' : _typeof(videoElement)));
    if (!chimeeHelper.isObject(config)) throw new Error('config of ' + LOG_TAG + ' must be an Object but not ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
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
    key: 'stopLoad',
    value: function stopLoad() {
      return this.flvKernel.unload();
    }
  }, {
    key: 'attachMedia',
    value: function attachMedia() {
      return this.flvKernel.attachMediaElement(this.video);
    }
  }, {
    key: 'play',
    value: function play() {
      return this.flvKernel.play();
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
      this.flvKernel.currentTime = seconds;
    }
  }, {
    key: 'pause',
    value: function pause() {
      return this.flvKernel.pause();
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
      chimeeHelper.Log.error(LOG_TAG + (event ? ' ' + event : ''), data.details);
    }
  }]);

  return Flv;
}(chimeeHelper.CustEvent), _applyDecoratedDescriptor(_class.prototype, 'flvErrorHandler', [toxicDecorators.autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'flvErrorHandler'), _class.prototype), _class);

module.exports = Flv;
