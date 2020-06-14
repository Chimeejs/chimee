const Chimee = window.Chimee;
const player = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  autoplay: false,
  controls: true,
  playsInline: true,
  preload: 'auto',
  x5VideoPlayerFullscreen: true,
  x5VideoPlayerType: 'h5-page',
  x5VideoOrientation: 'landscape',
  xWebkitAirplay: true,
  muted: true,
});
window.player = player;
