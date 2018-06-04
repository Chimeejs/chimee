
/**
 * chimee-kernel-hls v1.3.2
 * (c) 2017-2018 songguangyu
 * Released under MIT
 */

import _Object$getOwnPropertyDescriptor from 'babel-runtime/core-js/object/get-own-property-descriptor';
import _typeof from 'babel-runtime/helpers/typeof';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import HlsCore from 'hls.js';
import { CustEvent, deepAssign, Log, isElement, isObject } from 'chimee-helper';
import { autobind } from 'toxic-decorators';

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

    _this.version = '1.3.2';

    if (!isElement(videoElement)) throw new Error('video element passed in ' + LOG_TAG + ' must be a HTMLVideoElement, but not ' + (typeof videoElement === 'undefined' ? 'undefined' : _typeof(videoElement)));
    if (!isObject(config)) throw new Error('config of ' + LOG_TAG + ' must be an Object but not ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
    _this.video = videoElement;
    _this.config = config;
    _this.customConfig = deepAssign({}, defaultCustomConfig, customConfig);
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
      Log.error(LOG_TAG + (event ? ' ' + event : ''), data.details);
    }
  }]);

  return Hls;
}(CustEvent), (_applyDecoratedDescriptor(_class.prototype, 'hlsErrorHandler', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'hlsErrorHandler'), _class.prototype)), _class);

export default Hls;
