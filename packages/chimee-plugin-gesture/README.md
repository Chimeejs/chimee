# chimee-plugin-gesture

还在开发中...

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
