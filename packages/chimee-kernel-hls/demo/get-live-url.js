const $ = window.$;

window.getLiveSource = function(type) {
  const sources = {};

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
        if (type === 'flv') liveHLS = liveHLS.replace('hls-live', 'flv-live').replace('/index.m3u8', '.flv');
        ret.url = liveHLS;
        ret.poster = data.publicInfo.thumbnail;
      }
      return ret;
    });
  }

  return Promise.all([
    getSDLiveUrl('072754052'),
    getSDLiveUrl('0K0905701'),
    getSDLiveUrl('0K0904122'),
  ]).then(function(re) {
    if (!re[0].url || !re[1].url || !re[2].url) {
      console.error('流地址异常');
    }
    sources.snow = re[0].url;
    sources.river = re[1].url;
    sources.city = re[2].url;
    return sources;
  });
};
