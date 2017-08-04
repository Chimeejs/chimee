// @flow
import {bind, isString, getDeepProperty, isArray, isObject, isFunction, Log, isEmpty} from 'chimee-helper';
import {videoReadOnlyProperties, videoMethods, kernelMethods, domMethods, domEvents} from 'helper/const';
import {attrAndStyleCheck, eventBinderCheck} from 'helper/checker';
import {accessor, nonenumerable, applyDecorators, watch, alias, before, autobindClass} from 'toxic-decorators';
import VideoConfig from 'dispatcher/video-config';
function propertyAccessibilityWarn (property) {
  /* istanbul ignore else  */
  if(process.env.NODE_ENV !== 'production') Log.warn('chimee', `You are trying to obtain ${property}, we will return you the DOM node. It's not a good idea to handle this by yourself. If you have some requirement, you can tell use by https://github.com/Chimeejs/chimee/issues`);
}
export default @autobindClass() class VideoWrapper {
  __id: string;
  __dispatcher: Dispatcher;
  __unwatchHandlers: Array<Function>;
  __events: PluginEvents;
  __events = {};
  __unwatchHandlers = [];
  __wrapAsVideo (videoConfig: VideoConfig) {
    // bind video read only properties on instance, so that you can get info like buffered
    videoReadOnlyProperties.forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          return this.__dispatcher.dom.videoElement[key];
        },
        set: undefined,
        configurable: false,
        enumerable: false
      });
    });
    // bind videoMethods like canplaytype on instance
    videoMethods.forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          const video = this.__dispatcher.dom.videoElement;
          return bind(video[key], video);
        },
        set: undefined,
        configurable: false,
        enumerable: false
      });
    });
    // bind video config properties on instance, so that you can just set src by this
    const props = videoConfig._realDomAttr.concat(videoConfig._kernelProperty)
    .reduce((props, key) => {
      props[key] = [
        accessor({
          get () {
            // $FlowFixMe: support computed key here
            return videoConfig[key];
          },
          set (value) {
            // $FlowFixMe: support computed key here
            videoConfig[key] = value;
            return value;
          }
        }),
        nonenumerable
      ];
      return props;
    }, {});
    applyDecorators(this, props, {self: true});
    kernelMethods.forEach(key => {
      Object.defineProperty(this, key, {
        value (...args: any) {
          return new Promise((resolve, reject) => {
            this.__dispatcher.bus.once(this.__id, '_' + key, resolve);
            this.__dispatcher.bus[/^(seek)$/.test(key) ? 'emitSync' : 'emit'](key, ...args);
          });
        },
        configurable: true,
        enumerable: false,
        writable: true
      });
    });
    domMethods.forEach(key => {
      if(key === 'fullScreen') return;
      Object.defineProperty(this, key, {
        value (...args: any) {
          return this.__dispatcher.dom[key](...args);
        },
        configurable: true,
        enumerable: false,
        writable: true
      });
    });
  }
  get currentTime (): number {
    return this.__dispatcher.kernel.currentTime;
  }

  set currentTime (second: number) {
    this.__dispatcher.bus.emitSync('seek', second);
  }

  $watch (key: string | Array<string>, handler: Function, {
    deep,
    diff = true,
    other,
    proxy = false
  }: {
    deep?: boolean,
    diff?: boolean,
    other?: any,
    proxy?: boolean
  } = {}) {
    if(!isString(key) && !isArray(key)) throw new TypeError(`$watch only accept string and Array<string> as key to find the target to spy on, but not ${key}, whose type is ${typeof key}`);
    let watching = true;
    const watcher = function (...args) {
      if(watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) bind(handler, this)(...args);
    };
    const unwatcher = () => {
      watching = false;
      const index = this.__unwatchHandlers.indexOf(unwatcher);
      if(index > -1) this.__unwatchHandlers.splice(index, 1);
    };
    const keys = isString(key)
      ? key.split('.')
      : key;
    const property = keys.pop();
    const videoConfig = this.__dispatcher.videoConfig;
    const target = (
      keys.length === 0 &&
      !other &&
      videoConfig._realDomAttr.indexOf(property) > -1
    )
      ? videoConfig
      : ['isFullScreen', 'fullScreenElement'].indexOf(property) > -1
        ? this.__dispatcher.dom
        : getDeepProperty(other || this, keys, {throwError: true});
    applyDecorators(target, {
      [property]: watch(watcher, {deep, diff, proxy})
    }, {self: true});
    this.__unwatchHandlers.push(unwatcher);
    return unwatcher;
  }

  $set (obj: Object | Array<*>, property: string | number, value: any) {
    if(!isObject(obj) && !isArray(obj)) throw new TypeError(`$set only support Array or Object, but not ${obj}, whose type is ${typeof obj}`);
    // $FlowFixMe: we have custom this function
    if(!isFunction(obj.__set)) {
      /* istanbul ignore else  */
      if(process.env.NODE_ENV !== 'production') Log.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $set.`);
      // $FlowFixMe: we support computed string on array here
      obj[property] = value;
      return;
    }
    obj.__set(property, value);
  }

  $del (obj: Object | Array<*>, property: string) {
    if(!isObject(obj) && !isArray(obj)) throw new TypeError(`$del only support Array or Object, but not ${obj}, whose type is ${typeof obj}`);
    // $FlowFixMe: we have custom this function
    if(!isFunction(obj.__del)) {
      /* istanbul ignore else  */
      if(process.env.NODE_ENV !== 'production') Log.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $del.`);
      // $FlowFixMe: we support computed string on array here
      delete obj[property];
      return;
    }
    obj.__del(property);
  }

  load (...args: Array<*>) {
    return new Promise((resolve, reject) => {
      this.__dispatcher.bus.once(this.__id, '_load', resolve);
      this.__dispatcher.bus.emit('load', ...args);
    });
  }

  @alias('silentLoad')
  $silentLoad (...args: Array<*>) {
    return this.__dispatcher.bus.emit('silentLoad')
    .then(() => {
      return this.__dispatcher.silentLoad(...args);
    }).then(result => {
      this.__dispatcher.bus.trigger('silentLoad', result);
    });
  }

  /**
   * call fullscreen api on some specific element
   * @param {boolean} flag true means fullscreen and means exit fullscreen
   * @param {string} element the element you want to fullscreen, default it's container, you can choose from video | container | wrapper
   */
  @alias('fullScreen')
  $fullScreen (flag: boolean = true, element: string = 'container'): boolean {
    if(!this.__dispatcher.bus.emitSync('fullScreen', flag, element)) return false;
    const result = this.__dispatcher.dom.fullScreen(flag, element);
    this.__dispatcher.bus.triggerSync('fullScreen', flag, element);
    return result;
  }

  /**
   * emit an event
   * @param  {string}    key event's name
   * @param  {...args} args
   */
  @alias('emit')
  $emit (key: string, ...args: any) {
    if(!isString(key)) throw new TypeError('emit key parameter must be String');
    /* istanbul ignore else  */
    if(process.env.NODE_ENV !== 'production' && domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
      Log.warn('plugin', `You are try to emit ${key} event. As emit is wrapped in Promise. It make you can't use event.preventDefault and event.stopPropagation. So we advice you to use emitSync`);
    }
    this.__dispatcher.bus.emit(key, ...args);
  }

  /**
   * emit a sync event
   * @param  {string}    key event's name
   * @param  {...args} args
   */
  @alias('emitSync')
  $emitSync (key: string, ...args: any) {
    if(!isString(key)) throw new TypeError('emitSync key parameter must be String');
    return this.__dispatcher.bus.emitSync(key, ...args);
  }

  /**
   * bind event handler through this function
   * @param  {string} key event's name
   * @param  {Function} fn event's handler
   */
  @alias('on')
  @alias('addEventListener')
  @before(eventBinderCheck)
  $on (key: string, fn: Function) {
    this.__dispatcher.bus.on(this.__id, key, fn);
    // set on __events as mark so that i can destroy it when i destroy
    this.__addEvents(key, fn);
  }
  /**
   * remove event handler through this function
   * @param  {string} key event's name
   * @param  {Function} fn event's handler
   */
  @alias('off')
  @alias('removeEventListener')
  @before(eventBinderCheck)
  $off (key: string, fn: Function) {
    this.__dispatcher.bus.off(this.__id, key, fn);
    this.__removeEvents(key, fn);
  }
  /**
   * bind one time event handler
   * @param {string} key event's name
   * @param {Function} fn event's handler
   */
  @alias('once')
  @before(eventBinderCheck)
  $once (key: string, fn: Function) {
    const self = this;
    const boundFn = function (...args) {
      bind(fn, this)(...args);
      self.__removeEvents(key, boundFn);
    };
    self.__addEvents(key, boundFn);
    this.__dispatcher.bus.once(this.__id, key, boundFn);
  }

  /**
   * set style
   * @param {string} element optional, default to be video, you can choose from video | container | wrapper
   * @param {string} attribute the atrribue name
   * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
   */
  @alias('css')
  @before(attrAndStyleCheck)
  $css (method: string, ...args: Array<any>): string {
    return this.__dispatcher.dom[method + 'Style'](...args);
  }

  /**
   * set attr
   * @param {string} element optional, default to be video, you can choose from video | container | wrapper
   * @param {string} attribute the atrribue nameß
   * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
   */
  @alias('attr')
  @before(attrAndStyleCheck)
  $attr (method: string, ...args: Array<any>): string {
    if(method === 'set' && /video/.test(args[0])) {
      if(!this.__dispatcher.videoConfigReady) {
        /* istanbul ignore else  */
        if(process.env.NODE_ENV !== 'production') Log.warn('chimee', `${this.__id} is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger`);
        return args[2];
      }
      if(this.__dispatcher.videoConfig._realDomAttr.indexOf(args[1]) > -1) {
        const [, key, val] = args;
        this.__dispatcher.videoConfig[key] = val;
        return val;
      }
    }
    return this.__dispatcher.dom[method + 'Attr'](...args);
  }

  @nonenumerable
  get $plugins (): plugins {
    return this.__dispatcher.plugins;
  }
  @nonenumerable
  get $pluginOrder (): Array<string> {
    return this.__dispatcher.order;
  }
  @nonenumerable
  get $wrapper (): HTMLElement {
    propertyAccessibilityWarn('wrapper');
    return this.__dispatcher.dom.wrapper;
  }
  @nonenumerable
  get $container (): HTMLElement {
    propertyAccessibilityWarn('container');
    return this.__dispatcher.dom.container;
  }
  @nonenumerable
  get $video (): HTMLElement {
    propertyAccessibilityWarn('video');
    return this.__dispatcher.dom.videoElement;
  }

  get isFullScreen (): boolean | string {
    return this.__dispatcher.dom.isFullScreen;
  }

  get fullScreenElement (): HTMLElement | string | void {
    return this.__dispatcher.dom.fullScreenElement;
  }

  __addEvents (key: string, fn: Function) {
    this.__events[key] = this.__events[key] || [];
    this.__events[key].push(fn);
  }
  __removeEvents (key: string, fn: Function) {
    if(isEmpty(this.__events[key])) return;
    const index = this.__events[key].indexOf(fn);
    if(index < 0) return;
    this.__events[key].splice(index, 1);
    if(isEmpty(this.__events[key])) delete this.__events[key];
  }

  __destroy () {
    this.__unwatchHandlers.forEach(unwatcher => unwatcher());
    Object.keys(this.__events)
    .forEach(key => {
      if(!isArray(this.__events[key])) return;
      this.__events[key].forEach(fn => this.$off(key, fn));
    });
    delete this.__events;
  }
}
