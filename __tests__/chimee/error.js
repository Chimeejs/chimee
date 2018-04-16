import Chimee from 'index';

describe('__throwError', () => {
  const error = new Error('hello, i am an error');
  let fn;
  let player;
  beforeEach(() => {
    fn = jest.fn();
    player = new Chimee({
      // 播放地址
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      // 直播:live 点播：vod
      type: 'vod',
      // 编解码容器
      box: 'native',
      // dom容器
      wrapper: 'body',
      plugin: [],
      events: {},
    });
  });

  afterEach(() => {
    fn = null;
    player.destroy();
    player = null;
  });

  test('normal throw', () => {
    expect(() => player.__throwError(error)).toThrow(error.message);
  });

  test('string error', () => {
    expect(() => player.__throwError(error.message)).toThrow(error.message);
  });

  test('instance error handler', () => {
    player.config.errorHandler = fn;
    expect(() => player.__throwError(error)).not.toThrow();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).lastCalledWith(error);
    delete player.config.errorHandler;
  });

  test('Chimee error handler', () => {
    Chimee.config.errorHandler = fn;
    expect(() => player.__throwError(error)).not.toThrow();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).lastCalledWith(error);
    delete Chimee.config.errorHandler;
  });

  test('instance could not be silent', () => {
    player.config.silent = true;
    expect(() => player.__throwError(error)).toThrow();
    delete player.config.silent;
  });

  test('Chimee silent', () => {
    expect(Chimee.config.log.error).toBe();
    expect(Chimee.config.log.info).toBe();
    expect(Chimee.config.log.warn).toBe();
    expect(Chimee.config.log.debug).toBe();
    expect(Chimee.config.log.verbose).toBe();
    Chimee.config.silent = true;
    expect(Chimee.config.log.error).toBe(false);
    expect(Chimee.config.log.info).toBe(false);
    expect(Chimee.config.log.warn).toBe(false);
    expect(Chimee.config.log.debug).toBe(false);
    expect(Chimee.config.log.verbose).toBe(false);
    expect(() => player.__throwError(error)).not.toThrow();
    Chimee.config.silent = false;
    expect(Chimee.config.log.error).toBe(true);
    expect(Chimee.config.log.info).toBe(true);
    expect(Chimee.config.log.warn).toBe(true);
    expect(Chimee.config.log.debug).toBe(true);
    expect(Chimee.config.log.verbose).toBe(true);
    expect(() => player.__throwError(error)).toThrow();
    delete Chimee.config.silent;
  });
});
