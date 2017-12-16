import base from './rollup.config.base';
export default Object.assign(base('es'), {
  output: {
    format: 'es',
    file: 'lib/index.mjs',
  },
});
