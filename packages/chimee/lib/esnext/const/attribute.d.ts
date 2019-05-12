export declare const videoDomAttributes: IVideoDomAttribute[];
export declare type IVideoDomAttribute = 'src' | 'controls' | 'width' | 'height' | 'crossOrigin' | 'loop' | 'muted' | 'preload' | 'poster' | 'autoplay' | 'playsInline' | 'x5VideoPlayerFullscreen' | 'x5VideoOrientation' | 'xWebkitAirplay' | 'playbackRate' | 'defaultPlaybackRate' | 'autoload' | 'disableRemotePlayback' | 'defaultMuted' | 'volume' | 'x5VideoPlayerType';
export declare function isVideoDomAttribute(attr: string): attr is IVideoDomAttribute;
