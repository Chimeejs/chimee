# 手势规则

## tap

1. 只有一个触点
2. 没有 move 或者 move 的距离很小 < 9px
3. end - start < 250ms

```javascript
//hammer.js
{
  event: 'tap',
  pointers: 1,
  taps: 1,
  interval: 300, // max time between the multi-tap taps
  time: 250, // max time of the pointer to be down (like finger on the screen)
  threshold: 9, // a minimal movement is ok, but keep it low
  posThreshold: 10 // a multi-tap can be a bit off the initial position
}
```

## press

```javascript
//hammer.js
{
  event: 'press',
  pointers: 1,
  time: 251, // minimal time of the pointer to be pressed
  threshold: 9 // a minimal movement is ok, but keep it low
}
```

## swipe

```javascript
//hammer.js
{
  event: 'swipe',
  threshold: 10, // 最小移动距离
  velocity: 0.3, // 滑动速度
  direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
  pointers: 1
}
```

## pan

```javascript
//hammer.js
{
  event: 'pan',
  threshold: 10,
  pointers: 1,
  direction: DIRECTION_ALL
}
```

## 参考

1. [HTML5 手势检测原理和实现](https://zhuanlan.zhihu.com/p/21927991)
2. [触摸事件 mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events#Example)

## 问题

1. touches changetouches 的区别

答：[mdn](https://developer.mozilla.org/zh-CN/docs/Web/Events/touchstart)

1. 移动端为什么要用 touch 事件
