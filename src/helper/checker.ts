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
