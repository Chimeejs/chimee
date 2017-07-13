#   用法示例
```
import kernel from '/src/kernel/kernel'
//参数1是video dom
//参数2是config
var Kernel=new kernel(document.querySelector('video'),{
    src:'http://xxx/xxx.mp4',
    type:'mp4'
});

//这个方法是重新设置config  这个暂时不支持
//这里面暂时是全部的参数
Kernel.setConfig({
    src:'http://xxx/xxx.mp4',
    isLive:false,
    autoPlay:false,
    type:'mp4'
})

//视频加载
Kernel.load()

```
