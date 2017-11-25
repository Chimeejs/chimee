// @flow
import { isArray, isElement, isString, isHTMLString, hypenate, isFunction, isEmpty, isPosterityNode, isObject, isBoolean, $, setStyle, getStyle, setAttr, addEvent, getAttr, removeEvent, addClassName, Log, isEvent } from 'chimee-helper';
import { videoEvents, domEvents, passiveEvents } from 'helper/const';
import esFullscreen from 'es-fullscreen';
import { autobind, before, waituntil } from 'toxic-decorators';
function targetCheck(target: string, ...args) {
  if (target === 'video') target = 'videoElement';
  if (!isElement(this[target])) throw new TypeError(`Your target "${target}" is not a legal HTMLElement`);
  return [ target, ...args ];
}
function attrOperationCheck(target: string, attr: string, val: any): Array<any> {
  if (!isString(attr)) throw new TypeError(`to handle dom's attribute or style, your attr parameter must be string, but not ${attr} in ${typeof attr}`);
  if (!isString(target)) throw new TypeError(`to handle dom's attribute or style, your target parameter must be string, , but not ${target} in ${typeof target}`);
  return [ target, attr, val ];
}
/**
 * <pre>
 * Dom work for Dispatcher.
 * It take charge of dom management of Dispatcher.
 * </pre>
 */
export default class Dom {
  wrapper: Element;
  videoElement: HTMLVideoElement;
  container: Element;
  originHTML: string;
  plugins: {[string]: Element};
  isFullscreen: boolean | string;
  fullscreenElement: HTMLElement | string | void;
  __dispatcher: Dispatcher;
  __domEventHandlerList: {|[string]: Array<Function>|};
  __mouseInVideo: boolean;
  __videoExtendedNodes: Array<Node>;
  videoEventHandlerList: Array<Function>;
  videoDomEventHandlerList: Array<Function>;
  containerDomEventHandlerList: Array<Function>;
  wrapperDomEventHandlerList: Array<Function>;
  /**
   * all plugin's dom element set
   */
  plugins = {};
  /**
   * the html to restore when we are destroyed
   */
  originHTML = '';
  /**
   * Array to store all video event handler
   */
  videoEventHandlerList = [];
  /**
   * Array to store all video dom event handler
   */
  videoDomEventHandlerList = [];
  /**
   * Array to store all container dom event handler
   */
  containerDomEventHandlerList = [];
  /**
   * Array to store all video dom event handler
   */
  wrapperDomEventHandlerList = [];
  /**
   * Object to store different plugin's dom event handlers
   */
  __domEventHandlerList = {};
  /**
   * to mark is the mouse in the video area
   */
  __mouseInVideo = false;
  /**
   * collection of video extension nodes
   * some nodes can be regarded as part of video (such as penetrate element)
   * so we store them here
   */
  __videoExtendedNodes = [];
  isFullscreen = false;
  fullscreenElement = undefined;

  constructor(wrapper: string | Element, dispatcher: Dispatcher) {
    this.__dispatcher = dispatcher;
    if (!isElement(wrapper) && !isString(wrapper)) throw new TypeError(`Wrapper can only be string or HTMLElement, but not ${typeof wrapper}`);
    const $wrapper = $(wrapper);
    if ($wrapper.length === 0) {
      throw new TypeError('Can not get dom node accroding wrapper. Please check your wrapper');
    }
    /**
     * the referrence of the dom wrapper of whole Chimee
     */
    // $FlowFixMe: support computed key on nodewrap
    this.wrapper = $wrapper[0];
    this.originHTML = this.wrapper.innerHTML;
    // if we find video element inside wrapper
    // we use it
    // or we create a video element by ourself.
    // $FlowFixMe: support computed key on nodewrap
    let videoElement = $wrapper.find('video')[0];
    if (!videoElement) {
      videoElement = document.createElement('video');
    }
    /**
     * referrence of video's dom element
     */
    this.installVideo(videoElement);
    this._addDomEvents(this.container, this.containerDomEventHandlerList, key => (...args: any) => this.__dispatcher.bus.triggerSync('c_' + key, ...args));
    this._addDomEvents(this.wrapper, this.wrapperDomEventHandlerList, key => (...args: any) => this.__dispatcher.bus.triggerSync('w_' + key, ...args));
    this._fullscreenMonitor();
    esFullscreen.on('fullscreenchange', this._fullscreenMonitor);
  }

  installVideo(videoElement: HTMLVideoElement): HTMLVideoElement {
    this.__videoExtendedNodes.push(videoElement);
    setAttr(videoElement, 'tabindex', -1);
    this._autoFocusToVideo(videoElement);
    if (!isElement(this.container)) {
      // create container
      if (videoElement.parentElement &&
        isElement(videoElement.parentElement) &&
        videoElement.parentElement !== this.wrapper
      ) {
        this.container = videoElement.parentElement;
      } else {
        this.container = document.createElement('container');
        $(this.container).append(videoElement);
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
      $(this.wrapper).append(this.container);
    }
    videoEvents.forEach(key => {
      const fn = (...args: any) => this.__dispatcher.bus.trigger(key, ...args);
      this.videoEventHandlerList.push(fn);
      addEvent(videoElement, key, fn);
    });
    this._addDomEvents(videoElement, this.videoDomEventHandlerList, key => this._getEventHandler(key, { penetrate: true }));
    this.videoElement = videoElement;
    return videoElement;
  }

  removeVideo(): HTMLVideoElement {
    const videoElement = this.videoElement;
    this._autoFocusToVideo(this.videoElement, false);
    videoEvents.forEach((key, index) => {
      removeEvent(this.videoElement, key, this.videoEventHandlerList[index]);
    });
    this.videoEventHandlerList = [];
    domEvents.forEach((key, index) => {
      removeEvent(this.videoElement, key, this.videoDomEventHandlerList[index]);
    });
    this.videoDomEventHandlerList = [];
    $(videoElement).remove();
    delete this.videoElement;
    return videoElement;
  }

  /**
   * each plugin has its own dom node, this function will create one or them.
   * we support multiple kind of el
   * 1. Element, we will append this dom node on wrapper straight
   * 2. HTMLString, we will create dom based on this HTMLString and append it on wrapper
   * 3. string, we will transfer this string into hypen string, then we create a custom elment called by this and bind it on wrapper
   * 4. nothing, we will create a div and bind it on the wrapper
   */
  insertPlugin(id: string, el?: string | Element | Object, option: {inner?: boolean, penetrate?: boolean, autoFocus?: boolean, className?: string | Array<string>} = {}) {
    if (!isString(id)) throw new TypeError('insertPlugin id parameter must be string');
    if (isElement(this.plugins[id])) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') Log.warn('Dispatcher.dom', `Plugin ${id} have already had a dom node. Now it will be replaced`);
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
    } else if (isObject(el)) {
      // $FlowFixMe: we have check el's type here and make sure it's an object
      option = el;
    }
    const { inner, penetrate, autoFocus } = option;
    let { className } = option;
    const node = (el && isElement(el)) ? el : document.createElement('div');
    if (isArray(className)) {
      className = className.join(' ');
    }
    if (isString(className)) {
      addClassName(node, className);
    }
    this.plugins[id] = node;
    const outerElement = inner ? this.container : this.wrapper;
    const originElement = inner ? this.videoElement : this.container;
    if (isBoolean(autoFocus) ? autoFocus : inner) this._autoFocusToVideo(node);
    // auto forward the event if this plugin can be penetrate
    if (penetrate) {
      this.__domEventHandlerList[id] = this.__domEventHandlerList[id] || [];
      this._addDomEvents(node, this.__domEventHandlerList[id], key => this._getEventHandler(key, { penetrate }));
      this.__videoExtendedNodes.push(node);
    }
    if (outerElement.lastChild === originElement) {
      outerElement.appendChild(node);
      return node;
    }
    outerElement.insertBefore(node, originElement.nextSibling);
    return node;
  }

  /**
   * remove plugin's dom
   */
  removePlugin(id: string) {
    if (!isString(id)) return;
    const dom = this.plugins[id];
    if (isElement(dom)) {
      dom.parentNode && dom.parentNode.removeChild(dom);
      this._autoFocusToVideo(dom, true);
    }
    if (!isEmpty(this.__domEventHandlerList[id])) {
      domEvents.forEach((key, index) => {
        removeEvent(this.plugins[id], key, this.__domEventHandlerList[id][index]);
      });
      delete this.__domEventHandlerList[id];
    }
    delete this.plugins[id];
  }

  /**
   * Set zIndex for a plugins list
   */
  setPluginsZIndex(plugins: Array<string>): void {
    // $FlowFixMe: there are videoElment and container here
    plugins.forEach((key, index) => setStyle(key.match(/^(videoElement|container)$/) ? this[key] : this.plugins[key], 'z-index', ++index));
  }

  /**
   * set attribute on our dom
   * @param {string} attr attribute's name
   * @param {anything} val attribute's value
   * @param {string} target the HTMLElemnt string name, only support video/wrapper/container now
   */
  @waituntil('__dispatcher.videoConfigReady')
  @before(attrOperationCheck, targetCheck)
  setAttr(target: string, attr: string, val: any): void {
    // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
    setAttr(this[target], attr, val);
  }

  @before(attrOperationCheck, targetCheck)
  getAttr(target: string, attr: string): string {
    // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
    return getAttr(this[target], attr);
  }

  @before(attrOperationCheck, targetCheck)
  setStyle(target: string, attr: string, val: any): void {
    // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
    setStyle(this[target], attr, val);
  }

  @before(attrOperationCheck, targetCheck)
  getStyle(target: string, attr: string): string {
    // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
    return getStyle(this[target], attr);
  }

  @before(targetCheck)
  requestFullscreen(target: string) {
    // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
    return esFullscreen.open(this[target]);
  }

  exitFullscreen(): boolean {
    return esFullscreen.exit();
  }

  fullscreen(request: boolean = true, target: string = 'container', ...args: any): boolean {
    return request
      ? this.requestFullscreen(target, ...args)
      : this.exitFullscreen(...args);
  }

  focus() {
    this.videoElement.focus();
  }

  /**
   * function called when we distory
   */
  destroy() {
    this.removeVideo();
    domEvents.forEach((key, index) => {
      removeEvent(this.container, key, this.containerDomEventHandlerList[index]);
      removeEvent(this.wrapper, key, this.wrapperDomEventHandlerList[index]);
    });
    esFullscreen.off('fullscreenchange', this._fullscreenMonitor);
    this.wrapper.innerHTML = this.originHTML;
    delete this.wrapper;
    delete this.plugins;
  }

  /**
   * bind all dom events on one element
   * we will use passive mode if it support
   */
  _addDomEvents(element: Element, handlerList: Array<Function>, handlerGenerate: Function) {
    domEvents.forEach(key => {
      const fn = handlerGenerate(key);
      handlerList.push(fn);
      if (passiveEvents.indexOf(key) > -1) {
        addEvent(element, key, fn, false, { passive: true });
        return;
      }
      addEvent(element, key, fn);
    });
  }

  _autoFocusToVideo(element: Element, remove: boolean = false): void {
    (remove ? removeEvent : addEvent)(element, 'mouseup', this._focusToVideo, false, true);
    (remove ? removeEvent : addEvent)(element, 'touchend', this._focusToVideo, false, true);
  }

  @autobind
  _focusToVideo() {
    const x = window.scrollX;
    const y = window.scrollY;
    isFunction(this.videoElement.focus) && this.videoElement.focus();
    window.scrollTo(x, y);
  }

  @autobind
  _fullscreenMonitor(evt?: Event) {
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
      this.__dispatcher.bus.triggerSync('fullscreenchange', evt);
    }
  }

  /**
   * get the event handler for dom to bind
   */
  _getEventHandler(key: string, { penetrate }: {penetrate: boolean}): Function {
    if ((!penetrate) || [ 'mouseenter', 'mouseleave' ].indexOf(key) < 0) {
      return (...args) => {
        this.__dispatcher.bus.triggerSync(key, ...args);
      };
    }
    const insideVideo = (node: Element): boolean => {
      return this.__videoExtendedNodes.indexOf(node) > -1 ||
        this.__videoExtendedNodes.reduce((flag, video) => {
          if (flag) return flag;
          return isPosterityNode(video, node);
        }, false);
    };
    return (...args) => {
      const { toElement, currentTarget, relatedTarget, type } = args[0];
      const to = toElement || relatedTarget;
      if (this.__mouseInVideo && type === 'mouseleave' && !insideVideo(to)) {
        this.__mouseInVideo = false;
        return this.__dispatcher.bus.triggerSync('mouseleave', ...args);
      }
      if (!this.__mouseInVideo && type === 'mouseenter' && insideVideo(currentTarget)) {
        this.__mouseInVideo = true;
        return this.__dispatcher.bus.triggerSync('mouseenter', ...args);
      }
    };
  }
}
