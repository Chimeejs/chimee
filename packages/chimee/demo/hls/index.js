const player = new window.Chimee({
    src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8',
    // 编解码容器
    box: 'hls', // flv hls mp4
    // dom容器
    wrapper: '#wrapper',
    // video
    width: '100%',
    height: '100%',
    preset: {
      hls: window.chimeeKernelHls
    },
    autoplay: true,
    controls: true
  });
  window.player = player;
  // player.play();
