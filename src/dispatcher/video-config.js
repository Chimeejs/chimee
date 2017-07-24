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

function accessorVideoAttribute (attribute: string | {set: string, get: string, isBoolean?: boolean}): Function {
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
      const val = isBoolean
        ? value
          ? ''
          : undefined
        : value;
      this.dispatcher.dom.setAttr('video', set, val);
      return value;
    }
  });
}

function accessorCustomAttribute (attribute: string, isBoolean?: boolean): Function {
  return accessor({
    get (value) {
      const attrValue = this.dispatcher.dom.getAttr('video', attribute);
      return (this.dispatcher.videoConfigReady && this.inited)
        ? isBoolean
          ? !!attrValue
          : attrValue
        : value;
    },
    set (value) {
      if(!this.dispatcher.videoConfigReady) return value;
      const val = isBoolean
        ? value || undefined
        : value;
      this.dispatcher.dom.setAttr('video', attribute, val);
      return value;
    }
  });
}

const accessorMap = {
  src: [
    alwaysString(),
    accessor({
      set (val: string) {
        if(this.needToLoadSrc) {
          // unlock it at first, to avoid deadlock
          this.needToLoadSrc = false;
          this.dispatcher.bus.emit('load', val);
        }
        return val;
      }
    }, {preSet: false}),
    accessor({
      set (val: string) {
        // must check val !== this.src here
        // as we will set config.src in the video
        // the may cause dead lock
        if(this.dispatcher.readySync && this.autoload && val !== this.src) this.needToLoadSrc = true;
        return val;
      }
    })
  ],
  autoload: alwaysBoolean(),
  autoplay: [
    alwaysBoolean(),
    accessorVideoProperty('autoplay')
  ],
  controls: [
    alwaysBoolean(),
    accessorVideoProperty('controls')
  ],
  width: [
    accessor({set: numberOrVoid}),
    accessorVideoAttribute('width')
  ],
  height: [
    accessor({set: numberOrVoid}),
    accessorVideoAttribute('height')
  ],
  crossOrigin: [
    accessor({set: stringOrVoid}),
    accessorVideoAttribute({set: 'crossorigin', get: 'crossOrigin'})
  ],
  loop: [
    alwaysBoolean(),
    accessorVideoProperty('loop')
  ],
  defaultMuted: [
    alwaysBoolean(),
    accessorVideoAttribute({get: 'defaultMuted', set: 'muted', isBoolean: true})
  ],
  muted: [
    alwaysBoolean(),
    accessorVideoProperty('muted')
  ],
  preload: [
    accessor({set: stringOrVoid}),
    accessorVideoAttribute('preload')
  ],
  poster: [
    accessor({set: stringOrVoid}),
    accessorVideoAttribute('poster')
  ],
  playsInline: [
    accessor({
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
        const val = value ? '' : undefined;
        this.dispatcher.dom.setAttr('video', 'playsinline', val);
        this.dispatcher.dom.setAttr('video', 'webkit-playsinline', val);
        this.dispatcher.dom.setAttr('video', 'x5-video-player-type', value ? 'h5' : undefined);
        return value;
      }
    }),
    alwaysBoolean()
  ],
  x5VideoPlayerFullScreen: [
    accessor({set (value) {return !!value;}, get (value) {return !!value;}}),
    accessorCustomAttribute('x5-video-player-fullscreen', true)
  ],
  x5VideoOrientation: [
    accessor({set: stringOrVoid}),
    accessorCustomAttribute('x5-video-orientation')
  ],
  xWebkitAirplay: [
    accessor({set (value) {return !!value;}, get (value) {return !!value;}}),
    accessorCustomAttribute('x-webkit-airplay', true)
  ],
  playbackRate: [
    alwaysNumber(1),
    accessorVideoProperty('playbackRate')
  ],
  defaultPlaybackRate: [
    accessorVideoProperty('defaultPlaybackRate'),
    alwaysNumber(1)
  ],
  disableRemotePlayback: [
    alwaysBoolean(),
    accessorVideoProperty('disableRemotePlayback')
  ],
  volume: [
    alwaysNumber(1),
    accessorVideoProperty('volume')
  ]
};

export default class VideoConfig {
  dispatcher: Dispatcher;
  videoElement: HTMLVideoElement;
  inited: boolean;

  @nonenumerable
  needToLoadSrc = false;

  @nonenumerable
  inited = false;

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

  autoload = true;

  autoplay = false;

  controls = false;

  width = undefined;

  height = undefined;

  crossOrigin = undefined;

  loop = false;

  defaultMuted = false;

  muted = false;

  preload = 'auto';

  poster = undefined;

  playsInline = false;

  x5VideoPlayerFullScreen = false;

  x5VideoOrientation = undefined;

  xWebkitAirplay = false;

  playbackRate = 1;

  defaultPlaybackRate = 1;

  disableRemotePlayback = false;

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

  constructor (dispatcher: Dispatcher, config: Object) {
    applyDecorators(this, accessorMap, {self: true});
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
}
