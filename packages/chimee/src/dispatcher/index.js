// @flow
import {isString, camelize, deepAssign, isObject, isEmpty, isArray, isFunction, transObjectAttrIntoArray, isPromise, Log} from 'chimee-helper';
import Kernel from 'chimee-kernel';
import Bus from './bus';
import Plugin from './plugin';
import Dom from './dom';
import VideoConfig from './video-config';
import {before} from 'toxic-decorators';
const pluginConfigSet: PluginConfigSet = {};
function convertNameIntoId (name: string): string {
  if(!isString(name)) throw new Error("Plugin's name must be a string");
  return camelize(name);
}
function checkPluginConfig (config: any) {
  if(isFunction(config)) {
    if(!(config.prototype instanceof Plugin)) {
      throw new TypeError('If you pass a function as plugin config, this class must extends from Chimee.plugin');
    }
    return;
  }
  if(!isObject(config) || isEmpty(config)) throw new TypeError("plugin's config must be an Object");
  const {name} = config;
  if(!isString(name) || name.length < 1) throw new TypeError('plugin must have a legal name');
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
  zIndexMap: Object;
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
    outer: []
  };
  /**
   * @param  {UserConfig} config UserConfig for whole Chimee player
   * @param  {Chimee} vm referrence of outer class
   * @return {Dispatcher}
   */
  constructor (config: UserConfig, vm: Chimee) {
    if(!isObject(config)) throw new TypeError('UserConfig must be an Object');
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
    this._initUserPlugin(config.plugin);
    this.order.forEach(key => this.plugins[key].__init(this.videoConfig));
    this.videoConfig.lockKernelProperty();
    this.videoConfigReady = true;
    this.videoConfig.init();
    /**
     * video kernel
     * @type {Kernel}
     */
    this.kernel = new Kernel(this.dom.videoElement, this.videoConfig);
    // trigger auto load event
    const asyncInitedTasks: Array<Promise<*>> = [];
    this.order.forEach(key => {
      const ready = this.plugins[key].__inited();
      if(isPromise(ready)) {
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
    if(this.readySync) this._autoloadVideoSrcAtFirst();
  }
  /**
   * use a plugin, which means we will new a plugin instance and include int this Chimee instance
   * @param  {Object|string} option you can just set a plugin name or plugin config
   * @return {Promise}
   */
  use (option: string | PluginOption) {
    if(isString(option)) option = {name: option, alias: undefined};
    if(!isObject(option) || (isObject(option) && !isString(option.name))) {
      throw new TypeError('pluginConfig do not match requirement');
    }
    if(!isString(option.alias)) option.alias = undefined;
    const {name, alias} = option;
    option.name = alias || name;
    delete option.alias;
    const key = camelize(name);
    const id = camelize(alias || name);
    const pluginOption = option;
    const pluginConfig = Dispatcher.getPluginConfig(key);
    if(isEmpty(pluginConfig)) throw new TypeError('You have not installed plugin ' + key);
    if(isObject(pluginConfig)) {
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
      writable: false
    });
    this.order.push(id);
    this._sortZIndex();
    if(this.videoConfigReady) plugin.__inited();
    return plugin.ready;
  }
  /**
   * unuse an plugin, we will destroy the plugin instance and exlude it
   * @param  {string} name plugin's name
   */
  @before(convertNameIntoId)
  unuse (id: string) {
    const plugin = this.plugins[id];
    if(!isObject(plugin) || !isFunction(plugin.$destroy)) {
      delete this.plugins[id];
      return;
    }
    plugin.$destroy();
    const orderIndex = this.order.indexOf(id);
    if(orderIndex > -1) {
      this.order.splice(orderIndex, 1);
    }
    delete this.plugins[id];
    delete this.vm[id];
  }
  throwError (error: Error | string) {
    this.vm.__throwError(error);
  }
  /**
   * destroy function called when dispatcher destroyed
   */
  destroy () {
    for(const key in this.plugins) {
      this.unuse(key);
    }
    this.bus.destroy();
    delete this.bus;
    this.dom.destroy();
    delete this.dom;
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
  _initUserPlugin (configs: Array<string | PluginOption> = []) {
    if(!isArray(configs)) {
      Log.warn('Dispatcher', 'UserConfig.plugin can only by an Array');
      configs = [];
    }
    return configs.map(config => this.use(config));
  }
  /**
   * sort zIndex of plugins to make plugin display in order
   */
  _sortZIndex () {
    const {inner, outer} = this.order.reduce((levelSet, key) => {
      const plugin = this.plugins[key];
      if(isEmpty(plugin)) return levelSet;
      const set = levelSet[plugin.$inner ? 'inner' : 'outer'];
      const level = plugin.$level;
      set[level] = set[level] || [];
      set[level].push(key);
      return levelSet;
    }, {inner: {}, outer: {}});
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
  _getTopLevel (inner: boolean) {
    const arr = this.zIndexMap[inner ? 'inner' : 'outer'];
    const plugin = this.plugins[arr[arr.length - 1]];
    return isEmpty(plugin) ? 0 : plugin.$level;
  }
  _autoloadVideoSrcAtFirst () {
    if(this.videoConfig.autoload) this.bus.emit('load', this.videoConfig.src);
  }
  /**
   * static method to install plugin
   * we will store the plugin config
   * @type {string} plugin's id
   */
  @before(checkPluginConfig)
  static install (config: PluginConfig | Function): string {
    const {name} = config;
    const id = camelize(name);
    if(!isEmpty(pluginConfigSet[id])) {
      Log.warn('Dispatcher', 'You have installed ' + name + ' again. And the older one will be replaced');
    }
    const pluginConfig = isFunction(config)
      ? config
      : deepAssign({id}, config);
    pluginConfigSet[id] = pluginConfig;
    return id;
  }
  @before(convertNameIntoId)
  static hasInstalled (id: string): boolean {
    return !isEmpty(pluginConfigSet[id]);
  }
  @before(convertNameIntoId)
  static uninstall (id: string) {
    delete pluginConfigSet[id];
  }
  /**
   * get Plugin config based on plugin's id
   * @type {[type]}
   */
  @before(convertNameIntoId)
  static getPluginConfig (id: string): PluginConfig | void | Function {
    return pluginConfigSet[id];
  }
}
