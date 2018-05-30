const Chimee = window.Chimee;
const chimeePluginControlbar = window.chimeePluginControlbar;
const myPlugin = {
  name: 'my-plugin',
  penetrate: true,
  el: '<div class="my-plugin"></div>',
  create() {},
  events: {
    // click(evt) {
    //   console.warn(evt);
    // },
  },
};
Chimee.install(chimeePluginControlbar);
Chimee.install(myPlugin);
const player = new Chimee({
  // 播放地址
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [
    chimeePluginControlbar.name,
    myPlugin.name,
  ],
  autoplay: true,
  controls: true,
  muted: true,
});

window.player = player;
