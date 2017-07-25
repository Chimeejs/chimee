// @flow
import {bind, isString, getDeepProperty, isArray, isObject, isFunction, Log} from 'chimee-helper';
import {videoReadOnlyProperties, videoMethods, kernelMethods, domMethods} from 'helper/const';
import {accessor, nonenumerable, applyDecorators, watch} from 'toxic-decorators';
export default class VideoWrapper {
  __id: string;
  __dispatcher: Dispatcher;
  __unwatchHandlers: Array<Function>;
  __unwatchHandlers = [];
  __wrapAsVideo (videoConfig: VideoConfig) {
    // bind video read only properties on instance, so that you can get info like buffered
    videoReadOnlyProperties.forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          return this.__dispatcher.dom.videoElement[key];
        },
        set: undefined,
        configurable: false,
        enumerable: false
      });
    });
    // bind videoMethods like canplaytype on instance
    videoMethods.forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          const video = this.__dispatcher.dom.videoElement;
          return bind(video[key], video);
        },
        set: undefined,
        configurable: false,
        enumerable: false
      });
    });
    // bind video config properties on instance, so that you can just set src by this
    const props = videoConfig._realDomAttr.concat(videoConfig._kernelProperty)
    .reduce((props, key) => {
      props[key] = [
        accessor({
          get () {
            return videoConfig[key];
          },
          set (value) {
            videoConfig[key] = value;
            return value;
          }
        }),
        nonenumerable
      ];
      return props;
    }, {});
    applyDecorators(this, props, {self: true});
    kernelMethods.forEach(key => {
      Object.defineProperty(this, key, {
        value (...args: any) {
          return new Promise((resolve, reject) => {
            this.__dispatcher.bus.once(this.__id, '_' + key, resolve);
            this.__dispatcher.bus[/^(seek)$/.test(key) ? 'emitSync' : 'emit'](key, ...args);
          });
        },
        configurable: true,
        enumerable: false,
        writable: true
      });
    });
    domMethods.forEach(key => {
      Object.defineProperty(this, key, {
        value (...args: any) {
          return this.__dispatcher.dom[key](...args);
        },
        configurable: true,
        enumerable: false,
        writable: true
      });
    });
  }
  get currentTime (): number {
    return this.__dispatcher.kernel.currentTime;
  }

  set currentTime (second: number) {
    this.__dispatcher.bus.emitSync('seek', second);
  }

  $watch (key: string | Array<string>, handler: Function, {
    deep,
    diff = true,
    other
  }: {
    deep?: boolean,
    diff?: boolean,
    other?: any
  } = {}) {
    if(!isString(key) && !isArray(key)) throw new TypeError(`$watch only accept string and Array<string> as key to find the target to spy on, but not ${key}, whose type is ${typeof key}`);
    let watching = true;
    const watcher = function (...args) {
      if(watching) bind(handler, this)(...args);
    };
    const unwatcher = () => {
      watching = false;
      const index = this.__unwatchHandlers.indexOf(unwatcher);
      if(index > -1) this.__unwatchHandlers.splice(index, 1);
    };
    const keys = isString(key)
      ? key.split('.')
      : key;
    const property = keys.pop();
    const videoConfig = this.__dispatcher.videoConfig;
    const target = (
      keys.length === 0 &&
      !other &&
      videoConfig._realDomAttr.indexOf(property) > -1
    )
      ? videoConfig
      : getDeepProperty(other || this, keys, {throwError: true});
    applyDecorators(target, {
      [property]: watch(watcher, {deep, diff})
    }, {self: true});
    this.__unwatchHandlers.push(unwatcher);
    return unwatcher;
  }

  $set (obj: Object | Array<*>, property: string | number, value: any) {
    if(!isObject(obj) && !isArray(obj)) throw new TypeError(`$set only support Array or Object, but not ${obj}, whose type is ${typeof obj}`);
    // $FlowFixMe: we have custom this function
    if(!isFunction(obj.__set)) {
      Log.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $set.`);
      // $FlowFixMe: we support computed string on array here
      obj[property] = value;
      return;
    }
    obj.__set(property, value);
  }

  $del (obj: Object | Array<*>, property: string) {
    if(!isObject(obj) && !isArray(obj)) throw new TypeError(`$del only support Array or Object, but not ${obj}, whose type is ${typeof obj}`);
    // $FlowFixMe: we have custom this function
    if(!isFunction(obj.__del)) {
      Log.warn('chimee', `${JSON.stringify(obj)} has not been deep watch. There is no need to use $del.`);
      // $FlowFixMe: we support computed string on array here
      delete obj[property];
      return;
    }
    obj.__del(property);
  }
}
