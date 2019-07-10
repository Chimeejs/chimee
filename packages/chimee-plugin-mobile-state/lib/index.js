
/**
 * chimee-plugin-mobile-state v2.0.0-alpha.4
 * (c) 2017-2019 yandeqiang
 * Released under ISC
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var chimee = require('chimee');
var Gesture = _interopDefault(require('chimee-plugin-gesture'));
var _class = require('dom-helpers/class');
var query = require('dom-helpers/query');

var loadingStr = "<svg width='120px' height='120px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-1s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.9166666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.75s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.25s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.08333333333333333s' repeatCount='indefinite'/></rect></svg>";

var playStr = "\n<svg width=\"92px\" height=\"92px\" viewBox=\"0 0 92 92\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <circle id=\"Oval\" fill-opacity=\"0.5\" fill=\"#000000\" cx=\"46\" cy=\"46\" r=\"46\"></circle>\n        <polygon id=\"Triangle\" fill=\"#FFFFFF\" transform=\"translate(51.000000, 46.500000) rotate(90.000000) translate(-51.000000, -46.500000) \" points=\"51 26 76 67 26 67\"></polygon>\n    </g>\n</svg>";

var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var template = "\n<chimee-state class=\"play\">\n  <chimee-state-loading></chimee-state-loading>\n  <chimee-state-play></chimee-state-play>\n  <chimee-state-error></chimee-state-error>\n</chimee-state>\n";

var MobileState = function (_super) {
  __extends(MobileState, _super);

  function MobileState(config, dispatcher, option) {
    var _this = _super.call(this, Object.assign(config, {
      dependencies: option.customGesture ? [] : [Gesture.name],
      el: template,
      operable: false,
      penetrate: true
    }), dispatcher, option) || this;

    var _a = option.expectTime,
        expectTime = _a === void 0 ? 3e4 : _a,
        _b = option.errorTips,
        errorTips = _b === void 0 ? '加载失败，请刷新重试' : _b,
        _c = option.icon,
        icon = _c === void 0 ? {} : _c;
    _this.errorTips = errorTips;
    _this.expectTime = expectTime;
    _this.icon = Object.assign({
      loading: loadingStr,
      play: playStr
    }, icon);
    _this.currentState = '';
    _this.isShown = false;
    return _this;
  }

  MobileState.prototype.create = function () {
    this.on('load', this.onLoad);
    this.on('panend', this.onPanend);
    this.on('panmove', this.onPanmove);
    this.on('panstart', this.onPanstart);
    this.on('pause', this.onPause);
    this.on('play', this.onPlay);
    this.on('playing', this.onPlaying);
    this.on('seeked', this.onSeeked);
    this.on('seeking', this.onSeeking);
    this.on('tap', this.onTap);
    this.on('timeupdate', this.onTimeupdate);
    this.on('waiting', this.onWaiting);
  };

  MobileState.prototype.inited = function () {
    this.addInnerHtml();

    if (this.src && (this.preload === 'auto' || this.preload === 'metadata' || this.preload === '' || this.autoplay === true)) {
      this.showState('loading', true);
    }
  };

  MobileState.prototype.addInnerHtml = function () {
    var _this = this;

    ['play', 'loading', 'error'].forEach(function (key) {
      var containers = query.querySelectorAll(_this.$dom, "chimee-state-" + key);

      if (containers.length && containers[0]) {
        containers[0].innerHTML = key === 'error' ? _this.errorTips : _this.icon[key];
      }
    });
  };

  MobileState.prototype.clearTimeout = function () {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  };

  MobileState.prototype.onLoad = function () {
    this.showState('play', true);
  };

  MobileState.prototype.onPanend = function (evt) {
    this.emitSync('state-panend', evt);
  };

  MobileState.prototype.onPanmove = function (evt) {
    this.emitSync('state-panmove', evt);
  };

  MobileState.prototype.onPanstart = function (evt) {
    this.emitSync('state-panstart', evt);
  };

  MobileState.prototype.onPause = function () {
    this.showState('play', true);
  };

  MobileState.prototype.onPlay = function () {
    this.showState('', false);
  };

  MobileState.prototype.onPlaying = function () {
    this.playing();
  };

  MobileState.prototype.onSeeked = function () {
    this.playing();
  };

  MobileState.prototype.onSeeking = function () {
    this.waiting();
  };

  MobileState.prototype.onTap = function (evt) {
    this.emitSync('state-tap', evt);
  };

  MobileState.prototype.onTimeupdate = function () {
    this.clearTimeout();
  };

  MobileState.prototype.onWaiting = function () {
    this.waiting();
  };

  MobileState.prototype.playing = function () {
    this.clearTimeout();
    this.showState('', false);
  };

  MobileState.prototype.showState = function (state, show) {
    var _this = this;

    this.currentState = state;
    this.isShown = show;

    if (show) {
      this.emitSync('state-change', state);
    }

    ['loading', 'error', 'play'].forEach(function (key) {
      if (key === state && show) {
        _class.addClass(_this.$dom, key);
      } else {
        _class.removeClass(_this.$dom, key);
      }
    });
  };

  MobileState.prototype.waiting = function () {
    var _this = this;

    this.clearTimeout();
    this.timeout = setTimeout(function () {
      return _this.showState('error', true);
    }, this.expectTime);

    if (!this.paused) {
      this.showState('loading', true);
    }
  };

  return MobileState;
}(chimee.Plugin);

exports.MobileState = MobileState;
exports.default = MobileState;
