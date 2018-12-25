export const domMethods = [
  'focus',
  'fullscreen',
  'requestFullscreen',
  'exitFullscreen',
];

export type IDomMethod = 'focus' | 'fullscreen' | 'requestFullscreen' | 'exitFullscreen';

export function isDomMethod(x: string): x is IDomMethod {
  return domMethods.includes(x);
}

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

export type IDomEvent = 'beforeinput'
  | 'blur'
  | 'click'
  | 'compositionend'
  | 'compositionstart'
  | 'compositionupdate'
  | 'dblclick'
  | 'focus'
  | 'focusin'
  | 'focusout'
  | 'input'
  | 'keydown'
  | 'keypress'
  | 'keyup'
  | 'mousedown'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
  | 'resize'
  | 'scroll'
  | 'select'
  | 'wheel'
  | 'mousewheel'
  | 'contextmenu'
  | 'touchstart'
  | 'touchmove'
  | 'touchend'
  | 'fullscreen';

export function isDomEvent(x: string): x is IDomEvent {
  return domEvents.includes(x);
}

export const esFullscreenEvents = [
  'fullscreenchange',
];

export const kernelMethods = [
  'play',
  'pause',
  'seek',
  'startLoad',
  'stopLoad',
];
export type IKernelMethod = 'play' | 'pause' | 'seek' | 'startLoad' | 'stopLoad';

export function isKernelMethod(x: string): x is IKernelMethod {
  return kernelMethods.includes(x);
}

export const dispatcherEventMethodMap = {
  enterpictureinpicture: 'requestPictureInPicture',
  leavepictureinpicture: 'exitPictureInPicture',
  load: 'load',
};

export type IDispatcherEventMethod = 'enterpictureinpicture' | 'leavepictureinpicture' | 'load';

export function isDispatcherEventMethod(x: string): x is IDispatcherEventMethod {
  return Object.keys(dispatcherEventMethodMap).includes(x);
}

export const mustListenVideoDomEvents = [
  'mouseenter',
  'mouseleave',
];

export type IMustListenVideoDomEvent = 'mouseenter'| 'mouseleave';

export function isMustListenVideoDomEvent(x: string): x is IMustListenVideoDomEvent {
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

export const videoMethods = [
  'canPlayType',
  'captureStream',
  'setSinkId',
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

export type IVideoEvent = 'abort'
  | 'canplay'
  | 'canplaythrough'
  | 'durationchange'
  | 'emptied'
  | 'encrypted'
  | 'ended'
  | 'error'
  | 'interruptbegin'
  | 'interruptend'
  | 'loadeddata'
  | 'loadedmetadata'
  | 'loadstart'
  | 'mozaudioavailable'
  | 'pause'
  | 'play'
  | 'playing'
  | 'progress'
  | 'ratechange'
  | 'seeked'
  | 'seeking'
  | 'stalled'
  | 'suspend'
  | 'timeupdate'
  | 'volumechange'
  | 'waiting'
  | 'enterpictureinpicture'
  | 'leavepictureinpicture';

export function isVideoEvent(x: string): x is IVideoEvent {
  return videoEvents.includes(x);
}

export const videoReadOnlyProperties = [
  'buffered',
  'currentSrc',
  'duration',
  'error',
  'ended',
  'networkState',
  'paused',
  'readyState',
  'seekable',
  'sinkId',
  'controlsList',
  'tabIndex',
  'dataset',
  'offsetHeight',
  'offsetLeft',
  'offsetParent',
  'offsetTop',
  'offsetWidth',
];
