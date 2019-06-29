import base, { banner } from './rollup.config.base';
export default Object.assign(base('common'), {
  output: {
    banner,
    format: 'cjs',
    file: 'lib/index.js',
  },
});
