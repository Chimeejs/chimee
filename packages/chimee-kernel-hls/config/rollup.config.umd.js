import base from './rollup.config.base';
export default Object.assign(base('umd'), {
  format: 'umd',
  dest: 'lib/index.browser.js',
  moduleName: 'chimeeKernelHls',
});
