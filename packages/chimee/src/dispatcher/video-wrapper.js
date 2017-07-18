// @flow
import {bind} from 'chimee-helper';
import {videoReadOnlyProperties, videoMethods, kernelMethods, domMethods} from 'helper/const';
import {accessor, nonenumerable, applyDecorators} from 'toxic-decorators';
export default class VideoWrapper {
  __id: string;
  __dispatcher: Dispatcher;
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
}
