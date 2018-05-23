# 插件的使用

chimee 是一个简单的框架。如果需要让 chimee 发挥更强的能力，我们需要插件。本章将会介绍如何使用插件。

## 什么是插件

插件是 chimee 中的一部分，他主要用于解耦业务逻辑，方便功能模块化。它具有以下特性。

- 拥有内置在播放器的 DOM 部分
- 能够对原生 video 的属性进行操作
- 能够对原生 video 的样式进行操作
- 能够调用原生 video 方法
- 能够获取到播放器的关键数据
- 能够阻截用户或者其余插件的请求

如果你想详细了解插件，可以阅读 [plugin api](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/api/plugin-api.md)。

如果你想了解如何编写插件，可以阅读[如何编写一个插件](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/advanced/how-to-write-a-plugin.md)。

## 安装插件

在使用插件前，我们需要安装他。那样可以让我们多个 chimee 实例生成对应的插件实例。

安装方法十分简单，我们调用 Chimee 的静态方法 `install` 即可。

安装后我们可以使用 `hasInstalled` 方法进行检验。

```javascript
import popup from 'chimee-plugin-popup';
import Chimee from 'chimee'
Chimee.install(popup);
Chimee.hasInstalled(popup.name); // true
```

## 使用插件

安装了插件之后我们就可以使用它了。

### 声明式调用

我们可以在新建实例时进行声明式调用。

```javascript
import Chimee from 'chimee';
import ChimeePluginControlbar from 'chimee-plugin-controlbar';

// 安装插件
Chimee.install(ChimeeControlbar);
const player = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  autoplay: true,
  // 使用插件
  plugin: [
    ChimeePluginControlbar.name // 或者 'chimeeControl'
  ],
});
```

这样子这个实例就会使用 chimee-plugin-controlbar 这个插件。

### 动态调用

我们也可以在实例化后动态调用插件。

下面我们将演示如何动态使用一个中间弹窗组建。

```javascript
import Chimee from 'chimee';
import chimeePluginPopup from 'chimee-plugin-popup';

Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '这是一个居中信息框',
  body: '这里是信息内容',
  offset: '50% 50%',
  width: '200px',
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  autoplay: true,
  controls: true,
  muted: true,
});

setTimeout(() => {
  player.use('cc_popup');
}, 2000);
```

效果如下，我们可以看到两秒后，弹窗动态出现。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fnni232iogg30o20d2q89.gif)

### 传入配置

部分插件自身也会有对应的配置，我们可以在使用的时候通过一个对象参数传入。

```javascript
import Chimee from 'chimee';
import ChimeePluginDanmu from 'chimee-plugin-danmu';

// 安装插件
Chimee.install(chimeeDanmu);
const player = new Chimee({
  // ...
  // 使用插件
  plugin: [{
    name: ChimeePluginDanmu.name,
    mode: 'canvas',
  }],
});
```

## 停用及卸载

我们可以使用 unuse 停用插件，并使用 uninstall 卸载之。

```javascript
import Chimee from 'chimee';
import ChimeePluginControlbar from 'chimee-plugin-controlbar';

// 安装插件
Chimee.install(ChimeeControlbar);
const player = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  autoplay: true,
  // 使用插件
  plugin: [
    ChimeePluginControlbar.name // 或者 'chimeeControl'
  ],
});

// 停用插件
player.unuse(ChimeePluginControllbar.name);
.uninstall(ChimeePluginControllbar.name);
```

> 如果我们未停用插件就卸载插件。正在使用插件的实例不会受影响，但是卸载后新建的实例无法使用此插件。

## 获取插件

安装的插件我们可以通过 `$plugins` 直接获得。

```javascript
import Chimee from 'chimee';
import ChimeePluginControlbar from 'chimee-plugin-controlbar';

// 安装插件
Chimee.install(ChimeeControlbar);
const player = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  autoplay: true,
  // 使用插件
  plugin: [
    ChimeePluginControlbar.name // 或者 'chimeeControl'
  ],
});

const chimeePluginControllbar = play.$plugins[ChimeePluginControlbar.name];
```

其中插件的是以对象的方式存储，我们可以通过其 id 获取。

id 一般是 name 的驼峰形式。

id 会在 use 的时候返回。

## 插件的使用顺序问题

我们可以看到在声明式使用插件的时候，我们传入的是一个数组。数组中插件的顺序与后期的插件的一些顺序也有关。

### 层级顺序

用户越早安装的插件，层级越低。我们用一个例子体会一下。

```javascript
import Chimee from 'chimee';
import chimeePluginPopup from 'chimee-plugin-popup';

Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '第一个信息框',
  body: '我是第一个信息框',
  offset: '60% 50%',
  width: '200px',
}));

Chimee.install(chimeePluginPopup({
  name: 'cc_popup_2',
  title: '第二个信息框',
  body: '我是第二个信息框',
  offset: '50% 50%',
  width: '300px',
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [ 'cc_popup', 'cc_popup_2' ],
  autoplay: true,
  controls: true,
  muted: true,
});
```

我们执行这段代码，可以看到第二个信息框叠在第一个信息框上。这证明第二个信息框的层次比第一个信息框要高。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fnnzklyj6vj30n40d3t91.jpg)

那么假如我们第二个信息框是动态添加的呢？我们修改一下代码。

```javascript
import Chimee from 'chimee';
import chimeePluginPopup from 'chimee-plugin-popup';

Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '第一个信息框',
  body: '我是第一个信息框',
  offset: '60% 50%',
  width: '200px',
}));

Chimee.install(chimeePluginPopup({
  name: 'cc_popup_2',
  title: '第二个信息框',
  body: '我是第二个信息框',
  offset: '50% 50%',
  width: '300px',
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [ 'cc_popup' ],
  autoplay: true,
  controls: true,
  muted: true,
});

setTimeout(() => {
  player.use('cc_popup_2');
}, 2000);
```

我们可以看到第二个信息框依然覆盖在第一个信息框上。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fnnzp9fs79g30nw0cqgs0.gif)

这是因为动态添加的插件比声明式添加的插件顺序靠后，所以他们的层次相对较高。

### 事件分发顺序

chimee 的 plugin 具有事件拦截功能，所以事件分发的顺序也尤其重要。我们继续利用 popup 进行模拟。

首先我们先模拟正常行为。

```javascript
import Chimee from 'chimee';
import chimeePluginPopup from 'chimee-plugin-popup';

Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '第一个信息框',
  body: '我是第一个信息框',
  offset: '60% 50%',
  width: '200px',
  events: {
    pause() {
      this.close();
    },
  },
}));

Chimee.install(chimeePluginPopup({
  name: 'cc_popup_2',
  title: '第二个信息框',
  body: '我是第二个信息框',
  offset: '50% 50%',
  width: '300px',
  events: {
    pause() {
      this.close();
    },
  },
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [ 'cc_popup', 'cc_popup_2' ],
  autoplay: true,
  controls: true,
  muted: true,
});
```

以上代码会在暂停的时候关闭弹窗。

![](https://ws4.sinaimg.cn/large/006tNc79gy1fnpspa3a6lg30p20ecu13.gif)

下面我们再修改一下代码，在第一个弹窗插件中对 pause 事件进行拦截。

```javascript
import Chimee from 'chimee';
import chimeePluginPopup from 'chimee-plugin-popup';

Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '第一个信息框',
  body: '我是第一个信息框',
  offset: '60% 50%',
  width: '200px',
  events: {
    pause() {
      this.close();
      // 插件中的拦截机制
      return false;
    },
  },
}));

Chimee.install(chimeePluginPopup({
  name: 'cc_popup_2',
  title: '第二个信息框',
  body: '我是第二个信息框',
  offset: '50% 50%',
  width: '300px',
  events: {
    pause() {
      this.close();
    },
  },
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [ 'cc_popup', 'cc_popup_2' ],
  autoplay: true,
  controls: true,
  muted: true,
});
```

我们可以看到第一个弹窗关闭了，但是第二个弹窗并没有消失。这时候我们可以假设第一个插件拦截了第二个插件的暂停事件。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fnpsq0kf4wg30p20echdw.gif)

为了验证我们的假设是否正确，我们这次在第二个弹窗处拦截事件。

```javascript
import Chimee from 'chimee';
import chimeePluginPopup from 'chimee-plugin-popup';

Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '第一个信息框',
  body: '我是第一个信息框',
  offset: '60% 50%',
  width: '200px',
  events: {
    pause() {
      this.close();
      // 插件中的拦截机制
      return false;
    },
  },
}));

Chimee.install(chimeePluginPopup({
  name: 'cc_popup_2',
  title: '第二个信息框',
  body: '我是第二个信息框',
  offset: '50% 50%',
  width: '300px',
  events: {
    pause() {
      this.close();
    },
  },
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [ 'cc_popup', 'cc_popup_2' ],
  autoplay: true,
  controls: true,
  muted: true,
});
```

![](https://ws2.sinaimg.cn/large/006tNc79gy1fnpsseca7bg30nc0cy7wh.gif)

可以看到此次两个弹窗同时消失了。换言之，第一个插件的优先级更高，事件更加优先传递到他的手上。

而事实上，事件确实是按照插件安装的顺序派发。越早安装的插件会越早接触到事件。

因此我们鼓励将诸如广告插件等需要具有拦截功能的插件优先安装。

### 使用 level 值调整层级

但是上述两条规则有一条悖论，如果我又希望我的插件具有优先权，但又希望他附着在最上层。怎么办？

此时我们可以使用 level 这个选项。在我们安装插件后，level值较高者的层级位置永远在level值较低者之上。

依旧是那两个弹窗，我们希望第一个弹窗能够出现在第二个弹窗之上。那么我们可以在安装的时候赋予其 level 值。

```javascript
import Chimee from 'chimee';
import chimeePluginPopup from 'chimee-plugin-popup';

Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '第一个信息框',
  body: '我是第一个信息框',
  offset: '60% 50%',
  width: '200px',
  level: 1,
  events: {
    pause() {
      this.close();
      return false;
    },
  },
}));

Chimee.install(chimeePluginPopup({
  name: 'cc_popup_2',
  title: '第二个信息框',
  body: '我是第二个信息框',
  offset: '50% 50%',
  width: '300px',
  events: {
    pause() {
      this.close();
    },
  },
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [ 'cc_popup', 'cc_popup_2' ],
  autoplay: true,
  controls: true,
  muted: true,
});
```

![](https://ws4.sinaimg.cn/large/006tNc79gy1fnpsynrxrmj30ms0dnq3f.jpg)

我们可以看到此时第一个弹窗的层级在第二个弹窗上了。

### 动态调整层级

刚刚举的例子都是静态声明层级，那么如果我们有动态需求怎么实现呢？

我们可以使用 `$bumpToTop` 来实现我们的需求，`$bumpToTo` 是插件上的方法，它可以将任意插件置顶。

我们可以使用以下示例代码。

```javascript
import Chimee from 'chimee';
import chimeePluginPopup from 'chimee-plugin-popup';

Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '第一个信息框',
  body: '我是第一个信息框',
  offset: '60% 50%',
  width: '200px',
  events: {
    pause() {
      this.$bumpToTop();
    },
  },
}));

Chimee.install(chimeePluginPopup({
  name: 'cc_popup_2',
  title: '第二个信息框',
  body: '我是第二个信息框',
  offset: '50% 50%',
  width: '300px',
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [ 'cc_popup', 'cc_popup_2' ],
  autoplay: true,
  controls: true,
  muted: true,
});
```

![](https://ws4.sinaimg.cn/large/006tNc79gy1fnpt4s1mkbg30o60cwu0x.gif)

我们可以看到第一个弹窗在暂停后置顶了。

当然我们也可以直接获取插件实例进行操作。

```javascript
import Chimee from 'chimee';
import chimeePluginPopup from 'chimee-plugin-popup';

Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '第一个信息框',
  body: '我是第一个信息框',
  offset: '60% 50%',
  width: '200px',
}));

Chimee.install(chimeePluginPopup({
  name: 'cc_popup_2',
  title: '第二个信息框',
  body: '我是第二个信息框',
  offset: '50% 50%',
  width: '300px',
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [ 'cc_popup', 'cc_popup_2' ],
  autoplay: true,
  controls: true,
  muted: true,
});

setTimeout(() => {
  player.$plugins.ccPopup.$bumpToTop();
}, 2000);
```

![](https://ws4.sinaimg.cn/large/006tNc79gy1fnptiumn3vg30o60cwu0x.gif)

### 获取所有插件的顺序

我们可以通过 `$pluginOrder` 获取所有插件的顺序列表。其中列表中储存的为插件 id 。
