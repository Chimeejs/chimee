export const videoDomAttributes = [
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
export function isVideoDomAttribute(attr) {
    return videoDomAttributes.includes(attr);
}
//# sourceMappingURL=attribute.js.map