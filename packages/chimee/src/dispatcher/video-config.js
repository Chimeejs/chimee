// @flow
import {alwaysString, initString, initArray, accessor, alwaysBoolean, frozen, alwaysNumber, nonenumerable, lock, applyDecorators, configurable} from 'toxic-decorators';
import {isNumber, isString, deepAssign, isObject} from 'chimee-helper';

function numberOrVoid (value: any): number | void {
  return isNumber(value) ? value : undefined;
}
function stringOrVoid (value: any): string | void {
  return isString(value) ? value : undefined;
}

function accessorVideoProperty (property: string): Function {
  return accessor({
    get (value) {
      return (this.dispatcher.videoConfigReady && this.inited)
        ? this.videoElement[property]
        : value;
    },
    set (value) {
      if(!this.dispatcher.videoConfigReady) return value;
      this.videoElement[property] = value;
      return value;
    }
  });
}

function accessorVideoAttribute (attribute: string | {set: string, get: string, isBoolean: boolean}): Function {
  const {set, get, isBoolean} = isObject(attribute)
    ? attribute
    : {
      set: attribute,
      get: attribute,
      isBoolean: false
    };
  return accessor({
    get (value) {
      return (this.dispatcher.videoConfigReady && this.inited)
        ? this.videoElement[get]
        : value;
    },
    set (value) {
      if(!this.dispatcher.videoConfigReady) return value;
      value = isBoolean
        ? value
          ? ''
          : undefined
        : value;
      this.dispatcher.dom.setAttr('video', set, value);
      return value;
    }
  });
}

function accessorCustomAttribute (attribute: string, isBoolean: boolean): Function {
  return accessor({
    get (value) {
      const attrValue = this.dispatcher.dom.getAttr('video', attribute);
      return (this.dispatcher.videoConfigReady && this.inited)
        ? attrValue
        : value;
    },
    set (value) {
      if(!this.dispatcher.videoConfigReady) return value;
      if(isBoolean) value = value || undefined;
      this.dispatcher.dom.setAttr('video', attribute, value);
      return value;
    }
  });
}

export default class VideoConfig {
  dispatcher: Dispatcher;
  videoElement: HTMLVideoElement;
  inited: boolean;

  @configurable
  @nonenumerable
  needToLoadSrc = false;

  @nonenumerable
  inited = false;

  constructor (dispatcher: Dispatcher, config: Object) {
    Object.defineProperty(this, 'dispatcher', {
      value: dispatcher,
      enumerable: false,
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, 'videoElement', {
      value: dispatcher.dom.videoElement,
      enumerable: false,
      writable: false,
      configurable: false
    });
    deepAssign(this, config);
  }

  init () {
    this._realDomAttr.forEach(key => {
      // $FlowFixMe: we have check the computed here
      this[key] = this[key];
    });
    this.inited = true;
  }

  @configurable
  @alwaysString()
  @accessor({
    set (val: string) {
      if(this.needToLoadSrc) {
        // unlock it at first, to avoid deadlock
        this.needToLoadSrc = false;
        this.dispatcher.bus.emit('load', val);
      }
      return val;
    }
  }, {preSet: false})
  @accessor({
    set (val: string) {
      // must check val !== this.src here
      // as we will set config.src in the video
      // the may cause dead lock
      if(this.dispatcher.readySync && this.autoload && val !== this.src) this.needToLoadSrc = true;
      return val;
    }
  })
  src = '';

  @initString()
  @configurable
  type = 'vod';

  @initString(str => str.toLocaleLowerCase())
  @configurable
  box = '';

  @initArray()
  @configurable
  runtimeOrder = ['html5', 'flash'];

  @alwaysBoolean()
  @configurable
  autoload = true;

  @alwaysBoolean()
  @accessorVideoProperty('autoplay')
  @configurable
  autoplay = false;

  @alwaysBoolean()
  @accessorVideoProperty('controls')
  @configurable
  controls = false;

  @accessor({set: numberOrVoid})
  @accessorVideoAttribute('width')
  @configurable
  width = undefined;

  @accessor({set: numberOrVoid})
  @accessorVideoAttribute('height')
  @configurable
  height = undefined;

  @configurable
  @accessor({set: stringOrVoid})
  @accessorVideoAttribute({set: 'crossorigin', get: 'crossOrigin'})
  crossOrigin = undefined;

  @alwaysBoolean()
  @accessorVideoProperty('loop')
  @configurable
  loop = false;

  @alwaysBoolean()
  @accessorVideoAttribute({get: 'defaultMuted', set: 'muted', isBoolean: true})
  @configurable
  defaultMuted = false;

  @alwaysBoolean()
  @accessorVideoProperty('muted')
  @configurable
  muted = false;

  @accessor({set: stringOrVoid})
  @accessorVideoAttribute('preload')
  @configurable
  preload = 'auto';

  @accessor({set: stringOrVoid})
  @accessorVideoAttribute('poster')
  @configurable
  poster = undefined;

  @configurable
  @accessor({
    get (value) {
      const playsInline = this.videoElement.playsInline;
      return (this.dispatcher.videoConfigReady && this.inited)
        ? playsInline === undefined
          ? value
          : playsInline
        : value;
    },
    set (value) {
      if(!this.dispatcher.videoConfigReady) return value;
      this.videoElement.playsInline = value;
      value = value ? '' : undefined;
      this.dispatcher.dom.setAttr('video', 'playsinline', value);
      this.dispatcher.dom.setAttr('video', 'webkit-playsinline', value);
      this.dispatcher.dom.setAttr('video', 'x5-video-player-type', value === '' ? 'h5' : undefined);
      return value;
    }
  })
  @alwaysBoolean()
  playsInline = false;

  @accessor({set (value) {return !!value;}, get (value) {return !!value;}})
  @accessorCustomAttribute('x5-video-player-fullscreen', true)
  @configurable
  x5VideoPlayerFullScreen = false;

  @accessor({set: stringOrVoid})
  @accessorCustomAttribute('x5-video-orientation')
  @configurable
  x5VideoOrientation = undefined;

  @accessor({set (value) {return !!value;}, get (value) {return !!value;}})
  @accessorCustomAttribute('x-webkit-airplay', true)
  @configurable
  xWebkitAirplay = false;

  @alwaysNumber(1)
  @accessorVideoProperty('playbackRate')
  @configurable
  playbackRate = 1;

  @accessorVideoProperty('defaultPlaybackRate')
  @alwaysNumber(1)
  @configurable
  defaultPlaybackRate = 1;

  @alwaysBoolean()
  @accessorVideoProperty('disableRemotePlayback')
  @configurable
  disableRemotePlayback = false;

  @alwaysNumber(1)
  @accessorVideoProperty('volume')
  @configurable
  volume = 1;

  @frozen
  _kernelProperty = ['type', 'box', 'runtimeOrder'];

  @frozen
  _realDomAttr = ['src', 'controls', 'width', 'height', 'crossOrigin', 'loop', 'muted', 'preload', 'poster', 'autoplay', 'playsInline', 'x5VideoPlayerFullScreen', 'x5VideoOrientation', 'xWebkitAirplay', 'playbackRate', 'defaultPlaybackRate', 'autoload', 'disableRemotePlayback', 'defaultMuted', 'volume'];
  lockKernelProperty () {
    applyDecorators(this, {
      type: lock,
      box: lock,
      runtimeOrder: lock
    }, {self: true});
  }
}
