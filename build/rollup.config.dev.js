import base from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import {camelize} from 'toxic-utils';
const {name, version} = require('../package.json');
const config = base('iife');
config.plugins.push(
  serve(),
  livereload(),
  replace({
    'process.env.PLAYER_VERSION': `'${version}'`
  })
);
export default Object.assign(config, {
  format: 'umd',
  dest: 'lib/index.dev.js',
  moduleName: camelize(name, true)
});
