
/**
 * chimee-helper-log v0.1.0
 * (c) 2017 songguangyu
 * Released under MIT
 */

import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';

var Log = function () {
  function Log() {
    _classCallCheck(this, Log);
  }

  _createClass(Log, null, [{
    key: 'error',
    value: function error(tag, msg) {
      if (!Log.ENABLE_ERROR) {
        return;
      }

      if (!tag || Log.FORCE_GLOBAL_TAG) {
        tag = Log.GLOBAL_TAG;
      }
      var str = '[' + tag + '] > ' + msg;

      if (console.error) {
        console.error(str);
      } else if (console.warn) {
        console.warn(str);
      } else {
        console.log(str);
      }
    }
  }, {
    key: 'info',
    value: function info(tag, msg) {
      if (!Log.ENABLE_INFO) {
        return;
      }

      if (!tag || Log.FORCE_GLOBAL_TAG) {
        tag = Log.GLOBAL_TAG;
      }

      var str = '[' + tag + '] > ' + msg;

      if (console.info) {
        console.info(str);
      } else {
        console.log(str);
      }
    }
  }, {
    key: 'warn',
    value: function warn(tag, msg) {
      if (!Log.ENABLE_WARN) {
        return;
      }

      if (!tag || Log.FORCE_GLOBAL_TAG) {
        tag = Log.GLOBAL_TAG;
      }

      var str = '[' + tag + '] > ' + msg;

      if (console.warn) {
        console.warn(str);
      } else {
        console.log(str);
      }
    }
  }, {
    key: 'debug',
    value: function debug(tag, msg) {
      if (!Log.ENABLE_DEBUG) {
        return;
      }

      if (!tag || Log.FORCE_GLOBAL_TAG) {
        tag = Log.GLOBAL_TAG;
      }

      var str = '[' + tag + '] > ' + msg;

      if (console.debug) {
        console.debug(str);
      } else {
        console.log(str);
      }
    }
  }, {
    key: 'verbose',
    value: function verbose(tag, msg) {
      if (!Log.ENABLE_VERBOSE) {
        return;
      }

      if (!tag || Log.FORCE_GLOBAL_TAG) {
        tag = Log.GLOBAL_TAG;
      }

      console.log('[' + tag + '] > ' + msg);
    }
  }]);

  return Log;
}();

Log.GLOBAL_TAG = 'chimee';
Log.FORCE_GLOBAL_TAG = false;
Log.ENABLE_ERROR = true;
Log.ENABLE_INFO = true;
Log.ENABLE_WARN = true;
Log.ENABLE_DEBUG = true;
Log.ENABLE_VERBOSE = true;

export default Log;
