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
`src?` | `string` | video source
`isLive` | `boolean` | `'false'` or `'true'`，set video is a live stream or vod
`box` | `string` | Indicates stream box `'flv'` or `'hls'` or `'native'` or `'mp4'`
`preset?`| `object`| set kernel decoder，example: `import chimeeKernelFlv for 'chimee-kernel-flv'; preset:{'flv': chimeeKernelFlv}`
