class ChimeeHelperLog {
  constructor() {
    this.data = {
      warn: [],
      error: [],
    };
  }
  warn(tag, msg) {
    if (msg === undefined) {
      msg = tag;
      tag = 'chimee';
    }
    expect(typeof tag).toBe('string');
    expect(typeof msg).toBe('string');
    this.data.warn.push([ tag, msg ]);
  }
  error(tag, msg) {
    if (msg === undefined) {
      msg = tag;
      tag = 'chimee';
    }
    expect(typeof tag).toBe('string');
    expect(typeof msg).toBe('string');
    this.data.error.push([ tag, msg ]);
  }

  verbose() {
    return true;
  }
}

export const chimeeLog = new ChimeeHelperLog();
