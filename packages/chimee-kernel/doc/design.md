# 接口归纳

梳理归纳 kernel 层所需要用到的配置。

## kernel 向上要求传入的配置

```javascript
export default {
  isLive: true, // vod or live
  box: 'native', // box type : native mp4 hls flv
  lockInternalProperty: false, // what's this
  reloadTime: 1500 // deprecated
  src: String,
  preset: {
    [key]: Function, // 特定 kernel 的 class
  },
  presetConfig: {
    [key]: Object, // 针对特定 kernel 的配置
  }
};
```

## 关键属性

* box —— 配置选择使用何种播放器
* currentTime
* duration
* volume
* muted
* buffered

> 后面几个要看看，chimee 似乎现在都不通过 kernel 获取了

## 关键方法

* attachMedia
* load
* play
* pause
* seek
* refresh
* destroy