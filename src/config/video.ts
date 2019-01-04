import { videoDomAttributes } from 'const/attribute';
import Dom from 'dispatcher/dom';
import Dispatcher from 'dispatcher/index';
import { IVideoKernelConstructor } from 'kernels/base';
import { isNumber, isString } from 'lodash';
import { accessor, alwaysBoolean, alwaysNumber, alwaysString, applyDecorators, configurable, frozen, initString, nonenumerable } from 'toxic-decorators';
import { isNumeric } from 'toxic-predicate-functions';
import { SupportedKernelType, UserConfig, UserKernelsConfig } from 'typings/base';

// TODO: in config we should not need to care about videoconfigready
// let dispatcher to handle this

function stringOrVoid(value: any): string | void {
  return isString(value) ? value : undefined;
}

function accessorVideoProperty(property: string) {
  return accessor({
    get(value: string | number | boolean | void) {
      return (this.dispatcher.videoConfigReady && this.inited)
        ? this.dom.videoElement[property]
        : value;
    },
    set(value: string | number | boolean | void) {
      if (!this.dispatcher.videoConfigReady) { return value; }
      this.dom.videoElement[property] = value;
      return value;
    },
  });
}

function accessorVideoAttribute(attribute: string | { get: string, isBoolean?: boolean, set: string }) {
  const { set, get, isBoolean } = isString(attribute)
    ? {
      get: attribute,
      isBoolean: false,
      set: attribute,
    }
    : attribute;
  return accessor({
    get(value: string | number | boolean | void) {
      return (this.dispatcher.videoConfigReady && this.inited)
        ? this.dom.videoElement[get]
        : value;
    },
    set(value: string | number | boolean | void) {
      if (!this.dispatcher.videoConfigReady) { return value; }
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

function accessorCustomAttribute(attribute: string, isBoolean?: boolean) {
  return accessor({
    get(value: string | number | boolean | void) {
      const attrValue = this.dom.getAttr('video', attribute);
      return (this.dispatcher.videoConfigReady && this.inited)
        ? isBoolean
          ? !!attrValue
          : attrValue
        : value;
    },
    set(value: string | number | boolean | void) {
      if (!this.dispatcher.videoConfigReady) { return value; }
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

function accessorWidthAndHeight(property: string): (...args: any[]) => any {
  return accessor({
    get(value: string | number | void) {
      if (!this.dispatcher.videoConfigReady || !this.inited) { return value; }
      const attr = this.dom.getAttr('video', property);
      const prop = this.dom.videoElement[property];
      if (isNumeric(attr) && isNumber(prop)) { return prop; }
      return attr || undefined;
    },
    set(value: string | number | void) {
      if (!this.dispatcher.videoConfigReady) { return value; }
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
  autoload: alwaysBoolean(),
  autoplay: [
    alwaysBoolean(),
    accessorVideoProperty('autoplay'),
  ],
  controls: [
    alwaysBoolean(),
    accessorVideoProperty('controls'),
  ],
  crossOrigin: [
    accessor({ set: stringOrVoid }),
    accessorVideoAttribute({ set: 'crossorigin', get: 'crossOrigin' }),
  ],
  defaultMuted: [
    alwaysBoolean(),
    accessorVideoAttribute({ get: 'defaultMuted', set: 'muted', isBoolean: true }),
  ],
  defaultPlaybackRate: [
    accessorVideoProperty('defaultPlaybackRate'),
    alwaysNumber(1),
  ],
  disableRemotePlayback: [
    alwaysBoolean(),
    accessorVideoProperty('disableRemotePlayback'),
  ],
  height: [
    accessorWidthAndHeight('height'),
  ],
  loop: [
    alwaysBoolean(),
    accessorVideoProperty('loop'),
  ],
  muted: [
    alwaysBoolean(),
    accessorVideoProperty('muted'),
  ],
  playbackRate: [
    alwaysNumber(1),
    accessorVideoProperty('playbackRate'),
  ],
  playsInline: [
    accessor({
      get(value: boolean) {
        const playsInline = this.dom.videoElement.playsInline;
        return (this.dispatcher.videoConfigReady && this.inited)
          ? playsInline === undefined
            ? value
            : playsInline
          : value;
      },
      set(value: boolean) {
        if (!this.dispatcher.videoConfigReady) { return value; }
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
  poster: [
    // 因为如果在 video 上随便加一个字符串，他会将其拼接到地址上，所以这里要避免
    // 单元测试无法检测
    alwaysString(),
    accessor({
      get(value: string) {
        return (this.dispatcher.videoConfigReady && this.inited)
          ? this.dom.videoElement.poster
          : value;
      },
      set(value: string) {
        if (!this.dispatcher.videoConfigReady) { return value; }
        if (value.length) { this.dom.setAttr('video', 'poster', value); }
        return value;
      },
    }),
  ],
  preload: [
    accessor({
      set(value: 'none' | 'auto' | 'metadata' | '') {
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
  src: [
    alwaysString(),
    accessor({
      set(val: string) {
        // must check val !== this.src here
        // as we will set config.src in the video
        // the may cause dead lock
        if (this.dispatcher.readySync && this.autoload && val !== this.src) { this.needToLoadSrc = true; }
        return val;
      },
    }),
    accessor({
      set(val: string) {
        if (this.needToLoadSrc) {
          // unlock it at first, to avoid deadlock
          this.needToLoadSrc = false;
          this.dispatcher.binder.emit({
            id: 'dispatcher',
            name: 'load',
            target: 'plugin',
          }, val);
        }
        return val;
      },
    }, { preSet: false }),
  ],
  volume: [
    alwaysNumber(1),
    accessorVideoProperty('volume'),
  ],
  width: [
    accessorWidthAndHeight('width'),
  ],
  x5VideoOrientation: [
    accessor({ set: stringOrVoid }),
    accessorCustomAttribute('x5-video-orientation'),
  ],
  x5VideoPlayerFullscreen: [
    accessor({ set(value: boolean) { return !!value; }, get(value: boolean) { return !!value; } }),
    accessorCustomAttribute('x5-video-player-fullscreen', true),
  ],
  x5VideoPlayerType: [
    accessor({
      set(value: 'h5' | undefined) {
        if (!this.dispatcher.videoConfigReady) { return value; }
        const val = value === 'h5' ? 'h5' : undefined;
        this.dom.setAttr('video', 'x5-video-player-type', val);
        return value;
      },
      get(value: 'h5' | undefined) {
        return (this.dispatcher.videoConfigReady && value) ||
          (this.dom.getAttr('video', 'x5-video-player-type') ? 'h5' : undefined);
      },
    }),
  ],
  xWebkitAirplay: [
    accessor({ set(value: boolean) { return !!value; }, get(value: boolean) { return !!value; } }),
    accessorCustomAttribute('x-webkit-airplay', true),
  ],
};

export default class VideoConfig {

  public autoload: boolean = true;

  public autoplay: boolean = false;

  // 此处 box 只能置空，因为 kernel 会自动根据你的安装 kernel 和相关地址作智能判断。
  // 曾经 bug 详见 https://github.com/Chimeejs/chimee-kernel/issues/1
  @initString((str: string) => str.toLocaleLowerCase())
  @configurable
  public box = '';
  // TODO: the watchable flag should not be placed into config
  @nonenumerable
  public changeWatchable: boolean = true;

  public controls: boolean = false;

  public crossOrigin: string | void = undefined;

  public defaultMuted: boolean = false;

  public defaultPlaybackRate: number = 1;

  public disableRemotePlayback: boolean = false;
  public dispatcher: Dispatcher;
  public dom: Dom;

  public height: string | number | void = '100%';
  // TODO: inited flag should not be placed into config
  @nonenumerable
  public inited: boolean = false;

  public isLive: boolean = false;

  // kernels 不在 videoConfig 上设置默认值，防止判断出错
  public kernels: UserKernelsConfig;

  public loop: boolean = false;

  public muted: boolean = false;

  @nonenumerable
  public needToLoadSrc: boolean = false;

  public playbackRate: number = 1;

  public playsInline = false;

  public poster: string = undefined;

  public preload: 'none' | 'auto' | 'metadata' | '' = 'auto';

  // 转为供 kernel 使用的内部参数
  public preset: { [key in SupportedKernelType]?: IVideoKernelConstructor } = {};

  public presetConfig: any = {};

  public src: string = '';

  public volume: number = 1;

  public width: string | number | void = '100%';

  public x5VideoOrientation: 'landscape' | 'portrait' | undefined = undefined;

  public x5VideoPlayerFullscreen: boolean = false;

  public x5VideoPlayerType: 'h5' | undefined = undefined;

  public xWebkitAirplay: boolean = false;

  constructor(dispatcher: Dispatcher, config: UserConfig) {
    applyDecorators(this, accessorMap, { self: true });
    Object.defineProperty(this, 'dispatcher', {
      configurable: false,
      enumerable: false,
      value: dispatcher,
      writable: false,
    });
    Object.defineProperty(this, 'dom', {
      configurable: false,
      enumerable: false,
      value: dispatcher.dom,
      writable: false,

    });
    Object.assign(this, config);
    // deepAssign(this, config);
  }

  public init() {
    videoDomAttributes.forEach((key) => {
      this[key] = this[key];
    });
    this.inited = true;
  }
}
