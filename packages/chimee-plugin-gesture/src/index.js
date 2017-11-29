import {addEvent, removeEvent} from 'chimee-helper';
import Gesture from './gesture';

const baseMobileEvent = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

const gesture = new Gesture();
const c_gesture = new Gesture();
const w_gesture = new Gesture();
const d_gesture = new Gesture();

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
    beforeCreate(config) {
      baseMobileEvent.forEach(item => {
        config.events[item] = evt => {
          gesture[item](evt);
        }
        config.events['c_' + item] = (evt) => {
          c_gesture[item](evt);
        }
        config.events['w_' + item] = (evt) => {
          w_gesture[item](evt);
        }
      });

      ['tap', 'swipe', 'panstart', 'panmove', 'panend', 'press'].forEach(item => {
        gesture.on(item, evt => {
          const func = config.events[item];
          func && this::func(evt);
        })
        c_gesture.on(item, evt => {
          const func = config.events['c_' + item];
          func && this::func(evt);
        })
        w_gesture.on(item, evt => {
          const func = config.events['w_' + item];
          func && this::func(evt);
        })
        d_gesture.on(item, evt => {
          const func = config.events['d_' + item];
          func && this::func(evt);
        })
      })

      beforeCreate && this::beforeCreate();      
    },
    create() {
      baseMobileEvent.forEach(item => {
        const key = '__' + item;
        this[key] = evt => {
          d_gesture[item](evt);
        }
        addEvent(this.$dom, item, this[key]);
      })

      create && this::create();      
    },
    init,
    inited,
    destroy() {
      baseMobileEvent.forEach(item => {
        const key = '__' + item;        
        removeEvent(this.$dom, item, this[key]);        
      })

      destroy && this::destroy();      
    },
    methods,
    penetrate,
    operable,
    events
  }
}

