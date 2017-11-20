import Play from './play.js';
import Screen from './screen.js';
import ProgressBar from './progressbar.js';

export function createChild (plugin) {
  const childConfig = plugin.config.children;
  const children = {};
  
  children.play = new Play(plugin, childConfig.play);
  children.progressbar = new ProgressBar(plugin, childConfig.progressbar);
  children.screen = new Screen(plugin, childConfig.screen);

  return children;
}
