import { isFunction, isString } from 'lodash';
/**
 * checker for on, off, once function
 * @param {string} key
 * @param {Function} fn
 */
export function eventBinderCheck(key: string, fn: (...args: any[]) => any): void {
  if (!isString(key)) { throw new TypeError('key parameter must be String'); }
  if (!isFunction(fn)) { throw new TypeError('fn parameter must be Function'); }
}
/**
 * checker for attr or css function
 */
export function attrAndStyleCheck(...args: Array<string | number | boolean>): Array<string | number
| boolean> {
  if (args.length > 2) {
    return [ 'set', ...args ];
  }
  if (args.length === 2) {
    if ([ 'video', 'container', 'wrapper', 'videoElement' ].indexOf(args[0] as string) > -1) {
      return [ 'get', ...args ];
    }
    return [ 'set', 'container', ...args ];
  }
  return [ 'get', 'container', ...args ];
}
