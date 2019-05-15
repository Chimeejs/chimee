var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { off as removeEvent, on as addEvent } from 'dom-helpers/events';
import { isFunction } from 'lodash';
import { runnable } from 'toxic-decorators';
import { isMustListenVideoDomEvent, mustListenVideoDomEvents } from '../const/event';
import Bus from '../dispatcher/bus';
import { getEventInfo, isEventEmitalbe, prettifyEventParameter } from '../helper/binder';
export default class Binder {
    constructor(dispatcher) {
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
        this.buses = {};
        this.bindedEventNames = {};
        this.bindedEventInfo = {};
        this.pendingEventsInfo = {};
        for (const kind of this.kinds) {
            this.bindedEventNames[kind] = [];
            this.bindedEventInfo[kind] = [];
            this.pendingEventsInfo[kind] = [];
            this.buses[kind] = new Bus(dispatcher, kind);
        }
    }
    addPendingEvent(target, name, id) {
        this.pendingEventsInfo[target].push([name, id]);
    }
    applyPendingEvents(target) {
        const pendingEvents = this.pendingEventsInfo[target];
        const pendingEventsCopy = pendingEvents.splice(0, pendingEvents.length);
        while (pendingEventsCopy.length) {
            const [name, id] = pendingEventsCopy.pop();
            this.addEventListenerOnTarget({ name, target, id });
        }
    }
    bindEventOnPenetrateNode(node, remove = false) {
        this.bindedEventInfo['video-dom']
            .forEach(([name, fn]) => {
            remove
                ? removeEvent(node, name, fn)
                : addEvent(node, name, fn);
        });
    }
    bindEventOnVideo(node, remove = false) {
        this.bindedEventInfo['video-dom']
            .concat(this.bindedEventInfo.video)
            .forEach(([name, fn]) => {
            remove
                ? removeEvent(node, name, fn)
                : addEvent(node, name, fn);
        });
    }
    destroy() {
        this.kinds.forEach((target) => {
            if (target === 'kernel') {
                this.bindedEventInfo.kernel.forEach(([name, fn]) => {
                    this.dispatcher.kernel.off(name, fn);
                });
            }
            else {
                const targetDom = this.getTargetDom(target);
                this.bindedEventInfo[target].forEach(([name, fn]) => {
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
    emit({ name, stage, target: rawTarget, }, ...args) {
        const { target } = getEventInfo({ name, target: rawTarget, stage });
        return this.buses[target].emit(name, ...args);
    }
    emitSync({ name, stage, target: rawTarget, }, ...args) {
        const { target } = getEventInfo({ name, target: rawTarget, stage });
        return this.buses[target].emitSync(name, ...args);
    }
    listenOnMouseMoveEvent(node) {
        const dom = this.dispatcher.dom;
        const target = 'video-dom';
        const id = '_vm';
        mustListenVideoDomEvents.forEach((name) => {
            const fn = (...args) => {
                const { toElement, currentTarget, relatedTarget, type } = args[0];
                const to = toElement || relatedTarget;
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
            if (this.bindedEventNames[target].indexOf(name) < 0) {
                this.bindedEventNames[target].push(name);
                this.bindedEventInfo[target].push([name, fn]);
            }
        });
    }
    migrateKernelEvent(oldKernel, newKernel) {
        const bindedEventInfoList = this.bindedEventInfo.kernel;
        bindedEventInfoList.forEach(([name, fn]) => {
            oldKernel.off(name, fn);
            newKernel.on(name, fn);
        });
    }
    off(info) {
        const { id, name, fn, stage, target } = prettifyEventParameter(info);
        const ret = this.buses[target].off(id, name, fn, stage);
        this.removeEventListenerOnTargetWhenIsUseless({ name, target });
        return ret;
    }
    on(info) {
        const { id, name, fn, stage, target } = prettifyEventParameter(info);
        this.addEventListenerOnTarget({
            id,
            name,
            target,
        });
        return this.buses[target].on(id, name, fn, stage);
    }
    once(info) {
        const { id, name, fn, stage, target } = prettifyEventParameter(info);
        return this.buses[target].once(id, name, fn, stage);
    }
    trigger({ name, stage, target: rawTarget, }, ...args) {
        const { target } = getEventInfo({ name, target: rawTarget, stage });
        return this.buses[target].trigger(name, ...args);
    }
    triggerSync({ name, stage, target: rawTarget, }, ...args) {
        const { target } = getEventInfo({ name, target: rawTarget, stage });
        return this.buses[target].triggerSync(name, ...args);
    }
    addEventListenerOnTarget({ name, target, id, }) {
        if (!this.isEventNeedToBeHandled(target, name)) {
            return;
        }
        let fn;
        if (this.bindedEventNames[target].indexOf(name) > -1) {
            return;
        }
        const targetDom = this.getTargetDom(target);
        if (target === 'kernel') {
            if (!this.dispatcher.kernel) {
                this.addPendingEvent(target, name, id);
                return;
            }
            fn = (...args) => this.triggerSync({ target, name, id: 'kernel' }, ...args);
            this.dispatcher.kernel.on(name, fn);
        }
        else if (target === 'container' || target === 'wrapper') {
            fn = (...args) => this.triggerSync({ target, name, id: target }, ...args);
            addEvent(targetDom, name, fn);
        }
        else if (target === 'video') {
            fn = (...args) => this.trigger({ target, name, id: target }, ...args);
            addEvent(targetDom, name, fn);
        }
        else if (target === 'video-dom') {
            fn = (...args) => this.triggerSync({ target, name, id: target }, ...args);
            this.dispatcher.dom.videoExtendedNodes.forEach((node) => addEvent(node, name, fn));
            addEvent(targetDom, name, fn);
        }
        this.bindedEventNames[target].push(name);
        this.bindedEventInfo[target].push([name, fn]);
    }
    getTargetDom(target) {
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
    isEventNeedToBeHandled(target, name) {
        return target !== 'plugin' &&
            target !== 'esFullscreen' &&
            (!isMustListenVideoDomEvent(name) || target !== 'video');
    }
    removeEventListenerOnTargetWhenIsUseless({ name, target, }) {
        if (!this.isEventNeedToBeHandled(target, name)) {
            return;
        }
        const eventNamesList = this.bindedEventNames[target];
        const nameIndex = eventNamesList.indexOf(name);
        if (nameIndex < 0) {
            return;
        }
        if (this.buses[target].hasEvents()) {
            return;
        }
        const bindedEventInfoList = this.bindedEventInfo[target];
        let fn;
        let index;
        for (index = 0; index < bindedEventInfoList.length; index++) {
            if (bindedEventInfoList[index][0] === name) {
                fn = bindedEventInfoList[index][1];
                break;
            }
        }
        if (!isFunction(fn)) {
            return;
        }
        if (target === 'kernel') {
            this.dispatcher.kernel.off(name, fn);
        }
        else {
            const targetDom = this.getTargetDom(target);
            removeEvent(targetDom, name, fn);
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
__decorate([
    runnable(isEventEmitalbe)
], Binder.prototype, "emit", null);
__decorate([
    runnable(isEventEmitalbe, { backup() { return false; } })
], Binder.prototype, "emitSync", null);
__decorate([
    runnable(isEventEmitalbe)
], Binder.prototype, "trigger", null);
__decorate([
    runnable(isEventEmitalbe, { backup() { return false; } })
], Binder.prototype, "triggerSync", null);
//# sourceMappingURL=binder.js.map