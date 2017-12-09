const mobiControlbar = chimeePluginGesture({
  name: 'chimeeMobiControlbar',
  create() {
    this.$dom.className = 'mobile-controlbar';
  },
  penetrate: false,
  operable: true,
  events: {
    tap(evt) {
      console.log('tap', evt, evt.target,)
    },
    press(evt) {
      console.log('press', evt, evt.target)
    },
    swipe(evt) {
      console.log('swipe', evt)
    },
    panstart(evt) {
      console.log('panstart', evt, evt.target)
    },
    panmove(evt) {
      console.log('panmove', evt, evt.target)
    },
    panend(evt) {
      console.log('panend', evt)
    },
    d_tap(evt) {
      console.log('d_tap', evt.target)
    },
    d_press(evt) {
      console.log('d_press', evt.target)
    },
    d_doubletap(evt) {
      console.log('d_doubletap', evt.target)
    }
  }
});

Chimee.install(mobiControlbar);
var player = new Chimee({
  volume: 0,
  wrapper: '#wrap',
  src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/103_369ed890f51-1c38-42a7-9ce2-828492660c60.mp4',
  isLive: false,
  plugin: [mobiControlbar.name],
  controls: true,
  autoplay: true
});