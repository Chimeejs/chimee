(function (Chimee) {
  const plugin = {
    name: 'controller',
    create () {
      this.$dom.classList.add('video-state');
      this.button = document.createElement('button');
      this.button.innerText = 'Play';
      this.event = 'play';
      this.button.addEventListener('click', () => {
        this.$emit(this.event);
      });
      this.$dom.appendChild(this.button);
    },
    destroy () {
      this.$dom.removeChild(this.button);
    },
    events: {
      pause () {
        this.button.innerText = 'Play';
        this.event = 'play';
      },
      play () {
        this.button.innerText = 'Pause';
        this.event = 'pause';
      }
    }
  };
  Chimee.install(plugin);
  const player = new Chimee({
    // 播放地址
    src: 'http://cdn.toxicjohann.com/lostStar.mp4',
    // 直播:live 点播：vod
    type: 'vod',
    // 编解码容器
    box: 'mp4',
    // dom容器
    wrapper: '#wrapper',
    plugin: [{name: 'controller', alias: 'c'}],
    // video
    runtimeOrder: ['html5', 'flash'],
    // autoplay: true,
    controls: true
  });
  // player.load();
  window.player = player;
  // const player = new Chimee('#wrapper');
  // player.load('http://cdn.toxicjohann.com/lostStar.mp4');
  // player.play();
})(window.Chimee);
