/**
 * A class to mark all the events name of certain kind of part
 * It can use to rebind the events
 */

import { chimeeLog } from 'chimee-helper-log';
import { off, on } from 'dom-helpers/events';
import { domEvents, esFullscreenEvents, isMustListenVideoDomEvent, kernelEvents, mustListenVideoDomEvents, passiveEvents, videoEvents } from 'helper/const';
import { camelCase, isEmpty, isFunction, isString } from 'lodash';
import { before, runnable } from 'toxic-decorators';
import Bus, { binderTarget, eventStage, secondaryReg } from './bus';
import ChimeeKernel from './kernel';
// import Dispatcher from './index';

// TODO: change later
type Dispatcher = any;

type rawEventInfo = {
  fn: (...args: any[]) => any,
  id: string,
  name: string,
  stage?: eventStage;
  target?: binderTarget;
};

type additionalEventInfo = {
  name: string,
  stage: eventStage,
  target: binderTarget,
};

type emitEventInfo = {
  id: string,
  name: string,
  target: binderTarget,
};

type wholeEventInfo = {
  fn: (...args: any[]) => any,
  id: string,
  name: string,
  stage: eventStage,
  target: binderTarget,
};

/**
 * In logic before 0.10.0, we use 'c_' and 'w_' to mark event of container and wrapper
 * we need to keep that logic work until next major version.
 * @param {string} name
 */
function getEventTargetByOldLogic(oldName: string): { name: string, target: binderTarget } | false {
  const targetKeyReg = new RegExp('^(c|w)_');
  const matches = oldName.match(targetKeyReg);
  if (matches) {
    const name = oldName.replace(targetKeyReg, '');
    const target = oldName.indexOf('c') === 0
      ? 'container'
      : 'wrapper';
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production') {
      chimeeLog.warn(`We no longer support event names like ${oldName}. Please use ${name} and options like { target: '${target}' } instead`);
    }
    return { name, target };
  } else if (oldName === 'error') {
    return { name: 'error', target: 'kernel' };
  }
  return false;
}

function getEventStage(name?: string): { name: string, stage: eventStage } {
  const matches = name.match(secondaryReg);
  const stage = ((matches && matches[0]) || 'main') as eventStage;
  if (matches) {
    name = camelCase(name.replace(secondaryReg, ''));
  }
  return { name, stage };
}

function getEventTargetByEventName(name: string): binderTarget {
  if (videoEvents.indexOf(name) > -1) { return 'video'; }
  if (kernelEvents.indexOf(name) > -1) { return 'kernel'; }
  if (domEvents.indexOf(name) > -1) { return 'video-dom'; }
  if (esFullscreenEvents.indexOf(name) > -1) { return 'esFullscreen'; }
  return 'plugin';
}

function getEventInfo({ name, target, stage }: { name: string, stage?: eventStage, target?: binderTarget }): additionalEventInfo {
  const oldInfo = getEventTargetByOldLogic(name);
  if (oldInfo) {
    name = oldInfo.name;
    target = oldInfo.target;
  }
  const { stage: newStage, name: newName } = getEventStage(name);
  name = newName;

  if (!target) {
    target = getEventTargetByEventName(name);
  }

  return {
    name,
    stage: stage || newStage,
    target,
  };
}

function prettifyEventParameter(info: rawEventInfo): wholeEventInfo {
  const { id, fn } = info;
  const { name, target, stage } = getEventInfo(info);
  if (!isFunction(fn)) {
    throw new Error(`You must provide a function to handle with event ${name}, but not ${typeof fn}`);
  }
  return {
    fn,
    id,
    name,
    stage,
    target,
  };
}

function isEventEmitalbe({
  id,
  name,
}: emitEventInfo): boolean {
  if (!name || !isString(name) || secondaryReg.test(name)) {
    chimeeLog.error('You must provide a legal event name, which is string and could not started with before/after/_');
    return false;
  }
  if (!id || !isString(id)) {
    chimeeLog.error('You must provide the id of emitter');
    return false;
  }
  return true;
}

function checkEventEmitParameter(info: emitEventInfo, ...args: any[]): Array<emitEventInfo | any[]> {
  info.target = getEventInfo(info).target;
  return [ info, ...args ];
}

export default class Binder {
  private bindedEventInfo: { [key in binderTarget]: Array<[string, (...args: any[]) => any]> };
  private bindedEventNames: { [key in binderTarget]: string[] };
  private buses: { [key in binderTarget]: Bus };
  private dispatcher: Dispatcher;
  private kinds: binderTarget[];
  private pendingEventsInfo: { [key in binderTarget]: Array<[string, string]> };

  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
    this.kinds = [
      'kernel',
      'container',
      'wrapper',
      'video',
      'video-dom',
      'plugin',
      'esFullscreen',
    ];
    this.buses = ({} as { [key in binderTarget]: Bus });
    this.bindedEventNames = ({} as { [key in binderTarget]: string[] });
    this.bindedEventInfo = ({} as { [key in binderTarget]: Array<[string, (...args: any[]) => any]> });
    this.pendingEventsInfo = ({} as { [key in binderTarget]: Array<[string, string]> });
    for (const kind of this.kinds) {
      this.bindedEventNames[kind] = [];
      this.bindedEventInfo[kind] = [];
      this.pendingEventsInfo[kind] = [];
      this.buses[kind] = new Bus(dispatcher, kind);
    }
  }

  public addPendingEvent(target: binderTarget, name: string, id: string) {
    this.pendingEventsInfo[target].push([ name, id ]);
  }

  public applyPendingEvents(target: binderTarget) {
    const pendingEvents = this.pendingEventsInfo[target];
    const pendingEventsCopy = pendingEvents.splice(0, pendingEvents.length);
    while (pendingEventsCopy.length) {
      const [ name, id ] = pendingEventsCopy.pop();
      this.addEventListenerOnTarget({ name, target, id });
    }
  }

  // when we create a penetrate plugin, we need to rebind video events on it
  public bindEventOnPenetrateNode(node: Element, remove: boolean = false) {
    this.bindedEventInfo['video-dom']
      .forEach(([ name, fn ]) => {
        remove
          ? off(node, name, fn)
          : on(node, name, fn);
      });
  }

  // when we switch kernel, we will create a new video.
  // we need to transfer the event from the oldvideo to it.
  public bindEventOnVideo(node: Element, remove: boolean = false) {
    this.bindedEventInfo['video-dom']
      .concat(this.bindedEventInfo.video)
      .forEach(([ name, fn ]) => {
        remove
          ? off(node, name, fn)
          : on(node, name, fn);
      });
  }

  // when we destroy, we remove all binder
  public destroy() {
    this.kinds.forEach((target) => {
      if (target === 'kernel') {
        this.bindedEventInfo.kernel.forEach(([ name, fn ]) => {
          this.dispatcher.kernel.off(name, fn);
        });
      } else {
        const targetDom = this.getTargetDom(target);
        this.bindedEventInfo[target].forEach(([ name, fn ]) => {
          off(targetDom, name, fn);

          if (target === 'video-dom') {
            this.dispatcher.dom.videoExtendedNodes.forEach((node) => off(node, name, fn));
          }
        });
      }
      this.bindedEventInfo.kernel = [];
      this.bindedEventNames.kernel = [];
    });
  }

  @runnable(isEventEmitalbe)
  @before(checkEventEmitParameter)
  public emit(
    {
      target,
      name,
    }: emitEventInfo,
    ...args: any[]) {
    return this.buses[target].emit(name, ...args);
  }

  @runnable(isEventEmitalbe, { backup() { return false; } })
  @before(checkEventEmitParameter)
  public emitSync(
    {
      target,
      name,
    }: emitEventInfo,
    ...args: any[]) {
    return this.buses[target].emitSync(name, ...args);
  }

  // As penetrate plugin is considered to be part of video
  // we need to transfer event for it
  // so we need some specail event handler
  public listenOnMouseMoveEvent(node: Element) {
    const dom = this.dispatcher.dom;
    const target = 'video-dom';
    const id = '_vm';
    mustListenVideoDomEvents.forEach((name) => {
      const fn = (...args: any[]) => {
        const { toElement, currentTarget, relatedTarget, type } = args[0];
        const to = toElement || relatedTarget;
        // As we support penetrate plugin, the video dom event may be differnet.
        if (dom.mouseInVideo && type === 'mouseleave' && !dom.isNodeInsideVideo(to)) {
          dom.mouseInVideo = false;
          return this.triggerSync({
            id,
            name,
            target,
          }, ...args);
        }
        if (!dom.mouseInVideo && type === 'mouseenter' && dom.isNodeInsideVideo(currentTarget)) {
          dom.mouseInVideo = true;
          return this.triggerSync({
            id,
            name,
            target,
          }, ...args);
        }
      };
      on(node, name, fn);
      // this function is only used once now
      // so we do not cover this branch
      // but we still keep this judegement
      /* istanbul ignore else  */
      if (this.bindedEventNames[target].indexOf(name) < 0) {
        this.bindedEventNames[target].push(name);
        // $FlowFixMe: fn must be function now
        this.bindedEventInfo[target].push([ name, fn ]);
      }
    });
  }

  // When we switch kernel, we need to rebind the events
  public migrateKernelEvent(oldKernel: ChimeeKernel, newKernel: ChimeeKernel) {
    const bindedEventInfoList = this.bindedEventInfo.kernel;
    bindedEventInfoList.forEach(([ name, fn ]) => {
      oldKernel.off(name, fn);
      newKernel.on(name, fn);
    });
  }

  @before(prettifyEventParameter)
  public off({
    target,
    id,
    name,
    fn,
    stage,
  }: wholeEventInfo) {
    const ret = this.buses[target].off(id, name, fn, stage);
    this.removeEventListenerOnTargetWhenIsUseless({ name, target });
    return ret;
  }

  @before(prettifyEventParameter)
  public on({
    target,
    id,
    name,
    fn,
    stage,
  }: wholeEventInfo) {
    this.addEventListenerOnTarget({
      id,
      name,
      target,
    });
    return this.buses[target].on(id, name, fn, stage);
  }

  @before(prettifyEventParameter)
  public once({
    target,
    id,
    name,
    fn,
    stage,
  }: wholeEventInfo) {
    return this.buses[target].once(id, name, fn, stage);
  }

  @runnable(isEventEmitalbe)
  @before(checkEventEmitParameter)
  public trigger(
    {
      target,
      name,
    }: emitEventInfo,
    ...args: any[]) {
    return this.buses[target].trigger(name, ...args);
  }

  @runnable(isEventEmitalbe, { backup() { return false; } })
  @before(checkEventEmitParameter)
  public triggerSync({
    target,
    name,
    // id,
  }: emitEventInfo,  ...args: any[]) {
    return this.buses[target].triggerSync(name, ...args);
  }

  // Some event needs us to transfer it from the real target
  // such as dom event
  private addEventListenerOnTarget({
    name,
    target,
    id,
  }: {
    id: string,
    name: string,
    target: binderTarget,
  }) {
    if (!this.isEventNeedToBeHandled(target, name)) { return; }
    let fn: (...args: any[]) => any;
    // if this event has been binded, return;
    if (this.bindedEventNames[target].indexOf(name) > -1) { return; }
    const targetDom = this.getTargetDom(target);
    // choose the correspond method to bind
    if (target === 'kernel') {
      if (!this.dispatcher.kernel) {
        this.addPendingEvent(target, name, id);
        return;
      }
      fn = (...args) => this.triggerSync({ target, name, id: 'kernel' }, ...args);
      this.dispatcher.kernel.on(name, fn);
    } else if (target === 'container' || target === 'wrapper') {
      fn = (...args) => this.triggerSync({ target, name, id: target }, ...args);
      on(targetDom, name, fn);
    } else if (target === 'video') {
      fn = (...args) => this.trigger({ target, name, id: target }, ...args);
      on(targetDom, name, fn);
    } else if (target === 'video-dom') {
      fn = (...args) => this.triggerSync({ target, name, id: target }, ...args);
      this.dispatcher.dom.videoExtendedNodes.forEach((node) => on(node, name, fn));
      on(targetDom, name, fn);
    }
    this.bindedEventNames[target].push(name);
    // $FlowFixMe: fn must be function now
    this.bindedEventInfo[target].push([ name, fn ]);
  }

  private getTargetDom(target: binderTarget): Element {
    let targetDom;
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

  private isEventNeedToBeHandled(target: binderTarget, name: string): boolean {
    // the plugin target do not need us to transfer
    // we have listened on esFullscreen in dom
    // we have listened mustListenVideoDomEvents
    // so the events above do not need to rebind
    return target !== 'plugin' &&
      target !== 'esFullscreen' &&
      (!isMustListenVideoDomEvent(name) || target !== 'video');
  }

  // when we off one event, we can remove the useless binder
  // actually we should remove on once event too
  // but it seems ugliy
  // TODO: add this function on once event too
  private removeEventListenerOnTargetWhenIsUseless({
    name,
    target,
  }: {
    name: string,
    target: binderTarget,
  }) {
    if (!this.isEventNeedToBeHandled(target, name)) { return; }
    const eventNamesList = this.bindedEventNames[target];
    const nameIndex = eventNamesList.indexOf(name);
    // if we have not bind this event before, we omit it
    if (nameIndex < 0) { return; }
    // if the buses still have another function on bind, we do not need to remove the binder
    if (this.buses[target].hasEvents()) { return; }

    // we fetch the binded function from bindedEventInfo
    const bindedEventInfoList = this.bindedEventInfo[target];
    let fn: (...args: any[]) => any;
    let index;
    for (index = 0; index < bindedEventInfoList.length; index++) {
      if (bindedEventInfoList[index][0] === name) {
        fn = bindedEventInfoList[index][1];
        break;
      }
    }
    if (!isFunction(fn)) { return; }

    if (target === 'kernel') {
      this.dispatcher.kernel.off(name, fn);
    } else {
      const targetDom = this.getTargetDom(target);

      off(targetDom, name, fn);

      // When we remove something on video dom, we also need to remove event on penetrate plugin
      if (target === 'video-dom') {
        this.dispatcher.dom.videoExtendedNodes.forEach((node) => {
          off(node, name, fn);
        });
      }
    }

    bindedEventInfoList.splice(index, 1);
    eventNamesList.splice(nameIndex, 1);
  }
}
