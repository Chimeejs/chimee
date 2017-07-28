window.player = new window.Chimee({
    src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
    isLive: false,
    preset: {
      flv: window.chimeeKernelFlv
    },
    // 编解码容器
    box: 'flv', // flv hls mp4
    // dom容器
    wrapper: '#wrapper',
    // video
    runtimeOrder: ['html5', 'flash'],
    width: '100%',
    height: '100%',
    autoplay: true,
    controls: true
  });
