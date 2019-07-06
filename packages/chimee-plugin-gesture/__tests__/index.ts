import { Chimee } from 'chimee';
import { Gesture } from '../src/index';

describe('plugin function test', () => {
  let player: Chimee;
  let videoDom: HTMLMediaElement;
  beforeAll(() => {
    Chimee.install(Gesture);
    window.scrollTo = () => {};
  });

  beforeEach(() => {
    player = new Chimee({
      box: 'native',
      plugin: [ Gesture.name ],
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      wrapper: document.createElement('div'),
    });
    videoDom = player.$video;
  });

  afterEach(() => {
    player.destroy();
  });

  test('video-dom tap', () => {
    const fn = jest.fn();
    player.$on('tap', fn);
    videoDom.dispatchEvent(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    videoDom.dispatchEvent(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('werid event', () => {
    const fn = jest.fn();
    player.$on('abc', fn);
    videoDom.dispatchEvent(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    videoDom.dispatchEvent(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
