const {version, name, author, license, dependencies} = require('../package.json');
const banner = `
/**
 * ${name} v${version}
 * (c) 2017 ${author}
 * Released under ${license}
 */
`;
import flow from 'rollup-plugin-flow-no-whitespace';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
const babelConfig = {
  common: {
    presets: [
      'flow',
      ['latest', {es2015: {modules: false}}],
      'stage-0'
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-runtime'
    ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false
  },
  es: {
    presets: [
      'flow',
      ['latest', {es2015: {modules: false}}],
      'stage-0'
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-runtime'
    ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false
  },
  umd: {
    presets: ['flow', 'es2015-rollup', 'stage-0'],
    plugins: [
      'transform-decorators-legacy',
      'transform-runtime'
    ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false
  },
  iife: {
    presets: ['flow', 'es2015-rollup', 'stage-0'],
    plugins: ['transform-decorators-legacy'],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false
  },
  min: {
    presets: ['flow', 'es2015-rollup', 'stage-0'],
    exclude: 'node_modules/**',
    plugins: ['transform-decorators-legacy'],
    babelrc: false
  }
};
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default function (mode) {
  return {
    entry: 'src/index.js',
    banner,
    external (id) {
      return !/min|umd|iife/.test(mode) && externalRegExp.test(id);
    },
    plugins: [
      babel(babelConfig[mode]),
      flow(),
      resolve({
        customResolveOptions: {
          moduleDirectory: ['src', 'node_modules']
        }
      }),
      commonjs(),
      replace({
        'process.env.PLAYER_VERSION': `'${version}'`
      })
    ]
  };
};
