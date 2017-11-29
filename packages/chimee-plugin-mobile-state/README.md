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
    chimeePluginMobileState.name
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

## 注意

1. ios 下不支持通过 js 来控制音量，只能通过物理按键来控制 [developer.apple](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW1)
安卓下没有问题

2. 阻止手势
  * 部分浏览器，(ios 下浏览器) 上滑手势
  * 

3. ios playbackrate

4. 横屏

5. ios 11 微信下， 不会自动加载

6. ios 11 微信／safari 下， 全屏， tap 时会有一层， 灰色遮罩

7. ios 下， 点击的时候会自动有一个蒙层

8. ios 会触发一个 loadstart 事件，但是不会触发 canplay 事件

8. 安卓问题

9. ios 安卓 点击的时候有一层遮罩 -webkit-tap-highlight-color:rgba(255,255,255,0)

10. ios 微信下， 默认不会加载数据，不会调用 loadstart 事件， [WeixinJSBridgeReady](https://www.w3ctech.com/topic/1165)

11. 安卓下， 很容易被qq 浏览器劫持，使用 qq 浏览器的播放组件，如果仅仅是个视频的话， 有一个 hack，

12. 小米手机 自带， 全屏前后， window.innerWidth 发生变化

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```