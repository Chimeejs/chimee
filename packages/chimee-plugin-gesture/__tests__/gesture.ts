import { GestureHelper, isSupportedEvents } from '../src/gesture';

function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

test('isSupportedEvents', () => {
  expect(isSupportedEvents('tap')).toBe(true);
  expect(isSupportedEvents('click')).toBe(false);
});

describe('GestureHelper', () => {
  let fire: (type: string) => void;
  let helper: GestureHelper;
  beforeEach(() => {
    fire = jest.fn();
    helper = new GestureHelper({ fire(type: string, evt: TouchEvent) { fire(type); } });
  });

  afterEach(() => {
    fire = null;
    helper = null;
  });

  test('tap', () => {
    helper.touchstart(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    helper.touchend(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(1);
    expect(fire).toBeCalledWith('tap');
  });

  test('doubletap', () => {
    helper.touchstart(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    helper.touchend(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(1);
    expect(fire).toBeCalledWith('tap');
    helper.touchstart(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    helper.touchend(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(3);
    expect(fire).toBeCalledWith('tap');
    expect(fire).toBeCalledWith('doubletap');
  });

  test('press', async () => {
    helper.touchstart(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    await sleep(300);
    helper.touchend(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(1);
    expect(fire).toBeCalledWith('press');
  });

  test('swipe', async () => {
    helper.touchstart(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    await sleep(0);
    helper.touchend(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 100,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(1);
    expect(fire).toBeCalledWith('swipe');
  });

  test('pan', () => {
    helper.touchstart(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    helper.touchmove(new TouchEvent('touchmove', {
      changedTouches: [
        ({
          clientX: 50,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(1);
    expect(fire).toBeCalledWith('panstart');
    helper.touchend(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 100,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(3);
    expect(fire).toBeCalledWith('panend');
    expect(fire).toBeCalledWith('swipe');
  });

  test('panmove', () => {
    helper.touchstart(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    helper.touchmove(new TouchEvent('touchmove', {
      changedTouches: [
        ({
          clientX: 50,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(1);
    expect(fire).toBeCalledWith('panstart');
    helper.touchmove(new TouchEvent('touchmove', {
      changedTouches: [
        ({
          clientX: 80,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(2);
    expect(fire).toBeCalledWith('panmove');
    helper.touchend(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 100,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(4);
    expect(fire).toBeCalledWith('panend');
    expect(fire).toBeCalledWith('swipe');
  });

  test('touchmove but no pan', () => {
    helper.touchstart(new TouchEvent('touchstart', {
      changedTouches: [
        ({
          clientX: 0,
          clientY: 0,
        } as Touch),
      ],
    }));
    helper.touchmove(new TouchEvent('touchmove', {
      changedTouches: [
        ({
          clientX: 5,
          clientY: 0,
        } as Touch),
      ],
    }));
    helper.touchend(new TouchEvent('touchend', {
      changedTouches: [
        ({
          clientX: 100,
          clientY: 0,
        } as Touch),
      ],
    }));
    expect(fire).toHaveBeenCalledTimes(1);
    expect(fire).toBeCalledWith('swipe');
  });
});
