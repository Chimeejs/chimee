import { chimeeLog } from 'chimee-helper-log';
import { domEvents, esFullscreenEvents, kernelEvents, videoEvents } from 'const/event';
import { secondaryEventReg } from 'const/regExp';
import { camelCase, isFunction, isString } from 'lodash';
import { AdditionalEventInfo, BinderTarget, EventStage, RawEventInfo, WholeEventInfo } from 'typings/base';

/**
 * In logic before 0.10.0, we use 'c_' and 'w_' to mark event of container and wrapper
 * we need to keep that logic work until next major version.
 * @param {string} name
 */
export function getEventTargetByOldLogic(oldName: string): { name: string, target: BinderTarget } | false {
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

export function getEventStage(name?: string): { name: string, stage: EventStage } {
  const matches = name.match(secondaryEventReg);
  const stage = ((matches && matches[0]) || 'main') as EventStage;
  if (matches) {
    name = camelCase(name.replace(secondaryEventReg, ''));
  }
  return { name, stage };
}

export function getEventTargetByEventName(name: string): BinderTarget {
  if (videoEvents.indexOf(name) > -1) { return 'video'; }
  if (kernelEvents.indexOf(name) > -1) { return 'kernel'; }
  if (domEvents.indexOf(name) > -1) { return 'video-dom'; }
  if (esFullscreenEvents.indexOf(name) > -1) { return 'esFullscreen'; }
  return 'plugin';
}

export function getEventInfo({ name, target, stage }: { name: string, stage?: EventStage, target?: BinderTarget | void }): AdditionalEventInfo {
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

export function prettifyEventParameter(info: RawEventInfo): WholeEventInfo {
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

export function isEventEmitalbe({
  id,
  name,
}: { id?: string, name?: string }): boolean {
  if (!name || !isString(name) || secondaryEventReg.test(name)) {
    chimeeLog.error('You must provide a legal event name, which is string and could not started with before/after/_');
    return false;
  }
  if (!id || !isString(id)) {
    chimeeLog.error('You must provide the id of emitter');
    return false;
  }
  return true;
}
