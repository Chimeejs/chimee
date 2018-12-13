import { chimeeLog as Log } from 'index';

let ret = '';

const examples = [
  {
    method: 'error',
    msg: 'err msg',
  },
  {
    method: 'info',
    msg: 'info msg',
  },
  {
    method: 'warn',
    msg: 'warn msg',
  },
  {
    method: 'debug',
    msg: 'debug msg',
  },
  {
    method: 'verbose',
    msg: 'verbose msg',
  },
];

/* console各属性方法不存在测试 */
examples.forEach(item => testBasic(Object.assign({ tag: 'tag' }, item)));

/* console各属性方法存在情况分别测试 */
examples.forEach(item => testBasic(Object.assign({
  tag: 'tag',
  methodFuns: { error: str => { ret = str; } },
}, item)));
examples.forEach(item => testBasic(Object.assign({
  tag: 'tag',
  methodFuns: { info: str => { ret = str; } },
}, item)));
examples.forEach(item => testBasic(Object.assign({
  tag: 'tag',
  methodFuns: { warn: str => { ret = str; } },
}, item)));
examples.forEach(item => testBasic(Object.assign({
  tag: 'tag',
  methodFuns: { debug: str => { ret = str; } },
}, item)));
examples.forEach(item => testBasic(Object.assign({
  tag: 'tag',
  methodFuns: { verbose: str => { ret = str; } },
}, item)));

/* ENABLE */
examples.forEach(item => testBasic(Object.assign({ enable: true, tag: 'tag' }, item)));

/* forceGlobalTag */
examples.forEach(item => testBasic(Object.assign({ forceGlobalTag: true, enable: false, tag: 'chimee' }, item)));

function testBasic({
  method = 'log',
  msg = 'msg',
  tag = 'tag',
  forceGlobalTag = false,
  enable,
  methodFuns,
}) {
  let caseType = '';
  if (forceGlobalTag) {
    caseType = '[FORCE_GLOBAL_TAG]';
  }
  if (enable) {
    caseType = '[ENABLE]';
  }
  if (methodFuns) {
    caseType = `[HasMethod ${Object.keys(methodFuns).join()}]`;
  }
  test(`log.${method} ${caseType}`, () => {
    const _console = global.console;
    global._console = _console;
    ret = '';
    // 劫持系统console来测试
    global.console = {
      log: str => {
        // _console.log('xxx:',str);
        ret = str;
      },
    };
    if (methodFuns) {
      Object.assign(global.console, methodFuns);
    }

    if (forceGlobalTag) {
      Log.FORCE_GLOBAL_TAG = true;
    }
    if (enable) {
      Log[`ENABLE_${method.toLocaleUpperCase()}`] = false;
    }
    Log[method](tag, msg);
    // _console.log('ret:', ret);
    expect(ret).toBe(enable ? '' : `[${tag}] > ${msg}`);
    if (enable) {
      // 复原
      Log[`ENABLE_${method.toLocaleUpperCase()}`] = true;
    }

    global.console = _console;
  });

}

describe('arguments is not enough', () => {
  let origin;
  let fn;
  beforeAll(() => {
    origin = global.console.error;
    fn = jest.fn();
    global.console.error = fn;
  });
  afterAll(() => {
    global.console.error = origin;
  });
  test('only message but no tag', () => {
    Log.error('i am ok');
    expect(fn).lastCalledWith('[chimee] > i am ok');
  });
  test('when pass nothing, throws error', () => {
    expect(() => Log.error(1)).toThrow();
  });
  test('empty tag', () => {
    Log.FORCE_GLOBAL_TAG = false;
    Log.error('', 'i am ok');
    expect(fn).lastCalledWith('[chimee] > i am ok');
  });
});

