import { isFunction } from 'lodash';
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
