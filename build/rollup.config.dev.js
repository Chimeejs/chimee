import base, { banner } from './rollup.config.base';
import replace from 'rollup-plugin-replace';
import { camelize } from 'toxic-utils';
import sourcemaps from 'rollup-plugin-sourcemaps';
const { name } = require('../package.json');
const config = base('iife');
// delete config.plugins;
config.plugins = config.plugins.concat([
  replace({
    'process.env.NODE_ENV': '"development"',
  }),
  // serve(),
  // livereload(),
  sourcemaps(),
]);
// config.input = 'lib/esnext/index.js';
export default Object.assign(config, {
  output: {
    format: 'umd',
    file: 'lib/index.dev.js',
    name: camelize(name, true),
    banner,
    sourceMap: true,
  },
});
