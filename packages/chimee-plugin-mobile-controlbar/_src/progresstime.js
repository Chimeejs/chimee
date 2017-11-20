import {deepAssign, isObject, formatTime, $} from 'chimee-helper';
import Base from './base.js';

/**
 * progressTime 配置
 */

const defaultOption = {
  tag: 'chimee-progresstime',
  html: `
    <chimee-progresstime-pass>00:00</chimee-progresstime-pass
    ><chimee-progresstime-total
      ><span>/</span
      ><chimee-progresstime-total-value>00:00</chimee-progresstime-total-value>
    </chimee-progresstime-total>
  `
};

export default class ProgressTime extends Base {
  constructor (parent, option) {
    super(parent);
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  init () {
    super.create();
    this.$dom = $(this.$dom);
    this.$total = this.$dom.find('chimee-progresstime-total-value');
    this.$pass = this.$dom.find('chimee-progresstime-pass');
    this.$dom.addClass('chimee-flex-component');
  }

  updatePass () {
    this.$pass.text(formatTime(this.parent.currentTime));
  }

  updateTotal () {
    this.$total.text(formatTime(this.parent.duration));
  }
}
