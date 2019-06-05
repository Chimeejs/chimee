
/**
 * chimee v2.0.0-alpha.1
 * (c) 2017-2019 toxic-johann
 * Released under MIT
 */

'use strict';

var chimeeHelperLog = require('chimee-helper-log');
var toxicPredicateFunctions = require('toxic-predicate-functions');
var esFullscreen = require('es-fullscreen');
var toxicDecorators = require('toxic-decorators');
var domHelpers = require('dom-helpers');
var events$1 = require('events');

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

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

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

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
    ? getRawTag(value)
    : objectToString(value);
}

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
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

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

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
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
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

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
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
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
  value = toNumber(value);
  if (value === INFINITY$1 || value === -INFINITY$1) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

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
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

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
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
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
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
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
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

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

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

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
    if (!isObject(proto)) {
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
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

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
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

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

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

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
      rangeLength = nativeMax(argsLength - holdersLength, 0),
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

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max;

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
      rangeLength = nativeMax$1(argsLength - holdersLength, 0),
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

/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash() {
  // No operation performed.
}

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
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

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

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

/** Used to lookup unminified function names. */
var realNames = {};

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty$2.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

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

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

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

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

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
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty$3.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

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
var setData = shortOut(baseSetData);

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

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

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
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

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
  return !!length && baseIndexOf(array, value, 0) > -1;
}

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
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

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
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

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
  if (isLaziable(func)) {
    setData(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

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
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

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
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

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
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

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
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

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
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER$1) : source[4];
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER$1) : source[6];
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
var nativeMax$2 = Math.max;

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
  ary = ary === undefined ? ary : nativeMax$2(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG$2) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax$2(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2)) {
    bitmask &= ~(WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG$6) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG$4 || bitmask == WRAP_CURRY_RIGHT_FLAG$2) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG$2 || bitmask == (WRAP_BIND_FLAG$6 | WRAP_PARTIAL_FLAG$2)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

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
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

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

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

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
  if (!(hasOwnProperty$4.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

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
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$3 = Math.max;

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
  start = nativeMax$3(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$3(args.length - start, 0),
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
    return apply(func, this, otherArgs);
  };
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

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
  return value != null && isLength(value.length) && !isFunction(value);
}

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$6;

  return value === proto;
}

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
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

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
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

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

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

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
var isBuffer = nativeIsBuffer || stubFalse;

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
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

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

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

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
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

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

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

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
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

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

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

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
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

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

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

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
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$9.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$c.hasOwnProperty;

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
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$a.call(data, key);
}

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
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

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
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

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
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

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
      index = assocIndexOf(data, key);

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
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

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
  return assocIndexOf(this.__data__, key) > -1;
}

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
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

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
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map');

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
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

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
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

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
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

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
  return getMapData(this, key).get(key);
}

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
  return getMapData(this, key).has(key);
}

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
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

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
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

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
function toString(value) {
  return value == null ? '' : baseToString(value);
}

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

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** `Object#toString` result references. */
var objectTag$1 = '[object Object]';

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
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$b.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString$2.call(Ctor) == objectCtorString;
}

/** `Object#toString` result references. */
var domExcTag = '[object DOMException]',
    errorTag$1 = '[object Error]';

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
  if (!isObjectLike(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == errorTag$1 || tag == domExcTag ||
    (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
}

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
var bind = baseRest(function(func, thisArg, partials) {
  var bitmask = WRAP_BIND_FLAG$7;
  if (partials.length) {
    var holders = replaceHolders(partials, getHolder(bind));
    bitmask |= WRAP_PARTIAL_FLAG$3;
  }
  return createWrap(func, bitmask, thisArg, partials, holders);
});

// Assign default placeholders.
bind.placeholder = {};

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
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

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

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']',
    rsCombo = '[' + rsComboRange$1 + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange$1 + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange$1 + ']?',
    rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

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

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

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
var upperFirst = createCaseFirst('toUpperCase');

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
  return upperFirst(toString(string).toLowerCase());
}

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
var deburrLetter = basePropertyOf(deburredLetters);

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange$2 = '\\u0300-\\u036f',
    reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
    rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2;

/** Used to compose unicode capture groups. */
var rsCombo$1 = '[' + rsComboRange$2 + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo$1, 'g');

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
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

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

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

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

/** Used to compose unicode character classes. */
var rsAstralRange$2 = '\\ud800-\\udfff',
    rsComboMarksRange$3 = '\\u0300-\\u036f',
    reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$3 = '\\u20d0-\\u20ff',
    rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange$2 = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo$2 = '[' + rsComboRange$3 + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
    rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
    rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
    rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ$2 = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod$1 = rsModifier$1 + '?',
    rsOptVar$1 = '[' + rsVarRange$2 + ']?',
    rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
    rsEmoji = '(?:' + [rsDingbat, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsSeq$1;

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
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

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
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

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
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

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
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

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
  return object && copyObject(source, keys(source), object);
}

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
  return object && copyObject(source, keysIn$1(source), object);
}

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined,
    allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

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

/** Used for built-in method references. */
var objectProto$e = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$e.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols$1 ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

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
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]',
    objectTag$2 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$1 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (Map$1 && getTag(new Map$1) != mapTag$1) ||
    (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag$1) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

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

var getTag$1 = getTag;

/** Used for built-in method references. */
var objectProto$f = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$c = objectProto$f.hasOwnProperty;

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
  if (length && typeof array[0] == 'string' && hasOwnProperty$c.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

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

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
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

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

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
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$2:
      return cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

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
  return isObjectLike(value) && getTag$1(value) == mapTag$3;
}

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

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
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

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
  return isObjectLike(value) && getTag$1(value) == setTag$3;
}

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

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
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$2 = '[object Error]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$3 = '[object Object]',
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
cloneableTags[numberTag$2] = cloneableTags[objectTag$3] =
cloneableTags[regexpTag$2] = cloneableTags[setTag$4] =
cloneableTags[stringTag$2] = cloneableTags[symbolTag$2] =
cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
cloneableTags[errorTag$2] = cloneableTags[funcTag$2] =
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
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$3 || tag == argsTag$2 || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });

    return result;
  }

  if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });

    return result;
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

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
  return baseClone(value, CLONE_SYMBOLS_FLAG$1);
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_SYMBOLS_FLAG$2 = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$2);
}

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */

/** Used to stand-in for `undefined` hash values. */

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

/**
 * The base implementation of `_.conformsTo` which accepts `props` to check.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 */

/**
 * A specialized version of `baseAggregator` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

/**
 * Checks `value` to determine whether a default value should be returned in
 * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
 * or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.14.0
 * @category Util
 * @param {*} value The value to check.
 * @param {*} defaultValue The default value.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * _.defaultTo(1, 10);
 * // => 1
 *
 * _.defaultTo(undefined, 10);
 * // => 10
 */

/**
 * Gets the value at `key`, unless `key` is "__proto__".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

/** Error message constants. */

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */

/**
 * A specialized version of `_.forEachRight` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */

/**
 * Converts `set` to its value-value pairs.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the value-value pairs.
 */

/**
 * A specialized version of `_.every` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 */

/**
 * The base implementation of methods like `_.findKey` and `_.findLastKey`,
 * without support for iteratee shorthands, which iterates over `collection`
 * using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */

/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.head([1, 2, 3]);
 * // => 1
 *
 * _.head([]);
 * // => undefined
 */

/**
 * The inverse of `_.toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.fromPairs([['a', 1], ['b', 2]]);
 * // => { 'a': 1, 'b': 2 }
 */

/**
 * The base implementation of `_.gt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 */

/** Used for built-in method references. */

/* Built-in method references for those with the same name as other `lodash` methods. */

/** `Object#toString` result references. */
var stringTag$3 = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag$3);
}

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
    (isObjectLike(value) && baseGetTag(value) == boolTag$3);
}

/** `Object#toString` result references. */
var mapTag$5 = '[object Map]',
    setTag$5 = '[object Set]';

/** Used for built-in method references. */
var objectProto$g = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$d = objectProto$g.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag$1(value);
  if (tag == mapTag$5 || tag == setTag$5) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty$d.call(value, key)) {
      return false;
    }
  }
  return true;
}

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
  return typeof value == 'number' && value == toInteger(value);
}

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
    (isObjectLike(value) && baseGetTag(value) == numberTag$3);
}

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

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */

/** Used for built-in method references. */

/**
 * A specialized version of `_.lastIndexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

/**
 * The base implementation of `_.lt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`,
 *  else `false`.
 */

/**
 * The base implementation of `_.sum` and `_.sumBy` without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */

/** Error message constants. */

/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */

/** Used as references for various `Number` constants. */

/** Used to compose unicode character classes. */

/**
 * This function is like `baseIndexOf` except that it accepts a comparator.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

/* Built-in method references for those with the same name as other `lodash` methods. */

/* Built-in method references for those with the same name as other `lodash` methods. */

/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */

/**
 * A specialized version of `_.reduceRight` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the last element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */

/** Used for built-in method references. */

/**
 * This method returns a new empty object.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Object} Returns the new empty object.
 * @example
 *
 * var objects = _.times(2, _.stubObject);
 *
 * console.log(objects);
 * // => [{}, {}]
 *
 * console.log(objects[0] === objects[1]);
 * // => false
 */

/**
 * This method returns an empty string.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {string} Returns the empty string.
 * @example
 *
 * _.times(2, _.stubString);
 * // => ['', '']
 */

/**
 * This method returns `true`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `true`.
 * @example
 *
 * _.times(2, _.stubTrue);
 * // => [true, true]
 */

/**
 * This method invokes `interceptor` and returns `value`. The interceptor
 * is invoked with one argument; (value). The purpose of this method is to
 * "tap into" a method chain sequence in order to modify intermediate results.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Seq
 * @param {*} value The value to provide to `interceptor`.
 * @param {Function} interceptor The function to invoke.
 * @returns {*} Returns `value`.
 * @example
 *
 * _([1, 2, 3])
 *  .tap(function(array) {
 *    // Mutate input array.
 *    array.pop();
 *  })
 *  .reverse()
 *  .value();
 * // => [2, 1]
 */

/** Used to escape characters for inclusion in compiled string literals. */

/** Used to match template delimiters. */

/** Used to match template delimiters. */

/** Used to match template delimiters. */

/**
 * This method is like `_.tap` except that it returns the result of `interceptor`.
 * The purpose of this method is to "pass thru" values replacing intermediate
 * results in a method chain sequence.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Seq
 * @param {*} value The value to provide to `interceptor`.
 * @param {Function} interceptor The function to invoke.
 * @returns {*} Returns the result of `interceptor`.
 * @example
 *
 * _('  abc  ')
 *  .chain()
 *  .trim()
 *  .thru(function(value) {
 *    return [value];
 *  })
 *  .value();
 * // => ['abc']
 */

/**
 * Enables the wrapper to be iterable.
 *
 * @name Symbol.iterator
 * @memberOf _
 * @since 4.0.0
 * @category Seq
 * @returns {Object} Returns the wrapper object.
 * @example
 *
 * var wrapped = _([1, 2]);
 *
 * wrapped[Symbol.iterator]() === wrapped;
 * // => true
 *
 * Array.from(wrapped);
 * // => [1, 2]
 */

/**
 * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @param {Function} assignFunc The function to assign values.
 * @returns {Object} Returns the new object.
 */

/* Built-in method references for those with the same name as other `lodash` methods. */

/**
 * @license
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="es" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/**
 * @license
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="es" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

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
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

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
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
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
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
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
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
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
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
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

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

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
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
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
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

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
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
});

unwrapExports(interopRequireDefault);

var inDOM = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var _default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports.default = _default;
module.exports = exports["default"];
});

unwrapExports(inDOM);

var on_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _inDOM = interopRequireDefault(inDOM);

var on = function on() {};

if (_inDOM.default) {
  on = function () {
    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.addEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.attachEvent('on' + eventName, function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        e.currentTarget = node;
        handler.call(node, e);
      });
    };
  }();
}

var _default = on;
exports.default = _default;
module.exports = exports["default"];
});

unwrapExports(on_1);

var off_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _inDOM = interopRequireDefault(inDOM);

var off = function off() {};

if (_inDOM.default) {
  off = function () {
    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.removeEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.detachEvent('on' + eventName, handler);
    };
  }();
}

var _default = off;
exports.default = _default;
module.exports = exports["default"];
});

unwrapExports(off_1);

var contains = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _inDOM = interopRequireDefault(inDOM);

var _default = function () {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  return _inDOM.default ? function (context, node) {
    if (context.contains) {
      return context.contains(node);
    } else if (context.compareDocumentPosition) {
      return context === node || !!(context.compareDocumentPosition(node) & 16);
    } else {
      return fallback(context, node);
    }
  } : fallback;
}();

exports.default = _default;

function fallback(context, node) {
  if (node) do {
    if (node === context) return true;
  } while (node = node.parentNode);
  return false;
}

module.exports = exports["default"];
});

unwrapExports(contains);

var querySelectorAll = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = qsa;
// Zepto.js
// (c) 2010-2015 Thomas Fuchs
// Zepto.js may be freely distributed under the MIT license.
var simpleSelectorRE = /^[\w-]*$/;
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);

function qsa(element, selector) {
  var maybeID = selector[0] === '#',
      maybeClass = selector[0] === '.',
      nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
      isSimple = simpleSelectorRE.test(nameOnly),
      found;

  if (isSimple) {
    if (maybeID) {
      element = element.getElementById ? element : document;
      return (found = element.getElementById(nameOnly)) ? [found] : [];
    }

    if (element.getElementsByClassName && maybeClass) return toArray(element.getElementsByClassName(nameOnly));
    return toArray(element.getElementsByTagName(selector));
  }

  return toArray(element.querySelectorAll(selector));
}

module.exports = exports["default"];
});

unwrapExports(querySelectorAll);

var filter = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = filterEvents;

var _contains = interopRequireDefault(contains);

var _querySelectorAll = interopRequireDefault(querySelectorAll);

function filterEvents(selector, handler) {
  return function filterHandler(e) {
    var top = e.currentTarget,
        target = e.target,
        matches = (0, _querySelectorAll.default)(top, selector);
    if (matches.some(function (match) {
      return (0, _contains.default)(match, target);
    })) handler.call(this, e);
  };
}

module.exports = exports["default"];
});

unwrapExports(filter);

var listen_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _inDOM = interopRequireDefault(inDOM);

var _on = interopRequireDefault(on_1);

var _off = interopRequireDefault(off_1);

var listen = function listen() {};

if (_inDOM.default) {
  listen = function listen(node, eventName, handler, capture) {
    (0, _on.default)(node, eventName, handler, capture);
    return function () {
      (0, _off.default)(node, eventName, handler, capture);
    };
  };
}

var _default = listen;
exports.default = _default;
module.exports = exports["default"];
});

unwrapExports(listen_1);

var events = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _on = interopRequireDefault(on_1);

exports.on = _on.default;

var _off = interopRequireDefault(off_1);

exports.off = _off.default;

var _filter = interopRequireDefault(filter);

exports.filter = _filter.default;

var _listen = interopRequireDefault(listen_1);

exports.listen = _listen.default;
var _default = {
  on: _on.default,
  off: _off.default,
  filter: _filter.default,
  listen: _listen.default
};
exports.default = _default;
});

unwrapExports(events);
var events_1 = events.on;
var events_2 = events.off;
var events_3 = events.filter;
var events_4 = events.listen;

function camelize(str, isBig) {
  return str.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, function (match, spilt, initials, index) {
    return !isBig && index === 0 ? initials.toLowerCase() : initials.toUpperCase();
  });
}
function hypenate(str) {
  return camelize(str).replace(/([A-Z])/g, function (match) {
    return "-" + match.toLowerCase();
  });
}
function bind$1(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else if (fn.apply) {
    return function __autobind__() {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return fn.apply(context, args);
    };
  }

  return function __autobind__() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return fn.call.apply(fn, [context].concat(args));
  };
}
function getDeepProperty(obj, keys, _a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.throwError,
      throwError = _c === void 0 ? false : _c,
      backup = _b.backup;

  if (isString(keys)) {
    keys = keys.split(".");
  }

  if (!isArray(keys)) {
    throw new TypeError("keys of getDeepProperty must be string or Array<string>");
  }

  var read = [];
  var target = obj;

  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];

    if (isNil(target)) {
      if (throwError) {
        throw new Error("obj" + (read.length > 0 ? "." + read.join(".") : " itself") + " is " + target);
      } else {
        return backup;
      }
    }

    target = target[key];
    read.push(key);
  }

  return target;
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
        if (isNumber(value)) {
          value = value + 'px';
        }

        if (!isString(value)) {
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
  return isString(value) ? value : undefined;
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
  var _ref = isString(attribute) ? {
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

      if (toxicPredicateFunctions.isNumeric(attr) && isNumber(prop)) {
        return prop;
      }

      return attr || undefined;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) {
        return value;
      }

      var val;

      if (value === undefined || isNumber(value)) {
        val = value;
      } else if (isString(value) && !Number.isNaN(parseFloat(value))) {
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

  if (isEmpty(obj[key])) {
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

      var result = isFunction(queue[index]) ? queue[index].apply(queue, args) : queue[index];

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

    var result = isFunction(queue[index]) ? queue[index].apply(queue, args) : queue[index];

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

      if (isEmpty(event)) {
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
        if (isError(error)) {
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

      if (isEmpty(event)) {
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
      return !isEmpty(this.events);
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

      if (isFunction(handler)) {
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
        bind(fn, this).apply(void 0, arguments);
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

      if (isEmpty(event)) {
        return Promise.resolve(true);
      }

      var mainQueue = this.getEventQueue(event.main);
      return runRejectableQueue.apply(void 0, [mainQueue].concat(args)).then(function () {
        var afterQueue = _this2.getEventQueue(event.after);

        return runRejectableQueue.apply(void 0, [afterQueue].concat(args));
      }).then(function () {
        return _this2.runSideEffectEvent.apply(_this2, [key].concat(args));
      }).catch(function (error) {
        if (isError(error)) {
          _this2.dispatcher.throwError(error);
        }

        return _this2.runSideEffectEvent.apply(_this2, [key].concat(args));
      });
    }
  }, {
    key: "triggerSync",
    value: function triggerSync(key) {
      var event = this.events[key];

      if (isEmpty(event)) {
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
      return isEmpty(handlerSet) ? [] : order.reduce(function (queue, id) {
        if (isEmpty(handlerSet[id]) || !isArray(handlerSet[id]) || !_this3.dispatcher.plugins[id] && id !== '_vm') {
          return queue;
        }

        return queue.concat(handlerSet[id].map(function (fn) {
          return bind(fn, _this3.dispatcher.plugins[id] || _this3.dispatcher.vm);
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

      if (isNil(map) || !map.has(fn)) {
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

      if (isNil(map) || !map.has(fn)) {
        return;
      }

      var handlers = map.get(fn);
      var index = handlers.indexOf(handler);
      handlers.splice(index, 1);

      if (isEmpty(handlers)) {
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

      if (isEmpty(event)) {
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
    name = camelCase(name.replace(secondaryEventReg, ''));
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

  if (!isFunction(fn)) {
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

  if (!name || !isString(name) || secondaryEventReg.test(name)) {
    chimeeHelperLog.chimeeLog.error('You must provide a legal event name, which is string and could not started with before/after/_');
    return false;
  }

  if (!id || !isString(id)) {
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

        remove ? events_2(node, name, fn) : events_1(node, name, fn);
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

        remove ? events_2(node, name, fn) : events_1(node, name, fn);
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

            events_2(targetDom, name, fn);

            if (target === 'video-dom') {
              _this.dispatcher.dom.videoExtendedNodes.forEach(function (node) {
                return events_2(node, name, fn);
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

        events_1(node, name, fn);

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

        events_1(targetDom, name, fn);
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

        events_1(targetDom, name, fn);
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
          return events_1(node, name, fn);
        });
        events_1(targetDom, name, fn);
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

      if (!isFunction(fn)) {
        return;
      }

      if (target === 'kernel') {
        this.dispatcher.kernel.off(name, fn);
      } else {
        var targetDom = this.getTargetDom(target);
        events_2(targetDom, name, fn);

        if (target === 'video-dom') {
          this.dispatcher.dom.videoExtendedNodes.forEach(function (node) {
            events_2(node, name, fn);
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

var hasClass_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = hasClass;

function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

module.exports = exports["default"];
});

unwrapExports(hasClass_1);

var addClass_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = addClass;

var _hasClass = interopRequireDefault(hasClass_1);

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
}

module.exports = exports["default"];
});

unwrapExports(addClass_1);

function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

var removeClass = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
};

var _class = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _addClass = interopRequireDefault(addClass_1);

exports.addClass = _addClass.default;

var _removeClass = interopRequireDefault(removeClass);

exports.removeClass = _removeClass.default;

var _hasClass = interopRequireDefault(hasClass_1);

exports.hasClass = _hasClass.default;
var _default = {
  addClass: _addClass.default,
  removeClass: _removeClass.default,
  hasClass: _hasClass.default
};
exports.default = _default;
});

unwrapExports(_class);
var _class_1 = _class.addClass;
var _class_2 = _class.removeClass;
var _class_3 = _class.hasClass;

var matches_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = matches;

var _inDOM = interopRequireDefault(inDOM);

var _querySelectorAll = interopRequireDefault(querySelectorAll);

var matchesCache;

function matches(node, selector) {
  if (!matchesCache && _inDOM.default) {
    var body = document.body;
    var nativeMatch = body.matches || body.matchesSelector || body.webkitMatchesSelector || body.mozMatchesSelector || body.msMatchesSelector;
    matchesCache = nativeMatch ? function (node, selector) {
      return nativeMatch.call(node, selector);
    } : ie8MatchesSelector;
  }

  return matchesCache ? matchesCache(node, selector) : null;
}

function ie8MatchesSelector(node, selector) {
  var matches = (0, _querySelectorAll.default)(node.document || node.ownerDocument, selector),
      i = 0;

  while (matches[i] && matches[i] !== node) {
    i++;
  }

  return !!matches[i];
}

module.exports = exports["default"];
});

unwrapExports(matches_1);

var isWindow = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = getWindow;

function getWindow(node) {
  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
}

module.exports = exports["default"];
});

unwrapExports(isWindow);

var ownerDocument_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = ownerDocument;

function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

module.exports = exports["default"];
});

unwrapExports(ownerDocument_1);

var offset_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = offset;

var _contains = interopRequireDefault(contains);

var _isWindow = interopRequireDefault(isWindow);

var _ownerDocument = interopRequireDefault(ownerDocument_1);

function offset(node) {
  var doc = (0, _ownerDocument.default)(node),
      win = (0, _isWindow.default)(doc),
      docElem = doc && doc.documentElement,
      box = {
    top: 0,
    left: 0,
    height: 0,
    width: 0
  };
  if (!doc) return; // Make sure it's not a disconnected DOM node

  if (!(0, _contains.default)(docElem, node)) return box;
  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect(); // IE8 getBoundingClientRect doesn't support width & height

  box = {
    top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
    left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
    width: (box.width == null ? node.offsetWidth : box.width) || 0,
    height: (box.height == null ? node.offsetHeight : box.height) || 0
  };
  return box;
}

module.exports = exports["default"];
});

unwrapExports(offset_1);

var height_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = height;

var _offset = interopRequireDefault(offset_1);

var _isWindow = interopRequireDefault(isWindow);

function height(node, client) {
  var win = (0, _isWindow.default)(node);
  return win ? win.innerHeight : client ? node.clientHeight : (0, _offset.default)(node).height;
}

module.exports = exports["default"];
});

unwrapExports(height_1);

var width_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = width;

var _offset = interopRequireDefault(offset_1);

var _isWindow = interopRequireDefault(isWindow);

function width(node, client) {
  var win = (0, _isWindow.default)(node);
  return win ? win.innerWidth : client ? node.clientWidth : (0, _offset.default)(node).width;
}

module.exports = exports["default"];
});

unwrapExports(width_1);

var camelize_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = camelize;
var rHyphen = /-(.)/g;

function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}

module.exports = exports["default"];
});

unwrapExports(camelize_1);

var camelizeStyle = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = camelizeStyleName;

var _camelize = interopRequireDefault(camelize_1);

/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
 */
var msPattern = /^-ms-/;

function camelizeStyleName(string) {
  return (0, _camelize.default)(string.replace(msPattern, 'ms-'));
}

module.exports = exports["default"];
});

unwrapExports(camelizeStyle);

var hyphenate_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = hyphenate;
var rUpper = /([A-Z])/g;

function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}

module.exports = exports["default"];
});

unwrapExports(hyphenate_1);

var hyphenateStyle = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = hyphenateStyleName;

var _hyphenate = interopRequireDefault(hyphenate_1);

/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */
var msPattern = /^ms-/;

function hyphenateStyleName(string) {
  return (0, _hyphenate.default)(string).replace(msPattern, '-ms-');
}

module.exports = exports["default"];
});

unwrapExports(hyphenateStyle);

var getComputedStyle = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = _getComputedStyle;

var _camelizeStyle = interopRequireDefault(camelizeStyle);

var rposition = /^(top|right|bottom|left)$/;
var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

function _getComputedStyle(node) {
  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
  var doc = node.ownerDocument;
  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : {
    //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
    getPropertyValue: function getPropertyValue(prop) {
      var style = node.style;
      prop = (0, _camelizeStyle.default)(prop);
      if (prop == 'float') prop = 'styleFloat';
      var current = node.currentStyle[prop] || null;
      if (current == null && style && style[prop]) current = style[prop];

      if (rnumnonpx.test(current) && !rposition.test(prop)) {
        // Remember the original values
        var left = style.left;
        var runStyle = node.runtimeStyle;
        var rsLeft = runStyle && runStyle.left; // Put in the new values to get a computed value out

        if (rsLeft) runStyle.left = node.currentStyle.left;
        style.left = prop === 'fontSize' ? '1em' : current;
        current = style.pixelLeft + 'px'; // Revert the changed values

        style.left = left;
        if (rsLeft) runStyle.left = rsLeft;
      }

      return current;
    }
  };
}

module.exports = exports["default"];
});

unwrapExports(getComputedStyle);

var removeStyle_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = removeStyle;

function removeStyle(node, key) {
  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
}

module.exports = exports["default"];
});

unwrapExports(removeStyle_1);

var properties = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = void 0;

var _inDOM = interopRequireDefault(inDOM);

var transform = 'transform';
exports.transform = transform;
var prefix, transitionEnd, animationEnd;
exports.animationEnd = animationEnd;
exports.transitionEnd = transitionEnd;
var transitionProperty, transitionDuration, transitionTiming, transitionDelay;
exports.transitionDelay = transitionDelay;
exports.transitionTiming = transitionTiming;
exports.transitionDuration = transitionDuration;
exports.transitionProperty = transitionProperty;
var animationName, animationDuration, animationTiming, animationDelay;
exports.animationDelay = animationDelay;
exports.animationTiming = animationTiming;
exports.animationDuration = animationDuration;
exports.animationName = animationName;

if (_inDOM.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;
  exports.transform = transform = prefix + "-" + transform;
  exports.transitionProperty = transitionProperty = prefix + "-transition-property";
  exports.transitionDuration = transitionDuration = prefix + "-transition-duration";
  exports.transitionDelay = transitionDelay = prefix + "-transition-delay";
  exports.transitionTiming = transitionTiming = prefix + "-transition-timing-function";
  exports.animationName = animationName = prefix + "-animation-name";
  exports.animationDuration = animationDuration = prefix + "-animation-duration";
  exports.animationTiming = animationTiming = prefix + "-animation-delay";
  exports.animationDelay = animationDelay = prefix + "-animation-timing-function";
}

var _default = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};
exports.default = _default;

function getTransitionProperties() {
  var style = document.createElement('div').style;
  var vendorMap = {
    O: function O(e) {
      return "o" + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return "webkit" + e;
    },
    ms: function ms(e) {
      return "MS" + e;
    }
  };
  var vendors = Object.keys(vendorMap);
  var transitionEnd, animationEnd;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + "TransitionProperty" in style) {
      prefix = "-" + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';
  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';
  style = null;
  return {
    animationEnd: animationEnd,
    transitionEnd: transitionEnd,
    prefix: prefix
  };
}
});

unwrapExports(properties);
var properties_1 = properties.animationEnd;
var properties_2 = properties.animationDelay;
var properties_3 = properties.animationTiming;
var properties_4 = properties.animationDuration;
var properties_5 = properties.animationName;
var properties_6 = properties.transitionEnd;
var properties_7 = properties.transitionDuration;
var properties_8 = properties.transitionDelay;
var properties_9 = properties.transitionTiming;
var properties_10 = properties.transitionProperty;
var properties_11 = properties.transform;

var isTransform_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = isTransform;
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

function isTransform(property) {
  return !!(property && supportedTransforms.test(property));
}

module.exports = exports["default"];
});

unwrapExports(isTransform_1);

var style_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = style;

var _camelizeStyle = interopRequireDefault(camelizeStyle);

var _hyphenateStyle = interopRequireDefault(hyphenateStyle);

var _getComputedStyle2 = interopRequireDefault(getComputedStyle);

var _removeStyle = interopRequireDefault(removeStyle_1);



var _isTransform = interopRequireDefault(isTransform_1);

function style(node, property, value) {
  var css = '';
  var transforms = '';
  var props = property;

  if (typeof property === 'string') {
    if (value === undefined) {
      return node.style[(0, _camelizeStyle.default)(property)] || (0, _getComputedStyle2.default)(node).getPropertyValue((0, _hyphenateStyle.default)(property));
    } else {
      (props = {})[property] = value;
    }
  }

  Object.keys(props).forEach(function (key) {
    var value = props[key];

    if (!value && value !== 0) {
      (0, _removeStyle.default)(node, (0, _hyphenateStyle.default)(key));
    } else if ((0, _isTransform.default)(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += (0, _hyphenateStyle.default)(key) + ": " + value + ";";
    }
  });

  if (transforms) {
    css += properties.transform + ": " + transforms + ";";
  }

  node.style.cssText += ';' + css;
}

module.exports = exports["default"];
});

unwrapExports(style_1);

var offsetParent_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = offsetParent;

var _ownerDocument = interopRequireDefault(ownerDocument_1);

var _style = interopRequireDefault(style_1);

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

function offsetParent(node) {
  var doc = (0, _ownerDocument.default)(node),
      offsetParent = node && node.offsetParent;

  while (offsetParent && nodeName(node) !== 'html' && (0, _style.default)(offsetParent, 'position') === 'static') {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
}

module.exports = exports["default"];
});

unwrapExports(offsetParent_1);

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

var scrollTop_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = scrollTop;

var _isWindow = interopRequireDefault(isWindow);

function scrollTop(node, val) {
  var win = (0, _isWindow.default)(node);
  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;
  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
}

module.exports = exports["default"];
});

unwrapExports(scrollTop_1);

var scrollLeft = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = scrollTop;

var _isWindow = interopRequireDefault(isWindow);

function scrollTop(node, val) {
  var win = (0, _isWindow.default)(node);
  if (val === undefined) return win ? 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft : node.scrollLeft;
  if (win) win.scrollTo(val, 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop);else node.scrollLeft = val;
}

module.exports = exports["default"];
});

unwrapExports(scrollLeft);

var position_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = position;

var _extends2 = interopRequireDefault(_extends_1);

var _offset = interopRequireDefault(offset_1);

var _offsetParent = interopRequireDefault(offsetParent_1);

var _scrollTop = interopRequireDefault(scrollTop_1);

var _scrollLeft = interopRequireDefault(scrollLeft);

var _style = interopRequireDefault(style_1);

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

function position(node, offsetParent) {
  var parentOffset = {
    top: 0,
    left: 0
  },
      offset; // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
  // because it is its only offset parent

  if ((0, _style.default)(node, 'position') === 'fixed') {
    offset = node.getBoundingClientRect();
  } else {
    offsetParent = offsetParent || (0, _offsetParent.default)(node);
    offset = (0, _offset.default)(node);
    if (nodeName(offsetParent) !== 'html') parentOffset = (0, _offset.default)(offsetParent);
    parentOffset.top += parseInt((0, _style.default)(offsetParent, 'borderTopWidth'), 10) - (0, _scrollTop.default)(offsetParent) || 0;
    parentOffset.left += parseInt((0, _style.default)(offsetParent, 'borderLeftWidth'), 10) - (0, _scrollLeft.default)(offsetParent) || 0;
  } // Subtract parent offsets and node margins


  return (0, _extends2.default)({}, offset, {
    top: offset.top - parentOffset.top - (parseInt((0, _style.default)(node, 'marginTop'), 10) || 0),
    left: offset.left - parentOffset.left - (parseInt((0, _style.default)(node, 'marginLeft'), 10) || 0)
  });
}

module.exports = exports["default"];
});

unwrapExports(position_1);

var scrollParent = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = scrollPrarent;

var _style = interopRequireDefault(style_1);

var _height = interopRequireDefault(height_1);

function scrollPrarent(node) {
  var position = (0, _style.default)(node, 'position'),
      excludeStatic = position === 'absolute',
      ownerDoc = node.ownerDocument;
  if (position === 'fixed') return ownerDoc || document;

  while ((node = node.parentNode) && node.nodeType !== 9) {
    var isStatic = excludeStatic && (0, _style.default)(node, 'position') === 'static',
        style = (0, _style.default)(node, 'overflow') + (0, _style.default)(node, 'overflow-y') + (0, _style.default)(node, 'overflow-x');
    if (isStatic) continue;
    if (/(auto|scroll)/.test(style) && (0, _height.default)(node) < node.scrollHeight) return node;
  }

  return document;
}

module.exports = exports["default"];
});

unwrapExports(scrollParent);

var closest_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = closest;

var _matches = interopRequireDefault(matches_1);

var isDoc = function isDoc(obj) {
  return obj != null && obj.nodeType === obj.DOCUMENT_NODE;
};

function closest(node, selector, context) {
  while (node && (isDoc(node) || !(0, _matches.default)(node, selector))) {
    node = node !== context && !isDoc(node) ? node.parentNode : undefined;
  }

  return node;
}

module.exports = exports["default"];
});

unwrapExports(closest_1);

var query = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _matches = interopRequireDefault(matches_1);

exports.matches = _matches.default;

var _height = interopRequireDefault(height_1);

exports.height = _height.default;

var _width = interopRequireDefault(width_1);

exports.width = _width.default;

var _offset = interopRequireDefault(offset_1);

exports.offset = _offset.default;

var _offsetParent = interopRequireDefault(offsetParent_1);

exports.offsetParent = _offsetParent.default;

var _position = interopRequireDefault(position_1);

exports.position = _position.default;

var _contains = interopRequireDefault(contains);

exports.contains = _contains.default;

var _scrollParent = interopRequireDefault(scrollParent);

exports.scrollParent = _scrollParent.default;

var _scrollTop = interopRequireDefault(scrollTop_1);

exports.scrollTop = _scrollTop.default;

var _querySelectorAll = interopRequireDefault(querySelectorAll);

exports.querySelectorAll = _querySelectorAll.default;

var _closest = interopRequireDefault(closest_1);

exports.closest = _closest.default;
var _default = {
  matches: _matches.default,
  height: _height.default,
  width: _width.default,
  offset: _offset.default,
  offsetParent: _offsetParent.default,
  position: _position.default,
  contains: _contains.default,
  scrollParent: _scrollParent.default,
  scrollTop: _scrollTop.default,
  querySelectorAll: _querySelectorAll.default,
  closest: _closest.default
};
exports.default = _default;
});

unwrapExports(query);
var query_1 = query.matches;
var query_2 = query.height;
var query_3 = query.width;
var query_4 = query.offset;
var query_5 = query.offsetParent;
var query_6 = query.position;
var query_7 = query.contains;
var query_8 = query.scrollParent;
var query_9 = query.scrollTop;
var query_10 = query.querySelectorAll;
var query_11 = query.closest;

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

    if (isString(wrapper)) {
      var $wrapper = query_10(document.body, wrapper);

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
    var videoElement = query_10(this.wrapper, 'video')[0];

    if (!videoElement) {
      videoElement = document.createElement('video');
    }

    this.installVideo(videoElement);
    this.fullscreenMonitor();
    esFullscreen.esFullscreen.on('fullscreenchange', this.fullscreenMonitor);
    var videoRequiredGuardedAttributes = isArray(config.videoRequiredGuardedAttributes) ? config.videoRequiredGuardedAttributes : [];

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
      if (!isString(attr)) {
        throw new TypeError("to handle dom's attribute or style, your attr parameter must be string, but not ".concat(attr, " in ").concat(_typeof(attr)));
      }

      if (!isString(target)) {
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

      if (!isString(id)) {
        throw new TypeError('insertPlugin id parameter must be string');
      }

      if (toxicPredicateFunctions.isElement(this.plugins[id])) {
        if (process.env.NODE_ENV !== 'production') {
          chimeeHelperLog.chimeeLog.warn('Dispatcher.dom', "Plugin ".concat(id, " have already had a dom node. Now it will be replaced"));
        }

        this.removePlugin(id);
      }

      if (isString(el)) {
        if (toxicPredicateFunctions.isHTMLString(el)) {
          var outer = document.createElement('div');
          outer.innerHTML = el;
          el = outer.children[0];
        } else {
          el = document.createElement(hypenate(el));
        }
      } else if (el && isPlainObject(el)) {
        option = el;
      }

      var _option = option,
          inner = _option.inner,
          penetrate = _option.penetrate,
          className = _option.className;
      var node = el && toxicPredicateFunctions.isElement(el) ? el : document.createElement('div');
      var classNames = isString(className) ? className.split(/\s+/) : isArray(className) ? className : [];
      classNames.forEach(function (name) {
        _class_1(node, name);
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
      if (!isString(id)) {
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
      if (!isString(attr)) {
        throw new TypeError("to handle dom's attribute or style, your attr parameter must be string, but not ".concat(attr, " in ").concat(_typeof(attr)));
      }

      if (!isString(target)) {
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

      (remove ? events_2 : events_1)(element, 'mouseup', this.focusToVideo);
      (remove ? events_2 : events_1)(element, 'touchend', this.focusToVideo);
    }
  }, {
    key: "focusToVideo",
    value: function focusToVideo() {
      var x = window.scrollX;
      var y = window.scrollY;

      if (isFunction(this.videoElement.focus)) {
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

    if (!_this.off) {
      _this.off = _this.removeListener;
    }

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

  if (isString(box) && box) {
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

      if (!isFunction(VideoKernel)) {
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
      if (!isNumber(seconds)) {
        chimeeHelperLog.chimeeLog.error(LOG_TAG, "When you try to seek, you must offer us a number, but not ".concat(_typeof(seconds)));
        return;
      }

      this.videoKernel.seek(seconds);
    }
  }, {
    key: "startLoad",
    value: function startLoad() {
      if (!isFunction(this.videoKernel.startLoad)) {
        throw new Error('This video kernel do not support startLoad, please contact us on https://github.com/Chimeejs/chimee/issues');
      }

      this.videoKernel.startLoad(this.config.src);
    }
  }, {
    key: "stopLoad",
    value: function stopLoad() {
      if (isFunction(this.videoKernel.stopLoad)) {
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
      if (!Mp4Kernel || !isFunction(Mp4Kernel.isSupport) || !Mp4Kernel.isSupport()) {
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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
  if (!isString(key)) {
    throw new TypeError('key parameter must be String');
  }

  if (!isFunction(fn)) {
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
      if (!isPlainObject(obj) && !isArray(obj)) {
        throw new TypeError("$del only support Array or Object, but not ".concat(obj, ", whose type is ").concat(_typeof(obj)));
      }

      if (!isFunction(obj.__del)) {
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

      if (!isString(key) && isPlainObject(key) && isString(key.name) && isString(key.target)) {
        target = key.target;
        key = key.name;
      }

      if (!isString(key)) {
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

      if (!isString(key) && isPlainObject(key) && isString(key.name) && isString(key.target)) {
        target = key.target;
        key = key.name;
      }

      if (!isString(key)) {
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
        bind$1(fn, this).apply(void 0, arguments);
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
      if (!isPlainObject(obj) && !isArray(obj)) {
        throw new TypeError("$set only support Array or Object, but not ".concat(obj, ", whose type is ").concat(_typeof(obj)));
      }

      if (!isFunction(obj.__set)) {
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

      if (!isString(key) && !isArray(key)) {
        throw new TypeError("$watch only accept string and Array<string> as key to find the target to spy on, but not ".concat(key, ", whose type is ").concat(_typeof(key)));
      }

      var watching = true;

      var watcher = function watcher() {
        if (watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) {
          bind$1(handler, this).apply(void 0, arguments);
        }
      };

      var unwatcher = function unwatcher() {
        watching = false;

        var index = _this2.unwatchHandlers.indexOf(unwatcher);

        if (index > -1) {
          _this2.unwatchHandlers.splice(index, 1);
        }
      };

      var keys = isString(key) ? key.split('.') : key;
      var property = keys.pop();
      var videoConfig = this.dispatcher.videoConfig;
      var target = keys.length === 0 && !other && isVideoDomAttribute(property) ? videoConfig : ['isFullscreen', 'fullscreenElement'].indexOf(property) > -1 ? this.dispatcher.dom : getDeepProperty(other || this, keys, {
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
        if (!isArray(_this4.events[key])) {
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
            return bind$1(video[key], video);
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
      if (!isPlainObject(config)) {
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
    _this.VERSION = '2.0.0-alpha.1';
    _this.autoFocusValue = false;
    _this.levelValue = 0;
    _this.operableValue = true;

    if (!dispatcher) {
      if (process.env.NODE_ENV !== 'production') {
        chimeeHelperLog.chimeeLog.error('Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?');
      }

      throw new TypeError('lack of dispatcher');
    }

    if (!isString(id)) {
      throw new TypeError('id of PluginConfig must be string');
    }

    _this.id = id;
    _this.$videoConfig = _this.dispatcher.videoConfig;

    _this.wrapAsVideo(_this.$videoConfig);

    _this.beforeCreate = _this.beforeCreate || beforeCreate;

    try {
      if (isFunction(_this.beforeCreate)) {
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

    if (!toxicPredicateFunctions.isEmpty(methods) && isPlainObject(methods)) {
      Object.keys(methods).forEach(function (key) {
        var fn = methods[key];

        if (!isFunction(fn)) {
          throw new TypeError('plugins methods must be Function');
        }

        Object.defineProperty(_assertThisInitialized(_this), key, {
          configurable: true,
          enumerable: false,
          value: bind$1(fn, _assertThisInitialized(_this)),
          writable: true
        });
      });
    }

    if (!toxicPredicateFunctions.isEmpty(events) && isPlainObject(events)) {
      Object.keys(events).forEach(function (key) {
        if (!isFunction(events[key])) {
          throw new TypeError('plugins events hook must bind with Function');
        }

        _this.$on(key, events[key]);
      });
    }

    if (!toxicPredicateFunctions.isEmpty(data) && isPlainObject(data)) {
      Object.assign(_assertThisInitialized(_this), cloneDeep(data));
    }

    if (!toxicPredicateFunctions.isEmpty(computed) && isPlainObject(computed)) {
      var props = Object.keys(computed).reduce(function (props, key) {
        var val = computed[key];

        if (isFunction(val)) {
          props[key] = toxicDecorators.accessor({
            get: val
          });
          return props;
        }

        if (isPlainObject(val) && (isFunction(val.get) || isFunction(val.set))) {
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
    _this.$autoFocus = isBoolean(autoFocus) ? autoFocus : inner;
    _this.$inner = inner;
    _this.$penetrate = penetrate;
    toxicDecorators.applyDecorators(_assertThisInitialized(_this), {
      $inner: toxicDecorators.frozen,
      $penetrate: toxicDecorators.frozen
    }, {
      self: true
    });
    _this.$operable = isBoolean(option.operable) ? option.operable : operable;
    _this.levelValue = isInteger(option.level) ? option.level : level;
    _this.$config = option;

    try {
      if (isFunction(_this.create)) {
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

      if (isFunction(this.destroy)) {
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
        result = isFunction(this.inited) && this.inited();
      } catch (error) {
        this.$throwError(error);
      }

      var promiseResult = toxicPredicateFunctions.isPromise(result) && result;
      this.readySync = !promiseResult;
      this.ready = promiseResult ? promiseResult.then(function () {
        _this2.readySync = true;
        return _this2;
      }).catch(function (error) {
        if (isError(error)) {
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
        if (isFunction(this.init)) {
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
      if (!isInteger(val)) {
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
      if (!isBoolean(val)) {
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
      _class_1(this.$dom, 'chimee-plugin-picture-in-picture');
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
  if (!isString(name)) {
    throw new Error("Plugin's name must be a string, but not \"".concat(name, "\" in ").concat(_typeof(name)));
  }

  return camelize(name);
}

function checkPluginConfig(config) {
  if (isFunction(config)) {
    if (!(config.prototype instanceof ChimeePlugin)) {
      throw new TypeError("Your are trying to install plugin ".concat(config.name, ", but it's not extends from Chimee.plugin."));
    }

    return;
  }

  if (!isPlainObject(config) || isEmpty(config)) {
    throw new TypeError("plugin's config must be an Object, but not \"".concat(config, "\" in ").concat(_typeof(config)));
  }

  var name = config.name;

  if (!isString(name) || name.length < 1) {
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

    if (!isPlainObject(config)) {
      throw new TypeError("UserConfig must be an Object, but not \"".concat(config, "\" in ").concat(_typeof(config)));
    }

    this.dom = new Dom(config, this);
    this.vm = vm;
    this.videoConfigReady = false;
    this.videoConfig = new VideoConfig(this, config);

    if (isArray(config.plugins) && !isArray(config.plugin)) {
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
      return isPlainObject(plugin);
    }
  }, {
    key: "load",
    value: function load(srcOrOption) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var src = isString(srcOrOption) ? srcOrOption : isPlainObject(srcOrOption) && isString(srcOrOption.src) ? srcOrOption.src : '';

      if (!isString(srcOrOption)) {
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

      if (box !== 'native' || box !== oldBox || !isEmpty(option)) {
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
      regenerator.mark(function _callee() {
        var pipWindow;
        return regenerator.wrap(function _callee$(_context) {
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
                events_2(that.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                events_2(video, 'error', videoError, true);

                if (!newVideoReady) {
                  events_2(video, 'canplay', videoCanplay, true);
                  events_2(video, 'loadedmetadata', videoLoadedmetadata, true);
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
                events_2(that.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                events_2(video, 'error', videoError, true);
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
              events_2(video, 'canplay', videoCanplay, true);
              events_2(video, 'loadedmetadata', videoLoadedmetadata, true);
              events_2(that.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
              kernel.off('error', videoError);
              var error;

              if (evt && evt.errmsg) {
                var errmsg = evt.errmsg;
                chimeeHelperLog.chimeeLog.error('chimee\'s silentload bump into a kernel error', errmsg);
                error = new Error(errmsg);
              } else {
                error = !isEmpty(video.error) ? new Error(video.error.message) : new Error('unknow video error');
                chimeeHelperLog.chimeeLog.error('chimee\'s silentload', error.message);
              }

              kernel.destroy();
              that.silentLoadTempKernel = undefined;
              return index === repeatTimes ? reject(error) : resolve(error);
            }

            events_1(video, 'canplay', videoCanplay, true);
            events_1(video, 'loadedmetadata', videoLoadedmetadata.bind(_this2), true);
            events_1(video, 'error', videoError, true);
            kernel = _this2.createKernel(video, config);
            _this2.silentLoadTempKernel = kernel;
            kernel.on('error', videoError);
            events_1(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
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
        if (isError(result)) {
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
          events_1(video, 'play', function () {
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
      var originVideoConfig = clone(this.videoConfig);
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
      if (isString(option)) {
        option = {
          name: option,
          alias: undefined
        };
      }

      if (!isPlainObject(option) || isPlainObject(option) && !isString(option.name)) {
        throw new TypeError('pluginConfig do not match requirement');
      }

      if (!isString(option.alias)) {
        option.alias = undefined;
      }

      var _option2 = option,
          name = _option2.name,
          alias = _option2.alias;
      option.name = alias || name;
      delete option.alias;
      var key = camelize(name);
      var id = camelize(alias || name);
      var pluginOption = option;
      var pluginConfig = Dispatcher.getPluginConfig(key);

      if (!pluginConfig) {
        throw new TypeError('You have not installed plugin ' + key);
      }

      if (isPlainObject(pluginConfig)) {
        pluginConfig.id = id;
      }

      var plugin = isFunction(pluginConfig) ? new pluginConfig({
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

      if (process.env.NODE_ENV !== 'production' && isEmpty(kernels) && !isEmpty(preset)) {
        chimeeHelperLog.chimeeLog.warn('preset will be deprecated in next major version, please use kernels instead.');
      }

      var presetConfig = {};
      var newPreset = {};

      if (isArray(kernels)) {
        newPreset = kernels.reduce(function (kernels, keyOrSKC) {
          if (isString(keyOrSKC)) {
            if (!isSupportedKernelType(keyOrSKC)) {
              throw new Error("We have not support ".concat(keyOrSKC, " kernel type"));
            }

            var kernelFn = kernelsSet[keyOrSKC];

            if (!isFunction(kernelFn)) {
              chimeeHelperLog.chimeeLog.warn("You have not installed kernel for ".concat(keyOrSKC, "."));
              return kernels;
            }

            kernels[keyOrSKC] = kernelFn;
            return kernels;
          }

          if (isPlainObject(keyOrSKC)) {
            var name = keyOrSKC.name,
                handler = keyOrSKC.handler;

            if (isString(handler)) {
              if (!isSupportedKernelType(handler)) {
                throw new Error("We have not support ".concat(handler, " kernel type"));
              }

              var _kernelFn = kernelsSet[handler];

              if (!isFunction(_kernelFn)) {
                chimeeHelperLog.chimeeLog.warn("You have not installed kernel for ".concat(handler, "."));
                return kernels;
              }

              kernels[handler] = _kernelFn;
              presetConfig[handler] = keyOrSKC;
              return kernels;
            }

            if (isFunction(handler)) {
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

          if (isFunction(fnOrSKC)) {
            var fn = fnOrSKC;
            newPreset[key] = fn;
            return;
          }

          if (isPlainObject(fnOrSKC)) {
            var SKC = fnOrSKC;
            var handler = SKC.handler;

            if (isString(handler)) {
              if (!isSupportedKernelType(handler)) {
                throw new Error("We have not support ".concat(handler, " kernel type"));
              }

              var kernelFn = kernelsSet[handler];

              if (!isFunction(kernelFn)) {
                chimeeHelperLog.chimeeLog.warn("You have not installed kernel for ".concat(handler, "."));
                return;
              }

              newPreset[key] = kernelFn;
              presetConfig[key] = SKC;
              return;
            }

            if (isFunction(handler)) {
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
      return isEmpty(plugin) ? 0 : plugin.$level;
    }
  }, {
    key: "initUserPlugin",
    value: function initUserPlugin() {
      var _this4 = this;

      var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!isArray(configs)) {
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

        if (isEmpty(plugin)) {
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
      return isFunction(kernelsSet[key]);
    }
  }, {
    key: "install",
    value: function install(config) {
      var name = config.name;
      var id = camelize(name);

      if (pluginConfigSet[id]) {
        if (process.env.NODE_ENV !== 'production') {
          chimeeHelperLog.chimeeLog.warn('Dispatcher', 'You have installed ' + name + ' again. And the older one will be replaced');
        }
      }

      var pluginConfig = isFunction(config) ? config : Object.assign({}, config, {
        id: id
      });
      pluginConfigSet[id] = pluginConfig;
      return id;
    }
  }, {
    key: "installKernel",
    value: function installKernel(key, value) {
      var tasks = isPlainObject(key) ? Object.entries(key) : [[key, value]];
      tasks.forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        if (!isFunction(value)) {
          throw new Error("The kernel you install on ".concat(key, " must be a Function, but not ").concat(_typeof(value)));
        }

        if (isFunction(kernelsSet[key])) {
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
    _this.version = '2.0.0-alpha.1';
    var config;

    if (process.env.NODE_ENV !== 'production' && !isFunction(Object.defineProperty)) {
      chimeeHelperLog.chimeeLog.error('Chimee', 'We detect that this browser lack of Object.defineProperty. Chimee can\'t run on this browser');
    }

    if (process.env.NODE_ENV !== 'production' && typeof Promise === 'undefined') {
      chimeeHelperLog.chimeeLog.error('Chimee', 'We detect that this browser lack of Promise. If you are running Chimee in old browser. Please make sure you have import polyfill such as babel-polyfill.');
    }

    if (isString(rawConfig) || toxicPredicateFunctions.isElement(rawConfig)) {
      config = {
        controls: true,
        wrapper: rawConfig
      };
    } else if (isPlainObject(rawConfig)) {
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
      if (isString(error)) {
        error = new Error(error);
      }

      var errorHandler = this.config.errorHandler || Chimee.config.errorHandler;

      if (isFunction(errorHandler)) {
        return errorHandler(error);
      }

      if (Chimee.config.silent) {
        return;
      }

      if (isError(error)) {
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

      if (!name || !isString(name)) {
        throw new Error("The event name must be a string, but not ".concat(_typeof(name)));
      }

      if (!target || !isString(target)) {
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
