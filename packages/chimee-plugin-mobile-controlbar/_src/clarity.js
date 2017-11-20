import {deepAssign, isObject, addClassName, removeClassName, setStyle, $} from 'chimee-helper';
import Base from './base.js';

/**
 * play 配置
 */

const defaultOption = {
  tag: 'chimee-clarity',
  width: '2em',
  html: `
    <chimee-clarity-text></chimee-clarity-text>
    <chimee-clarity-list>
      <ul></ul>
      <div class="chimee-clarity-list-arrow">
        <svg viewBox="0 0 115 6"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Group-3-Copy" fill="#57B0F6">
            <polygon id="Path-2" points="0.0205224145 0.0374249581 0.0205224145 2.12677903 53.9230712 2.12677903 57.1127727 5.3468462 60.2283558 2.12677903 113.820935 2.12677903 113.820935 0.0374249581"></polygon>
          </g>
        </svg>
      </div>
    </chimee-clarity-list>
  `,
  defaultEvent: {
    click: 'click'
  }
};

export default class Clarity extends Base {
  constructor (parent, option) {
    super(parent);
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  init () {
    super.create();
    addClassName(this.$dom, 'chimee-flex-component');

    this.$text = $(this.$dom).find('chimee-clarity-text');
    this.$list = $(this.$dom).find('chimee-clarity-list');
    this.$listUl = this.$list.find('ul');

    // 用户自定义配置
    this.option.width && setStyle(this.$dom, 'width', this.option.width);

    this.initTextList();
  }

  initTextList () {
    this.option.list.forEach(item => {
      const li = $(document.createElement('li'));
      li.attr('data-url', item.src);
      li.text(item.name);
      if(item.src === this.parent.$videoConfig.src) {
        this.$text.text(item.name);
        li.addClass('active');
      }
      this.$listUl.append(li);
    });
  }

  click (e) {
    const elem = e.target;
    if(elem.tagName === 'LI') {
      Array.from(elem.parentElement.children).map(item => {
        removeClassName(item, 'active');
      });
      const url = elem.getAttribute('data-url') || '';
      addClassName(e.target, 'active');
      this.$text.text(e.target.textContent);
      this.switchClarity(url);
    }
  }

  switchClarity (url) {
    if (this.loadOption) {
      this.loadOption.abort = true;
    }
    this.loadOption = {
      abort: false,
      repeatTimes: 3,
      increment: 1,
      immediate: true
    };
    this.parent.$silentLoad(url, this.loadOption).then(() => {
      this.loadOption = undefined;
    }).catch((e) => {

    });
  }

}
