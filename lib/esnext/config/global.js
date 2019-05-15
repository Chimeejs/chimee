var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { chimeeLog } from 'chimee-helper-log';
import { esFullscreen } from 'es-fullscreen';
import { accessor, applyDecorators, nonenumerable as nonenumerableDecorator } from 'toxic-decorators';
const nonenumerable = nonenumerableDecorator;
export default class GlobalConfig {
    constructor() {
        this.errorHandler = undefined;
        this.log = {
            debug: true,
            error: true,
            info: true,
            verbose: true,
            warn: true,
        };
        this.silentValue = false;
        const props = Object.keys(this.log)
            .reduce((props, key) => {
            const switchKey = 'ENABLE_' + key.toUpperCase();
            props[key] = accessor({
                get() {
                    return chimeeLog[switchKey];
                },
                set(val) {
                    chimeeLog[switchKey] = val;
                    if (val === true) {
                        this.silent = false;
                    }
                    return val;
                },
            });
            return props;
        }, {});
        applyDecorators(this.log, props, { self: true });
    }
    get silent() {
        return this.silentValue;
    }
    set silent(val) {
        val = !!val;
        this.silentValue = val;
        Object.keys(this.log).forEach((key) => { this.log[key] = !val; });
    }
    get useStyleFullscreen() {
        return esFullscreen.useStyleFirst;
    }
    set useStyleFullscreen(val) {
        esFullscreen.useStyleFirst = !!val;
    }
}
__decorate([
    nonenumerable
], GlobalConfig.prototype, "silentValue", void 0);
//# sourceMappingURL=global.js.map