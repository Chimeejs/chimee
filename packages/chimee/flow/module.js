declare module 'toxic-decorators' {
  declare module.exports: any;
}
declare module 'chimee-kernel' {
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

declare module 'chimee-helper' {
  declare export function genTraversalHandler (fn: Function): Function;
  declare export function deepClone<T: Object | Array<any>> (source: T): T;
  declare export function deepAssign<T: any> (...args: Array<T>): T & T;
  declare export function camelize (str: string, isBig: ?boolean): string;
  declare export function hypenate (str: string): string;
  declare export function bind (fn: Function, context: any): Function;
  declare export function getDeepProperty (obj: any, keys: string | Array<string>, option?: {throwError?: boolean, backup?: any}): any;

  declare export function defined (val: any): boolean %checks(typeof val !== 'undefined');
  declare export function isVoid (val: void | null): true;
  declare export function isVoid (val: any): false;
  declare export function isArray (val: any): boolean %checks(Array.isArray(val));
  declare export function isFunction (val: any): boolean %checks(typeof val === 'function');
  declare export function isObject (val: any): boolean %checks(typeof val === 'object');
  declare export function isNumber (val: any): boolean %checks(typeof val === 'number');
  declare export function isNumeric (val: any): boolean %checks(typeof val === 'number');
  declare export function isInteger (val: any): boolean %checks(typeof val === 'number');
  declare export function isEmpty (val: void | null | false | {||}): true;
  declare export function isEmpty (val: any): false;
  declare export function isEvent (val: any): boolean %checks(val instanceof Event);
  declare export function isBlob (val: any): boolean %checks(val instanceof Blob);
  declare export function isFile (val: Blob): boolean;
  declare export function isFile (val: any): false;
  declare export function isDate (val: any): boolean %checks(val instanceof Date);
  declare export function isString (val: any): boolean %checks(typeof val === 'string');
  declare export function isBoolean (val: any): boolean %checks(typeof val === 'boolean');
  declare export function isPromise (val: Promise<*>): true;
  declare export function isPromise (val: any): false;
  declare export function isPrimitive (val: void | number | string | boolean): false;
  declare export function isPrimitive (val: any): false;
  declare export function isUrl (val: string): boolean;
  declare export function isNode (val: any): boolean %checks(val instanceof Node);
  declare export function isElement (val: any): boolean %checks(val instanceof HTMLElement);
  declare export function isChildNode (parent: Node, child: Node): boolean;
  declare export function isPosterityNode (parent: Node, child: Node): boolean;
  declare export function isHTMLString (val: string): boolean;
  declare export function isError (val: any): boolean %checks(val instanceof Error);

  declare export function makeArray (obj: any): Array<any>;
  declare export function transObjectAttrIntoArray (obj: Object, fn?: Function): Array<string>;
  declare export function runRejectableQueue (queue: Array<any>, ...args: any): Promise<*>;
  declare export function runStoppableQueue (queue: Array<any>, ...args: any): boolean;
  declare export function setFrozenAttr (obj: Object, key: string, value: any): void;
  declare export function setAttrGetterAndSetter (obj: Object, key: string, option: {get?: Function, set?: Function}, prefix: string): void;
  declare export function decodeUTF8 (uint8array: any): string;
  declare export function debounce (func: Function, wait: number, immediate: boolean): Function;
  declare export function throttle (func: Function, wait: number, options: any, cxt: any): Function;
  declare export function strRepeat (num: any, bit: number): string;
  declare export function formatTime (time: number): string;
  declare export function addTransMethod (obj: Object): Function;
  declare export function appendCSS (cssText: string): HTMLElement;
  declare export function formatDate (date: Date, pattern: string): string;
  declare export function getLocalStorage (key: string): string | null | void;
  declare export function setLocalStorage (key: string, val: string): void;

  declare export function getAttr (el: Node, attrName: string): string | null;
  declare export function setAttr (el: Node, attrName: string, attrVa: any): void;
  declare export function addClassName (el: Node, cls: string): void;
  declare export function removeClassName (el: Node, cls: string): void;
  declare export function hasClassName (el: Node, cls: string): boolean;
  declare export function removeEvent (el: Node, type: string, handler: Function, once?: boolean, capture?: boolean): void;
  declare export function addEvent (el: Node, type: string, handler: Function, once?: boolean, capture?: boolean): void;
  declare export function addDelegate (el: Node, selector: string, type: string, handler: Function, capture: boolean): void; 
  declare export function removeDelegate (el: Node, selector: string, type: string, handler: Function, capture: boolean): void;
  declare export function getStyle (el: Node, key: string): string;
  declare export function setStyle (el: Node, key: string | Object, val?: string | number): void;
  declare export function query (selector: string, container?: Node, toArray: boolean): Array<Node>;
  declare export function removeEl (el: Node): void;
  declare export function findParents (el: Node, endEl?: Node, haveEl: boolean, haveEndEl: boolean): Array<Node>;

  declare export class NodeWrap {
    each (...args: Array<Function>): NodeWrap;
    push (...args: Array<Node>): NodeWrap;
    splice (start: number, count: number): NodeWrap;
    find (selector: string): NodeWrap;
    append (childEls: Node): NodeWrap;
    appendTo (childEls: Node): NodeWrap;
    text (val: string): NodeWrap;
    html (html: string): NodeWrap;
    attr  (name: string, val: string | number | boolean): NodeWrap;
    data (key: string, val?: string | number | boolean | void): NodeWrap;
    css (key: string, val?: string): NodeWrap;
    addClass (cls: string): NodeWrap;
    removeClass (cls: string): NodeWrap;
    hasClass (cls: string): NodeWrap;
    on (type: string, handler: Function, once?: boolean, capture?: boolean): NodeWrap;
    off (type: string, handler: Function, once?: boolean, capture?: boolean): NodeWrap;
    delegate (selector: string, type: string, handler: Function, capture: boolean): NodeWrap;
    undelegate (selector: string, type: string, handler: Function, capture: boolean): NodeWrap;
    remove (): NodeWrap;
  }
  declare export function $ (selector: string | Node, container?: Node): NodeWrap;

  declare export class Log {
    static GLOBAL_TAG: string;
    static FORCE_GLOBAL_TAG: boolean;
    static ENABLE_ERROR: boolean;
    static ENABLE_INFO: boolean;
    static ENABLE_WARN: boolean;
    static ENABLE_DEBUG: boolean;
    static ENABLE_VERBOSE: boolean;
    static error (tag: string, msg?: string): void;
    static warn (tag: string, msg?: string): void;
    static info (tag: string, msg?: string): void;
    static debug (tag: string, msg?: string): void;
    static verbose (tag: string, msg?: string): void;
  }

  
  declare export class UAParser {
    getBrowser (): Object;
    getDevice (): Object;
    getEngine (): Object;
    getOS (): Object;
    getCPU (): Object;
    getResult (): Object;
    getUA (): Object;
    setUA (): Object;
  }

}