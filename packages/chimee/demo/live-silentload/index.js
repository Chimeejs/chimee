const $ = window.$;

$('#disabled_reload').change(function() {
  console.log(window.__disabled_reload = this.checked);
});
$('#_duration').click(function() {
  console.log(window.__duration = 1e4);
});


const needFlv = location.href.indexOf('flv') !== -1;
$('h2 a').eq(+needFlv).addClass('on');

// 取个SD的直播流来用用
function getSDLiveUrl(sn) {
  const a = 've3.ji';
  const b = '60.c';
  return $.ajax({
    url: 'https://li' + a + 'a.3' + b + 'n/public/getInfoAndPlayV2?from=mpc_ipcam_web&sn=36' + sn + '&taskid=' + +new Date(),
    type: 'get',
    dataType: 'jsonp',
  }).then(function(data) {
    let liveHLS = data && data.playInfo && data.playInfo.hls;
    const ret = {};
    if (liveHLS) {
      if (needFlv) liveHLS = liveHLS.replace('hls-live', 'flv-live').replace('/index.m3u8', '.flv');
      ret.url = liveHLS;
      ret.poster = data.publicInfo.thumbnail;
    }
    return ret;
  });
}

function start() {
  Promise.all([
    getSDLiveUrl('072754052'),
    getSDLiveUrl('0K0905701'),
    getSDLiveUrl('0K0904122'),
  ]).then(function(re) {
    if (!re[0].url || !re[1].url || !re[2].url) {
      console.error('流地址异常');
    }
    rebuildPlayer(re[0].url, re[1].url, re[2].url);
  });
}
// alert(11);
function rebuildPlayer(snow, water, city) {
  const Chimee = window.Chimee;
  const snowSwitch = {
    name: 'snow-switch',
    el: '<button>snow switch</button>',
    create() {
      this.$dom.addEventListener('click', () => {
        this.$silentLoad(snow, { repeatTimes: 5, increment: 2 });
      });
    },
  };
  const riverSwitch = {
    name: 'river-switch',
    el: '<button>river switch</button>',
    create() {
      this.$dom.addEventListener('click', () => {
        this.$silentLoad(water, { repeatTimes: 5, increment: 2 });
      });
    },
  };
  const citySwitch = {
    name: 'city-switch',
    el: '<button>city switch</button>',
    create() {
      this.$dom.addEventListener('click', () => {
        this.$silentLoad(city, { repeatTimes: 5, increment: 2 });
      });
    },
  };
  Chimee.install(snowSwitch);
  Chimee.install(riverSwitch);
  Chimee.install(citySwitch);
  Chimee.installKernel({
    flv: window.chimeeKernelFlv,
    hls: window.chimeeKernelHls,
  });
  const player = new Chimee({
    src: snow,
    box: needFlv ? 'flv' : 'hls',
    wrapper: '#wrapper',
    plugin: [ 'citySwitch', 'riverSwitch', 'snowSwitch' ],
    volume: 0.1,
    kernels: [ 'flv', 'hls' ],
    isLive: true,
    autoplay: true,
    controls: true,
  });

  window.player = player;

}
// 自动开始
start();

