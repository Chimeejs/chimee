import Component from './component.js';
import Play from './play.js';
import Screen from './screen.js';
import ProgressBar from './progressbar.js';
import CurrentTime from './currenttime.js';
import TotalTime from './totaltime.js';

function hundleChildren (plugin) {
  let childConfig = {};
  if(!plugin.$config.children) {
    childConfig = plugin.isLive ? {
      play: true, // 底部播放暂停按钮
      currentTime: false, // 播放时间
      progressBar: false, // 播放进度控制条
      totalTime: false, // 总时间
      screen: true, // 全屏控制
    } : {
      play: true, // 底部播放暂停按钮
      currentTime: true, // 播放时间
      progressBar: true, // 播放进度控制条
      totalTime: true, // 总时间
      screen: true, // 全屏控制
    };
  }else{
    childConfig = plugin.$config.children;
  }
  return childConfig;
}

/**
 * 1. 将所有的 ui component 输出到 html 结构中
 * 2. 为这些 component 绑定响应的事件
 * @param {*} dom 所有 ui 节点的子容器
 * @param {*} config 关于 ui 的一些列设置
 * @return {Array} 所有子节点
 */

export function createChild (plugin) {
  const childConfig = plugin.config.children = hundleChildren(plugin);
  const children = {};
  Object.keys(childConfig).forEach(item => {
    switch(item) {
      case 'play':
        if(childConfig.play) {
          children.play = new Play(plugin, childConfig.play);
        }
        break;
      case 'currentTime':
        if(childConfig.currentTime) {
          children.currentTime = new CurrentTime(plugin, childConfig.currentTime);
        }
        break;
      case 'progressBar':
        children.progressBar = new ProgressBar(plugin, childConfig.progressBar);
        break;
      case 'totalTime':
        if(childConfig.totalTime) {
          children.totalTime = new TotalTime(plugin, childConfig.totalTime);
        }
        break;
      case 'screen':
        if(childConfig.screen) {
          children.screen = new Screen(plugin, childConfig.screen);
        }
        break;
      default:
        children[item] = new Component(plugin, childConfig[item]);
        break;
    }
  });

  return children;
}

