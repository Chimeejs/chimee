import Chimee from 'index';
import { bind } from 'chimee-helper';

function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

describe('picture in picture mode', () => {
  describe('pictureInPictureEnabled', () => {
    let originCreateElement;
    let requestPictureInPictureFn;
    let exitPictureInPictureFn;

    beforeEach(() => {
      document.pictureInPictureEnabled = true;
      requestPictureInPictureFn = jest.fn();
      exitPictureInPictureFn = jest.fn();

      originCreateElement = global.document.createElement;
      global.document.createElement = function(tag) {
        const element = bind(originCreateElement, document)(tag);
        if (tag === 'video') {
          element.requestPictureInPicture = () => {
            requestPictureInPictureFn();
            document.pictureInPictureElement = element;
            return Promise.resolve({});
          };
        }
        return element;
      };

      document.exitPictureInPicture = () => {
        exitPictureInPictureFn();
        document.pictureInPictureElement = undefined;
        return;
      };
    });

    afterEach(() => {
      delete document.pictureInPictureEnabled;
      global.document.createElement = originCreateElement;
      document.exitPictureInPicture = undefined;
    });

    test('basic flow', async () => {
      const player = new Chimee({
        wrapper: document.createElement('div'),
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      });
      expect(requestPictureInPictureFn).toHaveBeenCalledTimes(0);
      expect(requestPictureInPictureFn).toHaveBeenCalledTimes(0);
      expect(window.__chimee_picture_in_picture_window).toBe();
      expect(player.inPictureInPictureMode).toBe(false);
      await player.requestPictureInPicture();
      expect(requestPictureInPictureFn).toHaveBeenCalledTimes(1);
      expect(window.__chimee_picture_in_picture_window).not.toBe();
      expect(player.inPictureInPictureMode).toBe(true);
      player.exitPictureInPicture();
      expect(exitPictureInPictureFn).toHaveBeenCalledTimes(1);
      expect(window.__chimee_picture_in_picture_window).toBe();
      expect(player.inPictureInPictureMode).toBe(false);
    });

    test('repeated call requestPictureInPicuture', async () => {
      const player = new Chimee({
        wrapper: document.createElement('div'),
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      });
      expect(requestPictureInPictureFn).toHaveBeenCalledTimes(0);
      expect(requestPictureInPictureFn).toHaveBeenCalledTimes(0);
      expect(window.__chimee_picture_in_picture_window).toBe();
      expect(player.inPictureInPictureMode).toBe(false);
      await player.requestPictureInPicture();
      await player.requestPictureInPicture();
      expect(requestPictureInPictureFn).toHaveBeenCalledTimes(1);
      expect(window.__chimee_picture_in_picture_window).not.toBe();
      expect(player.inPictureInPictureMode).toBe(true);
      player.exitPictureInPicture();
      expect(exitPictureInPictureFn).toHaveBeenCalledTimes(1);
      expect(window.__chimee_picture_in_picture_window).toBe();
      expect(player.inPictureInPictureMode).toBe(false);
    });

    test('just call exitPictureInPicture', async () => {
      const player = new Chimee({
        wrapper: document.createElement('div'),
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      });
      player.exitPictureInPicture();
      expect(exitPictureInPictureFn).toHaveBeenCalledTimes(0);
      expect(window.__chimee_picture_in_picture_window).toBe();
      expect(player.inPictureInPictureMode).toBe(false);
    });
  });

  describe('canvas mode', () => {
    test('basic flow', async () => {
      const player = new Chimee({
        wrapper: document.createElement('div'),
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      });
      expect(player.inPictureInPictureMode).toBe(false);
      await player.requestPictureInPicture();
      await sleep(100);
      expect(window.__chimee_picture_in_picture).not.toBe();
      expect(player.inPictureInPictureMode).toBe(true);
      player.exitPictureInPicture();
      expect(window.__chimee_picture_in_picture).toEqual({});
      expect(player.inPictureInPictureMode).toBe(false);
    });

    test('repeated call requestPictureInPicuture', async () => {
      const player = new Chimee({
        wrapper: document.createElement('div'),
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      });
      expect(player.inPictureInPictureMode).toBe(false);
      await player.requestPictureInPicture();
      await player.requestPictureInPicture();
      await sleep(100);
      expect(window.__chimee_picture_in_picture).not.toBe();
      expect(player.inPictureInPictureMode).toBe(true);
      player.exitPictureInPicture();
      expect(window.__chimee_picture_in_picture).toEqual({});
      expect(player.inPictureInPictureMode).toBe(false);
    });
  });
});
