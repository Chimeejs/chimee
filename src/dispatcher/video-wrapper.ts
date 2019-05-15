import { chimeeLog } from 'chimee-helper-log';
import { isArray, isFunction, isPlainObject, isString } from 'lodash';
import { accessor, alias, applyDecorators, before, nonenumerable, watch } from 'toxic-decorators';
import { isEmpty } from 'toxic-predicate-functions';
import { bind, getDeepProperty } from 'toxic-utils';
import VideoConfig from '../config/video';
import { isVideoDomAttribute, videoDomAttributes } from '../const/attribute';
import { ChimeeDomElement, isChimeeDomElement, RealChimeeDomElement, turnChimeeDomElementIntoRealChimeeDomElement } from '../const/dom';
import { domEvents } from '../const/event';
import { domMethods, kernelMethods, videoMethods } from '../const/method';
import { kernelProperties, videoReadOnlyProperties } from '../const/property';
import Dom from '../dispatcher/dom';
import Dispatcher from '../dispatcher/index';
import ChimeePlugin from '../dispatcher/plugin';
import { eventBinderCheck } from '../helper/checker';
import { IVideoKernelConstructor } from '../kernels/base';
import { ChimeePictureInPictureOnWindow } from '../plugin/picture-in-picture';
import { BinderTarget, EventOptions, SupportedKernelType, UserConfig, UserKernelsConfig, VesselConfig } from '../typings/base';
declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __chimee_picture_in_picture: ChimeePictureInPictureOnWindow;
  }
}

export default class VideoWrapper {
  @nonenumerable
  get $container(): Element {
    return this.dispatcher.dom.container;
  }
  @nonenumerable
  get $pluginOrder(): string[] {
    return this.dispatcher.order;
  }

  @nonenumerable
  get $plugins(): { [id: string]: ChimeePlugin } {
    return this.dispatcher.plugins;
  }
  @nonenumerable
  get $video(): HTMLVideoElement {
    return this.dispatcher.dom.videoElement;
  }
  @nonenumerable
  get $wrapper(): Element {
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

  get fullscreenElement(): Element | string | void {
    return this.dispatcher.dom.fullscreenElement;
  }
  protected id: string;

  @nonenumerable
  get inPictureInPictureMode(): boolean {
    return this.dispatcher.inPictureInPictureMode;
  }

  get isFullscreen(): boolean | string {
    return this.dispatcher.dom.isFullscreen;
  }

  @nonenumerable
  get pictureInPictureWindow(): void | ChimeePictureInPictureOnWindow {
    return window.__chimee_picture_in_picture;
  }

  get videoRequireGuardedAttributes(): string[] {
    return this.dispatcher.dom.videoRequireGuardedAttributes;
  }

  public autoload: boolean;

  public autoplay: boolean;

  public box: 'mp4' | 'hls' | 'flv' | '';
  public readonly buffered: TimeRanges;
  public readonly canPlayType: () => CanPlayTypeResult;
  public readonly captureStream: () => void;

  public changeWatchable: boolean;

  public controls: boolean;
  public readonly controlsList: boolean;

  public crossOrigin: string;
  public readonly currentSrc: string;
  public readonly dataset: DOMStringMap;

  public defaultMuted: boolean;

  public defaultPlaybackRate: number;

  public disableRemotePlayback: boolean;
  public readonly duration: number;
  public readonly ended: boolean;
  public readonly error: MediaError;
  public readonly exitFullscreen: Dom['exitFullscreen'];
  public readonly focus: Dom['focus'];
  public readonly fullscreen: Dom['fullscreen'];

  public height: number;

  public isLive: boolean;

  // kernels 不在 videoConfig 上设置默认值，防止判断出错
  public kernels: UserKernelsConfig;

  public loop: boolean;

  public muted: boolean;
  public readonly networkState: number;
  public readonly offsetHeight: number;
  public readonly offsetLeft: number;
  public readonly offsetParent: Element;
  public readonly offsetTop: number;
  public readonly offsetWidth: number;
  public readonly pause: () => Promise<void>;
  public readonly paused: boolean;
  public readonly play: () => Promise<void>;

  public playbackRate: number;

  public playsInline: boolean;

  public poster: string;

  public preload: 'none' | 'auto' | 'metadata' | '';
  public preset: {
    [key in SupportedKernelType]?: IVideoKernelConstructor;
  };

  public presetConfig: {
    [x: string]: object,
  };

  public readonly readyState: number;
  public readonly requestFullscreen: Dom['requestFullscreen'];
  public readonly seek: (n: number) => Promise<void>;
  public readonly seekable: TimeRanges;
  public readonly setSinkId: () => void;
  public readonly sinkId: boolean;
  public src: string;
  public readonly startLoad: () => Promise<void>;
  public readonly stopLoad: () => Promise<void>;

  public readonly tabIndex: number;

  public volume: number;

  public width: number;

  public x5VideoOrientation: 'landscape' | 'portrait' | undefined;

  public x5VideoPlayerFullscreen: boolean;

  public x5VideoPlayerType: 'h5' | undefined;

  public xWebkitAirplay: boolean;
  private events: { [evetName: string]: Array<(...args: any[]) => any> } = {};
  private unwatchHandlers: Array<(...args: any[]) => any> = [];

  constructor({ dispatcher, id }: { dispatcher?: Dispatcher, id: string }) {
    if (dispatcher) {
      this.dispatcher = dispatcher;
    }
    this.id = id;
  }

  /**
   * set attr
   * @param {string} element optional, default to be video, you can choose from video | container | wrapper
   * @param {string} attribute the atrribue nameß
   * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
   */
  @(alias('attr') as MethodDecorator)
  public $attr(targetOrAttr: ChimeeDomElement | string, attrOrValue?: string, valueOrNothing?: string | void): string | void {
    const { method, target, attr, value } = this.getRealInfoForStyleAndAttr(arguments.length, targetOrAttr, attrOrValue, valueOrNothing);
    if (method === 'set' && target === 'videoElement') {
      if (!this.dispatcher.videoConfigReady) {
        /* istanbul ignore else  */
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

  /**
   * set style
   * @param {string} element optional, default to be video, you can choose from video | container | wrapper
   * @param {string} attribute the atrribue name
   * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
   */
  @(alias('css') as MethodDecorator)
  public $css(targetOrAttr: ChimeeDomElement | string, attrOrValue?: string, valueOrNothing?: string | void): string | void {
    const { method, target, attr, value } = this.getRealInfoForStyleAndAttr(arguments.length, targetOrAttr, attrOrValue, valueOrNothing);
    return method === 'set'
      ? this.dispatcher.dom.setStyle(target, attr, value)
      : this.dispatcher.dom.getStyle(target, attr);
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
  @(alias('emit') as MethodDecorator)
  public $emit(
    key: string | {
      name: string,
      target: BinderTarget,
    },
    ...args: any) {
    let target: BinderTarget | void;
    if (!isString(key) && isPlainObject(key) && isString(key.name) && isString(key.target)) {
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
  @(alias('emitSync') as MethodDecorator)
  public $emitSync(
    key: string | {
      name: string,
      target: BinderTarget,
    },
    ...args: any) {
    let target: BinderTarget | void;
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

  /**
   * call fullscreen api on some specific element
   * @param {boolean} flag true means fullscreen and means exit fullscreen
   * @param {string} element the element you want to fullscreen, default it's container, you can choose from video | container | wrapper
   */
  @(alias('fullScreen') as MethodDecorator)
  @(alias('$fullScreen') as MethodDecorator)
  @(alias('fullscreen') as MethodDecorator)
  public $fullscreen(flag: boolean = true, element: ChimeeDomElement = 'container'): boolean {
    if (!this.dispatcher.binder.emitSync({
      id: this.id,
      name: 'fullscreen',
      target: 'video-dom',
    }, flag, element)) { return false; }
    const result = this.dispatcher.dom.fullscreen(flag, turnChimeeDomElementIntoRealChimeeDomElement(element));
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
  @(alias('off') as MethodDecorator)
  @(alias('removeEventListener') as MethodDecorator)
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
  @(alias('on') as MethodDecorator)
  @(alias('addEventListener') as MethodDecorator)
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
  @(alias('once') as MethodDecorator)
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
    if (!isFunction(obj.__set)) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') {
        chimeeLog.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $set.`);
      }
      obj[property] = value;
      return;
    }
    obj.__set(property, value);
  }

  @(alias('silentLoad') as MethodDecorator)
  public $silentLoad(src: string, option: {
    abort?: boolean,
    bias?: number,
    box?: string,
    duration?: number,
    immediate?: boolean,
    increment?: number,
    isLive?: boolean,
    kernels?: UserKernelsConfig,
    preset?: UserConfig['preset'],
    repeatTimes?: number,
  } = {}) {
    return this.dispatcher.binder.emit({
      id: this.id,
      name: 'silentLoad',
      target: 'video',
    })
      .then(() => {
        return this.dispatcher.silentLoad(src, option);
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
      isVideoDomAttribute(property)
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
    const props = ([]).concat(kernelProperties).concat(videoDomAttributes)
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
            const id = this.id;
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
    this.events[key] = this.events[key] || [];
    this.events[key].push(fn);
  }

  private getRealInfoForStyleAndAttr(argumentsLength: number, targetOrAttr: ChimeeDomElement | string, attrOrValue?: string, valueOrNothing?: string | void): {
    attr: string;
    method: 'set' | 'get';
    target: RealChimeeDomElement;
    value: string | void;
  } {
    let method: 'set' | 'get';
    let target: ChimeeDomElement;
    let attr: string;
    let value: string | void;
    if (argumentsLength > 2) {
      method = 'set';
      target = (targetOrAttr as ChimeeDomElement);
      attr = attrOrValue;
      value = valueOrNothing;
    } else if (argumentsLength === 2)  {
      if (isChimeeDomElement(targetOrAttr)) {
        method = 'get';
        target = targetOrAttr;
        attr = attrOrValue;
      } else {
        method = 'set';
        target = 'container';
        attr = targetOrAttr;
        value = attrOrValue;
      }
    } else if (argumentsLength === 1) {
      method = 'get';
      target = 'container';
      attr = targetOrAttr;
    } else {
      throw new Error('You have to pass at least one argument to run $attr or $ css');
    }
    const realTarget = turnChimeeDomElementIntoRealChimeeDomElement(target);
    return { attr, method, value, target: realTarget };
  }

  private removeEvents(key: string, fn: (...args: any[]) => any) {
    if (isEmpty(this.events[key])) { return; }
    const index = this.events[key].indexOf(fn);
    if (index < 0) { return; }
    this.events[key].splice(index, 1);
    if (isEmpty(this.events[key])) { delete this.events[key]; }
  }
}
