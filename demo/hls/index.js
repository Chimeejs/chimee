const player = new window.Chimee({
  src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
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
// player.play();
