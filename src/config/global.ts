// @flow
import { chimeeLog } from 'chimee-helper-log';
import esFullscreen from 'es-fullscreen';
import { accessor, applyDecorators, nonenumerable } from 'toxic-decorators';
export default class GlobalConfig {

  get silent(): boolean {
    return this.silentValue;
  }

  set silent(val: boolean) {
    val = !!val;
    this.silentValue = val;
    Object.keys(this.log).forEach((key) => { this.log[key] = !val; });
  }

  get useStyleFullscreen(): boolean {
    return esFullscreen.useStyleFirst;
  }

  set useStyleFullscreen(val: boolean) {
    esFullscreen.useStyleFirst = !!val;
  }

  public errorHandler: (...args: any[]) => any | void = undefined;

  public log: {
    debug: boolean,
    error: boolean,
    info: boolean,
    verbose: boolean
    warn: boolean,
  } = {
    debug: true,
    error: true,
    info: true,
    verbose: true,
    warn: true,
  };

  @nonenumerable
  public silentValue: boolean = false;

  constructor() {
    const props = Object.keys(this.log)
      .reduce((props, key) => {
        props[key] = accessor({
          get() {
            return chimeeLog['ENABLE_' + key.toUpperCase()];
          },
          set(val) {
            chimeeLog['ENABLE_' + key.toUpperCase()] = val;
            if (val === true) { this.silent = false; }
            return val;
          },
        });
        return props;
      }, {});
    applyDecorators(this.log, props, { self: true });
  }
}
