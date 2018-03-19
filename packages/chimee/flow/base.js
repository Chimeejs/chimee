import type Plugin from 'dispatcher/plugin';
import type Dispatcher from 'dispatcher/index';
import type Bus from 'dispatcher/bus';
import type Dom from 'dispatcher/dom';
import type Chimee from '../src/index';
import type VideoConfig from 'dispatcher/video-config';
import type VideoWrapper from 'dispatcher/video-wrapper';
import type GlobalConfig from 'global/config';
import type ChimeeKernel from 'chimee-kernel';
declare type PluginConfig = {
  id: string,
  name: string,
  el: string | Element | void;
  level: number,
  operable: boolean,
  inner: boolean,
  autoFocus: boolean,
  penetrate: boolean,
  events: PluginEvents,
  methods: PluginMethods,
  data: Object,
  computed: {|
    [string]: Function | {
      get: Function,
      set: Function
    }
  |},
  beforeCreate: Function,
  create: Function,
  destroy: Function,
  init: Function,
  inited: Function,
  className: string | Array<string>
};

declare type PluginEvents = {
  [string]: Function
}

declare type PluginMethods = {|
  [string]: Function
|}

declare type PluginOption = {
  name: string,
  alias?: string,
  level?: number,
  operable?: boolean
};

declare type PluginOrder = Array<string>;

declare type plugins = {
  [key: string]: Plugin
}

declare type PluginConfigSet = {
  [key: string]: PluginConfig | Function
}

declare type KernelsSet = {
  [key: string]: Function
}

declare type VesselConfig = {
  width?: number | string,
  height?: number | string,
}

declare type SingleKernelConfig = {
  name?: string,
  handler?: Function | string,
  [key: string]: any,
}

declare type UserKernelsConfig = Array<string> | {
  flv?: Function,
  hls?: Function,
  mp4?: Function,
} | {
  flv?: SingleKernelConfig,
  hls?: SingleKernelConfig,
  mp4?: SingleKernelConfig,
} | Array<SingleKernelConfig>

declare type UserConfig = {
  src?: string,
  box?: string,
  isLive?: boolean,
  wrapper: string | Element,
  plugin?: Array<string | PluginOption>,
  autoplay?: boolean,
  autoload?: boolean,
  controls?: boolean,
  width?: number,
  height?: number,
  runtimeOrder?: Array<string>,
  crossorigin?: string,
  loop?: boolean,
  muted?: boolean,
  preload?: string,
  poster?: string,
  playsinline?: boolean,
  x5VideoPlayerFullScreen?: boolean,
  x5VideoOrientation?: string,
  xWebkitAirplay?: boolean,
  playbackRate?: number,
  defaultPlaybackRate?: number,
  disableRemotePlayback?: boolean,
  defaultMuted?: boolean,
  kernels?: UserKernelsConfig,
  preset?: {
    flv?: Function,
    hls?: Function
  },
  container?: VesselConfig,
}

declare type binderTarget = 'kernel' | 'container' | 'wrapper' | 'video' | 'video-dom' | 'plugin';

declare type eventStage = 'before' | 'main' | 'after' | '_';

declare type eventOptions = {
  target?: binderTarget;
  stage?: eventStage;
  once?: boolean;
}

declare type rawEventInfo = {
  name: string,
  stage: eventStage,
  target: binderTarget,
}

declare type emitEventInfo = {
  name: string,
  id: string,
  target: binderTarget,
}

declare type wholeEventInfo = {
  name: string,
  stage: eventStage,
  target: binderTarget,
  id: string,
  fn: Function,
}
