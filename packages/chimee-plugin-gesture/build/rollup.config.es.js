import base from './rollup.config.base';
export default base({
  output: {
    format: 'es',
    file: 'lib/index.mjs'
  }
});
