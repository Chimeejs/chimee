import {deepAssign, isObject, addClassName, removeClassName, $} from 'chimee-helper';
import Base from './base.js';

/**
 * play 配置
 */

const defaultOption = {
  tag: 'chimee-control-state',
  html: `
    <chimee-control-state-play></chimee-control-state-play>
    <chimee-control-state-pause></chimee-control-state-pause>
  `,
  animate: {
    icon: `
      <svg viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g fill="#ffffff" stroke="#ffffff">
          <path class="left"></path>
          <path class="right"></path>
        </g>
      </svg>
    `,
    path: {
      play: {
        left: 'M0.921875,0.265625L0.921875,197.074852L95.7890625,149L96.2929688,49Z',
        right: 'M90.3142151,45.9315226L90.3142151,151.774115L201.600944,99.9938782L201.600944,98.0237571Z'
      },
      pause: {
        left: 'M0.921875,1.265625L0.921875,198.074852L79.3611677,198.074852L79.3611677,0.258923126Z',
        right: 'M126.921875,1.265625L126.921875,198.074852L205.361168,198.074852L205.361168,0.258923126Z'
      }
    }
  },
  defaultEvent: {
    tap: 'tap'
  }
};

export default class Play extends Base {
  constructor (parent, option) {
    super(parent);
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.animate = false;
    this.init();
  }

  init () {
    // 创建 html ／ 绑定事件
    super.create();
    this.$dom = $(this.$dom);
    this.$dom.addClass('chimee-flex-component');

    // 判断是否是默认或者用户提供 icon
    if(this.option.icon && this.option.icon.play && this.option.icon.pause) {
      this.$play = this.$dom.find('chimee-control-state-play');
      this.$pause = this.$dom.find('chimee-control-state-pause');
      this.$play.html(this.option.icon.play);
      this.$pause.html(this.option.icon.pause);
    }else if(!this.option.bitmap) {
      this.animate = true;
      this.option.animate.path = this.option.path ? this.option.path : this.option.animate.path;
      this.$dom.html(this.option.animate.icon);
      this.$left = this.$dom.find('.left');
      this.$right = this.$dom.find('.right');
    }
    this.changeState('pause');
  }

  changeState (state) {
    const nextState = state === 'play' ? 'pause' : 'play';
    this.state = state;
    addClassName(this.parent.$dom, nextState);
    removeClassName(this.parent.$dom, state);
    this.animate && this.setPath(nextState);
  }

  setPath (state) {
    const path = this.option.animate.path;
    if(state === 'play') {
      this.$left.attr('d', path.play.left);
      this.$right.attr('d', path.play.right);
    }else{
      this.$left.attr('d', path.pause.left);
      this.$right.attr('d', path.pause.right);
    }
  }

  tap (e) {
    const nextState = this.state === 'play' ? 'pause' : 'play';
    this.changeState(nextState);
    this.parent.$emit(nextState);
  }
}
