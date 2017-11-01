# Chimee API

Chimee is an encapsulation of native video element. So, it will consistent with the native video elements in many uses. This article will introduce Chimee at the video level of the specific usage.

At the same time, Chimee is a component framework. To know more about it, please read [Why Chimee is designed as a componentized framework?](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/why-chimee-is-a-frame.md).

This article will be divided into the following sections to elaborate:

* [create instance](#create-instance)
* [method of video element](#method-of-video-element)
* [attribute of video element](#attribute-of-video-element)
* [api about listening to events](#api-about-listening-to-events)
* [api about observing data change](#api-about-observing-data-change)
* [api about fullscreen](#api-about-fullscreen)
* [attribute about fullscreen](#attribute-about-fullscreen)
* [Plugin](#plugin)

## create instance

We can create an Chimee instance just by using `new`. Each Chimee instance needs a DOM node to bind, which we called it wrapper.  That's what you should offer at least.

The constructor accept three kinds of data, string,  HTMLElment, Object.

You can pass in a selector of wrapper.

```javascript
const chimee = new Chimee('#wrapper');
```

Or a HTMLElement

```javascript
const wrapper = document.createElement('div');
const chimee = new Chimee(wrapper);
```

If you need to pass in more config, you can choose Object.

```javascript
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: false,
  autoplay: true
});
```

The attributes of Object including:

### wrapper

* type: `string | HTMLElement`
* meaning:  The container of Chimee
* precautions:
  * required

### isLive

- type：`boolean`
- meaning：how to play
- optional：`false`（vod）和 `true`（live）
- default：`false`

### box

- type：`string`
- meaning：video coding
- optional：`flv`、`native`和`hls`
- default：we will choose the right box according to the video source. If we can't find out what box it relly need, we will choose `native`.会

### \* preset

- type: `Object`
- meaning:  If we include all kernels into chimee, that will make chimee too big. So we just include native kernel in Chimee. If you want chimee support other video code, you need to install other kernel. 
- default: `{}`

> preset will rename as kernels in v0.4.0