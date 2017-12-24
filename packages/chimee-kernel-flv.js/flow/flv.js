declare interface FlvJs$MediaSegment {
  duration: number,
  filesize?: number,
  url: string
} 

declare interface FlvJs$MediaDataSource {
  type: string,
  isLive?: boolean,
  cors?: boolean,
  withCredentials?: boolean,
  hasAudio?: boolean,
  hasVideo?: boolean,
  duration?: number,
  filesize?: number,
  url?: string,
  segments?: Array<FlvJs$MediaSegment>
} 

declare interface FlvJs$Config {
  enableWorker?: boolean,
  enableStashBuffer?: boolean,
  stashInitialSize?: number,
  isLive?: boolean,
  lazyLoad?: boolean,
  lazyLoadMaxDuration?: number,
  lazyLoadRecoverDuration?: number,
  deferLoadAfterSourceOpen?: boolean,
  autoCleanupSourceBuffer?: boolean,
  autoCleanupMaxBackwardDuration?: number,
  autoCleanupMinBackwardDuration?: number,
  statisticsInfoReportInterval?: number,
  fixAudioTimestampGap?: boolean,
  accurateSeek?: boolean,
  seekType?: string,
  seekParamStart?: string,
  seekParamEnd?: string,
  rangeLoadZeroStart?: boolean,
  customSeekHandler?: any,
  reuseRedirectedURL?: boolean,
  referrerPolicy?: string
} 

declare interface FlvJs$FeatureList {
  mseFlvPlayback: boolean,
  mseLiveFlvPlayback: boolean,
  networkStreamIO: boolean,
  networkLoaderName: string,
  nativeMP4H264Playback: boolean,
  nativeWebmVP8Playback: boolean,
  nativeWebmVP9Playback: boolean
} 

declare interface FlvJs$PlayerConstructor {
  new (mediaDataSource: FlvJs$MediaDataSource, config?: FlvJs$Config): FlvJs$Player
} 

declare interface FlvJs$Player {
  constructor: FlvJs$PlayerConstructor,
  destroy(): void,
  on(event: string, listener: Function): void,
  off(event: string, listener: Function): void,
  attachMediaElement(mediaElement: HTMLMediaElement): void,
  detachMediaElement(): void,
  load(): void,
  unload(): void,
  play(): Promise<void>,
  pause(): void,
  type: string,
  buffered: TimeRanges,
  duration: number,
  volume: number,
  muted: boolean,
  currentTime: number,
  mediaInfo: Object,
  statisticsInfo: Object
} 

declare type FlvJs$FlvPlayer = {} & FlvJs$Player


declare type FlvJs$NativePlayer = {} & FlvJs$Player


declare interface FlvJs$LoggingControl {
  forceGlobalTag: boolean,
  globalTag: string,
  enableAll: boolean,
  enableDebug: boolean,
  enableVerbose: boolean,
  enableInfo: boolean,
  enableWarn: boolean,
  enableError: boolean,
  getConfig(): Object,
  applyConfig(config: Object): void,
  addLogListener(listener: Function): void,
  removeLogListener(listener: Function): void
} 

declare interface FlvJs$Events {
  ERROR: string,
  LOADING_COMPLETE: string,
  RECOVERED_EARLY_EOF: string,
  MEDIA_INFO: string,
  STATISTICS_INFO: string
} 

declare interface FlvJs$ErrorTypes {
  NETWORK_ERROR: string,
  MEDIA_ERROR: string,
  OTHER_ERROR: string
} 

declare interface FlvJs$ErrorDetails {
  NETWORK_EXCEPTION: string,
  NETWORK_STATUS_CODE_INVALID: string,
  NETWORK_TIMEOUT: string,
  NETWORK_UNRECOVERABLE_EARLY_EOF: string,
  MEDIA_MSE_ERROR: string,
  MEDIA_FORMAT_ERROR: string,
  MEDIA_FORMAT_UNSUPPORTED: string,
  MEDIA_CODEC_UNSUPPORTED: string
}

declare module 'flv.js' {
  declare export default {
    createPlayer(mediaDataSource: FlvJs$MediaDataSource, config?: FlvJs$Config): FlvJs$Player,
    isSupported(): boolean,
    getFeatureList(): FlvJs$FeatureList,
    Events: FlvJs$Events,
    ErrorTypes: FlvJs$ErrorTypes,
    ErrorDetails: FlvJs$ErrorDetails,
    FlvPlayer: FlvJs$PlayerConstructor,
    NativePlayer: FlvJs$PlayerConstructor,
    LoggingControl: FlvJs$LoggingControl
  }
}