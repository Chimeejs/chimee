import { RealChimeeDomElement } from '../const/dom';
import Dispatcher from '../dispatcher/index';
import { VesselConfig } from '../typings/base';
export default class Vessel {
    dispatcher: Dispatcher;
    height: string | number;
    target: RealChimeeDomElement;
    width: string | number;
    constructor(dispatcher: Dispatcher, target: RealChimeeDomElement, config: VesselConfig);
}
