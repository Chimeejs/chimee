import Chimee from 'index';
import { Log, bind } from 'chimee-helper';

describe('Chimee', () => {
  let player;
  let originURLrevoke;
  let originCreateElement;

  beforeAll(() => {
    originCreateElement = global.document.createElement;
    global.document.createElement = function(tag) {
      const element = bind(originCreateElement, document)(tag);
      if (tag === 'video') {
        element.play = function() {};
      }
      return element;
    };
  });

  afterAll(() => {
    global.document.createElement = originCreateElement;
  });

  beforeEach(() => {
    Log.data.warn = [];
    Log.data.error = [];
    originURLrevoke = global.URL.revokeObjectURL;
    global.URL.revokeObjectURL = () => {};
  });

  afterEach(() => {
    global.URL.revokeObjectURL = originURLrevoke;
  });

  test('focus', () => {
    const player = new Chimee(document.createElement('div'));
    expect(() => player.focus()).not.toThrow();
  });

  describe('$video, $container and $wrapper', () => {
    const wrapper = document.createElement('div');
    player = new Chimee(wrapper);
    const container = wrapper.childNodes[0];
    const video = container.childNodes[0];
    const elements = [ video, container, wrapper ];
    [ 'video', 'container', 'wrapper' ].forEach((key, index) => {
      test('key', () => {
        Log.data.warn = [];
        expect(player['$' + key]).toEqual(elements[index]);
        expect(Log.data.warn.length).toBe(1);
        Log.data.warn = [];
      });
    });
  });
});
