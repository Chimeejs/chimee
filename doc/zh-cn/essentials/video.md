# chimee 的播放器特性

chimee 作为一款播放器框架，其本质仍然是一个播放器。所以我们首先学习如何将其当作一个播放器使用。

## 点播播放器

生成一个 chimee 播放器实例十分简单。我们只需要传入一个 dom 节点即可。当然你也可以传入一个可以获取到 dom 节点的选择器。

假设我们的页面上有一个 id 为 wrapper 的节点。我们可以这么编写。

```javascript
import Chimee from 'chimee';
const chimee = new Chimee('#wrapper');
```

紧接着我们传入一个地址并播放之。

```javascript
chimee.load('http://cdn.toxicjohann.com/lostStar.mp4');
chimee.play();
```

这样我们就实现了一个简单的点播播放器。

## 直播播放器

在直播需求如此强烈的今天，直播播放器也是必不可少的。 chimee 也具有直播能力，不过需要我们安装一些编解码器。我们以常见的 m3u8 直播为例讲解下使用方式。

### 移动端

因为大部分的移动端都具有播放 m3u8 的能力，所以如果你是使用 m3u8 进行直播，只要增加多一个选项就好了。 

> chimee 在生成的时候支持使用 Object 的格式传入多个参数，可以[点击链接](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/api/chimee-api.md#%E7%94%9F%E6%88%90%E5%AE%9E%E4%BE%8B)了解更多。

```javascript
import Chimee from 'chimee';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://xxxx.m3u8',
  isLive: true,
});
```

`isLive` 参数会告知底层编码器这个流是直播流。部分 ui 插件也会根据这个值作出不同的行为。

### PC 端

PC 端因为本身没有 m3u8 能力，所以我们需要使用 [chimee-kernel-hls](https://github.com/Chimeejs/chimee-kernel-hls) 进行编解码。 Chimes-kernel-hls 是对 [hls.js](https://github.com/video-dev/hls.js/) 的二次封装。

> 我们通过 `kernels` 选项引入解码器，可以[点解链接](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#-kernels)了解更多。

```javascript
import Chimee from 'chimee';
import ChimeeKernelHls from 'chimee-kernel-hls';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://xxxxx.m3u8',
  isLive: true,
  kernels: {
    hls: ChmeeKernelHls,
  },
});
```

## 播放操作

单个视频的播放操作主要包括播放、暂停、快进。在 chimee 上的调用也是非常简单的。

我们直接调用对应的函数就好了。

```javascript
...
chimee.play(); // 播放
chimee.pause(); // 暂停
chimee.seek(20); // 跳转到第 20 秒
...
```

## 动态加载视频

在常见的业务中，我们播放的视频源一般都不止一个。所以我们也支持在生命周期切换视频源。

如果我们是相同类型的视频源，我们只要直接更改 `src` 属性或者利用 `load` 函数即可。

```javascript
// 通过 src 更改调整视频源
chimee.src = 'http://cdn.toxicjohann.com/lostStar.mp4';

// 通过 load 方法更改视频源
chimee.load('http://cdn.toxicjohann.com/lostStar.mp4');
```

在某些业务场景下，我们甚至会在一个页面内播放不同的视频源。在不同的视频源间，我们也支持动态切换，但我们需要传入更多的必要参数。

假设我们的页面正在播放 mp4 的视频源，现在要切换到 flv 视频源，我们利用下述代码进行模拟。

```javascript
import Chimee from 'chimee';
import ChimeeKernelFlv from 'chimee-kernel-flv';

const chimee = new Chimee({
  wrapper: '#wrapper',
  src:'http://cdn.toxicjohann.com/lostStar.mp4',
  autoplay: true,
});

// 三秒后进行视频切换
setTimeout(() => {
  chimee.load({
    src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  	box: 'flv',
  	kernels: {
      flv: {
      	handler: ChimeeKernelFlv,
      	stashSize: 1000 * 1000 * 1024,
      },
    },
  });
}, 3000);
```

在上述模拟中我们在切换的时候才传入编解码器，其实我们也可以预先安装编解码器。

```javascript
import Chimee from 'chimee';
import ChimeeKernelFlv from 'chimee-kernel-flv';

const chimee = new Chimee({
  wrapper: '#wrapper',
  src:'http://cdn.toxicjohann.com/lostStar.mp4',
  autoplay: true,
  kernels: {
    flv: {
      handler: ChimeeKernelFlv,
      stashSize: 1000 * 1000 * 1024,
    },
  },
});

// 三秒后进行视频切换
setTimeout(() => {
  chimee.load({
    src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  	box: 'flv',
  });
}, 3000);
```

> 动态加载主要依赖于 load 进行实现，[点击此处](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#load)了解更多。

## 静默动态加载视频

load 函数有一个缺点，他在加载的时候会移除掉原视频源。在某些场景下，我们希望原视频源能够正常播放，知道新视频源加载成功后才进行对应的切换。像切换清晰度就是常见的场景。

所以 chimee 提供了 silentLoad 方法以满足需求，我们以以下代码为例。

```javascript
import Chimee from 'chimee';
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  autoplay: true
});
player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
```

某些场景下我们的网络状况不是很好，此时我们可以增加多几次尝试。

```javascript
import Chimee from 'chimee';
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  autoplay: true
});
player.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', {repeatTimes: 5, increment: 2});
```

> 同样的 silentLoad 也支持多类型切换。并且可以设置重试机制。[点击此处](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#-silentload)了解更多。

## 播放器属性

我们在 chimee 上也可以直接操作播放器的属性。因为属性较多，就不一一列举了，大家可以前往 [api 文档](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#video%E5%85%83%E7%B4%A0%E7%9B%B8%E5%85%B3%E6%96%B9%E6%B3%95)进行观看。

以上就是 chimee 和播放器相关的一些介绍，感谢你的阅读。