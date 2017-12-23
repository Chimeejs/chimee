# chimee-kernel-hls

[![Build Status](https://img.shields.io/travis/Chimeejs/chimee-kernel-hls/master.svg?style=flat-square)](https://travis-ci.org/Chimeejs/chimee-kernel-hls.svg?branch=master)
[![Coverage Status](https://img.shields.io/coveralls/Chimeejs/chimee-kernel-hls/master.svg?style=flat-square)](https://coveralls.io/github/Chimeejs/chimee-kernel-hls?branch=master)
[![npm](https://img.shields.io/npm/v/chimee-kernel-hls.svg?colorB=brightgreen&style=flat-square)](https://www.npmjs.com/package/chimee-kernel-hls)
[![dependency Status](https://david-dm.org/Chimeejs/chimee-kernel-hls.svg)](https://david-dm.org/Chimeejs/chimee-kernel-hls)
[![devDependency Status](https://david-dm.org/Chimeejs/chimee-kernel-hls/dev-status.svg)](https://david-dm.org/Chimeejs/chimee-kernel-hls?type=dev)

chimee-kernel-hls is the decoder for [chimee](https://github.com/Chimeejs/chimee). It can decode m3u8 on browser.

It's based on [hls.js](https://github.com/video-dev/hls.js).

It totally fit the requirement of [chimee-kernel](https://github.com/Chimeejs/chimee-kernel).

## Installation
```
npm install --save chimee-kernel-hls
```
## Usage

You can use chimee-kernel-hls in chimee or chimee-player like this.

```javascript
import Chimee from 'chimee';
import ChimeeKernelHls from 'chimee-kernel-hls';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: true,
  autoplay: true,
  kernels: {
    hls: ChimeeKernelHls,
  }
});
chimee.play();
```

We also support custom config on hls.js, such as config describe in the [document](https://github.com/video-dev/hls.js/blob/master/doc/API.md#fine-tuning).

```Javascript
import Chimee from 'chimee';
import ChimeeKernelHls from 'chimee-kernel-hls';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: true,
  autoplay: true,
  kernels: {
    hls: {
      handler: ChimeeKernelHls,
      debug: true,
    }
  }
});
chimee.play();
```