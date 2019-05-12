var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { chimeeLog } from 'chimee-helper-log';
import { off as removeEvent, on as addEvent } from 'dom-helpers/events';
import { clone, isArray, isEmpty, isError, isFunction, isPlainObject, isString } from 'lodash';
import { autobind, before, nonenumerable } from 'toxic-decorators';
import { isPromise } from 'toxic-predicate-functions';
import { camelize } from 'toxic-utils';
import defaultContainerConfig from '../config/container';
import Vessel from '../config/vessel';
import VideoConfig from '../config/video';
import { videoDomAttributes } from '../const/attribute';
import Binder from '../dispatcher/binder';
import Dom from '../dispatcher/dom';
import ChimeeKernel, { getLegalBox } from '../dispatcher/kernel';
import ChimeePlugin from '../dispatcher/plugin';
import { isSupportedKernelType, runRejectableQueue, transObjectAttrIntoArray } from '../helper/utils';
import PictureInPicture from '../plugin/picture-in-picture';
const pluginConfigSet = {};
const kernelsSet = {};
function convertNameIntoId(name) {
    if (!isString(name)) {
        throw new Error(`Plugin's name must be a string, but not "${name}" in ${typeof name}`);
    }
    return camelize(name);
}
function checkPluginConfig(config) {
    if (isFunction(config)) {
        if (!(config.prototype instanceof ChimeePlugin)) {
            throw new TypeError(`Your are trying to install plugin ${config.name}, but it's not extends from Chimee.plugin.`);
        }
        return;
    }
    if (!isPlainObject(config) || isEmpty(config)) {
        throw new TypeError(`plugin's config must be an Object, but not "${config}" in ${typeof config}`);
    }
    const { name } = config;
    if (!isString(name) || name.length < 1) {
        throw new TypeError(`plugin must have a legal namea, but not "${name}" in ${typeof name}`);
    }
}
export default class Dispatcher {
    constructor(config, vm) {
        this.changeWatchable = true;
        this.kernelEventHandlerList = [];
        this.order = [];
        this.plugins = {};
        this.readySync = false;
        this.zIndexMap = {
            inner: [],
            outer: [],
        };
        if (!isPlainObject(config)) {
            throw new TypeError(`UserConfig must be an Object, but not "${config}" in ${typeof config}`);
        }
        this.dom = new Dom(config, this);
        this.vm = vm;
        this.videoConfigReady = false;
        this.videoConfig = new VideoConfig(this, config);
        if (isArray(config.plugins) && !isArray(config.plugin)) {
            config.plugin = config.plugins;
            delete config.plugins;
        }
        this.binder = new Binder(this);
        this.binder.listenOnMouseMoveEvent(this.dom.videoElement);
        this.initUserPlugin(config.plugin);
        const containerConfig = Object.assign({}, defaultContainerConfig, config.container || {});
        this.order.forEach((key) => this.plugins[key].runInitHook(this.videoConfig));
        this.videoConfigReady = true;
        this.videoConfig.init();
        this.containerConfig = new Vessel(this, 'container', containerConfig);
        this.kernel = this.createKernel(this.dom.videoElement, this.videoConfig);
        this.binder.applyPendingEvents('kernel');
        if (config.noDefaultContextMenu) {
            const { noDefaultContextMenu } = config;
            const target = (noDefaultContextMenu === 'container' || noDefaultContextMenu === 'wrapper')
                ? noDefaultContextMenu
                : 'video-dom';
            this.binder.on({
                fn: (evt) => evt.preventDefault(),
                id: '_vm',
                name: 'contextmenu',
                stage: 'main',
                target,
            });
        }
        const asyncInitedTasks = [];
        this.order.forEach((key) => {
            const ready = this.plugins[key].runInitedHook();
            if (isPromise(ready)) {
                asyncInitedTasks.push(ready);
            }
        });
        this.readySync = asyncInitedTasks.length === 0;
        this.ready = this.readySync
            ? Promise.resolve()
            : Promise.all(asyncInitedTasks)
                .then(() => {
                this.readySync = true;
                this.onReady();
            });
        if (this.readySync) {
            this.onReady();
        }
    }
    static getPluginConfig(id) {
        return pluginConfigSet[id];
    }
    static hasInstalled(id) {
        return !!pluginConfigSet[id];
    }
    static hasInstalledKernel(key) {
        return isFunction(kernelsSet[key]);
    }
    get inPictureInPictureMode() {
        return 'pictureInPictureEnabled' in document
            ? this.dom.videoElement === document.pictureInPictureElement
            : Boolean(this.plugins.pictureInPicture && this.plugins.pictureInPicture.isShown);
    }
    static install(config) {
        const { name } = config;
        const id = camelize(name);
        if (pluginConfigSet[id]) {
            if (process.env.NODE_ENV !== 'production') {
                chimeeLog.warn('Dispatcher', 'You have installed ' + name + ' again. And the older one will be replaced');
            }
        }
        const pluginConfig = isFunction(config)
            ? config
            : Object.assign({}, config, { id });
        pluginConfigSet[id] = pluginConfig;
        return id;
    }
    static installKernel(key, value) {
        const tasks = isPlainObject(key)
            ? Object.entries(key)
            : [[key, value]];
        tasks.forEach(([key, value]) => {
            if (!isFunction(value)) {
                throw new Error(`The kernel you install on ${key} must be a Function, but not ${typeof value}`);
            }
            if (isFunction(kernelsSet[key])) {
                chimeeLog.warn(`You have alrady install a kernel on ${key}, and now we will replace it`);
            }
            kernelsSet[key] = value;
        });
    }
    static uninstall(id) {
        delete pluginConfigSet[id];
    }
    static uninstallKernel(key) {
        delete kernelsSet[key];
    }
    destroy() {
        for (const key in this.plugins) {
            if (this.plugins.hasOwnProperty(key)) {
                this.unuse(key);
            }
        }
        this.binder.destroy();
        delete this.binder;
        this.dom.destroy();
        delete this.dom;
        this.kernel.destroy();
        delete this.kernel;
        delete this.vm;
        delete this.plugins;
        delete this.order;
        this.destroyed = true;
    }
    exitPictureInPicture() {
        if ('pictureInPictureEnabled' in document) {
            if (this.inPictureInPictureMode) {
                window.__chimee_picture_in_picture = undefined;
                return document.exitPictureInPicture();
            }
        }
        return this.plugins.pictureInPicture && this.plugins.pictureInPicture.exitPictureInPicture();
    }
    getPluginConfig(id) {
        return Dispatcher.getPluginConfig(id);
    }
    hasUsed(id) {
        const plugin = this.plugins[id];
        return isPlainObject(plugin);
    }
    load(srcOrOption, option = {}) {
        const src = isString(srcOrOption)
            ? srcOrOption
            : isPlainObject(srcOrOption) && isString(srcOrOption.src)
                ? srcOrOption.src
                : '';
        if (!isString(srcOrOption)) {
            delete srcOrOption.src;
            option = srcOrOption;
        }
        const oldBox = this.kernel.box;
        const videoConfig = this.videoConfig;
        const { isLive = videoConfig.isLive, box = getLegalBox({ src, box: videoConfig.box }), preset = videoConfig.preset, kernels = videoConfig.kernels, } = option;
        if (box !== 'native' || box !== oldBox || !isEmpty(option)) {
            const video = document.createElement('video');
            const config = { isLive, box, preset, src, kernels };
            const kernel = this.createKernel(video, config);
            this.switchKernel({ video, kernel, config, notifyChange: true });
        }
        const originAutoLoad = this.videoConfig.autoload;
        this.changeUnwatchable(this.videoConfig, 'autoload', false);
        this.videoConfig.src = src || this.videoConfig.src;
        this.kernel.load(this.videoConfig.src);
        this.changeUnwatchable(this.videoConfig, 'autoload', originAutoLoad);
    }
    onReady() {
        this.binder.trigger({
            id: 'dispatcher',
            name: 'ready',
            target: 'plugin',
        });
        this.autoloadVideoSrcAtFirst();
    }
    async requestPictureInPicture() {
        if ('pictureInPictureEnabled' in document) {
            if (this.inPictureInPictureMode) {
                return Promise.resolve(window.__chimee_picture_in_picture);
            }
            const pipWindow = await this.dom.videoElement.requestPictureInPicture();
            window.__chimee_picture_in_picture = pipWindow;
            return pipWindow;
        }
        if (!Dispatcher.hasInstalled(PictureInPicture.name)) {
            Dispatcher.install(PictureInPicture);
        }
        if (!this.hasUsed(PictureInPicture.name)) {
            this.use(PictureInPicture.name);
        }
        return this.plugins.pictureInPicture.requestPictureInPicture();
    }
    silentLoad(src, option = {}) {
        const { duration = 3, bias = 0, repeatTimes = 0, increment = 0, isLive = this.videoConfig.isLive, box = this.videoConfig.box, kernels = this.videoConfig.kernels, preset = this.videoConfig.preset, } = option;
        const immediate = option.immediate || isLive;
        const config = { isLive, box, src, kernels, preset };
        const tasks = new Array(repeatTimes + 1).fill(1).map((value, index) => {
            return () => {
                return new Promise((resolve, reject) => {
                    if (option.abort) {
                        reject({ error: true, message: 'user abort the mission' });
                    }
                    const video = document.createElement('video');
                    const idealTime = this.kernel.currentTime + duration + increment * index;
                    video.muted = true;
                    const that = this;
                    let newVideoReady = false;
                    let kernel;
                    function oldVideoTimeupdate() {
                        const currentTime = that.kernel.currentTime;
                        if ((bias <= 0 && currentTime >= idealTime) ||
                            (bias > 0 &&
                                ((Math.abs(idealTime - currentTime) <= bias && newVideoReady) ||
                                    (currentTime - idealTime) > bias))) {
                            removeEvent(that.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                            removeEvent(video, 'error', videoError, true);
                            if (!newVideoReady) {
                                removeEvent(video, 'canplay', videoCanplay, true);
                                removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
                                kernel.destroy();
                                return resolve();
                            }
                            return reject({
                                error: false,
                                kernel,
                                video,
                            });
                        }
                    }
                    function videoCanplay() {
                        newVideoReady = true;
                        if (immediate) {
                            removeEvent(that.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                            removeEvent(video, 'error', videoError, true);
                            return reject({
                                error: false,
                                kernel,
                                video,
                            });
                        }
                    }
                    function videoLoadedmetadata() {
                        if (!isLive) {
                            kernel.seek(immediate ? this.kernel.currentTime : idealTime);
                        }
                    }
                    function videoError(evt) {
                        removeEvent(video, 'canplay', videoCanplay, true);
                        removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
                        removeEvent(that.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                        kernel.off('error', videoError);
                        let error;
                        if (evt && evt.errmsg) {
                            const { errmsg } = evt;
                            chimeeLog.error('chimee\'s silentload bump into a kernel error', errmsg);
                            error = new Error(errmsg);
                        }
                        else {
                            error = !isEmpty(video.error)
                                ? new Error(video.error.message)
                                : new Error('unknow video error');
                            chimeeLog.error('chimee\'s silentload', error.message);
                        }
                        kernel.destroy();
                        that.silentLoadTempKernel = undefined;
                        return index === repeatTimes
                            ? reject(error)
                            : resolve(error);
                    }
                    addEvent(video, 'canplay', videoCanplay, true);
                    addEvent(video, 'loadedmetadata', videoLoadedmetadata.bind(this), true);
                    addEvent(video, 'error', videoError, true);
                    kernel = this.createKernel(video, config);
                    this.silentLoadTempKernel = kernel;
                    kernel.on('error', videoError);
                    addEvent(this.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                    kernel.load();
                });
            };
        });
        return runRejectableQueue(tasks)
            .then(() => {
            const message = `The silentLoad for ${src} timed out. Please set a longer duration or check your network`;
            if (process.env.NODE_ENV !== 'production') {
                chimeeLog.warn('chimee\'s silentLoad', message);
            }
            return Promise.reject(new Error(message));
        }).catch((result) => {
            if (isError(result)) {
                return Promise.reject(result);
            }
            let kernelError;
            let data;
            if (result.error) {
                kernelError = result;
            }
            else {
                data = result;
            }
            if (kernelError && kernelError.error) {
                if (process.env.NODE_ENV !== 'production') {
                    chimeeLog.warn('chimee\'s silentLoad', kernelError.message);
                }
                return Promise.reject(new Error(kernelError.message));
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
            return new Promise((resolve) => {
                addEvent(video, 'play', () => {
                    this.switchKernel({ video, kernel, config });
                    resolve();
                }, true);
                video.play();
            });
        });
    }
    switchKernel({ video, kernel, config, notifyChange }) {
        const oldKernel = this.kernel;
        const originVideoConfig = clone(this.videoConfig);
        this.dom.migrateVideoRequiredGuardedAttributes(video);
        this.dom.removeVideo();
        this.dom.installVideo(video);
        this.videoConfig.changeWatchable = false;
        this.videoConfig.autoload = false;
        this.videoConfig.src = config.src;
        videoDomAttributes.forEach((key) => {
            if (key !== 'src') {
                this.videoConfig[key] = originVideoConfig[key];
            }
        });
        this.videoConfig.changeWatchable = true;
        this.binder.migrateKernelEvent(oldKernel, kernel);
        this.kernel = kernel;
        this.silentLoadTempKernel = undefined;
        const { isLive, box, preset, kernels } = config;
        Object.assign(this.videoConfig, { isLive, box, preset, kernels });
        oldKernel.destroy();
        if (notifyChange) {
            if (this.binder && this.binder.bindEventOnVideo) {
                this.binder.bindEventOnVideo(video);
            }
        }
        else {
            setTimeout(() => {
                if (this.binder && this.binder.bindEventOnVideo) {
                    this.binder.bindEventOnVideo(video);
                }
            });
        }
        if (this.inPictureInPictureMode) {
            this.exitPictureInPicture();
        }
    }
    throwError(error) {
        this.vm.customThrowError(error);
    }
    unuse(id) {
        const plugin = this.plugins[id];
        if (!plugin) {
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
    use(option) {
        if (isString(option)) {
            option = { name: option, alias: undefined };
        }
        if (!isPlainObject(option) || (isPlainObject(option) && !isString(option.name))) {
            throw new TypeError('pluginConfig do not match requirement');
        }
        if (!isString(option.alias)) {
            option.alias = undefined;
        }
        const { name, alias } = option;
        option.name = alias || name;
        delete option.alias;
        const key = camelize(name);
        const id = camelize(alias || name);
        const pluginOption = option;
        const pluginConfig = Dispatcher.getPluginConfig(key);
        if (!pluginConfig) {
            throw new TypeError('You have not installed plugin ' + key);
        }
        if (isPlainObject(pluginConfig)) {
            pluginConfig.id = id;
        }
        const plugin = isFunction(pluginConfig)
            ? new pluginConfig({ id }, this, pluginOption)
            : new ChimeePlugin(pluginConfig, this, pluginOption);
        this.plugins[id] = plugin;
        Object.defineProperty(this.vm, id, {
            configurable: true,
            enumerable: false,
            value: plugin,
            writable: false,
        });
        this.order.push(id);
        this.sortZIndex();
        if (this.videoConfigReady) {
            plugin.runInitedHook();
        }
        return plugin.ready;
    }
    autoloadVideoSrcAtFirst() {
        if (this.videoConfig.autoload) {
            if (process.env.NODE_ENV !== 'prodution' && !this.videoConfig.src) {
                chimeeLog.warn('You have not set the src, so you better set autoload to be false. Accroding to https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#src.');
                return;
            }
            this.binder.emit({
                id: 'dispatcher',
                name: 'load',
                target: 'plugin',
            }, { src: this.videoConfig.src });
        }
    }
    changeUnwatchable(object, property, value) {
        this.changeWatchable = false;
        object[property] = value;
        this.changeWatchable = true;
    }
    createKernel(video, config) {
        const { kernels, preset } = config;
        if (process.env.NODE_ENV !== 'production' && isEmpty(kernels) && !isEmpty(preset)) {
            chimeeLog.warn('preset will be deprecated in next major version, please use kernels instead.');
        }
        const presetConfig = {};
        let newPreset = {};
        if (isArray(kernels)) {
            newPreset = kernels.reduce((kernels, keyOrSKC) => {
                if (isString(keyOrSKC)) {
                    if (!isSupportedKernelType(keyOrSKC)) {
                        throw new Error(`We have not support ${keyOrSKC} kernel type`);
                    }
                    const kernelFn = kernelsSet[keyOrSKC];
                    if (!isFunction(kernelFn)) {
                        chimeeLog.warn(`You have not installed kernel for ${keyOrSKC}.`);
                        return kernels;
                    }
                    kernels[keyOrSKC] = kernelFn;
                    return kernels;
                }
                if (isPlainObject(keyOrSKC)) {
                    const { name, handler } = keyOrSKC;
                    if (isString(handler)) {
                        if (!isSupportedKernelType(handler)) {
                            throw new Error(`We have not support ${handler} kernel type`);
                        }
                        const kernelFn = kernelsSet[handler];
                        if (!isFunction(kernelFn)) {
                            chimeeLog.warn(`You have not installed kernel for ${handler}.`);
                            return kernels;
                        }
                        kernels[handler] = kernelFn;
                        presetConfig[handler] = keyOrSKC;
                        return kernels;
                    }
                    if (isFunction(handler)) {
                        const kernelName = name || handler.name;
                        if (!isSupportedKernelType(kernelName)) {
                            throw new Error(`We have not support ${kernelName} kernel type`);
                        }
                        kernels[kernelName] = handler;
                        presetConfig[kernelName] = keyOrSKC;
                        return kernels;
                    }
                    chimeeLog.warn(`When you pass in an SingleKernelConfig in Array, you must clarify it's handler, we only support handler in string or function but not ${typeof handler}`);
                    return kernels;
                }
                chimeeLog.warn(`If you pass in kernels as array, you must pass in kernels in string or function, but not ${typeof keyOrSKC}`);
                return kernels;
            }, {});
        }
        else {
            Object.keys(kernels || {}).forEach((key) => {
                const fnOrSKC = kernels[key];
                if (isFunction(fnOrSKC)) {
                    const fn = fnOrSKC;
                    newPreset[key] = fn;
                    return;
                }
                if (isPlainObject(fnOrSKC)) {
                    const SKC = fnOrSKC;
                    const { handler } = SKC;
                    if (isString(handler)) {
                        if (!isSupportedKernelType(handler)) {
                            throw new Error(`We have not support ${handler} kernel type`);
                        }
                        const kernelFn = kernelsSet[handler];
                        if (!isFunction(kernelFn)) {
                            chimeeLog.warn(`You have not installed kernel for ${handler}.`);
                            return;
                        }
                        newPreset[key] = kernelFn;
                        presetConfig[key] = SKC;
                        return;
                    }
                    if (isFunction(handler)) {
                        newPreset[key] = handler;
                        presetConfig[key] = SKC;
                        return;
                    }
                    chimeeLog.warn(`When you pass in an SingleKernelConfig in Object, you must clarify it's handler, we only support handler in string or function but not ${typeof handler}`);
                    return;
                }
                chimeeLog.warn(`If you pass in kernels as object, you must pass in kernels in string or function, but not ${typeof fnOrSKC}`);
                return kernels;
            });
        }
        config.preset = Object.assign(newPreset, preset);
        const legalConfig = Object.assign(config, { presetConfig });
        const kernel = new ChimeeKernel(video, legalConfig);
        return kernel;
    }
    getTopLevel(inner) {
        const arr = this.zIndexMap[inner ? 'inner' : 'outer'];
        const plugin = this.plugins[arr[arr.length - 1]];
        return isEmpty(plugin) ? 0 : plugin.$level;
    }
    initUserPlugin(configs = []) {
        if (!isArray(configs)) {
            if (process.env.NODE_ENV !== 'production') {
                chimeeLog.warn('Dispatcher', `UserConfig.plugin can only by an Array, but not "${configs}" in ${typeof configs}`);
            }
            configs = [];
        }
        return configs.map((config) => this.use(config));
    }
    sortZIndex() {
        const { inner, outer } = this.order.reduce((levelSet, key) => {
            const plugin = this.plugins[key];
            if (isEmpty(plugin)) {
                return levelSet;
            }
            const set = levelSet[plugin.$inner ? 'inner' : 'outer'];
            const level = plugin.$level;
            set[level] = set[level] || [];
            set[level].push(key);
            return levelSet;
        }, ({ inner: {}, outer: {} }));
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
}
__decorate([
    nonenumerable
], Dispatcher.prototype, "inPictureInPictureMode", null);
__decorate([
    before(convertNameIntoId)
], Dispatcher.prototype, "hasUsed", null);
__decorate([
    autobind
], Dispatcher.prototype, "throwError", null);
__decorate([
    before(convertNameIntoId)
], Dispatcher.prototype, "unuse", null);
__decorate([
    before(convertNameIntoId)
], Dispatcher, "getPluginConfig", null);
__decorate([
    before(convertNameIntoId)
], Dispatcher, "hasInstalled", null);
__decorate([
    before(checkPluginConfig)
], Dispatcher, "install", null);
__decorate([
    before(convertNameIntoId)
], Dispatcher, "uninstall", null);
//# sourceMappingURL=index.js.map