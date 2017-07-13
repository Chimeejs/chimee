import base from './rollup.config.base';
export default Object.assign(base('es'), {
  format: 'es',
  dest: 'lib/index.mjs',
});