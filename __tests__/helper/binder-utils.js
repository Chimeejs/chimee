import { getEventStage } from 'helper/binder';

describe('getEventStage', () => {

  test('get main event', () => {
    expect(getEventStage('play')).toEqual({
      stage: 'main',
      name: 'play',
    });
  });

  test('get before event', () => {
    expect(getEventStage('beforePlay')).toEqual({
      stage: 'before',
      name: 'play',
    });
  });

  test('get after event', () => {
    expect(getEventStage('afterplay')).toEqual({
      stage: 'after',
      name: 'play',
    });
  });

  test('get side effect event', () => {
    expect(getEventStage('_play')).toEqual({
      stage: '_',
      name: 'play',
    });
  });
});
