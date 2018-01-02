import base, { banner } from './rollup.config.base';
const { name } = require('../package.json');
import { camelize } from 'toxic-utils';
import replace from 'rollup-plugin-replace';
const config = base('umd');
config.plugins.unshift(replace({
  'process.env.NODE_ENV': '"development"',
}));
export default Object.assign(config, {
  output: {
    format: 'umd',
    file: 'lib/index.browser.js',
    banner,
    name: camelize(name, true),
  },
});
