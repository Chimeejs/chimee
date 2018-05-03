# chimee-plugin-mobile-controlbar

## install

安装

```shell
# 依赖于 chimee， 首先需要安装 chimee
npm install chimee
# 安装控制条组件
npm install chimee-plugin-mobile-controlbar
```

使用

```javascript
import chimee from 'chimee';
import chimeePluginMobileControlbar from 'chimee-plugin-mobile-controlbar';

// 安装插件
chimee.install(chimeePluginMobileControlbar);
const player = new chimee({
  // ...
  // 使用插件
  plugin: [
    chimeePluginMobileControlbar.name // 或者 'chimeeMobiControlbar'
  ]
});
```

**也可以在页面中引用 `/lib/index.browser.js` 然后在页面中使用 chimeePluginMobileControlbar**

## 配置

一个配置 🌰 更详细的配置例子， 可以[参考 /demo/index.html](https://github.com/Chimeejs/chimee-plugin-controlbar/blob/master/demo/index.html)

```javascript
plugin: [{
  name: chimeePluginMobileControlbar.name,
  majorColor: '',
  hoverColor: '',
  children: {

  }
}]
```

### 具体的参数配置

#### name
  * 类型： string
  * 含义： 该插件名字， 在 chimee 中使用需要名字，需要唯一对应
  * 值： 'chimeeMobiControlbar' | chimeePluginMobileControlbar.name
  * 必需

#### majorColor
  * 类型： string
  * 作用范围：
    * 该插件中，所有的 svg 图
    * 播放进度条，进度颜色
    * 声音控制条，音量颜色
  * 可选值： 十六进制颜色('#fff')
  * 默认值： '#de698c'
  * 非必需

#### hoverColor
  * 类型： string
  * 作用范围：
    * 该插件中，所有的 svg 图
  * 可选值： 十六进制颜色('#fff')
  * 默认值： '#4c4c4c'
  * 非必需

#### children
  * 类型： Object
  * 含义： 配置子组件是否展示／展示方式，还可以自己扩展子组件
  * 非必需
  * 目前支持的组件： play, currentTime, totalTime, progressBar, screen
  
##### 目前支持的组件及配置

组件支持的事件： 'tap', 'swipe', 'panstart', 'panmove', 'panend', 'press', 'doubletap'

  * play
    * 类型： Object
    * 含义： 配置播放暂停键 icon 及事件
    * 默认： {}
    * 可配置属性：
      * bitmap: true/ false 是否是位图，默认 false， 如果用户采用位图的话，则把当前的默认 svg 都清空掉， 用户通过 css background 来自己设置图片
      * icon: play / pause 图标， 支持 svg 图
      * animate: 当前是一个 svg path 动画，可以传 path 来实现你想要的动画
      * event: 绑定 dom 事件， this 指向这个插件， 通过 this.$dom 可以拿到 dom 节点
      * 注意： icon animate bitmap 都是配置图的。 bitmap 优先。其次 icon ，最后取 animate 中的值

    配置 🌰

    ```javascirpt
    {
      // 可以传两个 icon 来切换播放暂停状态
      icon: {
        play: '',
        pause: ''
      },
      // 当前是一个 svg path 动画，可以传 path 来实现你想要的动画
      animate: {
        path: {
          play: {
            left: ''
          },
          pause: {
            left: ''
          }
        }
      },
      // 可以指定 event 来绑定一些事件，默认 this 是该插件，而不是 dom
      event: {
        tap () {
          console.log('');
        }
      }
    }
    ```

  * currentTime
    * 类型： Object
    * 含义： 时间展示组件，用来展示播放时间
    * 默认： {}
    * 可配置属性：
      * event: 绑定 dom 事件， this 指向这个插件， 通过 this.$dom 可以拿到 dom 节点

    配置 🌰

    ```javascirpt
    {
      // 可以指定 event 来绑定一些事件，默认 this 是该插件，而不是 dom
      event: {
        tap () {
          console.log('');
        }
      }
    }
    ```

  * totalTime
    * 类型： Object
    * 含义： 时间展示组件，用来展示总时间
    * 默认： {}
    * 可配置属性：
      * event: 绑定 dom 事件， this 指向这个插件， 通过 this.$dom 可以拿到 dom 节点

    配置 🌰

    ```javascirpt
    {
      // 可以指定 event 来绑定一些事件，默认 this 是该插件，而不是 dom
      event: {
        tap () {
          console.log('');
        }
      }
    }
    ```

  * progressBar
    * 类型： Object
    * 含义： 进度条控制组件
    * 默认： {}
    * 可配置属性：
      * event: 绑定 dom 事件， this 指向这个插件， 通过 this.$dom 可以拿到 dom 节点

    配置 🌰

    ```javascirpt
    {
      // 可以指定 event 来绑定一些事件，默认 this 是该插件，而不是 dom
      event: {
        tap () {
          console.log('');
        }
      }
    }
    ```

  * screen
    * 类型： Object
    * 含义： 配置全屏／非全屏 icon 及事件
    * 默认： {}
    * 可配置属性：
      * bitmap: true/ false 是否是位图，默认 false，如果用户采用位图的话，则把当前的默认 svg 都清空掉， 用户通过 css background 来自己设置图片
      * icon: full / small 图标， 支持 svg 图
      * event: 绑定 dom 事件， this 指向这个插件， 通过 this.$dom 可以拿到 dom 节点
      * 注意： icon bitmap 都是配置图的。 bitmap 优先。其次 icon

    配置 🌰

    ```javascirpt
    {
      // 可以传两个 icon 来切换播放暂停状态
      icon: {
        full: '',
        small: ''
      },

      // 可以指定 event 来绑定一些事件，默认 this 是该插件，而不是 dom
      event: {
        tap () {
          console.log('');
        }
      }
    }
    ```

  * 自定义组件
    * 类型： Object
    * 含义： 自定义组件
    * 可配置属性：
      * tag: 自定义标签名
      * html: 自定义标签中的 html 内容
      * event: 绑定 dom 事件， this 指向这个插件， 通过 this.$dom 可以拿到 dom 节点
    * 注意： css 写在自己项目中就好了

    配置 🌰

    ```javascirpt
    {
      tag: '',
      html: ``,
      // 可以指定 event 来绑定一些事件，默认 this 是该插件，而不是 dom
      event: {
        tap () {
          console.log('');
        }
      }
    }
    ```

## 事件

在 chimee 实例上可以监听下列事件

* barShow 控制条出现

```js
  chimeeInstance.$on('barShow', function () {
    console.log('show')
  })
```

* barHide 控制条隐藏

```js
  chimeeInstance.$on('barHide', function () {
    console.log('hide')
  })
```

## 组件相关问题

* Q: 子组件的默认顺序是什么？

  A: 在 children 没有配置的情况下会采用下面的顺序
  
    * 注意：根据 chimee 的参数 isLive 来判断是否是直播还是点播
    
    * 直播： play, screen
    
    * 点播： play, currentTime, progressBar, totalTime, screen

* Q: 我可以控制顺序吗？

  A: 在 children 对象中，属性的书写顺序就是渲染顺序

* Q: 为什么我配置了一个组件后，其他默认组件就都不存在了？

  A: 假如 children 配置后， 会读 children 的属性，并渲染， 不会补充其他组件，所以，需要你把所有的组件都写.

## 兼容性

> 兼容性是移动端的大坑，在各个浏览器内总有特殊的表现，遇到最多的情况是，浏览器控制了 video，强制使用他的播放器，并且有最高层级，结尾的时候还会有广告😂

我们这里总结了一些可操作方案，供大家选择，来避免踩这些移动端的坑

1. uc 浏览器
  * 当前效果：强制横屏，并且使用他的播放器
  * 解决方案：貌似加联系 uc 加白名单可以解决
2. 微信
  * 当前效果：
    * ios 目前测试的几款手机可以使用 iphone 6s /iphone 5s
    * 安卓 手机未安卓 qq 浏览器时，比较正常，手机上有 qq 浏览器时，还是 qq 浏览器的默认播放器
  * 解决方案：
    * 安卓手机下， 配置 `x5VideoOrientation: 'landscape'` 直接横屏播放，不会调用 qq 浏览器的播放器
    * 如果用户需要竖屏播放的话， 目前有一个 hack 方案，参见 [问题列表](https://github.com/Chimeejs/chimee-plugin-mobile-controlbar/issues/2)
3. 手机自带浏览器

## 最后

欢迎各位大佬使用。有什么问题／建议，随时提。
