// @flow
import Plugin from '../dispatcher/plugin';

export default class CanvasRender extends Plugin {
  __dispatcher: Dispatcher;
  ctx: CanvasRenderingContext2D;
  // $FlowFixMe: a extends declare
  $dom: HTMLCanvasElement;
  canvasHeight: number;
  canvasWidth: number;
  playing: boolean;
  render: Function;
  getContext: Function;
  setSize: Function;
  poller: Function;
  posterRender: Function;
  posterImageDom: HTMLImageElement;

  constructor(config: Object, ...args: any []) {
    const myConfig = {
      el: document.createElement('canvas'),
      penetrate: true,
      inner: true,
    };
    super(Object.assign(config, myConfig), ...args);
    this.poller = config.poller || this.defaultPoller;
    this.render = config.render || this.defaultRender;
    this.getContext = config.getContext || this.getContext;
    this.setSize = config.setSize || this.defaultSetSize;
    this.posterRender = config.posterRender || this.defaultPosterRender;
    this.ctx = this.$dom.getContext('2d');
    this.poller(this.render);
  }

  inited() {
    this.setSize();
    this.$css('video', 'display', 'none');
  }

  defaultPoller(fn: Function) {
    requestAnimationFrame(() => {
      fn.call(this);
      this.poller(fn);
    });
  }

  defaultRender() {
    if (this.poster && (this.paused || this.ended)) {
      this.posterRender();
      return;
    }
    this.ctx.drawImage(this.$video, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  defaultPosterRender() {
    if (!this.posterImageDom) {
      this.posterImageDom = new Image();
      this.posterImageDom.src = this.poster;
    }
    this.ctx.drawImage(this.posterImageDom, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  defaultSetSize() {
    const { clientWidth: width, clientHeight: height } = this.$video;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.$dom.setAttribute('width', width.toString());
    this.$dom.setAttribute('height', height.toString());
  }
}
