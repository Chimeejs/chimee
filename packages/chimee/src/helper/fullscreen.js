// @flow
import {defined, isElement, isPosterityNode, isObject, isString} from 'chimee-helper';
const VENDOR_PREFIXES = ['', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent'];
const SYNONYMS = [
  ['', ''], // empty
  ['exit', 'cancel'], // firefox & old webkits expect cancelFullScreen instead of exitFullscreen
  ['screen', 'Screen'] // firefox expects FullScreen instead of Fullscreen
];

function native (target: HTMLElement | string | Object | null, name?: string | Object, option?: {keyOnly?: boolean} = {}) {
  if(isObject(name)) {
    option = name;
  }
  if(isString(target)) {
    name = target;
  }
  if(!isElement(target)) {
    target = document;
  }
  if(!isString(name)) throw new Error(`You must pass in a string as name, but not ${typeof name}`);
  const {keyOnly = false} = option || {};
  for(let i = 0; i < SYNONYMS.length; i++) {
    name = name.replace(SYNONYMS[i][0], SYNONYMS[i][1]);
    for(let j = 0; j < VENDOR_PREFIXES.length; j++) {
      const prefixed = j === 0
        ? name
        : (VENDOR_PREFIXES[j] + name.charAt(0).toUpperCase() + name.substr(1));
      // $FlowFixMe: we support document computed property here
      if(target[prefixed] !== undefined) return keyOnly ? prefixed : target[prefixed];
    }
  }
  return keyOnly ? '' : undefined;
}

const fullscreenEnabled = native('fullscreenEnabled');
class FullScreen {
  _fullscreenElement: Element | null;
  _openKey: string;
  _exitKey: string;
  isFullScreen: boolean;
  isNativelySupport: boolean;

  _fullscreenElement = null;
  isNativelySupport = defined(native('fullscreenElement')) &&
    (!defined(fullscreenEnabled) || fullscreenEnabled === true);
  _openKey = native(document.body, 'requestFullscreen', {keyOnly: true});
  _exitKey = native('exitFullscreen', {keyOnly: true});

  get fullscreenElement (): Element | null {
    const element = [
      'fullscreenElement',
      'webkitFullscreenElement',
      'mozFullScreenElement',
      'msFullscreenElement'
    ].reduce((element, key) => {
      // $FlowFixMe: support computed element on document
      return element || document[key];
    }, null);
    return element || this._fullscreenElement;
  }

  get isFullScreen (): boolean {
    return isElement(this.fullscreenElement);
  }

  open (element: Element, {force = false}: {force: boolean} = {}) {
    if(!isElement(element)) throw new Error(`You should passed in a legal element to requestFullScreen, but not ${typeof element}.`);
    if(!isPosterityNode(document, element)) throw new Error('You must pass in a HTML element in document.');

    const originElement = this.fullscreenElement;
    if(originElement && originElement !== element) {
      if(!force) return false;
      this.exit();
    }

    if(this.isNativelySupport) {
      console.log(element, this._openKey);
      // $FlowFixMe: support computed key on HTMLElment here
      element[this._openKey]();
      return true;
    }
    return false;
  }

  exit () {
    if(!this.isFullScreen) return false;
    if(this.isNativelySupport) {
      // $FlowFixMe: support document computed key here
      document[this._exitKey]();
      return true;
    }
    return false;
  }
}

export default new FullScreen();
