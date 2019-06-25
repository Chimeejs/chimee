const Chimee = window.Chimee;

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  volume: 0.1,
  controls: true,
  poster: 'http://cdn.toxicjohann.com/1.jpg',
});

// player.poster = 'http://cdn.toxicjohann.com/1.jpg';

window.player = player;
