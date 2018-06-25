'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var gestureFactory = _interopDefault(require('chimee-plugin-gesture'));
var toxicDecorators = require('toxic-decorators');
var chimeeHelper = require('chimee-helper');

__$styleInject("container{position:relative;-webkit-tap-highlight-color:rgba(255,255,255,0)}container,video{display:block;width:100%;height:100%;background:#000;outline:none}video:focus{outline:none}.chimee-flex-component svg:hover g,.chimee-flex-component svg g{fill:#fff;stroke:#fff}chimee-clarity-list,chimee-control-state-pause,chimee-control-state-play,chimee-screen-full,chimee-screen-small{display:none}chimee-control.full chimee-screen-full,chimee-control.pause chimee-control-state-pause,chimee-control.play chimee-control-state-play,chimee-control.small chimee-screen-small{display:inline-block;width:1.4em;height:100%}chimee-control{position:absolute;bottom:0;left:0;display:block;width:100%;height:4em;font-size:10px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;font-family:Roboto,Arial,Helvetica,sans-serif;-webkit-transition:visibility .5s ease;transition:visibility .5s ease}chimee-control:focus{outline:none}chimee-control-wrap{position:absolute;left:0;bottom:0;width:100%;height:4em;line-height:4em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;background:rgba(0,0,0,.5);-webkit-transition:bottom .5s ease;transition:bottom .5s ease;pointer-events:auto}.chimee-flex-component{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;height:4em;cursor:pointer}.chimee-flex-component svg{vertical-align:middle;width:1.8em;height:1.8em}chimee-control-state.chimee-flex-component{-ms-flex-preferred-size:3em;flex-basis:3em;text-align:right;margin-right:1em}chimee-control-state .left,chimee-control-state .right{-webkit-transition:d .2s ease-in-out;transition:d .2s ease-in-out}chimee-current-time.chimee-flex-component,chimee-total-time.chimee-flex-component{color:#fff;font-size:1.5em;font-weight:400;text-align:center;white-space:nowrap}chimee-current-time+chimee-total-time:before{content:\"/\";padding:4px}chimee-progressbar.chimee-flex-component{position:relative;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;margin:0 1.5em}.chimee-progressbar-line{position:absolute;top:1.8em;left:0;display:inline-block;height:8px;border-radius:4px}chimee-progressbar-bg{width:100%;background:#4c4c4c}chimee-progressbar-buffer{width:0;background:#6f6f6f}chimee-progressbar-all{background:#de698c}chimee-progressbar-ball{content:\"\";position:absolute;right:-1em;top:-.4em;display:inline-block;width:1.4em;height:1.4em;border-radius:1.4em;background:#fff;pointer-events:none}chimee-screen.chimee-flex-component{-ms-flex-preferred-size:3em;flex-basis:3em;text-align:left;margin-left:1em}", undefined);

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
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

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
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
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
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

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var keys$1 = _core.Object.keys;

var keys = createCommonjsModule(function (module) {
module.exports = { "default": keys$1, __esModule: true };
});

var _Object$keys = unwrapExports(keys);

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$1 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

// 19.1.2.9 Object.getPrototypeOf(O)



_objectSap('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

var getPrototypeOf$1 = _core.Object.getPrototypeOf;

var getPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": getPrototypeOf$1, __esModule: true };
});

var _Object$getPrototypeOf = unwrapExports(getPrototypeOf);

var classCallCheck = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty$2 = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$2, __esModule: true };
});

unwrapExports(defineProperty);

var createClass = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty);

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

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _redefine = _hide;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$2 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$2] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && !_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  
}

var f$1 = _wks;

var _wksExt = {
	f: f$1
};

var iterator$2 = _wksExt.f('iterator');

var iterator = createCommonjsModule(function (module) {
module.exports = { "default": iterator$2, __esModule: true };
});

unwrapExports(iterator);

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});

var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty$4 = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$4($Symbol, name, { value: _wksExt.f(name) });
};

var f$2 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$2
};

var f$3 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$3
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray$$1(arg) {
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$5
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN$1 = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN$1(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$4 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
};

var _objectGopnExt = {
	f: f$4
};

var gOPD$1 = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD$1(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

// ECMAScript 6 symbols shim





var META = _meta.KEY;


















var gOPD = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !_isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol$2 = _core.Symbol;

var symbol = createCommonjsModule(function (module) {
module.exports = { "default": symbol$2, __esModule: true };
});

unwrapExports(symbol);

var _typeof_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator);



var _symbol2 = _interopRequireDefault(symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

unwrapExports(_typeof_1);

var possibleConstructorReturn = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
});

var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

var $getOwnPropertyDescriptor$1 = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
  };
});

var $Object$1 = _core.Object;
var getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
  return $Object$1.getOwnPropertyDescriptor(it, key);
};

var getOwnPropertyDescriptor = createCommonjsModule(function (module) {
module.exports = { "default": getOwnPropertyDescriptor$1, __esModule: true };
});

var _Object$getOwnPropertyDescriptor = unwrapExports(getOwnPropertyDescriptor);

var get = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf);



var _getOwnPropertyDescriptor2 = _interopRequireDefault(getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
});

var _get = unwrapExports(get);

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var setPrototypeOf$2 = _core.Object.setPrototypeOf;

var setPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": setPrototypeOf$2, __esModule: true };
});

unwrapExports(setPrototypeOf);

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', { create: _objectCreate });

var $Object$2 = _core.Object;
var create$2 = function create(P, D) {
  return $Object$2.create(P, D);
};

var create = createCommonjsModule(function (module) {
module.exports = { "default": create$2, __esModule: true };
});

unwrapExports(create);

var inherits = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf);



var _create2 = _interopRequireDefault(create);



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
});

var _inherits = unwrapExports(inherits);

/**
 * 为HTML元素添加事件代理
 * @param {HTMLElement} host 目标对象
 * @param {String} selector 要被代理的元素
 * @param {String} type 事件名称
 * @param {Function} handler 处理函数
 * @param {Boolean} capture 是否在捕获阶段监听
 */
function addDelegate(host, selector, type, handler) {
  var el = host.$dom;
  var handlerWrap = function handlerWrap(e) {
    var targetElsArr = chimeeHelper.findParents(e.target || e.srcElement, el, true);
    var targetElArr = chimeeHelper.query(selector, el, true);
    var retEl = void 0;
    if (targetElArr.find) {
      retEl = targetElArr.find(function (seEl) {
        return targetElsArr.find(function (tgEl) {
          return seEl === tgEl;
        });
      });
    } else {
      // Fixed IE11 Array.find not defined bug
      targetElArr.forEach(function (seEl) {
        return !retEl && targetElsArr.forEach(function (tgEl) {
          if (!retEl && seEl === tgEl) {
            retEl = tgEl;
          }
        });
      });
    }
    retEl && handler.apply(retEl, arguments);
  };
  /* 将包装后的方法记录到缓存中 */
  chimeeHelper.addEventCache(el, type + '_delegate_' + selector, handler, handlerWrap);
  host.events[type] = chimeeHelper.isArray(host.events[type]) ? host.events[type] : [];
  host.events[type].push(handlerWrap);
}

/**
 * 为HTML元素移除事件代理
 * @param {HTMLElement} host 目标对象
 * @param {String} selector 要被代理的元素
 * @param {String} type 事件名称
 * @param {Function} handler 处理函数
 * @param {Boolean} capture 是否在捕获阶段监听
 */
function removeDelegate(host, selector, type, handler) {
  var el = host.$dom;
  /* 尝试从缓存中读取包装后的方法 */
  var handlerWrap = chimeeHelper.removeEventCache(el, type + '_delegate_' + selector, handler);
  if (handlerWrap) {
    var index = host.events[type].indexOf(handlerWrap);
    host.events[type].splice(index, 1);
  }
}

function fireEvent(host, type, evt) {
  chimeeHelper.isArray(host.events[type]) && host.events[type].forEach(function (item) {
    item(evt);
  });
}

var Base = function () {
  function Base(parent) {
    _classCallCheck(this, Base);

    this.parent = parent;
  }

  _createClass(Base, [{
    key: 'create',
    value: function create() {
      this.createEl();
      this.addAllEvent();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.removeAllEvent();
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      this.$dom = document.createElement(this.option.tag);
      this.$dom.innerHTML = this.option.html;
      this.parent.$wrap.appendChild(this.$dom);
    }
  }, {
    key: 'addAllEvent',
    value: function addAllEvent() {
      var _this = this;

      this.option.defaultEvent && _Object$keys(this.option.defaultEvent).forEach(function (item) {
        var key = _this.option.defaultEvent[item];
        _this[key] = chimeeHelper.bind(_this[key], _this);
        addDelegate(_this.parent, _this.option.tag, item, _this[key], false, false);
      });
      this.option.event && _Object$keys(this.option.event).forEach(function (item) {
        var key = '__' + item;
        _this[key] = chimeeHelper.bind(_this.option.event[item], _this);
        addDelegate(_this.parent, _this.option.tag, item, _this[key], false, false);
      });
    }
  }, {
    key: 'removeAllEvent',
    value: function removeAllEvent() {
      var _this2 = this;

      this.option.defaultEvent && _Object$keys(this.option.defaultEvent).forEach(function (item) {
        var key = _this2.option.defaultEvent[item];
        _this2[key] = chimeeHelper.bind(_this2[key], _this2);
        removeDelegate(_this2.parent, _this2.option.tag, item, _this2[key], false, false);
      });
      this.option.event && _Object$keys(this.option.event).forEach(function (item) {
        var key = '__' + item;
        _this2[key] = chimeeHelper.bind(_this2.option.event[item], _this2);
        removeDelegate(_this2.parent, _this2.option.tag, item, _this2[key], false, false);
      });
    }
  }]);

  return Base;
}();

/**
 * 自定义组件配置
 */

var Component = function (_Base) {
  _inherits(Component, _Base);

  function Component(parent, option) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || _Object$getPrototypeOf(Component)).call(this, parent));

    _this.option = option;
    _this.init();
    return _this;
  }

  _createClass(Component, [{
    key: 'init',
    value: function init() {
      _get(Component.prototype.__proto__ || _Object$getPrototypeOf(Component.prototype), 'create', this).call(this);
      chimeeHelper.addClassName(this.$dom, 'chimee-flex-component');
    }
  }]);

  return Component;
}(Base);

/**
 * play 配置
 */

var defaultOption = {
  tag: 'chimee-control-state',
  html: '\n    <chimee-control-state-play></chimee-control-state-play>\n    <chimee-control-state-pause></chimee-control-state-pause>\n  ',
  animate: {
    icon: '\n      <svg viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n        <g fill="#ffffff" stroke="#ffffff">\n          <path class="left"></path>\n          <path class="right"></path>\n        </g>\n      </svg>\n    ',
    path: {
      play: {
        left: 'M0.921875,0.265625L0.921875,197.074852L95.7890625,149L96.2929688,49Z',
        right: 'M90.3142151,45.9315226L90.3142151,151.774115L201.600944,99.9938782L201.600944,98.0237571Z'
      },
      pause: {
        left: 'M0.921875,1.265625L0.921875,198.074852L79.3611677,198.074852L79.3611677,0.258923126Z',
        right: 'M126.921875,1.265625L126.921875,198.074852L205.361168,198.074852L205.361168,0.258923126Z'
      }
    }
  },
  defaultEvent: {
    tap: 'tap'
  }
};

var Play = function (_Base) {
  _inherits(Play, _Base);

  function Play(parent, option) {
    _classCallCheck(this, Play);

    var _this = _possibleConstructorReturn(this, (Play.__proto__ || _Object$getPrototypeOf(Play)).call(this, parent));

    _this.option = chimeeHelper.deepAssign(defaultOption, chimeeHelper.isObject(option) ? option : {});
    _this.animate = false;
    _this.init();
    return _this;
  }

  _createClass(Play, [{
    key: 'init',
    value: function init() {
      // 创建 html ／ 绑定事件
      _get(Play.prototype.__proto__ || _Object$getPrototypeOf(Play.prototype), 'create', this).call(this);
      this.$dom = chimeeHelper.$(this.$dom);
      this.$dom.addClass('chimee-flex-component');

      // 判断是否是默认或者用户提供 icon
      if (this.option.icon && this.option.icon.play && this.option.icon.pause) {
        this.$play = this.$dom.find('chimee-control-state-play');
        this.$pause = this.$dom.find('chimee-control-state-pause');
        this.$play.html(this.option.icon.play);
        this.$pause.html(this.option.icon.pause);
      } else if (!this.option.bitmap) {
        this.animate = true;
        this.option.animate.path = this.option.path ? this.option.path : this.option.animate.path;
        this.$dom.html(this.option.animate.icon);
        this.$left = this.$dom.find('.left');
        this.$right = this.$dom.find('.right');
      }
      this.changeState('pause');
    }
  }, {
    key: 'changeState',
    value: function changeState(state) {
      var nextState = state === 'play' ? 'pause' : 'play';
      this.state = state;
      chimeeHelper.addClassName(this.parent.$dom, nextState);
      chimeeHelper.removeClassName(this.parent.$dom, state);
      this.animate && this.setPath(nextState);
    }
  }, {
    key: 'setPath',
    value: function setPath(state) {
      var path = this.option.animate.path;
      if (state === 'play') {
        this.$left.attr('d', path.play.left);
        this.$right.attr('d', path.play.right);
      } else {
        this.$left.attr('d', path.pause.left);
        this.$right.attr('d', path.pause.right);
      }
    }
  }, {
    key: 'tap',
    value: function tap(e) {
      var nextState = this.state === 'play' ? 'pause' : 'play';
      this.changeState(nextState);
      this.parent.$emit(nextState);
    }
  }]);

  return Play;
}(Base);

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

/**
 * Screen 配置
 */

var defaultOption$1 = {
  tag: 'chimee-screen',
  html: '\n    <chimee-screen-full>\n      <svg viewBox="0 0 67 66" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n          <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->\n          <desc>Created with Sketch.</desc>\n          <defs></defs>\n          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n              <g id="screen-small" transform="translate(33.756308, 32.621867) rotate(45.000000) translate(-33.756308, -32.621867) translate(18.756308, -10.378133)" fill="#FFFFFF">\n                  <polygon id="Path" transform="translate(14.967695, 66.389245) rotate(180.000000) translate(-14.967695, -66.389245) " points="11.5190786 46.9431778 11.7210093 70.7913773 0.565180527 70.7913773 15.4674455 85.8353125 29.3702096 70.7913773 18.5573247 70.7702156 18.5573247 46.9431778"></polygon>\n                  <polygon id="Path" points="11.5190786 0.274130278 11.7210093 24.1223298 0.565180527 24.1223298 15.4674455 39.1662649 29.3702096 24.1223298 18.5573247 24.1011681 18.5573247 0.274130278"></polygon>\n              </g>\n          </g>\n      </svg>\n    </chimee-screen-full>\n    <chimee-screen-small>\n      <svg viewBox="0 0 61 62" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n        <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->\n        <desc>Created with Sketch.</desc>\n        <defs></defs>\n        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g id="Group" transform="translate(30.756308, 30.621867) rotate(45.000000) translate(-30.756308, -30.621867) translate(15.756308, -12.378133)" fill="#FFFFFF">\n                <polygon id="Path" points="11.5190786 46.9431778 11.7210093 70.7913773 0.565180527 70.7913773 15.4674455 85.8353125 29.3702096 70.7913773 18.5573247 70.7702156 18.5573247 46.9431778"></polygon>\n                <polygon id="Path" transform="translate(14.967695, 19.720198) rotate(180.000000) translate(-14.967695, -19.720198) " points="11.5190786 0.274130278 11.7210093 24.1223298 0.565180527 24.1223298 15.4674455 39.1662649 29.3702096 24.1223298 18.5573247 24.1011681 18.5573247 0.274130278"></polygon>\n            </g>\n        </g>\n      </svg>\n    </chimee-screen-small>\n  ',
  defaultEvent: {
    tap: 'tap'
  }
};

var Screen = (_class = function (_Base) {
  _inherits(Screen, _Base);

  function Screen(parent, option) {
    _classCallCheck(this, Screen);

    var _this = _possibleConstructorReturn(this, (Screen.__proto__ || _Object$getPrototypeOf(Screen)).call(this, parent));

    _this.state = 'small';
    _this.option = chimeeHelper.deepAssign(defaultOption$1, chimeeHelper.isObject(option) ? option : {});
    _this.init();
    return _this;
  }

  _createClass(Screen, [{
    key: 'init',
    value: function init() {
      _get(Screen.prototype.__proto__ || _Object$getPrototypeOf(Screen.prototype), 'create', this).call(this);
      this.$dom = chimeeHelper.$(this.$dom);
      this.changeState(this.state);
      // addClassName(this.$dom, 'flex-item');
      this.$dom.addClass('chimee-flex-component');

      this.$full = this.$dom.find('chimee-screen-full');
      this.$small = this.$dom.find('chimee-screen-small');
      // 判断是否是默认或者用户提供 icon
      if (this.option.icon && this.option.icon.full && this.option.icon.small) {
        // if((!this.option.icon.play && this.option.icon.puase) || (this.option.icon.play && !this.option.icon.puase)) {
        //   console.warn(`Please provide a play and pause icon！If you can't, we will use default icon!`);
        // }
        this.$full.html(this.option.icon.full);
        this.$small.html(this.option.icon.small);
      } else if (this.option.bitmap) {
        this.$full.html('');
        this.$small.html('');
      }
    }
  }, {
    key: 'changeState',
    value: function changeState(state) {
      var removeState = state === 'small' ? 'full' : 'small';
      chimeeHelper.addClassName(this.parent.$dom, state);
      chimeeHelper.removeClassName(this.parent.$dom, removeState);
    }
  }, {
    key: 'tap',
    value: function tap() {
      var full = false;
      if (this.state === 'small') {
        this.state = 'full';
        full = true;
      } else {
        this.state = 'small';
        full = false;
      }
      this.changeState(this.state);
      this.parent.$fullscreen(full, 'container');
      if (full) {
        this.watch_screen = this.parent.$watch('isFullscreen', this.screenChange);
      } else {
        this.watch_screen();
      }
    }
  }, {
    key: 'screenChange',
    value: function screenChange() {
      if (!this.parent.fullscreenElement) return;
      this.state = 'small';
      this.changeState('small');
      this.parent.$fullscreen(false, 'container');
    }
  }]);

  return Screen;
}(Base), _applyDecoratedDescriptor(_class.prototype, 'screenChange', [toxicDecorators.autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'screenChange'), _class.prototype), _class);

var _class$1;

function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
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

var defaultOption$2 = {
  tag: 'chimee-progressbar',
  html: '\n    <chimee-progressbar-bg class="chimee-progressbar-line"></chimee-progressbar-bg>\n    <chimee-progressbar-buffer class="chimee-progressbar-line"></chimee-progressbar-buffer>\n    <chimee-progressbar-all class="chimee-progressbar-line">\n      <chimee-progressbar-ball></chimee-progressbar-ball>\n    </chimee-progressbar-all>\n  '
};

var ProgressBar = (_class$1 = function (_Base) {
  _inherits(ProgressBar, _Base);

  function ProgressBar(parent, option) {
    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || _Object$getPrototypeOf(ProgressBar)).call(this, parent));

    _this.option = chimeeHelper.deepAssign(defaultOption$2, chimeeHelper.isObject(option) ? option : {});
    _this.visiable = option !== false;
    _this.init();
    return _this;
  }

  _createClass(ProgressBar, [{
    key: 'init',
    value: function init() {
      _get(ProgressBar.prototype.__proto__ || _Object$getPrototypeOf(ProgressBar.prototype), 'create', this).call(this);
      this.$dom = chimeeHelper.$(this.$dom);
      this.$buffer = this.$dom.find('chimee-progressbar-buffer');
      this.$all = this.$dom.find('chimee-progressbar-all');
      this.$ball = this.$dom.find('chimee-progressbar-ball');
      this.$dom.addClass('chimee-flex-component');

      // css 配置
      !this.visiable && this.$dom.css('visibility', 'hidden');
      this.addEvent();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.removeEvent();
      // 解绑全屏监听事件
      this.watch_screen && this.watch_screen();
      _get(ProgressBar.prototype.__proto__ || _Object$getPrototypeOf(ProgressBar.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'addEvent',
    value: function addEvent$$1() {
      addDelegate(this.parent, 'chimee-progressbar', 'tap', this.tap);
      addDelegate(this.parent, 'chimee-progressbar', 'panstart', this.mousedown);
    }
  }, {
    key: 'removeEvent',
    value: function removeEvent$$1() {
      removeDelegate(this.parent, 'chimee-progressbar', 'tap', this.tap);
      removeDelegate(this.parent, 'chimee-progressbar', 'panstart', this.mousedown);
    }

    /**
     * 缓存进度条更新 progress 事件
     */

  }, {
    key: 'progress',
    value: function progress() {
      var buffer = 0;
      try {
        buffer = this.parent.buffered.end(0);
      } catch (e) {}
      var bufferWidth = buffer / this.parent.duration * 100 + '%';
      this.$buffer.css('width', bufferWidth);
    }

    /**
     * requestAnimationFrame 来更新进度条, timeupdate 事件
     */

  }, {
    key: 'update',
    value: function update() {
      var time = this._currentTime !== undefined ? this._currentTime : this.parent.currentTime;
      var timePer = time ? time / this.parent.duration : 0;
      this.$all.css('width', timePer * 100 + '%');
    }
  }, {
    key: 'tap',
    value: function tap(e) {
      this._currentTime = (e.clientX - this.$dom[0].offsetLeft) / this.$dom[0].offsetWidth * this.parent.duration;
      this.update();
      this.parent.currentTime = this._currentTime;
      this._currentTime = undefined;
    }
  }, {
    key: 'mousedown',
    value: function mousedown(e) {
      this._currentTime = (e.clientX - this.$dom[0].offsetLeft) / this.$dom[0].offsetWidth * this.parent.duration;
      this.startX = e.clientX;
      this.startTime = this._currentTime;
      addDelegate(this.parent, this.option.tag, 'panmove', this.draging);
      addDelegate(this.parent, this.option.tag, 'panend', this.dragEnd);
    }

    /**
     * 开始拖拽
     * @param {EventObject} e 鼠标事件
     */

  }, {
    key: 'draging',
    value: function draging(e) {
      this.endX = e.clientX;
      var dragTime = (this.endX - this.startX) / this.$dom[0].offsetWidth * this.parent.duration;
      var dragAfterTime = +(this.startTime + dragTime).toFixed(2);
      this._currentTime = dragAfterTime < 0 ? 0 : dragAfterTime > this.parent.duration ? this.parent.duration : dragAfterTime;
      this.update();
    }

    /**
     * 结束拖拽
     */

  }, {
    key: 'dragEnd',
    value: function dragEnd() {
      this.startX = 0;
      this.startTime = 0;
      this.parent.currentTime = this._currentTime;
      this._currentTime = undefined;
      removeDelegate(this.parent, this.option.tag, 'panmove', this.draging);
      removeDelegate(this.parent, this.option.tag, 'panend', this.dragEnd);
    }
  }]);

  return ProgressBar;
}(Base), _applyDecoratedDescriptor$1(_class$1.prototype, 'tap', [toxicDecorators.autobind], _Object$getOwnPropertyDescriptor(_class$1.prototype, 'tap'), _class$1.prototype), _applyDecoratedDescriptor$1(_class$1.prototype, 'mousedown', [toxicDecorators.autobind], _Object$getOwnPropertyDescriptor(_class$1.prototype, 'mousedown'), _class$1.prototype), _applyDecoratedDescriptor$1(_class$1.prototype, 'draging', [toxicDecorators.autobind], _Object$getOwnPropertyDescriptor(_class$1.prototype, 'draging'), _class$1.prototype), _applyDecoratedDescriptor$1(_class$1.prototype, 'dragEnd', [toxicDecorators.autobind], _Object$getOwnPropertyDescriptor(_class$1.prototype, 'dragEnd'), _class$1.prototype), _class$1);

/**
 * currentTime 配置
 */

var defaultOption$3 = {
  tag: 'chimee-current-time',
  html: '\n    00:00\n  '
};

var CurrentTime = function (_Base) {
  _inherits(CurrentTime, _Base);

  function CurrentTime(parent, option) {
    _classCallCheck(this, CurrentTime);

    var _this = _possibleConstructorReturn(this, (CurrentTime.__proto__ || _Object$getPrototypeOf(CurrentTime)).call(this, parent));

    _this.option = chimeeHelper.deepAssign(defaultOption$3, chimeeHelper.isObject(option) ? option : {});
    _this.init();
    return _this;
  }

  _createClass(CurrentTime, [{
    key: 'init',
    value: function init() {
      _get(CurrentTime.prototype.__proto__ || _Object$getPrototypeOf(CurrentTime.prototype), 'create', this).call(this);
      this.$dom = chimeeHelper.$(this.$dom);
      this.$dom.addClass('chimee-flex-component');
    }
  }, {
    key: 'updateCurrent',
    value: function updateCurrent() {
      this.$dom.text(chimeeHelper.formatTime(this.parent.currentTime));
    }
  }]);

  return CurrentTime;
}(Base);

/**
 * totalTime 配置
 */

var defaultOption$4 = {
  tag: 'chimee-total-time',
  html: '\n    00:00\n  '
};

var TotalTime = function (_Base) {
  _inherits(TotalTime, _Base);

  function TotalTime(parent, option) {
    _classCallCheck(this, TotalTime);

    var _this = _possibleConstructorReturn(this, (TotalTime.__proto__ || _Object$getPrototypeOf(TotalTime)).call(this, parent));

    _this.option = chimeeHelper.deepAssign(defaultOption$4, chimeeHelper.isObject(option) ? option : {});
    _this.init();
    return _this;
  }

  _createClass(TotalTime, [{
    key: 'init',
    value: function init() {
      _get(TotalTime.prototype.__proto__ || _Object$getPrototypeOf(TotalTime.prototype), 'create', this).call(this);
      this.$dom = chimeeHelper.$(this.$dom);
      this.$dom.addClass('chimee-flex-component');
    }
  }, {
    key: 'updateTotal',
    value: function updateTotal() {
      this.$dom.text(chimeeHelper.formatTime(this.parent.duration));
    }
  }]);

  return TotalTime;
}(Base);

function hundleChildren(plugin) {
  var childConfig = {};
  if (!plugin.$config.children) {
    childConfig = plugin.isLive ? {
      play: true, // 底部播放暂停按钮
      currentTime: false, // 播放时间
      progressBar: false, // 播放进度控制条
      totalTime: false, // 总时间
      screen: true // 全屏控制
    } : {
      play: true, // 底部播放暂停按钮
      currentTime: true, // 播放时间
      progressBar: true, // 播放进度控制条
      totalTime: true, // 总时间
      screen: true // 全屏控制
    };
  } else {
    childConfig = plugin.$config.children;
  }
  return childConfig;
}

/**
 * 1. 将所有的 ui component 输出到 html 结构中
 * 2. 为这些 component 绑定响应的事件
 * @param {*} dom 所有 ui 节点的子容器
 * @param {*} config 关于 ui 的一些列设置
 * @return {Array} 所有子节点
 */

function createChild(plugin) {
  var childConfig = plugin.config.children = hundleChildren(plugin);
  var children = {};
  _Object$keys(childConfig).forEach(function (item) {
    switch (item) {
      case 'play':
        if (childConfig.play) {
          children.play = new Play(plugin, childConfig.play);
        }
        break;
      case 'currentTime':
        if (childConfig.currentTime) {
          children.currentTime = new CurrentTime(plugin, childConfig.currentTime);
        }
        break;
      case 'progressBar':
        children.progressBar = new ProgressBar(plugin, childConfig.progressBar);
        break;
      case 'totalTime':
        if (childConfig.totalTime) {
          children.totalTime = new TotalTime(plugin, childConfig.totalTime);
        }
        break;
      case 'screen':
        if (childConfig.screen) {
          children.screen = new Screen(plugin, childConfig.screen);
        }
        break;
      default:
        children[item] = new Component(plugin, childConfig[item]);
        break;
    }
  });

  return children;
}

var majorColorStyle = '\n  .chimee-flex-component svg *{\n    fill: majorColor;\n    stroke: majorColor;\n  }\n  chimee-progressbar-all{\n    background: majorColor;\n  }\n  chimee-volume.chimee-flex-component chimee-volume-bar-all{\n    background: majorColor;    \n  }\n  chimee-clarity-list li:hover,\n  chimee-clarity-list li.active {\n    color: majorColor;\n  }\n';

var hoverColorStyle = '\n  .chimee-flex-component svg:hover *{\n    fill: hoverColor;\n    stroke: hoverColor;\n  }\n';

/**
 * 插件默认配置
 */

var defaultConfig = {
  hideBarTime: 2000
};

var barStatus = {
  timer: null,
  show: true
};

var mobiControlbar = gestureFactory({
  name: 'chimeeMobiControlbar',
  el: 'chimee-control',
  data: {
    children: {},
    show: false
  },
  level: 99,
  operable: true,
  penetrate: false,
  create: function create() {
    this.environment = new chimeeHelper.UAParser().getResult();
  },
  init: function init(videoConfig) {
    if (videoConfig.controls) {
      this.show = true;
      videoConfig.controls = false;
    }
    var _this = this;
    toxicDecorators.applyDecorators(videoConfig, {
      controls: toxicDecorators.accessor({
        get: function get() {
          return _this.show;
        },
        set: function set(value) {
          _this.show = Boolean(value);
          _this._display();
          return false;
        }
      }, { preSet: true })
    }, { self: true });
    this.config = chimeeHelper.isObject(this.$config) ? chimeeHelper.deepAssign(defaultConfig, this.$config) : defaultConfig;
    this.$dom.innerHTML = '<chimee-control-wrap></chimee-control-wrap>';
    this.$wrap = this.$dom.querySelector('chimee-control-wrap');

    this.events = {};
    this.children = createChild(this);
    this._setStyle();

    // 增加 window / document 的全局监听
    this._addGlobalEvent();

    // 监听全屏事件

    this.watch_fullscreen = this.$watch('isFullscreen', this._mousemove);
  },
  destroy: function destroy() {
    window.clearTimeout(barStatus.timer);
    barStatus.show = false;
    this._removeGlobalEvent();
    this.watch_fullscreen && this.watch_fullscreen();
  },
  inited: function inited() {
    for (var i in this.children) {
      this.children[i].inited && this.children[i].inited();
    }
  },

  events: {
    play: function play() {
      this.children.play && this.children.play.changeState('play');
      this._hideItself();
    },
    pause: function pause() {
      this.children.play && this.children.play.changeState('pause');
      this._showItself();
    },
    load: function load() {
      // update src 充值进度条/时间/播放状态
      // load 的时候不会触发 pause(), 手动将控制条显示出来
      this._showItself();
      this._progressUpdate();
      this.children.play && this.children.play.changeState('pause');
      this._progressUpdate();
    },
    durationchange: function durationchange() {
      this.children.totalTime && this.children.totalTime.updateTotal();
    },
    timeupdate: function timeupdate() {
      this._progressUpdate();
    },
    progress: function progress() {
      this.children.progressBar && this.children.progressBar.progress();
    },
    volumechange: function volumechange() {
      this.children.volume && this.children.volume.update();
    },
    tap: function tap(evt) {
      this._mousemove();
    },
    d_tap: function d_tap(evt) {
      !this.paused && this._mousemove();
      fireEvent(this, 'tap', evt.changedTouches[0]);
    },
    d_panstart: function d_panstart(evt) {
      !this.paused && this._mousemove();
      fireEvent(this, 'panstart', evt.changedTouches[0]);
    },
    d_panmove: function d_panmove(evt) {
      !this.paused && this._mousemove();
      fireEvent(this, 'panmove', evt.changedTouches[0]);
    },
    d_panend: function d_panend(evt) {
      !this.paused && this._mousemove();
      fireEvent(this, 'panend', evt.changedTouches[0]);
    }
  },
  methods: {
    _progressUpdate: function _progressUpdate() {
      this.children.progressBar && this.children.progressBar.update();
      this.children.currentTime && this.children.currentTime.updateCurrent();
    },
    _hideItself: function _hideItself() {
      var _this2 = this;

      window.clearTimeout(barStatus.timer);
      barStatus.timer = setTimeout(function () {
        var bottom = -_this2.$wrap.offsetHeight;
        chimeeHelper.setStyle(_this2.$wrap, {
          bottom: bottom + 'px'
        });
        chimeeHelper.setStyle(_this2.$dom, {
          visibility: 'hidden'
        });
        barStatus.show = false;
        _this2.$emit('barHide');
      }, this.config.hideBarTime);
    },
    _showItself: function _showItself() {
      window.clearTimeout(barStatus.timer);
      chimeeHelper.setStyle(this.$wrap, {
        bottom: '0'
      });
      chimeeHelper.setStyle(this.$dom, {
        visibility: 'visible'
      });
      !barStatus.show && this.$emit('barShow');
      barStatus.show = true;
    },
    _display: function _display() {
      var display = this.show ? 'block' : 'none';
      chimeeHelper.setStyle(this.$dom, {
        display: display
      });
    },
    _mousemove: function _mousemove(e) {
      if (this.paused) return;
      this._showItself();
      this._hideItself();
    },
    _setStyle: function _setStyle() {
      var css = '';
      css += this.config.majorColor ? majorColorStyle.replace(/majorColor/g, this.config.majorColor) : '';
      css += this.config.hoverColor ? hoverColorStyle.replace(/hoverColor/g, this.config.hoverColor) : '';
      var style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = css;
      document.head.appendChild(style);
    },
    _weixinJSBridgeReady: function _weixinJSBridgeReady() {
      // console.log(this.environment.os === 'iOS', window.WeixinJSBridge)
      window.WeixinJSBridge && this.environment.os.name === 'iOS' && this.load();
    },

    // 增加一些全局事件监听
    _addGlobalEvent: function _addGlobalEvent() {
      chimeeHelper.addEvent(window, 'orientationchange', this._mousemove);
      chimeeHelper.addEvent(document, 'WeixinJSBridgeReady', this._weixinJSBridgeReady);
    },

    // 去除一些全局事件监听
    _removeGlobalEvent: function _removeGlobalEvent() {
      chimeeHelper.removeEvent(window, 'orientationchange', this._mousemove);
      chimeeHelper.removeEvent(document, 'WeixinJSBridgeReady', this._weixinJSBridgeReady);
    }
  }
});

module.exports = mobiControlbar;
