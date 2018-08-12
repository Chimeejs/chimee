// @flow
import Plugin from '../dispatcher/plugin';
import { addClassName, setStyle } from 'chimee-helper';
// $FlowFixMe: we can extend create here
export default class PictureInPicture extends Plugin {
  __dispatcher: Dispatcher;
  isShown: boolean;
  ctx: CanvasRenderingContext2D;
  $dom: HTMLCanvasElement;
  hasStopRender: boolean;
  myStyle: {
    position: string,
    top: string | number,
    left: string | number,
    right: string | number,
    bottom: string | number,
    width: string | number,
    height: string | number,
  };

  isShown = false;
  hasStopRender = true;
  myStyle = {
    position: 'fixed',
    top: '',
    left: '',
    right: 0,
    bottom: 0,
    width: 277,
    height: 156,
  };

  constructor(config: Object, ...args: any []) {
    super(Object.assign(config, {
      el: document.createElement('canvas'),
      penetrate: true,
      inner: false,
    }), ...args);
  }

  create() {
    addClassName(this.$dom, 'chimee-plugin-picture-in-picture');
    this.getContext();
  }

  inited() {
    this.setStyle();
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
    console.warn(window.__chimee_picture_in_picture)
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
      this.ctx.drawImage(this.$video, 0, 0, this.myStyle.width, this.myStyle.height);
    }
  }

  setStyle(styles: Object = {}) {
    Object.assign(this.myStyle, styles);
    this.$dom.setAttribute('width', this.myStyle.width.toString());
    this.$dom.setAttribute('height', this.myStyle.height.toString());
    for (const key in this.myStyle) {
      if (key === 'width' || key === 'height') continue;
      const value = this.myStyle[key];
      setStyle(this.$dom, key, value);
    }
  }
}
