# 如何编写一个 UI 插件

本章节假设你已经大体了解了 [Chimee 插件机制](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md)，我们一起来看一下怎么编写一个UI插件。

这里我们以比较通用的模态窗插件 `popup` 为例（[点击这里看示例效果](http://hzj.qihu.work/h5-videoplayer/demo/ui-popup/)）。

## 需求准备
首先我们的梳理一下基本的插件需求：

* UI层面
	* 要有标题栏
	* 内容区域
	* 关闭按钮
* 功能层面
	* 希望能控制开启关闭；
	* 当插件开启的时候，我们希望她的显示层级 `z-index` 高于其他插件，避免被遮挡。
	* 当popup开启时播放器要暂停播放
	* 当popup关闭时播放器切为播放状态
* 事件交互
	* 当播放器开始播放时，自动关闭popup
	* 当播放器暂停时，自动打开popup
	* 我们也希望这个插件的开关状态变化能通知到别的插件，让其他人可以有所感知。

> 看起来还挺麻烦，下面赶紧让我们一起看看怎么实现。

## 编码实现

首先我们要结合上面的需求，编写一个符合 [PluginConfig](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md#pluginConfig参数) 约定的插件配置：
```javascript
const popupPluginConfig = {
	name: 'mypopup',
	// 使用 el 设置插件的容器 HTMLTagName
	el: 'chimee-popup',
	// 在插件创建生命周期，实现DOM结构和基本的交互行为
	create () {
		this.$dom.innerHTML = `
			<pp-close title=“我是关闭按钮”>×</pp-close>
			<pp-title>这里是标题</pp-title>
			<pp-body>这里是内容</pp-body>
		`;
		// 为关闭按钮绑定关闭交互
		this.$dom.querySelector('pp-close').addEventListener('click', this.close);
	},
	methods: {
		// 为插件实现关闭功能
		close () {
			this.$dom.style.display = 'none';
			// 开始播放
			this.$emit('play');
			// 通知全局popup关闭了，并通过参数将关闭的popup实例传递过去
			this.$emit('popupClose', this);
		},
		// 为插件实现开启功能
		open () {
			// 提升z-index为最高
			this.$bumpToTop();
			this.$dom.style.display = 'block';
			// 暂停播放
			this.$emit('pause');
			// 通知全局popup打开了，并通过参数将关闭的popup实例传递过去
			this.$emit('popupOpen', this);
		}
	},
	events: {
		// 监听播放器播放事件，以实现播放时自动关闭popup
		play () {
			this.close();
		},
		// 监听播放器暂停事件，以实现暂停时自动打开popup
		pause () {
			this.open();
		}
	}
};
```

基于 `Chimee Plugin` 实现很简单对不对？让我们先结合前面章节的[插件应用](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md#插件用法)使用起来看看。

```javascript
Chimee.install(popupPluginConfig);
const chimee = new Chimee({
  wrapper: '#wrapper',
  plugins: [popupPluginConfig.name]
});

// 我们可以在相应业务逻辑里使用开启或关闭方法控制我们的popup
chimee.mypopup.open();
chimee.mypopup.close();
```


> 不过上面的代码没有包含css，如果要看效果记得参考下面示例定制自己的样式：
```css
chimee-popup {
	position: absolute;
	color: #fff;
	background-color: rgba(88, 88, 88, 0.5);
	font-size: 13px;
	font-family: sans-serif;
	border: 1px solid rgba(255, 255, 255, 0.08);
	padding: 3px;
	width: 200px;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
chimee-popup pp-title{
	border-bottom: 1px solid rgba(255, 255, 255, 0.18);
	padding: 0 5px 4px;
	margin-bottom: 5px;
}
chimee-popup pp-body {
    display: block;
    padding: 3px 3px 6px;
}
chimee-popup pp-close{
	float: right;
	color: #fff;
	text-decoration: none;
	opacity: .8;
	cursor: pointer;
	line-height: 14px;
	text-shadow: 0 0 1px #000;
	font-size: 15px;
	padding: 0 3px;
	cursor: pointer;
}
```

## 小结

当然，上面只是一个简单的例子，还有[很多功能](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/plugin-api.md)是没有用上的。

基于 `Chimee PluginConfing` API可以非常方便的实现自己想要的UI插件，[比如广告控制](http://hzj.qihu.work/h5-videoplayer/demo/ui-ad/)。


也许你已经想到可以做更多的事情了吧？赶紧行动起来吧！插件开发API有什么建议或想法也欢迎随时反馈。

## popupFactory

另外，为了方便实现弹层插件，我们也另外抽象了一个[popup工厂方法](http://hzj.qihu.work/h5-videoplayer/esdoc/function/index.html#static-function-popupFactory), 像开始提到的popup示例以及前文的广告示例就是基于这个实现的。

基于这个包装你的 `pluginConfig` ，我们给popup提供了一些定制化参数和 `methods` 扩展，可以更方便的进行尺寸大小、坐标位置控制等。

