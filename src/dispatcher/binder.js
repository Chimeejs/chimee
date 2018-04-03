// @flow
/**
 * A class to mark all the events name of certain kind of part
 * It can use to rebind the events
 */

import Bus from './bus';
import { videoEvents, domEvents, kernelEvents } from 'helper/const';
import { camelize, Log, isString } from 'chimee-helper';
import { before, runnable } from 'toxic-decorators';
import { addEvent } from 'chimee-helper-dom';

const secondaryReg = /^(before|after|_)/;

/**
 * In logic before 0.10.0, we use 'c_' and 'w_' to mark event of container and wrapper
 * we need to keep that logic work until next major version.
 * @param {string} name 事件名字
 */
function getEventTargetByOldLogic(oldName: string): { name: string, target: binderTarget } | false {
  const targetKeyReg = '^(c|w)_';
  const matches = oldName.match(targetKeyReg);
  if (matches) {
    const name = oldName.replace(targetKeyReg, '');
    const target = oldName.indexOf('c') === 0
      ? 'container'
      : 'wrapper';
    if (process.env.NODE_ENV !== 'production') {
      Log.warn(`We no longer support event names like ${oldName}. Please use ${name} and options like { target: '${target}' } instead`);
    }
    return { name, target };
  }
  return false;
}

function getEventStage(name: string): { stage: eventStage, name: string } {
  const matches = name.match(secondaryReg);
  // $FlowFixMe: We make sure it's event stage here
  const stage: eventStage = (matches && matches[0]) || 'manin';
  if (matches) {
    name = camelize(name.replace(secondaryReg, ''));
  }
  return { name, stage };
}

function getEventTargetByEventName(name: string): binderTarget {
  if (videoEvents.indexOf(name) > -1) return 'video';
  if (kernelEvents.indexOf(name) > -1) return 'kernel';
  if (domEvents.indexOf(name) > -1) return 'video-dom';
  return 'plugin';
}

function getEventInfo(key: string, options: eventOptions): rawEventInfo {
  const oldInfo = getEventTargetByOldLogic(key);
  if (oldInfo) {
    key = oldInfo.name;
    options.target = oldInfo.target;
  }
  const { stage, name } = getEventStage(key);

  if (!options.target) {
    options.target = getEventTargetByEventName(name);
  }

  return {
    name,
    stage,
    target: options.target,
  };
}

function prettifyEventParameter(id: string, key: string, fn: Function, options: eventOptions = {}): wholeEventInfo {
  const { name, target, stage } = getEventInfo(key, options);
  return {
    id,
    fn,
    name,
    target,
    stage,
  };
}

function isEventEmitalbe({
  id,
  name,
}: emitEventInfo): boolean {
  if (!name || !isString(name) || secondaryReg.test(name)) {
    Log.error('You must provide a legal event name, which is string and could not started with before/after/_');
    return false;
  }
  if (!id || !isString(id)) {
    Log.error('You must provide the id of emitter');
    return false;
  }
  return true;
}

function checkEventEmitParameter(info: emitEventInfo): emitEventInfo {
  const { name } = info;
  // $FlowFixMe: the info match requirement here
  info.target = getEventInfo(name, info).target;
  return info;
}

export default class Binder {
  kinds: binderTarget[];
  bindedEventNames: { [binderTarget]: string[] };
  bindedEventInfo: { [binderTarget]: Array<[string, Function]> };
  buses: { [binderTarget]: Bus };
  __dispatcher: Dispatcher;

  constructor(dispatcher: Dispatcher) {
    this.__dispatcher = dispatcher;
    this.kinds = [
      'kernel',
      'container',
      'wrapper',
      'video',
      'video-dom',
      'plugin',
    ];
    this.bindedEventNames = this.kinds.reduce((events, kind) => {
      events[kind] = [];
      this.buses[kind] = new Bus(dispatcher);
      return events;
    }, {});
  }

  @before(prettifyEventParameter)
  on({
    target,
    id,
    name,
    fn,
    stage,
  }: wholeEventInfo) {
    this.buses[target].on(id, name, fn, stage);
  }

  @before(prettifyEventParameter)
  off({
    target,
    id,
    name,
    fn,
    stage,
  }: wholeEventInfo) {
    this.buses[target].off(id, name, fn, stage);
  }

  @before(prettifyEventParameter)
  once({
    target,
    id,
    name,
    fn,
    stage,
  }: wholeEventInfo) {
    this.buses[target].once(id, name, fn, stage);
  }

  @runnable(isEventEmitalbe)
  @before(checkEventEmitParameter)
  emit({
    target = 'video',
    name,
    id,
  }: emitEventInfo, ...args: any[]) {
    console.log(id);
    this.buses[target].emit(name, ...args);
  }

  @runnable(isEventEmitalbe, { backup() { return false; } })
  @before(checkEventEmitParameter)
  emitSync({
    target = 'video',
    name,
    id,
  }: emitEventInfo, ...args: any[]) {
    console.log(id);
    this.buses[target].emitSync(name, ...args);
  }

  @runnable(isEventEmitalbe)
  @before(checkEventEmitParameter)
  trigger({
    target = 'video',
    name,
    id,
  }: emitEventInfo, ...args: any[]) {
    console.log(id);
    this.buses[target].trigger(name, ...args);
  }

  @runnable(isEventEmitalbe, { backup() { return false; } })
  @before(checkEventEmitParameter)
  triggerSync({
    target = 'video',
    name,
    id,
  }: emitEventInfo, ...args: any[]) {
    console.log(id);
    this.buses[target].triggerSync(name, ...args);
  }
  // Some event needs us to transfer it from the real target
  // such as dom event
  _bindEventOnTarget({
    name,
    target,
    id,
  }: {
    name: string,
    target: binderTarget,
    id: string,
  }) {
    // the plugin target do not need us to transfer
    // so we do not need to bind
    if (target === 'plugin') return;
    let fn;
    // if this event has been binded, return;
    if (this.bindedEventNames[target].indexOf(name)) return;
    // choose the correspond method to bind
    if (target === 'kernel') {
      fn = (...args) => this.triggerSync({ target, name, id: 'kernel' }, ...args);
      this.__dispatcher.kernel.on(name, fn);
    } else if (target === 'container' || target === 'wrapper') {
      const domElement = this.__dispatcher.dom[target];
      fn = (...args) => this.triggerSync({ target, name, id: target }, ...args);
      addEvent(domElement, name, fn);
    } else if (target === 'video') {
      fn = (...args) => this.trigger({ target, name, id: target }, ...args);
      addEvent(this.__dispatcher.dom.videoElement, name, fn);
    } else if (target === 'video-dom') {
      const { $penetrate: penetrate } = this.__dispatcher.plugins[id];
      if (!penetrate || [ 'mouseenter', 'mouseleave' ].indexOf(name) < 0) {
        fn = (...args) => this.triggerSync({ target, name, id: target }, ...args);
      } else {
        const dom = this.__dispatcher.dom;
        fn = (...args) => {
          const { toElement, currentTarget, relatedTarget, type } = args[0];
          const to = toElement || relatedTarget;
          if (dom.mouseInVideo && type === 'mouseleave' && !dom.insideVideo(to)) {
            dom.mouseInVideo = false;
            return this.triggerSync({ target, name, id: target }, ...args);
          }
          if (!dom.mouseInVideo && type === 'mouseenter' && dom.insideVideo(currentTarget)) {
            dom.mouseInVideo = true;
            return this.triggerSync({ target, name, id: target }, ...args);
          }
        };
      }
      addEvent(this.__dispatcher.dom.videoElement, name, fn);
    }
    // $FlowFixMe: fn must be function now
    this.bindedEventInfo[target].push([ name, fn ]);
  }
}
