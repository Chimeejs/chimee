
/**
 * chimee-kernel-hls v1.1.0
 * (c) 2017 songguangyu
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
var _Object$getOwnPropertyDescriptors = _interopDefault(require('babel-runtime/core-js/object/get-own-property-descriptors'));
var _Array$from = _interopDefault(require('babel-runtime/core-js/array/from'));
var _Object$getOwnPropertySymbols = _interopDefault(require('babel-runtime/core-js/object/get-own-property-symbols'));
var _Object$getOwnPropertyNames = _interopDefault(require('babel-runtime/core-js/object/get-own-property-names'));
var _Object$defineProperty = _interopDefault(require('babel-runtime/core-js/object/define-property'));
var _Object$keys = _interopDefault(require('babel-runtime/core-js/object/keys'));
var _Number$isInteger = _interopDefault(require('babel-runtime/core-js/number/is-integer'));
var _Number$parseFloat = _interopDefault(require('babel-runtime/core-js/number/parse-float'));
var _toConsumableArray = _interopDefault(require('babel-runtime/helpers/toConsumableArray'));
var _slicedToArray = _interopDefault(require('babel-runtime/helpers/slicedToArray'));
var _WeakMap = _interopDefault(require('babel-runtime/core-js/weak-map'));
var _Promise = _interopDefault(require('babel-runtime/core-js/promise'));
var _defineProperty = _interopDefault(require('babel-runtime/helpers/defineProperty'));
var _Object$preventExtensions = _interopDefault(require('babel-runtime/core-js/object/prevent-extensions'));

var defaultCustomConfig = {
  debug: false,
  enableWorker: true
};

/**
 * toxic-predicate-functions v0.1.5
 * (c) 2017 toxic-johann
 * Released under MIT
 */

/**
 * is void element or not ? Means it will return true when val is undefined or null
 */
function isVoid(obj) {
  return obj === undefined || obj === null;
}
/**
 * to check whether a variable is array
 */
function isArray(arr) {
  return Array.isArray(arr);
}

/**
 * is it a function or not
 */
function isFunction(obj) {
  return typeof obj === 'function';
}

/**
 * to tell you if it's a real number
 */
function isNumber(obj) {
  return typeof obj === 'number';
}
/**
 * is it a string
 */
function isString(str) {
  return typeof str === 'string' || str instanceof String;
}
/**
 * is Boolean or not
 */
function isBoolean(bool) {
  return typeof bool === 'boolean';
}
/**
 * is Primitive type or not, whick means it will return true when data is number/string/boolean/undefined/null
 */
function isPrimitive(val) {
  return isVoid(val) || isBoolean(val) || isString(val) || isNumber(val);
}

/**
 * toxic-utils v0.1.6
 * (c) 2017 toxic-johann
 * Released under MIT
 */

/**
 * bind the function with some context. we have some fallback strategy here
 * @param {function} fn the function which we need to bind the context on
 * @param {any} context the context object
 */
function bind(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else if (fn.apply) {
    return function __autobind__() {
      for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return fn.apply(context, args);
    };
  } else {
    return function __autobind__() {
      for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return fn.call.apply(fn, [context].concat(_toConsumableArray(args)));
    };
  }
}

/**
 * toxic-decorators v0.3.8
 * (c) 2017 toxic-johann
 * Released under GPL-3.0
 */

var getOwnPropertyDescriptor = _Object$getOwnPropertyDescriptor;
/**
 * to check if the descirptor is an data descriptor
 * @param {descriptor} desc it should be a descriptor better
 */
function isDataDescriptor(desc) {
  return !!desc && desc.hasOwnProperty('value') && isBoolean(desc.configurable) && isBoolean(desc.enumerable) && isBoolean(desc.writable);
}
/**
 * set one value on the object
 * @param {string} key
 */
function createDefaultSetter(key) {
  return function set(newValue) {
    _Object$defineProperty(this, key, {
      configurable: true,
      writable: true,
      // IS enumerable when reassigned by the outside word
      enumerable: true,
      value: newValue
    });
    return newValue;
  };
}

function getOwnKeysFn() {
  var getOwnPropertyNames = _Object$getOwnPropertyNames,
      getOwnPropertySymbols = _Object$getOwnPropertySymbols;

  return isFunction(getOwnPropertySymbols) ? function (obj) {
    // $FlowFixMe: do not support symwbol yet
    return _Array$from(getOwnPropertyNames(obj).concat(getOwnPropertySymbols(obj)));
  } : getOwnPropertyNames;
}

var getOwnKeys = getOwnKeysFn();

function getOwnPropertyDescriptorsFn() {
  // $FlowFixMe: In some environment, Object.getOwnPropertyDescriptors has been implemented;
  return isFunction(_Object$getOwnPropertyDescriptors) ? _Object$getOwnPropertyDescriptors : function (obj) {
    return getOwnKeys(obj).reduce(function (descs, key) {
      descs[key] = getOwnPropertyDescriptor(obj, key);
      return descs;
    }, {});
  };
}

var getOwnPropertyDescriptors = getOwnPropertyDescriptorsFn();

var defineProperty$1 = _Object$defineProperty;

function classify(decorator) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      requirement = _ref.requirement,
      _ref$customArgs = _ref.customArgs,
      customArgs = _ref$customArgs === undefined ? false : _ref$customArgs;

  return function () {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$exclude = _ref2.exclude,
        exclude = _ref2$exclude === undefined ? [] : _ref2$exclude,
        _ref2$include = _ref2.include,
        include = _ref2$include === undefined ? [] : _ref2$include,
        _ref2$construct = _ref2.construct,
        construct = _ref2$construct === undefined ? false : _ref2$construct,
        _ref2$self = _ref2.self,
        self = _ref2$self === undefined ? false : _ref2$self;

    if (!isArray(exclude)) throw new TypeError('options.exclude must be an array');
    if (!isArray(include)) throw new TypeError('options.include must be an array');
    return function (Klass) {
      var isClass = isFunction(Klass);
      if (!self && !isClass) throw new TypeError('@' + decorator.name + 'Class can only be used on class');
      if (self && isPrimitive(Klass)) throw new TypeError('@' + decorator.name + 'Class must be used on non-primitive type value in \'self\' mode');
      var prototype = self ? Klass : Klass.prototype;
      if (isVoid(prototype)) throw new Error('The prototype of the ' + Klass.name + ' is empty, please check it');
      var descs = getOwnPropertyDescriptors(prototype);
      getOwnKeys(prototype).concat(include).forEach(function (key) {
        var desc = descs[key];
        if (key === 'constructor' && !construct || self && isClass && ['name', 'length', 'prototype'].indexOf(key) > -1 || exclude.indexOf(key) > -1 || isFunction(requirement) && requirement(prototype, key, desc, { self: self }) === false) return;
        defineProperty$1(prototype, key, (customArgs ? decorator.apply(undefined, _toConsumableArray(args)) : decorator)(prototype, key, desc));
      });
    };
  };
}

var autobindClass = classify(autobind, {
  requirement: function requirement(obj, prop, desc) {
    // $FlowFixMe: it's data descriptor now
    return isDataDescriptor(desc) && isFunction(desc.value);
  }
});

var mapStore = void 0;
// save bound function for super
function getBoundSuper(obj, fn) {
  if (typeof _WeakMap === 'undefined') {
    throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()');
  }

  if (!mapStore) {
    mapStore = new _WeakMap();
  }

  if (mapStore.has(obj) === false) {
    mapStore.set(obj, new _WeakMap());
  }

  var superStore = mapStore.get(obj);
  // $FlowFixMe: already insure superStore is not undefined
  if (superStore.has(fn) === false) {
    // $FlowFixMe: already insure superStore is not undefined
    superStore.set(fn, bind(fn, obj));
  }
  // $FlowFixMe: already insure superStore is not undefined
  return superStore.get(fn);
}
/**
 * auto bind the function on the class, just support function
 * @param {Object} obj Target Object
 * @param {string} prop prop strong
 * @param {Object} descriptor
 */
function autobind(obj, prop, descriptor) {
  if (arguments.length === 1) return autobindClass()(obj);

  var _ref = descriptor || {},
      fn = _ref.value,
      configurable = _ref.configurable;

  if (!isFunction(fn)) {
    throw new TypeError('@autobind can only be used on functions, not "' + fn + '" in ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) + ' on property "' + prop + '"');
  }
  var constructor = obj.constructor;

  return {
    configurable: configurable,
    enumerable: false,
    get: function get() {
      var _this = this;

      var boundFn = function boundFn() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return fn.call.apply(fn, [_this].concat(_toConsumableArray(args)));
      };
      // Someone accesses the property directly on the prototype on which it is
      // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
      if (this === obj) {
        return fn;
      }
      // Someone accesses the property directly on a prototype,
      // but it was found up the chain, not defined directly on it
      // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
      if (this.constructor !== constructor && _Object$getPrototypeOf(this).constructor === constructor) {
        return fn;
      }

      // Autobound method calling super.sameMethod() which is also autobound and so on.
      if (this.constructor !== constructor && prop in this.constructor.prototype) {
        return getBoundSuper(this, fn);
      }
      _Object$defineProperty(this, prop, {
        configurable: true,
        writable: true,
        // NOT enumerable when it's a bound method
        enumerable: false,
        value: boundFn
      });

      return boundFn;
    },

    set: createDefaultSetter(prop)
  };
}

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

    _this.version = '1.1.0';

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
      chimeeHelper.Log.error(LOG_TAG + (event ? ' ' + event : ''), data.details);
    }
  }]);

  return Hls;
}(chimeeHelper.CustEvent), _applyDecoratedDescriptor(_class.prototype, 'hlsErrorHandler', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'hlsErrorHandler'), _class.prototype), _class);

module.exports = Hls;
