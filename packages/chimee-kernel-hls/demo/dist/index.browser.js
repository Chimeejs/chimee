(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.chimeeKernelFlv = factory());
}(this, (function () { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var toString = {}.toString;

var _cof = function(it){
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings

var _toIobject = function(it){
  return _iobject(_defined(it));
};

var f$1 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$1
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!_isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
});

var document$1 = _global.document;
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

var gOPD           = Object.getOwnPropertyDescriptor;

var f = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if(_ie8DomDefine)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(_has(O, P))return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f
};

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
});

var _aFunction = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function(fn, that, length){
  _aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var _anObject = function(it){
  if(!_isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

var dP             = Object.defineProperty;

var f$2 = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if(_ie8DomDefine)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f$2
};

var _hide = _descriptors ? function(object, key, value){
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? _core : _core[name] || (_core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
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
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])_hide(expProto, key, out);
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

var _objectSap = function(KEY, exec){
  var fn  = (_core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function(){ fn(1); }), 'Object', exp);
};

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var $getOwnPropertyDescriptor = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(_toIobject(it), key);
  };
});

var $Object = _core.Object;
var getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

var getOwnPropertyDescriptor = createCommonjsModule(function (module) {
module.exports = { "default": getOwnPropertyDescriptor$1, __esModule: true };
});

var _Object$getOwnPropertyDescriptor = unwrapExports(getOwnPropertyDescriptor);

// 7.1.13 ToObject(argument)

var _toObject = function(it){
  return Object(_defined(it));
};

var SHARED = '__core-js_shared__';
var store  = _global[SHARED] || (_global[SHARED] = {});
var _shared = function(key){
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');
var _sharedKey = function(key){
  return shared[key] || (shared[key] = _uid(key));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var IE_PROTO    = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function(O){
  O = _toObject(O);
  if(_has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

// 19.1.2.9 Object.getPrototypeOf(O)


_objectSap('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return _objectGpo(_toObject(it));
  };
});

var getPrototypeOf$1 = _core.Object.getPrototypeOf;

var getPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": getPrototypeOf$1, __esModule: true };
});

var _Object$getPrototypeOf = unwrapExports(getPrototypeOf);

var classCallCheck = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

var $Object$1 = _core.Object;
var defineProperty$1 = function defineProperty(it, key, desc){
  return $Object$1.defineProperty(it, key, desc);
};

var defineProperty = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$1, __esModule: true };
});

var createClass = createCommonjsModule(function (module, exports) {
"use strict";

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

// 7.1.4 ToInteger
var ceil  = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function(TO_STRING){
  return function(that, pos){
    var s = String(_defined(that))
      , i = _toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _redefine = _hide;

var _iterators = {};

// 7.1.15 ToLength
var min       = Math.min;
var _toLength = function(it){
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max       = Math.max;
var min$1       = Math.min;
var _toIndex = function(index, length){
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes

var _arrayIncludes = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = _toIobject($this)
      , length = _toLength(O.length)
      , index  = _toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$2     = _sharedKey('IE_PROTO');

var _objectKeysInternal = function(object, names){
  var O      = _toIobject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO$2)_has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(_has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O){
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
  _anObject(O);
  var keys   = _objectKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)_objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var _html = _global.document && document.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var IE_PROTO$1    = _sharedKey('IE_PROTO');
var Empty       = function(){ /* empty */ };
var PROTOTYPE$1   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe')
    , i      = _enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
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
  while(i--)delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty;
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store      = _shared('wks')
  , Symbol     = _global.Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;
var TAG = _wks('toStringTag');

var _setToStringTag = function(it, tag, stat){
  if(it && !_has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

var _iterCreate = function(Constructor, NAME, next){
  Constructor.prototype = _objectCreate(IteratorPrototype, {next: _propertyDesc(1, next)});
  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR       = _wks('iterator');
var BUGGY          = !([].keys && 'next' in [].keys());
var FF_ITERATOR    = '@@iterator';
var KEYS           = 'keys';
var VALUES         = 'values';

var returnThis = function(){ return this; };

var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  _iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = _objectGpo($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!_library && !_has(IteratorPrototype, ITERATOR))_hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))_redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at  = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

var _addToUnscopables = function(){ /* empty */ };

var _iterStep = function(done, value){
  return {value: value, done: !!done};
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind){
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return _iterStep(1);
  }
  if(kind == 'keys'  )return _iterStep(0, index);
  if(kind == 'values')return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var TO_STRING_TAG = _wks('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = _global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])_hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

var f$3 = _wks;

var _wksExt = {
	f: f$3
};

var iterator$2 = _wksExt.f('iterator');

var iterator = createCommonjsModule(function (module) {
module.exports = { "default": iterator$2, __esModule: true };
});

var _meta = createCommonjsModule(function (module) {
var META     = _uid('meta')
  , setDesc  = _objectDp.f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_fails(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!_isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!_has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!_has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !_has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
});

var defineProperty$3 = _objectDp.f;
var _wksDefine = function(name){
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty$3($Symbol, name, {value: _wksExt.f(name)});
};

var _keyof = function(object, el){
  var O      = _toIobject(object)
    , keys   = _objectKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

var f$4 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$4
};

// all enumerable object keys, includes symbols

var _enumKeys = function(it){
  var result     = _objectKeys(it)
    , getSymbols = _objectGops.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = _objectPie.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg){
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$6 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$6
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var gOPN$1      = _objectGopn.f;
var toString$1  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN$1(it);
  } catch(e){
    return windowNames.slice();
  }
};

var f$5 = function getOwnPropertyNames(it){
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
};

var _objectGopnExt = {
	f: f$5
};

// ECMAScript 6 symbols shim
var META           = _meta.KEY;
var gOPD$1           = _objectGopd.f;
var dP$2             = _objectDp.f;
var gOPN           = _objectGopnExt.f;
var $Symbol        = _global.Symbol;
var $JSON          = _global.JSON;
var _stringify     = $JSON && $JSON.stringify;
var PROTOTYPE$2      = 'prototype';
var HIDDEN         = _wks('_hidden');
var TO_PRIMITIVE   = _wks('toPrimitive');
var isEnum         = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols     = _shared('symbols');
var OPSymbols      = _shared('op-symbols');
var ObjectProto$1    = Object[PROTOTYPE$2];
var USE_NATIVE     = typeof $Symbol == 'function';
var QObject        = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function(){
  return _objectCreate(dP$2({}, 'a', {
    get: function(){ return dP$2(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if(protoDesc)delete ObjectProto$1[key];
  dP$2(it, key, D);
  if(protoDesc && it !== ObjectProto$1)dP$2(ObjectProto$1, key, protoDesc);
} : dP$2;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto$1)$defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if(_has(AllSymbols, key)){
    if(!D.enumerable){
      if(!_has(it, HIDDEN))dP$2(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(_has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _objectCreate(D, {enumerable: _propertyDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP$2(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if(this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key){
  it  = _toIobject(it);
  key = _toPrimitive(key, true);
  if(it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))return;
  var D = gOPD$1(it, key);
  if(D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(_toIobject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto$1
    , names  = gOPN(IS_OP ? OPSymbols : _toIobject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto$1)$set.call(OPSymbols, value);
      if(_has(this, HIDDEN) && _has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if(_descriptors && setter)setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString(){
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor$1;
  _objectDp.f   = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f  = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if(_descriptors && !_library){
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function(name){
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i$1 = 0; symbols.length > i$1; )_wks(symbols[i$1++]);

for(var symbols = _objectKeys(_wks.store), i$1 = 0; symbols.length > i$1; )_wksDefine(symbols[i$1++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return _keyof(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
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
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !_isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
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

var index = _core.Symbol;

var symbol = createCommonjsModule(function (module) {
module.exports = { "default": index, __esModule: true };
});

var _typeof_1 = createCommonjsModule(function (module, exports) {
"use strict";

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

var _typeof = unwrapExports(_typeof_1);

var possibleConstructorReturn = createCommonjsModule(function (module, exports) {
"use strict";

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

var check = function(O, proto){
  _anObject(O);
  if(!_isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', {setPrototypeOf: _setProto.set});

var setPrototypeOf$2 = _core.Object.setPrototypeOf;

var setPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": setPrototypeOf$2, __esModule: true };
});

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', {create: _objectCreate});

var $Object$2 = _core.Object;
var create$1 = function create(P, D){
  return $Object$2.create(P, D);
};

var create = createCommonjsModule(function (module) {
module.exports = { "default": create$1, __esModule: true };
});

var _Object$create = unwrapExports(create);

var inherits = createCommonjsModule(function (module, exports) {
"use strict";

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

// 19.1.2.14 Object.keys(O)


_objectSap('keys', function(){
  return function keys(it){
    return _objectKeys(_toObject(it));
  };
});

var keys$1 = _core.Object.keys;

var keys = createCommonjsModule(function (module) {
module.exports = { "default": keys$1, __esModule: true };
});

// 20.1.2.3 Number.isInteger(number)
var floor$1    = Math.floor;
var _isInteger = function isInteger(it){
  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
};

// 20.1.2.3 Number.isInteger(number)


_export(_export.S, 'Number', {isInteger: _isInteger});

var isInteger$2 = _core.Number.isInteger;

var isInteger$1 = createCommonjsModule(function (module) {
module.exports = { "default": isInteger$2, __esModule: true };
});

var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var space   = '[' + _stringWs + ']';
var non     = '\u200b\u0085';
var ltrim   = RegExp('^' + space + space + '*');
var rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = _fails(function(){
    return !!_stringWs[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  _export(_export.P + _export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(_defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

var _stringTrim = exporter;

var $parseFloat = _global.parseFloat;
var $trim       = _stringTrim.trim;

var _parseFloat$3 = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

// 20.1.2.12 Number.parseFloat(string)
_export(_export.S + _export.F * (Number.parseFloat != _parseFloat$3), 'Number', {parseFloat: _parseFloat$3});

var _parseFloat$1 = parseFloat;

var _parseFloat = createCommonjsModule(function (module) {
module.exports = { "default": _parseFloat$1, __esModule: true };
});

/**
 * toxic-predicate-functions v0.1.2
 * (c) 2017 toxic-johann
 * Released under MIT
 */

/**
 * is void element or not ? Means it will return true when val is undefined or null
 * @param  {Anything}  obj
 * @return {Boolean}   return true when val is undefined or null
 */
function isVoid(obj) {
  return obj === undefined || obj === null;
}
/**
 * to check whether a variable is array
 * @param {Anything} arr
 * @return {Boolean} true when it is a boolean
 */
function isArray$1(arr) {
  return Array.isArray(arr);
}

/**
 * 判断是否为function
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
function isFunction(obj) {
  return typeof obj === 'function';
}

/**
 * 判断是否是对象
 * @param  {Anything}  obj 传入对象
 * @return {Boolean}     [description]
 */
function isObject$1(obj) {
  // incase of arrow function and array
  return Object(obj) === obj && String(obj) === '[object Object]' && !isFunction(obj) && !isArray$1(obj);
}
/**
 * to tell you if it's a real number
 * @param  {Anything}  obj
 * @return {Boolean}   return true when it's a number
 */
function isNumber(obj) {
  return typeof obj === 'number';
}
/**
 * 判断是否是string
 * @param  {Anything}  str [description]
 * @return {Boolean}     [description]
 */
function isString(str) {
  return typeof str === 'string' || str instanceof String;
}
/**
 * is Boolean or not
 * @param  {Anything} bool
 * @return {Boolean}
 */
function isBoolean(bool) {
  return typeof bool === 'boolean';
}
/**
 * is Primitive type or not, whick means it will return true when data is number/string/boolean/undefined/null
 * @param  {Anyting}  val
 * @return {Boolean}  true when type is number/string/boolean/undefined/null
 */
function isPrimitive(val) {
  return isVoid(val) || isBoolean(val) || isString(val) || isNumber(val);
}

/**
 * chimee-helper-log v0.1.1
 * (c) 2017 toxic-johann
 * Released under MIT
 */

function formatter(tag, msg) {
  if (!isString(tag)) throw new TypeError("Log's method only acccept string as argument");
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

      (console.error || console.warn || console.log)(formatter(tag, msg));
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
      (console.info || console.log)(formatter(tag, msg));
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
      (console.warn || console.log)(formatter(tag, msg));
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
      (console.debug || console.log)(formatter(tag, msg));
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

// call something on iterator step with safe closing on error

var _iterCall = function(iterator, fn, value, entries){
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)_anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator
var ITERATOR$1   = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function(it){
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var _createProperty = function(object, index, value){
  if(index in object)_objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

// getting tag from 19.1.3.6 Object.prototype.toString()
var TAG$1 = _wks('toStringTag');
var ARG = _cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

var _classof = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$2  = _wks('iterator');
var core_getIteratorMethod = _core.getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var ITERATOR$3     = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

var _iterDetect = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR$3]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR$3] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = _toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = core_getIteratorMethod(O)
      , length, result, step, iterator;
    if(mapping)mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && _isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for(result = new C(length); length > index; index++){
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from$1 = _core.Array.from;

var from = createCommonjsModule(function (module) {
module.exports = { "default": from$1, __esModule: true };
});

var _Array$from = unwrapExports(from);

var toConsumableArray = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _from2 = _interopRequireDefault(from);

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
 * toxic-utils v0.1.5
 * (c) 2017 toxic-johann
 * Released under MIT
 */

/**
 * the handler to generate an deep traversal handler
 * @param  {Function} fn the function you wanna run when you reach in the deep property
 * @return {Function}    the handler
 */
function genTraversalHandler(fn) {
  function recursiveFn(source, target, key) {
    if (isArray$1(source) || isObject$1(source)) {
      target = target || (isObject$1(source) ? {} : []);
      for (var _key in source) {
        target[_key] = recursiveFn(source[_key], target[_key], _key);
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

var _anInstance = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

var _forOf = createCommonjsModule(function (module) {
var BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : core_getIteratorMethod(iterable)
    , f      = _ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(_isArrayIter(iterFn))for(length = _toLength(iterable.length); length > index; index++){
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = _iterCall(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var SPECIES   = _wks('species');
var _speciesConstructor = function(O, D){
  var C = _anObject(O).constructor, S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
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
  } return              fn.apply(that, args);
};

var process$1            = _global.process;
var setTask            = _global.setImmediate;
var clearTask          = _global.clearImmediate;
var MessageChannel     = _global.MessageChannel;
var counter            = 0;
var queue              = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer;
var channel;
var port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_cof(process$1) == 'process'){
    defer = function(id){
      process$1.nextTick(_ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts){
    defer = function(id){
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in _domCreate('script')){
    defer = function(id){
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function(){
        _html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set:   setTask,
  clear: clearTask
};

var macrotask = _task.set;
var Observer  = _global.MutationObserver || _global.WebKitMutationObserver;
var process$2   = _global.process;
var Promise   = _global.Promise;
var isNode$2    = _cof(process$2) == 'process';

var _microtask = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode$2 && (parent = process$2.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode$2){
    notify = function(){
      process$2.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

var _redefineAll = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

var SPECIES$1     = _wks('species');

var _setSpecies = function(KEY){
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if(_descriptors && C && !C[SPECIES$1])_objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function(){ return this; }
  });
};

var task               = _task.set;
var microtask          = _microtask();
var PROMISE            = 'Promise';
var TypeError$1          = _global.TypeError;
var process            = _global.process;
var $Promise           = _global[PROMISE];
var process            = _global.process;
var isNode$1             = _classof(process) == 'process';
var empty              = function(){ /* empty */ };
var Internal;
var GenericPromiseCapability;
var Wrapper;

var USE_NATIVE$1 = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[_wks('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError$1('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject  = _aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError$1('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(_global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode$1){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = _global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = _global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(_global, function(){
    var handler;
    if(isNode$1){
      process.emit('rejectionHandled', promise);
    } else if(handler = _global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError$1("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE$1){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
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
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode$1 ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject  = _ctx($reject, promise, 1);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, {Promise: $Promise});
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * (_library || !USE_NATIVE$1), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      _forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      _forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

var promise$1 = _core.Promise;

var promise = createCommonjsModule(function (module) {
module.exports = { "default": promise$1, __esModule: true };
});

/**
 * chimee-helper-utils v0.1.3
 * (c) 2017 toxic-johann
 * Released under MIT
 */

// **********************  judgement   ************************
/**
 * check if the code running in browser environment (not include worker env)
 * @returns {Boolean}
 */
var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

/**
 * 函数节流（控制函数执行频率）
 * @param  {Function} func 要节流控制的函数，必填
 * @return {Number}   wait 等待时长
 * @return {Object}   options {
 *                      leading<是否首次调用立即执行，否：则按wait设定等待到期后调用才执行>:false,
 *                      trailing<是否在调用并未到期时启用定时器，以保证一定执行>:true
 *                    }
 * @return {Object}   cxt 上下文对象
 * @return {Function}
 */
function throttle(func, wait, options, cxt) {
  /* options的默认值
   *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true;
   * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
   */
  var context = void 0,
      args = void 0,
      result = void 0;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function later() {
    previous = options.leading === false ? 0 : new Date() - 0;
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  wait = wait || 0;
  return function () {
    var now = new Date();
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    var remaining = wait - (now - previous);
    if (cxt) {
      context = cxt;
    } else {
      context = this;
    }

    args = arguments;
    // 当到达wait指定的时间间隔，则调用func函数
    // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
    if (remaining <= 0 || remaining > wait) {
      // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // options.trailing=true时，延时执行func函数
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

// 19.1.2.1 Object.assign(target, source, ...)
var $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = _toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = _objectGops.f
    , isEnum     = _objectPie.f;
  while(aLen > index){
    var S      = _iobject(arguments[index++])
      , keys   = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', {assign: _objectAssign});

var assign$1 = _core.Object.assign;

var assign = createCommonjsModule(function (module) {
module.exports = { "default": assign$1, __esModule: true };
});

var _Object$assign = unwrapExports(assign);

/**
 * chimee-helper-events v0.1.0
 * (c) 2017 toxic-johann
 * Released under MIT
 */

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
  function CustEvent(target, assign$$1) {
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
      if (assign$$1) {
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
 * chimee-helper-dom v0.1.1
 * (c) 2017 huzunjie
 * Released under MIT
 */

/**
 * chimee-helper-events v0.1.0
 * (c) 2017 toxic-johann
 * Released under MIT
 */

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
var _evtListenerCache$1 = _Object$create(null);
_evtListenerCache$1.count = 0;

/**
 * 得到某对象的某事件类型对应的监听队列数组
 * @param  {Object}  target 发生事件的对象
 * @param {String} type 事件类型(这里的时间类型不只是名称，还是缓存标识，可以通过添加后缀来区分)
 * @return {Array}
 */
function getEvtTypeCache$1(target, type) {

  var evtId = target.__evt_id;
  if (!evtId) {

    /* 设置__evt_id不可枚举 */
    Object.defineProperty(target, '__evt_id', {
      writable: true,
      enumerable: false,
      configurable: true
    });

    /* 空对象初始化绑定索引 */
    evtId = target.__evt_id = ++_evtListenerCache$1.count;
  }

  var typeCacheKey = evtId + '_' + type;
  var evtTypeCache = _evtListenerCache$1[typeCacheKey];
  if (!evtTypeCache) {
    evtTypeCache = _evtListenerCache$1[typeCacheKey] = [];
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
function emitEventCache$1(target, type, eventObj) {
  var evt = _Object$create(null);
  evt.type = type;
  evt.target = target;
  if (eventObj) {
    _Object$assign(evt, isObject$1(eventObj) ? eventObj : { data: eventObj });
  }
  getEvtTypeCache$1(target, type).forEach(function (item) {
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
function addEventCache$1(target, type, handler) {
  var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var handlerWrap = arguments[4];

  if (isFunction(isOnce) && !handlerWrap) {
    handlerWrap = isOnce;
    isOnce = undefined;
  }
  var handlers = [handler, undefined, isOnce];
  if (isOnce && !handlerWrap) {
    handlerWrap = function handlerWrap() {
      removeEventCache$1(target, type, handler, isOnce);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      handler.apply(target, args);
    };
  }
  if (handlerWrap) {
    handlers[1] = handlerWrap;
  }
  getEvtTypeCache$1(target, type).push(handlers);
}

/**
 * 移除事件监听
 * @param  {Object}  target 发生事件的对象
 * @param {String} type 事件类型
 * @param {Function} handler 监听函数
 * @return {undefined}
 */
function removeEventCache$1(target, type, handler) {
  var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var typeCache = getEvtTypeCache$1(target, type);

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
var CustEvent$1 = function () {
  function CustEvent(target, assign$$1) {
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
      if (assign$$1) {
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

      addEventCache$1(this.__target, type, handler, isOnce);
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

      removeEventCache$1(this.__target, type, handler, isOnce);
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
      emitEventCache$1(this.__target, type, { data: data });
      return this;
    }
  }]);

  return CustEvent;
}();

/**
 * chimee-helper-utils v0.1.1
 * (c) 2017 toxic-johann
 * Released under MIT
 */

// **********************  judgement   ************************
/**
 * check if the code running in browser environment (not include worker env)
 * @returns {Boolean}
 */
var inBrowser$1 = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

// **********************  对象操作  ************************
/**
 * 转变一个类数组对象为数组
 */
function makeArray$1(obj) {
  return _Array$from(obj);
}

/**
* @module dom
* @author huzunjie
* @description 一些常用的DOM判断及操作方法，可以使用dom.$('*')包装DOM，实现类jQuery的链式操作；当然这里的静态方法也可以直接使用。
*/

var _divEl = document.createElement('div');
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

  if (once) {
    /* 尝试从缓存中读取包装后的方法 */
    var handlerWrap = removeEventCache$1(el, type + '_once', handler);
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
 * @param {Boolean} capture 是否在捕获阶段监听
 */
function addEvent(el, type, handler) {
  var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

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
    addEventCache$1(el, type + '_once', oldHandler, handler);
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


  var handlerWrap = function handlerWrap(e) {
    var targetEls = findParents(e.srcElement, el, true);
    var targetEl = query(selector, el, true).find(function (seEl) {
      return targetEls.find(function (tgEl) {
        return seEl === tgEl;
      });
    });
    targetEl && handler.apply(targetEl, arguments);
  };
  /* 将包装后的方法记录到缓存中 */
  addEventCache$1(el, type + '_delegate_' + selector, handler, handlerWrap);
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

  /* 尝试从缓存中读取包装后的方法 */
  var handlerWrap = removeEventCache$1(el, type + '_delegate_' + selector, handler);
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
 * 根据选择器查询并得到目标元素的wrap包装器
 * @param {String} selector 选择器,另外支持 HTMLString||NodeList||NodeArray||HTMLElement
 * @param {HTMLElement} container 父容器
 * @return {Object}
 */
function $(selector, container) {
  return selector.constructor === NodeWrap ? selector : new NodeWrap(selector, container);
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
      elsArr = makeArray$1(selector);
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
  }, {
    key: 'push',


    /**
     * 添加元素到DOM集合
     * @param {HTMLElement} el 要加入的元素
     * @return {this}
     */
    value: function push() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      _arrPrototype.push.apply(this, args);
      return this;
    }
  }, {
    key: 'splice',


    /**
     * 截取DOM集合片段，并得到新的包装器splice
     * @param {Nubmer} start
     * @param {Nubmer} count
     * @return {NodeWrap} 新的DOM集合包装器
     */
    value: function splice() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return $(_arrPrototype.splice.apply(this, args));
    }
  }, {
    key: 'find',


    /**
     * 查找子元素
     * @param {String} selector 选择器
     * @return {NodeWrap} 新的DOM集合包装器
     */
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

/**
 * chimee-helper v0.1.12
 * (c) 2017 toxic-johann
 * Released under MIT
 */

var MSEController = function (_CustEvent) {
  _inherits(MSEController, _CustEvent);

  /**
   * mediasource 控制层
   * @class mediasource
   * @param {Element} videoElement
   * @param {object} config
   */
  function MSEController(videoElement, config) {
    _classCallCheck(this, MSEController);

    var _this = _possibleConstructorReturn(this, (MSEController.__proto__ || _Object$getPrototypeOf(MSEController)).call(this));

    _this.video = videoElement;
    _this.config = config;
    _this.tag = 'mse-controller';
    _this.e = {
      onSourceOpen: _this.onSourceOpen.bind(_this),
      onSourceEnded: _this.onSourceEnded.bind(_this),
      onSourceClose: _this.onSourceClose.bind(_this),
      onSourceBufferError: _this.onSourceBufferError.bind(_this)
    };
    _this.queue = [];
    _this.removeRangesList = [];
    _this.removeBucketing = false;
    _this.mimeCodec = 'video/mp4; codecs="avc1.640020,mp4a.40.2"';
    _this.init();
    return _this;
  }

  /**
   * 初始化 控制层
   */


  _createClass(MSEController, [{
    key: 'init',
    value: function init() {
      if (this.mediaSource) {
        Log.Error(this.tag, 'MediaSource has been attached to an HTMLMediaElement!');
        throw new Error('MediaSource has been attached to an HTMLMediaElement!');
      }
      var ms = this.mediaSource = new window.MediaSource();
      ms.addEventListener('sourceopen', this.e.onSourceOpen);
      ms.addEventListener('sourceended', this.e.onSourceEnded);
      ms.addEventListener('sourceclose', this.e.onSourceClose);
    }

    /**
     * mediaSource open
     */

  }, {
    key: 'onSourceOpen',
    value: function onSourceOpen() {
      var _this2 = this;

      Log.verbose(this.tag, 'MediaSource onSourceOpen');
      this.mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
      window.sou = this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec);
      this.sourceBuffer.addEventListener('error', this.e.onSourceBufferError);
      this.sourceBuffer.addEventListener('abort', function () {
        return console.log('sourceBuffer: abort');
      });
      this.sourceBuffer.addEventListener('updateend', function () {
        if (_this2.queue.length >= 1) {
          if (!_this2.sourceBuffer.updating) {
            if (_this2.needCleanupSourceBuffer()) {
              _this2.doCleanupSourceBuffer();
            } else {
              var data = _this2.queue.shift();
              _this2.appendBuffer(data);
            }
          }
        }
        _this2.emit('updateend');
      });
      this.emit('source_open');
      this.sourceBufferEvent();
    }

    /**
     * sourceBuffer 事件
     */

  }, {
    key: 'sourceBufferEvent',
    value: function sourceBufferEvent() {
      var _this3 = this;

      this.on('mediaSegment', function (handler) {
        var data = handler.data;
        // if(this.needCleanupSourceBuffer()) {
        //   this.doCleanupSourceBuffer();
        // }
        if (_this3.sourceBuffer.updating || _this3.queue.length > 0) {
          // console.log(new Uint8Array(data));
          _this3.queue.push(data);
        } else {
          _this3.appendBuffer(data);
        }
      });

      this.on('mediaSegmentInit', function (handler) {
        var data = handler.data;
        if (_this3.sourceBuffer.updating || _this3.queue.length > 0) {
          _this3.queue.push(data);
        } else {
          _this3.appendBuffer(data);
        }
      });
    }

    /**
     * 是否需要清除sourcebuffer 里的buffer
     */

  }, {
    key: 'needCleanupSourceBuffer',
    value: function needCleanupSourceBuffer() {
      var currentTime = this.video.currentTime;

      var sb = this.sourceBuffer;
      var buffered = sb.buffered;

      if (buffered.length >= 1) {
        if (currentTime - buffered.start(0) >= this.config.autoCleanupMaxBackwardDuration) {
          return true;
        }
      }
      return false;
    }

    /**
     * 清除buffer
     */

  }, {
    key: 'doCleanupSourceBuffer',
    value: function doCleanupSourceBuffer() {
      Log.verbose(this.tag, 'docleanBuffer');
      var currentTime = this.video.currentTime;
      var sb = this.sourceBuffer;
      var buffered = sb.buffered;
      var doRemove = false;
      for (var i = 0; i < buffered.length; i++) {
        var start = buffered.start(i);
        var end = buffered.end(i);

        if (start <= currentTime && currentTime < end + 3) {
          if (currentTime - start >= this.config.autoCleanupMaxBackwardDuration) {
            doRemove = true;
            var removeEnd = currentTime - this.config.autoCleanupMinBackwardDuration;
            this.removeRangesList.push({ start: start, end: removeEnd });
          }
        } else if (end < currentTime) {
          doRemove = true;
          this.removeRangesList.push({ start: start, end: end });
        }
      }
      if (doRemove && !this.sourceBuffer.updating) {
        this.cleanRangesList();
      }
    }

    /**
     * 清除bufferlist
     */

  }, {
    key: 'cleanRangesList',
    value: function cleanRangesList() {
      if (this.sourceBuffer.updating) {
        return;
      }
      var sb = this.sourceBuffer;
      while (this.removeRangesList.length && !sb.updating) {
        var ranges = this.removeRangesList.shift();
        sb.remove(ranges.start, ranges.end);
      }
    }

    /**
     * 往sourcebuffer里添加数据
     */

  }, {
    key: 'appendBuffer',
    value: function appendBuffer(data) {
      try {
        this.sourceBuffer.appendBuffer(data);
      } catch (e) {
        if (e.code === 22) {
          // chrome 大概会有350M
          Log.verbose(this.TAG, 'MediaSource bufferFull');
          this.emit('bufferFull');
        }
      }
    }

    /**
     * sourcebuffer 结束
     */

  }, {
    key: 'onSourceEnded',
    value: function onSourceEnded() {
      Log.verbose(this.TAG, 'MediaSource onSourceEnded');
    }

    /**
     * sourcebuffer 关闭
     */

  }, {
    key: 'onSourceClose',
    value: function onSourceClose() {
      Log.verbose(this.tag, 'MediaSource onSourceClose');
      if (this.mediaSource && this.e !== null) {
        this.mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
        this.mediaSource.removeEventListener('sourceended', this.e.onSourceEnded);
        this.mediaSource.removeEventListener('sourceclose', this.e.onSourceClose);
      }
    }

    /**
    * sourcebuffer 错误
    */

  }, {
    key: 'onSourceBufferError',
    value: function onSourceBufferError(e) {
      Log.Error(this.tag, 'SourceBuffer Error: ' + e);
    }

    /**
     * seek
     */

  }, {
    key: 'seek',
    value: function seek() {}

    /**
     * 销毁
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.mediaSource) {
        var ms = this.mediaSource;
        // pending segments should be discard
        this.queue = [];
        // remove all sourcebuffers
        var sb = this.sourceBuffer;
        if (sb) {
          if (ms.readyState !== 'closed') {
            ms.removeSourceBuffer(sb);
            sb.removeEventListener('error', this.e.onSourceBufferError);
            sb.removeEventListener('updateend', this.e.onSourceBufferUpdateEnd);
          }
          this.sourceBuffer = null;
        }
        if (ms.readyState === 'open') {
          try {
            ms.endOfStream();
          } catch (error) {
            Log.e(this.TAG, error.message);
          }
        }
        ms.removeEventListener('sourceopen', this.e.onSourceOpen);
        ms.removeEventListener('sourceended', this.e.onSourceEnded);
        ms.removeEventListener('sourceclose', this.e.onSourceClose);
        this.mediaSource = null;
      }

      if (this._mediaElement) {
        this._mediaElement.src = '';
        this._mediaElement.removeAttribute('src');
        this._mediaElement = null;
      }
      if (this._mediaSourceObjectURL) {
        window.URL.revokeObjectURL(this._mediaSourceObjectURL);
        this._mediaSourceObjectURL = null;
      }
    }
  }]);

  return MSEController;
}(CustEvent);

/**
* 处理range的静态函数
* author songguangyu
* emil 522963130@qq.com
*/
var handleRange = function (range) {
  var headers = {};
  var param = void 0;

  if (range.to !== -1) {
    param = 'bytes=' + range.from.toString() + '-' + range.to.toString();
  } else {
    param = 'bytes=' + range.from.toString() + '-';
  }
  headers['Range'] = param;

  return {
    headers: headers
  };
};

/**
* fetch firfox 直播 点播
* author songguangyu
* emil 522963130@qq.com
*/
/**
 * FetchLoader
 * @class FetchLoader
 * @param {string} video url
 * @param  {object} range.from range.to
 */

var FetchLoader = function (_CustEvent) {
	_inherits(FetchLoader, _CustEvent);

	_createClass(FetchLoader, null, [{
		key: 'isSupport',


		/**
    * broswer is support moz-chunk
    */
		value: function isSupport() {
			if (window.fetch && window.ReadableStream) {
				return true;
			} else {
				return false;
			}
		}
	}]);

	function FetchLoader(src, config) {
		_classCallCheck(this, FetchLoader);

		var _this = _possibleConstructorReturn(this, (FetchLoader.__proto__ || _Object$getPrototypeOf(FetchLoader)).call(this));

		_this.tag = 'fetch';
		_this.fetching = false;
		_this.config = config;
		_this.range = {
			from: 0,
			to: 500000
		};
		_this.src = src;
		_this.totalRange = null;
		_this.block = 500000;
		_this.reader = null;
		_this.requestAbort = false;
		_this.arrivalDataCallback = null;
		_this.bytesStart = 0;
		return _this;
	}
	/**
   * if don't need range don't set
   * @param  {object} range.from range.to
   */


	_createClass(FetchLoader, [{
		key: 'open',
		value: function open(range, keyframePoint) {
			var _this2 = this;

			this.requestAbort = false;
			var reqHeaders = new Headers();
			var r = range || { from: 0, to: -1 };

			if (!this.config.isLive) {
				this.range.from = r.from;
				this.range.to = r.to;
				var headers = handleRange(r).headers;
				for (var i in headers) {
					reqHeaders.append(i, headers[i]);
				}
			}
			if (keyframePoint) {
				this.bytesStart = 0;
			}
			this.req = new Request(this.src, { headers: reqHeaders });

			fetch(this.req).then(function (res) {
				if (res.ok) {
					var reader = res.body.getReader();
					return _this2.pump(reader, keyframePoint);
				}
			});
		}

		/**
    * pause video
    */

	}, {
		key: 'pause',
		value: function pause() {
			this.requestAbort = true;
		}

		/**
    * pump data
    */

	}, {
		key: 'pump',
		value: function pump(reader, keyframePoint) {
			var _this3 = this;

			// ReadableStreamReader
			return reader.read().then(function (result) {
				if (result.done) {
					Log.verbose(_this3.tag, 'play end');
					// trigger complete
				} else {
					if (_this3.requestAbort === true) {
						return reader.cancel();
					}
					var chunk = result.value.buffer;

					if (_this3.arrivalDataCallback) {
						_this3.arrivalDataCallback(chunk, _this3.bytesStart, keyframePoint);
						_this3.bytesStart += chunk.byteLength;
					}
					return _this3.pump(reader);
				}
			});
		}
	}]);

	return FetchLoader;
}(CustEvent);

/**
* XHR 点播
* author songguangyu
* emil 522963130@qq.com
*/
// import Log from 'helper/log';
/**
 * MozChunkLoader
 * @class MozChunkLoader
 * @param {string} video url
 * @param  {object} range.from range.to
 */

var RangeLoader = function (_CustEvent) {
  _inherits(RangeLoader, _CustEvent);

  _createClass(RangeLoader, null, [{
    key: 'isSupport',


    /**
    * broswer is support XMLHttpRequest
    */
    value: function isSupport() {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://example.com', true);
        xhr.responseType = 'arraybuffer';
        return xhr.responseType === 'arraybuffer';
      } catch (e) {
        return false;
      }
    }
  }]);

  function RangeLoader(src, config) {
    _classCallCheck(this, RangeLoader);

    var _this = _possibleConstructorReturn(this, (RangeLoader.__proto__ || _Object$getPrototypeOf(RangeLoader)).call(this));

    _this.tag = 'RangeLoader';
    _this.xhr = null;
    _this.src = src;
    _this.totalLength = null;
    _this.chunkSizeKB = 393216;
    _this.range = {};
    _this.bytesStart = 0;
    return _this;
  }
  /**
   * if don't need range don't set
   * @param  {object} range.from range.to
   */


  _createClass(RangeLoader, [{
    key: 'open',
    value: function open(range) {
      var xhr = this.xhr = new XMLHttpRequest();
      xhr.open('GET', this.src, true);
      xhr.responseType = 'arraybuffer';
      xhr.onreadystatechange = this.onReadyStateChange.bind(this);
      xhr.onprogress = this.onProgress.bind(this);
      xhr.onload = this.onLoad.bind(this);
      xhr.onerror = this.onXhrError.bind(this);
      var r = range || { from: 0, to: -1 };
      this.range.from = r.from;
      this.range.to = r.to;
      var headers = handleRange(r).headers;
      for (var i in headers) {
        xhr.setRequestHeader(i, headers[i]);
      }
      xhr.send();
    }

    /**
     * abort request
     */

  }, {
    key: 'abort',
    value: function abort() {
      this.xhr.onreadystatechange = null;
      this.xhr.onprogress = null;
      this.xhr.onload = null;
      this.xhr.onerror = null;
      this.xhr.abort();
      this.xhr = null;
    }

    /**
     * destroy xhr Object clean cache
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.xhr) {
        this.abort();
        this.xhr.onreadystatechange = null;
        this.xhr.onprogress = null;
        this.xhr.onload = null;
        this.xhr.onerror = null;
        this.xhr = null;
      }
      this.totalLength = null;
      this.bytesStart = null;
      this.range = {};
    }

    /**
     * xhr onReadyStateChange
     */

  }, {
    key: 'onReadyStateChange',
    value: function onReadyStateChange(e) {
      var xhr = this.xhr;
      if (xhr.readyState === 2) {
        if (xhr.status < 200 && xhr.status > 299) {
          var info = {
            from: this.range.from,
            to: this.range.to,
            url: this.src,
            msg: 'http Error: http code ' + xhr.status
          };
          this.emit(this.tag, info);
        }
      }
    }

    /**
     * xhr onProgress
     */

  }, {
    key: 'onProgress',
    value: function onProgress(e) {
      if (!this.totalLength) {
        this.totalLength = e.total;
        this.abort();
        this.open({ from: 0, to: this.chunkSizeKB });
      }
    }

    /**
     * xhr onLoad
     */

  }, {
    key: 'onLoad',
    value: function onLoad(e) {
      if (!this.totalLength) {
        return;
      }
      if (this.range.to < this.totalLength) {
        // this.open({from: this.range.to + 1, to: this.range.to + 1 + this.chunkSizeKB});
      }

      if (this.arrivalDataCallback) {
        var chunk = e.target.response;
        this.arrivalDataCallback(chunk, this.bytesStart);
        this.bytesStart += chunk.byteLength;
      }
    }

    /**
     * xhr onXhrError
     */

  }, {
    key: 'onXhrError',
    value: function onXhrError(e) {
      var info = {
        from: this.range.from,
        to: this.range.to,
        url: this.src,
        msg: e.constructor.name + ' ' + e.type
      };
      this.emit(this.tag, info);
    }
  }]);

  return RangeLoader;
}(CustEvent);

/**
* XHR firfox 直播 点播
* author songguangyu
* emil 522963130@qq.com
*/
// import Log from 'helper/log';
/**
 * MozChunkLoader
 * @class MozChunkLoader
 * @param {string} video url
 * @param  {object} range.from range.to
 */

var MozChunkLoader = function (_CustEvent) {
  _inherits(MozChunkLoader, _CustEvent);

  _createClass(MozChunkLoader, null, [{
    key: 'isSupport',


    /**
     * broswer is support moz-chunk
     */
    value: function isSupport() {
      try {
        var xhr = new XMLHttpRequest();
        // Firefox 37- requires .open() to be called before setting responseType
        xhr.open('GET', 'https://example.com', true);
        xhr.responseType = 'moz-chunked-arraybuffer';
        return xhr.responseType === 'moz-chunked-arraybuffer';
      } catch (e) {
        return false;
      }
    }
  }]);

  function MozChunkLoader(src, config) {
    _classCallCheck(this, MozChunkLoader);

    var _this = _possibleConstructorReturn(this, (MozChunkLoader.__proto__ || _Object$getPrototypeOf(MozChunkLoader)).call(this));

    _this.tag = 'mozChunkLoader';
    _this.xhr = null;
    _this.src = src;
    _this.config = config;
    _this.totalLength = null;
    _this.chunkSizeKB = 393216;
    _this.range = {};
    _this.bytesStart = 0;
    return _this;
  }
  /**
   * if don't need range don't set
   * @param  {object} range.from range.to
   */


  _createClass(MozChunkLoader, [{
    key: 'open',
    value: function open(range) {
      var xhr = this.xhr = new XMLHttpRequest();
      xhr.open('GET', this.src, true);
      xhr.responseType = 'moz-chunked-arraybuffer';
      xhr.onreadystatechange = this.onReadyStateChange.bind(this);
      xhr.onprogress = this.onProgress.bind(this);
      xhr.onload = this.onLoadEnd.bind(this);
      xhr.onerror = this.onXhrError.bind(this);
      if (!this.config.isLive) {
        var r = range || { from: 0, to: -1 };
        this.range.from = r.from;
        this.range.to = r.to;
        var headers = handleRange(r).headers;
        for (var i in headers) {
          xhr.setRequestHeader(i, headers[i]);
        }
      }
      xhr.send();
    }

    /**
     * abort request
     */

  }, {
    key: 'abort',
    value: function abort() {
      this.xhr.onreadystatechange = null;
      this.xhr.onprogress = null;
      this.xhr.onload = null;
      this.xhr.onerror = null;
      this.xhr.abort();
      this.xhr = null;
    }

    /**
     * destroy xhr Object clean cache
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.xhr) {
        this.abort();
        this.xhr.onreadystatechange = null;
        this.xhr.onprogress = null;
        this.xhr.onload = null;
        this.xhr.onerror = null;
        this.xhr = null;
      }
      this.totalLength = null;
      this.bytesStart = null;
      this.range = {};
    }

    /**
     * xhr onReadyStateChange
     */

  }, {
    key: 'onReadyStateChange',
    value: function onReadyStateChange(e) {
      var xhr = this.xhr;
      if (xhr.readyState === 2) {
        if (xhr.status < 200 && xhr.status > 299) {
          var info = {
            from: this.range.from,
            to: this.range.to,
            url: this.src,
            msg: 'http Error: http code ' + xhr.status
          };
          this.emit(this.tag, info);
        }
      }
    }

    /**
     * xhr onProgress
     */

  }, {
    key: 'onProgress',
    value: function onProgress(e) {
      if (!this.totalLength) {
        this.totalLength = e.total;
        if (e.total !== null && e.total !== 0) {
          this.totalLength = e.total;
        }
      }

      var chunk = e.target.response;
      this.arrivalDataCallback(chunk, this.bytesStart);
      this.bytesStart += chunk.byteLength;
    }

    /**
     * xhr onLoadEnd
     */

  }, {
    key: 'onLoadEnd',
    value: function onLoadEnd(e) {
      this.emit(this.tag, 'video load end');
    }

    /**
     * xhr onXhrError
     */

  }, {
    key: 'onXhrError',
    value: function onXhrError(e) {
      var info = {
        from: this.range.from,
        to: this.range.to,
        url: this.src,
        msg: e.constructor.name + ' ' + e.type
      };
      this.emit(this.tag, info);
    }
  }]);

  return MozChunkLoader;
}(CustEvent);

/**
* 处理range的静态函数
* author songguangyu
* emil 522963130@qq.com
*/

/**
 * Ioloader 处理io的调用器 缓存多余数据
 * @class Ioloader
 * @param  {object} video config
 */

var Ioloader = function (_CustEvent) {
	_inherits(Ioloader, _CustEvent);

	function Ioloader(config) {
		_classCallCheck(this, Ioloader);

		var _this = _possibleConstructorReturn(this, (Ioloader.__proto__ || _Object$getPrototypeOf(Ioloader)).call(this));

		_this.loader = null;
		_this.config = {};
		_Object$assign(_this.config, config);
		_this.selectLoader();
		_this.bufferSize = 1024 * 1024 * 3; // initial size: 3MB
		_this.cacheBuffer = new ArrayBuffer(_this.bufferSize);
		_this.cacheRemain = 0;
		_this.stashByteStart = 0;
		_this.enableStash = true;
		_this.stashSize = 1024 * 384;
		_this.resumeFrom = 0;
		_this.currentRange = {};
		_this.totalReceive = 0;
		_this.seekPonit = 0;
		_this.timer = null;
		return _this;
	}

	/**
 * 自动选择io处理器
 */


	_createClass(Ioloader, [{
		key: 'selectLoader',
		value: function selectLoader() {
			var config = this.config;
			var url = this.config.src;

			if (FetchLoader.isSupport()) {
				this.loader = new FetchLoader(url, config);
			} else if (MozChunkLoader.isSupport()) {
				this.loader = new MozChunkLoader(url, config);
			} else if (RangeLoader.isSupport()) {
				this.loader = new RangeLoader(url, config);
			}
			this.loader.arrivalDataCallback = this.onLoaderChunkArrival.bind(this);
		}

		/**
  * 数据接收器
  * @param  {arrayBuffer} chunk data
  * @param  {number} chunk byte postion
  */

	}, {
		key: 'onLoaderChunkArrival',
		value: function onLoaderChunkArrival(chunk, byteStart, keyframePoint) {
			if (keyframePoint) {
				this.seekPonit = keyframePoint;
			}
			if (this.arrivalDataCallback) {
				this.totalReceive += chunk.byteLength;

				if (this.cacheRemain === 0 && this.stashByteStart === 0) {
					// This is the first chunk after seek action
					this.stashByteStart = byteStart;
				}
				if (this.cacheRemain + chunk.byteLength <= this.stashSize) {
					// 小于cache大小 则看做数据太小 进行缓存 不进行下发
					var stashArray = new Uint8Array(this.cacheBuffer, 0, this.stashSize);
					stashArray.set(new Uint8Array(chunk), this.cacheRemain);
					this.cacheRemain += chunk.byteLength;
				} else {
					// 大于cache大小的 则把数据放入播放器 溢出数据进行缓存
					var _stashArray = new Uint8Array(this.cacheBuffer, 0, this.bufferSize);
					if (this.cacheRemain > 0) {
						// There're stash datas in buffer
						// dispatch the whole stashBuffer, and stash remain data
						// then append chunk to stashBuffer (stash)
						var buffer = this.cacheBuffer.slice(0, this.cacheRemain);
						var consumed = 0;
						if (this.seekPonit) {
							consumed = this.arrivalDataCallback(buffer, this.stashByteStart, this.seekPonit);
							this.seekPonit = 0;
						} else {
							consumed = this.arrivalDataCallback(buffer, this.stashByteStart);
						}
						// const consumed = this.arrivalDataCallback(buffer, this.stashByteStart, keyframePoint);
						if (consumed < buffer.byteLength) {
							if (consumed > 0) {
								var remainArray = new Uint8Array(buffer, consumed);
								_stashArray.set(remainArray, 0);
								this.cacheRemain = remainArray.byteLength;
								this.stashByteStart += consumed;
							}
						} else {
							this.cacheRemain = 0;
							this.stashByteStart += consumed;
						}
						if (this.cacheRemain + chunk.byteLength > this.bufferSize) {
							this.expandBuffer(this.cacheRemain + chunk.byteLength);
							_stashArray = new Uint8Array(this.cacheBuffer, 0, this.bufferSize);
						}
						_stashArray.set(new Uint8Array(chunk), this.cacheRemain);
						this.cacheRemain += chunk.byteLength;
					} else {
						// stash buffer empty, but chunkSize > stashSize (oh, holy shit)
						// dispatch chunk directly and stash remain data
						// const consumed = this.arrivalDataCallback(chunk, byteStart, keyframePoint);
						var _consumed = 0;
						if (this.seekPonit) {
							_consumed = this.arrivalDataCallback(chunk, byteStart, this.seekPonit);
							this.seekPonit = 0;
						} else {
							_consumed = this.arrivalDataCallback(chunk, byteStart);
						}
						if (_consumed < chunk.byteLength) {
							var remain = chunk.byteLength - _consumed;
							if (remain > this.bufferSize) {
								this.expandBuffer(remain);
								_stashArray = new Uint8Array(this.cacheBuffer, 0, this.bufferSize);
							}
							_stashArray.set(new Uint8Array(chunk, _consumed), 0);
							this.cacheRemain += remain;
							this.stashByteStart = byteStart + _consumed;
						}
					}
				}
			}
		}
		/**
  * 清空缓存buffer
  */

	}, {
		key: 'initCacheBuffer',
		value: function initCacheBuffer() {
			this.cacheBuffer = new ArrayBuffer(this.bufferSize);
		}

		/**
  * 动态扩展buffer存储器大小
  * @param  {number} chunk byte size
  */

	}, {
		key: 'expandBuffer',
		value: function expandBuffer(expectedBytes) {
			var bufferNewSize = this.bufferSize;
			// while (bufferNewSize < expectedBytes) {
			//   bufferNewSize *= 2;
			// }
			if (bufferNewSize < expectedBytes) {
				bufferNewSize = expectedBytes;
			}
			this.cacheBuffer = new ArrayBuffer(bufferNewSize);
			this.bufferSize = bufferNewSize;
		}

		/**
  * 暂停
  */

	}, {
		key: 'pause',
		value: function pause() {
			// if (this.cacheRemain !== 0) {
			//     this.resumeFrom = this.stashByteStart;
			//     this.currentRange.to = this.stashByteStart - 1;
			//   } else {
			//      this.resumeFrom = this.currentRange.to + 1;
			//   }
			this.loader.pause();
		}

		/**
  * 打开连接
  */

	}, {
		key: 'open',
		value: function open(StartBytes) {
			if (StartBytes === undefined) {
				StartBytes = 0;
			}
			this.loader.open({ from: StartBytes, to: -1 });
		}

		/**
  * 重新播放
  */

	}, {
		key: 'resume',
		value: function resume() {
			this.paused = false;
			var bytes = this.totalReceive;
			this.open(bytes);
		}

		/**
  * seek
  */

	}, {
		key: 'seek',
		value: function seek(bytes, dropCache, keyframePoint) {
			this.loader.open({ from: bytes, to: -1 }, keyframePoint);
		}

		/**
  * destory
  */

	}, {
		key: 'destroy',
		value: function destroy() {
			this.pause();
			this.cacheBuffer = null;
		}
	}]);

	return Ioloader;
}(CustEvent);

var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

var index$2 = function (fn, options) {
    var wkey;
    var cacheKeys = Object.keys(cache);

    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }

    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            Function(['require','module','exports'], '(' + fn + ')(self)'),
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        Function(['require'], (
            // try to call default if defined to also support babel esmodule
            // exports
            'var f = require(' + stringify(wkey) + ');' +
            '(f.default ? f.default : f)(self);'
        )),
        scache
    ];

    var workerSources = {};
    resolveSources(skey);

    function resolveSources(key) {
        workerSources[key] = true;

        for (var depPath in sources[key][1]) {
            var depKey = sources[key][1][depPath];
            if (!workerSources[depKey]) {
                resolveSources(depKey);
            }
        }
    }

    var src = '(' + bundleFn + ')({'
        + Object.keys(workerSources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])';

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var blob = new Blob([src], { type: 'text/javascript' });
    if (options && options.bare) { return blob; }
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};

/* eslint-disable */
var FlvTag = function () {
    function FlvTag() {
        _classCallCheck(this, FlvTag);

        this.tagType = -1;
        this.dataSize = -1;
        this.Timestamp = -1;
        this.StreamID = -1;
        this.body = -1;
        this.time = -1;
        this.arr = [];
    }

    _createClass(FlvTag, [{
        key: 'getTime',
        value: function getTime() {
            // this.Timestamp.pop();
            this.arr = [];
            for (var i = 0; i < this.Timestamp.length; i++) {
                this.arr.push(this.Timestamp[i].toString(16).length == 1 ? '0' + this.Timestamp[i].toString(16) : this.Timestamp[i].toString(16));
            }
            this.arr.pop();
            var time = this.arr.join('');
            this.time = parseInt(time, 16);
            return parseInt(time, 16);
        }
    }]);

    return FlvTag;
}();

/* eslint-disable */
function decodeUTF8$1(uint8array) {
    var out = [];
    var input = uint8array;
    var i = 0;
    var length = uint8array.length;

    while (i < length) {
        if (input[i] < 0x80) {
            out.push(String.fromCharCode(input[i]));
            ++i;
            continue;
        } else if (input[i] < 0xC0) {
            // fallthrough
        } else if (input[i] < 0xE0) {
            if (checkContinuation$1(input, i, 1)) {
                var ucs4 = (input[i] & 0x1F) << 6 | input[i + 1] & 0x3F;
                if (ucs4 >= 0x80) {
                    out.push(String.fromCharCode(ucs4 & 0xFFFF));
                    i += 2;
                    continue;
                }
            }
        } else if (input[i] < 0xF0) {
            if (checkContinuation$1(input, i, 2)) {
                var _ucs = (input[i] & 0xF) << 12 | (input[i + 1] & 0x3F) << 6 | input[i + 2] & 0x3F;
                if (_ucs >= 0x800 && (_ucs & 0xF800) !== 0xD800) {
                    out.push(String.fromCharCode(_ucs & 0xFFFF));
                    i += 3;
                    continue;
                }
            }
        } else if (input[i] < 0xF8) {
            if (checkContinuation$1(input, i, 3)) {
                var _ucs2 = (input[i] & 0x7) << 18 | (input[i + 1] & 0x3F) << 12 | (input[i + 2] & 0x3F) << 6 | input[i + 3] & 0x3F;
                if (_ucs2 > 0x10000 && _ucs2 < 0x110000) {
                    _ucs2 -= 0x10000;
                    out.push(String.fromCharCode(_ucs2 >>> 10 | 0xD800));
                    out.push(String.fromCharCode(_ucs2 & 0x3FF | 0xDC00));
                    i += 4;
                    continue;
                }
            }
        }
        out.push(String.fromCharCode(0xFFFD));
        ++i;
    }

    return out.join('');
}

function checkContinuation$1(uint8array, start, checkLength) {
    var array = uint8array;
    if (start + checkLength < array.length) {
        while (checkLength--) {
            if ((array[++start] & 0xC0) !== 0x80) return false;
        }
        return true;
    } else {
        return false;
    }
}

/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable */
// Exponential-Golomb buffer decoder
var ExpGolomb = function () {
    function ExpGolomb(uint8array) {
        _classCallCheck(this, ExpGolomb);

        this.TAG = this.constructor.name;

        this._buffer = uint8array;
        this._buffer_index = 0;
        this._total_bytes = uint8array.byteLength;
        this._total_bits = uint8array.byteLength * 8;
        this._current_word = 0;
        this._current_word_bits_left = 0;
    }

    _createClass(ExpGolomb, [{
        key: 'destroy',
        value: function destroy() {
            this._buffer = null;
        }
    }, {
        key: '_fillCurrentWord',
        value: function _fillCurrentWord() {
            var buffer_bytes_left = this._total_bytes - this._buffer_index;
            if (buffer_bytes_left <= 0) {
                throw new IllegalStateException('ExpGolomb: _fillCurrentWord() but no bytes available');
            }

            var bytes_read = Math.min(4, buffer_bytes_left);
            var word = new Uint8Array(4);
            word.set(this._buffer.subarray(this._buffer_index, this._buffer_index + bytes_read));
            this._current_word = new DataView(word.buffer).getUint32(0, false);

            this._buffer_index += bytes_read;
            this._current_word_bits_left = bytes_read * 8;
        }
    }, {
        key: 'readBits',
        value: function readBits(bits) {
            if (bits > 32) {
                throw new InvalidArgumentException('ExpGolomb: readBits() bits exceeded max 32bits!');
            }

            if (bits <= this._current_word_bits_left) {
                var _result = this._current_word >>> 32 - bits;
                this._current_word <<= bits;
                this._current_word_bits_left -= bits;
                return _result;
            }

            var result = this._current_word_bits_left ? this._current_word : 0;
            result = result >>> 32 - this._current_word_bits_left;
            var bits_need_left = bits - this._current_word_bits_left;

            this._fillCurrentWord();
            var bits_read_next = Math.min(bits_need_left, this._current_word_bits_left);

            var result2 = this._current_word >>> 32 - bits_read_next;
            this._current_word <<= bits_read_next;
            this._current_word_bits_left -= bits_read_next;

            result = result << bits_read_next | result2;
            return result;
        }
    }, {
        key: 'readBool',
        value: function readBool() {
            return this.readBits(1) === 1;
        }
    }, {
        key: 'readByte',
        value: function readByte() {
            return this.readBits(8);
        }
    }, {
        key: '_skipLeadingZero',
        value: function _skipLeadingZero() {
            var zero_count = void 0;
            for (zero_count = 0; zero_count < this._current_word_bits_left; zero_count++) {
                if ((this._current_word & 0x80000000 >>> zero_count) !== 0) {
                    this._current_word <<= zero_count;
                    this._current_word_bits_left -= zero_count;
                    return zero_count;
                }
            }
            this._fillCurrentWord();
            return zero_count + this._skipLeadingZero();
        }
    }, {
        key: 'readUEG',
        value: function readUEG() {
            // unsigned exponential golomb
            var leading_zeros = this._skipLeadingZero();
            return this.readBits(leading_zeros + 1) - 1;
        }
    }, {
        key: 'readSEG',
        value: function readSEG() {
            // signed exponential golomb
            var value = this.readUEG();
            if (value & 0x01) {
                return value + 1 >>> 1;
            } else {
                return -1 * (value >>> 1);
            }
        }
    }]);

    return ExpGolomb;
}();

/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable */
var SPSParser = function () {
    function SPSParser() {
        _classCallCheck(this, SPSParser);
    }

    _createClass(SPSParser, null, [{
        key: '_ebsp2rbsp',
        value: function _ebsp2rbsp(uint8array) {
            var src = uint8array;
            var src_length = src.byteLength;
            var dst = new Uint8Array(src_length);
            var dst_idx = 0;

            for (var i = 0; i < src_length; i++) {
                if (i >= 2) {
                    // Unescape: Skip 0x03 after 00 00
                    if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
                        continue;
                    }
                }
                dst[dst_idx] = src[i];
                dst_idx++;
            }

            return new Uint8Array(dst.buffer, 0, dst_idx);
        }
    }, {
        key: 'parseSPS',
        value: function parseSPS(uint8array) {
            var rbsp = SPSParser._ebsp2rbsp(uint8array);
            var gb = new ExpGolomb(rbsp);

            gb.readByte();
            var profile_idc = gb.readByte(); // profile_idc
            gb.readByte(); // constraint_set_flags[5] + reserved_zero[3]
            var level_idc = gb.readByte(); // level_idc
            gb.readUEG(); // seq_parameter_set_id

            var profile_string = SPSParser.getProfileString(profile_idc);
            var level_string = SPSParser.getLevelString(level_idc);
            var chroma_format_idc = 1;
            var chroma_format = 420;
            var chroma_format_table = [0, 420, 422, 444];
            var bit_depth = 8;

            if (profile_idc === 100 || profile_idc === 110 || profile_idc === 122 || profile_idc === 244 || profile_idc === 44 || profile_idc === 83 || profile_idc === 86 || profile_idc === 118 || profile_idc === 128 || profile_idc === 138 || profile_idc === 144) {

                chroma_format_idc = gb.readUEG();
                if (chroma_format_idc === 3) {
                    gb.readBits(1); // separate_colour_plane_flag
                }
                if (chroma_format_idc <= 3) {
                    chroma_format = chroma_format_table[chroma_format_idc];
                }

                bit_depth = gb.readUEG() + 8; // bit_depth_luma_minus8
                gb.readUEG(); // bit_depth_chroma_minus8
                gb.readBits(1); // qpprime_y_zero_transform_bypass_flag
                if (gb.readBool()) {
                    // seq_scaling_matrix_present_flag
                    var scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;
                    for (var i = 0; i < scaling_list_count; i++) {
                        if (gb.readBool()) {
                            // seq_scaling_list_present_flag
                            if (i < 6) {
                                SPSParser._skipScalingList(gb, 16);
                            } else {
                                SPSParser._skipScalingList(gb, 64);
                            }
                        }
                    }
                }
            }
            gb.readUEG(); // log2_max_frame_num_minus4
            var pic_order_cnt_type = gb.readUEG();
            if (pic_order_cnt_type === 0) {
                gb.readUEG(); // log2_max_pic_order_cnt_lsb_minus_4
            } else if (pic_order_cnt_type === 1) {
                gb.readBits(1); // delta_pic_order_always_zero_flag
                gb.readSEG(); // offset_for_non_ref_pic
                gb.readSEG(); // offset_for_top_to_bottom_field
                var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
                for (var _i = 0; _i < num_ref_frames_in_pic_order_cnt_cycle; _i++) {
                    gb.readSEG(); // offset_for_ref_frame
                }
            }
            gb.readUEG(); // max_num_ref_frames
            gb.readBits(1); // gaps_in_frame_num_value_allowed_flag

            var pic_width_in_mbs_minus1 = gb.readUEG();
            var pic_height_in_map_units_minus1 = gb.readUEG();

            var frame_mbs_only_flag = gb.readBits(1);
            if (frame_mbs_only_flag === 0) {
                gb.readBits(1); // mb_adaptive_frame_field_flag
            }
            gb.readBits(1); // direct_8x8_inference_flag

            var frame_crop_left_offset = 0;
            var frame_crop_right_offset = 0;
            var frame_crop_top_offset = 0;
            var frame_crop_bottom_offset = 0;

            var frame_cropping_flag = gb.readBool();
            if (frame_cropping_flag) {
                frame_crop_left_offset = gb.readUEG();
                frame_crop_right_offset = gb.readUEG();
                frame_crop_top_offset = gb.readUEG();
                frame_crop_bottom_offset = gb.readUEG();
            }

            var sar_width = 1,
                sar_height = 1;
            var fps = 0,
                fps_fixed = true,
                fps_num = 0,
                fps_den = 0;

            var vui_parameters_present_flag = gb.readBool();
            if (vui_parameters_present_flag) {
                if (gb.readBool()) {
                    // aspect_ratio_info_present_flag
                    var aspect_ratio_idc = gb.readByte();
                    var sar_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
                    var sar_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

                    if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
                        sar_width = sar_w_table[aspect_ratio_idc - 1];
                        sar_height = sar_h_table[aspect_ratio_idc - 1];
                    } else if (aspect_ratio_idc === 255) {
                        sar_width = gb.readByte() << 8 | gb.readByte();
                        sar_height = gb.readByte() << 8 | gb.readByte();
                    }
                }

                if (gb.readBool()) {
                    // overscan_info_present_flag
                    gb.readBool(); // overscan_appropriate_flag
                }
                if (gb.readBool()) {
                    // video_signal_type_present_flag
                    gb.readBits(4); // video_format & video_full_range_flag
                    if (gb.readBool()) {
                        // colour_description_present_flag
                        gb.readBits(24); // colour_primaries & transfer_characteristics & matrix_coefficients
                    }
                }
                if (gb.readBool()) {
                    // chroma_loc_info_present_flag
                    gb.readUEG(); // chroma_sample_loc_type_top_field
                    gb.readUEG(); // chroma_sample_loc_type_bottom_field
                }
                if (gb.readBool()) {
                    // timing_info_present_flag
                    var num_units_in_tick = gb.readBits(32);
                    var time_scale = gb.readBits(32);
                    fps_fixed = gb.readBool(); // fixed_frame_rate_flag

                    fps_num = time_scale;
                    fps_den = num_units_in_tick * 2;
                    fps = fps_num / fps_den;
                }
            }

            var sarScale = 1;
            if (sar_width !== 1 || sar_height !== 1) {
                sarScale = sar_width / sar_height;
            }

            var crop_unit_x = 0,
                crop_unit_y = 0;
            if (chroma_format_idc === 0) {
                crop_unit_x = 1;
                crop_unit_y = 2 - frame_mbs_only_flag;
            } else {
                var sub_wc = chroma_format_idc === 3 ? 1 : 2;
                var sub_hc = chroma_format_idc === 1 ? 2 : 1;
                crop_unit_x = sub_wc;
                crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
            }

            var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
            var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);

            codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
            codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;

            var present_width = Math.ceil(codec_width * sarScale);

            gb.destroy();
            gb = null;

            return {
                profile_string: profile_string, // baseline, high, high10, ...
                level_string: level_string, // 3, 3.1, 4, 4.1, 5, 5.1, ...
                bit_depth: bit_depth, // 8bit, 10bit, ...
                chroma_format: chroma_format, // 4:2:0, 4:2:2, ...
                chroma_format_string: SPSParser.getChromaFormatString(chroma_format),

                frame_rate: {
                    fixed: fps_fixed,
                    fps: fps,
                    fps_den: fps_den,
                    fps_num: fps_num
                },

                sar_ratio: {
                    width: sar_width,
                    height: sar_height
                },

                codec_size: {
                    width: codec_width,
                    height: codec_height
                },

                present_size: {
                    width: present_width,
                    height: codec_height
                }
            };
        }
    }, {
        key: '_skipScalingList',
        value: function _skipScalingList(gb, count) {
            var last_scale = 8,
                next_scale = 8;
            var delta_scale = 0;
            for (var i = 0; i < count; i++) {
                if (next_scale !== 0) {
                    delta_scale = gb.readSEG();
                    next_scale = (last_scale + delta_scale + 256) % 256;
                }
                last_scale = next_scale === 0 ? last_scale : next_scale;
            }
        }
    }, {
        key: 'getProfileString',
        value: function getProfileString(profile_idc) {
            switch (profile_idc) {
                case 66:
                    return 'Baseline';
                case 77:
                    return 'Main';
                case 88:
                    return 'Extended';
                case 100:
                    return 'High';
                case 110:
                    return 'High10';
                case 122:
                    return 'High422';
                case 244:
                    return 'High444';
                default:
                    return 'Unknown';
            }
        }
    }, {
        key: 'getLevelString',
        value: function getLevelString(level_idc) {
            return (level_idc / 10).toFixed(1);
        }
    }, {
        key: 'getChromaFormatString',
        value: function getChromaFormatString(chroma) {
            switch (chroma) {
                case 420:
                    return '4:2:0';
                case 422:
                    return '4:2:2';
                case 444:
                    return '4:4:4';
                default:
                    return 'Unknown';
            }
        }
    }]);

    return SPSParser;
}();

/* eslint-disable */
var le = function () {
    var buf = new ArrayBuffer(2);
    new DataView(buf).setInt16(0, 256, true); // little-endian write
    return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
}();

var flvDemux = function () {
    function flvDemux() {
        _classCallCheck(this, flvDemux);
    }

    _createClass(flvDemux, null, [{
        key: 'parseObject',
        value: function parseObject(arrayBuffer, dataOffset, dataSize) {

            var name = flvDemux.parseString(arrayBuffer, dataOffset, dataSize);
            var value = flvDemux.parseScript(arrayBuffer, dataOffset + name.size);
            var isObjectEnd = value.objectEnd;

            return {
                data: {
                    name: name.data,
                    value: value.data
                },
                size: value.size,
                objectEnd: isObjectEnd
            };
        }
    }, {
        key: 'parseVariable',
        value: function parseVariable(arrayBuffer, dataOffset, dataSize) {
            return flvDemux.parseObject(arrayBuffer, dataOffset, dataSize);
        }
    }, {
        key: 'parseLongString',
        value: function parseLongString(arrayBuffer, dataOffset, dataSize) {

            var v = new DataView(arrayBuffer, dataOffset);
            var length = v.getUint32(0, !le);

            var str = void 0;
            if (length > 0) {
                str = decodeUTF8$1(new Uint8Array(arrayBuffer, dataOffset + 4, length));
            } else {
                str = '';
            }

            return {
                data: str,
                size: 4 + length
            };
        }
    }, {
        key: 'parseDate',
        value: function parseDate(arrayBuffer, dataOffset, dataSize) {

            var v = new DataView(arrayBuffer, dataOffset);
            var timestamp = v.getFloat64(0, !le);
            var localTimeOffset = v.getInt16(8, !le);
            timestamp += localTimeOffset * 60 * 1000; // get UTC time

            return {
                data: new Date(timestamp),
                size: 8 + 2
            };
        }
    }, {
        key: 'parseString',
        value: function parseString(arrayBuffer, dataOffset, dataSize) {
            var v = new DataView(arrayBuffer, dataOffset);
            var length = v.getUint16(0, !le);
            var str = void 0;
            if (length > 0) {
                str = decodeUTF8$1(new Uint8Array(arrayBuffer, dataOffset + 2, length));
            } else {
                str = '';
            }
            return {
                data: str,
                size: 2 + length
            };
        }

        /**
         * 解析metadata
         */

    }, {
        key: 'parseMetadata',
        value: function parseMetadata(arr) {
            var name = flvDemux.parseScript(arr, 0);
            var value = flvDemux.parseScript(arr, name.size, arr.length - name.size);
            // return {}
            var data = {};
            data[name.data] = value.data;
            return data;
        }
    }, {
        key: 'parseScript',
        value: function parseScript(arr, offset, dataSize) {
            var dataOffset = offset;
            var object = {};
            var uint8 = new Uint8Array(arr);
            var buffer = uint8.buffer;
            var dv = new DataView(buffer, 0, dataSize);
            var value = null;
            var objectEnd = false;
            var type = dv.getUint8(dataOffset);
            dataOffset += 1;

            switch (type) {
                case 0:
                    // Number(Double) type
                    value = dv.getFloat64(dataOffset, !le);
                    dataOffset += 8;
                    break;
                case 1:
                    {
                        // Boolean type
                        var b = dv.getUint8(dataOffset);
                        value = !!b;
                        dataOffset += 1;
                        break;
                    }
                case 2:
                    {
                        // String type
                        // dataOffset += 1;
                        var amfstr = flvDemux.parseString(buffer, dataOffset);
                        value = amfstr.data;
                        dataOffset += amfstr.size;
                        break;
                    }
                case 3:

                    {
                        // Object(s) type
                        value = {};
                        var terminal = 0; // workaround for malformed Objects which has missing ScriptDataObjectEnd
                        if ((dv.getUint32(dataSize - 4, !le) & 0x00FFFFFF) === 9) {
                            terminal = 3;
                        }
                        while (dataOffset < dataSize - 4) {
                            // 4 === type(UI8) + ScriptDataObjectEnd(UI24)
                            var amfobj = flvDemux.parseObject(buffer, dataOffset, dataSize - offset - terminal);

                            if (amfobj.objectEnd) {
                                break;
                            }
                            value[amfobj.data.name] = amfobj.data.value;
                            // dataOffset += amfobj.size;
                            dataOffset = amfobj.size;
                        }
                        if (dataOffset <= dataSize - 3) {
                            var marker = v.getUint32(dataOffset - 1, !le) & 0x00FFFFFF;
                            if (marker === 9) {
                                dataOffset += 3;
                            }
                        }
                        break;
                    }
                case 8:
                    {
                        // ECMA array type (Mixed array)
                        value = {};
                        // dataOffset += 1;
                        dataOffset += 4; // ECMAArrayLength(UI32)
                        var _terminal = 0; // workaround for malformed MixedArrays which has missing ScriptDataObjectEnd
                        if ((dv.getUint32(dataSize - 4, !le) & 0x00FFFFFF) === 9) {
                            _terminal = 3;
                        }
                        while (dataOffset < dataSize - 8) {
                            // 8 === type(UI8) + ECMAArrayLength(UI32) + ScriptDataVariableEnd(UI24)
                            var amfvar = flvDemux.parseVariable(buffer, dataOffset);

                            if (amfvar.objectEnd) {
                                break;
                            }
                            value[amfvar.data.name] = amfvar.data.value;
                            dataOffset = amfvar.size;
                        }
                        if (dataOffset <= dataSize - 3) {
                            var _marker = dv.getUint32(dataOffset - 1, !le) & 0x00FFFFFF;
                            if (_marker === 9) {
                                dataOffset += 3;
                            }
                        }
                        break;
                    }
                case 9:
                    // ScriptDataObjectEnd
                    value = undefined;
                    dataOffset = 1;
                    objectEnd = true;
                    break;
                case 10:
                    {
                        // Strict array type
                        // ScriptDataValue[n]. NOTE: according to video_file_format_spec_v10_1.pdf
                        value = [];
                        var strictArrayLength = dv.getUint32(dataOffset, !le);
                        dataOffset += 4;
                        for (var i = 0; i < strictArrayLength; i++) {
                            var val = flvDemux.parseScript(buffer, dataOffset);
                            value.push(val.data);
                            dataOffset = val.size;
                        }
                        break;
                    }
                case 11:
                    {
                        // Date type
                        var date = flvDemux.parseDate(buffer, dataOffset + 1, dataSize - 1);
                        value = date.data;
                        dataOffset += date.size;
                        break;
                    }
                case 12:
                    {
                        // Long string type
                        var amfLongStr = flvDemux.parseString(buffer, dataOffset + 1, dataSize - 1);
                        value = amfLongStr.data;
                        dataOffset += amfLongStr.size;
                        break;
                    }
                default:
                    // ignore and skip
                    dataOffset = dataSize;
                    console.log('AMF', 'Unsupported AMF value type ' + type);
            }
            return {
                data: value,
                size: dataOffset
            };
        }
    }]);

    return flvDemux;
}();

/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable */
var MediaInfo = function () {
    function MediaInfo() {
        _classCallCheck(this, MediaInfo);

        this.mimeType = null;
        this.duration = null;

        this.hasAudio = null;
        this.hasVideo = null;
        this.audioCodec = null;
        this.videoCodec = null;
        this.audioDataRate = null;
        this.videoDataRate = null;

        this.audioSampleRate = null;
        this.audioChannelCount = null;

        this.width = null;
        this.height = null;
        this.fps = null;
        this.profile = null;
        this.level = null;
        this.chromaFormat = null;
        this.sarNum = null;
        this.sarDen = null;

        this.metadata = null;
        this.segments = null; // MediaInfo[]
        this.segmentCount = null;
        this.hasKeyframesIndex = null;
        this.keyframesIndex = null;
    }

    _createClass(MediaInfo, [{
        key: "isComplete",
        value: function isComplete() {
            var audioInfoComplete = this.hasAudio === false || this.hasAudio === true && this.audioCodec != null && this.audioSampleRate != null && this.audioChannelCount != null;

            var videoInfoComplete = this.hasVideo === false || this.hasVideo === true && this.videoCodec != null && this.width != null && this.height != null && this.fps != null && this.profile != null && this.level != null && this.chromaFormat != null && this.sarNum != null && this.sarDen != null;

            // keyframesIndex may not be present
            return this.mimeType != null && this.duration != null && this.metadata != null && this.hasKeyframesIndex != null && audioInfoComplete && videoInfoComplete;
        }
    }, {
        key: "isSeekable",
        value: function isSeekable() {
            return this.hasKeyframesIndex === true;
        }
    }]);

    return MediaInfo;
}();

var Error$1 = function Error(type) {
    _classCallCheck(this, Error);

    this.type = type;
};

/* eslint-disable */
var tagDemux = function () {
    function tagDemux() {
        _classCallCheck(this, tagDemux);

        this.TAG = this.constructor.name;

        this._config = {};

        this._onError = null;
        this._onMediaInfo = null;
        this._onTrackMetadata = null;
        this._onDataAvailable = null;

        this._dataOffset = 0;
        this._firstParse = true;
        this._dispatch = false;

        this._hasAudio = false;
        this._hasVideo = false;

        this._audioInitialMetadataDispatched = false;
        this._videoInitialMetadataDispatched = false;

        this._mediaInfo = new MediaInfo();
        this._mediaInfo.hasAudio = this._hasAudio;
        this._mediaInfo.hasVideo = this._hasVideo;
        this._metadata = null;
        this._audioMetadata = null;
        this._videoMetadata = null;

        this._naluLengthSize = 4;
        this._timestampBase = 0; // int32, in milliseconds
        this._timescale = 1000;
        this._duration = 0; // int32, in milliseconds
        this._durationOverrided = false;
        this._referenceFrameRate = {
            fixed: true,
            fps: 23.976,
            fps_num: 23976,
            fps_den: 1000
        };

        this._videoTrack = { type: 'video', id: 1, sequenceNumber: 0, addcoefficient: 2, samples: [], length: 0 };
        this._audioTrack = { type: 'audio', id: 2, sequenceNumber: 1, addcoefficient: 2, samples: [], length: 0 };

        this._littleEndian = function () {
            var buf = new ArrayBuffer(2);
            new DataView(buf).setInt16(0, 256, true); // little-endian write
            return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
        }();
    }

    _createClass(tagDemux, [{
        key: 'onMediaInfo',
        value: function onMediaInfo(callback) {
            this._onMediaInfo = callback;
        }
    }, {
        key: 'parseMetadata',
        value: function parseMetadata(arr) {
            var data = flvDemux.parseMetadata(arr);
            this._parseScriptData(data);
        }
    }, {
        key: '_parseScriptData',
        value: function _parseScriptData(obj) {
            var scriptData = obj;

            if (scriptData.hasOwnProperty('onMetaData')) {
                if (this._metadata) {
                    console.log(this.TAG, 'Found another onMetaData tag!');
                }
                this._metadata = scriptData;
                var onMetaData = this._metadata.onMetaData;

                if (typeof onMetaData.hasAudio === 'boolean') {
                    // hasAudio
                    this._hasAudio = onMetaData.hasAudio;
                    this._mediaInfo.hasAudio = this._hasAudio;
                }
                if (typeof onMetaData.hasVideo === 'boolean') {
                    // hasVideo
                    this._hasVideo = onMetaData.hasVideo;
                    this._mediaInfo.hasVideo = this._hasVideo;
                }
                if (typeof onMetaData.audiodatarate === 'number') {
                    // audiodatarate
                    this._mediaInfo.audioDataRate = onMetaData.audiodatarate;
                }
                if (typeof onMetaData.videodatarate === 'number') {
                    // videodatarate
                    this._mediaInfo.videoDataRate = onMetaData.videodatarate;
                }
                if (typeof onMetaData.width === 'number') {
                    // width
                    this._mediaInfo.width = onMetaData.width;
                }
                if (typeof onMetaData.height === 'number') {
                    // height
                    this._mediaInfo.height = onMetaData.height;
                }
                if (typeof onMetaData.duration === 'number') {
                    // duration
                    if (!this._durationOverrided) {
                        var duration = Math.floor(onMetaData.duration * this._timescale);
                        this._duration = duration;
                        this._mediaInfo.duration = duration;
                    }
                } else {
                    this._mediaInfo.duration = 0;
                }
                if (typeof onMetaData.framerate === 'number') {
                    // framerate
                    var fps_num = Math.floor(onMetaData.framerate * 1000);
                    if (fps_num > 0) {
                        var fps = fps_num / 1000;
                        this._referenceFrameRate.fixed = true;
                        this._referenceFrameRate.fps = fps;
                        this._referenceFrameRate.fps_num = fps_num;
                        this._referenceFrameRate.fps_den = 1000;
                        this._mediaInfo.fps = fps;
                    }
                }
                if (_typeof(onMetaData.keyframes) === 'object') {
                    // keyframes
                    this._mediaInfo.hasKeyframesIndex = true;
                    var keyframes = onMetaData.keyframes;
                    keyframes.times = onMetaData.times;
                    keyframes.filepositions = onMetaData.filepositions;
                    this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(keyframes);
                    onMetaData.keyframes = null; // keyframes has been extracted, remove it
                } else {
                    this._mediaInfo.hasKeyframesIndex = false;
                }
                this._dispatch = false;
                this._mediaInfo.metadata = onMetaData;
                console.log(this.TAG, 'Parsed onMetaData');
                // if (this._mediaInfo.isComplete()) {
                // this._onMediaInfo(this._mediaInfo);
                // }
                return this._mediaInfo;
            }
        }
    }, {
        key: '_parseKeyframesIndex',
        value: function _parseKeyframesIndex(keyframes) {
            var times = [];
            var filepositions = [];

            // ignore first keyframe which is actually AVC Sequence Header (AVCDecoderConfigurationRecord)
            for (var i = 1; i < keyframes.times.length; i++) {
                var time = this._timestampBase + Math.floor(keyframes.times[i] * 1000);
                times.push(time);
                filepositions.push(keyframes.filepositions[i]);
            }

            return {
                times: times,
                filepositions: filepositions
            };
        }

        /**
         * 传入tags输出moof和mdat
         *
         * @param {any} tags
         *
         * @memberof tagDemux
         */

    }, {
        key: 'moofTag',
        value: function moofTag(tags) {

            for (var i = 0; i < tags.length; i++) {
                this._dispatch = true;
                this.parseChunks(tags[i]);
                // console.log("tagTimestamp", tags[i].getTime(), tags[i]);
            }
            if (this._isInitialMetadataDispatched()) {
                if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
                    this._onDataAvailable(this._audioTrack, this._videoTrack);
                }
            }
        }
    }, {
        key: 'parseChunks',
        value: function parseChunks(flvtag) {

            switch (flvtag.tagType) {
                case 8:
                    // Audio
                    this._parseAudioData(flvtag.body.buffer, 0, flvtag.body.length, flvtag.getTime());
                    break;
                case 9:
                    // Video
                    this._parseVideoData(flvtag.body.buffer, 0, flvtag.body.length, flvtag.getTime(), 0);
                    break;
                case 18:
                    // ScriptDataObject
                    this.parseMetadata(flvtag.body);
                    break;
            }
        }
    }, {
        key: '_parseVideoData',
        value: function _parseVideoData(arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition) {
            if (tagTimestamp == this._timestampBase && this._timestampBase != 0) {
                throw new Error$1(tagTimestamp + this._timestampBase + '夭寿啦这个视频不是从0开始');
                // this.timestampBase(0);
            }
            if (dataSize <= 1) {
                console.log(this.TAG, 'Flv: Invalid video packet, missing VideoData payload!');
                return;
            }
            // 获取 video tag body 第一字节
            var spec = new Uint8Array(arrayBuffer, dataOffset, dataSize)[0];
            // 获取是否是关键帧
            var frameType = (spec & 240) >>> 4;
            // 获取编码格式
            var codecId = spec & 15;

            if (codecId !== 7) {
                throw new Error$1('Flv: Unsupported codec in video frame: ' + codecId);
                // return;
            }

            this._parseAVCVideoPacket(arrayBuffer, dataOffset + 1, dataSize - 1, tagTimestamp, tagPosition, frameType);
        }
    }, {
        key: '_parseAVCVideoPacket',
        value: function _parseAVCVideoPacket(arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType) {

            if (dataSize < 4) {
                console.log(this.TAG, 'Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
                return;
            }

            var le = this._littleEndian;
            // 获取 video tag body 第2字节到结尾
            var v = new DataView(arrayBuffer, dataOffset, dataSize);

            // IF CodecID == 7  AVCPacketType
            // 0 = AVC sequence header
            // 1 = AVC NALU
            // 2 = AVC end of sequence (lower level NALU sequence ender is not required or supported)
            var packetType = v.getUint8(0);
            // 3字节
            // IF AVCPacketType == 1
            //  Composition time offset
            // ELSE
            //  0
            var cts = v.getUint32(0, !le) & 0x00FFFFFF;

            // IF AVCPacketType == 0 AVCDecoderConfigurationRecord（AVC sequence header）
            // IF AVCPacketType == 1 One or more NALUs (Full frames are required)

            /**
             *AVCDecoderConfigurationRecord.包含着是H.264解码相关比较重要的sps和pps信息，
             *再给AVC解码器送数据 流之前一定要把sps和pps信息送出，否则的话解码器不能正常解码。
             *而且在解码器stop之后再次start之前，如seek、快进快退状态切换等，
             *都 需要重新送一遍sps和pps的信息.AVCDecoderConfigurationRecord在FLV文件中一般情况也是出现1次，
             *也就是第一个 video tag.
             */
            if (packetType === 0) {
                // AVCDecoderConfigurationRecord
                this._parseAVCDecoderConfigurationRecord(arrayBuffer, dataOffset + 4, dataSize - 4);
            } else if (packetType === 1) {
                // One or more Nalus
                this._parseAVCVideoData(arrayBuffer, dataOffset + 4, dataSize - 4, tagTimestamp, tagPosition, frameType, cts);
            } else if (packetType === 2) {
                // empty, AVC end of sequence
            } else {
                throw new Error$1('Flv: Invalid video packet type ' + packetType);
            }
        }

        /**
         * AVC 初始化
         */

    }, {
        key: '_parseAVCDecoderConfigurationRecord',
        value: function _parseAVCDecoderConfigurationRecord(arrayBuffer, dataOffset, dataSize) {
            if (dataSize < 7) {
                console.log(this.TAG, 'Flv: Invalid AVCDecoderConfigurationRecord, lack of data!');
                return;
            }

            var meta = this._videoMetadata;
            var track = this._videoTrack;
            var le = this._littleEndian;
            var v = new DataView(arrayBuffer, dataOffset, dataSize);

            if (!meta) {
                meta = this._videoMetadata = {};
                meta.type = 'video';
                meta.id = track.id;
                meta.timescale = this._timescale;
                meta.duration = this._duration;
            } else {
                if (typeof meta.avcc !== 'undefined') {
                    console.log(this.TAG, 'Found another AVCDecoderConfigurationRecord!');
                }
            }

            var version = v.getUint8(0); // configurationVersion
            var avcProfile = v.getUint8(1); // avcProfileIndication
            var profileCompatibility = v.getUint8(2); // profile_compatibility
            var avcLevel = v.getUint8(3); // AVCLevelIndication

            if (version !== 1 || avcProfile === 0) {
                this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord');
                return;
            }

            this._naluLengthSize = (v.getUint8(4) & 3) + 1; // lengthSizeMinusOne
            if (this._naluLengthSize !== 3 && this._naluLengthSize !== 4) {
                // holy shit!!!
                this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Strange NaluLengthSizeMinusOne: ' + (this._naluLengthSize - 1));
                return;
            }

            var spsCount = v.getUint8(5) & 31; // numOfSequenceParameterSets
            if (spsCount === 0 || spsCount > 1) {
                this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid H264 SPS count: ' + spsCount);
                return;
            }

            var offset = 6;

            for (var i = 0; i < spsCount; i++) {
                var len = v.getUint16(offset, !le); // sequenceParameterSetLength
                offset += 2;

                if (len === 0) {
                    continue;
                }

                // Notice: Nalu without startcode header (00 00 00 01)
                var sps = new Uint8Array(arrayBuffer, dataOffset + offset, len);
                offset += len;

                var config = SPSParser.parseSPS(sps);
                meta.codecWidth = config.codec_size.width;
                meta.codecHeight = config.codec_size.height;
                meta.presentWidth = config.present_size.width;
                meta.presentHeight = config.present_size.height;

                meta.profile = config.profile_string;
                meta.level = config.level_string;
                meta.bitDepth = config.bit_depth;
                meta.chromaFormat = config.chroma_format;
                meta.sarRatio = config.sar_ratio;
                meta.frameRate = config.frame_rate;

                if (config.frame_rate.fixed === false || config.frame_rate.fps_num === 0 || config.frame_rate.fps_den === 0) {
                    meta.frameRate = this._referenceFrameRate;
                }

                var fps_den = meta.frameRate.fps_den;
                var fps_num = meta.frameRate.fps_num;
                meta.refSampleDuration = Math.floor(meta.timescale * (fps_den / fps_num));

                var codecArray = sps.subarray(1, 4);
                var codecString = 'avc1.';
                for (var j = 0; j < 3; j++) {
                    var h = codecArray[j].toString(16);
                    if (h.length < 2) {
                        h = '0' + h;
                    }
                    codecString += h;
                }
                meta.codec = codecString;

                var mi = this._mediaInfo;
                mi.width = meta.codecWidth;
                mi.height = meta.codecHeight;
                mi.fps = meta.frameRate.fps;
                mi.profile = meta.profile;
                mi.level = meta.level;
                mi.chromaFormat = config.chroma_format_string;
                mi.sarNum = meta.sarRatio.width;
                mi.sarDen = meta.sarRatio.height;
                mi.videoCodec = codecString;

                if (mi.hasAudio) {
                    if (mi.audioCodec != null) {
                        mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
                    }
                } else {
                    mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + '"';
                }
                if (mi.isComplete()) {
                    this._onMediaInfo(mi);
                }
            }

            var ppsCount = v.getUint8(offset); // numOfPictureParameterSets
            if (ppsCount === 0 || ppsCount > 1) {
                this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid H264 PPS count: ' + ppsCount);
                return;
            }

            offset++;

            for (var _i = 0; _i < ppsCount; _i++) {
                var _len = v.getUint16(offset, !le); // pictureParameterSetLength
                offset += 2;

                if (_len === 0) {
                    continue;
                }

                // pps is useless for extracting video information
                offset += _len;
            }

            meta.avcc = new Uint8Array(dataSize);
            meta.avcc.set(new Uint8Array(arrayBuffer, dataOffset, dataSize), 0);
            console.log(this.TAG, 'Parsed AVCDecoderConfigurationRecord');

            if (this._isInitialMetadataDispatched()) {
                // flush parsed frames
                if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
                    this._onDataAvailable(this._audioTrack, this._videoTrack);
                }
            } else {
                this._videoInitialMetadataDispatched = true;
            }
            // notify new metadata
            this._dispatch = false;
            // if (this._onTrackMetadata) {
            //     this._onTrackMetadata.call(null, meta);
            // }

            this._onTrackMetadata('video', meta);
        }
    }, {
        key: 'timestampBase',
        value: function timestampBase(i) {
            this._timestampBase = i;
        }

        /**
         * 普通的AVC 片段
         */

    }, {
        key: '_parseAVCVideoData',
        value: function _parseAVCVideoData(arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType, cts) {

            var le = this._littleEndian;
            var v = new DataView(arrayBuffer, dataOffset, dataSize);

            var units = [],
                length = 0;

            var offset = 0;
            var lengthSize = this._naluLengthSize;
            var dts = this._timestampBase + tagTimestamp;
            var keyframe = frameType === 1; // from FLV Frame Type constants

            while (offset < dataSize) {
                if (offset + 4 >= dataSize) {
                    console.log(this.TAG, 'Malformed Nalu near timestamp ' + dts + ', offset = ' + offset + ', dataSize = ' + dataSize);
                    break; // data not enough for next Nalu
                }
                // Nalu with length-header (AVC1)
                var naluSize = v.getUint32(offset, !le); // Big-Endian read
                if (lengthSize === 3) {
                    naluSize >>>= 8;
                }
                if (naluSize > dataSize - lengthSize) {
                    console.log(this.TAG, 'Malformed Nalus near timestamp ' + dts + ', NaluSize > DataSize!');
                    return;
                }

                var unitType = v.getUint8(offset + lengthSize) & 0x1F;

                if (unitType === 5) {
                    // IDR
                    keyframe = true;
                }

                var data = new Uint8Array(arrayBuffer, dataOffset + offset, lengthSize + naluSize);
                var unit = { type: unitType, data: data };
                units.push(unit);
                length += data.byteLength;

                offset += lengthSize + naluSize;
            }

            if (units.length) {
                var track = this._videoTrack;
                var avcSample = {
                    units: units,
                    length: length,
                    isKeyframe: keyframe,
                    dts: dts,
                    cts: cts,
                    pts: dts + cts
                };
                if (keyframe) {
                    avcSample.fileposition = tagPosition;
                }
                track.samples.push(avcSample);
                track.length += length;
            }
        }
    }, {
        key: '_parseAudioData',
        value: function _parseAudioData(arrayBuffer, dataOffset, dataSize, tagTimestamp) {
            if (tagTimestamp == this._timestampBase && this._timestampBase != 0) {
                console.log(tagTimestamp, this._timestampBase, '夭寿啦这个视频不是从0开始');
                // timestampBase(0);
            }

            if (dataSize <= 1) {
                console.log(this.TAG, 'Flv: Invalid audio packet, missing SoundData payload!');
                return;
            }

            var meta = this._audioMetadata;
            var track = this._audioTrack;

            if (!meta || !meta.codec) {
                // initial metadata
                meta = this._audioMetadata = {};
                meta.type = 'audio';
                meta.id = track.id;
                meta.timescale = this._timescale;
                meta.duration = this._duration;

                var le = this._littleEndian;
                var v = new DataView(arrayBuffer, dataOffset, dataSize);

                var soundSpec = v.getUint8(0);

                var soundFormat = soundSpec >>> 4;
                if (soundFormat !== 10) {
                    // AAC
                    // TODO: support MP3 audio codec
                    this._onError(DemuxErrors.CODEC_UNSUPPORTED, 'Flv: Unsupported audio codec idx: ' + soundFormat);
                    return;
                }

                var soundRate = 0;
                var soundRateIndex = (soundSpec & 12) >>> 2;

                var soundRateTable = [5500, 11025, 22050, 44100, 48000];

                if (soundRateIndex < soundRateTable.length) {
                    soundRate = soundRateTable[soundRateIndex];
                } else {
                    this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid audio sample rate idx: ' + soundRateIndex);
                    return;
                }

                var soundSize = (soundSpec & 2) >>> 1; // unused
                var soundType = soundSpec & 1;

                meta.audioSampleRate = soundRate;
                meta.channelCount = soundType === 0 ? 1 : 2;
                meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
                meta.codec = 'mp4a.40.5';
            }

            var aacData = this._parseAACAudioData(arrayBuffer, dataOffset + 1, dataSize - 1);
            if (aacData == undefined) {
                return;
            }

            if (aacData.packetType === 0) {
                // AAC sequence header (AudioSpecificConfig)
                if (meta.config) {
                    console.log(this.TAG, 'Found another AudioSpecificConfig!');
                }
                var misc = aacData.data;
                meta.audioSampleRate = misc.samplingRate;
                meta.channelCount = misc.channelCount;
                meta.codec = misc.codec;
                meta.config = misc.config;
                // The decode result of an aac sample is 1024 PCM samples
                meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
                console.log(this.TAG, 'Parsed AudioSpecificConfig');

                if (this._isInitialMetadataDispatched()) {
                    // Non-initial metadata, force dispatch (or flush) parsed frames to remuxer
                    if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
                        this._onDataAvailable(this._audioTrack, this._videoTrack);
                    }
                } else {
                    this._audioInitialMetadataDispatched = true;
                }
                // then notify new metadata
                this._dispatch = false;
                this._onTrackMetadata('audio', meta);

                var mi = this._mediaInfo;
                mi.audioCodec = 'mp4a.40.' + misc.originalAudioObjectType;
                mi.audioSampleRate = meta.audioSampleRate;
                mi.audioChannelCount = meta.channelCount;
                if (mi.hasVideo) {
                    if (mi.videoCodec != null) {
                        mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
                    }
                } else {
                    mi.mimeType = 'video/x-flv; codecs="' + mi.audioCodec + '"';
                }
                if (mi.isComplete()) {
                    this._onMediaInfo(mi);
                }
                return;
            } else if (aacData.packetType === 1) {
                // AAC raw frame data
                var dts = this._timestampBase + tagTimestamp;
                var aacSample = { unit: aacData.data, dts: dts, pts: dts };
                track.samples.push(aacSample);
                track.length += aacData.data.length;
            } else {
                console.log(this.TAG, 'Flv: Unsupported AAC data type ' + aacData.packetType);
            }
        }
    }, {
        key: '_parseAACAudioData',
        value: function _parseAACAudioData(arrayBuffer, dataOffset, dataSize) {
            if (dataSize <= 1) {
                console.log(this.TAG, 'Flv: Invalid AAC packet, missing AACPacketType or/and Data!');
                return;
            }

            var result = {};
            var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);

            result.packetType = array[0];

            if (array[0] === 0) {
                result.data = this._parseAACAudioSpecificConfig(arrayBuffer, dataOffset + 1, dataSize - 1);
            } else {
                result.data = array.subarray(1);
            }

            return result;
        }
    }, {
        key: '_parseAACAudioSpecificConfig',
        value: function _parseAACAudioSpecificConfig(arrayBuffer, dataOffset, dataSize) {
            var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
            var config = null;

            var mpegSamplingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

            /* Audio Object Type:
               0: Null
               1: AAC Main
               2: AAC LC
               3: AAC SSR (Scalable Sample Rate)
               4: AAC LTP (Long Term Prediction)
               5: HE-AAC / SBR (Spectral Band Replication)
               6: AAC Scalable
            */

            var audioObjectType = 0;
            var originalAudioObjectType = 0;
            var audioExtensionObjectType = null;
            var samplingIndex = 0;
            var extensionSamplingIndex = null;
            // debugger;
            // 5 bits
            audioObjectType = originalAudioObjectType = array[0] >>> 3;
            // 4 bits
            samplingIndex = (array[0] & 0x07) << 1 | array[1] >>> 7;
            if (samplingIndex < 0 || samplingIndex >= mpegSamplingRates.length) {
                this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: AAC invalid sampling frequency index!');
                return;
            }

            var samplingFrequence = mpegSamplingRates[samplingIndex];

            // 4 bits
            var channelConfig = (array[1] & 0x78) >>> 3;
            if (channelConfig < 0 || channelConfig >= 8) {
                this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: AAC invalid channel configuration');
                return;
            }

            if (audioObjectType === 5) {
                // HE-AAC?
                // 4 bits
                extensionSamplingIndex = (array[1] & 0x07) << 1 | array[2] >>> 7;
                // 5 bits
                audioExtensionObjectType = (array[2] & 0x7C) >>> 2;
            }

            // workarounds for various browsers
            var userAgent = self.navigator.userAgent.toLowerCase();

            if (userAgent.indexOf('firefox') !== -1) {
                // firefox: use SBR (HE-AAC) if freq less than 24kHz
                if (samplingIndex >= 6) {
                    audioObjectType = 5;
                    config = new Array(4);
                    extensionSamplingIndex = samplingIndex - 3;
                } else {
                    // use LC-AAC
                    audioObjectType = 2;
                    config = new Array(2);
                    extensionSamplingIndex = samplingIndex;
                }
            } else if (userAgent.indexOf('android') !== -1) {
                // android: always use LC-AAC
                audioObjectType = 2;
                config = new Array(2);
                extensionSamplingIndex = samplingIndex;
            } else {
                // for other browsers, e.g. chrome...
                // Always use HE-AAC to make it easier to switch aac codec profile
                audioObjectType = 5;
                extensionSamplingIndex = samplingIndex;
                config = new Array(4);

                if (samplingIndex >= 6) {
                    extensionSamplingIndex = samplingIndex - 3;
                } else if (channelConfig === 1) {
                    // Mono channel
                    audioObjectType = 2;
                    config = new Array(2);
                    extensionSamplingIndex = samplingIndex;
                }
            }

            config[0] = audioObjectType << 3;
            config[0] |= (samplingIndex & 0x0F) >>> 1;
            config[1] = (samplingIndex & 0x0F) << 7;
            config[1] |= (channelConfig & 0x0F) << 3;
            if (audioObjectType === 5) {
                config[1] |= (extensionSamplingIndex & 0x0F) >>> 1;
                config[2] = (extensionSamplingIndex & 0x01) << 7;
                // extended audio object type: force to 2 (LC-AAC)
                config[2] |= 2 << 2;
                config[3] = 0;
            }

            return {
                config: config,
                samplingRate: samplingFrequence,
                channelCount: channelConfig,
                codec: 'mp4a.40.' + audioObjectType,
                originalAudioObjectType: originalAudioObjectType
            };
        }
    }, {
        key: '_isInitialMetadataDispatched',
        value: function _isInitialMetadataDispatched() {
            if (this._hasAudio && this._hasVideo) {
                // both audio & video
                return this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched;
            }
            if (this._hasAudio && !this._hasVideo) {
                // audio only
                return this._audioInitialMetadataDispatched;
            }
            if (!this._hasAudio && this._hasVideo) {
                // video only
                return this._videoInitialMetadataDispatched;
            }
        }
    }]);

    return tagDemux;
}();

var tagdemux = new tagDemux();

/* eslint-disable */
var FlvParse = function () {
    function FlvParse() {
        _classCallCheck(this, FlvParse);

        this.tempUint8 = new Uint8Array();
        this.arrTag = [];
        this.index = 0;
        this.tempArr = [];
        this.stop = false;
        this.offset = 0;
        this.frist = true;
        this._hasAudio = false;
        this._hasVideo = false;
    }

    /**
     * 接受 外部的flv二进制数据
     */


    _createClass(FlvParse, [{
        key: 'setFlv',
        value: function setFlv(uint8) {
            this.stop = false;
            this.arrTag = [];
            this.index = 0;
            this.tempUint8 = uint8;
            if (this.tempUint8.length > 13 && this.tempUint8[0] == 70 && this.tempUint8[1] == 76 && this.tempUint8[2] == 86) {
                this.probe(this.tempUint8.buffer);
                this.read(9); // 略掉9个字节的flv header tag
                this.read(4); // 略掉第一个4字节的 tag size
                this.parse();
                this.frist = false;
                return this.offset;
            } else if (!this.frist) {
                return this.parse();
            } else {
                return this.offset;
            }
        }
    }, {
        key: 'probe',
        value: function probe(buffer) {
            var data = new Uint8Array(buffer);
            var mismatch = { match: false };

            if (data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01) {
                return mismatch;
            }

            var hasAudio = (data[4] & 4) >>> 2 !== 0;
            var hasVideo = (data[4] & 1) !== 0;

            if (!hasAudio && !hasVideo) {
                return mismatch;
            }
            this._hasAudio = tagdemux._hasAudio = hasAudio;
            this._hasVideo = tagdemux._hasVideo = hasVideo;
            return {
                match: true,
                hasAudioTrack: hasAudio,
                hasVideoTrack: hasVideo
            };
        }

        /**
         * 开始解析
         */

    }, {
        key: 'parse',
        value: function parse() {

            while (this.index < this.tempUint8.length && !this.stop) {
                this.offset = this.index;

                var t = new FlvTag();
                if (this.tempUint8.length - this.index >= 11) {
                    t.tagType = this.read(1)[0]; // 取出tag类型
                    t.dataSize = this.read(3); // 取出包体大小
                    t.Timestamp = this.read(4); // 取出解码时间
                    t.StreamID = this.read(3); // 取出stream id
                } else {
                    this.stop = true;
                    continue;
                }
                if (t.tagType == 18 || t.tagType == 8 || t.tagType == 9) {} else {
                    throw new Error$1('wrong tagType' + t.tagType);
                }
                if (this.tempUint8.length - this.index >= this.getBodySum(t.dataSize) + 4) {
                    t.body = this.read(this.getBodySum(t.dataSize)); // 取出body
                    if (t.tagType == 9 && this._hasVideo) {
                        this.arrTag.push(t);
                    }
                    if (t.tagType == 8 && this._hasAudio) {
                        this.arrTag.push(t);
                    }
                    if (t.tagType == 18) {
                        this.arrTag.push(t);
                    }
                    this.read(4);
                } else {
                    this.stop = true;
                    continue;
                }
                this.offset = this.index;
            }

            return this.offset;
        }
    }, {
        key: 'read',
        value: function read(length) {
            // let u8a = new Uint8Array(length);
            // u8a.set(this.tempUint8.subarray(this.index, this.index + length), 0);
            var u8a = this.tempUint8.slice(this.index, this.index + length);
            this.index += length;
            return u8a;
        }

        /**
         * 计算tag包体大小
         */

    }, {
        key: 'getBodySum',
        value: function getBodySum(arr) {
            var _str = '';
            _str += arr[0].toString(16).length == 1 ? '0' + arr[0].toString(16) : arr[0].toString(16);
            _str += arr[1].toString(16).length == 1 ? '0' + arr[1].toString(16) : arr[1].toString(16);
            _str += arr[2].toString(16).length == 1 ? '0' + arr[2].toString(16) : arr[2].toString(16);
            return parseInt(_str, 16);
        }
    }]);

    return FlvParse;
}();

var flvparse = new FlvParse();

/**
 * 代码借鉴了flv.js
 * 增加了自己的注释和写法
 */
/* eslint-disable */
var MP4 = function () {
    function MP4() {
        _classCallCheck(this, MP4);
    }

    _createClass(MP4, null, [{
        key: 'init',
        value: function init() {
            MP4.types = {
                avc1: [],
                avcC: [],
                btrt: [],
                dinf: [],
                dref: [],
                esds: [],
                ftyp: [],
                hdlr: [],
                mdat: [],
                mdhd: [],
                mdia: [],
                mfhd: [],
                minf: [],
                moof: [],
                moov: [],
                mp4a: [],
                mvex: [],
                mvhd: [],
                sdtp: [],
                stbl: [],
                stco: [],
                stsc: [],
                stsd: [],
                stsz: [],
                stts: [],
                tfdt: [],
                tfhd: [],
                traf: [],
                trak: [],
                trun: [],
                trex: [],
                tkhd: [],
                vmhd: [],
                smhd: []
            };

            for (var name in MP4.types) {
                if (MP4.types.hasOwnProperty(name)) {
                    MP4.types[name] = [name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)];
                }
            }

            var constants = MP4.constants = {};

            constants.FTYP = new Uint8Array([0x69, 0x73, 0x6F, 0x6D, // major_brand: isom		isom	MP4  Base Media v1 [IS0 14496-12:2003]	ISO	YES	video/mp4
            0x0, 0x0, 0x0, 0x1, // minor_version: 0x01
            0x69, 0x73, 0x6F, 0x6D, // isom
            0x61, 0x76, 0x63, 0x31 // avc1
            ]);

            constants.STSD_PREFIX = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags  version字段后会有一个entry count字段
            0x00, 0x00, 0x00, 0x01 // entry_count	根据entry的个数，每个entry会有type信息，如“vide”、“sund”等，根据type不同sample description会提供不同的信息，例如对于video track，会有“VisualSampleEntry”类型信息，对于audio track会有“AudioSampleEntry”类型信息。
            ]);

            constants.STTS = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00 // entry_count     0个索引
            ]);

            constants.STSC = constants.STCO = constants.STTS;

            constants.STSZ = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // sample_size
            0x00, 0x00, 0x00, 0x00 // sample_count
            ]);

            constants.HDLR_VIDEO = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // pre_defined
            0x76, 0x69, 0x64, 0x65, // handler_type: 'vide' 在media box中，该值为4个字符		“vide”— video track
            0x00, 0x00, 0x00, 0x00, // reserved: 3 * 4 bytes
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 保留位
            0x56, 0x69, 0x64, 0x65, 0x6F, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: VideoHandler 长度不定		track type name，以‘\0’结尾的字符串
            ]);

            constants.HDLR_AUDIO = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // pre_defined
            0x73, 0x6F, 0x75, 0x6E, // handler_type: 'soun'在media box中，该值为4个字符		“soun”— audio track
            0x00, 0x00, 0x00, 0x00, // reserved: 3 * 4 bytes
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 保留位
            0x53, 0x6F, 0x75, 0x6E, 0x64, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: SoundHandler 长度不定		track type name，以‘\0’结尾的字符串
            ]);

            constants.DREF = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x01, // entry_count 1个url
            // url	box开始
            0x00, 0x00, 0x00, 0x0C, // entry_size
            0x75, 0x72, 0x6C, 0x20, // type 'url '
            0x00, 0x00, 0x00, 0x01 // version(0) + flags 当“url”或“urn”的box flag为1时，字符串均为空。
            ]);

            // Sound media header
            constants.SMHD = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags	box版本，0或1，一般为0。
            0x00, 0x00, 0x00, 0x00 // balance(2) + reserved(2) 立体声平衡，[8.8] 格式值，一般为0，-1.0表示全部左声道，1.0表示全部右声道+2位保留位
            ]);

            // video media header
            constants.VMHD = new Uint8Array([0x00, 0x00, 0x00, 0x01, // version(0) + flags
            0x00, 0x00, // graphicsmode: 2 bytes 视频合成模式，为0时拷贝原始图像，否则与opcolor进行合成   //理论上是4位啊  暂时保留
            0x00, 0x00, 0x00, 0x00, // opcolor: 3 * 2 bytes ｛red，green，blue｝
            0x00, 0x00]);
        }

        /**
         * 封装box
         */

    }, {
        key: 'box',
        value: function box(type) {
            var size = 8;
            var result = null;
            var datas = Array.prototype.slice.call(arguments, 1);
            var arrayCount = datas.length;

            for (var i = 0; i < arrayCount; i++) {
                size += datas[i].byteLength;
            }
            // box头部大小
            result = new Uint8Array(size);
            result[0] = size >>> 24 & 0xFF; // size
            result[1] = size >>> 16 & 0xFF;
            result[2] = size >>> 8 & 0xFF;
            result[3] = size & 0xFF;
            // 写入box的type
            result.set(type, 4); // type

            var offset = 8;
            for (var _i = 0; _i < arrayCount; _i++) {
                // data body
                result.set(datas[_i], offset);
                offset += datas[_i].byteLength;
            }

            return result;
        }

        // 创建ftyp&moov

    }, {
        key: 'generateInitSegment',
        value: function generateInitSegment(meta) {
            if (meta.constructor != Array) {
                meta = [meta];
            }
            var ftyp = MP4.box(MP4.types.ftyp, MP4.constants.FTYP);
            var moov = MP4.moov(meta);

            var result = new Uint8Array(ftyp.byteLength + moov.byteLength);
            result.set(ftyp, 0);
            result.set(moov, ftyp.byteLength);
            return result;
        }

        // Movie metadata box

    }, {
        key: 'moov',
        value: function moov(meta) {
            var mvhd = MP4.mvhd(meta[0].timescale, meta[0].duration); // /moov里面的第一个box
            var vtrak = MP4.trak(meta[0]);
            var atrak = void 0;
            if (meta.length > 1) {
                atrak = MP4.trak(meta[1]);
            }

            var mvex = MP4.mvex(meta);
            if (meta.length > 1) {
                return MP4.box(MP4.types.moov, mvhd, vtrak, atrak, mvex);
            } else {
                return MP4.box(MP4.types.moov, mvhd, vtrak, mvex);
            }
        }

        // Movie header box

    }, {
        key: 'mvhd',
        value: function mvhd(timescale, duration) {
            return MP4.box(MP4.types.mvhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags     1位的box版本+3位flags   box版本，0或1，一般为0。（以下字节数均按version=0）
            0x00, 0x00, 0x00, 0x00, // creation_time    创建时间  （相对于UTC时间1904-01-01零点的秒数）
            0x00, 0x00, 0x00, 0x00, // modification_time   修改时间
            timescale >>> 24 & 0xFF, // timescale: 4 bytes		文件媒体在1秒时间内的刻度值，可以理解为1秒长度
            timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes	该track的时间长度，用duration和time scale值可以计算track时长，比如audio track的time scale = 8000, duration = 560128，时长为70.016，video track的time scale = 600, duration = 42000，时长为70
            duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x01, 0x00, 0x00, // Preferred rate: 1.0   推荐播放速率，高16位和低16位分别为小数点整数部分和小数部分，即[16.16] 格式，该值为1.0（0x00010000）表示正常前向播放
            0x01, 0x00, 0x00, 0x00, // PreferredVolume(1.0, 2bytes) + reserved(2bytes)	与rate类似，[8.8] 格式，1.0（0x0100）表示最大音量
            0x00, 0x00, 0x00, 0x00, // reserved: 4 + 4 bytes	保留位
            0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 视频变换矩阵   线性代数
            0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
            0x00, 0x00, 0x00, 0x00, // ----begin pre_defined 6 * 4 bytes----
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre-defined 保留位
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // ----end pre_defined 6 * 4 bytes----
            0xFF, 0xFF, 0xFF, 0xFF // next_track_ID 下一个track使用的id号
            ]));
        }

        // Track box

    }, {
        key: 'trak',
        value: function trak(meta) {
            return MP4.box(MP4.types.trak, MP4.tkhd(meta), MP4.mdia(meta));
        }

        // Track header box

    }, {
        key: 'tkhd',
        value: function tkhd(meta) {
            var trackId = meta.id,
                duration = meta.duration;
            var width = meta.presentWidth,
                height = meta.presentHeight;

            return MP4.box(MP4.types.tkhd, new Uint8Array([0x00, 0x00, 0x00, 0x07, // version(0) + flags 1位版本 box版本，0或1，一般为0。（以下字节数均按version=0）按位或操作结果值，预定义如下：
            // 0x000001 track_enabled，否则该track不被播放；
            // 0x000002 track_in_movie，表示该track在播放中被引用；
            // 0x000004 track_in_preview，表示该track在预览时被引用。
            // 一般该值为7，1+2+4 如果一个媒体所有track均未设置track_in_movie和track_in_preview，将被理解为所有track均设置了这两项；对于hint track，该值为0
            // hint track  这个特殊的track并不包含媒体数据，而是包含了一些将其他数据track打包成流媒体的指示信息。
            0x00, 0x00, 0x00, 0x00, // creation_time	创建时间（相对于UTC时间1904-01-01零点的秒数）
            0x00, 0x00, 0x00, 0x00, // modification_time	修改时间
            trackId >>> 24 & 0xFF, // track_ID: 4 bytes	id号，不能重复且不能为0
            trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes    保留位
            duration >>> 24 & 0xFF, // duration: 4 bytes  	track的时间长度
            duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes    保留位
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // layer(2bytes) + alternate_group(2bytes)  视频层，默认为0，值小的在上层.track分组信息，默认为0表示该track未与其他track有群组关系
            0x00, 0x00, 0x00, 0x00, // volume(2bytes) + reserved(2bytes)    [8.8] 格式，如果为音频track，1.0（0x0100）表示最大音量；否则为0   +保留位
            0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, // 视频变换矩阵
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
            width >>> 8 & 0xFF, // //宽度
            width & 0xFF, 0x00, 0x00, height >>> 8 & 0xFF, // 高度
            height & 0xFF, 0x00, 0x00]));
        }

        /**
         * “mdia”也是个container box，其子box的结构和种类还是比较复杂的。先来看一个“mdia”的实例结构树图。
         * 总体来说，“mdia”定义了track媒体类型以及sample数据，描述sample信息。一般“mdia”包含一个“mdhd”，
         * 一个“hdlr”和一个“minf”，其中“mdhd”为media header box，“hdlr”为handler reference box，
         * “minf”为media information box。
         *
         * mdia
         * 		mdhd
         * 		hdlr
         * 		minf
         * 			smhd
         * 			dinf
         * 				dref
         * 					url
         * 			stbl
         * 				stsd
         * 					mp4a
         * 						esds
         * 				stts
         * 				stsc
         * 				stsz
         * 				stco
         */

    }, {
        key: 'mdia',
        value: function mdia(meta) {
            return MP4.box(MP4.types.mdia, MP4.mdhd(meta), MP4.hdlr(meta), MP4.minf(meta));
        }

        // Media header box

    }, {
        key: 'mdhd',
        value: function mdhd(meta) {
            var timescale = meta.timescale;
            var duration = meta.duration;
            return MP4.box(MP4.types.mdhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags // version(0) + flags		box版本，0或1，一般为0。
            0x00, 0x00, 0x00, 0x00, // creation_time    创建时间
            0x00, 0x00, 0x00, 0x00, // modification_time修改时间
            timescale >>> 24 & 0xFF, // timescale: 4 bytes    文件媒体在1秒时间内的刻度值，可以理解为1秒长度
            timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes  track的时间长度
            duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x55, 0xC4, // language: und (undetermined) 媒体语言码。最高位为0，后面15位为3个字符（见ISO 639-2/T标准中定义）
            0x00, 0x00 // pre_defined = 0
            ]));
        }

        // Media handler reference box

    }, {
        key: 'hdlr',
        value: function hdlr(meta) {
            var data = null;
            if (meta.type === 'audio') {
                data = MP4.constants.HDLR_AUDIO;
            } else {
                data = MP4.constants.HDLR_VIDEO;
            }
            return MP4.box(MP4.types.hdlr, data);
        }

        /**
        * “minf”存储了解释track媒体数据的handler-specific信息，media handler用这些信息将媒体时间映射到媒体数据并进行处理。“minf”中的信息格式和内容与媒体类型以及解释媒体数据的media handler密切相关，其他media handler不知道如何解释这些信息。“minf”是一个container box，其实际内容由子box说明。
        一般情况下，“minf”包含一个header box，一个“dinf”和一个“stbl”，其中，header box根据track type（即media handler type）分为“vmhd”、“smhd”、“hmhd”和“nmhd”，“dinf”为data information box，“stbl”为sample table box。下面分别介绍。
        *
        */
        // Media infomation box

    }, {
        key: 'minf',
        value: function minf(meta) {
            // header box根据track type（即media handler type）分为“vmhd”、“smhd”、“hmhd”和“nmhd”
            var xmhd = null;
            if (meta.type === 'audio') {
                xmhd = MP4.box(MP4.types.smhd, MP4.constants.SMHD);
            } else {
                xmhd = MP4.box(MP4.types.vmhd, MP4.constants.VMHD);
            }
            return MP4.box(MP4.types.minf, xmhd, MP4.dinf(), MP4.stbl(meta));
        }

        /**
         * Data Information Box
         * “dinf”解释如何定位媒体信息，是一个container box。“dinf”一般包含一个“dref”，即data reference box；
         * “dref”下会包含若干个“url”或“urn”，这些box组成一个表，用来定位track数据。
         * 简单的说，track可以被分成若干段，每一段都可以根据“url”或“urn”指向的地址来获取数据，
         * sample描述中会用这些片段的序号将这些片段组成一个完整的track。
         * 一般情况下，当数据被完全包含在文件中时，“url”或“urn”中的定位字符串是空的。
         */

    }, {
        key: 'dinf',
        value: function dinf() {
            var result = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, MP4.constants.DREF));
            return result;
        }

        /**
        * Sample Table Box（stbl）
        	*	“stbl”几乎是普通的MP4文件中最复杂的一个box了，首先需要回忆一下sample的概念。
        * 	sample是媒体数据存储的单位，存储在media的chunk中，chunk和sample的长度均可互不相同，如下图所示。
        “stbl”是一个container box，其子box包括：sample description box（stsd）、
        * time to sample box（stts）、sample size box（stsz或stz2）、
        * sample to chunk box（stsc）、chunk offset box（stco或co64）、
        * composition time to sample box（ctts）、sync sample box（stss）
        * stsd”必不可少，且至少包含一个条目，该box包含了data reference box进行sample数据检索的信息。
        * 没有“stsd”就无法计算media sample的存储位置。“stsd”包含了编码的信息，其存储的信息随媒体类型不同而不同。
        * 			stbl
        * 				stsd
        * 					avc1
        * 						avcC
        * 				stts
        * 				stsc
        * 				stsz
        * 				stco
        */

    }, {
        key: 'stbl',
        value: function stbl(meta) {
            var result = MP4.box(MP4.types.stbl, // type: stbl
            MP4.stsd(meta), // Sample Description Table
            MP4.box(MP4.types.stts, MP4.constants.STTS), // Time-To-Sample    因为stts的entry count 为0
            // 所以没有关键帧index 的stss
            // 也没有CTTS box CTTS是记录偏移量
            MP4.box(MP4.types.stsc, MP4.constants.STSC), // Sample-To-Chunk
            MP4.box(MP4.types.stsz, MP4.constants.STSZ), // Sample size
            MP4.box(MP4.types.stco, MP4.constants.STCO) // Chunk offset
            );
            return result;
        }

        /**
        * Sample Description Box（stsd）
        		box header和version字段后会有一个entry count字段，
        * 			根据entry的个数，每个entry会有type信息，如“vide”、“sund”等，
        * 		根据type不同sample description会提供不同的信息，例如对于video track，
        * 会有“VisualSampleEntry”类型信息，对于audio track会有“AudioSampleEntry”类型信息。
        * * 				stsd
        * 					mp4a
        * 						esds
        *
        *
        *
        *
        * 		 4 bytes - length in total
        	 4 bytes - 4 char code of sample description table (stsd)
        	 4 bytes - version & flags
        	 4 bytes - number of sample entries (num_sample_entries)
        		 [
        		    4 bytes - length of sample entry (len_sample_entry)
        		    4 bytes - 4 char code of sample entry
        		    ('len_sample_entry' - 8) bytes of data
        		 ] (repeated 'num_sample_entries' times)
        	(4 bytes - optional 0x00000000 as end of box marker )
        */

    }, {
        key: 'stsd',
        value: function stsd(meta) {
            if (meta.type === 'audio') {
                return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp4a(meta));
            } else {
                return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.avc1(meta));
            }
        }
    }, {
        key: 'mp4a',
        value: function mp4a(meta) {
            var channelCount = meta.channelCount;
            var sampleRate = meta.audioSampleRate;

            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // reserved(4) 6个字节，设置为0；
            0x00, 0x00, 0x00, 0x01, // reserved(2) + data_reference_index(2)
            0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes 保留位
            0x00, 0x00, 0x00, 0x00, 0x00, channelCount, // channelCount(2) 单声道还是双声道
            0x00, 0x10, // sampleSize(2)
            0x00, 0x00, 0x00, 0x00, // reserved(4) 4字节保留位
            sampleRate >>> 8 & 0xFF, // Audio sample rate 显然要右移16位才有意义	template unsigned int(32) samplerate = {timescale of media}<<16;
            sampleRate & 0xFF, 0x00, 0x00]);

            return MP4.box(MP4.types.mp4a, data, MP4.esds(meta));
        }
    }, {
        key: 'esds',
        value: function esds(meta) {
            var config = meta.config;
            var configSize = config.length;
            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version 0 + flags

            0x03, // descriptor_type    MP4ESDescrTag
            0x17 + configSize, // length3
            0x00, 0x01, // es_id
            0x00, // stream_priority

            0x04, // descriptor_type    MP4DecConfigDescrTag
            0x0F + configSize, // length
            0x40, // codec: mpeg4_audio
            /**
             *当objectTypeIndication为0x40时，为MPEG-4 Audio（MPEG-4 Audio generally is thought of as AAC
             * but there is a whole framework of audio codecs that can Go in MPEG-4 Audio including AAC, BSAC, ALS, CELP,
             * and something called MP3On4），如果想更细分format为aac还是mp3，
             * 可以读取MP4DecSpecificDescr层data[0]的前五位
             */
            0x15, // stream_type: Audio
            0x00, 0x00, 0x00, // buffer_size
            0x00, 0x00, 0x00, 0x00, // maxBitrate
            0x00, 0x00, 0x00, 0x00, // avgBitrate

            0x05 // descriptor_type MP4DecSpecificDescrTag
            ].concat([configSize]).concat(config).concat([0x06, 0x01, 0x02 // GASpecificConfig
            ]));
            return MP4.box(MP4.types.esds, data);
        }

        /**
         * 改版
         *stsd下的avc1视频解析
         */

    }, {
        key: 'avc1',
        value: function avc1(meta) {
            var avcc = meta.avcc;
            var width = meta.codecWidth,
                height = meta.codecHeight;

            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // // reserved(4)    6个 保留位	Reserved：6个字节，设置为0；
            0x00, 0x00, 0x00, 0x01, // reserved(2) + {{{{data_reference_index(2)  数据引用索引}}}}
            0x00, 0x00, 0x00, 0x00, // pre_defined(2) + reserved(2)
            0x00, 0x00, 0x00, 0x00, // pre_defined: 3 * 4 bytes  3*4个字节的保留位
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, width >>> 8 & 0xFF, // width: 2 bytes
            width & 0xFF, height >>> 8 & 0xFF, // height: 2 bytes
            height & 0xFF, 0x00, 0x48, 0x00, 0x00, // horizresolution: 4 bytes 常数
            0x00, 0x48, 0x00, 0x00, // vertresolution: 4 bytes 常数
            0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes 保留位
            0x00, 0x01, // frame_count
            // frame_count表明多少帧压缩视频存储在每个样本。默认是1,每样一帧;它可能超过1每个样本的多个帧数
            0x04, //	strlen compressorname: 32 bytes			String[32]
            // 32个8 bit    第一个8bit表示长度,剩下31个8bit表示内容
            0x67, 0x31, 0x31, 0x31, // compressorname: 32 bytes    翻译过来是g111
            0x00, 0x00, 0x00, 0x00, //
            0x00, 0x00, 0x00, 0x00, //
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, // depth 颜色深度
            0xFF, 0xFF // pre_defined = -1
            ]);
            return MP4.box(MP4.types.avc1, data, MP4.box(MP4.types.avcC, avcc));
        }

        // Movie Extends box

    }, {
        key: 'mvex',
        value: function mvex(meta) {
            if (meta.length > 1) {
                return MP4.box(MP4.types.mvex, MP4.trex(meta[0]), MP4.trex(meta[1]));
            } else {
                return MP4.box(MP4.types.mvex, MP4.trex(meta[0]));
            }
        }

        // Track Extends box

    }, {
        key: 'trex',
        value: function trex(meta) {
            var trackId = meta.id;
            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            trackId >>> 24 & 0xFF, // track_ID
            trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x01, // default_sample_description_index
            0x00, 0x00, 0x00, 0x00, // default_sample_duration
            0x00, 0x00, 0x00, 0x00, // default_sample_size
            0x00, 0x01, 0x00, 0x01 // default_sample_flags
            ]);
            // if (meta.type !== 'video') {
            //     data[data.length - 1] = 0x00;
            // }
            return MP4.box(MP4.types.trex, data);
        }

        // Movie fragment box

    }, {
        key: 'moof',
        value: function moof(track, baseMediaDecodeTime) {
            return MP4.box(MP4.types.moof, MP4.mfhd(track.sequenceNumber), MP4.traf(track, baseMediaDecodeTime));
        }
    }, {
        key: 'mfhd',
        value: function mfhd(sequenceNumber) {
            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, sequenceNumber >>> 24 & 0xFF, // sequence_number: int32
            sequenceNumber >>> 16 & 0xFF, sequenceNumber >>> 8 & 0xFF, sequenceNumber & 0xFF]);
            return MP4.box(MP4.types.mfhd, data);
        }

        // Track fragment box

    }, {
        key: 'traf',
        value: function traf(track, baseMediaDecodeTime) {
            var trackId = track.id;

            // Track fragment header box
            var tfhd = MP4.box(MP4.types.tfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) & flags
            trackId >>> 24 & 0xFF, // track_ID
            trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF]));
            // Track Fragment Decode Time
            var tfdt = MP4.box(MP4.types.tfdt, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) & flags
            baseMediaDecodeTime >>> 24 & 0xFF, // baseMediaDecodeTime: int32
            baseMediaDecodeTime >>> 16 & 0xFF, baseMediaDecodeTime >>> 8 & 0xFF, baseMediaDecodeTime & 0xFF]));
            var sdtp = MP4.sdtp(track);
            var trun = MP4.trun(track, sdtp.byteLength + 16 + 16 + 8 + 16 + 8 + 8);

            return MP4.box(MP4.types.traf, tfhd, tfdt, trun, sdtp);
        }

        // Sample Dependency Type box

    }, {
        key: 'sdtp',
        value: function sdtp(track) {
            var samples = track.samples || [];
            var sampleCount = samples.length;
            var data = new Uint8Array(4 + sampleCount);
            // 0~4 bytes: version(0) & flags
            for (var i = 0; i < sampleCount; i++) {
                var flags = samples[i].flags;
                data[i + 4] = flags.isLeading << 6 | // is_leading: 2 (bit)
                flags.dependsOn << 4 // sample_depends_on
                | flags.isDependedOn << 2 // sample_is_depended_on
                | flags.hasRedundancy; // sample_has_redundancy
            }
            return MP4.box(MP4.types.sdtp, data);
        }

        // Track fragment run box

    }, {
        key: 'trun',
        value: function trun(track, offset) {
            var samples = track.samples || [];
            var sampleCount = samples.length;
            var dataSize = 12 + 16 * sampleCount;
            var data = new Uint8Array(dataSize);
            offset += 8 + dataSize;

            data.set([0x00, 0x00, 0x0F, 0x01, // version(0) & flags
            sampleCount >>> 24 & 0xFF, // sample_count
            sampleCount >>> 16 & 0xFF, sampleCount >>> 8 & 0xFF, sampleCount & 0xFF, offset >>> 24 & 0xFF, // data_offset
            offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF], 0);

            for (var i = 0; i < sampleCount; i++) {

                var duration = samples[i].duration;

                var size = samples[i].size;
                var flags = samples[i].flags;
                var cts = samples[i].cts;
                data.set([duration >>> 24 & 0xFF, // sample_duration
                duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, size >>> 24 & 0xFF, // sample_size
                size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF, flags.isLeading << 2 | flags.dependsOn, // sample_flags
                flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.isNonSync, 0x00, 0x00, // sample_degradation_priority
                cts >>> 24 & 0xFF, // sample_composition_time_offset
                cts >>> 16 & 0xFF, cts >>> 8 & 0xFF, cts & 0xFF], 12 + 16 * i);
            }
            return MP4.box(MP4.types.trun, data);
        }
    }, {
        key: 'mdat',
        value: function mdat(data) {
            return MP4.box(MP4.types.mdat, data);
        }
    }]);

    return MP4;
}();

MP4.init();

/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * This file is modified from dailymotion's hls.js library (hls.js/src/helper/aac.js)
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable */
var AAC = function () {
    function AAC() {
        _classCallCheck(this, AAC);
    }

    _createClass(AAC, null, [{
        key: "getSilentFrame",
        value: function getSilentFrame(channelCount) {
            if (channelCount === 1) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
            } else if (channelCount === 2) {
                return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
            } else if (channelCount === 3) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
            } else if (channelCount === 4) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
            } else if (channelCount === 5) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
            } else if (channelCount === 6) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
            }
            return null;
        }
    }]);

    return AAC;
}();

/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable */
var Browser = {};

function detect() {
    // modified from jquery-browser-plugin

    var ua = self.navigator.userAgent.toLowerCase();

    var match = /(edge)\/([\w.]+)/.exec(ua) || /(opr)[\/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(iemobile)[\/]([\w.]+)/.exec(ua) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

    var platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) || /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) || /(kindle)/.exec(ua) || /(android)/.exec(ua) || /(windows)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua) || /(cros)/.exec(ua) || [];

    var matched = {
        browser: match[5] || match[3] || match[1] || '',
        version: match[2] || match[4] || '0',
        majorVersion: match[4] || match[2] || '0',
        platform: platform_match[0] || ''
    };

    var browser = {};
    if (matched.browser) {
        browser[matched.browser] = true;

        var versionArray = matched.majorVersion.split('.');
        browser.version = {
            major: parseInt(matched.majorVersion, 10),
            string: matched.version
        };
        if (versionArray.length > 1) {
            browser.version.minor = parseInt(versionArray[1], 10);
        }
        if (versionArray.length > 2) {
            browser.version.build = parseInt(versionArray[2], 10);
        }
    }

    if (matched.platform) {
        browser[matched.platform] = true;
    }

    if (browser.chrome || browser.opr || browser.safari) {
        browser.webkit = true;
    }

    // MSIE. IE11 has 'rv' identifer
    if (browser.rv || browser.iemobile) {
        if (browser.rv) {
            delete browser.rv;
        }
        var msie = 'msie';
        matched.browser = msie;
        browser[msie] = true;
    }

    // Microsoft Edge
    if (browser.edge) {
        delete browser.edge;
        var msedge = 'msedge';
        matched.browser = msedge;
        browser[msedge] = true;
    }

    // Opera 15+
    if (browser.opr) {
        var opera = 'opera';
        matched.browser = opera;
        browser[opera] = true;
    }

    // Stock android browsers are marked as Safari
    if (browser.safari && browser.android) {
        var android = 'android';
        matched.browser = android;
        browser[android] = true;
    }

    browser.name = matched.browser;
    browser.platform = matched.platform;

    for (var key in Browser) {
        if (Browser.hasOwnProperty(key)) {
            delete Browser[key];
        }
    }
    _Object$assign(Browser, browser);
}

detect();

/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable */
// Represents an media sample (audio / video)
var SampleInfo = function SampleInfo(dts, pts, duration, originalDts, isSync) {
    _classCallCheck(this, SampleInfo);

    this.dts = dts;
    this.pts = pts;
    this.duration = duration;
    this.originalDts = originalDts;
    this.isSyncPoint = isSync;
    this.fileposition = null;
};

// Media Segment concept is defined in Media Source Extensions spec.
// Particularly in ISO BMFF format, an Media Segment contains a moof box followed by a mdat box.
var MediaSegmentInfo = function () {
    function MediaSegmentInfo() {
        _classCallCheck(this, MediaSegmentInfo);

        this.beginDts = 0;
        this.endDts = 0;
        this.beginPts = 0;
        this.endPts = 0;
        this.originalBeginDts = 0;
        this.originalEndDts = 0;
        this.syncPoints = []; // SampleInfo[n], for video IDR frames only
        this.firstSample = null; // SampleInfo
        this.lastSample = null; // SampleInfo
    }

    _createClass(MediaSegmentInfo, [{
        key: "appendSyncPoint",
        value: function appendSyncPoint(sampleInfo) {
            // also called Random Access Point
            sampleInfo.isSyncPoint = true;
            this.syncPoints.push(sampleInfo);
        }
    }]);

    return MediaSegmentInfo;
}();

// Ordered list for recording video IDR frames, sorted by originalDts
var IDRSampleList = function () {
    function IDRSampleList() {
        _classCallCheck(this, IDRSampleList);

        this._list = [];
    }

    _createClass(IDRSampleList, [{
        key: "clear",
        value: function clear() {
            this._list = [];
        }
    }, {
        key: "appendArray",
        value: function appendArray(syncPoints) {
            var list = this._list;

            if (syncPoints.length === 0) {
                return;
            }

            if (list.length > 0 && syncPoints[0].originalDts < list[list.length - 1].originalDts) {
                this.clear();
            }

            Array.prototype.push.apply(list, syncPoints);
        }
    }, {
        key: "getLastSyncPointBeforeDts",
        value: function getLastSyncPointBeforeDts(dts) {
            if (this._list.length == 0) {
                return null;
            }

            var list = this._list;
            var idx = 0;
            var last = list.length - 1;
            var mid = 0;
            var lbound = 0;
            var ubound = last;

            if (dts < list[0].dts) {
                idx = 0;
                lbound = ubound + 1;
            }

            while (lbound <= ubound) {
                mid = lbound + Math.floor((ubound - lbound) / 2);
                if (mid === last || dts >= list[mid].dts && dts < list[mid + 1].dts) {
                    idx = mid;
                    break;
                } else if (list[mid].dts < dts) {
                    lbound = mid + 1;
                } else {
                    ubound = mid - 1;
                }
            }
            return this._list[idx];
        }
    }]);

    return IDRSampleList;
}();

// Data structure for recording information of media segments in single track.
var MediaSegmentInfoList = function () {
    function MediaSegmentInfoList(type) {
        _classCallCheck(this, MediaSegmentInfoList);

        this._type = type;
        this._list = [];
        this._lastAppendLocation = -1; // cached last insert location
    }

    _createClass(MediaSegmentInfoList, [{
        key: "isEmpty",
        value: function isEmpty() {
            return this._list.length === 0;
        }
    }, {
        key: "clear",
        value: function clear() {
            this._list = [];
            this._lastAppendLocation = -1;
        }
    }, {
        key: "_searchNearestSegmentBefore",
        value: function _searchNearestSegmentBefore(originalBeginDts) {
            var list = this._list;
            if (list.length === 0) {
                return -2;
            }
            var last = list.length - 1;
            var mid = 0;
            var lbound = 0;
            var ubound = last;

            var idx = 0;

            if (originalBeginDts < list[0].originalBeginDts) {
                idx = -1;
                return idx;
            }

            while (lbound <= ubound) {
                mid = lbound + Math.floor((ubound - lbound) / 2);
                if (mid === last || originalBeginDts > list[mid].lastSample.originalDts && originalBeginDts < list[mid + 1].originalBeginDts) {
                    idx = mid;
                    break;
                } else if (list[mid].originalBeginDts < originalBeginDts) {
                    lbound = mid + 1;
                } else {
                    ubound = mid - 1;
                }
            }
            return idx;
        }
    }, {
        key: "_searchNearestSegmentAfter",
        value: function _searchNearestSegmentAfter(originalBeginDts) {
            return this._searchNearestSegmentBefore(originalBeginDts) + 1;
        }
    }, {
        key: "append",
        value: function append(mediaSegmentInfo) {
            var list = this._list;
            var msi = mediaSegmentInfo;
            var lastAppendIdx = this._lastAppendLocation;
            var insertIdx = 0;

            if (lastAppendIdx !== -1 && lastAppendIdx < list.length && msi.originalBeginDts >= list[lastAppendIdx].lastSample.originalDts && (lastAppendIdx === list.length - 1 || lastAppendIdx < list.length - 1 && msi.originalBeginDts < list[lastAppendIdx + 1].originalBeginDts)) {
                insertIdx = lastAppendIdx + 1; // use cached location idx
            } else {
                if (list.length > 0) {
                    insertIdx = this._searchNearestSegmentBefore(msi.originalBeginDts) + 1;
                }
            }

            this._lastAppendLocation = insertIdx;
            this._list.splice(insertIdx, 0, msi);
        }
    }, {
        key: "getLastSegmentBefore",
        value: function getLastSegmentBefore(originalBeginDts) {
            var idx = this._searchNearestSegmentBefore(originalBeginDts);
            if (idx >= 0) {
                return this._list[idx];
            } else {
                // -1
                return null;
            }
        }
    }, {
        key: "getLastSampleBefore",
        value: function getLastSampleBefore(originalBeginDts) {
            var segment = this.getLastSegmentBefore(originalBeginDts);
            if (segment != null) {
                return segment.lastSample;
            } else {
                return null;
            }
        }
    }, {
        key: "getLastSyncPointBefore",
        value: function getLastSyncPointBefore(originalBeginDts) {
            var segmentIdx = this._searchNearestSegmentBefore(originalBeginDts);
            var syncPoints = this._list[segmentIdx].syncPoints;
            while (syncPoints.length === 0 && segmentIdx > 0) {
                segmentIdx--;
                syncPoints = this._list[segmentIdx].syncPoints;
            }
            if (syncPoints.length > 0) {
                return syncPoints[syncPoints.length - 1];
            } else {
                return null;
            }
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }, {
        key: "length",
        get: function get() {
            return this._list.length;
        }
    }]);

    return MediaSegmentInfoList;
}();

/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable */
// Fragmented mp4 remuxer

var MP4Remuxer = function () {
    function MP4Remuxer(config) {
        _classCallCheck(this, MP4Remuxer);

        this.TAG = this.constructor.name;

        this._config = config;
        this._isLive = config.isLive === true;

        this._dtsBase = -1;
        this._dtsBaseInited = false;
        this._audioDtsBase = Infinity;
        this._videoDtsBase = Infinity;
        this._audioNextDts = undefined;
        this._videoNextDts = undefined;

        this._audioMeta = null;
        this._videoMeta = null;

        this._audioSegmentInfoList = new MediaSegmentInfoList('audio');
        this._videoSegmentInfoList = new MediaSegmentInfoList('video');

        this._onInitSegment = null;
        this._onMediaSegment = null;

        // Workaround for chrome < 50: Always force first sample as a Random Access Point in media segment
        // see https://bugs.chromium.org/p/chromium/issues/detail?id=229412
        this._forceFirstIDR = !!(Browser.chrome && (Browser.version.major < 50 || Browser.version.major === 50 && Browser.version.build < 2661));

        // Workaround for IE11/Edge: Fill silent aac frame after keyframe-seeking
        // Make audio beginDts equals with video beginDts, in order to fix seek freeze
        this._fillSilentAfterSeek = Browser.msedge || Browser.msie;
    }

    _createClass(MP4Remuxer, [{
        key: 'destroy',
        value: function destroy() {
            this._dtsBase = -1;
            this._dtsBaseInited = false;
            this._audioMeta = null;
            this._videoMeta = null;
            this._audioSegmentInfoList.clear();
            this._audioSegmentInfoList = null;
            this._videoSegmentInfoList.clear();
            this._videoSegmentInfoList = null;
            this._onInitSegment = null;
            this._onMediaSegment = null;
        }
    }, {
        key: 'bindDataSource',
        value: function bindDataSource(producer) {
            producer.onDataAvailable = this.remux.bind(this);
            producer.onTrackMetadata = this._onTrackMetadataReceived.bind(this);
            return this;
        }

        /* prototype: function onInitSegment(type: string, initSegment: ArrayBuffer): void
           InitSegment: {
               type: string,
               data: ArrayBuffer,
               codec: string,
               container: string
           }
        */

    }, {
        key: 'insertDiscontinuity',
        value: function insertDiscontinuity() {
            this._audioNextDts = this._videoNextDts = undefined;
        }
    }, {
        key: 'seek',
        value: function seek(originalDts) {
            this._videoSegmentInfoList.clear();
            this._audioSegmentInfoList.clear();
        }
    }, {
        key: 'remux',
        value: function remux(audioTrack, videoTrack) {
            if (!this._onMediaSegment) {
                throw new Error$1('MP4Remuxer: onMediaSegment callback must be specificed!');
            }
            if (!this._dtsBaseInited) {
                this._calculateDtsBase(audioTrack, videoTrack);
            }
            this._remuxVideo(videoTrack);
            this._remuxAudio(audioTrack);
        }
    }, {
        key: '_onTrackMetadataReceived',
        value: function _onTrackMetadataReceived(type, metadata) {
            var metabox = null;

            if (type === 'audio') {
                this._audioMeta = metadata;
                metabox = MP4.generateInitSegment(metadata);
                console.log('msg+audio', metadata);
            } else if (type === 'video') {
                this._videoMeta = metadata;
                metabox = MP4.generateInitSegment(metadata);
                console.log('msg+video', metadata);
            } else {
                return;
            }

            // dispatch metabox (Initialization Segment)
            if (!this._onInitSegment) {
                throw new Error$1('MP4Remuxer: onInitSegment callback must be specified!');
            }
            this._onInitSegment(type, {
                type: type,
                data: metabox.buffer,
                codec: metadata.codec,
                container: type + '/mp4'
            });
        }
    }, {
        key: '_calculateDtsBase',
        value: function _calculateDtsBase(audioTrack, videoTrack) {
            if (this._dtsBaseInited) {
                return;
            }

            if (audioTrack.samples && audioTrack.samples.length) {
                this._audioDtsBase = audioTrack.samples[0].dts;
            }
            if (videoTrack.samples && videoTrack.samples.length) {
                this._videoDtsBase = videoTrack.samples[0].dts;
            }

            this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase);
            this._dtsBaseInited = true;
        }
    }, {
        key: '_remuxAudio',
        value: function _remuxAudio(audioTrack) {
            var track = audioTrack;
            var samples = track.samples;
            var dtsCorrection = void 0;
            var firstDts = -1,
                lastDts = -1,
                lastPts = -1;

            var remuxSilentFrame = false;
            var silentFrameDuration = -1;

            if (!samples || samples.length === 0) {
                return;
            }

            var bytes = 8 + track.length;
            var mdatbox = new Uint8Array(bytes);
            mdatbox[0] = bytes >>> 24 & 0xFF;
            mdatbox[1] = bytes >>> 16 & 0xFF;
            mdatbox[2] = bytes >>> 8 & 0xFF;
            mdatbox[3] = bytes & 0xFF;

            mdatbox.set(MP4.types.mdat, 4);

            var offset = 8; // size + type
            var mp4Samples = [];

            while (samples.length) {
                var aacSample = samples.shift();
                var unit = aacSample.unit;
                var originalDts = aacSample.dts - this._dtsBase;

                if (dtsCorrection == undefined) {
                    if (this._audioNextDts == undefined) {
                        if (this._audioSegmentInfoList.isEmpty()) {
                            dtsCorrection = 0;
                            if (this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty()) {
                                remuxSilentFrame = true;
                            }
                        } else {
                            var lastSample = this._audioSegmentInfoList.getLastSampleBefore(originalDts);
                            if (lastSample != null) {
                                var distance = originalDts - (lastSample.originalDts + lastSample.duration);
                                if (distance <= 3) {
                                    distance = 0;
                                }
                                var expectedDts = lastSample.dts + lastSample.duration + distance;
                                dtsCorrection = originalDts - expectedDts;
                            } else {
                                // lastSample == null
                                dtsCorrection = 0;
                            }
                        }
                    } else {
                        dtsCorrection = originalDts - this._audioNextDts;
                    }
                }

                var dts = originalDts - dtsCorrection;
                if (remuxSilentFrame) {
                    // align audio segment beginDts to match with current video segment's beginDts
                    var videoSegment = this._videoSegmentInfoList.getLastSegmentBefore(originalDts);
                    if (videoSegment != null && videoSegment.beginDts < dts) {
                        silentFrameDuration = dts - videoSegment.beginDts;
                        dts = videoSegment.beginDts;
                    } else {
                        remuxSilentFrame = false;
                    }
                }
                if (firstDts === -1) {
                    firstDts = dts;
                }

                if (remuxSilentFrame) {
                    remuxSilentFrame = false;
                    samples.unshift(aacSample);

                    var frame = this._generateSilentAudio(dts, silentFrameDuration);
                    if (frame == null) {
                        continue;
                    }
                    var _mp4Sample = frame.mp4Sample;
                    var _unit = frame.unit;

                    mp4Samples.push(_mp4Sample);

                    // re-allocate mdatbox buffer with new size, to fit with this silent frame
                    bytes += _unit.byteLength;
                    mdatbox = new Uint8Array(bytes);
                    mdatbox[0] = bytes >>> 24 & 0xFF;
                    mdatbox[1] = bytes >>> 16 & 0xFF;
                    mdatbox[2] = bytes >>> 8 & 0xFF;
                    mdatbox[3] = bytes & 0xFF;
                    mdatbox.set(MP4.types.mdat, 4);

                    // fill data now
                    mdatbox.set(_unit, offset);
                    offset += _unit.byteLength;
                    continue;
                }

                var sampleDuration = 0;

                if (samples.length >= 1) {
                    var nextDts = samples[0].dts - this._dtsBase - dtsCorrection;
                    sampleDuration = nextDts - dts;
                } else {
                    if (mp4Samples.length >= 1) {
                        // use second last sample duration
                        sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                    } else {
                        // the only one sample, use reference sample duration
                        sampleDuration = this._audioMeta.refSampleDuration;
                    }
                }

                var mp4Sample = {
                    dts: dts,
                    pts: dts,
                    cts: 0,
                    size: unit.byteLength,
                    duration: sampleDuration,
                    originalDts: originalDts,
                    flags: {
                        isLeading: 0,
                        dependsOn: 1,
                        isDependedOn: 0,
                        hasRedundancy: 0
                    }
                };
                mp4Samples.push(mp4Sample);
                mdatbox.set(unit, offset);
                offset += unit.byteLength;
            }
            var latest = mp4Samples[mp4Samples.length - 1];
            lastDts = latest.dts + latest.duration;
            this._audioNextDts = lastDts;

            // fill media segment info & add to info list
            var info = new MediaSegmentInfo();
            info.beginDts = firstDts;
            info.endDts = lastDts;
            info.beginPts = firstDts;
            info.endPts = lastDts;
            info.originalBeginDts = mp4Samples[0].originalDts;
            info.originalEndDts = latest.originalDts + latest.duration;
            info.firstSample = new SampleInfo(mp4Samples[0].dts, mp4Samples[0].pts, mp4Samples[0].duration, mp4Samples[0].originalDts, false);
            info.lastSample = new SampleInfo(latest.dts, latest.pts, latest.duration, latest.originalDts, false);
            if (!this._isLive) {
                this._audioSegmentInfoList.append(info);
            }

            track.samples = mp4Samples;
            track.sequenceNumber += track.addcoefficient;

            var moofbox = MP4.moof(track, firstDts);
            track.samples = [];
            track.length = 0;

            this._onMediaSegment('audio', {
                type: 'audio',
                data: this._mergeBoxes(moofbox, mdatbox).buffer,
                sampleCount: mp4Samples.length,
                info: info
            });
        }
    }, {
        key: '_generateSilentAudio',
        value: function _generateSilentAudio(dts, frameDuration) {
            console.log(this.TAG, 'GenerateSilentAudio: dts = ' + dts + ', duration = ' + frameDuration);

            var unit = AAC.getSilentFrame(this._audioMeta.channelCount);
            if (unit == null) {
                console.log(this.TAG, 'Cannot generate silent aac frame for channelCount = ' + this._audioMeta.channelCount);
                return null;
            }

            var mp4Sample = {
                dts: dts,
                pts: dts,
                cts: 0,
                size: unit.byteLength,
                duration: frameDuration,
                originalDts: dts,
                flags: {
                    isLeading: 0,
                    dependsOn: 1,
                    isDependedOn: 0,
                    hasRedundancy: 0
                }
            };

            return {
                unit: unit,
                mp4Sample: mp4Sample
            };
        }
    }, {
        key: '_remuxVideo',
        value: function _remuxVideo(videoTrack) {
            var track = videoTrack;
            var samples = track.samples;
            var dtsCorrection = void 0;
            var firstDts = -1,
                lastDts = -1;
            var firstPts = -1,
                lastPts = -1;

            if (!samples || samples.length === 0) {
                return;
            }

            var bytes = 8 + videoTrack.length;
            var mdatbox = new Uint8Array(bytes);
            mdatbox[0] = bytes >>> 24 & 0xFF;
            mdatbox[1] = bytes >>> 16 & 0xFF;
            mdatbox[2] = bytes >>> 8 & 0xFF;
            mdatbox[3] = bytes & 0xFF;
            mdatbox.set(MP4.types.mdat, 4);

            var offset = 8;
            var mp4Samples = [];
            var info = new MediaSegmentInfo();

            while (samples.length) {
                var avcSample = samples.shift();
                var keyframe = avcSample.isKeyframe;
                var originalDts = avcSample.dts - this._dtsBase;

                if (dtsCorrection == undefined) {
                    if (this._videoNextDts == undefined) {
                        if (this._videoSegmentInfoList.isEmpty()) {
                            dtsCorrection = 0;
                        } else {
                            var lastSample = this._videoSegmentInfoList.getLastSampleBefore(originalDts);
                            if (lastSample != null) {
                                var distance = originalDts - (lastSample.originalDts + lastSample.duration);
                                if (distance <= 3) {
                                    distance = 0;
                                }
                                var expectedDts = lastSample.dts + lastSample.duration + distance;
                                dtsCorrection = originalDts - expectedDts;
                            } else {
                                // lastSample == null
                                dtsCorrection = 0;
                            }
                        }
                    } else {
                        dtsCorrection = originalDts - this._videoNextDts;
                    }
                }

                var dts = originalDts - dtsCorrection;
                var cts = avcSample.cts;
                var pts = dts + cts;

                if (firstDts === -1) {
                    firstDts = dts;
                    firstPts = pts;
                }

                // fill mdat box
                var sampleSize = 0;
                while (avcSample.units.length) {
                    var unit = avcSample.units.shift();
                    var data = unit.data;
                    mdatbox.set(data, offset);
                    offset += data.byteLength;
                    sampleSize += data.byteLength;
                }

                var sampleDuration = 0;

                if (samples.length >= 1) {
                    var nextDts = samples[0].dts - this._dtsBase - dtsCorrection;
                    sampleDuration = nextDts - dts;
                } else {
                    if (mp4Samples.length >= 1) {
                        // lastest sample, use second last duration
                        sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                    } else {
                        // the only one sample, use reference duration
                        sampleDuration = this._videoMeta.refSampleDuration;
                    }
                }

                if (keyframe) {
                    var syncPoint = new SampleInfo(dts, pts, sampleDuration, avcSample.dts, true);
                    syncPoint.fileposition = avcSample.fileposition;
                    info.appendSyncPoint(syncPoint);
                }

                var mp4Sample = {
                    dts: dts,
                    pts: pts,
                    cts: cts,
                    size: sampleSize,
                    isKeyframe: keyframe,
                    duration: sampleDuration,
                    originalDts: originalDts,
                    flags: {
                        isLeading: 0,
                        dependsOn: keyframe ? 2 : 1,
                        isDependedOn: keyframe ? 1 : 0,
                        hasRedundancy: 0,
                        isNonSync: keyframe ? 0 : 1
                    }
                };

                mp4Samples.push(mp4Sample);
            }
            var latest = mp4Samples[mp4Samples.length - 1];
            lastDts = latest.dts + latest.duration;
            lastPts = latest.pts + latest.duration;
            this._videoNextDts = lastDts;

            // fill media segment info & add to info list
            info.beginDts = firstDts;
            info.endDts = lastDts;
            info.beginPts = firstPts;
            info.endPts = lastPts;
            info.originalBeginDts = mp4Samples[0].originalDts;
            info.originalEndDts = latest.originalDts + latest.duration;
            info.firstSample = new SampleInfo(mp4Samples[0].dts, mp4Samples[0].pts, mp4Samples[0].duration, mp4Samples[0].originalDts, mp4Samples[0].isKeyframe);
            info.lastSample = new SampleInfo(latest.dts, latest.pts, latest.duration, latest.originalDts, latest.isKeyframe);
            if (!this._isLive) {
                this._videoSegmentInfoList.append(info);
            }

            track.samples = mp4Samples;
            track.sequenceNumber += track.addcoefficient;

            // workaround for chrome < 50: force first sample as a random access point
            // see https://bugs.chromium.org/p/chromium/issues/detail?id=229412
            if (this._forceFirstIDR) {
                var flags = mp4Samples[0].flags;
                flags.dependsOn = 2;
                flags.isNonSync = 0;
            }

            var moofbox = MP4.moof(track, firstDts);
            track.samples = [];
            track.length = 0;

            this._onMediaSegment('video', {
                type: 'video',
                data: this._mergeBoxes(moofbox, mdatbox).buffer,
                sampleCount: mp4Samples.length,
                info: info
            });
        }
    }, {
        key: '_mergeBoxes',
        value: function _mergeBoxes(moof, mdat) {
            var result = new Uint8Array(moof.byteLength + mdat.byteLength);
            result.set(moof, 0);
            result.set(mdat, moof.byteLength);
            return result;
        }
    }, {
        key: 'onInitSegment',
        get: function get() {
            return this._onInitSegment;
        },
        set: function set(callback) {
            this._onInitSegment = callback;
        }

        /* prototype: function onMediaSegment(type: string, mediaSegment: MediaSegment): void
           MediaSegment: {
               type: string,
               data: ArrayBuffer,
               sampleCount: int32
               info: MediaSegmentInfo
           }
        */

    }, {
        key: 'onMediaSegment',
        get: function get() {
            return this._onMediaSegment;
        },
        set: function set(callback) {
            this._onMediaSegment = callback;
        }
    }]);

    return MP4Remuxer;
}();

/* eslint-disable */
var flv2fmp4 = function (_CustEvent) {
    _inherits(flv2fmp4, _CustEvent);

    /**
     * Creates an instance of flv2fmp4.
     * config 里面有_isLive属性,是否是直播
     * @param {any} config
     *
     * @memberof flv2fmp4
     */
    function flv2fmp4(config) {
        _classCallCheck(this, flv2fmp4);

        var _this = _possibleConstructorReturn(this, (flv2fmp4.__proto__ || _Object$getPrototypeOf(flv2fmp4)).call(this));

        _this._config = { _isLive: false };
        _this._config = _Object$assign(_this._config, config);

        // 外部方法赋值
        _this.onInitSegment = null;
        _this.onMediaSegment = null;
        _this.onMediaInfo = null;
        _this.seekCallBack = null;

        // 内部使用
        _this.loadmetadata = false;
        _this.ftyp_moov = null;
        _this.metaSuccRun = false;
        _this.metas = [];
        _this.parseChunk = null;
        _this.hasVideo = false;
        _this.hasAudio = false;
        _this._error = null;
        // 临时记录seek时间
        _this._pendingResolveSeekPoint = -1;

        // 临时记录flv数据起始时间
        _this._tempBaseTime = 0;

        // 处理flv数据入口
        _this.setflvBase = _this.setflvBasefrist;

        tagdemux._onTrackMetadata = _this.Metadata.bind(_this);
        tagdemux._onMediaInfo = _this.metaSucc.bind(_this);
        tagdemux._onDataAvailable = _this.onDataAvailable.bind(_this);
        tagdemux._onError = _this.error.bind(_this);
        _this.m4mof = new MP4Remuxer(_this._config);
        _this.m4mof.onMediaSegment = _this.onMdiaSegment.bind(_this);
        return _this;
    }

    _createClass(flv2fmp4, [{
        key: 'seek',
        value: function seek(baseTime) {
            this.setflvBase = this.setflvBasefrist;
            if (baseTime == undefined || baseTime == 0) {
                baseTime = 0;
                this._pendingResolveSeekPoint = -1;
            }
            if (this._tempBaseTime != baseTime) {
                this._tempBaseTime = baseTime;
                tagdemux._timestampBase = baseTime;
                this.m4mof.seek(baseTime);
                this.m4mof.insertDiscontinuity();
                this._pendingResolveSeekPoint = baseTime;
            }
        }

        /**
         * 不要主动调用这个接口!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * 第一次接受数据,和seek时候接受数据入口,
         *
         * @param {any} arraybuff
         * @param {any} baseTime
         * @returns
         *
         * @memberof flv2fmp4
         */

    }, {
        key: 'setflvBasefrist',
        value: function setflvBasefrist(arraybuff, baseTime) {
            var offset = 0;
            try {
                offset = flvparse.setFlv(new Uint8Array(arraybuff));
            } catch (error) {
                this.error(error);
            }

            if (flvparse.arrTag.length > 0) {
                this.hasAudio = flvparse._hasAudio;
                this.hasVideo = flvparse._hasVideo;
                if (this._tempBaseTime != 0 && this._tempBaseTime == flvparse.arrTag[0].getTime()) {
                    tagdemux._timestampBase = 0;
                }
                try {
                    tagdemux.moofTag(flvparse.arrTag);
                } catch (error) {
                    this.error(error);
                }

                this.setflvBase = this.setflvBaseUsually;
            }

            return offset;
        }

        /**
         * 不要主动调用这个接口!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * 后续接受数据接口
         * @param {any} arraybuff
         * @param {any} baseTime
         * @returns
         *
         * @memberof flv2fmp4
         */

    }, {
        key: 'setflvBaseUsually',
        value: function setflvBaseUsually(arraybuff, baseTime) {
            var offset = 0;
            try {
                offset = flvparse.setFlv(new Uint8Array(arraybuff));
            } catch (error) {
                this.error(error);
            }
            if (flvparse.arrTag.length > 0) {
                try {
                    tagdemux.moofTag(flvparse.arrTag);
                } catch (error) {
                    this.error(error);
                }
            }

            return offset;
        }

        /**
         * 不要主动调用这个接口!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * moof回调
         *
         * @param {any} track
         * @param {any} value
         *
         * @memberof flv2fmp4
         */

    }, {
        key: 'onMdiaSegment',
        value: function onMdiaSegment(track, value) {

            if (this.onMediaSegment) {
                this.onMediaSegment(new Uint8Array(value.data));
            }
            if (this._pendingResolveSeekPoint != -1 && track == 'video') {
                var seekpoint = this._pendingResolveSeekPoint;
                this._pendingResolveSeekPoint = -1;
                if (this.seekCallBack) {
                    this.seekCallBack(seekpoint);
                }
            }
        }

        /**
         *
         * 音频和视频的初始化tag
         *
         * @param {any} type
         * @param {any} meta
         *
         * @memberof flv2fmp4
         */

    }, {
        key: 'Metadata',
        value: function Metadata(type, meta) {
            switch (type) {
                case 'video':
                    this.metas.push(meta);
                    this.m4mof._videoMeta = meta;
                    if (this.hasVideo && !this.hasAudio) {
                        this.metaSucc();
                        return;
                    }
                    break;
                case 'audio':
                    this.metas.push(meta);
                    this.m4mof._audioMeta = meta;
                    if (!this.hasVideo && this.hasAudio) {
                        this.metaSucc();
                        return;
                    }
                    break;
            }
            if (this.hasVideo && this.hasAudio && this.metaSuccRun && this.metas.length > 1) {
                this.metaSucc();
            }
        }

        /**
         * metadata解读成功后触发及第一个视频tag和第一个音频tag
         *
         * @param {any} mi
         * @returns
         *
         * @memberof flv2fmp4
         */

    }, {
        key: 'metaSucc',
        value: function metaSucc(mi) {
            if (this.onMediaInfo) {
                this.onMediaInfo(mi, { hasAudio: this.hasAudio, hasVideo: this.hasVideo });
            }
            // 获取ftyp和moov
            if (this.metas.length == 0) {
                this.metaSuccRun = true;
                return;
            }

            this.ftyp_moov = MP4.generateInitSegment(this.metas);
            if (this.onInitSegment && this.loadmetadata == false) {

                this.onInitSegment(this.ftyp_moov);
                this.loadmetadata = true;
            }
        }
    }, {
        key: 'onDataAvailable',
        value: function onDataAvailable(audiotrack, videotrack) {
            try {
                this.m4mof.remux(audiotrack, videotrack);
            } catch (e) {
                this.error(e);
            }
        }

        /**
         * 传入flv的二进制数据
         * 统一入口
         * @param {any} arraybuff
         * @param {any} baseTime flv数据开始时间
         * @returns
         *
         * @memberof flv2fmp4
         */

    }, {
        key: 'setflv',
        value: function setflv(arraybuff, baseTime) {
            return this.setflvBase(arraybuff, baseTime);
        }

        /**
         *
         * 本地调试代码,不用理会
         * @param {any} arraybuff
         * @returns
         *
         * @memberof flv2fmp4
         */

    }, {
        key: 'setflvloc',
        value: function setflvloc(arraybuff) {
            var offset = flvparse.setFlv(new Uint8Array(arraybuff));

            if (flvparse.arrTag.length > 0) {
                return flvparse.arrTag;
            }
        }

        /**
         * 
         *  异常抛出处理
         * @param {any} e 
         * @memberof flv2fmp4
         */

    }, {
        key: 'error',
        value: function error(e) {
            if (this._error) {
                this._error(e);
            }
        }
    }]);

    return flv2fmp4;
}(CustEvent);

/**
 * 封装的对外类,有些方法不想对外暴露,所以封装这么一个类
 *
 * @class foreign
 */


var foreign = function (_CustEvent2) {
    _inherits(foreign, _CustEvent2);

    function foreign(config) {
        _classCallCheck(this, foreign);

        var _this2 = _possibleConstructorReturn(this, (foreign.__proto__ || _Object$getPrototypeOf(foreign)).call(this));

        _this2.f2m = new flv2fmp4(config);
        _this2.f2m._error = _this2.error;
        // 外部方法赋值
        _this2._onInitSegment = null;
        _this2._onMediaSegment = null;
        _this2._onMediaInfo = null;
        _this2._seekCallBack = null;
        return _this2;
    }

    _createClass(foreign, [{
        key: 'error',
        value: function error(e) {
            this.emit('error', e.type);
        }
        /**
         *
         * 跳转
         * @param {any} basetime  跳转时间
         *
         * @memberof foreign
         */

    }, {
        key: 'seek',
        value: function seek(basetime) {
            this.f2m.seek(basetime);
        }

        /**
         * 传入flv的二进制数据
         * 统一入口
         * @param {any} arraybuff
         * @returns
         *
         * @memberof flv2fmp4
         */

    }, {
        key: 'setflv',
        value: function setflv(arraybuff) {
            return this.f2m.setflv(arraybuff, 0);
        }

        /**
         *
         * 本地调试代码,不用理会
         * @param {any} arraybuff
         * @returns
         *
         * @memberof flv2fmp4
         */

    }, {
        key: 'setflvloc',
        value: function setflvloc(arraybuff) {
            return this.f2m.setflvloc(arraybuff);
        }

        /**
         * 赋值初始化seg接受方法
         *
         *
         * @memberof foreign
         */

    }, {
        key: 'onInitSegment',
        set: function set(fun) {
            this._onInitSegment = fun;
            this.f2m.onInitSegment = fun;
        }

        /**
         * 赋值moof接受方法
         *
         *
         * @memberof foreign
         */

    }, {
        key: 'onMediaSegment',
        set: function set(fun) {
            this._onMediaSegment = fun;
            this.f2m.onMediaSegment = fun;
        }

        /**
         * 赋值metadata接受方法
         *
         *
         * @memberof foreign
         */

    }, {
        key: 'onMediaInfo',
        set: function set(fun) {
            this._onMediaInfo = fun;
            this.f2m.onMediaInfo = fun;
        }

        /**
         * 赋值是否跳转回调接受方法
         *
         *
         * @memberof foreign
         */

    }, {
        key: 'seekCallBack',
        set: function set(fun) {
            this._seekCallBack = fun;
            this.f2m.seekCallBack = fun;
        }
    }]);

    return foreign;
}(CustEvent);

// const F2M = require('chimee-flv2fmp4');
/**
 * Transmuxer 控制层
 * @class Transmuxer
 * @param {mediaSource} mediaSource
 * @param {object} config
 */

var Transmuxer = function (_CustEvent) {
  _inherits(Transmuxer, _CustEvent);

  function Transmuxer(mediaSource, config) {
    _classCallCheck(this, Transmuxer);

    var _this = _possibleConstructorReturn(this, (Transmuxer.__proto__ || _Object$getPrototypeOf(Transmuxer)).call(this));

    _this.config = {};
    _this.tag = 'transmuxer';
    _this.loader = null;
    _this.CPU = null;
    _this.keyframePoint = false;
    _this.w = null;
    _Object$assign(_this.config, config);
    if (_this.config.webWorker) {
      _this.w = index$2('./transmuxer-worker');
      _this.w.postMessage({ cmd: 'init' });
      _this.w.addEventListener('message', function (e) {
        _this.parseCallback(e.data);
      });
    }
    return _this;
  }
  /**
  * instance ioloader
  */


  _createClass(Transmuxer, [{
    key: 'loadSource',
    value: function loadSource() {
      if (this.config.webWorker) {
        this.w.postMessage({ cmd: 'loadSource' });
        // this.loader.arrivalDataCallback = this.arrivalDataCallbackWorker.bind(this);
      } else {
        this.loader = new Ioloader(this.config);
        this.loader.arrivalDataCallback = this.arrivalDataCallback.bind(this);
        this.loader.open();
      }
    }
    /**
     * data arrive to webworker
     */
    // arrivalDataCallbackWorker (data, byteStart, keyframePoint) {
    //   if(keyframePoint) {
    //     this.w.postMessage({cmd: 'seek', source: data});
    //   }
    //   this.w.postMessage({cmd: 'pipe', source: data});
    //   return;
    // }
    /**
    * loader data callback
    *  @param {arraybuffer} 数据
    *  @param {number} 开始的起点
    *  @param {keyframePoint} 关键帧点
    */

  }, {
    key: 'arrivalDataCallback',
    value: function arrivalDataCallback(data, byteStart, keyframePoint) {
      var consumed = 0;
      if (!this.CPU) {
        this.CPU = new foreign();
        this.CPU.onInitSegment = this.onRemuxerInitSegmentArrival.bind(this);
        this.CPU.onMediaSegment = this.onRemuxerMediaSegmentArrival.bind(this);
        this.CPU.onError = this.onCPUError.bind(this);
        this.CPU.onMediaInfo = this.onMediaInfo.bind(this);
        this.CPU.on('error', function (handle) {
          console.log(handle);
        });
      }
      if (keyframePoint) {
        this.keyframePoint = true;
        this.CPU.seek(keyframePoint);
      }
      consumed = this.CPU.setflv(data);
      return consumed;
    }

    /**
     * loader data callback
     *  @param {arraybuffer} 数据
     */

  }, {
    key: 'parseCallback',
    value: function parseCallback(data) {
      switch (data.cmd) {
        case 'pipeCallback':
          data.source;
          break;
        case 'mediaSegmentInit':
          this.emit('mediaSegmentInit', data.source);
          break;
        case 'mediaSegment':
          this.emit('mediaSegment', data.source);
          break;
        case 'mediainfo':
          this.emit('mediainfo', data.source);
          break;
      }
    }

    /**
     * Demux error
     *  @param {string} 类型
     *  @param {string} 信息
     */

  }, {
    key: 'onDemuxError',
    value: function onDemuxError(type, info) {
      Log.error(this.tag, 'DemuxError: type = ' + type + ', info = ' + info);
      this.emit('DemuxError', type, info);
    }

    /**
     * Demux mediaInfo
     *  @param {object} 视频头信息
     */

  }, {
    key: 'onMediaInfo',
    value: function onMediaInfo(mediaInfo) {
      this.mediaInfo = mediaInfo;
      this.emit('mediaInfo', mediaInfo);
    }

    /**
     * remuxer init segment arrival
     *  @param {arraybuffer} 视频数据
     */

  }, {
    key: 'onRemuxerInitSegmentArrival',
    value: function onRemuxerInitSegmentArrival(data) {
      this.emit('mediaSegmentInit', data);
    }

    /**
     * remuxer  segment arrival
     *  @param {arraybuffer} 视频数据
     */

  }, {
    key: 'onRemuxerMediaSegmentArrival',
    value: function onRemuxerMediaSegmentArrival(data) {
      this.emit('mediaSegment', data);
    }

    /**
     * cpu error
     *  @param {object} 错误信息
     */

  }, {
    key: 'onCPUError',
    value: function onCPUError(handle) {
      this.emit('ERROR', handle.data);
    }

    /**
     * get video mediaInfo
     */

  }, {
    key: 'getMediaInfo',
    value: function getMediaInfo() {
      return this.mediaInfo;
    }

    /**
    * stop loader
    */

  }, {
    key: 'pause',
    value: function pause() {
      this.loader.pause();
    }

    /**
     * resume loader
     */

  }, {
    key: 'resume',
    value: function resume() {
      this.loader.resume();
    }
    /**
    * flv can seek
    */

  }, {
    key: 'isSeekable',
    value: function isSeekable() {
      return this.mediaInfo.hasKeyframesIndex;
    }
    /**
     * video seek
     * @param {object} 关键帧集合
     */

  }, {
    key: 'seek',
    value: function seek(keyframe) {
      if (!this.isSeekable()) {
        this.emit('ERROR', '这个flv视频不支持seek');
        return false;
      }
      this.loader = new Ioloader(this.config);
      this.loader.arrivalDataCallback = this.arrivalDataCallback.bind(this);
      this.loader.seek(keyframe.keyframePoint, false, keyframe.keyframetime);
    }

    /**
     * refresh
     */

  }, {
    key: 'refresh',
    value: function refresh() {
      this.pause();
      this.loader = new Ioloader(this.config);
      this.loader.arrivalDataCallback = this.arrivalDataCallback.bind(this);
      this.loader.open();
    }

    /**
     * destroy
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.loader.destroy();
      this.loader = null;
      this.CPU = null;
    }

    /**
     * get nearlest keyframe
     */

  }, {
    key: 'getNearlestKeyframe',
    value: function getNearlestKeyframe(times) {
      if (this.mediaInfo && this.mediaInfo.keyframesIndex) {
        var keyframesList = this.mediaInfo.keyframesIndex.times;
        var keyframesPositions = this.mediaInfo.keyframesIndex.filepositions;
        var binarySearch = function binarySearch(list, val) {
          var length = list.length;
          var index = Math.floor(length / 2);
          if (length === 1) {
            var position = keyframesList.indexOf(list[0]);
            return {
              keyframetime: list[0],
              keyframePoint: keyframesPositions[position]
            };
          } else if (list[index] > val) {
            return binarySearch(list.slice(0, index), val);
          } else if (list[index] < val) {
            return binarySearch(list.slice(index), val);
          } else {
            var _position = keyframesList.indexOf(list[0]);
            return {
              keyframetime: list[0],
              keyframePoint: keyframesPositions[_position]
            };
          }
        };
        return binarySearch(keyframesList, times);
      } else {
        return 0;
      }
    }
  }]);

  return Transmuxer;
}(CustEvent);

var defaultConfig = {
  isLive: false,
  autoPlay: false,
  box: 'flv',
  prestrain: 30,
  alwaysSeekKeyframe: true,
  lazyLoadMaxDuration: 2 * 60,
  lazyLoadRecoverDuration: 30,
  lockInternalProperty: false,
  debug: true,
  webWorker: false,
  autoCleanupSourceBuffer: true,
  autoCleanupMaxBackwardDuration: 30,
  autoCleanupMinBackwardDuration: 30
};

/**
 * flv 控制层
 * @export
 * @class mp4
 */

var Flv = function (_CustEvent) {
  _inherits(Flv, _CustEvent);

  function Flv(videodom, config) {
    _classCallCheck(this, Flv);

    var _this2 = _possibleConstructorReturn(this, (Flv.__proto__ || _Object$getPrototypeOf(Flv)).call(this));

    _this2.tag = 'FLV-player';
    _this2.video = videodom;
    _this2.box = 'flv';
    _this2.config = defaultConfig;
    _this2.timer = null;
    deepAssign(_this2.config, config);
    _this2.requestSetTime = false;
    _this2.bindEvents();
    _this2.attachMedia();
    return _this2;
  }
  /**
   * 内部控制能否设置currentTime
   */


  _createClass(Flv, [{
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

    /**
     * 绑定事件
     */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this3 = this;

      if (this.video) {
        this.video.addEventListener('canplay', function () {
          if (_this3.config.isLive) {
            _this3.video.play();
          }
          if (_this3.config.lockInternalProperty) {
            _this3.internalPropertyHandle();
          }
        });
      }
    }

    /**
     * 建立 mediaSource
     */

  }, {
    key: 'attachMedia',
    value: function attachMedia() {
      var _this4 = this;

      this.mediaSource = new MSEController(this.video, this.config);
      this.mediaSource.on('source_open', function () {
        _this4.transmuxer.loadSource();
      });
      this.mediaSource.on('bufferFull', function () {
        _this4.pauseTransmuxer();
      });
      this.mediaSource.on('mediaInfo', function (mediaInfo) {
        _this4.emit('mediaInfo', mediaInfo);
      });
      this.mediaSource.on('updateend', this.onmseUpdateEnd.bind(this));
    }

    /**
     * load
     * @param {string} video url
     */

  }, {
    key: 'load',
    value: function load(src) {
      var _this5 = this;

      if (src) {
        this.config.src = src;
      }
      this.video.src = URL.createObjectURL(this.mediaSource.mediaSource);
      this.video.addEventListener('seeking', throttle(this._seek.bind(this), 200, { leading: false }));
      this.transmuxer = new Transmuxer(this.mediaSource, this.config);
      this.transmuxer.on('mediaSegment', function (handle) {
        _this5.mediaSource.emit('mediaSegment', handle.data);
      });
      this.transmuxer.on('mediaSegmentInit', function (handle) {
        _this5.mediaSource.emit('mediaSegmentInit', handle.data);
      });
      this.transmuxer.on('error', function (handle) {
        _this5.emit('error', handle.data);
      });
    }

    /**
     * seek in buffered
     * @param {number} seek time
     */

  }, {
    key: 'isTimeinBuffered',
    value: function isTimeinBuffered(seconds) {
      var buffered = this.video.buffered;
      for (var i = 0; i < buffered.length; i++) {
        var from = buffered.start(i);
        var to = buffered.end(i);
        if (seconds >= from && seconds < to) {
          return true;
        }
      }
      return false;
    }

    /**
     * get current buffer end
     */

  }, {
    key: 'getCurrentBufferEnd',
    value: function getCurrentBufferEnd() {
      var buffered = this.video.buffered;
      var currentTime = this.video.currentTime;
      var currentRangeEnd = 0;

      for (var i = 0; i < buffered.length; i++) {
        var start = buffered.start(i);
        var end = buffered.end(i);
        if (start <= currentTime && currentTime < end) {
          currentRangeEnd = end;
          return currentRangeEnd;
        }
      }
    }
    /**
     * _seek
     * @param {number} seek time
     */

  }, {
    key: '_seek',
    value: function _seek(seconds) {
      this.currentTimeLock = true;
      this.timer = null;

      var currentTime = seconds && !isNaN(seconds) ? seconds : this.video.currentTime;

      if (this.requestSetTime) {
        this.requestSetTime = false;
        this.currentTimeLock = false;
        return;
      }
      // const buffered = this.video.buffered;
      if (this.isTimeinBuffered(currentTime)) {
        if (this.config.alwaysSeekKeyframe) {
          var nearlestkeyframe = this.transmuxer.getNearlestKeyframe(Math.floor(currentTime * 1000));
          if (nearlestkeyframe) {
            this.requestSetTime = true;
            this.video.currentTime = nearlestkeyframe.keyframetime / 1000;
          }
        }
      } else {
        this.transmuxer.pause();
        var _nearlestkeyframe = this.transmuxer.getNearlestKeyframe(Math.floor(currentTime * 1000));
        currentTime = _nearlestkeyframe.keyframetime / 1000;
        this.transmuxer.seek(_nearlestkeyframe);
        this.mediaSource.seek(currentTime);
        this.requestSetTime = true;
        this.video.currentTime = currentTime;
        window.clearInterval(this.timer);
        this.timer = null;
      }
      this.currentTimeLock = false;
      return currentTime;
    }

    /**
     * mediaSource updateend
     */

  }, {
    key: 'onmseUpdateEnd',
    value: function onmseUpdateEnd() {
      if (this.config.isLive) {
        return;
      }
      var currentBufferEnd = this.getCurrentBufferEnd();
      var currentTime = this.video.currentTime;
      if (currentBufferEnd >= currentTime + this.config.lazyLoadMaxDuration && this.timer === null) {
        Log.verbose(this.tag, 'Maximum buffering duration exceeded, suspend transmuxing task');
        this.pauseTransmuxer();
      }
    }

    /**
     * 心跳
     */

  }, {
    key: 'heartbeat',
    value: function heartbeat() {
      var currentTime = this.video.currentTime;
      var buffered = this.video.buffered;

      var needResume = false;

      for (var i = 0; i < buffered.length; i++) {
        var from = buffered.start(i);
        var to = buffered.end(i);
        if (currentTime >= from && currentTime < to) {
          if (currentTime >= to - this.config.lazyLoadRecoverDuration) {
            needResume = true;
          }
          break;
        }
      }

      if (needResume) {
        window.clearInterval(this.timer);
        this.timer = null;
        Log.verbose(this.tag, 'Continue loading from paused position');
        this.transmuxer.resume();
      }
    }

    /**
     * 暂停 transmuxer
     */

  }, {
    key: 'pauseTransmuxer',
    value: function pauseTransmuxer() {
      this.transmuxer.pause();
      if (!this.timer) {
        this.timer = setInterval(this.heartbeat.bind(this), 1000);
      }
    }
  }, {
    key: 'resume',
    value: function resume() {}

    /**
     * destroy
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.video) {
        this.video.src = '';
        this.video.removeAttribute('src');
        this.transmuxer.destroy();
        this.transmuxer = null;
        this.mediaSource.destroy();
        this.mediaSource = null;
      }
    }
  }, {
    key: 'seek',
    value: function seek(seconds) {
      return this._seek(seconds);
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
      this.transmuxer.refresh();
    }
  }]);

  return Flv;
}(CustEvent);

return Flv;

})));
