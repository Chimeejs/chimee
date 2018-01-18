# chimee-plugin-mobile-state

## install

安装

```shell
# 依赖于 chimee， 首先需要安装 chimee
npm install chimee
# 安装控制条组件
npm install chimee-plugin-mobile-state
```

使用

```javascript
import chimee from 'chimee';
import chimeePluginMobileState from 'chimee-plugin-mobile-state';

// 安装插件
chimee.install(chimeePluginMobileState);
const player = new chimee({
  // ...
  // 使用插件
  plugin: [
    chimeePluginMobileState.name,
    errorTips: '错误提示', // 也可以塞一个 dom 节点
    icon: {
      loading: ``, // 可传入 svg， 内部 innerHTML
      play: `` // svg
    },
    expectTime: 3e4 // 最长加载时间
  ]
});
```

**也可以在页面中引用 `/lib/index.browser.js` 然后在页面中使用 chimeePluginMobileState**


## 包含状态

* 开始
* loading
* error

## 包含手势

* panstart
* panmove
* panend

## 事件

### state_panstart
  * 含义： 在这个插件上触发 panstart 手势
  * 回调参数：
    * evt: touch 对象

### state_panmove
  * 含义： 在这个插件上触发 panmove 手势
  * 回调参数：
    * evt: touch 对象

### state_panend
  * 含义： 在这个插件上触发 panstend 手势
  * 回调参数：
    * evt: touch 对象

## state-change
  * 含义： 这个插件状态发生变化
  * 回调参数：
    * state: 当前状态