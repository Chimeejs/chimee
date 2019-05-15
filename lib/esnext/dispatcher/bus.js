var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { chimeeLog } from 'chimee-helper-log';
import { bind, isArray, isEmpty, isError, isFunction, isNil } from 'lodash';
import { runnable } from 'toxic-decorators';
import { dispatcherEventMethodMap, isDispatcherEventMethod, isDomEvent, isVideoEvent, selfProcessorEvents } from '../const/event';
import { isDomMethod, isKernelMethod } from '../const/method';
import { secondaryEventReg } from '../const/regExp';
import { deletePropertyIfItIsEmpty, runRejectableQueue, runStoppableQueue } from '../helper/utils';
function secondaryChecker(key) {
    if (key.match(secondaryEventReg)) {
        if (process.env.NODE_ENV !== 'production') {
            chimeeLog.warn('bus', `Secondary Event "${key}" could not be call straightly by API.`);
        }
        return false;
    }
    return true;
}
function getKeyForOnceMap(eventName, stage, pluginId) {
    return `${eventName}-${stage}-${pluginId}`;
}
export default class Bus {
    constructor(dispatcher, kind) {
        this.dispatcher = dispatcher;
        this.kind = kind;
        this.events = {};
        this.onceMap = {};
    }
    destroy() {
        delete this.events;
        delete this.dispatcher;
    }
    emit(key, ...args) {
        const event = this.events[key];
        if (isEmpty(event)) {
            if (selfProcessorEvents.indexOf(key) > -1) {
                return Promise.resolve();
            }
            return this.eventProcessor(key, { sync: false }, ...args);
        }
        const beforeQueue = this.getEventQueue(event.before);
        return runRejectableQueue(beforeQueue, ...args)
            .then(() => {
            if (selfProcessorEvents.indexOf(key) > -1) {
                return;
            }
            return this.eventProcessor(key, { sync: false }, ...args);
        })
            .catch((error) => {
            if (isError(error)) {
                this.dispatcher.throwError(error);
            }
            return Promise.reject(error);
        });
    }
    emitSync(key, ...args) {
        const event = this.events[key];
        if (isEmpty(event)) {
            if (selfProcessorEvents.indexOf(key) > -1) {
                return true;
            }
            return this.eventProcessor(key, { sync: true }, ...args);
        }
        const beforeQueue = this.getEventQueue(event.before);
        return runStoppableQueue(beforeQueue, ...args) && (selfProcessorEvents.indexOf(key) > -1 ||
            this.eventProcessor(key, { sync: true }, ...args));
    }
    hasEvents() {
        return !isEmpty(this.events);
    }
    off(pluginId, eventName, fn, stage) {
        const deleted = this.removeEvent({
            eventName,
            fn,
            pluginId,
            stage,
        });
        if (deleted) {
            return;
        }
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
    on(pluginId, eventName, fn, stage) {
        this.addEvent({ eventName, stage, pluginId, fn });
    }
    once(pluginId, eventName, fn, stage) {
        const bus = this;
        const handler = function (...args) {
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
    trigger(key, ...args) {
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
            if (isError(error)) {
                this.dispatcher.throwError(error);
            }
            return this.runSideEffectEvent(key, ...args);
        });
    }
    triggerSync(key, ...args) {
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
    addEvent({ eventName, stage, pluginId, fn, }) {
        this.events[eventName] = this.events[eventName] || {};
        this.events[eventName][stage] = this.events[eventName][stage] || {};
        this.events[eventName][stage][pluginId] = this.events[eventName][stage][pluginId] || [];
        this.events[eventName][stage][pluginId].push(fn);
    }
    addToOnceMap({ eventName, stage, pluginId, fn, handler, }) {
        const key = getKeyForOnceMap(eventName, stage, pluginId);
        const map = this.onceMap[key] = this.onceMap[key] || new Map();
        if (!map.has(fn)) {
            map.set(fn, []);
        }
        const handlers = map.get(fn);
        handlers.push(handler);
    }
    eventProcessor(key, { sync }, ...args) {
        if (isDispatcherEventMethod(key)) {
            const methodName = dispatcherEventMethodMap[key];
            this.dispatcher[methodName](...args);
        }
        else if (isKernelMethod(key)) {
            this.dispatcher.kernel[key](...args);
        }
        else if (isDomMethod(key)) {
            this.dispatcher.dom[key](...args);
        }
        if (isVideoEvent(key) || isDomEvent(key)) {
            return true;
        }
        return this[sync ? 'triggerSync' : 'trigger'](key, ...args);
    }
    getEventQueue(handlerSet, customOrder = false) {
        if (this.dispatcher.destroyed) {
            return [];
        }
        const order = (customOrder || this.dispatcher.order).concat(['_vm']);
        return isEmpty(handlerSet)
            ? []
            : order.reduce((queue, id) => {
                if (isEmpty(handlerSet[id]) ||
                    !isArray(handlerSet[id]) ||
                    (!this.dispatcher.plugins[id] && id !== '_vm')) {
                    return queue;
                }
                return queue.concat(handlerSet[id].map((fn) => {
                    return bind(fn, this.dispatcher.plugins[id] || this.dispatcher.vm);
                }));
            }, []);
    }
    getFirstHandlerFromOnceMap({ eventName, stage, pluginId, fn, }) {
        const key = getKeyForOnceMap(eventName, stage, pluginId);
        const map = this.onceMap[key];
        if (isNil(map) || !map.has(fn)) {
            return;
        }
        const handlers = map.get(fn);
        return handlers[0];
    }
    removeEvent({ eventName, stage, pluginId, fn, }) {
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
        deletePropertyIfItIsEmpty(eventsForStage, pluginId);
        deletePropertyIfItIsEmpty(eventsForEventName, stage);
        deletePropertyIfItIsEmpty(this.events, eventName);
        return hasFn;
    }
    removeFromOnceMap({ eventName, stage, pluginId, fn, handler, }) {
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
    runSideEffectEvent(key, ...args) {
        const event = this.events[key];
        if (isEmpty(event)) {
            return false;
        }
        const queue = this.getEventQueue(event._);
        queue.forEach((run) => run(...args));
        return true;
    }
}
__decorate([
    runnable(secondaryChecker)
], Bus.prototype, "emit", null);
__decorate([
    runnable(secondaryChecker, { backup() { return false; } })
], Bus.prototype, "emitSync", null);
__decorate([
    runnable(secondaryChecker)
], Bus.prototype, "trigger", null);
__decorate([
    runnable(secondaryChecker, { backup() { return false; } })
], Bus.prototype, "triggerSync", null);
//# sourceMappingURL=bus.js.map