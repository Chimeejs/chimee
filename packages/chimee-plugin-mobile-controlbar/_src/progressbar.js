import {deepAssign, isObject, formatTime, $, addEvent, removeEvent, setStyle} from 'chimee-helper';
import {autobind} from 'toxic-decorators';
import Base from './base.js';

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
    this.$wrap.on('mousedown', this.mousedown);
    this.$wrap.on('mousemove', this.tipShow);
    this.$wrap.on('mouseleave', this.tipEnd);
  }
  removeWrapEvent () {
    this.$wrap.off('mousedown', this.mousedown);
    this.$wrap.off('mousemove', this.tipShow);
    this.$wrap.off('mouseleave', this.tipEnd);
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
  mousedown (e) {
    // const ballRect = this.$ball[0].getClientRects()[0];
    // const ballLeft = ballRect.left;
    // const ballRight = ballRect.left + ballRect.width;
    // this.inBall = e.clientX <= ballRight && e.clientX >= ballLeft;
    if(e.target === this.$tip[0]) return;
    this._currentTime = e.offsetX / this.$wrap[0].offsetWidth * this.parent.duration;
    // if(!this.inBall) this.update();
    this.startX = e.clientX;
    this.startTime = this._currentTime;
    addEvent(window, 'mousemove', this.draging);
    addEvent(window, 'mouseup', this.dragEnd);
    addEvent(window, 'contextmenu', this.dragEnd);
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
    removeEvent(window, 'mousemove', this.draging);
    removeEvent(window, 'mouseup', this.dragEnd);
    removeEvent(window, 'contextmenu', this.dragEnd);
  }

  @autobind
  tipShow (e) {
    if(e.target === this.$tip[0] || e.target === this.$ball[0]) {
      this.$tip.css('display', 'none');
      return;
    };
    let time = e.offsetX / this.$wrap[0].offsetWidth * this.parent.duration;
    time = time < 0 ? 0 : time > this.parent.duration ? this.parent.duration : time;
    const tipContent = formatTime(time);
    let left = e.offsetX - this.$tip[0].offsetWidth / 2;
    const leftBound = this.$wrap[0].offsetWidth - this.$tip[0].offsetWidth;
    left = left < 0 ? 0 : left > leftBound ? leftBound : left;
    this.$tip.text(tipContent);
    this.$tip.css('display', 'inline-block');
    this.$tip.css('left', `${left}px`);
  }
  @autobind
  tipEnd () {
    this.$tip.css('display', 'none');
  }
}
