'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _Object$getPrototypeOf = _interopDefault(require('babel-runtime/core-js/object/get-prototype-of'));
var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
var _inherits = _interopDefault(require('babel-runtime/helpers/inherits'));
var chimeeHelper = require('chimee-helper');
var _Object$getOwnPropertyDescriptor = _interopDefault(require('babel-runtime/core-js/object/get-own-property-descriptor'));

var defaultConfig = {
  type: 'vod',
  box: 'native',
  lockInternalProperty: false
};

/**
 * native player
 *
 * @export
 * @class Native
 */

var Native = function (_CustEvent) {
  _inherits(Native, _CustEvent);

  /**
   * Creates an instance of Native.
   * @param {any} videodom video dom
   * @param {any} config 
   * @memberof Native
   */
  function Native(videodom, config) {
    _classCallCheck(this, Native);

    var _this2 = _possibleConstructorReturn(this, (Native.__proto__ || _Object$getPrototypeOf(Native)).call(this));

    _this2.video = videodom;
    _this2.box = 'native';
    _this2.config = defaultConfig;
    chimeeHelper.deepAssign(_this2.config, config);
    _this2.bindEvents();
    return _this2;
  }

  _createClass(Native, [{
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
    value: function bindEvents() {
      var _this3 = this;

      if (this.video && this.config.lockInternalProperty) {
        this.video.addEventListener('canplay', function () {
          _this3.internalPropertyHandle();
        });
      }
    }
  }, {
    key: 'load',
    value: function load(src) {
      this.config.src = src || this.config.src;
      this.video.setAttribute('src', this.config.src);
    }
  }, {
    key: 'unload',
    value: function unload() {
      this.video.src = '';
      this.video.removeAttribute('src');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.video) {
        this.unload();
      }
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
      this.currentTimeLock = true;
      this.video.currentTime = seconds;
      this.currentTimeLock = false;
    }
  }]);

  return Native;
}(chimeeHelper.CustEvent);

var defaultConfig$1 = {
  isLive: true, // vod or live
  box: 'native', // box type : native mp4 hls flv
  lockInternalProperty: false,
  reloadTime: 1500 // video can't play when this time to reload
};

var $const = {
  kernelEvent: ['mediaInfo', 'heartbeat', 'error']
};

var Kernel = function (_CustEvent) {
	_inherits(Kernel, _CustEvent);

	/**
  * kernelWrapper
  * @param {any} wrap videoElement
  * @param {any} option
  * @class kernel
  */
	function Kernel(videoElement, config) {
		_classCallCheck(this, Kernel);

		var _this = _possibleConstructorReturn(this, (Kernel.__proto__ || _Object$getPrototypeOf(Kernel)).call(this));

		_this.tag = 'kernel';
		_this.config = chimeeHelper.deepAssign({}, defaultConfig$1, config);
		_this.video = videoElement;
		_this.videokernel = _this.selectKernel();
		_this.bindEvents(_this.videokernel, _this.video);
		return _this;
	}

	/**
  * bind events
  * @memberof kernel
  */


	_createClass(Kernel, [{
		key: 'bindEvents',
		value: function bindEvents(videokernel, video) {
			var _this2 = this;

			if (!videokernel) {
				return;
			}
			$const.kernelEvent.forEach(function (item) {
				videokernel.on(item, function (msg) {
					_this2.emit(item, msg.data);
				});
			});
		}

		/**
   * select kernel
   * @memberof kernel
   */

	}, {
		key: 'selectKernel',
		value: function selectKernel() {
			var config = this.config;
			chimeeHelper.isObject(config.preset) || (config.preset = {});
			var box = config.box;
			var src = config.src.toLowerCase();
			// 根据 src 判断 box
			if (!box) {
				if (src.indexOf('.flv') !== -1) {
					box = 'flv';
				} else if (src.indexOf('.m3u8') !== -1) {
					box = 'hls';
				} else if (src.indexOf('.mp4') !== -1) {
					box = 'mp4';
				} else {
					// 如果 src 不存在或无法判断，继续采用 native 方案。
					box = 'native';
				}
			}
			// 如果是自定义 box，就检测 box 有没有安装
			// 因为 native 和 mp4 都可以有原生方案支持，所以不用检测。
			if (box !== 'native' && box !== 'mp4' && !config.preset[box]) {
				chimeeHelper.Log.error(this.tag, 'You want to play for ' + box + ', but you have not installed the kernel.');
				return;
			}
			if (box === 'mp4') {
				if (!config.preset[box] || !config.preset[box].isSupport()) {
					chimeeHelper.Log.verbose(this.tag, 'browser is not support mp4 decode, auto switch native player');
					box = 'native';
				}
			}

			// 将盒子信息注入实例用于后期比对
			this.box = box;

			// 将 kernel 中的相关的 presetConfig 取出
			// 写入本实例的配置中
			// 但其实这种方式感觉不是很好，因为这很容易有重复定义的问题
			var boxConfig = config.presetConfig[box] || {};
			chimeeHelper.deepAssign(config, boxConfig);

			// 调用各个 box
			switch (box) {
				case 'native':
					return new Native(this.video, config);
				case 'mp4':
				case 'flv':
				case 'hls':
					return new config.preset[box](this.video, config);
				default:
					chimeeHelper.Log.error(this.tag, 'not mactch any player, please check your config');
					return;
			}
		}

		/**
   * select attachMedia
   * @memberof kernel
   */

	}, {
		key: 'attachMedia',
		value: function attachMedia() {
			if (!this.videokernel) {
				return chimeeHelper.Log.error(this.tag, 'videokernel is not already, must init player');
			}

			this.videokernel.attachMedia();
		}
		/**
   * load source
   * @param {string} src 
   * @memberof kernel
   */

	}, {
		key: 'load',
		value: function load(src) {
			this.config.src = src || this.config.src;
			if (!this.videokernel || !this.config.src) {
				return chimeeHelper.Log.error(this.tag, 'videokernel is not already, must init player');
			}

			this.videokernel.load(this.config.src);
		}
		/**
   * destory kernel
   * @memberof kernel
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			if (!this.videokernel) {
				return chimeeHelper.Log.error(this.tag, 'videokernel is not exit');
			}

			this.videokernel.destroy();
		}
		/**
   * to play
   * @memberof kernel
   */

	}, {
		key: 'play',
		value: function play() {
			if (!this.videokernel) {
				return chimeeHelper.Log.error(this.tag, 'videokernel is not already, must init player');
			}

			this.videokernel.play();
		}
		/**
   * pause
   * @memberof kernel
   */

	}, {
		key: 'pause',
		value: function pause() {
			if (!this.videokernel || !this.config.src) {
				return chimeeHelper.Log.error(this.tag, 'videokernel is not already, must init player');
			}
			this.videokernel.pause();
		}
		/**
   * get video currentTime
   * @memberof kernel
   */

	}, {
		key: 'seek',

		/**
   * seek to a point
   * @memberof kernel
   */
		value: function seek(seconds) {
			if (!chimeeHelper.isNumber(seconds)) {
				chimeeHelper.Log.error(this.tag, 'seek params must be a number');
				return;
			}
			if (this.videokernel) {
				return this.videokernel.seek(seconds);
			} else {
				chimeeHelper.Log.error(this.tag, 'videokernel is not already, must init player');
			}
		}
		/**
   * refresh kernel
   * @memberof kernel
   */

	}, {
		key: 'refresh',
		value: function refresh() {
			if (!this.videokernel) {
				return chimeeHelper.Log.error(this.tag, 'videokernel is not already, must init player');
			}
			this.videokernel.refresh();
		}
		/**
   * get video duration
   * @memberof kernel
   */

	}, {
		key: 'currentTime',
		get: function get() {
			if (this.videokernel) {
				return this.video.currentTime;
			}
			return 0;
		}
	}, {
		key: 'duration',
		get: function get() {
			return this.video.duration;
		}
		/**
   * get video volume
   * @memberof kernel
   */

	}, {
		key: 'volume',
		get: function get() {
			return this.video.volume;
		}
		/**
  * set video volume
  * @memberof kernel
  */
		,
		set: function set(value) {
			this.video.volume = value;
		}
		/**
   * get video muted
   * @memberof kernel
   */

	}, {
		key: 'muted',
		get: function get() {
			return this.video.muted;
		}
		/**
   * set video muted
   * @memberof kernel
   */
		,
		set: function set(muted) {
			this.video.muted = muted;
		}
		/**
  * get video buffer
  * @memberof kernel
  */

	}, {
		key: 'buffered',
		get: function get() {
			return this.video.buffered;
		}
	}]);

	return Kernel;
}(chimeeHelper.CustEvent);

module.exports = Kernel;
