// @flow
import {isString} from 'toxic-predicate-functions';
function formatter (tag: string, msg?: string): string {
  if(!isString(tag)) throw new TypeError(`Log's method only acccept string as argument, but not ${tag} in ${typeof tag}`);
  if(!isString(msg)) return `[${Log.GLOBAL_TAG}] > ${tag}`;
  tag = Log.FORCE_GLOBAL_TAG
    ? Log.GLOBAL_TAG
    : (tag || Log.GLOBAL_TAG);
  return `[${tag}] > ${msg}`;
}
/**
 * Log Object
 */
class Log {
  static GLOBAL_TAG: string;
  static FORCE_GLOBAL_TAG: boolean;
  static ENABLE_ERROR: boolean;
  static ENABLE_INFO: boolean;
  static ENABLE_WARN: boolean;
  static ENABLE_DEBUG: boolean;
  static ENABLE_VERBOSE: boolean;
  /**
   * @member {string}
   */
  static GLOBAL_TAG = 'chimee';
  /**
   * @member {boolean}
   */
  static FORCE_GLOBAL_TAG = false;
  /**
   * @member {boolean}
   */
  static ENABLE_ERROR = true;
  /**
   * @member {boolean}
   */
  static ENABLE_INFO = true;
  /**
   * @member {boolean}
   */
  static ENABLE_WARN = true;
  /**
   * @member {boolean}
   */
  static ENABLE_DEBUG = true;
  /**
   * @member {boolean}
   */
  static ENABLE_VERBOSE = true;
  /**
   * equal to console.error, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log 
   * @param {string} msg the message
   */
  static error (tag: string, msg?: string) {
    if (!Log.ENABLE_ERROR) {
      return;
    }

    (console.error || console.warn || console.log).call(console, formatter(tag, msg));
  }
  /**
   * equal to console.info, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log 
   * @param {string} msg the message
   */
  static info (tag: string, msg?: string) {
    if (!Log.ENABLE_INFO) {
      return;
    }
    (console.info || console.log).call(console, formatter(tag, msg));
  }
  /**
   * equal to console.warn, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log 
   * @param {string} msg the message
   */
  static warn (tag: string, msg?: string) {
    if (!Log.ENABLE_WARN) {
      return;
    }
    (console.warn || console.log).call(console, formatter(tag, msg));
  }
  /**
   * equal to console.debug, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log 
   * @param {string} msg the message
   */
  static debug (tag: string, msg?: string) {
    if (!Log.ENABLE_DEBUG) {
      return;
    }
    (console.debug || console.log).call(console, formatter(tag, msg));
  }
  /**
   * equal to console.verbose, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log 
   * @param {string} msg the message
   */
  static verbose (tag: string, msg?: string) {
    if (!Log.ENABLE_VERBOSE) {
      return;
    }
    console.log(formatter(tag, msg));
  }
}

export default Log;
