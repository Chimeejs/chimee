import base from './rollup.config.base';
export default base({
  output: {
    format: 'cjs',
    file: 'lib/index.js'
  }
});
