import base, { banner } from './rollup.config.base';
export default Object.assign(base('es'), {
  output: {
    format: 'es',
    file: 'lib/index.mjs',
    banner,
  },
});
