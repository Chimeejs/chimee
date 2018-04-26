const Chimee = window.Chimee;
const plugin = {
  name: 'fsMode',
  el: '<button>native</button>',
  data: {
    texts: [ 'native', 'style' ],
  },
  methods: {
    setText() {
      this.$dom.innerText = this.texts[Number(Chimee.config.useStyleFullscreen)];
    },
  },
  // 在插件创建的阶段，我们为插件绑定事件。
  create() {
    this.$dom.addEventListener('click', () => {
      Chimee.config.useStyleFullscreen = !Chimee.config.useStyleFullscreen;
      this.setText();
    });
  },
};
Chimee.install(plugin);
const plugin1 = {
  name: 'fsAction',
  el: '<button>fullscreen</button>',
  // 在插件创建的阶段，我们为插件绑定事件。
  create() {
    this.$dom.addEventListener('click', () => {
      this.fullscreen();
    });
  },
};
Chimee.install(plugin1);
const player = new Chimee({
  // 播放地址
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8',
  // dom容器
  wrapper: '#wrapper',
  plugin: [
    'fsMode',
    'fsAction',
  ],
  volume: 0.1,
  controls: true,
});

window.player = player;
