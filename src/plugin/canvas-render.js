// @flow
import Plugin from '../dispatcher/plugin';

export default class CanvasRender extends Plugin {
  __dispatcher: Dispatcher;

  constructor(config: Object, ...args: any []) {
    const myConfig = {
      el: document.createElement('canvas'),
      penetrate: true,
    };
    super(Object.assign(config, myConfig), ...args);
    this.$on('timeupdate', evt => {
      console.log(evt);
    }, { target: 'video' });
  }
}
