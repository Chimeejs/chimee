import Chimee from 'index';
describe('vessel', () => {
  let chimee;
  beforeEach(() => {
    chimee = new Chimee({
      wrapper: document.createElement('div'),
    });
  });
  afterEach(() => {
    chimee.destroy();
  });
  test('default config', () => {
    expect(chimee.container.width).toBe('100%');
    expect(chimee.container.height).toBe('100%');
    expect(chimee.container.display).toBe('block');
    expect(chimee.container.position).toBe('relative');
  });
  test('width set', () => {
    chimee.container.width = 100;
    expect(chimee.container.width).toBe('100px');
  });
  test('error width set', () => {
    expect(() => { chimee.container.width = {}; }).toThrow('The value of width in containerConfig must be string, but not object.');
  });
  test('container set', () => {
    chimee.container = { width: 73 };
    expect(chimee.container.width).toBe('73px');
    expect(chimee.container.height).toBe('100%');
  });
  test('error container set', () => {
    expect(() => { chimee.container = 123123; }).toThrow('The config of container must be Object, but not number.');
  });
});

