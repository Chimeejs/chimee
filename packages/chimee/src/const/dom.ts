export type ChimeeDomElement = 'container' | 'wrapper' | 'video';

export const chimeeDomElements = [ 'container', 'wrapper', 'video' ];

export function isChimeeDomElement(element: string): element is ChimeeDomElement {
  return chimeeDomElements.includes(element);
}

export type RealChimeeDomElement = 'container' | 'wrapper' | 'videoElement';

export const realChimeeDomElements = [ 'container', 'wrapper', 'videoElement' ];

export function isRealChimeeDomElement(element: string): element is RealChimeeDomElement {
  return realChimeeDomElements.includes(element);
}

export function turnChimeeDomElementIntoRealChimeeDomElement(element: ChimeeDomElement): RealChimeeDomElement {
  if (element === 'video') {
    return 'videoElement';
  }
  return element;
}
