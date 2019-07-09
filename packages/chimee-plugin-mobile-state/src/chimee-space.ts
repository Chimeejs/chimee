// tslint:disable-next-line:no-namespace
declare namespace ChimeeSpace {
  interface IChimeeEventRecord {
    'state-change': 'loading' | 'error' | 'play' | '';
    'state-panend': TouchEvent;
    'state-panmove': TouchEvent;
    'state-panstart': TouchEvent;
    'state-tap': TouchEvent;
  }
}
