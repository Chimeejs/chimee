
window.player = new window.Chimee({
    src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
    // src: 'http://1253804432.vod2.myqcloud.com/3712977fvodgzp1253804432/f3f31e5f9031868223411915443/f0.flv',
    isLive: false,
    kernels: {
      flv: window.chimeeKernelFlv
    },
    // 编解码容器
    box: 'flv', // flv hls native
    // dom容器
    wrapper: '#wrapper',
    width: '100%',
    height: '100%',
    autoplay: true,
    controls: true
  });

window.player.on('play', evt => {
  setTimeout(() => {
    window.player.$silentLoad('http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv');
  }, 500);
});
