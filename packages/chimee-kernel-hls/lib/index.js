
/**
 * chimee-kernel-hls v1.3.2
 * (c) 2017-2019 toxic-johann
 * Released under MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var chimeeHelperLog = require('chimee-helper-log');
var events = require('events');
var HlsCore = _interopDefault(require('hls.js'));
var toxicPredicateFunctions = require('toxic-predicate-functions');

var defaultCustomConfig = {
  debug: false
};
var LOG_TAG = 'chimee-kernel-hls';

var HlsJSVideoKernel =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(HlsJSVideoKernel, _EventEmitter);

  function HlsJSVideoKernel(videoElement, config) {
    var _this;

    var customConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, HlsJSVideoKernel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HlsJSVideoKernel).call(this));
    _this.version = '1.3.2';

    _this.hlsErrorHandler = function (event, data) {
      _this.emit('error', data);

      _this.emit(event, data);

      chimeeHelperLog.chimeeLog.error(LOG_TAG + (event ? ' ' + event : ''), data.details);
    };

    if (!toxicPredicateFunctions.isElement(videoElement)) {
      throw new Error("video element passed in ".concat(LOG_TAG, " must be a HTMLVideoElement, but not ").concat(_typeof(videoElement)));
    }

    _this.video = videoElement;
    _this.config = config;
    _this.customConfig = Object.assign({}, defaultCustomConfig, customConfig);
    _this.hlsKernel = new HlsCore(_this.customConfig);

    _this.bindEvents();

    _this.attachMedia();

    if (!_this.off) {
      _this.off = _this.removeListener;
    }

    return _this;
  }

  _createClass(HlsJSVideoKernel, [{
    key: "attachMedia",
    value: function attachMedia() {
      return this.hlsKernel.attachMedia(this.video);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var hlsKernel = this.hlsKernel;

      if (hlsKernel) {
        hlsKernel[remove ? 'off' : 'on'](HlsCore.Events.ERROR, this.hlsErrorHandler);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.bindEvents(true);
      return this.hlsKernel.destroy();
    }
  }, {
    key: "load",
    value: function load() {
      var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.src;
      this.config.src = src;
      return this.hlsKernel.loadSource(src);
    }
  }, {
    key: "pause",
    value: function pause() {
      return this.video.pause();
    }
  }, {
    key: "play",
    value: function play() {
      return this.video.play();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.hlsKernel.stopLoad();
      return this.hlsKernel.loadSource(this.config.src);
    }
  }, {
    key: "seek",
    value: function seek(seconds) {
      this.video.currentTime = seconds;
    }
  }, {
    key: "startLoad",
    value: function startLoad() {
      return this.hlsKernel.startLoad();
    }
  }, {
    key: "stopLoad",
    value: function stopLoad() {
      return this.hlsKernel.stopLoad();
    }
  }, {
    key: "unload",
    value: function unload() {}
  }], [{
    key: "isSupport",
    value: function isSupport() {
      return HlsCore.isSupported();
    }
  }]);

  return HlsJSVideoKernel;
}(events.EventEmitter);

module.exports = HlsJSVideoKernel;
