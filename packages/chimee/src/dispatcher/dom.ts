import { chimeeLog } from 'chimee-helper-log';
import { RealChimeeDomElement } from 'const/dom';
import Dispatcher from 'dispatcher/index';
import { addClass } from 'dom-helpers/class';
import { off as removeEvent, on as addEvent } from 'dom-helpers/events';
import { querySelectorAll } from 'dom-helpers/query';
import style from 'dom-helpers/style';
import esFullscreen from 'es-fullscreen';
console.warn('esfulllll', esFullscreen);
import { isArray, isFunction, isPlainObject, isString } from 'lodash';
import { autobind, waituntil } from 'toxic-decorators';
import { isElement, isEvent, isHTMLString, isPosterityNode } from 'toxic-predicate-functions';
import { hypenate } from 'toxic-utils';
import { UserConfig } from 'typings/base';

export interface IFriendlyDom {
  autoFocusToVideo(element: Element, remove?: boolean): void;
}
/**
 * <pre>
 * Dom work for Dispatcher.
 * It take charge of dom management of Dispatcher.
 * </pre>
 */
export default class Dom {

  get mouseInVideo(): boolean {
    return this.mouseInVideoValue;
  }

  set mouseInVideo(val: boolean) {
    this.mouseInVideoValue = !!val;
  }
  get videoExtendedNodes(): Element[] {
    return this.videoExtendedNodesArray;
  }

  public container: Element;
  public destroyed: boolean;
  public dispatcher: Dispatcher;

  public fullscreenElement: Element | 'wrapper' | 'container' | 'video' | void;
  public isFullscreen: boolean | string;
  /**
   * to mark is the mouse in the video area
   */
  public mouseInVideoValue: boolean;
  /**
   * the html to restore when we are destroyed
   */
  public originHTML: string;
  /**
   * all plugin's dom element set
   */
  public plugins: {[x: string]: Element};

  public videoElement: HTMLVideoElement;
  /**
   * collection of video extension nodes
   * some nodes can be regarded as part of video (such as penetrate element)
   * so we store them here
   */
  public videoExtendedNodesArray: Element[];
  public videoRequireGuardedAttributes: string[];
  public wrapper: Element;

  constructor(config: UserConfig, dispatcher: Dispatcher) {
    const { wrapper } = config;
    this.dispatcher = dispatcher;
    this.mouseInVideoValue = false;
    this.destroyed = false;
    this.isFullscreen = false;
    this.originHTML = '';
    this.plugins = {};
    this.videoExtendedNodesArray = ([] as Element[]);
    if (isString(wrapper)) {
      const $wrapper = querySelectorAll(document.body, wrapper);
      // TODO: we have to decalre length for wrapper
      if ($wrapper.length === 0) {
        throw new TypeError('Can not get dom node accroding wrapper. Please check your wrapper');
      }
      /**
       * the referrence of the dom wrapper of whole Chimee
       */
      this.wrapper = $wrapper[0];
    } else if (isElement(wrapper)) {
      this.wrapper = wrapper;
    } else {
      throw new TypeError(`Wrapper can only be string or HTMLElement, but not ${typeof wrapper}`);
    }
    this.originHTML = this.wrapper.innerHTML;
    // if we find video element inside wrapper
    // we use it
    // or we create a video element by ourself.
    let videoElement: HTMLVideoElement | void = (querySelectorAll(this.wrapper, 'video')[0] as HTMLVideoElement | void);
    if (!videoElement) {
      videoElement = document.createElement('video');
    }
    /**
     * referrence of video's dom element
     */
    this.installVideo(videoElement);
    this.fullscreenMonitor();
    esFullscreen.on('fullscreenchange', this.fullscreenMonitor);
    // As some video attributes will missed when we switch kernel
    // we set a guarder for it
    // and we must make sure style be guarded
    const videoRequiredGuardedAttributes = isArray(config.videoRequiredGuardedAttributes)
      ? config.videoRequiredGuardedAttributes
      : [];
    if (videoRequiredGuardedAttributes.indexOf('style') < 0) {
      videoRequiredGuardedAttributes.unshift('style');
    }
    this.videoRequireGuardedAttributes = videoRequiredGuardedAttributes;
  }

  /**
   * function called when we distory
   */
  public destroy() {
    this.removeVideo();
    esFullscreen.off('fullscreenchange', this.fullscreenMonitor);
    this.wrapper.innerHTML = this.originHTML;
    delete this.wrapper;
    delete this.plugins;
    this.destroyed = true;
  }

  public exitFullscreen(): boolean {
    return esFullscreen.exit();
  }

  public focus() {
    this.videoElement.focus();
  }

  public fullscreen(request: boolean = true, target: RealChimeeDomElement = 'container', ...args: any): boolean {
    return request
      ? this.requestFullscreen(target)
      : this.exitFullscreen();
  }

  public getAttr(target: RealChimeeDomElement, attr: string): string {
    return this[target].getAttribute(attr);
  }

  public getStyle(target: RealChimeeDomElement, attr: string): string {
    return style(this[target], attr);
  }

  /**
   * each plugin has its own dom node, this function will create one or them.
   * we support multiple kind of el
   * 1. Element, we will append this dom node on wrapper straight
   * 2. HTMLString, we will create dom based on this HTMLString and append it on wrapper
   * 3. string, we will transfer this string into hypen string, then we create a custom elment called by this and bind it on wrapper
   * 4. nothing, we will create a div and bind it on the wrapper
   */
  public insertPlugin(id: string, el?: string | HTMLElement | { className?: string | string[], inner?: boolean, penetrate?: boolean } | void, option: { className?: string | string[], inner?: boolean, penetrate?: boolean } = {}) {
    if (!isString(id)) { throw new TypeError('insertPlugin id parameter must be string'); }
    if (isElement(this.plugins[id])) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') { chimeeLog.warn('Dispatcher.dom', `Plugin ${id} have already had a dom node. Now it will be replaced`); }
      this.removePlugin(id);
    }
    if (isString(el)) {
      if (isHTMLString(el)) {
        const outer = document.createElement('div');
        outer.innerHTML = el;
        el = outer.children[0];
      } else {
        el = document.createElement(hypenate(el));
      }
    } else if (el && isPlainObject(el)) {
      option = el;
    }
    const { inner, penetrate } = option;
    let { className } = option;
    const node = (el && isElement(el)) ? el : document.createElement('div');
    if (isArray(className)) {
      className = className.join(' ');
    }
    if (isString(className)) {
      addClass(node, className);
    }
    this.plugins[id] = node;
    const outerElement = inner ? this.container : this.wrapper;
    const originElement = inner ? this.videoElement : this.container;
    // auto forward the event if this plugin can be penetrate
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

  public installVideo(videoElement: HTMLVideoElement): HTMLVideoElement {
    this.videoExtendedNodesArray.push(videoElement);
    videoElement.setAttribute('tabindex', '-1');
    this.autoFocusToVideo(videoElement);
    if (!isElement(this.container)) {
      // create container
      if (videoElement.parentElement &&
        isElement(videoElement.parentElement) &&
        videoElement.parentElement !== this.wrapper
      ) {
        this.container = videoElement.parentElement;
      } else {
        this.container = document.createElement('container');
        this.container.appendChild(videoElement);
      }
    } else {
      const container = this.container;
      if (container.childNodes.length === 0) {
        container.appendChild(videoElement);
      } else {
        container.insertBefore(videoElement, container.childNodes[0]);
      }
    }
    // check container.position
    if (this.container.parentElement !== this.wrapper) {
      this.wrapper.appendChild(this.container);
    }
    this.videoElement = videoElement;
    return videoElement;
  }

  public isNodeInsideVideo(node: Element): boolean {
    return this.videoExtendedNodesArray.indexOf(node) > -1 ||
      this.videoExtendedNodesArray.reduce((flag, video) => {
        if (flag) { return flag; }
        return isPosterityNode(video, node);
      }, false);
  }

  public migrateVideoRequiredGuardedAttributes(video: HTMLVideoElement) {
    const guardedAttributesAndValue = this.videoRequireGuardedAttributes.map((attr) => ([ attr, this.videoElement.getAttribute(attr) ]));
    guardedAttributesAndValue.forEach(([ attr, value ]) => { video.setAttribute(attr, value); });
  }

  /**
   * remove plugin's dom
   */
  public removePlugin(id: string) {
    if (!isString(id)) { return; }
    const dom = this.plugins[id];
    if (isElement(dom)) {
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
      this.autoFocusToVideo(dom, true);
    }
    // @ts-ignore: Property 'penetrate' does not exist on type 'PluginConfig | IChimeePluginConstructor | { penetrate?: false; }'.
    const { penetrate = false } = Dispatcher.getPluginConfig(id) || {};
    if (penetrate) { this.dispatcher.binder.bindEventOnPenetrateNode(dom, true); }
    delete this.plugins[id];
  }

  public removeVideo(): HTMLVideoElement {
    const videoElement = this.videoElement;
    this.autoFocusToVideo(this.videoElement, false);
    // when we destroy the chimee
    // binder is destroyed before dom
    // so we need to make a check here
    if (this.dispatcher.binder) {
      this.dispatcher.binder.bindEventOnVideo(videoElement, true);
    }
    if (this.videoElement.parentNode) {
      this.videoElement.parentNode.removeChild(this.videoElement);
    }
    delete this.videoElement;
    return videoElement;
  }

  public requestFullscreen(target: RealChimeeDomElement) {
    return esFullscreen.open((this[target] as HTMLElement));
  }

  /**
   * set attribute on our dom
   * @param {string} attr attribute's name
   * @param {anything} val attribute's value
   * @param {string} target the HTMLElemnt string name, only support video/wrapper/container now
   */
  @waituntil('__dispatcher.videoConfigReady')
  public setAttr(target: RealChimeeDomElement, attr: string, val: string | void): void {
    if (typeof val === 'undefined') {
      this[target].removeAttribute(attr);
      return;
    }
    this[target].setAttribute(attr, val);
  }

  /**
   * Set zIndex for a plugins list
   */
  public setPluginsZIndex(plugins: string[]): void {
    plugins.forEach((key: string, index) => style(key.match(/^(videoElement|container)$/) ? this[(key as RealChimeeDomElement)] : this.plugins[key], 'z-index', ++index));
  }

  public setStyle(target: RealChimeeDomElement, attr: string, val: any): void {
    style(this[target], attr, val);
  }

  protected autoFocusToVideo(element: Element, remove: boolean = false): void {
    /* istanbule ignore next */
    if (!isElement(element)) { return; }
    (remove ? removeEvent : addEvent)(element, 'mouseup', this.focusToVideo);
    (remove ? removeEvent : addEvent)(element, 'touchend', this.focusToVideo);
  }

  @(autobind as MethodDecorator)
  private focusToVideo() {
    const x = window.scrollX;
    const y = window.scrollY;
    if (isFunction(this.videoElement.focus)) {
      this.videoElement.focus();
    }
    window.scrollTo(x, y);
  }

  @(autobind as MethodDecorator)
  private fullscreenMonitor(evt?: Event) {
    const element = esFullscreen.fullscreenElement;
    const original = this.isFullscreen;
    if (!element || (!isPosterityNode(this.wrapper, element) && element !== this.wrapper)) {
      this.isFullscreen = false;
      this.fullscreenElement = undefined;
    } else {
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
