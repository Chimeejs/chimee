// @flow
import {isEmpty, isArray, runRejectableQueue, runStoppableQueue, camelize, bind, isError, isVoid, isFunction, deepClone, Log} from 'chimee-helper';
import {videoEvents, kernelMethods, domEvents, domMethods} from 'helper/const';
const secondaryReg = /^(before|after|_)/;
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
export default class Bus {
  __dispatcher: Dispatcher;
  events: {
    [string]: {
      [string]: {
        [string]: Array<Function>,
        once: {
          [Function]: Array<Function>
        }
      }
    }
  };
  onceMap: {
    [string]: {
      [Function]: Array<Function>
    }
  };
  videoEventHandlerList: Array<Function>;
  videoDomEventHandlerList: Array<Function>;
  containerDomEventHandlerList: Array<Function>;
  wrapperDomEventHandlerList: Array<Function>;
  /**
   * the handler set of all events
   * @type {Object}
   * @member events
   */
  events = {};
  onceMap = {};
  /**
   * @param {Dispatcheer} dispatcher bus rely on dispatcher, so you mush pass dispatcher at first when you generate Bus.
   * @return {Bus}
   */
  constructor (dispatcher: Dispatcher) {
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
  on (id: string, key: string, fn: Function) {
    const {stage, key: eventName} = this._getEventStage(key);
    this._addEvent([eventName, stage, id], fn);
  }
  /**
   * [Can only be called in dispatcher]remove event off bus. Only suggest one by one.
   * @param  {string} id plugin's id
   * @param  {string} key event's name
   * @param  {fn} handler function
   */
  off (id: string, key: string, fn: Function) {
    const {stage, key: eventName} = this._getEventStage(key);
    const keys = [eventName, stage, id];
    const deleted = this._removeEvent(keys, fn);
    if(deleted) return;
    const handler = this._getHandlerFromOnceMap(keys, fn);
    if(isFunction(handler)) {
      this._removeEvent(keys, handler) && this._removeFromOnceMap(keys, fn, handler);
    }
  }
  /**
   * [Can only be called in dispatcher]bind event on bus and remove it once event is triggered.
   * @param  {string} id plugin's id
   * @param  {string} key event's name
   * @param  {Function} fn handler function
   */
  once (id: string, key: string, fn: Function) {
    const {stage, key: eventName} = this._getEventStage(key);
    const bus = this;
    const keys = [eventName, stage, id];
    const handler = function (...args) {
      // keep the this so that it can run
      bind(fn, this)(...args);
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
  emit (key: string, ...args: any) {
    if(key.match(secondaryReg)) {
      Log.warn('bus', 'Secondary Event could not be emit');
      return;
    }
    const event = this.events[key];
    if(isEmpty(event)) {
      return this._eventProcessor(key, {sync: false}, ...args);
    }
    const beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
    return runRejectableQueue(beforeQueue, ...args)
    .then(() => this._eventProcessor(key, {sync: false}, ...args))
    .catch(error => {
      if(isError(error)) this.__dispatcher.throwError(error);
      return Promise.reject(error);
    });
  }
  /**
   * [Can only be called in dispatcher]emit an event, which will run before -> processor period synchronize.
   * It may stop in before period.
   * @param  {string}    key event's name
   * @param  {anything} args other argument will be passed into handler
   * @return {Promise}  this promise maybe useful if the event would not trigger kernel event. In that will you can know if it runs successful. But you can know if the event been stopped by the promise.
   */
  emitSync (key: string, ...args: any) {
    if(key.match(secondaryReg)) {
      Log.warn('bus', 'Secondary Event could not be emit');
      return false;
    }
    const event = this.events[key];
    if(isEmpty(event)) {
      return this._eventProcessor(key, {sync: true}, ...args);
    }
    const beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
    return runStoppableQueue(beforeQueue, ...args) && this._eventProcessor(key, {sync: true}, ...args);
  }
  /**
   * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period
   * @param  {string}    key event's name
   * @param  {anything} args
   * @return {Promise|undefined}    you can know if event trigger finished~ However, if it's unlegal
   */
  trigger (key: string, ...args: any) {
    if(key.match(secondaryReg)) {
      Log.warn('bus', 'Secondary Event could not be emit');
      return;
    }
    const event = this.events[key];
    if(isEmpty(event)) {
      return Promise.resolve(true);
    }
    const mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
    return runRejectableQueue(mainQueue, ...args)
    .then(() => {
      const afterQueue = this._getEventQueue(event.after, this.__dispatcher.order);
      return runRejectableQueue(afterQueue, ...args);
    })
    .then(() => {
      return this._runSideEffectEvent(key, this.__dispatcher.order, ...args);
    })
    .catch(error => {
      if(isError(error)) this.__dispatcher.throwError(error);
      return this._runSideEffectEvent(key, this.__dispatcher.order, ...args);
    });
  }
   /**
   * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period in synchronize
   * @param  {string}    key event's name
   * @param  {anything} args
   * @return {boolean}    you can know if event trigger finished~ However, if it's unlegal
   */
  triggerSync (key: string, ...args: any) {
    if(key.match(secondaryReg)) {
      Log.warn('bus', 'Secondary Event could not be emit');
      return false;
    }
    const event = this.events[key];
    if(isEmpty(event)) {
      return true;
    }
    const mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
    const afterQueue = this._getEventQueue(event.after, this.__dispatcher.order);
    const result = runStoppableQueue(mainQueue, ...args) && runStoppableQueue(afterQueue, ...args);
    this._runSideEffectEvent(key, this.__dispatcher.order, ...args);
    return result;
  }
  /**
   * destroy hook which will be called when object destroy
   */
  destroy () {
    delete this.events;
    delete this.__dispatcher;
  }
  /**
   * add event into bus
   * @private
   * @param {Array} keys keys map pointing to position to put event handler
   * @param {function} fn handler to put
   */
  _addEvent (keys: Array<string>, fn: Function) {
    keys = deepClone(keys);
    const id = keys.pop();
    const target = keys.reduce((target, key) => {
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
  _removeEvent (keys: Array<string>, fn: Function) {
    keys = deepClone(keys);
    const id = keys.pop();
    let target = this.events;
    for(let i = 0, len = keys.length; i < len; i++) {
      const son = target[keys[i]];
      // if we can't find the event binder, just return
      if(isEmpty(son)) return;
      target = son;
    }
    const queue = target[id] || [];
    const index = queue.indexOf(fn);
    const hasFn = index > -1;
    // if we found handler remove it
    if(hasFn) {
      queue.splice(index, 1);
    }
    // if this plugin has no event binding, we remove this event session, which make us perform faster in emit & trigger period.
    if(queue.length < 1) {
      delete target[id];
    }
    return hasFn;
  }
  _addToOnceMap (keys: Array<string>, fn: Function, handler: Function) {
    const key = keys.join('-');
    const map = this.onceMap[key] = this.onceMap[key] || new Map();
    if(!map.has(fn)) map.set(fn, []);
    const handlers = map.get(fn);
    // $FlowFixMe: flow do not understand map yet
    handlers.push(handler);
  }
  _removeFromOnceMap (keys: Array<string>, fn: Function, handler: Function) {
    const key = keys.join('-');
    const map = this.onceMap[key];
    // do not need to check now
    // if(isVoid(map) || !map.has(fn)) return;
    const handlers = map.get(fn);
    const index = handlers.indexOf(handler);
    handlers.splice(index, 1);
    if(isEmpty(handlers)) map.delete(fn);
  }
  _getHandlerFromOnceMap (keys: Array<string>, fn: Function) {
    const key = keys.join('-');
    const map = this.onceMap[key];
    if(isVoid(map) || !map.has(fn)) return;
    const handlers = map.get(fn);
    return handlers[0];
  }
  /**
   * get event stage by evnet key name
   * @private
   * @param  {key} key event's name
   * @return {stage}  event stage
   */
  _getEventStage (key: string) {
    const secondaryCheck = key.match(secondaryReg);
    const stage = (secondaryCheck && secondaryCheck[0]) || 'main';
    if(secondaryCheck) {
      key = camelize(key.replace(secondaryReg, ''));
    }
    return {stage, key};
  }
  /**
   * get event handlers queue to run
   * @private
   * @param  {Object} handlerSet the object include all handler
   * @param  {Array} Array form of plugin id
   * @return {Array<Function>} event handler in queue to run
   */
  _getEventQueue (handlerSet: Object, order: PluginOrder) {
    order = isArray(order) ? order.concat(['_vm']) : ['_vm'];
    return isEmpty(handlerSet)
      ? []
      : order.reduce((queue, id) => {
        if(isEmpty(handlerSet[id]) ||
          !isArray(handlerSet[id]) ||
          // in case plugins is missed
          // _vm indicate the user. This is the function for user
          (!this.__dispatcher.plugins[id] && id !== '_vm')) {
          return queue;
        }
        return queue.concat(handlerSet[id].map(fn => {
          // bind context for plugin instance
          return bind(fn, this.__dispatcher.plugins[id] || this.__dispatcher.vm);
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
  _eventProcessor (key: string, {sync}: {sync: boolean}, ...args: any) {
    const isKernelMethod: boolean = kernelMethods.indexOf(key) > -1;
    const isDomMethod: boolean = domMethods.indexOf(key) > -1;
    if(isKernelMethod || isDomMethod) {
      this.__dispatcher[isKernelMethod ? 'kernel' : 'dom'][key](...args);
      if(videoEvents.indexOf(key) > -1 ||
        domEvents.indexOf(key) > -1) return true;
    }
    // $FlowFixMe: flow do not support computed sytax on classs, but it's ok here
    return this[sync ? 'triggerSync' : 'trigger'](key, ...args);
  }
  /**
   * run side effect period
   * @param  {string}    key event's name
   * @param  {args} args
   */
  _runSideEffectEvent (key: string, order: PluginOrder, ...args: any) {
    const event = this.events[key];
    if(isEmpty(event)) {
      return;
    }
    const queue = this._getEventQueue(event['_'], order);
    queue.forEach(run => run(...args));
    return true;
  }
};
