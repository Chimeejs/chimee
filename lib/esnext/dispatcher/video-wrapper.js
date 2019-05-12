var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { chimeeLog } from 'chimee-helper-log';
import { isArray, isFunction, isPlainObject, isString } from 'lodash';
import { accessor, alias, applyDecorators, before, nonenumerable, watch } from 'toxic-decorators';
import { isEmpty } from 'toxic-predicate-functions';
import { bind, getDeepProperty } from 'toxic-utils';
import VideoConfig from '../config/video';
import { isVideoDomAttribute, videoDomAttributes } from '../const/attribute';
import { isChimeeDomElement, turnChimeeDomElementIntoRealChimeeDomElement } from '../const/dom';
import { domEvents } from '../const/event';
import { domMethods, kernelMethods, videoMethods } from '../const/method';
import { kernelProperties, videoReadOnlyProperties } from '../const/property';
import { eventBinderCheck } from '../helper/checker';
export default class VideoWrapper {
    constructor({ dispatcher, id }) {
        this.events = {};
        this.unwatchHandlers = [];
        if (dispatcher) {
            this.dispatcher = dispatcher;
        }
        this.id = id;
    }
    get $container() {
        return this.dispatcher.dom.container;
    }
    get $pluginOrder() {
        return this.dispatcher.order;
    }
    get $plugins() {
        return this.dispatcher.plugins;
    }
    get $video() {
        return this.dispatcher.dom.videoElement;
    }
    get $wrapper() {
        return this.dispatcher.dom.wrapper;
    }
    get container() {
        return this.dispatcher.containerConfig;
    }
    set container(config) {
        if (!isPlainObject(config)) {
            throw new Error(`The config of container must be Object, but not ${typeof config}.`);
        }
        Object.assign(this.dispatcher.containerConfig, config);
    }
    get currentTime() {
        return this.dispatcher.kernel.currentTime;
    }
    set currentTime(second) {
        this.dispatcher.binder.emitSync({
            id: this.id,
            name: 'seek',
            target: 'video',
        }, second);
    }
    get fullscreenElement() {
        return this.dispatcher.dom.fullscreenElement;
    }
    get inPictureInPictureMode() {
        return this.dispatcher.inPictureInPictureMode;
    }
    get isFullscreen() {
        return this.dispatcher.dom.isFullscreen;
    }
    get pictureInPictureWindow() {
        return window.__chimee_picture_in_picture;
    }
    get videoRequireGuardedAttributes() {
        return this.dispatcher.dom.videoRequireGuardedAttributes;
    }
    $attr(targetOrAttr, attrOrValue, valueOrNothing) {
        const { method, target, attr, value } = this.getRealInfoForStyleAndAttr(arguments.length, targetOrAttr, attrOrValue, valueOrNothing);
        if (method === 'set' && target === 'videoElement') {
            if (!this.dispatcher.videoConfigReady) {
                if (process.env.NODE_ENV !== 'production') {
                    chimeeLog.warn('chimee', `${this.id} is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger`);
                }
                return value;
            }
            if (isVideoDomAttribute(attr)) {
                this.dispatcher.videoConfig[attr] = value;
                return value;
            }
        }
        return method === 'set'
            ? this.dispatcher.dom.setAttr(target, attr, value)
            : this.dispatcher.dom.getAttr(target, attr);
    }
    $css(targetOrAttr, attrOrValue, valueOrNothing) {
        const { method, target, attr, value } = this.getRealInfoForStyleAndAttr(arguments.length, targetOrAttr, attrOrValue, valueOrNothing);
        return method === 'set'
            ? this.dispatcher.dom.setStyle(target, attr, value)
            : this.dispatcher.dom.getStyle(target, attr);
    }
    $del(obj, property) {
        if (!isPlainObject(obj) && !isArray(obj)) {
            throw new TypeError(`$del only support Array or Object, but not ${obj}, whose type is ${typeof obj}`);
        }
        if (!isFunction(obj.__del)) {
            if (process.env.NODE_ENV !== 'production') {
                chimeeLog.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $del.`);
            }
            delete obj[property];
            return;
        }
        obj.__del(property);
    }
    $emit(key, ...args) {
        let target;
        if (!isString(key) && isPlainObject(key) && isString(key.name) && isString(key.target)) {
            target = key.target;
            key = key.name;
        }
        if (!isString(key)) {
            throw new TypeError('emit key parameter must be String');
        }
        if (process.env.NODE_ENV !== 'production' && domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
            chimeeLog.warn('plugin', `You are try to emit ${key} event. As emit is wrapped in Promise. It make you can't use event.preventDefault and event.stopPropagation. So we advice you to use emitSync`);
        }
        return this.dispatcher.binder.emit({
            id: this.id,
            name: key,
            target,
        }, ...args);
    }
    $emitSync(key, ...args) {
        let target;
        if (!isString(key) && isPlainObject(key) && isString(key.name) && isString(key.target)) {
            target = key.target;
            key = key.name;
        }
        if (!isString(key)) {
            throw new TypeError('emitSync key parameter must be String');
        }
        return this.dispatcher.binder.emitSync({
            id: this.id,
            name: key,
            target,
        }, ...args);
    }
    $fullscreen(flag = true, element = 'container') {
        if (!this.dispatcher.binder.emitSync({
            id: this.id,
            name: 'fullscreen',
            target: 'video-dom',
        }, flag, element)) {
            return false;
        }
        const result = this.dispatcher.dom.fullscreen(flag, turnChimeeDomElementIntoRealChimeeDomElement(element));
        this.dispatcher.binder.triggerSync({
            id: this.id,
            name: 'fullscreen',
            target: 'video-dom',
        }, flag, element);
        return result;
    }
    $off(key, fn, options = {}) {
        const eventInfo = Object.assign({}, options, {
            fn,
            id: this.id,
            name: key,
        });
        this.dispatcher.binder.off(eventInfo);
        this.removeEvents(key, fn);
    }
    $on(key, fn, options = {}) {
        const eventInfo = Object.assign({}, options, {
            fn,
            id: this.id,
            name: key,
        });
        this.dispatcher.binder.on(eventInfo);
        this.addEvents(key, fn);
    }
    $once(key, fn, options = {}) {
        const self = this;
        const boundFn = function (...args) {
            bind(fn, this)(...args);
            self.removeEvents(key, boundFn);
        };
        self.addEvents(key, boundFn);
        const eventInfo = Object.assign({}, options, {
            fn: boundFn,
            id: this.id,
            name: key,
        });
        this.dispatcher.binder.once(eventInfo);
    }
    $set(obj, property, value) {
        if (!isPlainObject(obj) && !isArray(obj)) {
            throw new TypeError(`$set only support Array or Object, but not ${obj}, whose type is ${typeof obj}`);
        }
        if (!isFunction(obj.__set)) {
            if (process.env.NODE_ENV !== 'production') {
                chimeeLog.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $set.`);
            }
            obj[property] = value;
            return;
        }
        obj.__set(property, value);
    }
    $silentLoad(src, option = {}) {
        return this.dispatcher.binder.emit({
            id: this.id,
            name: 'silentLoad',
            target: 'video',
        })
            .then(() => {
            return this.dispatcher.silentLoad(src, option);
        }).then((result) => {
            this.dispatcher.binder.trigger({
                id: this.id,
                name: 'silentLoad',
                target: 'video',
            }, result);
        });
    }
    $watch(key, handler, { deep, diff = true, other, proxy = false, } = {}) {
        if (!isString(key) && !isArray(key)) {
            throw new TypeError(`$watch only accept string and Array<string> as key to find the target to spy on, but not ${key}, whose type is ${typeof key}`);
        }
        let watching = true;
        const watcher = function (...args) {
            if (watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) {
                bind(handler, this)(...args);
            }
        };
        const unwatcher = () => {
            watching = false;
            const index = this.unwatchHandlers.indexOf(unwatcher);
            if (index > -1) {
                this.unwatchHandlers.splice(index, 1);
            }
        };
        const keys = isString(key)
            ? key.split('.')
            : key;
        const property = keys.pop();
        const videoConfig = this.dispatcher.videoConfig;
        const target = (keys.length === 0 &&
            !other &&
            isVideoDomAttribute(property))
            ? videoConfig
            : ['isFullscreen', 'fullscreenElement'].indexOf(property) > -1
                ? this.dispatcher.dom
                : getDeepProperty(other || this, keys, { throwError: true });
        applyDecorators(target, {
            [property]: watch(watcher, { deep, diff, proxy }),
        }, { self: true });
        this.unwatchHandlers.push(unwatcher);
        return unwatcher;
    }
    exitPictureInPicture() {
        return this.dispatcher.binder.emit({
            id: this.id,
            name: 'leavepictureinpicture',
            target: 'video',
        });
    }
    load(...args) {
        return new Promise((resolve) => {
            this.dispatcher.binder.once({
                fn: resolve,
                id: this.id,
                name: '_load',
                target: 'plugin',
            });
            this.dispatcher.binder.emit({
                id: this.id,
                name: 'load',
                target: 'plugin',
            }, ...args);
        });
    }
    requestPictureInPicture() {
        return this.dispatcher.binder.emit({
            id: this.id,
            name: 'enterpictureinpicture',
            target: 'video',
        });
    }
    destroyVideoWrapper() {
        this.unwatchHandlers.forEach((unwatcher) => unwatcher());
        Object.keys(this.events)
            .forEach((key) => {
            if (!isArray(this.events[key])) {
                return;
            }
            this.events[key].forEach((fn) => this.$off(key, fn));
        });
        delete this.events;
    }
    wrapAsVideo(videoConfig) {
        videoReadOnlyProperties.forEach((key) => {
            Object.defineProperty(this, key, {
                configurable: false,
                enumerable: false,
                get() {
                    return this.dispatcher.dom.videoElement[key];
                },
                set: undefined,
            });
        });
        videoMethods.forEach((key) => {
            Object.defineProperty(this, key, {
                configurable: false,
                enumerable: false,
                get() {
                    const video = this.dispatcher.dom.videoElement;
                    return bind(video[key], video);
                },
                set: undefined,
            });
        });
        const props = ([]).concat(kernelProperties).concat(videoDomAttributes)
            .reduce((props, key) => {
            props[key] = [
                accessor({
                    get() {
                        return videoConfig[key];
                    },
                    set(value) {
                        videoConfig[key] = value;
                        return value;
                    },
                }),
                nonenumerable,
            ];
            return props;
        }, {});
        applyDecorators(this, props, { self: true });
        kernelMethods.forEach((key) => {
            Object.defineProperty(this, key, {
                value(...args) {
                    return new Promise((resolve) => {
                        const id = this.__id;
                        this.dispatcher.binder.once({
                            fn: resolve,
                            id,
                            name: '_' + key,
                        });
                        this.dispatcher.binder[/^(seek)$/.test(key) ? 'emitSync' : 'emit']({
                            id,
                            name: key,
                            target: 'video',
                        }, ...args);
                    });
                },
                configurable: true,
                enumerable: false,
                writable: true,
            });
        });
        domMethods.forEach((key) => {
            if (key === 'fullscreen') {
                return;
            }
            Object.defineProperty(this, key, {
                value(...args) {
                    return this.dispatcher.dom[key](...args);
                },
                configurable: true,
                enumerable: false,
                writable: true,
            });
        });
    }
    addEvents(key, fn) {
        this.events[key] = this.events[key] || [];
        this.events[key].push(fn);
    }
    getRealInfoForStyleAndAttr(argumentsLength, targetOrAttr, attrOrValue, valueOrNothing) {
        let method;
        let target;
        let attr;
        let value;
        if (argumentsLength > 2) {
            method = 'set';
            target = targetOrAttr;
            attr = attrOrValue;
            value = valueOrNothing;
        }
        else if (argumentsLength === 2) {
            if (isChimeeDomElement(targetOrAttr)) {
                method = 'get';
                target = targetOrAttr;
                attr = attrOrValue;
            }
            else {
                method = 'set';
                target = 'container';
                attr = targetOrAttr;
                value = attrOrValue;
            }
        }
        else if (argumentsLength === 1) {
            method = 'get';
            target = 'container';
            attr = targetOrAttr;
        }
        else {
            throw new Error('You have to pass at least one argument to run $attr or $ css');
        }
        const realTarget = turnChimeeDomElementIntoRealChimeeDomElement(target);
        return { attr, method, value, target: realTarget };
    }
    removeEvents(key, fn) {
        if (isEmpty(this.events[key])) {
            return;
        }
        const index = this.events[key].indexOf(fn);
        if (index < 0) {
            return;
        }
        this.events[key].splice(index, 1);
        if (isEmpty(this.events[key])) {
            delete this.events[key];
        }
    }
}
__decorate([
    nonenumerable
], VideoWrapper.prototype, "$container", null);
__decorate([
    nonenumerable
], VideoWrapper.prototype, "$pluginOrder", null);
__decorate([
    nonenumerable
], VideoWrapper.prototype, "$plugins", null);
__decorate([
    nonenumerable
], VideoWrapper.prototype, "$video", null);
__decorate([
    nonenumerable
], VideoWrapper.prototype, "$wrapper", null);
__decorate([
    nonenumerable
], VideoWrapper.prototype, "inPictureInPictureMode", null);
__decorate([
    nonenumerable
], VideoWrapper.prototype, "pictureInPictureWindow", null);
__decorate([
    alias('attr')
], VideoWrapper.prototype, "$attr", null);
__decorate([
    alias('css')
], VideoWrapper.prototype, "$css", null);
__decorate([
    alias('emit')
], VideoWrapper.prototype, "$emit", null);
__decorate([
    alias('emitSync')
], VideoWrapper.prototype, "$emitSync", null);
__decorate([
    alias('fullScreen'),
    alias('$fullScreen'),
    alias('fullscreen')
], VideoWrapper.prototype, "$fullscreen", null);
__decorate([
    alias('off'),
    alias('removeEventListener'),
    before(eventBinderCheck)
], VideoWrapper.prototype, "$off", null);
__decorate([
    alias('on'),
    alias('addEventListener'),
    before(eventBinderCheck)
], VideoWrapper.prototype, "$on", null);
__decorate([
    alias('once'),
    before(eventBinderCheck)
], VideoWrapper.prototype, "$once", null);
__decorate([
    alias('silentLoad')
], VideoWrapper.prototype, "$silentLoad", null);
//# sourceMappingURL=video-wrapper.js.map