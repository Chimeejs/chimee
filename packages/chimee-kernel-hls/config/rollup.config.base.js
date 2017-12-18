import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

const { version, name, author, license, dependencies } = require('../package.json');
const babelConfig = {
  common: {
    presets: [
      [ 'latest', { es2015: { modules: false } }],
    ],
    plugins: [ 'transform-runtime' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  es: {
    presets: [
      [ 'latest', { es2015: { modules: false } }],
    ],
    plugins: [ 'transform-runtime' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  umd: {
    presets: [ 'es2015-rollup' ],
    plugins: [ 'transform-runtime' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  iife: {
    presets: [ 'es2015-rollup', 'stage-0' ],
    plugins: [ 'transform-decorators-legacy' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  min: {
    presets: [ 'es2015-rollup' ],
    exclude: 'node_modules/**',
    plugins: [],
    babelrc: false,
  },
};
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default function(mode) {
  return {
    entry: 'src/index.js',
    external(id) {
      return !/min|umd|iife/.test(mode) && externalRegExp.test(id);
    },
    plugins: [
      babel(babelConfig[mode]),
      resolve(),
      commonjs(),
      replace({
        __VERSION__: `'${version}'`,
      }),
    ],
  };
}
