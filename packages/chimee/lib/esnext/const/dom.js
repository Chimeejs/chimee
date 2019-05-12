export const chimeeDomElements = ['container', 'wrapper', 'video'];
export function isChimeeDomElement(element) {
    return chimeeDomElements.includes(element);
}
export const realChimeeDomElements = ['container', 'wrapper', 'videoElement'];
export function isRealChimeeDomElement(element) {
    return realChimeeDomElements.includes(element);
}
export function turnChimeeDomElementIntoRealChimeeDomElement(element) {
    if (element === 'video') {
        return 'videoElement';
    }
    return element;
}
//# sourceMappingURL=dom.js.map