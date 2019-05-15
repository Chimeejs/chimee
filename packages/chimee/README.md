# Chimee

[![Build Status](https://img.shields.io/travis/Chimeejs/chimee/master.svg?style=flat-square)](https://travis-ci.org/Chimeejs/chimee.svg?branch=master)
[![Coverage Status](https://img.shields.io/coveralls/Chimeejs/chimee/master.svg?style=flat-square)](https://coveralls.io/github/Chimeejs/chimee?branch=master)
[![npm](https://img.shields.io/npm/v/chimee.svg?colorB=brightgreen&style=flat-square)](https://www.npmjs.com/package/chimee)
[![dependency Status](https://david-dm.org/Chimeejs/chimee.svg)](https://david-dm.org/Chimeejs/chimee)
[![devDependency Status](https://david-dm.org/Chimeejs/chimee/dev-status.svg)](https://david-dm.org/Chimeejs/chimee?type=dev)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)
[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/Chimeejs/chimee.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Chimeejs/chimee/context:javascript)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/Chimeejs/chimee.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Chimeejs/chimee/alerts) [![Greenkeeper badge](https://badges.greenkeeper.io/Chimeejs/chimee.svg)](https://greenkeeper.io/)

English | [中文](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/README.md)

## Introduction

Chimee is a web video player created by the Qiwoo Team. It's based on the web video element. It supports multiple media streams, including mp4, m3u8, flv, etc.

In most situations, we need to support complex functions based on video, such as many videos or advertising. It's hard to maintain them if you we just write it based on the video element. So we may need to have an iframe to sort out the logic and handle the communication. So Chimee offers a plugin system, so that anyone can split your complex functions into multiple plugins. Through this method of development, developers can decouple logic to achieve a quicker, gray-scale release and implement many other functions with relative ease.

Chimee helps developer to reach complex video capabilities from scratch easier and quicker.

## Features

Chimee is a [web video player](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/api/chimee-api.md).

1. It supports multiple video stream including mp4, m3u8, flv, and more.
2. It solves most of the compatibility problems including cross-browser fullscreen, autoplay, and playing inline.

What's more, it's also a [component framework](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/design/why-chimee-is-a-frame.md) based on the video element.

1. It helps us to split complex functions off into multiple plugins.
2. Each plugin can work on the video element directly and easily.
3. This framework sorts out the hierarchical relationship between plugins, which will keep us free from the `z-index` problem.
4. It provides a variety of modules such as a transparent plugin, a penetrating plugin, an inner plugin, and an outer plugin, which will cover most of the interactive scenarios.
5. It offers us convenient ways to communicate between plugins.
6. It allows us to define plugin priority, which has been useful in making the advertising plugin work as expected.
7. It also supports asynchronous plugins.

## Installation

### npm

```
npm install --save chimee
```

### cdn

You can get the cdn url on [https://cdnjs.com/libraries/chimee](https://cdnjs.com/libraries/chimee).

If you are in china, you can get the cdn url on [https://www.jsdelivr.com/package/npm/chimee](https://www.jsdelivr.com/package/npm/chimee).

## Usage

You can use Chimee directly.

Assuming you have a `div` whose id is `wrapper`:

```html
<body>
  <div id="wrapper">
  </div>
</body>
```

You can then setup Chimee on it:

```javascript
import Chimee from 'chimee';
const chimee = new Chimee('#wrapper');
chimee.on('play', () => console.log('play!!'));
chimee.load('http://cdn.toxicjohann.com/lostStar.mp4');
chimee.play(); // play!!
```

Sometimes we need more customization; Chimee can be called by passing in an object:

```javascript
import Chimee from 'chimee';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: true,
  autoplay: true,
});
```

If you need to play video in flv or hls, you can simply add those kernels:

```javascript
import Chimee from 'chimee';
import flv from 'chimee-kernel-flv';
import hls from 'chimee-kernel-hls';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: true,
  autoplay: true,
  kernels: {
    flv,
    hls
  }
});
chimee.play();
```

Or you can try `installKernel`, and then use it:

```javascript
import Chimee from 'chimee';
import flv from 'chimee-kernel-flv';
import hls from 'chimee-kernel-hls';
Chimee.installKernel(flv);
Chimee.installKernel(hls);
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: true,
  autoplay: true,
  kernels: [ 'flv', 'hls' ],
});
chimee.play();
```

If you want to know more about Chimee, please read more on our API docs, [here](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/api/chimee-api.md).

However, if you use Chimee directly, it's best to add this style to your page:

```css
container {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
video {
  width: 100%;
  height: 100%;
  display: block;
  background-color: #000;
}
video:focus,
video:active {
  outline: none;
}
```

Chimee will simply use the default styles of browsers if you do not use any plugins. But you may want to try our UI plugin…

```javascript
import popup from 'chimee-plugin-popup';
import Chimee from 'chimee';
Chimee.install(popup);
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  plugin: [popup.name],
  controls: false,
  autoplay: true
});
```

If you want to know more about Chimee's plugins, please read more [here](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/api/plugin-api.md).

If you don't want more capabilities, and just need a useful video player, you can install `chimee-player`, which contains the base ui and a loggerL

```javascript
import ChimeePlayer from 'chimee-player';

const chimee = new ChimeePlayer({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: false,
  autoplay: true
});
```

## FAQ

> TODO: more coming soon!~

1. [What is Chimee?](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/api/chimee-api.md)
2. [What is Chimee's plugin?](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/api/plugin-api.md)
3. [How do I write a plugin?](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/advanced/how-to-write-a-plugin.md)
4. [How do I write an advertising plugin?](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/advanced/how-to-write-an-ad-plugin.md)?
5. [How do I write a UI plugin?](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/advanced/how-to-write-a-ui-plugin.md)

## Explanation of Different Builds

You will find four different builds in the lib.

| Name             | Kind     | Meaning                                            | Define environment?      |
| ---------------- | -------- | -------------------------------------------------- | ------------------------ |
| index.js         | commonjs | Common javascript, mostly used in Webpack 1.       | Yes                      |
| index.mjs        | esmodule | An es module, mostly used in Webpack 2 and rollup. | Yes                      |
| index.browser.js | umd      | Can be used directly in browser                    | No (It's in development) |
| index.min.js     | umd      | Can be used directly in browser                    | No (It's in production)  |
| Index.esm.js     | esmodule | An es module, mostly used in browser es module     | No (It's in development) |

## Development

Development/production modes are hard-coded for the UMD builds: the un-minified files are for development, and the minified files are for production.

CommonJS and ES Module builds are intended for bundlers, therefore we don’t provide minified versions for them. Developers are be responsible for minifying the final bundle themselves.

CommonJS and ES Module builds also preserve raw checks for `process.env.NODE_ENV` to determine the mode they should run in. Developers should use appropriate bundler configurations to replace these environment variables in order to control which mode Vue will run in. Replacing `process.env.NODE_ENV` with string literals also allows minifiers like UglifyJS to completely drop the development-only code blocks, agressively reducing final file size.

### Webpack

Use Webpack’s [DefinePlugin](https://webpack.js.org/plugins/define-plugin/):

```javascript
var webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
```

### Rollup

Use [rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace):

```javascript
const replace = require('rollup-plugin-replace')

rollup({
  // ...
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}).then(...)
```

## Contribution

Install this project

```
npm install
npm start
```

Then open [http://127.0.0.1:10001/demo/base/index.html](http://127.0.0.1:10001/demo/base/index.html)

You can choose another page as you want

## Changelog

Please read the [release notes](https://github.com/Chimeejs/chimee/releases).

## License

[MIT](https://opensource.org/licenses/MIT)
