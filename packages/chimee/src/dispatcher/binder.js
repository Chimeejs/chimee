// @flow
/**
 * A class to mark all the events name of certain kind of part
 * It can use to rebind the events
 */

import Bus from './bus';
import { videoEvents, domEvents, kernelEvents } from 'helper/const';
import { camelize, Log } from 'chimee-helper';
import { before } from 'toxic-decorators';

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
  const stageKeyReg = /^(before|after|_)/;
  const matches = name.match(stageKeyReg);
  // $FlowFixMe: We make sure it's event stage here
  const stage: eventStage = (matches && matches[0]) || 'manin';
  if (matches) {
    name = camelize(name.replace(stageKeyReg, ''));
  }
  return { name, stage };
}

function getEventTargetByEventName(name: string): binderTarget {
  if (videoEvents.indexOf(name) > -1) return 'video';
  if (kernelEvents.indexOf(name) > -1) return 'kernel';
  if (domEvents.indexOf(name) > -1) return 'video-dom';
  return 'custom';
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

function prettifyEventParamter(id: string, key: string, fn: Function, options: eventOptions = {}): wholeEventInfo {
  const { name, target, stage } = getEventInfo(key, options);
  return {
    id,
    fn,
    name,
    target,
    stage,
  };
}

export default class Binder {
  kinds: binderTarget[];
  binedEventNames: { [binderTarget]: string[] };
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
      'custom',
    ];
    this.binedEventNames = this.kinds.reduce((events, kind) => {
      events[kind] = [];
      this.buses[kind] = new Bus(dispatcher);
      return events;
    }, {});
  }

  @before(prettifyEventParamter)
  on({
    target,
    id,
    name,
    fn,
    stage,
  }: wholeEventInfo) {
    this.buses[target].on(id, name, fn, stage);
  }

  @before(prettifyEventParamter)
  off({
    target,
    id,
    name,
    fn,
    stage,
  }: wholeEventInfo) {
    this.buses[target].off(id, name, fn, stage);
  }

  @before(prettifyEventParamter)
  once({
    target,
    id,
    name,
    fn,
    stage,
  }: wholeEventInfo) {
    this.buses[target].once(id, name, fn, stage);
  }
}
