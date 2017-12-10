const Chimee = window.Chimee;
const nativeSwitch = {
  name: 'native-switch',
  el: '<button>G.E.M switch</button>',
  create() {
    this.$dom.addEventListener('click', () => {
      this.load('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4');
    });
  },
};
const nativeOneSwitch = {
  name: 'native-one-switch',
  el: '<button>Lost star switch</button>',
  create() {
    this.$dom.addEventListener('click', () => {
      this.load('http://cdn.toxicjohann.com/lostStar.mp4');
    });
  },
};
const flvSwitch = {
  name: 'flv-switch',
  el: '<button>flv switch</button>',
  create() {
    this.$dom.addEventListener('click', () => {
      this.load('http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv');
    });
  },
};
const hlsSwitch = {
  name: 'hls-switch',
  el: '<button>hls switch</button>',
  create() {
    this.$dom.addEventListener('click', () => {
      this.load('http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8');
    });
  },
};
Chimee.install(nativeSwitch);
Chimee.install(nativeOneSwitch);
Chimee.install(flvSwitch);
Chimee.install(hlsSwitch);
Chimee.installKernel({
  flv: window.chimeeKernelFlv,
  hls: window.chimeeKernelHls,
});
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  plugin: [ 'nativeSwitch', 'nativeOneSwitch', 'flvSwitch', 'hlsSwitch' ],
  volume: 0.1,
  kernels: [ 'flv', 'hls' ],
  autoplay: true,
  controls: true,
});
window.player = player;
player.on('heartbeat', evt => {
  console.log(evt);
});
player.on('error', evt => {
  console.error(evt);
});
