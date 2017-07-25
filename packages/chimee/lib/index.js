
/**
 * chimee v0.1.3
 * (c) 2017 toxic-johann
 * Released under MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _Object$defineProperty = _interopDefault(require('babel-runtime/core-js/object/define-property'));
var _Object$getOwnPropertyDescriptor = _interopDefault(require('babel-runtime/core-js/object/get-own-property-descriptor'));
var _toConsumableArray = _interopDefault(require('babel-runtime/helpers/toConsumableArray'));
var _Object$getPrototypeOf = _interopDefault(require('babel-runtime/core-js/object/get-prototype-of'));
var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
var _get = _interopDefault(require('babel-runtime/helpers/get'));
var _inherits = _interopDefault(require('babel-runtime/helpers/inherits'));
var _Promise = _interopDefault(require('babel-runtime/core-js/promise'));
var chimeeHelper = require('chimee-helper');
var Kernel = _interopDefault(require('chimee-kernel'));
var _Map = _interopDefault(require('babel-runtime/core-js/map'));
var _Object$keys = _interopDefault(require('babel-runtime/core-js/object/keys'));
var toxicDecorators = require('toxic-decorators');
var _JSON$stringify = _interopDefault(require('babel-runtime/core-js/json/stringify'));
var _defineProperty = _interopDefault(require('babel-runtime/helpers/defineProperty'));
var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));

var videoEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended', 'error', 'interruptbegin', 'interruptend', 'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
var videoReadOnlyProperties = ['buffered', 'currentSrc', 'duration', 'ended', 'networkState', 'paused', 'readyState', 'seekable', 'sinkId', 'controlsList'];
var domEvents = ['beforeinput', 'blur', 'click', 'compositionend', 'compositionstart', 'compositionupdate', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll', 'select', 'wheel', 'fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange', 'contextmenu'];
var kernelMethods = ['play', 'pause', 'load', 'seek'];

var domMethods = ['focus', 'fullScreen', 'requestFullScreen', 'exitFullScreen'];
var videoMethods = ['canPlayType', 'captureStream', 'setSinkId'];

var secondaryReg = /^(before|after|_)/;
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

var Bus = function () {
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
      if (chimeeHelper.isFunction(handler)) {
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
        chimeeHelper.bind(fn, this).apply(undefined, arguments);
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

      if (key.match(secondaryReg)) {
        chimeeHelper.Log.warn('bus', 'Secondary Event could not be emit');
        return;
      }
      var event = this.events[key];
      if (chimeeHelper.isEmpty(event)) {
        return this._eventProcessor.apply(this, [key, { sync: false }].concat(_toConsumableArray(args)));
      }
      var beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
      return chimeeHelper.runRejectableQueue.apply(undefined, [beforeQueue].concat(_toConsumableArray(args))).then(function () {
        return _this._eventProcessor.apply(_this, [key, { sync: false }].concat(_toConsumableArray(args)));
      }).catch(function (error) {
        if (chimeeHelper.isError(error)) _this.__dispatcher.throwError(error);
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
      if (key.match(secondaryReg)) {
        chimeeHelper.Log.warn('bus', 'Secondary Event could not be emit');
        return false;
      }
      var event = this.events[key];

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (chimeeHelper.isEmpty(event)) {
        return this._eventProcessor.apply(this, [key, { sync: true }].concat(_toConsumableArray(args)));
      }
      var beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
      return chimeeHelper.runStoppableQueue.apply(undefined, [beforeQueue].concat(_toConsumableArray(args))) && this._eventProcessor.apply(this, [key, { sync: true }].concat(_toConsumableArray(args)));
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

      if (key.match(secondaryReg)) {
        chimeeHelper.Log.warn('bus', 'Secondary Event could not be emit');
        return;
      }
      var event = this.events[key];
      if (chimeeHelper.isEmpty(event)) {
        return _Promise.resolve(true);
      }
      var mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
      return chimeeHelper.runRejectableQueue.apply(undefined, [mainQueue].concat(_toConsumableArray(args))).then(function () {
        var afterQueue = _this2._getEventQueue(event.after, _this2.__dispatcher.order);
        return chimeeHelper.runRejectableQueue.apply(undefined, [afterQueue].concat(_toConsumableArray(args)));
      }).then(function () {
        return _this2._runSideEffectEvent.apply(_this2, [key, _this2.__dispatcher.order].concat(_toConsumableArray(args)));
      }).catch(function (error) {
        if (chimeeHelper.isError(error)) _this2.__dispatcher.throwError(error);
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
      if (key.match(secondaryReg)) {
        chimeeHelper.Log.warn('bus', 'Secondary Event could not be emit');
        return false;
      }
      var event = this.events[key];
      if (chimeeHelper.isEmpty(event)) {
        return true;
      }
      var mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
      var afterQueue = this._getEventQueue(event.after, this.__dispatcher.order);

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      var result = chimeeHelper.runStoppableQueue.apply(undefined, [mainQueue].concat(_toConsumableArray(args))) && chimeeHelper.runStoppableQueue.apply(undefined, [afterQueue].concat(_toConsumableArray(args)));
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
      keys = chimeeHelper.deepClone(keys);
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
      keys = chimeeHelper.deepClone(keys);
      var id = keys.pop();
      var target = this.events;
      for (var i = 0, len = keys.length; i < len; i++) {
        var son = target[keys[i]];
        // if we can't find the event binder, just return
        if (chimeeHelper.isEmpty(son)) return;
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
      if (chimeeHelper.isEmpty(handlers)) map.delete(fn);
    }
  }, {
    key: '_getHandlerFromOnceMap',
    value: function _getHandlerFromOnceMap(keys, fn) {
      var key = keys.join('-');
      var map = this.onceMap[key];
      if (chimeeHelper.isVoid(map) || !map.has(fn)) return;
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
        key = chimeeHelper.camelize(key.replace(secondaryReg, ''));
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

      order = chimeeHelper.isArray(order) ? order.concat(['_vm']) : ['_vm'];
      return chimeeHelper.isEmpty(handlerSet) ? [] : order.reduce(function (queue, id) {
        if (chimeeHelper.isEmpty(handlerSet[id]) || !chimeeHelper.isArray(handlerSet[id]) ||
        // in case plugins is missed
        // _vm indicate the user. This is the function for user
        !_this3.__dispatcher.plugins[id] && id !== '_vm') {
          return queue;
        }
        return queue.concat(handlerSet[id].map(function (fn) {
          // bind context for plugin instance
          return chimeeHelper.bind(fn, _this3.__dispatcher.plugins[id] || _this3.__dispatcher.vm);
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

      for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        args[_key5 - 2] = arguments[_key5];
      }

      if (isKernelMethod || isDomMethod) {
        var _dispatcher;

        (_dispatcher = this.__dispatcher[isKernelMethod ? 'kernel' : 'dom'])[key].apply(_dispatcher, _toConsumableArray(args));
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
      if (chimeeHelper.isEmpty(event)) {
        return;
      }
      var queue = this._getEventQueue(event['_'], order);
      queue.forEach(function (run) {
        return run.apply(undefined, _toConsumableArray(args));
      });
      return true;
    }
  }]);

  return Bus;
}();

/**
 * checker for on, off, once function
 * @param {string} key
 * @param {Function} fn
 */
function eventBinderCheck(key, fn) {
  if (!chimeeHelper.isString(key)) throw new TypeError('key parameter must be String');
  if (!chimeeHelper.isFunction(fn)) throw new TypeError('fn parameter must be Function');
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

var VideoWrapper = function () {
  function VideoWrapper() {
    _classCallCheck(this, VideoWrapper);

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
            return chimeeHelper.bind(video[key], video);
          },

          set: undefined,
          configurable: false,
          enumerable: false
        });
      });
      // bind video config properties on instance, so that you can just set src by this
      var props = videoConfig._realDomAttr.concat(videoConfig._kernelProperty).reduce(function (props, key) {
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
      toxicDecorators.applyDecorators(this, props, { self: true });
      kernelMethods.forEach(function (key) {
        _Object$defineProperty(_this, key, {
          value: function value() {
            var _this2 = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return new _Promise(function (resolve, reject) {
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

      if (!chimeeHelper.isString(key) && !chimeeHelper.isArray(key)) throw new TypeError('$watch only accept string and Array<string> as key to find the target to spy on, but not ' + key + ', whose type is ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
      var watching = true;
      var watcher = function watcher() {
        if (watching) chimeeHelper.bind(handler, this).apply(undefined, arguments);
      };
      var unwatcher = function unwatcher() {
        watching = false;
        var index = _this3.__unwatchHandlers.indexOf(unwatcher);
        if (index > -1) _this3.__unwatchHandlers.splice(index, 1);
      };
      var keys = chimeeHelper.isString(key) ? key.split('.') : key;
      var property = keys.pop();
      var videoConfig = this.__dispatcher.videoConfig;
      var target = keys.length === 0 && !other && videoConfig._realDomAttr.indexOf(property) > -1 ? videoConfig : chimeeHelper.getDeepProperty(other || this, keys, { throwError: true });
      toxicDecorators.applyDecorators(target, _defineProperty({}, property, toxicDecorators.watch(watcher, { deep: deep, diff: diff, proxy: proxy })), { self: true });
      this.__unwatchHandlers.push(unwatcher);
      return unwatcher;
    }
  }, {
    key: '$set',
    value: function $set(obj, property, value) {
      if (!chimeeHelper.isObject(obj) && !chimeeHelper.isArray(obj)) throw new TypeError('$set only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
      // $FlowFixMe: we have custom this function
      if (!chimeeHelper.isFunction(obj.__set)) {
        chimeeHelper.Log.warn('chimee', _JSON$stringify(obj) + ' has not been deep watch. There is no need to use $set.');
        // $FlowFixMe: we support computed string on array here
        obj[property] = value;
        return;
      }
      obj.__set(property, value);
    }
  }, {
    key: '$del',
    value: function $del(obj, property) {
      if (!chimeeHelper.isObject(obj) && !chimeeHelper.isArray(obj)) throw new TypeError('$del only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
      // $FlowFixMe: we have custom this function
      if (!chimeeHelper.isFunction(obj.__del)) {
        chimeeHelper.Log.warn('chimee', _JSON$stringify(obj) + ' has not been deep watch. There is no need to use $del.');
        // $FlowFixMe: we support computed string on array here
        delete obj[property];
        return;
      }
      obj.__del(property);
    }
  }, {
    key: '__destroy',
    value: function __destroy() {
      this.__unwatchHandlers.forEach(function (unwatcher) {
        return unwatcher();
      });
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this.__dispatcher.kernel.currentTime;
    },
    set: function set(second) {
      this.__dispatcher.bus.emitSync('seek', second);
    }
  }]);

  return VideoWrapper;
}();

var _dec$2;
var _dec2$2;
var _dec3$2;
var _dec4$2;
var _dec5$2;
var _dec6$1;
var _class$2;
var _class2$1;

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

/**
 * <pre>
 * Plugin is the class for plugin developer.
 * When we use a plugin, we will generate an instance of plugin.
 * Developer can do most of things base on this plugin
 * </pre>
 */
var Plugin = (_dec$2 = toxicDecorators.autobindClass(), _dec2$2 = toxicDecorators.before(attrAndStyleCheck), _dec3$2 = toxicDecorators.before(attrAndStyleCheck), _dec4$2 = toxicDecorators.before(eventBinderCheck), _dec5$2 = toxicDecorators.before(eventBinderCheck), _dec6$1 = toxicDecorators.before(eventBinderCheck), _dec$2(_class$2 = (_class2$1 = function (_VideoWrapper) {
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
    _this.VERSION = '0.1.3';
    _this.__operable = true;
    _this.__events = {};
    _this.__level = 0;

    if (chimeeHelper.isEmpty(dispatcher)) {
      chimeeHelper.Log.error('Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?');
      throw new TypeError('lack of dispatcher');
    }
    if (!chimeeHelper.isString(id)) {
      throw new TypeError('id of PluginConfig must be string');
    }
    _this.__id = id;
    _this.__dispatcher = dispatcher;
    _this.$videoConfig = _this.__dispatcher.videoConfig;
    _this.__wrapAsVideo(_this.$videoConfig);
    _this.beforeCreate = _this.beforeCreate || beforeCreate;
    try {
      chimeeHelper.isFunction(_this.beforeCreate) && _this.beforeCreate({
        events: events,
        data: data,
        computed: computed,
        methods: methods
      }, option);
    } catch (error) {
      _this.$throwError(error);
    }
    // bind plugin methods into instance
    if (!chimeeHelper.isEmpty(methods) && chimeeHelper.isObject(methods)) {
      _Object$keys(methods).forEach(function (key) {
        var fn = methods[key];
        if (!chimeeHelper.isFunction(fn)) throw new TypeError('plugins methods must be Function');
        _Object$defineProperty(_this, key, {
          value: chimeeHelper.bind(fn, _this),
          writable: true,
          enumerable: false,
          configurable: true
        });
      });
    }
    // hook plugin events on bus
    if (!chimeeHelper.isEmpty(events) && chimeeHelper.isObject(events)) {
      _Object$keys(events).forEach(function (key) {
        if (!chimeeHelper.isFunction(events[key])) throw new TypeError('plugins events hook must bind with Function');
        _this.$on(key, events[key]);
      });
    }
    // bind data into plugin instance
    if (!chimeeHelper.isEmpty(data) && chimeeHelper.isObject(data)) {
      chimeeHelper.deepAssign(_this, data);
    }
    // set the computed member by getter and setter
    if (!chimeeHelper.isEmpty(computed) && chimeeHelper.isObject(computed)) {
      var props = _Object$keys(computed).reduce(function (props, key) {
        var val = computed[key];
        if (chimeeHelper.isFunction(val)) {
          props[key] = toxicDecorators.accessor({ get: val });
          return props;
        }
        if (chimeeHelper.isObject(val) && (chimeeHelper.isFunction(val.get) || chimeeHelper.isFunction(val.set))) {
          props[key] = toxicDecorators.accessor(val);
          return props;
        }
        chimeeHelper.Log.warn('Dispatcher.plugin', 'Wrong computed member \'' + key + '\' defination in Plugin ' + name);
        return props;
      }, {});
      toxicDecorators.applyDecorators(_this, props, { self: true });
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
    toxicDecorators.applyDecorators(_this, {
      $inner: toxicDecorators.frozen,
      $autoFocus: toxicDecorators.frozen,
      $penetrate: toxicDecorators.frozen
    }, { self: true });
    /**
     * to tell us if the plugin can be operable, can be dynamic change
     * @type {boolean}
     */
    _this.$operable = chimeeHelper.isBoolean(option.operable) ? option.operable : operable;
    _this.__level = chimeeHelper.isInteger(option.level) ? option.level : level;
    /**
     * pluginOption, so it's easy for plugin developer to check the config
     * @type {Object}
     */
    _this.$config = option;
    try {
      chimeeHelper.isFunction(_this.create) && _this.create();
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
        chimeeHelper.isFunction(this.init) && this.init(videoConfig);
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
        result = chimeeHelper.isFunction(this.inited) && this.inited();
      } catch (error) {
        this.$throwError(error);
      }
      this.readySync = !chimeeHelper.isPromise(result);
      this.ready = this.readySync ? _Promise.resolve()
      // $FlowFixMe: it's promise now
      : result.then(function (ret) {
        _this2.readySync = true;
        return ret;
      }).catch(function (error) {
        if (chimeeHelper.isError(error)) return _this2.$throwError(error);
        return _Promise.reject(error);
      });
      return this.readySync || this.ready;
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
      var _dispatcher$dom;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_dispatcher$dom = this.__dispatcher.dom)[method + 'Style'].apply(_dispatcher$dom, args);
    }
    /**
    * set attr
    * @param {string} element optional, default to be video, you can choose from video | container | wrapper
    * @param {string} attribute the atrribue name
    * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
    */

  }, {
    key: '$attr',
    value: function $attr(method) {
      var _dispatcher$dom2;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (method === 'set' && /video/.test(args[0])) {
        if (!this.__dispatcher.videoConfigReady) {
          chimeeHelper.Log.warn('plugin', 'Plugin ' + this.__id + ' is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger');
          return args[2];
        }
        if (this.$videoConfig._realDomAttr.indexOf(args[1]) > -1) {
          var key = args[1],
              val = args[2];

          this.$videoConfig[key] = val;
          return val;
        }
      }
      return (_dispatcher$dom2 = this.__dispatcher.dom)[method + 'Attr'].apply(_dispatcher$dom2, args);
    }
    /**
     * call fullscreen api on some specific element
     * @param {boolean} flag true means fullscreen and means exit fullscreen
     * @param {string} element the element you want to fullscreen, default it's container, you can choose from video | container | wrapper
     */

  }, {
    key: '$fullScreen',
    value: function $fullScreen() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

      return this.__dispatcher.dom.fullScreen(flag, element);
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
        chimeeHelper.bind(fn, this).apply(undefined, arguments);
        self.__removeEvents(key, boundFn);
      };
      self.__addEvents(key, boundFn);
      this.__dispatcher.bus.once(this.__id, key, boundFn);
    }
    /**
     * emit an event
     * @param  {string}    key event's name
     * @param  {...args} args
     */

  }, {
    key: '$emit',
    value: function $emit(key) {
      var _dispatcher$bus;

      if (!chimeeHelper.isString(key)) throw new TypeError('$emit key parameter must be String');
      if (domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
        chimeeHelper.Log.warn('plugin', 'You are using $emit to emit ' + key + ' event. As $emit is wrapped in Promise. It make you can\'t use event.preventDefault and event.stopPropagation. So we advice you to use $emitSync');
      }

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      (_dispatcher$bus = this.__dispatcher.bus).emit.apply(_dispatcher$bus, [key].concat(_toConsumableArray(args)));
    }
    /**
     * emit a sync event
     * @param  {string}    key event's name
     * @param  {...args} args
     */

  }, {
    key: '$emitSync',
    value: function $emitSync(key) {
      var _dispatcher$bus2;

      if (!chimeeHelper.isString(key)) throw new TypeError('$emitSync key parameter must be String');

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      return (_dispatcher$bus2 = this.__dispatcher.bus).emitSync.apply(_dispatcher$bus2, [key].concat(_toConsumableArray(args)));
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
      var _this3 = this;

      chimeeHelper.isFunction(this.destroy) && this.destroy();
      _get(Plugin.prototype.__proto__ || _Object$getPrototypeOf(Plugin.prototype), '__destroy', this).call(this);
      _Object$keys(this.__events).forEach(function (key) {
        if (!chimeeHelper.isArray(_this3.__events[key])) return;
        _this3.__events[key].forEach(function (fn) {
          return _this3.$off(key, fn);
        });
      });
      delete this.__events;
      this.__dispatcher.dom.removePlugin(this.__id);
      delete this.__dispatcher;
      delete this.$dom;
      this.destroyed = true;
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
      if (chimeeHelper.isEmpty(this.__events[key])) return;
      var index = this.__events[key].indexOf(fn);
      if (index < 0) return;
      this.__events[key].splice(index, 1);
      if (chimeeHelper.isEmpty(this.__events[key])) delete this.__events[key];
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
    /**
     * to tell us if the plugin can be operable, can be dynamic change
     * @type {boolean}
     */

  }, {
    key: '$operable',
    set: function set(val) {
      if (!chimeeHelper.isBoolean(val)) return;
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
      if (!chimeeHelper.isInteger(val)) return;
      this.__level = val;
      this.__dispatcher._sortZIndex();
    },
    get: function get() {
      return this.__level;
    }
  }]);

  return Plugin;
}(VideoWrapper), (_applyDecoratedDescriptor$2(_class2$1.prototype, '$css', [_dec2$2], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$css'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, '$attr', [_dec3$2], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$attr'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, '$on', [_dec4$2], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$on'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, '$off', [_dec5$2], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$off'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, '$once', [_dec6$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$once'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, '$plugins', [toxicDecorators.nonenumerable, toxicDecorators.nonextendable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$plugins'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, '$pluginOrder', [toxicDecorators.nonenumerable, toxicDecorators.nonextendable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$pluginOrder'), _class2$1.prototype)), _class2$1)) || _class$2);

var _dec$3;
var _dec2$3;
var _dec3$3;
var _dec4$3;
var _dec5$3;
var _dec6$2;
var _class$3;

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
  if (!chimeeHelper.isElement(this[target])) throw new TypeError('Your target ' + target + ' is not a legal HTMLElement');

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [target].concat(args);
}
function attrOperationCheck(target, attr, val) {
  if (!chimeeHelper.isString(attr)) throw new TypeError("to handle dom's attribute or style, your attr parameter must be string");
  if (!chimeeHelper.isString(target)) throw new TypeError("to handle dom's attribute or style, your target parameter must be string");
  return [target, attr, val];
}
/**
 * <pre>
 * Dom work for Dispatcher.
 * It take charge of dom management of Dispatcher.
 * </pre>
 */
var Dom = (_dec$3 = toxicDecorators.waituntil('__dispatcher.videoConfigReady'), _dec2$3 = toxicDecorators.before(attrOperationCheck, targetCheck), _dec3$3 = toxicDecorators.before(attrOperationCheck, targetCheck), _dec4$3 = toxicDecorators.before(attrOperationCheck, targetCheck), _dec5$3 = toxicDecorators.before(attrOperationCheck, targetCheck), _dec6$2 = toxicDecorators.before(targetCheck), (_class$3 = function () {
  /**
   * to mark is the mouse in the video area
   * @type {boolean}
   * @member __mouseInVideo
   */

  /**
   * Array to store all video dom event handler
   * @type {Array}
   * @member wrapperDomEventHandlerList
   */

  /**
   * Array to store all video dom event handler
   * @type {Array}
   * @member videoDomEventHandlerList
   */

  /**
   * the html to restore when we are destroyed
   * @type {HTMLString}
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

    this.__dispatcher = dispatcher;
    if (!chimeeHelper.isElement(wrapper) && !chimeeHelper.isString(wrapper)) throw new TypeError('Illegal wrapper');
    var $wrapper = chimeeHelper.$(wrapper);
    if ($wrapper.length === 0) {
      throw new TypeError('Can not get dom node accroding wrapper. Please check your wrapper');
    }
    /**
     * the referrence of the dom wrapper of whole Chimee
     * @type {Element}
     */
    this.wrapper = $wrapper[0];
    this.originHTML = this.wrapper.innerHTML;
    // if we find video element inside wrapper
    // we use it
    // or we create a video element by ourself.
    var videoElement = $wrapper.find('video')[0];
    if (!videoElement) {
      videoElement = document.createElement('video');
    }
    /**
     * referrence of video's dom element
     * @type {Element}
     */
    this.videoElement = videoElement;
    this.__videoExtendedNodes.push(videoElement);
    this.setAttr('videoElement', 'tabindex', -1);
    this._autoFocusToVideo(this.videoElement);
    // create container
    if (this.videoElement.parentElement && chimeeHelper.isElement(this.videoElement.parentElement) && this.videoElement.parentElement !== this.wrapper) {
      this.container = this.videoElement.parentElement;
    } else {
      this.container = document.createElement('container');
      chimeeHelper.$(this.container).append(this.videoElement);
    }
    // check container.position
    if (this.container.parentElement !== this.wrapper) {
      $wrapper.append(this.container);
    }
    videoEvents.forEach(function (key) {
      var fn = function fn() {
        var _dispatcher$bus;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return (_dispatcher$bus = _this.__dispatcher.bus).trigger.apply(_dispatcher$bus, [key].concat(args));
      };
      _this.videoEventHandlerList.push(fn);
      chimeeHelper.addEvent(_this.videoElement, key, fn);
    });
    domEvents.forEach(function (key) {
      var fn = _this._getEventHandler(key, { penetrate: true });
      _this.videoDomEventHandlerList.push(fn);
      chimeeHelper.addEvent(_this.videoElement, key, fn);
      var cfn = function cfn() {
        var _dispatcher$bus2;

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return (_dispatcher$bus2 = _this.__dispatcher.bus).triggerSync.apply(_dispatcher$bus2, ['c_' + key].concat(args));
      };
      _this.containerDomEventHandlerList.push(cfn);
      chimeeHelper.addEvent(_this.container, key, cfn);
      var wfn = function wfn() {
        var _dispatcher$bus3;

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return (_dispatcher$bus3 = _this.__dispatcher.bus).triggerSync.apply(_dispatcher$bus3, ['w_' + key].concat(args));
      };
      _this.wrapperDomEventHandlerList.push(wfn);
      chimeeHelper.addEvent(_this.wrapper, key, wfn);
    });
  }
  /**
   * <pre>
   * each plugin has its own dom node, this function will create one or them.
   * we support multiple kind of el
   * 1. Element, we will append this dom node on wrapper straight
   * 2. HTMLString, we will create dom based on this HTMLString and append it on wrapper
   * 3. string, we will transfer this string into hypen string, then we create a custom elment called by this and bind it on wrapper
   * 4. nothing, we will create a div and bind it on the wrapper
   * </pre>
   * @param  {string} id plugin's id
   * @param  {string|Element} el(optional) the el can be custom dom element or html string to insert
   * @param  {boolean} inner if it's true, we will put it into conatiner, else we would put it into outer
   * @return {Node}
   */

  /**
   * Object to store different plugin's dom event handlers
   * @type {Object}
   * @member __domEventHandlerList
   */

  /**
   * Array to store all container dom event handler
   * @type {Array}
   * @member containerDomEventHandlerList
   */

  /**
   * Array to store all video event handler
   * @type {Array}
   * @member videoEventHandlerList
   */

  /**
   * @param  {string|Element} wrapper the wrapper of Chimee. All dom including videoElement will build in it.
   * @return {Dom}
   */
  /**
   * all plugin's dom element set
   * @type {Object}
   * @member plugins
   */


  _createClass(Dom, [{
    key: 'insertPlugin',
    value: function insertPlugin(id, el) {
      var _this2 = this;

      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!chimeeHelper.isString(id)) throw new TypeError('insertPlugin id parameter must be string');
      if (chimeeHelper.isElement(this.plugins[id])) {
        chimeeHelper.Log.warn('Dispatcher.dom', 'Plugin ' + id + ' have already had a dom node. Now it will be replaced');
        this.removePlugin(id);
      }
      if (chimeeHelper.isString(el)) {
        if (chimeeHelper.isHTMLString(el)) {
          var outer = document.createElement('div');
          outer.innerHTML = el;
          el = outer.children[0];
        } else {
          el = document.createElement(chimeeHelper.hypenate(el));
        }
      } else if (chimeeHelper.isObject(el)) {
        option = el;
      }
      var _option = option,
          inner = _option.inner,
          penetrate = _option.penetrate,
          autoFocus = _option.autoFocus;
      var _option2 = option,
          className = _option2.className;

      var node = el && chimeeHelper.isElement(el) ? el : document.createElement('div');
      if (chimeeHelper.isArray(className)) {
        className = className.join(' ');
      }
      if (chimeeHelper.isString(className)) {
        chimeeHelper.addClassName(node, className);
      }
      this.plugins[id] = node;
      var outerElement = inner ? this.container : this.wrapper;
      var originElement = inner ? this.videoElement : this.container;
      if (chimeeHelper.isBoolean(autoFocus) ? autoFocus : inner) this._autoFocusToVideo(node);
      // auto forward the event if this plugin can be penetrate
      if (penetrate) {
        this.__domEventHandlerList[id] = this.__domEventHandlerList[id] || [];
        domEvents.forEach(function (key) {
          var fn = _this2._getEventHandler(key, { penetrate: penetrate });
          chimeeHelper.addEvent(node, key, fn);
          _this2.__domEventHandlerList[id].push(fn);
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
     * @param  {string} id
     */

  }, {
    key: 'removePlugin',
    value: function removePlugin(id) {
      var _this3 = this;

      if (!chimeeHelper.isString(id)) return;
      var dom = this.plugins[id];
      if (chimeeHelper.isElement(dom)) {
        dom.parentNode && dom.parentNode.removeChild(dom);
        this._autoFocusToVideo(dom, true);
      }
      if (!chimeeHelper.isEmpty(this.__domEventHandlerList[id])) {
        domEvents.forEach(function (key, index) {
          chimeeHelper.removeEvent(_this3.plugins[id], key, _this3.__domEventHandlerList[id][index]);
        });
        delete this.__domEventHandlerList[id];
      }
      delete this.plugins[id];
    }
    /**
     * Set zIndex for a plugins list
     * @param {Array<string>} plugins
     */

  }, {
    key: 'setPluginsZIndex',
    value: function setPluginsZIndex(plugins) {
      var _this4 = this;

      // $FlowFixMe: there are videoElment and container here
      plugins.forEach(function (key, index) {
        return chimeeHelper.setStyle(key.match(/^(videoElement|container)$/) ? _this4[key] : _this4.plugins[key], 'z-index', ++index);
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
      chimeeHelper.setAttr(this[target], attr, val);
    }
  }, {
    key: 'getAttr',
    value: function getAttr$$1(target, attr) {
      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
      return chimeeHelper.getAttr(this[target], attr);
    }
  }, {
    key: 'setStyle',
    value: function setStyle$$1(target, attr, val) {
      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
      chimeeHelper.setStyle(this[target], attr, val);
    }
  }, {
    key: 'getStyle',
    value: function getStyle$$1(target, attr) {
      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
      return chimeeHelper.getStyle(this[target], attr);
    }
  }, {
    key: 'requestFullScreen',
    value: function requestFullScreen(target) {
      var methods = ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'];
      for (var i = 0, len = methods.length; i < len; i++) {
        // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
        if (chimeeHelper.isFunction(this[target][methods[i]])) {
          // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
          this[target][methods[i]]();
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'exitFullScreen',
    value: function exitFullScreen() {
      var methods = ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'];
      for (var i = 0, len = methods.length; i < len; i++) {
        // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
        if (chimeeHelper.isFunction(document[methods[i]])) {
          // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
          document[methods[i]]();
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'fullScreen',
    value: function fullScreen() {
      var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

      for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        args[_key5 - 2] = arguments[_key5];
      }

      return request ? this.requestFullScreen.apply(this, [target].concat(_toConsumableArray(args))) : this.exitFullScreen.apply(this, _toConsumableArray(args));
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
      var _this5 = this;

      this._autoFocusToVideo(this.videoElement, false);
      videoEvents.forEach(function (key, index) {
        chimeeHelper.removeEvent(_this5.videoElement, key, _this5.videoEventHandlerList[index]);
      });
      domEvents.forEach(function (key, index) {
        chimeeHelper.removeEvent(_this5.videoElement, key, _this5.videoDomEventHandlerList[index]);
        chimeeHelper.removeEvent(_this5.container, key, _this5.containerDomEventHandlerList[index]);
        chimeeHelper.removeEvent(_this5.wrapper, key, _this5.wrapperDomEventHandlerList[index]);
      });
      this.wrapper.innerHTML = this.originHTML;
      delete this.wrapper;
      delete this.videoElement;
      delete this.plugins;
    }
  }, {
    key: '_autoFocusToVideo',
    value: function _autoFocusToVideo(element) {
      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      (remove ? chimeeHelper.removeEvent : chimeeHelper.addEvent)(element, 'mouseup', this._focusToVideo, false, true);
      (remove ? chimeeHelper.removeEvent : chimeeHelper.addEvent)(element, 'touchend', this._focusToVideo, false, true);
    }
  }, {
    key: '_focusToVideo',
    value: function _focusToVideo(evt) {
      var x = window.scrollX;
      var y = window.scrollY;
      chimeeHelper.isFunction(this.videoElement.focus) && this.videoElement.focus();
      window.scrollTo(x, y);
    }
    /**
     * get the event handler for dom to bind
     */

  }, {
    key: '_getEventHandler',
    value: function _getEventHandler(key, _ref) {
      var _this6 = this;

      var penetrate = _ref.penetrate;

      if (!penetrate || ['mouseenter', 'mouseleave'].indexOf(key) < 0) {
        return function () {
          var _dispatcher$bus4;

          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          (_dispatcher$bus4 = _this6.__dispatcher.bus).triggerSync.apply(_dispatcher$bus4, [key].concat(args));
        };
      }
      var insideVideo = function insideVideo(node) {
        return _this6.__videoExtendedNodes.indexOf(node) > -1 || _this6.__videoExtendedNodes.reduce(function (flag, video) {
          if (flag) return flag;
          return chimeeHelper.isPosterityNode(video, node);
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
        if (_this6.__mouseInVideo && type === 'mouseleave' && !insideVideo(to)) {
          var _dispatcher$bus5;

          _this6.__mouseInVideo = false;
          return (_dispatcher$bus5 = _this6.__dispatcher.bus).triggerSync.apply(_dispatcher$bus5, ['mouseleave'].concat(args));
        }
        if (!_this6.__mouseInVideo && type === 'mouseenter' && insideVideo(currentTarget)) {
          var _dispatcher$bus6;

          _this6.__mouseInVideo = true;
          return (_dispatcher$bus6 = _this6.__dispatcher.bus).triggerSync.apply(_dispatcher$bus6, ['mouseenter'].concat(args));
        }
      };
    }
  }]);

  return Dom;
}(), (_applyDecoratedDescriptor$3(_class$3.prototype, 'setAttr', [_dec$3, _dec2$3], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'setAttr'), _class$3.prototype), _applyDecoratedDescriptor$3(_class$3.prototype, 'getAttr', [_dec3$3], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'getAttr'), _class$3.prototype), _applyDecoratedDescriptor$3(_class$3.prototype, 'setStyle', [_dec4$3], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'setStyle'), _class$3.prototype), _applyDecoratedDescriptor$3(_class$3.prototype, 'getStyle', [_dec5$3], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'getStyle'), _class$3.prototype), _applyDecoratedDescriptor$3(_class$3.prototype, 'requestFullScreen', [_dec6$2], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'requestFullScreen'), _class$3.prototype), _applyDecoratedDescriptor$3(_class$3.prototype, '_focusToVideo', [toxicDecorators.autobind], _Object$getOwnPropertyDescriptor(_class$3.prototype, '_focusToVideo'), _class$3.prototype)), _class$3));

var _dec$4;
var _dec2$4;
var _dec3$4;
var _class$4;
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

function numberOrVoid(value) {
  return chimeeHelper.isNumber(value) ? value : undefined;
}
function stringOrVoid(value) {
  return chimeeHelper.isString(value) ? value : undefined;
}

function accessorVideoProperty(property) {
  return toxicDecorators.accessor({
    get: function get(value) {
      return this.dispatcher.videoConfigReady && this.inited ? this.videoElement[property] : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      this.videoElement[property] = value;
      return value;
    }
  });
}

function accessorVideoAttribute(attribute) {
  var _ref = chimeeHelper.isObject(attribute) ? attribute : {
    set: attribute,
    get: attribute,
    isBoolean: false
  },
      _set = _ref.set,
      _get$$1 = _ref.get,
      isBoolean$$1 = _ref.isBoolean;

  return toxicDecorators.accessor({
    get: function get(value) {
      return this.dispatcher.videoConfigReady && this.inited ? this.videoElement[_get$$1] : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      var val = isBoolean$$1 ? value ? '' : undefined : value;
      this.dispatcher.dom.setAttr('video', _set, val);
      return value;
    }
  });
}

function accessorCustomAttribute(attribute, isBoolean$$1) {
  return toxicDecorators.accessor({
    get: function get(value) {
      var attrValue = this.dispatcher.dom.getAttr('video', attribute);
      return this.dispatcher.videoConfigReady && this.inited ? isBoolean$$1 ? !!attrValue : attrValue : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      var val = isBoolean$$1 ? value || undefined : value;
      this.dispatcher.dom.setAttr('video', attribute, val);
      return value;
    }
  });
}

var accessorMap = {
  src: [toxicDecorators.alwaysString(), toxicDecorators.accessor({
    set: function set(val) {
      if (this.needToLoadSrc) {
        // unlock it at first, to avoid deadlock
        this.needToLoadSrc = false;
        this.dispatcher.bus.emit('load', val);
      }
      return val;
    }
  }, { preSet: false }), toxicDecorators.accessor({
    set: function set(val) {
      // must check val !== this.src here
      // as we will set config.src in the video
      // the may cause dead lock
      if (this.dispatcher.readySync && this.autoload && val !== this.src) this.needToLoadSrc = true;
      return val;
    }
  })],
  autoload: toxicDecorators.alwaysBoolean(),
  autoplay: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('autoplay')],
  controls: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('controls')],
  width: [toxicDecorators.accessor({ set: numberOrVoid }), accessorVideoAttribute('width')],
  height: [toxicDecorators.accessor({ set: numberOrVoid }), accessorVideoAttribute('height')],
  crossOrigin: [toxicDecorators.accessor({ set: stringOrVoid }), accessorVideoAttribute({ set: 'crossorigin', get: 'crossOrigin' })],
  loop: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('loop')],
  defaultMuted: [toxicDecorators.alwaysBoolean(), accessorVideoAttribute({ get: 'defaultMuted', set: 'muted', isBoolean: true })],
  muted: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('muted')],
  preload: [toxicDecorators.accessor({ set: stringOrVoid }), accessorVideoAttribute('preload')],
  poster: [toxicDecorators.accessor({ set: stringOrVoid }), accessorVideoAttribute('poster')],
  playsInline: [toxicDecorators.accessor({
    get: function get(value) {
      var playsInline = this.videoElement.playsInline;
      return this.dispatcher.videoConfigReady && this.inited ? playsInline === undefined ? value : playsInline : value;
    },
    set: function set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      this.videoElement.playsInline = value;
      var val = value ? '' : undefined;
      this.dispatcher.dom.setAttr('video', 'playsinline', val);
      this.dispatcher.dom.setAttr('video', 'webkit-playsinline', val);
      this.dispatcher.dom.setAttr('video', 'x5-video-player-type', value ? 'h5' : undefined);
      return value;
    }
  }), toxicDecorators.alwaysBoolean()],
  x5VideoPlayerFullScreen: [toxicDecorators.accessor({
    set: function set(value) {
      return !!value;
    },
    get: function get(value) {
      return !!value;
    }
  }), accessorCustomAttribute('x5-video-player-fullscreen', true)],
  x5VideoOrientation: [toxicDecorators.accessor({ set: stringOrVoid }), accessorCustomAttribute('x5-video-orientation')],
  xWebkitAirplay: [toxicDecorators.accessor({
    set: function set(value) {
      return !!value;
    },
    get: function get(value) {
      return !!value;
    }
  }), accessorCustomAttribute('x-webkit-airplay', true)],
  playbackRate: [toxicDecorators.alwaysNumber(1), accessorVideoProperty('playbackRate')],
  defaultPlaybackRate: [accessorVideoProperty('defaultPlaybackRate'), toxicDecorators.alwaysNumber(1)],
  disableRemotePlayback: [toxicDecorators.alwaysBoolean(), accessorVideoProperty('disableRemotePlayback')],
  volume: [toxicDecorators.alwaysNumber(1), accessorVideoProperty('volume')]
};

var VideoConfig = (_dec$4 = toxicDecorators.initString(), _dec2$4 = toxicDecorators.initString(function (str) {
  return str.toLocaleLowerCase();
}), _dec3$4 = toxicDecorators.initArray(), (_class$4 = function () {
  _createClass(VideoConfig, [{
    key: 'lockKernelProperty',
    value: function lockKernelProperty() {
      toxicDecorators.applyDecorators(this, {
        type: toxicDecorators.lock,
        box: toxicDecorators.lock,
        runtimeOrder: toxicDecorators.lock
      }, { self: true });
    }
  }]);

  function VideoConfig(dispatcher, config) {
    _classCallCheck(this, VideoConfig);

    _initDefineProp$1(this, 'needToLoadSrc', _descriptor$1, this);

    _initDefineProp$1(this, 'inited', _descriptor2$1, this);

    this.src = '';

    _initDefineProp$1(this, 'type', _descriptor3$1, this);

    _initDefineProp$1(this, 'box', _descriptor4, this);

    _initDefineProp$1(this, 'runtimeOrder', _descriptor5, this);

    this.autoload = true;
    this.autoplay = false;
    this.controls = false;
    this.width = undefined;
    this.height = undefined;
    this.crossOrigin = undefined;
    this.loop = false;
    this.defaultMuted = false;
    this.muted = false;
    this.preload = 'auto';
    this.poster = undefined;
    this.playsInline = false;
    this.x5VideoPlayerFullScreen = false;
    this.x5VideoOrientation = undefined;
    this.xWebkitAirplay = false;
    this.playbackRate = 1;
    this.defaultPlaybackRate = 1;
    this.disableRemotePlayback = false;
    this.volume = 1;

    _initDefineProp$1(this, '_kernelProperty', _descriptor6, this);

    _initDefineProp$1(this, '_realDomAttr', _descriptor7, this);

    toxicDecorators.applyDecorators(this, accessorMap, { self: true });
    Object.defineProperty(this, 'dispatcher', {
      value: dispatcher,
      enumerable: false,
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, 'videoElement', {
      value: dispatcher.dom.videoElement,
      enumerable: false,
      writable: false,
      configurable: false
    });
    chimeeHelper.deepAssign(this, config);
  }

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
}(), (_descriptor$1 = _applyDecoratedDescriptor$4(_class$4.prototype, 'needToLoadSrc', [toxicDecorators.nonenumerable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$1 = _applyDecoratedDescriptor$4(_class$4.prototype, 'inited', [toxicDecorators.nonenumerable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3$1 = _applyDecoratedDescriptor$4(_class$4.prototype, 'type', [_dec$4, toxicDecorators.configurable], {
  enumerable: true,
  initializer: function initializer() {
    return 'vod';
  }
}), _descriptor4 = _applyDecoratedDescriptor$4(_class$4.prototype, 'box', [_dec2$4, toxicDecorators.configurable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor$4(_class$4.prototype, 'runtimeOrder', [_dec3$4, toxicDecorators.configurable], {
  enumerable: true,
  initializer: function initializer() {
    return ['html5', 'flash'];
  }
}), _descriptor6 = _applyDecoratedDescriptor$4(_class$4.prototype, '_kernelProperty', [toxicDecorators.frozen], {
  enumerable: true,
  initializer: function initializer() {
    return ['type', 'box', 'runtimeOrder'];
  }
}), _descriptor7 = _applyDecoratedDescriptor$4(_class$4.prototype, '_realDomAttr', [toxicDecorators.frozen], {
  enumerable: true,
  initializer: function initializer() {
    return ['src', 'controls', 'width', 'height', 'crossOrigin', 'loop', 'muted', 'preload', 'poster', 'autoplay', 'playsInline', 'x5VideoPlayerFullScreen', 'x5VideoOrientation', 'xWebkitAirplay', 'playbackRate', 'defaultPlaybackRate', 'autoload', 'disableRemotePlayback', 'defaultMuted', 'volume'];
  }
})), _class$4));

var _dec$1;
var _dec2$1;
var _dec3$1;
var _dec4$1;
var _dec5$1;
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
function convertNameIntoId(name) {
  if (!chimeeHelper.isString(name)) throw new Error("Plugin's name must be a string");
  return chimeeHelper.camelize(name);
}
function checkPluginConfig(config) {
  if (chimeeHelper.isFunction(config)) {
    if (!(config.prototype instanceof Plugin)) {
      throw new TypeError('If you pass a function as plugin config, this class must extends from Chimee.plugin');
    }
    return;
  }
  if (!chimeeHelper.isObject(config) || chimeeHelper.isEmpty(config)) throw new TypeError("plugin's config must be an Object");
  var name = config.name;

  if (!chimeeHelper.isString(name) || name.length < 1) throw new TypeError('plugin must have a legal name');
}
/**
 * <pre>
 * Dispatcher is the hub of plugins, user, and video kernel.
 * It take charge of plugins install, use and remove
 * It also offer a bridge to let user handle video kernel.
 * </pre>
 */
var Dispatcher = (_dec$1 = toxicDecorators.before(convertNameIntoId), _dec2$1 = toxicDecorators.before(checkPluginConfig), _dec3$1 = toxicDecorators.before(convertNameIntoId), _dec4$1 = toxicDecorators.before(convertNameIntoId), _dec5$1 = toxicDecorators.before(convertNameIntoId), (_class$1 = function () {
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

    if (!chimeeHelper.isObject(config)) throw new TypeError('UserConfig must be an Object');
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
    this._initUserPlugin(config.plugin);
    this.order.forEach(function (key) {
      return _this.plugins[key].__init(_this.videoConfig);
    });
    this.videoConfig.lockKernelProperty();
    this.videoConfigReady = true;
    this.videoConfig.init();
    /**
     * video kernel
     * @type {Kernel}
     */
    this.kernel = new Kernel(this.dom.videoElement, this.videoConfig);
    // trigger auto load event
    var asyncInitedTasks = [];
    this.order.forEach(function (key) {
      var ready = _this.plugins[key].__inited();
      if (chimeeHelper.isPromise(ready)) {
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
      if (chimeeHelper.isString(option)) option = { name: option, alias: undefined };
      if (!chimeeHelper.isObject(option) || chimeeHelper.isObject(option) && !chimeeHelper.isString(option.name)) {
        throw new TypeError('pluginConfig do not match requirement');
      }
      if (!chimeeHelper.isString(option.alias)) option.alias = undefined;
      var _option = option,
          name = _option.name,
          alias$$1 = _option.alias;

      option.name = alias$$1 || name;
      delete option.alias;
      var key = chimeeHelper.camelize(name);
      var id = chimeeHelper.camelize(alias$$1 || name);
      var pluginOption = option;
      var pluginConfig = Dispatcher.getPluginConfig(key);
      if (chimeeHelper.isEmpty(pluginConfig)) throw new TypeError('You have not installed plugin ' + key);
      if (chimeeHelper.isObject(pluginConfig)) {
        pluginConfig.id = id;
      }
      var plugin = chimeeHelper.isFunction(pluginConfig) ? new pluginConfig({ id: id }, this, pluginOption) // eslint-disable-line 
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
      if (!chimeeHelper.isObject(plugin) || !chimeeHelper.isFunction(plugin.$destroy)) {
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
      var _this2 = this;

      var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!chimeeHelper.isArray(configs)) {
        chimeeHelper.Log.warn('Dispatcher', 'UserConfig.plugin can only by an Array');
        configs = [];
      }
      return configs.map(function (config) {
        return _this2.use(config);
      });
    }
    /**
     * sort zIndex of plugins to make plugin display in order
     */

  }, {
    key: '_sortZIndex',
    value: function _sortZIndex() {
      var _this3 = this;

      var _order$reduce = this.order.reduce(function (levelSet, key) {
        var plugin = _this3.plugins[key];
        if (chimeeHelper.isEmpty(plugin)) return levelSet;
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
      var innerOrderArr = chimeeHelper.transObjectAttrIntoArray(inner);
      var outerOrderArr = chimeeHelper.transObjectAttrIntoArray(outer);
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
      return chimeeHelper.isEmpty(plugin) ? 0 : plugin.$level;
    }
  }, {
    key: '_autoloadVideoSrcAtFirst',
    value: function _autoloadVideoSrcAtFirst() {
      if (this.videoConfig.autoload) this.bus.emit('load', this.videoConfig.src);
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

      var id = chimeeHelper.camelize(name);
      if (!chimeeHelper.isEmpty(pluginConfigSet[id])) {
        chimeeHelper.Log.warn('Dispatcher', 'You have installed ' + name + ' again. And the older one will be replaced');
      }
      var pluginConfig = chimeeHelper.isFunction(config) ? config : chimeeHelper.deepAssign({ id: id }, config);
      pluginConfigSet[id] = pluginConfig;
      return id;
    }
  }, {
    key: 'hasInstalled',
    value: function hasInstalled(id) {
      return !chimeeHelper.isEmpty(pluginConfigSet[id]);
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
  }]);

  return Dispatcher;
}(), (_applyDecoratedDescriptor$1(_class$1.prototype, 'unuse', [_dec$1], _Object$getOwnPropertyDescriptor(_class$1.prototype, 'unuse'), _class$1.prototype), _applyDecoratedDescriptor$1(_class$1, 'install', [_dec2$1], _Object$getOwnPropertyDescriptor(_class$1, 'install'), _class$1), _applyDecoratedDescriptor$1(_class$1, 'hasInstalled', [_dec3$1], _Object$getOwnPropertyDescriptor(_class$1, 'hasInstalled'), _class$1), _applyDecoratedDescriptor$1(_class$1, 'uninstall', [_dec4$1], _Object$getOwnPropertyDescriptor(_class$1, 'uninstall'), _class$1), _applyDecoratedDescriptor$1(_class$1, 'getPluginConfig', [_dec5$1], _Object$getOwnPropertyDescriptor(_class$1, 'getPluginConfig'), _class$1)), _class$1));

var _class$5;
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

var GlobalConfig = (_class$5 = function () {
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
      props[key] = toxicDecorators.accessor({
        get: function get() {
          // $FlowFixMe: we have check the keys
          return chimeeHelper.Log['ENABLE_' + key.toUpperCase()];
        },
        set: function set(val) {
          // $FlowFixMe: we have check the keys
          chimeeHelper.Log['ENABLE_' + key.toUpperCase()] = val;
          if (val === true) this.silent = false;
          return val;
        }
      });
      return props;
    }, {});
    toxicDecorators.applyDecorators(this.log, props, { self: true });
  }

  return GlobalConfig;
}(), (_descriptor$2 = _applyDecoratedDescriptor$5(_class$5.prototype, '_silent', [toxicDecorators.nonenumerable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
})), _class$5);

var _dec;
var _dec2;
var _dec3;
var _dec4;
var _dec5;
var _dec6;
var _dec7;
var _dec8;
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

var Chimee = (_dec = toxicDecorators.autobindClass(), _dec2 = toxicDecorators.alias('addEventListener'), _dec3 = toxicDecorators.before(eventBinderCheck), _dec4 = toxicDecorators.before(eventBinderCheck), _dec5 = toxicDecorators.alias('removeEventListener'), _dec6 = toxicDecorators.before(eventBinderCheck), _dec7 = toxicDecorators.before(attrAndStyleCheck), _dec8 = toxicDecorators.before(attrAndStyleCheck), _dec(_class = (_class2 = (_temp = _class3 = function (_VideoWrapper) {
  _inherits(Chimee, _VideoWrapper);

  function Chimee(config) {
    _classCallCheck(this, Chimee);

    var _this = _possibleConstructorReturn(this, (Chimee.__proto__ || _Object$getPrototypeOf(Chimee)).call(this));

    _this.destroyed = false;

    _initDefineProp(_this, '__id', _descriptor, _this);

    _initDefineProp(_this, 'version', _descriptor2, _this);

    _initDefineProp(_this, 'config', _descriptor3, _this);

    if (chimeeHelper.isString(config) || chimeeHelper.isElement(config)) {
      config = {
        wrapper: config,
        controls: true
      };
    } else if (chimeeHelper.isObject(config)) {
      if (!config.wrapper) throw new Error('You must pass in an legal object');
    } else {
      throw new Error('You must pass in an Object containing wrapper or string or element to new a Chimee');
    }
    _this.__dispatcher = new Dispatcher(config, _this);
    _this.__dispatcher.kernel.on('error', _this.__throwError);
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
    /**
     * bind event handler through this function
     * @param  {string} key event's name
     * @param  {Function} fn event's handler
     */

  }, {
    key: 'on',
    value: function on(key, fn) {
      this.__dispatcher.bus.on('_vm', key, fn);
      return this;
    }
    /**
     * remove event handler through this function
     * @param  {string} key event's name
     * @param  {Function} fn event's handler
     */

  }, {
    key: 'off',
    value: function off(key, fn) {
      return this.__dispatcher.bus.off('_vm', key, fn);
    }
    /**
     * bind one time event handler
     * @param {string} key event's name
     * @param {Function} fn event's handler
     */

  }, {
    key: 'once',
    value: function once(key, fn) {
      return this.__dispatcher.bus.once('_vm', key, fn);
    }
    /**
     * emit an event
     * @param  {string}    key event's name
     * @param  {...args} args
     */

  }, {
    key: 'emit',
    value: function emit(key) {
      var _dispatcher$bus;

      if (!chimeeHelper.isString(key)) throw new TypeError('emit key parameter must be String');
      if (domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
        chimeeHelper.Log.warn('plugin', 'You are using emit to emit ' + key + ' event. As emit is wrapped in Promise. It make you can\'t use event.preventDefault and event.stopPropagation. So we advice you to use emitSync');
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_dispatcher$bus = this.__dispatcher.bus).emit.apply(_dispatcher$bus, [key].concat(_toConsumableArray(args)));
    }
    /**
     * emit a sync event
     * @param  {string}    key event's name
     * @param  {...args} args
     */

  }, {
    key: 'emitSync',
    value: function emitSync(key) {
      var _dispatcher$bus2;

      if (!chimeeHelper.isString(key)) throw new TypeError('emitSync key parameter must be String');

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return (_dispatcher$bus2 = this.__dispatcher.bus).emitSync.apply(_dispatcher$bus2, [key].concat(_toConsumableArray(args)));
    }
    /**
     * set style
     * @param {string} element optional, default to be video, you can choose from video | container | wrapper
     * @param {string} attribute the atrribue name
     * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
     */

  }, {
    key: 'css',
    value: function css(method) {
      var _dispatcher$dom;

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      // $FlowFixMe: we support this here
      return (_dispatcher$dom = this.__dispatcher.dom)[method + 'Style'].apply(_dispatcher$dom, args);
    }
    /**
    * set attr
    * @param {string} element optional, default to be video, you can choose from video | container | wrapper
    * @param {string} attribute the atrribue nameß
    * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
    */

  }, {
    key: 'attr',
    value: function attr(method) {
      var _dispatcher$dom2;

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      if (method === 'set' && /video/.test(args[0])) {
        if (!this.__dispatcher.videoConfigReady) {
          chimeeHelper.Log.warn('plugin', 'You are tring to set attribute on video before video inited. Please wait until the inited event has benn trigger');
          return args[2];
        }
        if (this.__dispatcher.videoConfig._realDomAttr.indexOf(args[1]) > -1) {
          var key = args[1],
              val = args[2];
          // $FlowFixMe: we have check the computed key

          this.__dispatcher.videoConfig[key] = val;
          return val;
        }
      }
      // $FlowFixMe: we support this here
      return (_dispatcher$dom2 = this.__dispatcher.dom)[method + 'Attr'].apply(_dispatcher$dom2, args);
    }
  }, {
    key: '__throwError',
    value: function __throwError(error) {
      if (chimeeHelper.isString(error)) error = new Error(error);
      var errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
      if (chimeeHelper.isFunction(errorHandler)) return errorHandler(error);
      if (Chimee.config.silent) return;
      throw error;
    }
  }]);

  return Chimee;
}(VideoWrapper), _class3.plugin = Plugin, _class3.config = new GlobalConfig(), _class3.install = Dispatcher.install, _class3.uninstall = Dispatcher.uninstall, _class3.hasInstalled = Dispatcher.hasInstalled, _class3.getPluginConfig = Dispatcher.getPluginConfig, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, '__id', [toxicDecorators.frozen], {
  enumerable: true,
  initializer: function initializer() {
    return '_vm';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'version', [toxicDecorators.frozen], {
  enumerable: true,
  initializer: function initializer() {
    return '0.1.3';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'config', [toxicDecorators.frozen], {
  enumerable: true,
  initializer: function initializer() {
    return {
      errorHandler: undefined
    };
  }
}), _applyDecoratedDescriptor(_class2, 'plugin', [toxicDecorators.frozen], (_init = _Object$getOwnPropertyDescriptor(_class2, 'plugin'), _init = _init ? _init.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'config', [toxicDecorators.frozen], (_init2 = _Object$getOwnPropertyDescriptor(_class2, 'config'), _init2 = _init2 ? _init2.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init2;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'install', [toxicDecorators.frozen], (_init3 = _Object$getOwnPropertyDescriptor(_class2, 'install'), _init3 = _init3 ? _init3.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init3;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'uninstall', [toxicDecorators.frozen], (_init4 = _Object$getOwnPropertyDescriptor(_class2, 'uninstall'), _init4 = _init4 ? _init4.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init4;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'hasInstalled', [toxicDecorators.frozen], (_init5 = _Object$getOwnPropertyDescriptor(_class2, 'hasInstalled'), _init5 = _init5 ? _init5.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init5;
  }
}), _class2), _applyDecoratedDescriptor(_class2, 'getPluginConfig', [toxicDecorators.frozen], (_init6 = _Object$getOwnPropertyDescriptor(_class2, 'getPluginConfig'), _init6 = _init6 ? _init6.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init6;
  }
}), _class2), _applyDecoratedDescriptor(_class2.prototype, 'on', [_dec2, _dec3], _Object$getOwnPropertyDescriptor(_class2.prototype, 'on'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'off', [_dec4, _dec5], _Object$getOwnPropertyDescriptor(_class2.prototype, 'off'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'once', [_dec6], _Object$getOwnPropertyDescriptor(_class2.prototype, 'once'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'css', [_dec7], _Object$getOwnPropertyDescriptor(_class2.prototype, 'css'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'attr', [_dec8], _Object$getOwnPropertyDescriptor(_class2.prototype, 'attr'), _class2.prototype)), _class2)) || _class);

module.exports = Chimee;
