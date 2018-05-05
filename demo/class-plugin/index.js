(function(Chimee) {
  class Controller extends Chimee.plugin {
    constructor(...args) {
      super(...args);
      this.button = document.createElement('button');
      this.text = 'play';
      this.button.innerText = this.text;
      this.button.addEventListener('click', () => {
        this[this.text]();
      });
      this.$dom.appendChild(this.button);
      this.$on('pause', () => {
        this.changeButtonText('play');
      });
      this.$on('play', () => {
        this.changeButtonText('pause');
      });
    }
    changeButtonText(text) {
      this.text = text;
      this.button.innerText = text;
    }
    destroy() {
      this.$dom.removeChild(this.button);
    }
  }
  Chimee.install(Controller);
  const player = new Chimee({
    // 播放地址
    src: 'http://cdn.toxicjohann.com/lostStar.mp4',
    // dom容器
    wrapper: '#wrapper',
    plugin: [ 'controller' ],
    volume: 0.1,
    autoplay: true,
    controls: true,
  });

  window.player = player;
})(window.Chimee);
