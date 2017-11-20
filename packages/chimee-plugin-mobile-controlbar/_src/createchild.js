import Component from './component.js';
import Play from './play.js';
import Volume from './volume.js';
import ProgressBar from './progressbar.js';
import ProgressTime from './progresstime.js';
import Screen from './screen.js';
import Clarity from './clarity.js';

function hundleChildren (plugin) {
  let childConfig = {};
  if(!plugin.$config.children) {
    childConfig = plugin.isLive ? {
      play: true, // 底部播放暂停按钮
      progressTime: false, // 播放时间
      progressBar: false, // 播放进度控制条
      volume: true, // 声音控制
      screen: true, // 全屏控制
    } : {
      play: true, // 底部播放暂停按钮
      progressTime: true, // 播放时间
      progressBar: true, // 播放进度控制条
      volume: true, // 声音控制
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
  if(!childConfig) {
    children.play = new Play(plugin);
    children.progressTime = new ProgressTime(plugin);
    children.progressBar = new ProgressBar(plugin);
    children.volume = new Volume(plugin);
    children.screen = new Screen(plugin);
  }else{
    Object.keys(childConfig).forEach(item => {
      switch(item) {
        case 'play':
          if(childConfig.play) {
            children.play = new Play(plugin, childConfig.play);
          }
          break;
        case 'progressTime':
          if(childConfig.progressTime) {
            children.progressTime = new ProgressTime(plugin, childConfig.progressTime);
          }
          break;
        case 'progressBar':
          children.progressBar = new ProgressBar(plugin, childConfig.progressBar);
          break;
        case 'volume':
          if(childConfig.volume) {
            children.volume = new Volume(plugin, childConfig.volume);
          }
          break;
        case 'screen':
          if(childConfig.screen) {
            children.screen = new Screen(plugin, childConfig.screen);
          }
          break;
        case 'clarity':
          if(childConfig.clarity && Array.isArray(childConfig.clarity.list)) {
            children.clarity = new Clarity(plugin, childConfig.clarity);
          }
          break;
        default:
          children[item] = new Component(plugin, childConfig[item]);
          break;
      }
    });
  }

  return children;
}
