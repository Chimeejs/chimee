import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
export default {
  input: 'demo/ie/index.js',
  output: {
    format: 'umd',
    file: 'demo/ie/dist.js',
  },
  plugins: [
    babel({
      presets: [ 'es2015-rollup', 'stage-0' ],
      exclude: 'node_modules/**',
      babelrc: false,
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: [ 'src', 'node_modules' ],
      },
    }),
    commonjs(),
  ],
};
