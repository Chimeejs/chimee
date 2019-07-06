const gestures = ['tap' , 'doubletap' , 'press' , 'swipe' , 'panend' , 'panstart' , 'panmove'];
const events = gestures.reduce((events, name) => {
  events[name] = (evt) => console.log(name, evt);
  return events;
}, {});
const { GestureHelper } = ChimeePluginGesture;
const plugin = {
  // 插件名为 controller
  name: 'controller',
  // 插件实体为按钮
  el: '<button>play</button>',
  data: {
    text: 'play',
  },
  methods: {
    changeVideoStatus() {
      this[this.text]();
    },
    changeButtonText(text) {
      this.text = text;
      this.$dom.innerText = this.text;
    },
  },
  // 在插件创建的阶段，我们为插件绑定事件。
  create() {
    this.$dom.addEventListener('click', this.changeVideoStatus);
    this.$watch('controls', function(newVal, oldVal) {
      console.log(newVal, oldVal);
    }, { diff: false });
    console.log(this.$plugins);
  },
  // 插件会在播放暂停操作发生后改变自己的文案及相应的行为
  events,
};
Chimee.install(plugin);
Chimee.install(ChimeePluginGesture)
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  plugin: [ChimeePluginGesture.name, {
    name: 'controller',
    inner: false,
  }],
  volume: 0.1,
  controls: true,
  noDefaultContextMenu: 'wrapper',
  muted: true,
});

gestures.forEach(key => {
  player.$on(key, evt => console.log(key, evt));
});

gestures.forEach(key => {
  player.$on(key, evt => console.log('container', key, evt)), { target: 'container'};
});

gestures.forEach(key => {
  player.$on(key, evt => console.log('wrapper', key, evt)), { target: 'wrapper'};
});

player.play();
window.player = player;
