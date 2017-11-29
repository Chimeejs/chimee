import {deepAssign, isObject, formatTime, $} from 'chimee-helper';
import Base from './base.js';

/**
 * currentTime 配置
 */

const defaultOption = {
  tag: 'chimee-current-time',
  html: `
    00:00
  `
};

export default class CurrentTime extends Base {
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

  updateCurrent () {
    this.$dom.text(formatTime(this.parent.currentTime));
  }
}
