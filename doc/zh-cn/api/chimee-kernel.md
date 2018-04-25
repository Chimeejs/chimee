# chimee-kernel

Chimee-kernel is a manger of video decoder.

## Introduction

There are so many video type in the world. Each one may have its own decoder. In that case, we need a manger to handle it. In other word, we need a uniform statute.

What's more, as chimee handle most of the logic of a video player, a decoder can be just simple. It only need to provide normal function like load, play, pause etc.

In chimee, we call these decoder as `VideoKernel`. As a `VideoKernel`, it should fit rules below.

| name        | meaning                                  | type          | arguments                                | note                   |
| ----------- | ---------------------------------------- | ------------- | ---------------------------------------- | ---------------------- |
| isSupport   | A method to tell us whether the decoder can be runned in this browser | static method | none                                     | Must be a staic method |
| constructor | The constructor of `VideoKernel`, we will passed in with three arguments, an HTMLVideoElement, an Object as `KernelConfig`, another Object as `CustomConfig` | method        | videoElement: HTMLVideoElement, kernelConfig: Object, customConfig: Object |                        |
| load        | A method to load src                     | method        | src: string                              |                        |
| stopLoad    | stop the network loading                 | method        | None                                     |                        |
| startLoad   | Resume from stopLoad or any network error | method        | src: string                              |                        |
| play        | A method to play the vidoe               | method        | None                                     |                        |
| pause       | A method to pause the playing            | method        | None                                     |                        |
| refresh     | A method to reload the src               | method        | none                                     | not ready to use yet   |
| attachMedia |                                          | method        | none                                     |                        |
| seek        | A method to seek to a specific point     | method        | second: number                           |                        |
| destroy     | A method which will be called when we destroy the kernel | method        | none                                     |                        |
| config      | The config you stored                    | attribute     |                                          |                        |
| video       | You can store the video element here     | attribute     |                                          |                        |
| on          | A method to listen on your video kernel  | method        | type: string, handler: Function          |                        |
| off         | A method to stop listening on your video kernel | method        | type: string, handler: Function          |                        |
| once        | A method to listen on your video kernel only one time | method        | type: string, handler: Function          |                        |
| emit        | A method to emit event on your video kernel | method        | type: string, data: any                  |                        |

In nowaday, we will rebuild the video kernel when user change the src.

If you support src switch on your video kernel. Please contact us, we need to add you into whitelist.

> We may support use config on installKernel later.

## Installation

```
npm install --save chimee-kernel
```
## Usage
```javascript
import ChimeeKernel from 'chimee-kernel'

var kernel = new ChimeeKernel(document.querySelector('video'),{
    src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL2791e64b69ea0bea234c284c694986aa.flv',
    type: 'vod',
    box: 'flv'
});

//load source
kernel.load()
```

Config:

| Field        | Type                   | Description                              |
| ------------ | ---------------------- | ---------------------------------------- |
| src          | `String`               | video source                             |
| isLive       | `Boolean`              | `'false'` or `'true'`，set video is a live stream or vod |
| box          | `String`               | Indicates stream box `'flv'` , `'hls'` , `'native'` , `'mp4'` |
| preset       | `{[string]: Function}` | set kernel decoder，example: `import chimeeKernelFlv for 'chimee-kernel-flv'; preset:{'flv': chimeeKernelFlv}` |
| presetConfig | `{[string]: Object}`   | custom config to some kernel decoder     |

Event:

| Field       | Type     | Description      |
| ----------- | -------- | ---------------- |
| `mediaInfo` | `Object` | video  mediaInfo |
| `heartbeat` | `Object` | emit per-second  |
| `error`     | `Object` | kernel error     |

Error code FLV:

| Errno | Type     | Description        |
| ----- | -------- | ------------------ |
| `100` | `Number` | NET_ERROR          |
| `101` | `Number` | CODEC_ERROR        |
| `102` | `Number` | CANNOT_SEEK        |
| `103` | `Number` | ENDOFSTREAM_ERROR  |
| `104` | `Number` | MEDIASOURCE_ERROR  |
| `105` | `Number` | SOURCEBUFFER_ERROR |
| `106` | `Number` | SBABORT_ERROR      |
| `106` | `Number` | APPENDBUFFER_ERROR |
