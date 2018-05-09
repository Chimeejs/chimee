
/**
 * chimee-plugin-mobile-state v0.0.17
 * (c) 2017 yandeqiang
 * Released under ISC
 */

'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _Array$from = _interopDefault(require('babel-runtime/core-js/array/from'));
var chimeeHelper = require('chimee-helper');
var gestureFactory = _interopDefault(require('chimee-plugin-gesture'));

__$styleInject("video::-webkit-media-controls-start-playback-button{display:none}chimee-state svg{width:100%;height:100%}@-webkit-keyframes a{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes a{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}chimee-state{position:absolute;top:0;left:0;width:100%;height:100%;font-size:24px}chimee-state-error,chimee-state-loading,chimee-state-pause,chimee-state-play{display:none;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}chimee-state-pause,chimee-state-play{width:2em;height:2em;-webkit-box-sizing:content-box;box-sizing:content-box;-webkit-box-sizing:initial;box-sizing:initial}chimee-state-loading{width:2em;height:2em;-webkit-transform:none;transform:none;margin:-1em;-webkit-animation:.9s a linear infinite;animation:.9s a linear infinite}chimee-state-error{display:none;font-size:16px;z-index:1;color:#ffcf00;text-shadow:0 0 3px red;font-weight:100}chimee-state.error chimee-state-error,chimee-state.loading chimee-state-loading,chimee-state.play chimee-state-play{display:inline-block}", undefined);

var playStr = "\n<svg width=\"92px\" height=\"92px\" viewBox=\"0 0 92 92\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <circle id=\"Oval\" fill-opacity=\"0.5\" fill=\"#000000\" cx=\"46\" cy=\"46\" r=\"46\"></circle>\n        <polygon id=\"Triangle\" fill=\"#FFFFFF\" transform=\"translate(51.000000, 46.500000) rotate(90.000000) translate(-51.000000, -46.500000) \" points=\"51 26 76 67 26 67\"></polygon>\n    </g>\n</svg>";

var loadingStr = "<svg width='120px' height='120px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-1s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.9166666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.75s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.25s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.08333333333333333s' repeatCount='indefinite'/></rect></svg>";

var getElementPath = function getElementPath(elem) {
  var path = [];
  if (elem === null) return path;
  path.push(elem);
  while (elem.parentNode !== null) {
    elem = elem.parentNode;
    path.push(elem);
  }
  return path;
};

var defaultConfig = {
  errorTips: '加载失败，请刷新重试',
  icon: {
    loading: loadingStr,
    play: playStr
  },
  expectTime: 3e4 // 超过最长加载时间则报错
};

var chimeeState = gestureFactory({
  name: 'chimeeState',
  el: '\n    <chimee-state class="play">\n      <chimee-state-loading></chimee-state-loading>\n      <chimee-state-play></chimee-state-play>\n      <chimee-state-error></chimee-state-error>\n    </chimee-state>\n  ',
  init: function init() {
    this.config = chimeeHelper.isObject(this.$config) ? chimeeHelper.deepAssign(defaultConfig, this.$config) : defaultConfig;
    this._addInnerHtml();
  },
  inited: function inited() {
    // 存在 src 并且 设置了 prelaod || autoplay 的情况下， 显示 loading
    this.src && (this.preload === 'auto' || this.preload === 'metadata' || this.preload === '' || this.autoplay === true) && this.showState('loading', true);
  },

  penetrate: true,
  operable: true,
  destroy: function destroy() {
    this.clearTimeout();
  },

  events: {
    pause: function pause() {
      this.showState('play', true);
    },
    play: function play() {
      this.showState('play', false);
    },
    loadedmetadata: function loadedmetadata() {
      this.playing();
      this.showState('play', true);
    },
    playing: function playing() {
      this.playing();
    },

    // loadstart () {
    //   this.waiting();
    // },
    waiting: function waiting() {
      this.waiting();
    },

    // 卡顿(FLV|HLS加载异常待内部特供事件)
    // stalled () {
    //   this.showLoading();
    // },
    timeupdate: function timeupdate() {
      this.clearTimeout();
    },
    panstart: function panstart(evt) {
      this.emit('state-panstart', evt);
    },
    panmove: function panmove(evt) {
      this.emit('state-panmove', evt);
    },
    panend: function panend(evt) {
      this.emit('state-panend', evt);
    },
    tap: function tap(evt) {
      this.emit('state-tap', evt);
    },
    d_tap: function d_tap(evt) {
      var path = _Array$from(evt.path || []) || getElementPath(evt.target);
      if (path.indexOf(this.$dom.querySelector('chimee-state-play')) !== -1) {
        this.play();
      }
    }
  },
  methods: {
    playing: function playing() {
      this.clearTimeout();
      this.showState('loading', false);
      this.showState('error', false);
    },
    waiting: function waiting() {
      var _this = this;

      this.clearTimeout();
      // 加载超过30秒则超时显示异常
      this._timeout = setTimeout(function () {
        return _this.showState('error', true);
      }, this.config.expectTime);
      !this.paused && this.showState('loading', true);
    },
    clearTimeout: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      if (this._timeout) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }
    }),
    showState: function showState(state, show) {
      show && this.emit('state-change', state);
      this.$dom.className = show ? state : '';
    },
    _addInnerHtml: function _addInnerHtml() {
      var dom = chimeeHelper.$(this.$dom);
      dom.find('chimee-state-loading').html(this.config.icon.loading);
      dom.find('chimee-state-play').html(this.config.icon.play);
      dom.find('chimee-state-error').html(this.config.errorTips);
    }
  }
});

module.exports = chimeeState;
