/**
 * A class to mark all the events name of certain kind of part
 * It can use to rebind the events
 */
import { isMustListenVideoDomEvent, mustListenVideoDomEvents } from 'const/event';
import Bus from 'dispatcher/bus';
import Dispatcher from 'dispatcher/index';
import ChimeeKernel from 'dispatcher/kernel';
import { off as removeEvent, on as addEvent } from 'dom-helpers/events';
import { isEventEmitalbe, prettifyEventParameter } from 'helper/binder';
import { isFunction } from 'lodash';
import { runnable } from 'toxic-decorators';
import { BinderTarget, EventStage, RawEventInfo } from 'typings/base';

export default class Binder {
  private bindedEventInfo: { [key in BinderTarget]: Array<[string, (...args: any[]) => any]> };
  private bindedEventNames: { [key in BinderTarget]: string[] };
  private buses: { [key in BinderTarget ]: Bus };
  private dispatcher: Dispatcher;
  private kinds: BinderTarget [];
  private pendingEventsInfo: { [key in BinderTarget ]: Array<[string, string]> };

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
    this.buses = ({} as { [key in BinderTarget ]: Bus });
    this.bindedEventNames = ({} as { [key in BinderTarget ]: string[] });
    this.bindedEventInfo = ({} as { [key in BinderTarget ]: Array<[string, (...args: any[]) => any]> });
    this.pendingEventsInfo = ({} as { [key in BinderTarget ]: Array<[string, string]> });
    for (const kind of this.kinds) {
      this.bindedEventNames[kind] = [];
      this.bindedEventInfo[kind] = [];
      this.pendingEventsInfo[kind] = [];
      this.buses[kind] = new Bus(dispatcher, kind);
    }
  }

  public addPendingEvent(target: BinderTarget , name: string, id: string) {
    this.pendingEventsInfo[target].push([ name, id ]);
  }

  public applyPendingEvents(target: BinderTarget ) {
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
          ? removeEvent(node, name, fn)
          : addEvent(node, name, fn);
      });
  }

  // when we switch kernel, we will create a new video.
  // we need to transfer the event from the oldvideo to it.
  public bindEventOnVideo(node: Element, remove: boolean = false) {
    this.bindedEventInfo['video-dom']
      .concat(this.bindedEventInfo.video)
      .forEach(([ name, fn ]) => {
        remove
          ? removeEvent(node, name, fn)
          : addEvent(node, name, fn);
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
          removeEvent(targetDom, name, fn);

          if (target === 'video-dom') {
            this.dispatcher.dom.videoExtendedNodes.forEach((node) => removeEvent(node, name, fn));
          }
        });
      }
      this.bindedEventInfo.kernel = [];
      this.bindedEventNames.kernel = [];
    });
  }

  @runnable(isEventEmitalbe)
  public emit(
    {
      name,
      stage,
      target: rawTarget,
    }: {
      id: string;
      name: string;
      stage?: EventStage;
      target?: BinderTarget | void;
    },
    ...args: any[]) {
    const { target } = getEventInfo({ name, target: rawTarget, stage });
    return this.buses[target].emit(name, ...args);
  }

  @runnable(isEventEmitalbe, { backup() { return false; } })
  public emitSync(
    {
      name,
      stage,
      target: rawTarget,
    }: {
      id: string;
      name: string;
      stage?: EventStage;
      target?: BinderTarget | void;
    },
    ...args: any[]) {
    const { target } = getEventInfo({ name, target: rawTarget, stage });
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
      addEvent(node, name, fn);
      // this function is only used once now
      // so we do not cover this branch
      // but we still keep this judegement
      /* istanbul ignore else  */
      if (this.bindedEventNames[target].indexOf(name) < 0) {
        this.bindedEventNames[target].push(name);
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

  public off(info: RawEventInfo) {
    const { id, name, fn, stage, target } = prettifyEventParameter(info);
    const ret = this.buses[target].off(id, name, fn, stage);
    this.removeEventListenerOnTargetWhenIsUseless({ name, target });
    return ret;
  }

  public on(info: RawEventInfo) {
    const { id, name, fn, stage, target } = prettifyEventParameter(info);
    this.addEventListenerOnTarget({
      id,
      name,
      target,
    });
    return this.buses[target].on(id, name, fn, stage);
  }

  public once(info: RawEventInfo) {
    const { id, name, fn, stage, target } = prettifyEventParameter(info);
    return this.buses[target].once(id, name, fn, stage);
  }

  @runnable(isEventEmitalbe)
  public trigger(
    {
      name,
      stage,
      target: rawTarget,
    }: {
      id: string;
      name: string;
      stage?: EventStage;
      target?: BinderTarget | void;
    },
    ...args: any[]) {
    const { target } = getEventInfo({ name, target: rawTarget, stage });
    return this.buses[target].trigger(name, ...args);
  }

  @runnable(isEventEmitalbe, { backup() { return false; } })
  public triggerSync(
    {
      name,
      stage,
      target: rawTarget,
    }: {
      id: string;
      name: string;
      stage?: EventStage;
      target?: BinderTarget | void;
    },
    ...args: any[]) {
    const { target } = getEventInfo({ name, target: rawTarget, stage });
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
    target: BinderTarget ,
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
      addEvent(targetDom, name, fn);
    } else if (target === 'video') {
      fn = (...args) => this.trigger({ target, name, id: target }, ...args);
      addEvent(targetDom, name, fn);
    } else if (target === 'video-dom') {
      fn = (...args) => this.triggerSync({ target, name, id: target }, ...args);
      this.dispatcher.dom.videoExtendedNodes.forEach((node) => addEvent(node, name, fn));
      addEvent(targetDom, name, fn);
    }
    this.bindedEventNames[target].push(name);
    this.bindedEventInfo[target].push([ name, fn ]);
  }

  private getTargetDom(target: BinderTarget ): Element {
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

  private isEventNeedToBeHandled(target: BinderTarget , name: string): boolean {
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
    target: BinderTarget ,
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

      removeEvent(targetDom, name, fn);

      // When we remove something on video dom, we also need to remove event on penetrate plugin
      if (target === 'video-dom') {
        this.dispatcher.dom.videoExtendedNodes.forEach((node) => {
          removeEvent(node, name, fn);
        });
      }
    }

    bindedEventInfoList.splice(index, 1);
    eventNamesList.splice(nameIndex, 1);
  }
}
