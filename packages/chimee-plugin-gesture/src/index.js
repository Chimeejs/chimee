import {addEvent, removeEvent} from 'chimee-helper';
import Gesture from './gesture';

const baseMobileEvent = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
export default function gestureFactory ({
  name = 'chimeeGesture',
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
    data,
    computed,
    beforeCreate(config) {
      beforeCreate && this::beforeCreate();
      const gesture = this.gesture = new Gesture();
      baseMobileEvent.forEach(item => {
        config.events[item] = evt => {
          gesture[item](evt);
        }
        config.events['c_' + item] = (evt) => {
          gesture[item](evt, 'c_');
        }
        config.events['w_' + item] = (evt) => {
          gesture[item](evt, 'w_');
        }
      });

      ['tap', 'swipe', 'panstart', 'panmove', 'panend', 'press'].forEach(item => {
        gesture.on(item, evt => {
          const func = config.events[item];
          func && this::func(evt);
        })
        gesture.on('c_' + item, evt => {
          const func = config.events['c_' + item];
          func && this::func(evt);
        })
        gesture.on('w_' + item, evt => {
          const func = config.events['w_' + item];
          func && this::func(evt);
        })
        gesture.on('d_' + item, evt => {
          const func = config.events['d_' + item];
          func && this::func(evt);
        })
      })
    },
    create() {
      create && this::create();
      baseMobileEvent.forEach(item => {
        addEvent(this.$dom, item, evt => {
          this.gesture[item](evt, 'd_');
        })        
      })
    },
    init,
    inited,
    destroy,
    methods,
    penetrate,
    operable,
    events
  }
}

