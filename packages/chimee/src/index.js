// @flow
import Dispatcher from './dispatcher/index';
import { isString, isFunction, isElement, isObject } from 'chimee-helper';
import Plugin from './dispatcher/plugin';
import { frozen, autobindClass } from 'toxic-decorators';
import VideoWrapper from 'dispatcher/video-wrapper';
import GlobalConfig from 'config/global';
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
  constructor(config: UserConfig | string | Element) {
    super();
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
    super.__destroy();
    this.__dispatcher.destroy();
    this.destroyed = true;
  }
  use(option: string | PluginOption) {
    this.__dispatcher.use(option);
  }
  unuse(name: string) {
    this.__dispatcher.unuse(name);
  }
  __throwError(error: Error | string) {
    if (isString(error)) error = new Error(error);
    const errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
    if (isFunction(errorHandler)) return errorHandler(error);
    if (Chimee.config.silent) return;
    throw error;
  }
}
