const player = new window.Chimee({
    // 播放地址
    // 直播 http://pf.live.360vcloud.net/live_customers3/605d90cc6203e78e7ec9
    // 点播 http://yunxianchang.live.ujne7.com/vod-system-bj/TLde849a822cbb2e1d0d3c52c4ec004cfa.flv
    // 点播 http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8
    src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8',
    // 直播:live 点播：vod
    type: 'vod',
    // 编解码容器
    box: 'flv', // flv hls mp4
    // dom容器
    wrapper: '#wrapper',
    // video
    runtimeOrder: ['html5', 'flash'],
    width: '100%',
    height: '100%',
    autoplay: false,
    autoload: false,
    controls: true,
    webWorker: true
  });

  // player.attachMedia();

  player.load();
