
/**
 * chimee-plugin-gesture v0.0.13
 * (c) 2017 yandeqiang
 * Released under ISC
 */

'use strict';

var chimeeHelper = require('chimee-helper');

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classCallCheck = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _global$1 = /*#__PURE__*/Object.freeze({
	default: _global,
	__moduleExports: _global
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _core$1 = /*#__PURE__*/Object.freeze({
	default: _core,
	__moduleExports: _core,
	version: _core_1
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

var _aFunction$1 = /*#__PURE__*/Object.freeze({
	default: _aFunction,
	__moduleExports: _aFunction
});

var aFunction = ( _aFunction$1 && _aFunction ) || _aFunction$1;

// optional / simple context binding

var _ctx = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _ctx$1 = /*#__PURE__*/Object.freeze({
	default: _ctx,
	__moduleExports: _ctx
});

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _isObject$1 = /*#__PURE__*/Object.freeze({
	default: _isObject,
	__moduleExports: _isObject
});

var isObject = ( _isObject$1 && _isObject ) || _isObject$1;

var _anObject = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _anObject$1 = /*#__PURE__*/Object.freeze({
	default: _anObject,
	__moduleExports: _anObject
});

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

var _fails$1 = /*#__PURE__*/Object.freeze({
	default: _fails,
	__moduleExports: _fails
});

var require$$1 = ( _fails$1 && _fails ) || _fails$1;

// Thank's IE8 for his funny defineProperty
var _descriptors = !require$$1(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var _descriptors$1 = /*#__PURE__*/Object.freeze({
	default: _descriptors,
	__moduleExports: _descriptors
});

var require$$0 = ( _global$1 && _global ) || _global$1;

var document = require$$0.document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _domCreate$1 = /*#__PURE__*/Object.freeze({
	default: _domCreate,
	__moduleExports: _domCreate
});

var require$$0$1 = ( _descriptors$1 && _descriptors ) || _descriptors$1;

var require$$2 = ( _domCreate$1 && _domCreate ) || _domCreate$1;

var _ie8DomDefine = !require$$0$1 && !require$$1(function () {
  return Object.defineProperty(require$$2('div'), 'a', { get: function () { return 7; } }).a != 7;
});

var _ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
	default: _ie8DomDefine,
	__moduleExports: _ie8DomDefine
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var _toPrimitive$1 = /*#__PURE__*/Object.freeze({
	default: _toPrimitive,
	__moduleExports: _toPrimitive
});

var anObject = ( _anObject$1 && _anObject ) || _anObject$1;

var IE8_DOM_DEFINE = ( _ie8DomDefine$1 && _ie8DomDefine ) || _ie8DomDefine$1;

var toPrimitive = ( _toPrimitive$1 && _toPrimitive ) || _toPrimitive$1;

var dP = Object.defineProperty;

var f = require$$0$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _objectDp$1 = /*#__PURE__*/Object.freeze({
	default: _objectDp,
	__moduleExports: _objectDp,
	f: f
});

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _propertyDesc$1 = /*#__PURE__*/Object.freeze({
	default: _propertyDesc,
	__moduleExports: _propertyDesc
});

var dP$1 = ( _objectDp$1 && _objectDp ) || _objectDp$1;

var createDesc = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

var _hide = require$$0$1 ? function (object, key, value) {
  return dP$1.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var _hide$1 = /*#__PURE__*/Object.freeze({
	default: _hide,
	__moduleExports: _hide
});

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _has$1 = /*#__PURE__*/Object.freeze({
	default: _has,
	__moduleExports: _has
});

var core = ( _core$1 && _core ) || _core$1;

var ctx = ( _ctx$1 && _ctx ) || _ctx$1;

var hide = ( _hide$1 && _hide ) || _hide$1;

var has = ( _has$1 && _has ) || _has$1;

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? require$$0 : IS_STATIC ? require$$0[name] : (require$$0[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, require$$0)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var _export$1 = /*#__PURE__*/Object.freeze({
	default: _export,
	__moduleExports: _export
});

var $export$1 = ( _export$1 && _export ) || _export$1;

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export$1($export$1.S + $export$1.F * !require$$0$1, 'Object', { defineProperty: dP$1.f });

var $Object = core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = /*#__PURE__*/Object.freeze({
	default: defineProperty,
	__moduleExports: defineProperty
});

var require$$0$2 = ( defineProperty$1 && defineProperty ) || defineProperty$1;

var defineProperty$2 = createCommonjsModule(function (module) {
module.exports = { "default": require$$0$2, __esModule: true };
});

var defineProperty$3 = unwrapExports(defineProperty$2);

var defineProperty$4 = /*#__PURE__*/Object.freeze({
	default: defineProperty$3,
	__moduleExports: defineProperty$2
});

var _defineProperty = ( defineProperty$4 && defineProperty$3 ) || defineProperty$4;

var createClass = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

function getDistance(x, y, x1, y1) {

  return Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
}

function getSpeed(s, t) {
  return s / t;
}

function isArray(arr) {
  return Array.isArray(arr);
}

var Gesture = function () {
  function Gesture() {
    _classCallCheck(this, Gesture);

    // this.events = events;
    // ['tap', 'swipe', 'panstart', 'panmove', 'panend', 'press'].forEach(item => {
    //   this[item] = events[item].bind(host);
    // })

    // 手势该有的几个状态
    // swipe tapping pressing

    this.startTime = 0;
    this.endTime = 0;
    this.event = {};
    this.status = '';
  }

  _createClass(Gesture, [{
    key: 'touchstart',
    value: function touchstart(evt) {
      // 当前 touch 点
      this.startTouch = evt.changedTouches[0];

      // 开始时间
      this.startTime = Date.now();

      this.status = 'tapping';
    }
  }, {
    key: 'touchmove',
    value: function touchmove(evt) {

      var touch = evt.changedTouches[0];

      var distance = getDistance(this.startTouch.clientX, this.startTouch.clientY, touch.clientX, touch.clientY);

      if (this.status === 'tapping' && distance > 10) {
        this.status = 'panning';
        this.fire('panstart', evt);
      } else if (this.status === 'panning') {
        this.fire('panmove', evt);
      }
    }
  }, {
    key: 'touchend',
    value: function touchend(evt) {
      evt.preventDefault(); // 防止 300ms click 事件 chimeejs/chimee-mobile-player#32
      this.endTouch = evt.changedTouches[0];

      var time = Date.now();
      var distance = getDistance(this.startTouch.clientX, this.startTouch.clientY, this.endTouch.clientX, this.endTouch.clientY);
      var interval = time - this.startTime;

      // 时间 <= 250ms 距离小于 10 px 则认为是 tap
      if (interval <= 250 && distance < 10) {
        this.fire('tap', evt);
        time - this.endTime < 300 && this.fire('doubletap', evt);
      }

      // 时间 > 250ms 距离小于 10 px 则认为是 press
      interval > 250 && distance < 10 && this.fire('press', evt);

      var speed = getSpeed(distance, interval);

      // 距离大于 10 px , 速度大于 0.3 则认为是 swipe
      speed > 0.3 && distance >= 10 && this.fire('swipe', evt);

      // 处于 panning 则触发 panend 事件
      this.status === 'panning' && this.fire('panend', evt);

      this.endTime = Date.now();
    }
  }, {
    key: 'touchcancel',
    value: function touchcancel(evt) {}
  }, {
    key: 'on',
    value: function on(type, func) {
      if (isArray(this.event[type])) {
        this.event[type].push(func);
      } else {
        this.event[type] = [func];
      }
    }
  }, {
    key: 'fire',
    value: function fire(type, evt) {
      if (!isArray(this.event[type])) return;
      this.event[type].forEach(function (item) {
        item(evt);
      });
    }
  }]);

  return Gesture;
}();

var baseMobileEvent = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
var supportGesture = ['tap', 'swipe', 'panstart', 'panmove', 'panend', 'press', 'doubletap'];
function gestureFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$name = _ref.name,
      name = _ref$name === undefined ? 'chimeeGesture' : _ref$name,
      el = _ref.el,
      _ref$level = _ref.level,
      level = _ref$level === undefined ? 0 : _ref$level,
      _ref$inner = _ref.inner,
      inner = _ref$inner === undefined ? true : _ref$inner,
      autoFocus = _ref.autoFocus,
      className = _ref.className,
      _beforeCreate = _ref.beforeCreate,
      _create = _ref.create,
      init = _ref.init,
      inited = _ref.inited,
      _destroy = _ref.destroy,
      data = _ref.data,
      computed = _ref.computed,
      _ref$events = _ref.events,
      events = _ref$events === undefined ? {} : _ref$events,
      _ref$methods = _ref.methods,
      methods = _ref$methods === undefined ? {} : _ref$methods,
      _ref$penetrate = _ref.penetrate,
      penetrate = _ref$penetrate === undefined ? false : _ref$penetrate,
      _ref$operable = _ref.operable,
      operable = _ref$operable === undefined ? true : _ref$operable;

  return {
    name: name,
    el: el,
    level: level,
    inner: inner,
    autoFocus: autoFocus,
    className: className,
    data: data,
    computed: computed,
    beforeCreate: function beforeCreate(config) {
      var _this = this;

      this.gesture = new Gesture();
      this.c_gesture = new Gesture();
      this.w_gesture = new Gesture();
      this.d_gesture = new Gesture();
      baseMobileEvent.forEach(function (item) {
        config.events[item] = function (evt) {
          _this.gesture[item](evt);
        };
        config.events['c_' + item] = function (evt) {
          _this.c_gesture[item](evt);
        };
        config.events['w_' + item] = function (evt) {
          _this.w_gesture[item](evt);
        };
      });

      supportGesture.forEach(function (item) {
        _this.gesture.on(item, function (evt) {
          var func = config.events[item];
          func && func.call(_this, evt);
        });
        _this.c_gesture.on(item, function (evt) {
          var func = config.events['c_' + item];
          func && func.call(_this, evt);
        });
        _this.w_gesture.on(item, function (evt) {
          var func = config.events['w_' + item];
          func && func.call(_this, evt);
        });
        _this.d_gesture.on(item, function (evt) {
          var func = config.events['d_' + item];
          func && func.call(_this, evt);
        });
      });

      _beforeCreate && _beforeCreate.call(this);
    },
    create: function create() {
      var _this2 = this;

      this._i = this._i || 0;
      this._i++;
      baseMobileEvent.forEach(function (item) {
        var key = '__' + item;
        _this2[key] = function (evt) {
          _this2.d_gesture[item](evt);
        };
        chimeeHelper.addEvent(_this2.$dom, item, _this2[key]);
      });

      _create && _create.call(this);
    },

    init: init,
    inited: inited,
    destroy: function destroy() {
      var _this3 = this;

      baseMobileEvent.forEach(function (item) {
        var key = '__' + item;
        chimeeHelper.removeEvent(_this3.$dom, item, _this3[key]);
      });

      _destroy && _destroy.call(this);
    },

    methods: methods,
    penetrate: penetrate,
    operable: operable,
    events: events
  };
}

module.exports = gestureFactory;
