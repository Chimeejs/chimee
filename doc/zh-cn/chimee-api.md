# Chimee API 介绍

Chimee 本质上是对原生 video 元素的一个封装。因此在许多用法上都会和原生 video 元素一致。本文会介绍 Chimee 在 video 层级上的具体用法。

同时，Chimee 也是一个组件化框架，要理解这个框架的具体用法，请阅读[为什么要将 Chimee 设计成一个组件化框架？](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/why-chimee-is-a-frame.md)

本文将分为以下几个部分进行阐述：

* [生成实例](#生成实例)
* [video元素相关方法](#video元素相关方法)
* [video元素相关属性](#video元素相关属性)
* [container元素相关属性](#container元素相关属性)
* [事件监听相关方法](#事件监听相关方法)
* [数据监听相关方法](#数据监听相关方法)
* [全屏相关方法](#全屏相关方法)
* [全屏相关属性](#全屏相关属性)
* [插件操作](#插件操作)

## 生成实例

我们直接调用`new`就可以生成一个 Chimee 实例。这个实例中我们需要使用者提供一个 dom 节点，我们称之为 wrapper。因此，在构造函数里我们接受三种形式的参数——`string | HTMLElment | Object`。

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

### isLive

- 类型：`boolean`
- 含义：播放类型
- 可选：`false`（点播）和 `true`（直播）
- 默认：`false`

### box

- 类型：`string`
- 含义：视频编码
- 可选：`flv`、`native`和`hls`
- 默认：会根据视频地址分配正确的编码方式，若无法从视频地址中获取所需的编码，则默认分配为`native`。

### \* preset 🚫（v0.4.0 废弃，更改为 kernels）
- 类型: `Object`
- 含义: 播放器核心解码器。因为体积问题，chimee 默认仅支持原生播放器，如果需要支持其余解码方式请引入相应的解码器。
- 默认: `{}`

```javascript
import Flv from 'chimee-kernel-flv';
const player = new Chimee({
  src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  preset: {
    flv: Flv
  },
  // 编解码容器
  box: 'flv', // flv hls mp4
  // dom容器
  wrapper: '#wrapper',
  // video
  autoplay: true,
  controls: true
})
```

### \* kernels
- 类型: `Object`
- 含义: 播放器核心解码器。因为体积问题，chimee 默认仅支持原生播放器，如果需要支持其余解码方式请引入相应的解码器。
- 默认: `{}`

```javascript
import Flv from 'chimee-kernel-flv';
const player = new Chimee({
  src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  kernels: {
    flv: Flv
  },
  // 编解码容器
  box: 'flv', // flv hls mp4
  // dom容器
  wrapper: '#wrapper',
  // video
  autoplay: true,
  controls: true
})
```

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
  plugin: [ui.name]
});
```

有的时候，我们希望给插件传入一些参数，我们可以在 plugin 中传入一个对象，该对象中必须要包含一个 name 属性。

```javascript
import ui from 'chimee-plugin-ui';
import Chimee from 'chimee'
Chimee.install(ui);

const chimee = new Chimee({
  wrapper: '#wrapper',
  plugin: [{
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
  plugin: [{
    name: ui.name,
    alias: 'myui'
  }]
});
```

插件间具有优先级关系，在 plugin 数组中，插件的优先级由高到低排列。

优先级高的插件将在事件处理机制中优先获得事件，因此可以阻截后方插件获取事件。

> 要理解插件的具体用法，请阅读[为什么要将 Chimee 设计成一个组件化框架？](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/why-chimee-is-a-frame.md)
>
> 要获知插件相关的 api， 请阅读[Chimee 插件 API 介绍](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md)

### container (v0.5.0 后)

* 类型：`Object`
* 含义：和 `container` 相关的属性
* 默认：

```jso
{
  "width": "100%",
  "height": "100%",
  "position": "relative",
  "display": "block",
}
```

### video属性

除了以上几个用于 Chimee 内部使用的配置，我们还可以传入一些 video 元素需要用到的参数。

| 属性                      | 含义                             | 类型               | 默认值         | 备注                                       |
| ----------------------- | ------------------------------ | ---------------- | ----------- | ---------------------------------------- |
| src                     | 播放地址                           | string           | ''          | 假如 `autoload` 为 `true`，则当我们设置 `src` 后，该地址会加载到 `video` 元素上，并作出相应加载。若果 `autoload` 为 `false`， 则意味着我们仅仅在 `videoConfig` 上设置了地址，此时可以手动调用 `load` 方法进行 |
| autoplay                | 是否自动播放                         | boolean          | false       | autoplay 指在分配 src 后自动播放，即调用`chimee.load()`后。 |
| controls                | 是否展示控制条                        | boolean          | false       | 在没有安装任何皮肤插件时，该属性控制是否展示原生控制条。若果安装了皮肤插件，则意味着是否展示皮肤自带的控制条。 |
| width                   | video 的宽度                      | number \| string | '100%'      |                                          |
| height                  | video 的高度                      | number \| string | '100%'      |                                          |
| crossOrigin             | 是否跨域                           | boolean          | undefined   |                                          |
| loop                    | 是否循环                           | boolean          | false       |                                          |
| muted                   | 是否静音                           | boolean          | false       |                                          |
| preload                 | 是否预加载                          | boolean          | undefined   |                                          |
| poster                  | 封面                             | string           | ''          |                                          |
| playsInline             | 是否内联                           | boolean          | false       | 我们会为此添加 `playsinle="true" webkit-playsinline="true" x5-video-player-type="h5"` |
| xWebkitAirplay          | 是否添加 `x-webkit-airplay`        | boolean          | false       |                                          |
| x5VideoPlayerFullscreen | 是否添加`x5-video-play-fullscreen` | boolean          | false       |                                          |
| x5VideoOrientation      | ` x5-video-orientation`        | string \| void   | undefined   | 可选 landscape 和 portrait                  |
| playbackRate            | 回放速率                           | number           | 1           | 大于1加速，小于1减速                              |
| defaultPlaybackRate     | 默认回放速率                         | number           | 1           | 大于1加速，小于1减速                              |
| autoload                | 设置`src`时是否进行自动加载               | boolean          | true        |                                          |
| defaultMuted            | 是否是默认静音                        | boolean          | false       | 对应于 video 上的 muted 标签                    |
| disableRemotePlayback   | 是否不展示远程回放标志                    | boolean          | false       | 对应于 video 上的  disableRemotePlayback 标签   |
| volume                  | 音量                             | number           | 原 video 的音量 |                                          |

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

## video元素相关方法

> \* 前缀为 chimee 自定义方法

我们可以把 chimee 实例理解为 video 元素的子集映射。因此我们可以通过 chimee 实例直接操作video。而 chimee 上也有相应的 video 方法。

### load

**参数**
- src
  - 类型：`string`
  - 含义：视频地址
  - 可选项
- option
  - 类型：`Object`
  - 当你需要播放不同格式的视频流的时候，你需要使用不同的编码器。因此你需要告知我们你需要使用不同的编码器。此时我们会为你生成新的编码器并切换视频。
    - isLive
      - 类型：`boolean`
      - 是否是直播
    - box
      - 类型：`string`
      - 编码器类型：`native`、`flv`、`hls`
    - kernels
      - 类型：`Object`
      - 新的编码器

load 方法会将地址设置到 video 元素上。之后才能进行相应的播放。我们可以利用`load`完成如下需求。

如一开始未设地址，利用 load 添加地址。

```javascript
import Chimee from 'chimee';
const chimee = new Chimee('#wrapper');
chimee.load('http://cdn.toxicjohann.com/lostStar.mp4');
```

或已设地址，利用 load 附着到 video 上。

```javascript
import Chimee from 'chimee';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src:'http://cdn.toxicjohann.com/lostStar.mp4'
});
chimee.load();
```

又或者运行时更换地址。

```javascript
import Chimee from 'chimee';
const chimee = new Chimee('#wrapper');
chimee.load('http://cdn.toxicjohann.com/lostStar.mp4');
.....
chimee.load('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
```

甚至是播放不同类型的视频。

```javascript
import Chimee from 'chimee';
import ChimeeKernelFlv from 'chimee-kernel-flv';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src:'http://cdn.toxicjohann.com/lostStar.mp4',
  autoplay: true
});
...
chimee.load('http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv', {
  box: 'flv',
  kernels: {
    flv: ChimeeKernelFlv
  }
})
```

> load 方法会触发 load 系列事件，你可以通过插件 `beforeLoad` 阻截或挂起事件，也可以通过`load`事件阻止冒泡等。要了解更多相关知识，可以阅读[插件的事件机制](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md#%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6)。

### play

播放视频的函数。

> play 方法会触发 play 系列事件，你可以通过插件 `beforePlay` 阻截或挂起事件，也可以通过`play`事件阻止冒泡等。要了解更多相关知识，可以阅读[插件的事件机制](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md#%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6)。

### pause

暂停视频播放的函数

> pause 方法会触发 pause 系列事件，你可以通过插件 `beforePasue` 阻截或挂起事件，也可以通过`pause`事件阻止冒泡等。要了解更多相关知识，可以阅读[插件的事件机制](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md#%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6)。

### seek

**参数**
- second
  - 类型：`number`
  - 含义：设置播放时间位置

`seek`函数本质等同于设置 video 上的 `currentTime`。一般用于快进后退。在 chimee 上也可以直接设置 `currentTime`，并不一定需要运用此函数。

> seek 方法会触发 seek 系列事件，你可以通过插件 `beforeSeek` 阻截事件，也可以通过`seek`事件阻止冒泡等。要了解更多相关知识，可以阅读[插件的事件机制](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md#%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6)。

### focus

自动聚焦到 `video` 元素上。

### canPlayType

**参数**
- mediaType
  - 类型：`string`
  - 媒体 MIME 种类的字符串

**返回**
- result
  - 类型：`string`
  - `'probably'`: The specified media type appears to be playable.
  - `'maybe'`: Cannot tell if the media type is playable without playing it.
  - `''` (empty string): The specified media type definitely cannot be played.

### \* $silentLoad

静默加载视频。视频在规定时间内加载成功，则无缝切换视频源，多用于清晰度切换。

若视频加载失败可进行重试。

无缝切换的本质是，在后台打开一个新视频源并加载到约定时间，当主视频播放到约定时间后进行切换。

**参数**

* src
  * 类型：`string`
  * 播放地址
* option
  * 类型：`Object`
  * duration
    * 类型：`number`
    * 默认：3
    * 单次视频加载的时长
    * 若在规定的时间段内加载不成功，则放弃此次任务。
    * 单位为秒，对应于主视频的播放时间，也就是说若主视频暂停播放，则时间停滞，但加载仍继续。
  * bias
    * 类型：`number`
    * 默认：0
    * 偏差区间，单位为秒
    * 若该值小于等于0，则在主视频播放到或超过约定时间点直接切换，若新视频加载失败，则放弃此次切换。
    * 若该值大于0，则当主视频播放到约定时间偏差区间里，一旦视频加载成功就切换。若超出偏差空间，则放弃此次切换。
  * repeatTimes
    * 类型：`number`
    * 默认：0
    * 重复次数
    * 若加载视频失败，则自动重新加载，直至重复次数耗尽。默认不重复加载。
  * increment
    * 类型：`number`
    * 默认：0
    * 每次重复时递增的时间，单位为秒
    * 一般而言加载失败都是因为超时加载失败，故每次重复的时候应相应延长加载时间。每次重复加载都会相应叠加该值对应的时间。
  * isLive
    * 类型：`boolean`
    * 默认：原主视频设定
    * 是否是直播
  * box
    * 类型：`boolean`
    * 默认：原主视频设定
    * 编解码容器
  * kernels
    * 类型：`Object`
    * 默认：原主视频设定
    * 预设的解码器
  * abort
    * 类型：`Object`
    * 默认：`false`
    * 是否放弃本次加载，当该值为 `true` 时，将放弃本次视频加载。
  * immediate
    * 类型：`Object`
    * 默认：`false`
    * 新视频加载成功后是否立即切换无需等待到约定时间。

我们可以利用 `$silentLoad` 完成以下需求。

1. 无缝切换同种视频

```javascript
import Chimee from 'chimee';
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  autoplay: true
});
player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
```

2. 多次尝试切换

```javascript
import Chimee from 'chimee';
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  autoplay: true
});
player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', {repeatTimes: 5, increment: 2});
```

在上例中，若加载失败将会重试多达四次。每次尝试时间分别是3、5、7、9、11秒。

3. 切换不同种类的视频

```javascript
import Chimee from 'chimee';
import chimeeKernelFlv from 'chimee-kernel-flv';
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  autoplay: true
});
player.$silentLoad('http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv', {
  box: 'flv',
  kernels: {
    flv: chimeeKernelFlv
  }
});
```

4. 加载途中放弃

```javascript
import Chimee from 'chimee';
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  autoplay: true
});
const option = {};
player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
...
option.abort = true;
```

## video元素相关属性

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

### \* isLive

- 类型：`boolean`
- 含义：播放类型
- 可选：`false`（点播）和 `true`（直播）
- 只读属性

### \* box

- 类型：`string`
- 含义：视频编码
- 可选：`flv`、`native`和`hls`
- 只读属性

### \* preset 🚫（v0.4.0废弃，请不要修改）
- 类型: `Object`
- 含义: 播放器核心解码器。因为体积问题，chimee 默认仅支持原生播放器，如果需要支持其余解码方式请引入相应的解码器。
- 默认: `{}`

```javascript
import Flv from 'chimee-kernel-flv';
const player = new Chimee({
  src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  preset: {
    flv: Flv
  },
  // 编解码容器
  box: 'flv', // flv hls mp4
  // dom容器
  wrapper: '#wrapper',
  // video
  autoplay: true,
  controls: true
})
```

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

- 类型：`number | string | void`
- 含义：video 的宽度
- 默认：`100%`

### height

- 类型：`number | string | void`
- 含义：video 的高度
- 默认：`100%`

### crossOrigin

- 类型：`string | void`
- 含义：是否跨域
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

### playsInline

- 类型：`boolean`
- 含义：是否内连播放，会添加相应的兼容属性，详细见上方 video 属性
- 默认：`false`

### x5VideoPlayerFullscreen

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

## container元素相关属性

在 v0.5.0 后，chimee 提供入口直接操作 container 的配置。

现在提供四个 css 样式，分别为 `width`, `height`, `display`, `block`.

你可以采取如下方式直接更改 container 的宽度

```javascript
import Chimee from 'chimee';
const chimee = new Chimee({
  wrapper: '#wrapper',
});
chimee.container.width = '90%';
```

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

## 数据监听相关方法

###$watch

$watch 可用于监听特定属性的变化。当属性变化时，会执行传入的回调函数，回调函数会接收到新的属性值和原属性值。

**参数**

- key
  - `string | Array<string>`
  - 用于查找特定属性值，仅接受用 `.` 分割的字符串。
- handler
  - `Function`
  - 当产生变化的时候会执行的函数
  - 接受两个参数 `newVal` 和 `oldVal`，分别代表新旧属性值。但是在 `deep` 模式下对子元素的修改不会保存两份快照。
- option
  - `Object`
  - 可选项
  - 内容包括
    - deep
      - `boolean`
      - 是否深度监听，可用于监听 `Object` 和 `Array` 内部变量的变化。但是某些情况下需要配合`$set` 和`$del`使用
      - 默认为`false`
    - diff
      - `boolean`
      - 是否需要比对。如果为 `false`，只要有对属性的相关设置就会执行回调函数。
      - 默认为`true`
    - other
      - `Object | Array<*>`
      - 在寻找属性的时候，一般会从所在实例本身上寻找，加入需要监听其他实例的属性，可以穿入该参数。
      - 默认为`undefined`
    - proxy
      - `boolean`
        - 在做深度监听的时候我们会发现，对于新添加的元素或删除已知元素无法监听。因此我们需要使用`$set`和`$del`触发行为。事实上，[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 可以帮助我们解决这个问题。如果设定 proxy 为 `true`， 我们可以随意操作对象。
        - 但是由于[浏览器的支持度不佳](http://caniuse.com/#search=proxy)，我们不推荐在生产环境下使用。

 **返回**

- unwatch
  - `Function`
  - 函数用于解绑监听函数，执行后，变化不会再调用回调函数

**例子：**

你可以轻易监听 video 上的一些属性。

```javascript
import Chimee from 'chimme';
const player = new Chimee({
  wrapper: 'body',
  plugin: ['plugin']
});
player.$watch('controls', (newVal, oldVal) => console.log(newVal, oldVal));
player.controls = true; // true, false
```

又或者自定义属性：

```javascript
import Chimee from 'chimme';
const player = new Chimee({
  wrapper: 'body',
  plugin: ['plugin']
});
player.test = 1;
player.$watch('test', (newVal, oldVal) => console.log(newVal, oldVal));
player.test = 2; // 2, 1
```

你也可以深度监听数组，直接调用数组的操作方法：

```javascript
import Chimee from 'chimme';
const player = new Chimee({
  wrapper: 'body',
  plugin: ['plugin']
});
player.test = [1, 2, 3];
player.$watch('test', (newVal, oldVal) => console.log(newVal, oldVal), {deep: true});
player.plugin.test.push(4); // [1, 2, 3, 4], [1, 2, 3, 4]
```

同理你也可以深度监听对象，但是对新增元素或者删除元素需要使用 `$set` 和 `$del` 进行辅助。

```javascript
import Chimee from 'chimme';
const player = new Chimee({
  wrapper: 'body',
  plugin: ['plugin']
});
player.test = {foo: 1};
player.$watch('test', (newVal, oldVal) => console.log(newVal, oldVal), {deep: true});
player.plugin.test.foo = 2; // {foo: 2}, {foo: 2}
player.$set(test, 'bar', 1); // {foo: 2, bar: 1}, {foo: 2, bar: 1}
player.$del(test, 'bar'); // {foo: 2}, {foo: 2}
```

> 注意：
>
> 1. 并非所有 video 相关属性都可以监听。现阶段只支持监听[$videoConfig](#videoConfig) 中除`src` 以外的部分。
>
> `src` 的值因为涉及到 video 播放核心的变换，以及事件拦截等，建议采取事件驱动模式编写。
>
> `paused` 等 video 只读属性，因为需要监听原生 video，故暂不提供。且以上属性大部分可以通过事件获取。
>
> 1. 采取深度监听时，子元素修改后回调函数并不会获得原有对象快照
> 2. 深度监听时需要使用 `$set` 和 `$del` 进行辅助。

### $set

设置对象或者数组的值， 可以触发`$watch` 的回调函数

**参数**

- obj
  - `Object | Array` 
  - 目标对象
- property
  - `string`
  - 属性名
- value
  - `any`
  - 属性值

### $del

删除对象或者数组的值， 可以触发`$watch` 的回调函数

**参数**

- obj
  - `Object | Array` 
  - 目标对象
- property
  - `string`
  - 属性名

## 全屏相关方法

### \* $fullscreen

- 别名：`fullscreen`
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

> 关于全屏对象的设置可到[Chimee 插件 API 介绍中的插件位置部分](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md#%E6%8F%92%E4%BB%B6%E4%BD%8D%E7%BD%AE)了解更多

### requestFullscreen

- 类型：`Function`
- 参数：
  - target
    - 类型：`string`
    - 全屏的对象，可选`video`、`container`和`wrapper`
    - 默认：`container`

进入全屏

### exitFullscreen

- 类型：`Function`
- 参数：
  - target
    - 类型：`string`
    - 全屏的对象，可选`video`、`container`和`wrapper`
    - 默认：`container`

退出全屏

## 全屏相关属性

### isFullscreen

* 类型：`boolean`
* 含义：是否全屏
* 可使用 `$watch` 监听

若实例中的任意一个子节点全屏，则返回 `true`。 

### fullscreenElement

* 类型：`HTMLElement | string | void`
* 含义：现在全屏的对象
* 可使用 `$watch` 监听

如果全屏的是 `container`、`wrapper`、`video` 三者之一，则直接返回字符串。

否则返回正在全屏的对象。

若无全屏则为 `undefined`

## 插件操作

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

