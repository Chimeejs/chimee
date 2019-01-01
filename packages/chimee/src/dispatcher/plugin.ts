import { chimeeLog } from 'chimee-helper-log';
import VideoConfig from 'config/video';
import VideoWrapper from 'dispatcher/video-wrapper';
import { isBoolean, isError, isFunction, isInteger, isPlainObject, isString } from 'lodash';
import { accessor, applyDecorators, frozen } from 'toxic-decorators';
import { isEmpty, isPromise } from 'toxic-predicate-functions';
import { bind } from 'toxic-utils';
import { PluginConfig, PluginOption } from 'typings/base';

// TODO: change later
type Dispatcher = any;

/**
 * <pre>
 * Plugin is the class for plugin developer.
 * When we use a plugin, we will generate an instance of plugin.
 * Developer can do most of things base on this plugin
 * </pre>
 */
export default class ChimeePlugin extends VideoWrapper {

  get $autoFocus(): boolean {
    return this.autoFocusValue;
  }

  set $autoFocus(val: boolean) {
    this.autoFocusValue = val;
    this.dispatcher.dom._autoFocusToVideo(this.$dom, !val);
  }
  /**
   * the z-index level, higher when you set higher
   * @type {boolean}
   */
  set $level(val: number) {
    if (!isInteger(val)) { return; }
    this.levelValue = val;
    this.dispatcher._sortZIndex();
  }
  get $level(): number {
    return this.levelValue;
  }
  /**
   * to tell us if the plugin can be operable, can be dynamic change
   * @type {boolean}
   */
  set $operable(val: boolean) {
    if (!isBoolean(val)) { return; }
    this.$dom.style.pointerEvents = val ? 'auto' : 'none';
    this.operableValue = val;
  }
  get $operable(): boolean {
    return this.operableValue;
  }
  public $config: PluginOption;
  public $dom: HTMLElement;
  public $inner: boolean;
  public $penetrate: boolean;
  public $videoConfig: VideoConfig;
  public beforeCreate?: PluginConfig['beforeCreate'];
  public create?: PluginConfig['create'];
  public destroy?: PluginConfig['destroy'];

  public destroyed: boolean = false;
  public init?: PluginConfig['init'];
  public inited?: PluginConfig['inited'];
  public ready: Promise<void>;
  public readySync: boolean;
  public VERSION: string = process.env.PLAYER_VERSION;
  private autoFocusValue: boolean = false;
  private levelValue: number = 0;
  private operableValue: boolean = true;
  /**
   * <pre>
   * to create a plugin, we need three parameter
   * 1. the config of a plugin
   * 2. the dispatcher
   * 3. this option for plugin to read
   * this is the plugin base class, which you can get on Chimee
   * You can just extends it and then install
   * But in that way you must remember to pass the arguments to super()
   * </pre>
   * @param  {string}  PluginConfig.id        camelize from plugin's name or class name.
   * @param  {string}  PluginConfig.name      plugin's name or class name
   * @param  {Number}  PluginConfig.level     the level of z-index
   * @param  {Boolean} PluginConfig.operable  to tell if the plugin can be operable, if not, we will add pointer-events: none on it.
   * @param  {Function}  PluginConfig.create  the create function which we will called when plugin is used. sth like constructor in object style.
   * @param  {Function}  PluginConfig.destroy   function to be called when we destroy a plugin
   * @param  {Object}  PluginConfig.events    You can set some events handler in this object, we will bind it once you use the plugin.
   * @param  {Object}  PluginConfig.data      dataset we will bind on data in object style
   * @param  {Object<{get: Function, set: Function}}  PluginConfig.computed  dataset we will handle by getter and setter
   * @param  {Object<Function>}  PluginConfig.methods   some function we will bind on plugin
   * @param  {string|HTMLElment}  PluginConfig.el  can be string or HTMLElement, we will use this to create the dom for plugin
   * @param  {boolean} PluginConfig.penetrate boolean to let us do we need to forward the dom events for this plugin.
   * @param  {Dispatcher}  dispatcher referrence of dispatcher
   * @param  {Object}  option  PluginOption that will pass to the plugin
   * @return {Plugin}  plugin instance
   */
  constructor(
    {
      id,
      name,
      level = 0,
      operable = true,
      beforeCreate,
      create,
      init,
      inited,
      destroy,
      events = {},
      data = {},
      computed = {},
      methods = {},
      el,
      penetrate = false,
      inner = true,
      autoFocus,
      className,
    }: PluginConfig,
    dispatcher: Dispatcher,
    option: PluginOption = { name }) {
    super({ dispatcher, id });
    if (isEmpty(dispatcher)) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') { chimeeLog.error('Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?'); }
      throw new TypeError('lack of dispatcher');
    }
    if (!isString(id)) {
      throw new TypeError('id of PluginConfig must be string');
    }
    this.id = id;
    this.$videoConfig = this.dispatcher.videoConfig;
    this.wrapAsVideo(this.$videoConfig);
    this.beforeCreate = this.beforeCreate || beforeCreate;
    try {
      if (isFunction(this.beforeCreate)) {
        this.beforeCreate({
          computed,
          data,
          events,
          methods,
        }, option);
      }
    } catch (error) {
      this.$throwError(error);
    }
    // bind plugin methods into instance
    if (!isEmpty(methods) && isPlainObject(methods)) {
      Object.keys(methods).forEach((key) => {
        const fn = methods[key];
        if (!isFunction(fn)) { throw new TypeError('plugins methods must be Function'); }
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: false,
          value: bind(fn, this),
          writable: true,
        });
      });
    }
    // hook plugin events on bus
    if (!isEmpty(events) && isPlainObject(events)) {
      Object.keys(events)
        .forEach((key) => {
          if (!isFunction(events[key])) { throw new TypeError('plugins events hook must bind with Function'); }
          this.$on(key, events[key]);
        });
    }
    // bind data into plugin instance
    if (!isEmpty(data) && isPlainObject(data)) {
      Object.assign(this, data);
    }
    // set the computed member by getter and setter
    if (!isEmpty(computed) && isPlainObject(computed)) {
      const props = Object.keys(computed)
        .reduce((props: { [x: string]: (...args: any[]) => any }, key) => {
          const val = computed[key];
          if (isFunction(val)) {
            props[key] = accessor({ get: val });
            return props;
          }
          if (isPlainObject(val) && (isFunction(val.get) || isFunction(val.set))) {
            props[key] = accessor(val);
            return props;
          }
          /* istanbul ignore else  */
          if (process.env.NODE_ENV !== 'production') { chimeeLog.warn('Dispatcher.plugin', `Wrong computed member '${key}' defination in Plugin ${name}`); }
          return props;
        }, {});
      applyDecorators(this, props, { self: true });
    }
    /**
     * the create Function of plugin
     * @type {Function}
     */
    this.create = this.create || create;
    /**
     * this init Function of plugin
     * which will be called when we start to create the video player
     * the plugin can handle some config here
     * @type {Function}
     */
    this.init = this.init || init;
    /**
     * this inited Function of plugin
     * which will be called when we have created the video player
     * @type {Function}
     */
    this.inited = this.inited || inited;
    /**
     * the destroy Function of plugin
     * @type {Function}
     */
    this.destroy = this.destroy || destroy;
    /**
     * the dom node of whole plugin
     * @type {HTMLElement}
     */
    this.$dom = this.dispatcher.dom.insertPlugin(this.id, el, { penetrate, inner, className });
    this.$autoFocus = isBoolean(autoFocus) ? autoFocus : inner;
    // now we can frozen inner, autoFocus and penetrate
    this.$inner = inner;
    this.$penetrate = penetrate;
    applyDecorators(this, {
      $inner: frozen,
      $penetrate: frozen,
    }, { self: true });
    /**
     * to tell us if the plugin can be operable, can be dynamic change
     * @type {boolean}
     */
    this.$operable = isBoolean(option.operable)
      ? option.operable
      : operable;
    this.levelValue = isInteger(option.level)
      ? option.level
      : level;
    /**
     * pluginOption, so it's easy for plugin developer to check the config
     * @type {Object}
     */
    this.$config = option;
    try {
      if (isFunction(create)) {
        this.create();
      }
    } catch (error) {
      this.$throwError(error);
    }
  }

  /**
   * set the plugin to be the top of all plugins
   */
  public $bumpToTop() {
    const topLevel = this.dispatcher._getTopLevel(this.$inner);
    this.$level = topLevel + 1;
  }
  /**
   * officail destroy function for plugin
   * we will call user destory function in this method
   */
  public $destroy() {
    if (this.destroyed) { return; }
    if (isFunction(this.destroy)) {
      this.destroy();
    }
    super.destroyVideoWrapper();
    this.dispatcher.dom.removePlugin(this.id);
    delete this.dispatcher;
    delete this.$dom;
    this.destroyed = true;
  }

  public $throwError(error: Error | string) {
    this.dispatcher.throwError(error);
  }
  /**
   * call for inited lifecycle hook, which just to tell the plugin we have inited.
   */
  private runInitedHook(): Promise<void> | ChimeePlugin {
    let result;
    try {
      result = isFunction(this.inited) && this.inited();
    } catch (error) {
      this.$throwError(error);
    }
    this.readySync = !isPromise(result);
    this.ready = this.readySync
      ? Promise.resolve(this)
      : result
        .then(() => {
          this.readySync = true;
          return this;
        })
        .catch((error: Error) => {
          if (isError(error)) { return this.$throwError(error); }
          return Promise.reject(error);
        });
    return this.readySync
      ? this
      : this.ready;
  }
  /**
   * call for init lifecycle hook, which mainly handle the original config of video and kernel.
   * @param {VideoConfig} videoConfig the original config of the videoElement or Kernel
   */
  private runInitHook(videoConfig: VideoConfig) {
    try {
      if (isFunction(this.init)) {
        this.init(videoConfig);
      }
    } catch (error) {
      this.$throwError(error);
    }
  }
}
