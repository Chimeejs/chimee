import {deepAssign, isObject, addClassName, removeClassName, $} from 'chimee-helper';
import {autobind} from 'toxic-decorators';
import Base from './base.js';

/**
 * Screen 配置
 */

const defaultOption = {
  tag: 'chimee-screen',
  html: `
    <chimee-screen-full>
      <svg viewBox="0 0 67 66" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="screen-small" transform="translate(33.756308, 32.621867) rotate(45.000000) translate(-33.756308, -32.621867) translate(18.756308, -10.378133)" fill="#FFFFFF">
                  <polygon id="Path" transform="translate(14.967695, 66.389245) rotate(180.000000) translate(-14.967695, -66.389245) " points="11.5190786 46.9431778 11.7210093 70.7913773 0.565180527 70.7913773 15.4674455 85.8353125 29.3702096 70.7913773 18.5573247 70.7702156 18.5573247 46.9431778"></polygon>
                  <polygon id="Path" points="11.5190786 0.274130278 11.7210093 24.1223298 0.565180527 24.1223298 15.4674455 39.1662649 29.3702096 24.1223298 18.5573247 24.1011681 18.5573247 0.274130278"></polygon>
              </g>
          </g>
      </svg>
    </chimee-screen-full>
    <chimee-screen-small>
      <svg viewBox="0 0 61 62" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group" transform="translate(30.756308, 30.621867) rotate(45.000000) translate(-30.756308, -30.621867) translate(15.756308, -12.378133)" fill="#FFFFFF">
                <polygon id="Path" points="11.5190786 46.9431778 11.7210093 70.7913773 0.565180527 70.7913773 15.4674455 85.8353125 29.3702096 70.7913773 18.5573247 70.7702156 18.5573247 46.9431778"></polygon>
                <polygon id="Path" transform="translate(14.967695, 19.720198) rotate(180.000000) translate(-14.967695, -19.720198) " points="11.5190786 0.274130278 11.7210093 24.1223298 0.565180527 24.1223298 15.4674455 39.1662649 29.3702096 24.1223298 18.5573247 24.1011681 18.5573247 0.274130278"></polygon>
            </g>
        </g>
      </svg>
    </chimee-screen-small>
  `,
  defaultEvent: {
    click: 'click'
  }
};

export default class Screen extends Base {
  constructor (parent, option) {
    super(parent);
    this.state = 'small';
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  init () {
    super.create();
    this.$dom = $(this.$dom);
    this.changeState(this.state);
    // addClassName(this.$dom, 'flex-item');
    this.$dom.addClass('chimee-flex-component');

    this.$full = this.$dom.find('chimee-screen-full');
    this.$small = this.$dom.find('chimee-screen-small');
    // 判断是否是默认或者用户提供 icon
    if(this.option.icon && this.option.icon.full && this.option.icon.small) {
      // if((!this.option.icon.play && this.option.icon.puase) || (this.option.icon.play && !this.option.icon.puase)) {
      //   console.warn(`Please provide a play and pause icon！If you can't, we will use default icon!`);
      // }
      this.$full.html(this.option.icon.full);
      this.$small.html(this.option.icon.small);
    }else if(this.option.bitmap) {
      this.$full.html('');
      this.$small.html('');
    }
  }

  changeState (state) {
    const removeState = state === 'small' ? 'full' : 'small';
    addClassName(this.parent.$dom, state);
    removeClassName(this.parent.$dom, removeState);
  }

  click () {
    let full = false;
    if(this.state === 'small') {
      this.state = 'full';
      full = true;
    }else{
      this.state = 'small';
      full = false;
    }
    this.changeState(this.state);
    this.parent.$fullscreen(full, 'container');
    if(full) {
      this.watch_screen = this.parent.$watch('isFullscreen', this.screenChange);
    }else{
      this.watch_screen();
    }
  }
  @autobind
  screenChange () {
    if(!this.parent.fullscreenElement) return;
    this.state = 'small';
    this.changeState('small');
    this.parent.$fullscreen(false, 'container');
  }
}
