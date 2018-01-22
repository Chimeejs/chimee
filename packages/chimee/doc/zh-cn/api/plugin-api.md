# 关于插件

在开发自己的播放器的时候，我们最常用的就是插件。我们可以通过插件自定义各种操作和逻辑，从而打造出一款易用的播放器。

本文会深度介绍插件的原理。包括以下几部分。

- [什么是插件](#什么是插件)
- [生命周期](#生命周期)
- [插件位置](#插件位置)
- [透明插件](#透明插件)
- [穿透插件](#穿透插件)
- [事件机制](#事件机制)
- [video事件](#video事件)
- [video的DOM事件](#video的DOM事件)
- [video元素相关方法](#video元素相关方法)
- [video元素相关属性](#video元素相关属性)
- [container元素相关属性](#container元素相关属性)
- [$attr](#$attr)
- [$css](#$css)
- [$bumpToTop](#$bumpToTop)
- [$watch](#watch)
- [全屏相关方法](#全屏相关方法)
- [全屏相关属性](#全屏相关属性)
- [pluginConfig参数](#pluginConfig参数)
- [插件属性](#插件属性)
- [插件方法](#插件方法)
- [插件用法](#插件用法)


## 什么是插件

插件是 Chimee 播放器中的一部分。它具有以下特性。

- 拥有内置在播放器的 DOM 部分
- 能够对原生 video 的属性进行操作
- 能够对原生 video 的样式进行操作
- 能够调用原生 video 方法
- 能够获取到播放器的关键数据
- 能够阻截用户或者其余插件的请求

通过插件的解耦，我们能够将业务上的新功能模块化，便于我们进行灰度发布或者测试等操作。

## 生命周期

插件的生命周期比较简单，包括如下几个部分：

- [beforeCreate](#beforeCreate)
- [create](#create)
- [init](#init)
- [inited](#inited)
- [destroy](#destroy)

### beforeCreate

插件创建前的生命周期，如果开发者有提供 beforeCreate 函数，则会调用之。

此钩子函数会获得两个参数

- config: `Object` 插件自身的一些基本配置
  - events
  - data
  - computed
  - methods
- option：用户传入配置

一般可以在这个钩子中动态修改一些配置，例如增加事件绑定

```javascript
function beforeCreate (config) {
  config.events[this.newKey] = this.newHandler;
}
```

### create

插件创建的生命周期。在此阶段，播放器会进行以下操作：

1. 将 `methods` 中定义的方法绑定至实例上。
2. 绑定`events`中所指定的事件。
3. 将`data`中的数据绑定到实例上。
4. 将`computed`中的计算属性绑定到实例上。
5. 为该插件申请 DOM 节点，并绑定在`$dom`上。
6. 根据用户设置和插件初始化设置设定该插件的`$operable`和`$level`值。
7. 将用户传入的阐述绑定到`$config`上。
8. 执行开发者自定义的`create`函数。

故在`create`函数中，我们可以：

1. 利用 `this`直接调用自己设置的方法
2. 利用 `this`直接使用自己设置的参数
3. 通过`$on`和`$off`动态绑定／解绑事件， 通过`$emit`触发事件。
4. 从`$config`中获取用户设置
5. 通过`$attr`获取现时 video, container 和 wrapper 的参数值，但是由于初始化进行中，故该值获取意义不大。
6. 可以通过`$css`**获取或设置** video, container 和 wrapper 的参数值，对于一些需要添加loading 样式的需求可以满足。
7. 通过`$dom`获得本插件所拥有的 DOM 节点，可以进行相关的初始化。

但是需要注意的是：

1. 不能控制 **$level** 值
2. 不能使用`$attr`操作 video 等部分的属性值。但是该函数可以调用，调用会延迟到初始化后才知行。
3. 该函数是个同步函数，与 ready 初始化无关。

create 周期的主要任务是初始化插件。**在此阶段尽量不要对 video, container 和 wrapper 进行操作**。

### init

此阶段会进行播放器的初始化，所有在此阶段前被安装使用的插件将会被触发相应的 `init`  函数。

> 若果插件在播放器生成后才动态安装，则不会触发此生命周期函数，而直接跳转至[inited](#inited)。

在 `init` 函数阶段插件将会获得用户对整个播放器的配置（不包括其余插件的配置）。插件可以根据该配置进行相应的特殊初始化。插件可以对此作相应更改。此期间的任何更改都不会直接写入到 video 实例上。

此后，插件可以使用 `$attr`操作 video， container 和 wrapper的值。

我们可以通过以下三种方式修改相关设置

1. 从 init 接受的参数中直接更改 videoConfig

```javascript
function init (config) {
  config.controls = false;
}
```

2. 直接操作实例上的参数

```javascript
function init (config) {
  this.controls = false;
}
```

3. 通过 $videoConfig 操作参数

```javascript
function init (config) {
  this.$videoConfig.controls = false;
}
```

#### inited

此时原生 player 已经初始化完毕，所有插件均已创建。开发者可以在此生命周期里执行一些自定义操作。

同时，该函数支持**异步**操作。开发者可以在函数末尾返回 Promise。当且仅当所有函数执行完毕（即同步函数 return 和异步函数返回的 Promise 状态变为 resolved 后），整个播放器才进入 ready 状态。

```javascript
async function inited () {
  await doSomethingAsync()
}
```

在播放器实例化时，当所有插件都安装完毕后，ready 后会触发 ready 事件。

如果该插件是异步安装，则不会收到该事件。

### destroy

当用户移除插件或者整个播放器销毁的时候触发。

作为销毁时的钩子函数。

## 插件位置

插件位置主要涉及以下几个问题

- [节点位置](#节点位置)
- [层级位置](#层级位置)

### 节点位置

需要了解的是，一般播放器都具有全屏的需求。而如果直接全屏原生 video 组件，那么诸如弹幕、控制条等内容都会丢失，并且会展现原播放器的控制条。

因此，一般我们采取将外层 div 全屏的策略。但是考虑到并非所有插件都需要全屏（例如外部列表）。我们引入了外层插件和内层插件的概念。

层级概念如下

- wrapper 【播放器最外层】
  - container 【播放器容器】
    - video 【原生播放器】
    - inner-plugin 【内层插件】
  - outer-plugin 【外层插件】

在开发插件时，开发者可以主动注明属于何层插件，详细注明方式见参数相关介绍。由于 inner 属性的特殊性一经声明不能更改。

- 当`inner`为 true 时，为内层插件。
- 当`inner`为 false 时， 为外层插件
- 默认`inner` 为 true

### 层级位置

另外一个比较重要的是插件层摆放的层级。因为较高的层级会遮挡较低的层级，不利于后者交互。现时播放器内部会主动设置相应的插件的层级，使用 z-index 进行相应设置。

设置的顺序依据如下：

#### 用户安装插件的顺序

用户越早安装的插件，层级数越低。

可以理解为，后期安装的插件相当于直接 append 到相应父节点上。

#### level值的设置

level值较高者的层级位置永远在level值较低者之上。

因为插件的安装顺序与插件事件执行顺序有关。因此对于某些插件必须要有先安装。但是该插件仍然需要显示在顶层。此时应该使用较高的level值。

> 此需求最常见发生在广告插件上。因为广告需要阻截其他插件的事件处理，所以应该优先安装。但是广告同时要与周边交互，所以level值应该较高。

level 值可以由用户设置、插件默认设置或插件内部通过 `$level` 动态设置。

> 事实上并不鼓励插件自定义 level 值， 那样会造成用户使用的时候混乱。
>
> 但是万一插件需要置顶怎么办，此时调用 $bumpToTop 即可。

另外相关的知识点

- 层级的排序在内层与外层的排序互不干扰。
- 内层基准点为原生 video 元素。
- 外层基准点为 container 元素。
- 当 level 值低于 0 时，其层级低于基准点层级。
  - 可以利用此特性可以制作如毛玻璃背景的效果。
- 当 level 值大于 0 时，其层级高于基准点层级。

## 透明插件

部分插件我们会尽可能置顶，但是其本身并没有任何交互，如台标，logo等。

为了方便大家制作此类插件，我们引入了透明插件的概念，其本质为 CSS 特性`pointer-events: none;`。

通过 operable 选项进行设置，或者插件内部通过 `$operable` 进行动态设置。

- operable 为 true 等价于 `pointer-events: auto`。
- operable 为 false 等价于 `pointer-events: none`。

## 穿透插件

还有一种插件在大部分情况下他不需要进行页面交互，此时它附着在 video 层上方，行为与透明插件无异。但某种情况下，他具有一定的交互能力。如弹幕和送礼。

为了方便开发者开发此类插件，我们增加了穿透属性 penetrate 。当一个插件为穿透插件时，所有冒泡到其外层的事件都会视为发生在 video 元素本身的事件，从而作相应的转发。

例如，当一个穿透元素被点击时，如果元素内部没有组织点击事件冒泡，则视为点击在 video 元素上。

> 因为该特殊属性，在播放器中，会认为**穿透插件是原生 video 的一部分**。
>
> 常见的 mouseenter事件，当鼠标移入穿透插件时，会认为移入 video 中， 从而广播 mouseenter 事件。
>
> 若果时从穿透插件移入 video 中，穿透插件的 mouseleave 事件和 video  元素的 mounter 均不会被广播。 

因为穿透插件的特殊性， penetrate **只允许开发者主动声明**，且不允许更改。

- penetrate 为 true 则为穿透插件
- penetrate 为 false 则为普通插件。
- 默认为 false

## 事件机制

### 可用方法

在插件上可以调用的事件函数

- $on 绑定事件
- $off 解绑事件
- $once 一次性绑定事件
- $emit 触发事件
- $emitSync 触发事件，以同步的方式 

### 监听对象

利用上述方法进行事件监听，监听的对象均为原生 video 对象。

有的时候我们需要监听 container 和 wrapper 的相关事件，此时我们需要在事件名称上添加前缀。

如：

- c_mousemove， 在 container 上绑定 mousemove 事件
- w_mousemove， 在 wrapper 上绑定 mouse move 事件

> 官方提供的事件绑定方法主要目的是搭建插件间沟通桥梁，和插件对 video, container, wrapper 三者的监听。
>
> 当然大家可以自定义相关事件，只要不涉及到相应保留前缀即可。

### 事件触发流程

鉴于插件间，插件和 video 间没有层级关系，不提供不捕获监听选项。

但是插件间仍然会存在逻辑关系。故在播放器事件内部仍然有相应的事件逻辑。

#### 异步事件

一个完整的事件流程包括以下几部分

假设我们使用 `$emit` 触发了事件 play

- 首先触发 beforePlay 事件， 进入 before 阶段。
  - 各个插件收到 beforePlay 事件，进行相应的处理，如果返回的是 false 或者 Promise.reject()， 则事件被阻截。
  - 如果返回的是处于 pending 状态的 Promise， 则可以理解为事件被挂起。
- 如果 before 流程顺利执行完毕，则进入 process 阶段。
  - 此时内部会判断是否是对 video 进行操作。
  - 若是，则执行该操作，等待触发的相应事件，然后进入 main 阶段
  - 否则，直接进入 main 阶段
  - 在本例中，play 是原生 video 操作，此时我们会触发 video.play()。并在原生 video 的 play 事件触发后继续原流程。
- 进入 main 阶段后，会执行各插件的 play 事件。
  - 插件同样可以利用上述方式挂起或阻截。一般而言，如播放广告的时候，广告会将相应事件阻截，防止造成后者误会。
- main 阶段结束后，则进入 after 阶段，执行各插件的 afterPlay 事件。
  - 同上，after 阶段也可以使用上述方式进行阻截或者挂起操作。从而模拟相应的逻辑关系。
- 最后，进入副作用阶段，执行各插件的 _play 事件。
  - 该事件只要事件流程进入过 main 阶段就必定会触发。
  - 该事件为广播同步分发，没有阻截等概念。
  - 该事件一般用于获取自己的事件是否触发成功和被拦截，一般插件无需使用。

#### 同步事件

以上为异步事件流程，其有几大弊端。

1. 异步，导致理解上有部分困难
2. 异步，故不能执行 event.stopPropagation() 和 event.preventDefault() 事件

因此，和 DOM 有关的操作，我们建议使用 `$emitSync`事件。

与异步流程相同，也分为相应的五个阶段，假设我们使用 `$emitSync` 触发了 sync 事件。

- before => beforeClick
  - 假如插件返回 false， 则可以阻截事件发生。因为同步，无法挂起事件
- processor => video.click()
- main => click
  - 插件会收到原生的事件对象
  - 插件可以调用 event.preventDefault() 阻止原生默认事件
  - 插件可以调用 event.stopPropagation() 阻止原生 DOM 节点的冒泡
  - 插件可以返回 false 阻止插件间的冒泡，并阻截事件进入下个阶段
- after => afterClick
  - 插件会收到原生的事件对象
  - 插件可以调用 event.preventDefault() 阻止原生默认事件
  - 插件可以调用 event.stopPropagation() 阻止原生 DOM 节点的冒泡
  - 插件可以返回 false 阻止插件间的冒泡，并阻截事件进入下个阶段
- sideEffect => _click
  - 插件会收到原生的事件对象
  - 插件可以调用 event.preventDefault() 阻止原生默认事件
  - 插件可以调用 event.stopPropagation() 阻止原生 DOM 节点的冒泡
  - 此阶段只要事件进入 main 阶段就必定会触发。
  - 此阶段不能阻止插件间冒泡。

> 注意，因为同步的优势，一般发生在 video 上的 DOM 事件，都会以同步的方式传输回来。
>
> 换言之，假如我们进行如下操作
>
> ```Javascript
> this.$emit('click'); // 理解为模拟对 video 的点击
> ```
>
> 1. 首先会触发异步的 before 事件
> 2. 进入 process 阶段，点击 video
> 3. video 返回 click 事件，使用同步（triggerSync）的方式传播，分别触发，click, (afterClick), _click事件。

> 注意，processor **只会**处理 video 上的事件。
>
> 换言之`this.$emitSync('click')` 会触发 `video.click()`， 而`this.$emitSync('c_click')`并不会触发 `container.click()` 

## video事件

因为要兼顾到各种容器，顾 video 上的事件可能与我们日常有所不同。

- abort
- canplay
- canplaythrough
- durationchange
- emptied
- encrypted
- ended
- error
- interruptbegin
- interruptend
- loadeddata
- loadedmetadata
- loadstart
- mozaudioavailable
- **pause**
  - 当使用 `this.$emit('pause')`时，会触发 `video.pause()`
- **play**
  - 当使用`this.$emit('play')`时，会触发`video.play()`
- playing
- progress
- ratechange
- seeked
- seeking
- stalled
- suspend
- timeupdate
- volumechange
- waiting
- **load**
  - 非原生事件
  - 使用`this.$emit('load');`会触发`video.load()`
  - 假如传人参数 url, `this.$emit('load', url)`，则相当于替换地址然后触发播放。
- **seek**
  - 非原生事件
  - `this.currentTime = number` 会触发次事件
  - 需要传入数字参数作为时间
  - 可使用`this.$emit`触发。

## video的DOM事件

其实与正常无异。不过有一点需要注意的是。由于穿透性插件的存在，该事件未必发生在原生 video 上。因此不要通过事件对象去获取 dom。

## video元素相关方法

> \* 前缀为 chimee 自定义方法

我们可以把插件实例理解为 video 元素的子集映射。因此我们可以通过插件实例直接操作video。而插件上也有相应的方法和属性。

#### load

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

load 方法会将地址设置到 video 元素上。之后才能进行相应的播放。

#### play

播放视频的函数。

#### pause

暂停视频播放的函数

#### seek

**参数**
- second
  - 类型：`number`
  - 含义：设置播放时间位置

`seek`函数本质等同于设置 video 上的 `currentTime`。一般用于快进后退。在 chimee 上也可以直接设置 `currentTime`，并不一定需要运用此函数。

#### focus

自动聚焦到 `video` 元素上。

#### \* $fullscreen

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

> 关于全屏对象的设置可到插件介绍部分了解更多

#### requestFullscreen

- 类型：`Function`
- 参数：
  - target
    - 类型：`string`
    - 全屏的对象，可选`video`、`container`和`wrapper`
    - 默认：`container

进入全屏

#### exitFullscreen

- 类型：`Function`
- 参数：
  - target
    - 类型：`string`
    - 全屏的对象，可选`video`、`container`和`wrapper`
    - 默认：`container

退出全屏

#### canPlayType

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

### * $silentLoad

静默加载视频。视频在规定时间内加载成功，则无缝切换视频源，多用于清晰度切换。

若视频加载失败可进行重试。

无缝切换的本质是，在后台打开一个新视频源并加载到约定时间，当主视频播放到约定时间后进行切换。

**参数**

- src
  - 类型：`string`
  - 播放地址
- option
  - 类型：`Object`
  - duration
    - 类型：`number`
    - 默认：3
    - 单次视频加载的时长
    - 若在规定的时间段内加载不成功，则放弃此次任务。
    - 单位为秒，对应于主视频的播放时间，也就是说若主视频暂停播放，则时间停滞，但加载仍继续。
  - bias
    - 类型：`number`
    - 默认：0
    - 偏差区间，单位为秒
    - 若该值小于等于0，则在主视频播放到或超过约定时间点直接切换，若新视频加载失败，则放弃此次切换。
    - 若该值大于0，则当主视频播放到约定时间偏差区间里，一旦视频加载成功就切换。若超出偏差空间，则放弃此次切换。
  - repeatTimes
    - 类型：`number`
    - 默认：0
    - 重复次数
    - 若加载视频失败，则自动重新加载，直至重复次数耗尽。默认不重复加载。
  - increment
    - 类型：`number`
    - 默认：0
    - 每次重复时递增的时间，单位为秒
    - 一般而言加载失败都是因为超时加载失败，故每次重复的时候应相应延长加载时间。每次重复加载都会相应叠加该值对应的时间。
  - isLive
    - 类型：`boolean`
    - 默认：原主视频设定
    - 是否是直播
    - 若是直播，则默认使用 immediate 模式
  - box
    - 类型：`boolean`
    - 默认：原主视频设定
    - 编解码容器
  - kernels
    - 类型：`Object`
    - 默认：原主视频设定
    - 预设的解码器
  - abort
    - 类型：`Object`
    - 默认：`false`
    - 是否放弃本次加载，当该值为 `true` 时，将放弃本次视频加载。
  - immediate
    - 类型：`Object`
    - 默认：`false`
    - 新视频加载成功后是否立即切换无需等待到约定时间。

我们可以利用 `$silentLoad` 完成以下需求。

1. 无缝切换同种视频

```javascript
this.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
```

2. 多次尝试切换

```javascript
this.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', {repeatTimes: 5, increment: 2});
```

在上例中，若加载失败将会重试多达四次。每次尝试时间分别是3、5、7、9、11秒。

3. 切换不同种类的视频

```javascript
this.$silentLoad('http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv', {
  box: 'flv',
  kernels: {
    flv: chimeeKernelFlv
  }
});
```

4. 加载途中放弃

```javascript
const option = {};
this.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', option);
...
option.abort = true;
```

## video元素相关属性

> \* 前缀为 chimee 自定义属性

我们可以把插件实例理解为 video 元素的子集映射。因此我们可以通过插件实例直接操作video。而插件上也有相应的 video 属性。

### src

- 类型：`string`
- 含义：播放地址
- 默认：`''`
- 如果 `autoload` 属性为 `true`， 则设置地址后会进行加载。否则，则需要调用 `load` 方法进行加载。

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

### \* preset 🚫(v0.4.0废弃，请使用 kernels )
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
- 默认: `undefined`

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

有的时候我们需要为 kernel 配置单独的参数。这个时候我们可以用如下方式传入参数。

```javascript
import Flv from 'chimee-kernel-flv';
const player = new Chimee({
  src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  kernels: {
    flv: {
      handler: Flv,
      stashSize: 1000 * 1000 * 1024,
    },
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
- 含义：宽度
- 默认：`undefined`

### loop

- 类型：`boolean`
- 含义：是否循环
- 默认：`false`

### defaultMuted

- 类型：`boolean`
- 含义：video 上的 muted 属性
- 默认： `false`

### muted

- 类型：`boolean`
- 含义： 代表是否静音
- 默认：`false`

### preload

- 类型：`string`
- 含义：视频的预加载策略
- 默认：`auto`
- 可选项： `'auto'`, `'metadata'`, `'none'`, `''`

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

- 类型：`boolean`
- 默认：`false`

> 还有更多属性可以直接获取，如下
>
> buffered, currentSrc, duration, error, ended, networkState, paused, readyState, seekable, sinkId, controlsList, tabIndex, dataset, offsetHeight, offsetLeft, offsetParent, offsetTop, offsetWidth
>
> 如果你需要的属性没有暴露，可以通过 [issue](https://github.com/Chimeejs/chimee/issues) 向我们反映。

## container元素相关属性

在 v0.5.0 后，chimee 提供入口直接操作 container 的配置。

现在提供四个 css 样式，分别为 `width`, `height`, `display`, `block`.

你可以采取如下方式直接更改 container 的宽度

```javascript
this.container.width = '90%';
```

##$attr

$attr 允许我们操作 video, container, wrapper 的属性。

默认操作的是 video。可以在第一个参数传入 'container'， 'wrapper'， 'video'更改操作对象。

## $css

$css 允许我们操作 video, container, wrapper 的样式。

默认操作的是 video。可以在第一个参数传入 'container'， 'wrapper'， 'video'更改操作对象。

## $bumpToTop

置顶函数。调用该方法，你的插件的 level 值将会移至最顶。

## $watch

$watch 可用于监听特定属性的变化。当属性变化时，会执行传入的回调函数，回调函数会接收到新的属性值和原属性值。

**参数**
* key
  * `string | Array<string>`
  * 用于查找特定属性值，仅接受用 `.` 分割的字符串。
* handler
  * `Function`
  * 当产生变化的时候会执行的函数
  * 接受两个参数 `newVal` 和 `oldVal`，分别代表新旧属性值。但是在 `deep` 模式下对子元素的修改不会保存两份快照。
* option
  * `Object`
  * 可选项
  * 内容包括
    * deep
      * `boolean`
      * 是否深度监听，可用于监听 `Object` 和 `Array` 内部变量的变化。但是某些情况下需要配合`$set` 和`$del`使用
      * 默认为`false`
    * diff
      * `boolean`
      * 是否需要比对。如果为 `false`，只要有对属性的相关设置就会执行回调函数。
      * 默认为`true`
    * other
      * `Object | Array<*>`
      * 在寻找属性的时候，一般会从所在实例本身上寻找，加入需要监听其他实例的属性，可以穿入该参数。
      * 默认为`undefined`
    * proxy
      * `boolean`
        * 在做深度监听的时候我们会发现，对于新添加的元素或删除已知元素无法监听。因此我们需要使用`$set`和`$del`触发行为。事实上，[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 可以帮助我们解决这个问题。如果设定 proxy 为 `true`， 我们可以随意操作对象。
        * 但是由于[浏览器的支持度不佳](http://caniuse.com/#search=proxy)，我们不推荐在生产环境下使用。

 **返回**

* unwatch
  * `Function`
  * 函数用于解绑监听函数，执行后，变化不会再调用回调函数

**例子：**

你可以轻易监听 video 上的一些属性。

```javascript
import Chimee from 'chimme';
const plugin = {
  name: 'plugin',
  create () {
    this.$watch('controls', (newVal, oldVal) => console.log(newVal, oldVal));
  }
}
Chimee.install(plugin);
const player = new Chimee({
  wrapper: 'body',
  plugin: ['plugin']
});
player.controls = true; // true, false
```

又或者自定义属性：

```javascript
import Chimee from 'chimme';
const plugin = {
  name: 'plugin',
  data: {
    test: 1
  }
  create () {
    this.$watch('test', (newVal, oldVal) => console.log(newVal, oldVal));
  }
}
Chimee.install(plugin);
const player = new Chimee({
  wrapper: 'body',
  plugin: ['plugin']
});
player.plugin.test = 2; // 2, 1
```

你也可以深度监听数组，直接调用数组的操作方法：

```javascript
import Chimee from 'chimme';
const plugin = {
  name: 'plugin',
  data: {
    test: [1, 2, 3]
  }
  create () {
    this.$watch('test', (newVal, oldVal) => console.log(newVal, oldVal), {deep: true});
  }
}
Chimee.install(plugin);
const player = new Chimee({
  wrapper: 'body',
  plugin: ['plugin']
});
player.plugin.test.push(4); // [1, 2, 3, 4], [1, 2, 3, 4]
```

同理你也可以深度监听对象，但是对新增元素或者删除元素需要使用 `$set` 和 `$del` 进行辅助。

```javascript
import Chimee from 'chimme';
const plugin = {
  name: 'plugin',
  data: {
    test: {
      foo: 1
    }
  }
  create () {
    this.$watch('test', (newVal, oldVal) => console.log(newVal, oldVal), {deep: true});
  }
}
Chimee.install(plugin);
const player = new Chimee({
  wrapper: 'body',
  plugin: ['plugin']
});
player.plugin.test.foo = 2; // {foo: 2}, {foo: 2}
player.$set(test, 'bar', 1); // {foo: 2, bar: 1}, {foo: 2, bar: 1}
player.$del(test, 'bar'); // {foo: 2}, {foo: 2}
```

>注意：
>
>1. 并非所有 video 相关属性都可以监听。现阶段只支持监听[$videoConfig](#videoConfig) 中除`src` 以外的部分。
>
>`src` 的值因为涉及到 video 播放核心的变换，以及事件拦截等，建议采取事件驱动模式编写。
>
>`paused` 等 video 只读属性，因为需要监听原生 video，故暂不提供。且以上属性大部分可以通过事件获取。
>
>2. 采取深度监听时，子元素修改后回调函数并不会获得原有对象快照
>3. 深度监听时需要使用 `$set` 和 `$del` 进行辅助。

## 全屏相关方法

### * $fullscreen

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

- 类型：`boolean`
- 含义：是否全屏
- 可使用 `$watch` 监听

若实例中的任意一个子节点全屏，则返回 `true`。 

### fullscreenElement

- 类型：`HTMLElement | string | void`
- 含义：现在全屏的对象
- 可使用 `$watch` 监听

如果全屏的是 `container`、`wrapper`、`video` 三者之一，则直接返回字符串。

否则返回正在全屏的对象。

若无全屏则为 `undefined`

## PluginConfig参数

开发者开发插件时可以设定的参数

### name

- 类型： `string`
- 含义：插件名称

### level

- 类型：`number`
- 默认：0
- 含义：插件的层级，数值越高层级越高。
- 注意事项
  - 该值会被用户设置的 level 值所覆盖
  - 该值可以在插件内部使用 `$level`动态更改。

### opearable

- 类型：`boolean`
- 默认：`true`
- 含义：该插件是否为可操作插件，若为`true`，则可正常操作，若为`false`，则为透明插件。
- 注意事项
  - 该值会被用户设置的 operable 值所覆盖。
  - 可通过`$operable`动态更改

### penetrate

- 类型：`boolean`
- 默认：`false`
- 含义：该插件是否为穿透插件
- 注意事项：
  - 该值一经设定无法更改。
  - 可通过`$penetrate`获取

### inner

- 类型：`boolean`
- 默认：`true`
- 含义：是否为内层插件
- 注意事项：
  - 该值一经设定无法更改
  - 可通过`$inner`获取

### autoFocus

- 类型：`boolean | undefined`
- 默认：`undefined`
- 含义：点击该插件时是否会自动聚焦到 video 上。
- 注意事项：
  - 当该值为 `undefined`时，内层插件会自动聚焦，外层插件不会
  - 该值一经设定无法更改
  - 可通过`$autoFocus`获取

### el

- 类型：`string | HTMLElement | undefined`
- 默认：`undefined`
- 含义：该插件所申请的 dom 节点
- 注意事项
  - 若该值为 `undefined`，则 Chimee 会生成一个 div 容器用于放置插件。
  - 若该值为字符串，则 Chimee 会以将字符串合法化并生成一个自定义元素。
  - 若该值为`HTMLElement`节点，则 Chimee 会将该节点移至合适位置。
  - 可通过`$dom`动态获取该元素

### className

- 类型：`string | Array<string> | undefined`
- 默认：`undefined`
- 含义：该插件 dom 节点的 class 初始值
- 注意事项
  - 可传入字符串组成的数组
  - 可传入一个字符串，多个类以空格分开

### beforeCreate

- 类型：`Function | undefined`
- 默认：`undefined`
- 含义：beforeCreate 的生命周期钩子
- 注意事项：
  - 该函数是同步执行的
  - 该函数会获得部分插件配置
    - events
    - data
    - computed
    - methods
  - 该插件会获得用户配置

### create

- 类型：`Function | undefined`
- 默认：`undefined`
- 含义：create 的生命周期钩子
- 注意事项：
  - 该函数是同步执行的

### init

- 类型：`Function | undefined`
- 默认：`undefined`
- 含义：init 的生命周期钩子
- 注意事项
  - 该函数会获得 videoConfig （视频初始化参数）
  - 该函数**不一定会被触发**
    - 若该插件是在播放器生成后再进行安装，则不会执行此函数。
  - 该函数是同步执行的

### inited

- 类型：`Function | undefined`
- 默认：`undefined`
- 含义：inited 的生命周期钩子
- 注意事项
  - 该函数可异步执行
  - 若该函数不返回 Promise, 则视作插件安装完毕。 `ready` 变更为 `resolved` 状态， `readySync` 变更为 `true`。
  - 若该函数返回 Promise，则`ready`值即为该 Promise。 

### destroy

- 类型：`Function | undefined`
- 默认：`undefined`
- 含义：destroy 的声明钩子

### events

- 类型：`{[string]: Function}`
- 默认：`undefined`
- 含义：批量绑定事件的语法糖。
- 注意事项：
  - 该参数可在 beforeCreate 的钩子中获得并更改

### data

- 类型：`Object`
- 默认：`undefined`
- 含义：将以上参数动态绑定到示例中的语法糖

### computed

- 类型：`{[string]: Function | {get?: Function,  set?: Function}}`
- 默认：`undefined`
- 含义：将以上方法以 getter / setter 的模式绑定

### methods

- 类型：`{[string]: Function}`
- 默认：`undefined`
- 含义：将以上函数绑定到实例上的语法糖
- 注意事项：
  - 以上函数一经绑定将会永远锁定该插件实例，无法更改

## 插件属性

以下属性可以直接在插件实例上获取

### ready

- 类型：`Promise<*>`
- 含义：标志该插件是否安装完毕。安装完毕后会置为 `resolved` 的状态

### readySync

- 类型：`boolean`
- 含义：标志该插件是否安装完毕。安装完毕后会置为 `true`

### $dom

- 类型：`HTMLElement`
- 含义：插件所拥有的 dom 节点

### $wrapper

* 类型：`HTMLElement`
* 不建议使用，wrapper 对应的 DOM 节点

### $container

- 类型：`HTMLElement`
- 不建议使用，container 对应的 DOM 节点

### $video

- 类型：`HTMLVideoElement`
- 不建议使用，video 对应的 DOM 节点

### $level

- 类型：`number`
- 含义：插件的层级优先值
- 注意事项
  - 可动态设置

### $operable

- 类型：`boolean`
- 含义：插件是否可操作
- 注意事项
  - 可动态设置

### $config

- 类型：`Object`
- 含义：用户对该插件的参数设置

### $videoConfig

- 类型： `Object`
- 含义：播放器的参数设置

| 属性                      | 含义                             | 类型               | 默认值       | 备注                                       |
| ----------------------- | ------------------------------ | ---------------- | --------- | ---------------------------------------- |
| src                     | 播放地址                           | string           | ''        | 假如 `autoload` 为 `true`，则当我们设置 `src` 后，该地址会加载到 `video` 元素上，并作出相应加载。若果 `autoload` 为 `false`， 则意味着我们仅仅在 `videoConfig` 上设置了地址，此时可以手动调用 `load` 方法进行 |
| autoplay                | 是否自动播放                         | boolean          | false     | autoplay 指在分配 src 后自动播放，即调用`chimee.load()`后。 |
| controls                | 是否展示控制条                        | boolean          | false     | 在没有安装任何皮肤插件时，该属性控制是否展示原生控制条。若果安装了皮肤插件，则意味着是否展示皮肤自带的控制条。 |
| width                   | video 的宽度                      | number \| string | '100%'    | 支持数字、百分比或像素值。在大部分浏览器下，数字和`px`值一致，其余单位没有效果，建议尽量使用数字。且该属性优先级较低，会被 CSS 值覆盖。建议谨慎使用。 |
| height                  | video 的高度                      | number \| string | '100%'    | 支持数字、百分比或像素值。在大部分浏览器下，数字和`px`值一致，其余单位没有效果，建议尽量使用数字。且该属性优先级较低，会被 CSS 值覆盖。建议谨慎使用。 |
| crossOrigin             | 是否跨域                           | boolean          | undefined |                                          |
| loop                    | 是否循环                           | boolean          | false     |                                          |
| muted                   | 是否静音                           | boolean          | false     |                                          |
| preload                 | 是否预加载                          | string           | auto      |                                          |
| poster                  | 封面                             | string           | ''        |                                          |
| playsInline             | 是否内联                           | boolean          | false     | 我们会为此添加 `playsinle webkit-playsinline x5-playsinline` |
| xWebkitAirplay          | 是否添加 `x-webkit-airplay`        | boolean          | false     |                                          |
| x5VideoPlayerFullscreen | 是否添加`x5-video-play-fullscreen` | boolean          | false     |                                          |
| x5VideoOrientation      | ` x5-video-orientation`        | string \| void   | undefined | 可选 landscape 和 portrait                  |
| x5VideoPlayerType       | ` x5-video-player-type`        | 'h5' \| void     | undefined |                                          |
| playbackRate            | 回放速率                           | number           | 1         | 大于1加速，小于1减速                              |
| defaultPlaybackRate     | 默认回放速率                         | number           | 1         | 大于1加速，小于1减速                              |
| autoload                | 设置`src`时是否进行自动加载               | boolean          | true      |                                          |
| defaultMuted            | 是否是默认静音                        | boolean          | false     | 对应于 video 上的 muted 标签                    |
| disableRemotePlayback   | 是否不展示远程回放标志                    | boolean          | false     | 对应于 video 上的  disableRemotePlayback 标签   |
| volume                  | 音量                             | number           | 1         |                                          |

> 注意
>
> 1）autoplay 属性在并不是在所有情况下都会生效。但是通过一些配置，我们可以使其在大部分模式下生效。
>
> 1. 在 iOS 下需要 inline 的模式下才能自动播放，因此在传入的时候需要设置 `inline: true`。我们会为你设置`playsinline="true" webkit-playsinline="true"`
> 2. 然而并不是所有 iOS 的 webview 都支持该模式，如果你的 iOS 版本比较旧，请检查 webView 上有否设置 `webview.allowsInlineMediaPlayback = YES;`
> 3. 在腾讯的 X5 浏览器也需要同理，设为 `inline: true`，我们会为你设置 `x5-playsinline`
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

### $inner

- 类型：`boolean`
- 含义：是否内层插件
- 只读属性

### $autoFocus

- 类型：`boolean`
- 含义：是否可自动聚焦到 video
- 只读属性

### $penetrate

- 类型：`boolean`
- 含义：是否穿透型插件
- 只读属性

### $plugins

- 类型：`Object`
- 含义：所有插件实例的集合
- 注意事项
  - 只读属性，不可作任何删除、改写或增加操作，否则会导致播放器运行不正常。
  - 可以通过此属性查找其他插件，但应减少此类操作，尽量使用事件沟通。

### $pluginsOrder

- 类型：`Array<string>`
- 含义：插件执行的顺序
- 注意事项：
  - 只读属性，不可作任何删除、改写或增加操作，否则会导致播放器运行不正常。
  - 可以通过此属性查看自己的优先级，了解事件会被谁拦截等。

### VERSION

- 类型：`string`
- 含义：播放器版本
- 只读属性

> 以下设置均是与 video 元素属性相关的属性。可以在任意阶段直接设置。
>
> 但是在 beforeCreate, create, init 阶段进行设置并不会立即设定到 video 元素上，因为此阶段还没生成 video 元素。但是会在生成 video 元素后立即设定。

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

## 插件方法

### $css

查询或设置 wrapper、video 或 container 的样式。

参数

- element【可选】
  - 类型：`string`
  - 默认：video
  - 可选项：video、wrapper、container
- attribute 【必选】
  - 类型：`string`
  - 含义：属性名
- value 【可选】
  - 类型：`any`
  - 含义：属性值

用法

```javascript
// 查询
this.$css('width');

// 设置
this.$css('width', 100);
```

### $attr

具体用法与 $css 一致

### $fullscreen

详情见[全屏](#全屏)章节

### $watch

详情见[$watch](#watch)章节

### $set

设置对象或者数组的值， 可以触发`$watch` 的回调函数

**参数**

* obj
  * `Object | Array` 
  * 目标对象
* property
  * `string`
  * 属性名
* value
  * `any`
  * 属性值

### $del

删除对象或者数组的值， 可以触发`$watch` 的回调函数

**参数**

- obj
  - `Object | Array` 
  - 目标对象
- property
  - `string`
  - 属性名

### $bumpToTop

置顶函数。调用该方法，你的插件的 level 值将会移至最顶。

### $on

绑定事件

- key 事件名
- fn 绑定行数

### $off

解绑事件，参数与$on一致

### $once

一次性监听，参数与 $on 一致

### $emit

触发事件，事件函数会被 Promise 包裹。

### $emitSync

触发事件，事件函数均会被同步执行

### $throwError

框架报错专用，将会被  errorHandler 处理。

## 基本应用

首先我们要编写一个符合 PluginConfig 约定的插件配置，然后通过 `Chimee.install` 注册到播放器类上：

```javascript
const pluginConfig = {
	name: 'myplugin',
	el: '<div>我的第一个插件</div>'
};
Chimee.install(pluginConfig);
```

接下来在实例化播放器的时候，便可以通过 option 设置或主动 'use' 来使播放器实例具有该UI组件功能。

```javascript
const chimee1 = new Chimee({
  wrapper: '#wrapper',
  plugins: [pluginConfig.name]
});
const chimee2 = new Chimee({
  wrapper: '#wrapper'
});
chimee2.use(pluginConfig.name);
```

> 要了解如看编写与使用弹窗组件，[请看这里](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/how-to-write-a-popup-plugin.md)。

