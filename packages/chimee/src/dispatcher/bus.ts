import { chimeeLog } from 'chimee-helper-log';
import { dispatcherEventMethodMap, isDispatcherEventMethod, isDomEvent, isVideoEvent, selfProcessorEvents } from 'const/event';
import { isDomMethod, isKernelMethod } from 'const/method';
import { secondaryEventReg } from 'const/regExp';
import Dispatcher from 'dispatcher/index';
import { deletePropertyIfItIsEmpty, runRejectableQueue, runStoppableQueue } from 'helper/utils';
import { bind, isArray, isEmpty, isError, isFunction, isNil } from 'lodash';
import { runnable } from 'toxic-decorators';
import { BinderTarget, EventStage } from 'typings/base';

function secondaryChecker(key: string) {
  if (key.match(secondaryEventReg)) {
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production') {
      chimeeLog.warn('bus', `Secondary Event "${key}" could not be call straightly by API.`);
    }
    return false;
  }
  return true;
}

function getKeyForOnceMap(eventName: string, stage: EventStage, pluginId: string) {
  return `${eventName}-${stage}-${pluginId}`;
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
export default class Bus {
  public dispatcher: Dispatcher;
  private events: {
    [eventName: string]: {
      [eventStage: string]: {
        [pluginId: string]: Array<(...args: any[]) =>  any>,
      },
    },
  };
  private kind: BinderTarget;
  private onceMap: {
    [key: string]: Map<(...args: any[]) => any, Array<(...args: any[]) => any>>,
  };
  /**
   * @param {Dispatcher} dispatcher bus rely on dispatcher, so you mush pass dispatcher at first when you generate Bus.
   * @return {Bus}
   */
  constructor(dispatcher: Dispatcher, kind: BinderTarget) {
    /**
     * the referrence to dispatcher
     * @type {Dispatcher}
     */
    this.dispatcher = dispatcher;
    this.kind = kind;
    this.events = {};
    this.onceMap = {};
  }
  /**
   * destroy hook which will be called when object destroy
   */
  public destroy(): void {
    delete this.events;
    delete this.dispatcher;
  }
  /**
   * [Can only be called in dispatcher]emit an event, which will run before -> processor period.
   * It may stop in before period.
   * @param  {string}    key event's name
   * @param  {anything} args other argument will be passed into handler
   * @return {Promise}  this promise maybe useful if the event would not trigger kernel event. In that will you can know if it runs successful. But you can know if the event been stopped by the promise.
   */
  @runnable(secondaryChecker)
  public emit(key: string, ...args: any): Promise<any> {
    const event = this.events[key];
    if (isEmpty(event)) {
      if (selfProcessorEvents.indexOf(key) > -1) { return Promise.resolve(); }
      // $FlowFixMe: conditional return here
      return this.eventProcessor(key, { sync: false }, ...args);
    }
    const beforeQueue = this.getEventQueue(event.before);
    return runRejectableQueue(beforeQueue, ...args)
      .then(() => {
        if (selfProcessorEvents.indexOf(key) > -1) { return; }
        return this.eventProcessor(key, { sync: false }, ...args);
      })
      .catch((error) => {
        if (isError(error)) { this.dispatcher.throwError(error); }
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
  @runnable(secondaryChecker, { backup() { return false; } })
  public emitSync(key: string, ...args: any): boolean {
    const event = this.events[key];
    if (isEmpty(event)) {
      if (selfProcessorEvents.indexOf(key) > -1) { return true; }
      return this.eventProcessor(key, { sync: true }, ...args);
    }
    const beforeQueue = this.getEventQueue(event.before);
    return runStoppableQueue(beforeQueue, ...args) && (selfProcessorEvents.indexOf(key) > -1 ||
      // $FlowFixMe: conditional return here
      this.eventProcessor(key, { sync: true }, ...args));
  }
  public hasEvents() {
    return !isEmpty(this.events);
  }
  /**
   * [Can only be called in dispatcher]remove event off bus. Only suggest one by one.
   */
  public off(pluginId: string, eventName: string, fn: (...args: any[]) => any, stage: EventStage) {
    const deleted = this.removeEvent({
      eventName,
      fn,
      pluginId,
      stage,
    });
    if (deleted) { return; }
    // if we can't find the normal events
    // maybe this event is bind once
    const handler = this.getFirstHandlerFromOnceMap({
      eventName,
      fn,
      pluginId,
      stage,
    });
    if (isFunction(handler)) {
      const deleted = this.removeEvent({
        eventName,
        fn: handler,
        pluginId,
        stage,
      });
      if (deleted) {
        this.removeFromOnceMap({
          eventName,
          fn,
          handler,
          pluginId,
          stage,
        });
      }
    }
  }
  /**
   * [Can only be called in dispatcher]bind event on bus.
   */
  public on(pluginId: string, eventName: string, fn: (...args: any[]) => any, stage: EventStage) {
    this.addEvent({ eventName, stage, pluginId, fn });
  }
  /**
   * [Can only be called in dispatcher]bind event on bus and remove it once event is triggered.
   */
  public once(pluginId: string, eventName: string, fn: (...args: any[]) => any, stage: EventStage) {
    const bus = this;
    const handler = function(...args: any[]) {
      // keep the this so that it can run
      bind(fn, this)(...args);
      bus.removeEvent({
        eventName,
        fn: handler,
        pluginId,
        stage,
      });
      bus.removeFromOnceMap({
        eventName,
        fn,
        handler,
        pluginId,
        stage,
      });
    };
    this.addEvent({
      eventName,
      fn: handler,
      pluginId,
      stage,
    });
    this.addToOnceMap({
      eventName,
      fn,
      handler,
      pluginId,
      stage,
    });
  }
  /**
   * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period
   * @param  {string}    key event's name
   * @param  {anything} args
   * @return {Promise|undefined}    you can know if event trigger finished~ However, if it's unlegal
   */
  @runnable(secondaryChecker)
  public trigger(key: string, ...args: any): Promise<any> {
    const event = this.events[key];
    if (isEmpty(event)) {
      return Promise.resolve(true);
    }
    const mainQueue = this.getEventQueue(event.main);
    return runRejectableQueue(mainQueue, ...args)
      .then(() => {
        const afterQueue = this.getEventQueue(event.after);
        return runRejectableQueue(afterQueue, ...args);
      })
      .then(() => {
        return this.runSideEffectEvent(key, ...args);
      })
      .catch((error) => {
        if (isError(error)) { this.dispatcher.throwError(error); }
        return this.runSideEffectEvent(key, ...args);
      });
  }
  /**
   * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period in synchronize
   * @param  {string}    key event's name
   * @param  {anything} args
   * @return {boolean}    you can know if event trigger finished~ However, if it's unlegal
   */
  @runnable(secondaryChecker, { backup() { return false; } })
  public triggerSync(key: string, ...args: any): boolean {
    const event = this.events[key];
    if (isEmpty(event)) {
      return true;
    }
    const mainQueue = this.getEventQueue(event.main);
    const afterQueue = this.getEventQueue(event.after);
    const result = runStoppableQueue(mainQueue, ...args) && runStoppableQueue(afterQueue, ...args);
    this.runSideEffectEvent(key, ...args);
    return result;
  }
  /**
   * add event into bus
   * @private
   * @param {Array} keys keys map pointing to position to put event handler
   * @param {function} fn handler to put
   */
  private addEvent({
    eventName,
    stage,
    pluginId,
    fn,
  }: {
    eventName: string,
    fn: (...args: any[]) => any,
    pluginId: string,
    stage: EventStage,
  }): void {
    this.events[eventName] = this.events[eventName] || {};
    this.events[eventName][stage] = this.events[eventName][stage] || {};
    this.events[eventName][stage][pluginId] = this.events[eventName][stage][pluginId] || ([] as Array<(...args: any[]) => any>);
    this.events[eventName][stage][pluginId].push(fn);
  }
  private addToOnceMap({
    eventName,
    stage,
    pluginId,
    fn,
    handler,
  }: {
    eventName: string,
    fn: (...args: any[]) => any,
    handler: (...args: any[]) => any,
    pluginId: string,
    stage: EventStage,
  }): void {
    const key = getKeyForOnceMap(eventName, stage, pluginId);
    const map = this.onceMap[key] = this.onceMap[key] || new Map();
    if (!map.has(fn)) {
      map.set(fn, []);
    }
    const handlers = map.get(fn);
    handlers.push(handler);
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
  private eventProcessor(key: string, { sync }: {sync: true}, ...args: any): boolean;
  private eventProcessor(key: string, { sync }: {sync: false}, ...args: any): Promise<any>;
  private eventProcessor(key: string, { sync }: {sync: boolean}, ...args: any): Promise<any> | boolean {
    if (isDispatcherEventMethod(key)) {
      this.dispatcher[dispatcherEventMethodMap[key]](...args);
    } else if (isKernelMethod(key)) {
      this.dispatcher.kernel[key](...args);
    } else if (isDomMethod(key)) {
      this.dispatcher.dom[key](...args);
    }

    if (isVideoEvent(key) || isDomEvent(key)) {
      return true;
    }
    return this[sync ? 'triggerSync' : 'trigger'](key, ...args);
  }
  /**
   * get event handlers queue to run
   * @private
   * @param  {Object} handlerSet the object include all handler
   * @param  {Array} Array form of plugin id
   * @return {Array<Function>} event handler in queue to run
   */
  private getEventQueue(handlerSet: { [pluginId: string]: Array<(...args: any[]) => any> }): Array<(...args: any[]) => any> {
    // TODO: it may no to need to concat everytime
    const order = this.dispatcher.order.concat([ '_vm' ]);
    return isEmpty(handlerSet)
      ? []
      : order.reduce((queue: Array<(...args: any[]) => any>, id: string) => {
        if (isEmpty(handlerSet[id]) ||
          !isArray(handlerSet[id]) ||
          // in case plugins is missed
          // _vm indicate the user. This is the function for user
          (!this.dispatcher.plugins[id] && id !== '_vm')) {
          return queue;
        }
        return queue.concat(handlerSet[id].map((fn) => {
          // bind context for plugin instance
          return bind(fn, this.dispatcher.plugins[id] || this.dispatcher.vm);
        }));
      }, []);
  }

  private getFirstHandlerFromOnceMap({
    eventName,
    stage,
    pluginId,
    fn,
  }: {
    eventName: string,
    fn: (...args: any[]) => any,
    pluginId: string,
    stage: EventStage,
  }): (...args: any[]) => any | void {
    const key = getKeyForOnceMap(eventName, stage, pluginId);
    const map = this.onceMap[key];
    if (isNil(map) || !map.has(fn)) { return; }
    const handlers = map.get(fn);
    return handlers[0];
  }
  /**
   * remove event from bus
   * @private
   * @param {Array} keys keys map pointing to position to get event handler
   * @param {function} fn handler to put
   */
  private removeEvent({
    eventName,
    stage,
    pluginId,
    fn,
  }: {
    eventName: string,
    fn: (...args: any[]) => any,
    pluginId: string,
    stage: EventStage,
  }): boolean {
    const eventsForEventName = this.events[eventName];
    if (!eventsForEventName) {
      return;
    }
    const eventsForStage = eventsForEventName[stage];
    if (!eventsForStage) {
      return;
    }

    const eventsForPlugin = eventsForStage[pluginId];
    if (!eventsForPlugin) {
      return;
    }

    const index = eventsForPlugin.indexOf(fn);
    const hasFn = index > -1;
    if (hasFn) {
      eventsForPlugin.splice(index, 1);
    }
    // if this plugin has no event binding, we remove this event session, which make us perform faster in emit & trigger period.
    deletePropertyIfItIsEmpty(eventsForStage, pluginId);
    deletePropertyIfItIsEmpty(eventsForEventName, stage);
    deletePropertyIfItIsEmpty(this.events, eventName);
    return hasFn;
  }
  private removeFromOnceMap({
    eventName,
    stage,
    pluginId,
    fn,
    handler,
  }: {
    eventName: string,
    fn: (...args: any[]) => any,
    handler: (...args: any[]) => any,
    pluginId: string,
    stage: EventStage,
  }): void {
    const key = getKeyForOnceMap(eventName, stage, pluginId);
    const map = this.onceMap[key];
    if (isNil(map) || !map.has(fn)) {
      return;
    }
    const handlers = map.get(fn);
    const index = handlers.indexOf(handler);
    handlers.splice(index, 1);
    if (isEmpty(handlers)) {
      map.delete(fn);
    }
  }
  /**
   * run side effect period
   * @param  {string}    key event's name
   * @param  {args} args
   */
  private runSideEffectEvent(key: string, ...args: any): boolean {
    const event = this.events[key];
    if (isEmpty(event)) {
      return false;
    }
    const queue = this.getEventQueue(event._);
    queue.forEach((run) => run(...args));
    return true;
  }
}
