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

export const videoMethods = [
  'canPlayType',
  'captureStream',
  'setSinkId',
];
