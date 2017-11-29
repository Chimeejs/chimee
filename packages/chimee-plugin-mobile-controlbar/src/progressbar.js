import {deepAssign, isObject, $} from 'chimee-helper';
import {autobind} from 'toxic-decorators';
import Base from './base.js';
import {addDelegate, removeDelegate} from './event.js';

const defaultOption = {
  tag: 'chimee-progressbar',
  html: `
    <chimee-progressbar-bg class="chimee-progressbar-line"></chimee-progressbar-bg>
    <chimee-progressbar-buffer class="chimee-progressbar-line"></chimee-progressbar-buffer>
    <chimee-progressbar-all class="chimee-progressbar-line">
      <chimee-progressbar-ball></chimee-progressbar-ball>
    </chimee-progressbar-all>
  `
};

export default class ProgressBar extends Base {
  constructor (parent, option) {
    super(parent);
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.visiable = option !== false;
    this.init();
  }

  init () {
    super.create();
    this.$dom = $(this.$dom);
    this.$buffer = this.$dom.find('chimee-progressbar-buffer');
    this.$all = this.$dom.find('chimee-progressbar-all');
    this.$ball = this.$dom.find('chimee-progressbar-ball');
    this.$dom.addClass('chimee-flex-component');

    // css 配置
    !this.visiable && this.$dom.css('visibility', 'hidden');
    this.addEvent();
  }
  destroy () {
    this.removeEvent();
    // 解绑全屏监听事件
    this.watch_screen && this.watch_screen();
    super.destroy();
  }
  addEvent () {
    addDelegate(this.parent, 'chimee-progressbar', 'tap', this.tap);
    addDelegate(this.parent, 'chimee-progressbar', 'panstart', this.mousedown);
  }
  removeEvent () {
    removeDelegate(this.parent, 'chimee-progressbar', 'tap', this.tap);
    removeDelegate(this.parent, 'chimee-progressbar', 'panstart', this.mousedown);
  }

  /**
   * 缓存进度条更新 progress 事件
   */
  progress () {
    let buffer = 0;
    try{
      buffer = this.parent.buffered.end(0);
    }catch (e) {}
    const bufferWidth = buffer / this.parent.duration * 100 + '%';
    this.$buffer.css('width', bufferWidth);
  }

  /**
   * requestAnimationFrame 来更新进度条, timeupdate 事件
   */
  update () {
    const time = this._currentTime !== undefined ? this._currentTime : this.parent.currentTime;
    const timePer = time ? time / this.parent.duration : 0;
    this.$all.css('width', timePer * 100 + '%');
  }

  @autobind
  tap (e) {
    this._currentTime = (e.clientX - this.$dom[0].offsetLeft) / this.$dom[0].offsetWidth * this.parent.duration;
    this.update();
    this.parent.currentTime = this._currentTime;
  }

  @autobind
  mousedown (e) {

    this._currentTime = (e.clientX - this.$dom[0].offsetLeft) / this.$dom[0].offsetWidth * this.parent.duration;
    this.startX = e.clientX;
    this.startTime = this._currentTime;
    addDelegate(this.parent, this.option.tag, 'panmove', this.draging);
    addDelegate(this.parent, this.option.tag, 'panend', this.dragEnd);
  }

  /**
   * 开始拖拽
   * @param {EventObject} e 鼠标事件
   */
  @autobind
  draging (e) {
    this.endX = e.clientX;
    const dragTime = (this.endX - this.startX) / this.$dom[0].offsetWidth * this.parent.duration;
    const dragAfterTime = +(this.startTime + dragTime).toFixed(2);
    this._currentTime = dragAfterTime < 0 ? 0 : dragAfterTime > this.parent.duration ? this.parent.duration : dragAfterTime;
    this.update();
  }

  /**
   * 结束拖拽
   */
  @autobind
  dragEnd () {
    this.startX = 0;
    this.startTime = 0;
    this.parent.currentTime = this._currentTime;
    this._currentTime = undefined;
    removeDelegate(this.parent, this.option.tag, 'panmove', this.draging);
    removeDelegate(this.parent, this.option.tag, 'panend', this.dragEnd);
  }
}
