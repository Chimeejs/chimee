export const domEvents = [
    'beforeinput',
    'blur',
    'click',
    'compositionend',
    'compositionstart',
    'compositionupdate',
    'dblclick',
    'focus',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keypress',
    'keyup',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'resize',
    'scroll',
    'select',
    'wheel',
    'mousewheel',
    'contextmenu',
    'touchstart',
    'touchmove',
    'touchend',
    'fullscreen',
];
export function isDomEvent(x) {
    return domEvents.includes(x);
}
export const esFullscreenEvents = [
    'fullscreenchange',
];
export const dispatcherEventMethodMap = {
    enterpictureinpicture: 'requestPictureInPicture',
    leavepictureinpicture: 'exitPictureInPicture',
    load: 'load',
};
export function isDispatcherEventMethod(x) {
    return Object.keys(dispatcherEventMethodMap).includes(x);
}
export const mustListenVideoDomEvents = [
    'mouseenter',
    'mouseleave',
];
export function isMustListenVideoDomEvent(x) {
    return mustListenVideoDomEvents.includes(x);
}
export const kernelEvents = [
    'mediaInfo',
    'heartbeat',
    'error',
];
export const passiveEvents = [
    'wheel',
    'mousewheel',
    'touchstart',
    'touchmove',
];
export const selfProcessorEvents = [
    'silentLoad',
    'fullscreen',
];
export const videoEvents = [
    'abort',
    'canplay',
    'canplaythrough',
    'durationchange',
    'emptied',
    'encrypted',
    'ended',
    'error',
    'interruptbegin',
    'interruptend',
    'loadeddata',
    'loadedmetadata',
    'loadstart',
    'mozaudioavailable',
    'pause',
    'play',
    'playing',
    'progress',
    'ratechange',
    'seeked',
    'seeking',
    'stalled',
    'suspend',
    'timeupdate',
    'volumechange',
    'waiting',
    'enterpictureinpicture',
    'leavepictureinpicture',
];
export function isVideoEvent(x) {
    return videoEvents.includes(x);
}
//# sourceMappingURL=event.js.map