
/**
 * chimee v1.0.1-alpha.0
 * (c) 2017-2019 toxic-johann
 * Released under MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _assertThisInitialized = _interopDefault(require('@babel/runtime/helpers/assertThisInitialized'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _get = _interopDefault(require('@babel/runtime/helpers/get'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var _isString = _interopDefault(require('lodash/isString'));
var _isPlainObject = _interopDefault(require('lodash/isPlainObject'));
var _isFunction = _interopDefault(require('lodash/isFunction'));
var _isError = _interopDefault(require('lodash/isError'));
var chimeeHelperLog = require('chimee-helper-log');
var toxicPredicateFunctions = require('toxic-predicate-functions');
var esFullscreen = require('es-fullscreen');
var toxicDecorators = require('toxic-decorators');
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _isEmpty = _interopDefault(require('lodash/isEmpty'));
var _isArray = _interopDefault(require('lodash/isArray'));
var _clone = _interopDefault(require('lodash/clone'));
var events = require('dom-helpers/events');
var toxicUtils = require('toxic-utils');
var _isNumber = _interopDefault(require('lodash/isNumber'));
var _isNil = _interopDefault(require('lodash/isNil'));
var _bind = _interopDefault(require('lodash/bind'));
var _camelCase = _interopDefault(require('lodash/camelCase'));
var domHelpers = require('dom-helpers');
var _class = require('dom-helpers/class');
var query = require('dom-helpers/query');
var events$1 = require('events');
var _isInteger = _interopDefault(require('lodash/isInteger'));
var _isBoolean = _interopDefault(require('lodash/isBoolean'));
var _cloneDeep = _interopDefault(require('lodash/cloneDeep'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var nonenumerable = toxicDecorators.nonenumerable;

var GlobalConfig =
/*#__PURE__*/
function () {
  function GlobalConfig() {
    _classCallCheck(this, GlobalConfig);

    this.errorHandler = undefined;
    this.log = {
      debug: true,
      error: true,
      info: true,
      verbose: true,
      warn: true
    };
    this.silentValue = false;
    var props = Object.keys(this.log).reduce(function (props, key) {
      var switchKey = 'ENABLE_' + key.toUpperCase();
      props[key] = toxicDecorators.accessor({
        get: function get() {
          return chimeeHelperLog.chimeeLog[switchKey];
        },
        set: function set(val) {
          chimeeHelperLog.chimeeLog[switchKey] = val;

          if (val === true) {
            this.silent = false;
          }

          return val;
        }
      });
      return props;
    }, {});
    toxicDecorators.applyDecorators(this.log, props, {
      self: true
    });
  }

  _createClass(GlobalConfig, [{
    key: "silent",
    get: function get() {
      return this.silentValue;
    },
    set: function set(val) {
      var _this = this;

      val = !!val;
      this.silentValue = val;
      Object.keys(this.log).forEach(function (key) {
        _this.log[key] = !val;
      });
    }
  }, {
    key: "useStyleFullscreen",
    get: function get() {
      return esFullscreen.esFullscreen.useStyleFirst;
    },
    set: function set(val) {
      esFullscreen.esFullscreen.useStyleFirst = !!val;
    }
  }]);

  return GlobalConfig;
}();

__decorate([nonenumerable], GlobalConfig.prototype, "silentValue", void 0);

var domEvents = ['beforeinput', 'blur', 'click', 'compositionend', 'compositionstart', 'compositionupdate', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll', 'select', 'wheel', 'mousewheel', 'contextmenu', 'touchstart', 'touchmove', 'touchend', 'fullscreen'];
function isDomEvent(x) {
  return domEvents.includes(x);
}
var esFullscreenEvents = ['fullscreenchange'];
var dispatcherEventMethodMap = {
  enterpictureinpicture: 'requestPictureInPicture',
  leavepictureinpicture: 'exitPictureInPicture',
  load: 'load'
};
function isDispatcherEventMethod(x) {
  return Object.keys(dispatcherEventMethodMap).includes(x);
}
var mustListenVideoDomEvents = ['mouseenter', 'mouseleave'];
function isMustListenVideoDomEvent(x) {
  return mustListenVideoDomEvents.includes(x);
}
var kernelEvents = ['mediaInfo', 'heartbeat', 'error'];
var selfProcessorEvents = ['silentLoad', 'fullscreen'];
var videoEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended', 'error', 'interruptbegin', 'interruptend', 'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting', 'enterpictureinpicture', 'leavepictureinpicture'];
function isVideoEvent(x) {
  return videoEvents.includes(x);
}

var defaultContainerConfig = {
  display: 'block',
  height: '100%',
  position: 'relative',
  width: '100%'
};

var Vessel = function Vessel(dispatcher, target, config) {
  var _this = this;

  _classCallCheck(this, Vessel);

  this.dispatcher = dispatcher;
  this.target = target;
  ['width', 'height', 'position', 'display'].forEach(function (key) {
    Object.defineProperty(_this, key, {
      get: function get() {
        return this.dispatcher.dom.getStyle(this.target, key);
      },
      set: function set(value) {
        if (_isNumber(value)) {
          value = value + 'px';
        }

        if (!_isString(value)) {
          throw new Error("The value of ".concat(key, " in ").concat(this.target, "Config must be string, but not ").concat(_typeof(value), "."));
        }

        this.dispatcher.dom.setStyle(this.target, key, value);
      },
      configurable: true,
      enumerable: true
    });
  });
  Object.assign(this, config);
};

var videoDomAttributes = ['src', 'controls', 'width', 'height', 'crossOrigin', 'loop', 'muted', 'preload', 'poster', 'autoplay', 'playsInline', 'x5VideoPlayerFullscreen', 'x5VideoOrientation', 'xWebkitAirplay', 'playbackRate', 'defaultPlaybackRate', 'autoload', 'disableRemotePlayback', 'defaultMuted', 'volume', 'x5VideoPlayerType'];
function isVideoDomAttribute(attr) {
  return videoDomAttributes.includes(attr);
}

var __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var nonenumerable$1 = toxicDecorators.nonenumerable;

function stringOrVoid(value) {
  return _isString(value) ? value : undefined;
}

function accessorVideoProperty(property) {
  return toxicDecorators.accessor({
    get: function get(value) {
      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement[property] : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) {
        return value;
      }

      this.dom.videoElement[property] = value;
      return value;
    }
  });
}

function accessorVideoAttribute(attribute) {
  var _ref = _isString(attribute) ? {
    get: attribute,
    isBoolean: false,
    set: attribute
  } : attribute,
      _set = _ref.set,
      _get = _ref.get,
      isBoolean = _ref.isBoolean;

  return toxicDecorators.accessor({
    get: function get(value) {
      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement[_get] : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) {
        return value;
      }

      var val = isBoolean ? value ? '' : undefined : value === null ? undefined : value;
      this.dom.setAttr('videoElement', _set, val);
      return value;
    }
  }, {
    preSet: false
  });
}

function accessorCustomAttribute(attribute, isBoolean) {
  return toxicDecorators.accessor({
    get: function get(value) {
      var attrValue = this.dom.getAttr('videoElement', attribute);
      return this.dispatcher.videoConfigReady && this.inited ? isBoolean ? !!attrValue : attrValue : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) {
        return value;
      }

      var val = isBoolean ? value || undefined : value === null ? undefined : value;
      this.dom.setAttr('videoElement', attribute, val);
      return value;
    }
  });
}

function accessorWidthAndHeight(property) {
  return toxicDecorators.accessor({
    get: function get(value) {
      if (!this.dispatcher.videoConfigReady || !this.inited) {
        return value;
      }

      var attr = this.dom.getAttr('videoElement', property);
      var prop = this.dom.videoElement[property];

      if (toxicPredicateFunctions.isNumeric(attr) && _isNumber(prop)) {
        return prop;
      }

      return attr || undefined;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) {
        return value;
      }

      var val;

      if (value === undefined || _isNumber(value)) {
        val = value;
      } else if (_isString(value) && !Number.isNaN(parseFloat(value))) {
        val = value;
      }

      this.dom.setAttr('videoElement', property, val);
      return val;
    }
  });
}

var accessorMap = {
  autoload: toxicDecorators.alwaysBoolean(),
  autoplay: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('autoplay')],
  controls: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('controls')],
  crossOrigin: [toxicDecorators.accessor({
    set: stringOrVoid
  }), accessorVideoAttribute({
    set: 'crossorigin',
    get: 'crossOrigin'
  })],
  defaultMuted: [toxicDecorators.alwaysBoolean(), accessorVideoAttribute({
    get: 'defaultMuted',
    set: 'muted',
    isBoolean: true
  })],
  defaultPlaybackRate: [accessorVideoProperty('defaultPlaybackRate'), toxicDecorators.alwaysNumber(1)],
  disableRemotePlayback: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('disableRemotePlayback')],
  height: [accessorWidthAndHeight('height')],
  loop: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('loop')],
  muted: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('muted')],
  playbackRate: [toxicDecorators.alwaysNumber(1), accessorVideoProperty('playbackRate')],
  playsInline: [toxicDecorators.accessor({
    get: function get(value) {
      var playsInline = this.dom.videoElement.playsInline;
      return this.dispatcher.videoConfigReady && this.inited ? playsInline === undefined ? value : playsInline : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) {
        return value;
      }

      this.dom.videoElement.playsInline = value;
      var val = value ? '' : undefined;
      this.dom.setAttr('videoElement', 'playsinline', val);
      this.dom.setAttr('videoElement', 'webkit-playsinline', val);
      this.dom.setAttr('videoElement', 'x5-playsinline', val);
      return value;
    }
  }), toxicDecorators.alwaysBoolean()],
  poster: [toxicDecorators.alwaysString(), toxicDecorators.accessor({
    get: function get(value) {
      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement.poster : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) {
        return value;
      }

      if (value.length) {
        this.dom.setAttr('videoElement', 'poster', value);
      }

      return value;
    }
  })],
  preload: [toxicDecorators.accessor({
    set: function set(value) {
      var options = ['none', 'auto', 'metadata', ''];
      return options.indexOf(value) > -1 ? value : 'none';
    }
  }, {
    preSet: true
  }), accessorVideoAttribute('preload')],
  src: [toxicDecorators.alwaysString(), toxicDecorators.accessor({
    set: function set(val) {
      if (this.dispatcher.readySync && this.autoload && val !== this.src) {
        this.needToLoadSrc = true;
      }

      return val;
    }
  }), toxicDecorators.accessor({
    set: function set(val) {
      if (this.needToLoadSrc) {
        this.needToLoadSrc = false;
        this.dispatcher.binder.emit({
          id: 'dispatcher',
          name: 'load',
          target: 'plugin'
        }, val);
      }

      return val;
    }
  }, {
    preSet: false
  })],
  volume: [toxicDecorators.alwaysNumber(1), accessorVideoProperty('volume')],
  width: [accessorWidthAndHeight('width')],
  x5VideoOrientation: [toxicDecorators.accessor({
    set: stringOrVoid
  }), accessorCustomAttribute('x5-video-orientation')],
  x5VideoPlayerFullscreen: [toxicDecorators.accessor({
    set: function set(value) {
      return !!value;
    },
    get: function get(value) {
      return !!value;
    }
  }), accessorCustomAttribute('x5-video-player-fullscreen', true)],
  x5VideoPlayerType: [toxicDecorators.accessor({
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) {
        return value;
      }

      var val = value === 'h5' ? 'h5' : undefined;
      this.dom.setAttr('videoElement', 'x5-video-player-type', val);
      return value;
    },
    get: function get(value) {
      return this.dispatcher.videoConfigReady && value || (this.dom.getAttr('videoElement', 'x5-video-player-type') ? 'h5' : undefined);
    }
  })],
  xWebkitAirplay: [toxicDecorators.accessor({
    set: function set(value) {
      return !!value;
    },
    get: function get(value) {
      return !!value;
    }
  }), accessorCustomAttribute('x-webkit-airplay', true)]
};

var VideoConfig =
/*#__PURE__*/
function () {
  function VideoConfig(dispatcher, config) {
    _classCallCheck(this, VideoConfig);

    this.autoload = true;
    this.autoplay = false;
    this.box = '';
    this.changeWatchable = true;
    this.controls = false;
    this.crossOrigin = undefined;
    this.defaultMuted = false;
    this.defaultPlaybackRate = 1;
    this.disableRemotePlayback = false;
    this.height = '100%';
    this.inited = false;
    this.isLive = false;
    this.loop = false;
    this.muted = false;
    this.needToLoadSrc = false;
    this.playbackRate = 1;
    this.playsInline = false;
    this.poster = undefined;
    this.preload = 'auto';
    this.preset = {};
    this.presetConfig = {};
    this.src = '';
    this.volume = 1;
    this.width = '100%';
    this.x5VideoOrientation = undefined;
    this.x5VideoPlayerFullscreen = false;
    this.x5VideoPlayerType = undefined;
    this.xWebkitAirplay = false;
    toxicDecorators.applyDecorators(this, accessorMap, {
      self: true
    });
    Object.defineProperty(this, 'dispatcher', {
      configurable: false,
      enumerable: false,
      value: dispatcher,
      writable: false
    });
    Object.defineProperty(this, 'dom', {
      configurable: false,
      enumerable: false,
      value: dispatcher.dom,
      writable: false
    });
    Object.assign(this, config);
  }

  _createClass(VideoConfig, [{
    key: "init",
    value: function init() {
      var _this = this;

      videoDomAttributes.forEach(function (key) {
        _this[key] = _this[key];
      });
      this.inited = true;
    }
  }]);

  return VideoConfig;
}();

__decorate$1([toxicDecorators.initString(function (str) {
  return str.toLocaleLowerCase();
})], VideoConfig.prototype, "box", void 0);

__decorate$1([nonenumerable$1], VideoConfig.prototype, "changeWatchable", void 0);

__decorate$1([nonenumerable$1], VideoConfig.prototype, "inited", void 0);

__decorate$1([nonenumerable$1], VideoConfig.prototype, "needToLoadSrc", void 0);

var domMethods = ['focus', 'fullscreen', 'requestFullscreen', 'exitFullscreen'];
function isDomMethod(x) {
  return domMethods.includes(x);
}
var kernelMethods = ['play', 'pause', 'seek', 'startLoad', 'stopLoad'];
function isKernelMethod(x) {
  return kernelMethods.includes(x);
}
var videoMethods = ['canPlayType', 'captureStream', 'setSinkId'];

var secondaryEventReg = /^(before|after|_)/;

function deletePropertyIfItIsEmpty(obj, key) {
  if (!obj) {
    return;
  }

  if (_isEmpty(obj[key])) {
    delete obj[key];
  }
}
function runRejectableQueue(queue) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    function step(index) {
      if (index >= queue.length) {
        resolve();
        return;
      }

      var result = _isFunction(queue[index]) ? queue[index].apply(queue, args) : queue[index];

      if (result === false) {
        reject('stop');
        return;
      }

      Promise.resolve(result).then(function () {
        return step(index + 1);
      }).catch(function (err) {
        return reject(err || 'stop');
      });
    }

    step(0);
  });
}
function runStoppableQueue(queue) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  function step(index) {
    if (index >= queue.length) {
      return true;
    }

    var result = _isFunction(queue[index]) ? queue[index].apply(queue, args) : queue[index];

    if (result === false) {
      return false;
    }

    return step(++index);
  }

  return step(0);
}
function transObjectAttrIntoArray(obj) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
    return +a - +b;
  };
  return Object.keys(obj).sort(fn).reduce(function (order, key) {
    return order.concat(obj[key]);
  }, []);
}
function isSupportedKernelType(type) {
  return type === 'flv' || type === 'hls' || type === 'mp4';
}

var __decorate$2 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function secondaryChecker(key) {
  if (key.match(secondaryEventReg)) {
    if (process.env.NODE_ENV !== 'production') {
      chimeeHelperLog.chimeeLog.warn('bus', "Secondary Event \"".concat(key, "\" could not be call straightly by API."));
    }

    return false;
  }

  return true;
}

function getKeyForOnceMap(eventName, stage, pluginId) {
  return "".concat(eventName, "-").concat(stage, "-").concat(pluginId);
}

var Bus =
/*#__PURE__*/
function () {
  function Bus(dispatcher, kind) {
    _classCallCheck(this, Bus);

    this.dispatcher = dispatcher;
    this.kind = kind;
    this.events = {};
    this.onceMap = {};
  }

  _createClass(Bus, [{
    key: "destroy",
    value: function destroy() {
      delete this.events;
      delete this.dispatcher;
    }
  }, {
    key: "emit",
    value: function emit(key) {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var event = this.events[key];

      if (_isEmpty(event)) {
        if (selfProcessorEvents.indexOf(key) > -1) {
          return Promise.resolve();
        }

        return this.eventProcessor.apply(this, [key, {
          sync: false
        }].concat(args));
      }

      var beforeQueue = this.getEventQueue(event.before);
      return runRejectableQueue.apply(void 0, [beforeQueue].concat(args)).then(function () {
        if (selfProcessorEvents.indexOf(key) > -1) {
          return;
        }

        return _this.eventProcessor.apply(_this, [key, {
          sync: false
        }].concat(args));
      }).catch(function (error) {
        if (_isError(error)) {
          _this.dispatcher.throwError(error);
        }

        return Promise.reject(error);
      });
    }
  }, {
    key: "emitSync",
    value: function emitSync(key) {
      var event = this.events[key];

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (_isEmpty(event)) {
        if (selfProcessorEvents.indexOf(key) > -1) {
          return true;
        }

        return this.eventProcessor.apply(this, [key, {
          sync: true
        }].concat(args));
      }

      var beforeQueue = this.getEventQueue(event.before);
      return runStoppableQueue.apply(void 0, [beforeQueue].concat(args)) && (selfProcessorEvents.indexOf(key) > -1 || this.eventProcessor.apply(this, [key, {
        sync: true
      }].concat(args)));
    }
  }, {
    key: "hasEvents",
    value: function hasEvents() {
      return !_isEmpty(this.events);
    }
  }, {
    key: "off",
    value: function off(pluginId, eventName, fn, stage) {
      var deleted = this.removeEvent({
        eventName: eventName,
        fn: fn,
        pluginId: pluginId,
        stage: stage
      });

      if (deleted) {
        return;
      }

      var handler = this.getFirstHandlerFromOnceMap({
        eventName: eventName,
        fn: fn,
        pluginId: pluginId,
        stage: stage
      });

      if (_isFunction(handler)) {
        var _deleted = this.removeEvent({
          eventName: eventName,
          fn: handler,
          pluginId: pluginId,
          stage: stage
        });

        if (_deleted) {
          this.removeFromOnceMap({
            eventName: eventName,
            fn: fn,
            handler: handler,
            pluginId: pluginId,
            stage: stage
          });
        }
      }
    }
  }, {
    key: "on",
    value: function on(pluginId, eventName, fn, stage) {
      this.addEvent({
        eventName: eventName,
        stage: stage,
        pluginId: pluginId,
        fn: fn
      });
    }
  }, {
    key: "once",
    value: function once(pluginId, eventName, fn, stage) {
      var bus = this;

      var handler = function handler() {
        _bind(fn, this).apply(void 0, arguments);

        bus.removeEvent({
          eventName: eventName,
          fn: handler,
          pluginId: pluginId,
          stage: stage
        });
        bus.removeFromOnceMap({
          eventName: eventName,
          fn: fn,
          handler: handler,
          pluginId: pluginId,
          stage: stage
        });
      };

      this.addEvent({
        eventName: eventName,
        fn: handler,
        pluginId: pluginId,
        stage: stage
      });
      this.addToOnceMap({
        eventName: eventName,
        fn: fn,
        handler: handler,
        pluginId: pluginId,
        stage: stage
      });
    }
  }, {
    key: "trigger",
    value: function trigger(key) {
      var _this2 = this;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var event = this.events[key];

      if (_isEmpty(event)) {
        return Promise.resolve(true);
      }

      var mainQueue = this.getEventQueue(event.main);
      return runRejectableQueue.apply(void 0, [mainQueue].concat(args)).then(function () {
        var afterQueue = _this2.getEventQueue(event.after);

        return runRejectableQueue.apply(void 0, [afterQueue].concat(args));
      }).then(function () {
        return _this2.runSideEffectEvent.apply(_this2, [key].concat(args));
      }).catch(function (error) {
        if (_isError(error)) {
          _this2.dispatcher.throwError(error);
        }

        return _this2.runSideEffectEvent.apply(_this2, [key].concat(args));
      });
    }
  }, {
    key: "triggerSync",
    value: function triggerSync(key) {
      var event = this.events[key];

      if (_isEmpty(event)) {
        return true;
      }

      var mainQueue = this.getEventQueue(event.main);
      var afterQueue = this.getEventQueue(event.after);

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      var result = runStoppableQueue.apply(void 0, [mainQueue].concat(args)) && runStoppableQueue.apply(void 0, [afterQueue].concat(args));
      this.runSideEffectEvent.apply(this, [key].concat(args));
      return result;
    }
  }, {
    key: "addEvent",
    value: function addEvent(_ref) {
      var eventName = _ref.eventName,
          stage = _ref.stage,
          pluginId = _ref.pluginId,
          fn = _ref.fn;
      this.events[eventName] = this.events[eventName] || {};
      this.events[eventName][stage] = this.events[eventName][stage] || {};
      this.events[eventName][stage][pluginId] = this.events[eventName][stage][pluginId] || [];
      this.events[eventName][stage][pluginId].push(fn);
    }
  }, {
    key: "addToOnceMap",
    value: function addToOnceMap(_ref2) {
      var eventName = _ref2.eventName,
          stage = _ref2.stage,
          pluginId = _ref2.pluginId,
          fn = _ref2.fn,
          handler = _ref2.handler;
      var key = getKeyForOnceMap(eventName, stage, pluginId);
      var map = this.onceMap[key] = this.onceMap[key] || new Map();

      if (!map.has(fn)) {
        map.set(fn, []);
      }

      var handlers = map.get(fn);
      handlers.push(handler);
    }
  }, {
    key: "eventProcessor",
    value: function eventProcessor(key, _ref3) {
      var sync = _ref3.sync;

      for (var _len5 = arguments.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        args[_key5 - 2] = arguments[_key5];
      }

      if (isDispatcherEventMethod(key)) {
        var _this$dispatcher;

        var methodName = dispatcherEventMethodMap[key];

        (_this$dispatcher = this.dispatcher)[methodName].apply(_this$dispatcher, args);
      } else if (isKernelMethod(key)) {
        var _this$dispatcher$kern;

        (_this$dispatcher$kern = this.dispatcher.kernel)[key].apply(_this$dispatcher$kern, args);
      } else if (isDomMethod(key)) {
        var _this$dispatcher$dom;

        (_this$dispatcher$dom = this.dispatcher.dom)[key].apply(_this$dispatcher$dom, args);
      }

      if (isVideoEvent(key) || isDomEvent(key)) {
        return true;
      }

      return this[sync ? 'triggerSync' : 'trigger'].apply(this, [key].concat(args));
    }
  }, {
    key: "getEventQueue",
    value: function getEventQueue(handlerSet) {
      var _this3 = this;

      var customOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.dispatcher.destroyed) {
        return [];
      }

      var order = (customOrder || this.dispatcher.order).concat(['_vm']);
      return _isEmpty(handlerSet) ? [] : order.reduce(function (queue, id) {
        if (_isEmpty(handlerSet[id]) || !_isArray(handlerSet[id]) || !_this3.dispatcher.plugins[id] && id !== '_vm') {
          return queue;
        }

        return queue.concat(handlerSet[id].map(function (fn) {
          return _bind(fn, _this3.dispatcher.plugins[id] || _this3.dispatcher.vm);
        }));
      }, []);
    }
  }, {
    key: "getFirstHandlerFromOnceMap",
    value: function getFirstHandlerFromOnceMap(_ref4) {
      var eventName = _ref4.eventName,
          stage = _ref4.stage,
          pluginId = _ref4.pluginId,
          fn = _ref4.fn;
      var key = getKeyForOnceMap(eventName, stage, pluginId);
      var map = this.onceMap[key];

      if (_isNil(map) || !map.has(fn)) {
        return;
      }

      var handlers = map.get(fn);
      return handlers[0];
    }
  }, {
    key: "removeEvent",
    value: function removeEvent(_ref5) {
      var eventName = _ref5.eventName,
          stage = _ref5.stage,
          pluginId = _ref5.pluginId,
          fn = _ref5.fn;
      var eventsForEventName = this.events[eventName];

      if (!eventsForEventName) {
        return;
      }

      var eventsForStage = eventsForEventName[stage];

      if (!eventsForStage) {
        return;
      }

      var eventsForPlugin = eventsForStage[pluginId];

      if (!eventsForPlugin) {
        return;
      }

      var index = eventsForPlugin.indexOf(fn);
      var hasFn = index > -1;

      if (hasFn) {
        eventsForPlugin.splice(index, 1);
      }

      deletePropertyIfItIsEmpty(eventsForStage, pluginId);
      deletePropertyIfItIsEmpty(eventsForEventName, stage);
      deletePropertyIfItIsEmpty(this.events, eventName);
      return hasFn;
    }
  }, {
    key: "removeFromOnceMap",
    value: function removeFromOnceMap(_ref6) {
      var eventName = _ref6.eventName,
          stage = _ref6.stage,
          pluginId = _ref6.pluginId,
          fn = _ref6.fn,
          handler = _ref6.handler;
      var key = getKeyForOnceMap(eventName, stage, pluginId);
      var map = this.onceMap[key];

      if (_isNil(map) || !map.has(fn)) {
        return;
      }

      var handlers = map.get(fn);
      var index = handlers.indexOf(handler);
      handlers.splice(index, 1);

      if (_isEmpty(handlers)) {
        map.delete(fn);
      }
    }
  }, {
    key: "runSideEffectEvent",
    value: function runSideEffectEvent(key) {
      for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      var event = this.events[key];

      if (_isEmpty(event)) {
        return false;
      }

      var queue = this.getEventQueue(event._);
      queue.forEach(function (run) {
        return run.apply(void 0, args);
      });
      return true;
    }
  }]);

  return Bus;
}();

__decorate$2([toxicDecorators.runnable(secondaryChecker)], Bus.prototype, "emit", null);

__decorate$2([toxicDecorators.runnable(secondaryChecker, {
  backup: function backup() {
    return false;
  }
})], Bus.prototype, "emitSync", null);

__decorate$2([toxicDecorators.runnable(secondaryChecker)], Bus.prototype, "trigger", null);

__decorate$2([toxicDecorators.runnable(secondaryChecker, {
  backup: function backup() {
    return false;
  }
})], Bus.prototype, "triggerSync", null);

function getEventTargetByOldLogic(oldName) {
  var targetKeyReg = new RegExp('^(c|w)_');
  var matches = oldName.match(targetKeyReg);

  if (matches) {
    var name = oldName.replace(targetKeyReg, '');
    var target = oldName.indexOf('c') === 0 ? 'container' : 'wrapper';

    if (process.env.NODE_ENV !== 'production') {
      chimeeHelperLog.chimeeLog.warn("We no longer support event names like ".concat(oldName, ". Please use ").concat(name, " and options like { target: '").concat(target, "' } instead"));
    }

    return {
      name: name,
      target: target
    };
  } else if (oldName === 'error') {
    return {
      name: 'error',
      target: 'kernel'
    };
  }

  return false;
}
function getEventStage(name) {
  var matches = name.match(secondaryEventReg);
  var stage = matches && matches[0] || 'main';

  if (matches) {
    name = _camelCase(name.replace(secondaryEventReg, ''));
  }

  return {
    name: name,
    stage: stage
  };
}
function getEventTargetByEventName(name) {
  if (videoEvents.indexOf(name) > -1) {
    return 'video';
  }

  if (kernelEvents.indexOf(name) > -1) {
    return 'kernel';
  }

  if (domEvents.indexOf(name) > -1) {
    return 'video-dom';
  }

  if (esFullscreenEvents.indexOf(name) > -1) {
    return 'esFullscreen';
  }

  return 'plugin';
}
function getEventInfo(_ref) {
  var name = _ref.name,
      target = _ref.target,
      stage = _ref.stage;
  var oldInfo = getEventTargetByOldLogic(name);

  if (oldInfo) {
    name = oldInfo.name;
    target = oldInfo.target;
  }

  var _getEventStage = getEventStage(name),
      newStage = _getEventStage.stage,
      newName = _getEventStage.name;

  name = newName;

  if (!target) {
    target = getEventTargetByEventName(name);
  }

  return {
    name: name,
    stage: stage || newStage,
    target: target
  };
}
function prettifyEventParameter(info) {
  var id = info.id,
      fn = info.fn;

  var _getEventInfo = getEventInfo(info),
      name = _getEventInfo.name,
      target = _getEventInfo.target,
      stage = _getEventInfo.stage;

  if (!_isFunction(fn)) {
    throw new Error("You must provide a function to handle with event ".concat(name, ", but not ").concat(_typeof(fn)));
  }

  return {
    fn: fn,
    id: id,
    name: name,
    stage: stage,
    target: target
  };
}
function isEventEmitalbe(_ref2) {
  var id = _ref2.id,
      name = _ref2.name;

  if (!name || !_isString(name) || secondaryEventReg.test(name)) {
    chimeeHelperLog.chimeeLog.error('You must provide a legal event name, which is string and could not started with before/after/_');
    return false;
  }

  if (!id || !_isString(id)) {
    chimeeHelperLog.chimeeLog.error('You must provide the id of emitter');
    return false;
  }

  return true;
}

var __decorate$3 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Binder =
/*#__PURE__*/
function () {
  function Binder(dispatcher) {
    _classCallCheck(this, Binder);

    this.dispatcher = dispatcher;
    this.kinds = ['kernel', 'container', 'wrapper', 'video', 'video-dom', 'plugin', 'esFullscreen'];
    this.buses = {};
    this.bindedEventNames = {};
    this.bindedEventInfo = {};
    this.pendingEventsInfo = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.kinds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var kind = _step.value;
        this.bindedEventNames[kind] = [];
        this.bindedEventInfo[kind] = [];
        this.pendingEventsInfo[kind] = [];
        this.buses[kind] = new Bus(dispatcher, kind);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  _createClass(Binder, [{
    key: "addPendingEvent",
    value: function addPendingEvent(target, name, id) {
      this.pendingEventsInfo[target].push([name, id]);
    }
  }, {
    key: "applyPendingEvents",
    value: function applyPendingEvents(target) {
      var pendingEvents = this.pendingEventsInfo[target];
      var pendingEventsCopy = pendingEvents.splice(0, pendingEvents.length);

      while (pendingEventsCopy.length) {
        var _pendingEventsCopy$po = pendingEventsCopy.pop(),
            _pendingEventsCopy$po2 = _slicedToArray(_pendingEventsCopy$po, 2),
            name = _pendingEventsCopy$po2[0],
            id = _pendingEventsCopy$po2[1];

        this.addEventListenerOnTarget({
          name: name,
          target: target,
          id: id
        });
      }
    }
  }, {
    key: "bindEventOnPenetrateNode",
    value: function bindEventOnPenetrateNode(node) {
      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.bindedEventInfo['video-dom'].forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            fn = _ref2[1];

        remove ? events.off(node, name, fn) : events.on(node, name, fn);
      });
    }
  }, {
    key: "bindEventOnVideo",
    value: function bindEventOnVideo(node) {
      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.bindedEventInfo['video-dom'].concat(this.bindedEventInfo.video).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            name = _ref4[0],
            fn = _ref4[1];

        remove ? events.off(node, name, fn) : events.on(node, name, fn);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this = this;

      this.kinds.forEach(function (target) {
        if (target === 'kernel') {
          _this.bindedEventInfo.kernel.forEach(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                name = _ref6[0],
                fn = _ref6[1];

            _this.dispatcher.kernel.off(name, fn);
          });
        } else {
          var targetDom = _this.getTargetDom(target);

          _this.bindedEventInfo[target].forEach(function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
                name = _ref8[0],
                fn = _ref8[1];

            events.off(targetDom, name, fn);

            if (target === 'video-dom') {
              _this.dispatcher.dom.videoExtendedNodes.forEach(function (node) {
                return events.off(node, name, fn);
              });
            }
          });
        }

        _this.bindedEventInfo.kernel = [];
        _this.bindedEventNames.kernel = [];
      });
    }
  }, {
    key: "emit",
    value: function emit(_ref9) {
      var _this$buses$target;

      var name = _ref9.name,
          stage = _ref9.stage,
          rawTarget = _ref9.target;

      var _getEventInfo = getEventInfo({
        name: name,
        target: rawTarget,
        stage: stage
      }),
          target = _getEventInfo.target;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_this$buses$target = this.buses[target]).emit.apply(_this$buses$target, [name].concat(args));
    }
  }, {
    key: "emitSync",
    value: function emitSync(_ref10) {
      var _this$buses$target2;

      var name = _ref10.name,
          stage = _ref10.stage,
          rawTarget = _ref10.target;

      var _getEventInfo2 = getEventInfo({
        name: name,
        target: rawTarget,
        stage: stage
      }),
          target = _getEventInfo2.target;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return (_this$buses$target2 = this.buses[target]).emitSync.apply(_this$buses$target2, [name].concat(args));
    }
  }, {
    key: "listenOnMouseMoveEvent",
    value: function listenOnMouseMoveEvent(node) {
      var _this2 = this;

      var dom = this.dispatcher.dom;
      var target = 'video-dom';
      var id = '_vm';
      mustListenVideoDomEvents.forEach(function (name) {
        var fn = function fn() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          var _args$ = args[0],
              toElement = _args$.toElement,
              currentTarget = _args$.currentTarget,
              relatedTarget = _args$.relatedTarget,
              type = _args$.type;
          var to = toElement || relatedTarget;

          if (dom.mouseInVideo && type === 'mouseleave' && !dom.isNodeInsideVideo(to)) {
            dom.mouseInVideo = false;
            return _this2.triggerSync.apply(_this2, [{
              id: id,
              name: name,
              target: target
            }].concat(args));
          }

          if (!dom.mouseInVideo && type === 'mouseenter' && dom.isNodeInsideVideo(currentTarget)) {
            dom.mouseInVideo = true;
            return _this2.triggerSync.apply(_this2, [{
              id: id,
              name: name,
              target: target
            }].concat(args));
          }
        };

        events.on(node, name, fn);

        if (_this2.bindedEventNames[target].indexOf(name) < 0) {
          _this2.bindedEventNames[target].push(name);

          _this2.bindedEventInfo[target].push([name, fn]);
        }
      });
    }
  }, {
    key: "migrateKernelEvent",
    value: function migrateKernelEvent(oldKernel, newKernel) {
      var bindedEventInfoList = this.bindedEventInfo.kernel;
      bindedEventInfoList.forEach(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            name = _ref12[0],
            fn = _ref12[1];

        oldKernel.off(name, fn);
        newKernel.on(name, fn);
      });
    }
  }, {
    key: "off",
    value: function off(info) {
      var _prettifyEventParamet = prettifyEventParameter(info),
          id = _prettifyEventParamet.id,
          name = _prettifyEventParamet.name,
          fn = _prettifyEventParamet.fn,
          stage = _prettifyEventParamet.stage,
          target = _prettifyEventParamet.target;

      var ret = this.buses[target].off(id, name, fn, stage);
      this.removeEventListenerOnTargetWhenIsUseless({
        name: name,
        target: target
      });
      return ret;
    }
  }, {
    key: "on",
    value: function on(info) {
      var _prettifyEventParamet2 = prettifyEventParameter(info),
          id = _prettifyEventParamet2.id,
          name = _prettifyEventParamet2.name,
          fn = _prettifyEventParamet2.fn,
          stage = _prettifyEventParamet2.stage,
          target = _prettifyEventParamet2.target;

      this.addEventListenerOnTarget({
        id: id,
        name: name,
        target: target
      });
      return this.buses[target].on(id, name, fn, stage);
    }
  }, {
    key: "once",
    value: function once(info) {
      var _prettifyEventParamet3 = prettifyEventParameter(info),
          id = _prettifyEventParamet3.id,
          name = _prettifyEventParamet3.name,
          fn = _prettifyEventParamet3.fn,
          stage = _prettifyEventParamet3.stage,
          target = _prettifyEventParamet3.target;

      return this.buses[target].once(id, name, fn, stage);
    }
  }, {
    key: "trigger",
    value: function trigger(_ref13) {
      var _this$buses$target3;

      var name = _ref13.name,
          stage = _ref13.stage,
          rawTarget = _ref13.target;

      var _getEventInfo3 = getEventInfo({
        name: name,
        target: rawTarget,
        stage: stage
      }),
          target = _getEventInfo3.target;

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      return (_this$buses$target3 = this.buses[target]).trigger.apply(_this$buses$target3, [name].concat(args));
    }
  }, {
    key: "triggerSync",
    value: function triggerSync(_ref14) {
      var _this$buses$target4;

      var name = _ref14.name,
          stage = _ref14.stage,
          rawTarget = _ref14.target;

      var _getEventInfo4 = getEventInfo({
        name: name,
        target: rawTarget,
        stage: stage
      }),
          target = _getEventInfo4.target;

      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return (_this$buses$target4 = this.buses[target]).triggerSync.apply(_this$buses$target4, [name].concat(args));
    }
  }, {
    key: "addEventListenerOnTarget",
    value: function addEventListenerOnTarget(_ref15) {
      var _this3 = this;

      var name = _ref15.name,
          target = _ref15.target,
          id = _ref15.id;

      if (!this.isEventNeedToBeHandled(target, name)) {
        return;
      }

      var fn;

      if (this.bindedEventNames[target].indexOf(name) > -1) {
        return;
      }

      var targetDom = this.getTargetDom(target);

      if (target === 'kernel') {
        if (!this.dispatcher.kernel) {
          this.addPendingEvent(target, name, id);
          return;
        }

        fn = function fn() {
          for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          return _this3.triggerSync.apply(_this3, [{
            target: target,
            name: name,
            id: 'kernel'
          }].concat(args));
        };

        this.dispatcher.kernel.on(name, fn);
      } else if (target === 'container' || target === 'wrapper') {
        fn = function fn() {
          for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }

          return _this3.triggerSync.apply(_this3, [{
            target: target,
            name: name,
            id: target
          }].concat(args));
        };

        events.on(targetDom, name, fn);
      } else if (target === 'video') {
        fn = function fn() {
          for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
          }

          return _this3.trigger.apply(_this3, [{
            target: target,
            name: name,
            id: target
          }].concat(args));
        };

        events.on(targetDom, name, fn);
      } else if (target === 'video-dom') {
        fn = function fn() {
          for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
          }

          return _this3.triggerSync.apply(_this3, [{
            target: target,
            name: name,
            id: target
          }].concat(args));
        };

        this.dispatcher.dom.videoExtendedNodes.forEach(function (node) {
          return events.on(node, name, fn);
        });
        events.on(targetDom, name, fn);
      }

      this.bindedEventNames[target].push(name);
      this.bindedEventInfo[target].push([name, fn]);
    }
  }, {
    key: "getTargetDom",
    value: function getTargetDom(target) {
      var targetDom;

      switch (target) {
        case 'container':
        case 'wrapper':
          targetDom = this.dispatcher.dom[target];
          break;

        default:
          targetDom = this.dispatcher.dom.videoElement;
          break;
      }

      return targetDom;
    }
  }, {
    key: "isEventNeedToBeHandled",
    value: function isEventNeedToBeHandled(target, name) {
      return target !== 'plugin' && target !== 'esFullscreen' && (!isMustListenVideoDomEvent(name) || target !== 'video');
    }
  }, {
    key: "removeEventListenerOnTargetWhenIsUseless",
    value: function removeEventListenerOnTargetWhenIsUseless(_ref16) {
      var name = _ref16.name,
          target = _ref16.target;

      if (!this.isEventNeedToBeHandled(target, name)) {
        return;
      }

      var eventNamesList = this.bindedEventNames[target];
      var nameIndex = eventNamesList.indexOf(name);

      if (nameIndex < 0) {
        return;
      }

      if (this.buses[target].hasEvents()) {
        return;
      }

      var bindedEventInfoList = this.bindedEventInfo[target];
      var fn;
      var index;

      for (index = 0; index < bindedEventInfoList.length; index++) {
        if (bindedEventInfoList[index][0] === name) {
          fn = bindedEventInfoList[index][1];
          break;
        }
      }

      if (!_isFunction(fn)) {
        return;
      }

      if (target === 'kernel') {
        this.dispatcher.kernel.off(name, fn);
      } else {
        var targetDom = this.getTargetDom(target);
        events.off(targetDom, name, fn);

        if (target === 'video-dom') {
          this.dispatcher.dom.videoExtendedNodes.forEach(function (node) {
            events.off(node, name, fn);
          });
        }
      }

      bindedEventInfoList.splice(index, 1);
      eventNamesList.splice(nameIndex, 1);
    }
  }]);

  return Binder;
}();

__decorate$3([toxicDecorators.runnable(isEventEmitalbe)], Binder.prototype, "emit", null);

__decorate$3([toxicDecorators.runnable(isEventEmitalbe, {
  backup: function backup() {
    return false;
  }
})], Binder.prototype, "emitSync", null);

__decorate$3([toxicDecorators.runnable(isEventEmitalbe)], Binder.prototype, "trigger", null);

__decorate$3([toxicDecorators.runnable(isEventEmitalbe, {
  backup: function backup() {
    return false;
  }
})], Binder.prototype, "triggerSync", null);

var __decorate$4 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Dom =
/*#__PURE__*/
function () {
  function Dom(config, dispatcher) {
    _classCallCheck(this, Dom);

    var wrapper = config.wrapper;
    this.dispatcher = dispatcher;
    this.mouseInVideoValue = false;
    this.destroyed = false;
    this.isFullscreen = false;
    this.originHTML = '';
    this.plugins = {};
    this.videoExtendedNodesArray = [];

    if (_isString(wrapper)) {
      var $wrapper = query.querySelectorAll(document.body, wrapper);

      if ($wrapper.length === 0) {
        throw new TypeError('Can not get dom node accroding wrapper. Please check your wrapper');
      }

      this.wrapper = $wrapper[0];
    } else if (toxicPredicateFunctions.isElement(wrapper)) {
      this.wrapper = wrapper;
    } else {
      throw new TypeError("Wrapper can only be string or HTMLElement, but not ".concat(_typeof(wrapper)));
    }

    this.originHTML = this.wrapper.innerHTML;
    var videoElement = query.querySelectorAll(this.wrapper, 'video')[0];

    if (!videoElement) {
      videoElement = document.createElement('video');
    }

    this.installVideo(videoElement);
    this.fullscreenMonitor();
    esFullscreen.esFullscreen.on('fullscreenchange', this.fullscreenMonitor);
    var videoRequiredGuardedAttributes = _isArray(config.videoRequiredGuardedAttributes) ? config.videoRequiredGuardedAttributes : [];

    if (videoRequiredGuardedAttributes.indexOf('style') < 0) {
      videoRequiredGuardedAttributes.unshift('style');
    }

    this.videoRequireGuardedAttributes = videoRequiredGuardedAttributes;
  }

  _createClass(Dom, [{
    key: "destroy",
    value: function destroy() {
      this.removeVideo();
      esFullscreen.esFullscreen.off('fullscreenchange', this.fullscreenMonitor);
      this.wrapper.innerHTML = this.originHTML;
      delete this.wrapper;
      delete this.plugins;
      this.destroyed = true;
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      return esFullscreen.esFullscreen.exit();
    }
  }, {
    key: "focus",
    value: function focus() {
      this.videoElement.focus();
    }
  }, {
    key: "fullscreen",
    value: function fullscreen() {
      var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';
      return request ? this.requestFullscreen(target) : this.exitFullscreen();
    }
  }, {
    key: "getAttr",
    value: function getAttr(target, attr) {
      return this[target].getAttribute(attr);
    }
  }, {
    key: "getStyle",
    value: function getStyle(target, attr) {
      if (!_isString(attr)) {
        throw new TypeError("to handle dom's attribute or style, your attr parameter must be string, but not ".concat(attr, " in ").concat(_typeof(attr)));
      }

      if (!_isString(target)) {
        throw new TypeError("to handle dom's attribute or style, your target parameter must be string, , but not ".concat(target, " in ").concat(_typeof(target)));
      }

      if (!toxicPredicateFunctions.isElement(this[target])) {
        throw new TypeError("Your target \"".concat(target, "\" is not a legal HTMLElement"));
      }

      return domHelpers.style(this[target], attr);
    }
  }, {
    key: "insertPlugin",
    value: function insertPlugin(id, el) {
      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!_isString(id)) {
        throw new TypeError('insertPlugin id parameter must be string');
      }

      if (toxicPredicateFunctions.isElement(this.plugins[id])) {
        if (process.env.NODE_ENV !== 'production') {
          chimeeHelperLog.chimeeLog.warn('Dispatcher.dom', "Plugin ".concat(id, " have already had a dom node. Now it will be replaced"));
        }

        this.removePlugin(id);
      }

      if (_isString(el)) {
        if (toxicPredicateFunctions.isHTMLString(el)) {
          var outer = document.createElement('div');
          outer.innerHTML = el;
          el = outer.children[0];
        } else {
          el = document.createElement(toxicUtils.hypenate(el));
        }
      } else if (el && _isPlainObject(el)) {
        option = el;
      }

      var _option = option,
          inner = _option.inner,
          penetrate = _option.penetrate,
          className = _option.className;
      var node = el && toxicPredicateFunctions.isElement(el) ? el : document.createElement('div');
      var classNames = _isString(className) ? className.split(/\s+/) : _isArray(className) ? className : [];
      classNames.forEach(function (name) {
        _class.addClass(node, name);
      });
      this.plugins[id] = node;
      var outerElement = inner ? this.container : this.wrapper;
      var originElement = inner ? this.videoElement : this.container;

      if (penetrate) {
        this.dispatcher.binder.bindEventOnPenetrateNode(node);
        this.videoExtendedNodesArray.push(node);
      }

      if (outerElement.lastChild === originElement) {
        outerElement.appendChild(node);
        return node;
      }

      outerElement.insertBefore(node, originElement.nextSibling);
      return node;
    }
  }, {
    key: "installVideo",
    value: function installVideo(videoElement) {
      this.videoExtendedNodesArray.push(videoElement);
      videoElement.setAttribute('tabindex', '-1');
      this.autoFocusToVideo(videoElement);

      if (!toxicPredicateFunctions.isElement(this.container)) {
        if (videoElement.parentElement && toxicPredicateFunctions.isElement(videoElement.parentElement) && videoElement.parentElement !== this.wrapper) {
          this.container = videoElement.parentElement;
        } else {
          this.container = document.createElement('container');
          this.container.appendChild(videoElement);
        }
      } else {
        var container = this.container;

        if (container.childNodes.length === 0) {
          container.appendChild(videoElement);
        } else {
          container.insertBefore(videoElement, container.childNodes[0]);
        }
      }

      if (this.container.parentElement !== this.wrapper) {
        this.wrapper.appendChild(this.container);
      }

      this.videoElement = videoElement;
      return videoElement;
    }
  }, {
    key: "isNodeInsideVideo",
    value: function isNodeInsideVideo(node) {
      return this.videoExtendedNodesArray.indexOf(node) > -1 || this.videoExtendedNodesArray.reduce(function (flag, video) {
        if (flag) {
          return flag;
        }

        return toxicPredicateFunctions.isPosterityNode(video, node);
      }, false);
    }
  }, {
    key: "migrateVideoRequiredGuardedAttributes",
    value: function migrateVideoRequiredGuardedAttributes(video) {
      var _this = this;

      var guardedAttributesAndValue = this.videoRequireGuardedAttributes.map(function (attr) {
        return [attr, _this.videoElement.getAttribute(attr)];
      });
      guardedAttributesAndValue.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            attr = _ref2[0],
            value = _ref2[1];

        video.setAttribute(attr, value);
      });
    }
  }, {
    key: "removePlugin",
    value: function removePlugin(id) {
      if (!_isString(id)) {
        return;
      }

      var dom = this.plugins[id];

      if (toxicPredicateFunctions.isElement(dom)) {
        if (dom.parentNode) {
          dom.parentNode.removeChild(dom);
        }

        this.autoFocusToVideo(dom, true);
      }

      var _ref3 = this.dispatcher.getPluginConfig(id) || {},
          _ref3$penetrate = _ref3.penetrate,
          penetrate = _ref3$penetrate === void 0 ? false : _ref3$penetrate;

      if (penetrate) {
        this.dispatcher.binder.bindEventOnPenetrateNode(dom, true);
      }

      delete this.plugins[id];
    }
  }, {
    key: "removeVideo",
    value: function removeVideo() {
      var videoElement = this.videoElement;
      this.autoFocusToVideo(this.videoElement, false);

      if (this.dispatcher.binder) {
        this.dispatcher.binder.bindEventOnVideo(videoElement, true);
      }

      if (this.videoElement.parentNode) {
        this.videoElement.parentNode.removeChild(this.videoElement);
      }

      delete this.videoElement;
      return videoElement;
    }
  }, {
    key: "requestFullscreen",
    value: function requestFullscreen(target) {
      if (target === 'video') {
        target = 'videoElement';
      }

      return esFullscreen.esFullscreen.open(this[target]);
    }
  }, {
    key: "setAttr",
    value: function setAttr(target, attr, val) {
      if (typeof val === 'undefined') {
        this[target].removeAttribute(attr);
        return;
      }

      this[target].setAttribute(attr, val);
    }
  }, {
    key: "setPluginsZIndex",
    value: function setPluginsZIndex(plugins) {
      var _this2 = this;

      plugins.forEach(function (key, index) {
        return domHelpers.style(key.match(/^(videoElement|container)$/) ? _this2[key] : _this2.plugins[key], 'z-index', ++index);
      });
    }
  }, {
    key: "setStyle",
    value: function setStyle(target, attr, val) {
      if (!_isString(attr)) {
        throw new TypeError("to handle dom's attribute or style, your attr parameter must be string, but not ".concat(attr, " in ").concat(_typeof(attr)));
      }

      if (!_isString(target)) {
        throw new TypeError("to handle dom's attribute or style, your target parameter must be string, , but not ".concat(target, " in ").concat(_typeof(target)));
      }

      if (!toxicPredicateFunctions.isElement(this[target])) {
        throw new TypeError("Your target \"".concat(target, "\" is not a legal HTMLElement"));
      }

      domHelpers.style(this[target], attr, val);
    }
  }, {
    key: "autoFocusToVideo",
    value: function autoFocusToVideo(element) {
      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!toxicPredicateFunctions.isElement(element)) {
        return;
      }

      (remove ? events.off : events.on)(element, 'mouseup', this.focusToVideo);
      (remove ? events.off : events.on)(element, 'touchend', this.focusToVideo);
    }
  }, {
    key: "focusToVideo",
    value: function focusToVideo() {
      var x = window.scrollX;
      var y = window.scrollY;

      if (_isFunction(this.videoElement.focus)) {
        this.videoElement.focus();
      }

      window.scrollTo(x, y);
    }
  }, {
    key: "fullscreenMonitor",
    value: function fullscreenMonitor(evt) {
      var element = esFullscreen.esFullscreen.fullscreenElement;
      var original = this.isFullscreen;

      if (!element || !toxicPredicateFunctions.isPosterityNode(this.wrapper, element) && element !== this.wrapper) {
        this.isFullscreen = false;
        this.fullscreenElement = undefined;
      } else {
        this.isFullscreen = true;
        this.fullscreenElement = this.wrapper === element ? 'wrapper' : this.container === element ? 'container' : this.videoElement === element ? 'video' : element;
      }

      if (toxicPredicateFunctions.isEvent(evt) && original !== this.isFullscreen) {
        this.dispatcher.binder.triggerSync({
          id: 'dispatcher',
          name: 'fullscreenchange',
          target: 'esFullscreen'
        }, evt);
      }
    }
  }, {
    key: "mouseInVideo",
    get: function get() {
      return this.mouseInVideoValue;
    },
    set: function set(val) {
      this.mouseInVideoValue = !!val;
    }
  }, {
    key: "videoExtendedNodes",
    get: function get() {
      return this.videoExtendedNodesArray;
    }
  }]);

  return Dom;
}();

__decorate$4([toxicDecorators.waituntil('dispatcher.videoConfigReady')], Dom.prototype, "setAttr", null);

__decorate$4([toxicDecorators.autobind], Dom.prototype, "focusToVideo", null);

__decorate$4([toxicDecorators.autobind], Dom.prototype, "fullscreenMonitor", null);

var tempCurrentTime = 0;

var NativeVideoKernel =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(NativeVideoKernel, _EventEmitter);

  _createClass(NativeVideoKernel, null, [{
    key: "isSupport",
    value: function isSupport() {
      return true;
    }
  }]);

  function NativeVideoKernel(videoElement) {
    var _this;

    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      src: ''
    };

    _classCallCheck(this, NativeVideoKernel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NativeVideoKernel).call(this));

    if (!toxicPredicateFunctions.isElement(videoElement)) {
      throw new Error("You must pass in an legal video element but not ".concat(_typeof(videoElement)));
    }

    _this.video = videoElement;
    _this.config = config;
    return _this;
  }

  _createClass(NativeVideoKernel, [{
    key: "attachMedia",
    value: function attachMedia() {}
  }, {
    key: "destroy",
    value: function destroy() {
      if (toxicPredicateFunctions.isElement(this.video)) {
        this.stopLoad();
      }
    }
  }, {
    key: "load",
    value: function load(src) {
      this.video.setAttribute('src', src);
      this.video.src = src;
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
      this.video.src = this.config.src;
    }
  }, {
    key: "seek",
    value: function seek(seconds) {
      this.video.currentTime = seconds;
    }
  }, {
    key: "startLoad",
    value: function startLoad(src) {
      var currentTime = typeof this.video.currentTime === 'number' ? this.video.currentTime : tempCurrentTime;
      this.load(src);
      this.seek(currentTime);
    }
  }, {
    key: "stopLoad",
    value: function stopLoad() {
      tempCurrentTime = this.video.currentTime;
      this.video.src = '';
      this.video.removeAttribute('src');
    }
  }, {
    key: "unload",
    value: function unload() {}
  }]);

  return NativeVideoKernel;
}(events$1.EventEmitter);

var LOG_TAG = 'chimee';
var boxSuffixMap = {
  flv: '.flv',
  hls: '.m3u8',
  native: '.mp4'
};
function getLegalBox(_ref) {
  var src = _ref.src,
      box = _ref.box;

  if (_isString(box) && box) {
    return box;
  }

  src = src.toLowerCase();

  for (var key in boxSuffixMap) {
    if (boxSuffixMap.hasOwnProperty(key)) {
      var suffix = boxSuffixMap[key];

      if (src.indexOf(suffix) > -1) {
        return key;
      }
    }
  }

  return 'native';
}

var ChimeeKernel =
/*#__PURE__*/
function () {
  _createClass(ChimeeKernel, [{
    key: "currentTime",
    get: function get() {
      return this.videoElement.currentTime || 0;
    }
  }]);

  function ChimeeKernel(videoElement, config) {
    _classCallCheck(this, ChimeeKernel);

    if (!toxicPredicateFunctions.isElement(videoElement)) {
      throw new Error('You must pass in an video element to the chimee-kernel');
    }

    this.config = config;
    this.videoElement = videoElement;
    this.initVideoKernel();
  }

  _createClass(ChimeeKernel, [{
    key: "attachMedia",
    value: function attachMedia() {
      this.videoKernel.attachMedia();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.videoKernel.destroy();
    }
  }, {
    key: "initVideoKernel",
    value: function initVideoKernel() {
      var config = this.config;
      var box = getLegalBox(config);
      this.box = box;
      var VideoKernel = this.chooseVideoKernel(this.box, config.preset);

      if (!_isFunction(VideoKernel)) {
        throw new Error("We can't find video kernel for ".concat(box, ". Please check your config and make sure it's installed or provided"));
      }

      var customConfig = config.presetConfig[this.box];

      if (customConfig) {
        Object.assign(config, customConfig);
      }

      this.videoKernel = new VideoKernel(this.videoElement, config, customConfig);
    }
  }, {
    key: "load",
    value: function load() {
      var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.src;
      this.config.src = src;
      this.videoKernel.load(src);
    }
  }, {
    key: "off",
    value: function off(key, fn) {
      this.videoKernel.off(key, fn);
    }
  }, {
    key: "on",
    value: function on(key, fn) {
      this.videoKernel.on(key, fn);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.videoKernel.pause();
    }
  }, {
    key: "play",
    value: function play() {
      this.videoKernel.play();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.videoKernel.refresh();
    }
  }, {
    key: "seek",
    value: function seek(seconds) {
      if (!_isNumber(seconds)) {
        chimeeHelperLog.chimeeLog.error(LOG_TAG, "When you try to seek, you must offer us a number, but not ".concat(_typeof(seconds)));
        return;
      }

      this.videoKernel.seek(seconds);
    }
  }, {
    key: "startLoad",
    value: function startLoad() {
      if (!_isFunction(this.videoKernel.startLoad)) {
        throw new Error('This video kernel do not support startLoad, please contact us on https://github.com/Chimeejs/chimee/issues');
      }

      this.videoKernel.startLoad(this.config.src);
    }
  }, {
    key: "stopLoad",
    value: function stopLoad() {
      if (_isFunction(this.videoKernel.stopLoad)) {
        this.videoKernel.stopLoad();
      }
    }
  }, {
    key: "chooseVideoKernel",
    value: function chooseVideoKernel(box, preset) {
      switch (box) {
        case 'native':
          return NativeVideoKernel;

        case 'mp4':
          return this.getMp4Kernel(preset.mp4);

        case 'flv':
        case 'hls':
          return preset[box];

        default:
          throw new Error("We currently do not support box ".concat(box, ", please contact us through https://github.com/Chimeejs/chimee/issues."));
      }
    }
  }, {
    key: "getMp4Kernel",
    value: function getMp4Kernel(Mp4Kernel) {
      if (!Mp4Kernel || !_isFunction(Mp4Kernel.isSupport) || !Mp4Kernel.isSupport()) {
        if (Mp4Kernel) {
          chimeeHelperLog.chimeeLog.warn(LOG_TAG, 'mp4 decode is not support in this browser, we will switch to the native video kernel');
        }

        this.box = 'native';
        return NativeVideoKernel;
      }

      return Mp4Kernel;
    }
  }]);

  return ChimeeKernel;
}();

var chimeeDomElements = ['container', 'wrapper', 'video'];
function isChimeeDomElement(element) {
  return chimeeDomElements.includes(element);
}
function turnChimeeDomElementIntoRealChimeeDomElement(element) {
  if (element === 'video') {
    return 'videoElement';
  }

  return element;
}

var videoReadOnlyProperties = ['buffered', 'currentSrc', 'duration', 'error', 'ended', 'networkState', 'paused', 'readyState', 'seekable', 'sinkId', 'controlsList', 'tabIndex', 'dataset', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth'];
var kernelProperties = ['isLive', 'box', 'preset', 'kernels', 'presetConfig'];

function eventBinderCheck(key, fn) {
  if (!_isString(key)) {
    throw new TypeError('key parameter must be String');
  }

  if (!_isFunction(fn)) {
    throw new TypeError('fn parameter must be Function');
  }
}

var __decorate$5 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VideoWrapper =
/*#__PURE__*/
function () {
  function VideoWrapper(_ref) {
    var dispatcher = _ref.dispatcher,
        id = _ref.id;

    _classCallCheck(this, VideoWrapper);

    this.events = {};
    this.unwatchHandlers = [];

    if (dispatcher) {
      this.dispatcher = dispatcher;
    }

    this.id = id;
  }

  _createClass(VideoWrapper, [{
    key: "$attr",
    value: function $attr(targetOrAttr, attrOrValue, valueOrNothing) {
      var _this$getRealInfoForS = this.getRealInfoForStyleAndAttr(arguments.length, targetOrAttr, attrOrValue, valueOrNothing),
          method = _this$getRealInfoForS.method,
          target = _this$getRealInfoForS.target,
          attr = _this$getRealInfoForS.attr,
          value = _this$getRealInfoForS.value;

      if (method === 'set' && target === 'videoElement') {
        if (!this.dispatcher.videoConfigReady) {
          if (process.env.NODE_ENV !== 'production') {
            chimeeHelperLog.chimeeLog.warn('chimee', "".concat(this.id, " is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger"));
          }

          return value;
        }

        if (isVideoDomAttribute(attr)) {
          this.dispatcher.videoConfig[attr] = value;
          return value;
        }
      }

      return method === 'set' ? this.dispatcher.dom.setAttr(target, attr, value) : this.dispatcher.dom.getAttr(target, attr);
    }
  }, {
    key: "$css",
    value: function $css(targetOrAttr, attrOrValue, valueOrNothing) {
      var _this$getRealInfoForS2 = this.getRealInfoForStyleAndAttr(arguments.length, targetOrAttr, attrOrValue, valueOrNothing),
          method = _this$getRealInfoForS2.method,
          target = _this$getRealInfoForS2.target,
          attr = _this$getRealInfoForS2.attr,
          value = _this$getRealInfoForS2.value;

      return method === 'set' ? this.dispatcher.dom.setStyle(target, attr, value) : this.dispatcher.dom.getStyle(target, attr);
    }
  }, {
    key: "$del",
    value: function $del(obj, property) {
      if (!_isPlainObject(obj) && !_isArray(obj)) {
        throw new TypeError("$del only support Array or Object, but not ".concat(obj, ", whose type is ").concat(_typeof(obj)));
      }

      if (!_isFunction(obj.__del)) {
        if (process.env.NODE_ENV !== 'production') {
          chimeeHelperLog.chimeeLog.warn('chimee', "".concat(JSON.stringify(obj), " has not been deep watch. There is no need to use $del."));
        }

        delete obj[property];
        return;
      }

      obj.__del(property);
    }
  }, {
    key: "$emit",
    value: function $emit(key) {
      var _this$dispatcher$bind;

      var target;

      if (!_isString(key) && _isPlainObject(key) && _isString(key.name) && _isString(key.target)) {
        target = key.target;
        key = key.name;
      }

      if (!_isString(key)) {
        throw new TypeError('emit key parameter must be String');
      }

      if (process.env.NODE_ENV !== 'production' && domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
        chimeeHelperLog.chimeeLog.warn('plugin', "You are try to emit ".concat(key, " event. As emit is wrapped in Promise. It make you can't use event.preventDefault and event.stopPropagation. So we advice you to use emitSync"));
      }

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_this$dispatcher$bind = this.dispatcher.binder).emit.apply(_this$dispatcher$bind, [{
        id: this.id,
        name: key,
        target: target
      }].concat(args));
    }
  }, {
    key: "$emitSync",
    value: function $emitSync(key) {
      var _this$dispatcher$bind2;

      var target;

      if (!_isString(key) && _isPlainObject(key) && _isString(key.name) && _isString(key.target)) {
        target = key.target;
        key = key.name;
      }

      if (!_isString(key)) {
        throw new TypeError('emitSync key parameter must be String');
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return (_this$dispatcher$bind2 = this.dispatcher.binder).emitSync.apply(_this$dispatcher$bind2, [{
        id: this.id,
        name: key,
        target: target
      }].concat(args));
    }
  }, {
    key: "$fullscreen",
    value: function $fullscreen() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

      if (!this.dispatcher.binder.emitSync({
        id: this.id,
        name: 'fullscreen',
        target: 'video-dom'
      }, flag, element)) {
        return false;
      }

      var result = this.dispatcher.dom.fullscreen(flag, turnChimeeDomElementIntoRealChimeeDomElement(element));
      this.dispatcher.binder.triggerSync({
        id: this.id,
        name: 'fullscreen',
        target: 'video-dom'
      }, flag, element);
      return result;
    }
  }, {
    key: "$off",
    value: function $off(key, fn) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var eventInfo = Object.assign({}, options, {
        fn: fn,
        id: this.id,
        name: key
      });
      this.dispatcher.binder.off(eventInfo);
      this.removeEvents(key, fn);
    }
  }, {
    key: "$on",
    value: function $on(key, fn) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var eventInfo = Object.assign({}, options, {
        fn: fn,
        id: this.id,
        name: key
      });
      this.dispatcher.binder.on(eventInfo);
      this.addEvents(key, fn);
    }
  }, {
    key: "$once",
    value: function $once(key, fn) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var self = this;

      var boundFn = function boundFn() {
        toxicUtils.bind(fn, this).apply(void 0, arguments);
        self.removeEvents(key, boundFn);
      };

      self.addEvents(key, boundFn);
      var eventInfo = Object.assign({}, options, {
        fn: boundFn,
        id: this.id,
        name: key
      });
      this.dispatcher.binder.once(eventInfo);
    }
  }, {
    key: "$set",
    value: function $set(obj, property, value) {
      if (!_isPlainObject(obj) && !_isArray(obj)) {
        throw new TypeError("$set only support Array or Object, but not ".concat(obj, ", whose type is ").concat(_typeof(obj)));
      }

      if (!_isFunction(obj.__set)) {
        if (process.env.NODE_ENV !== 'production') {
          chimeeHelperLog.chimeeLog.warn('chimee', "".concat(JSON.stringify(obj), " has not been deep watch. There is no need to use $set."));
        }

        obj[property] = value;
        return;
      }

      obj.__set(property, value);
    }
  }, {
    key: "$silentLoad",
    value: function $silentLoad(src) {
      var _this = this;

      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.dispatcher.binder.emit({
        id: this.id,
        name: 'silentLoad',
        target: 'video'
      }).then(function () {
        return _this.dispatcher.silentLoad(src, option);
      }).then(function (result) {
        _this.dispatcher.binder.trigger({
          id: _this.id,
          name: 'silentLoad',
          target: 'video'
        }, result);
      });
    }
  }, {
    key: "$watch",
    value: function $watch(key, handler) {
      var _this2 = this;

      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          deep = _ref2.deep,
          _ref2$diff = _ref2.diff,
          diff = _ref2$diff === void 0 ? true : _ref2$diff,
          other = _ref2.other,
          _ref2$proxy = _ref2.proxy,
          proxy = _ref2$proxy === void 0 ? false : _ref2$proxy;

      if (!_isString(key) && !_isArray(key)) {
        throw new TypeError("$watch only accept string and Array<string> as key to find the target to spy on, but not ".concat(key, ", whose type is ").concat(_typeof(key)));
      }

      var watching = true;

      var watcher = function watcher() {
        if (watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) {
          toxicUtils.bind(handler, this).apply(void 0, arguments);
        }
      };

      var unwatcher = function unwatcher() {
        watching = false;

        var index = _this2.unwatchHandlers.indexOf(unwatcher);

        if (index > -1) {
          _this2.unwatchHandlers.splice(index, 1);
        }
      };

      var keys = _isString(key) ? key.split('.') : key;
      var property = keys.pop();
      var videoConfig = this.dispatcher.videoConfig;
      var target = keys.length === 0 && !other && isVideoDomAttribute(property) ? videoConfig : ['isFullscreen', 'fullscreenElement'].indexOf(property) > -1 ? this.dispatcher.dom : toxicUtils.getDeepProperty(other || this, keys, {
        throwError: true
      });
      toxicDecorators.applyDecorators(target, _defineProperty({}, property, toxicDecorators.watch(watcher, {
        deep: deep,
        diff: diff,
        proxy: proxy
      })), {
        self: true
      });
      this.unwatchHandlers.push(unwatcher);
      return unwatcher;
    }
  }, {
    key: "exitPictureInPicture",
    value: function exitPictureInPicture() {
      return this.dispatcher.binder.emit({
        id: this.id,
        name: 'leavepictureinpicture',
        target: 'video'
      });
    }
  }, {
    key: "load",
    value: function load() {
      var _this3 = this;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return new Promise(function (resolve) {
        var _this3$dispatcher$bin;

        _this3.dispatcher.binder.once({
          fn: resolve,
          id: _this3.id,
          name: '_load',
          target: 'plugin'
        });

        (_this3$dispatcher$bin = _this3.dispatcher.binder).emit.apply(_this3$dispatcher$bin, [{
          id: _this3.id,
          name: 'load',
          target: 'plugin'
        }].concat(args));
      });
    }
  }, {
    key: "requestPictureInPicture",
    value: function requestPictureInPicture() {
      return this.dispatcher.binder.emit({
        id: this.id,
        name: 'enterpictureinpicture',
        target: 'video'
      });
    }
  }, {
    key: "destroyVideoWrapper",
    value: function destroyVideoWrapper() {
      var _this4 = this;

      this.unwatchHandlers.forEach(function (unwatcher) {
        return unwatcher();
      });
      Object.keys(this.events).forEach(function (key) {
        if (!_isArray(_this4.events[key])) {
          return;
        }

        _this4.events[key].forEach(function (fn) {
          return _this4.$off(key, fn);
        });
      });
      delete this.events;
    }
  }, {
    key: "wrapAsVideo",
    value: function wrapAsVideo(videoConfig) {
      var _this5 = this;

      videoReadOnlyProperties.forEach(function (key) {
        Object.defineProperty(_this5, key, {
          configurable: false,
          enumerable: false,
          get: function get() {
            return this.dispatcher.dom.videoElement[key];
          },
          set: undefined
        });
      });
      videoMethods.forEach(function (key) {
        Object.defineProperty(_this5, key, {
          configurable: false,
          enumerable: false,
          get: function get() {
            var video = this.dispatcher.dom.videoElement;
            return toxicUtils.bind(video[key], video);
          },
          set: undefined
        });
      });
      var props = [].concat(kernelProperties).concat(videoDomAttributes).reduce(function (props, key) {
        props[key] = [toxicDecorators.accessor({
          get: function get() {
            return videoConfig[key];
          },
          set: function set(value) {
            videoConfig[key] = value;
            return value;
          }
        }), toxicDecorators.nonenumerable];
        return props;
      }, {});
      toxicDecorators.applyDecorators(this, props, {
        self: true
      });
      kernelMethods.forEach(function (key) {
        Object.defineProperty(_this5, key, {
          value: function value() {
            var _this6 = this;

            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            return new Promise(function (resolve) {
              var _this6$dispatcher$bin;

              var id = _this6.id;

              _this6.dispatcher.binder.once({
                fn: resolve,
                id: id,
                name: '_' + key
              });

              (_this6$dispatcher$bin = _this6.dispatcher.binder)[/^(seek)$/.test(key) ? 'emitSync' : 'emit'].apply(_this6$dispatcher$bin, [{
                id: id,
                name: key,
                target: 'video'
              }].concat(args));
            });
          },
          configurable: true,
          enumerable: false,
          writable: true
        });
      });
      domMethods.forEach(function (key) {
        if (key === 'fullscreen') {
          return;
        }

        Object.defineProperty(_this5, key, {
          value: function value() {
            var _this$dispatcher$dom;

            return (_this$dispatcher$dom = this.dispatcher.dom)[key].apply(_this$dispatcher$dom, arguments);
          },
          configurable: true,
          enumerable: false,
          writable: true
        });
      });
    }
  }, {
    key: "addEvents",
    value: function addEvents(key, fn) {
      this.events[key] = this.events[key] || [];
      this.events[key].push(fn);
    }
  }, {
    key: "getRealInfoForStyleAndAttr",
    value: function getRealInfoForStyleAndAttr(argumentsLength, targetOrAttr, attrOrValue, valueOrNothing) {
      var method;
      var target;
      var attr;
      var value;

      if (argumentsLength > 2) {
        method = 'set';
        target = targetOrAttr;
        attr = attrOrValue;
        value = valueOrNothing;
      } else if (argumentsLength === 2) {
        if (isChimeeDomElement(targetOrAttr)) {
          method = 'get';
          target = targetOrAttr;
          attr = attrOrValue;
        } else {
          method = 'set';
          target = 'container';
          attr = targetOrAttr;
          value = attrOrValue;
        }
      } else if (argumentsLength === 1) {
        method = 'get';
        target = 'container';
        attr = targetOrAttr;
      } else {
        throw new Error('You have to pass at least one argument to run $attr or $ css');
      }

      var realTarget = turnChimeeDomElementIntoRealChimeeDomElement(target);
      return {
        attr: attr,
        method: method,
        value: value,
        target: realTarget
      };
    }
  }, {
    key: "removeEvents",
    value: function removeEvents(key, fn) {
      if (toxicPredicateFunctions.isEmpty(this.events[key])) {
        return;
      }

      var index = this.events[key].indexOf(fn);

      if (index < 0) {
        return;
      }

      this.events[key].splice(index, 1);

      if (toxicPredicateFunctions.isEmpty(this.events[key])) {
        delete this.events[key];
      }
    }
  }, {
    key: "$container",
    get: function get() {
      return this.dispatcher.dom.container;
    }
  }, {
    key: "$pluginOrder",
    get: function get() {
      return this.dispatcher.order;
    }
  }, {
    key: "$plugins",
    get: function get() {
      return this.dispatcher.plugins;
    }
  }, {
    key: "$video",
    get: function get() {
      return this.dispatcher.dom.videoElement;
    }
  }, {
    key: "$wrapper",
    get: function get() {
      return this.dispatcher.dom.wrapper;
    }
  }, {
    key: "container",
    get: function get() {
      return this.dispatcher.containerConfig;
    },
    set: function set(config) {
      if (!_isPlainObject(config)) {
        throw new Error("The config of container must be Object, but not ".concat(_typeof(config), "."));
      }

      Object.assign(this.dispatcher.containerConfig, config);
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this.dispatcher.kernel.currentTime;
    },
    set: function set(second) {
      this.dispatcher.binder.emitSync({
        id: this.id,
        name: 'seek',
        target: 'video'
      }, second);
    }
  }, {
    key: "fullscreenElement",
    get: function get() {
      return this.dispatcher.dom.fullscreenElement;
    }
  }, {
    key: "inPictureInPictureMode",
    get: function get() {
      return this.dispatcher.inPictureInPictureMode;
    }
  }, {
    key: "isFullscreen",
    get: function get() {
      return this.dispatcher.dom.isFullscreen;
    }
  }, {
    key: "pictureInPictureWindow",
    get: function get() {
      return window.__chimee_picture_in_picture;
    }
  }, {
    key: "videoRequireGuardedAttributes",
    get: function get() {
      return this.dispatcher.dom.videoRequireGuardedAttributes;
    }
  }]);

  return VideoWrapper;
}();

__decorate$5([toxicDecorators.nonenumerable], VideoWrapper.prototype, "$container", null);

__decorate$5([toxicDecorators.nonenumerable], VideoWrapper.prototype, "$pluginOrder", null);

__decorate$5([toxicDecorators.nonenumerable], VideoWrapper.prototype, "$plugins", null);

__decorate$5([toxicDecorators.nonenumerable], VideoWrapper.prototype, "$video", null);

__decorate$5([toxicDecorators.nonenumerable], VideoWrapper.prototype, "$wrapper", null);

__decorate$5([toxicDecorators.nonenumerable], VideoWrapper.prototype, "inPictureInPictureMode", null);

__decorate$5([toxicDecorators.nonenumerable], VideoWrapper.prototype, "pictureInPictureWindow", null);

__decorate$5([toxicDecorators.alias('attr')], VideoWrapper.prototype, "$attr", null);

__decorate$5([toxicDecorators.alias('css')], VideoWrapper.prototype, "$css", null);

__decorate$5([toxicDecorators.alias('emit')], VideoWrapper.prototype, "$emit", null);

__decorate$5([toxicDecorators.alias('emitSync')], VideoWrapper.prototype, "$emitSync", null);

__decorate$5([toxicDecorators.alias('fullScreen'), toxicDecorators.alias('$fullScreen'), toxicDecorators.alias('fullscreen')], VideoWrapper.prototype, "$fullscreen", null);

__decorate$5([toxicDecorators.alias('off'), toxicDecorators.alias('removeEventListener'), toxicDecorators.before(eventBinderCheck)], VideoWrapper.prototype, "$off", null);

__decorate$5([toxicDecorators.alias('on'), toxicDecorators.alias('addEventListener'), toxicDecorators.before(eventBinderCheck)], VideoWrapper.prototype, "$on", null);

__decorate$5([toxicDecorators.alias('once'), toxicDecorators.before(eventBinderCheck)], VideoWrapper.prototype, "$once", null);

__decorate$5([toxicDecorators.alias('silentLoad')], VideoWrapper.prototype, "$silentLoad", null);

var ChimeePlugin =
/*#__PURE__*/
function (_VideoWrapper) {
  _inherits(ChimeePlugin, _VideoWrapper);

  function ChimeePlugin(_ref, dispatcher) {
    var _this;

    var id = _ref.id,
        name = _ref.name,
        _ref$level = _ref.level,
        level = _ref$level === void 0 ? 0 : _ref$level,
        _ref$operable = _ref.operable,
        operable = _ref$operable === void 0 ? true : _ref$operable,
        beforeCreate = _ref.beforeCreate,
        create = _ref.create,
        init = _ref.init,
        inited = _ref.inited,
        destroy = _ref.destroy,
        _ref$events = _ref.events,
        events = _ref$events === void 0 ? {} : _ref$events,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data,
        _ref$computed = _ref.computed,
        computed = _ref$computed === void 0 ? {} : _ref$computed,
        _ref$methods = _ref.methods,
        methods = _ref$methods === void 0 ? {} : _ref$methods,
        el = _ref.el,
        _ref$penetrate = _ref.penetrate,
        penetrate = _ref$penetrate === void 0 ? false : _ref$penetrate,
        _ref$inner = _ref.inner,
        inner = _ref$inner === void 0 ? true : _ref$inner,
        autoFocus = _ref.autoFocus,
        className = _ref.className;
    var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      name: name
    };

    _classCallCheck(this, ChimeePlugin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChimeePlugin).call(this, {
      dispatcher: dispatcher,
      id: id
    }));
    _this.destroyed = false;
    _this.VERSION = '1.0.1-alpha.0';
    _this.autoFocusValue = false;
    _this.levelValue = 0;
    _this.operableValue = true;

    if (!dispatcher) {
      if (process.env.NODE_ENV !== 'production') {
        chimeeHelperLog.chimeeLog.error('Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?');
      }

      throw new TypeError('lack of dispatcher');
    }

    if (!_isString(id)) {
      throw new TypeError('id of PluginConfig must be string');
    }

    _this.id = id;
    _this.$videoConfig = _this.dispatcher.videoConfig;

    _this.wrapAsVideo(_this.$videoConfig);

    _this.beforeCreate = _this.beforeCreate || beforeCreate;

    try {
      if (_isFunction(_this.beforeCreate)) {
        _this.beforeCreate({
          computed: computed,
          data: data,
          events: events,
          methods: methods
        }, option);
      }
    } catch (error) {
      _this.$throwError(error);
    }

    if (!toxicPredicateFunctions.isEmpty(methods) && _isPlainObject(methods)) {
      Object.keys(methods).forEach(function (key) {
        var fn = methods[key];

        if (!_isFunction(fn)) {
          throw new TypeError('plugins methods must be Function');
        }

        Object.defineProperty(_assertThisInitialized(_this), key, {
          configurable: true,
          enumerable: false,
          value: toxicUtils.bind(fn, _assertThisInitialized(_this)),
          writable: true
        });
      });
    }

    if (!toxicPredicateFunctions.isEmpty(events) && _isPlainObject(events)) {
      Object.keys(events).forEach(function (key) {
        if (!_isFunction(events[key])) {
          throw new TypeError('plugins events hook must bind with Function');
        }

        _this.$on(key, events[key]);
      });
    }

    if (!toxicPredicateFunctions.isEmpty(data) && _isPlainObject(data)) {
      Object.assign(_assertThisInitialized(_this), _cloneDeep(data));
    }

    if (!toxicPredicateFunctions.isEmpty(computed) && _isPlainObject(computed)) {
      var props = Object.keys(computed).reduce(function (props, key) {
        var val = computed[key];

        if (_isFunction(val)) {
          props[key] = toxicDecorators.accessor({
            get: val
          });
          return props;
        }

        if (_isPlainObject(val) && (_isFunction(val.get) || _isFunction(val.set))) {
          props[key] = toxicDecorators.accessor(val);
          return props;
        }

        if (process.env.NODE_ENV !== 'production') {
          chimeeHelperLog.chimeeLog.warn('Dispatcher.plugin', "Wrong computed member '".concat(key, "' defination in Plugin ").concat(name));
        }

        return props;
      }, {});
      toxicDecorators.applyDecorators(_assertThisInitialized(_this), props, {
        self: true
      });
    }

    _this.create = _this.create || create;
    _this.init = _this.init || init;
    _this.inited = _this.inited || inited;
    _this.destroy = _this.destroy || destroy;
    _this.$dom = _this.dispatcher.dom.insertPlugin(_this.id, el, {
      penetrate: penetrate,
      inner: inner,
      className: className
    });
    _this.$autoFocus = _isBoolean(autoFocus) ? autoFocus : inner;
    _this.$inner = inner;
    _this.$penetrate = penetrate;
    toxicDecorators.applyDecorators(_assertThisInitialized(_this), {
      $inner: toxicDecorators.frozen,
      $penetrate: toxicDecorators.frozen
    }, {
      self: true
    });
    _this.$operable = _isBoolean(option.operable) ? option.operable : operable;
    _this.levelValue = _isInteger(option.level) ? option.level : level;
    _this.$config = option;

    try {
      if (_isFunction(_this.create)) {
        _this.create();
      }
    } catch (error) {
      _this.$throwError(error);
    }

    return _this;
  }

  _createClass(ChimeePlugin, [{
    key: "$bumpToTop",
    value: function $bumpToTop() {
      var dispatcher = this.dispatcher;
      var topLevel = dispatcher.getTopLevel(this.$inner);
      this.$level = topLevel + 1;
    }
  }, {
    key: "$destroy",
    value: function $destroy() {
      if (this.destroyed) {
        return;
      }

      if (_isFunction(this.destroy)) {
        this.destroy();
      }

      _get(_getPrototypeOf(ChimeePlugin.prototype), "destroyVideoWrapper", this).call(this);

      this.dispatcher.dom.removePlugin(this.id);
      delete this.dispatcher;
      delete this.$dom;
      this.destroyed = true;
    }
  }, {
    key: "$throwError",
    value: function $throwError(error) {
      this.dispatcher.throwError(error);
    }
  }, {
    key: "runInitedHook",
    value: function runInitedHook() {
      var _this2 = this;

      var result;

      try {
        result = _isFunction(this.inited) && this.inited();
      } catch (error) {
        this.$throwError(error);
      }

      var promiseResult = toxicPredicateFunctions.isPromise(result) && result;
      this.readySync = !promiseResult;
      this.ready = promiseResult ? promiseResult.then(function () {
        _this2.readySync = true;
        return _this2;
      }).catch(function (error) {
        if (_isError(error)) {
          _this2.$throwError(error);
        }

        return Promise.reject(error);
      }) : Promise.resolve(this);
      return this.readySync ? this : this.ready;
    }
  }, {
    key: "runInitHook",
    value: function runInitHook(videoConfig) {
      try {
        if (_isFunction(this.init)) {
          this.init(videoConfig);
        }
      } catch (error) {
        this.$throwError(error);
      }
    }
  }, {
    key: "$autoFocus",
    get: function get() {
      return this.autoFocusValue;
    },
    set: function set(val) {
      this.autoFocusValue = val;
      var dom = this.dispatcher.dom;
      dom.autoFocusToVideo(this.$dom, !val);
    }
  }, {
    key: "$level",
    set: function set(val) {
      if (!_isInteger(val)) {
        return;
      }

      this.levelValue = val;
      var dispatcher = this.dispatcher;
      dispatcher.sortZIndex();
    },
    get: function get() {
      return this.levelValue;
    }
  }, {
    key: "$operable",
    set: function set(val) {
      if (!_isBoolean(val)) {
        return;
      }

      this.$dom.style.pointerEvents = val ? 'auto' : 'none';
      this.operableValue = val;
    },
    get: function get() {
      return this.operableValue;
    }
  }]);

  return ChimeePlugin;
}(VideoWrapper);

var PictureInPicture =
/*#__PURE__*/
function (_ChimeePlugin) {
  _inherits(PictureInPicture, _ChimeePlugin);

  function PictureInPicture(config, dispatcher, option) {
    var _this;

    _classCallCheck(this, PictureInPicture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PictureInPicture).call(this, Object.assign(config, {
      el: document.createElement('canvas'),
      inner: false,
      penetrate: true
    }), dispatcher, option));
    _this.hasStopRender = true;
    _this.isShown = false;
    _this.myStyle = {
      bottom: 0,
      height: 156,
      left: '',
      position: 'fixed',
      right: 0,
      top: '',
      width: 277
    };

    _this.exitPictureInPicture = function () {
      _this.hide();

      window.__chimee_picture_in_picture = {};
      return Promise.resolve();
    };

    _this.inited = function () {
      _this.setStyle();
    };

    _this.requestPictureInPicture = function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$autoplay = _ref.autoplay,
          autoplay = _ref$autoplay === void 0 ? false : _ref$autoplay;

      _this.closeCurrentPicture();

      _this.show();

      _this.poller(_this.render);

      if (autoplay && _this.paused) {
        _this.play();
      } else if (!autoplay && !_this.paused) {
        _this.pause();
      }

      window.__chimee_picture_in_picture = {
        element: _this.$video,
        plugin: _assertThisInitialized(_this),
        window: _this.$dom
      };
      return Promise.resolve();
    };

    return _this;
  }

  _createClass(PictureInPicture, [{
    key: "closeCurrentPicture",
    value: function closeCurrentPicture() {
      if (window.__chimee_picture_in_picture && window.__chimee_picture_in_picture.plugin) {
        window.__chimee_picture_in_picture.plugin.exitPictureInPicture();
      }
    }
  }, {
    key: "create",
    value: function create() {
      _class.addClass(this.$dom, 'chimee-plugin-picture-in-picture');
      this.getContext();
    }
  }, {
    key: "getContext",
    value: function getContext() {
      this.ctx = this.$dom.getContext('2d');
    }
  }, {
    key: "hide",
    value: function hide() {
      domHelpers.style(this.$dom, 'display', 'none');
      this.isShown = false;
    }
  }, {
    key: "poller",
    value: function poller(fn) {
      var _this2 = this;

      requestAnimationFrame(function () {
        fn.call(_this2);

        if (_this2.isShown) {
          _this2.poller(fn);

          _this2.hasStopRender = false;
        } else {
          _this2.hasStopRender = true;
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isShown) {
        this.ctx.drawImage(this.$video, 0, 0, this.myStyle.width, this.myStyle.height);
      }
    }
  }, {
    key: "setStyle",
    value: function setStyle() {
      var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(this.myStyle, styles);
      this.$dom.setAttribute('width', this.myStyle.width.toString());
      this.$dom.setAttribute('height', this.myStyle.height.toString());

      for (var key in this.myStyle) {
        if (key === 'width' || key === 'height') {
          continue;
        }

        var value = this.myStyle[key];
        domHelpers.style(this.$dom, key, value);
      }
    }
  }, {
    key: "show",
    value: function show() {
      domHelpers.style(this.$dom, 'display', 'block');
      this.isShown = true;
    }
  }]);

  return PictureInPicture;
}(ChimeePlugin);

var __decorate$6 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var pluginConfigSet = {};
var kernelsSet = {};

function convertNameIntoId(name) {
  if (!_isString(name)) {
    throw new Error("Plugin's name must be a string, but not \"".concat(name, "\" in ").concat(_typeof(name)));
  }

  return toxicUtils.camelize(name);
}

function checkPluginConfig(config) {
  if (_isFunction(config)) {
    if (!(config.prototype instanceof ChimeePlugin)) {
      throw new TypeError("Your are trying to install plugin ".concat(config.name, ", but it's not extends from Chimee.plugin."));
    }

    return;
  }

  if (!_isPlainObject(config) || _isEmpty(config)) {
    throw new TypeError("plugin's config must be an Object, but not \"".concat(config, "\" in ").concat(_typeof(config)));
  }

  var name = config.name;

  if (!_isString(name) || name.length < 1) {
    throw new TypeError("plugin must have a legal namea, but not \"".concat(name, "\" in ").concat(_typeof(name)));
  }
}

var Dispatcher =
/*#__PURE__*/
function () {
  function Dispatcher(config, vm) {
    var _this = this;

    _classCallCheck(this, Dispatcher);

    this.changeWatchable = true;
    this.kernelEventHandlerList = [];
    this.order = [];
    this.plugins = {};
    this.readySync = false;
    this.zIndexMap = {
      inner: [],
      outer: []
    };

    if (!_isPlainObject(config)) {
      throw new TypeError("UserConfig must be an Object, but not \"".concat(config, "\" in ").concat(_typeof(config)));
    }

    this.dom = new Dom(config, this);
    this.vm = vm;
    this.videoConfigReady = false;
    this.videoConfig = new VideoConfig(this, config);

    if (_isArray(config.plugins) && !_isArray(config.plugin)) {
      config.plugin = config.plugins;
      delete config.plugins;
    }

    this.binder = new Binder(this);
    this.binder.listenOnMouseMoveEvent(this.dom.videoElement);
    this.initUserPlugin(config.plugin);
    var containerConfig = Object.assign({}, defaultContainerConfig, config.container || {});
    this.order.forEach(function (key) {
      return _this.plugins[key].runInitHook(_this.videoConfig);
    });
    this.videoConfigReady = true;
    this.videoConfig.init();
    this.containerConfig = new Vessel(this, 'container', containerConfig);
    this.kernel = this.createKernel(this.dom.videoElement, this.videoConfig);
    this.binder.applyPendingEvents('kernel');

    if (config.noDefaultContextMenu) {
      var noDefaultContextMenu = config.noDefaultContextMenu;
      var target = noDefaultContextMenu === 'container' || noDefaultContextMenu === 'wrapper' ? noDefaultContextMenu : 'video-dom';
      this.binder.on({
        fn: function fn(evt) {
          return evt.preventDefault();
        },
        id: '_vm',
        name: 'contextmenu',
        stage: 'main',
        target: target
      });
    }

    var asyncInitedTasks = [];
    this.order.forEach(function (key) {
      var ready = _this.plugins[key].runInitedHook();

      if (toxicPredicateFunctions.isPromise(ready)) {
        asyncInitedTasks.push(ready);
      }
    });
    this.readySync = asyncInitedTasks.length === 0;
    this.ready = this.readySync ? Promise.resolve() : Promise.all(asyncInitedTasks).then(function () {
      _this.readySync = true;

      _this.onReady();
    });

    if (this.readySync) {
      this.onReady();
    }
  }

  _createClass(Dispatcher, [{
    key: "destroy",
    value: function destroy() {
      for (var key in this.plugins) {
        if (this.plugins.hasOwnProperty(key)) {
          this.unuse(key);
        }
      }

      this.binder.destroy();
      delete this.binder;
      this.dom.destroy();
      delete this.dom;
      this.kernel.destroy();
      delete this.kernel;
      delete this.vm;
      delete this.plugins;
      delete this.order;
      this.destroyed = true;
    }
  }, {
    key: "exitPictureInPicture",
    value: function exitPictureInPicture() {
      if ('pictureInPictureEnabled' in document) {
        if (this.inPictureInPictureMode) {
          window.__chimee_picture_in_picture = undefined;
          return document.exitPictureInPicture();
        }
      }

      return this.plugins.pictureInPicture && this.plugins.pictureInPicture.exitPictureInPicture();
    }
  }, {
    key: "getPluginConfig",
    value: function getPluginConfig(id) {
      return Dispatcher.getPluginConfig(id);
    }
  }, {
    key: "hasUsed",
    value: function hasUsed(id) {
      var plugin = this.plugins[id];
      return _isPlainObject(plugin);
    }
  }, {
    key: "load",
    value: function load(srcOrOption) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var src = _isString(srcOrOption) ? srcOrOption : _isPlainObject(srcOrOption) && _isString(srcOrOption.src) ? srcOrOption.src : '';

      if (!_isString(srcOrOption)) {
        delete srcOrOption.src;
        option = srcOrOption;
      }

      var oldBox = this.kernel.box;
      var videoConfig = this.videoConfig;
      var _option = option,
          _option$isLive = _option.isLive,
          isLive = _option$isLive === void 0 ? videoConfig.isLive : _option$isLive,
          _option$box = _option.box,
          box = _option$box === void 0 ? getLegalBox({
        src: src,
        box: videoConfig.box
      }) : _option$box,
          _option$preset = _option.preset,
          preset = _option$preset === void 0 ? videoConfig.preset : _option$preset,
          _option$kernels = _option.kernels,
          kernels = _option$kernels === void 0 ? videoConfig.kernels : _option$kernels;

      if (box !== 'native' || box !== oldBox || !_isEmpty(option)) {
        var video = document.createElement('video');
        var config = {
          isLive: isLive,
          box: box,
          preset: preset,
          src: src,
          kernels: kernels
        };
        var kernel = this.createKernel(video, config);
        this.switchKernel({
          video: video,
          kernel: kernel,
          config: config,
          notifyChange: true
        });
      }

      var originAutoLoad = this.videoConfig.autoload;
      this.changeUnwatchable(this.videoConfig, 'autoload', false);
      this.videoConfig.src = src || this.videoConfig.src;
      this.kernel.load(this.videoConfig.src);
      this.changeUnwatchable(this.videoConfig, 'autoload', originAutoLoad);
    }
  }, {
    key: "onReady",
    value: function onReady() {
      this.binder.trigger({
        id: 'dispatcher',
        name: 'ready',
        target: 'plugin'
      });
      this.autoloadVideoSrcAtFirst();
    }
  }, {
    key: "requestPictureInPicture",
    value: function () {
      var _requestPictureInPicture = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var pipWindow;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!('pictureInPictureEnabled' in document)) {
                  _context.next = 8;
                  break;
                }

                if (!this.inPictureInPictureMode) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", Promise.resolve(window.__chimee_picture_in_picture));

              case 3:
                _context.next = 5;
                return this.dom.videoElement.requestPictureInPicture();

              case 5:
                pipWindow = _context.sent;
                window.__chimee_picture_in_picture = pipWindow;
                return _context.abrupt("return", pipWindow);

              case 8:
                if (!Dispatcher.hasInstalled(PictureInPicture.name)) {
                  Dispatcher.install(PictureInPicture);
                }

                if (!this.hasUsed(PictureInPicture.name)) {
                  this.use(PictureInPicture.name);
                }

                return _context.abrupt("return", this.plugins.pictureInPicture.requestPictureInPicture());

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function requestPictureInPicture() {
        return _requestPictureInPicture.apply(this, arguments);
      }

      return requestPictureInPicture;
    }()
  }, {
    key: "silentLoad",
    value: function silentLoad(src) {
      var _this2 = this;

      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _option$duration = option.duration,
          duration = _option$duration === void 0 ? 3 : _option$duration,
          _option$bias = option.bias,
          bias = _option$bias === void 0 ? 0 : _option$bias,
          _option$repeatTimes = option.repeatTimes,
          repeatTimes = _option$repeatTimes === void 0 ? 0 : _option$repeatTimes,
          _option$increment = option.increment,
          increment = _option$increment === void 0 ? 0 : _option$increment,
          _option$isLive2 = option.isLive,
          isLive = _option$isLive2 === void 0 ? this.videoConfig.isLive : _option$isLive2,
          _option$box2 = option.box,
          box = _option$box2 === void 0 ? this.videoConfig.box : _option$box2,
          _option$kernels2 = option.kernels,
          kernels = _option$kernels2 === void 0 ? this.videoConfig.kernels : _option$kernels2,
          _option$preset2 = option.preset,
          preset = _option$preset2 === void 0 ? this.videoConfig.preset : _option$preset2;
      var immediate = option.immediate || isLive;
      var config = {
        isLive: isLive,
        box: box,
        src: src,
        kernels: kernels,
        preset: preset
      };
      var tasks = new Array(repeatTimes + 1).fill(1).map(function (value, index) {
        return function () {
          return new Promise(function (resolve, reject) {
            if (option.abort) {
              reject({
                error: true,
                message: 'user abort the mission'
              });
            }

            var video = document.createElement('video');
            var idealTime = _this2.kernel.currentTime + duration + increment * index;
            video.muted = true;
            var that = _this2;
            var newVideoReady = false;
            var kernel;

            function oldVideoTimeupdate() {
              var currentTime = that.kernel.currentTime;

              if (bias <= 0 && currentTime >= idealTime || bias > 0 && (Math.abs(idealTime - currentTime) <= bias && newVideoReady || currentTime - idealTime > bias)) {
                events.off(that.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                events.off(video, 'error', videoError, true);

                if (!newVideoReady) {
                  events.off(video, 'canplay', videoCanplay, true);
                  events.off(video, 'loadedmetadata', videoLoadedmetadata, true);
                  kernel.destroy();
                  return resolve();
                }

                return reject({
                  error: false,
                  kernel: kernel,
                  video: video
                });
              }
            }

            function videoCanplay() {
              newVideoReady = true;

              if (immediate) {
                events.off(that.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                events.off(video, 'error', videoError, true);
                return reject({
                  error: false,
                  kernel: kernel,
                  video: video
                });
              }
            }

            function videoLoadedmetadata() {
              if (!isLive) {
                kernel.seek(immediate ? this.kernel.currentTime : idealTime);
              }
            }

            function videoError(evt) {
              events.off(video, 'canplay', videoCanplay, true);
              events.off(video, 'loadedmetadata', videoLoadedmetadata, true);
              events.off(that.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
              kernel.off('error', videoError);
              var error;

              if (evt && evt.errmsg) {
                var errmsg = evt.errmsg;
                chimeeHelperLog.chimeeLog.error('chimee\'s silentload bump into a kernel error', errmsg);
                error = new Error(errmsg);
              } else {
                error = !_isEmpty(video.error) ? new Error(video.error.message) : new Error('unknow video error');
                chimeeHelperLog.chimeeLog.error('chimee\'s silentload', error.message);
              }

              kernel.destroy();
              that.silentLoadTempKernel = undefined;
              return index === repeatTimes ? reject(error) : resolve(error);
            }

            events.on(video, 'canplay', videoCanplay, true);
            events.on(video, 'loadedmetadata', videoLoadedmetadata.bind(_this2), true);
            events.on(video, 'error', videoError, true);
            kernel = _this2.createKernel(video, config);
            _this2.silentLoadTempKernel = kernel;
            kernel.on('error', videoError);
            events.on(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
            kernel.load();
          });
        };
      });
      return runRejectableQueue(tasks).then(function () {
        var message = "The silentLoad for ".concat(src, " timed out. Please set a longer duration or check your network");

        if (process.env.NODE_ENV !== 'production') {
          chimeeHelperLog.chimeeLog.warn('chimee\'s silentLoad', message);
        }

        return Promise.reject(new Error(message));
      }).catch(function (result) {
        if (_isError(result)) {
          return Promise.reject(result);
        }

        var kernelError;
        var data;

        if (result.error) {
          kernelError = result;
        } else {
          data = result;
        }

        if (kernelError && kernelError.error) {
          if (process.env.NODE_ENV !== 'production') {
            chimeeHelperLog.chimeeLog.warn('chimee\'s silentLoad', kernelError.message);
          }

          return Promise.reject(new Error(kernelError.message));
        }

        var _data = data,
            video = _data.video,
            kernel = _data.kernel;

        if (option.abort) {
          kernel.destroy();
          return Promise.reject(new Error('user abort the mission'));
        }

        var paused = _this2.dom.videoElement.paused;

        if (paused) {
          _this2.switchKernel({
            video: video,
            kernel: kernel,
            config: config
          });

          return Promise.resolve();
        }

        return new Promise(function (resolve) {
          events.on(video, 'play', function () {
            _this2.switchKernel({
              video: video,
              kernel: kernel,
              config: config
            });

            resolve();
          }, true);
          video.play();
        });
      });
    }
  }, {
    key: "switchKernel",
    value: function switchKernel(_ref) {
      var _this3 = this;

      var video = _ref.video,
          kernel = _ref.kernel,
          config = _ref.config,
          notifyChange = _ref.notifyChange;
      var oldKernel = this.kernel;

      var originVideoConfig = _clone(this.videoConfig);

      this.dom.migrateVideoRequiredGuardedAttributes(video);
      this.dom.removeVideo();
      this.dom.installVideo(video);
      this.videoConfig.changeWatchable = false;
      this.videoConfig.autoload = false;
      this.videoConfig.src = config.src;
      videoDomAttributes.forEach(function (key) {
        if (key !== 'src') {
          _this3.videoConfig[key] = originVideoConfig[key];
        }
      });
      this.videoConfig.changeWatchable = true;
      this.binder.migrateKernelEvent(oldKernel, kernel);
      this.kernel = kernel;
      this.silentLoadTempKernel = undefined;
      var isLive = config.isLive,
          box = config.box,
          preset = config.preset,
          kernels = config.kernels;
      Object.assign(this.videoConfig, {
        isLive: isLive,
        box: box,
        preset: preset,
        kernels: kernels
      });
      oldKernel.destroy();

      if (notifyChange) {
        if (this.binder && this.binder.bindEventOnVideo) {
          this.binder.bindEventOnVideo(video);
        }
      } else {
        setTimeout(function () {
          if (_this3.binder && _this3.binder.bindEventOnVideo) {
            _this3.binder.bindEventOnVideo(video);
          }
        });
      }

      if (this.inPictureInPictureMode) {
        this.exitPictureInPicture();
      }
    }
  }, {
    key: "throwError",
    value: function throwError(error) {
      this.vm.customThrowError(error);
    }
  }, {
    key: "unuse",
    value: function unuse(id) {
      var plugin = this.plugins[id];

      if (!plugin) {
        delete this.plugins[id];
        return;
      }

      plugin.$destroy();
      var orderIndex = this.order.indexOf(id);

      if (orderIndex > -1) {
        this.order.splice(orderIndex, 1);
      }

      delete this.plugins[id];
      delete this.vm[id];
    }
  }, {
    key: "use",
    value: function use(option) {
      if (_isString(option)) {
        option = {
          name: option,
          alias: undefined
        };
      }

      if (!_isPlainObject(option) || _isPlainObject(option) && !_isString(option.name)) {
        throw new TypeError('pluginConfig do not match requirement');
      }

      if (!_isString(option.alias)) {
        option.alias = undefined;
      }

      var _option2 = option,
          name = _option2.name,
          alias = _option2.alias;
      option.name = alias || name;
      delete option.alias;
      var key = toxicUtils.camelize(name);
      var id = toxicUtils.camelize(alias || name);
      var pluginOption = option;
      var pluginConfig = Dispatcher.getPluginConfig(key);

      if (!pluginConfig) {
        throw new TypeError('You have not installed plugin ' + key);
      }

      if (_isPlainObject(pluginConfig)) {
        pluginConfig.id = id;
      }

      var plugin = _isFunction(pluginConfig) ? new pluginConfig({
        id: id
      }, this, pluginOption) : new ChimeePlugin(pluginConfig, this, pluginOption);
      this.plugins[id] = plugin;
      Object.defineProperty(this.vm, id, {
        configurable: true,
        enumerable: false,
        value: plugin,
        writable: false
      });
      this.order.push(id);
      this.sortZIndex();

      if (this.videoConfigReady) {
        plugin.runInitedHook();
      }

      return plugin.ready;
    }
  }, {
    key: "autoloadVideoSrcAtFirst",
    value: function autoloadVideoSrcAtFirst() {
      if (this.videoConfig.autoload) {
        if (process.env.NODE_ENV !== 'prodution' && !this.videoConfig.src) {
          chimeeHelperLog.chimeeLog.warn('You have not set the src, so you better set autoload to be false. Accroding to https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#src.');
          return;
        }

        this.binder.emit({
          id: 'dispatcher',
          name: 'load',
          target: 'plugin'
        }, {
          src: this.videoConfig.src
        });
      }
    }
  }, {
    key: "changeUnwatchable",
    value: function changeUnwatchable(object, property, value) {
      this.changeWatchable = false;
      object[property] = value;
      this.changeWatchable = true;
    }
  }, {
    key: "createKernel",
    value: function createKernel(video, config) {
      var kernels = config.kernels,
          preset = config.preset;

      if (process.env.NODE_ENV !== 'production' && _isEmpty(kernels) && !_isEmpty(preset)) {
        chimeeHelperLog.chimeeLog.warn('preset will be deprecated in next major version, please use kernels instead.');
      }

      var presetConfig = {};
      var newPreset = {};

      if (_isArray(kernels)) {
        newPreset = kernels.reduce(function (kernels, keyOrSKC) {
          if (_isString(keyOrSKC)) {
            if (!isSupportedKernelType(keyOrSKC)) {
              throw new Error("We have not support ".concat(keyOrSKC, " kernel type"));
            }

            var kernelFn = kernelsSet[keyOrSKC];

            if (!_isFunction(kernelFn)) {
              chimeeHelperLog.chimeeLog.warn("You have not installed kernel for ".concat(keyOrSKC, "."));
              return kernels;
            }

            kernels[keyOrSKC] = kernelFn;
            return kernels;
          }

          if (_isPlainObject(keyOrSKC)) {
            var name = keyOrSKC.name,
                handler = keyOrSKC.handler;

            if (_isString(handler)) {
              if (!isSupportedKernelType(handler)) {
                throw new Error("We have not support ".concat(handler, " kernel type"));
              }

              var _kernelFn = kernelsSet[handler];

              if (!_isFunction(_kernelFn)) {
                chimeeHelperLog.chimeeLog.warn("You have not installed kernel for ".concat(handler, "."));
                return kernels;
              }

              kernels[handler] = _kernelFn;
              presetConfig[handler] = keyOrSKC;
              return kernels;
            }

            if (_isFunction(handler)) {
              var kernelName = name || handler.name;

              if (!isSupportedKernelType(kernelName)) {
                throw new Error("We have not support ".concat(kernelName, " kernel type"));
              }

              kernels[kernelName] = handler;
              presetConfig[kernelName] = keyOrSKC;
              return kernels;
            }

            chimeeHelperLog.chimeeLog.warn("When you pass in an SingleKernelConfig in Array, you must clarify it's handler, we only support handler in string or function but not ".concat(_typeof(handler)));
            return kernels;
          }

          chimeeHelperLog.chimeeLog.warn("If you pass in kernels as array, you must pass in kernels in string or function, but not ".concat(_typeof(keyOrSKC)));
          return kernels;
        }, {});
      } else {
        Object.keys(kernels || {}).forEach(function (key) {
          var fnOrSKC = kernels[key];

          if (_isFunction(fnOrSKC)) {
            var fn = fnOrSKC;
            newPreset[key] = fn;
            return;
          }

          if (_isPlainObject(fnOrSKC)) {
            var SKC = fnOrSKC;
            var handler = SKC.handler;

            if (_isString(handler)) {
              if (!isSupportedKernelType(handler)) {
                throw new Error("We have not support ".concat(handler, " kernel type"));
              }

              var kernelFn = kernelsSet[handler];

              if (!_isFunction(kernelFn)) {
                chimeeHelperLog.chimeeLog.warn("You have not installed kernel for ".concat(handler, "."));
                return;
              }

              newPreset[key] = kernelFn;
              presetConfig[key] = SKC;
              return;
            }

            if (_isFunction(handler)) {
              newPreset[key] = handler;
              presetConfig[key] = SKC;
              return;
            }

            chimeeHelperLog.chimeeLog.warn("When you pass in an SingleKernelConfig in Object, you must clarify it's handler, we only support handler in string or function but not ".concat(_typeof(handler)));
            return;
          }

          chimeeHelperLog.chimeeLog.warn("If you pass in kernels as object, you must pass in kernels in string or function, but not ".concat(_typeof(fnOrSKC)));
          return kernels;
        });
      }

      config.preset = Object.assign(newPreset, preset);
      var legalConfig = Object.assign(config, {
        presetConfig: presetConfig
      });
      var kernel = new ChimeeKernel(video, legalConfig);
      return kernel;
    }
  }, {
    key: "getTopLevel",
    value: function getTopLevel(inner) {
      var arr = this.zIndexMap[inner ? 'inner' : 'outer'];
      var plugin = this.plugins[arr[arr.length - 1]];
      return _isEmpty(plugin) ? 0 : plugin.$level;
    }
  }, {
    key: "initUserPlugin",
    value: function initUserPlugin() {
      var _this4 = this;

      var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!_isArray(configs)) {
        if (process.env.NODE_ENV !== 'production') {
          chimeeHelperLog.chimeeLog.warn('Dispatcher', "UserConfig.plugin can only by an Array, but not \"".concat(configs, "\" in ").concat(_typeof(configs)));
        }

        configs = [];
      }

      return configs.map(function (config) {
        return _this4.use(config);
      });
    }
  }, {
    key: "sortZIndex",
    value: function sortZIndex() {
      var _this5 = this;

      var _this$order$reduce = this.order.reduce(function (levelSet, key) {
        var plugin = _this5.plugins[key];

        if (_isEmpty(plugin)) {
          return levelSet;
        }

        var set = levelSet[plugin.$inner ? 'inner' : 'outer'];
        var level = plugin.$level;
        set[level] = set[level] || [];
        set[level].push(key);
        return levelSet;
      }, {
        inner: {},
        outer: {}
      }),
          inner = _this$order$reduce.inner,
          outer = _this$order$reduce.outer;

      inner[0] = inner[0] || [];
      inner[0].unshift('videoElement');
      outer[0] = outer[0] || [];
      outer[0].unshift('container');
      var innerOrderArr = transObjectAttrIntoArray(inner);
      var outerOrderArr = transObjectAttrIntoArray(outer);
      this.dom.setPluginsZIndex(innerOrderArr);
      this.dom.setPluginsZIndex(outerOrderArr);
      this.zIndexMap.inner = innerOrderArr;
      this.zIndexMap.outer = outerOrderArr;
    }
  }, {
    key: "inPictureInPictureMode",
    get: function get() {
      return 'pictureInPictureEnabled' in document ? this.dom.videoElement === document.pictureInPictureElement : Boolean(this.plugins.pictureInPicture && this.plugins.pictureInPicture.isShown);
    }
  }], [{
    key: "getPluginConfig",
    value: function getPluginConfig(id) {
      return pluginConfigSet[id];
    }
  }, {
    key: "hasInstalled",
    value: function hasInstalled(id) {
      return !!pluginConfigSet[id];
    }
  }, {
    key: "hasInstalledKernel",
    value: function hasInstalledKernel(key) {
      return _isFunction(kernelsSet[key]);
    }
  }, {
    key: "install",
    value: function install(config) {
      var name = config.name;
      var id = toxicUtils.camelize(name);

      if (pluginConfigSet[id]) {
        if (process.env.NODE_ENV !== 'production') {
          chimeeHelperLog.chimeeLog.warn('Dispatcher', 'You have installed ' + name + ' again. And the older one will be replaced');
        }
      }

      var pluginConfig = _isFunction(config) ? config : Object.assign({}, config, {
        id: id
      });
      pluginConfigSet[id] = pluginConfig;
      return id;
    }
  }, {
    key: "installKernel",
    value: function installKernel(key, value) {
      var tasks = _isPlainObject(key) ? Object.entries(key) : [[key, value]];
      tasks.forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        if (!_isFunction(value)) {
          throw new Error("The kernel you install on ".concat(key, " must be a Function, but not ").concat(_typeof(value)));
        }

        if (_isFunction(kernelsSet[key])) {
          chimeeHelperLog.chimeeLog.warn("You have alrady install a kernel on ".concat(key, ", and now we will replace it"));
        }

        kernelsSet[key] = value;
      });
    }
  }, {
    key: "uninstall",
    value: function uninstall(id) {
      delete pluginConfigSet[id];
    }
  }, {
    key: "uninstallKernel",
    value: function uninstallKernel(key) {
      delete kernelsSet[key];
    }
  }]);

  return Dispatcher;
}();

__decorate$6([toxicDecorators.nonenumerable], Dispatcher.prototype, "inPictureInPictureMode", null);

__decorate$6([toxicDecorators.before(convertNameIntoId)], Dispatcher.prototype, "hasUsed", null);

__decorate$6([toxicDecorators.autobind], Dispatcher.prototype, "throwError", null);

__decorate$6([toxicDecorators.before(convertNameIntoId)], Dispatcher.prototype, "unuse", null);

__decorate$6([toxicDecorators.before(convertNameIntoId)], Dispatcher, "getPluginConfig", null);

__decorate$6([toxicDecorators.before(convertNameIntoId)], Dispatcher, "hasInstalled", null);

__decorate$6([toxicDecorators.before(checkPluginConfig)], Dispatcher, "install", null);

__decorate$6([toxicDecorators.before(convertNameIntoId)], Dispatcher, "uninstall", null);

var Chimee =
/*#__PURE__*/
function (_VideoWrapper) {
  _inherits(Chimee, _VideoWrapper);

  function Chimee(rawConfig) {
    var _this;

    _classCallCheck(this, Chimee);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Chimee).call(this, {
      id: '_vm'
    }));
    _this.config = {
      errorHandler: undefined
    };
    _this.destroyed = false;
    _this.version = '1.0.1-alpha.0';
    var config;

    if (process.env.NODE_ENV !== 'production' && !_isFunction(Object.defineProperty)) {
      chimeeHelperLog.chimeeLog.error('Chimee', 'We detect that this browser lack of Object.defineProperty. Chimee can\'t run on this browser');
    }

    if (process.env.NODE_ENV !== 'production' && typeof Promise === 'undefined') {
      chimeeHelperLog.chimeeLog.error('Chimee', 'We detect that this browser lack of Promise. If you are running Chimee in old browser. Please make sure you have import polyfill such as babel-polyfill.');
    }

    if (_isString(rawConfig) || toxicPredicateFunctions.isElement(rawConfig)) {
      config = {
        controls: true,
        wrapper: rawConfig
      };
    } else if (_isPlainObject(rawConfig)) {
      if (!rawConfig.wrapper) {
        throw new Error('You must pass in an legal object');
      }

      config = rawConfig;
    } else {
      throw new Error('You must pass in an Object containing wrapper or string or element to new a Chimee');
    }

    _this.dispatcher = new Dispatcher(config, _assertThisInitialized(_this));
    _this.ready = _this.dispatcher.ready;
    _this.readySync = _this.dispatcher.readySync;

    _this.wrapAsVideo(_this.dispatcher.videoConfig);

    return _this;
  }

  _createClass(Chimee, [{
    key: "customThrowError",
    value: function customThrowError(error) {
      if (_isString(error)) {
        error = new Error(error);
      }

      var errorHandler = this.config.errorHandler || Chimee.config.errorHandler;

      if (_isFunction(errorHandler)) {
        return errorHandler(error);
      }

      if (Chimee.config.silent) {
        return;
      }

      if (_isError(error)) {
        throw error;
      } else {
        console.error(error);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.destroyed) {
        return;
      }

      _get(_getPrototypeOf(Chimee.prototype), "destroyVideoWrapper", this).call(this);

      this.dispatcher.destroy();
      Object.defineProperty(this, 'dispatcher', {
        configurable: true,
        enumerable: true,
        get: function get() {
          throw new Error('This instance has been destroyed.');
        }
      });
      this.destroyed = true;
    }
  }, {
    key: "unuse",
    value: function unuse(name) {
      return this.dispatcher.unuse(name);
    }
  }, {
    key: "use",
    value: function use(option) {
      return this.dispatcher.use(option);
    }
  }], [{
    key: "registerEvents",
    value: function registerEvents() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          name = _ref.name,
          target = _ref.target;

      if (!name || !_isString(name)) {
        throw new Error("The event name must be a string, but not ".concat(_typeof(name)));
      }

      if (!target || !_isString(target)) {
        throw new Error("The event target must be a string, but not ".concat(_typeof(target)));
      }

      if (target === 'kernel') {
        kernelEvents.push(name);
      }
    }
  }]);

  return Chimee;
}(VideoWrapper);
Chimee.config = new GlobalConfig();
Chimee.getPluginConfig = Dispatcher.getPluginConfig;
Chimee.hasInstalled = Dispatcher.hasInstalled;
Chimee.hasInstalledKernel = Dispatcher.hasInstalledKernel;
Chimee.install = Dispatcher.install;
Chimee.installKernel = Dispatcher.installKernel;
Chimee.plugin = ChimeePlugin;
Chimee.uninstall = Dispatcher.uninstall;
Chimee.uninstallKernel = Dispatcher.uninstallKernel;

module.exports = Chimee;
