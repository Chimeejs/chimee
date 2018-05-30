import Chimee from 'index';
test('chimee penetrate event forward bug', () => {
  const fn = jest.fn();
  const plugin1 = {
    name: 'plugin1',
    penetrate: false,
    inited() {
      this.$on('click', fn);
    },
  };
  const plugin2 = {
    name: 'plugin2',
    penetrate: true,
  };
  Chimee.install(plugin1);
  Chimee.install(plugin2);
  const player = new Chimee({
    wrapper: document.createElement('div'),
    plugins: [
      plugin1.name,
      plugin2.name,
    ],
  });
  player.$plugins.plugin2.$dom.click();
  expect(fn).toHaveBeenCalledTimes(1);
  player.destroy();
});
