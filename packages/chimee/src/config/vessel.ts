import { isNumber, isString } from 'lodash-es';
import { RealChimeeDomElement } from '../const/dom';
import Dispatcher from '../dispatcher/index';
import { VesselConfig } from '../typings/base';

// base css controller for container and wrapper
export default class Vessel {
  public dispatcher: Dispatcher;
  public height: string | number;
  public target: RealChimeeDomElement;
  public width: string | number;
  constructor(dispatcher: Dispatcher, target: RealChimeeDomElement, config: VesselConfig) {
    this.dispatcher = dispatcher;
    this.target = target;
    [ 'width', 'height', 'position', 'display' ].forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return (this as Vessel).dispatcher.dom.getStyle((this as Vessel).target, key);
        },
        set(value) {
          if (isNumber(value)) {
            value = value + 'px';
          }
          if (!isString(value)) {
            throw new Error(`The value of ${key} in ${(this as Vessel).target}Config must be string, but not ${typeof value}.`);
          }
          (this as Vessel).dispatcher.dom.setStyle((this as Vessel).target, key, value);
        },
        configurable: true,
        enumerable: true,
      });
    });
    // deepAssign(this, config);
    Object.assign(this, config);
  }
}
