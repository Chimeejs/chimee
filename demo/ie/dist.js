(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (factory());
}(this, function() {


  const commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};


  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  const _global = createCommonjsModule(function(module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    const global = module.exports = typeof window !== 'undefined' && window.Math == Math
      ? window : typeof self !== 'undefined' && self.Math == Math ? self
      // eslint-disable-next-line no-new-func
        : Function('return this')();
    if (typeof __g === 'number') __g = global; // eslint-disable-line no-undef
  });

  const hasOwnProperty = {}.hasOwnProperty;
  const _has = function(it, key) {
    return hasOwnProperty.call(it, key);
  };

  const _fails = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  const _descriptors = !_fails(function() {
    return Object.defineProperty({}, 'a', { get() { return 7; } }).a != 7;
  });

  const _core = createCommonjsModule(function(module) {
    const core = module.exports = { version: '2.5.0' };
    if (typeof __e === 'number') __e = core; // eslint-disable-line no-undef
  });

  const _isObject = function(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  const _anObject = function(it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  const document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  const is = _isObject(document$1) && _isObject(document$1.createElement);
  const _domCreate = function(it) {
    return is ? document$1.createElement(it) : {};
  };

  const _ie8DomDefine = !_descriptors && !_fails(function() {
    return Object.defineProperty(_domCreate('div'), 'a', { get() { return 7; } }).a != 7;
  });

  const _toPrimitive = function(it, S) {
    if (!_isObject(it)) return it;
    let fn,
      val;
    if (S && typeof (fn = it.toString) === 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) === 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) === 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  const dP$1 = Object.defineProperty;

  const f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) {
      try {
        return dP$1(O, P, Attributes);
      } catch (e) { /* empty */ }
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  const _objectDp = {
    f,
  };

  const _propertyDesc = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value,
    };
  };

  const _hide = _descriptors ? function(object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };

  let id = 0;
  const px = Math.random();
  const _uid = function(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  const _redefine = createCommonjsModule(function(module) {
    const SRC = _uid('src');
    const TO_STRING = 'toString';
    const $toString = Function[TO_STRING];
    const TPL = ('' + $toString).split(TO_STRING);

    _core.inspectSource = function(it) {
      return $toString.call(it);
    };

    (module.exports = function(O, key, val, safe) {
      const isFunction = typeof val === 'function';
      if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      }
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return typeof this === 'function' && this[SRC] || $toString.call(this);
    });
  });

  const _aFunction = function(it) {
    if (typeof it !== 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  const _ctx = function(fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function(a) {
        return fn.call(that, a);
      };
      case 2: return function(a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function(a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function(/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  const PROTOTYPE$1 = 'prototype';

  var $export = function(type, name, source) {
    const IS_FORCED = type & $export.F;
    const IS_GLOBAL = type & $export.G;
    const IS_STATIC = type & $export.S;
    const IS_PROTO = type & $export.P;
    const IS_BIND = type & $export.B;
    const target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE$1];
    const exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    const expProto = exports[PROTOTYPE$1] || (exports[PROTOTYPE$1] = {});
    let key,
      own,
      out,
      exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
    // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out === 'function' ? _ctx(Function.call, out) : out;
      // extend global
      if (target) _redefine(target, key, out, type & $export.U);
      // export
      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global.core = _core;
  // type bitmap
  $export.F = 1; // forced
  $export.G = 2; // global
  $export.S = 4; // static
  $export.P = 8; // proto
  $export.B = 16; // bind
  $export.W = 32; // wrap
  $export.U = 64; // safe
  $export.R = 128; // real proto method for `library`
  const _export = $export;

  const _meta = createCommonjsModule(function(module) {
    const META = _uid('meta');


    const setDesc = _objectDp.f;
    let id = 0;
    const isExtensible = Object.isExtensible || function() {
      return true;
    };
    const FREEZE = !_fails(function() {
      return isExtensible(Object.preventExtensions({}));
    });
    const setMeta = function(it) {
      setDesc(it, META, { value: {
        i: 'O' + ++id, // object ID
        w: {}, // weak collections IDs
      } });
    };
    const fastKey = function(it, create) {
      // return primitive with prefix
      if (!_isObject(it)) return typeof it === 'symbol' ? it : (typeof it === 'string' ? 'S' : 'P') + it;
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
    const getWeak = function(it, create) {
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
    const onFreeze = function(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
      return it;
    };
    var meta = module.exports = {
      KEY: META,
      NEED: false,
      fastKey,
      getWeak,
      onFreeze,
    };
  });

  const SHARED = '__core-js_shared__';
  const store = _global[SHARED] || (_global[SHARED] = {});
  const _shared = function(key) {
    return store[key] || (store[key] = {});
  };

  const _wks = createCommonjsModule(function(module) {
    const store = _shared('wks');

    const Symbol = _global.Symbol;
    const USE_SYMBOL = typeof Symbol === 'function';

    const $exports = module.exports = function(name) {
      return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
    };

    $exports.store = store;
  });

  const def = _objectDp.f;

  const TAG = _wks('toStringTag');

  const _setToStringTag = function(it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };

  const f$1 = _wks;

  const _wksExt = {
    f: f$1,
  };

  const _library = false;

  const defineProperty = _objectDp.f;
  const _wksDefine = function(name) {
    const $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
  };

  const toString = {}.toString;

  const _cof = function(it) {
    return toString.call(it).slice(8, -1);
  };

  const _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  const _defined = function(it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  const _toIobject = function(it) {
    return _iobject(_defined(it));
  };

  // 7.1.4 ToInteger
  const ceil = Math.ceil;
  const floor = Math.floor;
  const _toInteger = function(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  const min = Math.min;
  const _toLength = function(it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  const max = Math.max;
  const min$1 = Math.min;
  const _toAbsoluteIndex = function(index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  const _arrayIncludes = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      const O = _toIobject($this);
      const length = _toLength(O.length);
      let index = _toAbsoluteIndex(fromIndex, length);
      let value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) {
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        }
      } else {
        for (;length > index; index++) {
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
        }
      } return !IS_INCLUDES && -1;
    };
  };

  const shared = _shared('keys');

  const _sharedKey = function(key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  const arrayIndexOf = _arrayIncludes(false);
  const IE_PROTO = _sharedKey('IE_PROTO');

  const _objectKeysInternal = function(object, names) {
    const O = _toIobject(object);
    let i = 0;
    const result = [];
    let key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) {
      if (_has(O, key = names[i++])) {
        ~arrayIndexOf(result, key) || result.push(key);
      }
    }
    return result;
  };

  // IE 8- don't enum bug keys
  const _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  const _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  const _keyof = function(object, el) {
    const O = _toIobject(object);
    const keys = _objectKeys(O);
    const length = keys.length;
    let index = 0;
    let key;
    while (length > index) if (O[key = keys[index++]] === el) return key;
  };

  const f$2 = Object.getOwnPropertySymbols;

  const _objectGops = {
    f: f$2,
  };

  const f$3 = {}.propertyIsEnumerable;

  const _objectPie = {
    f: f$3,
  };

  const _enumKeys = function(it) {
    const result = _objectKeys(it);
    const getSymbols = _objectGops.f;
    if (getSymbols) {
      const symbols = getSymbols(it);
      const isEnum = _objectPie.f;
      let i = 0;
      let key;
      while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
    } return result;
  };

  const _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  };

  const _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    const keys = _objectKeys(Properties);
    const length = keys.length;
    let i = 0;
    let P;
    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  const document$2 = _global.document;
  const _html = document$2 && document$2.documentElement;

  const IE_PROTO$1 = _sharedKey('IE_PROTO');
  const Empty = function() { /* empty */ };
  const PROTOTYPE$2 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function() {
  // Thrash, waste and sodomy: IE GC bug
    const iframe = _domCreate('iframe');
    let i = _enumBugKeys.length;
    const lt = '<';
    const gt = '>';
    let iframeDocument;
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
    while (i--) delete createDict[PROTOTYPE$2][_enumBugKeys[i]];
    return createDict();
  };

  const _objectCreate = Object.create || function create(O, Properties) {
    let result;
    if (O !== null) {
      Empty[PROTOTYPE$2] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$2] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
  };

  const hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  const f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
  };

  const _objectGopn = {
    f: f$5,
  };

  const gOPN$1 = _objectGopn.f;
  const toString$1 = {}.toString;

  const windowNames = typeof window === 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  const getWindowNames = function(it) {
    try {
      return gOPN$1(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  const f$4 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
  };

  const _objectGopnExt = {
    f: f$4,
  };

  const gOPD$1 = Object.getOwnPropertyDescriptor;

  const f$6 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject(O);
    P = _toPrimitive(P, true);
    if (_ie8DomDefine) {
      try {
        return gOPD$1(O, P);
      } catch (e) { /* empty */ }
    }
    if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
  };

  const _objectGopd = {
    f: f$6,
  };

  const META = _meta.KEY;


  const gOPD = _objectGopd.f;
  const dP = _objectDp.f;
  const gOPN = _objectGopnExt.f;
  let $Symbol = _global.Symbol;
  const $JSON = _global.JSON;
  const _stringify = $JSON && $JSON.stringify;
  const PROTOTYPE = 'prototype';
  const HIDDEN = _wks('_hidden');
  const TO_PRIMITIVE = _wks('toPrimitive');
  const isEnum = {}.propertyIsEnumerable;
  const SymbolRegistry = _shared('symbol-registry');
  const AllSymbols = _shared('symbols');
  const OPSymbols = _shared('op-symbols');
  const ObjectProto = Object[PROTOTYPE];
  const USE_NATIVE = typeof $Symbol === 'function';
  const QObject = _global.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  let setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  const setSymbolDesc = _descriptors && _fails(function() {
    return _objectCreate(dP({}, 'a', {
      get() { return dP(this, 'a', { value: 7 }).a; },
    })).a != 7;
  }) ? function(it, key, D) {
      const protoDesc = gOPD(ObjectProto, key);
      if (protoDesc) delete ObjectProto[key];
      dP(it, key, D);
      if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
    } : dP;

  const wrap = function(tag) {
    const sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE]);
    sym._k = tag;
    return sym;
  };

  const isSymbol = USE_NATIVE && typeof $Symbol.iterator === 'symbol' ? function(it) {
    return typeof it === 'symbol';
  } : function(it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
    _anObject(it);
    key = _toPrimitive(key, true);
    _anObject(D);
    if (_has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has(it, HIDDEN)) dP(it, HIDDEN, _propertyDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
      } return setSymbolDesc(it, key, D);
    } return dP(it, key, D);
  };
  const $defineProperties = function defineProperties(it, P) {
    _anObject(it);
    const keys = _enumKeys(P = _toIobject(P));
    let i = 0;
    const l = keys.length;
    let key;
    while (l > i) $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  const $create = function create$$1(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
  };
  const $propertyIsEnumerable = function propertyIsEnumerable(key) {
    const E = isEnum.call(this, key = _toPrimitive(key, true));
    if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
    return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  const $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive(key, true);
    if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
    const D = gOPD(it, key);
    if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  const $getOwnPropertyNames = function getOwnPropertyNames(it) {
    const names = gOPN(_toIobject(it));
    const result = [];
    let i = 0;
    let key;
    while (names.length > i) {
      if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    } return result;
  };
  const $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    const IS_OP = it === ObjectProto;
    const names = gOPN(IS_OP ? OPSymbols : _toIobject(it));
    const result = [];
    let i = 0;
    let key;
    while (names.length > i) {
      if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
    } return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      const tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function(value) {
        if (this === ObjectProto) $set.call(OPSymbols, value);
        if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc(1, value));
      };
      if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
      return wrap(tag);
    };
    _redefine($Symbol[PROTOTYPE], 'toString', function toString() {
      return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors && !_library) {
      _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    _wksExt.f = function(name) {
      return wrap(_wks(name));
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

  for (let es6Symbols = (
      // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
      'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
    ).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

  for (let wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

  _export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
    for(key) {
      return _has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(key) {
      if (isSymbol(key)) return _keyof(SymbolRegistry, key);
      throw TypeError(key + ' is not a symbol!');
    },
    useSetter() { setter = true; },
    useSimple() { setter = false; },
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
    getOwnPropertySymbols: $getOwnPropertySymbols,
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function() {
    const S = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols
    return _stringify([ S ]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      const args = [ it ];
      let i = 1;
      let replacer,
        $replacer;
      while (arguments.length > i) args.push(arguments[i++]);
      replacer = args[1];
      if (typeof replacer === 'function') $replacer = replacer;
      if ($replacer || !_isArray(replacer)) {
        replacer = function(key, value) {
          if ($replacer) value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
      }
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    },
  });

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  _setToStringTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  _setToStringTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  _setToStringTag(_global.JSON, 'JSON', true);

  _export(_export.S, 'Object', { create: _objectCreate });

  _export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

  _export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

  const _objectSap = function(KEY, exec) {
    const fn = (_core.Object || {})[KEY] || Object[KEY];
    const exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function() { fn(1); }), 'Object', exp);
  };

  const $getOwnPropertyDescriptor$1 = _objectGopd.f;

  _objectSap('getOwnPropertyDescriptor', function() {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor$1(_toIobject(it), key);
    };
  });

  const _toObject = function(it) {
    return Object(_defined(it));
  };

  const IE_PROTO$2 = _sharedKey('IE_PROTO');
  const ObjectProto$1 = Object.prototype;

  const _objectGpo = Object.getPrototypeOf || function(O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
    if (typeof O.constructor === 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto$1 : null;
  };

  _objectSap('getPrototypeOf', function() {
    return function getPrototypeOf$$1(it) {
      return _objectGpo(_toObject(it));
    };
  });

  _objectSap('keys', function() {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  _objectSap('getOwnPropertyNames', function() {
    return _objectGopnExt.f;
  });

  const meta = _meta.onFreeze;

  _objectSap('freeze', function($freeze) {
    return function freeze(it) {
      return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
    };
  });

  const meta$1 = _meta.onFreeze;

  _objectSap('seal', function($seal) {
    return function seal(it) {
      return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
    };
  });

  const meta$2 = _meta.onFreeze;

  _objectSap('preventExtensions', function($preventExtensions) {
    return function preventExtensions(it) {
      return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
    };
  });

  _objectSap('isFrozen', function($isFrozen) {
    return function isFrozen(it) {
      return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
    };
  });

  _objectSap('isSealed', function($isSealed) {
    return function isSealed(it) {
      return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
    };
  });

  _objectSap('isExtensible', function($isExtensible) {
    return function isExtensible(it) {
      return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
    };
  });

  const $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  const _objectAssign = !$assign || _fails(function() {
    const A = {};
    const B = {};
    // eslint-disable-next-line no-undef
    const S = Symbol();
    const K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function(k) { B[k] = k; });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
      const T = _toObject(target);
      const aLen = arguments.length;
      let index = 1;
      const getSymbols = _objectGops.f;
      const isEnum = _objectPie.f;
      while (aLen > index) {
        const S = _iobject(arguments[index++]);
        const keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
        const length = keys.length;
        let j = 0;
        var key;
        while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
      } return T;
    } : $assign;

  _export(_export.S + _export.F, 'Object', { assign: _objectAssign });

  // 7.2.9 SameValue(x, y)
  const _sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

  _export(_export.S, 'Object', { is: _sameValue });

  const check = function(O, proto) {
    _anObject(O);
    if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  const _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function(test, buggy, set) {
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
    check,
  };

  _export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

  const TAG$1 = _wks('toStringTag');
  // ES3 wrong here
  const ARG = _cof(function() { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  const tryGet = function(it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  const _classof = function(it) {
    let O,
      T,
      B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG$1)) === 'string' ? T
      // builtinTag case
        : ARG ? _cof(O)
        // ES3 arguments fallback
          : (B = _cof(O)) == 'Object' && typeof O.callee === 'function' ? 'Arguments' : B;
  };

  const test = {};
  test[_wks('toStringTag')] = 'z';
  if (test + '' != '[object z]') {
    _redefine(Object.prototype, 'toString', function toString() {
      return '[object ' + _classof(this) + ']';
    }, true);
  }

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  const _invoke = function(fn, args, that) {
    const un = that === undefined;
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

  const arraySlice = [].slice;
  const factories = {};

  const construct = function(F, len, args) {
    if (!(len in factories)) {
      for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
      // eslint-disable-next-line no-new-func
      factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
    } return factories[len](F, args);
  };

  const _bind = Function.bind || function bind(that /* , ...args */) {
    const fn = _aFunction(this);
    const partArgs = arraySlice.call(arguments, 1);
    var bound = function(/* args... */) {
      const args = partArgs.concat(arraySlice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
    };
    if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
    return bound;
  };

  _export(_export.P, 'Function', { bind: _bind });

  const dP$2 = _objectDp.f;
  const FProto = Function.prototype;
  const nameRE = /^\s*function ([^ (]*)/;
  const NAME = 'name';

  // 19.2.4.2 name
  NAME in FProto || _descriptors && dP$2(FProto, NAME, {
    configurable: true,
    get() {
      try {
        return ('' + this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    },
  });

  const HAS_INSTANCE = _wks('hasInstance');
  const FunctionProto = Function.prototype;
  // 19.2.3.6 Function.prototype[@@hasInstance](V)
  if (!(HAS_INSTANCE in FunctionProto)) {
    _objectDp.f(FunctionProto, HAS_INSTANCE, { value(O) {
      if (typeof this !== 'function' || !_isObject(O)) return false;
      if (!_isObject(this.prototype)) return O instanceof this;
      // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
      while (O = _objectGpo(O)) if (this.prototype === O) return true;
      return false;
    } });
  }

  const _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  const space = '[' + _stringWs + ']';
  const non = '\u200b\u0085';
  const ltrim = RegExp('^' + space + space + '*');
  const rtrim = RegExp(space + space + '*$');

  const exporter = function(KEY, exec, ALIAS) {
    const exp = {};
    const FORCE = _fails(function() {
      return !!_stringWs[KEY]() || non[KEY]() != non;
    });
    const fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
    if (ALIAS) exp[ALIAS] = fn;
    _export(_export.P + _export.F * FORCE, 'String', exp);
  };

  // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim = exporter.trim = function(string, TYPE) {
    string = String(_defined(string));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };

  const _stringTrim = exporter;

  const $parseInt = _global.parseInt;
  const $trim = _stringTrim.trim;

  const hex = /^[-+]?0[xX]/;

  const _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
    const string = $trim(String(str), 3);
    return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
  } : $parseInt;

  _export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

  const $parseFloat = _global.parseFloat;
  const $trim$1 = _stringTrim.trim;

  const _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
    const string = $trim$1(String(str), 3);
    const result = $parseFloat(string);
    return result === 0 && string.charAt(0) == '-' ? -0 : result;
  } : $parseFloat;

  _export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

  const setPrototypeOf = _setProto.set;
  const _inheritIfRequired = function(that, target, C) {
    const S = target.constructor;
    let P;
    if (S !== C && typeof S === 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
      setPrototypeOf(that, P);
    } return that;
  };

  const gOPN$3 = _objectGopn.f;
  const gOPD$2 = _objectGopd.f;
  const dP$3 = _objectDp.f;
  const $trim$2 = _stringTrim.trim;
  const NUMBER = 'Number';
  let $Number = _global[NUMBER];
  const Base = $Number;
  const proto = $Number.prototype;
  // Opera ~12 has broken Object#toString
  const BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
  const TRIM = 'trim' in String.prototype;

  // 7.1.3 ToNumber(argument)
  const toNumber = function(argument) {
    let it = _toPrimitive(argument, false);
    if (typeof it === 'string' && it.length > 2) {
      it = TRIM ? it.trim() : $trim$2(it, 3);
      const first = it.charCodeAt(0);
      let third,
        radix,
        maxCode;
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
          default: return +it;
        }
        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
          code = digits.charCodeAt(i);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
    $Number = function Number(value) {
      const it = arguments.length < 1 ? 0 : value;
      const that = this;
      return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? _fails(function() { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
    };
    for (var keys = _descriptors ? gOPN$3(Base) : (
      // ES3:
        'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
      ).split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
      if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
        dP$3($Number, key, gOPD$2(Base, key));
      }
    }
    $Number.prototype = proto;
    proto.constructor = $Number;
    _redefine(_global, NUMBER, $Number);
  }

  const _aNumberValue = function(it, msg) {
    if (typeof it !== 'number' && _cof(it) != 'Number') throw TypeError(msg);
    return +it;
  };

  const _stringRepeat = function repeat(count) {
    let str = String(_defined(this));
    let res = '';
    let n = _toInteger(count);
    if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
    for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
    return res;
  };

  const $toFixed = 1.0.toFixed;
  const floor$1 = Math.floor;
  const data = [ 0, 0, 0, 0, 0, 0 ];
  const ERROR = 'Number.toFixed: incorrect invocation!';
  const ZERO = '0';

  const multiply = function(n, c) {
    let i = -1;
    let c2 = c;
    while (++i < 6) {
      c2 += n * data[i];
      data[i] = c2 % 1e7;
      c2 = floor$1(c2 / 1e7);
    }
  };
  const divide = function(n) {
    let i = 6;
    let c = 0;
    while (--i >= 0) {
      c += data[i];
      data[i] = floor$1(c / n);
      c = (c % n) * 1e7;
    }
  };
  const numToString = function() {
    let i = 6;
    let s = '';
    while (--i >= 0) {
      if (s !== '' || i === 0 || data[i] !== 0) {
        const t = String(data[i]);
        s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
      }
    } return s;
  };
  var pow = function(x, n, acc) {
    return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
  };
  const log = function(x) {
    let n = 0;
    let x2 = x;
    while (x2 >= 4096) {
      n += 12;
      x2 /= 4096;
    }
    while (x2 >= 2) {
      n += 1;
      x2 /= 2;
    } return n;
  };

  _export(_export.P + _export.F * (!!$toFixed && (
    0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
  ) || !_fails(function() {
      // V8 ~ Android 4.3-
      $toFixed.call({});
    })), 'Number', {
    toFixed: function toFixed(fractionDigits) {
      let x = _aNumberValue(this, ERROR);
      const f = _toInteger(fractionDigits);
      let s = '';
      let m = ZERO;
      let e,
        z,
        j,
        k;
      if (f < 0 || f > 20) throw RangeError(ERROR);
      // eslint-disable-next-line no-self-compare
      if (x != x) return 'NaN';
      if (x <= -1e21 || x >= 1e21) return String(x);
      if (x < 0) {
        s = '-';
        x = -x;
      }
      if (x > 1e-21) {
        e = log(x * pow(2, 69, 1)) - 69;
        z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
        z *= 0x10000000000000;
        e = 52 - e;
        if (e > 0) {
          multiply(0, z);
          j = f;
          while (j >= 7) {
            multiply(1e7, 0);
            j -= 7;
          }
          multiply(pow(10, j, 1), 0);
          j = e - 1;
          while (j >= 23) {
            divide(1 << 23);
            j -= 23;
          }
          divide(1 << j);
          multiply(1, 1);
          divide(2);
          m = numToString();
        } else {
          multiply(0, z);
          multiply(1 << -e, 0);
          m = numToString() + _stringRepeat.call(ZERO, f);
        }
      }
      if (f > 0) {
        k = m.length;
        m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
      } else {
        m = s + m;
      } return m;
    },
  });

  const $toPrecision = 1.0.toPrecision;

  _export(_export.P + _export.F * (_fails(function() {
  // IE7-
    return $toPrecision.call(1, undefined) !== '1';
  }) || !_fails(function() {
      // V8 ~ Android 4.3-
      $toPrecision.call({});
    })), 'Number', {
    toPrecision: function toPrecision(precision) {
      const that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
      return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
    },
  });

  _export(_export.S, 'Number', { EPSILON: Math.pow(2, -52) });

  const _isFinite = _global.isFinite;

  _export(_export.S, 'Number', {
    isFinite: function isFinite(it) {
      return typeof it === 'number' && _isFinite(it);
    },
  });

  const floor$2 = Math.floor;
  const _isInteger = function isInteger(it) {
    return !_isObject(it) && isFinite(it) && floor$2(it) === it;
  };

  _export(_export.S, 'Number', { isInteger: _isInteger });

  _export(_export.S, 'Number', {
    isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
      return number != number;
    },
  });

  const abs = Math.abs;

  _export(_export.S, 'Number', {
    isSafeInteger: function isSafeInteger(number) {
      return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
    },
  });

  _export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

  _export(_export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

  _export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', { parseFloat: _parseFloat });

  _export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', { parseInt: _parseInt });

  // 20.2.2.20 Math.log1p(x)
  const _mathLog1p = Math.log1p || function log1p(x) {
    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
  };

  const sqrt = Math.sqrt;
  const $acosh = Math.acosh;

  _export(_export.S + _export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
  ), 'Math', {
    acosh: function acosh(x) {
      return (x = +x) < 1 ? NaN : x > 94906265.62425156
        ? Math.log(x) + Math.LN2
        : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
    },
  });

  const $asinh = Math.asinh;

  function asinh(x) {
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
  }

  // Tor Browser bug: Math.asinh(0) -> -0
  _export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh });

  const $atanh = Math.atanh;

  // Tor Browser bug: Math.atanh(-0) -> 0
  _export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
    atanh: function atanh(x) {
      return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
    },
  });

  // 20.2.2.28 Math.sign(x)
  const _mathSign = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  };

  _export(_export.S, 'Math', {
    cbrt: function cbrt(x) {
      return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
    },
  });

  _export(_export.S, 'Math', {
    clz32: function clz32(x) {
      return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
    },
  });

  const exp = Math.exp;

  _export(_export.S, 'Math', {
    cosh: function cosh(x) {
      return (exp(x = +x) + exp(-x)) / 2;
    },
  });

  // 20.2.2.14 Math.expm1(x)
  const $expm1 = Math.expm1;
  const _mathExpm1 = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
  ) ? function expm1(x) {
      return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
    } : $expm1;

  _export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', { expm1: _mathExpm1 });

  const pow$1 = Math.pow;
  const EPSILON = pow$1(2, -52);
  const EPSILON32 = pow$1(2, -23);
  const MAX32 = pow$1(2, 127) * (2 - EPSILON32);
  const MIN32 = pow$1(2, -126);

  const roundTiesToEven = function(n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  };

  const _mathFround = Math.fround || function fround(x) {
    const $abs = Math.abs(x);
    const $sign = _mathSign(x);
    let a,
      result;
    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    // eslint-disable-next-line no-self-compare
    if (result > MAX32 || result != result) return $sign * Infinity;
    return $sign * result;
  };

  _export(_export.S, 'Math', { fround: _mathFround });

  const abs$1 = Math.abs;

  _export(_export.S, 'Math', {
    hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
      let sum = 0;
      let i = 0;
      const aLen = arguments.length;
      let larg = 0;
      let arg,
        div;
      while (i < aLen) {
        arg = abs$1(arguments[i++]);
        if (larg < arg) {
          div = larg / arg;
          sum = sum * div * div + 1;
          larg = arg;
        } else if (arg > 0) {
          div = arg / larg;
          sum += div * div;
        } else sum += arg;
      }
      return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
    },
  });

  const $imul = Math.imul;

  // some WebKit versions fails with big numbers, some has wrong arity
  _export(_export.S + _export.F * _fails(function() {
    return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
  }), 'Math', {
    imul: function imul(x, y) {
      const UINT16 = 0xffff;
      const xn = +x;
      const yn = +y;
      const xl = UINT16 & xn;
      const yl = UINT16 & yn;
      return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
    },
  });

  _export(_export.S, 'Math', {
    log10: function log10(x) {
      return Math.log(x) * Math.LOG10E;
    },
  });

  _export(_export.S, 'Math', { log1p: _mathLog1p });

  _export(_export.S, 'Math', {
    log2: function log2(x) {
      return Math.log(x) / Math.LN2;
    },
  });

  _export(_export.S, 'Math', { sign: _mathSign });

  const exp$1 = Math.exp;

  // V8 near Chromium 38 has a problem with very small numbers
  _export(_export.S + _export.F * _fails(function() {
    return !Math.sinh(-2e-17) != -2e-17;
  }), 'Math', {
    sinh: function sinh(x) {
      return Math.abs(x = +x) < 1
        ? (_mathExpm1(x) - _mathExpm1(-x)) / 2
        : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
    },
  });

  const exp$2 = Math.exp;

  _export(_export.S, 'Math', {
    tanh: function tanh(x) {
      const a = _mathExpm1(x = +x);
      const b = _mathExpm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
    },
  });

  _export(_export.S, 'Math', {
    trunc: function trunc(it) {
      return (it > 0 ? Math.floor : Math.ceil)(it);
    },
  });

  const fromCharCode = String.fromCharCode;
  const $fromCodePoint = String.fromCodePoint;

  // length should be 1, old FF problem
  _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
    fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
      const res = [];
      const aLen = arguments.length;
      let i = 0;
      let code;
      while (aLen > i) {
        code = +arguments[i++];
        if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000
          ? fromCharCode(code)
          : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
        );
      } return res.join('');
    },
  });

  _export(_export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
    raw: function raw(callSite) {
      const tpl = _toIobject(callSite.raw);
      const len = _toLength(tpl.length);
      const aLen = arguments.length;
      const res = [];
      let i = 0;
      while (len > i) {
        res.push(String(tpl[i++]));
        if (i < aLen) res.push(String(arguments[i]));
      } return res.join('');
    },
  });

  _stringTrim('trim', function($trim) {
    return function trim() {
      return $trim(this, 3);
    };
  });

  const _stringAt = function(TO_STRING) {
    return function(that, pos) {
      const s = String(_defined(that));
      const i = _toInteger(pos);
      const l = s.length;
      let a,
        b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  const _iterators = {};

  const IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks('iterator'), function() { return this; });

  const _iterCreate = function(Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  const ITERATOR = _wks('iterator');
  const BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  const FF_ITERATOR = '@@iterator';
  const KEYS = 'keys';
  const VALUES = 'values';

  const returnThis = function() { return this; };

  const _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    const getMethod = function(kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS: return function keys() { return new Constructor(this, kind); };
        case VALUES: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    const TAG = NAME + ' Iterator';
    const DEF_VALUES = DEFAULT == VALUES;
    let VALUES_BUG = false;
    var proto = Base.prototype;
    const $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    let $default = $native || getMethod(DEFAULT);
    const $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    const $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    let methods,
      key,
      IteratorPrototype;
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
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries,
      };
      if (FORCED) {
        for (key in methods) {
          if (!(key in proto)) _redefine(proto, key, methods[key]);
        }
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  const $at = _stringAt(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine(String, 'String', function(iterated) {
    this._t = String(iterated); // target
    this._i = 0; // next index
    // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function() {
    const O = this._t;
    const index = this._i;
    let point;
    if (index >= O.length) return { value: undefined, done: true };
    point = $at(O, index);
    this._i += point.length;
    return { value: point, done: false };
  });

  const $at$1 = _stringAt(false);
  _export(_export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
    codePointAt: function codePointAt(pos) {
      return $at$1(this, pos);
    },
  });

  const MATCH = _wks('match');
  const _isRegexp = function(it) {
    let isRegExp;
    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
  };

  const _stringContext = function(that, searchString, NAME) {
    if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
    return String(_defined(that));
  };

  const MATCH$1 = _wks('match');
  const _failsIsRegexp = function(KEY) {
    const re = /./;
    try {
      '/./'[KEY](re);
    } catch (e) {
      try {
        re[MATCH$1] = false;
        return !'/./'[KEY](re);
      } catch (f) { /* empty */ }
    } return true;
  };

  const ENDS_WITH = 'endsWith';
  const $endsWith = ''[ENDS_WITH];

  _export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
    endsWith: function endsWith(searchString /* , endPosition = @length */) {
      const that = _stringContext(this, searchString, ENDS_WITH);
      const endPosition = arguments.length > 1 ? arguments[1] : undefined;
      const len = _toLength(that.length);
      const end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
      const search = String(searchString);
      return $endsWith
        ? $endsWith.call(that, search, end)
        : that.slice(end - search.length, end) === search;
    },
  });

  const INCLUDES = 'includes';

  _export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~_stringContext(this, searchString, INCLUDES)
        .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
    },
  });

  _export(_export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
    repeat: _stringRepeat,
  });

  const STARTS_WITH = 'startsWith';
  const $startsWith = ''[STARTS_WITH];

  _export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      const that = _stringContext(this, searchString, STARTS_WITH);
      const index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
      const search = String(searchString);
      return $startsWith
        ? $startsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search;
    },
  });

  const quot = /"/g;
  // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
  const createHTML = function(string, tag, attribute, value) {
    const S = String(_defined(string));
    let p1 = '<' + tag;
    if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
    return p1 + '>' + S + '</' + tag + '>';
  };
  const _stringHtml = function(NAME, exec) {
    const O = {};
    O[NAME] = exec(createHTML);
    _export(_export.P + _export.F * _fails(function() {
      const test = ''[NAME]('"');
      return test !== test.toLowerCase() || test.split('"').length > 3;
    }), 'String', O);
  };

  _stringHtml('anchor', function(createHTML) {
    return function anchor(name) {
      return createHTML(this, 'a', 'name', name);
    };
  });

  _stringHtml('big', function(createHTML) {
    return function big() {
      return createHTML(this, 'big', '', '');
    };
  });

  _stringHtml('blink', function(createHTML) {
    return function blink() {
      return createHTML(this, 'blink', '', '');
    };
  });

  _stringHtml('bold', function(createHTML) {
    return function bold() {
      return createHTML(this, 'b', '', '');
    };
  });

  _stringHtml('fixed', function(createHTML) {
    return function fixed() {
      return createHTML(this, 'tt', '', '');
    };
  });

  _stringHtml('fontcolor', function(createHTML) {
    return function fontcolor(color) {
      return createHTML(this, 'font', 'color', color);
    };
  });

  _stringHtml('fontsize', function(createHTML) {
    return function fontsize(size) {
      return createHTML(this, 'font', 'size', size);
    };
  });

  _stringHtml('italics', function(createHTML) {
    return function italics() {
      return createHTML(this, 'i', '', '');
    };
  });

  _stringHtml('link', function(createHTML) {
    return function link(url) {
      return createHTML(this, 'a', 'href', url);
    };
  });

  _stringHtml('small', function(createHTML) {
    return function small() {
      return createHTML(this, 'small', '', '');
    };
  });

  _stringHtml('strike', function(createHTML) {
    return function strike() {
      return createHTML(this, 'strike', '', '');
    };
  });

  _stringHtml('sub', function(createHTML) {
    return function sub() {
      return createHTML(this, 'sub', '', '');
    };
  });

  _stringHtml('sup', function(createHTML) {
    return function sup() {
      return createHTML(this, 'sup', '', '');
    };
  });

  _export(_export.S, 'Date', { now() { return new Date().getTime(); } });

  _export(_export.P + _export.F * _fails(function() {
    return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString() { return 1; } }) !== 1;
  }), 'Date', {
  // eslint-disable-next-line no-unused-vars
    toJSON: function toJSON(key) {
      const O = _toObject(this);
      const pv = _toPrimitive(O);
      return typeof pv === 'number' && !isFinite(pv) ? null : O.toISOString();
    },
  });

  const getTime = Date.prototype.getTime;
  const $toISOString = Date.prototype.toISOString;

  const lz = function(num) {
    return num > 9 ? num : '0' + num;
  };

  // PhantomJS / old WebKit has a broken implementations
  const _dateToIsoString = (_fails(function() {
    return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
  }) || !_fails(function() {
      $toISOString.call(new Date(NaN));
    })) ? function toISOString() {
      if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
      const d = this;
      const y = d.getUTCFullYear();
      const m = d.getUTCMilliseconds();
      const s = y < 0 ? '-' : y > 9999 ? '+' : '';
      return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
    } : $toISOString;

  _export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
    toISOString: _dateToIsoString,
  });

  const DateProto = Date.prototype;
  const INVALID_DATE = 'Invalid Date';
  const TO_STRING = 'toString';
  const $toString = DateProto[TO_STRING];
  const getTime$1 = DateProto.getTime;
  if (new Date(NaN) + '' != INVALID_DATE) {
    _redefine(DateProto, TO_STRING, function toString() {
      const value = getTime$1.call(this);
      // eslint-disable-next-line no-self-compare
      return value === value ? $toString.call(this) : INVALID_DATE;
    });
  }

  const NUMBER$1 = 'number';

  const _dateToPrimitive = function(hint) {
    if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
    return _toPrimitive(_anObject(this), hint != NUMBER$1);
  };

  const TO_PRIMITIVE$1 = _wks('toPrimitive');
  const proto$1 = Date.prototype;

  if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

  _export(_export.S, 'Array', { isArray: _isArray });

  const _iterCall = function(iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
      // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      const ret = iterator.return;
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };

  const ITERATOR$1 = _wks('iterator');
  const ArrayProto = Array.prototype;

  const _isArrayIter = function(it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
  };

  const _createProperty = function(object, index, value) {
    if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
    else object[index] = value;
  };

  const ITERATOR$2 = _wks('iterator');

  const core_getIteratorMethod = _core.getIteratorMethod = function(it) {
    if (it != undefined) {
      return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
    }
  };

  const ITERATOR$3 = _wks('iterator');
  let SAFE_CLOSING = false;

  try {
    const riter = [ 7 ][ITERATOR$3]();
    riter.return = function() { SAFE_CLOSING = true; };
    // eslint-disable-next-line no-throw-literal
    Array.from(riter, function() { throw 2; });
  } catch (e) { /* empty */ }

  const _iterDetect = function(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    let safe = false;
    try {
      const arr = [ 7 ];
      const iter = arr[ITERATOR$3]();
      iter.next = function() { return { done: safe = true }; };
      arr[ITERATOR$3] = function() { return iter; };
      exec(arr);
    } catch (e) { /* empty */ }
    return safe;
  };

  _export(_export.S + _export.F * !_iterDetect(function(iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      const O = _toObject(arrayLike);
      const C = typeof this === 'function' ? this : Array;
      const aLen = arguments.length;
      let mapfn = aLen > 1 ? arguments[1] : undefined;
      const mapping = mapfn !== undefined;
      let index = 0;
      const iterFn = core_getIteratorMethod(O);
      let length,
        result,
        step,
        iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [ step.value, index ], true) : step.value);
        }
      } else {
        length = _toLength(O.length);
        for (result = new C(length); length > index; index++) {
          _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    },
  });

  _export(_export.S + _export.F * _fails(function() {
    function F() { /* empty */ }
    return !(Array.of.call(F) instanceof F);
  }), 'Array', {
  // 22.1.2.3 Array.of( ...items)
    of: function of(/* ...args */) {
      let index = 0;
      const aLen = arguments.length;
      const result = new (typeof this === 'function' ? this : Array)(aLen);
      while (aLen > index) _createProperty(result, index, arguments[index++]);
      result.length = aLen;
      return result;
    },
  });

  const _strictMethod = function(method, arg) {
    return !!method && _fails(function() {
    // eslint-disable-next-line no-useless-call
      arg ? method.call(null, function() { /* empty */ }, 1) : method.call(null);
    });
  };

  const arrayJoin = [].join;

  // fallback for not array-like strings
  _export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
    join: function join(separator) {
      return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
    },
  });

  const arraySlice$1 = [].slice;

  // fallback for not array-like ES3 strings and DOM objects
  _export(_export.P + _export.F * _fails(function() {
    if (_html) arraySlice$1.call(_html);
  }), 'Array', {
    slice: function slice(begin, end) {
      const len = _toLength(this.length);
      const klass = _cof(this);
      end = end === undefined ? len : end;
      if (klass == 'Array') return arraySlice$1.call(this, begin, end);
      const start = _toAbsoluteIndex(begin, len);
      const upTo = _toAbsoluteIndex(end, len);
      const size = _toLength(upTo - start);
      const cloned = Array(size);
      let i = 0;
      for (; i < size; i++) {
        cloned[i] = klass == 'String'
          ? this.charAt(start + i)
          : this[start + i];
      }
      return cloned;
    },
  });

  const $sort = [].sort;
  const test$1 = [ 1, 2, 3 ];

  _export(_export.P + _export.F * (_fails(function() {
  // IE8-
    test$1.sort(undefined);
  }) || !_fails(function() {
      // V8 bug
      test$1.sort(null);
      // Old WebKit
    }) || !_strictMethod($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
    sort: function sort(comparefn) {
      return comparefn === undefined
        ? $sort.call(_toObject(this))
        : $sort.call(_toObject(this), _aFunction(comparefn));
    },
  });

  const SPECIES = _wks('species');

  const _arraySpeciesConstructor = function(original) {
    let C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C === 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
      if (_isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array : C;
  };

  const _arraySpeciesCreate = function(original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  const _arrayMethods = function(TYPE, $create) {
    const IS_MAP = TYPE == 1;
    const IS_FILTER = TYPE == 2;
    const IS_SOME = TYPE == 3;
    const IS_EVERY = TYPE == 4;
    const IS_FIND_INDEX = TYPE == 6;
    const NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    const create = $create || _arraySpeciesCreate;
    return function($this, callbackfn, that) {
      const O = _toObject($this);
      const self = _iobject(O);
      const f = _ctx(callbackfn, that, 3);
      const length = _toLength(self.length);
      let index = 0;
      const result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      let val,
        res;
      for (;length > index; index++) {
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP) result[index] = res; // map
            else if (res) {
              switch (TYPE) {
                case 3: return true; // some
                case 5: return val; // find
                case 6: return index; // findIndex
                case 2: result.push(val); // filter
              }
            } else if (IS_EVERY) return false; // every
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  const $forEach = _arrayMethods(0);
  const STRICT = _strictMethod([].forEach, true);

  _export(_export.P + _export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
    forEach: function forEach(callbackfn /* , thisArg */) {
      return $forEach(this, callbackfn, arguments[1]);
    },
  });

  const $map = _arrayMethods(1);

  _export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments[1]);
    },
  });

  const $filter = _arrayMethods(2);

  _export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments[1]);
    },
  });

  const $some = _arrayMethods(3);

  _export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
    some: function some(callbackfn /* , thisArg */) {
      return $some(this, callbackfn, arguments[1]);
    },
  });

  const $every = _arrayMethods(4);

  _export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
    every: function every(callbackfn /* , thisArg */) {
      return $every(this, callbackfn, arguments[1]);
    },
  });

  const _arrayReduce = function(that, callbackfn, aLen, memo, isRight) {
    _aFunction(callbackfn);
    const O = _toObject(that);
    const self = _iobject(O);
    const length = _toLength(O.length);
    let index = isRight ? length - 1 : 0;
    const i = isRight ? -1 : 1;
    if (aLen < 2) {
      for (;;) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (isRight ? index < 0 : length <= index) {
          throw TypeError('Reduce of empty array with no initial value');
        }
      }
    }
    for (;isRight ? index >= 0 : length > index; index += i) {
      if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
    }
    return memo;
  };

  _export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
    reduce: function reduce(callbackfn /* , initialValue */) {
      return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
    },
  });

  _export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
    reduceRight: function reduceRight(callbackfn /* , initialValue */) {
      return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
    },
  });

  const $indexOf = _arrayIncludes(false);
  const $native = [].indexOf;
  const NEGATIVE_ZERO = !!$native && 1 / [ 1 ].indexOf(1, -0) < 0;

  _export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      return NEGATIVE_ZERO
      // convert -0 to +0
        ? $native.apply(this, arguments) || 0
        : $indexOf(this, searchElement, arguments[1]);
    },
  });

  const $native$1 = [].lastIndexOf;
  const NEGATIVE_ZERO$1 = !!$native$1 && 1 / [ 1 ].lastIndexOf(1, -0) < 0;

  _export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
      if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;
      const O = _toIobject(this);
      const length = _toLength(O.length);
      let index = length - 1;
      if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
      if (index < 0) index = length + index;
      for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
      return -1;
    },
  });

  const _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
    const O = _toObject(this);
    const len = _toLength(O.length);
    let to = _toAbsoluteIndex(target, len);
    let from = _toAbsoluteIndex(start, len);
    const end = arguments.length > 2 ? arguments[2] : undefined;
    let count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
    let inc = 1;
    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }
    while (count-- > 0) {
      if (from in O) O[to] = O[from];
      else delete O[to];
      to += inc;
      from += inc;
    } return O;
  };

  const UNSCOPABLES = _wks('unscopables');
  const ArrayProto$1 = Array.prototype;
  if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
  const _addToUnscopables = function(key) {
    ArrayProto$1[UNSCOPABLES][key] = true;
  };

  _export(_export.P, 'Array', { copyWithin: _arrayCopyWithin });

  _addToUnscopables('copyWithin');

  const _arrayFill = function fill(value /* , start = 0, end = @length */) {
    const O = _toObject(this);
    const length = _toLength(O.length);
    const aLen = arguments.length;
    let index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
    const end = aLen > 2 ? arguments[2] : undefined;
    const endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  _export(_export.P, 'Array', { fill: _arrayFill });

  _addToUnscopables('fill');

  const $find = _arrayMethods(5);
  const KEY = 'find';
  let forced = true;
  // Shouldn't skip holes
  if (KEY in []) Array(1)[KEY](function() { forced = false; });
  _export(_export.P + _export.F * forced, 'Array', {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
  });
  _addToUnscopables(KEY);

  const $find$1 = _arrayMethods(6);
  const KEY$1 = 'findIndex';
  let forced$1 = true;
  // Shouldn't skip holes
  if (KEY$1 in []) Array(1)[KEY$1](function() { forced$1 = false; });
  _export(_export.P + _export.F * forced$1, 'Array', {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
  });
  _addToUnscopables(KEY$1);

  const SPECIES$1 = _wks('species');

  const _setSpecies = function(KEY) {
    const C = _global[KEY];
    if (_descriptors && C && !C[SPECIES$1]) {
      _objectDp.f(C, SPECIES$1, {
        configurable: true,
        get() { return this; },
      });
    }
  };

  _setSpecies('Array');

  const _iterStep = function(done, value) {
    return { value, done: !!done };
  };

  const es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0; // next index
    this._k = kind; // kind
    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function() {
    const O = this._t;
    const kind = this._k;
    const index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }
    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [ index, O[index] ]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  _addToUnscopables('keys');
  _addToUnscopables('values');
  _addToUnscopables('entries');

  const _flags = function() {
    const that = _anObject(this);
    let result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  const dP$4 = _objectDp.f;
  const gOPN$4 = _objectGopn.f;


  let $RegExp = _global.RegExp;
  const Base$1 = $RegExp;
  const proto$2 = $RegExp.prototype;
  const re1 = /a/g;
  const re2 = /a/g;
  // "new" creates a new object, old webkit buggy here
  const CORRECT_NEW = new $RegExp(re1) !== re1;

  if (_descriptors && (!CORRECT_NEW || _fails(function() {
    re2[_wks('match')] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
  }))) {
    $RegExp = function RegExp(p, f) {
      const tiRE = this instanceof $RegExp;
      let piRE = _isRegexp(p);
      const fiU = f === undefined;
      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
        : _inheritIfRequired(CORRECT_NEW
          ? new Base$1(piRE && !fiU ? p.source : p, f)
          : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
          , tiRE ? this : proto$2, $RegExp);
    };
    const proxy = function(key) {
      key in $RegExp || dP$4($RegExp, key, {
        configurable: true,
        get() { return Base$1[key]; },
        set(it) { Base$1[key] = it; },
      });
    };
    for (let keys$1 = gOPN$4(Base$1), i = 0; keys$1.length > i;) proxy(keys$1[i++]);
    proto$2.constructor = $RegExp;
    $RegExp.prototype = proto$2;
    _redefine(_global, 'RegExp', $RegExp);
  }

  _setSpecies('RegExp');

  if (_descriptors && /./g.flags != 'g') {
    _objectDp.f(RegExp.prototype, 'flags', {
      configurable: true,
      get: _flags,
    });
  }

  const TO_STRING$1 = 'toString';
  const $toString$1 = /./[TO_STRING$1];

  const define$1 = function(fn) {
    _redefine(RegExp.prototype, TO_STRING$1, fn, true);
  };

  // 21.2.5.14 RegExp.prototype.toString()
  if (_fails(function() { return $toString$1.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
    define$1(function toString() {
      const R = _anObject(this);
      return '/'.concat(R.source, '/',
        'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
    });
    // FF44- RegExp#toString has a wrong name
  } else if ($toString$1.name != TO_STRING$1) {
    define$1(function toString() {
      return $toString$1.call(this);
    });
  }

  const _fixReWks = function(KEY, length, exec) {
    const SYMBOL = _wks(KEY);
    const fns = exec(_defined, SYMBOL, ''[KEY]);
    const strfn = fns[0];
    const rxfn = fns[1];
    if (_fails(function() {
      const O = {};
      O[SYMBOL] = function() { return 7; };
      return ''[KEY](O) != 7;
    })) {
      _redefine(String.prototype, KEY, strfn);
      _hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function(string, arg) { return rxfn.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function(string) { return rxfn.call(string, this); }
      );
    }
  };

  _fixReWks('match', 1, function(defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
    return [ function match(regexp) {

      const O = defined(this);
      const fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    }, $match ];
  });

  _fixReWks('replace', 2, function(defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
    return [ function replace(searchValue, replaceValue) {

      const O = defined(this);
      const fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    }, $replace ];
  });

  _fixReWks('search', 1, function(defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
    return [ function search(regexp) {

      const O = defined(this);
      const fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    }, $search ];
  });

  _fixReWks('split', 2, function(defined, SPLIT, $split) {

    const isRegExp = _isRegexp;
    const _split = $split;
    const $push = [].push;
    const $SPLIT = 'split';
    const LENGTH = 'length';
    const LAST_INDEX = 'lastIndex';
    if (
      'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
    ) {
      const NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
      // based on es5-shim implementation, need to rework it
      $split = function(separator, limit) {
        const string = String(this);
        if (separator === undefined && limit === 0) return [];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) return _split.call(string, separator, limit);
        const output = [];
        const flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
        let lastLastIndex = 0;
        const splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        const separatorCopy = new RegExp(separator.source, flags + 'g');
        let separator2,
          match,
          lastIndex,
          lastLength,
          i;
        // Doesn't need flags gy, but they don't hurt
        if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
        while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0][LENGTH];
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
            // eslint-disable-next-line no-loop-func
            if (!NPCG && match[LENGTH] > 1) {
              match[0].replace(separator2, function() {
                for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
              });
            }
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }
          if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
        }
        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      };
      // Chakra, V8
    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      $split = function(separator, limit) {
        return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
      };
    }
    // 21.1.3.17 String.prototype.split(separator, limit)
    return [ function split(separator, limit) {
      const O = defined(this);
      const fn = separator == undefined ? undefined : separator[SPLIT];
      return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
    }, $split ];
  });

  const _anInstance = function(it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(name + ': incorrect invocation!');
    } return it;
  };

  const _forOf = createCommonjsModule(function(module) {
    const BREAK = {};
    const RETURN = {};
    const exports = module.exports = function(iterable, entries, fn, that, ITERATOR) {
      const iterFn = ITERATOR ? function() { return iterable; } : core_getIteratorMethod(iterable);
      const f = _ctx(fn, that, entries ? 2 : 1);
      let index = 0;
      let length,
        step,
        iterator,
        result;
      if (typeof iterFn !== 'function') throw TypeError(iterable + ' is not iterable!');
      // fast case for arrays with default iterator
      if (_isArrayIter(iterFn)) {
        for (length = _toLength(iterable.length); length > index; index++) {
          result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
          if (result === BREAK || result === RETURN) return result;
        }
      } else {
        for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
          result = _iterCall(iterator, f, step.value, entries);
          if (result === BREAK || result === RETURN) return result;
        }
      }
    };
    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  });

  const SPECIES$2 = _wks('species');
  const _speciesConstructor = function(O, D) {
    const C = _anObject(O).constructor;
    let S;
    return C === undefined || (S = _anObject(C)[SPECIES$2]) == undefined ? D : _aFunction(S);
  };

  const process$1 = _global.process;
  let setTask = _global.setImmediate;
  let clearTask = _global.clearImmediate;
  const MessageChannel = _global.MessageChannel;
  const Dispatch = _global.Dispatch;
  let counter = 0;
  const queue = {};
  const ONREADYSTATECHANGE = 'onreadystatechange';
  let defer;
  let channel;
  let port;
  const run = function() {
    const id = +this;
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      const fn = queue[id];
      delete queue[id];
      fn();
    }
  };
  const listener = function(event) {
    run.call(event.data);
  };
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
      const args = [];
      let i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function() {
      // eslint-disable-next-line no-new-func
        _invoke(typeof fn === 'function' ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (_cof(process$1) == 'process') {
      defer = function(id) {
        process$1.nextTick(_ctx(run, id, 1));
      };
      // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function(id) {
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
    } else if (_global.addEventListener && typeof postMessage === 'function' && !_global.importScripts) {
      defer = function(id) {
        _global.postMessage(id + '', '*');
      };
      _global.addEventListener('message', listener, false);
      // IE8-
    } else if (ONREADYSTATECHANGE in _domCreate('script')) {
      defer = function(id) {
        _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function() {
          _html.removeChild(this);
          run.call(id);
        };
      };
      // Rest old browsers
    } else {
      defer = function(id) {
        setTimeout(_ctx(run, id, 1), 0);
      };
    }
  }
  const _task = {
    set: setTask,
    clear: clearTask,
  };

  const macrotask = _task.set;
  const Observer = _global.MutationObserver || _global.WebKitMutationObserver;
  const process$2 = _global.process;
  const Promise$1 = _global.Promise;
  const isNode$1 = _cof(process$2) == 'process';

  const _microtask = function() {
    let head,
      last,
      notify;

    const flush = function() {
      let parent,
        fn;
      if (isNode$1 && (parent = process$2.domain)) parent.exit();
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
      notify = function() {
        process$2.nextTick(flush);
      };
      // browsers with MutationObserver
    } else if (Observer) {
      let toggle = true;
      const node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function() {
        node.data = toggle = !toggle;
      };
      // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      const promise = Promise$1.resolve();
      notify = function() {
        promise.then(flush);
      };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
    } else {
      notify = function() {
      // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(_global, flush);
      };
    }

    return function(fn) {
      const task = { fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      } last = task;
    };
  };

  function PromiseCapability(C) {
    let resolve,
      reject;
    this.promise = new C(function($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = _aFunction(resolve);
    this.reject = _aFunction(reject);
  }

  const f$7 = function(C) {
    return new PromiseCapability(C);
  };

  const _newPromiseCapability = {
    f: f$7,
  };

  const _perform = function(exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  const _promiseResolve = function(C, x) {
    const promiseCapability = _newPromiseCapability.f(C);
    const resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  const _redefineAll = function(target, src, safe) {
    for (const key in src) _redefine(target, key, src[key], safe);
    return target;
  };

  const task = _task.set;
  const microtask = _microtask();


  const PROMISE = 'Promise';
  const TypeError$1 = _global.TypeError;
  const process = _global.process;
  let $Promise = _global[PROMISE];
  const isNode = _classof(process) == 'process';
  const empty = function() { /* empty */ };
  let Internal;
  let newGenericPromiseCapability;
  let OwnPromiseCapability;
  let Wrapper;
  let newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

  const USE_NATIVE$1 = !!function() {
    try {
    // correct subclassing with @@species support
      const promise = $Promise.resolve(1);
      const FakePromise = (promise.constructor = {})[_wks('species')] = function(exec) {
        exec(empty, empty);
      };
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (isNode || typeof PromiseRejectionEvent === 'function') && promise.then(empty) instanceof FakePromise;
    } catch (e) { /* empty */ }
  }();

  // helpers
  const sameConstructor = _library ? function(a, b) {
  // with library wrapper special case
    return a === b || a === $Promise && b === Wrapper;
  } : function(a, b) {
    return a === b;
  };
  const isThenable = function(it) {
    let then;
    return _isObject(it) && typeof (then = it.then) === 'function' ? then : false;
  };
  const notify = function(promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    const chain = promise._c;
    microtask(function() {
      const value = promise._v;
      const ok = promise._s == 1;
      let i = 0;
      const run = function(reaction) {
        const handler = ok ? reaction.ok : reaction.fail;
        const resolve = reaction.resolve;
        const reject = reaction.reject;
        const domain = reaction.domain;
        let result,
          then;
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
  var onUnhandled = function(promise) {
    task.call(_global, function() {
      const value = promise._v;
      const unhandled = isUnhandled(promise);
      let result,
        handler,
        console;
      if (unhandled) {
        result = _perform(function() {
          if (isNode) {
            process.emit('unhandledRejection', value, promise);
          } else if (handler = _global.onunhandledrejection) {
            handler({ promise, reason: value });
          } else if ((console = _global.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode || isUnhandled(promise) ? 2 : 1;
      } promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled = function(promise) {
    if (promise._h == 1) return false;
    const chain = promise._a || promise._c;
    let i = 0;
    let reaction;
    while (chain.length > i) {
      reaction = chain[i++];
      if (reaction.fail || !isUnhandled(reaction.promise)) return false;
    } return true;
  };
  var onHandleUnhandled = function(promise) {
    task.call(_global, function() {
      let handler;
      if (isNode) {
        process.emit('rejectionHandled', promise);
      } else if (handler = _global.onrejectionhandled) {
        handler({ promise, reason: promise._v });
      }
    });
  };
  const $reject = function(value) {
    let promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };
  var $resolve = function(value) {
    let promise = this;
    let then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      if (then = isThenable(value)) {
        microtask(function() {
          const wrapper = { _w: promise, _d: false }; // wrap
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
      this._c = []; // <- awaiting reactions
      this._a = undefined; // <- checked in isUnhandled reactions
      this._s = 0; // <- state
      this._d = false; // <- done
      this._v = undefined; // <- value
      this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
      this._n = false; // <- notify
    };
    Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        const reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
        reaction.ok = typeof onFulfilled === 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected === 'function' && onRejected;
        reaction.domain = isNode ? process.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      catch(onRejected) {
        return this.then(undefined, onRejected);
      },
    });
    OwnPromiseCapability = function() {
      const promise = new Internal();
      this.promise = promise;
      this.resolve = _ctx($resolve, promise, 1);
      this.reject = _ctx($reject, promise, 1);
    };
    _newPromiseCapability.f = newPromiseCapability = function(C) {
      return sameConstructor($Promise, C)
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
      const capability = newPromiseCapability(this);
      const $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    },
  });
  _export(_export.S + _export.F * (_library || !USE_NATIVE$1), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
      if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
      return _promiseResolve(this, x);
    },
  });
  _export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function(iter) {
    $Promise.all(iter).catch(empty);
  })), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      const C = this;
      const capability = newPromiseCapability(C);
      const resolve = capability.resolve;
      const reject = capability.reject;
      const result = _perform(function() {
        const values = [];
        let index = 0;
        let remaining = 1;
        _forOf(iterable, false, function(promise) {
          const $index = index++;
          let alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function(value) {
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
      const C = this;
      const capability = newPromiseCapability(C);
      const reject = capability.reject;
      const result = _perform(function() {
        _forOf(iterable, false, function(promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    },
  });

  const _validateCollection = function(it, TYPE) {
    if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
    return it;
  };

  const dP$5 = _objectDp.f;


  const fastKey = _meta.fastKey;

  const SIZE = _descriptors ? '_s' : 'size';

  const getEntry = function(that, key) {
  // fast case
    const index = fastKey(key);
    let entry;
    if (index !== 'F') return that._i[index];
    // frozen object case
    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key) return entry;
    }
  };

  const _collectionStrong = {
    getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        _anInstance(that, C, NAME, '_i');
        that._t = NAME; // collection type
        that._i = _objectCreate(null); // index
        that._f = undefined; // first entry
        that._l = undefined; // last entry
        that[SIZE] = 0; // size
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
        delete(key) {
          const that = _validateCollection(this, NAME);
          const entry = getEntry(that, key);
          if (entry) {
            const next = entry.n;
            const prev = entry.p;
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
          const f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          let entry;
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
        },
      });
      if (_descriptors) {
        dP$5(C.prototype, 'size', {
          get() {
            return _validateCollection(this, NAME)[SIZE];
          },
        });
      }
      return C;
    },
    def(that, key, value) {
      let entry = getEntry(that, key);
      let prev,
        index;
      // change existing entry
      if (entry) {
        entry.v = value;
        // create new entry
      } else {
        that._l = entry = {
          i: index = fastKey(key, true), // <- index
          k: key, // <- key
          v: value, // <- value
          p: prev = that._l, // <- previous entry
          n: undefined, // <- next entry
          r: false, // <- removed
        };
        if (!that._f) that._f = entry;
        if (prev) prev.n = entry;
        that[SIZE]++;
        // add to index
        if (index !== 'F') that._i[index] = entry;
      } return that;
    },
    getEntry,
    setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      _iterDefine(C, NAME, function(iterated, kind) {
        this._t = _validateCollection(iterated, NAME); // target
        this._k = kind; // kind
        this._l = undefined; // previous
      }, function() {
        const that = this;
        const kind = that._k;
        let entry = that._l;
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
        return _iterStep(0, [ entry.k, entry.v ]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // add [@@species], 23.1.2.2, 23.2.2.2
      _setSpecies(NAME);
    },
  };

  const _collection = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    const Base = _global[NAME];
    let C = Base;
    const ADDER = IS_MAP ? 'set' : 'add';
    const proto = C && C.prototype;
    const O = {};
    const fixMethod = function(KEY) {
      const fn = proto[KEY];
      _redefine(proto, KEY,
        KEY == 'delete' ? function(a) {
          return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'has' ? function has(a) {
          return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'get' ? function get(a) {
          return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
          : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
      );
    };
    if (typeof C !== 'function' || !(IS_WEAK || proto.forEach && !_fails(function() {
      new C().entries().next();
    }))) {
    // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      _redefineAll(C.prototype, methods);
      _meta.NEED = true;
    } else {
      const instance = new C();
      // early implementations not supports chaining
      const HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      const THROWS_ON_PRIMITIVES = _fails(function() { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      const ACCEPT_ITERABLES = _iterDetect(function(iter) { new C(iter); }); // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      const BUGGY_ZERO = !IS_WEAK && _fails(function() {
      // V8 ~ Chromium 42- fails only with 5+ elements
        const $instance = new C();
        let index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });
      if (!ACCEPT_ITERABLES) {
        C = wrapper(function(target, iterable) {
          _anInstance(target, C, NAME);
          const that = _inheritIfRequired(new Base(), target, C);
          if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
      // weak collections should not contains .clear method
      if (IS_WEAK && proto.clear) delete proto.clear;
    }

    _setToStringTag(C, NAME);

    O[NAME] = C;
    _export(_export.G + _export.W + _export.F * (C != Base), O);

    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

    return C;
  };

  const MAP = 'Map';

  // 23.1 Map Objects
  const es6_map = _collection(MAP, function(get) {
    return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
  }, {
  // 23.1.3.6 Map.prototype.get(key)
    get: function get(key) {
      const entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value) {
      return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
    },
  }, _collectionStrong, true);

  const SET = 'Set';

  // 23.2 Set Objects
  const es6_set = _collection(SET, function(get) {
    return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
  }, {
  // 23.2.3.1 Set.prototype.add(value)
    add: function add(value) {
      return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
    },
  }, _collectionStrong);

  const getWeak = _meta.getWeak;


  const arrayFind = _arrayMethods(5);
  const arrayFindIndex = _arrayMethods(6);
  let id$1 = 0;

  // fallback for uncaught frozen keys
  const uncaughtFrozenStore = function(that) {
    return that._l || (that._l = new UncaughtFrozenStore());
  };
  var UncaughtFrozenStore = function() {
    this.a = [];
  };
  const findUncaughtFrozen = function(store, key) {
    return arrayFind(store.a, function(it) {
      return it[0] === key;
    });
  };
  UncaughtFrozenStore.prototype = {
    get(key) {
      const entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has(key) {
      return !!findUncaughtFrozen(this, key);
    },
    set(key, value) {
      const entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.a.push([ key, value ]);
    },
    delete(key) {
      const index = arrayFindIndex(this.a, function(it) {
        return it[0] === key;
      });
      if (~index) this.a.splice(index, 1);
      return !!~index;
    },
  };

  const _collectionWeak = {
    getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        _anInstance(that, C, NAME, '_i');
        that._t = NAME; // collection type
        that._i = id$1++; // collection id
        that._l = undefined; // leak store for uncaught frozen objects
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });
      _redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
        delete(key) {
          if (!_isObject(key)) return false;
          const data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).delete(key);
          return data && _has(data, this._i) && delete data[this._i];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key) {
          if (!_isObject(key)) return false;
          const data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
          return data && _has(data, this._i);
        },
      });
      return C;
    },
    def(that, key, value) {
      const data = getWeak(_anObject(key), true);
      if (data === true) uncaughtFrozenStore(that).set(key, value);
      else data[that._i] = value;
      return that;
    },
    ufstore: uncaughtFrozenStore,
  };

  const es6_weakMap = createCommonjsModule(function(module) {

    const each = _arrayMethods(0);


    const WEAK_MAP = 'WeakMap';
    const getWeak = _meta.getWeak;
    const isExtensible = Object.isExtensible;
    const uncaughtFrozenStore = _collectionWeak.ufstore;
    const tmp = {};
    let InternalMap;

    const wrapper = function(get) {
      return function WeakMap() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    };

    const methods = {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        if (_isObject(key)) {
          const data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
          return data ? data[this._i] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
      },
    };

    // 23.3 WeakMap Objects
    const $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

    // IE11 WeakMap frozen keys fix
    if (_fails(function() { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
      InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
      _objectAssign(InternalMap.prototype, methods);
      _meta.NEED = true;
      each([ 'delete', 'has', 'get', 'set' ], function(key) {
        const proto = $WeakMap.prototype;
        const method = proto[key];
        _redefine(proto, key, function(a, b) {
          // store frozen objects on internal weakmap shim
          if (_isObject(a) && !isExtensible(a)) {
            if (!this._f) this._f = new InternalMap();
            const result = this._f[key](a, b);
            return key == 'set' ? this : result;
            // store all the rest on native weakmap
          } return method.call(this, a, b);
        });
      });
    }
  });

  const WEAK_SET = 'WeakSet';

  // 23.4 WeakSet Objects
  _collection(WEAK_SET, function(get) {
    return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
  }, {
  // 23.4.3.1 WeakSet.prototype.add(value)
    add: function add(value) {
      return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
    },
  }, _collectionWeak, false, true);

  const TYPED = _uid('typed_array');
  const VIEW$1 = _uid('view');
  const ABV = !!(_global.ArrayBuffer && _global.DataView);
  let CONSTR = ABV;
  let i$1 = 0;
  const l = 9;
  let Typed;

  const TypedArrayConstructors = (
    'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
  ).split(',');

  while (i$1 < l) {
    if (Typed = _global[TypedArrayConstructors[i$1++]]) {
      _hide(Typed.prototype, TYPED, true);
      _hide(Typed.prototype, VIEW$1, true);
    } else CONSTR = false;
  }

  const _typed = {
    ABV,
    CONSTR,
    TYPED,
    VIEW: VIEW$1,
  };

  const _toIndex = function(it) {
    if (it === undefined) return 0;
    const number = _toInteger(it);
    const length = _toLength(number);
    if (number !== length) throw RangeError('Wrong length!');
    return length;
  };

  const _typedBuffer = createCommonjsModule(function(module, exports) {


    const gOPN = _objectGopn.f;
    const dP = _objectDp.f;


    const ARRAY_BUFFER = 'ArrayBuffer';
    const DATA_VIEW = 'DataView';
    const PROTOTYPE = 'prototype';
    const WRONG_LENGTH = 'Wrong length!';
    const WRONG_INDEX = 'Wrong index!';
    let $ArrayBuffer = _global[ARRAY_BUFFER];
    let $DataView = _global[DATA_VIEW];
    const Math = _global.Math;
    const RangeError = _global.RangeError;
    // eslint-disable-next-line no-shadow-restricted-names
    const Infinity = _global.Infinity;
    const BaseBuffer = $ArrayBuffer;
    const abs = Math.abs;
    const pow = Math.pow;
    const floor = Math.floor;
    const log = Math.log;
    const LN2 = Math.LN2;
    const BUFFER = 'buffer';
    const BYTE_LENGTH = 'byteLength';
    const BYTE_OFFSET = 'byteOffset';
    const $BUFFER = _descriptors ? '_b' : BUFFER;
    const $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
    const $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

    // IEEE754 conversions based on https://github.com/feross/ieee754
    function packIEEE754(value, mLen, nBytes) {
      const buffer = Array(nBytes);
      let eLen = nBytes * 8 - mLen - 1;
      const eMax = (1 << eLen) - 1;
      const eBias = eMax >> 1;
      const rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
      let i = 0;
      const s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      let e,
        m,
        c;
      value = abs(value);
      // eslint-disable-next-line no-self-compare
      if (value != value || value === Infinity) {
        // eslint-disable-next-line no-self-compare
        m = value != value ? 1 : 0;
        e = eMax;
      } else {
        e = floor(log(value) / LN2);
        if (value * (c = pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * pow(2, eBias - 1) * pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
      buffer[--i] |= s * 128;
      return buffer;
    }
    function unpackIEEE754(buffer, mLen, nBytes) {
      const eLen = nBytes * 8 - mLen - 1;
      const eMax = (1 << eLen) - 1;
      const eBias = eMax >> 1;
      let nBits = eLen - 7;
      let i = nBytes - 1;
      let s = buffer[i--];
      let e = s & 127;
      let m;
      s >>= 7;
      for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : s ? -Infinity : Infinity;
      } else {
        m = m + pow(2, mLen);
        e = e - eBias;
      } return (s ? -1 : 1) * m * pow(2, e - mLen);
    }

    function unpackI32(bytes) {
      return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
    }
    function packI8(it) {
      return [ it & 0xff ];
    }
    function packI16(it) {
      return [ it & 0xff, it >> 8 & 0xff ];
    }
    function packI32(it) {
      return [ it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff ];
    }
    function packF64(it) {
      return packIEEE754(it, 52, 8);
    }
    function packF32(it) {
      return packIEEE754(it, 23, 4);
    }

    function addGetter(C, key, internal) {
      dP(C[PROTOTYPE], key, { get() { return this[internal]; } });
    }

    function get(view, bytes, index, isLittleEndian) {
      const numIndex = +index;
      const intIndex = _toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      const store = view[$BUFFER]._b;
      const start = intIndex + view[$OFFSET];
      const pack = store.slice(start, start + bytes);
      return isLittleEndian ? pack : pack.reverse();
    }
    function set(view, bytes, index, conversion, value, isLittleEndian) {
      const numIndex = +index;
      const intIndex = _toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      const store = view[$BUFFER]._b;
      const start = intIndex + view[$OFFSET];
      const pack = conversion(+value);
      for (let i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
    }

    if (!_typed.ABV) {
      $ArrayBuffer = function ArrayBuffer(length) {
        _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
        const byteLength = _toIndex(length);
        this._b = _arrayFill.call(Array(byteLength), 0);
        this[$LENGTH] = byteLength;
      };

      $DataView = function DataView(buffer, byteOffset, byteLength) {
        _anInstance(this, $DataView, DATA_VIEW);
        _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
        const bufferLength = buffer[$LENGTH];
        const offset = _toInteger(byteOffset);
        if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
        byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
        if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
        this[$BUFFER] = buffer;
        this[$OFFSET] = offset;
        this[$LENGTH] = byteLength;
      };

      if (_descriptors) {
        addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
        addGetter($DataView, BUFFER, '_b');
        addGetter($DataView, BYTE_LENGTH, '_l');
        addGetter($DataView, BYTE_OFFSET, '_o');
      }

      _redefineAll($DataView[PROTOTYPE], {
        getInt8: function getInt8(byteOffset) {
          return get(this, 1, byteOffset)[0] << 24 >> 24;
        },
        getUint8: function getUint8(byteOffset) {
          return get(this, 1, byteOffset)[0];
        },
        getInt16: function getInt16(byteOffset /* , littleEndian */) {
          const bytes = get(this, 2, byteOffset, arguments[1]);
          return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
        },
        getUint16: function getUint16(byteOffset /* , littleEndian */) {
          const bytes = get(this, 2, byteOffset, arguments[1]);
          return bytes[1] << 8 | bytes[0];
        },
        getInt32: function getInt32(byteOffset /* , littleEndian */) {
          return unpackI32(get(this, 4, byteOffset, arguments[1]));
        },
        getUint32: function getUint32(byteOffset /* , littleEndian */) {
          return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
        },
        getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
          return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
        },
        getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
          return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
        },
        setInt8: function setInt8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setUint8: function setUint8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
          set(this, 4, byteOffset, packF32, value, arguments[2]);
        },
        setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
          set(this, 8, byteOffset, packF64, value, arguments[2]);
        },
      });
    } else {
      if (!_fails(function() {
        $ArrayBuffer(1);
      }) || !_fails(function() {
          new $ArrayBuffer(-1); // eslint-disable-line no-new
        }) || _fails(function() {
          new $ArrayBuffer(); // eslint-disable-line no-new
          new $ArrayBuffer(1.5); // eslint-disable-line no-new
          new $ArrayBuffer(NaN); // eslint-disable-line no-new
          return $ArrayBuffer.name != ARRAY_BUFFER;
        })) {
        $ArrayBuffer = function ArrayBuffer(length) {
          _anInstance(this, $ArrayBuffer);
          return new BaseBuffer(_toIndex(length));
        };
        const ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
        for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
          if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
        }
        if (!_library) ArrayBufferProto.constructor = $ArrayBuffer;
      }
      // iOS Safari 7.x bug
      const view = new $DataView(new $ArrayBuffer(2));
      const $setInt8 = $DataView[PROTOTYPE].setInt8;
      view.setInt8(0, 2147483648);
      view.setInt8(1, 2147483649);
      if (view.getInt8(0) || !view.getInt8(1)) {
        _redefineAll($DataView[PROTOTYPE], {
          setInt8: function setInt8(byteOffset, value) {
            $setInt8.call(this, byteOffset, value << 24 >> 24);
          },
          setUint8: function setUint8(byteOffset, value) {
            $setInt8.call(this, byteOffset, value << 24 >> 24);
          },
        }, true);
      }
    }
    _setToStringTag($ArrayBuffer, ARRAY_BUFFER);
    _setToStringTag($DataView, DATA_VIEW);
    _hide($DataView[PROTOTYPE], _typed.VIEW, true);
    exports[ARRAY_BUFFER] = $ArrayBuffer;
    exports[DATA_VIEW] = $DataView;
  });

  const ArrayBuffer = _global.ArrayBuffer;

  const $ArrayBuffer = _typedBuffer.ArrayBuffer;
  const $DataView = _typedBuffer.DataView;
  const $isView = _typed.ABV && ArrayBuffer.isView;
  const $slice = $ArrayBuffer.prototype.slice;
  const VIEW = _typed.VIEW;
  const ARRAY_BUFFER = 'ArrayBuffer';

  _export(_export.G + _export.W + _export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

  _export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
    isView: function isView(it) {
      return $isView && $isView(it) || _isObject(it) && VIEW in it;
    },
  });

  _export(_export.P + _export.U + _export.F * _fails(function() {
    return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
  }), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
    slice: function slice(start, end) {
      if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix
      const len = _anObject(this).byteLength;
      let first = _toAbsoluteIndex(start, len);
      const final = _toAbsoluteIndex(end === undefined ? len : end, len);
      const result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(final - first));
      const viewS = new $DataView(this);
      const viewT = new $DataView(result);
      let index = 0;
      while (first < final) {
        viewT.setUint8(index++, viewS.getUint8(first++));
      } return result;
    },
  });

  _setSpecies(ARRAY_BUFFER);

  _export(_export.G + _export.W + _export.F * !_typed.ABV, {
    DataView: _typedBuffer.DataView,
  });

  const _typedArray = createCommonjsModule(function(module) {

    if (_descriptors) {
      const LIBRARY = _library;
      const global = _global;
      const fails = _fails;
      const $export = _export;
      const $typed = _typed;
      const $buffer = _typedBuffer;
      const ctx = _ctx;
      const anInstance = _anInstance;
      const propertyDesc = _propertyDesc;
      const hide = _hide;
      const redefineAll = _redefineAll;
      const toInteger = _toInteger;
      const toLength = _toLength;
      const toIndex = _toIndex;
      const toAbsoluteIndex = _toAbsoluteIndex;
      const toPrimitive = _toPrimitive;
      const has = _has;
      const classof = _classof;
      const isObject = _isObject;
      const toObject = _toObject;
      const isArrayIter = _isArrayIter;
      const create = _objectCreate;
      const getPrototypeOf = _objectGpo;
      const gOPN = _objectGopn.f;
      const getIterFn = core_getIteratorMethod;
      const uid = _uid;
      const wks = _wks;
      const createArrayMethod = _arrayMethods;
      const createArrayIncludes = _arrayIncludes;
      const speciesConstructor = _speciesConstructor;
      const ArrayIterators = es6_array_iterator;
      const Iterators = _iterators;
      const $iterDetect = _iterDetect;
      const setSpecies = _setSpecies;
      const arrayFill = _arrayFill;
      const arrayCopyWithin = _arrayCopyWithin;
      const $DP = _objectDp;
      const $GOPD = _objectGopd;
      const dP = $DP.f;
      const gOPD = $GOPD.f;
      const RangeError = global.RangeError;
      const TypeError = global.TypeError;
      const Uint8Array = global.Uint8Array;
      const ARRAY_BUFFER = 'ArrayBuffer';
      const SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
      const BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
      const PROTOTYPE = 'prototype';
      const ArrayProto = Array[PROTOTYPE];
      const $ArrayBuffer = $buffer.ArrayBuffer;
      const $DataView = $buffer.DataView;
      const arrayForEach = createArrayMethod(0);
      const arrayFilter = createArrayMethod(2);
      const arraySome = createArrayMethod(3);
      const arrayEvery = createArrayMethod(4);
      const arrayFind = createArrayMethod(5);
      const arrayFindIndex = createArrayMethod(6);
      const arrayIncludes = createArrayIncludes(true);
      const arrayIndexOf = createArrayIncludes(false);
      const arrayValues = ArrayIterators.values;
      const arrayKeys = ArrayIterators.keys;
      const arrayEntries = ArrayIterators.entries;
      const arrayLastIndexOf = ArrayProto.lastIndexOf;
      const arrayReduce = ArrayProto.reduce;
      const arrayReduceRight = ArrayProto.reduceRight;
      const arrayJoin = ArrayProto.join;
      const arraySort = ArrayProto.sort;
      const arraySlice = ArrayProto.slice;
      let arrayToString = ArrayProto.toString;
      let arrayToLocaleString = ArrayProto.toLocaleString;
      const ITERATOR = wks('iterator');
      const TAG = wks('toStringTag');
      const TYPED_CONSTRUCTOR = uid('typed_constructor');
      const DEF_CONSTRUCTOR = uid('def_constructor');
      const ALL_CONSTRUCTORS = $typed.CONSTR;
      const TYPED_ARRAY = $typed.TYPED;
      const VIEW = $typed.VIEW;
      const WRONG_LENGTH = 'Wrong length!';

      const $map = createArrayMethod(1, function(O, length) {
        return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
      });

      const LITTLE_ENDIAN = fails(function() {
        // eslint-disable-next-line no-undef
        return new Uint8Array(new Uint16Array([ 1 ]).buffer)[0] === 1;
      });

      const FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function() {
        new Uint8Array(1).set({});
      });

      const toOffset = function(it, BYTES) {
        const offset = toInteger(it);
        if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
        return offset;
      };

      const validate = function(it) {
        if (isObject(it) && TYPED_ARRAY in it) return it;
        throw TypeError(it + ' is not a typed array!');
      };

      var allocate = function(C, length) {
        if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
          throw TypeError('It is not a typed array constructor!');
        } return new C(length);
      };

      const speciesFromList = function(O, list) {
        return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
      };

      var fromList = function(C, list) {
        let index = 0;
        const length = list.length;
        const result = allocate(C, length);
        while (length > index) result[index] = list[index++];
        return result;
      };

      const addGetter = function(it, key, internal) {
        dP(it, key, { get() { return this._d[internal]; } });
      };

      const $from = function from(source /* , mapfn, thisArg */) {
        let O = toObject(source);
        const aLen = arguments.length;
        let mapfn = aLen > 1 ? arguments[1] : undefined;
        const mapping = mapfn !== undefined;
        const iterFn = getIterFn(O);
        let i,
          length,
          values,
          result,
          step,
          iterator;
        if (iterFn != undefined && !isArrayIter(iterFn)) {
          for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
            values.push(step.value);
          } O = values;
        }
        if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
        for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
          result[i] = mapping ? mapfn(O[i], i) : O[i];
        }
        return result;
      };

      const $of = function of(/* ...items */) {
        let index = 0;
        const length = arguments.length;
        const result = allocate(this, length);
        while (length > index) result[index] = arguments[index++];
        return result;
      };

      // iOS Safari 6.x fails here
      const TO_LOCALE_BUG = !!Uint8Array && fails(function() { arrayToLocaleString.call(new Uint8Array(1)); });

      const $toLocaleString = function toLocaleString() {
        return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
      };

      const proto = {
        copyWithin: function copyWithin(target, start /* , end */) {
          return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
        },
        every: function every(callbackfn /* , thisArg */) {
          return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
          return arrayFill.apply(validate(this), arguments);
        },
        filter: function filter(callbackfn /* , thisArg */) {
          return speciesFromList(this, arrayFilter(validate(this), callbackfn,
            arguments.length > 1 ? arguments[1] : undefined));
        },
        find: function find(predicate /* , thisArg */) {
          return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        findIndex: function findIndex(predicate /* , thisArg */) {
          return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        forEach: function forEach(callbackfn /* , thisArg */) {
          arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        indexOf: function indexOf(searchElement /* , fromIndex */) {
          return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        includes: function includes(searchElement /* , fromIndex */) {
          return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        join: function join(separator) { // eslint-disable-line no-unused-vars
          return arrayJoin.apply(validate(this), arguments);
        },
        lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
          return arrayLastIndexOf.apply(validate(this), arguments);
        },
        map: function map(mapfn /* , thisArg */) {
          return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
          return arrayReduce.apply(validate(this), arguments);
        },
        reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
          return arrayReduceRight.apply(validate(this), arguments);
        },
        reverse: function reverse() {
          const that = this;
          let length = validate(that).length;
          const middle = Math.floor(length / 2);
          let index = 0;
          let value;
          while (index < middle) {
            value = that[index];
            that[index++] = that[--length];
            that[length] = value;
          } return that;
        },
        some: function some(callbackfn /* , thisArg */) {
          return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        sort: function sort(comparefn) {
          return arraySort.call(validate(this), comparefn);
        },
        subarray: function subarray(begin, end) {
          const O = validate(this);
          const length = O.length;
          const $begin = toAbsoluteIndex(begin, length);
          return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
            O.buffer,
            O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
            toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
          );
        },
      };

      const $slice = function slice(start, end) {
        return speciesFromList(this, arraySlice.call(validate(this), start, end));
      };

      const $set = function set(arrayLike /* , offset */) {
        validate(this);
        const offset = toOffset(arguments[1], 1);
        const length = this.length;
        const src = toObject(arrayLike);
        const len = toLength(src.length);
        let index = 0;
        if (len + offset > length) throw RangeError(WRONG_LENGTH);
        while (index < len) this[offset + index] = src[index++];
      };

      const $iterators$$1 = {
        entries: function entries() {
          return arrayEntries.call(validate(this));
        },
        keys: function keys() {
          return arrayKeys.call(validate(this));
        },
        values: function values() {
          return arrayValues.call(validate(this));
        },
      };

      const isTAIndex = function(target, key) {
        return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key !== 'symbol'
      && key in target
      && String(+key) == String(key);
      };
      const $getDesc = function getOwnPropertyDescriptor(target, key) {
        return isTAIndex(target, key = toPrimitive(key, true))
          ? propertyDesc(2, target[key])
          : gOPD(target, key);
      };
      const $setDesc = function defineProperty(target, key, desc) {
        if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
        ) {
          target[key] = desc.value;
          return target;
        } return dP(target, key, desc);
      };

      if (!ALL_CONSTRUCTORS) {
        $GOPD.f = $getDesc;
        $DP.f = $setDesc;
      }

      $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
        getOwnPropertyDescriptor: $getDesc,
        defineProperty: $setDesc,
      });

      if (fails(function() { arrayToString.call({}); })) {
        arrayToString = arrayToLocaleString = function toString() {
          return arrayJoin.call(this);
        };
      }

      const $TypedArrayPrototype$ = redefineAll({}, proto);
      redefineAll($TypedArrayPrototype$, $iterators$$1);
      hide($TypedArrayPrototype$, ITERATOR, $iterators$$1.values);
      redefineAll($TypedArrayPrototype$, {
        slice: $slice,
        set: $set,
        constructor() { /* noop */ },
        toString: arrayToString,
        toLocaleString: $toLocaleString,
      });
      addGetter($TypedArrayPrototype$, 'buffer', 'b');
      addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
      addGetter($TypedArrayPrototype$, 'byteLength', 'l');
      addGetter($TypedArrayPrototype$, 'length', 'e');
      dP($TypedArrayPrototype$, TAG, {
        get() { return this[TYPED_ARRAY]; },
      });

      // eslint-disable-next-line max-statements
      module.exports = function(KEY, BYTES, wrapper, CLAMPED) {
        CLAMPED = !!CLAMPED;
        const NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
        const GETTER = 'get' + KEY;
        const SETTER = 'set' + KEY;
        let TypedArray = global[NAME];
        const Base = TypedArray || {};
        const TAC = TypedArray && getPrototypeOf(TypedArray);
        const FORCED = !TypedArray || !$typed.ABV;
        const O = {};
        let TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
        const getter = function(that, index) {
          const data = that._d;
          return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
        };
        const setter = function(that, index, value) {
          const data = that._d;
          if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
          data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
        };
        const addElement = function(that, index) {
          dP(that, index, {
            get() {
              return getter(this, index);
            },
            set(value) {
              return setter(this, index, value);
            },
            enumerable: true,
          });
        };
        if (FORCED) {
          TypedArray = wrapper(function(that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME, '_d');
            let index = 0;
            let offset = 0;
            let buffer,
              byteLength,
              length,
              klass;
            if (!isObject(data)) {
              length = toIndex(data);
              byteLength = length * BYTES;
              buffer = new $ArrayBuffer(byteLength);
            } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              buffer = data;
              offset = toOffset($offset, BYTES);
              const $len = data.byteLength;
              if ($length === undefined) {
                if ($len % BYTES) throw RangeError(WRONG_LENGTH);
                byteLength = $len - offset;
                if (byteLength < 0) throw RangeError(WRONG_LENGTH);
              } else {
                byteLength = toLength($length) * BYTES;
                if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
              }
              length = byteLength / BYTES;
            } else if (TYPED_ARRAY in data) {
              return fromList(TypedArray, data);
            } else {
              return $from.call(TypedArray, data);
            }
            hide(that, '_d', {
              b: buffer,
              o: offset,
              l: byteLength,
              e: length,
              v: new $DataView(buffer),
            });
            while (index < length) addElement(that, index++);
          });
          TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
          hide(TypedArrayPrototype, 'constructor', TypedArray);
        } else if (!fails(function() {
          TypedArray(1);
        }) || !fails(function() {
            new TypedArray(-1); // eslint-disable-line no-new
          }) || !$iterDetect(function(iter) {
            new TypedArray(); // eslint-disable-line no-new
            new TypedArray(null); // eslint-disable-line no-new
            new TypedArray(1.5); // eslint-disable-line no-new
            new TypedArray(iter); // eslint-disable-line no-new
          }, true)) {
          TypedArray = wrapper(function(that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME);
            let klass;
            // `ws` module bug, temporarily remove validation length for Uint8Array
            // https://github.com/websockets/ws/pull/645
            if (!isObject(data)) return new Base(toIndex(data));
            if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              return $length !== undefined
                ? new Base(data, toOffset($offset, BYTES), $length)
                : $offset !== undefined
                  ? new Base(data, toOffset($offset, BYTES))
                  : new Base(data);
            }
            if (TYPED_ARRAY in data) return fromList(TypedArray, data);
            return $from.call(TypedArray, data);
          });
          arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key) {
            if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
          });
          TypedArray[PROTOTYPE] = TypedArrayPrototype;
          if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
        }
        const $nativeIterator = TypedArrayPrototype[ITERATOR];
        const CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
        const $iterator = $iterators$$1.values;
        hide(TypedArray, TYPED_CONSTRUCTOR, true);
        hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
        hide(TypedArrayPrototype, VIEW, true);
        hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

        if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
          dP(TypedArrayPrototype, TAG, {
            get() { return NAME; },
          });
        }

        O[NAME] = TypedArray;

        $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

        $export($export.S, NAME, {
          BYTES_PER_ELEMENT: BYTES,
        });

        $export($export.S + $export.F * fails(function() { Base.of.call(TypedArray, 1); }), NAME, {
          from: $from,
          of: $of,
        });

        if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

        $export($export.P, NAME, proto);

        setSpecies(NAME);

        $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

        $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators$$1);

        if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

        $export($export.P + $export.F * fails(function() {
          new TypedArray(1).slice();
        }), NAME, { slice: $slice });

        $export($export.P + $export.F * (fails(function() {
          return [ 1, 2 ].toLocaleString() != new TypedArray([ 1, 2 ]).toLocaleString();
        }) || !fails(function() {
            TypedArrayPrototype.toLocaleString.call([ 1, 2 ]);
          })), NAME, { toLocaleString: $toLocaleString });

        Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
        if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
      };
    } else module.exports = function() { /* empty */ };
  });

  _typedArray('Int8', 1, function(init) {
    return function Int8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint8', 1, function(init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint8', 1, function(init) {
    return function Uint8ClampedArray(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  }, true);

  _typedArray('Int16', 2, function(init) {
    return function Int16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint16', 2, function(init) {
    return function Uint16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Int32', 4, function(init) {
    return function Int32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint32', 4, function(init) {
    return function Uint32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Float32', 4, function(init) {
    return function Float32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Float64', 8, function(init) {
    return function Float64Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  const rApply = (_global.Reflect || {}).apply;
  const fApply = Function.apply;
  // MS Edge argumentsList argument is optional
  _export(_export.S + _export.F * !_fails(function() {
    rApply(function() { /* empty */ });
  }), 'Reflect', {
    apply: function apply(target, thisArgument, argumentsList) {
      const T = _aFunction(target);
      const L = _anObject(argumentsList);
      return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
    },
  });

  const rConstruct = (_global.Reflect || {}).construct;

  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  const NEW_TARGET_BUG = _fails(function() {
    function F() { /* empty */ }
    return !(rConstruct(function() { /* empty */ }, [], F) instanceof F);
  });
  const ARGS_BUG = !_fails(function() {
    rConstruct(function() { /* empty */ });
  });

  _export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
    construct: function construct(Target, args /* , newTarget */) {
      _aFunction(Target);
      _anObject(args);
      const newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
      if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0: return new Target();
          case 1: return new Target(args[0]);
          case 2: return new Target(args[0], args[1]);
          case 3: return new Target(args[0], args[1], args[2]);
          case 4: return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        const $args = [ null ];
        $args.push.apply($args, args);
        return new (_bind.apply(Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      const proto = newTarget.prototype;
      const instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
      const result = Function.apply.call(Target, instance, args);
      return _isObject(result) ? result : instance;
    },
  });

  _export(_export.S + _export.F * _fails(function() {
  // eslint-disable-next-line no-undef
    Reflect.defineProperty(_objectDp.f({}, 1, { value: 1 }), 1, { value: 2 });
  }), 'Reflect', {
    defineProperty: function defineProperty(target, propertyKey, attributes) {
      _anObject(target);
      propertyKey = _toPrimitive(propertyKey, true);
      _anObject(attributes);
      try {
        _objectDp.f(target, propertyKey, attributes);
        return true;
      } catch (e) {
        return false;
      }
    },
  });

  const gOPD$3 = _objectGopd.f;


  _export(_export.S, 'Reflect', {
    deleteProperty: function deleteProperty(target, propertyKey) {
      const desc = gOPD$3(_anObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    },
  });

  const Enumerate = function(iterated) {
    this._t = _anObject(iterated); // target
    this._i = 0; // next index
    const keys = this._k = []; // keys
    let key;
    for (key in iterated) keys.push(key);
  };
  _iterCreate(Enumerate, 'Object', function() {
    const that = this;
    const keys = that._k;
    let key;
    do {
      if (that._i >= keys.length) return { value: undefined, done: true };
    } while (!((key = keys[that._i++]) in that._t));
    return { value: key, done: false };
  });

  _export(_export.S, 'Reflect', {
    enumerate: function enumerate(target) {
      return new Enumerate(target);
    },
  });

  function get(target, propertyKey /* , receiver */) {
    const receiver = arguments.length < 3 ? target : arguments[2];
    let desc,
      proto;
    if (_anObject(target) === receiver) return target[propertyKey];
    if (desc = _objectGopd.f(target, propertyKey)) {
      return _has(desc, 'value')
        ? desc.value
        : desc.get !== undefined
          ? desc.get.call(receiver)
          : undefined;
    }
    if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
  }

  _export(_export.S, 'Reflect', { get });

  _export(_export.S, 'Reflect', {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
      return _objectGopd.f(_anObject(target), propertyKey);
    },
  });

  _export(_export.S, 'Reflect', {
    getPrototypeOf: function getPrototypeOf(target) {
      return _objectGpo(_anObject(target));
    },
  });

  _export(_export.S, 'Reflect', {
    has: function has(target, propertyKey) {
      return propertyKey in target;
    },
  });

  const $isExtensible = Object.isExtensible;

  _export(_export.S, 'Reflect', {
    isExtensible: function isExtensible(target) {
      _anObject(target);
      return $isExtensible ? $isExtensible(target) : true;
    },
  });

  const Reflect$1 = _global.Reflect;
  const _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
    const keys = _objectGopn.f(_anObject(it));
    const getSymbols = _objectGops.f;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };

  _export(_export.S, 'Reflect', { ownKeys: _ownKeys });

  const $preventExtensions = Object.preventExtensions;

  _export(_export.S, 'Reflect', {
    preventExtensions: function preventExtensions(target) {
      _anObject(target);
      try {
        if ($preventExtensions) $preventExtensions(target);
        return true;
      } catch (e) {
        return false;
      }
    },
  });

  function set(target, propertyKey, V /* , receiver */) {
    const receiver = arguments.length < 4 ? target : arguments[3];
    let ownDesc = _objectGopd.f(_anObject(target), propertyKey);
    let existingDescriptor,
      proto;
    if (!ownDesc) {
      if (_isObject(proto = _objectGpo(target))) {
        return set(proto, propertyKey, V, receiver);
      }
      ownDesc = _propertyDesc(0);
    }
    if (_has(ownDesc, 'value')) {
      if (ownDesc.writable === false || !_isObject(receiver)) return false;
      existingDescriptor = _objectGopd.f(receiver, propertyKey) || _propertyDesc(0);
      existingDescriptor.value = V;
      _objectDp.f(receiver, propertyKey, existingDescriptor);
      return true;
    }
    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
  }

  _export(_export.S, 'Reflect', { set });

  if (_setProto) {
    _export(_export.S, 'Reflect', {
      setPrototypeOf: function setPrototypeOf(target, proto) {
        _setProto.check(target, proto);
        try {
          _setProto.set(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      },
    });
  }

  const $includes = _arrayIncludes(true);

  _export(_export.P, 'Array', {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    },
  });

  _addToUnscopables('includes');

  const IS_CONCAT_SPREADABLE = _wks('isConcatSpreadable');

  function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
    let targetIndex = start;
    let sourceIndex = 0;
    const mapFn = mapper ? _ctx(mapper, thisArg, 3) : false;
    let element,
      spreadable;

    while (sourceIndex < sourceLen) {
      if (sourceIndex in source) {
        element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

        spreadable = false;
        if (_isObject(element)) {
          spreadable = element[IS_CONCAT_SPREADABLE];
          spreadable = spreadable !== undefined ? !!spreadable : _isArray(element);
        }

        if (spreadable && depth > 0) {
          targetIndex = flattenIntoArray(target, original, element, _toLength(element.length), targetIndex, depth - 1) - 1;
        } else {
          if (targetIndex >= 0x1fffffffffffff) throw TypeError();
          target[targetIndex] = element;
        }

        targetIndex++;
      }
      sourceIndex++;
    }
    return targetIndex;
  }

  const _flattenIntoArray = flattenIntoArray;

  _export(_export.P, 'Array', {
    flatMap: function flatMap(callbackfn /* , thisArg */) {
      const O = _toObject(this);
      let sourceLen,
        A;
      _aFunction(callbackfn);
      sourceLen = _toLength(O.length);
      A = _arraySpeciesCreate(O, 0);
      _flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
      return A;
    },
  });

  _addToUnscopables('flatMap');

  _export(_export.P, 'Array', {
    flatten: function flatten(/* depthArg = 1 */) {
      const depthArg = arguments[0];
      const O = _toObject(this);
      const sourceLen = _toLength(O.length);
      const A = _arraySpeciesCreate(O, 0);
      _flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : _toInteger(depthArg));
      return A;
    },
  });

  _addToUnscopables('flatten');

  const $at$2 = _stringAt(true);

  _export(_export.P, 'String', {
    at: function at(pos) {
      return $at$2(this, pos);
    },
  });

  const _stringPad = function(that, maxLength, fillString, left) {
    const S = String(_defined(that));
    const stringLength = S.length;
    const fillStr = fillString === undefined ? ' ' : String(fillString);
    const intMaxLength = _toLength(maxLength);
    if (intMaxLength <= stringLength || fillStr == '') return S;
    const fillLen = intMaxLength - stringLength;
    let stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return left ? stringFiller + S : S + stringFiller;
  };

  _export(_export.P, 'String', {
    padStart: function padStart(maxLength /* , fillString = ' ' */) {
      return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
    },
  });

  _export(_export.P, 'String', {
    padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
      return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
    },
  });

  _stringTrim('trimLeft', function($trim) {
    return function trimLeft() {
      return $trim(this, 1);
    };
  }, 'trimStart');

  _stringTrim('trimRight', function($trim) {
    return function trimRight() {
      return $trim(this, 2);
    };
  }, 'trimEnd');

  const RegExpProto = RegExp.prototype;

  const $RegExpStringIterator = function(regexp, string) {
    this._r = regexp;
    this._s = string;
  };

  _iterCreate($RegExpStringIterator, 'RegExp String', function next() {
    const match = this._r.exec(this._s);
    return { value: match, done: match === null };
  });

  _export(_export.P, 'String', {
    matchAll: function matchAll(regexp) {
      _defined(this);
      if (!_isRegexp(regexp)) throw TypeError(regexp + ' is not a regexp!');
      const S = String(this);
      const flags = 'flags' in RegExpProto ? String(regexp.flags) : _flags.call(regexp);
      const rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
      rx.lastIndex = _toLength(regexp.lastIndex);
      return new $RegExpStringIterator(rx, S);
    },
  });

  _wksDefine('asyncIterator');

  _wksDefine('observable');

  _export(_export.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      const O = _toIobject(object);
      const getDesc = _objectGopd.f;
      const keys = _ownKeys(O);
      const result = {};
      let i = 0;
      let key,
        desc;
      while (keys.length > i) {
        desc = getDesc(O, key = keys[i++]);
        if (desc !== undefined) _createProperty(result, key, desc);
      }
      return result;
    },
  });

  const isEnum$1 = _objectPie.f;
  const _objectToArray = function(isEntries) {
    return function(it) {
      const O = _toIobject(it);
      const keys = _objectKeys(O);
      const length = keys.length;
      let i = 0;
      const result = [];
      let key;
      while (length > i) {
        if (isEnum$1.call(O, key = keys[i++])) {
          result.push(isEntries ? [ key, O[key] ] : O[key]);
        }
      } return result;
    };
  };

  const $values = _objectToArray(false);

  _export(_export.S, 'Object', {
    values: function values(it) {
      return $values(it);
    },
  });

  const $entries = _objectToArray(true);

  _export(_export.S, 'Object', {
    entries: function entries(it) {
      return $entries(it);
    },
  });

  const _objectForcedPam = _library || !_fails(function() {
    const K = Math.random();
    // In FF throws only define methods
    // eslint-disable-next-line no-undef, no-useless-call
    __defineSetter__.call(null, K, function() { /* empty */ });
    delete _global[K];
  });

  _descriptors && _export(_export.P + _objectForcedPam, 'Object', {
    __defineGetter__: function __defineGetter__(P, getter) {
      _objectDp.f(_toObject(this), P, { get: _aFunction(getter), enumerable: true, configurable: true });
    },
  });

  _descriptors && _export(_export.P + _objectForcedPam, 'Object', {
    __defineSetter__: function __defineSetter__(P, setter) {
      _objectDp.f(_toObject(this), P, { set: _aFunction(setter), enumerable: true, configurable: true });
    },
  });

  const getOwnPropertyDescriptor = _objectGopd.f;

  // B.2.2.4 Object.prototype.__lookupGetter__(P)
  _descriptors && _export(_export.P + _objectForcedPam, 'Object', {
    __lookupGetter__: function __lookupGetter__(P) {
      let O = _toObject(this);
      const K = _toPrimitive(P, true);
      let D;
      do {
        if (D = getOwnPropertyDescriptor(O, K)) return D.get;
      } while (O = _objectGpo(O));
    },
  });

  const getOwnPropertyDescriptor$1 = _objectGopd.f;

  // B.2.2.5 Object.prototype.__lookupSetter__(P)
  _descriptors && _export(_export.P + _objectForcedPam, 'Object', {
    __lookupSetter__: function __lookupSetter__(P) {
      let O = _toObject(this);
      const K = _toPrimitive(P, true);
      let D;
      do {
        if (D = getOwnPropertyDescriptor$1(O, K)) return D.set;
      } while (O = _objectGpo(O));
    },
  });

  const _arrayFromIterable = function(iter, ITERATOR) {
    const result = [];
    _forOf(iter, false, result.push, result, ITERATOR);
    return result;
  };

  const _collectionToJson = function(NAME) {
    return function toJSON() {
      if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
      return _arrayFromIterable(this);
    };
  };

  _export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

  _export(_export.P + _export.R, 'Set', { toJSON: _collectionToJson('Set') });

  const _setCollectionOf = function(COLLECTION) {
    _export(_export.S, COLLECTION, { of: function of() {
      let length = arguments.length;
      const A = Array(length);
      while (length--) A[length] = arguments[length];
      return new this(A);
    } });
  };

  _setCollectionOf('Map');

  _setCollectionOf('Set');

  _setCollectionOf('WeakMap');

  _setCollectionOf('WeakSet');

  const _setCollectionFrom = function(COLLECTION) {
    _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
      const mapFn = arguments[1];
      let mapping,
        A,
        n,
        cb;
      _aFunction(this);
      mapping = mapFn !== undefined;
      if (mapping) _aFunction(mapFn);
      if (source == undefined) return new this();
      A = [];
      if (mapping) {
        n = 0;
        cb = _ctx(mapFn, arguments[2], 2);
        _forOf(source, false, function(nextItem) {
          A.push(cb(nextItem, n++));
        });
      } else {
        _forOf(source, false, A.push, A);
      }
      return new this(A);
    } });
  };

  _setCollectionFrom('Map');

  _setCollectionFrom('Set');

  _setCollectionFrom('WeakMap');

  _setCollectionFrom('WeakSet');

  _export(_export.G, { global: _global });

  _export(_export.S, 'System', { global: _global });

  _export(_export.S, 'Error', {
    isError: function isError(it) {
      return _cof(it) === 'Error';
    },
  });

  _export(_export.S, 'Math', {
    clamp: function clamp(x, lower, upper) {
      return Math.min(upper, Math.max(lower, x));
    },
  });

  _export(_export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

  const RAD_PER_DEG = 180 / Math.PI;

  _export(_export.S, 'Math', {
    degrees: function degrees(radians) {
      return radians * RAD_PER_DEG;
    },
  });

  // https://rwaldron.github.io/proposal-math-extensions/
  const _mathScale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
    if (
      arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
    ) return NaN;
    if (x === Infinity || x === -Infinity) return x;
    return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
  };

  _export(_export.S, 'Math', {
    fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
      return _mathFround(_mathScale(x, inLow, inHigh, outLow, outHigh));
    },
  });

  _export(_export.S, 'Math', {
    iaddh: function iaddh(x0, x1, y0, y1) {
      const $x0 = x0 >>> 0;
      const $x1 = x1 >>> 0;
      const $y0 = y0 >>> 0;
      return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
    },
  });

  _export(_export.S, 'Math', {
    isubh: function isubh(x0, x1, y0, y1) {
      const $x0 = x0 >>> 0;
      const $x1 = x1 >>> 0;
      const $y0 = y0 >>> 0;
      return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
    },
  });

  _export(_export.S, 'Math', {
    imulh: function imulh(u, v) {
      const UINT16 = 0xffff;
      const $u = +u;
      const $v = +v;
      const u0 = $u & UINT16;
      const v0 = $v & UINT16;
      const u1 = $u >> 16;
      const v1 = $v >> 16;
      const t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
      return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
    },
  });

  _export(_export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

  const DEG_PER_RAD = Math.PI / 180;

  _export(_export.S, 'Math', {
    radians: function radians(degrees) {
      return degrees * DEG_PER_RAD;
    },
  });

  _export(_export.S, 'Math', { scale: _mathScale });

  _export(_export.S, 'Math', {
    umulh: function umulh(u, v) {
      const UINT16 = 0xffff;
      const $u = +u;
      const $v = +v;
      const u0 = $u & UINT16;
      const v0 = $v & UINT16;
      const u1 = $u >>> 16;
      const v1 = $v >>> 16;
      const t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
      return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
    },
  });

  _export(_export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
    return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
  } });

  _export(_export.P + _export.R, 'Promise', { finally(onFinally) {
    const C = _speciesConstructor(this, _core.Promise || _global.Promise);
    const isFunction = typeof onFinally === 'function';
    return this.then(
      isFunction ? function(x) {
        return _promiseResolve(C, onFinally()).then(function() { return x; });
      } : onFinally,
      isFunction ? function(e) {
        return _promiseResolve(C, onFinally()).then(function() { throw e; });
      } : onFinally
    );
  } });

  _export(_export.S, 'Promise', { try(callbackfn) {
    const promiseCapability = _newPromiseCapability.f(this);
    const result = _perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  } });

  const shared$1 = _shared('metadata');
  const store$1 = shared$1.store || (shared$1.store = new (es6_weakMap)());

  const getOrCreateMetadataMap = function(target, targetKey, create) {
    let targetMetadata = store$1.get(target);
    if (!targetMetadata) {
      if (!create) return undefined;
      store$1.set(target, targetMetadata = new es6_map());
    }
    let keyMetadata = targetMetadata.get(targetKey);
    if (!keyMetadata) {
      if (!create) return undefined;
      targetMetadata.set(targetKey, keyMetadata = new es6_map());
    } return keyMetadata;
  };
  const ordinaryHasOwnMetadata = function(MetadataKey, O, P) {
    const metadataMap = getOrCreateMetadataMap(O, P, false);
    return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
  };
  const ordinaryGetOwnMetadata = function(MetadataKey, O, P) {
    const metadataMap = getOrCreateMetadataMap(O, P, false);
    return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
  };
  const ordinaryDefineOwnMetadata$1 = function(MetadataKey, MetadataValue, O, P) {
    getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
  };
  const ordinaryOwnMetadataKeys = function(target, targetKey) {
    const metadataMap = getOrCreateMetadataMap(target, targetKey, false);
    const keys = [];
    if (metadataMap) metadataMap.forEach(function(_, key) { keys.push(key); });
    return keys;
  };
  const toMetaKey$1 = function(it) {
    return it === undefined || typeof it === 'symbol' ? it : String(it);
  };
  const exp$3 = function(O) {
    _export(_export.S, 'Reflect', O);
  };

  const _metadata = {
    store: store$1,
    map: getOrCreateMetadataMap,
    has: ordinaryHasOwnMetadata,
    get: ordinaryGetOwnMetadata,
    set: ordinaryDefineOwnMetadata$1,
    keys: ordinaryOwnMetadataKeys,
    key: toMetaKey$1,
    exp: exp$3,
  };

  const toMetaKey = _metadata.key;
  const ordinaryDefineOwnMetadata = _metadata.set;

  _metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, _anObject(target), toMetaKey(targetKey));
  } });

  const toMetaKey$2 = _metadata.key;
  const getOrCreateMetadataMap$1 = _metadata.map;
  const store$2 = _metadata.store;

  _metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
    const targetKey = arguments.length < 3 ? undefined : toMetaKey$2(arguments[2]);
    const metadataMap = getOrCreateMetadataMap$1(_anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap.delete(metadataKey)) return false;
    if (metadataMap.size) return true;
    const targetMetadata = store$2.get(target);
    targetMetadata.delete(targetKey);
    return !!targetMetadata.size || store$2.delete(target);
  } });

  const ordinaryHasOwnMetadata$1 = _metadata.has;
  const ordinaryGetOwnMetadata$1 = _metadata.get;
  const toMetaKey$3 = _metadata.key;

  var ordinaryGetMetadata = function(MetadataKey, O, P) {
    const hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
    if (hasOwn) return ordinaryGetOwnMetadata$1(MetadataKey, O, P);
    const parent = _objectGpo(O);
    return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
  };

  _metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryGetMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$3(arguments[2]));
  } });

  const ordinaryOwnMetadataKeys$1 = _metadata.keys;
  const toMetaKey$4 = _metadata.key;

  var ordinaryMetadataKeys = function(O, P) {
    const oKeys = ordinaryOwnMetadataKeys$1(O, P);
    const parent = _objectGpo(O);
    if (parent === null) return oKeys;
    const pKeys = ordinaryMetadataKeys(parent, P);
    return pKeys.length ? oKeys.length ? _arrayFromIterable(new es6_set(oKeys.concat(pKeys))) : pKeys : oKeys;
  };

  _metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
    return ordinaryMetadataKeys(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$4(arguments[1]));
  } });

  const ordinaryGetOwnMetadata$2 = _metadata.get;
  const toMetaKey$5 = _metadata.key;

  _metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryGetOwnMetadata$2(metadataKey, _anObject(target)
      , arguments.length < 3 ? undefined : toMetaKey$5(arguments[2]));
  } });

  const ordinaryOwnMetadataKeys$2 = _metadata.keys;
  const toMetaKey$6 = _metadata.key;

  _metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
    return ordinaryOwnMetadataKeys$2(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$6(arguments[1]));
  } });

  const ordinaryHasOwnMetadata$2 = _metadata.has;
  const toMetaKey$7 = _metadata.key;

  var ordinaryHasMetadata = function(MetadataKey, O, P) {
    const hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
    if (hasOwn) return true;
    const parent = _objectGpo(O);
    return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
  };

  _metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryHasMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$7(arguments[2]));
  } });

  const ordinaryHasOwnMetadata$3 = _metadata.has;
  const toMetaKey$8 = _metadata.key;

  _metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryHasOwnMetadata$3(metadataKey, _anObject(target)
      , arguments.length < 3 ? undefined : toMetaKey$8(arguments[2]));
  } });

  const toMetaKey$9 = _metadata.key;
  const ordinaryDefineOwnMetadata$2 = _metadata.set;

  _metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, targetKey) {
      ordinaryDefineOwnMetadata$2(
        metadataKey, metadataValue,
        (targetKey !== undefined ? _anObject : _aFunction)(target),
        toMetaKey$9(targetKey)
      );
    };
  } });

  const microtask$1 = _microtask();
  const process$3 = _global.process;
  const isNode$2 = _cof(process$3) == 'process';

  _export(_export.G, {
    asap: function asap(fn) {
      const domain = isNode$2 && process$3.domain;
      microtask$1(domain ? domain.bind(fn) : fn);
    },
  });

  const microtask$2 = _microtask();
  const OBSERVABLE = _wks('observable');


  const RETURN = _forOf.RETURN;

  const getMethod = function(fn) {
    return fn == null ? undefined : _aFunction(fn);
  };

  const cleanupSubscription = function(subscription) {
    const cleanup = subscription._c;
    if (cleanup) {
      subscription._c = undefined;
      cleanup();
    }
  };

  const subscriptionClosed = function(subscription) {
    return subscription._o === undefined;
  };

  const closeSubscription = function(subscription) {
    if (!subscriptionClosed(subscription)) {
      subscription._o = undefined;
      cleanupSubscription(subscription);
    }
  };

  const Subscription = function(observer, subscriber) {
    _anObject(observer);
    this._c = undefined;
    this._o = observer;
    observer = new SubscriptionObserver(this);
    try {
      let cleanup = subscriber(observer);
      const subscription = cleanup;
      if (cleanup != null) {
        if (typeof cleanup.unsubscribe === 'function') cleanup = function() { subscription.unsubscribe(); };
        else _aFunction(cleanup);
        this._c = cleanup;
      }
    } catch (e) {
      observer.error(e);
      return;
    } if (subscriptionClosed(this)) cleanupSubscription(this);
  };

  Subscription.prototype = _redefineAll({}, {
    unsubscribe: function unsubscribe() { closeSubscription(this); },
  });

  var SubscriptionObserver = function(subscription) {
    this._s = subscription;
  };

  SubscriptionObserver.prototype = _redefineAll({}, {
    next: function next(value) {
      const subscription = this._s;
      if (!subscriptionClosed(subscription)) {
        const observer = subscription._o;
        try {
          const m = getMethod(observer.next);
          if (m) return m.call(observer, value);
        } catch (e) {
          try {
            closeSubscription(subscription);
          } finally {
            throw e;
          }
        }
      }
    },
    error: function error(value) {
      const subscription = this._s;
      if (subscriptionClosed(subscription)) throw value;
      const observer = subscription._o;
      subscription._o = undefined;
      try {
        const m = getMethod(observer.error);
        if (!m) throw value;
        value = m.call(observer, value);
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    },
    complete: function complete(value) {
      const subscription = this._s;
      if (!subscriptionClosed(subscription)) {
        const observer = subscription._o;
        subscription._o = undefined;
        try {
          const m = getMethod(observer.complete);
          value = m ? m.call(observer, value) : undefined;
        } catch (e) {
          try {
            cleanupSubscription(subscription);
          } finally {
            throw e;
          }
        } cleanupSubscription(subscription);
        return value;
      }
    },
  });

  var $Observable = function Observable(subscriber) {
    _anInstance(this, $Observable, 'Observable', '_f')._f = _aFunction(subscriber);
  };

  _redefineAll($Observable.prototype, {
    subscribe: function subscribe(observer) {
      return new Subscription(observer, this._f);
    },
    forEach: function forEach(fn) {
      const that = this;
      return new (_core.Promise || _global.Promise)(function(resolve, reject) {
        _aFunction(fn);
        var subscription = that.subscribe({
          next(value) {
            try {
              return fn(value);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },
          error: reject,
          complete: resolve,
        });
      });
    },
  });

  _redefineAll($Observable, {
    from: function from(x) {
      const C = typeof this === 'function' ? this : $Observable;
      const method = getMethod(_anObject(x)[OBSERVABLE]);
      if (method) {
        const observable = _anObject(method.call(x));
        return observable.constructor === C ? observable : new C(function(observer) {
          return observable.subscribe(observer);
        });
      }
      return new C(function(observer) {
        let done = false;
        microtask$2(function() {
          if (!done) {
            try {
              if (_forOf(x, false, function(it) {
                observer.next(it);
                if (done) return RETURN;
              }) === RETURN) return;
            } catch (e) {
              if (done) throw e;
              observer.error(e);
              return;
            } observer.complete();
          }
        });
        return function() { done = true; };
      });
    },
    of: function of() {
      for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
      return new (typeof this === 'function' ? this : $Observable)(function(observer) {
        let done = false;
        microtask$2(function() {
          if (!done) {
            for (let j = 0; j < items.length; ++j) {
              observer.next(items[j]);
              if (done) return;
            } observer.complete();
          }
        });
        return function() { done = true; };
      });
    },
  });

  _hide($Observable.prototype, OBSERVABLE, function() { return this; });

  _export(_export.G, { Observable: $Observable });

  _setSpecies('Observable');

  const _path = _global;

  const _partial = function(/* ...pargs */) {
    const fn = _aFunction(this);
    const length = arguments.length;
    const pargs = Array(length);
    let i = 0;
    const _ = _path._;
    let holder = false;
    while (length > i) if ((pargs[i] = arguments[i++]) === _) holder = true;
    return function(/* ...args */) {
      const that = this;
      const aLen = arguments.length;
      let j = 0;
      let k = 0;
      let args;
      if (!holder && !aLen) return _invoke(fn, pargs, that);
      args = pargs.slice();
      if (holder) for (;length > j; j++) if (args[j] === _) args[j] = arguments[k++];
      while (aLen > k) args.push(arguments[k++]);
      return _invoke(fn, args, that);
    };
  };

  const navigator = _global.navigator;
  const MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
  const wrap$1 = function(set) {
    return MSIE ? function(fn, time /* , ...args */) {
      return set(_invoke(
        _partial,
        [].slice.call(arguments, 2),
        // eslint-disable-next-line no-new-func
        typeof fn === 'function' ? fn : Function(fn)
      ), time);
    } : set;
  };
  _export(_export.G + _export.B + _export.F * MSIE, {
    setTimeout: wrap$1(_global.setTimeout),
    setInterval: wrap$1(_global.setInterval),
  });

  _export(_export.G + _export.B, {
    setImmediate: _task.set,
    clearImmediate: _task.clear,
  });

  const ITERATOR$4 = _wks('iterator');
  const TO_STRING_TAG = _wks('toStringTag');
  const ArrayValues = _iterators.Array;

  const DOMIterables = {
    CSSRuleList: true, // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true, // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true, // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false,
  };

  for (let collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
    const NAME$1 = collections[i$2];
    const explicit = DOMIterables[NAME$1];
    const Collection = _global[NAME$1];
    const proto$3 = Collection && Collection.prototype;
    var key$1;
    if (proto$3) {
      if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
      if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
      _iterators[NAME$1] = ArrayValues;
      if (explicit) for (key$1 in es6_array_iterator) if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
    }
  }

  const runtime = createCommonjsModule(function(module) {
    /**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

    !(function(global) {


      const Op = Object.prototype;
      const hasOwn = Op.hasOwnProperty;
      let undefined; // More compressible than void 0.
      const $Symbol = typeof Symbol === 'function' ? Symbol : {};
      const iteratorSymbol = $Symbol.iterator || '@@iterator';
      const asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
      const toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';

      const inModule = 'object' === 'object';
      let runtime = global.regeneratorRuntime;
      if (runtime) {
        if (inModule) {
          // If regeneratorRuntime is defined globally and we're in a module,
          // make the exports object identical to regeneratorRuntime.
          module.exports = runtime;
        }
        // Don't bother evaluating the rest of this file if the runtime was
        // already defined globally.
        return;
      }

      // Define the runtime globally (as expected by generated code) as either
      // module.exports (if we're in a module) or a new, empty object.
      runtime = global.regeneratorRuntime = inModule ? module.exports : {};

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        const protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        const generator = Object.create(protoGenerator.prototype);
        const context = new Context(tryLocsList || []);

        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);

        return generator;
      }
      runtime.wrap = wrap;

      // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.
      function tryCatch(fn, obj, arg) {
        try {
          return { type: 'normal', arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: 'throw', arg: err };
        }
      }

      const GenStateSuspendedStart = 'suspendedStart';
      const GenStateSuspendedYield = 'suspendedYield';
      const GenStateExecuting = 'executing';
      const GenStateCompleted = 'completed';

      // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.
      const ContinueSentinel = {};

      // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}

      // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.
      let IteratorPrototype = {};
      IteratorPrototype[iteratorSymbol] = function() {
        return this;
      };

      const getProto = Object.getPrototypeOf;
      const NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      const Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = 'GeneratorFunction';

      // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.
      function defineIteratorMethods(prototype) {
        [ 'next', 'throw', 'return' ].forEach(function(method) {
          prototype[method] = function(arg) {
            return this._invoke(method, arg);
          };
        });
      }

      runtime.isGeneratorFunction = function(genFun) {
        const ctor = typeof genFun === 'function' && genFun.constructor;
        return ctor
          ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === 'GeneratorFunction'
          : false;
      };

      runtime.mark = function(genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = 'GeneratorFunction';
          }
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };

      // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.
      runtime.awrap = function(arg) {
        return { __await: arg };
      };

      function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
          const record = tryCatch(generator[method], generator, arg);
          if (record.type === 'throw') {
            reject(record.arg);
          } else {
            const result = record.arg;
            const value = result.value;
            if (value &&
            typeof value === 'object' &&
            hasOwn.call(value, '__await')) {
              return Promise.resolve(value.__await).then(function(value) {
                invoke('next', value, resolve, reject);
              }, function(err) {
                invoke('throw', err, resolve, reject);
              });
            }

            return Promise.resolve(value).then(function(unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration. If the Promise is rejected, however, the
              // result for this iteration will be rejected with the same
              // reason. Note that rejections of yielded Promises are not
              // thrown back into the generator function, as is the case
              // when an awaited Promise is rejected. This difference in
              // behavior between yield and await is important, because it
              // allows the consumer to decide what to do with the yielded
              // rejection (swallow it and continue, manually .throw it back
              // into the generator, abandon iteration, whatever). With
              // await, by contrast, there is no opportunity to examine the
              // rejection reason outside the generator function, so the
              // only option is to throw it from the await expression, and
              // let the generator function handle the exception.
              result.value = unwrapped;
              resolve(result);
            }, reject);
          }
        }

        if (typeof global.process === 'object' && global.process.domain) {
          invoke = global.process.domain.bind(invoke);
        }

        let previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new Promise(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
        }

        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      AsyncIterator.prototype[asyncIteratorSymbol] = function() {
        return this;
      };
      runtime.AsyncIterator = AsyncIterator;

      // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.
      runtime.async = function(innerFn, outerFn, self, tryLocsList) {
        const iter = new AsyncIterator(
          wrap(innerFn, outerFn, self, tryLocsList)
        );

        return runtime.isGeneratorFunction(outerFn)
          ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
      };

      function makeInvokeMethod(innerFn, self, context) {
        let state = GenStateSuspendedStart;

        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error('Generator is already running');
          }

          if (state === GenStateCompleted) {
            if (method === 'throw') {
              throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            const delegate = context.delegate;
            if (delegate) {
              const delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === 'next') {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;

            } else if (context.method === 'throw') {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);

            } else if (context.method === 'return') {
              context.abrupt('return', context.arg);
            }

            state = GenStateExecuting;

            const record = tryCatch(innerFn, self, context);
            if (record.type === 'normal') {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done
                ? GenStateCompleted
                : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done,
              };

            } else if (record.type === 'throw') {
              state = GenStateCompleted;
              // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.
              context.method = 'throw';
              context.arg = record.arg;
            }
          }
        };
      }

      // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.
      function maybeInvokeDelegate(delegate, context) {
        const method = delegate.iterator[context.method];
        if (method === undefined) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === 'throw') {
            if (delegate.iterator.return) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = 'return';
              context.arg = undefined;
              maybeInvokeDelegate(delegate, context);

              if (context.method === 'throw') {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = 'throw';
            context.arg = new TypeError(
              "The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        const record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === 'throw') {
          context.method = 'throw';
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        const info = record.arg;

        if (! info) {
          context.method = 'throw';
          context.arg = new TypeError('iterator result is not an object');
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value;

          // Resume execution at the desired location (see delegateYield).
          context.next = delegate.nextLoc;

          // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.
          if (context.method !== 'return') {
            context.method = 'next';
            context.arg = undefined;
          }

        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        }

        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
      }

      // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.
      defineIteratorMethods(Gp);

      Gp[toStringTagSymbol] = 'Generator';

      // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.
      Gp[iteratorSymbol] = function() {
        return this;
      };

      Gp.toString = function() {
        return '[object Generator]';
      };

      function pushTryEntry(locs) {
        const entry = { tryLoc: locs[0] };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        const record = entry.completion || {};
        record.type = 'normal';
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{ tryLoc: 'root' }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      runtime.keys = function(object) {
        const keys = [];
        for (const key in object) {
          keys.push(key);
        }
        keys.reverse();

        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
          while (keys.length) {
            const key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }

          // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.
          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          const iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === 'function') {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            let i = -1,
              next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined;
                next.done = true;

                return next;
              };

            return next.next = next;
          }
        }

        // Return an iterator with no values.
        return { next: doneResult };
      }
      runtime.values = values;

      function doneResult() {
        return { value: undefined, done: true };
      }

      Context.prototype = {
        constructor: Context,

        reset(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.
          this.sent = this._sent = undefined;
          this.done = false;
          this.delegate = null;

          this.method = 'next';
          this.arg = undefined;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (const name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === 't' &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
                this[name] = undefined;
              }
            }
          }
        },

        stop() {
          this.done = true;

          const rootEntry = this.tryEntries[0];
          const rootRecord = rootEntry.completion;
          if (rootRecord.type === 'throw') {
            throw rootRecord.arg;
          }

          return this.rval;
        },

        dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          const context = this;
          function handle(loc, caught) {
            record.type = 'throw';
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = 'next';
              context.arg = undefined;
            }

            return !! caught;
          }

          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === 'root') {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle('end');
            }

            if (entry.tryLoc <= this.prev) {
              const hasCatch = hasOwn.call(entry, 'catchLoc');
              const hasFinally = hasOwn.call(entry, 'finallyLoc');

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }

              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }

              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }

              } else {
                throw new Error('try statement without catch or finally');
              }
            }
          }
        },

        abrupt(type, arg) {
          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, 'finallyLoc') &&
            this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry &&
          (type === 'break' ||
           type === 'continue') &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          const record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = 'next';
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },

        complete(record, afterLoc) {
          if (record.type === 'throw') {
            throw record.arg;
          }

          if (record.type === 'break' ||
          record.type === 'continue') {
            this.next = record.arg;
          } else if (record.type === 'return') {
            this.rval = this.arg = record.arg;
            this.method = 'return';
            this.next = 'end';
          } else if (record.type === 'normal' && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },

        finish(finallyLoc) {
          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },

        catch(tryLoc) {
          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              const record = entry.completion;
              if (record.type === 'throw') {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error('illegal catch attempt');
        },

        delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName,
            nextLoc,
          };

          if (this.method === 'next') {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
          }

          return ContinueSentinel;
        },
      };
    })(
      // Among the various tricks for obtaining a reference to the global
      // object, this seems to be the most reliable technique that does not
      // use indirect eval (which violates Content Security Policy).
      typeof commonjsGlobal === 'object' ? commonjsGlobal :
        typeof window === 'object' ? window :
          typeof self === 'object' ? self : commonjsGlobal
    );
  });

  const _replacer = function(regExp, replace) {
    const replacer = replace === Object(replace) ? function(part) {
      return replace[part];
    } : replace;
    return function(it) {
      return String(it).replace(regExp, replacer);
    };
  };

  const $re = _replacer(/[\\^$*+?.()|[\]{}]/g, '\\$&');

  _export(_export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

  if (commonjsGlobal._babelPolyfill) {
    throw new Error('only one instance of babel-polyfill is allowed');
  }
  commonjsGlobal._babelPolyfill = true;

  const DEFINE_PROPERTY = 'defineProperty';
  function define(O, key, value) {
    O[key] || Object[DEFINE_PROPERTY](O, key, {
      writable: true,
      configurable: true,
      value,
    });
  }

  define(String.prototype, 'padLeft', ''.padStart);
  define(String.prototype, 'padRight', ''.padEnd);

  'pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill'.split(',').forEach(function(key) {
    [][key] && define(Array, key, Function.call.bind([][key]));
  });

  const Chimee = window.Chimee;
  const plugin = {
  // 插件名为 controller
    name: 'controller',
    // 插件实体为按钮
    el: '<button>play</button>',
    data: {
      text: 'play',
    },
    methods: {
      changeVideoStatus: function changeVideoStatus() {
        this[this.text]();
      },
      changeButtonText: function changeButtonText(text) {
        this.text = text;
        this.$dom.innerText = this.text;
      },
    },
    // 在插件创建的阶段，我们为插件绑定事件。
    create: function create() {
      this.$dom.addEventListener('click', this.changeVideoStatus);
      this.$watch('controls', function(newVal, oldVal) {
        console.log(newVal, oldVal);
      }, { diff: false });
      console.log(this.$plugins);
    },

    // 插件会在播放暂停操作发生后改变自己的文案及相应的行为
    events: {
      pause: function pause() {
        this.changeButtonText('play');
      },
      play: function play() {
        this.changeButtonText('pause');
      },
      c_contextmenu: function c_contextmenu(evt) {
        console.log(evt);
      },
      c_click: function c_click(evt) {
        console.warn(evt);
      },
      click: function click(evt) {
        console.log(evt);
      },
    },
  };
  Chimee.install(plugin);
  const player = new Chimee({
  // 播放地址
    src: 'http://cdn.toxicjohann.com/lostStar.mp4',
    // src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
    // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
    // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8',
    // dom容器
    wrapper: '#wrapper',
    plugin: [ 'controller' ],
    preset: {
      flv: window.chimeeKernelFlv,
      hls: window.chimeeKernelHls,
    },
    volume: 0.1,
    // autoplay: true,
    controls: true,
  });
  player.$on('beforePlay', function(evt) {
    console.warn(evt, 'srth');
  });
  player.$on('play', function(evt) {
    console.warn(evt, 'srth');
  });
  window.player = player;
  [ 'fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange' ].forEach(function(key) {
    console.log(key);
    document.addEventListener(key, function(evt) {
      return console.log(key, evt);
    });
  });
  player.on('fullscreenchange', function(evt) {
    console.log('wowo, fullscreen', evt);
  });

}));
