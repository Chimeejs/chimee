import { isNumber, isString } from 'lodash';
import Dispatcher from '../dispatcher/index';
import { VesselConfig } from '../typings/base';

// base css controller for container and wrapper
export default class Vessel {
  public dispatcher: Dispatcher;
  public height: string | number;
  public target: string;
  public width: string | number;
  constructor(dispatcher: Dispatcher, target: string, config: VesselConfig) {
    this.dispatcher = dispatcher;
    this.target = target;
    [ 'width', 'height', 'position', 'display' ].forEach((key) => {
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
