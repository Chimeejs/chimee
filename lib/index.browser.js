
/**
 * chimee v0.10.0-alpha.11
 * (c) 2017-2018 toxic-johann
 * Released under MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Chimee = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
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

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
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
	    if (own && _has(exports, key)) continue;
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

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty, __esModule: true };
	});

	var _Object$defineProperty = unwrapExports(defineProperty$1);

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var f$1 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$1
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$2
	};

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(_toIobject(it), key);
	  };
	});

	var $Object$1 = _core.Object;
	var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  return $Object$1.getOwnPropertyDescriptor(it, key);
	};

	var getOwnPropertyDescriptor$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertyDescriptor, __esModule: true };
	});

	var _Object$getOwnPropertyDescriptor = unwrapExports(getOwnPropertyDescriptor$1);

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'pure',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO)) return O[IE_PROTO];
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

	var getPrototypeOf = _core.Object.getPrototypeOf;

	var getPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getPrototypeOf, __esModule: true };
	});

	var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$1);

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

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

	var _redefine = _hide;

	var _iterators = {};

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

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO$1 = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$1) _has(O, key) && result.push(key);
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
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
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

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

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
	  _iterators[NAME] = _iterators.Array;
	}

	var f$3 = _wks;

	var _wksExt = {
		f: f$3
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator, __esModule: true };
	});

	unwrapExports(iterator$1);

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

	var defineProperty$2 = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
	};

	var f$4 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$4
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

	var _isArray = Array.isArray || function isArray(arg) {
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

	var gOPN = _objectGopn.f;
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

	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
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
	  var protoDesc = gOPD$1(ObjectProto$1, key);
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
	var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
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

	  _objectGopd.f = $getOwnPropertyDescriptor$1;
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
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
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
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
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

	var symbol = _core.Symbol;

	var symbol$1 = createCommonjsModule(function (module) {
	module.exports = { "default": symbol, __esModule: true };
	});

	unwrapExports(symbol$1);

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(iterator$1);



	var _symbol2 = _interopRequireDefault(symbol$1);

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

	var get = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf$1);



	var _getOwnPropertyDescriptor2 = _interopRequireDefault(getOwnPropertyDescriptor$1);

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

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$1);

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

	var setPrototypeOf = _core.Object.setPrototypeOf;

	var setPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": setPrototypeOf, __esModule: true };
	});

	unwrapExports(setPrototypeOf$1);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	var $Object$2 = _core.Object;
	var create = function create(P, D) {
	  return $Object$2.create(P, D);
	};

	var create$1 = createCommonjsModule(function (module) {
	module.exports = { "default": create, __esModule: true };
	});

	var _Object$create = unwrapExports(create$1);

	var inherits = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$1);



	var _create2 = _interopRequireDefault(create$1);



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

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

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
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$1 = _wks('iterator');

	var core_isIterable = _core.isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$1] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins
	    || _iterators.hasOwnProperty(_classof(O));
	};

	var isIterable = core_isIterable;

	var isIterable$1 = createCommonjsModule(function (module) {
	module.exports = { "default": isIterable, __esModule: true };
	});

	unwrapExports(isIterable$1);

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var core_getIterator = _core.getIterator = function (it) {
	  var iterFn = core_getIteratorMethod(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return _anObject(iterFn.call(it));
	};

	var getIterator = core_getIterator;

	var getIterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getIterator, __esModule: true };
	});

	var _getIterator = unwrapExports(getIterator$1);

	var slicedToArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _isIterable3 = _interopRequireDefault(isIterable$1);



	var _getIterator3 = _interopRequireDefault(getIterator$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();
	});

	var _slicedToArray = unwrapExports(slicedToArray);

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export(_export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = _core.Object.entries;

	var entries$1 = createCommonjsModule(function (module) {
	module.exports = { "default": entries, __esModule: true };
	});

	var _Object$entries = unwrapExports(entries$1);

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = createCommonjsModule(function (module) {
	module.exports = { "default": keys, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$1);

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = createCommonjsModule(function (module) {
	module.exports = { "default": assign, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign$1);

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$3 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$3] === it);
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
	};

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

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
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
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise = _global.Promise;
	var isNode = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
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
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise.resolve(undefined);
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
	      macrotask.call(_global, flush);
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

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$7
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator = _global.navigator;

	var _userAgent = navigator && navigator.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else _hide(target, key, src[key]);
	  } return target;
	};

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var ITERATOR$4 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$4]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$4]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$4] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
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
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
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
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
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
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
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
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
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
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
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
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
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
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	// https://github.com/tc39/proposal-promise-try




	_export(_export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = _newPromiseCapability.f(this);
	  var result = _perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var promise = _core.Promise;

	var promise$1 = createCommonjsModule(function (module) {
	module.exports = { "default": promise, __esModule: true };
	});

	var _Promise = unwrapExports(promise$1);

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	var _arrayReduce = arrayReduce;

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}

	var _basePropertyOf = basePropertyOf;

	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
	  // Latin-1 Supplement block.
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss',
	  // Latin Extended-A block.
	  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
	  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
	  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
	  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
	  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
	  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
	  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
	  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
	  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
	  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
	  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
	  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
	  '\u0134': 'J',  '\u0135': 'j',
	  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
	  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
	  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
	  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
	  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
	  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
	  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
	  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
	  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
	  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
	  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
	  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
	  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
	  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
	  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
	  '\u0174': 'W',  '\u0175': 'w',
	  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
	  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
	  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
	  '\u0132': 'IJ', '\u0133': 'ij',
	  '\u0152': 'Oe', '\u0153': 'oe',
	  '\u0149': "'n", '\u017f': 's'
	};

	/**
	 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	 * letters to basic Latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	var deburrLetter = _basePropertyOf(deburredLetters);

	var _deburrLetter = deburrLetter;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	var _freeGlobal = freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = _freeGlobal || freeSelf || Function('return this')();

	var _root = root;

	/** Built-in value references. */
	var Symbol$1 = _root.Symbol;

	var _Symbol = Symbol$1;

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	var _arrayMap = arrayMap;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	var isArray_1 = isArray;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	var _getRawTag = getRawTag;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString$1.call(value);
	}

	var _objectToString = objectToString;

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? _getRawTag(value)
	    : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol$1(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
	}

	var isSymbol_1 = isSymbol$1;

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray_1(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return _arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol_1(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	var _baseToString = baseToString;

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString$2(value) {
	  return value == null ? '' : _baseToString(value);
	}

	var toString_1 = toString$2;

	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboRange + ']';

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/**
	 * Deburrs `string` by converting
	 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	 * letters to basic Latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString_1(string);
	  return string && string.replace(reLatin, _deburrLetter).replace(reComboMark, '');
	}

	var deburr_1 = deburr;

	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

	/**
	 * Splits an ASCII `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function asciiWords(string) {
	  return string.match(reAsciiWord) || [];
	}

	var _asciiWords = asciiWords;

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/**
	 * Checks if `string` contains a word composed of Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a word is found, else `false`.
	 */
	function hasUnicodeWord(string) {
	  return reHasUnicodeWord.test(string);
	}

	var _hasUnicodeWord = hasUnicodeWord;

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange$1 = '\\u0300-\\u036f',
	    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
	    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsPunctuationRange = '\\u2000-\\u206f',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]",
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo$1 = '[' + rsComboRange$1 + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo$1 + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
	    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([
	  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
	  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
	  rsUpper + '+' + rsOptContrUpper,
	  rsOrdUpper,
	  rsOrdLower,
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');

	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	  return string.match(reUnicodeWord) || [];
	}

	var _unicodeWords = unicodeWords;

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString_1(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    return _hasUnicodeWord(string) ? _unicodeWords(string) : _asciiWords(string);
	  }
	  return string.match(pattern) || [];
	}

	var words_1 = words;

	/** Used to compose unicode capture groups. */
	var rsApos$1 = "['\u2019]";

	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos$1, 'g');

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return _arrayReduce(words_1(deburr_1(string).replace(reApos, '')), callback, '');
	  };
	}

	var _createCompounder = createCompounder;

	/**
	 * Converts `string` to
	 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the kebab cased string.
	 * @example
	 *
	 * _.kebabCase('Foo Bar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('fooBar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('__FOO_BAR__');
	 * // => 'foo-bar'
	 */
	var kebabCase = _createCompounder(function(result, word, index) {
	  return result + (index ? '-' : '') + word.toLowerCase();
	});

	var kebabCase_1 = kebabCase;

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	var _listCacheClear = listCacheClear;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	var eq_1 = eq;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq_1(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	var _assocIndexOf = assocIndexOf;

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	var _listCacheDelete = listCacheDelete;

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	var _listCacheGet = listCacheGet;

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return _assocIndexOf(this.__data__, key) > -1;
	}

	var _listCacheHas = listCacheHas;

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	var _listCacheSet = listCacheSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = _listCacheClear;
	ListCache.prototype['delete'] = _listCacheDelete;
	ListCache.prototype.get = _listCacheGet;
	ListCache.prototype.has = _listCacheHas;
	ListCache.prototype.set = _listCacheSet;

	var _ListCache = ListCache;

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new _ListCache;
	  this.size = 0;
	}

	var _stackClear = stackClear;

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	var _stackDelete = stackDelete;

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	var _stackGet = stackGet;

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	var _stackHas = stackHas;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject;

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject_1(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = _baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	var isFunction_1 = isFunction;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = _root['__core-js_shared__'];

	var _coreJsData = coreJsData;

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	var _isMasked = isMasked;

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	var _toSource = toSource;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto$1 = Function.prototype,
	    objectProto$2 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$1 = funcProto$1.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject_1(value) || _isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(_toSource(value));
	}

	var _baseIsNative = baseIsNative;

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	var _getValue = getValue;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = _getValue(object, key);
	  return _baseIsNative(value) ? value : undefined;
	}

	var _getNative = getNative;

	/* Built-in method references that are verified to be native. */
	var Map = _getNative(_root, 'Map');

	var _Map = Map;

	/* Built-in method references that are verified to be native. */
	var nativeCreate = _getNative(Object, 'create');

	var _nativeCreate = nativeCreate;

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
	  this.size = 0;
	}

	var _hashClear = hashClear;

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _hashDelete = hashDelete;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (_nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
	}

	var _hashGet = hashGet;

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
	}

	var _hashHas = hashHas;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
	  return this;
	}

	var _hashSet = hashSet;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = _hashClear;
	Hash.prototype['delete'] = _hashDelete;
	Hash.prototype.get = _hashGet;
	Hash.prototype.has = _hashHas;
	Hash.prototype.set = _hashSet;

	var _Hash = Hash;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new _Hash,
	    'map': new (_Map || _ListCache),
	    'string': new _Hash
	  };
	}

	var _mapCacheClear = mapCacheClear;

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	var _isKeyable = isKeyable;

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return _isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	var _getMapData = getMapData;

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = _getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _mapCacheDelete = mapCacheDelete;

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return _getMapData(this, key).get(key);
	}

	var _mapCacheGet = mapCacheGet;

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return _getMapData(this, key).has(key);
	}

	var _mapCacheHas = mapCacheHas;

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = _getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	var _mapCacheSet = mapCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = _mapCacheClear;
	MapCache.prototype['delete'] = _mapCacheDelete;
	MapCache.prototype.get = _mapCacheGet;
	MapCache.prototype.has = _mapCacheHas;
	MapCache.prototype.set = _mapCacheSet;

	var _MapCache = MapCache;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof _ListCache) {
	    var pairs = data.__data__;
	    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new _MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	var _stackSet = stackSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new _ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = _stackClear;
	Stack.prototype['delete'] = _stackDelete;
	Stack.prototype.get = _stackGet;
	Stack.prototype.has = _stackHas;
	Stack.prototype.set = _stackSet;

	var _Stack = Stack;

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	var _arrayEach = arrayEach;

	var defineProperty$3 = (function() {
	  try {
	    var func = _getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	var _defineProperty = defineProperty$3;

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && _defineProperty) {
	    _defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	var _baseAssignValue = baseAssignValue;

	/** Used for built-in method references. */
	var objectProto$5 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty$5.call(object, key) && eq_1(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    _baseAssignValue(object, key, value);
	  }
	}

	var _assignValue = assignValue;

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      _baseAssignValue(object, key, newValue);
	    } else {
	      _assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	var _copyObject = copyObject;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	var _baseTimes = baseTimes;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
	}

	var _baseIsArguments = baseIsArguments;

	/** Used for built-in method references. */
	var objectProto$6 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$6 = objectProto$6.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
	  return isObjectLike_1(value) && hasOwnProperty$6.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	var isArguments_1 = isArguments;

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	var stubFalse_1 = stubFalse;

	var isBuffer_1 = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? _root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse_1;

	module.exports = isBuffer;
	});

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	var _isIndex = isIndex;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
	}

	var isLength_1 = isLength;

	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag$1 = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike_1(value) &&
	    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
	}

	var _baseIsTypedArray = baseIsTypedArray;

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	var _baseUnary = baseUnary;

	var _nodeUtil = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && _freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;
	});

	/* Node.js helper references. */
	var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

	var isTypedArray_1 = isTypedArray;

	/** Used for built-in method references. */
	var objectProto$7 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$7 = objectProto$7.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray_1(value),
	      isArg = !isArr && isArguments_1(value),
	      isBuff = !isArr && !isArg && isBuffer_1(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? _baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$7.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           _isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _arrayLikeKeys = arrayLikeKeys;

	/** Used for built-in method references. */
	var objectProto$8 = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

	  return value === proto;
	}

	var _isPrototype = isPrototype;

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	var _overArg = overArg;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = _overArg(Object.keys, Object);

	var _nativeKeys = nativeKeys;

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!_isPrototype(object)) {
	    return _nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _baseKeys = baseKeys;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength_1(value.length) && !isFunction_1(value);
	}

	var isArrayLike_1 = isArrayLike;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys$2(object) {
	  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
	}

	var keys_1 = keys$2;

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && _copyObject(source, keys_1(source), object);
	}

	var _baseAssign = baseAssign;

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _nativeKeysIn = nativeKeysIn;

	/** Used for built-in method references. */
	var objectProto$a = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject_1(object)) {
	    return _nativeKeysIn(object);
	  }
	  var isProto = _isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$9.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _baseKeysIn = baseKeysIn;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn$1(object) {
	  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
	}

	var keysIn_1 = keysIn$1;

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && _copyObject(source, keysIn_1(source), object);
	}

	var _baseAssignIn = baseAssignIn;

	var _cloneBuffer = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? _root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;
	});

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	var _copyArray = copyArray;

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	var _arrayFilter = arrayFilter;

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	var stubArray_1 = stubArray;

	/** Used for built-in method references. */
	var objectProto$b = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable$1.call(object, symbol);
	  });
	};

	var _getSymbols = getSymbols;

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return _copyObject(source, _getSymbols(source), object);
	}

	var _copySymbols = copySymbols;

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	var _arrayPush = arrayPush;

	/** Built-in value references. */
	var getPrototype = _overArg(Object.getPrototypeOf, Object);

	var _getPrototype = getPrototype;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
	  var result = [];
	  while (object) {
	    _arrayPush(result, _getSymbols(object));
	    object = _getPrototype(object);
	  }
	  return result;
	};

	var _getSymbolsIn = getSymbolsIn;

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return _copyObject(source, _getSymbolsIn(source), object);
	}

	var _copySymbolsIn = copySymbolsIn;

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
	}

	var _baseGetAllKeys = baseGetAllKeys;

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return _baseGetAllKeys(object, keys_1, _getSymbols);
	}

	var _getAllKeys = getAllKeys;

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
	}

	var _getAllKeysIn = getAllKeysIn;

	/* Built-in method references that are verified to be native. */
	var DataView = _getNative(_root, 'DataView');

	var _DataView = DataView;

	/* Built-in method references that are verified to be native. */
	var Promise$1 = _getNative(_root, 'Promise');

	var _Promise$1 = Promise$1;

	/* Built-in method references that are verified to be native. */
	var Set = _getNative(_root, 'Set');

	var _Set = Set;

	/* Built-in method references that are verified to be native. */
	var WeakMap = _getNative(_root, 'WeakMap');

	var _WeakMap = WeakMap;

	/** `Object#toString` result references. */
	var mapTag$1 = '[object Map]',
	    objectTag$1 = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag$1 = '[object Set]',
	    weakMapTag$1 = '[object WeakMap]';

	var dataViewTag$1 = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = _toSource(_DataView),
	    mapCtorString = _toSource(_Map),
	    promiseCtorString = _toSource(_Promise$1),
	    setCtorString = _toSource(_Set),
	    weakMapCtorString = _toSource(_WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = _baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
	    (_Map && getTag(new _Map) != mapTag$1) ||
	    (_Promise$1 && getTag(_Promise$1.resolve()) != promiseTag) ||
	    (_Set && getTag(new _Set) != setTag$1) ||
	    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
	  getTag = function(value) {
	    var result = _baseGetTag(value),
	        Ctor = result == objectTag$1 ? value.constructor : undefined,
	        ctorString = Ctor ? _toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag$1;
	        case mapCtorString: return mapTag$1;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag$1;
	        case weakMapCtorString: return weakMapTag$1;
	      }
	    }
	    return result;
	  };
	}

	var _getTag = getTag;

	/** Used for built-in method references. */
	var objectProto$c = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$a = objectProto$c.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty$a.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	var _initCloneArray = initCloneArray;

	/** Built-in value references. */
	var Uint8Array = _root.Uint8Array;

	var _Uint8Array = Uint8Array;

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
	  return result;
	}

	var _cloneArrayBuffer = cloneArrayBuffer;

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	var _cloneDataView = cloneDataView;

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	var _cloneRegExp = cloneRegExp;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	var _cloneSymbol = cloneSymbol;

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	var _cloneTypedArray = cloneTypedArray;

	/** `Object#toString` result references. */
	var boolTag$1 = '[object Boolean]',
	    dateTag$1 = '[object Date]',
	    mapTag$2 = '[object Map]',
	    numberTag$1 = '[object Number]',
	    regexpTag$1 = '[object RegExp]',
	    setTag$2 = '[object Set]',
	    stringTag$1 = '[object String]',
	    symbolTag$1 = '[object Symbol]';

	var arrayBufferTag$1 = '[object ArrayBuffer]',
	    dataViewTag$2 = '[object DataView]',
	    float32Tag$1 = '[object Float32Array]',
	    float64Tag$1 = '[object Float64Array]',
	    int8Tag$1 = '[object Int8Array]',
	    int16Tag$1 = '[object Int16Array]',
	    int32Tag$1 = '[object Int32Array]',
	    uint8Tag$1 = '[object Uint8Array]',
	    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
	    uint16Tag$1 = '[object Uint16Array]',
	    uint32Tag$1 = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag$1:
	      return _cloneArrayBuffer(object);

	    case boolTag$1:
	    case dateTag$1:
	      return new Ctor(+object);

	    case dataViewTag$2:
	      return _cloneDataView(object, isDeep);

	    case float32Tag$1: case float64Tag$1:
	    case int8Tag$1: case int16Tag$1: case int32Tag$1:
	    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
	      return _cloneTypedArray(object, isDeep);

	    case mapTag$2:
	      return new Ctor;

	    case numberTag$1:
	    case stringTag$1:
	      return new Ctor(object);

	    case regexpTag$1:
	      return _cloneRegExp(object);

	    case setTag$2:
	      return new Ctor;

	    case symbolTag$1:
	      return _cloneSymbol(object);
	  }
	}

	var _initCloneByTag = initCloneByTag;

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject_1(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	var _baseCreate = baseCreate;

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !_isPrototype(object))
	    ? _baseCreate(_getPrototype(object))
	    : {};
	}

	var _initCloneObject = initCloneObject;

	/** `Object#toString` result references. */
	var mapTag$3 = '[object Map]';

	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */
	function baseIsMap(value) {
	  return isObjectLike_1(value) && _getTag(value) == mapTag$3;
	}

	var _baseIsMap = baseIsMap;

	/* Node.js helper references. */
	var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

	/**
	 * Checks if `value` is classified as a `Map` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 * @example
	 *
	 * _.isMap(new Map);
	 * // => true
	 *
	 * _.isMap(new WeakMap);
	 * // => false
	 */
	var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

	var isMap_1 = isMap;

	/** `Object#toString` result references. */
	var setTag$3 = '[object Set]';

	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet(value) {
	  return isObjectLike_1(value) && _getTag(value) == setTag$3;
	}

	var _baseIsSet = baseIsSet;

	/* Node.js helper references. */
	var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */
	var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

	var isSet_1 = isSet;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/** `Object#toString` result references. */
	var argsTag$2 = '[object Arguments]',
	    arrayTag$1 = '[object Array]',
	    boolTag$2 = '[object Boolean]',
	    dateTag$2 = '[object Date]',
	    errorTag$1 = '[object Error]',
	    funcTag$2 = '[object Function]',
	    genTag$1 = '[object GeneratorFunction]',
	    mapTag$4 = '[object Map]',
	    numberTag$2 = '[object Number]',
	    objectTag$2 = '[object Object]',
	    regexpTag$2 = '[object RegExp]',
	    setTag$4 = '[object Set]',
	    stringTag$2 = '[object String]',
	    symbolTag$2 = '[object Symbol]',
	    weakMapTag$2 = '[object WeakMap]';

	var arrayBufferTag$2 = '[object ArrayBuffer]',
	    dataViewTag$3 = '[object DataView]',
	    float32Tag$2 = '[object Float32Array]',
	    float64Tag$2 = '[object Float64Array]',
	    int8Tag$2 = '[object Int8Array]',
	    int16Tag$2 = '[object Int16Array]',
	    int32Tag$2 = '[object Int32Array]',
	    uint8Tag$2 = '[object Uint8Array]',
	    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
	    uint16Tag$2 = '[object Uint16Array]',
	    uint32Tag$2 = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] =
	cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
	cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
	cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
	cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
	cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] =
	cloneableTags[numberTag$2] = cloneableTags[objectTag$2] =
	cloneableTags[regexpTag$2] = cloneableTags[setTag$4] =
	cloneableTags[stringTag$2] = cloneableTags[symbolTag$2] =
	cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
	cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
	cloneableTags[errorTag$1] = cloneableTags[funcTag$2] =
	cloneableTags[weakMapTag$2] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject_1(value)) {
	    return value;
	  }
	  var isArr = isArray_1(value);
	  if (isArr) {
	    result = _initCloneArray(value);
	    if (!isDeep) {
	      return _copyArray(value, result);
	    }
	  } else {
	    var tag = _getTag(value),
	        isFunc = tag == funcTag$2 || tag == genTag$1;

	    if (isBuffer_1(value)) {
	      return _cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag$2 || tag == argsTag$2 || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? _copySymbolsIn(value, _baseAssignIn(result, value))
	          : _copySymbols(value, _baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = _initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new _Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (isSet_1(value)) {
	    value.forEach(function(subValue) {
	      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	    });

	    return result;
	  }

	  if (isMap_1(value)) {
	    value.forEach(function(subValue, key) {
	      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	    });

	    return result;
	  }

	  var keysFunc = isFull
	    ? (isFlat ? _getAllKeysIn : _getAllKeys)
	    : (isFlat ? keysIn : keys_1);

	  var props = isArr ? undefined : keysFunc(value);
	  _arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	var _baseClone = baseClone;

	/** Used to compose bitmasks for cloning. */
	var CLONE_SYMBOLS_FLAG$1 = 4;

	/**
	 * Creates a shallow clone of `value`.
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	 * and supports cloning arrays, array buffers, booleans, date objects, maps,
	 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	 * arrays. The own enumerable properties of `arguments` objects are cloned
	 * as plain objects. An empty object is returned for uncloneable values such
	 * as error objects, functions, DOM nodes, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @returns {*} Returns the cloned value.
	 * @see _.cloneDeep
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var shallow = _.clone(objects);
	 * console.log(shallow[0] === objects[0]);
	 * // => true
	 */
	function clone(value) {
	  return _baseClone(value, CLONE_SYMBOLS_FLAG$1);
	}

	var clone_1 = clone;

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq_1(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    _baseAssignValue(object, key, value);
	  }
	}

	var _assignMergeValue = assignMergeValue;

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	var _createBaseFor = createBaseFor;

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = _createBaseFor();

	var _baseFor = baseFor;

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike_1(value) && isArrayLike_1(value);
	}

	var isArrayLikeObject_1 = isArrayLikeObject;

	/** `Object#toString` result references. */
	var objectTag$3 = '[object Object]';

	/** Used for built-in method references. */
	var funcProto$2 = Function.prototype,
	    objectProto$d = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$2 = funcProto$2.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$b = objectProto$d.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString$2.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$3) {
	    return false;
	  }
	  var proto = _getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty$b.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString$2.call(Ctor) == objectCtorString;
	}

	var isPlainObject_1 = isPlainObject;

	/**
	 * Gets the value at `key`, unless `key` is "__proto__".
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function safeGet(object, key) {
	  return key == '__proto__'
	    ? undefined
	    : object[key];
	}

	var _safeGet = safeGet;

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return _copyObject(value, keysIn_1(value));
	}

	var toPlainObject_1 = toPlainObject;

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = _safeGet(object, key),
	      srcValue = _safeGet(source, key),
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    _assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray_1(srcValue),
	        isBuff = !isArr && isBuffer_1(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray_1(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject_1(objValue)) {
	        newValue = _copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = _cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = _cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
	      newValue = objValue;
	      if (isArguments_1(objValue)) {
	        newValue = toPlainObject_1(objValue);
	      }
	      else if (!isObject_1(objValue) || (srcIndex && isFunction_1(objValue))) {
	        newValue = _initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  _assignMergeValue(object, key, newValue);
	}

	var _baseMergeDeep = baseMergeDeep;

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  _baseFor(source, function(srcValue, key) {
	    if (isObject_1(srcValue)) {
	      stack || (stack = new _Stack);
	      _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      _assignMergeValue(object, key, newValue);
	    }
	  }, keysIn_1);
	}

	var _baseMerge = baseMerge;

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	var identity_1 = identity;

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	var _apply = apply;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return _apply(func, this, otherArgs);
	  };
	}

	var _overRest = overRest;

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	var constant_1 = constant;

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
	  return _defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant_1(string),
	    'writable': true
	  });
	};

	var _baseSetToString = baseSetToString;

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	var _shortOut = shortOut;

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = _shortOut(_baseSetToString);

	var _setToString = setToString;

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return _setToString(_overRest(func, start, identity_1), func + '');
	}

	var _baseRest = baseRest;

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject_1(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike_1(object) && _isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq_1(object[index], value);
	  }
	  return false;
	}

	var _isIterateeCall = isIterateeCall;

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return _baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	var _createAssigner = createAssigner;

	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = _createAssigner(function(object, source, srcIndex) {
	  _baseMerge(object, source, srcIndex);
	});

	var merge_1 = merge;

	/**
	 * Checks if `value` is `null` or `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
	 * @example
	 *
	 * _.isNil(null);
	 * // => true
	 *
	 * _.isNil(void 0);
	 * // => true
	 *
	 * _.isNil(NaN);
	 * // => false
	 */
	function isNil(value) {
	  return value == null;
	}

	var isNil_1 = isNil;

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	var _baseSlice = baseSlice;

	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : _baseSlice(array, start, end);
	}

	var _castSlice = castSlice;

	/** Used to compose unicode character classes. */
	var rsAstralRange$1 = '\\ud800-\\udfff',
	    rsComboMarksRange$2 = '\\u0300-\\u036f',
	    reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
	    rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
	    rsVarRange$1 = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsZWJ$1 = '\\u200d';

	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1  + rsComboRange$2 + rsVarRange$1 + ']');

	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}

	var _hasUnicode = hasUnicode;

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}

	var _asciiToArray = asciiToArray;

	/** Used to compose unicode character classes. */
	var rsAstralRange$2 = '\\ud800-\\udfff',
	    rsComboMarksRange$3 = '\\u0300-\\u036f',
	    reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange$3 = '\\u20d0-\\u20ff',
	    rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
	    rsVarRange$2 = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange$2 + ']',
	    rsCombo$2 = '[' + rsComboRange$3 + ']',
	    rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
	    rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
	    rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ$2 = '\\u200d';

	/** Used to compose unicode regexes. */
	var reOptMod$1 = rsModifier$1 + '?',
	    rsOptVar$1 = '[' + rsVarRange$2 + ']?',
	    rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
	    rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
	    rsSymbol = '(?:' + [rsNonAstral$1 + rsCombo$2 + '?', rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join('|') + ')';

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol + rsSeq$1, 'g');

	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}

	var _unicodeToArray = unicodeToArray;

	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return _hasUnicode(string)
	    ? _unicodeToArray(string)
	    : _asciiToArray(string);
	}

	var _stringToArray = stringToArray;

	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new case function.
	 */
	function createCaseFirst(methodName) {
	  return function(string) {
	    string = toString_1(string);

	    var strSymbols = _hasUnicode(string)
	      ? _stringToArray(string)
	      : undefined;

	    var chr = strSymbols
	      ? strSymbols[0]
	      : string.charAt(0);

	    var trailing = strSymbols
	      ? _castSlice(strSymbols, 1).join('')
	      : string.slice(1);

	    return chr[methodName]() + trailing;
	  };
	}

	var _createCaseFirst = createCaseFirst;

	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */
	var upperFirst = _createCaseFirst('toUpperCase');

	var upperFirst_1 = upperFirst;

	/**
	 * Converts the first character of `string` to upper case and the remaining
	 * to lower case.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to capitalize.
	 * @returns {string} Returns the capitalized string.
	 * @example
	 *
	 * _.capitalize('FRED');
	 * // => 'Fred'
	 */
	function capitalize(string) {
	  return upperFirst_1(toString_1(string).toLowerCase());
	}

	var capitalize_1 = capitalize;

	/**
	 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the camel cased string.
	 * @example
	 *
	 * _.camelCase('Foo Bar');
	 * // => 'fooBar'
	 *
	 * _.camelCase('--foo-bar--');
	 * // => 'fooBar'
	 *
	 * _.camelCase('__FOO_BAR__');
	 * // => 'fooBar'
	 */
	var camelCase = _createCompounder(function(result, word, index) {
	  word = word.toLowerCase();
	  return result + (index ? capitalize_1(word) : word);
	});

	var camelCase_1 = camelCase;

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol_1(value)) {
	    return NAN;
	  }
	  if (isObject_1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject_1(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var toNumber_1 = toNumber;

	/** Used as references for various `Number` constants. */
	var INFINITY$1 = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber_1(value);
	  if (value === INFINITY$1 || value === -INFINITY$1) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	var toFinite_1 = toFinite;

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite_1(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	var toInteger_1 = toInteger;

	/**
	 * Checks if `value` is an integer.
	 *
	 * **Note:** This method is based on
	 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
	 * @example
	 *
	 * _.isInteger(3);
	 * // => true
	 *
	 * _.isInteger(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isInteger(Infinity);
	 * // => false
	 *
	 * _.isInteger('3');
	 * // => false
	 */
	function isInteger(value) {
	  return typeof value == 'number' && value == toInteger_1(value);
	}

	var isInteger_1 = isInteger;

	/** `Object#toString` result references. */
	var boolTag$3 = '[object Boolean]';

	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false ||
	    (isObjectLike_1(value) && _baseGetTag(value) == boolTag$3);
	}

	var isBoolean_1 = isBoolean;

	/**
	 * Checks if `value` is likely a DOM element.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
	 * @example
	 *
	 * _.isElement(document.body);
	 * // => true
	 *
	 * _.isElement('<body>');
	 * // => false
	 */
	function isElement(value) {
	  return isObjectLike_1(value) && value.nodeType === 1 && !isPlainObject_1(value);
	}

	var isElement_1 = isElement;

	/** `Object#toString` result references. */
	var domExcTag = '[object DOMException]',
	    errorTag$2 = '[object Error]';

	/**
	 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	 * `SyntaxError`, `TypeError`, or `URIError` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	 * @example
	 *
	 * _.isError(new Error);
	 * // => true
	 *
	 * _.isError(Error);
	 * // => false
	 */
	function isError(value) {
	  if (!isObjectLike_1(value)) {
	    return false;
	  }
	  var tag = _baseGetTag(value);
	  return tag == errorTag$2 || tag == domExcTag ||
	    (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject_1(value));
	}

	var isError_1 = isError;

	/** `Object#toString` result references. */
	var numberTag$3 = '[object Number]';

	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike_1(value) && _baseGetTag(value) == numberTag$3);
	}

	var isNumber_1 = isNumber;

	/** Used to store function metadata. */
	var metaMap = _WeakMap && new _WeakMap;

	var _metaMap = metaMap;

	/**
	 * The base implementation of `setData` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !_metaMap ? identity_1 : function(func, data) {
	  _metaMap.set(func, data);
	  return func;
	};

	var _baseSetData = baseSetData;

	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtor(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = _baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);

	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject_1(result) ? result : thisBinding;
	  };
	}

	var _createCtor = createCtor;

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBind(func, bitmask, thisArg) {
	  var isBind = bitmask & WRAP_BIND_FLAG,
	      Ctor = _createCtor(func);

	  function wrapper() {
	    var fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}

	var _createBind = createBind;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$1 = Math.max;

	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersLength = holders.length,
	      leftIndex = -1,
	      leftLength = partials.length,
	      rangeLength = nativeMax$1(argsLength - holdersLength, 0),
	      result = Array(leftLength + rangeLength),
	      isUncurried = !isCurried;

	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[holders[argsIndex]] = args[argsIndex];
	    }
	  }
	  while (rangeLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}

	var _composeArgs = composeArgs;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$2 = Math.max;

	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersIndex = -1,
	      holdersLength = holders.length,
	      rightIndex = -1,
	      rightLength = partials.length,
	      rangeLength = nativeMax$2(argsLength - holdersLength, 0),
	      result = Array(rangeLength + rightLength),
	      isUncurried = !isCurried;

	  while (++argsIndex < rangeLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[offset + holders[holdersIndex]] = args[argsIndex++];
	    }
	  }
	  return result;
	}

	var _composeArgsRight = composeArgsRight;

	/**
	 * Gets the number of `placeholder` occurrences in `array`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} placeholder The placeholder to search for.
	 * @returns {number} Returns the placeholder count.
	 */
	function countHolders(array, placeholder) {
	  var length = array.length,
	      result = 0;

	  while (length--) {
	    if (array[length] === placeholder) {
	      ++result;
	    }
	  }
	  return result;
	}

	var _countHolders = countHolders;

	/**
	 * The function whose prototype chain sequence wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}

	var _baseLodash = baseLodash;

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @constructor
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = MAX_ARRAY_LENGTH;
	  this.__views__ = [];
	}

	// Ensure `LazyWrapper` is an instance of `baseLodash`.
	LazyWrapper.prototype = _baseCreate(_baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;

	var _LazyWrapper = LazyWrapper;

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	var noop_1 = noop;

	/**
	 * Gets metadata for `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {*} Returns the metadata for `func`.
	 */
	var getData = !_metaMap ? noop_1 : function(func) {
	  return _metaMap.get(func);
	};

	var _getData = getData;

	/** Used to lookup unminified function names. */
	var realNames = {};

	var _realNames = realNames;

	/** Used for built-in method references. */
	var objectProto$e = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$c = objectProto$e.hasOwnProperty;

	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = (func.name + ''),
	      array = _realNames[result],
	      length = hasOwnProperty$c.call(_realNames, result) ? array.length : 0;

	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}

	var _getFuncName = getFuncName;

	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable explicit method chain sequences.
	 */
	function LodashWrapper(value, chainAll) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__chain__ = !!chainAll;
	  this.__index__ = 0;
	  this.__values__ = undefined;
	}

	LodashWrapper.prototype = _baseCreate(_baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;

	var _LodashWrapper = LodashWrapper;

	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  if (wrapper instanceof _LazyWrapper) {
	    return wrapper.clone();
	  }
	  var result = new _LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	  result.__actions__ = _copyArray(wrapper.__actions__);
	  result.__index__  = wrapper.__index__;
	  result.__values__ = wrapper.__values__;
	  return result;
	}

	var _wrapperClone = wrapperClone;

	/** Used for built-in method references. */
	var objectProto$f = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$d = objectProto$f.hasOwnProperty;

	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit method
	 * chain sequences. Methods that operate on and return arrays, collections,
	 * and functions can be chained together. Methods that retrieve a single value
	 * or may return a primitive value will automatically end the chain sequence
	 * and return the unwrapped value. Otherwise, the value must be unwrapped
	 * with `_#value`.
	 *
	 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	 * enabled using `_.chain`.
	 *
	 * The execution of chained methods is lazy, that is, it's deferred until
	 * `_#value` is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion.
	 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	 * the creation of intermediate arrays and can greatly reduce the number of
	 * iteratee executions. Sections of a chain sequence qualify for shortcut
	 * fusion if the section is applied to an array and iteratees accept only
	 * one argument. The heuristic for whether a section qualifies for shortcut
	 * fusion is subject to change.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	 * `zipObject`, `zipObjectDeep`, and `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
	 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
	 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
	 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
	 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
	 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
	 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
	 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
	 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
	 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
	 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
	 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
	 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
	 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
	 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
	 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
	 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
	 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
	 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
	 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
	 * `upperFirst`, `value`, and `words`
	 *
	 * @name _
	 * @constructor
	 * @category Seq
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // Returns an unwrapped value.
	 * wrapped.reduce(_.add);
	 * // => 6
	 *
	 * // Returns a wrapped value.
	 * var squares = wrapped.map(square);
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike_1(value) && !isArray_1(value) && !(value instanceof _LazyWrapper)) {
	    if (value instanceof _LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty$d.call(value, '__wrapped__')) {
	      return _wrapperClone(value);
	    }
	  }
	  return new _LodashWrapper(value);
	}

	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = _baseLodash.prototype;
	lodash.prototype.constructor = lodash;

	var wrapperLodash = lodash;

	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
	 *  else `false`.
	 */
	function isLaziable(func) {
	  var funcName = _getFuncName(func),
	      other = wrapperLodash[funcName];

	  if (typeof other != 'function' || !(funcName in _LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = _getData(other);
	  return !!data && func === data[0];
	}

	var _isLaziable = isLaziable;

	/**
	 * Sets metadata for `func`.
	 *
	 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	 * period of time, it will trip its breaker and transition to an identity
	 * function to avoid garbage collection pauses in V8. See
	 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
	 * for more details.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var setData = _shortOut(_baseSetData);

	var _setData = setData;

	/** Used to match wrap detail comments. */
	var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
	    reSplitDetails = /,? & /;

	/**
	 * Extracts wrapper details from the `source` body comment.
	 *
	 * @private
	 * @param {string} source The source to inspect.
	 * @returns {Array} Returns the wrapper details.
	 */
	function getWrapDetails(source) {
	  var match = source.match(reWrapDetails);
	  return match ? match[1].split(reSplitDetails) : [];
	}

	var _getWrapDetails = getWrapDetails;

	/** Used to match wrap detail comments. */
	var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

	/**
	 * Inserts wrapper `details` in a comment at the top of the `source` body.
	 *
	 * @private
	 * @param {string} source The source to modify.
	 * @returns {Array} details The details to insert.
	 * @returns {string} Returns the modified source.
	 */
	function insertWrapDetails(source, details) {
	  var length = details.length;
	  if (!length) {
	    return source;
	  }
	  var lastIndex = length - 1;
	  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
	  details = details.join(length > 2 ? ', ' : ' ');
	  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
	}

	var _insertWrapDetails = insertWrapDetails;

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	var _baseFindIndex = baseFindIndex;

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	var _baseIsNaN = baseIsNaN;

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	var _strictIndexOf = strictIndexOf;

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? _strictIndexOf(array, value, fromIndex)
	    : _baseFindIndex(array, _baseIsNaN, fromIndex);
	}

	var _baseIndexOf = baseIndexOf;

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && _baseIndexOf(array, value, 0) > -1;
	}

	var _arrayIncludes$1 = arrayIncludes;

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG$1 = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_CURRY_RIGHT_FLAG = 16,
	    WRAP_PARTIAL_FLAG = 32,
	    WRAP_PARTIAL_RIGHT_FLAG = 64,
	    WRAP_ARY_FLAG = 128,
	    WRAP_REARG_FLAG = 256,
	    WRAP_FLIP_FLAG = 512;

	/** Used to associate wrap methods with their bit flags. */
	var wrapFlags = [
	  ['ary', WRAP_ARY_FLAG],
	  ['bind', WRAP_BIND_FLAG$1],
	  ['bindKey', WRAP_BIND_KEY_FLAG],
	  ['curry', WRAP_CURRY_FLAG],
	  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
	  ['flip', WRAP_FLIP_FLAG],
	  ['partial', WRAP_PARTIAL_FLAG],
	  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
	  ['rearg', WRAP_REARG_FLAG]
	];

	/**
	 * Updates wrapper `details` based on `bitmask` flags.
	 *
	 * @private
	 * @returns {Array} details The details to modify.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Array} Returns `details`.
	 */
	function updateWrapDetails(details, bitmask) {
	  _arrayEach(wrapFlags, function(pair) {
	    var value = '_.' + pair[0];
	    if ((bitmask & pair[1]) && !_arrayIncludes$1(details, value)) {
	      details.push(value);
	    }
	  });
	  return details.sort();
	}

	var _updateWrapDetails = updateWrapDetails;

	/**
	 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
	 * with wrapper details in a comment at the top of the source body.
	 *
	 * @private
	 * @param {Function} wrapper The function to modify.
	 * @param {Function} reference The reference function.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Function} Returns `wrapper`.
	 */
	function setWrapToString(wrapper, reference, bitmask) {
	  var source = (reference + '');
	  return _setToString(wrapper, _insertWrapDetails(source, _updateWrapDetails(_getWrapDetails(source), bitmask)));
	}

	var _setWrapToString = setWrapToString;

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG$2 = 1,
	    WRAP_BIND_KEY_FLAG$1 = 2,
	    WRAP_CURRY_BOUND_FLAG = 4,
	    WRAP_CURRY_FLAG$1 = 8,
	    WRAP_PARTIAL_FLAG$1 = 32,
	    WRAP_PARTIAL_RIGHT_FLAG$1 = 64;

	/**
	 * Creates a function that wraps `func` to continue currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & WRAP_CURRY_FLAG$1,
	      newHolders = isCurry ? holders : undefined,
	      newHoldersRight = isCurry ? undefined : holders,
	      newPartials = isCurry ? partials : undefined,
	      newPartialsRight = isCurry ? undefined : partials;

	  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1);
	  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);

	  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
	    bitmask &= ~(WRAP_BIND_FLAG$2 | WRAP_BIND_KEY_FLAG$1);
	  }
	  var newData = [
	    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
	    newHoldersRight, argPos, ary, arity
	  ];

	  var result = wrapFunc.apply(undefined, newData);
	  if (_isLaziable(func)) {
	    _setData(result, newData);
	  }
	  result.placeholder = placeholder;
	  return _setWrapToString(result, func, bitmask);
	}

	var _createRecurry = createRecurry;

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getHolder(func) {
	  var object = func;
	  return object.placeholder;
	}

	var _getHolder = getHolder;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = _copyArray(array);

	  while (length--) {
	    var index = indexes[length];
	    array[length] = _isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}

	var _reorder = reorder;

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (value === placeholder || value === PLACEHOLDER) {
	      array[index] = PLACEHOLDER;
	      result[resIndex++] = index;
	    }
	  }
	  return result;
	}

	var _replaceHolders = replaceHolders;

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG$3 = 1,
	    WRAP_BIND_KEY_FLAG$2 = 2,
	    WRAP_CURRY_FLAG$2 = 8,
	    WRAP_CURRY_RIGHT_FLAG$1 = 16,
	    WRAP_ARY_FLAG$1 = 128,
	    WRAP_FLIP_FLAG$1 = 512;

	/**
	 * Creates a function that wraps `func` to invoke it with optional `this`
	 * binding of `thisArg`, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided
	 *  to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & WRAP_ARY_FLAG$1,
	      isBind = bitmask & WRAP_BIND_FLAG$3,
	      isBindKey = bitmask & WRAP_BIND_KEY_FLAG$2,
	      isCurried = bitmask & (WRAP_CURRY_FLAG$2 | WRAP_CURRY_RIGHT_FLAG$1),
	      isFlip = bitmask & WRAP_FLIP_FLAG$1,
	      Ctor = isBindKey ? undefined : _createCtor(func);

	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length;

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = _getHolder(wrapper),
	          holdersCount = _countHolders(args, placeholder);
	    }
	    if (partials) {
	      args = _composeArgs(args, partials, holders, isCurried);
	    }
	    if (partialsRight) {
	      args = _composeArgsRight(args, partialsRight, holdersRight, isCurried);
	    }
	    length -= holdersCount;
	    if (isCurried && length < arity) {
	      var newHolders = _replaceHolders(args, placeholder);
	      return _createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
	        args, newHolders, argPos, ary, arity - length
	      );
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;

	    length = args.length;
	    if (argPos) {
	      args = _reorder(args, argPos);
	    } else if (isFlip && length > 1) {
	      args.reverse();
	    }
	    if (isAry && ary < length) {
	      args.length = ary;
	    }
	    if (this && this !== _root && this instanceof wrapper) {
	      fn = Ctor || _createCtor(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}

	var _createHybrid = createHybrid;

	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurry(func, bitmask, arity) {
	  var Ctor = _createCtor(func);

	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = _getHolder(wrapper);

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
	      ? []
	      : _replaceHolders(args, placeholder);

	    length -= holders.length;
	    if (length < arity) {
	      return _createRecurry(
	        func, bitmask, _createHybrid, wrapper.placeholder, undefined,
	        args, holders, undefined, undefined, arity - length);
	    }
	    var fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;
	    return _apply(fn, this, args);
	  }
	  return wrapper;
	}

	var _createCurry = createCurry;

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG$4 = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartial(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & WRAP_BIND_FLAG$4,
	      Ctor = _createCtor(func);

	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;

	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return _apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}

	var _createPartial = createPartial;

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER$1 = '__lodash_placeholder__';

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG$5 = 1,
	    WRAP_BIND_KEY_FLAG$3 = 2,
	    WRAP_CURRY_BOUND_FLAG$1 = 4,
	    WRAP_CURRY_FLAG$3 = 8,
	    WRAP_ARY_FLAG$2 = 128,
	    WRAP_REARG_FLAG$1 = 256;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin$1 = Math.min;

	/**
	 * Merges the function metadata of `source` into `data`.
	 *
	 * Merging metadata reduces the number of wrappers used to invoke a function.
	 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	 * may be applied regardless of execution order. Methods like `_.ary` and
	 * `_.rearg` modify function arguments, making the order in which they are
	 * executed important, preventing the merging of metadata. However, we make
	 * an exception for a safe combined case where curried functions have `_.ary`
	 * and or `_.rearg` applied.
	 *
	 * @private
	 * @param {Array} data The destination metadata.
	 * @param {Array} source The source metadata.
	 * @returns {Array} Returns `data`.
	 */
	function mergeData(data, source) {
	  var bitmask = data[1],
	      srcBitmask = source[1],
	      newBitmask = bitmask | srcBitmask,
	      isCommon = newBitmask < (WRAP_BIND_FLAG$5 | WRAP_BIND_KEY_FLAG$3 | WRAP_ARY_FLAG$2);

	  var isCombo =
	    ((srcBitmask == WRAP_ARY_FLAG$2) && (bitmask == WRAP_CURRY_FLAG$3)) ||
	    ((srcBitmask == WRAP_ARY_FLAG$2) && (bitmask == WRAP_REARG_FLAG$1) && (data[7].length <= source[8])) ||
	    ((srcBitmask == (WRAP_ARY_FLAG$2 | WRAP_REARG_FLAG$1)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG$3));

	  // Exit early if metadata can't be merged.
	  if (!(isCommon || isCombo)) {
	    return data;
	  }
	  // Use source `thisArg` if available.
	  if (srcBitmask & WRAP_BIND_FLAG$5) {
	    data[2] = source[2];
	    // Set when currying a bound function.
	    newBitmask |= bitmask & WRAP_BIND_FLAG$5 ? 0 : WRAP_CURRY_BOUND_FLAG$1;
	  }
	  // Compose partial arguments.
	  var value = source[3];
	  if (value) {
	    var partials = data[3];
	    data[3] = partials ? _composeArgs(partials, value, source[4]) : value;
	    data[4] = partials ? _replaceHolders(data[3], PLACEHOLDER$1) : source[4];
	  }
	  // Compose partial right arguments.
	  value = source[5];
	  if (value) {
	    partials = data[5];
	    data[5] = partials ? _composeArgsRight(partials, value, source[6]) : value;
	    data[6] = partials ? _replaceHolders(data[5], PLACEHOLDER$1) : source[6];
	  }
	  // Use source `argPos` if available.
	  value = source[7];
	  if (value) {
	    data[7] = value;
	  }
	  // Use source `ary` if it's smaller.
	  if (srcBitmask & WRAP_ARY_FLAG$2) {
	    data[8] = data[8] == null ? source[8] : nativeMin$1(data[8], source[8]);
	  }
	  // Use source `arity` if one is not provided.
	  if (data[9] == null) {
	    data[9] = source[9];
	  }
	  // Use source `func` and merge bitmasks.
	  data[0] = source[0];
	  data[1] = newBitmask;

	  return data;
	}

	var _mergeData = mergeData;

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG$6 = 1,
	    WRAP_BIND_KEY_FLAG$4 = 2,
	    WRAP_CURRY_FLAG$4 = 8,
	    WRAP_CURRY_RIGHT_FLAG$2 = 16,
	    WRAP_PARTIAL_FLAG$2 = 32,
	    WRAP_PARTIAL_RIGHT_FLAG$2 = 64;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$3 = Math.max;

	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags.
	 *    1 - `_.bind`
	 *    2 - `_.bindKey`
	 *    4 - `_.curry` or `_.curryRight` of a bound function
	 *    8 - `_.curry`
	 *   16 - `_.curryRight`
	 *   32 - `_.partial`
	 *   64 - `_.partialRight`
	 *  128 - `_.rearg`
	 *  256 - `_.ary`
	 *  512 - `_.flip`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG$4;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(WRAP_PARTIAL_FLAG$2 | WRAP_PARTIAL_RIGHT_FLAG$2);
	    partials = holders = undefined;
	  }
	  ary = ary === undefined ? ary : nativeMax$3(toInteger_1(ary), 0);
	  arity = arity === undefined ? arity : toInteger_1(arity);
	  length -= holders ? holders.length : 0;

	  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG$2) {
	    var partialsRight = partials,
	        holdersRight = holders;

	    partials = holders = undefined;
	  }
	  var data = isBindKey ? undefined : _getData(func);

	  var newData = [
	    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
	    argPos, ary, arity
	  ];

	  if (data) {
	    _mergeData(newData, data);
	  }
	  func = newData[0];
	  bitmask = newData[1];
	  thisArg = newData[2];
	  partials = newData[3];
	  holders = newData[4];
	  arity = newData[9] = newData[9] === undefined
	    ? (isBindKey ? 0 : func.length)
	    : nativeMax$3(newData[9] - length, 0);

	  if (!arity && bitmask & (WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2)) {
	    bitmask &= ~(WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2);
	  }
	  if (!bitmask || bitmask == WRAP_BIND_FLAG$6) {
	    var result = _createBind(func, bitmask, thisArg);
	  } else if (bitmask == WRAP_CURRY_FLAG$4 || bitmask == WRAP_CURRY_RIGHT_FLAG$2) {
	    result = _createCurry(func, bitmask, arity);
	  } else if ((bitmask == WRAP_PARTIAL_FLAG$2 || bitmask == (WRAP_BIND_FLAG$6 | WRAP_PARTIAL_FLAG$2)) && !holders.length) {
	    result = _createPartial(func, bitmask, thisArg, partials);
	  } else {
	    result = _createHybrid.apply(undefined, newData);
	  }
	  var setter = data ? _baseSetData : _setData;
	  return _setWrapToString(setter(result, newData), func, bitmask);
	}

	var _createWrap = createWrap;

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG$7 = 1,
	    WRAP_PARTIAL_FLAG$3 = 32;

	/**
	 * Creates a function that invokes `func` with the `this` binding of `thisArg`
	 * and `partials` prepended to the arguments it receives.
	 *
	 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	 * may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
	 * property of bound functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new bound function.
	 * @example
	 *
	 * function greet(greeting, punctuation) {
	 *   return greeting + ' ' + this.user + punctuation;
	 * }
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * var bound = _.bind(greet, object, 'hi');
	 * bound('!');
	 * // => 'hi fred!'
	 *
	 * // Bound with placeholders.
	 * var bound = _.bind(greet, object, _, '!');
	 * bound('hi');
	 * // => 'hi fred!'
	 */
	var bind = _baseRest(function(func, thisArg, partials) {
	  var bitmask = WRAP_BIND_FLAG$7;
	  if (partials.length) {
	    var holders = _replaceHolders(partials, _getHolder(bind));
	    bitmask |= WRAP_PARTIAL_FLAG$3;
	  }
	  return _createWrap(func, bitmask, thisArg, partials, holders);
	});

	// Assign default placeholders.
	bind.placeholder = {};

	var bind_1 = bind;

	// 20.1.2.3 Number.isInteger(number)

	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export(_export.S, 'Number', { isInteger: _isInteger });

	var isInteger$1 = _core.Number.isInteger;

	var isInteger$2 = createCommonjsModule(function (module) {
	module.exports = { "default": isInteger$1, __esModule: true };
	});

	unwrapExports(isInteger$2);

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseFloat = _global.parseFloat;
	var $trim = _stringTrim.trim;

	var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// 20.1.2.12 Number.parseFloat(string)
	_export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', { parseFloat: _parseFloat });

	var _parseFloat$1 = _core.Number.parseFloat;

	var _parseFloat$2 = createCommonjsModule(function (module) {
	module.exports = { "default": _parseFloat$1, __esModule: true };
	});

	var _Number$parseFloat = unwrapExports(_parseFloat$2);

	/**
	 * to check whether the object is defined or not
	 */
	function defined(obj) {
	  return typeof obj !== 'undefined';
	}
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
	function isFunction$1(obj) {
	  return typeof obj === 'function';
	}

	/**
	 * is it an object or not
	 */
	function isObject$1(obj) {
	  // incase of arrow function and array
	  return Object(obj) === obj && String(obj) === '[object Object]' && !isFunction$1(obj) && !isArray$1(obj);
	}
	/**
	 * to tell you if it's a real number
	 */
	function isNumber$1(obj) {
	  return typeof obj === 'number';
	}
	/**
	 * to tell you if the val can be transfer into number
	 */
	function isNumeric(obj) {
	  return !isArray$1(obj) && obj - _Number$parseFloat(obj) + 1 >= 0;
	}

	/**
	 * return true when the value is "", {}, [], 0, null, undefined, false.
	 */
	function isEmpty(obj) {
	  if (isArray$1(obj)) {
	    return obj.length === 0;
	  } else if (isObject$1(obj)) {
	    return _Object$keys(obj).length === 0;
	  } else {
	    return !obj;
	  }
	}
	/**
	 * is it an event or not
	 */
	function isEvent(obj) {
	  return obj instanceof Event || (obj && obj.originalEvent) instanceof Event;
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
	function isBoolean$1(bool) {
	  return typeof bool === 'boolean';
	}
	/**
	 * is a promise or not
	 */
	function isPromise(obj) {
	  return !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}
	/**
	 * is Primitive type or not, whick means it will return true when data is number/string/boolean/undefined/null
	 */
	function isPrimitive(val) {
	  return isVoid(val) || isBoolean$1(val) || isString(val) || isNumber$1(val);
	}
	/**
	 * to test if a HTML node
	 */
	function isNode$2(obj) {
	  return !!((typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? obj instanceof Node : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string');
	}
	/**
	 * to test if a HTML element
	 */
	function isElement$1(obj) {
	  return !!((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string');
	}
	/**
	 * check if node B is node A's posterrity or not
	 */
	function isPosterityNode(parent, child) {
	  if (!isNode$2(parent) || !isNode$2(child)) {
	    return false;
	  }
	  while (child.parentNode) {
	    child = child.parentNode;
	    if (child === parent) {
	      return true;
	    }
	  }
	  return false;
	}
	/**
	 * check if the string is an HTMLString
	 */
	function isHTMLString(str) {
	  return (/<[^>]+?>/.test(str)
	  );
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
	    {
	        // nodejs env
	        if (module.exports) {
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

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var from = _core.Array.from;

	var from$1 = createCommonjsModule(function (module) {
	module.exports = { "default": from, __esModule: true };
	});

	var _Array$from = unwrapExports(from$1);

	var toConsumableArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _from2 = _interopRequireDefault(from$1);

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

	var _toConsumableArray = unwrapExports(toConsumableArray);

	/**
	 * get an deep property
	 */
	function getDeepProperty(obj, keys) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$throwError = _ref.throwError,
	      throwError = _ref$throwError === undefined ? false : _ref$throwError,
	      backup = _ref.backup;

	  if (isString(keys)) {
	    keys = keys.split('.');
	  }
	  if (!isArray$1(keys)) {
	    throw new TypeError('keys of getDeepProperty must be string or Array<string>');
	  }
	  var read = [];
	  var target = obj;
	  for (var i = 0, len = keys.length; i < len; i++) {
	    var key = keys[i];
	    if (isVoid(target)) {
	      if (throwError) {
	        throw new Error('obj' + (read.length > 0 ? '.' + read.join('.') : ' itself') + ' is ' + target);
	      } else {
	        return backup;
	      }
	    }
	    target = target[key];
	    read.push(key);
	  }
	  return target;
	}

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

	/**
	 * sort Object attributes by function
	 * and transfer them into array
	 * @param  {Object} obj Object form from numric
	 * @param  {Function} fn sort function
	 * @return {Array} the sorted attirbutes array
	 */
	function transObjectAttrIntoArray(obj) {
	  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
	    return +a - +b;
	  };

	  return _Object$keys(obj).sort(fn).reduce(function (order, key) {
	    return order.concat(obj[key]);
	  }, []);
	}
	/**
	 * run a queue one by one.If include function reject or return false it will stop
	 * @param  {Array} queue the queue which we want to run one by one
	 * @return {Promise}    tell us whether a queue run finished
	 */
	function runRejectableQueue(queue) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return new _Promise(function (resolve, reject) {
	    var step = function step(index) {
	      if (index >= queue.length) {
	        resolve();
	        return;
	      }
	      var result = isFunction$1(queue[index]) ? queue[index].apply(queue, _toConsumableArray(args)) : queue[index];
	      if (result === false) return reject('stop');
	      return _Promise.resolve(result).then(function () {
	        return step(index + 1);
	      }).catch(function (err) {
	        return reject(err || 'stop');
	      });
	    };
	    step(0);
	  });
	}
	/**
	 * run a queue one by one.If include function return false it will stop
	 * @param  {Array} queue the queue which we want to run one by one
	 * @return {boolean} tell the user if the queue run finished
	 */
	function runStoppableQueue(queue) {
	  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    args[_key2 - 1] = arguments[_key2];
	  }

	  var step = function step(index) {
	    if (index >= queue.length) {
	      return true;
	    }
	    var result = isFunction$1(queue[index]) ? queue[index].apply(queue, _toConsumableArray(args)) : queue[index];
	    if (result === false) return false;
	    return step(++index);
	  };
	  return step(0);
	}

	// requestAnimationFrame
	var raf = inBrowser && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame) || function (cb) {
	  return setTimeout(cb, 17);
	};

	// cancelAnimationFrame
	var caf = inBrowser && (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame) || function (id) {
	  clearTimeout(id);
	};

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

	  if (isFunction$1(isOnce) && !handlerWrap) {
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

	  if (capture !== undefined && !isBoolean$1(capture) && supportsPassive) {
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

	  if (capture !== undefined && !isBoolean$1(capture) && supportsPassive) {
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

	  if (capture !== undefined && !isBoolean$1(capture) && supportsPassive) {
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

	  if (capture !== undefined && !isBoolean$1(capture) && supportsPassive) {
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

	    if (!isElement_1(videoElement)) throw new Error('You must pass in an legal video element but not ' + (typeof videoElement === 'undefined' ? 'undefined' : _typeof(videoElement)));
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
	      if (isElement_1(this.video)) this.stopLoad();
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

	var LOG_TAG = 'chimee';
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

	    if (!isElement_1(videoElement)) throw new Error('You must pass in an video element to the chimee-kernel');
	    this.config = config;
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

	      if (!isFunction_1(VideoKernel)) throw new Error('We can\'t find video kernel for ' + box + '. Please check your config and make sure it\'s installed or provided');

	      var customConfig = config.presetConfig[this.box];

	      // TODO: nowaday, kernels all get config from one config
	      // it's not a good way, because custom config may override kernel config
	      // so we may remove this code when we check all the chimee-kernel-* setting
	      if (customConfig) merge_1(config, customConfig);

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
	    value: function getMp4Kernel(Mp4Kernel) {
	      var hasLegalMp4Kernel = Mp4Kernel && isFunction_1(Mp4Kernel.isSupport);
	      // $FlowFixMe: we have make sure it's an kernel now
	      var supportMp4Kernel = hasLegalMp4Kernel && Mp4Kernel.isSupport();
	      // $FlowFixMe: we have make sure it's an kernel now
	      if (supportMp4Kernel) return Mp4Kernel;
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
	      if (!isFunction_1(this.videoKernel.startLoad)) throw new Error('This video kernel do not support startLoad, please contact us on https://github.com/Chimeejs/chimee/issues');
	      this.videoKernel.startLoad(this.config.src);
	    }
	  }, {
	    key: 'stopLoad',
	    value: function stopLoad() {
	      /* istanbul ignore else */
	      if (isFunction_1(this.videoKernel.stopLoad)) this.videoKernel.stopLoad();
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
	      if (!isNumber_1(seconds)) {
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

	// all object keys, includes non-enumerable and symbols



	var Reflect = _global.Reflect;
	var _ownKeys = Reflect && Reflect.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertyDescriptors, __esModule: true };
	});

	var _Object$getOwnPropertyDescriptors = unwrapExports(getOwnPropertyDescriptors$1);

	var getOwnPropertySymbols = _core.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertySymbols, __esModule: true };
	});

	var _Object$getOwnPropertySymbols = unwrapExports(getOwnPropertySymbols$1);

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	var $Object$3 = _core.Object;
	var getOwnPropertyNames = function getOwnPropertyNames(it) {
	  return $Object$3.getOwnPropertyNames(it);
	};

	var getOwnPropertyNames$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertyNames, __esModule: true };
	});

	var _Object$getOwnPropertyNames = unwrapExports(getOwnPropertyNames$1);

	/**
	 * bind the function with some context. we have some fallback strategy here
	 * @param {function} fn the function which we need to bind the context on
	 * @param {any} context the context object
	 */
	function bind$2(fn, context) {
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
	 * get an deep property
	 */
	function getDeepProperty$1(obj, keys) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$throwError = _ref.throwError,
	      throwError = _ref$throwError === undefined ? false : _ref$throwError,
	      backup = _ref.backup;

	  if (isString(keys)) {
	    keys = keys.split('.');
	  }
	  if (!isArray$1(keys)) {
	    throw new TypeError('keys of getDeepProperty must be string or Array<string>');
	  }
	  var read = [];
	  var target = obj;
	  for (var i = 0, len = keys.length; i < len; i++) {
	    var key = keys[i];
	    if (isVoid(target)) {
	      if (throwError) {
	        throw new Error('obj' + (read.length > 0 ? '.' + read.join('.') : ' itself') + ' is ' + target);
	      } else {
	        return backup;
	      }
	    }
	    target = target[key];
	    read.push(key);
	  }
	  return target;
	}

	var SPECIES$2 = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var getWeak = _meta.getWeak;







	var arrayFind = _arrayMethods(5);
	var arrayFindIndex = _arrayMethods(6);
	var id$1 = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id$1++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
	        return data && _has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
	        return data && _has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak(_anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

	var dP$2 = _objectDp.f;
	var each = _arrayMethods(0);


	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  if (!_descriptors || typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    C = wrapper(function (target, iterable) {
	      _anInstance(target, C, NAME, '_c');
	      target._c = new Base();
	      if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) _hide(C.prototype, KEY, function (a, b) {
	        _anInstance(this, C, KEY);
	        if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    IS_WEAK || dP$2(C.prototype, 'size', {
	      get: function () {
	        return this._c.size;
	      }
	    });
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F, O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var es6_weakMap = createCommonjsModule(function (module) {
	var each = _arrayMethods(0);







	var WEAK_MAP = 'WeakMap';
	var getWeak = _meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = _collectionWeak.ufstore;
	var tmp = {};
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (_isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

	// IE11 WeakMap frozen keys fix
	if (_fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
	  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
	  _objectAssign(InternalMap.prototype, methods);
	  _meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    _redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (_isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	// https://tc39.github.io/proposal-setmap-offrom/


	var _setCollectionOf = function (COLLECTION) {
	  _export(_export.S, COLLECTION, { of: function of() {
	    var length = arguments.length;
	    var A = new Array(length);
	    while (length--) A[length] = arguments[length];
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
	_setCollectionOf('WeakMap');

	// https://tc39.github.io/proposal-setmap-offrom/





	var _setCollectionFrom = function (COLLECTION) {
	  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
	    var mapFn = arguments[1];
	    var mapping, A, n, cb;
	    _aFunction(this);
	    mapping = mapFn !== undefined;
	    if (mapping) _aFunction(mapFn);
	    if (source == undefined) return new this();
	    A = [];
	    if (mapping) {
	      n = 0;
	      cb = _ctx(mapFn, arguments[2], 2);
	      _forOf(source, false, function (nextItem) {
	        A.push(cb(nextItem, n++));
	      });
	    } else {
	      _forOf(source, false, A.push, A);
	    }
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
	_setCollectionFrom('WeakMap');

	var weakMap = _core.WeakMap;

	var weakMap$1 = createCommonjsModule(function (module) {
	module.exports = { "default": weakMap, __esModule: true };
	});

	var _WeakMap$1 = unwrapExports(weakMap$1);

	var defineProperty$4 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};
	});

	var _defineProperty$1 = unwrapExports(defineProperty$4);

	// 19.1.2.15 Object.preventExtensions(O)

	var meta = _meta.onFreeze;

	_objectSap('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && _isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

	var preventExtensions = _core.Object.preventExtensions;

	var preventExtensions$1 = createCommonjsModule(function (module) {
	module.exports = { "default": preventExtensions, __esModule: true };
	});

	unwrapExports(preventExtensions$1);

	var getOwnPropertyDescriptor$2 = _Object$getOwnPropertyDescriptor;
	// **********************  对象操作  ************************
	/**
	 * sort Object attributes by function
	 * and transfer them into array
	 * @param  {Object} obj Object form from numric
	 * @param  {Function} fn sort function
	 * @return {Array} the sorted attirbutes array
	 */


	/**
	 * to check if an descriptor
	 * @param {anything} desc
	 */
	function isDescriptor(desc) {
	  if (!desc || !desc.hasOwnProperty) {
	    return false;
	  }

	  var keys = ['value', 'initializer', 'get', 'set'];

	  for (var i = 0, l = keys.length; i < l; i++) {
	    if (desc.hasOwnProperty(keys[i])) {
	      return true;
	    }
	  }
	  return false;
	}
	/**
	 * to check if the descirptor is an accessor descriptor
	 * @param {descriptor} desc it should be a descriptor better
	 */
	function isAccessorDescriptor(desc) {
	  return !!desc && (isFunction$1(desc.get) || isFunction$1(desc.set)) && isBoolean$1(desc.configurable) && isBoolean$1(desc.enumerable) && desc.writable === undefined;
	}
	/**
	 * to check if the descirptor is an data descriptor
	 * @param {descriptor} desc it should be a descriptor better
	 */
	function isDataDescriptor(desc) {
	  return !!desc && desc.hasOwnProperty('value') && isBoolean$1(desc.configurable) && isBoolean$1(desc.enumerable) && isBoolean$1(desc.writable);
	}
	/**
	 * to check if the descirptor is an initiallizer descriptor
	 * @param {descriptor} desc it should be a descriptor better
	 */
	function isInitializerDescriptor(desc) {
	  return !!desc && isFunction$1(desc.initializer) && isBoolean$1(desc.configurable) && isBoolean$1(desc.enumerable) && isBoolean$1(desc.writable);
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

	/**
	 * Compress many function into one function, but this function only accept one arguments;
	 * @param {Array<Function>} fns the array of function we need to compress into one function
	 * @param {string} errmsg When we check that there is something is not function, we will throw an error, you can set your own error message
	 */
	function compressOneArgFnArray(fns) {
	  var errmsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'You must pass me an array of function';

	  if (!isArray$1(fns) || fns.length < 1) {
	    throw new TypeError(errmsg);
	  }
	  if (fns.length === 1) {
	    if (!isFunction$1(fns[0])) {
	      throw new TypeError(errmsg);
	    }
	    return fns[0];
	  }
	  return fns.reduce(function (prev, curr) {
	    if (!isFunction$1(curr) || !isFunction$1(prev)) throw new TypeError(errmsg);
	    return function (value) {
	      return bind$2(curr, this)(bind$2(prev, this)(value));
	    };
	  });
	}
	/**
	 * just a method to call console.warn, maybe i will add some handler on it someday
	 * @param {anything} args
	 */
	function warn(message) {
	  if (isFunction$1(console.warn)) return console.warn(message);
	  console.log(message);
	}

	function getOwnKeysFn() {
	  var getOwnPropertyNames = _Object$getOwnPropertyNames,
	      getOwnPropertySymbols = _Object$getOwnPropertySymbols;

	  return isFunction$1(getOwnPropertySymbols) ? function (obj) {
	    // $FlowFixMe: do not support symwbol yet
	    return _Array$from(getOwnPropertyNames(obj).concat(getOwnPropertySymbols(obj)));
	  } : getOwnPropertyNames;
	}

	var getOwnKeys = getOwnKeysFn();

	function getOwnPropertyDescriptorsFn() {
	  // $FlowFixMe: In some environment, Object.getOwnPropertyDescriptors has been implemented;
	  return isFunction$1(_Object$getOwnPropertyDescriptors) ? _Object$getOwnPropertyDescriptors : function (obj) {
	    return getOwnKeys(obj).reduce(function (descs, key) {
	      descs[key] = getOwnPropertyDescriptor$2(obj, key);
	      return descs;
	    }, {});
	  };
	}

	var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptorsFn();

	function compressMultipleDecorators() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  if (!fns.length) throw new TypeError('You must pass in decorators in compressMultipleDecorators');
	  fns.forEach(function (fn) {
	    if (!isFunction$1(fn)) throw new TypeError('Decorators must be a function, but not "' + fn + '" in ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
	  });
	  if (fns.length === 1) return fns[0];
	  return function (obj, prop, descirptor) {
	    // $FlowFixMe: the reduce will return a descriptor
	    return fns.reduce(function (descirptor, fn) {
	      return fn(obj, prop, descirptor);
	    }, descirptor);
	  };
	}

	function accessor() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      get = _ref.get,
	      set = _ref.set;

	  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref2$preGet = _ref2.preGet,
	      preGet = _ref2$preGet === undefined ? false : _ref2$preGet,
	      _ref2$preSet = _ref2.preSet,
	      preSet = _ref2$preSet === undefined ? true : _ref2$preSet;

	  if (!isFunction$1(get) && !isFunction$1(set) && !(isArray$1(get) && get.length > 0) && !(isArray$1(set) && set.length > 0)) throw new TypeError("@accessor need a getter or setter. If you don't need to add setter/getter. You should remove @accessor");
	  var errmsg = '@accessor only accept function or array of function as getter/setter';
	  get = isArray$1(get) ? compressOneArgFnArray(get, errmsg) : get;
	  set = isArray$1(set) ? compressOneArgFnArray(set, errmsg) : set;
	  return function (obj, prop, descriptor) {
	    var _ref3 = descriptor || {},
	        _ref3$configurable = _ref3.configurable,
	        configurable = _ref3$configurable === undefined ? true : _ref3$configurable,
	        _ref3$enumerable = _ref3.enumerable,
	        enumerable = _ref3$enumerable === undefined ? true : _ref3$enumerable;

	    var hasGet = isFunction$1(get);
	    var hasSet = isFunction$1(set);
	    var handleGet = function handleGet(value) {
	      // $FlowFixMe: it's really function here
	      return hasGet ? bind$2(get, this)(value) : value;
	    };
	    var handleSet = function handleSet(value) {
	      // $FlowFixMe: it's really function here
	      return hasSet ? bind$2(set, this)(value) : value;
	    };
	    if (isAccessorDescriptor(descriptor)) {
	      var originGet = descriptor.get,
	          originSet = descriptor.set;

	      var hasOriginGet = isFunction$1(originGet);
	      var hasOriginSet = isFunction$1(originSet);
	      if (!hasOriginGet && hasGet) {
	        warn('You are trying to set getter via @accessor on ' + prop + ' without getter. That\'s not a good idea.');
	      }
	      if (!hasOriginSet && hasSet) {
	        warn('You are trying to set setter via @accessor on  ' + prop + ' without setter. That\'s not a good idea.');
	      }
	      var getter = hasOriginGet || hasGet ? function () {
	        var _this = this;

	        var boundGetter = bind$2(handleGet, this);
	        var originBoundGetter = function originBoundGetter() {
	          return hasOriginGet
	          // $FlowFixMe: we have do a check here
	          ? bind$2(originGet, _this)() : undefined;
	        };
	        var order = preGet ? [boundGetter, originBoundGetter] : [originBoundGetter, boundGetter];
	        // $FlowFixMe: it's all function here
	        return order.reduce(function (value, fn) {
	          return fn(value);
	        }, undefined);
	      } : undefined;
	      var setter = hasOriginSet || hasSet ? function (val) {
	        var _this2 = this;

	        var boundSetter = bind$2(handleSet, this);
	        var originBoundSetter = function originBoundSetter(value) {
	          return hasOriginSet
	          // $FlowFixMe: flow act like a retarded child on optional property
	          ? bind$2(originSet, _this2)(value) : value;
	        };
	        var order = preSet ? [boundSetter, originBoundSetter] : [originBoundSetter, boundSetter];
	        return order.reduce(function (value, fn) {
	          return fn(value);
	        }, val);
	      } : undefined;
	      return {
	        get: getter,
	        set: setter,
	        configurable: configurable,
	        enumerable: enumerable
	      };
	    } else if (isInitializerDescriptor(descriptor)) {
	      // $FlowFixMe: disjoint union is horrible, descriptor is initializerDescriptor now
	      var initializer = descriptor.initializer;

	      var value = void 0;
	      var inited = false;
	      return {
	        get: function get() {
	          var boundFn = bind$2(handleGet, this);
	          if (inited) return boundFn(value);
	          value = bind$2(initializer, this)();
	          inited = true;
	          return boundFn(value);
	        },
	        set: function set(val) {
	          var boundFn = bind$2(handleSet, this);
	          value = preSet ? boundFn(val) : val;
	          inited = true;
	          if (!preSet) {
	            boundFn(value);
	          }
	          return value;
	        },

	        configurable: configurable,
	        enumerable: enumerable
	      };
	    } else {
	      // $FlowFixMe: disjoint union is horrible, descriptor is DataDescriptor now
	      var _ref4 = descriptor || {},
	          _value = _ref4.value;

	      return {
	        get: function get() {
	          return bind$2(handleGet, this)(_value);
	        },
	        set: function set(val) {
	          var boundFn = bind$2(handleSet, this);
	          _value = preSet ? boundFn(val) : val;
	          if (!preSet) {
	            boundFn(_value);
	          }
	          return _value;
	        },

	        configurable: configurable,
	        enumerable: enumerable
	      };
	    }
	  };
	}

	function before() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  if (fns.length === 0) throw new Error("@before accept at least one parameter. If you don't need to preprocess before your function, do not add @before decorators");
	  if (fns.length > 2 && isDescriptor(fns[2])) {
	    throw new Error('You may use @before straightly, @before return decorators, you should call it before you set it as decorator.');
	  }
	  for (var i = fns.length - 1; i > -1; i--) {
	    if (!isFunction$1(fns[i])) throw new TypeError('@before only accept function parameter');
	  }
	  return function (obj, prop, descriptor) {
	    var _ref = descriptor || {},
	        fn = _ref.value,
	        configurable = _ref.configurable,
	        enumerable = _ref.enumerable,
	        writable = _ref.writable;

	    if (!isFunction$1(fn)) throw new TypeError('@before can only be used on function, please check the property "' + prop + '" is a method or not.');
	    var handler = function handler() {
	      var _this = this;

	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      var paras = fns.reduce(function (paras, fn) {
	        var result = bind$2(fn, _this).apply(undefined, _toConsumableArray(paras));
	        return result === undefined ? paras : isArray$1(result) ? result
	        // $FlowFixMe: what the hell, it can be anything
	        : [result];
	      }, args);
	      return bind$2(fn, this).apply(undefined, _toConsumableArray(paras));
	    };
	    return {
	      value: handler,
	      configurable: configurable,
	      enumerable: enumerable,
	      writable: writable
	    };
	  };
	}

	function initialize() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  if (fns.length === 0) throw new Error("@initialize accept at least one parameter. If you don't need to initialize your value, do not add @initialize.");
	  if (fns.length > 2 && isDescriptor(fns[2])) {
	    throw new Error('You may use @initialize straightly, @initialize return decorators, you need to call it');
	  }
	  var fn = compressOneArgFnArray(fns, '@initialize only accept function parameter');
	  return function (obj, prop, descriptor) {
	    if (descriptor === undefined) {
	      return {
	        value: bind$2(fn, obj)(),
	        configurable: true,
	        writable: true,
	        enumerable: true
	      };
	    }
	    if (isAccessorDescriptor(descriptor)) {
	      var hasBeenReset = false;
	      var originSet = descriptor.set;

	      return accessor({
	        get: function get(value) {
	          if (hasBeenReset) return value;
	          return bind$2(fn, this)(value);
	        },

	        set: originSet ? function (value) {
	          hasBeenReset = true;
	          return value;
	        } : undefined
	      })(obj, prop, descriptor);
	    }
	    /**
	     * when we set decorator on propery
	     * we will get a descriptor with initializer
	     * as they will be attach on the instance later
	     * so, we need to substitute the initializer function
	     */
	    if (isInitializerDescriptor(descriptor)) {
	      // $FlowFixMe: useless disjoint union
	      var initializer = descriptor.initializer;

	      var handler = function handler() {
	        return bind$2(fn, this)(bind$2(initializer, this)());
	      };
	      return {
	        initializer: handler,
	        configurable: descriptor.configurable,
	        // $FlowFixMe: useless disjoint union
	        writable: descriptor.writable,
	        enumerable: descriptor.enumerable
	      };
	    }
	    // $FlowFixMe: useless disjoint union
	    var value = bind$2(fn, this)(descriptor.value);
	    return {
	      value: value,
	      // $FlowFixMe: useless disjoint union
	      writable: descriptor.writable,
	      configurable: descriptor.configurable,
	      enumerable: descriptor.enumerable
	    };
	  };
	}

	var getOwnPropertyDescriptor$1$1 = _Object$getOwnPropertyDescriptor;
	var defineProperty$5 = _Object$defineProperty;

	function setAlias(root, prop, _ref, obj, key, _ref2) {
	  var configurable = _ref.configurable,
	      enumerable = _ref.enumerable;
	  var force = _ref2.force,
	      omit = _ref2.omit;

	  var originDesc = getOwnPropertyDescriptor$1$1(obj, key);
	  if (originDesc !== undefined) {
	    if (omit) return;
	    // TODO: we should add an github link here
	    if (!force) throw new Error('"' + prop + '" is an existing property, if you want to override it, please set "force" true in @alias option.');
	    if (!originDesc.configurable) {
	      throw new Error('property "' + prop + '" is unconfigurable.');
	    }
	  }
	  defineProperty$5(obj, key, {
	    get: function get() {
	      return root[prop];
	    },
	    set: function set(value) {
	      root[prop] = value;
	      return prop;
	    },

	    configurable: configurable,
	    enumerable: enumerable
	  });
	}
	function alias(other, key, option) {
	  // set argument into right position
	  if (arguments.length === 2) {
	    if (isString(other)) {
	      // $FlowFixMe: i will check this later
	      option = key;
	      key = other;
	      other = undefined;
	    }
	  } else if (arguments.length === 1) {
	    // $FlowFixMe: i will check this later
	    key = other;
	    other = undefined;
	  }
	  // argument validate
	  if (!isString(key)) throw new TypeError('@alias need a string as a key to find the porperty to set alias on');
	  var illegalObjErrorMsg = 'If you want to use @alias to set alias on other instance, you must pass in a legal instance';
	  if (other !== undefined && isPrimitive(other)) throw new TypeError(illegalObjErrorMsg);

	  var _ref3 = isObject$1(option) ? option : { force: false, omit: false },
	      force = _ref3.force,
	      omit = _ref3.omit;

	  return function (obj, prop, descriptor) {
	    descriptor = descriptor || {
	      value: undefined,
	      configurable: true,
	      writable: true,
	      enumerable: true
	    };
	    function getTargetAndName(other, obj, key) {
	      var target = isPrimitive(other) ? obj : other;
	      var keys = key.split('.');

	      var _keys$slice = keys.slice(-1),
	          _keys$slice2 = _slicedToArray(_keys$slice, 1),
	          name = _keys$slice2[0];

	      target = getDeepProperty$1(target, keys.slice(0, -1), { throwError: true });
	      if (isPrimitive(target)) {
	        throw new TypeError(illegalObjErrorMsg);
	      }
	      return {
	        target: target,
	        name: name
	      };
	    }
	    if (isInitializerDescriptor(descriptor)) {
	      return initialize(function (value) {
	        var _getTargetAndName = getTargetAndName(other, this, key),
	            target = _getTargetAndName.target,
	            name = _getTargetAndName.name;

	        setAlias(this, prop, descriptor, target, name, { force: force, omit: omit });
	        return value;
	      })(obj, prop, descriptor);
	    }
	    if (isAccessorDescriptor(descriptor)) {
	      var inited = void 0;
	      var handler = function handler(value) {
	        if (inited) return value;

	        var _getTargetAndName2 = getTargetAndName(other, this, key),
	            target = _getTargetAndName2.target,
	            name = _getTargetAndName2.name;

	        setAlias(this, prop, descriptor, target, name, { force: force, omit: omit });
	        inited = true;
	        return value;
	      };
	      return accessor({ get: handler, set: handler })(obj, prop, descriptor);
	    }

	    var _getTargetAndName3 = getTargetAndName(other, obj, key),
	        target = _getTargetAndName3.target,
	        name = _getTargetAndName3.name;

	    setAlias(obj, prop, descriptor, target, name, { force: force, omit: omit });
	    return descriptor;
	  };
	}

	var defineProperty$1$1 = _Object$defineProperty;

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

	    if (!isArray$1(exclude)) throw new TypeError('options.exclude must be an array');
	    if (!isArray$1(include)) throw new TypeError('options.include must be an array');
	    return function (Klass) {
	      var isClass = isFunction$1(Klass);
	      if (!self && !isClass) throw new TypeError('@' + decorator.name + 'Class can only be used on class');
	      if (self && isPrimitive(Klass)) throw new TypeError('@' + decorator.name + 'Class must be used on non-primitive type value in \'self\' mode');
	      var prototype = self ? Klass : Klass.prototype;
	      if (isVoid(prototype)) throw new Error('The prototype of the ' + Klass.name + ' is empty, please check it');
	      var descs = getOwnPropertyDescriptors$2(prototype);
	      getOwnKeys(prototype).concat(include).forEach(function (key) {
	        var desc = descs[key];
	        if (key === 'constructor' && !construct || self && isClass && ['name', 'length', 'prototype'].indexOf(key) > -1 || exclude.indexOf(key) > -1 || isFunction$1(requirement) && requirement(prototype, key, desc, { self: self }) === false) return;
	        defineProperty$1$1(prototype, key, (customArgs ? decorator.apply(undefined, _toConsumableArray(args)) : decorator)(prototype, key, desc));
	      });
	    };
	  };
	}

	var autobindClass = classify(autobind, {
	  requirement: function requirement(obj, prop, desc) {
	    // $FlowFixMe: it's data descriptor now
	    return isDataDescriptor(desc) && isFunction$1(desc.value);
	  }
	});

	var mapStore = void 0;
	// save bound function for super
	function getBoundSuper(obj, fn) {
	  if (typeof _WeakMap$1 === 'undefined') {
	    throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()');
	  }

	  if (!mapStore) {
	    mapStore = new _WeakMap$1();
	  }

	  if (mapStore.has(obj) === false) {
	    mapStore.set(obj, new _WeakMap$1());
	  }

	  var superStore = mapStore.get(obj);
	  // $FlowFixMe: already insure superStore is not undefined
	  if (superStore.has(fn) === false) {
	    // $FlowFixMe: already insure superStore is not undefined
	    superStore.set(fn, bind$2(fn, obj));
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

	  if (!isFunction$1(fn)) {
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

	var defineProperty$2$1 = _Object$defineProperty;
	/**
	 * make one attr only can be read, but could not be rewrited/ deleted
	 * @param {Object} obj
	 * @param {string} prop
	 * @param {Object} descriptor
	 * @return {descriptor}
	 */

	function frozen(obj, prop, descriptor) {
	  if (descriptor === undefined) {
	    /* istanbul ignore else  */
	    warn('You are using @frozen on an undefined property. This property will become a frozen undefined forever, which is meaningless');
	    return {
	      value: undefined,
	      writable: false,
	      enumerable: false,
	      configurable: false
	    };
	  }
	  descriptor.enumerable = false;
	  descriptor.configurable = false;
	  if (isAccessorDescriptor(descriptor)) {
	    var _get = descriptor.get;

	    descriptor.set = undefined;
	    if (!isFunction$1(_get)) {
	      /* istanbul ignore else  */
	      warn('You are using @frozen on one accessor descriptor without getter. This property will become a frozen undefined finally.Which maybe meaningless.');
	      return;
	    }
	    return {
	      get: function get() {
	        var value = bind$2(_get, this)();
	        defineProperty$2$1(this, prop, {
	          value: value,
	          writable: false,
	          configurable: false,
	          enumerable: false
	        });
	        return value;
	      },

	      set: undefined,
	      configurable: false,
	      enumerable: false
	    };
	  }
	  // $FlowFixMe: comeon, can disjoint union be reliable?
	  descriptor.writable = false;
	  return descriptor;
	}

	var getOwnPropertyDescriptor$2$1 = _Object$getOwnPropertyDescriptor;
	var defineProperty$3$1 = _Object$defineProperty;

	function waituntil(key) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      other = _ref.other;

	  if (!isFunction$1(key) && !isPromise(key) && !isString(key)) throw new TypeError('@waitUntil only accept Function, Promise or String');
	  return function (obj, prop, descriptor) {
	    var _ref2 = descriptor || {},
	        _value = _ref2.value,
	        configurable = _ref2.configurable;

	    if (!isFunction$1(_value)) throw new TypeError('@waituntil can only be used on function, but not ' + _value + ' on property "' + prop + '"');
	    var binded = false;
	    var waitingQueue = [];
	    var canIRun = isPromise(key) ? function () {
	      return key;
	    } : isFunction$1(key) ? key : function () {
	      // $FlowFixMe: We have use isPromise to exclude
	      var keys = key.split('.');
	      var prop = keys.slice(-1);
	      var originTarget = isPrimitive(other) ? this : other;
	      if (!binded) {
	        var target = getDeepProperty$1(originTarget, keys.slice(0, -1));
	        if (isVoid(target)) return target;
	        var _descriptor = getOwnPropertyDescriptor$2$1(target, prop);
	        /**
	         * create a setter hook here
	         * when it get ture, it will run all function in waiting queue immediately
	         */
	        var set = function set(value) {
	          if (value === true) {
	            while (waitingQueue.length > 0) {
	              waitingQueue[0]();
	              waitingQueue.shift();
	            }
	          }
	          return value;
	        };
	        var desc = isDescriptor(_descriptor) ? accessor({ set: set })(target, prop, _descriptor) : accessor({ set: set })(target, prop, {
	          value: undefined,
	          configurable: true,
	          enumerable: true,
	          writable: true
	        });
	        defineProperty$3$1(target, prop, desc);
	        binded = true;
	      }
	      return getDeepProperty$1(originTarget, keys);
	    };
	    return {
	      value: function value() {
	        var _this = this;

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        var boundFn = bind$2(_value, this);
	        var runnable = bind$2(canIRun, this).apply(undefined, args);
	        if (isPromise(runnable)) {
	          return _Promise.resolve(runnable).then(function () {
	            return bind$2(_value, _this).apply(undefined, args);
	          });
	        } else if (runnable === true) {
	          return bind$2(_value, this).apply(undefined, args);
	        } else {
	          return new _Promise(function (resolve) {
	            var cb = function cb() {
	              boundFn.apply(undefined, args);
	              resolve();
	            };
	            waitingQueue.push(cb);
	          });
	        }
	      },

	      // function should not be enmuerable
	      enumerable: false,
	      configurable: configurable,
	      // as we have delay this function
	      // it's not a good idea to change it
	      writable: false
	    };
	  };
	}

	function nonenumerable(obj, prop, descriptor) {
	  if (descriptor === undefined) {
	    return {
	      value: undefined,
	      enumerable: false,
	      configurable: true,
	      writable: true
	    };
	  }
	  descriptor.enumerable = false;
	  return descriptor;
	}

	var defineProperty$6 = _Object$defineProperty;
	var getOwnPropertyDescriptor$3 = _Object$getOwnPropertyDescriptor;


	function applyDecorators(Class, props) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$self = _ref.self,
	      self = _ref$self === undefined ? false : _ref$self,
	      _ref$omit = _ref.omit,
	      omit = _ref$omit === undefined ? false : _ref$omit;

	  var isPropsFunction = isFunction$1(props);
	  if (isPropsFunction || isArray$1(props)) {
	    // apply decorators on class
	    if (!isFunction$1(Class)) throw new TypeError('If you want to decorator class, you must pass it a legal class');
	    // $FlowFixMe: Terrible union, it's function now
	    if (isPropsFunction) props(Class);else {
	      // $FlowFixMe: Terrible union, it's array now
	      for (var i = 0, len = props.length; i < len; i++) {
	        // $FlowFixMe: Terrible union, it's array now
	        var fn = props[i];
	        if (!isFunction$1(fn)) throw new TypeError('If you want to decorate an class, you must pass it function or array of function');
	        fn(Class);
	      }
	    }
	    return Class;
	  }
	  if (!self && !isFunction$1(Class)) throw new TypeError('applyDecorators only accept class as first arguments. If you want to modify instance, you should set options.self true.');
	  if (self && isPrimitive(Class)) throw new TypeError("We can't apply docorators on a primitive value, even in self mode");
	  if (!isObject$1(props)) throw new TypeError('applyDecorators only accept object as second arguments');
	  var prototype = self ? Class : Class.prototype;
	  if (isVoid(prototype)) throw new Error('The class muse have a prototype, please take a check');
	  for (var key in props) {
	    var value = props[key];
	    var decorators = isArray$1(value) ? value : [value];
	    var handler = void 0;
	    try {
	      handler = compressMultipleDecorators.apply(undefined, _toConsumableArray(decorators));
	    } catch (err) {
	      /* istanbul ignore else  */
	      warn(err && err.message);
	      throw new Error('The decorators set on props must be Function or Array of Function');
	    }
	    var descriptor = getOwnPropertyDescriptor$3(prototype, key);
	    if (descriptor && !descriptor.configurable) {
	      if (!omit) throw new Error(key + ' of ' + prototype + ' is unconfigurable');
	      continue;
	    }
	    defineProperty$6(prototype, key, handler(prototype, key, descriptor));
	  }
	  return Class;
	}

	var arrayChangeMethod = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse'];

	function deepProxy(value, hook, _ref) {
	  var _operateProps;

	  var diff = _ref.diff,
	      operationPrefix = _ref.operationPrefix;

	  var mapStore = {};
	  var arrayChanging = false;
	  var proxyValue = new Proxy(value, {
	    get: function get(target, property, receiver) {
	      var value = target[property];
	      if (isArray$1(target) && arrayChangeMethod.indexOf(property) > -1) {
	        return function () {
	          arrayChanging = true;
	          bind$2(value, receiver).apply(undefined, arguments);
	          arrayChanging = false;
	          hook();
	        };
	      }
	      if (mapStore[property] === true) return value;
	      if (isObject$1(value) || isArray$1(value)) {
	        var _proxyValue = mapStore[property] || deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix });
	        mapStore[property] = _proxyValue;
	        return _proxyValue;
	      }
	      mapStore[property] = true;
	      return value;
	    },
	    set: function set(target, property, value) {
	      var oldVal = target[property];
	      var newVal = isObject$1(value) || isArray$1(value) ? deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix }) : value;
	      target[property] = newVal;
	      mapStore[property] = true;
	      if (arrayChanging || diff && oldVal === newVal) return true;
	      hook();
	      return true;
	    },
	    deleteProperty: function deleteProperty(target, property) {
	      delete target[property];
	      delete mapStore[property];
	      if (arrayChanging) return true;
	      hook();
	      return true;
	    }
	  });
	  var operateProps = (_operateProps = {}, _defineProperty$1(_operateProps, operationPrefix + 'set', [initialize(function (method) {
	    return function (property, val) {
	      // $FlowFixMe: we have check the computed value
	      proxyValue[property] = val;
	    };
	  }), nonenumerable]), _defineProperty$1(_operateProps, operationPrefix + 'del', [initialize(function (method) {
	    return function (property) {
	      // $FlowFixMe: we have check the computed value
	      delete proxyValue[property];
	    };
	  }), nonenumerable]), _operateProps);
	  applyDecorators(proxyValue, operateProps, { self: true });
	  return proxyValue;
	}

	function deepObserve(value, hook, _ref2) {
	  var _this = this,
	      _operateProps2;

	  var operationPrefix = _ref2.operationPrefix,
	      diff = _ref2.diff;

	  var mapStore = {};
	  var arrayChanging = false;
	  function getPropertyDecorators(keys) {
	    var oldVal = void 0;
	    return keys.reduce(function (props, key) {
	      props[key] = [accessor({
	        set: function set(value) {
	          oldVal = this[key];
	          return value;
	        }
	      }), accessor({
	        get: function get(val) {
	          if (mapStore[key]) return val;
	          if (isObject$1(val) || isArray$1(val)) {
	            deepObserve(val, hook, { operationPrefix: operationPrefix, diff: diff });
	          }
	          mapStore[key] = true;
	          return val;
	        },
	        set: function set(val) {
	          if (isObject$1(val) || isArray$1(val)) deepObserve(val, hook, { operationPrefix: operationPrefix, diff: diff });
	          mapStore[key] = true;
	          if (!arrayChanging && (!diff || oldVal !== val)) hook();
	          return val;
	        }
	      }, { preSet: false })];
	      return props;
	    }, {});
	  }
	  var props = getPropertyDecorators(getOwnKeys(value));
	  applyDecorators(value, props, { self: true, omit: true });
	  if (isArray$1(value)) {
	    var methodProps = arrayChangeMethod.reduce(function (props, key) {
	      props[key] = [initialize(function (method) {
	        method = isFunction$1(method) ? method
	        // $FlowFixMe: we have check the key
	        : Array.prototype[key];
	        return function () {
	          var originLength = value.length;
	          arrayChanging = true;
	          bind$2(method, value).apply(undefined, arguments);
	          arrayChanging = false;
	          if (originLength < value.length) {
	            var keys = new Array(value.length - originLength).fill(1).map(function (value, index) {
	              return (index + originLength).toString();
	            });
	            var _props = getPropertyDecorators(keys);
	            applyDecorators(value, _props, { self: true, omit: true });
	          }
	          hook();
	        };
	      }), nonenumerable];
	      return props;
	    }, {});
	    applyDecorators(value, methodProps, { self: true });
	  }
	  var operateProps = (_operateProps2 = {}, _defineProperty$1(_operateProps2, operationPrefix + 'set', [initialize(function (method) {
	    return function (property, val) {
	      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	          disable = _ref3.disable,
	          isNewVal = _ref3.isNewVal;

	      isNewVal = isNewVal || getOwnKeys(value).indexOf(property) === -1;
	      if (isFunction$1(method)) {
	        bind$2(method, _this)(property, val, { disable: true, isNewVal: isNewVal });
	      }
	      if (isNewVal) {
	        var _props2 = getPropertyDecorators([property]);
	        applyDecorators(value, _props2, { self: true, omit: true });
	      }
	      if (!disable) {
	        value[property] = val;
	      }
	    };
	  }), nonenumerable]), _defineProperty$1(_operateProps2, operationPrefix + 'del', [initialize(function (method) {
	    return function (property) {
	      if (isFunction$1(method)) {
	        bind$2(method, _this)(property);
	      } else {
	        delete value[property];
	      }
	      hook();
	    };
	  }), nonenumerable]), _operateProps2);
	  applyDecorators(value, operateProps, { self: true });
	  return value;
	}

	function watch() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var option = isObject$1(args[args.length - 1]) ? args[args.length - 1] : {};
	  // $FlowFixMe: we have check if it's an object
	  var deep = option.deep,
	      omit = option.omit,
	      other = option.other,
	      _option$operationPref = option.operationPrefix,
	      operationPrefix = _option$operationPref === undefined ? '__' : _option$operationPref,
	      _option$diff = option.diff,
	      diff = _option$diff === undefined ? true : _option$diff;
	  // $FlowFixMe: we have check if it's an object

	  var proxy = option.proxy;

	  if (typeof Proxy !== 'function') {
	    proxy = false;
	    /* istanbul ignore else  */
	    warn('You browser do not support Proxy, we will fall back into observe mode.');
	  }
	  if (!args.length) throw new TypeError('You must pass a function or a string to find the hanlder function.');
	  if (other !== undefined && isPrimitive(other)) throw new TypeError('If you want us to trigger function on the other instance, you must pass in a legal instance');
	  if (!isString(operationPrefix)) throw new TypeError('operationPrefix must be an string');
	  return function (obj, prop, descriptor) {
	    var fns = args.reduce(function (fns, keyOrFn, index) {
	      if (!isString(keyOrFn) && !isFunction$1(keyOrFn)) {
	        if (!index || index !== args.length - 1) throw new TypeError('You can only pass function or string as handler');
	        return fns;
	      }
	      fns.push(isString(keyOrFn) ? function (newVal, oldVal) {
	        var target = other || obj;
	        // $FlowFixMe: we have ensure it must be a string
	        var fn = getDeepProperty$1(target, keyOrFn);
	        if (!isFunction$1(fn)) {
	          if (!omit) throw new Error('You pass in a function for us to trigger, please ensure the property to be a function or set omit flag true');
	          return;
	        }
	        return bind$2(fn, this)(newVal, oldVal);
	      } : keyOrFn);
	      return fns;
	    }, []);
	    var handler = function handler(newVal, oldVal) {
	      var _this2 = this;

	      fns.forEach(function (fn) {
	        return bind$2(fn, _this2)(newVal, oldVal);
	      });
	    };
	    var inited = false;
	    var oldVal = void 0;
	    var newVal = void 0;
	    var proxyValue = void 0;
	    return compressMultipleDecorators(accessor({
	      set: function set(value) {
	        var _this3 = this;

	        oldVal = this[prop];
	        proxyValue = undefined;
	        var hook = function hook() {
	          return bind$2(handler, _this3)(newVal, oldVal);
	        };
	        return deep && (isObject$1(value) || isArray$1(value)) ? proxy ? deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix }) : deepObserve(value, hook, { operationPrefix: operationPrefix, diff: diff }) : value;
	      },
	      get: function get(value) {
	        var _this4 = this;

	        if (proxyValue) return proxyValue;
	        if (!inited) {
	          inited = true;
	          var hook = function hook() {
	            return bind$2(handler, _this4)(newVal, oldVal);
	          };
	          if (deep && (isObject$1(value) || isArray$1(value))) {
	            if (proxy) {
	              proxyValue = deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix });
	              oldVal = proxyValue;
	              newVal = proxyValue;
	              return proxyValue;
	            }
	            deepObserve(value, hook, { operationPrefix: operationPrefix, diff: diff });
	          }
	          oldVal = value;
	          newVal = value;
	        }
	        return value;
	      }
	    }, { preSet: true }), accessor({
	      set: function set(value) {
	        newVal = value;
	        if (!diff || oldVal !== value) bind$2(handler, this)(newVal, oldVal);
	        oldVal = value;
	        return value;
	      }
	    }, { preSet: false }))(obj, prop, descriptor);
	  };
	}

	function runnable(key) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      other = _ref.other,
	      backup = _ref.backup;

	  if (!isFunction$1(key) && !isString(key)) throw new TypeError('@runnable only accept Function or String');
	  return function (obj, prop, descriptor) {
	    var _ref2 = descriptor || {},
	        _value = _ref2.value,
	        configurable = _ref2.configurable;

	    if (!isFunction$1(_value)) throw new TypeError('@runnable can only be used on method, but not ' + _value + ' on property "' + prop + '".');
	    var canIRun = isFunction$1(key) ? key : function () {
	      var keys = key.split('.');
	      var originTarget = isPrimitive(other) ? this : other;
	      return getDeepProperty$1(originTarget, keys);
	    };
	    backup = isFunction$1(backup) ? backup : function () {};
	    return {
	      value: function value() {
	        if (bind$2(canIRun, this).apply(undefined, arguments) === true) {
	          return bind$2(_value, this).apply(undefined, arguments);
	        } else {
	          // $FlowFixMe: I have reassign it when it's not a function
	          return bind$2(backup, this).apply(undefined, arguments);
	        }
	      },

	      // function should not be enmuerable
	      enumerable: false,
	      configurable: configurable,
	      // as we have delay this function
	      // it's not a good idea to change it
	      writable: false
	    };
	  };
	}

	function nonconfigurable(obj, prop, descriptor) {
	  if (descriptor === undefined) {
	    return {
	      value: undefined,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    };
	  }
	  descriptor.configurable = true;
	  return descriptor;
	}

	function string() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isString(args[0]) ? args.shift() : '';
	  args.unshift(function (value) {
	    return isString(value) ? value : defaultValue;
	  });
	  return initialize.apply(undefined, args);
	}

	function boolean() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isBoolean$1(args[0]) ? args.shift() : false;
	  args.unshift(function (value) {
	    return isBoolean$1(value) ? value : defaultValue;
	  });
	  return initialize.apply(undefined, args);
	}

	function string$1() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isString(args[0]) ? args.shift() : '';
	  args.unshift(function (value) {
	    return isString(value) ? value : defaultValue;
	  });
	  return accessor({ set: args, get: args });
	}

	function boolean$1() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isBoolean$1(args[0]) ? args.shift() : false;
	  args.unshift(function (value) {
	    return isBoolean$1(value) ? value : defaultValue;
	  });
	  return accessor({ set: args, get: args });
	}

	function number$1() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isNumber$1(args[0]) ? args.shift() : 0;
	  args.unshift(function (value) {
	    return isNumber$1(value) ? value : defaultValue;
	  });
	  return accessor({ set: args, get: args });
	}

	var $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
	var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON$1.stringify.apply($JSON$1, arguments);
	};

	var stringify$1 = createCommonjsModule(function (module) {
	module.exports = { "default": stringify, __esModule: true };
	});

	var _JSON$stringify = unwrapExports(stringify$1);

	var videoEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended', 'error', 'interruptbegin', 'interruptend', 'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
	var videoReadOnlyProperties = ['buffered', 'currentSrc', 'duration', 'error', 'ended', 'networkState', 'paused', 'readyState', 'seekable', 'sinkId', 'controlsList', 'tabIndex', 'dataset', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth'];
	var domEvents = ['beforeinput', 'blur', 'click', 'compositionend', 'compositionstart', 'compositionupdate', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll', 'select', 'wheel', 'mousewheel', 'contextmenu', 'touchstart', 'touchmove', 'touchend', 'fullscreen'];
	var esFullscreenEvents = ['fullscreenchange'];
	var passiveEvents = ['wheel', 'mousewheel', 'touchstart', 'touchmove'];
	var selfProcessorEvents = ['silentLoad', 'fullscreen'];
	var mustListenVideoDomEvents = ['mouseenter', 'mouseleave'];
	var kernelMethods = ['play', 'pause', 'seek', 'startLoad', 'stopLoad'];
	var dispatcherMethods = ['load'];
	var kernelEvents = ['mediaInfo', 'heartbeat', 'error'];
	var domMethods = ['focus', 'fullscreen', 'requestFullscreen', 'exitFullscreen'];
	var videoMethods = ['canPlayType', 'captureStream', 'setSinkId'];

	/**
	 * checker for on, off, once function
	 * @param {string} key
	 * @param {Function} fn
	 */
	function eventBinderCheck(key, fn) {
	  if (!isString(key)) throw new TypeError('key parameter must be String');
	  if (!isFunction_1(fn)) throw new TypeError('fn parameter must be Function');
	}
	/**
	 * checker for attr or css function
	 */
	function attrAndStyleCheck() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (args.length > 2) {
	    return ['set'].concat(args);
	  }
	  if (args.length === 2) {
	    if (['video', 'container', 'wrapper', 'videoElement'].indexOf(args[0]) > -1) {
	      return ['get'].concat(args);
	    }
	    return ['set', 'container'].concat(args);
	  }
	  return ['get', 'container'].concat(args);
	}

	// 20.1.2.4 Number.isNaN(number)


	_export(_export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	var isNan = _core.Number.isNaN;

	var isNan$1 = createCommonjsModule(function (module) {
	module.exports = { "default": isNan, __esModule: true };
	});

	var _Number$isNaN = unwrapExports(isNan$1);

	var _dec, _dec2, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

	function _initDefineProp(target, property, descriptor, context) {
	  if (!descriptor) return;

	  _Object$defineProperty(target, property, {
	    enumerable: descriptor.enumerable,
	    configurable: descriptor.configurable,
	    writable: descriptor.writable,
	    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	  });
	}

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

	function stringOrVoid(value) {
	  return isString(value) ? value : undefined;
	}

	function accessorVideoProperty(property) {
	  return accessor({
	    get: function get(value) {
	      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement[property] : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      this.dom.videoElement[property] = value;
	      return value;
	    }
	  });
	}

	function accessorVideoAttribute(attribute) {
	  var _ref = isObject$1(attribute) ? attribute : {
	    set: attribute,
	    get: attribute,
	    isBoolean: false
	  },
	      _set = _ref.set,
	      _get = _ref.get,
	      isBoolean = _ref.isBoolean;

	  return accessor({
	    get: function get(value) {
	      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement[_get] : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      var val = isBoolean ? value ? '' : undefined
	      /* istanbul ignore next */
	      : value === null ? undefined : value;
	      this.dom.setAttr('video', _set, val);
	      return value;
	    }
	  }, {
	    preSet: false
	  });
	}

	function accessorCustomAttribute(attribute, isBoolean) {
	  return accessor({
	    get: function get(value) {
	      var attrValue = this.dom.getAttr('video', attribute);
	      return this.dispatcher.videoConfigReady && this.inited ? isBoolean ? !!attrValue : attrValue : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      var val = isBoolean ? value || undefined : value === null ? undefined : value;
	      this.dom.setAttr('video', attribute, val);
	      return value;
	    }
	  });
	}

	function accessorWidthAndHeight(property) {
	  return accessor({
	    get: function get(value) {
	      if (!this.dispatcher.videoConfigReady || !this.inited) return value;
	      var attr = this.dom.getAttr('video', property);
	      var prop = this.dom.videoElement[property];
	      if (isNumeric(attr) && isNumber_1(prop)) return prop;
	      return attr || undefined;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      var val = void 0;
	      if (value === undefined || isNumber_1(value)) {
	        val = value;
	      } else if (isString(value) && !_Number$isNaN(parseFloat(value))) {
	        val = value;
	      }
	      this.dom.setAttr('video', property, val);
	      return val;
	    }
	  });
	}

	var accessorMap = {
	  src: [string$1(), accessor({
	    set: function set(val) {
	      // must check val !== this.src here
	      // as we will set config.src in the video
	      // the may cause dead lock
	      if (this.dispatcher.readySync && this.autoload && val !== this.src) this.needToLoadSrc = true;
	      return val;
	    }
	  }), accessor({
	    set: function set(val) {
	      if (this.needToLoadSrc) {
	        // unlock it at first, to avoid deadlock
	        this.needToLoadSrc = false;
	        this.dispatcher.binder.emit({
	          name: 'load',
	          target: 'plugin',
	          id: 'dispatcher'
	        }, val);
	      }
	      return val;
	    }
	  }, { preSet: false })],
	  autoload: boolean$1(),
	  autoplay: [boolean$1(), accessorVideoProperty('autoplay')],
	  controls: [boolean$1(), accessorVideoProperty('controls')],
	  width: [accessorWidthAndHeight('width')],
	  height: [accessorWidthAndHeight('height')],
	  crossOrigin: [accessor({ set: stringOrVoid }), accessorVideoAttribute({ set: 'crossorigin', get: 'crossOrigin' })],
	  loop: [boolean$1(), accessorVideoProperty('loop')],
	  defaultMuted: [boolean$1(), accessorVideoAttribute({ get: 'defaultMuted', set: 'muted', isBoolean: true })],
	  muted: [boolean$1(), accessorVideoProperty('muted')],
	  preload: [accessor({
	    set: function set(value) {
	      var options = ['none', 'auto', 'metadata', ''];
	      return options.indexOf(value) > -1 ? value : 'none';
	    }
	  }, {
	    preSet: true
	  }), accessorVideoAttribute('preload')],
	  poster: [
	  // 因为如果在 video 上随便加一个字符串，他会将其拼接到地址上，所以这里要避免
	  // 单元测试无法检测
	  string$1(), accessor({
	    get: function get(value) {
	      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement.poster : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      if (value.length) this.dom.setAttr('video', 'poster', value);
	      return value;
	    }
	  })],
	  playsInline: [accessor({
	    get: function get(value) {
	      var playsInline = this.dom.videoElement.playsInline;
	      return this.dispatcher.videoConfigReady && this.inited ? playsInline === undefined ? value : playsInline : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      this.dom.videoElement.playsInline = value;
	      var val = value ? '' : undefined;
	      this.dom.setAttr('video', 'playsinline', val);
	      this.dom.setAttr('video', 'webkit-playsinline', val);
	      this.dom.setAttr('video', 'x5-playsinline', val);
	      return value;
	    }
	  }), boolean$1()],
	  x5VideoPlayerFullscreen: [accessor({
	    set: function set(value) {
	      return !!value;
	    },
	    get: function get(value) {
	      return !!value;
	    }
	  }), accessorCustomAttribute('x5-video-player-fullscreen', true)],
	  x5VideoOrientation: [accessor({ set: stringOrVoid }), accessorCustomAttribute('x5-video-orientation')],
	  x5VideoPlayerType: [accessor({
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      var val = value === 'h5' ? 'h5' : undefined;
	      this.dom.setAttr('video', 'x5-video-player-type', val);
	      return value;
	    },
	    get: function get() {
	      return this.dom.getAttr('video', 'x5-video-player-type') ? 'h5' : undefined;
	    }
	  })],
	  xWebkitAirplay: [accessor({
	    set: function set(value) {
	      return !!value;
	    },
	    get: function get(value) {
	      return !!value;
	    }
	  }), accessorCustomAttribute('x-webkit-airplay', true)],
	  playbackRate: [number$1(1), accessorVideoProperty('playbackRate')],
	  defaultPlaybackRate: [accessorVideoProperty('defaultPlaybackRate'), number$1(1)],
	  disableRemotePlayback: [boolean$1(), accessorVideoProperty('disableRemotePlayback')],
	  volume: [number$1(1), accessorVideoProperty('volume')]
	};

	var VideoConfig = (_dec = boolean(), _dec2 = string(function (str) {
	  return str.toLocaleLowerCase();
	}), (_class = function () {

	  // 转为供 kernel 使用的内部参数
	  function VideoConfig(dispatcher, config) {
	    _classCallCheck(this, VideoConfig);

	    _initDefineProp(this, 'needToLoadSrc', _descriptor, this);

	    _initDefineProp(this, 'changeWatchable', _descriptor2, this);

	    _initDefineProp(this, 'inited', _descriptor3, this);

	    this.src = '';

	    _initDefineProp(this, 'isLive', _descriptor4, this);

	    _initDefineProp(this, 'box', _descriptor5, this);

	    this.preset = {};
	    this.presetConfig = {};
	    this.autoload = true;
	    this.autoplay = false;
	    this.controls = false;
	    this.width = '100%';
	    this.height = '100%';
	    this.crossOrigin = undefined;
	    this.loop = false;
	    this.defaultMuted = false;
	    this.muted = false;
	    this.preload = 'auto';
	    this.poster = undefined;
	    this.playsInline = false;
	    this.x5VideoPlayerFullscreen = false;
	    this.x5VideoOrientation = undefined;
	    this.x5VideoPlayerType = undefined;
	    this.xWebkitAirplay = false;
	    this.playbackRate = 1;
	    this.defaultPlaybackRate = 1;
	    this.disableRemotePlayback = false;
	    this.volume = 1;

	    _initDefineProp(this, '_kernelProperty', _descriptor6, this);

	    _initDefineProp(this, '_realDomAttr', _descriptor7, this);

	    applyDecorators(this, accessorMap, { self: true });
	    Object.defineProperty(this, 'dispatcher', {
	      value: dispatcher,
	      enumerable: false,
	      writable: false,
	      configurable: false
	    });
	    Object.defineProperty(this, 'dom', {
	      value: dispatcher.dom,
	      enumerable: false,
	      writable: false,
	      configurable: false
	    });
	    merge_1(this, config);
	  }

	  // 此处 box 只能置空，因为 kernel 会自动根据你的安装 kernel 和相关地址作智能判断。
	  // 曾经 bug 详见 https://github.com/Chimeejs/chimee-kernel/issues/1

	  // kernels 不在 videoConfig 上设置默认值，防止判断出错


	  _createClass(VideoConfig, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      this._realDomAttr.forEach(function (key) {
	        // $FlowFixMe: we have check the computed here
	        _this[key] = _this[key];
	      });
	      this.inited = true;
	    }
	  }]);

	  return VideoConfig;
	}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'needToLoadSrc', [nonenumerable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'changeWatchable', [nonenumerable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return true;
	  }
	}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'inited', [nonenumerable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'isLive', [_dec, nonconfigurable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'box', [_dec2, nonconfigurable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return '';
	  }
	}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, '_kernelProperty', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return ['isLive', 'box', 'preset', 'kernels', 'presetConfig'];
	  }
	}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, '_realDomAttr', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return ['src', 'controls', 'width', 'height', 'crossOrigin', 'loop', 'muted', 'preload', 'poster', 'autoplay', 'playsInline', 'x5VideoPlayerFullscreen', 'x5VideoOrientation', 'xWebkitAirplay', 'playbackRate', 'defaultPlaybackRate', 'autoload', 'disableRemotePlayback', 'defaultMuted', 'volume', 'x5VideoPlayerType'];
	  }
	})), _class));

	var _dec$1, _dec2$1, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class$1, _class2;

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
	var VideoWrapper = (_dec$1 = autobindClass(), _dec2$1 = alias('silentLoad'), _dec3 = alias('fullScreen'), _dec4 = alias('$fullScreen'), _dec5 = alias('fullscreen'), _dec6 = alias('emit'), _dec7 = alias('emitSync'), _dec8 = alias('on'), _dec9 = alias('addEventListener'), _dec10 = before(eventBinderCheck), _dec11 = alias('off'), _dec12 = alias('removeEventListener'), _dec13 = before(eventBinderCheck), _dec14 = alias('once'), _dec15 = before(eventBinderCheck), _dec16 = alias('css'), _dec17 = before(attrAndStyleCheck), _dec18 = alias('attr'), _dec19 = before(attrAndStyleCheck), _dec$1(_class$1 = (_class2 = function () {
	  function VideoWrapper() {
	    _classCallCheck(this, VideoWrapper);

	    this.__events = {};
	    this.__unwatchHandlers = [];
	  }

	  _createClass(VideoWrapper, [{
	    key: '__wrapAsVideo',
	    value: function __wrapAsVideo(videoConfig) {
	      var _this = this;

	      // bind video read only properties on instance, so that you can get info like buffered
	      videoReadOnlyProperties.forEach(function (key) {
	        _Object$defineProperty(_this, key, {
	          get: function get() {
	            return this.__dispatcher.dom.videoElement[key];
	          },

	          set: undefined,
	          configurable: false,
	          enumerable: false
	        });
	      });
	      // bind videoMethods like canplaytype on instance
	      videoMethods.forEach(function (key) {
	        _Object$defineProperty(_this, key, {
	          get: function get() {
	            var video = this.__dispatcher.dom.videoElement;
	            return bind_1(video[key], video);
	          },

	          set: undefined,
	          configurable: false,
	          enumerable: false
	        });
	      });
	      // bind video config properties on instance, so that you can just set src by this
	      var props = videoConfig._realDomAttr.concat(videoConfig._kernelProperty).reduce(function (props, key) {
	        props[key] = [accessor({
	          get: function get() {
	            // $FlowFixMe: support computed key here
	            return videoConfig[key];
	          },
	          set: function set(value) {
	            // $FlowFixMe: support computed key here
	            videoConfig[key] = value;
	            return value;
	          }
	        }), nonenumerable];
	        return props;
	      }, {});
	      applyDecorators(this, props, { self: true });
	      kernelMethods.forEach(function (key) {
	        _Object$defineProperty(_this, key, {
	          value: function value() {
	            var _this2 = this;

	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
	            }

	            return new _Promise(function (resolve) {
	              var _dispatcher$binder;

	              var id = _this2.__id;
	              _this2.__dispatcher.binder.once({
	                id: id,
	                name: '_' + key,
	                fn: resolve
	              });
	              (_dispatcher$binder = _this2.__dispatcher.binder)[/^(seek)$/.test(key) ? 'emitSync' : 'emit'].apply(_dispatcher$binder, [{
	                target: 'video',
	                name: key,
	                id: id
	              }].concat(_toConsumableArray(args)));
	            });
	          },

	          configurable: true,
	          enumerable: false,
	          writable: true
	        });
	      });
	      domMethods.forEach(function (key) {
	        if (key === 'fullscreen') return;
	        _Object$defineProperty(_this, key, {
	          value: function value() {
	            var _dispatcher$dom;

	            return (_dispatcher$dom = this.__dispatcher.dom)[key].apply(_dispatcher$dom, arguments);
	          },

	          configurable: true,
	          enumerable: false,
	          writable: true
	        });
	      });
	    }
	  }, {
	    key: '$watch',
	    value: function $watch(key, handler) {
	      var _this3 = this;

	      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	          deep = _ref.deep,
	          _ref$diff = _ref.diff,
	          diff = _ref$diff === undefined ? true : _ref$diff,
	          other = _ref.other,
	          _ref$proxy = _ref.proxy,
	          proxy = _ref$proxy === undefined ? false : _ref$proxy;

	      if (!isString(key) && !isArray_1(key)) throw new TypeError('$watch only accept string and Array<string> as key to find the target to spy on, but not ' + key + ', whose type is ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
	      var watching = true;
	      var watcher = function watcher() {
	        if (watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) bind_1(handler, this).apply(undefined, arguments);
	      };
	      var unwatcher = function unwatcher() {
	        watching = false;
	        var index = _this3.__unwatchHandlers.indexOf(unwatcher);
	        if (index > -1) _this3.__unwatchHandlers.splice(index, 1);
	      };
	      var keys = isString(key) ? key.split('.') : key;
	      var property = keys.pop();
	      var videoConfig = this.__dispatcher.videoConfig;
	      var target = keys.length === 0 && !other && videoConfig._realDomAttr.indexOf(property) > -1 ? videoConfig : ['isFullscreen', 'fullscreenElement'].indexOf(property) > -1 ? this.__dispatcher.dom : getDeepProperty(other || this, keys, { throwError: true });
	      applyDecorators(target, _defineProperty$1({}, property, watch(watcher, { deep: deep, diff: diff, proxy: proxy })), { self: true });
	      this.__unwatchHandlers.push(unwatcher);
	      return unwatcher;
	    }
	  }, {
	    key: '$set',
	    value: function $set(obj, property, value) {
	      if (!isObject$1(obj) && !isArray_1(obj)) throw new TypeError('$set only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
	      // $FlowFixMe: we have custom this function
	      if (!isFunction_1(obj.__set)) {
	        /* istanbul ignore else  */
	        Log.warn('chimee', _JSON$stringify(obj) + ' has not been deep watch. There is no need to use $set.');
	        // $FlowFixMe: we support computed string on array here
	        obj[property] = value;
	        return;
	      }
	      obj.__set(property, value);
	    }
	  }, {
	    key: '$del',
	    value: function $del(obj, property) {
	      if (!isObject$1(obj) && !isArray_1(obj)) throw new TypeError('$del only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
	      // $FlowFixMe: we have custom this function
	      if (!isFunction_1(obj.__del)) {
	        /* istanbul ignore else  */
	        Log.warn('chimee', _JSON$stringify(obj) + ' has not been deep watch. There is no need to use $del.');
	        // $FlowFixMe: we support computed string on array here
	        delete obj[property];
	        return;
	      }
	      obj.__del(property);
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      var _this4 = this;

	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return new _Promise(function (resolve) {
	        var _dispatcher$binder2;

	        _this4.__dispatcher.binder.once({
	          id: _this4.__id,
	          name: '_load',
	          target: 'plugin',
	          fn: resolve
	        });
	        (_dispatcher$binder2 = _this4.__dispatcher.binder).emit.apply(_dispatcher$binder2, [{
	          name: 'load',
	          target: 'plugin',
	          id: _this4.__id
	        }].concat(args));
	      });
	    }
	  }, {
	    key: '$silentLoad',
	    value: function $silentLoad() {
	      var _this5 = this;

	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return this.__dispatcher.binder.emit({
	        name: 'silentLoad',
	        target: 'video',
	        id: this.__id
	      }).then(function () {
	        var _dispatcher;

	        return (_dispatcher = _this5.__dispatcher).silentLoad.apply(_dispatcher, args);
	      }).then(function (result) {
	        _this5.__dispatcher.binder.trigger({
	          name: 'silentLoad',
	          target: 'video',
	          id: _this5.__id
	        }, result);
	      });
	    }

	    /**
	     * call fullscreen api on some specific element
	     * @param {boolean} flag true means fullscreen and means exit fullscreen
	     * @param {string} element the element you want to fullscreen, default it's container, you can choose from video | container | wrapper
	     */

	  }, {
	    key: '$fullscreen',
	    value: function $fullscreen() {
	      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

	      if (!this.__dispatcher.binder.emitSync({
	        name: 'fullscreen',
	        id: this.__id,
	        target: 'video-dom'
	      }, flag, element)) return false;
	      var result = this.__dispatcher.dom.fullscreen(flag, element);
	      this.__dispatcher.binder.triggerSync({
	        name: 'fullscreen',
	        id: this.__id,
	        target: 'video-dom'
	      }, flag, element);
	      return result;
	    }

	    /**
	     * emit an event
	     * @param  {string}    key event's name
	     * @param  {...args} args
	     */

	  }, {
	    key: '$emit',
	    value: function $emit(key) {
	      var _dispatcher$binder3;

	      var target = void 0;
	      if (isObject$1(key) && isString(key.name) && isString(key.target)) {
	        target = key.target;
	        key = key.name;
	      }
	      if (!isString(key)) throw new TypeError('emit key parameter must be String');
	      /* istanbul ignore else  */
	      if (domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
	        Log.warn('plugin', 'You are try to emit ' + key + ' event. As emit is wrapped in Promise. It make you can\'t use event.preventDefault and event.stopPropagation. So we advice you to use emitSync');
	      }

	      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }

	      return (_dispatcher$binder3 = this.__dispatcher.binder).emit.apply(_dispatcher$binder3, [{
	        name: key,
	        id: this.__id,
	        target: target
	      }].concat(_toConsumableArray(args)));
	    }

	    /**
	     * emit a sync event
	     * @param  {string}    key event's name
	     * @param  {...args} args
	     */

	  }, {
	    key: '$emitSync',
	    value: function $emitSync(key) {
	      var _dispatcher$binder4;

	      var target = void 0;
	      if (isObject$1(key) && isString(key.name) && isString(key.target)) {
	        target = key.target;
	        key = key.name;
	      }
	      if (!isString(key)) throw new TypeError('emitSync key parameter must be String');

	      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	        args[_key5 - 1] = arguments[_key5];
	      }

	      return (_dispatcher$binder4 = this.__dispatcher.binder).emitSync.apply(_dispatcher$binder4, [{
	        name: key,
	        id: this.__id,
	        target: target
	      }].concat(_toConsumableArray(args)));
	    }

	    /**
	     * bind event handler through this function
	     * @param  {string} key event's name
	     * @param  {Function} fn event's handler
	     */

	  }, {
	    key: '$on',
	    value: function $on(key, fn) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var eventInfo = _Object$assign({}, options, {
	        name: key,
	        id: this.__id,
	        fn: fn
	      });
	      this.__dispatcher.binder.on(eventInfo);
	      // set on __events as mark so that i can destroy it when i destroy
	      this.__addEvents(key, fn);
	    }
	    /**
	     * remove event handler through this function
	     * @param  {string} key event's name
	     * @param  {Function} fn event's handler
	     */

	  }, {
	    key: '$off',
	    value: function $off(key, fn) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var eventInfo = _Object$assign({}, options, {
	        name: key,
	        id: this.__id,
	        fn: fn
	      });
	      this.__dispatcher.binder.off(eventInfo);
	      this.__removeEvents(key, fn);
	    }
	    /**
	     * bind one time event handler
	     * @param {string} key event's name
	     * @param {Function} fn event's handler
	     */

	  }, {
	    key: '$once',
	    value: function $once(key, fn) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var self = this;
	      var boundFn = function boundFn() {
	        bind_1(fn, this).apply(undefined, arguments);
	        self.__removeEvents(key, boundFn);
	      };
	      self.__addEvents(key, boundFn);
	      var eventInfo = _Object$assign({}, options, {
	        name: key,
	        id: this.__id,
	        fn: boundFn
	      });
	      this.__dispatcher.binder.once(eventInfo);
	    }

	    /**
	     * set style
	     * @param {string} element optional, default to be video, you can choose from video | container | wrapper
	     * @param {string} attribute the atrribue name
	     * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
	     */

	  }, {
	    key: '$css',
	    value: function $css(method) {
	      var _dispatcher$dom2;

	      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	        args[_key6 - 1] = arguments[_key6];
	      }

	      return (_dispatcher$dom2 = this.__dispatcher.dom)[method + 'Style'].apply(_dispatcher$dom2, args);
	    }

	    /**
	     * set attr
	     * @param {string} element optional, default to be video, you can choose from video | container | wrapper
	     * @param {string} attribute the atrribue nameß
	     * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
	     */

	  }, {
	    key: '$attr',
	    value: function $attr(method) {
	      var _dispatcher$dom3;

	      for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
	        args[_key7 - 1] = arguments[_key7];
	      }

	      if (method === 'set' && /video/.test(args[0])) {
	        if (!this.__dispatcher.videoConfigReady) {
	          /* istanbul ignore else  */
	          Log.warn('chimee', this.__id + ' is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger');
	          return args[2];
	        }
	        if (this.__dispatcher.videoConfig._realDomAttr.indexOf(args[1]) > -1) {
	          var key = args[1],
	              val = args[2];

	          this.__dispatcher.videoConfig[key] = val;
	          return val;
	        }
	      }
	      return (_dispatcher$dom3 = this.__dispatcher.dom)[method + 'Attr'].apply(_dispatcher$dom3, args);
	    }
	  }, {
	    key: '__addEvents',
	    value: function __addEvents(key, fn) {
	      this.__events[key] = this.__events[key] || [];
	      this.__events[key].push(fn);
	    }
	  }, {
	    key: '__removeEvents',
	    value: function __removeEvents(key, fn) {
	      if (isEmpty(this.__events[key])) return;
	      var index = this.__events[key].indexOf(fn);
	      if (index < 0) return;
	      this.__events[key].splice(index, 1);
	      if (isEmpty(this.__events[key])) delete this.__events[key];
	    }
	  }, {
	    key: '__destroy',
	    value: function __destroy() {
	      var _this6 = this;

	      this.__unwatchHandlers.forEach(function (unwatcher) {
	        return unwatcher();
	      });
	      _Object$keys(this.__events).forEach(function (key) {
	        if (!isArray_1(_this6.__events[key])) return;
	        _this6.__events[key].forEach(function (fn) {
	          return _this6.$off(key, fn);
	        });
	      });
	      delete this.__events;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__dispatcher.kernel.currentTime;
	    },
	    set: function set(second) {
	      this.__dispatcher.binder.emitSync({
	        name: 'seek',
	        target: 'video',
	        id: this.__id
	      }, second);
	    }
	  }, {
	    key: '$plugins',
	    get: function get() {
	      return this.__dispatcher.plugins;
	    }
	  }, {
	    key: '$pluginOrder',
	    get: function get() {
	      return this.__dispatcher.order;
	    }
	  }, {
	    key: '$wrapper',
	    get: function get() {
	      return this.__dispatcher.dom.wrapper;
	    }
	  }, {
	    key: '$container',
	    get: function get() {
	      return this.__dispatcher.dom.container;
	    }
	  }, {
	    key: '$video',
	    get: function get() {
	      return this.__dispatcher.dom.videoElement;
	    }
	  }, {
	    key: 'isFullscreen',
	    get: function get() {
	      return this.__dispatcher.dom.isFullscreen;
	    }
	  }, {
	    key: 'fullscreenElement',
	    get: function get() {
	      return this.__dispatcher.dom.fullscreenElement;
	    }
	  }, {
	    key: 'container',
	    get: function get() {
	      return this.__dispatcher.containerConfig;
	    },
	    set: function set(config) {
	      if (!isObject$1(config)) {
	        throw new Error('The config of container must be Object, but not ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + '.');
	      }
	      merge_1(this.__dispatcher.containerConfig, config);
	      return this.__dispatcher.container;
	    }
	  }, {
	    key: 'videoRequireGuardedAttributes',
	    get: function get() {
	      return this.__dispatcher.dom.videoRequireGuardedAttributes;
	    }
	  }]);

	  return VideoWrapper;
	}(), (_applyDecoratedDescriptor$1(_class2.prototype, '$silentLoad', [_dec2$1], _Object$getOwnPropertyDescriptor(_class2.prototype, '$silentLoad'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$fullscreen', [_dec3, _dec4, _dec5], _Object$getOwnPropertyDescriptor(_class2.prototype, '$fullscreen'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$emit', [_dec6], _Object$getOwnPropertyDescriptor(_class2.prototype, '$emit'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$emitSync', [_dec7], _Object$getOwnPropertyDescriptor(_class2.prototype, '$emitSync'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$on', [_dec8, _dec9, _dec10], _Object$getOwnPropertyDescriptor(_class2.prototype, '$on'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$off', [_dec11, _dec12, _dec13], _Object$getOwnPropertyDescriptor(_class2.prototype, '$off'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$once', [_dec14, _dec15], _Object$getOwnPropertyDescriptor(_class2.prototype, '$once'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$css', [_dec16, _dec17], _Object$getOwnPropertyDescriptor(_class2.prototype, '$css'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$attr', [_dec18, _dec19], _Object$getOwnPropertyDescriptor(_class2.prototype, '$attr'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$plugins', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$plugins'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$pluginOrder', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$pluginOrder'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$wrapper', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$wrapper'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$container', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$container'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$video', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$video'), _class2.prototype)), _class2)) || _class$1);

	var _dec$2, _class$2;

	/**
	 * <pre>
	 * Plugin is the class for plugin developer.
	 * When we use a plugin, we will generate an instance of plugin.
	 * Developer can do most of things base on this plugin
	 * </pre>
	 */
	var Plugin = (_dec$2 = autobindClass(), _dec$2(_class$2 = function (_VideoWrapper) {
	  _inherits(Plugin, _VideoWrapper);

	  /**
	   * <pre>
	   * to create a plugin, we need three parameter
	   * 1. the config of a plugin
	   * 2. the dispatcher
	   * 3. this option for plugin to read
	   * this is the plugin base class, which you can get on Chimee
	   * You can just extends it and then install
	   * But in that way you must remember to pass the arguments to super()
	   * </pre>
	   * @param  {string}  PluginConfig.id        camelize from plugin's name or class name.
	   * @param  {string}  PluginConfig.name      plugin's name or class name
	   * @param  {Number}  PluginConfig.level     the level of z-index
	   * @param  {Boolean} PluginConfig.operable  to tell if the plugin can be operable, if not, we will add pointer-events: none on it.
	   * @param  {Function}  PluginConfig.create  the create function which we will called when plugin is used. sth like constructor in object style.
	   * @param  {Function}  PluginConfig.destroy   function to be called when we destroy a plugin
	   * @param  {Object}  PluginConfig.events    You can set some events handler in this object, we will bind it once you use the plugin.
	   * @param  {Object}  PluginConfig.data      dataset we will bind on data in object style
	   * @param  {Object<{get: Function, set: Function}}  PluginConfig.computed  dataset we will handle by getter and setter
	   * @param  {Object<Function>}  PluginConfig.methods   some function we will bind on plugin
	   * @param  {string|HTMLElment}  PluginConfig.el  can be string or HTMLElement, we will use this to create the dom for plugin
	   * @param  {boolean} PluginConfig.penetrate boolean to let us do we need to forward the dom events for this plugin.
	   * @param  {Dispatcher}  dispatcher referrence of dispatcher
	   * @param  {Object}  option  PluginOption that will pass to the plugin
	   * @return {Plugin}  plugin instance
	   */
	  function Plugin() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        id = _ref.id,
	        name = _ref.name,
	        _ref$level = _ref.level,
	        level = _ref$level === undefined ? 0 : _ref$level,
	        _ref$operable = _ref.operable,
	        operable = _ref$operable === undefined ? true : _ref$operable,
	        beforeCreate = _ref.beforeCreate,
	        create = _ref.create,
	        init = _ref.init,
	        inited = _ref.inited,
	        destroy = _ref.destroy,
	        _ref$events = _ref.events,
	        events = _ref$events === undefined ? {} : _ref$events,
	        _ref$data = _ref.data,
	        data = _ref$data === undefined ? {} : _ref$data,
	        _ref$computed = _ref.computed,
	        computed = _ref$computed === undefined ? {} : _ref$computed,
	        _ref$methods = _ref.methods,
	        methods = _ref$methods === undefined ? {} : _ref$methods,
	        el = _ref.el,
	        _ref$penetrate = _ref.penetrate,
	        penetrate = _ref$penetrate === undefined ? false : _ref$penetrate,
	        _ref$inner = _ref.inner,
	        inner = _ref$inner === undefined ? true : _ref$inner,
	        autoFocus = _ref.autoFocus,
	        className = _ref.className;

	    var dispatcher = arguments[1];
	    var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { name: name };

	    _classCallCheck(this, Plugin);

	    var _this = _possibleConstructorReturn(this, (Plugin.__proto__ || _Object$getPrototypeOf(Plugin)).call(this));

	    _this.destroyed = false;
	    _this.VERSION = '0.10.0-alpha.11';
	    _this.__operable = true;
	    _this.__level = 0;

	    if (isEmpty(dispatcher)) {
	      /* istanbul ignore else  */
	      Log.error('Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?');
	      throw new TypeError('lack of dispatcher');
	    }
	    if (!isString(id)) {
	      throw new TypeError('id of PluginConfig must be string');
	    }
	    _this.__id = id;
	    _this.__dispatcher = dispatcher;
	    _this.$videoConfig = _this.__dispatcher.videoConfig;
	    _this.__wrapAsVideo(_this.$videoConfig);
	    _this.beforeCreate = _this.beforeCreate || beforeCreate;
	    try {
	      isFunction_1(_this.beforeCreate) && _this.beforeCreate({
	        events: events,
	        data: data,
	        computed: computed,
	        methods: methods
	      }, option);
	    } catch (error) {
	      _this.$throwError(error);
	    }
	    // bind plugin methods into instance
	    if (!isEmpty(methods) && isObject$1(methods)) {
	      _Object$keys(methods).forEach(function (key) {
	        var fn = methods[key];
	        if (!isFunction_1(fn)) throw new TypeError('plugins methods must be Function');
	        _Object$defineProperty(_this, key, {
	          value: bind_1(fn, _this),
	          writable: true,
	          enumerable: false,
	          configurable: true
	        });
	      });
	    }
	    // hook plugin events on bus
	    if (!isEmpty(events) && isObject$1(events)) {
	      _Object$keys(events).forEach(function (key) {
	        if (!isFunction_1(events[key])) throw new TypeError('plugins events hook must bind with Function');
	        _this.$on(key, events[key]);
	      });
	    }
	    // bind data into plugin instance
	    if (!isEmpty(data) && isObject$1(data)) {
	      merge_1(_this, data);
	    }
	    // set the computed member by getter and setter
	    if (!isEmpty(computed) && isObject$1(computed)) {
	      var props = _Object$keys(computed).reduce(function (props, key) {
	        var val = computed[key];
	        if (isFunction_1(val)) {
	          props[key] = accessor({ get: val });
	          return props;
	        }
	        if (isObject$1(val) && (isFunction_1(val.get) || isFunction_1(val.set))) {
	          props[key] = accessor(val);
	          return props;
	        }
	        /* istanbul ignore else  */
	        Log.warn('Dispatcher.plugin', 'Wrong computed member \'' + key + '\' defination in Plugin ' + name);
	        return props;
	      }, {});
	      applyDecorators(_this, props, { self: true });
	    }
	    /**
	     * the create Function of plugin
	     * @type {Function}
	     */
	    _this.create = _this.create || create;
	    /**
	     * this init Function of plugin
	     * which will be called when we start to create the video player
	     * the plugin can handle some config here
	     * @type {Function}
	     */
	    _this.init = _this.init || init;
	    /**
	     * this inited Function of plugin
	     * which will be called when we have created the video player
	     * @type {Function}
	     */
	    _this.inited = _this.inited || inited;
	    /**
	     * the destroy Function of plugin
	     * @type {Function}
	     */
	    _this.destroy = _this.destroy || destroy;
	    /**
	     * the dom node of whole plugin
	     * @type {HTMLElement}
	     */
	    _this.$dom = _this.__dispatcher.dom.insertPlugin(_this.__id, el, { penetrate: penetrate, inner: inner, className: className });
	    _this.$autoFocus = isBoolean_1(autoFocus) ? autoFocus : inner;
	    // now we can frozen inner, autoFocus and penetrate
	    _this.$inner = inner;
	    _this.$penetrate = penetrate;
	    applyDecorators(_this, {
	      $inner: frozen,
	      $penetrate: frozen
	    }, { self: true });
	    /**
	     * to tell us if the plugin can be operable, can be dynamic change
	     * @type {boolean}
	     */
	    _this.$operable = isBoolean_1(option.operable) ? option.operable : operable;
	    _this.__level = isInteger_1(option.level) ? option.level : level;
	    /**
	     * pluginOption, so it's easy for plugin developer to check the config
	     * @type {Object}
	     */
	    _this.$config = option;
	    try {
	      isFunction_1(_this.create) && _this.create();
	    } catch (error) {
	      _this.$throwError(error);
	    }
	    return _this;
	  }
	  /**
	   * call for init lifecycle hook, which mainly handle the original config of video and kernel.
	   * @param {VideoConfig} videoConfig the original config of the videoElement or Kernel
	   */


	  _createClass(Plugin, [{
	    key: '__init',
	    value: function __init(videoConfig) {
	      try {
	        isFunction_1(this.init) && this.init(videoConfig);
	      } catch (error) {
	        this.$throwError(error);
	      }
	    }
	    /**
	     * call for inited lifecycle hook, which just to tell the plugin we have inited.
	     */

	  }, {
	    key: '__inited',
	    value: function __inited() {
	      var _this2 = this;

	      if (this.__dispatcher.binder.needToCheckPendingVideoDomEventPlugins[this.__id]) {
	        this.__dispatcher.binder.applyPendingEvents('video-dom');
	        this.__dispatcher.binder.needToCheckPendingVideoDomEventPlugins[this.__id] = false;
	      }
	      var result = void 0;
	      try {
	        result = isFunction_1(this.inited) && this.inited();
	      } catch (error) {
	        this.$throwError(error);
	      }
	      this.readySync = !isPromise(result);
	      this.ready = this.readySync ? _Promise.resolve(this)
	      // $FlowFixMe: it's promise now
	      : result.then(function () {
	        _this2.readySync = true;
	        return _this2;
	      }).catch(function (error) {
	        if (isError_1(error)) return _this2.$throwError(error);
	        return _Promise.reject(error);
	      });
	      return this.readySync ? this : this.ready;
	    }

	    /**
	     * set the plugin to be the top of all plugins
	     */

	  }, {
	    key: '$bumpToTop',
	    value: function $bumpToTop() {
	      var topLevel = this.__dispatcher._getTopLevel(this.$inner);
	      this.$level = topLevel + 1;
	    }
	  }, {
	    key: '$throwError',
	    value: function $throwError(error) {
	      this.__dispatcher.throwError(error);
	    }
	    /**
	     * officail destroy function for plugin
	     * we will call user destory function in this method
	     */

	  }, {
	    key: '$destroy',
	    value: function $destroy() {
	      if (this.destroyed) return;
	      isFunction_1(this.destroy) && this.destroy();
	      _get(Plugin.prototype.__proto__ || _Object$getPrototypeOf(Plugin.prototype), '__destroy', this).call(this);
	      this.__dispatcher.dom.removePlugin(this.__id);
	      delete this.__dispatcher;
	      delete this.$dom;
	      this.destroyed = true;
	    }
	    /**
	     * to tell us if the plugin can be operable, can be dynamic change
	     * @type {boolean}
	     */

	  }, {
	    key: '$operable',
	    set: function set(val) {
	      if (!isBoolean_1(val)) return;
	      this.$dom.style.pointerEvents = val ? 'auto' : 'none';
	      this.__operable = val;
	    },
	    get: function get$$1() {
	      return this.__operable;
	    }
	    /**
	     * the z-index level, higher when you set higher
	     * @type {boolean}
	     */

	  }, {
	    key: '$level',
	    set: function set(val) {
	      if (!isInteger_1(val)) return;
	      this.__level = val;
	      this.__dispatcher._sortZIndex();
	    },
	    get: function get$$1() {
	      return this.__level;
	    }
	  }, {
	    key: '$autoFocus',
	    get: function get$$1() {
	      return this.__autoFocus;
	    },
	    set: function set(val) {
	      this.__autoFocus = val;
	      this.__dispatcher.dom._autoFocusToVideo(this.$dom, !val);
	    }
	  }]);

	  return Plugin;
	}(VideoWrapper)) || _class$2);

	var VENDOR_PREFIXES = ['', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent'];

	var SYNONYMS = [['', ''], // empty
	['exit', 'cancel'], // firefox & old webkits expect cancelFullScreen instead of exitFullscreen
	['screen', 'Screen']];

	var DESKTOP_FULLSCREEN_STYLE = {
	  position: 'fixed',
	  zIndex: '2147483647',
	  left: 0,
	  top: 0,
	  right: 0,
	  bottom: 0,
	  overflow: 'hidden',
	  width: '100%',
	  height: '100%'
	};

	var FULLSCREEN_CHANGE = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

	var FULLSCREEN_ERROR = ['fullscreenerror', 'webkitfullscreenerror', 'mozfullscreenerror', 'MSFullscreenError'];

	var supportDocument = typeof document !== 'undefined';

	function setStyle$1(el, key, val) {
	  if (isObject$1(key)) {
	    for (var k in key) {
	      setStyle$1(el, k, key[k]);
	    }
	  } else {
	    // $FlowFixMe: we found it
	    el.style[key] = val;
	  }
	}

	function native(target, name) {
	  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  if (isObject$1(name)) {
	    option = name;
	  }
	  if (isString(target)) {
	    name = target;
	  }
	  var _option = option,
	      _option$keyOnly = _option.keyOnly,
	      keyOnly = _option$keyOnly === undefined ? false : _option$keyOnly;
	  /* istanbul ignore if */

	  if (!supportDocument) {
	    return keyOnly ? '' : undefined;
	  }
	  if (!isElement$1(target)) {
	    target = document;
	  }
	  if (!isString(name)) throw new Error('You must pass in a string as name, but not ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)) + '.');
	  for (var i = 0; i < SYNONYMS.length; i++) {
	    name = name.replace(SYNONYMS[i][0], SYNONYMS[i][1]);
	    for (var j = 0; j < VENDOR_PREFIXES.length; j++) {
	      var prefixed = j === 0 ? name : VENDOR_PREFIXES[j] + name.charAt(0).toUpperCase() + name.substr(1);
	      // $FlowFixMe: we support document computed property here
	      if (target[prefixed] !== undefined) return keyOnly ? prefixed : target[prefixed];
	    }
	  }
	  return keyOnly ? '' : undefined;
	}

	function dispatchEvent(element, name) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$bubbles = _ref.bubbles,
	      bubbles = _ref$bubbles === undefined ? true : _ref$bubbles,
	      _ref$cancelable = _ref.cancelable,
	      cancelable = _ref$cancelable === undefined ? true : _ref$cancelable;

	  var event = void 0;
	  /* istanbul ignore else  */
	  if (isFunction$1(Event)) {
	    event = new Event(name, {
	      bubbles: bubbles,
	      cancelable: cancelable
	    });
	  } else if (supportDocument && document.createEvent) {
	    event = document.createEvent('HTMLEvents');
	    event.initEvent(name, true, true);
	  } else if (supportDocument && document.createEventObject) {
	    // $FlowFixMe: IE < 9
	    event = document.createEventObject();
	    event.eventType = name;
	    event.eventName = name;
	  }
	  /* istanbul ignore next  */
	  if (!isObject$1(event) && !isEvent(event)) throw new Error("We can't create an object on this browser, please report to author");
	  /* istanbul ignore else  */
	  if (element.dispatchEvent) {
	    element.dispatchEvent(event);
	    // $FlowFixMe: IE < 9
	  } else if (element.fireEvent) {
	    // $FlowFixMe: IE < 9
	    element.fireEvent('on' + event.eventType, event); // can trigger only real event (e.g. 'click')
	    // $FlowFixMe: support computed key
	  } else if (element[name]) {
	    // $FlowFixMe: support computed key
	    element[name]();
	    // $FlowFixMe: support computed key
	  } else if (element['on' + name]) {
	    // $FlowFixMe: support computed key
	    element['on' + name]();
	  }
	}

	var _dec$3, _dec2$2, _dec3$1, _dec4$1, _dec5$1, _class$3, _class2$1;

	function _applyDecoratedDescriptor$2(target, property, decorators, descriptor, context) {
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
	var fullscreenEnabled = native('fullscreenEnabled');
	var useStyleFirst = false;

	var ESFullScreen = (_dec$3 = autobindClass(), _dec2$2 = alias('requestFullscreen'), _dec3$1 = alias('exitFullscreen'), _dec4$1 = alias('addEventListener'), _dec5$1 = alias('removeEventListener'), _dec$3(_class$3 = (_class2$1 = function () {
	  function ESFullScreen() {
	    _classCallCheck(this, ESFullScreen);

	    this._fullscreenElement = null;
	    this.isNativelySupport = defined(native('fullscreenElement')) && (!defined(fullscreenEnabled) || fullscreenEnabled === true);
	    this._openKey = supportDocument ? native(document.body || document.documentElement, 'requestFullscreen', { keyOnly: true }) : '';
	    this._exitKey = native('exitFullscreen', { keyOnly: true });
	    this._useStyleFirst = false;
	    this.hasUsedStyle = false;
	  }

	  _createClass(ESFullScreen, [{
	    key: 'open',
	    value: function open(element) {
	      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          _ref$force = _ref.force,
	          force = _ref$force === undefined ? false : _ref$force;

	      /* istanbul ignore else  */
	      {
	        if (!isElement$1(element)) throw new Error('You should passed in a legal element to requestFullScreen, but not ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '.');
	        if (!isPosterityNode(document, element)) throw new Error('You must pass in a HTML element in document.');
	      }
	      var originElement = this.fullscreenElement;
	      if (originElement && originElement !== element) {
	        if (!force) {
	          dispatchEvent(document, 'fullscreenerror');
	          return false;
	        }
	        this.exit();
	      }

	      if (!this.useStyleFirst) {
	        if (this.isNativelySupport) {
	          // $FlowFixMe: support computed key on HTMLElment here
	          isFunction$1(element[this._openKey]) && element[this._openKey]();
	          return true;
	        }

	        // add wekitEnterFullscreen support as required in https://github.com/toxic-johann/es-fullscreen/issues/4
	        /* istanbul ignore if  */
	        if (element instanceof HTMLVideoElement && element.webkitSupportsFullscreen &&
	        // $FlowFixMe: support webkitEnterFullscreen on some werid safari
	        isFunction$1(element.webkitEnterFullscreen)) {
	          element.webkitEnterFullscreen();
	          this._fullscreenElement = element;
	          return true;
	        }
	      }

	      this._savedStyles = _Object$keys(DESKTOP_FULLSCREEN_STYLE).reduce(function (styles, key) {
	        // $FlowFixMe: support string here
	        styles[key] = element.style[key];
	        return styles;
	      }, {});
	      setStyle$1(element, DESKTOP_FULLSCREEN_STYLE);

	      /* istanbul ignore else  */
	      if (document.body) {
	        this._bodyOverflow = document.body.style.overflow;
	        document.body.style.overflow = 'hidden';
	      }
	      /* istanbul ignore else  */
	      if (document.documentElement) {
	        this._htmlOverflow = document.documentElement.style.overflow;
	        document.documentElement.style.overflow = 'hidden';
	      }
	      this._fullscreenElement = element;
	      this.hasUsedStyle = true;
	      dispatchEvent(element, 'fullscreenchange');
	      return true;
	    }
	  }, {
	    key: 'exit',
	    value: function exit() {
	      if (!this.isFullscreen) return false;
	      if (this.isNativelySupport && !this.useStyleFirst && !this.hasUsedStyle) {
	        // $FlowFixMe: support document computed key here
	        document[this._exitKey]();
	        return true;
	      }
	      // $FlowFixMe: element is an Elment here
	      var element = this._fullscreenElement;
	      setStyle$1(element, this._savedStyles);
	      /* istanbul ignore else  */
	      if (document.body) document.body.style.overflow = this._bodyOverflow;
	      /* istanbul ignore else  */
	      if (document.documentElement) document.documentElement.style.overflow = this._htmlOverflow;

	      this._fullscreenElement = null;
	      this._savedStyles = {};
	      dispatchEvent(element, 'fullscreenchange');
	      return true;
	    }
	  }, {
	    key: 'on',
	    value: function on(name, fn) {
	      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

	      this._handleEvent(element, 'addEventListener', name, fn);
	    }
	  }, {
	    key: 'off',
	    value: function off(name, fn) {
	      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

	      this._handleEvent(element, 'removeEventListener', name, fn);
	    }
	  }, {
	    key: '_handleEvent',
	    value: function _handleEvent(element, behavior, name, fn) {
	      /* istanbul ignore else  */
	      {
	        if (name !== 'fullscreenchange' && name !== 'fullscreenerror' && name !== 'esfullscreenmethodchange') throw new Error(this.constructor.name + ' only handle "fullscreenchange", "fullscreenerror" and "esfullscreenmethodchange" event, but not ' + name + '. Pleas pass in an right event name.');
	        if (!isFunction$1(fn)) throw new Error('You must pass in an legal function, but not ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) + '.');
	        if (!isElement$1(element) && element !== document) throw new Error('You should passed in a legal element, but not ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '.');
	      }
	      var names = name === 'fullscreenchange' ? FULLSCREEN_CHANGE : name === 'fullscreenerror' ? FULLSCREEN_ERROR : [name];
	      names.forEach(function (name) {
	        // $FlowFixMe: support computed attribute here
	        element[behavior](name, fn);
	      });
	    }
	  }, {
	    key: 'useStyleFirst',
	    get: function get() {
	      return useStyleFirst;
	    },
	    set: function set(value) {
	      value = !!value;
	      if (value === useStyleFirst) return value;
	      useStyleFirst = value;
	      dispatchEvent(document, 'esfullscreenmethodchange');
	      return value;
	    }
	  }, {
	    key: 'fullscreenElement',
	    get: function get() {
	      var element = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'].reduce(function (element, key) {
	        // $FlowFixMe: support computed element on document
	        return element || document[key];
	      }, null);
	      return element || this._fullscreenElement;
	    }
	  }, {
	    key: 'isFullscreen',
	    get: function get() {
	      return isElement$1(this.fullscreenElement);
	    }
	  }]);

	  return ESFullScreen;
	}(), _applyDecoratedDescriptor$2(_class2$1.prototype, 'open', [_dec2$2], _Object$getOwnPropertyDescriptor(_class2$1.prototype, 'open'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, 'exit', [_dec3$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, 'exit'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, 'on', [_dec4$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, 'on'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, 'off', [_dec5$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, 'off'), _class2$1.prototype), _class2$1)) || _class$3);

	var index = new ESFullScreen();

	var _dec$4, _dec2$3, _dec3$2, _dec4$2, _dec5$2, _dec6$1, _class$4;

	function _applyDecoratedDescriptor$3(target, property, decorators, descriptor, context) {
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
	function targetCheck(target) {
	  if (target === 'video') target = 'videoElement';
	  if (!isElement_1(this[target])) throw new TypeError('Your target "' + target + '" is not a legal HTMLElement');

	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return [target].concat(args);
	}
	function attrOperationCheck(target, attr, val) {
	  if (!isString(attr)) throw new TypeError('to handle dom\'s attribute or style, your attr parameter must be string, but not ' + attr + ' in ' + (typeof attr === 'undefined' ? 'undefined' : _typeof(attr)));
	  if (!isString(target)) throw new TypeError('to handle dom\'s attribute or style, your target parameter must be string, , but not ' + target + ' in ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)));
	  return [target, attr, val];
	}
	/**
	 * <pre>
	 * Dom work for Dispatcher.
	 * It take charge of dom management of Dispatcher.
	 * </pre>
	 */
	var Dom = (_dec$4 = waituntil('__dispatcher.videoConfigReady'), _dec2$3 = before(attrOperationCheck, targetCheck), _dec3$2 = before(attrOperationCheck, targetCheck), _dec4$2 = before(attrOperationCheck, targetCheck), _dec5$2 = before(attrOperationCheck, targetCheck), _dec6$1 = before(targetCheck), (_class$4 = function () {
	  _createClass(Dom, [{
	    key: 'mouseInVideo',

	    /**
	     * to mark is the mouse in the video area
	     */

	    /**
	     * all plugin's dom element set
	     */
	    get: function get() {
	      return this.__mouseInVideo;
	    }
	    /**
	     * the html to restore when we are destroyed
	     */
	    ,
	    set: function set(val) {
	      this.__mouseInVideo = !!val;
	    }
	    /**
	     * collection of video extension nodes
	     * some nodes can be regarded as part of video (such as penetrate element)
	     * so we store them here
	     */

	  }, {
	    key: 'videoExtendedNodes',
	    get: function get() {
	      return this.__videoExtendedNodes;
	    }
	  }]);

	  function Dom(config, dispatcher) {
	    _classCallCheck(this, Dom);

	    this.plugins = {};
	    this.originHTML = '';
	    this.__mouseInVideo = false;
	    this.destroyed = false;
	    this.__videoExtendedNodes = [];
	    this.isFullscreen = false;
	    this.fullscreenElement = undefined;

	    var _ref = config || {},
	        wrapper = _ref.wrapper;

	    this.__dispatcher = dispatcher;
	    if (!isElement_1(wrapper) && !isString(wrapper)) throw new TypeError('Wrapper can only be string or HTMLElement, but not ' + (typeof wrapper === 'undefined' ? 'undefined' : _typeof(wrapper)));
	    var $wrapper = $(wrapper);
	    // TODO: we have to decalre length for wrapper
	    // $FlowFixMe: we have to decalre length here
	    if ($wrapper.length === 0) {
	      throw new TypeError('Can not get dom node accroding wrapper. Please check your wrapper');
	    }
	    /**
	     * the referrence of the dom wrapper of whole Chimee
	     */
	    // $FlowFixMe: support computed key on nodewrap
	    this.wrapper = $wrapper[0];
	    this.originHTML = this.wrapper.innerHTML;
	    // if we find video element inside wrapper
	    // we use it
	    // or we create a video element by ourself.
	    // $FlowFixMe: support computed key on nodewrap
	    var videoElement = $wrapper.find('video')[0];
	    if (!videoElement) {
	      videoElement = document.createElement('video');
	    }
	    /**
	     * referrence of video's dom element
	     */
	    this.installVideo(videoElement);
	    this._fullscreenMonitor();
	    index.on('fullscreenchange', this._fullscreenMonitor);
	    // As some video attributes will missed when we switch kernel
	    // we set a guarder for it
	    // and we must make sure style be guarded
	    var videoRequiredGuardedAttributes = isArray_1(config.videoRequiredGuardedAttributes) ? config.videoRequiredGuardedAttributes : [];
	    if (videoRequiredGuardedAttributes.indexOf('style') < 0) {
	      videoRequiredGuardedAttributes.unshift('style');
	    }
	    this.videoRequireGuardedAttributes = videoRequiredGuardedAttributes;
	  }

	  _createClass(Dom, [{
	    key: 'installVideo',
	    value: function installVideo(videoElement) {
	      this.__videoExtendedNodes.push(videoElement);
	      setAttr(videoElement, 'tabindex', -1);
	      this._autoFocusToVideo(videoElement);
	      if (!isElement_1(this.container)) {
	        // create container
	        if (videoElement.parentElement && isElement_1(videoElement.parentElement) && videoElement.parentElement !== this.wrapper) {
	          this.container = videoElement.parentElement;
	        } else {
	          this.container = document.createElement('container');
	          $(this.container).append(videoElement);
	        }
	      } else {
	        var container = this.container;
	        if (container.childNodes.length === 0) {
	          container.appendChild(videoElement);
	        } else {
	          container.insertBefore(videoElement, container.childNodes[0]);
	        }
	      }
	      // check container.position
	      if (this.container.parentElement !== this.wrapper) {
	        $(this.wrapper).append(this.container);
	      }
	      this.videoElement = videoElement;
	      return videoElement;
	    }
	  }, {
	    key: 'removeVideo',
	    value: function removeVideo() {
	      var videoElement = this.videoElement;
	      this._autoFocusToVideo(this.videoElement, false);
	      // when we destroy the chimee
	      // binder is destroyed before dom
	      // so we need to make a check here
	      this.__dispatcher.binder && this.__dispatcher.binder.bindEventOnVideo(videoElement, true);
	      $(videoElement).remove();
	      delete this.videoElement;
	      return videoElement;
	    }

	    /**
	     * each plugin has its own dom node, this function will create one or them.
	     * we support multiple kind of el
	     * 1. Element, we will append this dom node on wrapper straight
	     * 2. HTMLString, we will create dom based on this HTMLString and append it on wrapper
	     * 3. string, we will transfer this string into hypen string, then we create a custom elment called by this and bind it on wrapper
	     * 4. nothing, we will create a div and bind it on the wrapper
	     */

	  }, {
	    key: 'insertPlugin',
	    value: function insertPlugin(id, el) {
	      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      if (!isString(id)) throw new TypeError('insertPlugin id parameter must be string');
	      if (isElement_1(this.plugins[id])) {
	        /* istanbul ignore else  */
	        Log.warn('Dispatcher.dom', 'Plugin ' + id + ' have already had a dom node. Now it will be replaced');
	        this.removePlugin(id);
	      }
	      if (isString(el)) {
	        if (isHTMLString(el)) {
	          var outer = document.createElement('div');
	          outer.innerHTML = el;
	          el = outer.children[0];
	        } else {
	          el = document.createElement(kebabCase_1(el));
	        }
	      } else if (isObject$1(el)) {
	        // $FlowFixMe: we have check el's type here and make sure it's an object
	        option = el;
	      }
	      var _option = option,
	          inner = _option.inner,
	          penetrate = _option.penetrate;
	      var _option2 = option,
	          className = _option2.className;

	      var node = el && isElement_1(el) ? el : document.createElement('div');
	      if (isArray_1(className)) {
	        className = className.join(' ');
	      }
	      if (isString(className)) {
	        addClassName(node, className);
	      }
	      this.plugins[id] = node;
	      var outerElement = inner ? this.container : this.wrapper;
	      var originElement = inner ? this.videoElement : this.container;
	      // auto forward the event if this plugin can be penetrate
	      if (penetrate) {
	        this.__dispatcher.binder.bindEventOnPenetrateNode(node);
	        this.__videoExtendedNodes.push(node);
	      }
	      if (outerElement.lastChild === originElement) {
	        outerElement.appendChild(node);
	        return node;
	      }
	      outerElement.insertBefore(node, originElement.nextSibling);
	      return node;
	    }

	    /**
	     * remove plugin's dom
	     */

	  }, {
	    key: 'removePlugin',
	    value: function removePlugin(id) {
	      if (!isString(id)) return;
	      var dom = this.plugins[id];
	      if (isElement_1(dom)) {
	        dom.parentNode && dom.parentNode.removeChild(dom);
	        this._autoFocusToVideo(dom, true);
	      }

	      var _ref2 = Dispatcher.getPluginConfig(id) || {},
	          _ref2$penetrate = _ref2.penetrate,
	          penetrate = _ref2$penetrate === undefined ? false : _ref2$penetrate;

	      if (penetrate) this.__dispatcher.binder.bindEventOnPenetrateNode(dom, true);
	      delete this.plugins[id];
	    }

	    /**
	     * Set zIndex for a plugins list
	     */

	  }, {
	    key: 'setPluginsZIndex',
	    value: function setPluginsZIndex(plugins) {
	      var _this = this;

	      // $FlowFixMe: there are videoElment and container here
	      plugins.forEach(function (key, index$$1) {
	        return setStyle(key.match(/^(videoElement|container)$/) ? _this[key] : _this.plugins[key], 'z-index', ++index$$1);
	      });
	    }

	    /**
	     * set attribute on our dom
	     * @param {string} attr attribute's name
	     * @param {anything} val attribute's value
	     * @param {string} target the HTMLElemnt string name, only support video/wrapper/container now
	     */

	  }, {
	    key: 'setAttr',
	    value: function setAttr$$1(target, attr, val) {
	      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
	      setAttr(this[target], attr, val);
	    }
	  }, {
	    key: 'getAttr',
	    value: function getAttr$$1(target, attr) {
	      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
	      return getAttr(this[target], attr);
	    }
	  }, {
	    key: 'setStyle',
	    value: function setStyle$$1(target, attr, val) {
	      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
	      setStyle(this[target], attr, val);
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle$$1(target, attr) {
	      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
	      return getStyle(this[target], attr);
	    }
	  }, {
	    key: 'requestFullscreen',
	    value: function requestFullscreen(target) {
	      // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
	      return index.open(this[target]);
	    }
	  }, {
	    key: 'exitFullscreen',
	    value: function exitFullscreen() {
	      return index.exit();
	    }
	  }, {
	    key: 'fullscreen',
	    value: function fullscreen() {
	      var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      return request ? this.requestFullscreen.apply(this, [target].concat(_toConsumableArray(args))) : this.exitFullscreen.apply(this, _toConsumableArray(args));
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      this.videoElement.focus();
	    }
	  }, {
	    key: 'isNodeInsideVideo',
	    value: function isNodeInsideVideo(node) {
	      return this.__videoExtendedNodes.indexOf(node) > -1 || this.__videoExtendedNodes.reduce(function (flag, video) {
	        if (flag) return flag;
	        return isPosterityNode(video, node);
	      }, false);
	    }
	  }, {
	    key: 'migrateVideoRequiredGuardedAttributes',
	    value: function migrateVideoRequiredGuardedAttributes(video) {
	      var _this2 = this;

	      var guardedAttributesAndValue = this.videoRequireGuardedAttributes.map(function (attr) {
	        return [attr, getAttr(_this2.videoElement, attr)];
	      });
	      guardedAttributesAndValue.forEach(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2),
	            attr = _ref4[0],
	            value = _ref4[1];

	        return setAttr(video, attr, value);
	      });
	    }

	    /**
	     * function called when we distory
	     */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.removeVideo();
	      index.off('fullscreenchange', this._fullscreenMonitor);
	      this.wrapper.innerHTML = this.originHTML;
	      delete this.wrapper;
	      delete this.plugins;
	      this.destroyed = true;
	    }
	  }, {
	    key: '_autoFocusToVideo',
	    value: function _autoFocusToVideo(element) {
	      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      /* istanbule ignore next */
	      if (!isElement_1(element)) return;
	      (remove ? removeEvent : addEvent)(element, 'mouseup', this._focusToVideo, false, true);
	      (remove ? removeEvent : addEvent)(element, 'touchend', this._focusToVideo, false, true);
	    }
	  }, {
	    key: '_focusToVideo',
	    value: function _focusToVideo() {
	      var x = window.scrollX;
	      var y = window.scrollY;
	      isFunction_1(this.videoElement.focus) && this.videoElement.focus();
	      window.scrollTo(x, y);
	    }
	  }, {
	    key: '_fullscreenMonitor',
	    value: function _fullscreenMonitor(evt) {
	      var element = index.fullscreenElement;
	      var original = this.isFullscreen;
	      if (!element || !isPosterityNode(this.wrapper, element) && element !== this.wrapper) {
	        this.isFullscreen = false;
	        this.fullscreenElement = undefined;
	      } else {
	        this.isFullscreen = true;
	        this.fullscreenElement = this.wrapper === element ? 'wrapper' : this.container === element ? 'container' : this.videoElement === element ? 'video' : element;
	      }
	      if (isEvent(evt) && original !== this.isFullscreen) {
	        this.__dispatcher.binder.triggerSync({
	          name: 'fullscreenchange',
	          target: 'esFullscreen',
	          id: 'dispatcher'
	        }, evt);
	      }
	    }
	  }]);

	  return Dom;
	}(), (_applyDecoratedDescriptor$3(_class$4.prototype, 'setAttr', [_dec$4, _dec2$3], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'setAttr'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'getAttr', [_dec3$2], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'getAttr'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'setStyle', [_dec4$2], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'setStyle'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'getStyle', [_dec5$2], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'getStyle'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'requestFullscreen', [_dec6$1], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'requestFullscreen'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, '_focusToVideo', [autobind], _Object$getOwnPropertyDescriptor(_class$4.prototype, '_focusToVideo'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, '_fullscreenMonitor', [autobind], _Object$getOwnPropertyDescriptor(_class$4.prototype, '_fullscreenMonitor'), _class$4.prototype)), _class$4));

	var defaultContainerConfig = {
	  width: '100%',
	  height: '100%',
	  position: 'relative',
	  display: 'block'
	};

	// base css controller for container and wrapper

	var Vessel = function Vessel(dispatcher, target, config) {
	  var _this = this;

	  _classCallCheck(this, Vessel);

	  this.__dispatcher = dispatcher;
	  this.__target = target;
	  ['width', 'height', 'position', 'display'].forEach(function (key) {
	    _Object$defineProperty(_this, key, {
	      get: function get() {
	        return this.__dispatcher.dom.getStyle(this.__target, key);
	      },
	      set: function set(value) {
	        if (isNumber_1(value)) {
	          value = value + 'px';
	        }
	        if (!isString(value)) {
	          throw new Error('The value of ' + key + ' in ' + this.__target + 'Config must be string, but not ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '.');
	        }
	        this.__dispatcher.dom.setStyle(this.__target, key, value);
	        // return value;
	      },

	      configurable: true,
	      enumerable: true
	    });
	  });
	  merge_1(this, config);
	};

	var dP$3 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$3(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, _collectionStrong, true);

	var _arrayFromIterable = function (iter, ITERATOR) {
	  var result = [];
	  _forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	var _collectionToJson = function (NAME) {
	  return function toJSON() {
	    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return _arrayFromIterable(this);
	  };
	};

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	_setCollectionOf('Map');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	_setCollectionFrom('Map');

	var map = _core.Map;

	var map$1 = createCommonjsModule(function (module) {
	module.exports = { "default": map, __esModule: true };
	});

	var _Map$1 = unwrapExports(map$1);

	var _dec$5, _dec2$4, _dec3$3, _dec4$3, _class$5;

	function _applyDecoratedDescriptor$4(target, property, decorators, descriptor, context) {
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
	var secondaryReg = /^(before|after|_)/;
	function secondaryChecker(key) {
	  if (key.match(secondaryReg)) {
	    /* istanbul ignore else  */
	    Log.warn('bus', 'Secondary Event "' + key + '" could not be call straightly by API.');
	    return false;
	  }
	  return true;
	}
	/**
	 * <pre>
	 * event Bus class. Bus take charge of commuication between plugins and user.
	 * Some of the event may trigger the kernel to do some task.
	 * An event will run in four lifecycle
	 * before -> processor -> main -> after -> side effect(_)
	 * -------------------- emit period ----------------
	 * before: once an event emit, it will run through plugins in bubble to know is it possible to run.
	 * processor: if sth need to be done on kernel. It will tell kernel. If kernel will trigger event later, it will break down here. Else will run into trigger period
	 * -------------------- trigger period -----------------
	 * main: this procedure will trigger the main event in bubble, which means it can be stop in one plugin.
	 * after: once event run through all events. It will trigger after event. This event will be trigger in broadcast way.
	 * side effect(_): This events will always trigger once we bump into trigger period. So that you can know if the events been blocked. But it's not advice to listen on this effect.
	 * </pre>
	 */
	var Bus = (_dec$5 = runnable(secondaryChecker), _dec2$4 = runnable(secondaryChecker, {
	  backup: function backup() {
	    return false;
	  }
	}), _dec3$3 = runnable(secondaryChecker), _dec4$3 = runnable(secondaryChecker, {
	  backup: function backup() {
	    return false;
	  }
	}), (_class$5 = function () {
	  /**
	   * @param {Dispatcheer} dispatcher bus rely on dispatcher, so you mush pass dispatcher at first when you generate Bus.
	   * @return {Bus}
	   */

	  /**
	   * the handler set of all events
	   * @type {Object}
	   * @member events
	   */
	  function Bus(dispatcher, kind) {
	    _classCallCheck(this, Bus);

	    this.events = {};
	    this.onceMap = {};

	    /**
	     * the referrence to dispatcher
	     * @type {Dispatcher}
	     */
	    this.__dispatcher = dispatcher;
	    this.__kind = kind;
	  }
	  /**
	   * [Can only be called in dispatcher]bind event on bus.
	   */


	  _createClass(Bus, [{
	    key: 'on',
	    value: function on(id, eventName, fn, stage) {
	      this._addEvent([eventName, stage, id], fn);
	    }
	    /**
	     * [Can only be called in dispatcher]remove event off bus. Only suggest one by one.
	     */

	  }, {
	    key: 'off',
	    value: function off(id, eventName, fn, stage) {
	      var keys = [eventName, stage, id];
	      var deleted = this._removeEvent(keys, fn);
	      if (deleted) return;
	      var handler = this._getHandlerFromOnceMap(keys, fn);
	      if (isFunction_1(handler)) {
	        this._removeEvent(keys, handler) && this._removeFromOnceMap(keys, fn, handler);
	      }
	    }
	    /**
	     * [Can only be called in dispatcher]bind event on bus and remove it once event is triggered.
	     */

	  }, {
	    key: 'once',
	    value: function once(id, eventName, fn, stage) {
	      var bus = this;
	      var keys = [eventName, stage, id];
	      var handler = function handler() {
	        // keep the this so that it can run
	        bind_1(fn, this).apply(undefined, arguments);
	        bus._removeEvent(keys, handler);
	        bus._removeFromOnceMap(keys, fn, handler);
	      };
	      this._addEvent(keys, handler);
	      this._addToOnceMap(keys, fn, handler);
	    }
	    /**
	     * [Can only be called in dispatcher]emit an event, which will run before -> processor period.
	     * It may stop in before period.
	     * @param  {string}    key event's name
	     * @param  {anything} args other argument will be passed into handler
	     * @return {Promise}  this promise maybe useful if the event would not trigger kernel event. In that will you can know if it runs successful. But you can know if the event been stopped by the promise.
	     */

	  }, {
	    key: 'emit',
	    value: function emit(key) {
	      var _this = this;

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var event = this.events[key];
	      if (isEmpty(event)) {
	        if (selfProcessorEvents.indexOf(key) > -1) return _Promise.resolve();
	        // $FlowFixMe: conditional return here
	        return this._eventProcessor.apply(this, [key, { sync: false }].concat(_toConsumableArray(args)));
	      }
	      var beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
	      return runRejectableQueue.apply(undefined, [beforeQueue].concat(_toConsumableArray(args))).then(function () {
	        if (selfProcessorEvents.indexOf(key) > -1) return;
	        return _this._eventProcessor.apply(_this, [key, { sync: false }].concat(_toConsumableArray(args)));
	      }).catch(function (error) {
	        if (isError_1(error)) _this.__dispatcher.throwError(error);
	        return _Promise.reject(error);
	      });
	    }
	    /**
	     * [Can only be called in dispatcher]emit an event, which will run before -> processor period synchronize.
	     * It may stop in before period.
	     * @param  {string}    key event's name
	     * @param  {anything} args other argument will be passed into handler
	     * @return {Promise}  this promise maybe useful if the event would not trigger kernel event. In that will you can know if it runs successful. But you can know if the event been stopped by the promise.
	     */

	  }, {
	    key: 'emitSync',
	    value: function emitSync(key) {
	      var event = this.events[key];

	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      if (isEmpty(event)) {
	        if (selfProcessorEvents.indexOf(key) > -1) return true;
	        // $FlowFixMe: conditional return here
	        return this._eventProcessor.apply(this, [key, { sync: true }].concat(_toConsumableArray(args)));
	      }
	      var beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
	      return runStoppableQueue.apply(undefined, [beforeQueue].concat(_toConsumableArray(args))) && (selfProcessorEvents.indexOf(key) > -1 ||
	      // $FlowFixMe: conditional return here
	      this._eventProcessor.apply(this, [key, { sync: true }].concat(_toConsumableArray(args))));
	    }
	    /**
	     * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period
	     * @param  {string}    key event's name
	     * @param  {anything} args
	     * @return {Promise|undefined}    you can know if event trigger finished~ However, if it's unlegal
	     */

	  }, {
	    key: 'trigger',
	    value: function trigger(key) {
	      var _this2 = this;

	      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	      }

	      var event = this.events[key];
	      if (isEmpty(event)) {
	        return _Promise.resolve(true);
	      }
	      var mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
	      return runRejectableQueue.apply(undefined, [mainQueue].concat(_toConsumableArray(args))).then(function () {
	        var afterQueue = _this2._getEventQueue(event.after, _this2.__dispatcher.order);
	        return runRejectableQueue.apply(undefined, [afterQueue].concat(_toConsumableArray(args)));
	      }).then(function () {
	        return _this2._runSideEffectEvent.apply(_this2, [key, _this2.__dispatcher.order].concat(_toConsumableArray(args)));
	      }).catch(function (error) {
	        if (isError_1(error)) _this2.__dispatcher.throwError(error);
	        return _this2._runSideEffectEvent.apply(_this2, [key, _this2.__dispatcher.order].concat(_toConsumableArray(args)));
	      });
	    }
	    /**
	     * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period in synchronize
	     * @param  {string}    key event's name
	     * @param  {anything} args
	     * @return {boolean}    you can know if event trigger finished~ However, if it's unlegal
	     */

	  }, {
	    key: 'triggerSync',
	    value: function triggerSync(key) {
	      var event = this.events[key];
	      if (isEmpty(event)) {
	        return true;
	      }
	      var mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
	      var afterQueue = this._getEventQueue(event.after, this.__dispatcher.order);

	      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }

	      var result = runStoppableQueue.apply(undefined, [mainQueue].concat(_toConsumableArray(args))) && runStoppableQueue.apply(undefined, [afterQueue].concat(_toConsumableArray(args)));
	      this._runSideEffectEvent.apply(this, [key, this.__dispatcher.order].concat(_toConsumableArray(args)));
	      return result;
	    }
	    /**
	     * destroy hook which will be called when object destroy
	     */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      delete this.events;
	      delete this.__dispatcher;
	    }
	    /**
	     * add event into bus
	     * @private
	     * @param {Array} keys keys map pointing to position to put event handler
	     * @param {function} fn handler to put
	     */

	  }, {
	    key: '_addEvent',
	    value: function _addEvent(keys, fn) {
	      keys = clone_1(keys);
	      var id = keys.pop();
	      var target = keys.reduce(function (target, key) {
	        target[key] = target[key] || {};
	        return target[key];
	      }, this.events);
	      // events will store like {play: {main: {plugin: []}}}
	      target[id] = target[id] || [];
	      target[id].push(fn);
	    }
	    /**
	     * remove event from bus
	     * @private
	     * @param {Array} keys keys map pointing to position to get event handler
	     * @param {function} fn handler to put
	     */

	  }, {
	    key: '_removeEvent',
	    value: function _removeEvent(keys, fn) {
	      keys = clone_1(keys);
	      var id = keys.pop();
	      var target = this.events;
	      var backtrackList = [];
	      for (var i = 0, len = keys.length; i < len; i++) {
	        var son = target[keys[i]];
	        // if we can't find the event binder, just return
	        if (isEmpty(son)) return;
	        backtrackList.push([target, keys[i]]);
	        target = son;
	      }
	      var queue = target[id] || [];
	      var index = queue.indexOf(fn);
	      var hasFn = index > -1;
	      // if we found handler remove it
	      if (hasFn) {
	        queue.splice(index, 1);
	      }
	      // if this plugin has no event binding, we remove this event session, which make us perform faster in emit & trigger period.
	      if (queue.length < 1) {
	        delete target[id];
	        // backtrack to remove the redudant object
	        for (var _i = backtrackList.length - 1; _i > -1; _i--) {
	          var _backtrackList$_i = _slicedToArray(backtrackList[_i], 2),
	              parent = _backtrackList$_i[0],
	              key = _backtrackList$_i[1];

	          if (!isEmpty(parent[key])) break;
	          delete parent[key];
	        }
	      }
	      return hasFn;
	    }
	  }, {
	    key: '_addToOnceMap',
	    value: function _addToOnceMap(keys, fn, handler) {
	      var key = keys.join('-');
	      var map = this.onceMap[key] = this.onceMap[key] || new _Map$1();
	      if (!map.has(fn)) map.set(fn, []);
	      var handlers = map.get(fn);
	      // $FlowFixMe: flow do not understand map yet
	      handlers.push(handler);
	    }
	  }, {
	    key: '_removeFromOnceMap',
	    value: function _removeFromOnceMap(keys, fn, handler) {
	      var key = keys.join('-');
	      var map = this.onceMap[key];
	      // do not need to check now
	      // if(isVoid(map) || !map.has(fn)) return;
	      var handlers = map.get(fn);
	      var index = handlers.indexOf(handler);
	      handlers.splice(index, 1);
	      if (isEmpty(handlers)) map.delete(fn);
	    }
	  }, {
	    key: '_getHandlerFromOnceMap',
	    value: function _getHandlerFromOnceMap(keys, fn) {
	      var key = keys.join('-');
	      var map = this.onceMap[key];
	      if (isNil_1(map) || !map.has(fn)) return;
	      var handlers = map.get(fn);
	      return handlers[0];
	    }
	    /**
	     * get event stage by evnet key name
	     * @private
	     * @param  {key} key event's name
	     * @return {stage}  event stage
	     */

	  }, {
	    key: '_getEventStage',
	    value: function _getEventStage(key) {
	      var secondaryCheck = key.match(secondaryReg);
	      // $FlowFixMe: make sure it's event stage here
	      var stage = secondaryCheck && secondaryCheck[0] || 'main';
	      if (secondaryCheck) {
	        key = camelCase_1(key.replace(secondaryReg, ''));
	      }
	      return { stage: stage, key: key };
	    }
	    /**
	     * get event handlers queue to run
	     * @private
	     * @param  {Object} handlerSet the object include all handler
	     * @param  {Array} Array form of plugin id
	     * @return {Array<Function>} event handler in queue to run
	     */

	  }, {
	    key: '_getEventQueue',
	    value: function _getEventQueue(handlerSet, order) {
	      var _this3 = this;

	      order = isArray_1(order) ? order.concat(['_vm']) : ['_vm'];
	      return isEmpty(handlerSet) ? [] : order.reduce(function (queue, id) {
	        if (isEmpty(handlerSet[id]) || !isArray_1(handlerSet[id]) ||
	        // in case plugins is missed
	        // _vm indicate the user. This is the function for user
	        !_this3.__dispatcher.plugins[id] && id !== '_vm') {
	          return queue;
	        }
	        return queue.concat(handlerSet[id].map(function (fn) {
	          // bind context for plugin instance
	          return bind_1(fn, _this3.__dispatcher.plugins[id] || _this3.__dispatcher.vm);
	        }));
	      }, []);
	    }
	    /**
	     * event processor period. If event needs call kernel function.
	     * I will called here.
	     * If kernel will reponse. I will stop here.
	     * Else I will trigger next period.
	     * @param  {string}    key event's name
	     * @param  {boolean}  options.sync we will take triggerSync if true, otherwise we will run trigger. default is false
	     * @param  {anything} args
	     * @return {Promise|undefined}
	     */

	  }, {
	    key: '_eventProcessor',
	    value: function _eventProcessor(key, _ref) {
	      var sync = _ref.sync;

	      var isKernelMethod = kernelMethods.indexOf(key) > -1;
	      var isDomMethod = domMethods.indexOf(key) > -1;
	      var isDispatcherMethod = dispatcherMethods.indexOf(key) > -1;

	      for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
	        args[_key5 - 2] = arguments[_key5];
	      }

	      if (isKernelMethod || isDomMethod || isDispatcherMethod) {
	        if (isDispatcherMethod) {
	          var _dispatcher;

	          (_dispatcher = this.__dispatcher)[key].apply(_dispatcher, _toConsumableArray(args));
	        } else {
	          var _dispatcher2;

	          (_dispatcher2 = this.__dispatcher[isKernelMethod ? 'kernel' : 'dom'])[key].apply(_dispatcher2, _toConsumableArray(args));
	        }
	        if (videoEvents.indexOf(key) > -1 || domEvents.indexOf(key) > -1) return true;
	      }
	      // $FlowFixMe: flow do not support computed sytax on classs, but it's ok here
	      return this[sync ? 'triggerSync' : 'trigger'].apply(this, [key].concat(_toConsumableArray(args)));
	    }
	    /**
	     * run side effect period
	     * @param  {string}    key event's name
	     * @param  {args} args
	     */

	  }, {
	    key: '_runSideEffectEvent',
	    value: function _runSideEffectEvent(key, order) {
	      for (var _len6 = arguments.length, args = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
	        args[_key6 - 2] = arguments[_key6];
	      }

	      var event = this.events[key];
	      if (isEmpty(event)) {
	        return false;
	      }
	      var queue = this._getEventQueue(event._, order);
	      queue.forEach(function (run) {
	        return run.apply(undefined, _toConsumableArray(args));
	      });
	      return true;
	    }
	  }]);

	  return Bus;
	}(), (_applyDecoratedDescriptor$4(_class$5.prototype, 'emit', [_dec$5], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'emit'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'emitSync', [_dec2$4], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'emitSync'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'trigger', [_dec3$3], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'trigger'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'triggerSync', [_dec4$3], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'triggerSync'), _class$5.prototype)), _class$5));

	var _dec$6, _dec2$5, _dec3$4, _dec4$4, _dec5$3, _dec6$2, _dec7$1, _dec8$1, _dec9$1, _dec10$1, _dec11$1, _class$6;

	function _applyDecoratedDescriptor$5(target, property, decorators, descriptor, context) {
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

	var secondaryReg$1 = /^(before|after|_)/;

	/**
	 * In logic before 0.10.0, we use 'c_' and 'w_' to mark event of container and wrapper
	 * we need to keep that logic work until next major version.
	 * @param {string} name 事件名字
	 */
	function getEventTargetByOldLogic(oldName) {
	  var targetKeyReg = new RegExp('^(c|w)_');
	  var matches = oldName.match(targetKeyReg);
	  if (matches) {
	    var _name = oldName.replace(targetKeyReg, '');
	    var _target = oldName.indexOf('c') === 0 ? 'container' : 'wrapper';
	    /* istanbul ignore else  */
	    {
	      Log.warn('We no longer support event names like ' + oldName + '. Please use ' + _name + ' and options like { target: \'' + _target + '\' } instead');
	    }
	    return { name: _name, target: _target };
	  } else if (oldName === 'error') {
	    return { name: 'error', target: 'kernel' };
	  }
	  return false;
	}

	function getEventStage(name) {
	  var matches = name.match(secondaryReg$1);
	  // $FlowFixMe: We make sure it's event stage here
	  var stage = matches && matches[0] || 'main';
	  if (matches) {
	    name = camelCase_1(name.replace(secondaryReg$1, ''));
	  }
	  return { name: name, stage: stage };
	}

	function getEventTargetByEventName(name) {
	  if (videoEvents.indexOf(name) > -1) return 'video';
	  if (kernelEvents.indexOf(name) > -1) return 'kernel';
	  if (domEvents.indexOf(name) > -1) return 'video-dom';
	  if (esFullscreenEvents.indexOf(name) > -1) return 'esFullscreen';
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

	  if (!isFunction_1(fn)) {
	    throw new Error('You must provide a function to handle with event ' + name + ', but not ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
	  }
	  return {
	    id: id,
	    fn: fn,
	    name: name,
	    target: target,
	    stage: stage
	  };
	}

	function isEventEmitalbe(_ref2) {
	  var id = _ref2.id,
	      name = _ref2.name;

	  if (!name || !isString(name) || secondaryReg$1.test(name)) {
	    Log.error('You must provide a legal event name, which is string and could not started with before/after/_');
	    return false;
	  }
	  if (!id || !isString(id)) {
	    Log.error('You must provide the id of emitter');
	    return false;
	  }
	  return true;
	}

	function checkEventEmitParameter(info) {
	  // $FlowFixMe: the info match requirement here
	  info.target = getEventInfo(info).target;

	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return [info].concat(_toConsumableArray(args));
	}

	var Binder = (_dec$6 = before(prettifyEventParameter), _dec2$5 = before(prettifyEventParameter), _dec3$4 = before(prettifyEventParameter), _dec4$4 = runnable(isEventEmitalbe), _dec5$3 = before(checkEventEmitParameter), _dec6$2 = runnable(isEventEmitalbe, {
	  backup: function backup() {
	    return false;
	  }
	}), _dec7$1 = before(checkEventEmitParameter), _dec8$1 = runnable(isEventEmitalbe), _dec9$1 = before(checkEventEmitParameter), _dec10$1 = runnable(isEventEmitalbe, {
	  backup: function backup() {
	    return false;
	  }
	}), _dec11$1 = before(checkEventEmitParameter), (_class$6 = function () {
	  function Binder(dispatcher) {
	    _classCallCheck(this, Binder);

	    this.__dispatcher = dispatcher;
	    this.kinds = ['kernel', 'container', 'wrapper', 'video', 'video-dom', 'plugin', 'esFullscreen'];
	    this.buses = {};
	    this.bindedEventNames = {};
	    this.bindedEventInfo = {};
	    this.pendingEventsInfo = {};
	    this.needToCheckPendingVideoDomEventPlugins = {};
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = _getIterator(this.kinds), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
	        if (!_iteratorNormalCompletion && _iterator.return) {
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
	    key: 'on',
	    value: function on(_ref3) {
	      var target = _ref3.target,
	          id = _ref3.id,
	          name = _ref3.name,
	          fn = _ref3.fn,
	          stage = _ref3.stage;

	      this._addEventListenerOnTarget({
	        name: name,
	        target: target,
	        id: id
	      });
	      return this.buses[target].on(id, name, fn, stage);
	    }
	  }, {
	    key: 'off',
	    value: function off(_ref4) {
	      var target = _ref4.target,
	          id = _ref4.id,
	          name = _ref4.name,
	          fn = _ref4.fn,
	          stage = _ref4.stage;

	      var ret = this.buses[target].off(id, name, fn, stage);
	      this._removeEventListenerOnTargetWhenIsUseless({ name: name, target: target });
	      return ret;
	    }
	  }, {
	    key: 'once',
	    value: function once(_ref5) {
	      var target = _ref5.target,
	          id = _ref5.id,
	          name = _ref5.name,
	          fn = _ref5.fn,
	          stage = _ref5.stage;

	      return this.buses[target].once(id, name, fn, stage);
	    }
	  }, {
	    key: 'emit',
	    value: function emit(_ref6) {
	      var _buses$target;

	      var target = _ref6.target,
	          name = _ref6.name;

	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      return (_buses$target = this.buses[target]).emit.apply(_buses$target, [name].concat(_toConsumableArray(args)));
	    }
	  }, {
	    key: 'emitSync',
	    value: function emitSync(_ref7) {
	      var _buses$target2;

	      var target = _ref7.target,
	          name = _ref7.name;

	      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	      }

	      return (_buses$target2 = this.buses[target]).emitSync.apply(_buses$target2, [name].concat(_toConsumableArray(args)));
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(_ref8) {
	      var _buses$target3;

	      var target = _ref8.target,
	          name = _ref8.name;

	      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }

	      return (_buses$target3 = this.buses[target]).trigger.apply(_buses$target3, [name].concat(_toConsumableArray(args)));
	    }
	  }, {
	    key: 'triggerSync',
	    value: function triggerSync(_ref9) {
	      var _buses$target4;

	      var target = _ref9.target,
	          name = _ref9.name;

	      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	        args[_key5 - 1] = arguments[_key5];
	      }

	      return (_buses$target4 = this.buses[target]).triggerSync.apply(_buses$target4, [name].concat(_toConsumableArray(args)));
	    }

	    // when we create a penetrate plugin, we need to rebind video events on it

	  }, {
	    key: 'bindEventOnPenetrateNode',
	    value: function bindEventOnPenetrateNode(node) {
	      var _this = this;

	      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      this.bindedEventInfo['video-dom'].forEach(function (_ref10) {
	        var _ref11 = _slicedToArray(_ref10, 2),
	            name = _ref11[0],
	            fn = _ref11[1];

	        remove ? removeEvent(node, name, fn) : _this._addEventOnDom(node, name, fn);
	      });
	    }

	    // when we switch kernel, we will create a new video.
	    // we need to transfer the event from the oldvideo to it.

	  }, {
	    key: 'bindEventOnVideo',
	    value: function bindEventOnVideo(node) {
	      var _this2 = this;

	      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      this.bindedEventInfo['video-dom'].concat(this.bindedEventInfo.video).forEach(function (_ref12) {
	        var _ref13 = _slicedToArray(_ref12, 2),
	            name = _ref13[0],
	            fn = _ref13[1];

	        remove ? removeEvent(node, name, fn) : _this2._addEventOnDom(node, name, fn);
	      });
	    }

	    // As penetrate plugin is considered to be part of video
	    // we need to transfer event for it
	    // so we need some specail event handler

	  }, {
	    key: 'listenOnMouseMoveEvent',
	    value: function listenOnMouseMoveEvent(node) {
	      var _this3 = this;

	      var dom = this.__dispatcher.dom;
	      var target = 'video-dom';
	      var id = '_vm';
	      mustListenVideoDomEvents.forEach(function (name) {
	        var fn = function fn() {
	          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	            args[_key6] = arguments[_key6];
	          }

	          var _args$ = args[0],
	              toElement = _args$.toElement,
	              currentTarget = _args$.currentTarget,
	              relatedTarget = _args$.relatedTarget,
	              type = _args$.type;

	          var to = toElement || relatedTarget;
	          // As we support penetrate plugin, the video dom event may be differnet.
	          if (dom.mouseInVideo && type === 'mouseleave' && !dom.isNodeInsideVideo(to)) {
	            dom.mouseInVideo = false;
	            return _this3.triggerSync.apply(_this3, [{
	              target: target,
	              name: name,
	              id: id
	            }].concat(args));
	          }
	          if (!dom.mouseInVideo && type === 'mouseenter' && dom.isNodeInsideVideo(currentTarget)) {
	            dom.mouseInVideo = true;
	            return _this3.triggerSync.apply(_this3, [{
	              target: target,
	              name: name,
	              id: id
	            }].concat(args));
	          }
	        };
	        _this3._addEventOnDom(node, name, fn);
	        // this function is only used once now
	        // so we do not cover this branch
	        // but we still keep this judegement
	        /* istanbul ignore else  */
	        if (_this3.bindedEventNames[target].indexOf(name) < 0) {
	          _this3.bindedEventNames[target].push(name);
	          // $FlowFixMe: fn must be function now
	          _this3.bindedEventInfo[target].push([name, fn]);
	        }
	      });
	    }

	    // When we switch kernel, we need to rebind the events

	  }, {
	    key: 'migrateKernelEvent',
	    value: function migrateKernelEvent(oldKernel, newKernel) {
	      var bindedEventInfoList = this.bindedEventInfo.kernel;
	      bindedEventInfoList.forEach(function (_ref14) {
	        var _ref15 = _slicedToArray(_ref14, 2),
	            name = _ref15[0],
	            fn = _ref15[1];

	        oldKernel.off(name, fn);
	        newKernel.on(name, fn);
	      });
	    }

	    // when we destroy, we remove all binder

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this4 = this;

	      this.kinds.forEach(function (target) {
	        if (target === 'kernel') {
	          _this4.bindedEventInfo.kernel.forEach(function (_ref16) {
	            var _ref17 = _slicedToArray(_ref16, 2),
	                name = _ref17[0],
	                fn = _ref17[1];

	            _this4.__dispatcher.kernel.off(name, fn);
	          });
	        } else {
	          var targetDom = _this4._getTargetDom(target);
	          _this4.bindedEventInfo[target].forEach(function (_ref18) {
	            var _ref19 = _slicedToArray(_ref18, 2),
	                name = _ref19[0],
	                fn = _ref19[1];

	            removeEvent(targetDom, name, fn);

	            if (target === 'video-dom') {
	              _this4.__dispatcher.dom.videoExtendedNodes.forEach(function (node) {
	                return removeEvent(node, name, fn);
	              });
	            }
	          });
	        }
	        _this4.bindedEventInfo.kernel = [];
	        _this4.bindedEventNames.kernel = [];
	      });
	    }
	  }, {
	    key: '_addEventOnDom',
	    value: function _addEventOnDom(element, key, fn) {
	      if (passiveEvents.indexOf(key) > -1) {
	        return addEvent(element, key, fn, false, { passive: true });
	      }
	      addEvent(element, key, fn);
	    }

	    // Some event needs us to transfer it from the real target
	    // such as dom event

	  }, {
	    key: '_addEventListenerOnTarget',
	    value: function _addEventListenerOnTarget(_ref20) {
	      var _this5 = this;

	      var name = _ref20.name,
	          target = _ref20.target,
	          id = _ref20.id;

	      if (!this._isEventNeedToBeHandled(target, name)) return;
	      var fn = void 0;
	      // if this event has been binded, return;
	      if (this.bindedEventNames[target].indexOf(name) > -1) return;
	      var targetDom = this._getTargetDom(target);
	      // choose the correspond method to bind
	      if (target === 'kernel') {
	        if (!this.__dispatcher.kernel) {
	          this.addPendingEvent(target, name, id);
	          return;
	        }
	        fn = function fn() {
	          for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	            args[_key7] = arguments[_key7];
	          }

	          return _this5.triggerSync.apply(_this5, [{ target: target, name: name, id: 'kernel' }].concat(args));
	        };
	        this.__dispatcher.kernel.on(name, fn);
	      } else if (target === 'container' || target === 'wrapper') {
	        fn = function fn() {
	          for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	            args[_key8] = arguments[_key8];
	          }

	          return _this5.triggerSync.apply(_this5, [{ target: target, name: name, id: target }].concat(args));
	        };
	        this._addEventOnDom(targetDom, name, fn);
	      } else if (target === 'video') {
	        fn = function fn() {
	          for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	            args[_key9] = arguments[_key9];
	          }

	          return _this5.trigger.apply(_this5, [{ target: target, name: name, id: target }].concat(args));
	        };
	        this._addEventOnDom(targetDom, name, fn);
	      } else if (target === 'video-dom') {
	        fn = function fn() {
	          for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	            args[_key10] = arguments[_key10];
	          }

	          return _this5.triggerSync.apply(_this5, [{ target: target, name: name, id: target }].concat(args));
	        };
	        this.__dispatcher.dom.videoExtendedNodes.forEach(function (node) {
	          return _this5._addEventOnDom(node, name, fn);
	        });
	        this._addEventOnDom(targetDom, name, fn);
	      }
	      this.bindedEventNames[target].push(name);
	      // $FlowFixMe: fn must be function now
	      this.bindedEventInfo[target].push([name, fn]);
	    }

	    // when we off one event, we can remove the useless binder
	    // actually we should remove on once event too
	    // but it seems ugliy
	    // TODO: add this function on once event too

	  }, {
	    key: '_removeEventListenerOnTargetWhenIsUseless',
	    value: function _removeEventListenerOnTargetWhenIsUseless(_ref21) {
	      var name = _ref21.name,
	          target = _ref21.target;

	      if (!this._isEventNeedToBeHandled(target, name)) return;
	      var eventNamesList = this.bindedEventNames[target];
	      var nameIndex = eventNamesList.indexOf(name);
	      // if we have not bind this event before, we omit it
	      if (nameIndex < 0) return;
	      // if the buses still have another function on bind, we do not need to remove the binder
	      if (!isEmpty(this.buses[target].events[name])) return;

	      // we fetch the binded function from bindedEventInfo
	      var bindedEventInfoList = this.bindedEventInfo[target];
	      var fn = void 0;
	      var index = void 0;
	      for (index = 0; index < bindedEventInfoList.length; index++) {
	        if (bindedEventInfoList[index][0] === name) {
	          fn = bindedEventInfoList[index][1];
	          break;
	        }
	      }
	      if (!isFunction_1(fn)) return;

	      if (target === 'kernel') {
	        this.__dispatcher.kernel.off(name, fn);
	      } else {
	        var targetDom = this._getTargetDom(target);

	        removeEvent(targetDom, name, fn);

	        // When we remove something on video dom, we also need to remove event on penetrate plugin
	        if (target === 'video-dom') {
	          this.__dispatcher.dom.videoExtendedNodes.forEach(function (node) {
	            // $FlowFixMe: fn is function now
	            removeEvent(node, name, fn);
	          });
	        }
	      }

	      bindedEventInfoList.splice(index, 1);
	      eventNamesList.splice(nameIndex, 1);
	    }
	  }, {
	    key: '_getTargetDom',
	    value: function _getTargetDom(target) {
	      var targetDom = void 0;
	      switch (target) {
	        case 'container':
	        case 'wrapper':
	          // $FlowFixMe: fix dom index bug
	          targetDom = this.__dispatcher.dom[target];
	          break;
	        default:
	          targetDom = this.__dispatcher.dom.videoElement;
	          break;
	      }
	      return targetDom;
	    }
	  }, {
	    key: '_isEventNeedToBeHandled',
	    value: function _isEventNeedToBeHandled(target, name) {
	      // the plugin target do not need us to transfer
	      // we have listened on esFullscreen in dom
	      // we have listened mustListenVideoDomEvents
	      // so the events above do not need to rebind
	      return target !== 'plugin' && target !== 'esFullscreen' && (mustListenVideoDomEvents.indexOf(name) < 0 || target !== 'video');
	    }
	  }, {
	    key: 'addPendingEvent',
	    value: function addPendingEvent(target, name, id) {
	      this.pendingEventsInfo[target].push([name, id]);
	    }
	  }, {
	    key: 'applyPendingEvents',
	    value: function applyPendingEvents(target) {
	      var pendingEvents = this.pendingEventsInfo[target];
	      var pendingEventsCopy = pendingEvents.splice(0, pendingEvents.length);
	      while (pendingEventsCopy.length) {
	        var _pendingEventsCopy$po = pendingEventsCopy.pop(),
	            _pendingEventsCopy$po2 = _slicedToArray(_pendingEventsCopy$po, 2),
	            _name2 = _pendingEventsCopy$po2[0],
	            id = _pendingEventsCopy$po2[1];

	        this._addEventListenerOnTarget({ name: _name2, target: target, id: id });
	      }
	    }
	  }]);

	  return Binder;
	}(), (_applyDecoratedDescriptor$5(_class$6.prototype, 'on', [_dec$6], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'on'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'off', [_dec2$5], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'off'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'once', [_dec3$4], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'once'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'emit', [_dec4$4, _dec5$3], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'emit'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'emitSync', [_dec6$2, _dec7$1], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'emitSync'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'trigger', [_dec8$1, _dec9$1], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'trigger'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'triggerSync', [_dec10$1, _dec11$1], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'triggerSync'), _class$6.prototype)), _class$6));

	var _dec$7, _dec2$6, _dec3$5, _dec4$5, _dec5$4, _class$7;

	function _applyDecoratedDescriptor$6(target, property, decorators, descriptor, context) {
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
	var pluginConfigSet = {};
	var kernelsSet = {};
	function convertNameIntoId(name) {
	  if (!isString(name)) throw new Error('Plugin\'s name must be a string, but not "' + name + '" in ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
	  return camelCase_1(name);
	}
	function checkPluginConfig(config) {
	  if (isFunction_1(config)) {
	    if (!(config.prototype instanceof Plugin)) {
	      throw new TypeError('Your are trying to install plugin ' + config.name + ', but it\'s not extends from Chimee.plugin.');
	    }
	    return;
	  }
	  if (!isObject$1(config) || isEmpty(config)) throw new TypeError('plugin\'s config must be an Object, but not "' + config + '" in ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
	  var name = config.name;

	  if (!isString(name) || name.length < 1) throw new TypeError('plugin must have a legal namea, but not "' + name + '" in ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
	}
	/**
	 * <pre>
	 * Dispatcher is the hub of plugins, user, and video kernel.
	 * It take charge of plugins install, use and remove
	 * It also offer a bridge to let user handle video kernel.
	 * </pre>
	 */
	var Dispatcher = (_dec$7 = before(convertNameIntoId), _dec2$6 = before(checkPluginConfig), _dec3$5 = before(convertNameIntoId), _dec4$5 = before(convertNameIntoId), _dec5$4 = before(convertNameIntoId), (_class$7 = function () {
	  /**
	   * @param  {UserConfig} config UserConfig for whole Chimee player
	   * @param  {Chimee} vm referrence of outer class
	   * @return {Dispatcher}
	   */

	  /**
	   * the synchronous ready flag
	   * @type {boolean}
	   * @member readySync
	   */

	  /**
	   * all plugins instance set
	   * @type {Object}
	   * @member plugins
	   */
	  function Dispatcher(config, vm) {
	    var _this = this;

	    _classCallCheck(this, Dispatcher);

	    this.plugins = {};
	    this.order = [];
	    this.readySync = false;
	    this.zIndexMap = {
	      inner: [],
	      outer: []
	    };
	    this.changeWatchable = true;
	    this.kernelEventHandlerList = [];

	    if (!isObject$1(config)) throw new TypeError('UserConfig must be an Object, but not "' + config + '" in ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
	    /**
	     * dom Manager
	     * @type {Dom}
	     */
	    this.dom = new Dom(config, this);
	    /**
	     * Chimee's referrence
	     * @type {[type]}
	     */
	    this.vm = vm;
	    /**
	     * tell user have Chimee installed finished
	     * @type {Promises}
	     */
	    this.videoConfigReady = false;
	    // create the videoconfig
	    this.videoConfig = new VideoConfig(this, config);
	    // support both plugin and plugins here as people often cofuse both
	    // $FlowFixMe: we support plugins here, which should be illegal
	    if (isArray_1(config.plugins) && !isArray_1(config.plugin)) {
	      config.plugin = config.plugins;
	      delete config.plugins;
	    }
	    this.binder = new Binder(this);
	    this.binder.listenOnMouseMoveEvent(this.dom.videoElement);
	    // use the plugin user want to use
	    this._initUserPlugin(config.plugin);
	    // add default config for container
	    var containerConfig = merge_1({}, defaultContainerConfig, config.container || {});
	    // trigger the init life hook of plugin
	    this.order.forEach(function (key) {
	      return _this.plugins[key].__init(_this.videoConfig, containerConfig);
	    });
	    this.videoConfigReady = true;
	    this.videoConfig.init();
	    this.containerConfig = new Vessel(this, 'container', containerConfig);
	    /**
	     * video kernel
	     * @type {Kernel}
	     */
	    this.kernel = this._createKernel(this.dom.videoElement, this.videoConfig);
	    this.binder.applyPendingEvents('kernel');
	    // trigger auto load event
	    var asyncInitedTasks = [];
	    this.order.forEach(function (key) {
	      var ready = _this.plugins[key].__inited();
	      if (isPromise(ready)) {
	        asyncInitedTasks.push(ready);
	      }
	    });
	    this.readySync = asyncInitedTasks.length === 0;
	    // tell them we have inited the whold player
	    this.ready = this.readySync ? _Promise.resolve() : _Promise.all(asyncInitedTasks).then(function () {
	      _this.readySync = true;
	      _this.binder.trigger({
	        target: 'plugin',
	        name: 'ready',
	        id: 'dispatcher'
	      });
	      _this._autoloadVideoSrcAtFirst();
	    });
	    if (this.readySync) this._autoloadVideoSrcAtFirst();
	  }

	  /**
	   * use a plugin, which means we will new a plugin instance and include int this Chimee instance
	   * @param  {Object|string} option you can just set a plugin name or plugin config
	   * @return {Promise}
	   */

	  // to save the kernel event handler, so that we can remove it when we destroy the kernel

	  /**
	   * the z-index map of the dom, it contain some important infomation
	   * @type {Object}
	   * @member zIndexMap
	   */

	  /**
	   * plugin's order
	   * @type {Array<string>}
	   * @member order
	   */


	  _createClass(Dispatcher, [{
	    key: 'use',
	    value: function use(option) {
	      if (isString(option)) option = { name: option, alias: undefined };
	      if (!isObject$1(option) || isObject$1(option) && !isString(option.name)) {
	        throw new TypeError('pluginConfig do not match requirement');
	      }
	      if (!isString(option.alias)) option.alias = undefined;
	      var _option = option,
	          name = _option.name,
	          alias$$1 = _option.alias;

	      option.name = alias$$1 || name;
	      delete option.alias;
	      var key = camelCase_1(name);
	      var id = camelCase_1(alias$$1 || name);
	      var pluginOption = option;
	      var pluginConfig = Dispatcher.getPluginConfig(key);
	      if (isEmpty(pluginConfig)) throw new TypeError('You have not installed plugin ' + key);
	      if (isObject$1(pluginConfig)) {
	        pluginConfig.id = id;
	      }
	      var plugin = isFunction_1(pluginConfig) ? new pluginConfig({ id: id }, this, pluginOption) // eslint-disable-line 
	      : new Plugin(pluginConfig, this, pluginOption);
	      this.plugins[id] = plugin;
	      _Object$defineProperty(this.vm, id, {
	        value: plugin,
	        configurable: true,
	        enumerable: false,
	        writable: false
	      });
	      this.order.push(id);
	      this._sortZIndex();
	      if (this.videoConfigReady) plugin.__inited();
	      return plugin.ready;
	    }

	    /**
	     * unuse an plugin, we will destroy the plugin instance and exlude it
	     * @param  {string} name plugin's name
	     */

	  }, {
	    key: 'unuse',
	    value: function unuse(id) {
	      var plugin = this.plugins[id];
	      if (!isObject$1(plugin) || !isFunction_1(plugin.$destroy)) {
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
	    key: 'throwError',
	    value: function throwError(error) {
	      this.vm.__throwError(error);
	    }
	  }, {
	    key: 'silentLoad',
	    value: function silentLoad(src) {
	      var _this2 = this;

	      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var _option$duration = option.duration,
	          duration = _option$duration === undefined ? 3 : _option$duration,
	          _option$bias = option.bias,
	          bias = _option$bias === undefined ? 0 : _option$bias,
	          _option$repeatTimes = option.repeatTimes,
	          repeatTimes = _option$repeatTimes === undefined ? 0 : _option$repeatTimes,
	          _option$increment = option.increment,
	          increment = _option$increment === undefined ? 0 : _option$increment,
	          _option$isLive = option.isLive,
	          isLive = _option$isLive === undefined ? this.videoConfig.isLive : _option$isLive,
	          _option$box = option.box,
	          box = _option$box === undefined ? this.videoConfig.box : _option$box,
	          _option$kernels = option.kernels,
	          kernels = _option$kernels === undefined ? this.videoConfig.kernels : _option$kernels,
	          _option$preset = option.preset,
	          preset = _option$preset === undefined ? this.videoConfig.preset : _option$preset;
	      // all live stream seem as immediate mode
	      // it's impossible to seek on live stream

	      var immediate = option.immediate || isLive;
	      // form the base config for kernel
	      // it should be the same as the config now
	      var config = { isLive: isLive, box: box, src: src, kernels: kernels, preset: preset };
	      // build tasks accroding repeat times
	      var tasks = new Array(repeatTimes + 1).fill(1).map(function (value, index) {
	        return function () {
	          return new _Promise(function (resolve, reject) {
	            // if abort, give up and reject
	            if (option.abort) reject({ error: true, message: 'user abort the mission' });
	            var video = document.createElement('video');
	            var idealTime = _this2.kernel.currentTime + duration + increment * index;
	            video.muted = true;
	            var newVideoReady = false;
	            var kernel = void 0;
	            var _videoError = void 0;
	            var videoCanplay = void 0;
	            var videoLoadedmetadata = void 0;
	            // bind time update on old video
	            // when we bump into the switch point and ready
	            // we switch
	            var oldVideoTimeupdate = function oldVideoTimeupdate() {
	              var currentTime = _this2.kernel.currentTime;
	              if (bias <= 0 && currentTime >= idealTime || bias > 0 && (Math.abs(idealTime - currentTime) <= bias && newVideoReady || currentTime - idealTime > bias)) {
	                removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
	                removeEvent(video, 'error', _videoError, true);
	                if (!newVideoReady) {
	                  removeEvent(video, 'canplay', videoCanplay, true);
	                  removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
	                  kernel.destroy();
	                  return resolve();
	                }
	                return reject({
	                  error: false,
	                  video: video,
	                  kernel: kernel
	                });
	              }
	            };
	            videoCanplay = function videoCanplay() {
	              newVideoReady = true;
	              // you can set it immediately run by yourself
	              if (immediate) {
	                removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
	                removeEvent(video, 'error', _videoError, true);
	                return reject({
	                  error: false,
	                  video: video,
	                  kernel: kernel
	                });
	              }
	            };
	            videoLoadedmetadata = function videoLoadedmetadata() {
	              if (!isLive) {
	                kernel.seek(immediate ? _this2.kernel.currentTime : idealTime);
	              }
	            };
	            _videoError = function videoError(evt) {
	              removeEvent(video, 'canplay', videoCanplay, true);
	              removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
	              removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
	              kernel.off('error', _videoError);
	              var error = void 0;
	              if (!isEmpty(evt.data) && evt.data.errmsg) {
	                var errmsg = evt.data.errmsg;

	                Log.error("chimee's silentload bump into a kernel error", errmsg);
	                error = new Error(errmsg);
	              } else {
	                error = !isEmpty(video.error) ? new Error(video.error.message) : new Error('unknow video error');
	                Log.error("chimee's silentload", error.message);
	              }
	              kernel.destroy();
	              _this2._silentLoadTempKernel = undefined;
	              return index === repeatTimes ? reject(error) : resolve(error);
	            };
	            addEvent(video, 'canplay', videoCanplay, true);
	            addEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
	            addEvent(video, 'error', _videoError, true);
	            kernel = _this2._createKernel(video, config);
	            _this2._silentLoadTempKernel = kernel;
	            kernel.on('error', _videoError);
	            addEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
	            kernel.load();
	          });
	        };
	      });
	      return runRejectableQueue(tasks).then(function () {
	        var message = 'The silentLoad for ' + src + ' timed out. Please set a longer duration or check your network';
	        /* istanbul ignore else  */
	        {
	          Log.warn("chimee's silentLoad", message);
	        }
	        return _Promise.reject(new Error(message));
	      }).catch(function (data) {
	        if (isError_1(data)) {
	          return _Promise.reject(data);
	        }
	        if (data.error) {
	          /* istanbul ignore else  */
	          {
	            Log.warn("chimee's silentLoad", data.message);
	          }
	          return _Promise.reject(new Error(data.message));
	        }
	        var video = data.video,
	            kernel = data.kernel;

	        if (option.abort) {
	          kernel.destroy();
	          return _Promise.reject(new Error('user abort the mission'));
	        }
	        var paused = _this2.dom.videoElement.paused;
	        if (paused) {
	          _this2.switchKernel({ video: video, kernel: kernel, config: config });
	          return _Promise.resolve();
	        }
	        return new _Promise(function (resolve) {
	          addEvent(video, 'play', function () {
	            _this2.switchKernel({ video: video, kernel: kernel, config: config });
	            resolve();
	          }, true);
	          video.play();
	        });
	      });
	    }
	  }, {
	    key: 'load',
	    value: function load(srcOrOption) {
	      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var src = isString(srcOrOption) ? srcOrOption : isObject$1(srcOrOption) && isString(srcOrOption.src) ? srcOrOption.src
	      // give a chance for user to clear the src
	      : '';
	      if (isObject$1(srcOrOption)) {
	        delete srcOrOption.src;
	        option = srcOrOption;
	      }
	      var oldBox = this.kernel.box;
	      var videoConfig = this.videoConfig;
	      var _option2 = option,
	          _option2$isLive = _option2.isLive,
	          isLive = _option2$isLive === undefined ? videoConfig.isLive : _option2$isLive,
	          _option2$box = _option2.box,
	          box = _option2$box === undefined ? videoConfig.box : _option2$box,
	          _option2$preset = _option2.preset,
	          preset = _option2$preset === undefined ? videoConfig.preset : _option2$preset,
	          _option2$kernels = _option2.kernels,
	          kernels = _option2$kernels === undefined ? videoConfig.kernels : _option2$kernels;

	      if (box !== 'native' || box !== oldBox || !isEmpty(option)) {
	        var video = document.createElement('video');
	        var config = { isLive: isLive, box: box, preset: preset, src: src, kernels: kernels };
	        var kernel = this._createKernel(video, config);
	        this.switchKernel({ video: video, kernel: kernel, config: config });
	      }
	      var originAutoLoad = this.videoConfig.autoload;
	      this._changeUnwatchable(this.videoConfig, 'autoload', false);
	      this.videoConfig.src = src || this.videoConfig.src;
	      this.kernel.load(this.videoConfig.src);
	      this._changeUnwatchable(this.videoConfig, 'autoload', originAutoLoad);
	    }
	  }, {
	    key: 'switchKernel',
	    value: function switchKernel(_ref) {
	      var _this3 = this;

	      var video = _ref.video,
	          kernel = _ref.kernel,
	          config = _ref.config;

	      var oldKernel = this.kernel;
	      var originVideoConfig = clone_1(this.videoConfig);
	      this.dom.migrateVideoRequiredGuardedAttributes(video);
	      this.dom.removeVideo();
	      this.dom.installVideo(video);
	      // as we will reset the currentVideoConfig on the new video
	      // it will trigger the watch function as they maybe differnet
	      // because video config will return the real situation
	      // so we need to stop them
	      this.videoConfig.changeWatchable = false;
	      this.videoConfig.autoload = false;
	      this.videoConfig.src = config.src;
	      this.videoConfig._realDomAttr.forEach(function (key) {
	        // $FlowFixMe: support computed key here
	        if (key !== 'src') _this3.videoConfig[key] = originVideoConfig[key];
	      });
	      this.videoConfig.changeWatchable = true;
	      this.binder.migrateKernelEvent(oldKernel, kernel);
	      this.kernel = kernel;
	      this._silentLoadTempKernel = undefined;
	      var isLive = config.isLive,
	          box = config.box,
	          preset = config.preset,
	          kernels = config.kernels;

	      _Object$assign(this.videoConfig, { isLive: isLive, box: box, preset: preset, kernels: kernels });
	      oldKernel.destroy();
	      // delay video event binding
	      // so that people can't feel the default value change
	      setTimeout(function () {
	        _this3.binder && _this3.binder.bindEventOnVideo && _this3.binder.bindEventOnVideo(video);
	      });
	    }

	    /**
	     * destroy function called when dispatcher destroyed
	     */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      for (var _key in this.plugins) {
	        this.unuse(_key);
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
	    }

	    /**
	     * use a set of plugin
	     * @param  {Array<UserPluginConfig>}  configs  a set of plugin config
	     * @return {Array<Promise>}   a set of Promise indicate the plugin install stage
	     */

	  }, {
	    key: '_initUserPlugin',
	    value: function _initUserPlugin() {
	      var _this4 = this;

	      var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      if (!isArray_1(configs)) {
	        /* istanbul ignore else  */
	        Log.warn('Dispatcher', 'UserConfig.plugin can only by an Array, but not "' + configs + '" in ' + (typeof configs === 'undefined' ? 'undefined' : _typeof(configs)));
	        configs = [];
	      }
	      return configs.map(function (config) {
	        return _this4.use(config);
	      });
	    }

	    /**
	     * sort zIndex of plugins to make plugin display in order
	     */

	  }, {
	    key: '_sortZIndex',
	    value: function _sortZIndex() {
	      var _this5 = this;

	      var _order$reduce = this.order.reduce(function (levelSet, key) {
	        var plugin = _this5.plugins[key];
	        if (isEmpty(plugin)) return levelSet;
	        var set = levelSet[plugin.$inner ? 'inner' : 'outer'];
	        var level = plugin.$level;
	        set[level] = set[level] || [];
	        set[level].push(key);
	        return levelSet;
	      }, { inner: {}, outer: {} }),
	          inner = _order$reduce.inner,
	          outer = _order$reduce.outer;

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

	    /**
	     * get the top element's level
	     * @param {boolean} inner get the inner array or the outer array
	     */

	  }, {
	    key: '_getTopLevel',
	    value: function _getTopLevel(inner) {
	      var arr = this.zIndexMap[inner ? 'inner' : 'outer'];
	      var plugin = this.plugins[arr[arr.length - 1]];
	      return isEmpty(plugin) ? 0 : plugin.$level;
	    }
	  }, {
	    key: '_autoloadVideoSrcAtFirst',
	    value: function _autoloadVideoSrcAtFirst() {
	      if (this.videoConfig.autoload) {
	        if (!this.videoConfig.src) {
	          Log.warn('You have not set the src, so you better set autoload to be false. Accroding to https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#src.');
	          return;
	        }
	        this.binder.emit({
	          name: 'load',
	          target: 'plugin',
	          id: 'dispatcher'
	        }, this.videoConfig.src);
	      }
	    }
	  }, {
	    key: '_changeUnwatchable',
	    value: function _changeUnwatchable(object, property, value) {
	      this.changeWatchable = false;
	      object[property] = value;
	      this.changeWatchable = true;
	    }
	  }, {
	    key: '_createKernel',
	    value: function _createKernel(video, config) {
	      var kernels = config.kernels,
	          preset = config.preset;
	      /* istanbul ignore else  */

	      if (isEmpty(kernels) && !isEmpty(preset)) Log.warn('preset will be deprecated in next major version, please use kernels instead.');
	      var presetConfig = {};
	      var newPreset = {};
	      if (isArray_1(kernels)) {
	        // SKC means SingleKernelConfig
	        newPreset = kernels.reduce(function (kernels, keyOrSKC) {
	          // if it is a string key, it means the kernel has been pre installed.
	          if (isString(keyOrSKC)) {
	            var kernelFn = kernelsSet[keyOrSKC];
	            if (!isFunction_1(kernelFn)) {
	              Log.warn('You have not installed kernel for ' + keyOrSKC + '.');
	              return kernels;
	            }
	            kernels[keyOrSKC] = kernelFn;
	            return kernels;
	          }
	          // if it is a SingleKernelConfig, it means user may pass in some config here
	          // so we need to extract the handler
	          // get the name of the handler
	          // and collect the config for the handler
	          if (isObject$1(keyOrSKC)) {
	            var name = keyOrSKC.name,
	                handler = keyOrSKC.handler;
	            // if the handler is a pure string, it means the kernel has been pre installed

	            if (isString(handler)) {
	              var _kernelFn = kernelsSet[handler];
	              if (!isFunction_1(_kernelFn)) {
	                Log.warn('You have not installed kernel for ' + handler + '.');
	                return kernels;
	              }
	              kernels[handler] = _kernelFn;
	              presetConfig[handler] = keyOrSKC;
	              return kernels;
	            }
	            // if the handler is a function, it means that the user pass in the kernel directly
	            // if the provide name, we use it as kernel name
	            // if they do not provide name, we just use the function's name
	            if (isFunction_1(handler)) {
	              var kernelName = name || handler.name;
	              kernels[kernelName] = handler;
	              presetConfig[kernelName] = keyOrSKC;
	              return kernels;
	            }
	            Log.warn('When you pass in an SingleKernelConfig in Array, you must clarify it\'s handler, we only support handler in string or function but not ' + (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)));
	            return kernels;
	          }
	          Log.warn('If you pass in kernels as array, you must pass in kernels in string or function, but not ' + (typeof keyOrSKC === 'undefined' ? 'undefined' : _typeof(keyOrSKC)));
	          return kernels;
	        }, {});
	      }

	      if (isObject$1(kernels)) {
	        // SKC means SingleKernelConfig
	        _Object$keys(kernels).forEach(function (key) {
	          var fnOrSKC = kernels[key];
	          // if it's a function, means we need to do nothing
	          if (isFunction_1(fnOrSKC)) {
	            newPreset[key] = fnOrSKC;
	            return;
	          }
	          if (isObject$1(fnOrSKC)) {
	            var handler = fnOrSKC.handler;
	            // if handler is an string, it means user has pre install it

	            if (isString(handler)) {
	              var kernelFn = kernelsSet[handler];
	              if (!isFunction_1(kernelFn)) {
	                Log.warn('You have not installed kernel for ' + handler + '.');
	                return;
	              }
	              newPreset[key] = kernelFn;
	              presetConfig[key] = fnOrSKC;
	              return;
	            }
	            if (isFunction_1(handler)) {
	              newPreset[key] = handler;
	              presetConfig[key] = fnOrSKC;
	              return;
	            }
	            Log.warn('When you pass in an SingleKernelConfig in Object, you must clarify it\'s handler, we only support handler in string or function but not ' + (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)));
	            return;
	          }
	          Log.warn('If you pass in kernels as object, you must pass in kernels in string or function, but not ' + (typeof fnOrSKC === 'undefined' ? 'undefined' : _typeof(fnOrSKC)));
	          return kernels;
	        });
	      }
	      config.preset = _Object$assign(newPreset, preset);
	      config.presetConfig = presetConfig;
	      var kernel = new ChimeeKernel(video, config);
	      return kernel;
	    }
	    /**
	     * static method to install plugin
	     * we will store the plugin config
	     * @type {string} plugin's id
	     */

	  }], [{
	    key: 'install',
	    value: function install(config) {
	      var name = config.name;

	      var id = camelCase_1(name);
	      if (!isEmpty(pluginConfigSet[id])) {
	        /* istanbul ignore else  */
	        Log.warn('Dispatcher', 'You have installed ' + name + ' again. And the older one will be replaced');
	      }
	      var pluginConfig = isFunction_1(config) ? config : merge_1({ id: id }, config);
	      pluginConfigSet[id] = pluginConfig;
	      return id;
	    }
	  }, {
	    key: 'hasInstalled',
	    value: function hasInstalled(id) {
	      return !isEmpty(pluginConfigSet[id]);
	    }
	  }, {
	    key: 'uninstall',
	    value: function uninstall(id) {
	      delete pluginConfigSet[id];
	    }
	    /**
	     * get Plugin config based on plugin's id
	     * @type {[type]}
	     */

	  }, {
	    key: 'getPluginConfig',
	    value: function getPluginConfig(id) {
	      return pluginConfigSet[id];
	    }
	  }, {
	    key: 'installKernel',
	    value: function installKernel(key, value) {
	      var tasks = isObject$1(key) ? _Object$entries(key) : [[key, value]];
	      tasks.forEach(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2),
	            key = _ref3[0],
	            value = _ref3[1];

	        if (!isFunction_1(value)) throw new Error('The kernel you install on ' + key + ' must be a Function, but not ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
	        if (isFunction_1(kernelsSet[key])) Log.warn('You have alrady install a kernel on ' + key + ', and now we will replace it');
	        kernelsSet[key] = value;
	      });
	    }

	    // only use for debug in internal

	  }, {
	    key: 'uninstallKernel',
	    value: function uninstallKernel(key) {
	      delete kernelsSet[key];
	    }
	  }, {
	    key: 'hasInstalledKernel',
	    value: function hasInstalledKernel(key) {
	      return isFunction_1(kernelsSet[key]);
	    }
	  }]);

	  return Dispatcher;
	}(), (_applyDecoratedDescriptor$6(_class$7.prototype, 'unuse', [_dec$7], _Object$getOwnPropertyDescriptor(_class$7.prototype, 'unuse'), _class$7.prototype), _applyDecoratedDescriptor$6(_class$7.prototype, 'throwError', [autobind], _Object$getOwnPropertyDescriptor(_class$7.prototype, 'throwError'), _class$7.prototype), _applyDecoratedDescriptor$6(_class$7, 'install', [_dec2$6], _Object$getOwnPropertyDescriptor(_class$7, 'install'), _class$7), _applyDecoratedDescriptor$6(_class$7, 'hasInstalled', [_dec3$5], _Object$getOwnPropertyDescriptor(_class$7, 'hasInstalled'), _class$7), _applyDecoratedDescriptor$6(_class$7, 'uninstall', [_dec4$5], _Object$getOwnPropertyDescriptor(_class$7, 'uninstall'), _class$7), _applyDecoratedDescriptor$6(_class$7, 'getPluginConfig', [_dec5$4], _Object$getOwnPropertyDescriptor(_class$7, 'getPluginConfig'), _class$7)), _class$7));

	var _class$8, _descriptor$1;

	function _initDefineProp$1(target, property, descriptor, context) {
	  if (!descriptor) return;

	  _Object$defineProperty(target, property, {
	    enumerable: descriptor.enumerable,
	    configurable: descriptor.configurable,
	    writable: descriptor.writable,
	    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	  });
	}

	function _applyDecoratedDescriptor$7(target, property, decorators, descriptor, context) {
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
	var GlobalConfig = (_class$8 = function () {
	  _createClass(GlobalConfig, [{
	    key: 'silent',
	    get: function get() {
	      return this._silent;
	    },
	    set: function set(val) {
	      var _this = this;

	      val = !!val;
	      this._silent = val;
	      _Object$keys(this.log).forEach(function (key) {
	        _this.log[key] = !val;
	      });
	    }
	  }, {
	    key: 'useStyleFullscreen',
	    get: function get() {
	      return index.useStyleFirst;
	    },
	    set: function set(val) {
	      index.useStyleFirst = !!val;
	    }
	  }]);

	  function GlobalConfig() {
	    _classCallCheck(this, GlobalConfig);

	    this.log = {
	      error: true,
	      info: true,
	      warn: true,
	      debug: true,
	      verbose: true
	    };

	    _initDefineProp$1(this, '_silent', _descriptor$1, this);

	    this.errorHandler = undefined;

	    var props = _Object$keys(this.log).reduce(function (props, key) {
	      props[key] = accessor({
	        get: function get() {
	          // $FlowFixMe: we have check the keys
	          return Log['ENABLE_' + key.toUpperCase()];
	        },
	        set: function set(val) {
	          // $FlowFixMe: we have check the keys
	          Log['ENABLE_' + key.toUpperCase()] = val;
	          if (val === true) this.silent = false;
	          return val;
	        }
	      });
	      return props;
	    }, {});
	    applyDecorators(this.log, props, { self: true });
	  }

	  return GlobalConfig;
	}(), (_descriptor$1 = _applyDecoratedDescriptor$7(_class$8.prototype, '_silent', [nonenumerable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	})), _class$8);

	var _global$1 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core$1 = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1$1 = _core$1.version;

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject$1 = function (it) {
	  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$3 = _global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
	var _domCreate$1 = function (it) {
	  return is$1 ? document$3.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!_isObject$1(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$4 = Object.defineProperty;

	var f$8 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject$1(O);
	  P = _toPrimitive$1(P, true);
	  _anObject$1(Attributes);
	  if (_ie8DomDefine$1) try {
	    return dP$4(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp$1 = {
		f: f$8
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$e = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$e.call(it, key);
	};

	var id$2 = 0;
	var px$1 = Math.random();
	var _uid$1 = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$2 + px$1).toString(36));
	};

	var _redefine$1 = createCommonjsModule(function (module) {
	var SRC = _uid$1('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core$1.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has$1(val, 'name') || _hide$1(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has$1(val, SRC) || _hide$1(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global$1) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide$1(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide$1(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx$1 = function (fn, that, length) {
	  _aFunction$1(fn);
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

	var PROTOTYPE$3 = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] || (_global$1[name] = {}) : (_global$1[name] || {})[PROTOTYPE$3];
	  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
	  var expProto = exports[PROTOTYPE$3] || (exports[PROTOTYPE$3] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx$1(out, _global$1) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
	    // extend global
	    if (target) _redefine$1(target, key, out, type & $export$1.U);
	    // export
	    if (exports[key] != out) _hide$1(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global$1.core = _core$1;
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export$1 = $export$1;

	// https://github.com/tc39/proposal-global


	_export$1(_export$1.G, { global: _global$1 });

	var global$1 = _core$1.global;

	var _dec$8, _class$9, _class2$2, _descriptor$2, _descriptor2$1, _descriptor3$1, _init, _init2, _init3, _init4, _init5, _init6, _init7, _init8, _init9, _class3, _temp;

	function _initDefineProp$2(target, property, descriptor, context) {
	  if (!descriptor) return;

	  _Object$defineProperty(target, property, {
	    enumerable: descriptor.enumerable,
	    configurable: descriptor.configurable,
	    writable: descriptor.writable,
	    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	  });
	}

	function _applyDecoratedDescriptor$8(target, property, decorators, descriptor, context) {
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

	var Chimee = (_dec$8 = autobindClass(), _dec$8(_class$9 = (_class2$2 = (_temp = _class3 = function (_VideoWrapper) {
	  _inherits(Chimee, _VideoWrapper);

	  _createClass(Chimee, null, [{
	    key: 'registerEvents',


	    // In some situation, we may have custom events
	    // For example, we may have a custom kernel event
	    // We can register the event through this method
	    value: function registerEvents() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          name = _ref.name,
	          target = _ref.target;

	      if (!name || !isString(name)) throw new Error('The event name must be a string, but not ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
	      if (!target || !isString(target)) throw new Error('The event target must be a string, but not ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)));
	      if (target === 'kernel') {
	        kernelEvents.push(name);
	      }
	    }
	  }]);

	  function Chimee(config) {
	    _classCallCheck(this, Chimee);

	    /* istanbul ignore if */
	    var _this = _possibleConstructorReturn(this, (Chimee.__proto__ || _Object$getPrototypeOf(Chimee)).call(this));

	    _this.destroyed = false;

	    _initDefineProp$2(_this, '__id', _descriptor$2, _this);

	    _initDefineProp$2(_this, 'version', _descriptor2$1, _this);

	    _initDefineProp$2(_this, 'config', _descriptor3$1, _this);

	    if (!global$1.Object.defineProperty) {
	      /* istanbul ignore next */
	      Log.error('Chimee', "We detect that this browser lack of Object.defineProperty. Chimee can't run on this browser");
	    }
	    /* istanbul ignore if */
	    if (!global$1.Promise) {
	      /* istanbul ignore next */
	      Log.error('Chimee', 'We detect that this browser lack of Promise. If you are running Chimee in old browser. Please make sure you have import polyfill such as babel-polyfill.');
	    }
	    if (isString(config) || isElement_1(config)) {
	      config = {
	        wrapper: config,
	        controls: true
	      };
	    } else if (isObject$1(config)) {
	      if (!config.wrapper) throw new Error('You must pass in an legal object');
	    } else {
	      throw new Error('You must pass in an Object containing wrapper or string or element to new a Chimee');
	    }
	    // $FlowFixMe: we have check wrapper here
	    _this.__dispatcher = new Dispatcher(config, _this);
	    _this.ready = _this.__dispatcher.ready;
	    _this.readySync = _this.__dispatcher.readySync;
	    _this.__wrapAsVideo(_this.__dispatcher.videoConfig);
	    return _this;
	  }

	  _createClass(Chimee, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.destroyed) return;
	      _get(Chimee.prototype.__proto__ || _Object$getPrototypeOf(Chimee.prototype), '__destroy', this).call(this);
	      this.__dispatcher.destroy();
	      // $FlowFixMe: normal obejct define
	      Object.defineProperty(this, '__dispatcher', {
	        get: function get$$1() {
	          throw new Error('This instance has been destroyed.');
	        },

	        enumerable: true,
	        configurable: true
	      });
	      this.destroyed = true;
	    }
	  }, {
	    key: 'use',
	    value: function use(option) {
	      return this.__dispatcher.use(option);
	    }
	  }, {
	    key: 'unuse',
	    value: function unuse(name) {
	      return this.__dispatcher.unuse(name);
	    }
	  }, {
	    key: '__throwError',
	    value: function __throwError(error) {
	      if (isString(error)) error = new Error(error);
	      var errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
	      if (isFunction_1(errorHandler)) return errorHandler(error);
	      if (Chimee.config.silent) return;
	      /* istanbul ignore else */
	      if (isError_1(error)) throw error;else console.error(error);
	    }
	  }]);

	  return Chimee;
	}(VideoWrapper), _class3.plugin = Plugin, _class3.config = new GlobalConfig(), _class3.install = Dispatcher.install, _class3.uninstall = Dispatcher.uninstall, _class3.hasInstalled = Dispatcher.hasInstalled, _class3.installKernel = Dispatcher.installKernel, _class3.uninstallKernel = Dispatcher.uninstallKernel, _class3.hasInstalledKernel = Dispatcher.hasInstalledKernel, _class3.getPluginConfig = Dispatcher.getPluginConfig, _temp), (_descriptor$2 = _applyDecoratedDescriptor$8(_class2$2.prototype, '__id', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return '_vm';
	  }
	}), _descriptor2$1 = _applyDecoratedDescriptor$8(_class2$2.prototype, 'version', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return '0.10.0-alpha.11';
	  }
	}), _descriptor3$1 = _applyDecoratedDescriptor$8(_class2$2.prototype, 'config', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return {
	      errorHandler: undefined
	    };
	  }
	}), _applyDecoratedDescriptor$8(_class2$2, 'plugin', [frozen], (_init = _Object$getOwnPropertyDescriptor(_class2$2, 'plugin'), _init = _init ? _init.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'config', [frozen], (_init2 = _Object$getOwnPropertyDescriptor(_class2$2, 'config'), _init2 = _init2 ? _init2.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init2;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'install', [frozen], (_init3 = _Object$getOwnPropertyDescriptor(_class2$2, 'install'), _init3 = _init3 ? _init3.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init3;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'uninstall', [frozen], (_init4 = _Object$getOwnPropertyDescriptor(_class2$2, 'uninstall'), _init4 = _init4 ? _init4.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init4;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'hasInstalled', [frozen], (_init5 = _Object$getOwnPropertyDescriptor(_class2$2, 'hasInstalled'), _init5 = _init5 ? _init5.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init5;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'installKernel', [frozen], (_init6 = _Object$getOwnPropertyDescriptor(_class2$2, 'installKernel'), _init6 = _init6 ? _init6.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init6;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'uninstallKernel', [frozen], (_init7 = _Object$getOwnPropertyDescriptor(_class2$2, 'uninstallKernel'), _init7 = _init7 ? _init7.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init7;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'hasInstalledKernel', [frozen], (_init8 = _Object$getOwnPropertyDescriptor(_class2$2, 'hasInstalledKernel'), _init8 = _init8 ? _init8.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init8;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'getPluginConfig', [frozen], (_init9 = _Object$getOwnPropertyDescriptor(_class2$2, 'getPluginConfig'), _init9 = _init9 ? _init9.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init9;
	  }
	}), _class2$2)), _class2$2)) || _class$9);

	return Chimee;

})));
