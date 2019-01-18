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
    Object.keys(this.log).forEach((key: 'debug' | 'error' | 'info' | 'verbose' | 'warn') => { this.log[key] = !val; });
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
      .reduce((props, key: 'debug' | 'error' | 'info' | 'verbose' | 'warn') => {
        const switchKey = ('ENABLE_' + key.toUpperCase() as 'ENABLE_DEBUG' | 'ENABLE_ERROR' | 'ENABLE_INFO' | 'ENABLE_VERBOSE' | 'ENABLE_WARN');
        props[key] = accessor({
          get() {
            return chimeeLog[switchKey];
          },
          set(val: boolean) {
            chimeeLog[switchKey] = val;
            if (val === true) { this.silent = false; }
            return val;
          },
        });
        return props;
      }, ({} as {
        debug: boolean,
        error: boolean,
        info: boolean,
        verbose: boolean
        warn: boolean,
      }));
    applyDecorators(this.log, props, { self: true });
  }
}
