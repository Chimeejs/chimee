# Chimee API 介绍

Chimee 本质上是对原生 video 元素的一个封装。因此在许多用法上都会和原生 video 元素一致。本文会介绍 Chimee 在 video 层级上的具体用法。

同时，Chimee 也是一个组件化框架，要理解这个框架的具体用法，请阅读[为什么要将 Chimee 设计成一个组件化框架？](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/why-chimee-is-a-frame.md)

## 生成实例

我们直接调用`new`就可以生成一个 Chimee 实例。这个实例中我们需要使用者提供一个 dom 节点，我们称之为 wrapper。因此，在构造函数里我们接受三种参数——`string | HTMLElment | Object`。

我们可以直接传入 wrapper 的选择器。

```javascript
const chimee = new Chimee('#wrapper');
```

也可以传入一个节点。

```javascript
const wrapper = document.createElement('div');
const chimee = new Chimee(wrapper);
```

有的时候我们需要传入更多参数配置，我们可以传入一个对象。

```javascript
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: false,
  autoplay: true
});
```

具体的可选参数包括：

### wrapper

- 类型：`string | HTMLElment`
- 含义：Chimee 的容器
- 注意事项
  - 必选项

### type

- 类型：`string`
- 含义：播放类型
- 可选：`vod`（点播）和 `live`（直播）
- 默认：`vod`

### box

- 类型：`string`
- 含义：视频编码
- 可选：`flv`、`mp4`和`hls`
- 默认：会根据视频地址分配正确的编码方式，若无法从视频地址中获取所需的编码，则默认分配为`mp4`。

### runtimeOrder

- 类型：`Array<string>`
- 含义：播放器类型优先级，如`['html5', 'flash']`意味着优先使用 html5 播放器，在 html5 播放器无法兼容的情况下使用 flash 播放器。
- 可选：`html5`和`flash` 
- 默认：`['html5', 'flash']`

### plugin

- 类型：`Array<string | Object>`
- 含义：要使用的插件。
- 默认：`[]`

当我们安装一个插件后，我们可以直接在新建实例时传入其名称使用它，如下：

```javascript
import ui from 'chimee-plugin-ui';
import Chimee from 'chimee'
Chimee.install(ui);

const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [ui.name]
});
```

有的时候，我们希望给插件传入一些参数，我们可以在 plugins 中传入一个对象，该对象中必须要包含一个 name 属性。

```javascript
import ui from 'chimee-plugin-ui';
import Chimee from 'chimee'
Chimee.install(ui);

const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [{
    name: ui.name,
    theme: 'dark'
  }]
});
```

部分情况下，可能会出现插件名冲突的情况。又或者，你希望在该实例上重命名某个插件，这时候你可以利用重命名属性。

```javascript
import ui from 'chimee-plugin-ui';
import Chimee from 'chimee'
Chimee.install(ui);

const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [{
    name: ui.name,
    alias: 'myui'
  }]
});
```

插件间具有优先级关系，在 plugins 数组中，插件的优先级由高到低排列。

优先级高的插件将在事件处理机制中优先获得事件，因此可以阻截后方插件获取事件。

> 要理解插件的具体用法，请阅读[为什么要将 Chimee 设计成一个组件化框架？](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/why-chimee-is-a-frame.md)
>
> 要获知插件相关的 api， 请阅读[Chimee 插件 API 介绍](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md)

### video属性

除了以上几个用于 Chimee 内部使用的配置，我们还可以传入一些 video 元素需要用到的参数。

| 属性                      | 含义                             | 类型             | 默认值         | 备注                                       |
| ----------------------- | ------------------------------ | -------------- | ----------- | ---------------------------------------- |
| src                     | 播放地址                           | string         | ''          | 假如 `autoload` 为 `true`，则当我们设置 `src` 后，该地址会加载到 `video` 元素上，并作出相应加载。若果 `autoload` 为 `false`， 则意味着我们仅仅在 `videoConfig` 上设置了地址，此时可以手动调用 `load` 方法进行 |
| autoplay                | 是否自动播放                         | boolean        | false       | autoplay 指在分配 src 后自动播放，即调用`chimee.load()`后。 |
| controls                | 是否展示控制条                        | boolean        | false       | 在没有安装任何皮肤插件时，该属性控制是否展示原生控制条。若果安装了皮肤插件，则意味着是否展示皮肤自带的控制条。 |
| width                   | 宽度                             | number         | undefined   |                                          |
| height                  | 高度                             | number         | undefined   |                                          |
| crossorigin             | 是否跨域                           | boolean        | undefined   |                                          |
| loop                    | 是否循环                           | boolean        | false       |                                          |
| muted                   | 是否静音                           | boolean        | false       |                                          |
| preload                 | 是否预加载                          | boolean        | undefined   |                                          |
| poster                  | 封面                             | string         | ''          |                                          |
| playsinline             | 是否内联                           | boolean        | false       | 我们会为此添加 `playsinle="true" webkit-playsinline="true" x5-video-player-type="h5"` |
| xWebkitAirplay          | 是否添加 `x-webkit-airplay`        | boolean        | false       |                                          |
| x5VideoPlayerFullScreen | 是否添加`x5-video-play-fullscreen` | boolean        | false       |                                          |
| x5VideoOrientation      | ` x5-video-orientation`        | string \| void | undefined   | 可选 landscape 和 portrait                  |
| playbackRate            | 回放速率                           | number         | 1           | 大于1加速，小于1减速                              |
| defaultPlaybackRate     | 默认回放速率                         | number         | 1           | 大于1加速，小于1减速                              |
| autoload                | 设置`src`时是否进行自动加载               | boolean        | true        |                                          |
| defaultMuted            | 是否是默认静音                        | boolean        | false       | 对应于 video 上的 muted 标签                    |
| disableRemotePlayback   | 是否不展示远程回放标志                    | boolean        | false       | 对应于 video 上的  disableRemotePlayback 标签   |
| volume                  | 音量                             | number         | 原 video 的音量 |                                          |

> 注意
>
> 1）autoplay 属性在并不是在所有情况下都会生效。但是通过一些配置，我们可以使其在大部分模式下生效。
>
> 1. 在 iOS 下需要 inline 的模式下才能自动播放，因此在传入的时候需要设置 `inline: true`。我们会为你设置`playsinline="true" webkit-playsinline="true"`
> 2. 然而并不是所有 iOS 的 webview 都支持该模式，如果你的 iOS 版本比较旧，请检查 webView 上有否设置 `webview.allowsInlineMediaPlayback = YES;`
> 3. 在腾讯的 X5 浏览器也需要同理，设为 `inline: true`，我们会为你设置 `x5-video-player-type="h5"`
> 4. 部分浏览器必须要一开始就添加 video 元素，此时，请将 wrapper 的 html 写成如下格式。
>
> ```html
> <div id="wrapper">
>   <container>
>     <video></video>
>   </container>
> </div>
> ```
>
> 2）以上所有属性均可以在 chimee 实例上直接自上使用，如`this.src`。

## video 元素相关方法

> \* 前缀为 chimee 自定义方法

我们可以把 chimee 实例理解为 video 元素的子集映射。因此我们可以通过 chimee 实例直接操作video。而 chimee 上也有相应的 video 方法。

### load

- 类型：`Function`
- 参数
  - src
    - 类型：`string`
    - 含义：视频地址
    - 可选项

load 方法会将地址设置到 video 元素上。之后才能进行相应的播放。我们可以利用`load`完成如下需求。

如一开始未设地址，利用 load 添加地址。

```javascript
const chimee = new Chimee('#wrapper');
chimee.load('http://cdn.toxicjohann.com/lostStar.mp4');
```

或已设地址，利用 load 附着到 video 上。

```javascript
const chimee = new Chimee({
  wrapper: '#wrapper',
  src:'http://cdn.toxicjohann.com/lostStar.mp4'
});
chimee.load();
```

又或者运行时更换地址。

```javascript
const chimee = new Chimee('#wrapper');
chimee.load('http://cdn.toxicjohann.com/lostStar.mp4');
.....
chimee.load('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
```

### play

- 类型：`Function`

播放视频的函数。

### pause

- 类型：`Function`

暂停视频播放的函数

### seek

- 类型：`Function`
- 参数：
  - second
    - 类型：`number`
    - 含义：设置播放时间位置

`seek`函数本质等同于设置 video 上的 `currentTime`。一般用于快进后退。在 chimee 上也可以直接设置 `currentTime`，并不一定需要运用此函数。

### focus

自动聚焦到 `video` 元素上。

### \* fullscreen

- 类型：`Function`
- 参数：
  - flag
    - 类型：`boolean`
    - 含义是否需要全屏，`true`为全屏，`false`为退出全屏。
    - 默认：`true`
  - target
    - 类型：`string`
    - 全屏的对象，可选`video`、`container`和`wrapper`
    - 默认：`container`

全屏和退出全屏的相关操作。

> 关于全屏对象的设置可到[Chimee 插件 API 介绍中的 fullscreen 部分](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md)了解更多

### requestFullScreen

- 类型：`Function`
- 参数：
  - target
    - 类型：`string`
    - 全屏的对象，可选`video`、`container`和`wrapper`
    - 默认：`container

进入全屏

### exitFullScreen

- 类型：`Function`
- 参数：
  - target
    - 类型：`string`
    - 全屏的对象，可选`video`、`container`和`wrapper`
    - 默认：`container

退出全屏

### canPlayType

- 类型：`Function`
- 参数：
  - mediaType
    - 类型：`string`
    - 媒体 MIME 种类的字符串
- 返回
  - result
    - 类型：`string`
    - `'probably'`: The specified media type appears to be playable.
    - `'maybe'`: Cannot tell if the media type is playable without playing it.
    - `''` (empty string): The specified media type definitely cannot be played.

## video 元素相关属性

> \* 前缀为 chimee 自定义属性

我们可以把 chimee 实例理解为 video 元素的子集映射。因此我们可以通过 chimee 实例直接操作video。而 chimee 上也有相应的 video 属性。

### src

- 类型：`string`
- 含义：播放地址
- 默认：`''`
- 如果 `autoload` 属性为 `true`， 则设置地址后会进行加载。否则，则需要调用 `load` 方法进行加载。

默认情况下可以如此操作。

```javascript
const chimee = new Chimee('#wrapper');
chimee.src = 'http://cdn.toxicjohann.com/lostStar.mp4';
```

又或者自行手动加载。

```javascript
const chimee = new Chimee('#wrapper');
chimee.autoload = false;
chimee.src = 'http://cdn.toxicjohann.com/lostStar.mp4';
.....
chimee.load();
```

### \* type

- 类型：`string`
- 含义：播放类型
- 可选：`vod`（点播）和 `live`（直播）
- 只读属性

### \* box

- 类型：`string`
- 含义：视频编码
- 可选：`flv`、`mp4`和`hls`
- 只读属性

### \* runtimeOrder

- 类型：`Array<string>`
- 含义：播放器类型优先级，如`['html5', 'flash']`意味着优先使用 html5 播放器，在 html5 播放器无法兼容的情况下使用 flash 播放器。
- 只读属性

### buffered

- 类型：`TimeRanges`
- 含义：video 上的  buffered，代表已缓冲内容。
- 只读属性

### duration

- 类型：`number`
- 含义：video 上的 duration， 代表视频时长
- 只读属性

### volume

- 类型：`number`
- 含义：video 上的 volume，代表音量

### currentTime

- 类型：`number`
- 含义：video 上的  currentTime，代表播放位置，可用于快进后退 

### autoplay

- 类型：`boolean`
- 含义：是否自动播放
- 默认：`false`
- 注意：在部分浏览器中这个动态设定没有效果，详见video属性部分

### controls

- 类型：`boolean`
- 含义：是否展示控制条
- 默认：`false`
- 注意：如果安装了控制条插件，该方法可能会被插件所劫持。变为是否展示插件所制作的控制条。

### width

- 类型：`number | void`
- 含义：宽度
- 默认：`undefined`

### height

- 类型：`number | void`
- 含义：高度
- 默认：`undefined`

### crossorigin

- 类型：`string | void`
- 含义：宽度
- 默认：`undefined`

### loop

- 类型：`boolean`
- 含义：是否循环
- 默认：`false`

### defaultMuted

* 类型：`boolean`
* 含义：video 上的 muted 属性
* 默认： `false`

### muted

- 类型：`boolean`
- 含义： 代表是否静音
- 默认：`false`

### preload

- 类型：`string | void`
- 含义：视频的预加载策略
- 默认：`undefined`

### poster

- 类型：`string`
- 含义：视频封面
- 默认：`''`

### playsinline

- 类型：`boolean`
- 含义：是否内连播放，会添加相应的兼容属性，详细见上方 video 属性
- 默认：`false`

### x5VideoPlayerFullScreen

- 类型：`boolean`
- 含义：`x5-video-player-fullscreen`
- 默认：`false`

### x5VideoOrientation

- 类型：`string | void`
- 含义：`x5-video-orientation`，可选`landscape`和`protraint`
- 默认：`undefined`

### xWebkitAirplay

- 类型：`boolean`
- 含义：`x-webkit-airplay`
- 默认：`false`

### playbackRate

- 类型：`number`
- 含义：回放速率，1代表正常，大于1代表加速，小于1代表减速
- 默认：`1`

### defaultPlaybackRate

- 类型：`number`
- 含义：默认回放速率，1代表正常，大于1代表加速，小于1代表减速
- 默认：`1`

### disableRemotePlayback

* 类型：`boolean`
* 默认：`false`

## 事件监听相关方法

chimee 作为 video 的映射，自然也是可以监听 video 上的事件。包括 video 上的所有 video 事件和 dom 事件。我们提供了以下几个接口。

### on

- 含义：绑定事件监听
- 别名：addEventListener
- 参数：
  - key
    - 类型：`string`
    - 含义：事件名称
  - fn
    - 类型：`Function`
    - 含义：处理函数

> 利用 on 可以直接监听任何发生在 video 上的事件。
>
> 但是 video 只是 chimee 上的一部分。chimes 分为 wrapper, container, video 三个层级。
>
> 如果要监听 wrapper 上的事件，请添加前缀 w_
>
> 如果要监听 container 上的事件，请添加前缀 c_
>
> 要理解 chimee 的事件体系，请阅读[《为什么要将 Chimee 设计成一个组件化框架？》中的事件体系部分](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/why-chimee-is-a-frame.md)

### off

- 含义：解绑事件
- 别名：removeEventListener
- 参数：
  - key
    - 类型：`string`
    - 含义：事件名称
  - fn
    - 类型：`Function`
    - 含义：处理函数

### once

- 含义：绑定一次性事件监听
- 参数：
  - key
    - 类型：`string`
    - 含义：事件名称
  - fn
    - 类型：`Function`
    - 含义：处理函数

### emit

- 含义：触发一次由异步函数处理的事件
- 参数：
  - key
    - 类型：`string`
    - 含义：事件名称
  - 其余自定义参数

一般用于触发如 play， pause 等行为，和直接调用`play`、`pause`等方法一致。也可以利用此和插件进行沟通。

### emitSync

- 含义：触发一次由同步函数处理的事件
- 参数：
  - key
    - 类型：`string`
    - 含义：事件名称
  - 其余自定义参数

一般用于触发 dom 事件。

### 插件操作

在 chimee 中我们会使用插件来实现业务需求，因此我们要进行插件安装。在 chimee 上有以下几个方法。

### install

- 类型：`Function`
- 静态方法
- 含义：安装一个插件
- 参数：
  - config
    - 类型：`PluginConfig |Function`
    - 详细可查看[如何写插件](http://hzj.qihu.work/h5-videoplayer/esdoc/manual/tutorial/how-to-write-a-ui-plugin.html)

要使用一个插件，我们首先得利用该方法安装插件，要注意该方法是一个静态方法。

```javascript
import ui from 'chimee-plugin-ui';
import Chimee from 'chimee'
Chimee.install(ui);
```

### hasInstalled

- 类型：`Function`
- 静态方法
- 含义：检测一个插件是否已安装
- 参数：
  - name
    - 类型：`string`
    - 含义：插件名称
- 返回值
  - 类型： boolean

```javascript
import ui from 'chimee-plugin-ui';
import Chimee from 'chimee'
Chimee.install(ui);
Chimee.hasInstalled(ui.name); // true
Chimee.hasInstalled('something else'); // false
```

### uninstall

- 类型：`Function`
- 静态方法
- 含义：卸载插件
- 参数：
  - name
    - 类型：`string`
    - 含义：插件名称

> 卸载插件后，正在使用该插件的实例不受影响。卸载后新建的实例无法使用此插件。

### getPluginConfig

- 类型：`Function`
- 静态方法
- 含义：获取插件配置
- 参数：
  - name
    - 类型：`string`
    - 含义：插件名称
- 返回值
  - 类型：`PluginConfig | void |Function`

### use

- 类型：`Function`
- 含义：使用插件
- 参数：
  - option
    - 类型：`string | Object`
    - 含义：插件名称或插件选项

该函数其实就是新建实例时传入的 `plugin`选项所使用的方法。利用此函数可以动态安装插件。

```javascript
import ui from 'chimee-plugin-ui';
import danmu from 'chimee-plugin-danmu';
import Chimee from 'chimee'
Chimee.install(ui);
Chimee.install(danmu)

const chimee = new Chimee('#wrapper');
chimee.use(ui.name);
chimee.use({
  name: danmu.name,
  theme: 'white'
});
```

### unuse

- 类型：`Function`
- 含义：停用插件
- 参数：
  - name
    - 类型：`string`
    - 含义：插件名称

## 进阶使用

随着业务发展越来越复杂，我们会发现我们需要实现众多功能。这些功能彼此耦合关联，难以维护。这时候我们需要将功能模块化使用，那样便于我们进行灰度和 debug。此时我们需要使用 chimee 自身的插件体系。让我们进入下一部分，[为什么要将 Chimee 设计成一个组件化框架？](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/why-chimee-is-a-frame.md)。

