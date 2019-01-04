import { chimeeLog } from 'chimee-helper-log';
import { isError, isFunction, isPlainObject, isString } from 'lodash';
import { frozen } from 'toxic-decorators';
import { isElement } from 'toxic-predicate-functions';
import GlobalConfig from './config/global';
import { kernelEvents } from './const/event';
import Dispatcher from './dispatcher/index';
import ChimeePlugin, { IChimeePluginConstructor } from './dispatcher/plugin';
import VideoWrapper from './dispatcher/video-wrapper';
import { PluginOption, UserConfig } from './typings/base';

export default class Chimee extends VideoWrapper {
  // In some situation, we may have custom events
  // For example, we may have a custom kernel event
  // We can register the event through this method
  public static registerEvents({
    name,
    target,
  }: {
    name?: string,
    target?: string,
  } = {}) {
    if (!name || !isString(name)) { throw new Error(`The event name must be a string, but not ${typeof name}`); }
    if (!target || !isString(target)) { throw new Error(`The event target must be a string, but not ${typeof target}`); }
    if (target === 'kernel') {
      kernelEvents.push(name);
    }
  }
  @frozen
  public config: {
    errorHandler: (...args: any[]) => any | void;
  } = {
    errorHandler: undefined,
  };
  public destroyed: boolean = false;
  public ready: Promise<void>;
  public readySync: boolean;

  @frozen
  public version: string = process.env.PLAYER_VERSION;

  @frozen
  public static config: GlobalConfig = new GlobalConfig();

  @frozen
  public static getPluginConfig = Dispatcher.getPluginConfig;

  @frozen
  public static hasInstalled = Dispatcher.hasInstalled;

  @frozen
  public static hasInstalledKernel = Dispatcher.hasInstalledKernel;

  @frozen
  public static install = Dispatcher.install;

  @frozen
  public static installKernel = Dispatcher.installKernel;

  @frozen
  public static plugin: IChimeePluginConstructor = ChimeePlugin;

  @frozen
  public static uninstall = Dispatcher.uninstall;

  @frozen
  public static uninstallKernel = Dispatcher.uninstallKernel;

  constructor(rawConfig: UserConfig | string | Element) {
    super({ id: '_vm' });
    let config: UserConfig;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && !global.Object.defineProperty) {
      /* istanbul ignore next */
      chimeeLog.error('Chimee', 'We detect that this browser lack of Object.defineProperty. Chimee can\'t run on this browser');
    }
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && !global.Promise) {
      /* istanbul ignore next */
      chimeeLog.error('Chimee', 'We detect that this browser lack of Promise. If you are running Chimee in old browser. Please make sure you have import polyfill such as babel-polyfill.');
    }
    if (isString(rawConfig) || isElement(rawConfig)) {
      config = {
        controls: true,
        wrapper: rawConfig,
      };
    } else if (isPlainObject(rawConfig)) {
      if (!rawConfig.wrapper) { throw new Error('You must pass in an legal object'); }
      config = rawConfig;
    } else {
      throw new Error('You must pass in an Object containing wrapper or string or element to new a Chimee');
    }
    this.dispatcher = new Dispatcher(config, this);
    this.ready = this.dispatcher.ready;
    this.readySync = this.dispatcher.readySync;
    this.wrapAsVideo(this.dispatcher.videoConfig);
  }

  public customThrowError(error: Error | string) {
    if (isString(error)) { error = new Error(error); }
    const errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
    if (isFunction(errorHandler)) { return errorHandler(error); }
    if (Chimee.config.silent) { return; }
    /* istanbul ignore else */
    if (isError(error)) {
      throw error;
    } else {
      // tslint:disable-next-line:no-console
      console.error(error);
    }
  }

  public destroy() {
    if (this.destroyed) { return; }
    super.destroyVideoWrapper();
    this.dispatcher.destroy();
    Object.defineProperty(this, 'dispatcher', {
      configurable: true,
      enumerable: true,
      get() {
        throw new Error('This instance has been destroyed.');
      },
    });
    this.destroyed = true;
  }

  public unuse(name: string) {
    return this.dispatcher.unuse(name);
  }

  public use(option: string | PluginOption) {
    return this.dispatcher.use(option);
  }
}
