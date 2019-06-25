const Chimee = window.Chimee;
const plugin = {
  name: 'video-state',
  create() {
    log('create');
    this.$dom.classList.add('video-state');
    this.$dom.innerHTML = '<h1>create</h1>';
  },
  destroy() {
    log('destroy');
  },
  events: {
    ready() {
      log('ready');
      this.$dom.innerHTML = '<h1>ready</h1>';
    },
    afterReady() {
      log('afterReady');
    },
    abort() {
      log('abort');
    },
    canplay() {
      log('canplay');
      this.$dom.innerHTML = '<h1>canplay</h1>';
    },
    canplaythrough() {
      log('canplaythrough');
    },
    durationchange() {
      log('durationchange');
    },
    emptied() {
      log('emptied');
    },
    encrypted() {
      log('encrypted');
    },
    ended() {
      log('ended');
      this.$dom.innerHTML = '<h1>ended</h1>';
    },
    error() {
      log('error');
    },
    interruptbegin() {
      log('interruptbegin');
    },
    interruptend() {
      log('interruptend');
    },
    loadeddata() {
      log('loadeddata');
    },
    loadedmetadata() {
      log('loadedmetadata');
    },
    loadstart() {
      log('loadstart');
    },
    mozaudioavailable() {
      log('mozaudioavailable');
    },
    beforePause() {
      log('beforePause', 'important');
    },
    pause() {
      log('pause');
      this.$dom.innerHTML = '<h1>pause</h1>';
    },
    afterPause() {
      log('afterPause', 'important');
    },
    beforePlay() {
      log('beforePlay', 'important');
    },
    play() {
      log('play');
      this.$dom.innerHTML = '<h1>play</h1>';
    },
    afterPlay() {
      log('afterPlay', 'important');
    },
    playing() {
      log('playing');
    },
    progress() {
      log('progress');
    },
    ratechange() {
      log('ratechange');
    },
    seeked() {
      log('seeked');
    },
    seeking() {
      log('seeking');
    },
    stalled() {
      log('stalled');
    },
    suspend() {
      log('suspend');
    },
    timeupdate() {
      log('timeupdate');
    },
    volumechange() {
      log('volumechange');
    },
    waiting() {
      log('waiting');
    },
  },
};
const logger = document.getElementById('logger');
function log(msg, type = 'normal') {
  const text = document.createElement('p');
  const time = new Date();
  text.innerHTML = `<span class="time">[${time.toLocaleTimeString()}]</span> ${msg}`;
  text.classList.add(type);
  const firstChild = logger.children[0];
  if (firstChild) {
    logger.insertBefore(text, firstChild);
  } else {
    logger.appendChild(text);
  }
}

Chimee.install(plugin);

const outer = {
  name: 'outer',
  el: '<p>You know, you will have some plugin outside of the container</p>',
  inner: false,
};

Chimee.install(outer);

let player;
window.player = player;
// player.attachMedia();
document.getElementById('play').addEventListener('click', function() {
  player.play();
});
document.getElementById('pause').addEventListener('click', function() {
  player.pause();
});
document.getElementById('add-plugin').addEventListener('click', function() {
  player.use('video-state');
});
document.getElementById('remove-plugin').addEventListener('click', function() {
  player.unuse('video-state');
});
document.getElementById('load').addEventListener('click', function() {
  player.load();
});
document.getElementById('focus').addEventListener('click', function() {
  player.focus();
});
document.getElementById('destroy').addEventListener('click', function() {
  player.destroy();
});
document.getElementById('video-fullscreen').addEventListener('click', function() {
  player.fullScreen(true, 'video');
});
document.getElementById('container-fullscreen').addEventListener('click', function() {
  player.fullScreen(true, 'container');
});
document.getElementById('wrapper-fullscreen').addEventListener('click', function() {
  player.fullScreen(true, 'wrapper');
});
document.getElementById('create').addEventListener('click', function() {
  player = new Chimee({
    // 播放地址
    src: 'http://cdn.toxicjohann.com/lostStar.mp4',
    // 直播:live 点播：vod
    type: 'vod',
    // 编解码容器
    box: 'mp4',
    // $dom容器
    wrapper: '#wrapper',
    plugin: [
      {
        name: 'video-state',
      },
      'outer',
    ],
    autoplay: false,
    controls: true,
  });
  player.on('play', function() {
    console.log(this, 'play');
  });
  player.addEventListener('play', function() {
    console.log(this, 'play + add');
  });
  player.on('beforePlay', function() {
    console.log(this, 'beforePlay');
  });
});

