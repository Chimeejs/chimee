import base, { banner } from './rollup.config.base';
import replace from 'rollup-plugin-replace';
const config = base('esm');
config.plugins.unshift(replace({
  'process.env.NODE_ENV': '"development"',
}));
export default Object.assign(config, {
  output: {
    format: 'es',
    file: 'lib/index.esm.js',
    banner,
  },
});
