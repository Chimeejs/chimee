import base from './rollup.config.base';
import replace from 'rollup-plugin-replace';
const config = base({
  output: {
    format: 'umd',
    file: 'lib/index.browser.js'
  }
});
config.plugins.unshift(replace({
  'process.env.NODE_ENV': '"development"'
}));
export default config;
