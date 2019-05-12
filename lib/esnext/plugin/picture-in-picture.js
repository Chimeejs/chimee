import { style } from 'dom-helpers';
import { addClass } from 'dom-helpers/class';
import ChimeePlugin from '../dispatcher/plugin';
export default class PictureInPicture extends ChimeePlugin {
    constructor(config, dispatcher, option) {
        super(Object.assign(config, {
            el: document.createElement('canvas'),
            inner: false,
            penetrate: true,
        }), dispatcher, option);
        this.hasStopRender = true;
        this.isShown = false;
        this.myStyle = {
            bottom: 0,
            height: 156,
            left: '',
            position: 'fixed',
            right: 0,
            top: '',
            width: 277,
        };
        this.exitPictureInPicture = () => {
            this.hide();
            window.__chimee_picture_in_picture = {};
            return Promise.resolve();
        };
        this.inited = () => {
            this.setStyle();
        };
        this.requestPictureInPicture = ({ autoplay = false, } = {}) => {
            this.closeCurrentPicture();
            this.show();
            this.poller(this.render);
            if (autoplay && this.paused) {
                this.play();
            }
            else if (!autoplay && !this.paused) {
                this.pause();
            }
            window.__chimee_picture_in_picture = {
                element: this.$video,
                plugin: this,
                window: this.$dom,
            };
            return Promise.resolve();
        };
    }
    closeCurrentPicture() {
        if (window.__chimee_picture_in_picture && window.__chimee_picture_in_picture.plugin) {
            window.__chimee_picture_in_picture.plugin.exitPictureInPicture();
        }
    }
    create() {
        addClass(this.$dom, 'chimee-plugin-picture-in-picture');
        this.getContext();
    }
    getContext() {
        this.ctx = this.$dom.getContext('2d');
    }
    hide() {
        style(this.$dom, 'display', 'none');
        this.isShown = false;
    }
    poller(fn) {
        requestAnimationFrame(() => {
            fn.call(this);
            if (this.isShown) {
                this.poller(fn);
                this.hasStopRender = false;
            }
            else {
                this.hasStopRender = true;
            }
        });
    }
    render() {
        if (this.isShown) {
            this.ctx.drawImage(this.$video, 0, 0, this.myStyle.width, this.myStyle.height);
        }
    }
    setStyle(styles = {}) {
        Object.assign(this.myStyle, styles);
        this.$dom.setAttribute('width', this.myStyle.width.toString());
        this.$dom.setAttribute('height', this.myStyle.height.toString());
        for (const key in this.myStyle) {
            if (key === 'width' || key === 'height') {
                continue;
            }
            const value = this.myStyle[key];
            style(this.$dom, key, value);
        }
    }
    show() {
        style(this.$dom, 'display', 'block');
        this.isShown = true;
    }
}
//# sourceMappingURL=picture-in-picture.js.map