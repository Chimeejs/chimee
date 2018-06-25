import './control.css';
import gestureFactory from 'chimee-plugin-gesture';
import {accessor, applyDecorators} from 'toxic-decorators';
import {isObject, deepAssign, setStyle, addEvent, removeEvent, UAParser} from 'chimee-helper';
import {createChild} from './createchild.js';
import {fireEvent} from './event';

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
  hideBarTime: 2000
};

const barStatus = {
  timer: null,
  show: true
};

const mobiControlbar = gestureFactory({
  name: 'chimeeMobiControlbar',
  el: 'chimee-control',
  data: {
    children: {},
    show: false
  },
  level: 99,
  operable: true,
  penetrate: false,
  create () {
    this.environment = new UAParser().getResult();
  },
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

    this.events = {};
    this.children = createChild(this);
    this._setStyle();

    // 增加 window / document 的全局监听
    this._addGlobalEvent();

    // 监听全屏事件

    this.watch_fullscreen = this.$watch('isFullscreen', this._mousemove);
  },
  destroy () {
    window.clearTimeout(barStatus.timer);
    barStatus.show = false;
    this._removeGlobalEvent();
    this.watch_fullscreen && this.watch_fullscreen();
  },
  inited () {
    for(const i in this.children) {
      this.children[i].inited && this.children[i].inited();
    }
  },
  events: {
    play () {
      this.children.play && this.children.play.changeState('play');
      this._hideItself();
    },
    pause () {
      this.children.play && this.children.play.changeState('pause');
      this._showItself();
    },
    load () {
      // update src 充值进度条/时间/播放状态
      // load 的时候不会触发 pause(), 手动将控制条显示出来
      this._showItself();
      this._progressUpdate();
      this.children.play && this.children.play.changeState('pause');
      this._progressUpdate();
    },
    durationchange () {
      this.children.totalTime && this.children.totalTime.updateTotal();
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
    tap (evt) {
      this._mousemove();
    },
    d_tap (evt) {
      !this.paused && this._mousemove();
      fireEvent(this, 'tap', evt.changedTouches[0]);
    },
    d_panstart (evt) {
      !this.paused && this._mousemove();
      fireEvent(this, 'panstart', evt.changedTouches[0]);
    },
    d_panmove (evt) {
      !this.paused && this._mousemove();
      fireEvent(this, 'panmove', evt.changedTouches[0]);
    },
    d_panend (evt) {
      !this.paused && this._mousemove();
      fireEvent(this, 'panend', evt.changedTouches[0]);
    }
  },
  methods: {
    _progressUpdate () {
      this.children.progressBar && this.children.progressBar.update();
      this.children.currentTime && this.children.currentTime.updateCurrent();
    },
    _hideItself () {
      window.clearTimeout(barStatus.timer);
      barStatus.timer = setTimeout(() => {
        const bottom = -this.$wrap.offsetHeight;
        setStyle(this.$wrap, {
          bottom: bottom + 'px'
        });
        setStyle(this.$dom, {
          visibility: 'hidden'
        });
        barStatus.show = false;
        this.$emit('barHide');
      }, this.config.hideBarTime);
    },
    _showItself () {
      window.clearTimeout(barStatus.timer);
      setStyle(this.$wrap, {
        bottom: '0'
      });
      setStyle(this.$dom, {
        visibility: 'visible'
      });
      !barStatus.show && this.$emit('barShow');
      barStatus.show = true;
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
    _setStyle () {
      let css = '';
      css += this.config.majorColor ? majorColorStyle.replace(/majorColor/g, this.config.majorColor) : '';
      css += this.config.hoverColor ? hoverColorStyle.replace(/hoverColor/g, this.config.hoverColor) : '';
      const style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = css;
      document.head.appendChild(style);
    },
    _weixinJSBridgeReady () {
      // console.log(this.environment.os === 'iOS', window.WeixinJSBridge)
      window.WeixinJSBridge && this.environment.os.name === 'iOS' && this.load();
    },
    // 增加一些全局事件监听
    _addGlobalEvent () {
      addEvent(window, 'orientationchange', this._mousemove);
      addEvent(document, 'WeixinJSBridgeReady', this._weixinJSBridgeReady);
    },
    // 去除一些全局事件监听
    _removeGlobalEvent () {
      removeEvent(window, 'orientationchange', this._mousemove);
      removeEvent(document, 'WeixinJSBridgeReady', this._weixinJSBridgeReady);
    },
  }
});

export default mobiControlbar;
