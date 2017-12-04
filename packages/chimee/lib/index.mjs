
/**
 * chimee v0.6.2
 * (c) 2017 toxic-johann
 * Released under MIT
 */

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$getOwnPropertyDescriptor from 'babel-runtime/core-js/object/get-own-property-descriptor';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Object$entries from 'babel-runtime/core-js/object/entries';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Promise from 'babel-runtime/core-js/promise';
import _typeof from 'babel-runtime/helpers/typeof';
import { $, Log, addClassName, addEvent, bind, camelize, deepAssign, deepClone, getAttr, getDeepProperty, getStyle, hypenate, isArray, isBoolean, isElement, isEmpty, isError, isEvent, isFunction, isHTMLString, isInteger, isNumber, isNumeric, isObject, isPosterityNode, isPromise, isString, isVoid, removeEvent, runRejectableQueue, runStoppableQueue, setAttr, setStyle, transObjectAttrIntoArray } from 'chimee-helper';
import Kernel from 'chimee-kernel';
import _Map from 'babel-runtime/core-js/map';
import { accessor, alias, alwaysBoolean, alwaysNumber, alwaysString, applyDecorators, autobind, autobindClass, before, configurable, frozen, initBoolean, initString, nonenumerable, runnable, waituntil, watch } from 'toxic-decorators';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Number$isNaN from 'babel-runtime/core-js/number/is-nan';
import esFullscreen from 'es-fullscreen';

var videoEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended', 'error', 'interruptbegin', 'interruptend', 'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
var videoReadOnlyProperties = ['buffered', 'currentSrc', 'duration', 'error', 'ended', 'networkState', 'paused', 'readyState', 'seekable', 'sinkId', 'controlsList', 'tabIndex', 'dataset', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth'];
var domEvents = ['beforeinput', 'blur', 'click', 'compositionend', 'compositionstart', 'compositionupdate', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll', 'select', 'wheel', 'mousewheel', 'fullscreenchange', 'contextmenu', 'touchstart', 'touchmove', 'touchend'];
var passiveEvents = ['wheel', 'mousewheel', 'touchstart', 'touchmove'];
var selfProcessorEvents = ['silentLoad', 'fullscreen'];
var kernelMethods = ['play', 'pause', 'seek'];
var dispatcherMethods = ['load'];
var kernelEvents = ['mediaInfo', 'heartbeat', 'error'];
var domMethods = ['focus', 'fullscreen', 'requestFullscreen', 'exitFullscreen'];
var videoMethods = ['canPlayType', 'captureStream', 'setSinkId'];

var _dec$2;
var _dec2$1;
var _dec3$1;
var _dec4$1;
var _class$2;

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

var secondaryReg = /^(before|after|_)/;
function secondaryChecker(key) {
  if (key.match(secondaryReg)) {
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production') Log.warn('bus', 'Secondary Event "' + key + '" could not be call straightly by API.');
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
var Bus = (_dec$2 = runnable(secondaryChecker), _dec2$1 = runnable(secondaryChecker, {
  backup: function backup() {
    return false;
  }
}), _dec3$1 = runnable(secondaryChecker), _dec4$1 = runnable(secondaryChecker, {
  backup: function backup() {
    return false;
  }
}), _class$2 = function () {
  /**
   * @param {Dispatcheer} dispatcher bus rely on dispatcher, so you mush pass dispatcher at first when you generate Bus.
   * @return {Bus}
   */

  /**
   * the handler set of all events
   * @type {Object}
   * @member events
   */
  function Bus(dispatcher) {
    _classCallCheck(this, Bus);

    this.events = {};
    this.onceMap = {};

    /**
     * the referrence to dispatcher
     * @type {Dispatcher}
     */
    this.__dispatcher = dispatcher;
  }
  /**
   * [Can only be called in dispatcher]bind event on bus.
   * @param  {string} id plugin's id
   * @param  {string} key event's name
   * @param  {fn} handler function
   */


  _createClass(Bus, [{
    key: 'on',
    value: function on(id, key, fn) {
      var _getEventStage2 = this._getEventStage(key),
          stage = _getEventStage2.stage,
          eventName = _getEventStage2.key;

      this._addEvent([eventName, stage, id], fn);
    }
    /**
     * [Can only be called in dispatcher]remove event off bus. Only suggest one by one.
     * @param  {string} id plugin's id
     * @param  {string} key event's name
     * @param  {fn} handler function
     */

  }, {
    key: 'off',
    value: function off(id, key, fn) {
      var _getEventStage3 = this._getEventStage(key),
          stage = _getEventStage3.stage,
          eventName = _getEventStage3.key;

      var keys = [eventName, stage, id];
      var deleted = this._removeEvent(keys, fn);
      if (deleted) return;
      var handler = this._getHandlerFromOnceMap(keys, fn);
      if (isFunction(handler)) {
        this._removeEvent(keys, handler) && this._removeFromOnceMap(keys, fn, handler);
      }
    }
    /**
     * [Can only be called in dispatcher]bind event on bus and remove it once event is triggered.
     * @param  {string} id plugin's id
     * @param  {string} key event's name
     * @param  {Function} fn handler function
     */

  }, {
    key: 'once',
    value: function once(id, key, fn) {
      var _getEventStage4 = this._getEventStage(key),
          stage = _getEventStage4.stage,
          eventName = _getEventStage4.key;

      var bus = this;
      var keys = [eventName, stage, id];
      var handler = function handler() {
        // keep the this so that it can run
        bind(fn, this).apply(undefined, arguments);
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
        if (isError(error)) _this.__dispatcher.throwError(error);
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
        if (isError(error)) _this2.__dispatcher.throwError(error);
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
      keys = deepClone(keys);
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
      keys = deepClone(keys);
      var id = keys.pop();
      var target = this.events;
      for (var i = 0, len = keys.length; i < len; i++) {
        var son = target[keys[i]];
        // if we can't find the event binder, just return
        if (isEmpty(son)) return;
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
      }
      return hasFn;
    }
  }, {
    key: '_addToOnceMap',
    value: function _addToOnceMap(keys, fn, handler) {
      var key = keys.join('-');
      var map = this.onceMap[key] = this.onceMap[key] || new _Map();
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
      if (isVoid(map) || !map.has(fn)) return;
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
      var stage = secondaryCheck && secondaryCheck[0] || 'main';
      if (secondaryCheck) {
        key = camelize(key.replace(secondaryReg, ''));
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

      order = isArray(order) ? order.concat(['_vm']) : ['_vm'];
      return isEmpty(handlerSet) ? [] : order.reduce(function (queue, id) {
        if (isEmpty(handlerSet[id]) || !isArray(handlerSet[id]) ||
        // in case plugins is missed
        // _vm indicate the user. This is the function for user
        !_this3.__dispatcher.plugins[id] && id !== '_vm') {
          return queue;
        }
        return queue.concat(handlerSet[id].map(function (fn) {
          // bind context for plugin instance
          return bind(fn, _this3.__dispatcher.plugins[id] || _this3.__dispatcher.vm);
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
}(), _applyDecoratedDescriptor$2(_class$2.prototype, 'emit', [_dec$2], _Object$getOwnPropertyDescriptor(_class$2.prototype, 'emit'), _class$2.prototype), _applyDecoratedDescriptor$2(_class$2.prototype, 'emitSync', [_dec2$1], _Object$getOwnPropertyDescriptor(_class$2.prototype, 'emitSync'), _class$2.prototype), _applyDecoratedDescriptor$2(_class$2.prototype, 'trigger', [_dec3$1], _Object$getOwnPropertyDescriptor(_class$2.prototype, 'trigger'), _class$2.prototype), _applyDecoratedDescriptor$2(_class$2.prototype, 'triggerSync', [_dec4$1], _Object$getOwnPropertyDescriptor(_class$2.prototype, 'triggerSync'), _class$2.prototype), _class$2);

/**
 * checker for on, off, once function
 * @param {string} key
 * @param {Function} fn
 */
function eventBinderCheck(key, fn) {
  if (!isString(key)) throw new TypeError('key parameter must be String');
  if (!isFunction(fn)) throw new TypeError('fn parameter must be Function');
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

var _dec$5;
var _dec2$3;
var _class$5;
var _descriptor$1;
var _descriptor2$1;
var _descriptor3$1;
var _descriptor4;
var _descriptor5;
var _descriptor6;
var _descriptor7;

function _initDefineProp$1(target, property, descriptor, context) {
  if (!descriptor) return;

  _Object$defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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
  var _ref = isObject(attribute) ? attribute : {
    set: attribute,
    get: attribute,
    isBoolean: false
  },
      _set = _ref.set,
      _get$$1 = _ref.get,
      isBoolean$$1 = _ref.isBoolean;

  return accessor({
    get: function get(value) {
      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement[_get$$1] : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      var val = isBoolean$$1 ? value ? '' : undefined : value === null ? undefined : value;
      this.dom.setAttr('video', _set, val);
      return value;
    }
  });
}

function accessorCustomAttribute(attribute, isBoolean$$1) {
  return accessor({
    get: function get(value) {
      var attrValue = this.dom.getAttr('video', attribute);
      return this.dispatcher.videoConfigReady && this.inited ? isBoolean$$1 ? !!attrValue : attrValue : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      var val = isBoolean$$1 ? value || undefined : value === null ? undefined : value;
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
      if (isNumeric(attr) && isNumber(prop)) return prop;
      return attr || undefined;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      var val = void 0;
      if (value === undefined || isNumber(value)) {
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
  src: [alwaysString(), accessor({
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
        this.dispatcher.bus.emit('load', val);
      }
      return val;
    }
  }, { preSet: false })],
  autoload: alwaysBoolean(),
  autoplay: [alwaysBoolean(), accessorVideoProperty('autoplay')],
  controls: [alwaysBoolean(), accessorVideoProperty('controls')],
  width: [accessorWidthAndHeight('width')],
  height: [accessorWidthAndHeight('height')],
  crossOrigin: [accessor({ set: stringOrVoid }), accessorVideoAttribute({ set: 'crossorigin', get: 'crossOrigin' })],
  loop: [alwaysBoolean(), accessorVideoProperty('loop')],
  defaultMuted: [alwaysBoolean(), accessorVideoAttribute({ get: 'defaultMuted', set: 'muted', isBoolean: true })],
  muted: [alwaysBoolean(), accessorVideoProperty('muted')],
  preload: [accessor({ set: stringOrVoid }), accessorVideoAttribute('preload')],
  poster: [
  // 因为如果在 video 上随便加一个字符串，他会将其拼接到地址上，所以这里要避免
  // 单元测试无法检测
  alwaysString(), accessor({
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
      this.dom.setAttr('video', 'x5-video-player-type', value ? 'h5' : undefined);
      return value;
    }
  }), alwaysBoolean()],
  x5VideoPlayerFullscreen: [accessor({
    set: function set(value) {
      return !!value;
    },
    get: function get(value) {
      return !!value;
    }
  }), accessorCustomAttribute('x5-video-player-fullscreen', true)],
  x5VideoOrientation: [accessor({ set: stringOrVoid }), accessorCustomAttribute('x5-video-orientation')],
  xWebkitAirplay: [accessor({
    set: function set(value) {
      return !!value;
    },
    get: function get(value) {
      return !!value;
    }
  }), accessorCustomAttribute('x-webkit-airplay', true)],
  playbackRate: [alwaysNumber(1), accessorVideoProperty('playbackRate')],
  defaultPlaybackRate: [accessorVideoProperty('defaultPlaybackRate'), alwaysNumber(1)],
  disableRemotePlayback: [alwaysBoolean(), accessorVideoProperty('disableRemotePlayback')],
  volume: [alwaysNumber(1), accessorVideoProperty('volume')]
};

var VideoConfig = (_dec$5 = initBoolean(), _dec2$3 = initString(function (str) {
  return str.toLocaleLowerCase();
}), _class$5 = function () {

  // 会逐渐被遗弃
  function VideoConfig(dispatcher, config) {
    _classCallCheck(this, VideoConfig);

    _initDefineProp$1(this, 'needToLoadSrc', _descriptor$1, this);

    _initDefineProp$1(this, 'changeWatchable', _descriptor2$1, this);

    _initDefineProp$1(this, 'inited', _descriptor3$1, this);

    this.src = '';

    _initDefineProp$1(this, 'isLive', _descriptor4, this);

    _initDefineProp$1(this, 'box', _descriptor5, this);

    this.preset = {};
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
    this.xWebkitAirplay = false;
    this.playbackRate = 1;
    this.defaultPlaybackRate = 1;
    this.disableRemotePlayback = false;
    this.volume = 1;

    _initDefineProp$1(this, '_kernelProperty', _descriptor6, this);

    _initDefineProp$1(this, '_realDomAttr', _descriptor7, this);

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
    deepAssign(this, config);
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
}(), _descriptor$1 = _applyDecoratedDescriptor$4(_class$5.prototype, 'needToLoadSrc', [nonenumerable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$1 = _applyDecoratedDescriptor$4(_class$5.prototype, 'changeWatchable', [nonenumerable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3$1 = _applyDecoratedDescriptor$4(_class$5.prototype, 'inited', [nonenumerable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor$4(_class$5.prototype, 'isLive', [_dec$5, configurable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor$4(_class$5.prototype, 'box', [_dec2$3, configurable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor6 = _applyDecoratedDescriptor$4(_class$5.prototype, '_kernelProperty', [frozen], {
  enumerable: true,
  initializer: function initializer() {
    return ['isLive', 'box', 'preset', 'kernels'];
  }
}), _descriptor7 = _applyDecoratedDescriptor$4(_class$5.prototype, '_realDomAttr', [frozen], {
  enumerable: true,
  initializer: function initializer() {
    return ['src', 'controls', 'width', 'height', 'crossOrigin', 'loop', 'muted', 'preload', 'poster', 'autoplay', 'playsInline', 'x5VideoPlayerFullscreen', 'x5VideoOrientation', 'xWebkitAirplay', 'playbackRate', 'defaultPlaybackRate', 'autoload', 'disableRemotePlayback', 'defaultMuted', 'volume'];
  }
}), _class$5);

var _dec$4;
var _dec2$2;
var _dec3$2;
var _dec4$2;
var _dec5$1;
var _dec6;
var _dec7;
var _dec8;
var _dec9;
var _dec10;
var _dec11;
var _dec12;
var _dec13;
var _dec14;
var _dec15;
var _dec16;
var _dec17;
var _dec18;
var _dec19;
var _class$4;
var _class2$1;

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

function propertyAccessibilityWarn(property) {
  /* istanbul ignore else  */
  if (process.env.NODE_ENV !== 'production') Log.warn('chimee', 'You are trying to obtain ' + property + ', we will return you the DOM node. It\'s not a good idea to handle this by yourself. If you have some requirement, you can tell use by https://github.com/Chimeejs/chimee/issues');
}
var VideoWrapper = (_dec$4 = autobindClass(), _dec2$2 = alias('silentLoad'), _dec3$2 = alias('fullScreen'), _dec4$2 = alias('$fullScreen'), _dec5$1 = alias('fullscreen'), _dec6 = alias('emit'), _dec7 = alias('emitSync'), _dec8 = alias('on'), _dec9 = alias('addEventListener'), _dec10 = before(eventBinderCheck), _dec11 = alias('off'), _dec12 = alias('removeEventListener'), _dec13 = before(eventBinderCheck), _dec14 = alias('once'), _dec15 = before(eventBinderCheck), _dec16 = alias('css'), _dec17 = before(attrAndStyleCheck), _dec18 = alias('attr'), _dec19 = before(attrAndStyleCheck), _dec$4(_class$4 = (_class2$1 = function () {
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
            return bind(video[key], video);
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
              var _dispatcher$bus;

              _this2.__dispatcher.bus.once(_this2.__id, '_' + key, resolve);
              (_dispatcher$bus = _this2.__dispatcher.bus)[/^(seek)$/.test(key) ? 'emitSync' : 'emit'].apply(_dispatcher$bus, [key].concat(_toConsumableArray(args)));
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

      if (!isString(key) && !isArray(key)) throw new TypeError('$watch only accept string and Array<string> as key to find the target to spy on, but not ' + key + ', whose type is ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
      var watching = true;
      var watcher = function watcher() {
        if (watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) bind(handler, this).apply(undefined, arguments);
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
      applyDecorators(target, _defineProperty({}, property, watch(watcher, { deep: deep, diff: diff, proxy: proxy })), { self: true });
      this.__unwatchHandlers.push(unwatcher);
      return unwatcher;
    }
  }, {
    key: '$set',
    value: function $set(obj, property, value) {
      if (!isObject(obj) && !isArray(obj)) throw new TypeError('$set only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
      // $FlowFixMe: we have custom this function
      if (!isFunction(obj.__set)) {
        /* istanbul ignore else  */
        if (process.env.NODE_ENV !== 'production') Log.warn('chimee', _JSON$stringify(obj) + ' has not been deep watch. There is no need to use $set.');
        // $FlowFixMe: we support computed string on array here
        obj[property] = value;
        return;
      }
      obj.__set(property, value);
    }
  }, {
    key: '$del',
    value: function $del(obj, property) {
      if (!isObject(obj) && !isArray(obj)) throw new TypeError('$del only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
      // $FlowFixMe: we have custom this function
      if (!isFunction(obj.__del)) {
        /* istanbul ignore else  */
        if (process.env.NODE_ENV !== 'production') Log.warn('chimee', _JSON$stringify(obj) + ' has not been deep watch. There is no need to use $del.');
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
        var _dispatcher$bus2;

        _this4.__dispatcher.bus.once(_this4.__id, '_load', resolve);
        (_dispatcher$bus2 = _this4.__dispatcher.bus).emit.apply(_dispatcher$bus2, ['load'].concat(args));
      });
    }
  }, {
    key: '$silentLoad',
    value: function $silentLoad() {
      var _this5 = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.__dispatcher.bus.emit('silentLoad').then(function () {
        var _dispatcher;

        return (_dispatcher = _this5.__dispatcher).silentLoad.apply(_dispatcher, args);
      }).then(function (result) {
        _this5.__dispatcher.bus.trigger('silentLoad', result);
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

      if (!this.__dispatcher.bus.emitSync('fullscreen', flag, element)) return false;
      var result = this.__dispatcher.dom.fullscreen(flag, element);
      this.__dispatcher.bus.triggerSync('fullscreen', flag, element);
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
      var _dispatcher$bus3;

      if (!isString(key)) throw new TypeError('emit key parameter must be String');
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production' && domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
        Log.warn('plugin', 'You are try to emit ' + key + ' event. As emit is wrapped in Promise. It make you can\'t use event.preventDefault and event.stopPropagation. So we advice you to use emitSync');
      }

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      (_dispatcher$bus3 = this.__dispatcher.bus).emit.apply(_dispatcher$bus3, [key].concat(_toConsumableArray(args)));
    }

    /**
     * emit a sync event
     * @param  {string}    key event's name
     * @param  {...args} args
     */

  }, {
    key: '$emitSync',
    value: function $emitSync(key) {
      var _dispatcher$bus4;

      if (!isString(key)) throw new TypeError('emitSync key parameter must be String');

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return (_dispatcher$bus4 = this.__dispatcher.bus).emitSync.apply(_dispatcher$bus4, [key].concat(_toConsumableArray(args)));
    }

    /**
     * bind event handler through this function
     * @param  {string} key event's name
     * @param  {Function} fn event's handler
     */

  }, {
    key: '$on',
    value: function $on(key, fn) {
      this.__dispatcher.bus.on(this.__id, key, fn);
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
      this.__dispatcher.bus.off(this.__id, key, fn);
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
      var self = this;
      var boundFn = function boundFn() {
        bind(fn, this).apply(undefined, arguments);
        self.__removeEvents(key, boundFn);
      };
      self.__addEvents(key, boundFn);
      this.__dispatcher.bus.once(this.__id, key, boundFn);
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
          if (process.env.NODE_ENV !== 'production') Log.warn('chimee', this.__id + ' is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger');
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
        if (!isArray(_this6.__events[key])) return;
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
      this.__dispatcher.bus.emitSync('seek', second);
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
      propertyAccessibilityWarn('wrapper');
      return this.__dispatcher.dom.wrapper;
    }
  }, {
    key: '$container',
    get: function get() {
      propertyAccessibilityWarn('container');
      return this.__dispatcher.dom.container;
    }
  }, {
    key: '$video',
    get: function get() {
      propertyAccessibilityWarn('video');
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
      if (!isObject(config)) {
        throw new Error('The config of container must be Object, but not ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + '.');
      }
      deepAssign(this.__dispatcher.containerConfig, config);
      return this.__dispatcher.container;
    }
  }]);

  return VideoWrapper;
}(), _applyDecoratedDescriptor$3(_class2$1.prototype, '$silentLoad', [_dec2$2], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$silentLoad'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$fullscreen', [_dec3$2, _dec4$2, _dec5$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$fullscreen'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$emit', [_dec6], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$emit'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$emitSync', [_dec7], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$emitSync'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$on', [_dec8, _dec9, _dec10], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$on'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$off', [_dec11, _dec12, _dec13], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$off'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$once', [_dec14, _dec15], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$once'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$css', [_dec16, _dec17], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$css'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$attr', [_dec18, _dec19], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$attr'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$plugins', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$plugins'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$pluginOrder', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$pluginOrder'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$wrapper', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$wrapper'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$container', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$container'), _class2$1.prototype), _applyDecoratedDescriptor$3(_class2$1.prototype, '$video', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$video'), _class2$1.prototype), _class2$1)) || _class$4);

var _dec$3;
var _class$3;

/**
 * <pre>
 * Plugin is the class for plugin developer.
 * When we use a plugin, we will generate an instance of plugin.
 * Developer can do most of things base on this plugin
 * </pre>
 */
var Plugin = (_dec$3 = autobindClass(), _dec$3(_class$3 = function (_VideoWrapper) {
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
    _this.VERSION = '0.6.2';
    _this.__operable = true;
    _this.__level = 0;

    if (isEmpty(dispatcher)) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') Log.error('Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?');
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
      isFunction(_this.beforeCreate) && _this.beforeCreate({
        events: events,
        data: data,
        computed: computed,
        methods: methods
      }, option);
    } catch (error) {
      _this.$throwError(error);
    }
    // bind plugin methods into instance
    if (!isEmpty(methods) && isObject(methods)) {
      _Object$keys(methods).forEach(function (key) {
        var fn = methods[key];
        if (!isFunction(fn)) throw new TypeError('plugins methods must be Function');
        _Object$defineProperty(_this, key, {
          value: bind(fn, _this),
          writable: true,
          enumerable: false,
          configurable: true
        });
      });
    }
    // hook plugin events on bus
    if (!isEmpty(events) && isObject(events)) {
      _Object$keys(events).forEach(function (key) {
        if (!isFunction(events[key])) throw new TypeError('plugins events hook must bind with Function');
        _this.$on(key, events[key]);
      });
    }
    // bind data into plugin instance
    if (!isEmpty(data) && isObject(data)) {
      deepAssign(_this, data);
    }
    // set the computed member by getter and setter
    if (!isEmpty(computed) && isObject(computed)) {
      var props = _Object$keys(computed).reduce(function (props, key) {
        var val = computed[key];
        if (isFunction(val)) {
          props[key] = accessor({ get: val });
          return props;
        }
        if (isObject(val) && (isFunction(val.get) || isFunction(val.set))) {
          props[key] = accessor(val);
          return props;
        }
        /* istanbul ignore else  */
        if (process.env.NODE_ENV !== 'production') Log.warn('Dispatcher.plugin', 'Wrong computed member \'' + key + '\' defination in Plugin ' + name);
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
    _this.$dom = _this.__dispatcher.dom.insertPlugin(_this.__id, el, { penetrate: penetrate, inner: inner, autoFocus: autoFocus, className: className });
    // now we can frozen inner, autoFocus and penetrate
    _this.$inner = inner;
    _this.$autoFocus = autoFocus;
    _this.$penetrate = penetrate;
    applyDecorators(_this, {
      $inner: frozen,
      $autoFocus: frozen,
      $penetrate: frozen
    }, { self: true });
    /**
     * to tell us if the plugin can be operable, can be dynamic change
     * @type {boolean}
     */
    _this.$operable = isBoolean(option.operable) ? option.operable : operable;
    _this.__level = isInteger(option.level) ? option.level : level;
    /**
     * pluginOption, so it's easy for plugin developer to check the config
     * @type {Object}
     */
    _this.$config = option;
    try {
      isFunction(_this.create) && _this.create();
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
        isFunction(this.init) && this.init(videoConfig);
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

      var result = void 0;
      try {
        result = isFunction(this.inited) && this.inited();
      } catch (error) {
        this.$throwError(error);
      }
      this.readySync = !isPromise(result);
      this.ready = this.readySync ? _Promise.resolve()
      // $FlowFixMe: it's promise now
      : result.then(function (ret) {
        _this2.readySync = true;
        return ret;
      }).catch(function (error) {
        if (isError(error)) return _this2.$throwError(error);
        return _Promise.reject(error);
      });
      return this.readySync || this.ready;
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
      isFunction(this.destroy) && this.destroy();
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
      if (!isBoolean(val)) return;
      this.$dom.style.pointerEvents = val ? 'auto' : 'none';
      this.__operable = val;
    },
    get: function get() {
      return this.__operable;
    }
    /**
     * the z-index level, higher when you set higher
     * @type {boolean}
     */

  }, {
    key: '$level',
    set: function set(val) {
      if (!isInteger(val)) return;
      this.__level = val;
      this.__dispatcher._sortZIndex();
    },
    get: function get() {
      return this.__level;
    }
  }]);

  return Plugin;
}(VideoWrapper)) || _class$3);

var _dec$6;
var _dec2$4;
var _dec3$3;
var _dec4$3;
var _dec5$2;
var _dec6$1;
var _class$6;

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

function targetCheck(target) {
  if (target === 'video') target = 'videoElement';
  if (!isElement(this[target])) throw new TypeError('Your target "' + target + '" is not a legal HTMLElement');

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
var Dom = (_dec$6 = waituntil('__dispatcher.videoConfigReady'), _dec2$4 = before(attrOperationCheck, targetCheck), _dec3$3 = before(attrOperationCheck, targetCheck), _dec4$3 = before(attrOperationCheck, targetCheck), _dec5$2 = before(attrOperationCheck, targetCheck), _dec6$1 = before(targetCheck), _class$6 = function () {
  /**
   * to mark is the mouse in the video area
   */

  /**
   * Array to store all video dom event handler
   */

  /**
   * Array to store all video dom event handler
   */

  /**
   * the html to restore when we are destroyed
   */
  function Dom(wrapper, dispatcher) {
    var _this = this;

    _classCallCheck(this, Dom);

    this.plugins = {};
    this.originHTML = '';
    this.videoEventHandlerList = [];
    this.videoDomEventHandlerList = [];
    this.containerDomEventHandlerList = [];
    this.wrapperDomEventHandlerList = [];
    this.__domEventHandlerList = {};
    this.__mouseInVideo = false;
    this.__videoExtendedNodes = [];
    this.isFullscreen = false;
    this.fullscreenElement = undefined;

    this.__dispatcher = dispatcher;
    if (!isElement(wrapper) && !isString(wrapper)) throw new TypeError('Wrapper can only be string or HTMLElement, but not ' + (typeof wrapper === 'undefined' ? 'undefined' : _typeof(wrapper)));
    var $wrapper = $(wrapper);
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
    this._addDomEvents(this.container, this.containerDomEventHandlerList, function (key) {
      return function () {
        var _dispatcher$bus;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return (_dispatcher$bus = _this.__dispatcher.bus).triggerSync.apply(_dispatcher$bus, ['c_' + key].concat(_toConsumableArray(args)));
      };
    });
    this._addDomEvents(this.wrapper, this.wrapperDomEventHandlerList, function (key) {
      return function () {
        var _dispatcher$bus2;

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return (_dispatcher$bus2 = _this.__dispatcher.bus).triggerSync.apply(_dispatcher$bus2, ['w_' + key].concat(_toConsumableArray(args)));
      };
    });
    this._fullscreenMonitor();
    esFullscreen.on('fullscreenchange', this._fullscreenMonitor);
  }
  /**
   * collection of video extension nodes
   * some nodes can be regarded as part of video (such as penetrate element)
   * so we store them here
   */

  /**
   * Object to store different plugin's dom event handlers
   */

  /**
   * Array to store all container dom event handler
   */

  /**
   * Array to store all video event handler
   */

  /**
   * all plugin's dom element set
   */


  _createClass(Dom, [{
    key: 'installVideo',
    value: function installVideo(videoElement) {
      var _this2 = this;

      this.__videoExtendedNodes.push(videoElement);
      setAttr(videoElement, 'tabindex', -1);
      this._autoFocusToVideo(videoElement);
      if (!isElement(this.container)) {
        // create container
        if (videoElement.parentElement && isElement(videoElement.parentElement) && videoElement.parentElement !== this.wrapper) {
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
      videoEvents.forEach(function (key) {
        var fn = function fn() {
          var _dispatcher$bus3;

          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return (_dispatcher$bus3 = _this2.__dispatcher.bus).trigger.apply(_dispatcher$bus3, [key].concat(_toConsumableArray(args)));
        };
        _this2.videoEventHandlerList.push(fn);
        addEvent(videoElement, key, fn);
      });
      this._addDomEvents(videoElement, this.videoDomEventHandlerList, function (key) {
        return _this2._getEventHandler(key, { penetrate: true });
      });
      this.videoElement = videoElement;
      return videoElement;
    }
  }, {
    key: 'removeVideo',
    value: function removeVideo() {
      var _this3 = this;

      var videoElement = this.videoElement;
      this._autoFocusToVideo(this.videoElement, false);
      videoEvents.forEach(function (key, index) {
        removeEvent(_this3.videoElement, key, _this3.videoEventHandlerList[index]);
      });
      this.videoEventHandlerList = [];
      domEvents.forEach(function (key, index) {
        removeEvent(_this3.videoElement, key, _this3.videoDomEventHandlerList[index]);
      });
      this.videoDomEventHandlerList = [];
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
      var _this4 = this;

      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!isString(id)) throw new TypeError('insertPlugin id parameter must be string');
      if (isElement(this.plugins[id])) {
        /* istanbul ignore else  */
        if (process.env.NODE_ENV !== 'production') Log.warn('Dispatcher.dom', 'Plugin ' + id + ' have already had a dom node. Now it will be replaced');
        this.removePlugin(id);
      }
      if (isString(el)) {
        if (isHTMLString(el)) {
          var outer = document.createElement('div');
          outer.innerHTML = el;
          el = outer.children[0];
        } else {
          el = document.createElement(hypenate(el));
        }
      } else if (isObject(el)) {
        // $FlowFixMe: we have check el's type here and make sure it's an object
        option = el;
      }
      var _option = option,
          inner = _option.inner,
          penetrate = _option.penetrate,
          autoFocus = _option.autoFocus;
      var _option2 = option,
          className = _option2.className;

      var node = el && isElement(el) ? el : document.createElement('div');
      if (isArray(className)) {
        className = className.join(' ');
      }
      if (isString(className)) {
        addClassName(node, className);
      }
      this.plugins[id] = node;
      var outerElement = inner ? this.container : this.wrapper;
      var originElement = inner ? this.videoElement : this.container;
      if (isBoolean(autoFocus) ? autoFocus : inner) this._autoFocusToVideo(node);
      // auto forward the event if this plugin can be penetrate
      if (penetrate) {
        this.__domEventHandlerList[id] = this.__domEventHandlerList[id] || [];
        this._addDomEvents(node, this.__domEventHandlerList[id], function (key) {
          return _this4._getEventHandler(key, { penetrate: penetrate });
        });
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
      var _this5 = this;

      if (!isString(id)) return;
      var dom = this.plugins[id];
      if (isElement(dom)) {
        dom.parentNode && dom.parentNode.removeChild(dom);
        this._autoFocusToVideo(dom, true);
      }
      if (!isEmpty(this.__domEventHandlerList[id])) {
        domEvents.forEach(function (key, index) {
          removeEvent(_this5.plugins[id], key, _this5.__domEventHandlerList[id][index]);
        });
        delete this.__domEventHandlerList[id];
      }
      delete this.plugins[id];
    }

    /**
     * Set zIndex for a plugins list
     */

  }, {
    key: 'setPluginsZIndex',
    value: function setPluginsZIndex(plugins) {
      var _this6 = this;

      // $FlowFixMe: there are videoElment and container here
      plugins.forEach(function (key, index) {
        return setStyle(key.match(/^(videoElement|container)$/) ? _this6[key] : _this6.plugins[key], 'z-index', ++index);
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
      return esFullscreen.open(this[target]);
    }
  }, {
    key: 'exitFullscreen',
    value: function exitFullscreen() {
      return esFullscreen.exit();
    }
  }, {
    key: 'fullscreen',
    value: function fullscreen() {
      var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

      for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        args[_key5 - 2] = arguments[_key5];
      }

      return request ? this.requestFullscreen.apply(this, [target].concat(_toConsumableArray(args))) : this.exitFullscreen.apply(this, _toConsumableArray(args));
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.videoElement.focus();
    }

    /**
     * function called when we distory
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      var _this7 = this;

      this.removeVideo();
      domEvents.forEach(function (key, index) {
        removeEvent(_this7.container, key, _this7.containerDomEventHandlerList[index]);
        removeEvent(_this7.wrapper, key, _this7.wrapperDomEventHandlerList[index]);
      });
      esFullscreen.off('fullscreenchange', this._fullscreenMonitor);
      this.wrapper.innerHTML = this.originHTML;
      delete this.wrapper;
      delete this.plugins;
    }

    /**
     * bind all dom events on one element
     * we will use passive mode if it support
     */

  }, {
    key: '_addDomEvents',
    value: function _addDomEvents(element, handlerList, handlerGenerate) {
      domEvents.forEach(function (key) {
        var fn = handlerGenerate(key);
        handlerList.push(fn);
        if (passiveEvents.indexOf(key) > -1) {
          addEvent(element, key, fn, false, { passive: true });
          return;
        }
        addEvent(element, key, fn);
      });
    }
  }, {
    key: '_autoFocusToVideo',
    value: function _autoFocusToVideo(element) {
      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      (remove ? removeEvent : addEvent)(element, 'mouseup', this._focusToVideo, false, true);
      (remove ? removeEvent : addEvent)(element, 'touchend', this._focusToVideo, false, true);
    }
  }, {
    key: '_focusToVideo',
    value: function _focusToVideo() {
      var x = window.scrollX;
      var y = window.scrollY;
      isFunction(this.videoElement.focus) && this.videoElement.focus();
      window.scrollTo(x, y);
    }
  }, {
    key: '_fullscreenMonitor',
    value: function _fullscreenMonitor(evt) {
      var element = esFullscreen.fullscreenElement;
      var original = this.isFullscreen;
      if (!element || !isPosterityNode(this.wrapper, element) && element !== this.wrapper) {
        this.isFullscreen = false;
        this.fullscreenElement = undefined;
      } else {
        this.isFullscreen = true;
        this.fullscreenElement = this.wrapper === element ? 'wrapper' : this.container === element ? 'container' : this.videoElement === element ? 'video' : element;
      }
      if (isEvent(evt) && original !== this.isFullscreen) {
        this.__dispatcher.bus.triggerSync('fullscreenchange', evt);
      }
    }

    /**
     * get the event handler for dom to bind
     */

  }, {
    key: '_getEventHandler',
    value: function _getEventHandler(key, _ref) {
      var _this8 = this;

      var penetrate = _ref.penetrate;

      if (!penetrate || ['mouseenter', 'mouseleave'].indexOf(key) < 0) {
        return function () {
          var _dispatcher$bus4;

          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          (_dispatcher$bus4 = _this8.__dispatcher.bus).triggerSync.apply(_dispatcher$bus4, [key].concat(args));
        };
      }
      var insideVideo = function insideVideo(node) {
        return _this8.__videoExtendedNodes.indexOf(node) > -1 || _this8.__videoExtendedNodes.reduce(function (flag, video) {
          if (flag) return flag;
          return isPosterityNode(video, node);
        }, false);
      };
      return function () {
        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }

        var _args$ = args[0],
            toElement = _args$.toElement,
            currentTarget = _args$.currentTarget,
            relatedTarget = _args$.relatedTarget,
            type = _args$.type;

        var to = toElement || relatedTarget;
        if (_this8.__mouseInVideo && type === 'mouseleave' && !insideVideo(to)) {
          var _dispatcher$bus5;

          _this8.__mouseInVideo = false;
          return (_dispatcher$bus5 = _this8.__dispatcher.bus).triggerSync.apply(_dispatcher$bus5, ['mouseleave'].concat(args));
        }
        if (!_this8.__mouseInVideo && type === 'mouseenter' && insideVideo(currentTarget)) {
          var _dispatcher$bus6;

          _this8.__mouseInVideo = true;
          return (_dispatcher$bus6 = _this8.__dispatcher.bus).triggerSync.apply(_dispatcher$bus6, ['mouseenter'].concat(args));
        }
      };
    }
  }]);

  return Dom;
}(), _applyDecoratedDescriptor$5(_class$6.prototype, 'setAttr', [_dec$6, _dec2$4], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'setAttr'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'getAttr', [_dec3$3], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'getAttr'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'setStyle', [_dec4$3], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'setStyle'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'getStyle', [_dec5$2], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'getStyle'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'requestFullscreen', [_dec6$1], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'requestFullscreen'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, '_focusToVideo', [autobind], _Object$getOwnPropertyDescriptor(_class$6.prototype, '_focusToVideo'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, '_fullscreenMonitor', [autobind], _Object$getOwnPropertyDescriptor(_class$6.prototype, '_fullscreenMonitor'), _class$6.prototype), _class$6);

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
        if (isNumber(value)) {
          value = value + 'px';
        }
        if (!isString(value)) {
          throw new Error('The value of ' + key + ' in ' + this.__target + 'Config must be string, but not ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '.');
        }
        this.__dispatcher.dom.setStyle(this.__target, key, value);
        return value;
      },

      configurable: true,
      enumerable: true
    });
  });
  deepAssign(this, config);
};

var _dec$1;
var _dec2;
var _dec3;
var _dec4;
var _dec5;
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

var pluginConfigSet = {};
var kernelsSet = {};
function convertNameIntoId(name) {
  if (!isString(name)) throw new Error('Plugin\'s name must be a string, but not "' + name + '" in ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
  return camelize(name);
}
function checkPluginConfig(config) {
  if (isFunction(config)) {
    if (!(config.prototype instanceof Plugin)) {
      throw new TypeError('Your are trying to install plugin ' + config.name + ', but it\'s not extends from Chimee.plugin.');
    }
    return;
  }
  if (!isObject(config) || isEmpty(config)) throw new TypeError('plugin\'s config must be an Object, but not "' + config + '" in ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
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
var Dispatcher = (_dec$1 = before(convertNameIntoId), _dec2 = before(checkPluginConfig), _dec3 = before(convertNameIntoId), _dec4 = before(convertNameIntoId), _dec5 = before(convertNameIntoId), _class$1 = function () {
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

    if (!isObject(config)) throw new TypeError('UserConfig must be an Object, but not "' + config + '" in ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
    /**
     * dom Manager
     * @type {Dom}
     */
    this.dom = new Dom(config.wrapper, this);
    /**
     * eventBus
     * @type {Bus}
     */
    this.bus = new Bus(this);
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
    if (isArray(config.plugins) && !isArray(config.plugin)) {
      config.plugin = config.plugins;
      delete config.plugins;
    }
    // use the plugin user want to use
    this._initUserPlugin(config.plugin);
    // add default config for container
    var containerConfig = deepAssign({}, defaultContainerConfig, config.container || {});
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
    this._bindKernelEvents(this.kernel);
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
      _this.bus.trigger('ready');
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
      if (!isObject(option) || isObject(option) && !isString(option.name)) {
        throw new TypeError('pluginConfig do not match requirement');
      }
      if (!isString(option.alias)) option.alias = undefined;
      var _option = option,
          name = _option.name,
          alias$$1 = _option.alias;

      option.name = alias$$1 || name;
      delete option.alias;
      var key = camelize(name);
      var id = camelize(alias$$1 || name);
      var pluginOption = option;
      var pluginConfig = Dispatcher.getPluginConfig(key);
      if (isEmpty(pluginConfig)) throw new TypeError('You have not installed plugin ' + key);
      if (isObject(pluginConfig)) {
        pluginConfig.id = id;
      }
      var plugin = isFunction(pluginConfig) ? new pluginConfig({ id: id }, this, pluginOption) // eslint-disable-line 
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
      if (!isObject(plugin) || !isFunction(plugin.$destroy)) {
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
              if (!isLive) kernel.seek(idealTime);
            };
            _videoError = function videoError(evt) {
              removeEvent(video, 'canplay', videoCanplay, true);
              removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
              removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
              kernel.off('error', _videoError);
              var error = void 0;
              if (evt.target === kernel) {
                var message = evt.data.errmsg;

                Log.error("chimee's silent bump into a kernel error", message);
                error = new Error(message);
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
        if (process.env.NODE_ENV !== 'production') {
          Log.warn("chimee's silentLoad", message);
        }
        return _Promise.reject(new Error(message));
      }).catch(function (data) {
        if (isError(data)) {
          return _Promise.reject(data);
        }
        if (data.error) {
          /* istanbul ignore else  */
          if (process.env.NODE_ENV !== 'production') {
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
    value: function load(src) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!isEmpty(option)) {
        var videoConfig = this.videoConfig;

        var _option$isLive2 = option.isLive,
            _isLive = _option$isLive2 === undefined ? videoConfig.isLive : _option$isLive2,
            _option$box2 = option.box,
            _box = _option$box2 === undefined ? videoConfig.box : _option$box2,
            _option$preset2 = option.preset,
            _preset = _option$preset2 === undefined ? videoConfig.preset : _option$preset2,
            _option$kernels2 = option.kernels,
            _kernels = _option$kernels2 === undefined ? videoConfig.kernels : _option$kernels2;

        var video = document.createElement('video');
        var config = { isLive: _isLive, box: _box, preset: _preset, src: src, kernels: _kernels };
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
      var originVideoConfig = deepClone(this.videoConfig);
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
      this._bindKernelEvents(oldKernel, true);
      this._bindKernelEvents(kernel);
      this.kernel = kernel;
      this._silentLoadTempKernel = undefined;
      var isLive = config.isLive,
          box = config.box,
          preset = config.preset,
          kernels = config.kernels;

      _Object$assign(this.videoConfig, { isLive: isLive, box: box, preset: preset, kernels: kernels });
      // const config = {}
      oldKernel.destroy();
    }
    /**
     * destroy function called when dispatcher destroyed
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      for (var key in this.plugins) {
        this.unuse(key);
      }
      this.bus.destroy();
      delete this.bus;
      this.dom.destroy();
      delete this.dom;
      this._bindKernelEvents(this.kernel, true);
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

      if (!isArray(configs)) {
        /* istanbul ignore else  */
        if (process.env.NODE_ENV !== 'production') Log.warn('Dispatcher', 'UserConfig.plugin can only by an Array, but not "' + configs + '" in ' + (typeof configs === 'undefined' ? 'undefined' : _typeof(configs)));
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
        if (process.env.NODE_ENV !== 'prodution' && !this.videoConfig.src) {
          Log.warn('You have not set the src, so you better set autoload to be false. Accroding to https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#src.');
          return;
        }
        this.bus.emit('load', this.videoConfig.src);
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

      if (process.env.NODE_ENV !== 'production' && isEmpty(kernels) && !isEmpty(preset)) Log.warn('preset will be deprecated in next major version, please use kernels instead.');
      var newPreset = isArray(kernels) ? kernels.reduce(function (kernels, key) {
        if (!isFunction(kernelsSet[key])) {
          Log.warn('You have not installed kernel for ' + key + '.');
          return kernels;
        }
        kernels[key] = kernelsSet[key];
        return kernels;
      }, {}) : isObject(kernels) ? kernels : {};
      config.preset = _Object$assign(newPreset, preset);
      var kernel = new Kernel(video, config);
      return kernel;
    }
  }, {
    key: '_bindKernelEvents',
    value: function _bindKernelEvents(kernel) {
      var _this6 = this;

      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      kernelEvents.forEach(function (key, index) {
        if (!remove) {
          var _fn = function _fn() {
            var _bus;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return (_bus = _this6.bus).triggerSync.apply(_bus, [key].concat(_toConsumableArray(args)));
          };
          kernel.on(key, _fn);
          _this6.kernelEventHandlerList.push(_fn);
          return;
        }
        var fn = _this6.kernelEventHandlerList[index];
        kernel.off(key, fn);
      });
      if (remove) {
        this.kernelEventHandlerList = [];
        kernel.off('error', this.throwError);
      } else {
        kernel.on('error', this.throwError);
      }
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

      var id = camelize(name);
      if (!isEmpty(pluginConfigSet[id])) {
        /* istanbul ignore else  */
        if (process.env.NODE_ENV !== 'production') Log.warn('Dispatcher', 'You have installed ' + name + ' again. And the older one will be replaced');
      }
      var pluginConfig = isFunction(config) ? config : deepAssign({ id: id }, config);
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
      var tasks = isObject(key) ? _Object$entries(key) : [[key, value]];
      tasks.forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        if (!isFunction(value)) throw new Error('The kernel you install on ' + key + ' must be a Function, but not ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
        if (isFunction(kernelsSet[key])) Log.warn('You have alrady install a kenrle on ' + key + ', and now we will replace it');
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
      return isFunction(kernelsSet[key]);
    }
  }]);

  return Dispatcher;
}(), _applyDecoratedDescriptor$1(_class$1.prototype, 'unuse', [_dec$1], _Object$getOwnPropertyDescriptor(_class$1.prototype, 'unuse'), _class$1.prototype), _applyDecoratedDescriptor$1(_class$1.prototype, 'throwError', [autobind], _Object$getOwnPropertyDescriptor(_class$1.prototype, 'throwError'), _class$1.prototype), _applyDecoratedDescriptor$1(_class$1, 'install', [_dec2], _Object$getOwnPropertyDescriptor(_class$1, 'install'), _class$1), _applyDecoratedDescriptor$1(_class$1, 'hasInstalled', [_dec3], _Object$getOwnPropertyDescriptor(_class$1, 'hasInstalled'), _class$1), _applyDecoratedDescriptor$1(_class$1, 'uninstall', [_dec4], _Object$getOwnPropertyDescriptor(_class$1, 'uninstall'), _class$1), _applyDecoratedDescriptor$1(_class$1, 'getPluginConfig', [_dec5], _Object$getOwnPropertyDescriptor(_class$1, 'getPluginConfig'), _class$1), _class$1);

var _class$7;
var _descriptor$2;

function _initDefineProp$2(target, property, descriptor, context) {
  if (!descriptor) return;

  _Object$defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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

var GlobalConfig = (_class$7 = function () {
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

    _initDefineProp$2(this, '_silent', _descriptor$2, this);

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
}(), _descriptor$2 = _applyDecoratedDescriptor$6(_class$7.prototype, '_silent', [nonenumerable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _class$7);

var _dec;
var _class;
var _class2;
var _descriptor;
var _descriptor2;
var _descriptor3;
var _init;
var _init2;
var _init3;
var _init4;
var _init5;
var _init6;
var _init7;
var _init8;
var _init9;
var _class3;
var _temp;

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

var Chimee = (_dec = autobindClass(), _dec(_class = (_class2 = (_temp = _class3 = function (_VideoWrapper) {
  _inherits(Chimee, _VideoWrapper);

  function Chimee(config) {
    _classCallCheck(this, Chimee);

    var _this = _possibleConstructorReturn(this, (Chimee.__proto__ || _Object$getPrototypeOf(Chimee)).call(this));

    _this.destroyed = false;

    _initDefineProp(_this, '__id', _descriptor, _this);

    _initDefineProp(_this, 'version', _descriptor2, _this);

    _initDefineProp(_this, 'config', _descriptor3, _this);

    if (isString(config) || isElement(config)) {
      config = {
        wrapper: config,
        controls: true
      };
    } else if (isObject(config)) {
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
      _get(Chimee.prototype.__proto__ || _Object$getPrototypeOf(Chimee.prototype), '__destroy', this).call(this);
      this.__dispatcher.destroy();
      this.destroyed = true;
    }
  }, {
    key: 'use',
    value: function use(option) {
      this.__dispatcher.use(option);
    }
  }, {
    key: 'unuse',
    value: function unuse(name) {
      this.__dispatcher.unuse(name);
    }
  }, {
    key: '__throwError',
    value: function __throwError(error) {
      if (isString(error)) error = new Error(error);
      var errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
      if (isFunction(errorHandler)) return errorHandler(error);
      if (Chimee.config.silent) return;
      throw error;
    }
  }]);

  return Chimee;
}(VideoWrapper), _class3.plugin = Plugin, _class3.config = new GlobalConfig(), _class3.install = Dispatcher.install, _class3.uninstall = Dispatcher.uninstall, _class3.hasInstalled = Dispatcher.hasInstalled, _class3.installKernel = Dispatcher.installKernel, _class3.uninstallKernel = Dispatcher.uninstallKernel, _class3.hasInstalledKernel = Dispatcher.hasInstalledKernel, _class3.getPluginConfig = Dispatcher.getPluginConfig, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, '__id', [frozen], {
  enumerable: true,
  initializer: function initializer() {
    return '_vm';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'version', [frozen], {
  enumerable: true,
  initializer: function initializer() {
    return '0.6.2';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'config', [frozen], {
  enumerable: true,
  initializer: function initializer() {
    return {
      errorHandler: undefined
    };
  }
}), _applyDecoratedDescriptor(_class2, 'plugin', [frozen], (_init = _Object$getOwnPropertyDescriptor(_class2, 'plugin'), _init = _init ? _init.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'config', [frozen], (_init2 = _Object$getOwnPropertyDescriptor(_class2, 'config'), _init2 = _init2 ? _init2.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init2;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'install', [frozen], (_init3 = _Object$getOwnPropertyDescriptor(_class2, 'install'), _init3 = _init3 ? _init3.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init3;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'uninstall', [frozen], (_init4 = _Object$getOwnPropertyDescriptor(_class2, 'uninstall'), _init4 = _init4 ? _init4.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init4;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'hasInstalled', [frozen], (_init5 = _Object$getOwnPropertyDescriptor(_class2, 'hasInstalled'), _init5 = _init5 ? _init5.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init5;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'installKernel', [frozen], (_init6 = _Object$getOwnPropertyDescriptor(_class2, 'installKernel'), _init6 = _init6 ? _init6.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init6;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'uninstallKernel', [frozen], (_init7 = _Object$getOwnPropertyDescriptor(_class2, 'uninstallKernel'), _init7 = _init7 ? _init7.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init7;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'hasInstalledKernel', [frozen], (_init8 = _Object$getOwnPropertyDescriptor(_class2, 'hasInstalledKernel'), _init8 = _init8 ? _init8.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init8;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'getPluginConfig', [frozen], (_init9 = _Object$getOwnPropertyDescriptor(_class2, 'getPluginConfig'), _init9 = _init9 ? _init9.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init9;
  }
}), _class2), _class2)) || _class);

export default Chimee;
