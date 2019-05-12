export declare type ChimeeDomElement = 'container' | 'wrapper' | 'video';
export declare const chimeeDomElements: string[];
export declare function isChimeeDomElement(element: string): element is ChimeeDomElement;
export declare type RealChimeeDomElement = 'container' | 'wrapper' | 'videoElement';
export declare const realChimeeDomElements: string[];
export declare function isRealChimeeDomElement(element: string): element is RealChimeeDomElement;
export declare function turnChimeeDomElementIntoRealChimeeDomElement(element: ChimeeDomElement): RealChimeeDomElement;
