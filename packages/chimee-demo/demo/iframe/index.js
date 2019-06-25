const Chimee = window.Chimee;
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
  events: {
    pause() {
      this.changeButtonText('play');
    },
    play() {
      this.changeButtonText('pause');
    },
    c_contextmenu(evt) {
      console.log(evt);
    },
    c_click(evt) {
      console.warn(evt);
    },
    after_c_click(evt) {
      console.log(evt, 'after_c');
    },
    click(evt) {
      console.log(evt);
    },
  },
};
Chimee.install(plugin);
const fullscreenPlugin = {
  // 插件名为 controller
  name: 'fullscreenplugin',
  // 插件实体为按钮
  el: '<button>fullscreen</button>',
  // 在插件创建的阶段，我们为插件绑定事件。
  create() {
    this.$dom.addEventListener('click', () => {
      this.fullscreen(!this.isFullscreen);
    });
  },
  inner: true,
};
Chimee.install(fullscreenPlugin);
const player = new Chimee({
  // 播放地址
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8',
  // dom容器
  wrapper: '#wrapper',
  plugin: [{
    name: 'controller',
    inner: false,
  }, 'fullscreenplugin' ],
  // preset: {
  //   flv: window.chimeeKernelFlv,
  //   hls: window.chimeeKernelHls
  // },
  // width: 60,
  // height: 90,
  volume: 0.1,
  // autoplay: true,
  controls: true,
});
[ 'touchstart', 'touchmove', 'touchend' ].forEach(key => {
  player.$on(key, evt => console.log(evt, key));
});

window.player = player;
