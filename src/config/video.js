// @flow
import { alwaysString, initString, accessor, alwaysBoolean, frozen, alwaysNumber, nonenumerable, applyDecorators, configurable, initBoolean } from 'toxic-decorators';
import { isNumber, isString, deepAssign, isObject, isNumeric } from 'chimee-helper';

function stringOrVoid(value: any): string | void {
  return isString(value) ? value : undefined;
}

function accessorVideoProperty(property: string): Function {
  return accessor({
    get(value) {
      return (this.dispatcher.videoConfigReady && this.inited)
        ? this.dom.videoElement[property]
        : value;
    },
    set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      this.dom.videoElement[property] = value;
      return value;
    },
  });
}

function accessorVideoAttribute(attribute: string | {set: string, get: string, isBoolean?: boolean}): Function {
  const { set, get, isBoolean } = isObject(attribute)
    ? attribute
    : {
      set: attribute,
      get: attribute,
      isBoolean: false,
    };
  return accessor({
    get(value) {
      return (this.dispatcher.videoConfigReady && this.inited)
        ? this.dom.videoElement[get]
        : value;
    },
    set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      const val = isBoolean
        ? value
          ? ''
          : undefined
        /* istanbul ignore next */
        : value === null
          ? undefined
          : value;
      this.dom.setAttr('video', set, val);
      return value;
    },
  }, {
    preSet: false,
  });
}

function accessorCustomAttribute(attribute: string, isBoolean?: boolean): Function {
  return accessor({
    get(value) {
      const attrValue = this.dom.getAttr('video', attribute);
      return (this.dispatcher.videoConfigReady && this.inited)
        ? isBoolean
          ? !!attrValue
          : attrValue
        : value;
    },
    set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      const val = isBoolean
        ? value || undefined
        : value === null
          ? undefined
          : value;
      this.dom.setAttr('video', attribute, val);
      return value;
    },
  });
}

function accessorWidthAndHeight(property: string): Function {
  return accessor({
    get(value) {
      if (!this.dispatcher.videoConfigReady || !this.inited) return value;
      const attr = this.dom.getAttr('video', property);
      const prop = this.dom.videoElement[property];
      if (isNumeric(attr) && isNumber(prop)) return prop;
      return attr || undefined;
    },
    set(value) {
      if (!this.dispatcher.videoConfigReady) return value;
      let val;
      if (value === undefined || isNumber(value)) {
        val = value;
      } else if (isString(value) && !Number.isNaN(parseFloat(value))) {
        val = value;
      }
      this.dom.setAttr('video', property, val);
      return val;
    },
  });
}

const accessorMap = {
  src: [
    alwaysString(),
    accessor({
      set(val: string) {
        // must check val !== this.src here
        // as we will set config.src in the video
        // the may cause dead lock
        if (this.dispatcher.readySync && this.autoload && val !== this.src) this.needToLoadSrc = true;
        return val;
      },
    }),
    accessor({
      set(val: string) {
        if (this.needToLoadSrc) {
          // unlock it at first, to avoid deadlock
          this.needToLoadSrc = false;
          this.dispatcher.binder.emit({
            name: 'load',
            target: 'plugin',
            id: 'dispatcher',
          }, val);
        }
        return val;
      },
    }, { preSet: false }),
  ],
  autoload: alwaysBoolean(),
  autoplay: [
    alwaysBoolean(),
    accessorVideoProperty('autoplay'),
  ],
  controls: [
    alwaysBoolean(),
    accessorVideoProperty('controls'),
  ],
  width: [
    accessorWidthAndHeight('width'),
  ],
  height: [
    accessorWidthAndHeight('height'),
  ],
  crossOrigin: [
    accessor({ set: stringOrVoid }),
    accessorVideoAttribute({ set: 'crossorigin', get: 'crossOrigin' }),
  ],
  loop: [
    alwaysBoolean(),
    accessorVideoProperty('loop'),
  ],
  defaultMuted: [
    alwaysBoolean(),
    accessorVideoAttribute({ get: 'defaultMuted', set: 'muted', isBoolean: true }),
  ],
  muted: [
    alwaysBoolean(),
    accessorVideoProperty('muted'),
  ],
  preload: [
    accessor({
      set(value) {
        const options = [ 'none', 'auto', 'metadata', '' ];
        return options.indexOf(value) > -1
          ? value
          : 'none';
      },
    }, {
      preSet: true,
    }),
    accessorVideoAttribute('preload'),
  ],
  poster: [
    // 因为如果在 video 上随便加一个字符串，他会将其拼接到地址上，所以这里要避免
    // 单元测试无法检测
    alwaysString(),
    accessor({
      get(value) {
        return (this.dispatcher.videoConfigReady && this.inited)
          ? this.dom.videoElement.poster
          : value;
      },
      set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        if (value.length) this.dom.setAttr('video', 'poster', value);
        return value;
      },
    }),
  ],
  playsInline: [
    accessor({
      get(value) {
        const playsInline = this.dom.videoElement.playsInline;
        return (this.dispatcher.videoConfigReady && this.inited)
          ? playsInline === undefined
            ? value
            : playsInline
          : value;
      },
      set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        this.dom.videoElement.playsInline = value;
        const val = value ? '' : undefined;
        this.dom.setAttr('video', 'playsinline', val);
        this.dom.setAttr('video', 'webkit-playsinline', val);
        this.dom.setAttr('video', 'x5-playsinline', val);
        return value;
      },
    }),
    alwaysBoolean(),
  ],
  x5VideoPlayerFullscreen: [
    accessor({ set(value) { return !!value; }, get(value) { return !!value; } }),
    accessorCustomAttribute('x5-video-player-fullscreen', true),
  ],
  x5VideoOrientation: [
    accessor({ set: stringOrVoid }),
    accessorCustomAttribute('x5-video-orientation'),
  ],
  x5VideoPlayerType: [
    accessor({
      set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        const val = value === 'h5-page' ? 'h5-page' : undefined;
        this.dom.setAttr('video', 'x5-video-player-type', val);
        return value;
      },
      get(value) {
        return (this.dispatcher.videoConfigReady && value) ||
          (this.dom.getAttr('video', 'x5-video-player-type') ? 'h5-page' : undefined);
      },
    }),
  ],
  xWebkitAirplay: [
    accessor({ set(value) { return !!value; }, get(value) { return !!value; } }),
    accessorCustomAttribute('x-webkit-airplay', true),
  ],
  playbackRate: [
    alwaysNumber(1),
    accessorVideoProperty('playbackRate'),
  ],
  defaultPlaybackRate: [
    accessorVideoProperty('defaultPlaybackRate'),
    alwaysNumber(1),
  ],
  disableRemotePlayback: [
    alwaysBoolean(),
    accessorVideoProperty('disableRemotePlayback'),
  ],
  volume: [
    alwaysNumber(1),
    accessorVideoProperty('volume'),
  ],
};

export default class VideoConfig {
  dispatcher: Dispatcher;
  dom: Dom;
  inited: boolean;
  // kernels 不在 videoConfig 上设置默认值，防止判断出错
  kernels: UserKernelsConfig;

  @nonenumerable
  needToLoadSrc = false;

  @nonenumerable
  changeWatchable = true;

  @nonenumerable
  inited = false;

  src = '';

  @initBoolean()
  @configurable
  isLive = false;

  // 此处 box 只能置空，因为 kernel 会自动根据你的安装 kernel 和相关地址作智能判断。
  // 曾经 bug 详见 https://github.com/Chimeejs/chimee-kernel/issues/1
  @initString(str => str.toLocaleLowerCase())
  @configurable
  box = '';

  // 转为供 kernel 使用的内部参数
  preset = {};

  presetConfig = {};

  autoload = true;

  autoplay = false;

  controls = false;

  width = '100%';

  height = '100%';

  crossOrigin = undefined;

  loop = false;

  defaultMuted = false;

  muted = false;

  preload = 'auto';

  poster = undefined;

  playsInline = false;

  x5VideoPlayerFullscreen = false;

  x5VideoOrientation = undefined;

  x5VideoPlayerType = undefined;

  xWebkitAirplay = false;

  playbackRate = 1;

  defaultPlaybackRate = 1;

  disableRemotePlayback = false;

  volume = 1;

  @frozen
  _kernelProperty = [ 'isLive', 'box', 'preset', 'kernels', 'presetConfig' ];

  @frozen
  _realDomAttr = [ 'src', 'controls', 'width', 'height', 'crossOrigin', 'loop', 'muted', 'preload', 'poster', 'autoplay', 'playsInline', 'x5VideoPlayerFullscreen', 'x5VideoOrientation', 'xWebkitAirplay', 'playbackRate', 'defaultPlaybackRate', 'autoload', 'disableRemotePlayback', 'defaultMuted', 'volume', 'x5VideoPlayerType' ];

  constructor(dispatcher: Dispatcher, config: Object) {
    applyDecorators(this, accessorMap, { self: true });
    Object.defineProperty(this, 'dispatcher', {
      value: dispatcher,
      enumerable: false,
      writable: false,
      configurable: false,
    });
    Object.defineProperty(this, 'dom', {
      value: dispatcher.dom,
      enumerable: false,
      writable: false,
      configurable: false,
    });
    deepAssign(this, config);
  }

  init() {
    this._realDomAttr.forEach(key => {
      // $FlowFixMe: we have check the computed here
      this[key] = this[key];
    });
    this.inited = true;
  }
}
