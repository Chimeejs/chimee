import Dom from 'dispatcher/dom';
import {Log} from 'chimee-helper';
describe('dispatcher/dom', () => {
  test('dom needs wrapper and dispatcher if you pass in illegal desipatcher, it should throw error', () => {
    expect(() => new Dom()).toThrow('Wrapper can only be string or HTMLElement, but not undefined');
    expect(() => new Dom('hello')).toThrow('Can not get dom node accroding wrapper. Please check your wrapper');
  });
  describe('wrapper can be string, indicate elment in document', () => {
    const node1 = document.createElement('div');
    document.body.appendChild(node1);
    const dom1 = new Dom('div', {});
    test('constructor, we should inject video in dom', () => {
      expect(dom1.wrapper).toBe(node1);
      expect(node1.querySelector('video')).not.toBe(null);
      expect(node1.querySelector('video')).toBe(dom1.videoElement);
      expect(dom1.plugins).toEqual({});
    });
    test('destroy, everything should go back to what it like at the first.', () => {
      dom1.destroy();
      expect(dom1.wrapper).toBe(undefined);
      expect(dom1.videoElement).toBe(undefined);
      expect(dom1.plugins).toBe(undefined);
      expect(document.querySelector('div')).toBe(node1);
      expect(node1.querySelector('video')).toBe(null);
      document.body.innerHTML = '';
    });
  });
  test('wrapper can be a custom node', () => {
    const node2 = document.createElement('div');
    const dom2 = new Dom(node2, {});
    expect(dom2.wrapper).toBe(node2);
    expect(node2.querySelector('video')).not.toBe(null);
    expect(node2.querySelector('video')).toBe(dom2.videoElement);
    dom2.destroy();
  });
  describe('wrapper can be a dom with video', () => {
    const node3 = document.createElement('div');
    const container = document.createElement('div');
    const video = document.createElement('video');
    container.appendChild(video);
    node3.appendChild(container);
    const dom3 = new Dom(node3, {});
    test('constructor', () => {
      expect(dom3.videoElement).toBe(video);
      expect(dom3.wrapper).toBe(node3);
      expect(dom3.originHTML).toBe('<div><video></video></div>');
    });
    test('destroy', () => {
      dom3.destroy();
      expect(node3.querySelector('video')).not.toBe(null);
    });
  });
  describe('insertPlugin & removePlugin', () => {
    const node = document.createElement('div');
    const dom = new Dom(node, {
      videoConfigReady: true,
      throwError (error) {
        throw error;
      }
    });
    test('illegal test', () => {
      expect(() => dom.insertPlugin()).toThrow('insertPlugin id parameter must be string');
    });
    test('you can insert with an htmlelement', () => {
      const section = document.createElement('section');
      dom.insertPlugin('section', section, {inner: true});
      expect(node.querySelector('section')).toBe(section);
      expect(node.children[0].children.length).toBe(2);
      expect(section).toBe(dom.plugins.section);
    });
    test('You can insert with an html string', () => {
      const buttonHTML = '<button></button>';
      dom.insertPlugin('button', buttonHTML, {inner: true});
      expect(node.querySelector('button')).not.toBe(null);
      expect(node.children[0].children.length).toBe(3);
    });
    test('You can insert with an custom tag', () => {
      const custom = 'custom';
      dom.insertPlugin('custom', custom, {inner: true});
      expect(node.querySelector('custom')).not.toBe(null);
      expect(node.children[0].children.length).toBe(4);
    });
    test('insert with nothing is ok', () => {
      dom.insertPlugin('div', {inner: true});
      expect(node.children[0].children.length).toBe(5);
    });
    test('warn when you duplicate insert', () => {
      dom.insertPlugin('div', {inner: true});
      expect(Log.data.warn).toEqual([
        ['Dispatcher.dom', 'Plugin div have already had a dom node. Now it will be replaced']
      ]);
    });
    test('insert plugin with autofocus', () => {
      dom.insertPlugin('div', {inner: false, autoFocus: true});
    });
    test('remove plugin', () => {
      dom.removePlugin('div');
      expect(dom.plugins.div).toBe();
      expect(node.querySelector('div')).toBe(null);
      expect(dom.removePlugin()).toBe();
      expect(dom.removePlugin('what')).toBe();
    });
  });
});

describe('_getEventHanlder', () => {
  const node = document.createElement('div');
  const triggerSync = jest.fn();
  const dom = new Dom(node, {
    bus: {
      triggerSync
    }
  });
  test('normal click event', () => {
    const fn1 = dom._getEventHandler('click', {});
    fn1();
    expect(triggerSync).toHaveBeenCalledTimes(1);
    expect(triggerSync).lastCalledWith('click');
  });
  test('normal mouseenter event', () => {
    const fn2 = dom._getEventHandler('mouseenter', {});
    fn2();
    expect(triggerSync).toHaveBeenCalledTimes(2);
    expect(triggerSync).lastCalledWith('mouseenter');
  });
  describe('mouseenter and insidevideo judge', () => {
    const insideVideoNode = document.createElement('div');
    const insideVideoChildNode = document.createElement('div');
    insideVideoNode.appendChild((insideVideoChildNode));
    dom.__videoExtendedNodes.push(insideVideoNode);
    dom.__videoExtendedNodes.push(document.createElement('div'));
    const fn3 = dom._getEventHandler('mouseenter', {penetrate: true});
    test('mouseenter event, but not enter video area, should trigger nothing', () => {
      fn3({
        type: 'mouseenter',
        currentTarget: null
      });
      expect(triggerSync).toHaveBeenCalledTimes(2);
    });
    test('mouseener and enter video area on insideVideoNode, should trigger mouseenter', () => {
      const event1 = {
        type: 'mouseenter',
        currentTarget: insideVideoNode
      };
      fn3(event1);
      expect(triggerSync).lastCalledWith('mouseenter', event1);
      expect(triggerSync).toHaveBeenCalledTimes(3);
    });
    test('mouseleave, from inside video node to video itself, should trigger nothing', () => {
      fn3({
        type: 'mouseleave',
        currentTarget: insideVideoNode,
        toElement: dom.videoElement
      });
      expect(triggerSync).toHaveBeenCalledTimes(3);
    });
    test('mouseenter video, should trigger nothing', () => {
      fn3({
        type: 'mouseenter',
        currentTarget: dom.videoElement
      });
      expect(triggerSync).toHaveBeenCalledTimes(3);
    });
    test('mouseleave from video to outside, should trigger mouseleave', () => {
      const event2 = {
        type: 'mouseleave',
        currentTarget: dom.videoElement,
        relatedTarget: null
      };
      fn3(event2);
      expect(triggerSync).toHaveBeenCalledTimes(4);
      expect(triggerSync).lastCalledWith('mouseleave', event2);
    });
    test('mouseenter to inside video node child element', () => {
      const event3 = {
        type: 'mouseenter',
        currentTarget: insideVideoChildNode
      };
      fn3(event3);
      expect(triggerSync).toHaveBeenCalledTimes(5);
      expect(triggerSync).lastCalledWith('mouseenter', event3);
    });
    afterAll(() => {
      dom.destroy();
    });
  });
  test('_focusToVideo should work', () => {
    const node = document.createElement('div');
    const dom = new Dom(node, {});
    dom._focusToVideo();
    dom.destroy();
  });
  test('fullscreen should work', () => {
    const node = document.createElement('div');
    const dom = new Dom(node, {videoConfigReady: true});
    dom.container.mozRequestFullScreen = () => {};
    dom.fullScreen(true);
    document.mozCancelFullScreen = () => {};
    dom.fullScreen(false, 'container');
    dom.fullScreen();
    delete document.mozCancelFullScreen;
    dom.destroy();
  });

  test('focus', () => {
    const node = document.createElement('div');
    const dom = new Dom(node, {videoConfigReady: true});
    expect(document.activeElement).toBe(document.body);
    dom.focus();
    expect(document.activeElement).toBe(dom.videoElement);
  });

  test('setStyle', () => {
    const node = document.createElement('div');
    const dom = new Dom(node, {
      throwError (error) {
        throw error;
      }
    });
    dom.setStyle('container', 'z-index', 10);
    expect(dom.container.style.zIndex).toBe('10');
    expect(() => dom.setStyle('WHAT')).toThrow("to handle dom's attribute or style, your attr parameter must be string");
    expect(() => dom.setStyle(1, 'hahahah')).toThrow("to handle dom's attribute or style, your target parameter must be string");
    expect(() => dom.setStyle('what', 'z-index')).toThrow('Your target "what" is not a legal HTMLElement');
    dom.destroy();
  });
});
