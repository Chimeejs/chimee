import { isNumber, isString } from 'lodash';
export default class Vessel {
    constructor(dispatcher, target, config) {
        this.dispatcher = dispatcher;
        this.target = target;
        ['width', 'height', 'position', 'display'].forEach((key) => {
            Object.defineProperty(this, key, {
                get() {
                    return this.dispatcher.dom.getStyle(this.target, key);
                },
                set(value) {
                    if (isNumber(value)) {
                        value = value + 'px';
                    }
                    if (!isString(value)) {
                        throw new Error(`The value of ${key} in ${this.target}Config must be string, but not ${typeof value}.`);
                    }
                    this.dispatcher.dom.setStyle(this.target, key, value);
                },
                configurable: true,
                enumerable: true,
            });
        });
        Object.assign(this, config);
    }
}
//# sourceMappingURL=vessel.js.map