// @flow
import {alwaysString, initString, initArray, accessor, alwaysBoolean, frozen, alwaysNumber, nonenumerable, lock, applyDecorators, configurable} from 'toxic-decorators';
import {isNumber, isString, deepAssign} from 'chimee-helper';
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
function setPlaysInline () {
  return accessor({
    set (val: boolean | void) {
      val = val || undefined;
      this.dispatcher.dom.setAttr('video', 'playsinline', val);
      this.dispatcher.dom.setAttr('video', 'webkit-playsinline', val);
      this.dispatcher.dom.setAttr('video', 'x5-video-player-type', val ? 'h5' : undefined);
      return val;
    }
  });
}
export default class VideoConfig {
  dispatcher: Dispatcher;
  @nonenumerable
  needToLoadSrc = false;
  constructor (dispatcher: Dispatcher, config: Object) {
    Object.defineProperty(this, 'dispatcher', {
      value: dispatcher,
      enumerable: false,
      writable: false,
      configurable: false
    });
    deepAssign(this, config);
  }
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
  @configurable
  @initString()
  type = 'vod';
  @configurable
  @initString(str => str.toLocaleLowerCase())
  box = '';
  @configurable
  @initArray()
  runtimeOrder = ['html5', 'flash'];
  @setVideo('autoplay', true)
  @alwaysBoolean()
  autoplay = false;
  @alwaysBoolean()
  autoload = true;
  @setVideo('controls', true)
  @alwaysBoolean()
  controls = false;
  @setVideo('width')
  @accessor({set: numberOrVoid})
  width = undefined;
  @setVideo('height')
  @accessor({set: numberOrVoid})
  height = undefined;
  @setVideo('crossorigin')
  @accessor({set: stringOrVoid})
  crossorigin = undefined;
  @setVideo('loop', true)
  @alwaysBoolean()
  loop = false;
  @setVideo('defaultMuted')
  @alwaysBoolean()
  defaultMuted = false;
  @setVideo('muted')
  @alwaysBoolean()
  muted = false;
  @setVideo('preload')
  @accessor({set: stringOrVoid})
  preload = undefined;
  @setVideo('poster')
  @alwaysString()
  poster = '';
  @setPlaysInline()
  @alwaysBoolean()
  playsinline = false;
  @setVideo('x5-video-player-fullscreen', true)
  @alwaysBoolean()
  x5VideoPlayerFullScreen = false;
  @setVideo('x5-video-orientation')
  @accessor({set: stringOrVoid})
  x5VideoOrientation = undefined;
  @setVideo('x-webkit-airplay', true)
  @alwaysBoolean()
  xWebkitAirplay = false;
  @setVideo('playbackRate')
  @alwaysNumber(1)
  playbackRate = 1;
  @setVideo('defaultPlaybackRate')
  @alwaysNumber(1)
  defaultPlaybackRate = 1;
  @setVideo('disableRemotePlayback', true)
  @alwaysBoolean()
  disableRemotePlayback = false;
  get volume (): number {
    return this.dispatcher.dom.videoElement.volume;
  }
  set volume (volume: number) {
    this.dispatcher.dom.videoElement.volume = volume;
  }
  @frozen
  _kernelProperty = ['type', 'box', 'runtimeOrder'];
  @frozen
  _realDomAttr = ['src', 'controls', 'width', 'height', 'crossorigin', 'loop', 'muted', 'preload', 'poster', 'autoplay', 'playsinline', 'x5VideoPlayerFullScreen', 'x5VideoOrientation', 'xWebkitAirplay', 'playbackRate', 'defaultPlaybackRate', 'autoload', 'disableRemotePlayback', 'defaultMuted', 'volume'];
  lockKernelProperty () {
    // const desc = Object.getOwnPropertyDescriptor(this, 'type');
    // if(desc.configurable) console.warn(desc);
    applyDecorators(this, {
      type: lock,
      box: lock,
      runtimeOrder: lock
    }, {self: true});
  }
}
