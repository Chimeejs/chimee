import Chimee from 'index';
describe('write plugin in class mode', () => {
  test('kernel event pending', () => {
    class P extends Chimee.plugin {
      constructor(...args) {
        super(...args);
        this.$on('mediaInfo', () => {});
      }
    }
    Chimee.install(P);
    expect(() => {
      return new Chimee({
        wrapper: document.createElement('div'),
        plugins: [ P.name ],
      });
    }).not.toThrow();
  });

  test('video dom event pending', () => {
    const fn = jest.fn();
    class P extends Chimee.plugin {
      constructor(...args) {
        super(...args);
        this.$on('click', fn);
      }
    }
    Chimee.install(P);
    const player = new Chimee({
      wrapper: document.createElement('div'),
      plugins: [ P.name ],
    });
    player.$video.click();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
