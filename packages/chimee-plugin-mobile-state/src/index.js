import './state.css';
import gestureFactory from 'chimee-plugin-gesture';

const chimeeState = gestureFactory({
  name: 'chimeeState',
  el: `
    <chimee-state>
      <chimee-state-loading></chimee-state-loading>
      <chimee-state-play>
      </chimee-state-play>
      <chimee-state-error>加载失败，请刷新重试</chimee-state-error>
    </chimee-state>
  `,
  create () {
    this.volueArea = this.$dom.querySelector('chimee-state-volume');
    this.volumeBar = this.$dom.querySelector('chimee-state-volume-bar-value');
  },
  inited () {
    this.src && this.showState('loading', true);
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
    canplay () {
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
      this.emit('state_panmove', evt);
    },
    panend (evt) {
      this.emit('state_panend', evt);
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
      this._timeout = setTimeout(() => this.showState('error', true), 3e4);
      (status === 'loadstart' || !this.paused) && this.showState('loading', true);
    },
    clearTimeout () {
      if (this._timeout) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }
    },
    showState (state, show) {
      this.$dom.className = show ? state : '';
    }
  }
});

export default chimeeState;
