const player = new window.Chimee({
  // src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/44_176_20170224113626af3a75cd-3508-4bc3-b51f-366fca3c7e39.m3u8',
  src: 'http://v.96koo.net/common/LzEvcmVsZWFzZS8yMDE4MDUzMC9NQmoycnhITUUzL01CajJyeEhNRTNfNjQwXzgwMA==_8446.m3u8',
  // 编解码容器
  box: 'hls', // flv hls mp4
  // dom容器
  wrapper: '#wrapper',
  // video
  width: '100%',
  height: '100%',
  kernels: {
    hls: window.ChimeeKernelHls,
  },
  autoplay: true,
  controls: true,
  muted: true,
});
player.on('after_pause', function() {
  this.stopLoad();
});
player.on('after_play', function() {
  this.startLoad();
});
window.player = player;

function go() {
  player.$silentLoad('http://v.96koo.net/common/LzEvcmVsZWFzZS8yMDE4MDUzMC9NQmoycnhITUUzL01CajJyeEhNRTNfOTYwXzEwMDA=_8446.m3u8');
}

window.go = go;
// player.play();
