import { CustEvent } from 'chimee-helper';
declare module 'toxic-decorators' {
  declare module.exports: any;
}

declare module 'core-js/es7/global' {
  declare module.exports: any;
}

declare module 'es-fullscreen' {
  declare module.exports: {
    _fullscreenElement: HTMLElement | null;
    _openKey: string;
    _exitKey: string;
    _savedStyles: Object;
    _bodyOverflow: string;
    _htmlOverflow: string;
    isFullScreen: boolean;
    isNativelySupport: boolean;
    fullscreenElement: Element | null;
    isFullScreen: boolean;
    open (element: Element, option?: {force: boolean}): boolean;
    requestFullscreen (element: Element, option?: {force: boolean}): boolean;
    exit (): boolean;
    exitFullscreen (): boolean;
    on (name: string, fn: Function, element?: Element | Document): void;
    addEventListener (name: string, fn: Function, element?: Element | Document): void;
    off (name: string, fn: Function, element?: Element | Document): void;
    removeEventListener (name: string, fn: Function, element?: Element | Document): void;
    _dispatchEvent (element: Element): void;
  }
}
