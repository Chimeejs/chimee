// @flow
import { Log } from 'chimee-helper';
import { accessor, applyDecorators, nonenumerable } from 'toxic-decorators';
export default class GlobalConfig {
  log: {
    error: boolean,
    info: boolean,
    warn: boolean,
    debug: boolean,
    verbose: boolean
  };
  errorHandler: Function | void;
  silent: boolean;
  _silent: boolean;
  log = {
    error: true,
    info: true,
    warn: true,
    debug: true,
    verbose: true,
  }
  @nonenumerable
  _silent = false;
  get silent(): boolean {
    return this._silent;
  }
  set silent(val: boolean) {
    val = !!val;
    this._silent = val;
    Object.keys(this.log).forEach(key => { this.log[key] = !val; });
  }
  errorHandler = undefined;
  constructor() {
    const props = Object.keys(this.log)
      .reduce((props, key) => {
        props[key] = accessor({
          get() {
            // $FlowFixMe: we have check the keys
            return Log['ENABLE_' + key.toUpperCase()];
          },
          set(val) {
            // $FlowFixMe: we have check the keys
            Log['ENABLE_' + key.toUpperCase()] = val;
            if (val === true) this.silent = false;
            return val;
          },
        });
        return props;
      }, {});
    applyDecorators(this.log, props, { self: true });
  }
}
