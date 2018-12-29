import { IVideoKernelConstructor } from 'kernels/base';

export type EventStage = 'before' | 'main' | 'after' | '_';

export type BinderTarget = 'kernel' | 'container' | 'wrapper' | 'video' | 'video-dom' | 'plugin' | 'esFullscreen';

export type ChimeeDomElement = 'container' | 'wrapper' | 'video';
export type RealChimeeDomElement = 'container' | 'wrapper' | 'videoElement';

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
  name?: string,
};

export type UserKernelsConfig = string[] | {
  flv?: IVideoKernelConstructor,
  hls?: IVideoKernelConstructor,
  mp4?: IVideoKernelConstructor,
} | {
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
