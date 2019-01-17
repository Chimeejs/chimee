import Dispatcher from 'dispatcher/index';
import ChimeePlugin from 'dispatcher/plugin';
import { addClass } from 'dom-helpers/class';
import style from 'dom-helpers/style';
import { PluginConfig, PluginOption } from 'typings/base';
export type ChimeePictureInPictureOnWindow = {
  element?: HTMLVideoElement;
  plugin?: PictureInPicture;
  window?: Element;
};
declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __chimee_picture_in_picture: ChimeePictureInPictureOnWindow;
  }
}
export default class PictureInPicture extends ChimeePlugin {
  public $dom: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public hasStopRender: boolean = true;
  public isShown: boolean = false;
  public myStyle: {
    bottom: string | number,
    height: number,
    left: string | number,
    position: string,
    right: string | number,
    top: string | number,
    width: number,
    [key: string]: string | number,
  } = {
    bottom: 0,
    height: 156,
    left: '',
    position: 'fixed',
    right: 0,
    top: '',
    width: 277,
  };

  constructor(config: PluginConfig, dispatcher: Dispatcher, option: PluginOption) {
    super(Object.assign(config, {
      el: document.createElement('canvas'),
      inner: false,
      penetrate: true,
    }), dispatcher, option);
  }

  public closeCurrentPicture() {
    if (window.__chimee_picture_in_picture && window.__chimee_picture_in_picture.plugin) {
      window.__chimee_picture_in_picture.plugin.exitPictureInPicture();
    }
  }

  public create = () => {
    addClass(this.$dom, 'chimee-plugin-picture-in-picture');
    this.getContext();
  }
  public exitPictureInPicture = () => {
    this.hide();
    window.__chimee_picture_in_picture = {};
    return Promise.resolve();
  }

  public getContext() {
    this.ctx = this.$dom.getContext('2d');
  }

  public hide() {
    style(this.$dom, 'display', 'none');
    this.isShown = false;
  }

  public inited = () => {
    this.setStyle();
  }

  public poller(fn: () => void) {
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

  public render() {
    if (this.isShown) {
      this.ctx.drawImage(this.$video, 0, 0, this.myStyle.width, this.myStyle.height);
    }
  }

  public requestPictureInPicture = ({
    autoplay = false,
  }: {
    autoplay?: boolean,
  } = {}) => {
    this.closeCurrentPicture();
    this.show();
    this.poller(this.render);
    if (autoplay && this.paused) { this.play(); } else if (!autoplay && !this.paused) { this.pause(); }
    window.__chimee_picture_in_picture = {
      element: this.$video,
      plugin: this,
      window: this.$dom,
    };
    return Promise.resolve();
  }

  public setStyle(styles: { [x: string]: string | number} = {}) {
    Object.assign(this.myStyle, styles);
    this.$dom.setAttribute('width', this.myStyle.width.toString());
    this.$dom.setAttribute('height', this.myStyle.height.toString());
    for (const key in this.myStyle) {
      if (key === 'width' || key === 'height') { continue; }
      const value = this.myStyle[key];
      style(this.$dom, key, value);
    }
  }

  public show() {
    style(this.$dom, 'display', 'block');
    this.isShown = true;
  }
}
