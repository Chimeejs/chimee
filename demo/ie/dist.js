(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

// import 'babel-polyfill';
var Chimee = window.Chimee;
var plugin = {
  // 插件名为 controller
  name: 'controller',
  // 插件实体为按钮
  el: '<button>play</button>',
  data: {
    text: 'play'
  },
  methods: {
    changeVideoStatus: function changeVideoStatus() {
      this[this.text]();
    },
    changeButtonText: function changeButtonText(text) {
      this.text = text;
      this.$dom.innerText = this.text;
    }
  },
  // 在插件创建的阶段，我们为插件绑定事件。
  create: function create() {
    this.$dom.addEventListener('click', this.changeVideoStatus);
    this.$watch('controls', function (newVal, oldVal) {
      console.log(newVal, oldVal);
    }, { diff: false });
    console.log(this.$plugins);
  },

  // 插件会在播放暂停操作发生后改变自己的文案及相应的行为
  events: {
    pause: function pause() {
      this.changeButtonText('play');
    },
    play: function play() {
      this.changeButtonText('pause');
    },
    c_contextmenu: function c_contextmenu(evt) {
      console.log(evt);
    },
    c_click: function c_click(evt) {
      console.warn(evt);
    },
    click: function click(evt) {
      console.log(evt);
    }
  }
};
Chimee.install(plugin);
var player = new Chimee({
  // 播放地址
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // src: 'http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL1ce1196bce348070bfeef2116efbdea6.flv',
  // src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/79_3041054cc65-ae8c-4b63-8937-5ccb05f79720.m3u8',
  // dom容器
  wrapper: '#wrapper',
  plugin: ['controller'],
  preset: {
    flv: window.chimeeKernelFlv,
    hls: window.chimeeKernelHls
  },
  volume: 0.1,
  // autoplay: true,
  controls: true
});
player.$on('beforePlay', function (evt) {
  console.warn(evt, 'srth');
});
player.$on('play', function (evt) {
  console.warn(evt, 'srth');
});
window.player = player;
['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange'].forEach(function (key) {
  console.log(key);
  document.addEventListener(key, function (evt) {
    return console.log(key, evt);
  });
});
player.on('fullscreenchange', function (evt) {
  console.log('wowo, fullscreen', evt);
});

})));
