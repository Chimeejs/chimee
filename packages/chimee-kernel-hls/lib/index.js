
/**
 * chimee-kernel-hls v1.3.0
 * (c) 2017-2018 songguangyu
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
var HlsCore = _interopDefault(require('hls.js'));
var chimeeHelper = require('chimee-helper');
var toxicDecorators = require('toxic-decorators');

var defaultCustomConfig = {
  debug: false,
  enableWorker: true
};

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

var LOG_TAG = 'chimee-kernel-hls';

var Hls = (_class = function (_CustEvent) {
  _inherits(Hls, _CustEvent);

  _createClass(Hls, null, [{
    key: 'isSupport',
    value: function isSupport() {
      return HlsCore.isSupported();
    }
  }]);

  function Hls(videoElement, config) {
    var customConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Hls);

    var _this = _possibleConstructorReturn(this, (Hls.__proto__ || _Object$getPrototypeOf(Hls)).call(this));

    _this.version = '1.3.0';

    if (!chimeeHelper.isElement(videoElement)) throw new Error('video element passed in ' + LOG_TAG + ' must be a HTMLVideoElement, but not ' + (typeof videoElement === 'undefined' ? 'undefined' : _typeof(videoElement)));
    if (!chimeeHelper.isObject(config)) throw new Error('config of ' + LOG_TAG + ' must be an Object but not ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
    _this.video = videoElement;
    _this.config = config;
    _this.customConfig = chimeeHelper.deepAssign({}, defaultCustomConfig, customConfig);
    _this.hlsKernel = new HlsCore(_this.customConfig);
    _this.bindEvents();
    _this.attachMedia();
    return _this;
  }

  _createClass(Hls, [{
    key: 'bindEvents',
    value: function bindEvents() {
      var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var hlsKernel = this.hlsKernel;
      /* istanbul ignore else */
      if (hlsKernel) {
        hlsKernel[remove ? 'off' : 'on'](HlsCore.Events.ERROR, this.hlsErrorHandler);
      }
    }
  }, {
    key: 'load',
    value: function load() {
      return this.hlsKernel.loadSource(this.config.src);
    }
  }, {
    key: 'startLoad',
    value: function startLoad() {
      return this.hlsKernel.startLoad();
    }
  }, {
    key: 'stopLoad',
    value: function stopLoad() {
      return this.hlsKernel.stopLoad();
    }
  }, {
    key: 'attachMedia',
    value: function attachMedia() {
      return this.hlsKernel.attachMedia(this.video);
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
      return this.hlsKernel.destroy();
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
      this.hlsKernel.stopLoad();
      return this.hlsKernel.loadSource(this.config.src);
    }
  }, {
    key: 'hlsErrorHandler',
    value: function hlsErrorHandler(event, data) {
      this.emit('error', data);
      this.emit(event, data);
      /* istanbul ignore next */
      chimeeHelper.Log.error(LOG_TAG + (event ? ' ' + event : ''), data.details);
    }
  }]);

  return Hls;
}(chimeeHelper.CustEvent), _applyDecoratedDescriptor(_class.prototype, 'hlsErrorHandler', [toxicDecorators.autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'hlsErrorHandler'), _class.prototype), _class);

module.exports = Hls;
