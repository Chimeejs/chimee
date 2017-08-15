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
  autoPlay: false,
  box: 'native',
  lockInternalProperty: false,
  debug: true,
  reloadTime: 1500
};

/**
 * mp4解码器
 *
 * @export
 * @class Native
 */

var Native = function (_CustEvent) {
    _inherits(Native, _CustEvent);

    /**
     * Creates an instance of Native.
     * @param {any} videodom video dom对象
     * @param {any} config 配置
     * @memberof Native
     */
    function Native(videodom, config) {
        _classCallCheck(this, Native);

        var _this2 = _possibleConstructorReturn(this, (Native.__proto__ || _Object$getPrototypeOf(Native)).call(this));

        _this2.video = videodom;
        _this2.box = 'Native';
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
            this.video.src = this.config.src;
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
  reloadTime: 1500
};

var Kernel = function (_CustEvent) {
	_inherits(Kernel, _CustEvent);

	/**
  * 创建核心解码器
  * @param {any} wrap 父层容器
  * @param {any} option 整合参数
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
		_this.timer = null;
		return _this;
	}

	/**
  * 绑定事件
  * @memberof kernel
  */


	_createClass(Kernel, [{
		key: 'bindEvents',
		value: function bindEvents(videokernel, video) {
			var _this2 = this;

			if (videokernel) {
				videokernel.on('mediaInfo', function (mediaInfo) {
					_this2.emit('mediaInfo', mediaInfo);
				});

				video.addEventListener('canplay', function () {
					clearTimeout(_this2.timer);
					_this2.timer = null;
				});
			}
		}

		/**
   * 选择解码器
   * @memberof kernel
   */

	}, {
		key: 'selectKernel',
		value: function selectKernel() {
			var config = this.config;

			var box = config.box ? config.box : config.src.indexOf('.flv') !== -1 ? 'flv' : config.src.indexOf('.m3u8') !== -1 ? 'hls' : 'native';

			if (box === 'native') {
				return new Native(this.video, config);
			} else if (box === 'flv') {
				return new config.preset[box](this.video, config);
			} else if (box === 'hls') {
				return new config.preset[box](this.video, config);
			} else {
				chimeeHelper.Log.error(this.tag, 'not mactch any player, please check your config');
				return null;
			}
		}
	}, {
		key: 'attachMedia',
		value: function attachMedia() {
			if (this.videokernel) {
				this.videokernel.attachMedia();
			} else {
				chimeeHelper.Log.error(this.tag, 'video player is not already, must init player');
			}
		}

		/**
   * 启动加载
   * @param {string} src 媒体资源地址
   * @memberof kernel
   */

	}, {
		key: 'load',
		value: function load(src) {
			var _this3 = this;

			this.config.src = src || this.config.src;
			console.log(this.config.reloadTime);
			if (this.videokernel && this.config.src) {
				this.videokernel.load(this.config.src);
				if (!this.timer) {
					this.timer = setTimeout(function () {
						_this3.timer = null;
						_this3.pause();
						_this3.refresh();
					}, this.config.reloadTime);
				}
			} else {
				chimeeHelper.Log.error(this.tag, 'video player is not already, must init player');
			}
		}
		/**
   * 销毁kernel
   * @memberof kernel
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			if (this.videokernel) {
				this.videokernel.destroy();
				clearTimeout(this.timer);
				this.timer = null;
			} else {
				chimeeHelper.Log.error(this.tag, 'player is not exit');
			}
		}
		/**
   * to play
   * @memberof kernel
   */

	}, {
		key: 'play',
		value: function play() {
			if (this.videokernel) {
				this.videokernel.play();
			} else {
				chimeeHelper.Log.error(this.tag, 'video player is not already, must init player');
			}
		}
		/**
   * pause
   * @memberof kernel
   */

	}, {
		key: 'pause',
		value: function pause() {
			if (this.videokernel && this.config.src) {
				this.videokernel.pause();
			} else {
				chimeeHelper.Log.error(this.tag, 'video player is not already, must init player');
			}
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
			return this.videokernel.seek(seconds);
		}
	}, {
		key: 'refresh',
		value: function refresh() {
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
