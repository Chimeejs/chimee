export const domMethods = [
    'focus',
    'fullscreen',
    'requestFullscreen',
    'exitFullscreen',
];
export function isDomMethod(x) {
    return domMethods.includes(x);
}
export const kernelMethods = [
    'play',
    'pause',
    'seek',
    'startLoad',
    'stopLoad',
];
export function isKernelMethod(x) {
    return kernelMethods.includes(x);
}
export const videoMethods = [
    'canPlayType',
    'captureStream',
    'setSinkId',
];
//# sourceMappingURL=method.js.map