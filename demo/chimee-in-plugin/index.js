const Chimee = window.Chimee;
const plugin = {
  // 插件名为 controller
  name: 'another-chimee',
  // 插件实体为按钮
  el: '<div></div>',
  // 在插件创建的阶段，我们为插件绑定事件。
  create() {
    const player2 = new Chimee({
      wrapper: this.$dom,
      src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
      controls: true,
    });
    window.player2 = player2;
    const button = document.createElement('button');
    button.innerText = 'destroy';
    document.body.appendChild(button);
    button.addEventListener('click', () => {
      player2.destroy();
    });
    // setTimeout(() => {
    //   player2.destroy();
    // }, 3000);
  },
};
Chimee.install(plugin);
const player = new Chimee({
  // 播放地址
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8',
  // dom容器
  wrapper: '#wrapper',
  plugin: [{
    name: 'another-chimee',
    inner: true,
  }],
  // preset: {
  //   flv: window.chimeeKernelFlv,
  //   hls: window.chimeeKernelHls
  // },
  // width: 60,
  // height: 90,
  volume: 0.1,
  // autoplay: true,
  controls: true,
});

window.player = player;
