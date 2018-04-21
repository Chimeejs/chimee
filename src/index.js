// @flow
import Dispatcher from './dispatcher/index';
import { isString, isFunction, isElement, isObject, Log, isError } from 'chimee-helper';
import Plugin from './dispatcher/plugin';
import { frozen, autobindClass } from 'toxic-decorators';
import VideoWrapper from 'dispatcher/video-wrapper';
import GlobalConfig from 'config/global';
import global from 'core-js/es7/global';
import { kernelEvents } from './helper/const';

@autobindClass()
export default class Chimee extends VideoWrapper {
  __id: string;
  __dispatcher: Dispatcher;
  __kernel: ChimeeKernel;
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
    errorHandler: undefined,
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
  static installKernel = Dispatcher.installKernel;

  @frozen
  static uninstallKernel = Dispatcher.uninstallKernel;

  @frozen
  static hasInstalledKernel = Dispatcher.hasInstalledKernel;

  @frozen
  static getPluginConfig = Dispatcher.getPluginConfig;

  // In some situation, we may have custom events
  // For example, we may have a custom kernel event
  // We can register the event through this method
  static registerEvents({
    name,
    target,
  }: {
    name?: string,
    target?: string,
  } = {}) {
    if (!name || !isString(name)) throw new Error(`The event name must be a string, but not ${typeof name}`);
    if (!target || !isString(target)) throw new Error(`The event target must be a string, but not ${typeof target}`);
    if (target === 'kernel') {
      kernelEvents.push(name);
    }
  }

  constructor(config: UserConfig | string | Element) {
    super();
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && !global.Object.defineProperty) {
      /* istanbul ignore next */
      Log.error('Chimee', "We detect that this browser lack of Object.defineProperty. Chimee can't run on this browser");
    }
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && !global.Promise) {
      /* istanbul ignore next */
      Log.error('Chimee', 'We detect that this browser lack of Promise. If you are running Chimee in old browser. Please make sure you have import polyfill such as babel-polyfill.');
    }
    if (isString(config) || isElement(config)) {
      config = {
        wrapper: config,
        controls: true,
      };
    } else if (isObject(config)) {
      if (!config.wrapper) throw new Error('You must pass in an legal object');
    } else {
      throw new Error('You must pass in an Object containing wrapper or string or element to new a Chimee');
    }
    // $FlowFixMe: we have check wrapper here
    this.__dispatcher = new Dispatcher(config, this);
    this.ready = this.__dispatcher.ready;
    this.readySync = this.__dispatcher.readySync;
    this.__wrapAsVideo(this.__dispatcher.videoConfig);
  }

  destroy() {
    if (this.destroyed) return;
    super.__destroy();
    this.__dispatcher.destroy();
    // $FlowFixMe: normal obejct define
    Object.defineProperty(this, '__dispatcher', {
      get() {
        throw new Error('This instance has been destroyed.');
      },
      enumerable: true,
      configurable: true,
    });
    this.destroyed = true;
  }

  use(option: string | PluginOption) {
    return this.__dispatcher.use(option);
  }

  unuse(name: string) {
    return this.__dispatcher.unuse(name);
  }

  __throwError(error: Error | string) {
    if (isString(error)) error = new Error(error);
    const errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
    if (isFunction(errorHandler)) return errorHandler(error);
    if (Chimee.config.silent) return;
    /* istanbul ignore else */
    if (isError(error)) throw error;
    else console.error(error);
  }
}
