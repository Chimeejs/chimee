
import { chimeeLog } from 'chimee-helper-log';
import VideoConfig from 'config/video';
import { domEvents } from 'const/event';
import { domMethods, kernelMethods, videoMethods } from 'const/method';
import { videoReadOnlyProperties } from 'const/property';
import { attrAndStyleCheck, eventBinderCheck } from 'helper/checker';
import { isArray, isFunction, isPlainObject, isString } from 'lodash';
import { accessor, alias, applyDecorators, autobindClass, before, nonenumerable, watch } from 'toxic-decorators';
import { isEmpty } from 'toxic-predicate-functions';
import { bind, getDeepProperty } from 'toxic-utils';
import { BinderTarget, EventOptions, VesselConfig } from 'typings/base';

// TODO: change later
type Dispatcher = any;
export default class VideoWrapper {
  @nonenumerable
  get $container(): HTMLElement {
    return this.dispatcher.dom.container;
  }
  @nonenumerable
  get $pluginOrder(): string[] {
    return this.dispatcher.order;
  }

  @nonenumerable
  get $plugins(): { [id: string]: Plugin } {
    return this.dispatcher.plugins;
  }
  @nonenumerable
  get $video(): HTMLVideoElement {
    return this.dispatcher.dom.videoElement;
  }
  @nonenumerable
  get $wrapper(): HTMLElement {
    return this.dispatcher.dom.wrapper;
  }

  get container(): VesselConfig {
    return this.dispatcher.containerConfig;
  }

  set container(config: VesselConfig) {
    if (!isPlainObject(config)) {
      throw new Error(`The config of container must be Object, but not ${typeof config}.`);
    }
    Object.assign(this.dispatcher.containerConfig, config);
  }
  get currentTime(): number {
    return this.dispatcher.kernel.currentTime;
  }

  set currentTime(second: number) {
    this.dispatcher.binder.emitSync({
      id: this.id,
      name: 'seek',
      target: 'video',
    }, second);
  }
  protected dispatcher: Dispatcher;

  get fullscreenElement(): HTMLElement | string | void {
    return this.dispatcher.dom.fullscreenElement;
  }

  @nonenumerable
  get inPictureInPictureMode(): boolean {
    return this.dispatcher.inPictureInPictureMode;
  }

  get isFullscreen(): boolean | string {
    return this.dispatcher.dom.isFullscreen;
  }

  @nonenumerable
  get pictureInPictureWindow(): void | Object {
    return window.__chimee_picture_in_picture_window;
  }

  get videoRequireGuardedAttributes(): string[] {
    return this.dispatcher.dom.videoRequireGuardedAttributes;
  }
  protected id: string;
  private events: { [evetName: string]: Array<(...args: any[]) => any> } = {};
  private unwatchHandlers: Array<(...args: any[]) => any> = [];

  constructor({ dispatcher, id }: { dispatcher: Dispatcher, id: string }) {
    this.dispatcher = dispatcher;
    this.id = id;
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
      if (!this.dispatcher.videoConfigReady) {
        /* istanbul ignore else  */
        if (process.env.NODE_ENV !== 'production') {
          chimeeLog.warn('chimee', `${this.id} is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger`);
        }
        return args[2];
      }
      if (this.dispatcher.videoConfig._realDomAttr.indexOf(args[1]) > -1) {
        const [ , key, val ] = args;
        this.dispatcher.videoConfig[key] = val;
        return val;
      }
    }
    return this.dispatcher.dom[method + 'Attr'](...args);
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
    return this.dispatcher.dom[method + 'Style'](...args);
  }

  public $del(obj: any, property: string) {
    if (!isPlainObject(obj) && !isArray(obj)) { throw new TypeError(`$del only support Array or Object, but not ${obj}, whose type is ${typeof obj}`); }
    if (!isFunction(obj.__del)) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') { chimeeLog.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $del.`); }
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
  public $emit(
    key: string | {
      name: string,
      target: BinderTarget,
    },
    ...args: any) {
    let target: BinderTarget | void;
    if (!isString(key) && isString(key.name) && isString(key.target)) {
      target = key.target;
      key = key.name;
    }
    if (!isString(key)) {
      throw new TypeError('emit key parameter must be String');
    }
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production' && domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
      chimeeLog.warn('plugin', `You are try to emit ${key} event. As emit is wrapped in Promise. It make you can't use event.preventDefault and event.stopPropagation. So we advice you to use emitSync`);
    }
    return this.dispatcher.binder.emit({
      id: this.id,
      name: key,
      target,
    }, ...args);
  }

  /**
   * emit a sync event
   * @param  {string}    key event's name
   * @param  {...args} args
   */
  @alias('emitSync')
  public $emitSync(
    key: string | {
      name: string,
      target: BinderTarget,
    },
    ...args: any) {
    let target;
    if (!isString(key) && isString(key.name) && isString(key.target)) {
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

  /**
   * call fullscreen api on some specific element
   * @param {boolean} flag true means fullscreen and means exit fullscreen
   * @param {string} element the element you want to fullscreen, default it's container, you can choose from video | container | wrapper
   */
  @alias('fullScreen')
  @alias('$fullScreen')
  @alias('fullscreen')
  public $fullscreen(flag: boolean = true, element: string = 'container'): boolean {
    if (!this.dispatcher.binder.emitSync({
      id: this.id,
      name: 'fullscreen',
      target: 'video-dom',
    }, flag, element)) { return false; }
    const result = this.dispatcher.dom.fullscreen(flag, element);
    this.dispatcher.binder.triggerSync({
      id: this.id,
      name: 'fullscreen',
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
  public $off(key: string, fn: (...args: any[]) => any, options: EventOptions = {}) {
    const eventInfo = Object.assign({}, options, {
      fn,
      id: this.id,
      name: key,
    });
    this.dispatcher.binder.off(eventInfo);
    this.removeEvents(key, fn);
  }

  /**
   * bind event handler through this function
   * @param  {string} key event's name
   * @param  {Function} fn event's handler
   */
  @alias('on')
  @alias('addEventListener')
  @before(eventBinderCheck)
  public $on(key: string, fn: (...args: any[]) => any, options: EventOptions = {}) {
    const eventInfo = Object.assign({}, options, {
      fn,
      id: this.id,
      name: key,
    });
    this.dispatcher.binder.on(eventInfo);
    // set on events as mark so that i can destroy it when i destroy
    this.addEvents(key, fn);
  }
  /**
   * bind one time event handler
   * @param {string} key event's name
   * @param {Function} fn event's handler
   */
  @alias('once')
  @before(eventBinderCheck)
  public $once(key: string, fn: (...args: any[]) => any, options: EventOptions = {}) {
    const self = this;
    const boundFn = function(...args: any[]) {
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

  public $set(obj: any, property: string | number, value: any) {
    if (!isPlainObject(obj) && !isArray(obj)) { throw new TypeError(`$set only support Array or Object, but not ${obj}, whose type is ${typeof obj}`); }
    // $FlowFixMe: we have custom this function
    if (!isFunction(obj.__set)) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') {
        chimeeLog.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $set.`);
      }
      // $FlowFixMe: we support computed string on array here
      obj[property] = value;
      return;
    }
    obj.__set(property, value);
  }

  @alias('silentLoad')
  public $silentLoad(...args: any[]) {
    return this.dispatcher.binder.emit({
      id: this.id,
      name: 'silentLoad',
      target: 'video',
    })
      .then(() => {
        return this.dispatcher.silentLoad(...args);
      }).then((result: any) => {
        this.dispatcher.binder.trigger({
          id: this.id,
          name: 'silentLoad',
          target: 'video',
        }, result);
      });
  }

  public $watch(key: string | string[], handler: (...args: any[]) => any, {
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
    const watcher = function(...args: any[]) {
      if (watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) { bind(handler, this)(...args); }
    };
    const unwatcher = () => {
      watching = false;
      const index = this.unwatchHandlers.indexOf(unwatcher);
      if (index > -1) { this.unwatchHandlers.splice(index, 1); }
    };
    const keys = isString(key)
      ? key.split('.')
      : key;
    const property = keys.pop();
    const videoConfig = this.dispatcher.videoConfig;
    const target = (
      keys.length === 0 &&
      !other &&
      videoConfig._realDomAttr.indexOf(property) > -1
    )
      ? videoConfig
      : [ 'isFullscreen', 'fullscreenElement' ].indexOf(property) > -1
        ? this.dispatcher.dom
        : getDeepProperty(other || this, keys, { throwError: true });
    applyDecorators(target, {
      [property]: watch(watcher, { deep, diff, proxy }),
    }, { self: true });
    this.unwatchHandlers.push(unwatcher);
    return unwatcher;
  }

  public exitPictureInPicture() {
    return this.dispatcher.binder.emit({
      id: this.id,
      name: 'leavepictureinpicture',
      target: 'video',
    });
  }

  public load(...args: any[]): Promise<void> {
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

  public requestPictureInPicture() {
    return this.dispatcher.binder.emit({
      id: this.id,
      name: 'enterpictureinpicture',
      target: 'video',
    });
  }

  protected destroyVideoWrapper() {
    this.unwatchHandlers.forEach((unwatcher) => unwatcher());
    Object.keys(this.events)
      .forEach((key) => {
        if (!isArray(this.events[key])) { return; }
        this.events[key].forEach((fn) => this.$off(key, fn));
      });
    delete this.events;
  }

  protected wrapAsVideo(videoConfig: VideoConfig) {
    // bind video read only properties on instance, so that you can get info like buffered
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
    // bind videoMethods like canplaytype on instance
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
    // bind video config properties on instance, so that you can just set src by this
    const props = videoConfig.realDomAttr.concat(videoConfig.kernelProperty)
      .reduce((props: { [x: string]: Array<(...args: any[]) => any>}, key: keyof VideoConfig) => {
        props[key] = [
          accessor({
            get() {
              return videoConfig[key];
            },
            set(value: any) {
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
      if (key === 'fullscreen') { return; }
      Object.defineProperty(this, key, {
        value(...args: any) {
          return this.dispatcher.dom[key](...args);
        },
        configurable: true,
        enumerable: false,
        writable: true,
      });
    });
  }

  private addEvents(key: string, fn: (...args: any[]) => any) {
    this.events[key].push(fn);
  }

  private removeEvents(key: string, fn: (...args: any[]) => any) {
    if (isEmpty(this.events[key])) { return; }
    const index = this.events[key].indexOf(fn);
    if (index < 0) { return; }
    this.events[key].splice(index, 1);
    if (isEmpty(this.events[key])) { delete this.events[key]; }
  }
}
