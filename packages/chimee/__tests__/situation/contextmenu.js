import Chimee from 'index';

describe('noDefaultContextMenu', () => {

  test('no noDefaultContextMenu', done => {
    const player = new Chimee(document.body);
    const fn = jest.fn();
    player.on('contextmenu', () => {
      expect(fn).toHaveBeenCalledTimes(0);
      player.destroy();
      done();
    });
    const event = new Event('contextmenu');
    event.preventDefault = fn;
    player.$video.dispatchEvent(event);
  });

  test('set noDefaultContextMenu to be true', done => {
    const player = new Chimee({
      wrapper: document.body,
      noDefaultContextMenu: true,
    });
    const fn = jest.fn();
    player.on('contextmenu', () => {
      expect(fn).toHaveBeenCalledTimes(1);
      player.destroy();
      done();
    });
    const event = new Event('contextmenu');
    event.preventDefault = fn;
    player.$video.dispatchEvent(event);
  });

  test('set noDefaultContextMenu to be wrapper', done => {
    const player = new Chimee({
      wrapper: document.body,
      noDefaultContextMenu: 'wrapper',
    });
    const fn = jest.fn();
    player.on('contextmenu', () => {
      expect(fn).toHaveBeenCalledTimes(1);
      player.destroy();
      done();
    }, { target: 'wrapper' });
    const event = new Event('contextmenu');
    event.preventDefault = fn;
    player.$wrapper.dispatchEvent(event);
  });

  test('set noDefaultContextMenu to be container', done => {
    const player = new Chimee({
      wrapper: document.body,
      noDefaultContextMenu: 'container',
    });
    const fn = jest.fn();
    player.on('contextmenu', () => {
      expect(fn).toHaveBeenCalledTimes(1);
      player.destroy();
      done();
    }, { target: 'container' });
    const event = new Event('contextmenu');
    event.preventDefault = fn;
    player.$container.dispatchEvent(event);
  });
});
