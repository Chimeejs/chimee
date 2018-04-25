const player = new window.ChimeePlayer({
  wrapper: '#wrapper',
  // src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // src: 'http://tbm.alicdn.com/6vAsJsegVeBeb6vz3Vi/KI7kqunzsX6W6f9pyqN@@hd.mp4',
  src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  autoplay: true,
  controls: true,
  playsInline: true,
  preload: true,
  x5VideoPlayerFullscreen: true,
  x5VideoOrientation: true,
  xWebkitAirplay: true,
  muted: true,
  box: 'flv',
});

player.unuse('chimeeMobiControlbar');

player.on('play', evt => console.warn(evt));
player.on('pause', evt => console.warn(evt));

player.$watch('isFullscreen', newVal => console.log(newVal), { deep: true });
