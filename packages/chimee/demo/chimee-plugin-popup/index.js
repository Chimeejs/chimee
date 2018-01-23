const Chimee = window.Chimee;
const chimeePluginPopup = window.chimeePluginPopup;
Chimee.install(chimeePluginPopup({
  name: 'cc_popup',
  title: '第一个信息框',
  body: '我是第一个信息框',
  offset: '60% 50%',
  width: '200px',
  events: {
    pause() {
      this.$bumpToTop();
    },
  },
}));

Chimee.install(chimeePluginPopup({
  name: 'cc_popup_2',
  title: '第二个信息框',
  body: '我是第二个信息框',
  offset: '50% 50%',
  width: '300px',
}));

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  wrapper: '#wrapper',
  plugin: [ 'cc_popup', 'cc_popup_2' ],
  autoplay: true,
  controls: true,
  muted: true,
});

setTimeout(() => {
  player.$plugins.ccPopup.$bumpToTop();
}, 2000);

window.player = player;
