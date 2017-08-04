// @flow
import {isArray, isElement, isString, isHTMLString, hypenate, isFunction, isEmpty, isPosterityNode, isObject, isBoolean, $, setStyle, getStyle, setAttr, addEvent, getAttr, removeEvent, addClassName, Log} from 'chimee-helper';
import {videoEvents, domEvents} from 'helper/const';
import {autobind, before, waituntil} from 'toxic-decorators';
function targetCheck (target: string, ...args) {
  if(target === 'video') target = 'videoElement';
  if(!isElement(this[target])) throw new TypeError('Your target ' + target + ' is not a legal HTMLElement');
  return [target, ...args];
}
function attrOperationCheck (target: string, attr: string, val: any): Array<any> {
  if(!isString(attr)) throw new TypeError("to handle dom's attribute or style, your attr parameter must be string");
  if(!isString(target)) throw new TypeError("to handle dom's attribute or style, your target parameter must be string");
  return [target, attr, val];
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
  isFullScreen: boolean | string;
  fullScreenElement: HTMLElement | string | void;
  __dispatcher: Dispatcher;
  __domEventHandlerList: {|[string]: Array<Function>|};
  __mouseInVideo: boolean;
  __videoExtendedNodes: Array<Node>;
  /**
   * @param  {string|Element} wrapper the wrapper of Chimee. All dom including videoElement will build in it.
   * @return {Dom}
   */
  /**
   * all plugin's dom element set
   * @type {Object}
   * @member plugins
   */
  plugins = {};
  /**
   * the html to restore when we are destroyed
   * @type {HTMLString}
   */
  originHTML = '';
  /**
   * Array to store all video event handler
   * @type {Array}
   * @member videoEventHandlerList
   */
  videoEventHandlerList = [];
  /**
   * Array to store all video dom event handler
   * @type {Array}
   * @member videoDomEventHandlerList
   */
  videoDomEventHandlerList = [];
  /**
   * Array to store all container dom event handler
   * @type {Array}
   * @member containerDomEventHandlerList
   */
  containerDomEventHandlerList = [];
  /**
   * Array to store all video dom event handler
   * @type {Array}
   * @member wrapperDomEventHandlerList
   */
  wrapperDomEventHandlerList = [];
  /**
   * Object to store different plugin's dom event handlers
   * @type {Object}
   * @member __domEventHandlerList
   */
  __domEventHandlerList = {};
  /**
   * to mark is the mouse in the video area
   * @type {boolean}
   * @member __mouseInVideo
   */
  __mouseInVideo = false;
  __videoExtendedNodes = [];
  isFullScreen = false;
  fullScreenElement = undefined;
  constructor (wrapper: string | Element, dispatcher: Dispatcher) {
    this.__dispatcher = dispatcher;
    if(!isElement(wrapper) && !isString(wrapper)) throw new TypeError('Illegal wrapper');
    const $wrapper = $(wrapper);
    if($wrapper.length === 0) {
      throw new TypeError('Can not get dom node accroding wrapper. Please check your wrapper');
    }
    /**
     * the referrence of the dom wrapper of whole Chimee
     * @type {Element}
     */
    this.wrapper = $wrapper[0];
    this.originHTML = this.wrapper.innerHTML;
    // if we find video element inside wrapper
    // we use it
    // or we create a video element by ourself.
    let videoElement = $wrapper.find('video')[0];
    if(!videoElement) {
      videoElement = document.createElement('video');
    }
    /**
     * referrence of video's dom element
     * @type {Element}
     */
    this.installVideo(videoElement);
    domEvents.forEach(key => {
      const cfn = (...args) => this.__dispatcher.bus.triggerSync('c_' + key, ...args);
      this.containerDomEventHandlerList.push(cfn);
      addEvent(this.container, key, cfn);
      const wfn = (...args) => this.__dispatcher.bus.triggerSync('w_' + key, ...args);
      this.wrapperDomEventHandlerList.push(wfn);
      addEvent(this.wrapper, key, wfn);
    });
    this._bindFullScreen();
  }
  installVideo (videoElement: HTMLVideoElement): HTMLVideoElement {
    this.__videoExtendedNodes.push(videoElement);
    setAttr(videoElement, 'tabindex', -1);
    this._autoFocusToVideo(videoElement);
    if(!isElement(this.container)) {
      // create container
      if(videoElement.parentElement &&
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
      if(container.childNodes.length === 0) {
        container.appendChild(videoElement);
      } else {
        container.insertBefore(videoElement, container.childNodes[0]);
      }
    }
    // check container.position
    if(this.container.parentElement !== this.wrapper) {
      $(this.wrapper).append(this.container);
    }
    videoEvents.forEach(key => {
      const fn = (...args) => this.__dispatcher.bus.trigger(key, ...args);
      this.videoEventHandlerList.push(fn);
      addEvent(videoElement, key, fn);
    });
    domEvents.forEach(key => {
      const fn = this._getEventHandler(key, {penetrate: true});
      this.videoDomEventHandlerList.push(fn);
      addEvent(videoElement, key, fn);
    });
    this.videoElement = videoElement;
    return videoElement;
  }
  removeVideo (): HTMLVideoElement {
    const videoElement = this.videoElement;
    this._autoFocusToVideo(this.videoElement, false);
    videoEvents.forEach((key, index) => {
      removeEvent(this.videoElement, key, this.videoEventHandlerList[index]);
    });
    domEvents.forEach((key, index) => {
      removeEvent(this.videoElement, key, this.videoDomEventHandlerList[index]);
    });
    $(videoElement).remove();
    delete this.videoElement;
    return videoElement;
  }
  /**
   * <pre>
   * each plugin has its own dom node, this function will create one or them.
   * we support multiple kind of el
   * 1. Element, we will append this dom node on wrapper straight
   * 2. HTMLString, we will create dom based on this HTMLString and append it on wrapper
   * 3. string, we will transfer this string into hypen string, then we create a custom elment called by this and bind it on wrapper
   * 4. nothing, we will create a div and bind it on the wrapper
   * </pre>
   * @param  {string} id plugin's id
   * @param  {string|Element} el(optional) the el can be custom dom element or html string to insert
   * @param  {boolean} inner if it's true, we will put it into conatiner, else we would put it into outer
   * @return {Node}
   */
  insertPlugin (id: string, el?: string | Element, option: {inner?: boolean, penetrate?: boolean, autoFocus?: boolean, className?: string | Array<string>} = {}) {
    if(!isString(id)) throw new TypeError('insertPlugin id parameter must be string');
    if(isElement(this.plugins[id])) {
      /* istanbul ignore else  */
      if(process.env.NODE_ENV !== 'production') Log.warn('Dispatcher.dom', `Plugin ${id} have already had a dom node. Now it will be replaced`);
      this.removePlugin(id);
    }
    if(isString(el)) {
      if(isHTMLString(el)) {
        const outer = document.createElement('div');
        outer.innerHTML = el;
        el = outer.children[0];
      } else {
        el = document.createElement(hypenate(el));
      }
    } else if(isObject(el)) {
      option = el;
    }
    const {inner, penetrate, autoFocus} = option;
    let {className} = option;
    const node = (el && isElement(el)) ? el : document.createElement('div');
    if(isArray(className)) {
      className = className.join(' ');
    }
    if(isString(className)) {
      addClassName(node, className);
    }
    this.plugins[id] = node;
    const outerElement = inner ? this.container : this.wrapper;
    const originElement = inner ? this.videoElement : this.container;
    if(isBoolean(autoFocus) ? autoFocus : inner) this._autoFocusToVideo(node);
    // auto forward the event if this plugin can be penetrate
    if(penetrate) {
      this.__domEventHandlerList[id] = this.__domEventHandlerList[id] || [];
      domEvents.forEach(key => {
        const fn = this._getEventHandler(key, {penetrate});
        addEvent(node, key, fn);
        this.__domEventHandlerList[id].push(fn);
      });
      this.__videoExtendedNodes.push(node);
    }
    if(outerElement.lastChild === originElement) {
      outerElement.appendChild(node);
      return node;
    }
    outerElement.insertBefore(node, originElement.nextSibling);
    return node;
  }
  /**
   * remove plugin's dom
   * @param  {string} id
   */
  removePlugin (id: string) {
    if(!isString(id)) return;
    const dom = this.plugins[id];
    if(isElement(dom)) {
      dom.parentNode && dom.parentNode.removeChild(dom);
      this._autoFocusToVideo(dom, true);
    }
    if(!isEmpty(this.__domEventHandlerList[id])) {
      domEvents.forEach((key, index) => {
        removeEvent(this.plugins[id], key, this.__domEventHandlerList[id][index]);
      });
      delete this.__domEventHandlerList[id];
    }
    delete this.plugins[id];
  }
  /**
   * Set zIndex for a plugins list
   * @param {Array<string>} plugins
   */
  setPluginsZIndex (plugins: Array<string>): void {
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
  setAttr (target: string, attr: string, val: any): void {
    // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
    setAttr(this[target], attr, val);
  }
  @before(attrOperationCheck, targetCheck)
  getAttr (target: string, attr: string): string {
    // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
    return getAttr(this[target], attr);
  }
  @before(attrOperationCheck, targetCheck)
  setStyle (target: string, attr: string, val: any): void {
    // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
    setStyle(this[target], attr, val);
  }
  @before(attrOperationCheck, targetCheck)
  getStyle (target: string, attr: string): string {
    // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
    return getStyle(this[target], attr);
  }
  @before(targetCheck)
  requestFullScreen (target: string) {
    const methods = [
      'requestFullscreen',
      'mozRequestFullScreen',
      'webkitRequestFullscreen',
      'msRequestFullscreen'
    ];
    for(let i = 0, len = methods.length; i < len; i++) {
      // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
      if(isFunction(this[target][methods[i]])) {
        // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
        this[target][methods[i]]();
        return true;
      }
    }
    return false;
  }
  exitFullScreen (): boolean {
    const methods = [
      'exitFullscreen',
      'msExitFullscreen',
      'mozCancelFullScreen',
      'webkitExitFullscreen'
    ];
    for(let i = 0, len = methods.length; i < len; i++) {
      // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
      if(isFunction(document[methods[i]])) {
        // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
        document[methods[i]]();
        return true;
      }
    }
    return false;
  }
  fullScreen (request: boolean = true, target: string = 'container', ...args: any): boolean {
    return request
      ? this.requestFullScreen(target, ...args)
      : this.exitFullScreen(...args);
  }
  focus () {
    this.videoElement.focus();
  }
  /**
   * function called when we distory
   */
  destroy () {
    this.removeVideo();
    domEvents.forEach((key, index) => {
      removeEvent(this.container, key, this.containerDomEventHandlerList[index]);
      removeEvent(this.wrapper, key, this.wrapperDomEventHandlerList[index]);
    });
    this._bindFullScreen(true);
    this.wrapper.innerHTML = this.originHTML;
    delete this.wrapper;
    delete this.plugins;
  }
  _autoFocusToVideo (element: Element, remove: boolean = false): void {
    (remove ? removeEvent : addEvent)(element, 'mouseup', this._focusToVideo, false, true);
    (remove ? removeEvent : addEvent)(element, 'touchend', this._focusToVideo, false, true);
  }
  @autobind
  _focusToVideo (evt: Event) {
    const x = window.scrollX;
    const y = window.scrollY;
    isFunction(this.videoElement.focus) && this.videoElement.focus();
    window.scrollTo(x, y);
  }
  @autobind
  _fullScreenMonitor () {
    const element = [
      'fullscreenElement',
      'webkitFullscreenElement',
      'mozFullScreenElement',
      'msFullscreenElement'
    ].reduce((element, key) => {
      // $FlowFixMe: support computed element on document
      return element || document[key];
    }, null);
    if(!element || (!isPosterityNode(this.wrapper, element) && element !== this.wrapper)) {
      this.isFullScreen = false;
      this.fullScreenElement = undefined;
      return;
    }
    this.isFullScreen = true;
    this.fullScreenElement = this.wrapper === element
      ? 'wrapper'
      : this.container === element
        ? 'container'
        : this.videoElement === element
          ? 'video'
          : element;
  }
  _bindFullScreen (remove?: boolean) {
    if(!remove) this._fullScreenMonitor();
    [
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'msfullscreenchange',
      'fullscreenchange'
    ].forEach(key => {
      // $FlowFixMe: support computed element on document
      document[(remove ? 'remove' : 'add') + 'EventListener'](key, this._fullScreenMonitor);
    });
  }
  /**
   * get the event handler for dom to bind
   */
  _getEventHandler (key: string, {penetrate}: {penetrate: boolean}): Function {
    if((!penetrate) || ['mouseenter', 'mouseleave'].indexOf(key) < 0) {
      return (...args) => {
        this.__dispatcher.bus.triggerSync(key, ...args);
      };
    }
    const insideVideo = (node: Element): boolean => {
      return this.__videoExtendedNodes.indexOf(node) > -1 ||
        this.__videoExtendedNodes.reduce((flag, video) => {
          if(flag) return flag;
          return isPosterityNode(video, node);
        }, false);
    };
    return (...args) => {
      const {toElement, currentTarget, relatedTarget, type} = args[0];
      const to = toElement || relatedTarget;
      if(this.__mouseInVideo && type === 'mouseleave' && !insideVideo(to)) {
        this.__mouseInVideo = false;
        return this.__dispatcher.bus.triggerSync('mouseleave', ...args);
      }
      if(!this.__mouseInVideo && type === 'mouseenter' && insideVideo(currentTarget)) {
        this.__mouseInVideo = true;
        return this.__dispatcher.bus.triggerSync('mouseenter', ...args);
      }
    };
  }
}
