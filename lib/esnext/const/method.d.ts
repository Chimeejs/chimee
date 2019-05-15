export declare const domMethods: string[];
export declare type IDomMethod = 'focus' | 'fullscreen' | 'requestFullscreen' | 'exitFullscreen';
export declare function isDomMethod(x: string): x is IDomMethod;
export declare const kernelMethods: string[];
export declare type IKernelMethod = 'play' | 'pause' | 'seek' | 'startLoad' | 'stopLoad';
export declare function isKernelMethod(x: string): x is IKernelMethod;
export declare const videoMethods: string[];
