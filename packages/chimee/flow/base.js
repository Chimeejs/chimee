import type Plugin from 'dispatcher/index';
import type Dispatcher from 'dispatcher/index';
import type Bus from 'dispatcher/bus';
import type Dom from 'dispatcher/dom';
import type Chimee from '../src/index';
import type Kernel from 'kernel/index';
import type VideoConfig from 'dispatcher/video-config';
import type VideoWrapper from 'dispatcher/video-wrapper';
import type GlobalConfig from 'global/config';
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

declare type UserConfig = {
  src?: string,
  box?: string,
  isLive?: boolean,
  wrapper: string | Element,
  plugin?: Array<string | UserPluginConfig>,
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
  preset?: {
    flv?: Function,
    hls?: Function
  }
}
