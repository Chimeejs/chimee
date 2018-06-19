// @flow
import { isNumber, isString } from 'lodash';
import Dispatcher from '../dispatcher/index';
// base css controller for container and wrapper
export default class Vessel {
  __dispatcher: Dispatcher;
  __target: string;
  width: string | number;
  height: string | number;
  constructor(dispatcher: Dispatcher, target: string, config: VesselConfig) {
    this.__dispatcher = dispatcher;
    this.__target = target;
    [ 'width', 'height', 'position', 'display' ].forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this.__dispatcher.dom.getStyle(this.__target, key);
        },
        set(value) {
          if (isNumber(value)) {
            value = value + 'px';
          }
          if (!isString(value)) {
            throw new Error(`The value of ${key} in ${this.__target}Config must be string, but not ${typeof value}.`);
          }
          this.__dispatcher.dom.setStyle(this.__target, key, value);
          // return value;
        },
        configurable: true,
        enumerable: true,
      });
    });
    // deepAssign(this, config);
    Object.assign(this, config);
  }
}
