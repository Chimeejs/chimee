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
    <chimee-state class="play">
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
    // 存在 src 并且 设置了 prelaod || autoplay 的情况下， 显示 loading
    this.src && (this.preload === 'auto' || this.preload === 'metadata' || this.preload === '' || this.autoplay === true) && this.showState('loading', true);
  },
  penetrate: true,
  operable: true,
  destroy () {
    this.clearTimeout();
  },
  events: {
    load () {
      console.log('load');
      this.showState('play', true);
    },
    pause () {
      console.log('pause');
      this.showState('play', true);
    },
    play () {
      this.showState('play', false);
    },
    // loadedmetadata () {
      // this.playing();
      // console.log('loadedmetadata')
      // this.showState('play', true);
    // },
    seeked () {
      console.log('seeked');
      this.playing();
    },
    playing () {
      console.log('playing');
      this.playing();
    },
    // loadstart () {
    //   this.waiting();
    // },
    seeking () {
      console.log('seeking');
      this.waiting();
    },
    waiting () {
      console.log('waiting');
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
      this.emit('state-panstart', evt);
    },
    panmove (evt) {
      this.emit('state-panmove', evt);
    },
    panend (evt) {
      this.emit('state-panend', evt);
    },
    tap (evt) {
      this.emit('state-tap', evt);
    },
    d_tap (evt) {
      const playElem = this.$dom.querySelector('chimee-state-play');
      if(playElem.contains(evt.target)) {
        this.play();
      }
    }
  },
  methods: {
    playing () {
      this.clearTimeout();
      this.showState('loading', false);
      this.showState('error', false);
    },
    waiting () {
      this.clearTimeout();
      // 加载超过30秒则超时显示异常
      this._timeout = setTimeout(() => this.showState('error', true), this.config.expectTime);
      !this.paused && this.showState('loading', true);
    },
    clearTimeout () {
      if (this._timeout) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }
    },
    showState (state, show) {
      console.log(state, show);
      show && this.emit('state-change', state);
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
