(function (Chimee) {
  class Controller extends Chimee.plugin {
    constructor (...args) {
      super(...args);
      this.$dom.classList.add('video-state');
      this.button = document.createElement('button');
      this.button.innerText = 'Play';
      this.event = 'play';
      this.button.addEventListener('click', () => {
        this.$emit(this.event);
      });
      this.$dom.appendChild(this.button);
      this.$on('pause', () => {
        this.button.innerText = 'Play';
        this.event = 'play';
      });
      this.$on('play', () => {
        this.button.innerText = 'Pause';
        this.event = 'pause';
      });
    }
    destroy () {
      this.$dom.removeChild(this.button);
    }
  };
  Chimee.install(Controller);
  const player = new Chimee({
    // 播放地址
    src: 'http://cdn.toxicjohann.com/lostStar.mp4',
    // 直播:live 点播：vod
    type: 'vod',
    // 编解码容器
    box: 'mp4',
    // dom容器
    wrapper: '#wrapper',
    plugin: ['controller'],
    // video
    runtimeOrder: ['html5', 'flash'],
    autoplay: true,
    controls: true
  });

  player.load();

})(window.Chimee);
