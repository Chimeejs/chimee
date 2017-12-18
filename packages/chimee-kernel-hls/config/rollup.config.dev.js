import base from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

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
export default Object.assign(config, {
  format: 'umd',
  dest: 'lib/index.dev.js',
  moduleName: 'chimeeKernelHls',
});
