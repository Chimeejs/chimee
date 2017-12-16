import base from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import { camelize } from 'toxic-utils';
const { name } = require('../package.json');

const config = base('iife');
config.plugins.push(
  serve({
    open: false,
    verbose: true,
    contentBase: '',
    historyApiFallback: false,
    host: 'localhost',
    port: 10002,
  }),
  livereload()
);
config.plugins.unshift(replace({
  'process.env.NODE_ENV': '"development"',
}));
export default Object.assign(config, {
  output: {
    format: 'iife',
    file: 'lib/index.dev.js',
  },
  name: camelize(name, true),
});
