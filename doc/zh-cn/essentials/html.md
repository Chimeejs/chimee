# chimee 的展示

这章我们来了解下 chimee 的展示结构以及相关的功能。

chimee 的展示结构分为三个部分：wrapper、container 和 video。

他们依次包裹，结构如下：

```html
<section id="wrapper">
  <container style="z-index: 1; width: 100%; height: 100%; position: relative; display: block;">
    <video tabindex="-1" controls="" width="100%" height="100%" preload="auto" src="http://cdn.toxicjohann.com/lostStar.mp4">
    </video>
  </container>
</section>
```

其中，插件分为内层插件和外层插件。而它们的位置如下：

```html
<section id="wrapper">
  <container style="z-index: 1; width: 100%; height: 100%; position: relative; display: block;">
    <video tabindex="-1" controls="" width="100%" height="100%" preload="auto" src="http://cdn.toxicjohann.com/lostStar.mp4">
    </video>
    <!-- 内层插件所在位置 -->
  </container>
  <!-- 外层插件所在位置 -->
</section>
```

一般而言，我们会将内层插件视为播放器中的一部分，例如控制条、播放器弹窗、弹幕等。

而外层插件则并一般指播放器列表等。

以上就是 chimee 的基本展示结构。

## 全屏策略

当我们进行全屏的时候，我们采取的是对对应 div 进行 fullscreen。

我们默认采取的是对 container 进行全屏。

只需要简单调用即可。

```javascript
player.$fullscreen();
```

如果要退出全屏则传入 false。

```javascript
player.$fullscreen(false);
```

