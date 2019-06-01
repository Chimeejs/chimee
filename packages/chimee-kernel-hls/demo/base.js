// mp4 http://cdn.toxicjohann.com/lostStar.mp4
// hls http://yunxianchang.live.ujne7.com/vod-system-bj/44_176_20170224113626af3a75cd-3508-4bc3-b51f-366fca3c7e39.m3u8
// flv直播 http://pf.live.360vcloud.net/live_customers3/6818c55761856069a0ce
// flv直播 http://flv.jia.360.cn/live_jia_public/_LC_RE_non_3605375765815007736131516144_BX.flv
// flv点播 http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv
// flv点播 http://yunxianchang.live.ujne7.com/vod-system-bj/TL2791e64b69ea0bea234c284c694986aa.flv
window.start = function() {
  const kernelConfig = window.kernelConfig || {};
  const player = new window.Chimee({
    // src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
    // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/44_176_20170224113626af3a75cd-3508-4bc3-b51f-366fca3c7e39.m3u8',
    src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
    // 编解码容器
    box: 'hls', // flv hls mp4
    // dom容器
    wrapper: '#wrapper',
    // video
    width: '100%',
    height: '100%',
    kernels: {
      hls: window.ChimeeKernelHls,
    },
    autoplay: true,
    controls: true,
    muted: true,
  });

  // const seekController = document.createElement('div');
  // seekController.innerText = 'seek: ';

  // const seekInput = document.createElement('input');
  // seekInput.value = 0;
  // seekInput.type = 'number';

  // seekController.appendChild(seekInput);

  // document.body.appendChild(seekController);

  // const srcController = document.createElement('div');
  // srcController.innerText = 'src: ';

  // const srcInput = document.createElement('input');
  // srcInput.value = '';
  // srcInput.type = 'text';

  // srcController.appendChild(srcInput);

  // document.body.appendChild(srcController);

  // const keys = [ 'play', 'pause', 'load', 'startLoad', 'stopLoad', 'attachMedia', 'seek', 'refresh', 'destroy' ];
  // const controller = document.createElement('div');
  // keys.forEach(function(key) {
  //   const button = document.createElement('button');
  //   button.innerText = key;
  //   button.addEventListener('click', function() {
  //     if (key === 'seek') {
  //       kernel.seek(parseFloat(seekInput.value));
  //       return;
  //     }
  //     if (key === 'load') {
  //       kernel.load(srcInput.value);
  //       return;
  //     }
  //     kernel[key]();
  //   });
  //   controller.appendChild(button);
  // });

  // document.body.appendChild(controller);

  // kernel.load();
};
