import base, { banner } from './rollup.config.base';
const { name } = require('../package.json');
import { camelize } from 'toxic-utils';
export default Object.assign(base('umd'), {
  output: {
    format: 'umd',
    file: 'lib/index.browser.js',
    name: camelize(name),
    banner,
  },
});
