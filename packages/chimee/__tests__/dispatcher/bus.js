import Bus from 'dispatcher/bus';
import {Log} from 'chimee-helper';
describe('bus', () => {
  let seekCount = 0;
  let playCount = 0;
  const dispatcher = {
    dom: {
      videoElement: document.createElement('div'),
      wrapper: document.createElement('div'),
      container: document.createElement('div'),
      focus () {}
    },
    kernel: {
      play () {
        playCount++;
      },
      seek () {
        seekCount++;
      }
    },
    plugins: {
      a: {id: 'a'},
      b: {id: 'b'},
      c: {id: 'c'}
    },
    order: ['a', 'b', 'c'],
    seek () {},
    throwError (error) {
      throw error;
    }
  };

  const bus = new Bus(dispatcher);
  beforeEach(() => {
    Log.data.warn = [];
  });
  describe('constructor', () => {
    test('events initial', () => {
      expect(bus.events).toEqual({});
    });
    test('dispatcher binding', () => {
      expect(bus.__dispatcher).toBe(dispatcher);
    });
  });
  describe('_getEventStage', () => {
    test('get main event', () => {
      expect(bus._getEventStage('play')).toEqual({
        stage: 'main',
        key: 'play'
      });
    });
    test('get before event', () => {
      expect(bus._getEventStage('beforePlay')).toEqual({
        stage: 'before',
        key: 'play'
      });
    });
    test('get after event', () => {
      expect(bus._getEventStage('afterplay')).toEqual({
        stage: 'after',
        key: 'play'
      });
    });
    test('get side effect event', () => {
      expect(bus._getEventStage('_play')).toEqual({
        stage: '_',
        key: 'play'
      });
    });
  });

  describe('_addEvent & _removeEvent', () => {
    const fn = () => {};
    const fn1 = () => {};
    test('first add main event handler', () => {
      bus._addEvent(['play', 'main', 'a'], fn);
      expect(bus.events.play.main.a[0]).toBe(fn);
    });
    test('second add main event handler', () => {
      bus._addEvent(['play', 'main', 'a'], fn1);
      expect(bus.events.play.main.a).toEqual([fn, fn1]);
    });
    test('remove nonexistent event handler', () => {
      bus._removeEvent(['play', 'before', 'b'], fn);
      expect(bus.events.play.main.a[0]).toBe(fn);
    });
    test('remove unbind event handler', () => {
      bus._removeEvent(['play', 'main', 'a'], () => {});
      expect(bus.events.play.main.a[0]).toBe(fn);
    });
    test('remove event handler', () => {
      bus._removeEvent(['play', 'main', 'a'], fn);
      expect(bus.events.play.main.a[0]).toBe(fn1);
    });
    test('remove last one event', () => {
      bus._removeEvent(['play', 'main', 'a'], fn1);
      expect(bus.events.play.main.a).toBe(undefined);
    });
    test('remove binded event handler from wrong object', () => {
      bus._addEvent(['what', 'main', 'b'], fn);
      bus._removeEvent(['what', 'main', 'a'], fn);
      expect(bus.events.play.main.a).toBe(undefined);
      expect(bus.events.what.main.a).toBe(undefined);
      expect(bus.events.what.main.b[0]).toBe(fn);
    });
  });

  describe('on & off', () => {
    const fn = () => {};
    const fn1 = () => {};
    beforeAll(() => {
      bus.events = {};
    });
    test('on main event handler', () => {
      bus.on('a', 'play', fn);
      expect(bus.events.play.main.a[0]).toBe(fn);
    });
    test('on another main event handler', () => {
      bus.on('a', 'play', fn1);
      expect(bus.events.play.main.a).toEqual([fn, fn1]);
    });
    test('on before event handler', () => {
      bus.on('a', 'beforePlay', fn);
      expect(bus.events.play.before.a[0]).toBe(fn);
    });
    test('on after event handler', () => {
      bus.on('a', 'afterplay', fn);
      expect(bus.events.play.after.a[0]).toBe(fn);
    });
    test('on side effect event handler', () => {
      bus.on('a', '_play', fn);
      expect(bus.events.play._.a[0]).toBe(fn);
    });
    test('check events map', () => {
      bus.on('b', 'play', fn);
      bus.on('c', 'pause', fn);
      expect(bus.events).toEqual({
        play: {
          before: {
            a: [fn]
          },
          main: {
            a: [fn, fn1],
            b: [fn]
          },
          after: {
            a: [fn]
          },
          _: {
            a: [fn]
          }
        },
        pause: {
          main: {
            c: [fn]
          }
        }
      });
    });
    test('off event check', () => {
      bus.off('a', 'play', fn);
      expect(bus.events.play.main.a[0]).toBe(fn1);
      bus.off('a', 'afterPlay', fn);
      expect(bus.events.play.after).toEqual({});
      bus.off('c', 'pause', fn);
      expect(bus.events.pause).toEqual({main: {}});
    });
  });

  describe('_getEventQueue', () => {
    let result;
    const fn = function () {result.push(this.id);};
    beforeAll(() => {
      bus.events = {
        play: {
          before: {
            a: [fn],
            b: [fn]
          },
          main: {
            a: [fn, fn],
            b: [fn],
            c: [fn]
          },
          after: {
            a: [fn],
            c: [fn],
            _vm: [function () {result.push('vm');}]
          },
          _: {
            a: [fn],
            b: [fn],
            c: [fn]
          }
        }
      };
    });
    beforeEach(() => {
      result = [];
    });
    test('empty getEventQueue parameter', () => {
      expect(bus._getEventQueue()).toEqual([]);
    });
    test('lack of order parameter', () => {
      expect(bus._getEventQueue({a: 1})).toEqual([]);
    });
    test('non array object', () => {
      expect(bus._getEventQueue({a: 1}, [])).toEqual([]);
    });
    test('get main queue', () => {
      const queue1 = bus._getEventQueue(bus.events.play.main, ['a']);
      expect(queue1.length).toBe(2);
      queue1.forEach(each => each());
      expect(result).toEqual(['a', 'a']);
    });
    test('get main queue with multiple order', () => {
      const queue2 = bus._getEventQueue(bus.events.play.main, ['a', 'c', 'b']);
      expect(queue2.length).toBe(4);
      queue2.forEach(each => each());
      expect(result).toEqual(['a', 'a', 'c', 'b']);
    });
    test('get after queue', () => {
      const queue3 = bus._getEventQueue(bus.events.play.after, ['a', 'b', 'c']);
      expect(queue3.length).toBe(3);
      queue3.forEach(each => each());
      expect(result).toEqual(['a', 'c', 'vm']);
    });
  });

  describe('_runSideEffectEvent', () => {
    const result = [];
    const fn = function (...args) {
      result.push(this.id);
      args.forEach(each => result.push(each));
    };
    beforeAll(() => {
      bus.events = {
        play: {
          _: {
            a: [fn],
            b: [fn],
            c: [fn]
          }
        }
      };
    });
    test('empty side effect', () => {
      bus._runSideEffectEvent('pause');
      expect(result).toEqual([]);
    });
    test('run side effect', () => {
      bus._runSideEffectEvent('play', ['a', 'b', 'c']);
      expect(result).toEqual(['a', 'b', 'c']);
    });
    test('run side effect with arguments', () => {
      bus._runSideEffectEvent('play', ['a', 'b'], 'd', 'e');
      expect(result).toEqual(['a', 'b', 'c', 'a', 'd', 'e', 'b', 'd', 'e']);
    });
  });

  describe('trigger', () => {
    const result = [];
    const fn = function () {result.push(this.id);};
    beforeAll(() => {
      bus.events = {
        play: {
          before: {
            a: [fn],
            b: [fn]
          },
          main: {
            a: [fn, fn],
            b: [fn],
            c: [fn]
          },
          after: {
            a: [fn],
            c: [fn]
          },
          _: {
            a: [fn],
            b: [fn],
            c: [fn]
          }
        },
        end: {
          main: {
            a: [fn, fn],
            b: [fn, () => false],
            c: [fn]
          },
          after: {
            a: [fn],
            c: [fn]
          },
        }
      };
    });
    test('secondary event trigger', async () => {
      await expect(bus.trigger('beforePlay')).toBe();
      expect(Log.data.warn).toEqual([
        ['bus', 'Secondary Event could not be emit']
      ]);
      expect(result).toEqual([]);
    });
    test('trigger null event', async () => {
      await expect(bus.trigger('pause')).resolves.toBe(true);
      expect(result).toEqual([]);
    });
    test('full kernel event trigger', async () => {
      await expect(bus.trigger('play')).resolves.toBe(true);
      expect(result).toEqual(['a', 'a', 'b', 'c', 'a', 'c', 'a', 'b', 'c']);
    });
    test('full normal event trigger', async () => {
      await expect(bus.trigger('end')).resolves.toBe(true);
      expect(result).toEqual(['a', 'a', 'b', 'c', 'a', 'c', 'a', 'b', 'c', 'a', 'a', 'b']);
    });
  });

  describe('triggerSync', () => {
    const result = [];
    const fn = function () {result.push(this.id);};
    beforeAll(() => {
      bus.events = {
        play: {
          before: {
            a: [fn],
            b: [fn]
          },
          main: {
            a: [fn, fn],
            b: [fn],
            c: [fn]
          },
          after: {
            a: [fn],
            c: [fn]
          },
          _: {
            a: [fn],
            b: [fn],
            c: [fn]
          }
        },
        end: {
          main: {
            a: [fn, fn],
            b: [fn, () => false],
            c: [fn]
          },
          after: {
            a: [fn],
            c: [fn]
          },
        },
        what: {
          after: {
            a: [() => false]
          }
        }
      };
    });
    test('secondary event trigger', () => {
      expect(bus.triggerSync('beforePlay')).toBe(false);
      expect(Log.data.warn).toEqual([
        ['bus', 'Secondary Event could not be emit']
      ]);
    });
    test('trigger null event', () => {
      expect(result).toEqual([]);
      expect(bus.triggerSync('pause')).toBe(true);
      expect(result).toEqual([]);
    });
    test('full kernel event trigger', async () => {
      expect(bus.triggerSync('play')).toBe(true);
      expect(result).toEqual(['a', 'a', 'b', 'c', 'a', 'c', 'a', 'b', 'c']);
    });
    test('full normal event trigger', () => {
      expect(bus.triggerSync('end')).toBe(false);
      expect(result).toEqual(['a', 'a', 'b', 'c', 'a', 'c', 'a', 'b', 'c', 'a', 'a', 'b']);
    });
    test('after check', () => {
      expect(bus.triggerSync('what')).toBe(false);
    });
  });
  describe('_eventProcessor', () => {
    let result;
    const fn = function () {result.push(this.id);};
    beforeAll(() => {
      bus.events = {
        play: {
          main: {
            a: [fn]
          }
        },
        run: {
          main: {
            b: [fn]
          }
        },
        seek: {
          main: {
            c: [fn]
          }
        },
        focus: {
          main: {
            a: [fn]
          }
        }
      };
    });
    beforeEach(() => {
      result = [];
    });
    test('normal event run', async () => {
      await expect(bus._eventProcessor('run', {sync: false})).resolves.toBe(true);
      expect(result).toEqual(['b']);
    });
    test('normal sync event run', async () => {
      await expect(bus._eventProcessor('run', {sync: true})).toBe(true);
      expect(result).toEqual(['b']);
    });
    test('kernel event', async () => {
      await expect(bus._eventProcessor('seek', {sync: false})).resolves.toBe(true);
      expect(result).toEqual(['c']);
      expect(seekCount).toBe(1);
    });
    test('kernel event and then trigger', async () => {
      await expect(bus._eventProcessor('play', {sync: false})).toBe(true);
      expect(playCount).toBe(1);
      expect(result).toEqual([]);
      await bus.trigger('play');
      expect(result).toEqual(['a']);
    });
    test('dom event', async () => {
      await bus._eventProcessor('focus', {sync: true});
    });
  });
  describe('emit', () => {
    const result = [];
    const fn = function () {result.push(this.id);};
    beforeAll(() => {
      bus.events = {
        run: {
          main: {
            a: [fn]
          }
        },
        pause: {
          before: {
            a: [() => false]
          }
        }
      };
    });
    test('secondary emit', () => {
      expect(bus.emit('beforePlay')).toBe(undefined);
      expect(Log.data.warn).toEqual([
        ['bus', 'Secondary Event could not be emit']
      ]);
    });
    test('successful run', async () => {
      await expect(bus.emit('seek')).resolves.toBe(true);
      expect(seekCount).toBe(2);
    });
    test('stop run', async () => {
      await expect(bus.emit('pause')).rejects.toBe('stop');
      await expect(bus.emit('run')).resolves.toBe(true);
      // expect(result).toEqual(['a']);
    });
  });

  describe('emitSync', () => {
    const result = [];
    const fn = function () {result.push(this.id);};
    beforeAll(() => {
      bus.events = {
        run: {
          main: {
            a: [fn]
          }
        },
        pause: {
          before: {
            a: [() => false]
          }
        }
      };
    });
    test('secondary emit', () => {
      expect(bus.emitSync('beforePlay')).toBe(false);
      expect(Log.data.warn).toEqual([
        ['bus', 'Secondary Event could not be emit']
      ]);
    });
    // test('successful run', () => {
    //   expect(bus.emitSync('seek')).toBe(true);
    //   expect(seekCount).toBe(3);
    // });
    test('stop run', () => {
      expect(bus.emitSync('pause')).toBe(false);
      expect(bus.emitSync('run')).toBe(true);
      expect(result).toEqual(['a']);
    });
  });

  describe('once', () => {
    const result = [];
    const fn = function () {result.push(this.id);};
    beforeAll(() => {
      bus.events = {
        run: {
          main: {
            a: [fn]
          }
        }
      };
    });
    test('once', async () => {
      bus.once('b', 'run', fn);
      await expect(bus.emit('run')).resolves.toBe(true);
      expect(result).toEqual(['a', 'b']);
      expect(bus.events).toEqual({
        run: {
          main: {
            a: [fn]
          }
        }
      });
    });
    test('once but still can remove by yourself', () => {
      bus.once('b', 'run', fn);
      expect(bus.events.run.main.b.length).toBe(1);
      expect(bus.events.run.main.b[0]).not.toBe(fn);
      bus.off('b', 'run', fn);
      expect(bus.events.run.main.b).toBe();
    });
    test('multiple once and multiple remove', () => {
      bus.once('b', 'run', fn);
      expect(bus.events.run.main.b.length).toBe(1);
       bus.once('b', 'run', fn);
      expect(bus.events.run.main.b.length).toBe(2);
       bus.off('b', 'run', fn);
      expect(bus.events.run.main.b.length).toBe(1);
      bus.off('b', 'run', fn);
      expect(bus.events.run.main.b).toBe();
    });
    test('off from empty map', () => {
      expect(() => bus.off('c', 'sth', fn)).not.toThrow();
    });
  });

  test('off from empty', () => {
    expect(() => bus.off('b', 'run', function () {})).not.toThrow();
  });

  describe('error handle', async () => {
    const errmsg = 'i am an error';
    const errorFn = () => {throw new Error(errmsg);};
    let errcount;
    beforeEach(() => {
      errcount = 0;
    });
    test('emit', async () => {
      bus.on('b', 'beforeThrow', errorFn);
      try {
        await bus.emit('throw');
      } catch (error) {
        expect(error.message).toBe(errmsg);
        errcount++;
      }
      expect(errcount).toBe(1);
      bus.off('b', 'beforeThrow', errorFn);
    });
    test('trigger', async () => {
      bus.on('b', 'afterThrow', errorFn);
      try {
        await bus.trigger('throw');
      } catch (error) {
        expect(error.message).toBe(errmsg);
        errcount++;
      }
      expect(errcount).toBe(1);
      bus.off('b', 'afterThrow', errorFn);
    });
    test('deep emit', async () => {
      const fn = function () {};
      bus.on('b', 'beforeThrow', fn);
      bus.on('b', 'beforeThrow', errorFn);
      try {
        await bus.emit('throw');
      } catch (error) {
        expect(error.message).toBe(errmsg);
        errcount++;
      }
      expect(errcount).toBe(1);
      bus.off('b', 'beforeThrow', errorFn);
      bus.off('b', 'beforeThrow', fn);
    });
    test('deep trigger', async () => {
      const fn = function () {};
      bus.on('b', 'afterThrow', fn);
      bus.on('b', 'afterThrow', errorFn);
      try {
        await bus.trigger('throw');
      } catch (error) {
        expect(error.message).toBe(errmsg);
        errcount++;
      }
      expect(errcount).toBe(1);
      bus.off('b', 'afterThrow', errorFn);
      bus.off('b', 'afterThrow', fn);
    });
  });

  test('destroy', () => {
    bus.destroy();
    expect(bus.events).toBe(undefined);
    expect(bus.dispatcher).toBe(undefined);
  });

});
