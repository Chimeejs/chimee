import base from './rollup.config.base';
export default Object.assign(base('common'), {
  format: 'cjs',
  dest: 'lib/index.js',
});