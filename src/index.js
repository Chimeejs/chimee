// @flow
import Dispatcher from './dispatcher/index';
import {isString, isFunction, isElement, isObject, Log} from 'chimee-helper';
import Plugin from './dispatcher/plugin';
import {frozen, before, alias, autobindClass} from 'toxic-decorators';
import {domEvents} from 'helper/const';
import {eventBinderCheck, attrAndStyleCheck} from 'helper/checker';
import VideoWrapper from 'dispatcher/video-wrapper';
import GlobalConfig from 'global/config';
@autobindClass()
export default class Chimee extends VideoWrapper {
  __id: string;
  __dispatcher: Dispatcher;
  __kernel: Kernel;
  __bus: Bus;
  ready: Promise<*>;
  readySync: boolean;
  version: string;
  destroyed: boolean;
  config: {
    errorHandler: Function | void;
  };
  static config: GlobalConfig;
  static plugin: Plugin;
  destroyed = false;
  @frozen
  __id = '_vm';
  @frozen
  version = process.env.PLAYER_VERSION;
  @frozen
  config = {
    errorHandler: undefined
  };
  @frozen
  static plugin = Plugin;
  @frozen
  static config = new GlobalConfig();
  @frozen
  static install = Dispatcher.install;
  @frozen
  static uninstall = Dispatcher.uninstall;
  @frozen
  static hasInstalled = Dispatcher.hasInstalled;
  @frozen
  static getPluginConfig = Dispatcher.getPluginConfig;
  constructor (config: UserConfig | string | Element) {
    super();
    if(isString(config) || isElement(config)) {
      config = {
        wrapper: config,
        controls: true
      };
    } else if(isObject(config)) {
      if(!config.wrapper) throw new Error('You must pass in an legal object');
    } else {
      throw new Error('You must pass in an Object containing wrapper or string or element to new a Chimee');
    }
    this.__dispatcher = new Dispatcher(config, this);
    this.__dispatcher.kernel.on('error', this.__throwError);
    this.ready = this.__dispatcher.ready;
    this.readySync = this.__dispatcher.readySync;
    this.__wrapAsVideo(this.__dispatcher.videoConfig);
	}
  destroy () {
    this.__dispatcher.destroy();
    this.destroyed = true;
  }
  use (option: string | PluginOption) {
    this.__dispatcher.use(option);
  }
  unuse (name: string) {
    this.__dispatcher.unuse(name);
  }
  /**
   * bind event handler through this function
   * @param  {string} key event's name
   * @param  {Function} fn event's handler
   */
  @alias('addEventListener')
  @before(eventBinderCheck)
  on (key: string, fn: Function) {
    this.__dispatcher.bus.on('_vm', key, fn);
    return this;
  }
  /**
   * remove event handler through this function
   * @param  {string} key event's name
   * @param  {Function} fn event's handler
   */
  @before(eventBinderCheck)
  @alias('removeEventListener')
  off (key: string, fn: Function) {
    return this.__dispatcher.bus.off('_vm', key, fn);
  }
  /**
   * bind one time event handler
   * @param {string} key event's name
   * @param {Function} fn event's handler
   */
  @before(eventBinderCheck)
  once (key: string, fn: Function) {
    return this.__dispatcher.bus.once('_vm', key, fn);
  }
  /**
   * emit an event
   * @param  {string}    key event's name
   * @param  {...args} args
   */
  emit (key: string, ...args: any) {
    if(!isString(key)) throw new TypeError('emit key parameter must be String');
    if(domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
      Log.warn('plugin', `You are using emit to emit ${key} event. As emit is wrapped in Promise. It make you can't use event.preventDefault and event.stopPropagation. So we advice you to use emitSync`);
    }
    return this.__dispatcher.bus.emit(key, ...args);
  }
  /**
   * emit a sync event
   * @param  {string}    key event's name
   * @param  {...args} args
   */
  emitSync (key: string, ...args: any) {
    if(!isString(key)) throw new TypeError('emitSync key parameter must be String');
    return this.__dispatcher.bus.emitSync(key, ...args);
  }
  /**
   * set style
   * @param {string} element optional, default to be video, you can choose from video | container | wrapper
   * @param {string} attribute the atrribue name
   * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
   */
  @before(attrAndStyleCheck)
  css (method: string, ...args: Array<any>): string {
    // $FlowFixMe: we support this here
    return this.__dispatcher.dom[method + 'Style'](...args);
  }
   /**
   * set attr
   * @param {string} element optional, default to be video, you can choose from video | container | wrapper
   * @param {string} attribute the atrribue nameß
   * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
   */
  @before(attrAndStyleCheck)
  attr (method: string, ...args: Array<any>): string {
    if(method === 'set' && /video/.test(args[0])) {
      if(!this.__dispatcher.videoConfigReady) {
        Log.warn('plugin', 'You are tring to set attribute on video before video inited. Please wait until the inited event has benn trigger');
        return args[2];
      }
      if(this.__dispatcher.videoConfig._realDomAttr.indexOf(args[1]) > -1) {
        const [, key, val] = args;
        // $FlowFixMe: we have check the computed key
        this.__dispatcher.videoConfig[key] = val;
        return val;
      }
    }
    // $FlowFixMe: we support this here
    return this.__dispatcher.dom[method + 'Attr'](...args);
  }
  __throwError (error: Error | string) {
    if(isString(error)) error = new Error(error);
    const errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
    if(isFunction(errorHandler)) return errorHandler(error);
    if(Chimee.config.silent) return;
    throw error;
  }
}
