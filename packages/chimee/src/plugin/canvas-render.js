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
    this.ctx.drawImage(this.$video, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  defaultSetSize() {
    const { clientWidth: width, clientHeight: height } = this.$video;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.$dom.setAttribute('width', width.toString());
    this.$dom.setAttribute('height', height.toString());
  }
}
