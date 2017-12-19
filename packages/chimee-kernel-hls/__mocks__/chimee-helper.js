import * as helper from 'chimee-helper';
class Log {
  static data = {
    warn: [],
    error: [],
  };
  static warn(tag, msg) {
    if (msg === undefined) {
      msg = tag;
      tag = 'chimee-kernel';
    }
    expect(typeof tag).toBe('string');
    expect(typeof msg).toBe('string');
    this.data.warn.push([ tag, msg ]);
  }
  static error(tag, msg) {
    if (msg === undefined) {
      msg = tag;
      tag = 'chimee-kernel';
    }
    expect(typeof tag).toBe('string');
    expect(typeof msg).toBe('string');
    this.data.error.push([ tag, msg ]);
  }

  static verbose() {
    return true;
  }
}
helper.Log = Log;
module.exports = helper;
