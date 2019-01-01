// @flow
import { bind, deepAssign, getDeepProperty, isArray, isEmpty, isFunction, isObject, isString, Log } from 'chimee-helper';
import VideoConfig from 'config/video';
import { attrAndStyleCheck, eventBinderCheck } from 'helper/checker';
import { domEvents, domMethods, kernelMethods, videoMethods, videoReadOnlyProperties } from 'const/event';
import { accessor, alias, applyDecorators, autobindClass, before, nonenumerable, watch } from 'toxic-decorators';
export default class VideoWrapper {
  @nonenumerable
  get $container(): HTMLElement {
    return this.__dispatcher.dom.container;
  }
  @nonenumerable
  get $pluginOrder(): string[] {
    return this.__dispatcher.order;
  }

  @nonenumerable
  get $plugins(): plugins {
    return this.__dispatcher.plugins;
  }
  @nonenumerable
  get $video(): HTMLVideoElement {
    return this.__dispatcher.dom.videoElement;
  }
  @nonenumerable
  get $wrapper(): HTMLElement {
    return this.__dispatcher.dom.wrapper;
  }

  get container(): VesselConfig {
    return this.__dispatcher.containerConfig;
  }

  set container(config: Object): VesselConfig {
    if (!isObject(config)) {
      throw new Error(`The config of container must be Object, but not ${typeof config}.`);
    }
    deepAssign(this.__dispatcher.containerConfig, config);
    return this.__dispatcher.container;
  }
  get currentTime(): number {
    return this.__dispatcher.kernel.currentTime;
  }

  set currentTime(second: number) {
    this.__dispatcher.binder.emitSync({
      name: 'seek',
      target: 'video',
      id: this.__id,
    }, second);
  }

  get fullscreenElement(): HTMLElement | string | void {
    return this.__dispatcher.dom.fullscreenElement;
  }

  @nonenumerable
  get inPictureInPictureMode(): boolean {
    return this.__dispatcher.inPictureInPictureMode;
  }

  get isFullscreen(): boolean | string {
    return this.__dispatcher.dom.isFullscreen;
  }

  @nonenumerable
  get pictureInPictureWindow(): void | Object {
    return window.__chimee_picture_in_picture_window;
  }

  get videoRequireGuardedAttributes(): string[] {
    return this.__dispatcher.dom.videoRequireGuardedAttributes;
  }
  public __dispatcher: Dispatcher;
  public __events: PluginEvents;
  public __events = {};
  public __id: string;
  public __unwatchHandlers: Function[];
  public __unwatchHandlers = [];
  public play: Function;

  public __addEvents(key: string, fn: Function) {
    this.__events[key] = this.__events[key] || [];
    this.__events[key].push(fn);
  }

  public __destroy() {
    this.__unwatchHandlers.forEach((unwatcher) => unwatcher());
    Object.keys(this.__events)
      .forEach((key) => {
        if (!isArray(this.__events[key])) { return; }
        this.__events[key].forEach((fn) => this.$off(key, fn));
      });
    delete this.__events;
  }
  public __removeEvents(key: string, fn: Function) {
    if (isEmpty(this.__events[key])) { return; }
    const index = this.__events[key].indexOf(fn);
    if (index < 0) { return; }
    this.__events[key].splice(index, 1);
    if (isEmpty(this.__events[key])) { delete this.__events[key]; }
  }
  public __wrapAsVideo(videoConfig: VideoConfig) {
    // bind video read only properties on instance, so that you can get info like buffered
    videoReadOnlyProperties.forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return this.__dispatcher.dom.videoElement[key];
        },
        set: undefined,
        configurable: false,
        enumerable: false,
      });
    });
    // bind videoMethods like canplaytype on instance
    videoMethods.forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          const video = this.__dispatcher.dom.videoElement;
          return bind(video[key], video);
        },
        set: undefined,
        configurable: false,
        enumerable: false,
      });
    });
    // bind video config properties on instance, so that you can just set src by this
    const props = videoConfig._realDomAttr.concat(videoConfig._kernelProperty)
      .reduce((props, key) => {
        props[key] = [
          accessor({
            get() {
            // $FlowFixMe: support computed key here
              return videoConfig[key];
            },
            set(value) {
            // $FlowFixMe: support computed key here
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
        value(...args: any) {
          return new Promise((resolve) => {
            const id = this.__id;
            this.__dispatcher.binder.once({
              id,
              name: '_' + key,
              fn: resolve,
            });
            this.__dispatcher.binder[/^(seek)$/.test(key) ? 'emitSync' : 'emit']({
              target: 'video',
              name: key,
              id,
            }, ...args);
          });
        },
        configurable: true,
        enumerable: false,
        writable: true,
      });
    });
    domMethods.forEach((key) => {
      if (key === 'fullscreen') { return; }
      Object.defineProperty(this, key, {
        value(...args: any) {
          return this.__dispatcher.dom[key](...args);
        },
        configurable: true,
        enumerable: false,
        writable: true,
      });
    });
  }

  /**
   * set attr
   * @param {string} element optional, default to be video, you can choose from video | container | wrapper
   * @param {string} attribute the atrribue nameß
   * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
   */
  @alias('attr')
  @before(attrAndStyleCheck)
  public $attr(method: string, ...args: any[]): string {
    if (method === 'set' && /video/.test(args[0])) {
      if (!this.__dispatcher.videoConfigReady) {
        /* istanbul ignore else  */
        if (process.env.NODE_ENV !== 'production') { Log.warn('chimee', `${this.__id} is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger`); }
        return args[2];
      }
      if (this.__dispatcher.videoConfig._realDomAttr.indexOf(args[1]) > -1) {
        const [ , key, val ] = args;
        this.__dispatcher.videoConfig[key] = val;
        return val;
      }
    }
    return this.__dispatcher.dom[method + 'Attr'](...args);
  }

  /**
   * set style
   * @param {string} element optional, default to be video, you can choose from video | container | wrapper
   * @param {string} attribute the atrribue name
   * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
   */
  @alias('css')
  @before(attrAndStyleCheck)
  public $css(method: string, ...args: any[]): string {
    return this.__dispatcher.dom[method + 'Style'](...args);
  }

  public $del(obj: Object | Array<*>, property: string) {
    if (!isObject(obj) && !isArray(obj)) { throw new TypeError(`$del only support Array or Object, but not ${obj}, whose type is ${typeof obj}`); }
    // $FlowFixMe: we have custom this function
    if (!isFunction(obj.__del)) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') { Log.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $del.`); }
      // $FlowFixMe: we support computed string on array here
      delete obj[property];
      return;
    }
    obj.__del(property);
  }

  /**
   * emit an event
   * @param  {string}    key event's name
   * @param  {...args} args
   */
  @alias('emit')
  public $emit(key: string | {
    name: string,
    target: binderTarget,
  },           ...args: any) {
    let target: binderTarget | void;
    if (isObject(key) && isString(key.name) && isString(key.target)) {
      target = key.target;
      key = key.name;
    }
    if (!isString(key)) { throw new TypeError('emit key parameter must be String'); }
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production' && domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
      Log.warn('plugin', `You are try to emit ${key} event. As emit is wrapped in Promise. It make you can't use event.preventDefault and event.stopPropagation. So we advice you to use emitSync`);
    }
    return this.__dispatcher.binder.emit({
      name: key,
      id: this.__id,
      target,
    }, ...args);
  }

  /**
   * emit a sync event
   * @param  {string}    key event's name
   * @param  {...args} args
   */
  @alias('emitSync')
  public $emitSync(key: string | {
    name: string,
    target: binderTarget,
  },               ...args: any) {
    let target;
    if (isObject(key) && isString(key.name) && isString(key.target)) {
      target = key.target;
      key = key.name;
    }
    if (!isString(key)) { throw new TypeError('emitSync key parameter must be String'); }
    return this.__dispatcher.binder.emitSync({
      name: key,
      id: this.__id,
      target,
    }, ...args);
  }

  /**
   * call fullscreen api on some specific element
   * @param {boolean} flag true means fullscreen and means exit fullscreen
   * @param {string} element the element you want to fullscreen, default it's container, you can choose from video | container | wrapper
   */
  @alias('fullScreen')
  @alias('$fullScreen')
  @alias('fullscreen')
  public $fullscreen(flag: boolean = true, element: string = 'container'): boolean {
    if (!this.__dispatcher.binder.emitSync({
      name: 'fullscreen',
      id: this.__id,
      target: 'video-dom',
    }, flag, element)) { return false; }
    const result = this.__dispatcher.dom.fullscreen(flag, element);
    this.__dispatcher.binder.triggerSync({
      name: 'fullscreen',
      id: this.__id,
      target: 'video-dom',
    }, flag, element);
    return result;
  }
  /**
   * remove event handler through this function
   * @param  {string} key event's name
   * @param  {Function} fn event's handler
   */
  @alias('off')
  @alias('removeEventListener')
  @before(eventBinderCheck)
  public $off(key: string, fn: Function, options: eventOptions = {}) {
    const eventInfo = Object.assign({}, options, {
      name: key,
      id: this.__id,
      fn,
    });
    this.__dispatcher.binder.off(eventInfo);
    this.__removeEvents(key, fn);
  }

  /**
   * bind event handler through this function
   * @param  {string} key event's name
   * @param  {Function} fn event's handler
   */
  @alias('on')
  @alias('addEventListener')
  @before(eventBinderCheck)
  public $on(key: string, fn: Function, options: eventOptions = {}) {
    const eventInfo = Object.assign({}, options, {
      name: key,
      id: this.__id,
      fn,
    });
    this.__dispatcher.binder.on(eventInfo);
    // set on __events as mark so that i can destroy it when i destroy
    this.__addEvents(key, fn);
  }
  /**
   * bind one time event handler
   * @param {string} key event's name
   * @param {Function} fn event's handler
   */
  @alias('once')
  @before(eventBinderCheck)
  public $once(key: string, fn: Function, options: eventOptions = {}) {
    const self = this;
    const boundFn = function(...args) {
      bind(fn, this)(...args);
      self.__removeEvents(key, boundFn);
    };
    self.__addEvents(key, boundFn);
    const eventInfo = Object.assign({}, options, {
      name: key,
      id: this.__id,
      fn: boundFn,
    });
    this.__dispatcher.binder.once(eventInfo);
  }

  public $set(obj: Object | Array<*>, property: string | number, value: any) {
    if (!isObject(obj) && !isArray(obj)) { throw new TypeError(`$set only support Array or Object, but not ${obj}, whose type is ${typeof obj}`); }
    // $FlowFixMe: we have custom this function
    if (!isFunction(obj.__set)) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') { Log.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $set.`); }
      // $FlowFixMe: we support computed string on array here
      obj[property] = value;
      return;
    }
    obj.__set(property, value);
  }

  @alias('silentLoad')
  public $silentLoad(...args: Array<*>) {
    return this.__dispatcher.binder.emit({
      name: 'silentLoad',
      target: 'video',
      id: this.__id,
    })
      .then(() => {
        return this.__dispatcher.silentLoad(...args);
      }).then((result) => {
        this.__dispatcher.binder.trigger({
          name: 'silentLoad',
          target: 'video',
          id: this.__id,
        }, result);
      });
  }

  public $watch(key: string | string[], handler: Function, {
    deep,
    diff = true,
    other,
    proxy = false,
  }: {
    deep?: boolean,
    diff?: boolean,
    other?: any,
    proxy?: boolean,
  } = {}) {
    if (!isString(key) && !isArray(key)) { throw new TypeError(`$watch only accept string and Array<string> as key to find the target to spy on, but not ${key}, whose type is ${typeof key}`); }
    let watching = true;
    const watcher = function(...args) {
      if (watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) { bind(handler, this)(...args); }
    };
    const unwatcher = () => {
      watching = false;
      const index = this.__unwatchHandlers.indexOf(unwatcher);
      if (index > -1) { this.__unwatchHandlers.splice(index, 1); }
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
      : [ 'isFullscreen', 'fullscreenElement' ].indexOf(property) > -1
        ? this.__dispatcher.dom
        : getDeepProperty(other || this, keys, { throwError: true });
    applyDecorators(target, {
      [property]: watch(watcher, { deep, diff, proxy }),
    }, { self: true });
    this.__unwatchHandlers.push(unwatcher);
    return unwatcher;
  }

  public exitPictureInPicture() {
    return this.__dispatcher.binder.emit({
      target: 'video',
      name: 'leavepictureinpicture',
      id: this.__id,
    });
  }

  public load(...args: Array<*>): Promise<*> {
    return new Promise((resolve) => {
      this.__dispatcher.binder.once({
        id: this.__id,
        name: '_load',
        target: 'plugin',
        fn: resolve,
      });
      this.__dispatcher.binder.emit({
        name: 'load',
        target: 'plugin',
        id: this.__id,
      }, ...args);
    });
  }

  public requestPictureInPicture() {
    return this.__dispatcher.binder.emit({
      target: 'video',
      name: 'enterpictureinpicture',
      id: this.__id,
    });
  }
}
