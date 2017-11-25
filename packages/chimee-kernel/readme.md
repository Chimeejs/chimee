# chimee-kernel

## Installation
```
npm install --save chimee-kernel
```
## Usage
```
<video></video>

import kernel from '/src/kernel/kernel'

var Kernel=new kernel(document.querySelector('video'),{
    src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TL2791e64b69ea0bea234c284c694986aa.flv',
    type: 'vod',
    box: 'flv'
});

//load source
Kernel.load()

```

Config:

Field | Type | Description
---|---|---
`src?` | `String` | video source
`isLive` | `Boolean` | `'false'` or `'true'`，set video is a live stream or vod
`box` | `String` | Indicates stream box `'flv'` or `'hls'` or `'native'` or `'mp4'`
`preset?`| `Object`| set kernel decoder，example: `import chimeeKernelFlv for 'chimee-kernel-flv'; preset:{'flv': chimeeKernelFlv}`

Event:

Field | Type | Description
---|---|---
`mediaInfo` | `Object` | video  mediaInfo
`heartbeat` | `Object` | emit per-second
`error` | `Object` | kernel error

Error code FLV:
Errno | Type | Description
---|---|---
`100` | `Number` | NET_ERROR
`101` | `Number` | CODEC_ERROR
`102` | `Number` | CANNOT_SEEK
`103` | `Number` | ENDOFSTREAM_ERROR
`104` | `Number` | MEDIASOURCE_ERROR
`105` | `Number` | SOURCEBUFFER_ERROR
`106` | `Number` | SBABORT_ERROR
`106` | `Number` | APPENDBUFFER_ERROR