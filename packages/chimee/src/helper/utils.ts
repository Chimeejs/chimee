import { isEmpty, isFunction } from 'lodash';
import { SupportedKernelType } from 'typings/base';
/**
 * delete the property if the value of the property is empty
 * @param  {any} obj
 * @param  {string} key
 */
export function deletePropertyIfItIsEmpty(obj: any, key: string) {
  if (!obj) {
    return;
  }
  if (isEmpty(obj[key])) {
    delete obj[key];
  }
}
/**
 * run a queue one by one.If include function reject or return false it will stop
 * @param  {Array} queue the queue which we want to run one by one
 * @return {Promise}    tell us whether a queue run finished
 */
export function runRejectableQueue(queue: Array<(...args: any[]) => any>, ...args: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    function step(index: number) {
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

/**
 * run a queue one by one.If include function return false it will stop
 * @param  {Array} queue the queue which we want to run one by one
 * @return {boolean} tell the user if the queue run finished
 */
export function runStoppableQueue(queue: Array<(...args: any[]) => any>, ...args: any[]): boolean {
  function step(index: number): boolean {
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

/**
 * sort Object attributes by function
 * and transfer them into array
 * @param  {Object} obj Object form from numric
 * @param  {Function} fn sort function
 * @return {Array} the sorted attirbutes array
 */
export function transObjectAttrIntoArray(obj: { [x: string]: any }, fn: (a: string, b: string) => number = (a, b) => +a - +b): string[] {
  return Object.keys(obj)
  .sort(fn)
  .reduce((order, key) => {
    return order.concat(obj[key]);
  }, []);
}

export function isSupportedKernelType(type: string): type is SupportedKernelType {
  return type === 'flv' || type === 'hls' || type === 'mp4';
}
