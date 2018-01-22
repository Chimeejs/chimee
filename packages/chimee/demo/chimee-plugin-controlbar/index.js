const Chimee = window.Chimee;
const chimeePluginControlbar = window.chimeePluginControlbar;
Chimee.install(chimeePluginControlbar);
const player = new Chimee({
  // 播放地址
  // src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8',
  // dom容器
  wrapper: '#wrapper',
  plugin: [ chimeePluginControlbar.name ],
  // preset: {
  //   flv: window.chimeeKernelFlv,
  //   hls: window.chimeeKernelHls
  // },
  // width: 60,
  // height: 90,
  autoplay: true,
  controls: true,
  muted: true,
});

window.player = player;
