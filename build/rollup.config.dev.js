import base, { banner } from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { camelize } from 'toxic-utils';
const { name } = require('../package.json');
const config = base('iife');
// delete config.plugins;
config.plugins = config.plugins.concat([
  replace({
    'process.env.NODE_ENV': '"development"',
  }),
  // serve(),
  // livereload(),
  // sourcemaps(),
]);
config.input = 'lib/esnext/index.js';
export default Object.assign(config, {
  output: {
    format: 'umd',
    file: 'lib/index.dev.js',
    name: camelize(name, true),
    banner,
    sourceMap: true,
  },
});
