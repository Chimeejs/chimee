const Chimee = window.Chimee;
const Vue = window.Vue;

const plugin = {
  name: 'controller',
  create() {
    this.vm = new Vue({
      el: this.$dom,
      template: '<div class="controller"><button @click="click">{{operation}}</button></div>',
      data: {
        Chimee: this,
        operation: 'play',
      },
      created() {
        this.Chimee.$on('play', () => { this.operation = 'pause'; });
        this.Chimee.$on('pause', () => { this.operation = 'play'; });
      },
      methods: {
        click() {
          this.Chimee.$emit(this.operation);
        },
      },
    });
  },
  destroy() {
    this.vm.$destroy();
    this.$dom.removeChild(this.button);
  },
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
  plugin: [ 'controller' ],
  autoplay: false,
  controls: true,
});

player.load();

