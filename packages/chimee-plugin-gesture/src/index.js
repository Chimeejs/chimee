import {addEvent, removeEvent} from 'chimee-helper';
import Gesture from './gesture';

const baseMobileEvent = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
const supportGesture = ['tap', 'swipe', 'panstart', 'panmove', 'panend', 'press', 'doubletap'];
export default function gestureFactory ({
  name = 'chimeeGesture',
  el,
  level = 0,
  inner = true,
  autoFocus,
  className,
  beforeCreate,
  create,
  init,
  inited,
  destroy,
  data,
  computed,
  events = {},
  methods = {},
  penetrate = false, // 是否将交互事件同步到video元素(点击当前popup同样实现video的暂停播放)
  operable = true // 是否启用事件交互（false则设置CSS事件穿透）
} = {}) {
  return {
    name,
    el,
    level,
    inner,
    autoFocus,
    className,
    data,
    computed,
    beforeCreate (config) {
      this.gesture = new Gesture();
      this.c_gesture = new Gesture();
      this.w_gesture = new Gesture();
      this.d_gesture = new Gesture();
      baseMobileEvent.forEach(item => {
        config.events[item] = evt => {
          this.gesture[item](evt);
        };
        config.events['c_' + item] = (evt) => {
          this.c_gesture[item](evt);
        };
        config.events['w_' + item] = (evt) => {
          this.w_gesture[item](evt);
        };
      });

      supportGesture.forEach(item => {
        this.gesture.on(item, evt => {
          const func = config.events[item];
          func && this::func(evt);
        });
        this.c_gesture.on(item, evt => {
          const func = config.events['c_' + item];
          func && this::func(evt);
        });
        this.w_gesture.on(item, evt => {
          const func = config.events['w_' + item];
          func && this::func(evt);
        });
        this.d_gesture.on(item, evt => {
          const func = config.events['d_' + item];
          func && this::func(evt);
        });
      });

      beforeCreate && this::beforeCreate();
    },
    create () {
      this._i = this._i || 0;
      this._i++;
      baseMobileEvent.forEach(item => {
        const key = '__' + item;
        this[key] = evt => {
          this.d_gesture[item](evt);
        };
        addEvent(this.$dom, item, this[key]);
      });

      create && this::create();
    },
    init,
    inited,
    destroy () {
      baseMobileEvent.forEach(item => {
        const key = '__' + item;
        removeEvent(this.$dom, item, this[key]);
      });

      destroy && this::destroy();
    },
    methods,
    penetrate,
    operable,
    events
  };
}

