// @flow
import Plugin from '../dispatcher/plugin';
import { addClassName, setStyle } from 'chimee-helper';
// $FlowFixMe: we can extend create here
export default class PictureInPicture extends Plugin {
  __dispatcher: Dispatcher;
  isShown: boolean;
  ctx: CanvasRenderingContext2D;
  $dom: HTMLCanvasElement;
  canvasHeight: number;
  canvasWidth: number;
  hasStopRender: boolean;

  isShown = false;
  hasStopRender = true;

  constructor(config: Object, ...args: any []) {
    const myConfig = {
      el: document.createElement('canvas'),
      penetrate: true,
      inner: false,
    };
    super(Object.assign(config, myConfig), ...args);
  }

  create() {
    addClassName(this.$dom, 'chimee-plugin-picture-in-picture');
    this.getContext();
  }

  inited() {
    this.setSize();
  }

  show() {
    setStyle(this.$dom, 'display', 'block');
    this.isShown = true;
  }

  hide() {
    setStyle(this.$dom, 'display', 'none');
    this.isShown = false;
  }

  closeCurrentPicture() {
    if (window.__chimee_picture_in_picture && window.__chimee_picture_in_picture.plugin) {
      window.__chimee_picture_in_picture.plugin.exitPictureInPicture();
    }
  }

  requestPictureInPicture({
    autoplay = false,
  }: {
    autoplay?: boolean,
  } = {}) {
    this.closeCurrentPicture();
    this.show();
    this.poller(this.render);
    if (autoplay && this.paused) this.play();
    else if (!autoplay && !this.paused) this.pause();
    window.__chimee_picture_in_picture = {
      plugin: this,
      window: this.$dom,
      element: this.$video,
    };
  }

  exitPictureInPicture() {
    this.hide();
    window.__chimee_picture_in_picture = {};
  }

  getContext() {
    this.ctx = this.$dom.getContext('2d');
  }

  poller(fn: Function) {
    requestAnimationFrame(() => {
      fn.call(this);
      if (this.isShown) {
        this.poller(fn);
        this.hasStopRender = false;
      } else {
        this.hasStopRender = true;
      }
    });
  }

  render() {
    if (this.isShown) {
      this.ctx.drawImage(this.$video, 0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  setSize() {
    const { clientWidth: width, clientHeight: height } = this.$video;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.$dom.setAttribute('width', width.toString());
    this.$dom.setAttribute('height', height.toString());
  }
}
