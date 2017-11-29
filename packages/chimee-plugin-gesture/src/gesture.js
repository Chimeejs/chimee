/**
 * 手势判断组件
 * 
 * 目前判断的手势
 * 
 * 单点操作
 * 
 * tap
 * swipe
 * drag
 */

import {getDistance, getSpeed, isArray} from './util'

export default class Gesture {

  constructor () {
    // this.events = events;
    // ['tap', 'swipe', 'panstart', 'panmove', 'panend', 'press'].forEach(item => {
    //   this[item] = events[item].bind(host);
    // })

    // 手势该有的几个状态
    // none tapping pressing

    this.event = {}
    this.status = 'none'
  }
 
  touchstart (evt) {
    
    // 初始状态
    this.status = 'tapping'

    // 当前 touch 点
    this.startTouch = evt.changedTouches[0]

    // 开始时间
    this.startTime = Date.now()

  }

  touchmove (evt) {

    const touch = evt.changedTouches[0]

    const distance = getDistance(this.startTouch.clientX, this.startTouch.clientY, touch.clientX, touch.clientY)
    
    if(this.status === 'tapping' && distance > 10) {
      this.status = 'panning'
      this.fire('panstart', evt)
    }else if(this.status === 'panning'){
      this.fire('panmove', evt)
    }
  }

  touchend (evt) {

    this.endTouch = evt.changedTouches[0]

    const distance = getDistance(this.startTouch.clientX, this.startTouch.clientY, this.endTouch.clientX, this.endTouch.clientY)

    const interval = Date.now() - this.startTime

    // 时间 <= 250ms 距离小于 10 px 则认为是 tap
    if(interval <= 250 && distance < 10) this.fire('tap', evt)

    // 时间 > 250ms 距离小于 10 px 则认为是 press    
    if(interval > 250 && distance < 10) this.fire('press', evt)

    const speed = getSpeed(distance, interval)

    // 距离大于 10 px , 速度大于 0.3 则认为是 swipe
    if(speed > 0.3 && distance >= 10) this.fire('swipe', evt)

    // 处于 panning 则触发 panend 事件
    if(this.status === 'panning') this.fire('panend', evt)

    this.status = 'none'
  }

  touchcancel (evt) {

  }

  on (type, func) {
    this.event[type] = this.event[type] ? this.event[type].push(func) : [func];
  }

  fire (type, evt) {
    if(!isArray(this.event[type])) return;
    this.event[type].forEach(item => {
      item(evt);
    });
  }
}
