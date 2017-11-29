import {deepAssign, isObject, formatTime, $} from 'chimee-helper';
import Base from './base.js';

/**
 * totalTime 配置
 */

const defaultOption = {
  tag: 'chimee-total-time',
  html: `
    00:00
  `
};

export default class TotalTime extends Base {
  constructor (parent, option) {
    super(parent);
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  init () {
    super.create();
    this.$dom = $(this.$dom);
    this.$dom.addClass('chimee-flex-component');
  }

  updateTotal () {
    this.$dom.text(formatTime(this.parent.duration));
  }
}
