import { chimeeLog } from 'chimee-helper-log';
import { isError, isFunction, isPlainObject, isString } from 'lodash';
import { isElement } from 'toxic-predicate-functions';
import GlobalConfig from './config/global';
import { kernelEvents } from './const/event';
import Dispatcher from './dispatcher/index';
import ChimeePlugin from './dispatcher/plugin';
import VideoWrapper from './dispatcher/video-wrapper';
export default class Chimee extends VideoWrapper {
    constructor(rawConfig) {
        super({ id: '_vm' });
        this.config = {
            errorHandler: undefined,
        };
        this.destroyed = false;
        this.version = process.env.PLAYER_VERSION;
        let config;
        if (process.env.NODE_ENV !== 'production' && !global.Object.defineProperty) {
            chimeeLog.error('Chimee', 'We detect that this browser lack of Object.defineProperty. Chimee can\'t run on this browser');
        }
        if (process.env.NODE_ENV !== 'production' && !global.Promise) {
            chimeeLog.error('Chimee', 'We detect that this browser lack of Promise. If you are running Chimee in old browser. Please make sure you have import polyfill such as babel-polyfill.');
        }
        if (isString(rawConfig) || isElement(rawConfig)) {
            config = {
                controls: true,
                wrapper: rawConfig,
            };
        }
        else if (isPlainObject(rawConfig)) {
            if (!rawConfig.wrapper) {
                throw new Error('You must pass in an legal object');
            }
            config = rawConfig;
        }
        else {
            throw new Error('You must pass in an Object containing wrapper or string or element to new a Chimee');
        }
        this.dispatcher = new Dispatcher(config, this);
        this.ready = this.dispatcher.ready;
        this.readySync = this.dispatcher.readySync;
        this.wrapAsVideo(this.dispatcher.videoConfig);
    }
    static registerEvents({ name, target, } = {}) {
        if (!name || !isString(name)) {
            throw new Error(`The event name must be a string, but not ${typeof name}`);
        }
        if (!target || !isString(target)) {
            throw new Error(`The event target must be a string, but not ${typeof target}`);
        }
        if (target === 'kernel') {
            kernelEvents.push(name);
        }
    }
    customThrowError(error) {
        if (isString(error)) {
            error = new Error(error);
        }
        const errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
        if (isFunction(errorHandler)) {
            return errorHandler(error);
        }
        if (Chimee.config.silent) {
            return;
        }
        if (isError(error)) {
            throw error;
        }
        else {
            console.error(error);
        }
    }
    destroy() {
        if (this.destroyed) {
            return;
        }
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
    unuse(name) {
        return this.dispatcher.unuse(name);
    }
    use(option) {
        return this.dispatcher.use(option);
    }
}
Chimee.config = new GlobalConfig();
Chimee.getPluginConfig = Dispatcher.getPluginConfig;
Chimee.hasInstalled = Dispatcher.hasInstalled;
Chimee.hasInstalledKernel = Dispatcher.hasInstalledKernel;
Chimee.install = Dispatcher.install;
Chimee.installKernel = Dispatcher.installKernel;
Chimee.plugin = ChimeePlugin;
Chimee.uninstall = Dispatcher.uninstall;
Chimee.uninstallKernel = Dispatcher.uninstallKernel;
//# sourceMappingURL=index.js.map