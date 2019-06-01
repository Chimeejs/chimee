import Chimee from 'index';
import { chimeeLog } from 'chimee-helper-log';
import { bind } from 'toxic-utils';

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
    chimeeLog.data.warn = [];
    chimeeLog.data.error = [];
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
        chimeeLog.data.warn = [];
        expect(player['$' + key]).toEqual(elements[index]);
        // expect(chimeeLog.data.warn.length).toBe(1);
        chimeeLog.data.warn = [];
      });
    });
  });
});
