import { chimeeLog } from 'chimee-helper-log';
import { cloneDeep, isBoolean, isError, isFunction, isInteger, isPlainObject, isString } from 'lodash';
import { accessor, applyDecorators, frozen } from 'toxic-decorators';
import { isEmpty, isPromise } from 'toxic-predicate-functions';
import { bind } from 'toxic-utils';
import VideoWrapper from '../dispatcher/video-wrapper';
export default class ChimeePlugin extends VideoWrapper {
    constructor({ id, name, level = 0, operable = true, beforeCreate, create, init, inited, destroy, events = {}, data = {}, computed = {}, methods = {}, el, penetrate = false, inner = true, autoFocus, className, }, dispatcher, option = { name }) {
        super({ dispatcher, id });
        this.destroyed = false;
        this.VERSION = process.env.PLAYER_VERSION;
        this.autoFocusValue = false;
        this.levelValue = 0;
        this.operableValue = true;
        if (!dispatcher) {
            if (process.env.NODE_ENV !== 'production') {
                chimeeLog.error('Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?');
            }
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
        }
        catch (error) {
            this.$throwError(error);
        }
        if (!isEmpty(methods) && isPlainObject(methods)) {
            Object.keys(methods).forEach((key) => {
                const fn = methods[key];
                if (!isFunction(fn)) {
                    throw new TypeError('plugins methods must be Function');
                }
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: false,
                    value: bind(fn, this),
                    writable: true,
                });
            });
        }
        if (!isEmpty(events) && isPlainObject(events)) {
            Object.keys(events)
                .forEach((key) => {
                if (!isFunction(events[key])) {
                    throw new TypeError('plugins events hook must bind with Function');
                }
                this.$on(key, events[key]);
            });
        }
        if (!isEmpty(data) && isPlainObject(data)) {
            Object.assign(this, cloneDeep(data));
        }
        if (!isEmpty(computed) && isPlainObject(computed)) {
            const props = Object.keys(computed)
                .reduce((props, key) => {
                const val = computed[key];
                if (isFunction(val)) {
                    props[key] = accessor({ get: val });
                    return props;
                }
                if (isPlainObject(val) && (isFunction(val.get) || isFunction(val.set))) {
                    props[key] = accessor(val);
                    return props;
                }
                if (process.env.NODE_ENV !== 'production') {
                    chimeeLog.warn('Dispatcher.plugin', `Wrong computed member '${key}' defination in Plugin ${name}`);
                }
                return props;
            }, {});
            applyDecorators(this, props, { self: true });
        }
        this.create = this.create || create;
        this.init = this.init || init;
        this.inited = this.inited || inited;
        this.destroy = this.destroy || destroy;
        this.$dom = this.dispatcher.dom.insertPlugin(this.id, el, { penetrate, inner, className });
        this.$autoFocus = isBoolean(autoFocus) ? autoFocus : inner;
        this.$inner = inner;
        this.$penetrate = penetrate;
        applyDecorators(this, {
            $inner: frozen,
            $penetrate: frozen,
        }, { self: true });
        this.$operable = isBoolean(option.operable)
            ? option.operable
            : operable;
        this.levelValue = isInteger(option.level)
            ? option.level
            : level;
        this.$config = option;
        try {
            if (isFunction(this.create)) {
                this.create();
            }
        }
        catch (error) {
            this.$throwError(error);
        }
    }
    get $autoFocus() {
        return this.autoFocusValue;
    }
    set $autoFocus(val) {
        this.autoFocusValue = val;
        const dom = this.dispatcher.dom;
        dom.autoFocusToVideo(this.$dom, !val);
    }
    set $level(val) {
        if (!isInteger(val)) {
            return;
        }
        this.levelValue = val;
        const dispatcher = this.dispatcher;
        dispatcher.sortZIndex();
    }
    get $level() {
        return this.levelValue;
    }
    set $operable(val) {
        if (!isBoolean(val)) {
            return;
        }
        this.$dom.style.pointerEvents = val ? 'auto' : 'none';
        this.operableValue = val;
    }
    get $operable() {
        return this.operableValue;
    }
    $bumpToTop() {
        const dispatcher = this.dispatcher;
        const topLevel = dispatcher.getTopLevel(this.$inner);
        this.$level = topLevel + 1;
    }
    $destroy() {
        if (this.destroyed) {
            return;
        }
        if (isFunction(this.destroy)) {
            this.destroy();
        }
        super.destroyVideoWrapper();
        this.dispatcher.dom.removePlugin(this.id);
        delete this.dispatcher;
        delete this.$dom;
        this.destroyed = true;
    }
    $throwError(error) {
        this.dispatcher.throwError(error);
    }
    runInitedHook() {
        let result;
        try {
            result = isFunction(this.inited) && this.inited();
        }
        catch (error) {
            this.$throwError(error);
        }
        const promiseResult = isPromise(result) && result;
        this.readySync = !promiseResult;
        this.ready = promiseResult
            ? promiseResult
                .then(() => {
                this.readySync = true;
                return this;
            })
                .catch((error) => {
                if (isError(error)) {
                    this.$throwError(error);
                }
                return Promise.reject(error);
            })
            : Promise.resolve(this);
        return this.readySync
            ? this
            : this.ready;
    }
    runInitHook(videoConfig) {
        try {
            if (isFunction(this.init)) {
                this.init(videoConfig);
            }
        }
        catch (error) {
            this.$throwError(error);
        }
    }
}
//# sourceMappingURL=plugin.js.map