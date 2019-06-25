const Chimee = window.Chimee;
const chimeeKernelFlv = window.chimeeKernelFlv;
const chimeePluginControlbar = window.chimeePluginControlbar;
const chimeePluginDanmu = window.chimeePluginDanmu;
const chimeePluginCenterState = window.chimeePluginCenterState;

Chimee.install(chimeePluginControlbar);
Chimee.install(chimeePluginDanmu);
Chimee.install(chimeePluginCenterState);

window.player = new Chimee({
  wrapper: '#wrapper',
  isLive: this.isLive,
  controls: true,
  autoplay: true,
  src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  box: 'flv',
  kernels: {
    flv: chimeeKernelFlv,
  },
  plugin: [
    {
      name: chimeePluginControlbar.name,
      children: {
        progressBar: false,
        danmaku: {
          tag: 'chimee-danmaku',
          html: '<div> danmuku </div>',
          event: {
            click(evt) {
              console.log(evt);
            },
          },
        },
        quality: {
          tag: 'chimee-quality',
          html: '<div> wowoo </div>',
          event: {
            click(event) {
              console.log(event);
              // const target = event.target;
              // const quality = target.getAttribute('data-quality');
              // if (!quality || quality === instance.quality) {
              //   return;
              // }
              // instance.loadLive(instance.nowPlayUrls, quality);
            },
            mouseenter(evt) {
              console.log(evt);
              // if (this.timeoutId) {
              //   clearTimeout(this.timeoutId);
              //   this.timeoutId = null;
              // }
              // this.$dom.querySelector('.chimee-quality-list').style.display = 'block';
            },
            mouseleave(evt) {
              console.log(evt);
              // this.timeoutId = setTimeout(() => {
              //   this.$dom.querySelector('.chimee-quality-list').style.display = 'none';
              // }, 50);
            },
          },
        },
      },
    },
    {
      name: chimeePluginDanmu.name,
      updateByVideo: false,
    },
    chimeePluginCenterState.name,
  ],
});
this.player.on('error', error => {
  console.log(error);
});
this.player.on('heartbeat', evt => {
  console.warn(evt, 'heartbeat');
});
// window.player = new window.Chimee({
//   src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
//   // src: 'http://1253804432.vod2.myqcloud.com/3712977fvodgzp1253804432/f3f31e5f9031868223411915443/f0.flv',
//   isLive: false,
//   kernels: {
//     flv: window.chimeeKernelFlv,
//   },
//   // preset: {
//   //   flv: window.chimeeKernelFlv
//   // },
//   // 编解码容器
//   box: 'flv', // flv hls native
//   // dom容器
//   wrapper: '#wrapper',
//   width: '100%',
//   height: '100%',
//   autoplay: true,
//   controls: true,
// });

// // window.player.on('play', evt => {
// //   setTimeout(() => {
// //     console.log('wowowoow');
// //     window.player.$silentLoad('http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv', {
// //       duration: 10
// //     });
// //   }, 500);
// // });
