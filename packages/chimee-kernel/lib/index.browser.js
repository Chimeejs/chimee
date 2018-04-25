
/**
 * chimee-kernel v1.5.0-alpha
 * (c) 2017-2018 songguangyu
 * Released under MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ChimeeKernel = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var _toInteger$1 = /*#__PURE__*/Object.freeze({
		default: _toInteger,
		__moduleExports: _toInteger
	});

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _defined$1 = /*#__PURE__*/Object.freeze({
		default: _defined,
		__moduleExports: _defined
	});

	var toInteger = ( _toInteger$1 && _toInteger ) || _toInteger$1;

	var defined = ( _defined$1 && _defined ) || _defined$1;

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _stringAt$1 = /*#__PURE__*/Object.freeze({
		default: _stringAt,
		__moduleExports: _stringAt
	});

	var _library = true;

	var _library$1 = /*#__PURE__*/Object.freeze({
		default: _library,
		__moduleExports: _library
	});

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
	var core = module.exports = { version: '2.5.3' };
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

	var fails = ( _fails$1 && _fails ) || _fails$1;

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _descriptors$1 = /*#__PURE__*/Object.freeze({
		default: _descriptors,
		__moduleExports: _descriptors
	});

	var require$$0 = ( _global$1 && _global ) || _global$1;

	var document$1 = require$$0.document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document$1) && isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _domCreate$1 = /*#__PURE__*/Object.freeze({
		default: _domCreate,
		__moduleExports: _domCreate
	});

	var DESCRIPTORS = ( _descriptors$1 && _descriptors ) || _descriptors$1;

	var cel = ( _domCreate$1 && _domCreate ) || _domCreate$1;

	var _ie8DomDefine = !DESCRIPTORS && !fails(function () {
	  return Object.defineProperty(cel('div'), 'a', { get: function () { return 7; } }).a != 7;
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

	var f = DESCRIPTORS ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

	var $defineProperty = ( _objectDp$1 && _objectDp ) || _objectDp$1;

	var createDesc = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

	var _hide = DESCRIPTORS ? function (object, key, value) {
	  return $defineProperty.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _hide$1 = /*#__PURE__*/Object.freeze({
		default: _hide,
		__moduleExports: _hide
	});

	var require$$1 = ( _core$1 && _core ) || _core$1;

	var ctx = ( _ctx$1 && _ctx ) || _ctx$1;

	var hide = ( _hide$1 && _hide ) || _hide$1;

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? require$$1 : require$$1[name] || (require$$1[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? require$$0 : IS_STATIC ? require$$0[name] : (require$$0[name] || {})[PROTOTYPE];
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

	var _redefine = hide;

	var _redefine$1 = /*#__PURE__*/Object.freeze({
		default: _redefine,
		__moduleExports: _redefine
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _has$1 = /*#__PURE__*/Object.freeze({
		default: _has,
		__moduleExports: _has
	});

	var _iterators = {};

	var _iterators$1 = /*#__PURE__*/Object.freeze({
		default: _iterators,
		__moduleExports: _iterators
	});

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var _cof$1 = /*#__PURE__*/Object.freeze({
		default: _cof,
		__moduleExports: _cof
	});

	var require$$1$1 = ( _cof$1 && _cof ) || _cof$1;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return require$$1$1(it) == 'String' ? it.split('') : Object(it);
	};

	var _iobject$1 = /*#__PURE__*/Object.freeze({
		default: _iobject,
		__moduleExports: _iobject
	});

	var IObject = ( _iobject$1 && _iobject ) || _iobject$1;

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return IObject(defined(it));
	};

	var _toIobject$1 = /*#__PURE__*/Object.freeze({
		default: _toIobject,
		__moduleExports: _toIobject
	});

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var _toLength$1 = /*#__PURE__*/Object.freeze({
		default: _toLength,
		__moduleExports: _toLength
	});

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	var _toAbsoluteIndex$1 = /*#__PURE__*/Object.freeze({
		default: _toAbsoluteIndex,
		__moduleExports: _toAbsoluteIndex
	});

	var toIObject = ( _toIobject$1 && _toIobject ) || _toIobject$1;

	var toLength = ( _toLength$1 && _toLength ) || _toLength$1;

	var toAbsoluteIndex = ( _toAbsoluteIndex$1 && _toAbsoluteIndex ) || _toAbsoluteIndex$1;

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
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

	var _arrayIncludes$1 = /*#__PURE__*/Object.freeze({
		default: _arrayIncludes,
		__moduleExports: _arrayIncludes
	});

	var SHARED = '__core-js_shared__';
	var store = require$$0[SHARED] || (require$$0[SHARED] = {});
	var _shared = function (key) {
	  return store[key] || (store[key] = {});
	};

	var _shared$1 = /*#__PURE__*/Object.freeze({
		default: _shared,
		__moduleExports: _shared
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _uid$1 = /*#__PURE__*/Object.freeze({
		default: _uid,
		__moduleExports: _uid
	});

	var require$$0$1 = ( _shared$1 && _shared ) || _shared$1;

	var uid = ( _uid$1 && _uid ) || _uid$1;

	var shared = require$$0$1('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

	var _sharedKey$1 = /*#__PURE__*/Object.freeze({
		default: _sharedKey,
		__moduleExports: _sharedKey
	});

	var has = ( _has$1 && _has ) || _has$1;

	var require$$0$2 = ( _arrayIncludes$1 && _arrayIncludes ) || _arrayIncludes$1;

	var require$$1$2 = ( _sharedKey$1 && _sharedKey ) || _sharedKey$1;

	var arrayIndexOf = require$$0$2(false);
	var IE_PROTO = require$$1$2('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	var _objectKeysInternal$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeysInternal,
		__moduleExports: _objectKeysInternal
	});

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	var _enumBugKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumBugKeys,
		__moduleExports: _enumBugKeys
	});

	var $keys = ( _objectKeysInternal$1 && _objectKeysInternal ) || _objectKeysInternal$1;

	var require$$0$3 = ( _enumBugKeys$1 && _enumBugKeys ) || _enumBugKeys$1;

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return $keys(O, require$$0$3);
	};

	var _objectKeys$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeys,
		__moduleExports: _objectKeys
	});

	var getKeys = ( _objectKeys$1 && _objectKeys ) || _objectKeys$1;

	var _objectDps = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) $defineProperty.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var _objectDps$1 = /*#__PURE__*/Object.freeze({
		default: _objectDps,
		__moduleExports: _objectDps
	});

	var document$2 = require$$0.document;
	var _html = document$2 && document$2.documentElement;

	var _html$1 = /*#__PURE__*/Object.freeze({
		default: _html,
		__moduleExports: _html
	});

	var dPs = ( _objectDps$1 && _objectDps ) || _objectDps$1;

	var html = ( _html$1 && _html ) || _html$1;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = require$$1$2('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe');
	  var i = require$$0$3.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][require$$0$3[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var _objectCreate$1 = /*#__PURE__*/Object.freeze({
		default: _objectCreate,
		__moduleExports: _objectCreate
	});

	var _wks = createCommonjsModule(function (module) {
	var store = require$$0$1('wks');

	var Symbol = require$$0.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _wks$1 = /*#__PURE__*/Object.freeze({
		default: _wks,
		__moduleExports: _wks
	});

	var require$$0$4 = ( _wks$1 && _wks ) || _wks$1;

	var def = $defineProperty.f;

	var TAG = require$$0$4('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var _setToStringTag$1 = /*#__PURE__*/Object.freeze({
		default: _setToStringTag,
		__moduleExports: _setToStringTag
	});

	var create = ( _objectCreate$1 && _objectCreate ) || _objectCreate$1;

	var require$$4 = ( _setToStringTag$1 && _setToStringTag ) || _setToStringTag$1;

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	hide(IteratorPrototype, require$$0$4('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: createDesc(1, next) });
	  require$$4(Constructor, NAME + ' Iterator');
	};

	var _iterCreate$1 = /*#__PURE__*/Object.freeze({
		default: _iterCreate,
		__moduleExports: _iterCreate
	});

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(defined(it));
	};

	var _toObject$1 = /*#__PURE__*/Object.freeze({
		default: _toObject,
		__moduleExports: _toObject
	});

	var toObject = ( _toObject$1 && _toObject ) || _toObject$1;

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = require$$1$2('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var _objectGpo$1 = /*#__PURE__*/Object.freeze({
		default: _objectGpo,
		__moduleExports: _objectGpo
	});

	var LIBRARY = ( _library$1 && _library ) || _library$1;

	var $export$1 = ( _export$1 && _export ) || _export$1;

	var redefine = ( _redefine$1 && _redefine ) || _redefine$1;

	var Iterators = ( _iterators$1 && _iterators ) || _iterators$1;

	var $iterCreate = ( _iterCreate$1 && _iterCreate ) || _iterCreate$1;

	var getPrototypeOf = ( _objectGpo$1 && _objectGpo ) || _objectGpo$1;

	var ITERATOR = require$$0$4('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
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
	  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      require$$4(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export$1($export$1.P + $export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var _iterDefine$1 = /*#__PURE__*/Object.freeze({
		default: _iterDefine,
		__moduleExports: _iterDefine
	});

	var require$$0$5 = ( _stringAt$1 && _stringAt ) || _stringAt$1;

	var require$$0$6 = ( _iterDefine$1 && _iterDefine ) || _iterDefine$1;

	var $at = require$$0$5(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	require$$0$6(String, 'String', function (iterated) {
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

	var _addToUnscopables = function () { /* empty */ };

	var _addToUnscopables$1 = /*#__PURE__*/Object.freeze({
		default: _addToUnscopables,
		__moduleExports: _addToUnscopables
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterStep$1 = /*#__PURE__*/Object.freeze({
		default: _iterStep,
		__moduleExports: _iterStep
	});

	var addToUnscopables = ( _addToUnscopables$1 && _addToUnscopables ) || _addToUnscopables$1;

	var step = ( _iterStep$1 && _iterStep ) || _iterStep$1;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = require$$0$6(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var TO_STRING_TAG = require$$0$4('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = require$$0[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

	var f$1 = require$$0$4;

	var _wksExt = {
		f: f$1
	};

	var _wksExt$1 = /*#__PURE__*/Object.freeze({
		default: _wksExt,
		__moduleExports: _wksExt,
		f: f$1
	});

	var wksExt = ( _wksExt$1 && _wksExt ) || _wksExt$1;

	var iterator = wksExt.f('iterator');

	var iterator$1 = /*#__PURE__*/Object.freeze({
		default: iterator,
		__moduleExports: iterator
	});

	var require$$0$7 = ( iterator$1 && iterator ) || iterator$1;

	var iterator$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$7, __esModule: true };
	});

	var iterator$3 = unwrapExports(iterator$2);

	var iterator$4 = /*#__PURE__*/Object.freeze({
		default: iterator$3,
		__moduleExports: iterator$2
	});

	var _meta = createCommonjsModule(function (module) {
	var META = uid('meta');


	var setDesc = $defineProperty.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !fails(function () {
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
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
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
	  if (!has(it, META)) {
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
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
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

	var _meta$1 = /*#__PURE__*/Object.freeze({
		default: _meta,
		__moduleExports: _meta,
		KEY: _meta_1,
		NEED: _meta_2,
		fastKey: _meta_3,
		getWeak: _meta_4,
		onFreeze: _meta_5
	});

	var defineProperty = $defineProperty.f;
	var _wksDefine = function (name) {
	  var $Symbol = require$$1.Symbol || (require$$1.Symbol = LIBRARY ? {} : require$$0.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

	var _wksDefine$1 = /*#__PURE__*/Object.freeze({
		default: _wksDefine,
		__moduleExports: _wksDefine
	});

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var _objectGops$1 = /*#__PURE__*/Object.freeze({
		default: _objectGops,
		__moduleExports: _objectGops,
		f: f$2
	});

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	var _objectPie$1 = /*#__PURE__*/Object.freeze({
		default: _objectPie,
		__moduleExports: _objectPie,
		f: f$3
	});

	var gOPS = ( _objectGops$1 && _objectGops ) || _objectGops$1;

	var pIE = ( _objectPie$1 && _objectPie ) || _objectPie$1;

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	var _enumKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumKeys,
		__moduleExports: _enumKeys
	});

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return require$$1$1(arg) == 'Array';
	};

	var _isArray$1 = /*#__PURE__*/Object.freeze({
		default: _isArray,
		__moduleExports: _isArray
	});

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = require$$0$3.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	var _objectGopn$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopn,
		__moduleExports: _objectGopn,
		f: f$4
	});

	var require$$0$8 = ( _objectGopn$1 && _objectGopn ) || _objectGopn$1;

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = require$$0$8.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var _objectGopnExt$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopnExt,
		__moduleExports: _objectGopnExt,
		f: f$5
	});

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = DESCRIPTORS ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	var _objectGopd$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopd,
		__moduleExports: _objectGopd,
		f: f$6
	});

	var require$$0$9 = ( _meta$1 && _meta ) || _meta$1;

	var require$$0$10 = ( _wksDefine$1 && _wksDefine ) || _wksDefine$1;

	var enumKeys = ( _enumKeys$1 && _enumKeys ) || _enumKeys$1;

	var isArray = ( _isArray$1 && _isArray ) || _isArray$1;

	var gOPNExt = ( _objectGopnExt$1 && _objectGopnExt ) || _objectGopnExt$1;

	var require$$1$3 = ( _objectGopd$1 && _objectGopd ) || _objectGopd$1;

	// ECMAScript 6 symbols shim





	var META = require$$0$9.KEY;



















	var gOPD$1 = require$$1$3.f;
	var dP$1 = $defineProperty.f;
	var gOPN$1 = gOPNExt.f;
	var $Symbol = require$$0.Symbol;
	var $JSON = require$$0.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = require$$0$4('_hidden');
	var TO_PRIMITIVE = require$$0$4('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = require$$0$1('symbol-registry');
	var AllSymbols = require$$0$1('symbols');
	var OPSymbols = require$$0$1('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = require$$0.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && fails(function () {
	  return create(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = create($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty$1 = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty$1(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP$1(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty$1(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create$$1(it, P) {
	  return P === undefined ? create(it) : $defineProperties(create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto$1 && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto$1 && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  require$$1$3.f = $getOwnPropertyDescriptor;
	  $defineProperty.f = $defineProperty$1;
	  require$$0$8.f = gOPNExt.f = $getOwnPropertyNames;
	  pIE.f = $propertyIsEnumerable;
	  gOPS.f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !LIBRARY) {
	    redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(require$$0$4(name));
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)require$$0$4(es6Symbols[j++]);

	for (var wellKnownSymbols = getKeys(require$$0$4.store), k = 0; wellKnownSymbols.length > k;) require$$0$10(wellKnownSymbols[k++]);

	$export$1($export$1.S + $export$1.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
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

	$export$1($export$1.S + $export$1.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty$1,
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
	$JSON && $export$1($export$1.S + $export$1.F * (!USE_NATIVE || fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	require$$4($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	require$$4(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	require$$4(require$$0.JSON, 'JSON', true);

	require$$0$10('asyncIterator');

	require$$0$10('observable');

	var symbol = require$$1.Symbol;

	var symbol$1 = /*#__PURE__*/Object.freeze({
		default: symbol,
		__moduleExports: symbol
	});

	var require$$0$11 = ( symbol$1 && symbol ) || symbol$1;

	var symbol$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$11, __esModule: true };
	});

	var symbol$3 = unwrapExports(symbol$2);

	var symbol$4 = /*#__PURE__*/Object.freeze({
		default: symbol$3,
		__moduleExports: symbol$2
	});

	var _iterator = ( iterator$4 && iterator$3 ) || iterator$4;

	var _symbol = ( symbol$4 && symbol$3 ) || symbol$4;

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(_iterator);



	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof = unwrapExports(_typeof_1);

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
	$export$1($export$1.S + $export$1.F * !DESCRIPTORS, 'Object', { defineProperty: $defineProperty.f });

	var $Object = require$$1.Object;
	var defineProperty$1 = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$2 = /*#__PURE__*/Object.freeze({
		default: defineProperty$1,
		__moduleExports: defineProperty$1
	});

	var require$$0$12 = ( defineProperty$2 && defineProperty$1 ) || defineProperty$2;

	var defineProperty$3 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$12, __esModule: true };
	});

	var defineProperty$4 = unwrapExports(defineProperty$3);

	var defineProperty$5 = /*#__PURE__*/Object.freeze({
		default: defineProperty$4,
		__moduleExports: defineProperty$3
	});

	var _defineProperty = ( defineProperty$5 && defineProperty$4 ) || defineProperty$5;

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

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (require$$1.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export$1($export$1.S + $export$1.F * fails(function () { fn(1); }), 'Object', exp);
	};

	var _objectSap$1 = /*#__PURE__*/Object.freeze({
		default: _objectSap,
		__moduleExports: _objectSap
	});

	var require$$0$13 = ( _objectSap$1 && _objectSap ) || _objectSap$1;

	// 19.1.2.14 Object.keys(O)



	require$$0$13('keys', function () {
	  return function keys(it) {
	    return getKeys(toObject(it));
	  };
	});

	var keys = require$$1.Object.keys;

	var keys$1 = /*#__PURE__*/Object.freeze({
		default: keys,
		__moduleExports: keys
	});

	var require$$0$14 = ( keys$1 && keys ) || keys$1;

	var keys$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$14, __esModule: true };
	});

	unwrapExports(keys$2);

	// 20.1.2.3 Number.isInteger(number)

	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	var _isInteger$1 = /*#__PURE__*/Object.freeze({
		default: _isInteger,
		__moduleExports: _isInteger
	});

	var require$$0$15 = ( _isInteger$1 && _isInteger ) || _isInteger$1;

	// 20.1.2.3 Number.isInteger(number)


	$export$1($export$1.S, 'Number', { isInteger: require$$0$15 });

	var isInteger = require$$1.Number.isInteger;

	var isInteger$1 = /*#__PURE__*/Object.freeze({
		default: isInteger,
		__moduleExports: isInteger
	});

	var require$$0$16 = ( isInteger$1 && isInteger ) || isInteger$1;

	var isInteger$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$16, __esModule: true };
	});

	unwrapExports(isInteger$2);

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var _stringWs$1 = /*#__PURE__*/Object.freeze({
		default: _stringWs,
		__moduleExports: _stringWs
	});

	var spaces = ( _stringWs$1 && _stringWs ) || _stringWs$1;

	var space = '[' + spaces + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = fails(function () {
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  $export$1($export$1.P + $export$1.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var _stringTrim$1 = /*#__PURE__*/Object.freeze({
		default: _stringTrim,
		__moduleExports: _stringTrim
	});

	var require$$1$4 = ( _stringTrim$1 && _stringTrim ) || _stringTrim$1;

	var $parseFloat = require$$0.parseFloat;
	var $trim = require$$1$4.trim;

	var _parseFloat = 1 / $parseFloat(spaces + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	var _parseFloat$1 = /*#__PURE__*/Object.freeze({
		default: _parseFloat,
		__moduleExports: _parseFloat
	});

	var $parseFloat$1 = ( _parseFloat$1 && _parseFloat ) || _parseFloat$1;

	// 20.1.2.12 Number.parseFloat(string)
	$export$1($export$1.S + $export$1.F * (Number.parseFloat != $parseFloat$1), 'Number', { parseFloat: $parseFloat$1 });

	var _parseFloat$2 = parseFloat;

	var _parseFloat$3 = /*#__PURE__*/Object.freeze({
		default: _parseFloat$2,
		__moduleExports: _parseFloat$2
	});

	var require$$0$17 = ( _parseFloat$3 && _parseFloat$2 ) || _parseFloat$3;

	var _parseFloat$4 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$17, __esModule: true };
	});

	unwrapExports(_parseFloat$4);

	/**
	 * is void element or not ? Means it will return true when val is undefined or null
	 */
	function isVoid(obj) {
	  return obj === undefined || obj === null;
	}
	/**
	 * to check whether a variable is array
	 */
	function isArray$1(arr) {
	  return Array.isArray(arr);
	}

	/**
	 * is it a function or not
	 */
	function isFunction(obj) {
	  return typeof obj === 'function';
	}

	/**
	 * is it an object or not
	 */
	function isObject$1(obj) {
	  // incase of arrow function and array
	  return Object(obj) === obj && String(obj) === '[object Object]' && !isFunction(obj) && !isArray$1(obj);
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
	 * to test if a HTML element
	 */
	function isElement(obj) {
	  return !!((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string');
	}

	function formatter(tag, msg) {
	  if (!isString(tag)) throw new TypeError('Log\'s method only acccept string as argument, but not ' + tag + ' in ' + (typeof tag === 'undefined' ? 'undefined' : _typeof(tag)));
	  if (!isString(msg)) return '[' + Log.GLOBAL_TAG + '] > ' + tag;
	  tag = Log.FORCE_GLOBAL_TAG ? Log.GLOBAL_TAG : tag || Log.GLOBAL_TAG;
	  return '[' + tag + '] > ' + msg;
	}
	/**
	 * Log Object
	 */

	var Log = function () {
	  function Log() {
	    _classCallCheck(this, Log);
	  }

	  _createClass(Log, null, [{
	    key: 'error',

	    /**
	     * equal to console.error, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {boolean}
	     */
	    value: function error(tag, msg) {
	      if (!Log.ENABLE_ERROR) {
	        return;
	      }

	      (console.error || console.warn || console.log).call(console, formatter(tag, msg));
	    }
	    /**
	     * equal to console.info, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {string}
	     */

	  }, {
	    key: 'info',
	    value: function info(tag, msg) {
	      if (!Log.ENABLE_INFO) {
	        return;
	      }
	      (console.info || console.log).call(console, formatter(tag, msg));
	    }
	    /**
	     * equal to console.warn, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	  }, {
	    key: 'warn',
	    value: function warn(tag, msg) {
	      if (!Log.ENABLE_WARN) {
	        return;
	      }
	      (console.warn || console.log).call(console, formatter(tag, msg));
	    }
	    /**
	     * equal to console.debug, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	  }, {
	    key: 'debug',
	    value: function debug(tag, msg) {
	      if (!Log.ENABLE_DEBUG) {
	        return;
	      }
	      (console.debug || console.log).call(console, formatter(tag, msg));
	    }
	    /**
	     * equal to console.verbose, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	  }, {
	    key: 'verbose',
	    value: function verbose(tag, msg) {
	      if (!Log.ENABLE_VERBOSE) {
	        return;
	      }
	      console.log(formatter(tag, msg));
	    }
	  }]);

	  return Log;
	}();

	Log.GLOBAL_TAG = 'chimee';
	Log.FORCE_GLOBAL_TAG = false;
	Log.ENABLE_ERROR = true;
	Log.ENABLE_INFO = true;
	Log.ENABLE_WARN = true;
	Log.ENABLE_DEBUG = true;
	Log.ENABLE_VERBOSE = true;

	var uaParser = createCommonjsModule(function (module, exports) {
	/**
	 * UAParser.js v0.7.17
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
	 * Dual licensed under GPLv2 & MIT
	 */

	(function (window, undefined) {

	    //////////////
	    // Constants
	    /////////////


	    var LIBVERSION  = '0.7.17',
	        EMPTY       = '',
	        UNKNOWN     = '?',
	        FUNC_TYPE   = 'function',
	        UNDEF_TYPE  = 'undefined',
	        OBJ_TYPE    = 'object',
	        STR_TYPE    = 'string',
	        MAJOR       = 'major', // deprecated
	        MODEL       = 'model',
	        NAME        = 'name',
	        TYPE        = 'type',
	        VENDOR      = 'vendor',
	        VERSION     = 'version',
	        ARCHITECTURE= 'architecture',
	        CONSOLE     = 'console',
	        MOBILE      = 'mobile',
	        TABLET      = 'tablet',
	        SMARTTV     = 'smarttv',
	        WEARABLE    = 'wearable',
	        EMBEDDED    = 'embedded';


	    ///////////
	    // Helper
	    //////////


	    var util = {
	        extend : function (regexes, extensions) {
	            var margedRegexes = {};
	            for (var i in regexes) {
	                if (extensions[i] && extensions[i].length % 2 === 0) {
	                    margedRegexes[i] = extensions[i].concat(regexes[i]);
	                } else {
	                    margedRegexes[i] = regexes[i];
	                }
	            }
	            return margedRegexes;
	        },
	        has : function (str1, str2) {
	          if (typeof str1 === "string") {
	            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
	          } else {
	            return false;
	          }
	        },
	        lowerize : function (str) {
	            return str.toLowerCase();
	        },
	        major : function (version) {
	            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
	        },
	        trim : function (str) {
	          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	        }
	    };


	    ///////////////
	    // Map helper
	    //////////////


	    var mapper = {

	        rgx : function (ua, arrays) {

	            //var result = {},
	            var i = 0, j, k, p, q, matches, match;//, args = arguments;

	            /*// construct object barebones
	            for (p = 0; p < args[1].length; p++) {
	                q = args[1][p];
	                result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
	            }*/

	            // loop through all regexes maps
	            while (i < arrays.length && !matches) {

	                var regex = arrays[i],       // even sequence (0,2,4,..)
	                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
	                j = k = 0;

	                // try matching uastring with regexes
	                while (j < regex.length && !matches) {

	                    matches = regex[j++].exec(ua);

	                    if (!!matches) {
	                        for (p = 0; p < props.length; p++) {
	                            match = matches[++k];
	                            q = props[p];
	                            // check if given property is actually array
	                            if (typeof q === OBJ_TYPE && q.length > 0) {
	                                if (q.length == 2) {
	                                    if (typeof q[1] == FUNC_TYPE) {
	                                        // assign modified match
	                                        this[q[0]] = q[1].call(this, match);
	                                    } else {
	                                        // assign given value, ignore regex match
	                                        this[q[0]] = q[1];
	                                    }
	                                } else if (q.length == 3) {
	                                    // check whether function or regex
	                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                                        // call function (usually string mapper)
	                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
	                                    } else {
	                                        // sanitize match using given regex
	                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
	                                    }
	                                } else if (q.length == 4) {
	                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
	                                }
	                            } else {
	                                this[q] = match ? match : undefined;
	                            }
	                        }
	                    }
	                }
	                i += 2;
	            }
	            // console.log(this);
	            //return this;
	        },

	        str : function (str, map) {

	            for (var i in map) {
	                // check if array
	                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
	                    for (var j = 0; j < map[i].length; j++) {
	                        if (util.has(map[i][j], str)) {
	                            return (i === UNKNOWN) ? undefined : i;
	                        }
	                    }
	                } else if (util.has(map[i], str)) {
	                    return (i === UNKNOWN) ? undefined : i;
	                }
	            }
	            return str;
	        }
	    };


	    ///////////////
	    // String map
	    //////////////


	    var maps = {

	        browser : {
	            oldsafari : {
	                version : {
	                    '1.0'   : '/8',
	                    '1.2'   : '/1',
	                    '1.3'   : '/3',
	                    '2.0'   : '/412',
	                    '2.0.2' : '/416',
	                    '2.0.3' : '/417',
	                    '2.0.4' : '/419',
	                    '?'     : '/'
	                }
	            }
	        },

	        device : {
	            amazon : {
	                model : {
	                    'Fire Phone' : ['SD', 'KF']
	                }
	            },
	            sprint : {
	                model : {
	                    'Evo Shift 4G' : '7373KT'
	                },
	                vendor : {
	                    'HTC'       : 'APA',
	                    'Sprint'    : 'Sprint'
	                }
	            }
	        },

	        os : {
	            windows : {
	                version : {
	                    'ME'        : '4.90',
	                    'NT 3.11'   : 'NT3.51',
	                    'NT 4.0'    : 'NT4.0',
	                    '2000'      : 'NT 5.0',
	                    'XP'        : ['NT 5.1', 'NT 5.2'],
	                    'Vista'     : 'NT 6.0',
	                    '7'         : 'NT 6.1',
	                    '8'         : 'NT 6.2',
	                    '8.1'       : 'NT 6.3',
	                    '10'        : ['NT 6.4', 'NT 10.0'],
	                    'RT'        : 'ARM'
	                }
	            }
	        }
	    };


	    //////////////
	    // Regex map
	    /////////////


	    var regexes = {

	        browser : [[

	            // Presto based
	            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
	            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
	            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
	            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
	            ], [NAME, VERSION], [

	            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
	            ], [[NAME, 'Opera Mini'], VERSION], [

	            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
	            ], [[NAME, 'Opera'], VERSION], [

	            // Mixed
	            /(kindle)\/([\w\.]+)/i,                                             // Kindle
	            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
	                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

	            // Trident based
	            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
	                                                                                // Avant/IEMobile/SlimBrowser/Baidu
	            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

	            // Webkit/KHTML based
	            /(rekonq)\/([\w\.]+)*/i,                                            // Rekonq
	            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser)\/([\w\.-]+)/i
	                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
	            ], [NAME, VERSION], [

	            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
	            ], [[NAME, 'IE'], VERSION], [

	            /(edge)\/((\d+)?[\w\.]+)/i                                          // Microsoft Edge
	            ], [NAME, VERSION], [

	            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
	            ], [[NAME, 'Yandex'], VERSION], [

	            /(puffin)\/([\w\.]+)/i                                              // Puffin
	            ], [[NAME, 'Puffin'], VERSION], [

	            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
	                                                                                // UCBrowser
	            ], [[NAME, 'UCBrowser'], VERSION], [

	            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
	            ], [[NAME, /_/g, ' '], VERSION], [

	            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
	            ], [[NAME, 'WeChat'], VERSION], [

	            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
	            ], [NAME, VERSION], [

	            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
	            ], [NAME, VERSION], [

	            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
	            ], [VERSION, [NAME, 'MIUI Browser']], [

	            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
	            ], [VERSION, [NAME, 'Facebook']], [

	            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
	            ], [VERSION, [NAME, 'Chrome Headless']], [

	            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
	            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

	            /((?:oculus|samsung)browser)\/([\w\.]+)/i
	            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

	            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
	            ], [VERSION, [NAME, 'Android Browser']], [

	            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
	                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
	            ], [NAME, VERSION], [

	            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
	            ], [[NAME, 'Dolphin'], VERSION], [

	            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
	            ], [[NAME, 'Chrome'], VERSION], [

	            /(coast)\/([\w\.]+)/i                                               // Opera Coast
	            ], [[NAME, 'Opera Coast'], VERSION], [

	            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
	            ], [VERSION, [NAME, 'Firefox']], [

	            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
	            ], [VERSION, [NAME, 'Mobile Safari']], [

	            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
	            ], [VERSION, NAME], [

	            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
	            ], [[NAME, 'GSA'], VERSION], [

	            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
	            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

	            /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
	            /(webkit|khtml)\/([\w\.]+)/i
	            ], [NAME, VERSION], [

	            // Gecko based
	            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
	            ], [[NAME, 'Netscape'], VERSION], [
	            /(swiftfox)/i,                                                      // Swiftfox
	            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
	                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
	            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
	                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

	            // Other
	            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
	                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
	            /(links)\s\(([\w\.]+)/i,                                            // Links
	            /(gobrowser)\/?([\w\.]+)*/i,                                        // GoBrowser
	            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
	            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
	            ], [NAME, VERSION]

	            /* /////////////////////
	            // Media players BEGIN
	            ////////////////////////

	            , [

	            /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
	            /(coremedia) v((\d+)[\w\._]+)/i
	            ], [NAME, VERSION], [

	            /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
	            ], [NAME, VERSION], [

	            /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
	            ], [NAME, VERSION], [

	            /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
	                                                                                // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
	                                                                                // NSPlayer/PSP-InternetRadioPlayer/Videos
	            /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
	            /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
	            /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
	            ], [NAME, VERSION], [
	            /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
	            ], [NAME, VERSION], [

	            /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
	            ], [[NAME, 'Flip Player'], VERSION], [

	            /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
	                                                                                // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
	            ], [NAME], [

	            /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
	                                                                                // Gstreamer
	            ], [NAME, VERSION], [

	            /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
	            /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
	                                                                                // Java/urllib/requests/wget/cURL
	            /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
	            ], [NAME, VERSION], [

	            /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
	            ], [[NAME, /_/g, ' '], VERSION], [

	            /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
	                                                                                // MPlayer SVN
	            ], [NAME, VERSION], [

	            /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
	            ], [NAME, VERSION], [

	            /(mplayer)/i,                                                       // MPlayer (no other info)
	            /(yourmuze)/i,                                                      // YourMuze
	            /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
	            ], [NAME], [

	            /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
	            ], [NAME, VERSION], [

	            /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
	            ], [NAME, VERSION], [

	            /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
	            ], [NAME, VERSION], [

	            /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
	            /(winamp)\s((\d+)[\w\.-]+)/i,
	            /(winamp)mpeg\/((\d+)[\w\.-]+)/i
	            ], [NAME, VERSION], [

	            /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
	                                                                                // inlight radio
	            ], [NAME], [

	            /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
	                                                                                // QuickTime/RealMedia/RadioApp/RadioClientApplication/
	                                                                                // SoundTap/Totem/Stagefright/Streamium
	            ], [NAME, VERSION], [

	            /(smp)((\d+)[\d\.]+)/i                                              // SMP
	            ], [NAME, VERSION], [

	            /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
	            /(vlc)\/((\d+)[\w\.-]+)/i,
	            /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
	            /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
	            /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
	            ], [NAME, VERSION], [

	            /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
	            /(windows-media-player)\/((\d+)[\w\.-]+)/i
	            ], [[NAME, /-/g, ' '], VERSION], [

	            /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
	                                                                                // Windows Media Server
	            ], [VERSION, [NAME, 'Windows']], [

	            /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
	            ], [NAME, VERSION], [

	            /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
	            /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
	            ], [[NAME, 'rad.io'], VERSION]

	            //////////////////////
	            // Media players END
	            ////////////////////*/

	        ],

	        cpu : [[

	            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
	            ], [[ARCHITECTURE, 'amd64']], [

	            /(ia32(?=;))/i                                                      // IA32 (quicktime)
	            ], [[ARCHITECTURE, util.lowerize]], [

	            /((?:i[346]|x)86)[;\)]/i                                            // IA32
	            ], [[ARCHITECTURE, 'ia32']], [

	            // PocketPC mistakenly identified as PowerPC
	            /windows\s(ce|mobile);\sppc;/i
	            ], [[ARCHITECTURE, 'arm']], [

	            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
	            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

	            /(sun4\w)[;\)]/i                                                    // SPARC
	            ], [[ARCHITECTURE, 'sparc']], [

	            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
	                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
	            ], [[ARCHITECTURE, util.lowerize]]
	        ],

	        device : [[

	            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
	            ], [MODEL, VENDOR, [TYPE, TABLET]], [

	            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
	            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

	            /(apple\s{0,1}tv)/i                                                 // Apple TV
	            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

	            /(archos)\s(gamepad2?)/i,                                           // Archos
	            /(hp).+(touchpad)/i,                                                // HP TouchPad
	            /(hp).+(tablet)/i,                                                  // HP Tablet
	            /(kindle)\/([\w\.]+)/i,                                             // Kindle
	            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
	            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i                               // Kindle Fire HD
	            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
	            /(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i                  // Fire Phone
	            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [

	            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
	            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
	            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
	            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

	            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
	            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
	                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
	            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
	            /(asus)-?(\w+)/i                                                    // Asus
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
	            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
	                                                                                // Asus Tablets
	            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i
	            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

	            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
	            /(sony)?(?:sgp.+)\sbuild\//i
	            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
	            /android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i
	            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

	            /\s(ouya)\s/i,                                                      // Ouya
	            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
	            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

	            /android.+;\s(shield)\sbuild/i                                      // Nvidia
	            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

	            /(playstation\s[34portablevi]+)/i                                   // Playstation
	            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

	            /(sprint\s(\w+))/i                                                  // Sprint Phones
	            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

	            /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i                         // Lenovo tablets
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
	            /(zte)-(\w+)*/i,                                                    // ZTE
	            /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
	                                                                                // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
	            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

	            /(nexus\s9)/i                                                       // HTC Nexus 9
	            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

	            /d\/huawei([\w\s-]+)[;\)]/i,
	            /(nexus\s6p)/i                                                      // Huawei
	            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

	            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

	            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
	            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
	            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
	            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

	                                                                                // Motorola
	            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
	            /mot[\s-]?(\w+)*/i,
	            /(XT\d{3,4}) build\//i,
	            /(nexus\s6)/i
	            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
	            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
	            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

	            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
	            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

	            /hbbtv.+maple;(\d+)/i
	            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

	            /\(dtv[\);].+(aquos)/i                                              // Sharp
	            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

	            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
	            /((SM-T\w+))/i
	            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
	            /smart-tv.+(samsung)/i
	            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
	            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
	            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
	            /sec-((sgh\w+))/i
	            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

	            /sie-(\w+)*/i                                                       // Siemens
	            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

	            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
	            /(nokia)[\s_-]?([\w-]+)*/i
	            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

	            /android\s3\.[\s\w;-]{10}(a\d{3})/i                                 // Acer
	            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

	            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
	            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
	            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
	            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
	            /(lg) netcast\.tv/i                                                 // LG SmartTV
	            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
	            /(nexus\s[45])/i,                                                   // LG
	            /lg[e;\s\/-]+(\w+)*/i,
	            /android.+lg(\-?[\d\w]+)\s+build/i
	            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

	            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
	            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

	            /linux;.+((jolla));/i                                               // Jolla
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

	            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
	            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

	            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

	            /crkey/i                                                            // Google Chromecast
	            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [

	            /android.+;\s(glass)\s\d/i                                          // Google Glass
	            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

	            /android.+;\s(pixel c)\s/i                                          // Google Pixel C
	            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

	            /android.+;\s(pixel xl|pixel)\s/i                                   // Google Pixel
	            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

	            /android.+(\w+)\s+build\/hm\1/i,                                    // Xiaomi Hongmi 'numeric' models
	            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
	            /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i,    // Xiaomi Mi
	            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+)?)\s+build/i      // Redmi Phones
	            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
	            /android.+(mi[\s\-_]*(?:pad)?(?:[\s_]*[\w\s]+)?)\s+build/i          // Mi Pad tablets
	            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
	            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu Tablet
	            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [

	            /android.+a000(1)\s+build/i                                         // OnePlus
	            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

	            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
	            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Venue[\d\s]*)\s+build/i                          // Dell Venue Tablets
	            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
	            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

	            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
	            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
	            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(zte)?.+(k\d{2})\s+build/i                        // ZTE K Series Tablet
	            ], [[VENDOR, 'ZTE'], MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
	            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

	            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
	            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
	            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

	            /(android).+[;\/]\s+([YR]\d{2}x?.*)\s+build/i,
	            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(.+)\s+build/i          // Dragon Touch Tablet
	            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s*(NS-?.+)\s+build/i                                // Insignia Tablets
	            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*((NX|Next)-?.+)\s+build/i                         // NextBook Tablets
	            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Xtreme\_?)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
	            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

	            /android.+[;\/]\s*(LVTEL\-?)?(V1[12])\s+build/i                     // LvTel Phones
	            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

	            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
	            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(.*\b)\s+build/i             // Le Pan Tablets
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
	            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
	            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

	            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
	            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

	            /android.+(Gigaset)[\s\-]+(Q.+)\s+build/i                           // Gigaset Tablets
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
	            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
	            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

	            /(android.+)[;\/].+build/i                                          // Generic Android Device
	            ], [MODEL, [VENDOR, 'Generic']]


	        /*//////////////////////////
	            // TODO: move to string map
	            ////////////////////////////

	            /(C6603)/i                                                          // Sony Xperia Z C6603
	            ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	            /(C6903)/i                                                          // Sony Xperia Z 1
	            ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [

	            /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
	            ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
	            ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
	            ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-G313HZ)/i                                                      // Samsung Galaxy V
	            ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
	            ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	            /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
	            ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
	            ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [

	            /(T3C)/i                                                            // Advan Vandroid T3C
	            ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
	            /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
	            ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
	            /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
	            ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [

	            /(V972M)/i                                                          // ZTE V972M
	            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [

	            /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	            /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
	            ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	            /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	            /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
	            ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [

	            /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
	            ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [

	            /////////////
	            // END TODO
	            ///////////*/

	        ],

	        engine : [[

	            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
	            ], [VERSION, [NAME, 'EdgeHTML']], [

	            /(presto)\/([\w\.]+)/i,                                             // Presto
	            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
	            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
	            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
	            ], [NAME, VERSION], [

	            /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
	            ], [VERSION, NAME]
	        ],

	        os : [[

	            // Windows based
	            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
	            ], [NAME, VERSION], [
	            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
	            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i,                  // Windows Phone
	            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
	            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
	            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
	            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

	            // Mobile/Embedded OS
	            /\((bb)(10);/i                                                      // BlackBerry 10
	            ], [[NAME, 'BlackBerry'], VERSION], [
	            /(blackberry)\w*\/?([\w\.]+)*/i,                                    // Blackberry
	            /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
	            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
	                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
	            /linux;.+(sailfish);/i                                              // Sailfish OS
	            ], [NAME, VERSION], [
	            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i                 // Symbian
	            ], [[NAME, 'Symbian'], VERSION], [
	            /\((series40);/i                                                    // Series 40
	            ], [NAME], [
	            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
	            ], [[NAME, 'Firefox OS'], VERSION], [

	            // Console
	            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

	            // GNU/Linux based
	            /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
	            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
	            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i,
	                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
	                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
	            /(hurd|linux)\s?([\w\.]+)*/i,                                       // Hurd/Linux
	            /(gnu)\s?([\w\.]+)*/i                                               // GNU
	            ], [NAME, VERSION], [

	            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
	            ], [[NAME, 'Chromium OS'], VERSION],[

	            // Solaris
	            /(sunos)\s?([\w\.]+\d)*/i                                           // Solaris
	            ], [[NAME, 'Solaris'], VERSION], [

	            // BSD based
	            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i                   // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
	            ], [NAME, VERSION],[

	            /(haiku)\s(\w+)/i                                                  // Haiku
	            ], [NAME, VERSION],[

	            /cfnetwork\/.+darwin/i,
	            /ip[honead]+(?:.*os\s([\w]+)\slike\smac|;\sopera)/i                 // iOS
	            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

	            /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
	            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
	            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

	            // Other
	            /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,                            // Solaris
	            /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,                               // AIX
	            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
	                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
	            /(unix)\s?([\w\.]+)*/i                                              // UNIX
	            ], [NAME, VERSION]
	        ]
	    };


	    /////////////////
	    // Constructor
	    ////////////////
	    /*
	    var Browser = function (name, version) {
	        this[NAME] = name;
	        this[VERSION] = version;
	    };
	    var CPU = function (arch) {
	        this[ARCHITECTURE] = arch;
	    };
	    var Device = function (vendor, model, type) {
	        this[VENDOR] = vendor;
	        this[MODEL] = model;
	        this[TYPE] = type;
	    };
	    var Engine = Browser;
	    var OS = Browser;
	    */
	    var UAParser = function (uastring, extensions) {

	        if (typeof uastring === 'object') {
	            extensions = uastring;
	            uastring = undefined;
	        }

	        if (!(this instanceof UAParser)) {
	            return new UAParser(uastring, extensions).getResult();
	        }

	        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
	        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
	        //var browser = new Browser();
	        //var cpu = new CPU();
	        //var device = new Device();
	        //var engine = new Engine();
	        //var os = new OS();

	        this.getBrowser = function () {
	            var browser = { name: undefined, version: undefined };
	            mapper.rgx.call(browser, ua, rgxmap.browser);
	            browser.major = util.major(browser.version); // deprecated
	            return browser;
	        };
	        this.getCPU = function () {
	            var cpu = { architecture: undefined };
	            mapper.rgx.call(cpu, ua, rgxmap.cpu);
	            return cpu;
	        };
	        this.getDevice = function () {
	            var device = { vendor: undefined, model: undefined, type: undefined };
	            mapper.rgx.call(device, ua, rgxmap.device);
	            return device;
	        };
	        this.getEngine = function () {
	            var engine = { name: undefined, version: undefined };
	            mapper.rgx.call(engine, ua, rgxmap.engine);
	            return engine;
	        };
	        this.getOS = function () {
	            var os = { name: undefined, version: undefined };
	            mapper.rgx.call(os, ua, rgxmap.os);
	            return os;
	        };
	        this.getResult = function () {
	            return {
	                ua      : this.getUA(),
	                browser : this.getBrowser(),
	                engine  : this.getEngine(),
	                os      : this.getOS(),
	                device  : this.getDevice(),
	                cpu     : this.getCPU()
	            };
	        };
	        this.getUA = function () {
	            return ua;
	        };
	        this.setUA = function (uastring) {
	            ua = uastring;
	            //browser = new Browser();
	            //cpu = new CPU();
	            //device = new Device();
	            //engine = new Engine();
	            //os = new OS();
	            return this;
	        };
	        return this;
	    };

	    UAParser.VERSION = LIBVERSION;
	    UAParser.BROWSER = {
	        NAME    : NAME,
	        MAJOR   : MAJOR, // deprecated
	        VERSION : VERSION
	    };
	    UAParser.CPU = {
	        ARCHITECTURE : ARCHITECTURE
	    };
	    UAParser.DEVICE = {
	        MODEL   : MODEL,
	        VENDOR  : VENDOR,
	        TYPE    : TYPE,
	        CONSOLE : CONSOLE,
	        MOBILE  : MOBILE,
	        SMARTTV : SMARTTV,
	        TABLET  : TABLET,
	        WEARABLE: WEARABLE,
	        EMBEDDED: EMBEDDED
	    };
	    UAParser.ENGINE = {
	        NAME    : NAME,
	        VERSION : VERSION
	    };
	    UAParser.OS = {
	        NAME    : NAME,
	        VERSION : VERSION
	    };
	    //UAParser.Utils = util;

	    ///////////
	    // Export
	    //////////


	    // check js environment
	    if ('object' !== UNDEF_TYPE) {
	        // nodejs env
	        if ('object' !== UNDEF_TYPE && module.exports) {
	            exports = module.exports = UAParser;
	        }
	        // TODO: test!!!!!!!!
	        /*
	        if (require && require.main === module && process) {
	            // cli
	            var jsonize = function (arr) {
	                var res = [];
	                for (var i in arr) {
	                    res.push(new UAParser(arr[i]).getResult());
	                }
	                process.stdout.write(JSON.stringify(res, null, 2) + '\n');
	            };
	            if (process.stdin.isTTY) {
	                // via args
	                jsonize(process.argv.slice(2));
	            } else {
	                // via pipe
	                var str = '';
	                process.stdin.on('readable', function() {
	                    var read = process.stdin.read();
	                    if (read !== null) {
	                        str += read;
	                    }
	                });
	                process.stdin.on('end', function () {
	                    jsonize(str.replace(/\n$/, '').split('\n'));
	                });
	            }
	        }
	        */
	        exports.UAParser = UAParser;
	    } else {
	        // requirejs env (optional)
	        if (typeof(undefined) === FUNC_TYPE && undefined.amd) {
	            undefined(function () {
	                return UAParser;
	            });
	        } else if (window) {
	            // browser env
	            window.UAParser = UAParser;
	        }
	    }

	    // jQuery/Zepto specific (optional)
	    // Note:
	    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
	    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
	    //   and we should catch that.
	    var $ = window && (window.jQuery || window.Zepto);
	    if (typeof $ !== UNDEF_TYPE) {
	        var parser = new UAParser();
	        $.ua = parser.getResult();
	        $.ua.get = function () {
	            return parser.getUA();
	        };
	        $.ua.set = function (uastring) {
	            parser.setUA(uastring);
	            var result = parser.getResult();
	            for (var prop in result) {
	                $.ua[prop] = result[prop];
	            }
	        };
	    }

	})(typeof window === 'object' ? window : commonjsGlobal);
	});
	var uaParser_1 = uaParser.UAParser;

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var _iterCall$1 = /*#__PURE__*/Object.freeze({
		default: _iterCall,
		__moduleExports: _iterCall
	});

	// check on default Array iterator

	var ITERATOR$1 = require$$0$4('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _isArrayIter$1 = /*#__PURE__*/Object.freeze({
		default: _isArrayIter,
		__moduleExports: _isArrayIter
	});

	var _createProperty = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

	var _createProperty$1 = /*#__PURE__*/Object.freeze({
		default: _createProperty,
		__moduleExports: _createProperty
	});

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = require$$0$4('toStringTag');
	// ES3 wrong here
	var ARG = require$$1$1(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? require$$1$1(O)
	    // ES3 arguments fallback
	    : (B = require$$1$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _classof$1 = /*#__PURE__*/Object.freeze({
		default: _classof,
		__moduleExports: _classof
	});

	var classof = ( _classof$1 && _classof ) || _classof$1;

	var ITERATOR$2 = require$$0$4('iterator');

	var core_getIteratorMethod = require$$1.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

	var core_getIteratorMethod$1 = /*#__PURE__*/Object.freeze({
		default: core_getIteratorMethod,
		__moduleExports: core_getIteratorMethod
	});

	var ITERATOR$3 = require$$0$4('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var _iterDetect$1 = /*#__PURE__*/Object.freeze({
		default: _iterDetect,
		__moduleExports: _iterDetect
	});

	var call = ( _iterCall$1 && _iterCall ) || _iterCall$1;

	var isArrayIter = ( _isArrayIter$1 && _isArrayIter ) || _isArrayIter$1;

	var createProperty = ( _createProperty$1 && _createProperty ) || _createProperty$1;

	var getIterFn = ( core_getIteratorMethod$1 && core_getIteratorMethod ) || core_getIteratorMethod$1;

	var require$$0$18 = ( _iterDetect$1 && _iterDetect ) || _iterDetect$1;

	$export$1($export$1.S + $export$1.F * !require$$0$18(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var from = require$$1.Array.from;

	var from$1 = /*#__PURE__*/Object.freeze({
		default: from,
		__moduleExports: from
	});

	var require$$0$19 = ( from$1 && from ) || from$1;

	var from$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$19, __esModule: true };
	});

	var _Array$from = unwrapExports(from$2);

	var from$3 = /*#__PURE__*/Object.freeze({
		default: _Array$from,
		__moduleExports: from$2
	});

	var _from = ( from$3 && _Array$from ) || from$3;

	var toConsumableArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};
	});

	unwrapExports(toConsumableArray);

	/**
	 * the handler to generate an deep traversal handler
	 * @param  {Function} fn the function you wanna run when you reach in the deep property
	 * @return {Function}    the handler
	 */
	function genTraversalHandler(fn) {
	  var setter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (target, key, value) {
	    target[key] = value;
	  };

	  // use recursive to move what in source to the target
	  // if you do not provide a target, we will create a new target
	  function recursiveFn(source, target, key) {
	    if (isArray$1(source) || isObject$1(source)) {
	      target = isPrimitive(target) ? isObject$1(source) ? {} : [] : target;
	      for (var _key in source) {
	        // $FlowFixMe: support computed key here
	        setter(target, _key, recursiveFn(source[_key], target[_key], _key));
	        // target[key] = recursiveFn(source[key], target[key], key);
	      }
	      return target;
	    }
	    return fn(source, target, key);
	  }
	  return recursiveFn;
	}
	var _deepAssign = genTraversalHandler(function (val) {
	  return val;
	});
	/**
	 * merge multiple objects
	 * @param  {...Object} args [description]
	 * @return {merge-object}         [description]
	 */
	function deepAssign() {
	  for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  if (args.length < 2) {
	    throw new Error('deepAssign accept two and more argument');
	  }
	  for (var i = args.length - 1; i > -1; i--) {
	    if (isPrimitive(args[i])) {
	      throw new TypeError('deepAssign only accept non primitive type');
	    }
	  }
	  var target = args.shift();
	  args.forEach(function (source) {
	    return _deepAssign(source, target);
	  });
	  return target;
	}

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _anInstance$1 = /*#__PURE__*/Object.freeze({
		default: _anInstance,
		__moduleExports: _anInstance
	});

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var _forOf$1 = /*#__PURE__*/Object.freeze({
		default: _forOf,
		__moduleExports: _forOf
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES = require$$0$4('species');
	var _speciesConstructor = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

	var _speciesConstructor$1 = /*#__PURE__*/Object.freeze({
		default: _speciesConstructor,
		__moduleExports: _speciesConstructor
	});

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var _invoke$1 = /*#__PURE__*/Object.freeze({
		default: _invoke,
		__moduleExports: _invoke
	});

	var invoke = ( _invoke$1 && _invoke ) || _invoke$1;

	var process = require$$0.process;
	var setTask = require$$0.setImmediate;
	var clearTask = require$$0.clearImmediate;
	var MessageChannel = require$$0.MessageChannel;
	var Dispatch = require$$0.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (require$$1$1(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (require$$0.addEventListener && typeof postMessage == 'function' && !require$$0.importScripts) {
	    defer = function (id) {
	      require$$0.postMessage(id + '', '*');
	    };
	    require$$0.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};
	var _task_1 = _task.set;
	var _task_2 = _task.clear;

	var _task$1 = /*#__PURE__*/Object.freeze({
		default: _task,
		__moduleExports: _task,
		set: _task_1,
		clear: _task_2
	});

	var require$$0$20 = ( _task$1 && _task ) || _task$1;

	var macrotask = require$$0$20.set;
	var Observer = require$$0.MutationObserver || require$$0.WebKitMutationObserver;
	var process$1 = require$$0.process;
	var Promise = require$$0.Promise;
	var isNode$1 = require$$1$1(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode$1 && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode$1) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(require$$0.navigator && require$$0.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    var promise = Promise.resolve();
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(require$$0, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	var _microtask$1 = /*#__PURE__*/Object.freeze({
		default: _microtask,
		__moduleExports: _microtask
	});

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$7
	};

	var _newPromiseCapability$1 = /*#__PURE__*/Object.freeze({
		default: _newPromiseCapability,
		__moduleExports: _newPromiseCapability,
		f: f$7
	});

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var _perform$1 = /*#__PURE__*/Object.freeze({
		default: _perform,
		__moduleExports: _perform
	});

	var newPromiseCapability = ( _newPromiseCapability$1 && _newPromiseCapability ) || _newPromiseCapability$1;

	var _promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _promiseResolve$1 = /*#__PURE__*/Object.freeze({
		default: _promiseResolve,
		__moduleExports: _promiseResolve
	});

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

	var _redefineAll$1 = /*#__PURE__*/Object.freeze({
		default: _redefineAll,
		__moduleExports: _redefineAll
	});

	var SPECIES$1 = require$$0$4('species');

	var _setSpecies = function (KEY) {
	  var C = typeof require$$1[KEY] == 'function' ? require$$1[KEY] : require$$0[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES$1]) $defineProperty.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var _setSpecies$1 = /*#__PURE__*/Object.freeze({
		default: _setSpecies,
		__moduleExports: _setSpecies
	});

	var anInstance = ( _anInstance$1 && _anInstance ) || _anInstance$1;

	var forOf = ( _forOf$1 && _forOf ) || _forOf$1;

	var speciesConstructor = ( _speciesConstructor$1 && _speciesConstructor ) || _speciesConstructor$1;

	var require$$1$5 = ( _microtask$1 && _microtask ) || _microtask$1;

	var perform = ( _perform$1 && _perform ) || _perform$1;

	var promiseResolve = ( _promiseResolve$1 && _promiseResolve ) || _promiseResolve$1;

	var require$$3 = ( _redefineAll$1 && _redefineAll ) || _redefineAll$1;

	var require$$5 = ( _setSpecies$1 && _setSpecies ) || _setSpecies$1;

	var task = require$$0$20.set;
	var microtask = require$$1$5();



	var PROMISE = 'Promise';
	var TypeError$1 = require$$0.TypeError;
	var process$2 = require$$0.process;
	var $Promise = require$$0[PROMISE];
	var isNode$2 = classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability$1 = newGenericPromiseCapability = newPromiseCapability.f;

	var USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[require$$0$4('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$2 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(require$$0, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode$2) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = require$$0.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = require$$0.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$2 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(require$$0, function () {
	    var handler;
	    if (isNode$2) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = require$$0.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE$1) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = require$$3($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability$1(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$2 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE$1, { Promise: $Promise });
	require$$4($Promise, PROMISE);
	require$$5(PROMISE);
	Wrapper = require$$1[PROMISE];

	// statics
	$export$1($export$1.S + $export$1.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export$1($export$1.S + $export$1.F * (LIBRARY || !USE_NATIVE$1), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export$1($export$1.S + $export$1.F * !(USE_NATIVE$1 && require$$0$18(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	$export$1($export$1.P + $export$1.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, require$$1.Promise || require$$0.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	// https://github.com/tc39/proposal-promise-try




	$export$1($export$1.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var promise = require$$1.Promise;

	var promise$1 = /*#__PURE__*/Object.freeze({
		default: promise,
		__moduleExports: promise
	});

	var require$$0$21 = ( promise$1 && promise ) || promise$1;

	var promise$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$21, __esModule: true };
	});

	unwrapExports(promise$2);

	// **********************  judgement   ************************
	/**
	 * check if the code running in browser environment (not include worker env)
	 * @returns {Boolean}
	 */
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// **********************  对象操作  ************************
	/**
	 * 转变一个类数组对象为数组
	 */
	function makeArray(obj) {
	  return _Array$from(obj);
	}

	// requestAnimationFrame
	var raf = inBrowser && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame) || function (cb) {
	  return setTimeout(cb, 17);
	};

	// cancelAnimationFrame
	var caf = inBrowser && (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame) || function (id) {
	  clearTimeout(id);
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	var _objectAssign$1 = /*#__PURE__*/Object.freeze({
		default: _objectAssign,
		__moduleExports: _objectAssign
	});

	var require$$0$22 = ( _objectAssign$1 && _objectAssign ) || _objectAssign$1;

	// 19.1.3.1 Object.assign(target, source)


	$export$1($export$1.S + $export$1.F, 'Object', { assign: require$$0$22 });

	var assign = require$$1.Object.assign;

	var assign$1 = /*#__PURE__*/Object.freeze({
		default: assign,
		__moduleExports: assign
	});

	var require$$0$23 = ( assign$1 && assign ) || assign$1;

	var assign$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$23, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign$2);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export$1($export$1.S, 'Object', { create: create });

	var $Object$1 = require$$1.Object;
	var create$1 = function create(P, D) {
	  return $Object$1.create(P, D);
	};

	var create$2 = /*#__PURE__*/Object.freeze({
		default: create$1,
		__moduleExports: create$1
	});

	var require$$0$24 = ( create$2 && create$1 ) || create$2;

	var create$3 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$24, __esModule: true };
	});

	var _Object$create = unwrapExports(create$3);

	var create$4 = /*#__PURE__*/Object.freeze({
		default: _Object$create,
		__moduleExports: create$3
	});

	/**
	* @module event
	* @author huzunjie
	* @description 自定义事件基础类
	*/

	/* 缓存事件监听方法及包装，内部数据格式：
	 * targetIndex_<type:'click|mouseup|done'>: [ [
	 *   function(){ ... handler ... },
	 *   function(){ ... handlerWrap ... handler.apply(target, arguments) ... },
	 *   isOnce
	 * ]]
	 */
	var _evtListenerCache = _Object$create(null);
	_evtListenerCache.count = 0;

	/**
	 * 得到某对象的某事件类型对应的监听队列数组
	 * @param  {Object}  target 发生事件的对象
	 * @param {String} type 事件类型(这里的时间类型不只是名称，还是缓存标识，可以通过添加后缀来区分)
	 * @return {Array}
	 */
	function getEvtTypeCache(target, type) {

	  var evtId = target.__evt_id;
	  if (!evtId) {

	    /* 设置__evt_id不可枚举 */
	    Object.defineProperty(target, '__evt_id', {
	      writable: true,
	      enumerable: false,
	      configurable: true
	    });

	    /* 空对象初始化绑定索引 */
	    evtId = target.__evt_id = ++_evtListenerCache.count;
	  }

	  var typeCacheKey = evtId + '_' + type;
	  var evtTypeCache = _evtListenerCache[typeCacheKey];
	  if (!evtTypeCache) {
	    evtTypeCache = _evtListenerCache[typeCacheKey] = [];
	  }

	  return evtTypeCache;
	}

	/**
	 * 触发事件监听方法
	 * @param  {Object}  target 发生事件的对象
	 * @param {String} type 事件类型
	 * @param {Object} eventObj 触发事件时要传回的event对象
	 * @return {undefined}
	 */
	function emitEventCache(target, type, eventObj) {
	  var evt = _Object$create(null);
	  evt.type = type;
	  evt.target = target;
	  if (eventObj) {
	    _Object$assign(evt, isObject$1(eventObj) ? eventObj : { data: eventObj });
	  }
	  getEvtTypeCache(target, type).forEach(function (item) {
	    (item[1] || item[0]).apply(target, [evt]);
	  });
	}

	/**
	 * 添加事件监听到缓存
	 * @param  {Object}  target 发生事件的对象
	 * @param {String} type 事件类型
	 * @param {Function} handler 监听函数
	 * @param {Boolean} isOnce 是否单次执行
	 * @param {Function} handlerWrap
	 * @return {undefined}
	 */
	function addEventCache(target, type, handler) {
	  var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  var handlerWrap = arguments[4];

	  if (isFunction(isOnce) && !handlerWrap) {
	    handlerWrap = isOnce;
	    isOnce = undefined;
	  }
	  var handlers = [handler, undefined, isOnce];
	  if (isOnce && !handlerWrap) {
	    handlerWrap = function handlerWrap() {
	      removeEventCache(target, type, handler, isOnce);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      handler.apply(target, args);
	    };
	  }
	  if (handlerWrap) {
	    handlers[1] = handlerWrap;
	  }
	  getEvtTypeCache(target, type).push(handlers);
	}

	/**
	 * 移除事件监听
	 * @param  {Object}  target 发生事件的对象
	 * @param {String} type 事件类型
	 * @param {Function} handler 监听函数
	 * @return {undefined}
	 */
	function removeEventCache(target, type, handler) {
	  var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  var typeCache = getEvtTypeCache(target, type);

	  if (handler || isOnce) {
	    /* 有指定 handler 则清除对应监听 */
	    var handlerId = -1;
	    var handlerWrap = void 0;
	    typeCache.find(function (item, i) {
	      if ((!handler || item[0] === handler) && (!isOnce || item[2])) {
	        handlerId = i;
	        handlerWrap = item[1];
	        return true;
	      }
	    });
	    if (handlerId !== -1) {
	      typeCache.splice(handlerId, 1);
	    }
	    return handlerWrap;
	  } else {
	    /* 未指定 handler 则清除type对应的所有监听 */
	    typeCache.length = 0;
	  }
	}

	/**
	 * @class CustEvent
	 * @description
	 * Event 自定义事件类
	 * 1. 可以使用不传参得到的实例作为eventBus使用
	 * 2. 可以通过指定target，用多个实例操作同一target对象的事件管理
	 * 3. 当设定target时，可以通过设置assign为true，来给target实现"on\once\off\emit"方法
	 * @param  {Object}  target 发生事件的对象（空则默认为event实例）
	 * @param  {Boolean}  assign 是否将"on\once\off\emit"方法实现到target对象上
	 * @return {event}
	 */
	var CustEvent = function () {
	  function CustEvent(target, assign) {
	    var _this = this;

	    _classCallCheck(this, CustEvent);

	    /* 设置__target不可枚举 */
	    Object.defineProperty(this, '__target', {
	      writable: true,
	      enumerable: false,
	      configurable: true
	    });
	    this.__target = this;

	    if (target) {

	      if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
	        throw new Error('CusEvent target are not object');
	      }
	      this.__target = target;

	      /* 为target实现on\once\off\emit */
	      if (assign) {
	        ['on', 'once', 'off', 'emit'].forEach(function (mth) {
	          target[mth] = _this[mth];
	        });
	      }
	    }
	  }

	  /**
	   * 添加事件监听
	   * @param {String} type 事件类型
	   * @param {Function} handler 监听函数
	   * @param {Boolean} isOnce 单次监听类型
	   * @return {event}
	   */


	  _createClass(CustEvent, [{
	    key: 'on',
	    value: function on(type, handler) {
	      var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      addEventCache(this.__target, type, handler, isOnce);
	      return this;
	    }

	    /**
	     * 添加事件监听,并且只执行一次
	     * @param {String} type 事件类型
	     * @param {Function} handler 监听函数
	     * @return {event}
	     */

	  }, {
	    key: 'once',
	    value: function once(type, handler) {
	      return this.on(type, handler, true);
	    }

	    /**
	     * 移除事件监听
	     * @param {String} type 事件类型
	     * @param {Function} handler 监听函数(不指定handler则清除type对应的所有事件监听)
	     * @param {Boolean} isOnce 单次监听类型
	     * @return {event}
	     */

	  }, {
	    key: 'off',
	    value: function off(type, handler) {
	      var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      removeEventCache(this.__target, type, handler, isOnce);
	      return this;
	    }

	    /**
	     * 触发事件监听函数
	     * @param {String} type 事件类型
	     * @return {event}
	     */

	  }, {
	    key: 'emit',
	    value: function emit(type, data) {
	      emitEventCache(this.__target, type, { data: data });
	      return this;
	    }
	  }]);

	  return CustEvent;
	}();

	/**
	 * @module dom
	 * @author huzunjie
	 * @description 一些常用的DOM判断及操作方法，可以使用dom.$('*')包装DOM，实现类jQuery的链式操作；当然这里的静态方法也可以直接使用。
	 */

	var _divEl = inBrowser ? document.createElement('div') : {};
	var _textAttrName = 'innerText';
	'textContent' in _divEl && (_textAttrName = 'textContent');
	var _arrPrototype = Array.prototype;

	/**
	 * 读取HTML元素属性值
	 * @param {HTMLElement} el 目标元素
	 * @param {String} attrName 目标属性名称
	 * @return {String}
	 */
	function getAttr(el, attrName) {
	  return el.getAttribute(attrName);
	}

	/**
	 * 设置HTML元素属性值
	 * @param {HTMLElement} el 目标元素
	 * @param {String} attrName 目标属性名称
	 * @param {String} attrVal 目标属性值
	 */
	function setAttr(el, attrName, attrVal) {
	  if (attrVal === undefined) {
	    el.removeAttribute(attrName);
	  } else {
	    el.setAttribute(attrName, attrVal);
	  }
	}

	/**
	 * 为HTML元素添加className
	 * @param {HTMLElement} el 目标元素
	 * @param {String} cls 要添加的className（多个以空格分割）
	 */
	function addClassName(el, cls) {
	  if (!cls || !(cls = cls.trim())) {
	    return;
	  }
	  var clsArr = cls.split(/\s+/);
	  if (el.classList) {
	    clsArr.forEach(function (c) {
	      return el.classList.add(c);
	    });
	  } else {
	    var curCls = ' ' + (el.className || '') + ' ';
	    clsArr.forEach(function (c) {
	      curCls.indexOf(' ' + c + ' ') === -1 && (curCls += ' ' + c);
	    });
	    el.className = curCls.trim();
	  }
	}

	/**
	 * 为HTML元素移除className
	 * @param {HTMLElement} el 目标元素
	 * @param {String} cls 要移除的className（多个以空格分割）
	 */
	function removeClassName(el, cls) {
	  if (!cls || !(cls = cls.trim())) {
	    return;
	  }

	  var clsArr = cls.split(/\s+/);
	  if (el.classList) {
	    clsArr.forEach(function (c) {
	      return el.classList.remove(c);
	    });
	  } else {
	    var curCls = ' ' + el.className + ' ';
	    clsArr.forEach(function (c) {
	      var tar = ' ' + c + ' ';
	      while (curCls.indexOf(tar) !== -1) {
	        curCls = curCls.replace(tar, ' ');
	      }
	    });
	    el.className = curCls.trim();
	  }
	}

	/**
	 * 检查HTML元素是否已设置className
	 * @param {HTMLElement} el 目标元素
	 * @param {String} className 要检查的className
	 * @return {Boolean}
	 */
	function hasClassName(el, className) {
	  return new RegExp('(?:^|\\s)' + className + '(?=\\s|$)').test(el.className);
	}

	/**
	 * addEventListener 是否已支持 passive
	 * @return {Boolean}
	 */
	var supportsPassive = false;
	try {
	  var opts = Object.defineProperty({}, 'passive', {
	    get: function get() {
	      supportsPassive = true;
	    }
	  });
	  if (inBrowser) window.addEventListener('test', null, opts);
	} catch (e) {
	  console.error(e);
	}

	/**
	 * 为HTML元素移除事件监听
	 * @param {HTMLElement} el 目标元素
	 * @param {String} type 事件名称
	 * @param {Function} handler 处理函数
	 * @param {Boolean} once 是否只监听一次
	 * @param {Boolean} capture 是否在捕获阶段的监听
	 */
	function removeEvent(el, type, handler) {
	  var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
	    capture = { passive: true };
	  }
	  if (once) {
	    /* 尝试从缓存中读取包装后的方法 */
	    var handlerWrap = removeEventCache(el, type + '_once', handler);
	    if (handlerWrap) {
	      handler = handlerWrap;
	    }
	  }
	  el.removeEventListener(type, handler, capture);
	}

	/**
	 * 为HTML元素添加事件监听
	 * @param {HTMLElement} el 目标元素
	 * @param {String} type 事件名称
	 * @param {Function} handler 处理函数
	 * @param {Boolean} once 是否只监听一次
	 * @param {Boolean|Object} capture 是否在捕获阶段监听，这里也可以传入 { passive: true } 表示被动模式
	 */
	function addEvent(el, type, handler) {
	  var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
	    capture = { passive: true };
	  }
	  if (once) {
	    var oldHandler = handler;
	    handler = function () {
	      return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        oldHandler.apply(this, args);
	        removeEvent(el, type, handler, once, capture);
	      };
	    }();
	    /* 将包装后的方法记录到缓存中 */
	    addEventCache(el, type + '_once', oldHandler, handler);
	  }

	  el.addEventListener(type, handler, capture);
	}

	/**
	 * 为HTML元素添加事件代理
	 * @param {HTMLElement} el 目标元素
	 * @param {String} selector 要被代理的元素
	 * @param {String} type 事件名称
	 * @param {Function} handler 处理函数
	 * @param {Boolean} capture 是否在捕获阶段监听
	 */
	function addDelegate(el, selector, type, handler) {
	  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
	    capture = { passive: true };
	  }
	  var handlerWrap = function handlerWrap(e) {
	    var targetElsArr = findParents(e.target || e.srcElement, el, true);
	    var targetElArr = query(selector, el, true);
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
	  addEventCache(el, type + '_delegate_' + selector, handler, handlerWrap);
	  el.addEventListener(type, handlerWrap, capture);
	}

	/**
	 * 为HTML元素移除事件代理
	 * @param {HTMLElement} el 目标元素
	 * @param {String} selector 要被代理的元素
	 * @param {String} type 事件名称
	 * @param {Function} handler 处理函数
	 * @param {Boolean} capture 是否在捕获阶段监听
	 */
	function removeDelegate(el, selector, type, handler) {
	  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
	    capture = { passive: true };
	  }
	  /* 尝试从缓存中读取包装后的方法 */
	  var handlerWrap = removeEventCache(el, type + '_delegate_' + selector, handler);
	  handlerWrap && el.removeEventListener(type, handlerWrap, capture);
	}

	/**
	 * 读取HTML元素样式值
	 * @param {HTMLElement} el 目标元素
	 * @param {String} key 样式key
	 * @return {String}
	 */
	function getStyle(el, key) {
	  return (el.currentStyle || document.defaultView.getComputedStyle(el, null))[key] || el.style[key];
	}

	/**
	 * 设置HTML元素样式值
	 * @param {HTMLElement} el 目标元素
	 * @param {String} key 样式key
	 * @param {String} val 样式值
	 */
	function setStyle(el, key, val) {
	  if (isObject$1(key)) {
	    for (var k in key) {
	      setStyle(el, k, key[k]);
	    }
	  } else {
	    el.style[key] = val;
	  }
	}

	/**
	 * 根据选择器查询目标元素
	 * @param {String} selector 选择器,用于 querySelectorAll
	 * @param {HTMLElement} container 父容器
	 * @param {Boolean} toArray 强制输出为数组
	 * @return {NodeList|Array}
	 */
	function query(selector) {
	  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	  var toArray = arguments[2];

	  var retNodeList = container.querySelectorAll(selector);
	  return toArray ? _Array$from(retNodeList) : retNodeList;
	}

	/**
	 * 从DOM树中移除el
	 * @param {HTMLElement} el 目标元素
	 */
	function removeEl(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * 查找元素的父节点们
	 * @param {HTMLElement} el 目标元素
	 * @param {HTMLElement} endEl 最大父容器（不指定则找到html）
	 * @param {Boolean} haveEl 包含当前元素
	 * @param {Boolean} haveEndEl 包含设定的最大父容器
	 */
	function findParents(el) {
	  var endEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	  var haveEl = arguments[2];
	  var haveEndEl = arguments[3];

	  var retEls = [];
	  if (haveEl) {
	    retEls.push(el);
	  }
	  while (el && el.parentNode !== endEl) {
	    el = el.parentNode;
	    el && retEls.push(el);
	  }
	  if (haveEndEl) {
	    retEls.push(endEl);
	  }
	  return retEls;
	}

	/**
	 * @class NodeWrap
	 * @description
	 * NodeWrap DOM包装器，用以实现基本的链式操作
	 * new dom.NodeWrap('*') 相当于 dom.$('*')
	 * 这里面用于DOM操作的属性方法都是基于上面静态方法实现，有需要可以随时修改补充
	 * @param {String} selector 选择器(兼容 String||HTMLString||NodeList||NodeArray||HTMLElement)
	 * @param {HTMLElement} container 父容器（默认为document）
	 */

	var NodeWrap = function () {
	  function NodeWrap(selector) {
	    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

	    _classCallCheck(this, NodeWrap);

	    var _this = this;
	    _this.selector = selector;

	    /* String||NodeList||HTMLElement 识别处理 */
	    var elsArr = void 0;
	    if (selector && selector.constructor === NodeList) {
	      /* 支持直接传入NodeList来构建包装器 */
	      elsArr = makeArray(selector);
	    } else if (isArray$1(selector)) {
	      /* 支持直接传入Node数组来构建包装器 */
	      elsArr = selector;
	    } else if (isString(selector)) {
	      if (selector.indexOf('<') === 0) {
	        /* 支持直接传入HTML字符串来新建DOM并构建包装器 */
	        _divEl.innerHTML = selector;
	        elsArr = query('*', _divEl, true);
	      } else {
	        /* 支持直接传入字符串选择器来查找DOM并构建包装器 */
	        elsArr = query(selector, container, true);
	      }
	    } else {
	      /* 其他任意对象直接构建包装器 */
	      elsArr = [selector];
	    }
	    _Object$assign(_this, elsArr);

	    /* NodeWrap本意可以 extends Array省略构造方法中下面这部分代码，但目前编译不支持 */
	    _this.length = elsArr.length;
	  }

	  /**
	   * 循环遍历DOM集合
	   * @param {Function} fn 遍历函数 fn(item, i)
	   * @return {Object}
	   */


	  _createClass(NodeWrap, [{
	    key: 'each',
	    value: function each() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      _arrPrototype.forEach.apply(this, args);
	      return this;
	    }

	    /**
	     * 添加元素到DOM集合
	     * @param {HTMLElement} el 要加入的元素
	     * @return {this}
	     */

	  }, {
	    key: 'push',
	    value: function push() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      _arrPrototype.push.apply(this, args);
	      return this;
	    }

	    /**
	     * 截取DOM集合片段，并得到新的包装器splice
	     * @param {Nubmer} start
	     * @param {Nubmer} count
	     * @return {NodeWrap} 新的DOM集合包装器
	     */

	  }, {
	    key: 'splice',
	    value: function splice() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return $(_arrPrototype.splice.apply(this, args));
	    }

	    /**
	     * 查找子元素
	     * @param {String} selector 选择器
	     * @return {NodeWrap} 新的DOM集合包装器
	     */

	  }, {
	    key: 'find',
	    value: function find(selector) {
	      var childs = [];
	      this.each(function (el) {
	        childs = childs.concat(query(selector, el, true));
	      });
	      var childsWrap = $(childs);
	      childsWrap.parent = this;
	      childsWrap.selector = selector;
	      return childsWrap;
	    }

	    /**
	     * 添加子元素
	     * @param {HTMLElement} childEls 要添加的HTML元素
	     * @return {this}
	     */

	  }, {
	    key: 'append',
	    value: function append(childEls) {
	      var childsWrap = $(childEls);
	      var firstEl = this[0];
	      childsWrap.each(function (newEl) {
	        return firstEl.appendChild(newEl);
	      });
	      return this;
	    }

	    /**
	     * 将元素集合添加到指定容器
	     * @param {HTMLElement} parentEl 要添加到父容器
	     * @return {this}
	     */

	  }, {
	    key: 'appendTo',
	    value: function appendTo(parentEl) {
	      $(parentEl).append(this);
	      return this;
	    }

	    /**
	     * DOM集合text内容读写操作
	     * @param {String} val 文本内容（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'text',
	    value: function text(val) {
	      if (arguments.length === 0) {
	        return this[0][_textAttrName];
	      }
	      return this.each(function (el) {
	        el[_textAttrName] = val;
	      });
	    }

	    /**
	     * DOM集合HTML内容读写操作
	     * @param {String} html html内容（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'html',
	    value: function html(_html) {
	      if (arguments.length === 0) {
	        return this[0].innerHTML;
	      }
	      return this.each(function (el) {
	        el.innerHTML = _html;
	      });
	    }

	    /**
	     * DOM集合属性读写操作
	     * @param {String} name 属性名称
	     * @param {String} val 属性值（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'attr',
	    value: function attr(name, val) {
	      if (arguments.length === 1) {
	        return getAttr(this[0], name);
	      }
	      return this.each(function (el) {
	        return setAttr(el, name, val);
	      });
	    }

	    /**
	     * DOM集合dataset读写操作
	     * @param {String} key 键名
	     * @param {Any} val 键值（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'data',
	    value: function data(key, val) {
	      if (arguments.length === 0) {
	        return this[0].dataset || {};
	      }
	      if (arguments.length === 1) {
	        return (this[0].dataset || {})[key];
	      }
	      return this.each(function (el) {
	        (el.dataset || (el.dataset = {}))[key] = val;
	      });
	    }

	    /**
	     * DOM集合样式读写操作
	     * @param {String} key 样式key
	     * @param {String} val 样式值（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'css',
	    value: function css(key, val) {
	      if (arguments.length === 1 && !isObject$1(key)) {
	        return getStyle(this[0], key);
	      }
	      return this.each(function (el) {
	        return setStyle(el, key, val);
	      });
	    }

	    /**
	     * 为DOM集合增加className
	     * @param {String} cls 要增加的className
	     * @return {this}
	     */

	  }, {
	    key: 'addClass',
	    value: function addClass(cls) {
	      return this.each(function (el) {
	        return addClassName(el, cls);
	      });
	    }

	    /**
	     * 移除当前DOM集合的className
	     * @param {String} cls 要移除的className
	     * @return {this}
	     */

	  }, {
	    key: 'removeClass',
	    value: function removeClass(cls) {
	      return this.each(function (el) {
	        return removeClassName(el, cls);
	      });
	    }

	    /**
	     * 检查索引0的DOM是否有className
	     * @param {String} cls 要检查的className
	     * @return {this}
	     */

	  }, {
	    key: 'hasClass',
	    value: function hasClass(cls) {
	      return hasClassName(this[0], cls);
	    }

	    /**
	     * 为DOM集合添加事件监听
	     * @param {String} type 事件名称
	     * @param {Function} handler 处理函数
	     * @param {Boolean} once 是否只监听一次
	     * @param {Boolean} capture 是否在捕获阶段监听
	     * @return {this}
	     */

	  }, {
	    key: 'on',
	    value: function on(type, handler) {
	      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      return this.each(function (el) {
	        return addEvent(el, type, handler, once, capture);
	      });
	    }

	    /**
	     * 为DOM集合解除事件监听
	     * @param {String} type 事件名称
	     * @param {Function} handler 处理函数
	     * @param {Boolean} once 是否只监听一次
	     * @param {Boolean} capture 是否在捕获阶段监听
	     * @return {this}
	     */

	  }, {
	    key: 'off',
	    value: function off(type, handler) {
	      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      return this.each(function (el) {
	        return removeEvent(el, type, handler, once, capture);
	      });
	    }

	    /**
	     * 为DOM集合绑定事件代理
	     * @param {String} selector 目标子元素选择器
	     * @param {String} type 事件名称
	     * @param {Function} handler 处理函数
	     * @param {Boolean} capture 是否在捕获阶段监听
	     * @return {this}
	     */

	  }, {
	    key: 'delegate',
	    value: function delegate(selector, type, handler) {
	      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      return this.each(function (el) {
	        return addDelegate(el, selector, type, handler, capture);
	      });
	    }

	    /**
	     * 为DOM集合解绑事件代理
	     * @param {String} selector 目标子元素选择器
	     * @param {String} type 事件名称
	     * @param {Function} handler 处理函数
	     * @param {Boolean} capture 是否在捕获阶段监听
	     * @return {this}
	     */

	  }, {
	    key: 'undelegate',
	    value: function undelegate(selector, type, handler) {
	      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      return this.each(function (el) {
	        return removeDelegate(el, selector, type, handler, capture);
	      });
	    }

	    /**
	     * 从DOM树中移除
	     * @return {this}
	     */

	  }, {
	    key: 'remove',
	    value: function remove() {
	      return this.each(function (el) {
	        return removeEl(el);
	      });
	    }
	  }]);

	  return NodeWrap;
	}();

	function $(selector, container) {
	  return selector.constructor === NodeWrap ? selector : new NodeWrap(selector, container);
	}

	// 19.1.2.9 Object.getPrototypeOf(O)



	require$$0$13('getPrototypeOf', function () {
	  return function getPrototypeOf$$1(it) {
	    return getPrototypeOf(toObject(it));
	  };
	});

	var getPrototypeOf$1 = require$$1.Object.getPrototypeOf;

	var getPrototypeOf$2 = /*#__PURE__*/Object.freeze({
		default: getPrototypeOf$1,
		__moduleExports: getPrototypeOf$1
	});

	var require$$0$25 = ( getPrototypeOf$2 && getPrototypeOf$1 ) || getPrototypeOf$2;

	var getPrototypeOf$3 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$25, __esModule: true };
	});

	var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$3);

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

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = ctx(Function.call, require$$1$3.f(Object.prototype, '__proto__').set, 2);
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
	var _setProto_1 = _setProto.set;
	var _setProto_2 = _setProto.check;

	var _setProto$1 = /*#__PURE__*/Object.freeze({
		default: _setProto,
		__moduleExports: _setProto,
		set: _setProto_1,
		check: _setProto_2
	});

	var require$$0$26 = ( _setProto$1 && _setProto ) || _setProto$1;

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	$export$1($export$1.S, 'Object', { setPrototypeOf: require$$0$26.set });

	var setPrototypeOf = require$$1.Object.setPrototypeOf;

	var setPrototypeOf$1 = /*#__PURE__*/Object.freeze({
		default: setPrototypeOf,
		__moduleExports: setPrototypeOf
	});

	var require$$0$27 = ( setPrototypeOf$1 && setPrototypeOf ) || setPrototypeOf$1;

	var setPrototypeOf$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$27, __esModule: true };
	});

	var setPrototypeOf$3 = unwrapExports(setPrototypeOf$2);

	var setPrototypeOf$4 = /*#__PURE__*/Object.freeze({
		default: setPrototypeOf$3,
		__moduleExports: setPrototypeOf$2
	});

	var _setPrototypeOf = ( setPrototypeOf$4 && setPrototypeOf$3 ) || setPrototypeOf$4;

	var _create = ( create$4 && _Object$create ) || create$4;

	var inherits = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);



	var _create2 = _interopRequireDefault(_create);



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

	var tempCurrentTime = 0;

	var NativeVideoKernel = function (_CustEvent) {
	  _inherits(NativeVideoKernel, _CustEvent);

	  _createClass(NativeVideoKernel, null, [{
	    key: 'isSupport',

	    /* istanbul ignore next  */
	    value: function isSupport() {
	      return true;
	    }
	  }]);

	  function NativeVideoKernel(videoElement, config, customConfig) {
	    _classCallCheck(this, NativeVideoKernel);

	    var _this = _possibleConstructorReturn(this, (NativeVideoKernel.__proto__ || _Object$getPrototypeOf(NativeVideoKernel)).call(this));

	    if (!isElement(videoElement)) throw new Error('You must pass in an legal video element but not ' + (typeof videoElement === 'undefined' ? 'undefined' : _typeof(videoElement)));
	    _this.video = videoElement;
	    _this.config = config;
	    _this.customConfig = customConfig;
	    return _this;
	  }

	  _createClass(NativeVideoKernel, [{
	    key: 'load',
	    value: function load(src) {
	      this.video.setAttribute('src', src);
	      this.video.src = src;
	    }
	  }, {
	    key: 'startLoad',
	    value: function startLoad(src) {
	      /* istanbul ignore next */
	      var currentTime = this.video.currentTime || tempCurrentTime;
	      this.load(src);
	      this.seek(currentTime);
	    }

	    // https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media

	  }, {
	    key: 'stopLoad',
	    value: function stopLoad() {
	      tempCurrentTime = this.video.currentTime;
	      this.video.src = '';
	      this.video.removeAttribute('src');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      /* istanbul ignore next  */
	      if (isElement(this.video)) this.stopLoad();
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
	      this.video.currentTime = seconds;
	    }
	  }]);

	  return NativeVideoKernel;
	}(CustEvent);

	var defaultConfig = {
	  isLive: false, // vod or live
	  box: '', // box type : native mp4 hls flv
	  preset: {},
	  presetConfig: {}
	};

	var LOG_TAG = 'chimee-kernel';
	var boxSuffixMap = {
	  flv: '.flv',
	  hls: '.m3u8',
	  mp4: '.mp4'
	};

	var ChimeeKernel = function () {
	  /**
	  * kernelWrapper
	  * @param {any} wrap videoElement
	  * @param {any} option
	  * @class kernel
	  */
	  function ChimeeKernel(videoElement, config) {
	    _classCallCheck(this, ChimeeKernel);

	    this.VERSION = '1.5.0-alpha';

	    if (!isElement(videoElement)) throw new Error('You must pass in an video element to the chimee-kernel');
	    // copy and maintain only one config for chimee-kernel
	    // actually kernel is disposable in most situation nowaday
	    this.config = deepAssign({}, defaultConfig, config);
	    this.videoElement = videoElement;
	    this.initVideoKernel();
	  }

	  _createClass(ChimeeKernel, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.videoKernel.destroy();
	    }
	  }, {
	    key: 'initVideoKernel',
	    value: function initVideoKernel() {
	      var config = this.config;
	      var box = this.chooseBox(config);
	      this.box = box;
	      var VideoKernel = this.chooseVideoKernel(this.box, config.preset);

	      if (!isFunction(VideoKernel)) throw new Error('We can\'t find video kernel for ' + box + '. Please check your config and make sure it\'s installed or provided');

	      var customConfig = config.presetConfig[this.box];

	      // TODO: nowaday, kernels all get config from one config
	      // it's not a good way, because custom config may override kernel config
	      // so we may remove this code later
	      if (customConfig) deepAssign(config, customConfig);

	      this.videoKernel = new VideoKernel(this.videoElement, config, customConfig);
	    }

	    // return the config box
	    // or choose the right one according to the src

	  }, {
	    key: 'chooseBox',
	    value: function chooseBox(_ref) {
	      var src = _ref.src,
	          box = _ref.box;

	      if (isString(box) && box) return box;
	      src = src.toLowerCase();
	      for (var key in boxSuffixMap) {
	        var suffix = boxSuffixMap[key];
	        if (src.indexOf(suffix) > -1) return key;
	      }
	      return 'native';
	    }

	    // choose the right video kernel according to the box setting

	  }, {
	    key: 'chooseVideoKernel',
	    value: function chooseVideoKernel(box, preset) {
	      switch (box) {
	        case 'native':
	          // $FlowFixMe: it's the same as videoKernel
	          return NativeVideoKernel;
	        case 'mp4':
	          return this.getMp4Kernel(preset.mp4);
	        case 'flv':
	        case 'hls':
	          return preset[box];
	        default:
	          throw new Error('We currently do not support box ' + box + ', please contact us through https://github.com/Chimeejs/chimee/issues.');
	      }
	    }

	    // fetch the legal mp4 kernel
	    // if it's not exist or not support
	    // we will fall back to the native video kernel

	  }, {
	    key: 'getMp4Kernel',
	    value: function getMp4Kernel(mp4Kernel) {
	      var hasLegalMp4Kernel = mp4Kernel && isFunction(mp4Kernel.isSupport);
	      // $FlowFixMe: we have make sure it's an kernel now
	      var supportMp4Kernel = hasLegalMp4Kernel && mp4Kernel.isSupport();
	      // $FlowFixMe: we have make sure it's an kernel now
	      if (supportMp4Kernel) return mp4Kernel;
	      if (hasLegalMp4Kernel) Log.warn(LOG_TAG, 'mp4 decode is not support in this browser, we will switch to the native video kernel');
	      this.box = 'native';
	      // $FlowFixMe: it's the same as videoKernel
	      return NativeVideoKernel;
	    }
	  }, {
	    key: 'attachMedia',
	    value: function attachMedia() {
	      this.videoKernel.attachMedia();
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.src;

	      this.config.src = src;
	      this.videoKernel.load(src);
	    }
	  }, {
	    key: 'startLoad',
	    value: function startLoad() {
	      /* istanbul ignore if */
	      if (!isFunction(this.videoKernel.startLoad)) throw new Error('This video kernel do not support startLoad, please contact us on https://github.com/Chimeejs/chimee/issues');
	      this.videoKernel.startLoad(this.config.src);
	    }
	  }, {
	    key: 'stopLoad',
	    value: function stopLoad() {
	      /* istanbul ignore else */
	      if (isFunction(this.videoKernel.stopLoad)) this.videoKernel.stopLoad();
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.videoKernel.play();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.videoKernel.pause();
	    }
	  }, {
	    key: 'seek',
	    value: function seek(seconds) {
	      if (!isNumber(seconds)) {
	        Log.error(LOG_TAG, 'When you try to seek, you must offer us a number, but not ' + (typeof seconds === 'undefined' ? 'undefined' : _typeof(seconds)));
	        return;
	      }
	      this.videoKernel.seek(seconds);
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      this.videoKernel.refresh();
	    }
	  }, {
	    key: 'on',
	    value: function on(key, fn) {
	      this.videoKernel.on(key, fn);
	    }
	  }, {
	    key: 'off',
	    value: function off(key, fn) {
	      this.videoKernel.off(key, fn);
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.videoElement.currentTime || 0;
	    }
	  }]);

	  return ChimeeKernel;
	}();

	return ChimeeKernel;

})));
