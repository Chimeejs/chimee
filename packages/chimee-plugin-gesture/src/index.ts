/// <reference path="./chimee-space.ts" />
import { Plugin } from 'chimee';
import { GestureHelper, isSupportedEvents } from './gesture';
export { GestureHelper } from './gesture';

type HelperTarget = 'container' | 'video-dom' | 'wrapper';
type HelperEvent = 'touchstart' | 'touchmove' | 'touchend';

export class Gesture extends Plugin {
  private helpers: {
    [key in HelperTarget]: GestureHelper;
  };
  public static GestureHelper = GestureHelper ;

  public create() {
    this.helpers = {
      'container': new GestureHelper({ fire: this.getFireFn('container') }),
      'video-dom': new GestureHelper({ fire: this.getFireFn('video-dom') }),
      'wrapper': new GestureHelper({ fire: this.getFireFn('wrapper') }),
    };
    this.registerCustomEventTargetAndEventNameTranformer((name: string) => {
      return isSupportedEvents(name) ? 'video-dom' : 'plugin';
    });
    this.bind('$on');
  }

  public destroy() {
    this.bind('$off');
  }

  private bind(fn: '$on' |'$off') {
    const { helpers } = this;
    const targets: HelperTarget[] = [ 'container', 'video-dom', 'wrapper' ];
    const events: HelperEvent[] = ['touchstart', 'touchmove', 'touchend' ];
    targets.forEach((target) => {
      const helper = helpers[target];
      events.forEach((event) => {
        this[fn](event, helper[event], { target });
      });
    });
  }

  private getFireFn(target: HelperTarget): GestureHelper['fire'] {
    return (name, event) => {
      this.$emitSync({ name, target }, event);
    };
  }
}
