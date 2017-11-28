// @flow
import { isString, camelize, deepAssign, isObject, isEmpty, isArray, isFunction, transObjectAttrIntoArray, isPromise, Log, runRejectableQueue, addEvent, removeEvent, isError, deepClone } from 'chimee-helper';
import Kernel from 'chimee-kernel';
import Bus from './bus';
import Plugin from './plugin';
import Dom from './dom';
import VideoConfig from './video-config';
import defaultContainerConfig from 'config/container';
import { before } from 'toxic-decorators';
import Vessel from '../vessel/vessel';
import { kernelEvents } from 'helper/const';
const pluginConfigSet: PluginConfigSet = {};
const kernelsSet: KernelsSet = {};
function convertNameIntoId(name: string): string {
  if (!isString(name)) throw new Error(`Plugin's name must be a string, but not "${name}" in ${typeof name}`);
  return camelize(name);
}
function checkPluginConfig(config: any) {
  if (isFunction(config)) {
    if (!(config.prototype instanceof Plugin)) {
      throw new TypeError(`Your are trying to install plugin ${config.name}, but it's not extends from Chimee.plugin.`);
    }
    return;
  }
  if (!isObject(config) || isEmpty(config)) throw new TypeError(`plugin's config must be an Object, but not "${config}" in ${typeof config}`);
  const { name } = config;
  if (!isString(name) || name.length < 1) throw new TypeError(`plugin must have a legal namea, but not "${name}" in ${typeof name}`);
}
/**
 * <pre>
 * Dispatcher is the hub of plugins, user, and video kernel.
 * It take charge of plugins install, use and remove
 * It also offer a bridge to let user handle video kernel.
 * </pre>
 */
export default class Dispatcher {
  plugins: plugins;
  bus: Bus;
  order: Array<string>;
  kernel: Kernel;
  dom: Dom;
  vm: Chimee;
  ready: Promise<*>;
  readySync: boolean;
  videoConfig: VideoConfig;
  videoConfigReady: boolean;
  containerConfig: Vessel;
  zIndexMap: Object;
  changeWatchable: boolean;
  kernelEventHandlerList: Array<Function>;
  /**
   * all plugins instance set
   * @type {Object}
   * @member plugins
   */
  plugins = {};
  /**
   * plugin's order
   * @type {Array<string>}
   * @member order
   */
  order = [];
  /**
   * the synchronous ready flag
   * @type {boolean}
   * @member readySync
   */
  readySync = false;
  /**
   * the z-index map of the dom, it contain some important infomation
   * @type {Object}
   * @member zIndexMap
   */
  zIndexMap = {
    inner: [],
    outer: [],
  };
  changeWatchable = true;
  // to save the kernel event handler, so that we can remove it when we destroy the kernel
  kernelEventHandlerList = [];
  /**
   * @param  {UserConfig} config UserConfig for whole Chimee player
   * @param  {Chimee} vm referrence of outer class
   * @return {Dispatcher}
   */
  constructor(config: UserConfig, vm: Chimee) {
    if (!isObject(config)) throw new TypeError(`UserConfig must be an Object, but not "${config}" in ${typeof config}`);
    /**
     * dom Manager
     * @type {Dom}
     */
    this.dom = new Dom(config.wrapper, this);
    /**
     * eventBus
     * @type {Bus}
     */
    this.bus = new Bus(this);
    /**
     * Chimee's referrence
     * @type {[type]}
     */
    this.vm = vm;
    /**
     * tell user have Chimee installed finished
     * @type {Promises}
     */
    this.videoConfigReady = false;
    // create the videoconfig
    this.videoConfig = new VideoConfig(this, config);
    // support both plugin and plugins here as people often cofuse both
    // $FlowFixMe: we support plugins here, which should be illegal
    if (isArray(config.plugins) && !isArray(config.plugin)) {
      config.plugin = config.plugins;
      delete config.plugins;
    }
    // use the plugin user want to use
    this._initUserPlugin(config.plugin);
    // add default config for container
    const containerConfig = deepAssign({}, defaultContainerConfig, config.container || {});
    // trigger the init life hook of plugin
    this.order.forEach(key => this.plugins[key].__init(this.videoConfig, containerConfig));
    this.videoConfigReady = true;
    this.videoConfig.init();
    this.containerConfig = new Vessel(this, 'container', containerConfig);
    /**
     * video kernel
     * @type {Kernel}
     */
    this.kernel = this._createKernel(this.dom.videoElement, this.videoConfig);
    this._bindKernelEvents(this.kernel);
    // trigger auto load event
    const asyncInitedTasks: Array<Promise<*>> = [];
    this.order.forEach(key => {
      const ready = this.plugins[key].__inited();
      if (isPromise(ready)) {
        asyncInitedTasks.push(ready);
      }
    });
    this.readySync = asyncInitedTasks.length === 0;
    // tell them we have inited the whold player
    this.ready = this.readySync
      ? Promise.resolve()
      : Promise.all(asyncInitedTasks)
        .then(() => {
          this.readySync = true;
          this.bus.trigger('ready');
          this._autoloadVideoSrcAtFirst();
        });
    if (this.readySync) this._autoloadVideoSrcAtFirst();
  }
  /**
   * use a plugin, which means we will new a plugin instance and include int this Chimee instance
   * @param  {Object|string} option you can just set a plugin name or plugin config
   * @return {Promise}
   */
  use(option: string | PluginOption) {
    if (isString(option)) option = { name: option, alias: undefined };
    if (!isObject(option) || (isObject(option) && !isString(option.name))) {
      throw new TypeError('pluginConfig do not match requirement');
    }
    if (!isString(option.alias)) option.alias = undefined;
    const { name, alias } = option;
    option.name = alias || name;
    delete option.alias;
    const key = camelize(name);
    const id = camelize(alias || name);
    const pluginOption = option;
    const pluginConfig = Dispatcher.getPluginConfig(key);
    if (isEmpty(pluginConfig)) throw new TypeError('You have not installed plugin ' + key);
    if (isObject(pluginConfig)) {
      pluginConfig.id = id;
    }
    const plugin = isFunction(pluginConfig)
      ? new pluginConfig({id}, this, pluginOption) // eslint-disable-line 
      : new Plugin(pluginConfig, this, pluginOption);
    this.plugins[id] = plugin;
    Object.defineProperty(this.vm, id, {
      value: plugin,
      configurable: true,
      enumerable: false,
      writable: false,
    });
    this.order.push(id);
    this._sortZIndex();
    if (this.videoConfigReady) plugin.__inited();
    return plugin.ready;
  }
  /**
   * unuse an plugin, we will destroy the plugin instance and exlude it
   * @param  {string} name plugin's name
   */
  @before(convertNameIntoId)
  unuse(id: string) {
    const plugin = this.plugins[id];
    if (!isObject(plugin) || !isFunction(plugin.$destroy)) {
      delete this.plugins[id];
      return;
    }
    plugin.$destroy();
    const orderIndex = this.order.indexOf(id);
    if (orderIndex > -1) {
      this.order.splice(orderIndex, 1);
    }
    delete this.plugins[id];
    delete this.vm[id];
  }
  throwError(error: Error | string) {
    this.vm.__throwError(error);
  }
  silentLoad(src: string, option: {
    duration?: number,
    repeatTimes?: number,
    increment?: number,
    bias?: number,
    abort?: boolean,
    immediate?: boolean,
    isLive?: boolean,
    box?: string,
    preset?: Object,
    kernels?: Object | Array<string> | void
  } = {}) {
    const {
      duration = 3,
      bias = 0,
      repeatTimes = 0,
      increment = 0,
      isLive = this.videoConfig.isLive,
      box = this.videoConfig.box,
      kernels = this.videoConfig.kernels,
      preset = this.videoConfig.preset,
    } = option;
    // all live stream seem as immediate mode
    // it's impossible to seek on live stream
    const immediate = option.immediate || isLive;
    // form the base config for kernel
    // it should be the same as the config now
    const config = { isLive, box, src, kernels, preset };
    // build tasks accroding repeat times
    const tasks = new Array(repeatTimes + 1).fill(1).map((value, index) => {
      return () => {
        return new Promise((resolve, reject) => {
          // if abort, give up and reject
          if (option.abort) reject({ error: true, message: 'user abort the mission' });
          const video = document.createElement('video');
          const idealTime = this.kernel.currentTime + duration + increment * index;
          video.muted = true;
          let newVideoReady = false;
          let kernel;
          let videoError;
          let videoCanplay;
          let videoLoadedmetadata;
          // bind time update on old video
          // when we bump into the switch point and ready
          // we switch
          const oldVideoTimeupdate = () => {
            const currentTime = this.kernel.currentTime;
            if ((bias <= 0 && currentTime >= idealTime) ||
              (bias > 0 &&
                ((Math.abs(idealTime - currentTime) <= bias && newVideoReady) ||
                (currentTime - idealTime) > bias))
            ) {
              removeEvent(this.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
              removeEvent(video, 'error', videoError, true);
              if (!newVideoReady) {
                removeEvent(video, 'canplay', videoCanplay, true);
                removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
                kernel.destroy();
                return resolve();
              }
              return reject({
                error: false,
                video,
                kernel,
              });
            }
          };
          videoCanplay = () => {
            newVideoReady = true;
            // you can set it immediately run by yourself
            if (immediate) {
              removeEvent(this.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
              removeEvent(video, 'error', videoError, true);
              return reject({
                error: false,
                video,
                kernel,
              });
            }
          };
          videoLoadedmetadata = () => {
            if (!isLive) kernel.seek(idealTime);
          };
          videoError = evt => {
            removeEvent(video, 'canplay', videoCanplay, true);
            removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
            removeEvent(this.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
            kernel.off('error', videoError);
            let error;
            if (evt.target === kernel) {
              const {
                errmsg: message,
                errno: code,
              } = evt.data;
              Log.error("chimee's silent bump into a kernel error", message);
              error = {
                message,
                code,
              };
            } else {
              error = !isEmpty(video.error)
                ? new Error(video.error.message)
                : new Error('unknow video error');
              Log.error("chimee's silentload", error.message);
            }
            kernel.destroy();
            return index === repeatTimes
              ? reject(error)
              : resolve(error);
          };
          addEvent(video, 'canplay', videoCanplay, true);
          addEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
          addEvent(video, 'error', videoError, true);
          kernel = this._createKernel(video, config);
          kernel.on('error', videoError);
          addEvent(this.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
          kernel.load();
        });
      };
    });
    return runRejectableQueue(tasks)
      .then(() => {
        const message = `The silentLoad for ${src} timed out. Please set a longer duration or check your network`;
        /* istanbul ignore else  */
        if (process.env.NODE_ENV !== 'production') {
          Log.warn("chimee's silentLoad", message);
        }
        return Promise.reject(new Error(message));
      }).catch(data => {
        if (isError(data)) {
          return Promise.reject(data);
        }
        if (data.error) {
        /* istanbul ignore else  */
          if (process.env.NODE_ENV !== 'production') {
            Log.warn("chimee's silentLoad", data.message);
          }
          return Promise.reject(new Error(data.message));
        }
        const { video, kernel } = data;
        if (option.abort) {
          kernel.destroy();
          return Promise.reject(new Error('user abort the mission'));
        }
        const paused = this.dom.videoElement.paused;
        if (paused) {
          this.switchKernel({ video, kernel, config });
          return Promise.resolve();
        }
        return new Promise(resolve => {
          addEvent(video, 'play', () => {
            this.switchKernel({ video, kernel, config });
            resolve();
          }, true);
          video.play();
        });
      });
  }
  load(src: string, option: {
    isLive?: boolean,
    box?: string,
    preset?: Object,
    kernels?: Object | Array<string>
  } = {}) {
    if (!isEmpty(option)) {
      const videoConfig = this.videoConfig;
      const {
        isLive = videoConfig.isLive,
        box = videoConfig.box,
        preset = videoConfig.preset,
        kernels = videoConfig.kernels,
      } = option;
      const video = document.createElement('video');
      const config = { isLive, box, preset, src, kernels };
      const kernel = this._createKernel(video, config);
      this.switchKernel({ video, kernel, config });
    }
    const originAutoLoad = this.videoConfig.autoload;
    this._changeUnwatchable(this.videoConfig, 'autoload', false);
    this.videoConfig.src = src || this.videoConfig.src;
    this.kernel.load(this.videoConfig.src);
    this._changeUnwatchable(this.videoConfig, 'autoload', originAutoLoad);
  }
  switchKernel({ video, kernel, config }: {
    video: HTMLVideoElement,
    kernel: Kernel,
    config: {
      src: string,
      isLive: boolean,
      box: string,
      kernels: Object | Array<string> | void,
      preset: Object,
    }
  }) {
    const oldKernel = this.kernel;
    const originVideoConfig = deepClone(this.videoConfig);
    this.dom.removeVideo();
    this.dom.installVideo(video);
    // as we will reset the currentVideoConfig on the new video
    // it will trigger the watch function as they maybe differnet
    // because video config will return the real situation
    // so we need to stop them
    this.videoConfig.changeWatchable = false;
    this.videoConfig.autoload = false;
    this.videoConfig.src = config.src;
    this.videoConfig._realDomAttr.forEach(key => {
      // $FlowFixMe: support computed key here
      if (key !== 'src') this.videoConfig[key] = originVideoConfig[key];
    });
    this.videoConfig.changeWatchable = true;
    this._bindKernelEvents(oldKernel, true);
    this._bindKernelEvents(kernel);
    this.kernel = kernel;
    const { isLive, box, preset, kernels } = config;
    Object.assign(this.videoConfig, { isLive, box, preset, kernels });
    // const config = {}
    oldKernel.destroy();
  }
  /**
   * destroy function called when dispatcher destroyed
   */
  destroy() {
    for (const key in this.plugins) {
      this.unuse(key);
    }
    this.bus.destroy();
    delete this.bus;
    this.dom.destroy();
    delete this.dom;
    this._bindKernelEvents(this.kernel, true);
    this.kernel.destroy();
    delete this.kernel;
    delete this.vm;
    delete this.plugins;
    delete this.order;
  }
  /**
   * use a set of plugin
   * @param  {Array<UserPluginConfig>}  configs  a set of plugin config
   * @return {Array<Promise>}   a set of Promise indicate the plugin install stage
   */
  _initUserPlugin(configs: Array<string | PluginOption> = []) {
    if (!isArray(configs)) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') Log.warn('Dispatcher', `UserConfig.plugin can only by an Array, but not "${configs}" in ${typeof configs}`);
      configs = [];
    }
    return configs.map(config => this.use(config));
  }
  /**
   * sort zIndex of plugins to make plugin display in order
   */
  _sortZIndex() {
    const { inner, outer } = this.order.reduce((levelSet, key) => {
      const plugin = this.plugins[key];
      if (isEmpty(plugin)) return levelSet;
      const set = levelSet[plugin.$inner ? 'inner' : 'outer'];
      const level = plugin.$level;
      set[level] = set[level] || [];
      set[level].push(key);
      return levelSet;
    }, { inner: {}, outer: {} });
    inner[0] = inner[0] || [];
    inner[0].unshift('videoElement');
    outer[0] = outer[0] || [];
    outer[0].unshift('container');
    const innerOrderArr = transObjectAttrIntoArray(inner);
    const outerOrderArr = transObjectAttrIntoArray(outer);
    this.dom.setPluginsZIndex(innerOrderArr);
    this.dom.setPluginsZIndex(outerOrderArr);
    this.zIndexMap.inner = innerOrderArr;
    this.zIndexMap.outer = outerOrderArr;
  }
  /**
   * get the top element's level
   * @param {boolean} inner get the inner array or the outer array
   */
  _getTopLevel(inner: boolean) {
    const arr = this.zIndexMap[inner ? 'inner' : 'outer'];
    const plugin = this.plugins[arr[arr.length - 1]];
    return isEmpty(plugin) ? 0 : plugin.$level;
  }
  _autoloadVideoSrcAtFirst() {
    if (this.videoConfig.autoload) {
      if (process.env.NODE_ENV !== 'prodution' && !this.videoConfig.src) {
        Log.warn('You have not set the src, so you better set autoload to be false. Accroding to https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#src.');
        return;
      }
      this.bus.emit('load', this.videoConfig.src);
    }
  }
  _changeUnwatchable(object: Object, property: string, value: any) {
    this.changeWatchable = false;
    object[property] = value;
    this.changeWatchable = true;
  }
  _createKernel(video: HTMLVideoElement, config: Object) {
    const { kernels, preset } = config;
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production' && isEmpty(kernels) && !isEmpty(preset)) Log.warn('preset will be deprecated in next major version, please use kernels instead.');
    const newPreset = isArray(kernels)
      ? kernels.reduce((kernels, key) => {
        if (!isFunction(kernelsSet[key])) {
          Log.warn(`You have not installed kernel for ${key}.`);
          return kernels;
        }
        kernels[key] = kernelsSet[key];
        return kernels;
      }, {})
      : isObject(kernels)
        ? kernels
        : {};
    config.preset = Object.assign(newPreset, preset);
    const kernel = new Kernel(video, config);
    return kernel;
  }
  _bindKernelEvents(kernel: Kernel, remove?: boolean = false) {
    kernelEvents.forEach((key, index) => {
      if (!remove) {
        const fn = (...args: any) => this.bus.triggerSync(key, ...args);
        kernel.on(key, fn);
        this.kernelEventHandlerList.push(fn);
        return;
      }
      const fn = this.kernelEventHandlerList[index];
      kernel.off(key, fn);
    });
    if (remove) {
      this.kernelEventHandlerList = [];
      kernel.off('error', this.throwError);
    } else {
      kernel.on('error', this.throwError);
    }
  }
  /**
   * static method to install plugin
   * we will store the plugin config
   * @type {string} plugin's id
   */
  @before(checkPluginConfig)
  static install(config: PluginConfig | Function): string {
    const { name } = config;
    const id = camelize(name);
    if (!isEmpty(pluginConfigSet[id])) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') Log.warn('Dispatcher', 'You have installed ' + name + ' again. And the older one will be replaced');
    }
    const pluginConfig = isFunction(config)
      ? config
      : deepAssign({ id }, config);
    pluginConfigSet[id] = pluginConfig;
    return id;
  }
  @before(convertNameIntoId)
  static hasInstalled(id: string): boolean {
    return !isEmpty(pluginConfigSet[id]);
  }
  @before(convertNameIntoId)
  static uninstall(id: string) {
    delete pluginConfigSet[id];
  }
  /**
   * get Plugin config based on plugin's id
   * @type {[type]}
   */
  @before(convertNameIntoId)
  static getPluginConfig(id: string): PluginConfig | void | Function {
    return pluginConfigSet[id];
  }

  static installKernel(key: string | Object, value?: Function) {
    const tasks = isObject(key)
      ? Object.entries(key)
      : [[ key, value ]];
    tasks.forEach(([ key, value ]) => {
      if (!isFunction(value)) throw new Error(`The kernel you install on ${key} must be a Function, but not ${typeof value}`);
      if (isFunction(kernelsSet[key])) Log.warn(`You have alrady install a kenrle on ${key}, and now we will replace it`);
      kernelsSet[key] = value;
    });
  }

  // only use for debug in internal
  static uninstallKernel(key: string) {
    delete kernelsSet[key];
  }

  static hasInstalledKernel(key: string) {
    return isFunction(kernelsSet[key]);
  }
}
