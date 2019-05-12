import { isFunction, isString } from 'lodash';
export function eventBinderCheck(key, fn) {
    if (!isString(key)) {
        throw new TypeError('key parameter must be String');
    }
    if (!isFunction(fn)) {
        throw new TypeError('fn parameter must be Function');
    }
}
//# sourceMappingURL=checker.js.map