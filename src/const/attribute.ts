export const videoDomAttributes: IVideoDomAttribute[] = [
  'src',
  'controls',
  'width',
  'height',
  'crossOrigin',
  'loop',
  'muted',
  'preload',
  'poster',
  'autoplay',
  'playsInline',
  'x5VideoPlayerFullscreen',
  'x5VideoOrientation',
  'xWebkitAirplay',
  'playbackRate',
  'defaultPlaybackRate',
  'autoload',
  'disableRemotePlayback',
  'defaultMuted',
  'volume',
  'x5VideoPlayerType',
];

export type IVideoDomAttribute = 'src'
  | 'controls'
  | 'width'
  | 'height'
  | 'crossOrigin'
  | 'loop'
  | 'muted'
  | 'preload'
  | 'poster'
  | 'autoplay'
  | 'playsInline'
  | 'x5VideoPlayerFullscreen'
  | 'x5VideoOrientation'
  | 'xWebkitAirplay'
  | 'playbackRate'
  | 'defaultPlaybackRate'
  | 'autoload'
  | 'disableRemotePlayback'
  | 'defaultMuted'
  | 'volume'
  | 'x5VideoPlayerType';

export function isVideoDomAttribute(attr: string): attr is IVideoDomAttribute {
  return videoDomAttributes.includes(attr as IVideoDomAttribute);
}
