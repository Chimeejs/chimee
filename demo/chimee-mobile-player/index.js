const player = new window.ChimeeMobilePlayer({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // src: 'http://tbm.alicdn.com/6vAsJsegVeBeb6vz3Vi/KI7kqunzsX6W6f9pyqN@@hd.mp4',
  autoplay: true,
  controls: true,
  playsInline: true,
  preload: true,
  x5VideoPlayerFullscreen: true,
  x5VideoOrientation: true,
  xWebkitAirplay: true,
  muted: true,
});

player.unuse('chimeeMobiControlbar');

player.on('play', evt => console.warn(evt));
player.on('canplay', evt => console.warn(evt));
player.addEventListener('canplay', evt => console.error(evt));
player.on('pause', evt => console.warn(evt));

player.$watch('isFullscreen', newVal => console.log(newVal), { deep: true });
