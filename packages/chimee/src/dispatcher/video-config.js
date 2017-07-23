// @flow
import {alwaysString, initString, initArray, accessor, alwaysBoolean, frozen, alwaysNumber, nonenumerable, lock, applyDecorators, configurable} from 'toxic-decorators';
import {isNumber, isString, deepAssign, isObject} from 'chimee-helper';
function setVideo (key: string, isBooleanAttribute?: boolean) {
  return accessor({
    set (val: any) {
      // if it's not ready, the config should be set to the video
      // but it can be different from the video, so that it can be set
      if(!this.dispatcher.videoConfigReady) return val;

      if(!/^(playbackRate|defaultPlaybackRate|muted|defaultMuted|disableRemotePlayback)$/.test(key)) {
        if(isBooleanAttribute) {
          val = val ? true : undefined;
        }
        this.dispatcher.dom.setAttr('video', key, val);
      }
      if(/^(playbackRate|defaultPlaybackRate|muted|defaultMuted|disableRemotePlayback)$/.test(key)) {
        val = isBooleanAttribute ? !!val : val;
        this.dispatcher.dom.videoElement[key] = val;
      }
      return val;
    }
  });
}
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

  @alwaysBoolean()
  @setVideo('x5-video-player-fullscreen', true)
  @configurable
  x5VideoPlayerFullScreen = false;

  @accessor({set: stringOrVoid})
  @setVideo('x5-video-orientation')
  @configurable
  x5VideoOrientation = undefined;

  @alwaysBoolean()
  @setVideo('x-webkit-airplay', true)
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
