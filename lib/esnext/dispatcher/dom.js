var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { chimeeLog } from 'chimee-helper-log';
import { style } from 'dom-helpers';
import { addClass } from 'dom-helpers/class';
import { off as removeEvent, on as addEvent } from 'dom-helpers/events';
import { querySelectorAll } from 'dom-helpers/query';
import { esFullscreen } from 'es-fullscreen';
import { isArray, isFunction, isPlainObject, isString } from 'lodash';
import { autobind, waituntil } from 'toxic-decorators';
import { isElement, isEvent, isHTMLString, isPosterityNode } from 'toxic-predicate-functions';
import { hypenate } from 'toxic-utils';
export default class Dom {
    constructor(config, dispatcher) {
        const { wrapper } = config;
        this.dispatcher = dispatcher;
        this.mouseInVideoValue = false;
        this.destroyed = false;
        this.isFullscreen = false;
        this.originHTML = '';
        this.plugins = {};
        this.videoExtendedNodesArray = [];
        if (isString(wrapper)) {
            const $wrapper = querySelectorAll(document.body, wrapper);
            if ($wrapper.length === 0) {
                throw new TypeError('Can not get dom node accroding wrapper. Please check your wrapper');
            }
            this.wrapper = $wrapper[0];
        }
        else if (isElement(wrapper)) {
            this.wrapper = wrapper;
        }
        else {
            throw new TypeError(`Wrapper can only be string or HTMLElement, but not ${typeof wrapper}`);
        }
        this.originHTML = this.wrapper.innerHTML;
        let videoElement = querySelectorAll(this.wrapper, 'video')[0];
        if (!videoElement) {
            videoElement = document.createElement('video');
        }
        this.installVideo(videoElement);
        this.fullscreenMonitor();
        esFullscreen.on('fullscreenchange', this.fullscreenMonitor);
        const videoRequiredGuardedAttributes = isArray(config.videoRequiredGuardedAttributes)
            ? config.videoRequiredGuardedAttributes
            : [];
        if (videoRequiredGuardedAttributes.indexOf('style') < 0) {
            videoRequiredGuardedAttributes.unshift('style');
        }
        this.videoRequireGuardedAttributes = videoRequiredGuardedAttributes;
    }
    get mouseInVideo() {
        return this.mouseInVideoValue;
    }
    set mouseInVideo(val) {
        this.mouseInVideoValue = !!val;
    }
    get videoExtendedNodes() {
        return this.videoExtendedNodesArray;
    }
    destroy() {
        this.removeVideo();
        esFullscreen.off('fullscreenchange', this.fullscreenMonitor);
        this.wrapper.innerHTML = this.originHTML;
        delete this.wrapper;
        delete this.plugins;
        this.destroyed = true;
    }
    exitFullscreen() {
        return esFullscreen.exit();
    }
    focus() {
        this.videoElement.focus();
    }
    fullscreen(request = true, target = 'container') {
        return request
            ? this.requestFullscreen(target)
            : this.exitFullscreen();
    }
    getAttr(target, attr) {
        return this[target].getAttribute(attr);
    }
    getStyle(target, attr) {
        if (!isString(attr)) {
            throw new TypeError(`to handle dom's attribute or style, your attr parameter must be string, but not ${attr} in ${typeof attr}`);
        }
        if (!isString(target)) {
            throw new TypeError(`to handle dom's attribute or style, your target parameter must be string, , but not ${target} in ${typeof target}`);
        }
        if (!isElement(this[target])) {
            throw new TypeError(`Your target "${target}" is not a legal HTMLElement`);
        }
        return style(this[target], attr);
    }
    insertPlugin(id, el, option = {}) {
        if (!isString(id)) {
            throw new TypeError('insertPlugin id parameter must be string');
        }
        if (isElement(this.plugins[id])) {
            if (process.env.NODE_ENV !== 'production') {
                chimeeLog.warn('Dispatcher.dom', `Plugin ${id} have already had a dom node. Now it will be replaced`);
            }
            this.removePlugin(id);
        }
        if (isString(el)) {
            if (isHTMLString(el)) {
                const outer = document.createElement('div');
                outer.innerHTML = el;
                el = outer.children[0];
            }
            else {
                el = document.createElement(hypenate(el));
            }
        }
        else if (el && isPlainObject(el)) {
            option = el;
        }
        const { inner, penetrate, className } = option;
        const node = (el && isElement(el)) ? el : document.createElement('div');
        const classNames = isString(className)
            ? className.split(/\s+/)
            : isArray(className)
                ? className
                : [];
        classNames.forEach((name) => {
            addClass(node, name);
        });
        this.plugins[id] = node;
        const outerElement = inner ? this.container : this.wrapper;
        const originElement = inner ? this.videoElement : this.container;
        if (penetrate) {
            this.dispatcher.binder.bindEventOnPenetrateNode(node);
            this.videoExtendedNodesArray.push(node);
        }
        if (outerElement.lastChild === originElement) {
            outerElement.appendChild(node);
            return node;
        }
        outerElement.insertBefore(node, originElement.nextSibling);
        return node;
    }
    installVideo(videoElement) {
        this.videoExtendedNodesArray.push(videoElement);
        videoElement.setAttribute('tabindex', '-1');
        this.autoFocusToVideo(videoElement);
        if (!isElement(this.container)) {
            if (videoElement.parentElement &&
                isElement(videoElement.parentElement) &&
                videoElement.parentElement !== this.wrapper) {
                this.container = videoElement.parentElement;
            }
            else {
                this.container = document.createElement('container');
                this.container.appendChild(videoElement);
            }
        }
        else {
            const container = this.container;
            if (container.childNodes.length === 0) {
                container.appendChild(videoElement);
            }
            else {
                container.insertBefore(videoElement, container.childNodes[0]);
            }
        }
        if (this.container.parentElement !== this.wrapper) {
            this.wrapper.appendChild(this.container);
        }
        this.videoElement = videoElement;
        return videoElement;
    }
    isNodeInsideVideo(node) {
        return this.videoExtendedNodesArray.indexOf(node) > -1 ||
            this.videoExtendedNodesArray.reduce((flag, video) => {
                if (flag) {
                    return flag;
                }
                return isPosterityNode(video, node);
            }, false);
    }
    migrateVideoRequiredGuardedAttributes(video) {
        const guardedAttributesAndValue = this.videoRequireGuardedAttributes.map((attr) => ([attr, this.videoElement.getAttribute(attr)]));
        guardedAttributesAndValue.forEach(([attr, value]) => { video.setAttribute(attr, value); });
    }
    removePlugin(id) {
        if (!isString(id)) {
            return;
        }
        const dom = this.plugins[id];
        if (isElement(dom)) {
            if (dom.parentNode) {
                dom.parentNode.removeChild(dom);
            }
            this.autoFocusToVideo(dom, true);
        }
        const { penetrate = false } = this.dispatcher.getPluginConfig(id) || {};
        if (penetrate) {
            this.dispatcher.binder.bindEventOnPenetrateNode(dom, true);
        }
        delete this.plugins[id];
    }
    removeVideo() {
        const videoElement = this.videoElement;
        this.autoFocusToVideo(this.videoElement, false);
        if (this.dispatcher.binder) {
            this.dispatcher.binder.bindEventOnVideo(videoElement, true);
        }
        if (this.videoElement.parentNode) {
            this.videoElement.parentNode.removeChild(this.videoElement);
        }
        delete this.videoElement;
        return videoElement;
    }
    requestFullscreen(target) {
        if (target === 'video') {
            target = 'videoElement';
        }
        return esFullscreen.open(this[target]);
    }
    setAttr(target, attr, val) {
        if (typeof val === 'undefined') {
            this[target].removeAttribute(attr);
            return;
        }
        this[target].setAttribute(attr, val);
    }
    setPluginsZIndex(plugins) {
        plugins.forEach((key, index) => style(key.match(/^(videoElement|container)$/) ? this[key] : this.plugins[key], 'z-index', ++index));
    }
    setStyle(target, attr, val) {
        if (!isString(attr)) {
            throw new TypeError(`to handle dom's attribute or style, your attr parameter must be string, but not ${attr} in ${typeof attr}`);
        }
        if (!isString(target)) {
            throw new TypeError(`to handle dom's attribute or style, your target parameter must be string, , but not ${target} in ${typeof target}`);
        }
        if (!isElement(this[target])) {
            throw new TypeError(`Your target "${target}" is not a legal HTMLElement`);
        }
        style(this[target], attr, val);
    }
    autoFocusToVideo(element, remove = false) {
        if (!isElement(element)) {
            return;
        }
        (remove ? removeEvent : addEvent)(element, 'mouseup', this.focusToVideo);
        (remove ? removeEvent : addEvent)(element, 'touchend', this.focusToVideo);
    }
    focusToVideo() {
        const x = window.scrollX;
        const y = window.scrollY;
        if (isFunction(this.videoElement.focus)) {
            this.videoElement.focus();
        }
        window.scrollTo(x, y);
    }
    fullscreenMonitor(evt) {
        const element = esFullscreen.fullscreenElement;
        const original = this.isFullscreen;
        if (!element || (!isPosterityNode(this.wrapper, element) && element !== this.wrapper)) {
            this.isFullscreen = false;
            this.fullscreenElement = undefined;
        }
        else {
            this.isFullscreen = true;
            this.fullscreenElement = this.wrapper === element
                ? 'wrapper'
                : this.container === element
                    ? 'container'
                    : this.videoElement === element
                        ? 'video'
                        : element;
        }
        if (isEvent(evt) && original !== this.isFullscreen) {
            this.dispatcher.binder.triggerSync({
                id: 'dispatcher',
                name: 'fullscreenchange',
                target: 'esFullscreen',
            }, evt);
        }
    }
}
__decorate([
    waituntil('dispatcher.videoConfigReady')
], Dom.prototype, "setAttr", null);
__decorate([
    autobind
], Dom.prototype, "focusToVideo", null);
__decorate([
    autobind
], Dom.prototype, "fullscreenMonitor", null);
//# sourceMappingURL=dom.js.map