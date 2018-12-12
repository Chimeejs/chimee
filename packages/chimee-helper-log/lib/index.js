
/**
 * chimee-helper-log v0.2.0
 * (c) 2017-2018 toxic-johann
 * Released under MIT
 * Built ad Wed Dec 12 2018 23:39:16 GMT+0800 (China Standard Time)
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var toxicPredicateFunctions = require('toxic-predicate-functions');

var ChimeeHelperLog = function () {
  function ChimeeHelperLog() {
    this.GLOBAL_TAG = "chimee";
    this.FORCE_GLOBAL_TAG = false;
    this.ENABLE_ERROR = true;
    this.ENABLE_INFO = true;
    this.ENABLE_WARN = true;
    this.ENABLE_DEBUG = true;
    this.ENABLE_VERBOSE = true;
  }

  ChimeeHelperLog.prototype.error = function (tag, msg) {
    if (!this.ENABLE_ERROR) {
      return;
    }

    (console.error || console.warn || console.log).call(console, this.formatter(tag, msg));
  };

  ChimeeHelperLog.prototype.info = function (tag, msg) {
    if (!this.ENABLE_INFO) {
      return;
    }

    (console.info || console.log).call(console, this.formatter(tag, msg));
  };

  ChimeeHelperLog.prototype.warn = function (tag, msg) {
    if (!this.ENABLE_WARN) {
      return;
    }

    (console.warn || console.log).call(console, this.formatter(tag, msg));
  };

  ChimeeHelperLog.prototype.debug = function (tag, msg) {
    if (!this.ENABLE_DEBUG) {
      return;
    }

    (console.debug || console.log).call(console, this.formatter(tag, msg));
  };

  ChimeeHelperLog.prototype.verbose = function (tag, msg) {
    if (!this.ENABLE_VERBOSE) {
      return;
    }

    console.log(this.formatter(tag, msg));
  };

  ChimeeHelperLog.prototype.formatter = function (tag, msg) {
    if (!toxicPredicateFunctions.isString(tag)) {
      throw new TypeError("Log's method only acccept string as argument, but not " + tag + " in " + _typeof(tag));
    }

    if (!toxicPredicateFunctions.isString(msg)) {
      return "[" + this.GLOBAL_TAG + "] > " + tag;
    }

    tag = this.FORCE_GLOBAL_TAG ? this.GLOBAL_TAG : tag || this.GLOBAL_TAG;
    return "[" + tag + "] > " + msg;
  };

  return ChimeeHelperLog;
}();

var chimeeLog = new ChimeeHelperLog();

if (toxicPredicateFunctions.inBrowser && !window._chimee_log) {
  window._chimee_log = chimeeLog;
}

var index = toxicPredicateFunctions.inBrowser ? window._chimee_log : chimeeLog;

module.exports = index;
