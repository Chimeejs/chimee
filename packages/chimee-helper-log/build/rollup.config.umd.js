import base from './rollup.config.base';
const { name } = require('../package.json');
import { camelize } from 'toxic-utils';
export default Object.assign(base('umd'), {
  format: 'umd',
  dest: 'lib/index.browser.js',
  moduleName: camelize(name),
});
