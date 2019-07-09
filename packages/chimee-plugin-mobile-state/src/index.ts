/// <reference path="./chimee-space.ts" />
/// <reference path="./svg.d.ts" />
import { Plugin } from 'chimee';
import Gesture from 'chimee-plugin-gesture';
import { addClass, removeClass } from 'dom-helpers/class';
import { contains, querySelectorAll } from 'dom-helpers/query';
import loadingStr from './image/loading.svg';
import playStr from './image/play.svg';
import './state.css';

type GetConstructorArgs<T> = T extends new (...args: infer U) => any ? U : never;

type PluginParameters = GetConstructorArgs<typeof Plugin>;

const template = `
<chimee-state class="play">
  <chimee-state-loading></chimee-state-loading>
  <chimee-state-play></chimee-state-play>
  <chimee-state-error></chimee-state-error>
</chimee-state>
`;

export class MobileState extends Plugin<PluginParameters[2] & {
  customGesture?: boolean;
  errorTips?: MobileState['errorTips'],
  expectTime?: MobileState['expectTime'],
  icon?: Partial<MobileState['icon']>,
}> {
  public currentState: 'play' | 'error' | 'loading' | '';
  public isShown: boolean;
  public name: 'ChimeePluginMobileState';
  private errorTips: string;
  private expectTime: number;
  private icon: {
    loading: string;
    play: string;
  };
  private timeout: any;

  constructor(config: PluginParameters[0], dispatcher: PluginParameters[1], option: PluginParameters[2] & {
    customGesture?: boolean;
    errorTips?: MobileState['errorTips'],
    expectTime?: MobileState['expectTime'],
    icon?: Partial<MobileState['icon']>,
  }) {
    super(Object.assign(config, {
      dependencies: option.customGesture ? [] : [ Gesture.name ],
      el: template,
      operable: false,
      penetrate: true,
    }), dispatcher, option);
    const {
      expectTime = 3e4,
      errorTips = '加载失败，请刷新重试',
      icon = {},
    } = option;
    this.errorTips = errorTips;
    this.expectTime = expectTime;
    this.icon = Object.assign({
      loading: loadingStr,
      play: playStr,
    }, icon);
    this.currentState = '';
    this.isShown = false;
  }

  public create() {
    // this.on('doubletap', this.onDoubletap);
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
  }

  public inited() {
    this.addInnerHtml();
    if (this.src && (this.preload === 'auto' || this.preload === 'metadata' || this.preload === '' || this.autoplay === true)) {
      this.showState('loading', true);
    }
  }

  private addInnerHtml() {
    ['play', 'loading', 'error'].forEach((key: 'play' | 'loading' | 'error') => {
      const containers = querySelectorAll(this.$dom, `chimee-state-${key}`);
      /* istanbul ignore else  */
      if (containers.length && containers[0]) {
        containers[0].innerHTML = key === 'error' ? this.errorTips : this.icon[key];
      }
    });
  }

  private clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
  // private onDoubletap(evt: TouchEvent) {
  //   const playElements = querySelectorAll(this.$dom, 'chimee-state-play');
  //   if (playElements && playElements[0] && contains(playElements[0], evt.target as Node)) {
  //     this.play();
  //   }
  // }

  private onLoad() {
    this.showState('play', true);
  }
  private onPanend(evt: TouchEvent) {
    this.emitSync('state-panend', evt);
  }
  private onPanmove(evt: TouchEvent) {
    this.emitSync('state-panmove', evt);
  }
  private onPanstart(evt: TouchEvent) {
    this.emitSync('state-panstart', evt);
  }
  private onPause() {
    this.showState('play', true);
  }
  private onPlay() {
    this.showState('', false);
  }
  private onPlaying() {
    this.playing();
  }
  private onSeeked() {
    this.playing();
  }
  private onSeeking() {
    this.waiting();
  }
  private onTap(evt: TouchEvent) {
    this.emitSync('state-tap', evt);
  }
  private onTimeupdate() {
    this.clearTimeout();
  }
  private onWaiting() {
    this.waiting();
  }

  private playing() {
    this.clearTimeout();
    this.showState('', false);
  }

  private showState(state: 'loading' | 'error' | 'play' | '', show: boolean) {
    this.currentState = state;
    this.isShown = show;
    if (show) {
      this.emitSync('state-change', state);
    }
    ['loading', 'error', 'play'].forEach((key) => {
      if (key === state && show) {
        addClass(this.$dom, key);
      } else {
        removeClass(this.$dom, key);
      }
    });
  }

  private waiting() {
    this.clearTimeout();
    // 加载超过30秒则超时显示异常
    this.timeout = setTimeout(() => this.showState('error', true), this.expectTime);
    if (!this.paused) {
      this.showState('loading', true);
    }
  }
}

export default MobileState;
