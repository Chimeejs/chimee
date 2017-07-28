const Chimee = window.Chimee;
const controller = {
  name: 'controller',
  el: 'controller',
  create () {
    this.$dom.classList.add('controller');
    this.button = document.createElement('button');
    this.button.innerText = 'Play';
    this.operation = 'play';
    this.button.addEventListener('click', () => {
      this.$emit(this.operation);
    });
    this.$dom.appendChild(this.button);
    this.$css('z-index', 10);
    this.$css('video', 'z-index', -1);
    this.$css('wrapper', 'z-index', 10);
    this.$attr('data-index', 1);
    this.$attr('video', 'data-index', 1);
    this.$attr('wrapper', 'data-index', 1);
  },
  init (config) {
  },
  destroy () {
    this.$dom.removeChild(this.button);
  },
  events: {
    pause (...args) {
      this.setButton('play');
      console.log('i am going to throw an error');
      throw new Error('i am a fucking error');
    },
    play (...args) {
      this.setButton('pause');
    },
    load (...args) {
      this.setButton('play');
    }
  },
  methods: {
    setButton (state) {
      this.button.innerText = state;
      this.operation = state;
    }
  }
};
Chimee.install(controller);
const locker = {
  name: 'locker',
  data: {
    button: document.createElement('button'),
    _locked: false,
  },
  computed: {
    locked: {
      set (val) {
        const nextType = val ? 'unlock' : 'lock';
        const currentType = val ? 'lock' : 'unlock';
        this.button.innerText = nextType;
        this.$emit(currentType);
        this.$dom.classList.remove(nextType);
        this.$dom.classList.add(currentType);
        this._locked = val;
      },
      get (val) {
        return this._locked;
      }
    }
  },
  create () {
    this.$dom.classList.add('locker');
    this.locked = false;
    this.$dom.appendChild(this.button);
    this.button.addEventListener('click', () => {
      this.locked = !this.locked;
    });
  },
  init (config) {
  },
  destroy () {
    this.$dom.removeChild(this.button);
  },
  events: {
    beforePause () {
      return !this.locked;
    },
    beforePlay () {
      return !this.locked;
    }
  }
};
Chimee.install(locker);
const loader = {
  name: 'loader',
  el: document.createElement('button'),
  data: {
    videos: [
      'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
      'http://cdn.toxicjohann.com/lostStar.mp4'
    ],
    chosen: true
  },
  create () {
    this.$dom.classList.add('loader');
    this.$dom.innerText = 'next';
    this.$dom.addEventListener('click', () => this.next());
  },
  init (config) {
  },
  destroy () {
  },
  methods: {
    next () {
      this.chosen = !this.chosen;
      const src = this.videos[Number(this.chosen)];
      this.$emit('load', src);
    }
  }
};
Chimee.install(loader);
const banner = {
  name: 'banner',
  el: '<button>untouchable</button>',
  level: 99,
  operable: false,
  create () {
    this.$dom.classList.add('banner');
  }
};
Chimee.install(banner);

const player = new Chimee({
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // 直播:live 点播：vod
  type: 'vod',
  // 编解码容器
  box: 'mp4',
  // $dom容器
  wrapper: '#wrapper',
  plugin: [
    'banner',
    {
      name: 'controller',
      level: 2
    },
    {
      name: 'locker',
      level: 1
    },
    'loader'
  ],
  autoplay: false,
  controls: true
});
window.player = player;
player.load();
document.addEventListener('mouseup', function (evt) {
  document.getElementById('active').innerText = document.activeElement.toString();
});
