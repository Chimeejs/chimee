import Bus from 'dispatcher/bus';
import { chimeeLog } from 'chimee-helper-log';
describe('bus', () => {
  let seekCount = 0;
  let playCount = 0;
  const dispatcher = {
    dom: {
      videoElement: document.createElement('div'),
      wrapper: document.createElement('div'),
      container: document.createElement('div'),
      focus() {},
    },
    kernel: {
      play() {
        playCount++;
      },
      seek() {
        seekCount++;
      },
    },
    plugins: {
      a: { id: 'a' },
      b: { id: 'b' },
      c: { id: 'c' },
    },
    order: [ 'a', 'b', 'c' ],
    seek() {},
    throwError(error) {
      throw error;
    },
  };

  const bus = new Bus(dispatcher);
  beforeEach(() => {
    chimeeLog.data.warn = [];
  });

  describe('constructor', () => {

    test('events initial', () => {
      expect(bus.events).toEqual({});
    });

    test('dispatcher binding', () => {
      expect(bus.dispatcher).toBe(dispatcher);
    });

  });

  describe('addEvent & removeEvent', () => {
    const fn = () => {};
    const fn1 = () => {};

    test('first add main event handler', () => {
      bus.addEvent({ eventName: 'play', stage: 'main', pluginId: 'a', fn });
      expect(bus.events.play.main.a[0]).toBe(fn);
    });

    test('second add main event handler', () => {
      bus.addEvent({ eventName: 'play', stage: 'main', pluginId: 'a', fn: fn1 });
      expect(bus.events.play.main.a).toEqual([ fn, fn1 ]);
    });

    test('remove nonexistent event handler', () => {
      bus.removeEvent({ eventName: 'play', stage: 'before', pluginId: 'b', fn });
      expect(bus.events.play.main.a[0]).toBe(fn);
    });

    test('remove unbind event handler', () => {
      bus.removeEvent({ eventName: 'play', stage: 'main', pluginId: 'a', fn: () => {} });
      expect(bus.events.play.main.a[0]).toBe(fn);
    });

    test('remove event handler', () => {
      bus.removeEvent({ eventName: 'play', stage: 'main', pluginId: 'a', fn });
      expect(bus.events.play.main.a[0]).toBe(fn1);
    });

    test('remove last one event', () => {
      bus.removeEvent({ eventName: 'play', stage: 'main', pluginId: 'a', fn: fn1 });
      expect(bus.events).toEqual({});
    });

    test('remove binded event handler from wrong object', () => {
      bus.addEvent({ eventName: 'what', stage: 'main', pluginId: 'b', fn });
      bus.removeEvent({ eventName: 'what', stage: 'main', pluginId: 'a', fn });
      expect(bus.events.play).toBe(undefined);
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
      bus.on('a', 'play', fn, 'main');
      expect(bus.events.play.main.a[0]).toBe(fn);
    });

    test('on another main event handler', () => {
      bus.on('a', 'play', fn1, 'main');
      expect(bus.events.play.main.a).toEqual([ fn, fn1 ]);
    });

    test('on before event handler', () => {
      bus.on('a', 'play', fn, 'before');
      expect(bus.events.play.before.a[0]).toBe(fn);
    });

    test('on after event handler', () => {
      bus.on('a', 'play', fn, 'after');
      expect(bus.events.play.after.a[0]).toBe(fn);
    });

    test('on side effect event handler', () => {
      bus.on('a', 'play', fn, '_');
      expect(bus.events.play._.a[0]).toBe(fn);
    });

    test('check events map', () => {
      bus.on('b', 'play', fn, 'main');
      bus.on('c', 'pause', fn, 'main');
      expect(bus.events).toEqual({
        play: {
          before: {
            a: [ fn ],
          },
          main: {
            a: [ fn, fn1 ],
            b: [ fn ],
          },
          after: {
            a: [ fn ],
          },
          _: {
            a: [ fn ],
          },
        },
        pause: {
          main: {
            c: [ fn ],
          },
        },
      });
    });

    test('off event check', () => {
      bus.off('a', 'play', fn, 'main');
      expect(bus.events.play.main.a[0]).toBe(fn1);
      bus.off('a', 'play', fn, 'after');
      expect(bus.events.play.after).toBe();
      bus.off('c', 'pause', fn, 'main');
      expect(bus.events.pause).toEqual();
    });
  });

  describe('getEventQueue', () => {
    let result;
    const fn = function() { result.push(this.id); };
    beforeAll(() => {
      bus.events = {
        play: {
          before: {
            a: [ fn ],
            b: [ fn ],
          },
          main: {
            a: [ fn, fn ],
            b: [ fn ],
            c: [ fn ],
          },
          after: {
            a: [ fn ],
            c: [ fn ],
            _vm: [ function() { result.push('vm'); } ],
          },
          _: {
            a: [ fn ],
            b: [ fn ],
            c: [ fn ],
          },
        },
      };
    });
    beforeEach(() => {
      result = [];
    });

    test('empty getEventQueue parameter', () => {
      expect(bus.getEventQueue()).toEqual([]);
    });

    test('lack of order parameter', () => {
      expect(bus.getEventQueue({ a: 1 })).toEqual([]);
    });

    test('non array object', () => {
      expect(bus.getEventQueue({ a: 1 }, [])).toEqual([]);
    });

    test('get main queue', () => {
      const queue1 = bus.getEventQueue(bus.events.play.main, [ 'a' ]);
      expect(queue1.length).toBe(2);
      queue1.forEach(each => each());
      expect(result).toEqual([ 'a', 'a' ]);
    });

    test('get main queue with multiple order', () => {
      const queue2 = bus.getEventQueue(bus.events.play.main, [ 'a', 'c', 'b' ]);
      expect(queue2.length).toBe(4);
      queue2.forEach(each => each());
      expect(result).toEqual([ 'a', 'a', 'c', 'b' ]);
    });

    test('get after queue', () => {
      const queue3 = bus.getEventQueue(bus.events.play.after, [ 'a', 'b', 'c' ]);
      expect(queue3.length).toBe(3);
      queue3.forEach(each => each());
      expect(result).toEqual([ 'a', 'c', 'vm' ]);
    });
  });

  describe('runSideEffectEvent', () => {
    const result = [];
    const fn = function(...args) {
      result.push(this.id);
      args.forEach(each => result.push(each));
    };
    beforeAll(() => {
      bus.events = {
        play: {
          _: {
            a: [ fn ],
            b: [ fn ],
            c: [ fn ],
          },
        },
      };
    });

    test('empty side effect', () => {
      bus.runSideEffectEvent('pause');
      expect(result).toEqual([]);
    });

    test('run side effect', () => {
      bus.runSideEffectEvent('play');
      expect(result).toEqual([ 'a', 'b', 'c' ]);
    });

    // test('run side effect with arguments', () => {
    //   bus.runSideEffectEvent('play', [ 'a', 'b' ], 'd', 'e');
    //   expect(result).toEqual([ 'a', 'b', 'c', 'a', 'd', 'e', 'b', 'd', 'e' ]);
    // });
  });

  describe('trigger', () => {
    const result = [];
    const fn = function() { result.push(this.id); };
    beforeAll(() => {
      bus.events = {
        play: {
          before: {
            a: [ fn ],
            b: [ fn ],
          },
          main: {
            a: [ fn, fn ],
            b: [ fn ],
            c: [ fn ],
          },
          after: {
            a: [ fn ],
            c: [ fn ],
          },
          _: {
            a: [ fn ],
            b: [ fn ],
            c: [ fn ],
          },
        },
        end: {
          main: {
            a: [ fn, fn ],
            b: [ fn, () => false ],
            c: [ fn ],
          },
          after: {
            a: [ fn ],
            c: [ fn ],
          },
        },
      };
    });

    test('secondary event trigger', async () => {
      await expect(bus.trigger('beforePlay')).toBe();
      expect(chimeeLog.data.warn).toEqual([
        [ 'bus', 'Secondary Event "beforePlay" could not be call straightly by API.' ],
      ]);
      expect(result).toEqual([]);
    });

    test('trigger null event', async () => {
      await expect(bus.trigger('pause')).resolves.toBe(true);
      expect(result).toEqual([]);
    });

    test('full kernel event trigger', async () => {
      await expect(bus.trigger('play')).resolves.toBe(true);
      expect(result).toEqual([ 'a', 'a', 'b', 'c', 'a', 'c', 'a', 'b', 'c' ]);
    });

    test('full normal event trigger', async () => {
      await expect(bus.trigger('end')).resolves.toBe(true);
      expect(result).toEqual([ 'a', 'a', 'b', 'c', 'a', 'c', 'a', 'b', 'c', 'a', 'a', 'b' ]);
    });
  });

  describe('triggerSync', () => {
    const result = [];
    const fn = function() { result.push(this.id); };
    beforeAll(() => {
      bus.events = {
        play: {
          before: {
            a: [ fn ],
            b: [ fn ],
          },
          main: {
            a: [ fn, fn ],
            b: [ fn ],
            c: [ fn ],
          },
          after: {
            a: [ fn ],
            c: [ fn ],
          },
          _: {
            a: [ fn ],
            b: [ fn ],
            c: [ fn ],
          },
        },
        end: {
          main: {
            a: [ fn, fn ],
            b: [ fn, () => false ],
            c: [ fn ],
          },
          after: {
            a: [ fn ],
            c: [ fn ],
          },
        },
        what: {
          after: {
            a: [ () => false ],
          },
        },
      };
    });

    test('secondary event trigger', () => {
      expect(bus.triggerSync('beforePlay')).toBe(false);
      expect(chimeeLog.data.warn).toEqual([
        [ 'bus', 'Secondary Event "beforePlay" could not be call straightly by API.' ],
      ]);
    });

    test('trigger null event', () => {
      expect(result).toEqual([]);
      expect(bus.triggerSync('pause')).toBe(true);
      expect(result).toEqual([]);
    });

    test('full kernel event trigger', async () => {
      expect(bus.triggerSync('play')).toBe(true);
      expect(result).toEqual([ 'a', 'a', 'b', 'c', 'a', 'c', 'a', 'b', 'c' ]);
    });

    test('full normal event trigger', () => {
      expect(bus.triggerSync('end')).toBe(false);
      expect(result).toEqual([ 'a', 'a', 'b', 'c', 'a', 'c', 'a', 'b', 'c', 'a', 'a', 'b' ]);
    });

    test('after check', () => {
      expect(bus.triggerSync('what')).toBe(false);
    });
  });

  describe('_eventProcessor', () => {
    let result;
    const fn = function() { result.push(this.id); };
    beforeAll(() => {
      bus.events = {
        play: {
          main: {
            a: [ fn ],
          },
        },
        run: {
          main: {
            b: [ fn ],
          },
        },
        seek: {
          main: {
            c: [ fn ],
          },
        },
        focus: {
          main: {
            a: [ fn ],
          },
        },
      };
    });
    beforeEach(() => {
      result = [];
    });

    test('normal event run', async () => {
      await expect(bus.eventProcessor('run', { sync: false })).resolves.toBe(true);
      expect(result).toEqual([ 'b' ]);
    });

    test('normal sync event run', async () => {
      await expect(bus.eventProcessor('run', { sync: true })).toBe(true);
      expect(result).toEqual([ 'b' ]);
    });

    test('kernel event', async () => {
      await expect(bus.eventProcessor('seek', { sync: false })).resolves.toBe(true);
      expect(result).toEqual([ 'c' ]);
      expect(seekCount).toBe(1);
    });

    test('kernel event and then trigger', async () => {
      await expect(bus.eventProcessor('play', { sync: false })).toBe(true);
      expect(playCount).toBe(1);
      expect(result).toEqual([]);
      await bus.trigger('play');
      expect(result).toEqual([ 'a' ]);
    });

    test('dom event', async () => {
      await bus.eventProcessor('focus', { sync: true });
    });
  });

  describe('emit', () => {
    const result = [];
    const fn = function() { result.push(this.id); };
    beforeAll(() => {
      bus.events = {
        run: {
          main: {
            a: [ fn ],
          },
        },
        pause: {
          before: {
            a: [ () => false ],
          },
        },
      };
    });

    test('secondary emit', () => {
      expect(bus.emit('beforePlay')).toBe(undefined);
      expect(chimeeLog.data.warn).toEqual([
        [ 'bus', 'Secondary Event "beforePlay" could not be call straightly by API.' ],
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
    const fn = function() { result.push(this.id); };
    beforeAll(() => {
      bus.events = {
        run: {
          main: {
            a: [ fn ],
          },
        },
        pause: {
          before: {
            a: [ () => false ],
          },
        },
      };
    });

    test('secondary emit', () => {
      expect(bus.emitSync('beforePlay')).toBe(false);
      expect(chimeeLog.data.warn).toEqual([
        [ 'bus', 'Secondary Event "beforePlay" could not be call straightly by API.' ],
      ]);
    });
    // test('successful run', () => {
    //   expect(bus.emitSync('seek')).toBe(true);
    //   expect(seekCount).toBe(3);
    // });

    test('stop run', () => {
      expect(bus.emitSync('pause')).toBe(false);
      expect(bus.emitSync('run')).toBe(true);
      expect(result).toEqual([ 'a' ]);
    });
  });

  describe('once', () => {
    const result = [];
    const fn = function() { result.push(this.id); };
    beforeAll(() => {
      bus.events = {
        run: {
          main: {
            a: [ fn ],
          },
        },
      };
    });


    test('once', async () => {
      bus.once('b', 'run', fn, 'main');
      await expect(bus.emit('run')).resolves.toBe(true);
      expect(result).toEqual([ 'a', 'b' ]);
      expect(bus.events).toEqual({
        run: {
          main: {
            a: [ fn ],
          },
        },
      });
    });


    test('once but still can remove by yourself', () => {
      bus.once('b', 'run', fn, 'main');
      expect(bus.events.run.main.b.length).toBe(1);
      expect(bus.events.run.main.b[0]).not.toBe(fn);
      bus.off('b', 'run', fn, 'main');
      expect(bus.events.run.main.b).toBe();
    });


    test('multiple once and multiple remove', () => {
      bus.once('b', 'run', fn, 'main');
      expect(bus.events.run.main.b.length).toBe(1);
      bus.once('b', 'run', fn, 'main');
      expect(bus.events.run.main.b.length).toBe(2);
      bus.off('b', 'run', fn, 'main');
      expect(bus.events.run.main.b.length).toBe(1);
      bus.off('b', 'run', fn, 'main');
      expect(bus.events.run.main.b).toBe();
    });


    test('off from empty map', () => {
      expect(() => bus.off('c', 'sth', fn, 'main')).not.toThrow();
    });
  });

  test('off from empty', () => {
    expect(() => bus.off('b', 'run', function() {}, 'main')).not.toThrow();
  });

  describe('error handle', () => {
    const errmsg = 'i am an error';
    const errorFn = () => { throw new Error(errmsg); };
    let errcount;
    beforeEach(() => {
      errcount = 0;
    });

    test('emit', async () => {
      bus.on('b', 'throw', errorFn, 'before');
      try {
        await bus.emit('throw');
      } catch (error) {
        expect(error.message).toBe(errmsg);
        errcount++;
      }
      expect(errcount).toBe(1);
      bus.off('b', 'throw', errorFn, 'before');
    });

    test('trigger', async () => {
      bus.on('b', 'throw', errorFn, 'after');
      try {
        await bus.trigger('throw');
      } catch (error) {
        expect(error.message).toBe(errmsg);
        errcount++;
      }
      expect(errcount).toBe(1);
      bus.off('b', 'throw', errorFn, 'after');
    });

    test('deep emit', async () => {
      const fn = function() {};
      bus.on('b', 'throw', fn, 'before');
      bus.on('b', 'throw', errorFn, 'before');
      try {
        await bus.emit('throw');
      } catch (error) {
        expect(error.message).toBe(errmsg);
        errcount++;
      }
      expect(errcount).toBe(1);
      bus.off('b', 'throw', errorFn, 'before');
      bus.off('b', 'throw', fn, 'before');
    });

    test('deep trigger', async () => {
      const fn = function() {};
      bus.on('b', 'throw', fn, 'after');
      bus.on('b', 'throw', errorFn, 'after');
      try {
        await bus.trigger('throw');
      } catch (error) {
        expect(error.message).toBe(errmsg);
        errcount++;
      }
      expect(errcount).toBe(1);
      bus.off('b', 'throw', errorFn, 'after');
      bus.off('b', 'throw', fn, 'after');
    });
  });

  test('destroy', () => {
    bus.destroy();
    expect(bus.events).toBe(undefined);
    expect(bus.dispatcher).toBe(undefined);
  });

});
