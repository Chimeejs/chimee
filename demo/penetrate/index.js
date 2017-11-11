const Chimee = window.Chimee;
const videoEventList = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'encrypted',
  'ended',
  'error',
  'interruptbegin',
  'interruptend',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'mozaudioavailable',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
  'beforeinput',
];
const domEventList = [
  'blur',
  'click',
  'compositionend',
  'compositionstart',
  'compositionupdate',
  'dblclick',
  'focus',
  'focusin',
  'focusout',
  'input',
  'keydown',
  'keypress',
  'keyup',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'resize',
  'scroll',
  'select',
  'wheel',
];
const logger = document.getElementById('logger');
function log(msg, color = '#000000') {
  const text = document.createElement('p');
  const time = new Date();
  text.innerHTML = `<span class="time">[${time.toLocaleTimeString()}]</span> ${msg}`;
  text.style.color = color;
  const firstChild = logger.children[0];
  if (firstChild) {
    logger.insertBefore(text, firstChild);
  } else {
    logger.appendChild(text);
  }
}
class Stater extends Chimee.plugin {
  constructor(...args) {
    super(...args);
    this.videoList = [];
    this.domList = [];
    videoEventList.forEach(key => {
      const fn = () => log(key, '#003480');
      this.$on(key, fn);
      this.videoList.push(fn);
    });
    domEventList.forEach(key => {
      const fn = () => log(key, '#195255');
      this.$on(key, fn);
      this.domList.push(fn);
    });
  }
  destroy() {
    videoEventList.forEach((key, index) => {
      this.$off(key, this.videoList[index]);
    });
    domEventList.forEach((key, index) => {
      this.$off(key, this.domList[index]);
    });
  }
}
Chimee.install(Stater);
class HollowMan extends Chimee.plugin {
  constructor(...args) {
    super(...args);
    this.$operable = false;
    this.$dom.classList.add('hollow-man');
  }
}
Chimee.install(HollowMan);
const postman = {
  name: 'postman',
  data: {
    domList: [],
  },
  create() {
    this.$dom.classList.add('postman');
    domEventList.forEach(key => {
      const fn = () => log(key, '#FACB03');
      this.$dom.addEventListener(key, fn);
      this.domList.push(fn);
    });
  },
  destroy() {
    domEventList.forEach((key, index) => {
      this.$dom.removeEventListener(key, this.domList[index]);
    });
  },
  penetrate: true,
  events: {
    mouseenter(evt) {
      log('mouseenter', '#843A37');
    },
    mouseleave(evt) {
      log('mouseleave', '#843A37');
    },
  },
};
Chimee.install(postman);
const interceptor = {
  name: 'interceptor',
  data: {
    domList: [],
  },
  create() {
    this.$dom.classList.add('interceptor');
    this.div = document.createElement('div');
    this.$dom.appendChild(this.div);
    domEventList.forEach(key => {
      const fn = evt => {
        // evt.stopPropagation(); // 为什么 penetrate:false 后 还要 stop
        log(key, '#DB6100');
      };
      this.div.addEventListener(key, fn);
      this.domList.push(fn);
    });
  },
  destroy() {
    domEventList.forEach((key, index) => {
      this.div.removeEventListener(key, this.domList[index]);
    });
  },
  penetrate: false,
};
Chimee.install(interceptor);
const player = new Chimee({
  // 播放地址
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // 直播:live 点播：vod
  type: 'vod',
  // 编解码容器
  box: 'mp4',
  // $dom容器
  wrapper: '#wrapper',
  plugin: [
    'stater',
    'hollow-man',
    'postman',
    'interceptor',
  ],
  autoplay: false,
  controls: true,
});
window.player = player;
player.load();
// player.attachMedia();
document.getElementById('play').addEventListener('click', function() {
  player.play();
});
document.getElementById('pause').addEventListener('click', function() {
  player.pause();
});
document.getElementById('load').addEventListener('click', function() {
  player.load();
});
