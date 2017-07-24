(function (Chimee) {
  const plugin = {
    // 插件名为 controller
    name: 'controller',
    // 插件实体为按钮
    el: '<button>play</button>',
    data: {
      text: 'play'
    },
    methods: {
      changeVideoStatus () {
        this[this.text]();
      },
      changeButtonText (text) {
        this.text = text;
        this.$dom.innerText = this.text;
      }
    },
    // 在插件创建的阶段，我们为插件绑定事件。
    create () {
      this.$dom.addEventListener('click', this.changeVideoStatus);
    },
    // 插件会在播放暂停操作发生后改变自己的文案及相应的行为
    events: {
      pause () {
        this.changeButtonText('play');
      },
      play () {
        this.changeButtonText('pause');
      }
    }
  };
  Chimee.install(plugin);
  const player = new Chimee({
    // 播放地址
    src: 'http://cdn.toxicjohann.com/lostStar.mp4',
    // dom容器
    wrapper: '#wrapper',
    plugin: ['controller'],
    volume: 0.1
  });
  const player2 = new Chimee({
    // 播放地址
    src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
    // dom容器
    wrapper: '#wrapper2',
    controls: true
  });
  window.player = player;
  window.player2 = player2;
})(window.Chimee);
