// tslint:disable-next-line:no-namespace
declare namespace ChimeeSpace {
  interface IChimeeEventRecord extends DocumentEventMap {
    enterpictureinpicture: void;
    leavepictureinpicture: void;
  }

  type ListenerType<T> = [T] extends [(...args: infer U) => any]
  ? U
  : [T] extends [void] ? [] : [T];

}
