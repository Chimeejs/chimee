function getDistance(x: number, y: number, x1: number, y1: number) {
  return Math.sqrt(Math.pow((x1 - x), 2) + Math.pow((y1 - y), 2));
}

function getSpeed(s: number, t: number) {
  return s / t;
}

export type supportedEvents = 'tap' | 'doubletap' | 'press' | 'swipe' | 'panend' | 'panstart' | 'panmove';

const supportedEvents: supportedEvents[] = ['tap' , 'doubletap' , 'press' , 'swipe' , 'panend' , 'panstart' , 'panmove'];

export function isSupportedEvents(name: string) {
  return supportedEvents.indexOf(name as supportedEvents) > -1;
}

export class GestureHelper {
  private endTime: number;
  private endTouch: Touch;
  private fire: (name: supportedEvents, evt: TouchEvent) => void;
  private startTime: number;
  private startTouch: Touch;
  private status: 'tapping' | '' | 'swipe' | 'pressing' | 'panning';

  constructor({ fire }: { fire: GestureHelper['fire'] }) {
    this.startTime = 0;
    this.endTime = 0;
    this.status = '';
    this.fire = fire;
  }

  public touchend = (evt: TouchEvent) => {
    evt.preventDefault(); // 防止 300ms click 事件 chimeejs/chimee-mobile-player#32
    this.endTouch = evt.changedTouches[0];

    const time = Date.now();
    const distance = getDistance(
      this.startTouch.clientX,
      this.startTouch.clientY,
      this.endTouch.clientX,
      this.endTouch.clientY);
    const interval = time - this.startTime;

    if (interval <= 250 && distance < 10) {
      this.fire('tap', evt);
      if (time - this.endTime < 300) {
        this.fire('doubletap', evt);
      }
    }

    if (interval > 250 && distance < 10) {
      this.fire('press', evt);
    }

    const speed = getSpeed(distance, interval);

    if (speed > 0.3 && distance >= 10) {
      this.fire('swipe', evt);
    }

    if (this.status === 'panning') {
      this.fire('panend', evt);
    }
    this.endTime = Date.now();
  }

  public touchmove = (evt: TouchEvent) => {

    const touch = evt.changedTouches[0];

    const distance = getDistance(this.startTouch.clientX, this.startTouch.clientY, touch.clientX, touch.clientY);

    if (this.status === 'tapping' && distance > 10) {
      this.status = 'panning';
      this.fire('panstart', evt);
    } else if (this.status === 'panning') {
      this.fire('panmove', evt);
    }
  }

  public touchstart = (evt: TouchEvent) => {
    this.startTouch = evt.changedTouches[0];
    this.startTime = Date.now();
    this.status = 'tapping';
  }
}
