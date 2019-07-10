
/**
 * chimee-plugin-mobile-state v0.0.21
 * (c) 2017-2019 yandeqiang
 * Released under ISC
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chimee'), require('chimee-plugin-gesture')) :
	typeof define === 'function' && define.amd ? define(['chimee', 'chimee-plugin-gesture'], factory) :
	(global = global || self, global.ChimeePluginMobileState = factory(global.Chimee, global.ChimeePluginGesture));
}(this, function (chimee, Gesture) { 'use strict';

	Gesture = Gesture && Gesture.hasOwnProperty('default') ? Gesture['default'] : Gesture;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
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

	var inDOM = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = void 0;

	var _default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	exports.default = _default;
	module.exports = exports["default"];
	});

	unwrapExports(inDOM);

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

	var loadingStr = "<svg width='120px' height='120px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-1s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.9166666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.75s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.25s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.08333333333333333s' repeatCount='indefinite'/></rect></svg>";

	var playStr = "\n<svg width=\"92px\" height=\"92px\" viewBox=\"0 0 92 92\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <circle id=\"Oval\" fill-opacity=\"0.5\" fill=\"#000000\" cx=\"46\" cy=\"46\" r=\"46\"></circle>\n        <polygon id=\"Triangle\" fill=\"#FFFFFF\" transform=\"translate(51.000000, 46.500000) rotate(90.000000) translate(-51.000000, -46.500000) \" points=\"51 26 76 67 26 67\"></polygon>\n    </g>\n</svg>";

	var __extends = undefined && undefined.__extends || function () {
	  var _extendStatics = function extendStatics(d, b) {
	    _extendStatics = Object.setPrototypeOf || {
	      __proto__: []
	    } instanceof Array && function (d, b) {
	      d.__proto__ = b;
	    } || function (d, b) {
	      for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	      }
	    };

	    return _extendStatics(d, b);
	  };

	  return function (d, b) {
	    _extendStatics(d, b);

	    function __() {
	      this.constructor = d;
	    }

	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	  };
	}();
	var template = "\n<chimee-state class=\"play\">\n  <chimee-state-loading></chimee-state-loading>\n  <chimee-state-play></chimee-state-play>\n  <chimee-state-error></chimee-state-error>\n</chimee-state>\n";

	var MobileState = function (_super) {
	  __extends(MobileState, _super);

	  function MobileState(config, dispatcher, option) {
	    var _this = _super.call(this, Object.assign(config, {
	      dependencies: option.customGesture ? [] : [Gesture.name],
	      el: template,
	      operable: false,
	      penetrate: true
	    }), dispatcher, option) || this;

	    var _a = option.expectTime,
	        expectTime = _a === void 0 ? 3e4 : _a,
	        _b = option.errorTips,
	        errorTips = _b === void 0 ? '加载失败，请刷新重试' : _b,
	        _c = option.icon,
	        icon = _c === void 0 ? {} : _c;
	    _this.errorTips = errorTips;
	    _this.expectTime = expectTime;
	    _this.icon = Object.assign({
	      loading: loadingStr,
	      play: playStr
	    }, icon);
	    _this.currentState = '';
	    _this.isShown = false;
	    return _this;
	  }

	  MobileState.prototype.create = function () {
	    this.on('load', this.onLoad);
	    this.on('panend', this.onPanend);
	    this.on('panmove', this.onPanmove);
	    this.on('panstart', this.onPanstart);
	    this.on('pause', this.onPause);
	    this.on('play', this.onPlay);
	    this.on('playing', this.onPlaying);
	    this.on('seeked', this.onSeeked);
	    this.on('seeking', this.onSeeking);
	    this.on('tap', this.onTap);
	    this.on('timeupdate', this.onTimeupdate);
	    this.on('waiting', this.onWaiting);
	  };

	  MobileState.prototype.inited = function () {
	    this.addInnerHtml();

	    if (this.src && (this.preload === 'auto' || this.preload === 'metadata' || this.preload === '' || this.autoplay === true)) {
	      this.showState('loading', true);
	    }
	  };

	  MobileState.prototype.addInnerHtml = function () {
	    var _this = this;

	    ['play', 'loading', 'error'].forEach(function (key) {
	      var containers = query_10(_this.$dom, "chimee-state-" + key);

	      if (containers.length && containers[0]) {
	        containers[0].innerHTML = key === 'error' ? _this.errorTips : _this.icon[key];
	      }
	    });
	  };

	  MobileState.prototype.clearTimeout = function () {
	    if (this.timeout) {
	      clearTimeout(this.timeout);
	      this.timeout = null;
	    }
	  };

	  MobileState.prototype.onLoad = function () {
	    this.showState('play', true);
	  };

	  MobileState.prototype.onPanend = function (evt) {
	    this.emitSync('state-panend', evt);
	  };

	  MobileState.prototype.onPanmove = function (evt) {
	    this.emitSync('state-panmove', evt);
	  };

	  MobileState.prototype.onPanstart = function (evt) {
	    this.emitSync('state-panstart', evt);
	  };

	  MobileState.prototype.onPause = function () {
	    this.showState('play', true);
	  };

	  MobileState.prototype.onPlay = function () {
	    this.showState('', false);
	  };

	  MobileState.prototype.onPlaying = function () {
	    this.playing();
	  };

	  MobileState.prototype.onSeeked = function () {
	    this.playing();
	  };

	  MobileState.prototype.onSeeking = function () {
	    this.waiting();
	  };

	  MobileState.prototype.onTap = function (evt) {
	    this.emitSync('state-tap', evt);
	  };

	  MobileState.prototype.onTimeupdate = function () {
	    this.clearTimeout();
	  };

	  MobileState.prototype.onWaiting = function () {
	    this.waiting();
	  };

	  MobileState.prototype.playing = function () {
	    this.clearTimeout();
	    this.showState('', false);
	  };

	  MobileState.prototype.showState = function (state, show) {
	    var _this = this;

	    this.currentState = state;
	    this.isShown = show;

	    if (show) {
	      this.emitSync('state-change', state);
	    }

	    ['loading', 'error', 'play'].forEach(function (key) {
	      if (key === state && show) {
	        _class_1(_this.$dom, key);
	      } else {
	        _class_2(_this.$dom, key);
	      }
	    });
	  };

	  MobileState.prototype.waiting = function () {
	    var _this = this;

	    this.clearTimeout();
	    this.timeout = setTimeout(function () {
	      return _this.showState('error', true);
	    }, this.expectTime);

	    if (!this.paused) {
	      this.showState('loading', true);
	    }
	  };

	  return MobileState;
	}(chimee.Plugin);

	return MobileState;

}));
