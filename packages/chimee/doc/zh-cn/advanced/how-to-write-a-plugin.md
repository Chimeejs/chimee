# 如何编写一个插件

Chimee 中的所有插件都是 `Chimee.plugin` 的一个实例。我们可以传入一个对象让 Chimee 帮我们生成实例，也可以自己对 `Chimee.plugin` 进行继承。

## 编写一个简单的播放暂停插件

![简单的播放暂停插件](https://resource.toxicjohann.com/simplest-demo.gif)

我们可以轻松地编写一个如上图播放暂停插件。

1. 我们将其命名为 `controller`，所以设定 `name` 为 `controller`。
2. 它本质是一个按钮，所以我们将 `el` 设定为 `<button>play</button>`。
3. 按钮需要对视频进行操作，所以我们包裹一个方法名为 changeVideoStatus。
4. 按钮需要在视频状态改变后改变自身，所以我们包裹一个方法名为 changeButtonText。
5. 按钮点击后会对视频进行操作，所以我们在`create`阶段榜上监听按钮的`click`事件并调用 changeVideoStatus。
6. 我们通过 events 监听播放器的 play 和 pause 状态改变，并调用 changeButtonText。

```javascript
const plugin = {
  // 插件名为 controller
  name: 'controller',
  // 插件实体为按钮
  el: '<button>play</button>',
  data: {
    text: 'play'
  },
  methods: {
    changeVideoStatus () {
      this[this.text]();
    },
    changeButtonText (text) {
      this.text = text;
      this.$dom.innerText = this.text;
    }
  },
  // 在插件创建的阶段，我们为插件绑定事件。
  create () {
    this.$dom.addEventListener('click', this.changeVideoStatus);
  },
  // 插件会在播放暂停操作发生后改变自己的文案及相应的行为
  events: {
    pause () {
      this.changeButtonText('play');
    },
    play () {
      this.changeButtonText('pause');
    }
  }
};
```

接下来我们安装及使用该实例即可。

```javascript
// 安装插件
Chimee.install(plugin);
const player = new Chimee({
  // 播放地址
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // dom容器
  wrapper: '#wrapper',
  // 使用插件
  plugin: ['controller'],
});
```

以上展示了如何使用 `Object` 创建、安装、使用插件的过程，下面将讲述另一种插件写法。

## 继承 Plugin 进行插件编写

我们也可以继承 `Chimee.plugin` 生成一个插件类。这种写法较为自由，但是很多语法糖就不能使用了。

```javascript
class Controller extends Chimee.plugin {
  constructor (...args) {
    // 切记传递相关参数到父类
    super(...args);
    this.button = document.createElement('button');
    this.text = 'play';
    this.button.innerText = this.text;
    this.button.addEventListener('click', () => {
      this[this.text]();
    });
    this.$dom.appendChild(this.button);
    this.$on('pause', () => {
      this.changeButtonText('play');
    });
    this.$on('play', () => {
      this.changeButtonText('pause');
    });
  }
  changeButtonText (text) {
    this.text = text;
    this.button.innerText = text;
  }
  destroy () {
    this.$dom.removeChild(this.button);
  }
};
```

不过这也是一种比较方便的开发方式。