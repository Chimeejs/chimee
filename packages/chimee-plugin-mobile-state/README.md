# chimee-plugin-controlbar

## install

安装

```shell
# 依赖于 chimee， 首先需要安装 chimee
npm install chimee
# 安装控制条组件
npm install chimee-plugin-center-state
```

使用

```javascript
import chimee from 'chimee';
import chimeePluginCenterState from 'chimee-plugin-center-state';

// 安装插件
chimee.install(chimeePluginCenterState);
const player = new chimee({
  // ...
  // 使用插件
  plugin: [
    chimeePluginCenterState.name
  ]
});
```

**也可以在页面中引用 `/lib/index.browser.js` 然后在页面中使用 chimeePluginCenterState**


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

## 注意

1. ios 下不支持通过 js 来控制音量，只能通过物理按键来控制 [developer.apple](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW1)
安卓下没有问题

2. 阻止手势
  * 部分浏览器，(ios 下浏览器) 上滑手势
  * 

3. ios playbackrate

4. 横屏

