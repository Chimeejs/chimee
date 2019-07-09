import { Chimee } from 'chimee';
import { Gesture } from 'chimee-plugin-gesture';
import { MobileState } from '../src/index';

describe('ChimeePluginMobileState test', () => {
  let player: Chimee;
  let videoDom: HTMLVideoElement;
  let plugin: MobileState;

  beforeAll(() => {
    Chimee.install(Gesture);
    Chimee.install(MobileState);
  });

  test('should install ChimeePluginGesture', () => {
    expect(() => new Chimee({
      box: 'native',
      plugin: [ MobileState.name ],
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      wrapper: document.createElement('div'),
    })).toThrow();
  });

  test('normal build', () => {
    let player: Chimee;
    expect(() => {
      player = new Chimee({
        box: 'native',
        plugin: [ Gesture.name, MobileState.name ],
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        wrapper: document.createElement('div'),
      });
    }).not.toThrow();
    player.destroy();
  });

  test('custom gesture', () => {
    let player: Chimee;
    expect(() => {
      player = new Chimee<MobileState>({
        box: 'native',
        plugin: [ ({
          customGesture: true,
          name: MobileState.name,
        }) ],
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        wrapper: document.createElement('div'),
      });
    }).not.toThrow();
    player.destroy();
  });

  describe('state change', () => {
    beforeEach(() => {
      player = new Chimee({
        box: 'native',
        plugin: [ Gesture.name, MobileState.name ],
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        wrapper: document.createElement('div'),
      });
      videoDom = player.$video;
      // @ts-ignore
      plugin = player.dispatcher.getPluginByName(MobileState.name);
    });

    afterEach(() => {
      player.destroy();
    });

    test('seeking', () => {
      Object.defineProperty(videoDom, 'paused', { value: false });
      videoDom.dispatchEvent(new Event('seeking'));
      expect(plugin.currentState).toBe('loading');
      expect(plugin.isShown).toBe(true);
    });

    test('waiting after paused', () => {
      Object.defineProperty(videoDom, 'paused', { value: true });
      videoDom.dispatchEvent(new Event('waiting'));
      expect(plugin.currentState).toBe('play');
      expect(plugin.isShown).toBe(true);
    });

    test('playing', () => {
      videoDom.dispatchEvent(new Event('playing'));
      expect(plugin.currentState).toBe('');
      expect(plugin.isShown).toBe(false);
    });

    test('play', () => {
      videoDom.dispatchEvent(new Event('play'));
      expect(plugin.currentState).toBe('');
      expect(plugin.isShown).toBe(false);
    });

    test('seeked', () => {
      videoDom.dispatchEvent(new Event('seeked'));
      expect(plugin.currentState).toBe('');
      expect(plugin.isShown).toBe(false);
    });

    test('pause', () => {
      videoDom.dispatchEvent(new Event('pause'));
      expect(plugin.currentState).toBe('play');
      expect(plugin.isShown).toBe(true);
    });

    test('timeupdate', () => {
      expect(() => {
        videoDom.dispatchEvent(new Event('timeupdate'));
      }).not.toThrow();
    });

    test('tap', () => {
      const fn = jest.fn();
      player.$on('state-tap', fn);
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

    test('pan', () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const fn3 = jest.fn();
      player.$on('state-panstart', fn1);
      player.$on('state-panmove', fn2);
      player.$on('state-panend', fn3);
      videoDom.dispatchEvent(new TouchEvent('touchstart', {
        changedTouches: [
          ({
            clientX: 0,
            clientY: 0,
          } as Touch),
        ],
      }));
      videoDom.dispatchEvent(new TouchEvent('touchmove', {
        changedTouches: [
          ({
            clientX: 50,
            clientY: 0,
          } as Touch),
        ],
      }));
      videoDom.dispatchEvent(new TouchEvent('touchmove', {
        changedTouches: [
          ({
            clientX: 80,
            clientY: 0,
          } as Touch),
        ],
      }));
      videoDom.dispatchEvent(new TouchEvent('touchend', {
        changedTouches: [
          ({
            clientX: 100,
            clientY: 0,
          } as Touch),
        ],
      }));
      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
      expect(fn3).toHaveBeenCalledTimes(1);
    });

    test('cleartimeout', () => {
      videoDom.dispatchEvent(new Event('waiting'));
      expect(() => {
        videoDom.dispatchEvent(new Event('timeupdate'));
      }).not.toThrow();
    });
  });
  
  test('preload is false', () => {
    player = new Chimee({
      box: 'native',
      plugin: [ Gesture.name, MobileState.name ],
      preload: 'none',
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      wrapper: document.createElement('div'),
    });
    videoDom = player.$video;
    // @ts-ignore
    plugin = player.dispatcher.getPluginByName(MobileState.name);
    expect(plugin.currentState).toBe('');
    expect(plugin.isShown).toBe(false);
    player.destroy();
  });

  test('create with options', () => {
    let player: Chimee;
    expect(() => {
      player = new Chimee<MobileState>({
        box: 'native',
        plugin: [ Gesture.name, {
          errorTips: 'reload please',
          expectTime: 3e5,
          icon: {},
          name: MobileState.name,
        }],
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        wrapper: document.createElement('div'),
      });
    }).not.toThrow();
    player.destroy();
  });
});
