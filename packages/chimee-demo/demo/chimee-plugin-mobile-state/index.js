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
    this.on('state-tap', () => {
      this.changeVideoStatus()
    });
    this.on('play', () => this.changeButtonText('pause'));
    this.on('pause', () => this.changeButtonText('play'));
  },
};
Chimee.install(plugin);
Chimee.install(ChimeePluginGesture);
Chimee.install(ChimeePluginMobileState);
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  plugin: [
    ChimeePluginGesture.name,
    ChimeePluginMobileState.name,
    {
      name: 'controller',
      inner: false,
    },
    ],
  volume: 0.1,
  controls: true,
  noDefaultContextMenu: 'wrapper',
  muted: true,
  debug: false,
  preload: 'none',
});

// player.play();
window.player = player;
