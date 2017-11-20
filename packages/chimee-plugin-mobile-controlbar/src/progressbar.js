import {deepAssign, isObject, formatTime, $, removeEvent, setStyle} from 'chimee-helper';
import {autobind} from 'toxic-decorators';
import Base from './base.js';
import {addDelegate, removeDelegate} from './event.js';

const defaultOption = {
  tag: 'chimee-progressbar',
  html: `
    <chimee-progressbar-wrap>
      <chimee-progressbar-bg class="chimee-progressbar-line"></chimee-progressbar-bg>
      <chimee-progressbar-buffer class="chimee-progressbar-line"></chimee-progressbar-buffer>
      <chimee-progressbar-all class="chimee-progressbar-line">
        <chimee-progressbar-ball></chimee-progressbar-ball>
      </chimee-progressbar-all>
      <chimee-progressbar-tip></chimee-progressbar-tip>
    </chimee-progressbar-wrap>
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
    this.$wrap = this.$dom.find('chimee-progressbar-wrap');
    this.$buffer = this.$dom.find('chimee-progressbar-buffer');
    this.$all = this.$dom.find('chimee-progressbar-all');
    this.$tip = this.$dom.find('chimee-progressbar-tip');
    this.$track = this.$dom.find('chimee-progressbar-track');
    this.$line = this.$dom.find('.chimee-progressbar-line');
    this.$ball = this.$dom.find('chimee-progressbar-ball');
    this.$dom.addClass('chimee-flex-component');

    // css 配置
    !this.visiable && this.$dom.css('visibility', 'hidden');
     // this.$line.css({
    //   top: this.$wrap.
    // });
    // 进度条居中布局，还是在上方
    if(this.option.layout === 'top') {
      this.$dom.addClass('progressbar-layout-top');
      this.$wrap.css({
        // left: -this.$dom[0].offsetLeft + 'px',
        top: -this.$ball[0].offsetHeight + 'px',
        // height: this.$ball[0].offsetHeight * 2 + 'px'
      });
      // this.$line.css({
      //   top: this.$ball[0].offsetHeight + 'px'
      // })
      setStyle(this.parent.$wrap, 'paddingTop', this.$ball[0].offsetHeight + 'px');
  }
    this.addWrapEvent();
  }
  destroy () {
    this.removeWrapEvent();
    // 解绑全屏监听事件
    this.watch_screen && this.watch_screen();
    super.destroy();
  }
  addWrapEvent () {
    addDelegate(this.parent, 'chimee-progressbar-wrap', 'tap', this.tap);
    addDelegate(this.parent, 'chimee-progressbar-wrap', 'panstart', this.mousedown);
  }
  removeWrapEvent () {
    removeDelegate(this.parent, 'chimee-progressbar-wrap', 'tap', this.tap);
    removeDelegate(this.parent, 'chimee-progressbar-wrap', 'panstart', this.mousedown);
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
    // const allWidth = this.$wrap[0].offsetWidth - this.$ball[0].offsetWidth;
    const time = this._currentTime !== undefined ? this._currentTime : this.parent.currentTime;
    const timePer = time ? time / this.parent.duration : 0;
    // const timeWidth = timePer * allWidth;
    this.$all.css('width', timePer * 100 + '%');
  }

  @autobind
  tap (e) {

    this._currentTime = (e.clientX - this.$dom[0].offsetLeft) / this.$wrap[0].offsetWidth * this.parent.duration;
    this.update();
  }

  @autobind
  mousedown (e) {

    this._currentTime = (e.clientX - this.$dom[0].offsetLeft) / this.$wrap[0].offsetWidth * this.parent.duration;
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
    const dragTime = (this.endX - this.startX) / this.$wrap[0].offsetWidth * this.parent.duration;
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
    // if(!this.inBall) {
    this.parent.currentTime = this._currentTime;
    // this.inBall = false;
    // }
    this._currentTime = undefined;
    removeDelegate(this.parent, this.option.tag, 'panmove', this.draging);
    removeDelegate(this.parent, this.option.tag, 'panend', this.dragEnd);
  }
}
