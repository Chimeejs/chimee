import { isEmpty, isFunction } from 'lodash';
export function deletePropertyIfItIsEmpty(obj, key) {
    if (!obj) {
        return;
    }
    if (isEmpty(obj[key])) {
        delete obj[key];
    }
}
export function runRejectableQueue(queue, ...args) {
    return new Promise((resolve, reject) => {
        function step(index) {
            if (index >= queue.length) {
                resolve();
                return;
            }
            const result = isFunction(queue[index])
                ? queue[index](...args)
                : queue[index];
            if (result === false) {
                reject('stop');
                return;
            }
            Promise.resolve(result)
                .then(() => step(index + 1))
                .catch((err) => reject(err || 'stop'));
        }
        step(0);
    });
}
export function runStoppableQueue(queue, ...args) {
    function step(index) {
        if (index >= queue.length) {
            return true;
        }
        const result = isFunction(queue[index])
            ? queue[index](...args)
            : queue[index];
        if (result === false) {
            return false;
        }
        return step(++index);
    }
    return step(0);
}
export function transObjectAttrIntoArray(obj, fn = (a, b) => +a - +b) {
    return Object.keys(obj)
        .sort(fn)
        .reduce((order, key) => {
        return order.concat(obj[key]);
    }, []);
}
export function isSupportedKernelType(type) {
    return type === 'flv' || type === 'hls' || type === 'mp4';
}
//# sourceMappingURL=utils.js.map