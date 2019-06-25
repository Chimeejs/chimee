const Chimee = window.Chimee;
const plugin = {
  name: 'controller',
  el: '<button>picture-in-picture</button>',
  create() {
    this.$dom.addEventListener('click', () => {
      if (this.inPictureInPictureMode) this.exitPictureInPicture();
      else this.requestPictureInPicture();
    });
  },
};
const nativeSwitch = {
  name: 'native-switch',
  el: '<button>G.E.M switch</button>',
  create() {
    this.$dom.addEventListener('click', () => {
      this.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', { repeatTimes: 5, increment: 2 });
    });
  },
};
const nativeOneSwitch = {
  name: 'native-one-switch',
  el: '<button>Lost star switch</button>',
  create() {
    this.$dom.addEventListener('click', () => {
      this.$silentLoad('http://cdn.toxicjohann.com/lostStar.mp4', { repeatTimes: 5, increment: 2, immediate: true });
    });
  },
};
Chimee.install(nativeOneSwitch);
Chimee.install(nativeSwitch);
Chimee.install(plugin);
const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  wrapper: '#wrapper',
  plugin: [{
    name: 'controller',
    inner: false,
  }, nativeOneSwitch.name, nativeSwitch.name ],
  volume: 0.1,
  autoplay: true,
  controls: true,
  muted: true,
});
window.player = player;
