import './control.css';
import {accessor, applyDecorators} from 'toxic-decorators';
import {isObject, deepAssign, setStyle} from 'chimee-helper';
import {createChild} from './createchild.js';

const majorColorStyle = `
  .chimee-flex-component svg *{
    fill: majorColor;
    stroke: majorColor;
  }
  chimee-progressbar-all{
    background: majorColor;
  }
  chimee-volume.chimee-flex-component chimee-volume-bar-all{
    background: majorColor;    
  }
  chimee-clarity-list li:hover,
  chimee-clarity-list li.active {
    color: majorColor;
  }
`;

const hoverColorStyle = `
  .chimee-flex-component svg:hover *{
    fill: hoverColor;
    stroke: hoverColor;
  }
`;

/**
 * 插件默认配置
 */

const defaultConfig = {
};

const chimeeControl = {
  name: 'chimeeControl',
  el: 'chimee-control',
  data: {
    children: {},
    show: false,
    disabled: true
  },
  level: 99,
  operable: false,
  penetrate: false,
  create () {},
  init (videoConfig) {
    if(videoConfig.controls) {
      this.show = true;
      videoConfig.controls = false;
    }
    const _this = this;
    applyDecorators(videoConfig, {
      controls: accessor({
        get () {
          return _this.show;
        },
        set (value) {
          _this.show = Boolean(value);
          _this._display();
          return false;
        }
      }, {preSet: true})
    }, {self: true});
    this.config = isObject(this.$config) ? deepAssign(defaultConfig, this.$config) : defaultConfig;
    this.$dom.innerHTML = '<chimee-control-wrap></chimee-control-wrap>';
    this.$wrap = this.$dom.querySelector('chimee-control-wrap');
    this.children = createChild(this);
    this._setStyle();
  },
  destroy () {
    window.clearTimeout(this.timeId);
  },
  inited () {
    for(const i in this.children) {
      this.children[i].inited && this.children[i].inited();
    }
  },
  events: {
    loadstart () {
      this._disable(true);
    },
    canplay () {
      this._disable(false);
    },
    play () {
      this.children.play && this.children.play.changeState('play');
      this._hideItself();
    },
    pause () {
      this.children.play && this.children.play.changeState('pause');
      this._showItself();
    },
    load () {
    },
    c_touchmove () {
      this._mousemove();
    },
    c_mousemove () {
      this._mousemove();
    },
    durationchange () {
      this.children.progressTime && this.children.progressTime.updateTotal();
    },
    timeupdate () {
      this._progressUpdate();
    },
    progress () {
      this.children.progressBar && this.children.progressBar.progress();
    },
    volumechange () {
      this.children.volume && this.children.volume.update();
    },
    keydown (e) {
      if(this.disabled) return;
      e.stopPropagation();
      switch (e.keyCode) {
        case 32: {
          e.preventDefault();
          this.children.play && this.children.play.click(e);
          break;
        }
        case 37: {
          e.preventDefault();
          const reduceTime = this.currentTime - 10;
          this.currentTime = reduceTime < 0 ? 0 : reduceTime;
          this._mousemove();
          break;
        }
        case 39: {
          e.preventDefault();
          const raiseTime = this.currentTime + 10;
          this.currentTime = raiseTime > this.duration ? this.duration : raiseTime;
          this._mousemove();
          break;
        }
        case 38: {
          e.preventDefault();
          const raiseVolume = this.volume + 0.1;
          this.volume = raiseVolume > 1 ? 1 : raiseVolume;
          this._mousemove();
          break;
        }
        case 40: {
          e.preventDefault();
          const reduceVolume = this.volume - 0.1;
          this.volume = reduceVolume < 0 ? 0 : reduceVolume;
          this._mousemove();
          break;
        }
      }
    },
    touchstart (e) {
      !this.disabled && this.children.play && this.children.play.click(e);
    },
    click (e) {
      const time = new Date();
      const preTime = this.clickTime;
      this.clickTime = time;
      if(time - preTime < 300) {
        clearTimeout(this.clickTimeId);
        return;
      }
      this.clickTimeId = setTimeout(() => {
        !this.disabled && this.children.play && this.children.play.click(e);
      }, 300);

    },
    dblclick (e) {
      // this.dblclick = true;
      !this.disabled && this.children.screen && this.children.screen.click();
    }
  },
  methods: {
    _progressUpdate () {
      this.children.progressBar && this.children.progressBar.update();
      this.children.progressTime && this.children.progressTime.updatePass();
    },
    _hideItself () {
      window.clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        let bottom = this.$wrap.offsetHeight;
        bottom = this.children.progressBar ? this.children.progressBar.$wrap[0].offsetTop - bottom : -bottom;
        setStyle(this.$wrap, {
          bottom: bottom + 'px'
        });
        setStyle(this.$dom, {
          visibility: 'hidden'
        });
      }, 2000);
    },
    _showItself () {
      window.clearTimeout(this.timeId);
      setStyle(this.$wrap, {
        bottom: '0'
      });
      setStyle(this.$dom, {
        visibility: 'visible'
      });
    },
    _display () {
      const display = this.show ? 'block' : 'none';
      setStyle(this.$dom, {
        display
      });
    },
    _mousemove (e) {
      if(this.paused) return;
      this._showItself();
      this._hideItself();
    },
    // controlbar 不可以点
    // 键盘／鼠标事件不监听
    _disable (disabled) {
      if(!this.show) return;
      this.disabled = disabled;
      setStyle(this.$wrap, 'pointerEvents', disabled ? 'none' : 'auto');
    },
    _setStyle () {
      let css = '';
      css += this.config.majorColor ? majorColorStyle.replace(/majorColor/g, this.config.majorColor) : '';
      css += this.config.hoverColor ? hoverColorStyle.replace(/hoverColor/g, this.config.hoverColor) : '';
      const style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = css;
      document.head.appendChild(style);
    }
  }
};

export default chimeeControl;

