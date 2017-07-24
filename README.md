# chimee

[![Build Status](https://img.shields.io/travis/Chimeejs/chimee/master.svg?style=flat-square)](https://travis-ci.org/Chimeejs/chimee.svg?branch=master)
[![Coverage Status](https://img.shields.io/coveralls/Chimeejs/chimee/master.svg?style=flat-square)](https://coveralls.io/github/Chimeejs/chimee?branch=master)
[![npm](https://img.shields.io/npm/v/chimee.svg?colorB=brightgreen&style=flat-square)](https://www.npmjs.com/package/chimee)
[![dependency Status](https://david-dm.org/Chimeejs/chimee.svg)](https://david-dm.org/Chimeejs/chimee)
[![devDependency Status](https://david-dm.org/Chimeejs/chimee/dev-status.svg)](https://david-dm.org/Chimeejs/chimee?type=dev)

English | [中文](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/README.md)

## Introduction

Chimee is a web video player created by Qiwoo Team. It's based on the web video element. It support multiple media streams, including mp4, m3u8, flv etc.

In most situation, we need to support complex function based on video, such as barrage, advertising. It's hard to maintain them if you we just write it based on video. So we may need to have a frame to sort out the logic and handle the communication. So Chimee offer you a plugin system, so that you can splitt your complex function into multiple plugins. Through this reform of development, developers can decouple logic, to achieve gray-scale release and other functions.

Chimee help developer to achieve video scenes easier and quicker.

## Feature

Chimee is a [web video player](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md)

1. It support multiple video stream including mp4, m3u8, flv etc
2. It solve most of the compatibility issues including fullscreen, autoplay, inline playing etc.

What's more, it's also a [component framework](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/why-chimee-is-a-frame.md) based on video element.

1. It help us to split complex function into multiple plugins.
2. For each plugin, they can operate the video element directly and easily.
3. It will sort out the hierarchical relationship between plugins, which will keep us free from `z-index` problem.
4. It provides a variety of modules such as transparent plugin, penetrating plugin, inner plugin and outer plugins, which can cover most of the interative scenerios.
5. It offer us convinient ways to communicate between plugins.
6. It allow us to define high priority plugin, which is useful in making advertising plugin.
7. It also support async plugin.

## Installation

### npm

```
npm install --save chimee
```

### cdn

> TODO: will offer when we publish chimee

## Usage

You can use chimee directly.

Assume you have a `div` whose id is `wrapper`.

```html
<body>
  <div id="wrapper">
  </div>
</body>
```

Then you can setup Chimee on it.

```javascript
import Chimee from 'chimee';
const chimee = new Chimee('#wrapper');
chimee.on('play', () => console.log('play!!'));
chimee.load('http://cdn.toxicjohann.com/lostStar.mp4');
chimee.play(); // play!!
```

Sometimes we need to custom more, we can pass in an object.

```javascript
import Chimee from 'chimee';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: true,
  autoplay: true,
  events: {
    play () {
      console.log('play!!');
    }
  }
});
// play!!
```

If you want to know more about chimee, please click [here](https://github.com/Chimeejs/chimee/blob/master/doc/en/chimee-api.md).

Chimee will use the original skin of browser if you do not use any plugin. You may want to try our UI plugin.

```javascript
import ui from 'chimee-plugin-ui';
import Chimee from 'chimee';
Chimee.install(ui);
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  plugins: [ui.name],
  controls: false,
  autoplay: true
});
```

If you want to know more about Chimee's plugin, please click [here](https://github.com/Chimeejs/chimee/blob/master/doc/en/plugin-api.md).

If you don't want to care too much. And just need a useful video player. You can install chimes-player, which contain base ui and logger.

```javascript
import ChimeePlayer from 'chimee-player';

const chimee = new ChimeePlayer({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: false,
  autoplay: true
});
```



## Documentation

> coming soon~

1. [What is Chimee?](https://github.com/Chimeejs/chimee/blob/master/doc/en/chimee-api.md)
2. [What is Chimee's plugin?](https://github.com/Chimeejs/chimee/blob/master/doc/en/plugin-api.md)
3. [How to write a plugin?](https://github.com/Chimeejs/chimee/blob/master/doc/en/how-to-write-a-plugin.md)
4. [How to write an advertising plugin](https://github.com/Chimeejs/chimee/blob/master/doc/en/how-to-write-an-ad-plugin.md)?
5. [How to write a ui plugin?](https://github.com/Chimeejs/chimee/blob/master/doc/en/how-to-write-a-ui-plugin.md)

## Contribution

clone this project

```
npm install
npm start
```

Then open [http://127.0.0.1:10001/demo/base/index.html](http://127.0.0.1:10001/demo/base/index.html)

You can choose another page as you want

## Changelog

Please read the [realase notes](https://github.com/Chimeejs/chimee/releases).

## License

[MIT](https://opensource.org/licenses/MIT)