import _Object$getOwnPropertyDescriptor from 'babel-runtime/core-js/object/get-own-property-descriptor';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import HlsCore from 'hls.js';
import { CustEvent, deepAssign } from 'chimee-helper';

var defaultConfig = {
  type: 'vod',
  autoPlay: false,
  box: 'hls',
  lockInternalProperty: false,
  debug: true,
  enableWorker: true
};

var Hls = function (_CustEvent) {
  _inherits(Hls, _CustEvent);

  _createClass(Hls, null, [{
    key: 'isSupport',
    value: function isSupport() {
      return HlsCore.isSupported();
    }
  }, {
    key: 'version',
    get: function get() {
      return '1.0.5';
    }
  }]);

  function Hls(videodom, config) {
    _classCallCheck(this, Hls);

    var _this2 = _possibleConstructorReturn(this, (Hls.__proto__ || _Object$getPrototypeOf(Hls)).call(this));

    _this2.tag = 'HLS-player';
    _this2.video = videodom;
    _this2.box = 'hls';
    _this2.config = deepAssign({}, defaultConfig, config);
    _this2.hls = new HlsCore();
    _this2.bindEvents(_this2.hls);
    _this2.attachMedia();
    return _this2;
  }

  _createClass(Hls, [{
    key: 'internalPropertyHandle',
    value: function internalPropertyHandle() {
      if (!_Object$getOwnPropertyDescriptor) {
        return;
      }
      var _this = this;
      var time = _Object$getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'currentTime');

      Object.defineProperty(this.video, 'currentTime', {
        get: function get() {
          return time.get.call(_this.video);
        },
        set: function set(t) {
          if (!_this.currentTimeLock) {
            throw new Error('can not set currentTime by youself');
          } else {
            return time.set.call(_this.video, t);
          }
        }
      });
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents(hlsKernel) {
      var _this3 = this;

      if (hlsKernel) {
        hlsKernel.on(HlsCore.Events.ERROR, function (event, data) {
          // this.emit(this.tag, data);
        });

        hlsKernel.on(HlsCore.Events.LEVEL, function (event, data) {});
      }
      if (this.video && this.config.lockInternalProperty) {
        this.video.addEventListener('canplay', function () {
          _this3.internalPropertyHandle();
        });
      }
    }
  }, {
    key: 'load',
    value: function load() {
      this.hls.loadSource(this.config.src);
    }
  }, {
    key: 'attachMedia',
    value: function attachMedia() {
      this.hls.attachMedia(this.video);
    }
  }, {
    key: 'play',
    value: function play() {
      return this.video.play();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      return this.hls.destroy();
    }
  }, {
    key: 'seek',
    value: function seek(seconds) {
      this.currentTimeLock = true;
      // throttle(this._seek.bind(this, seconds), 200, {leading: false});
      this._seek(seconds);
      this.currentTimeLock = false;
    }
  }, {
    key: '_seek',
    value: function _seek(seconds) {
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
      this.hls.stopLoad();
      this.hls.loadSource(this.config.src);
    }
  }]);

  return Hls;
}(CustEvent);

export default Hls;
