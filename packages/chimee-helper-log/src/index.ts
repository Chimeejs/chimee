/* tslint:disable: no-console */
import { inBrowser, isString } from "toxic-predicate-functions";

/**
 * Log Object
 */
class ChimeeHelperLog {
  /**
   * @member {string}
   */
  public GLOBAL_TAG = "chimee";
  /**
   * @member {boolean}
   */
  public FORCE_GLOBAL_TAG = false;
  /**
   * @member {boolean}
   */
  public ENABLE_ERROR = true;
  /**
   * @member {boolean}
   */
  public ENABLE_INFO = true;
  /**
   * @member {boolean}
   */
  public ENABLE_WARN = true;
  /**
   * @member {boolean}
   */
  public ENABLE_DEBUG = true;
  /**
   * @member {boolean}
   */
  public ENABLE_VERBOSE = true;
  /**
   * equal to console.error, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log
   * @param {string} msg the message
   */
  public error(tag: string, msg?: string) {
    if (!this.ENABLE_ERROR) {
      return;
    }

    (console.error || console.warn || console.log).call(console, this.formatter(tag, msg));
  }
  /**
   * equal to console.info, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log
   * @param {string} msg the message
   */
  public info(tag: string, msg?: string) {
    if (!this.ENABLE_INFO) {
      return;
    }
    (console.info || console.log).call(console, this.formatter(tag, msg));
  }
  /**
   * equal to console.warn, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log
   * @param {string} msg the message
   */
  public warn(tag: string, msg?: string) {
    if (!this.ENABLE_WARN) {
      return;
    }
    (console.warn || console.log).call(console, this.formatter(tag, msg));
  }
  /**
   * equal to console.debug, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log
   * @param {string} msg the message
   */
  public debug(tag: string, msg?: string) {
    if (!this.ENABLE_DEBUG) {
      return;
    }
    (console.debug || console.log).call(console, this.formatter(tag, msg));
  }
  /**
   * equal to console.verbose, output `[${tag}] > {$msg}`
   * @param {string} tag optional, the header of log
   * @param {string} msg the message
   */
  public verbose(tag: string, msg?: string) {
    if (!this.ENABLE_VERBOSE) {
      return;
    }
    console.log(this.formatter(tag, msg));
  }

  public formatter(tag: string, msg?: string): string {
    if (!isString(tag)) {
      throw new TypeError(`Log's method only acccept string as argument, but not ${tag} in ${typeof tag}`);
    }
    if (!isString(msg)) {
      return `[${this.GLOBAL_TAG}] > ${tag}`;
    }
    tag = this.FORCE_GLOBAL_TAG
      ? this.GLOBAL_TAG
      : (tag || this.GLOBAL_TAG);
    return `[${tag}] > ${msg}`;
  }
}

const chimeeLog = new ChimeeHelperLog();

if (inBrowser && !(window as any)._chimee_log) {
  (window as any)._chimee_log = chimeeLog;
}

export default (inBrowser ? (window as any)._chimee_log : chimeeLog);
