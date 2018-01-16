import {$, deepAssign, isObject} from 'chimee-helper';
import './state.css';
import gestureFactory from 'chimee-plugin-gesture';
import playStr from './image/play.svg';
import loadingStr from './image/loading.svg';

const defaultConfig = {
  errorTips: '加载失败，请刷新重试',
  icon: {
    loading: loadingStr,
    play: playStr
  },
  expectTime: 3e4 // 超过最长加载时间则报错
};

const chimeeState = gestureFactory({
  name: 'chimeeState',
  el: `
    <chimee-state>
      <chimee-state-loading></chimee-state-loading>
      <chimee-state-play></chimee-state-play>
      <chimee-state-error></chimee-state-error>
    </chimee-state>
  `,
  init () {
    this.config = isObject(this.$config) ? deepAssign(defaultConfig, this.$config) : defaultConfig;
    this._addInnerHtml();
  },
  inited () {
    // 存在 src 并且 设置了 prelaod 的情况下， 显示 loading
    this.src && this.preload !== 'none' && this.showState('loading', true);
  },
  penetrate: true,
  operable: true,
  destroy () {
    this.clearTimeout();
  },
  events: {
    pause () {
      this.showState('play', true);
    },
    play () {
      this.showState('play', false);
    },
    loadedmetadata () {
      this.playing();
      this.showState('play', true);
    },
    playing () {
      this.playing();
    },
    loadstart () {
      this.waiting('loadstart');
    },
    waiting () {
      this.waiting();
    },
    // 卡顿(FLV|HLS加载异常待内部特供事件)
    // stalled () {
    //   this.showLoading();
    // },
    timeupdate () {
      this.clearTimeout();
    },
    panstart (evt) {
      this.emit('state_panstart', evt);
    },
    panmove (evt) {
      this.emit('state-error');
    },
    panend (evt) {
      this.emit('state-error');
    },
    d_tap (evt) {
      if(evt.target.tagName === 'CHIMEE-STATE-PLAY') this.play();
    }
  },
  methods: {
    playing () {
      this.clearTimeout();
      this.showState('loading', false);
      this.showState('error', false);
    },
    waiting (status) {
      this.clearTimeout();
      // 加载超过20秒则超时显示异常
      this._timeout = setTimeout(() => this.showState('error', true), this.config.expectTime);
      (status === 'loadstart' || !this.paused) && this.showState('loading', true);
    },
    clearTimeout () {
      if (this._timeout) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }
    },
    showState (state, show) {
      state === 'error' && show && this.emit('state-error');
      this.$dom.className = show ? state : '';
    },
    _addInnerHtml () {
      const dom = $(this.$dom);
      dom.find('chimee-state-loading').html(this.config.icon.loading);
      dom.find('chimee-state-play').html(this.config.icon.play);
      dom.find('chimee-state-error').html(this.config.errorTips);
    }
  }
});

export default chimeeState;
