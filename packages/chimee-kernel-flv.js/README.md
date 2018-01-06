# chimee-kernel-flv.js

[![Build Status](https://img.shields.io/travis/Chimeejs/chimee-kernel-flv.js/master.svg?style=flat-square)](https://travis-ci.org/Chimeejs/chimee-kernel-flv.js.svg?branch=master)
[![Coverage Status](https://img.shields.io/coveralls/Chimeejs/chimee-kernel-flv.js/master.svg?style=flat-square)](https://coveralls.io/github/Chimeejs/chimee-kernel-flv.js?branch=master)
[![npm](https://img.shields.io/npm/v/chimee-kernel-flv.js.svg?colorB=brightgreen&style=flat-square)](https://www.npmjs.com/package/chimee-kernel-flv.js)
[![dependency Status](https://david-dm.org/Chimeejs/chimee-kernel-flv.js.svg)](https://david-dm.org/Chimeejs/chimee-kernel-flv.js)
[![devDependency Status](https://david-dm.org/Chimeejs/chimee-kernel-flv.js/dev-status.svg)](https://david-dm.org/Chimeejs/chimee-kernel-flv.js?type=dev)

chimee-kernel-flv.js is the decoder for [chimee](https://github.com/Chimeejs/chimee). It can decode m3u8 on browser.

It's based on [flv.js.js](https://github.com/video-dev/flv.js.js).

It totally fit the requirement of [chimee-kernel](https://github.com/Chimeejs/chimee-kernel).

It should only be used in the PC, as most of mobile browser support m3u8.

## Installation
```
npm install --save chimee-kernel-flv.js
```
## Usage

You can use chimee-kernel-flv.js in chimee or chimee-player like this.

```javascript
import Chimee from 'chimee';
import ChimeeKernelFlvJs from 'chimee-kernel-flv.js';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: true,
  autoplay: true,
  kernels: {
    flv: ChimeeKernelFlvJs,
  }
});
chimee.play();
```

We also support custom config on flv.js.js, such as config describe in the [document](https://github.com/Bilibili/flv.js/blob/master/docs/api.md).

```Javascript
import Chimee from 'chimee';
import ChimeeKernelFlvJs from 'chimee-kernel-flv.js';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: true,
  autoplay: true,
  kernels: {
    flv: {
      handler: ChimeeKernelFlvJs,
      lazyLoad: true,
    }
  }
});
chimee.play();
```