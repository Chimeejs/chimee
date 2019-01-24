import Chimee from 'index';
import { bind } from 'chimee-helper';

describe('chimee kernel method', () => {
  let player;
  let originCreateElement;

  beforeAll(() => {
    originCreateElement = global.document.createElement;
    global.document.createElement = function(tag) {
      const element = bind(originCreateElement, document)(tag);
      if (tag === 'video') {
        element.play = function() {};
        element.pause = function() {};
      }
      return element;
    };
  });

  afterAll(() => {
    global.document.createElement = originCreateElement;
  });

  beforeEach(() => {
    player = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: document.createElement('div'),
      plugin: [],
      events: {},
    });
  });

  afterEach(() => {
    player.destroy();
    player = null;
  });

  test('kernel method', () => {
    expect(() => player.play()).not.toThrow();
    expect(() => player.pause()).not.toThrow();
    expect(() => player.seek(1)).not.toThrow();
    expect(() => player.stopLoad()).not.toThrow();
    expect(() => player.startLoad()).not.toThrow();
  });
});
