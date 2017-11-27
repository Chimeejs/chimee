import './state.css';
import {setStyle, UAParser} from 'chimee-helper';
import gestureFactory from 'chimee-plugin-gesture';
import {getEventPosition} from './util';

const chimeeState = gestureFactory({
  name: 'chimeeState',
  el: `
    <chimee-state>
      <chimee-state-loading></chimee-state-loading>
      <chimee-state-play>
      </chimee-state-play>
      <chimee-state-volume>
        <chimee-state-volume-icon>
          
          <svg viewBox="0 0 107 101" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
              <polygon points="0.407316446 30 27.6500779 30 57.3737293 2.84217094e-14 58.4762532 100 27.6500779 70 0.407316446 70"></polygon>
              <path d="M71,73 L92,89" stroke-width="8" stroke-linecap="round"></path>
              <path d="M76.4032258,53.6071429 L100.596774,43.3928571" stroke-width="8" stroke-linecap="round" transform="translate(88.500000, 48.500000) rotate(23.000000) translate(-88.500000, -48.500000) "></path>
              <path d="M72,26 L93,10" stroke-width="8" stroke-linecap="round"></path>
            </g>
          </svg>
        </chimee-state-volume-icon>
        <chimee-state-volume-bar>
          <chimee-state-volume-bar-track></chimee-state-volume-bar-track>
          <chimee-state-volume-bar-value></chimee-state-volume-bar-value>
        </chimee-state-volume-bar>
      </chimee-state-volume>
      <chimee-state-error>加载失败，请刷新重试</chimee-state-error>
    </chimee-state>
  `,
  create () {
    this.volueArea = this.$dom.querySelector('chimee-state-volume');
    this.volumeBar = this.$dom.querySelector('chimee-state-volume-bar-value');
    this._setVolume();

    const parser = new UAParser();
    this.os = parser.getOS().name;
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
    volumechange () {
      this._setVolume();
    },
    // 屏幕亮度
    // lightchange () {
    //   const height = this.light * 100 + '%';
    //   setStyle(this.lightBar, 'height', height);
    // },
    // 卡顿(FLV|HLS加载异常待内部特供事件)
    // stalled () {
    //   this.showLoading();
    // },
    timeupdate () {
      this.clearTimeout();
    },
    panstart(evt) {
      if(this.os === 'iOS') return;
      this.startY = evt.changedTouches[0].clientY;
      this.startVolume = this.volume;
      setStyle(this.volueArea, 'display', 'inline-block');
    },
    panmove(evt) {
      if(this.os === 'iOS') return;
      const endY = evt.changedTouches[0].clientY;
      const distance = endY - this.startY;
      const screenY = window.screen.height;
      const volumeOffset = -distance / screenY;
      let volume = this.startVolume + volumeOffset;
      this.volume = volume > 1 ? 1 : volume < 0 ? 0 : volume;
    },
    panend() {
      if(this.os === 'iOS') return;
      setStyle(this.volueArea, 'display', 'none');      
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
    },
    _setVolume () {
      const height = this.volume * 100 + '%';
      setStyle(this.volumeBar, 'height', height);
    }
  }
});

export default chimeeState;
