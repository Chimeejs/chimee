# chimee-plugin-gesture

>该插件是一个基础插件，移动端的插件可以继承它，为这些插件提供手势事件，暴露给上层插件使用

## install

安装

```shell
# 依赖于 chimee， 首先需要安装 chimee
npm install chimee
# 安装手势组件
npm install chimee-plugin-gesture
```

使用

```javascript
import chimee from 'chimee';
import gestureFactory from 'chimee-plugin-gesture';

// 安装插件
const mobiControlbar = gestureFactory({

  // 参考 chimee 插件配置
  name: 'mobiControlbar',
  // ...
  // 直接使用 ['tap', 'swipe', 'panstart', 'panmove', 'panend', 'press', 'doubletap']， 这些事件就好了，不需要使用 touch 事件
  events: {
    tap() {

    },
    d_tap() {

    }
  }
})
chimee.install(mobiControlbar);
const player = new chimee({
  // ...
  // 使用插件
  plugin: [
    mobiControlbar.name // 或者 'mobiControlbar'
  ]
});
```

## 配置

chimee 配置 events 不用再监听 touchstart/ touchmove/touchend 
只需要监听操作 'tap', 'swipe', 'panstart', 'panmove', 'panend', 'press', 'doubletap' 就好了
支持前缀 'w_'(wrap dom), 'c_'(container dom), 'd_'(插件自身 dom)， 不加前缀 videoElement 具体可以参考 chimee plugin 配置
