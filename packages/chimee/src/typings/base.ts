import ChimeePlugin from '../dispatcher/plugin';
import { IVideoKernelConstructor } from '../kernels/base';

export type EventStage = 'before' | 'main' | 'after' | '_';

export type BinderTarget = 'kernel' | 'container' | 'wrapper' | 'video' | 'video-dom' | 'plugin' | 'esFullscreen';

export type EventOptions = {
  stage?: EventStage;
  target?: BinderTarget;
};

export type ComputedMap = {
  [x: string]: (() => any) | {
    get: () => any,
    set: (value: any) => void,
  },
};

export type PluginEvents = Partial<{ [key in keyof ChimeeSpace.IChimeeEventRecord]: Parameters<ChimeePlugin['$on']>[1] }>;

export type PluginMethods = { [x: string]: (...args: any[]) => any };

export type PluginConfig = {
  autoFocus: boolean,
  beforeCreate: ChimeePlugin['beforeCreate'],
  className: string | string[]
  computed: ComputedMap,
  create: ChimeePlugin['create'],
  data: any,
  destroy: ChimeePlugin['destroy'],
  el: string | Element | void;
  events: PluginEvents,
  id: string,
  init: ChimeePlugin['init'],
  inited: ChimeePlugin['inited'],
  inner: boolean,
  level: number,
  methods: PluginMethods,
  name: string,
  operable: boolean,
  penetrate: boolean,
};

export type PluginOption = {
  alias?: string,
  level?: number,
  name: string,
  operable?: boolean,
};

export type VesselConfig = {
  height?: number | string,
  width?: number | string,
};

export type SingleKernelConfig = {
  [key: string]: any,
  handler?: IVideoKernelConstructor | string,
  name?: SupportedKernelType,
};

export type UserKernelsConstructorMap = {
  flv?: IVideoKernelConstructor,
  hls?: IVideoKernelConstructor,
  mp4?: IVideoKernelConstructor,
};

export type SupportedKernelType = 'flv' | 'hls' | 'mp4';

export type UserKernelsConfig = SupportedKernelType[] | UserKernelsConstructorMap | {
  flv?: SingleKernelConfig,
  hls?: SingleKernelConfig,
  mp4?: SingleKernelConfig,
} | SingleKernelConfig[];

export type UserConfig = {
  autoload?: boolean,
  autoplay?: boolean,
  box?: string,
  container?: VesselConfig,
  controls?: boolean,
  crossorigin?: string,
  defaultMuted?: boolean,
  defaultPlaybackRate?: number,
  disableRemotePlayback?: boolean,
  height?: number,
  isLive?: boolean,
  kernels?: UserKernelsConfig,
  loop?: boolean,
  muted?: boolean,
  noDefaultContextMenu?: string | boolean,
  playbackRate?: number,
  playsinline?: boolean,
  plugin?: Array<string | PluginOption>,
  plugins?: Array<string | PluginOption>,
  poster?: string,
  preload?: string,
  preset?: {
    flv?: IVideoKernelConstructor,
    hls?: IVideoKernelConstructor,
  },
  runtimeOrder?: string[],
  src?: string,
  videoRequiredGuardedAttributes?: string[],
  width?: number,
  wrapper: string | Element,
  x5VideoOrientation?: string,
  x5VideoPlayerFullScreen?: boolean,
  xWebkitAirplay?: boolean,
};

export type RawEventInfo = {
  fn: (...args: any[]) => any,
  id: string,
  name: string,
  stage?: EventStage;
  target?: BinderTarget | void;
};

export type AdditionalEventInfo = {
  name: string,
  stage: EventStage,
  target: BinderTarget,
};

export type WholeEventInfo = {
  fn: (...args: any[]) => any,
  id: string,
  name: string,
  stage: EventStage,
  target: BinderTarget,
};
