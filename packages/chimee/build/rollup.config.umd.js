import base from './rollup.config.base';
const {name} = require('../package.json');
import {camelize} from 'toxic-utils';
import replace from 'rollup-plugin-replace';
const config = base('umd');
config.plugins.unshift(replace({
  'process.env.NODE_ENV': '"development"'
}));
export default Object.assign(config, {
  format: 'umd',
  dest: 'lib/index.browser.js',
  moduleName: camelize(name, true)
});
