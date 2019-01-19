import Dom from 'dispatcher/dom';
import Chimee from 'index';
import { chimeeLog } from 'chimee-helper-log';
import { bind } from 'toxic-utils';
describe('dispatcher/dom', () => {
  let originCreateElement;
  let originScrollTo;

  const fakeDispatcher = {
    binder: {
      bindEventOnVideo() {},
    },
  };

  beforeAll(() => {
    originCreateElement = global.document.createElement;
    global.document.createElement = function(tag) {
      const element = bind(originCreateElement, document)(tag);
      if (tag === 'video') {
        element.play = function() {};
      }
      return element;
    };
    originScrollTo = global.window.scrollTo;
    global.window.scrollTo = function() {};
  });

  afterAll(() => {
    global.document.createElement = originCreateElement;
    global.window.scrollTo = originScrollTo;
  });

  test('dom needs wrapper and dispatcher if you pass in illegal desipatcher, it should throw error', () => {
    // We use typescript currently, we can let typescript to handle this
    // expect(() => new Dom()).toThrow('Wrapper can only be string or HTMLElement, but not undefined');
    expect(() => new Dom({ wrapper: 'hello' })).toThrow('Can not get dom node accroding wrapper. Please check your wrapper');
  });

  describe('wrapper can be string, indicate elment in document', () => {
    let node;
    let dom;

    beforeEach(() => {
      node = document.createElement('div');
      document.body.appendChild(node);
      dom = new Dom({ wrapper: 'div' }, fakeDispatcher);
    });

    afterEach(() => {
      !dom.destroyed && dom.destroy();
      if (node.parentNode === document.body) document.body.removeChild(node);
    });

    test('constructor, we should inject video in dom', () => {
      expect(dom.wrapper).toBe(node);
      expect(node.querySelector('video')).not.toBe(null);
      expect(node.querySelector('video')).toBe(dom.videoElement);
      expect(dom.plugins).toEqual({});
    });

    test('destroy, everything should go back to what it like at the first.', () => {
      dom.destroy();
      expect(dom.wrapper).toBe(undefined);
      expect(dom.videoElement).toBe(undefined);
      expect(dom.plugins).toBe(undefined);
      expect(document.querySelector('div')).toBe(node);
      expect(node.querySelector('video')).toBe(null);
      document.body.innerHTML = '';
    });
  });

  test('wrapper can be a custom node', () => {
    const node = document.createElement('div');
    const dom = new Dom({ wrapper: node }, fakeDispatcher);
    expect(dom.wrapper).toBe(node);
    expect(node.querySelector('video')).not.toBe(null);
    expect(node.querySelector('video')).toBe(dom.videoElement);
    dom.destroy();
  });

  describe('wrapper can be a dom with video', () => {

    let node;
    let dom;
    let container;
    let video;

    beforeEach(() => {
      node = document.createElement('div');
      container = document.createElement('div');
      video = document.createElement('video');
      container.appendChild(video);
      node.appendChild(container);
      document.body.appendChild(node);
      dom = new Dom({ wrapper: node }, fakeDispatcher);
    });

    afterEach(() => {
      !dom.destroyed && dom.destroy();
      if (node.parentNode === document.body) document.body.removeChild(node);
    });

    test('constructor', () => {
      expect(dom.videoElement).toBe(video);
      expect(dom.wrapper).toBe(node);
      expect(dom.originHTML).toBe('<div><video></video></div>');
    });

    test('destroy', () => {
      dom.destroy();
      expect(node.querySelector('video')).not.toBe(null);
    });
  });

  describe('insertPlugin & removePlugin', () => {
    let node;
    let dom;
    let player;

    beforeEach(() => {
      node = document.createElement('div');
      player = new Chimee({
        // 播放地址
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        // 直播:live 点播：vod
        type: 'vod',
        // 编解码容器
        box: 'native',
        // dom容器
        wrapper: node,
        plugin: [],
        events: {},
      });
      dom = player.dispatcher.dom;
    });

    afterEach(() => {
      player.destroy();
    });

    test('illegal test', () => {
      expect(() => dom.insertPlugin()).toThrow('insertPlugin id parameter must be string');
    });

    test('you can insert with an htmlelement', () => {
      const section = document.createElement('section');
      dom.insertPlugin('section', section, { inner: true });
      expect(node.querySelector('section')).toBe(section);
      expect(node.children[0].children.length).toBe(2);
      expect(section).toBe(dom.plugins.section);
    });

    test('You can insert with an html string', () => {
      const buttonHTML = '<button></button>';
      dom.insertPlugin('button', buttonHTML, { inner: true });
      expect(node.querySelector('button')).not.toBe(null);
      expect(node.children[0].children.length).toBe(2);
    });

    test('You can insert with an custom tag', () => {
      const custom = 'custom';
      dom.insertPlugin('custom', custom, { inner: true });
      expect(node.querySelector('custom')).not.toBe(null);
      expect(node.children[0].children.length).toBe(2);
    });

    test('insert with nothing is ok', () => {
      dom.insertPlugin('div', { inner: true });
      expect(node.children[0].children.length).toBe(2);
    });

    test('warn when you duplicate insert', () => {
      dom.insertPlugin('div', { inner: true });
      dom.insertPlugin('div', { inner: true });
      expect(chimeeLog.data.warn).toEqual([
        [ 'Dispatcher.dom', 'Plugin div have already had a dom node. Now it will be replaced' ],
      ]);
    });

    test('insert plugin with autofocus', () => {
      dom.insertPlugin('div', { inner: false, autoFocus: true });
    });

    test('remove plugin', () => {
      dom.removePlugin('div');
      expect(dom.plugins.div).toBe();
      expect(node.querySelector('div')).toBe(null);
      expect(dom.removePlugin()).toBe();
      expect(dom.removePlugin('what')).toBe();
    });
  });

  describe('dom methods', () => {
    let dom;
    let player;

    beforeEach(() => {
      const wrapper = document.createElement('div');
      player = new Chimee({
        // 播放地址
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        // 直播:live 点播：vod
        type: 'vod',
        // 编解码容器
        box: 'native',
        // dom容器
        wrapper,
        plugin: [],
        events: {},
      });
      dom = player.dispatcher.dom;
      console.warn(wrapper.innerHTML)
    });

    afterEach(() => {
      player.destroy();
    });

    test('focusToVideo should work', () => {
      dom.focusToVideo();
    });
    test('fullscreen should work', () => {
      dom.container.mozRequestFullscreen = () => {};
      dom.fullscreen(true);
      document.mozCancelFullscreen = () => {};
      dom.fullscreen(false, 'container');
      dom.fullscreen();
      delete document.mozCancelFullscreen;
    });

    test('focus', () => {
      expect(document.activeElement).toBe(document.body);
      dom.focus();
      expect(document.activeElement).toBe(dom.videoElement);
    });

    test('setStyle', () => {
      dom.setStyle('container', 'z-index', 10);
      expect(dom.container.style.zIndex).toBe('10');
      expect(() => dom.setStyle('WHAT')).toThrow("to handle dom's attribute or style, your attr parameter must be string");
      expect(() => dom.setStyle(1, 'hahahah')).toThrow("to handle dom's attribute or style, your target parameter must be string");
      expect(() => dom.setStyle('what', 'z-index')).toThrow('Your target "what" is not a legal HTMLElement');
    });
  });
});
