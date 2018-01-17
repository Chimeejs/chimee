const { version, name, author, license, dependencies } = require('../package.json');
export const banner = `
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
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      'transform-decorators-legacy',
      'transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  es: {
    presets: [
      'flow',
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      'transform-decorators-legacy',
      'transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  umd: {
    presets: [
      'flow',
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      'transform-decorators-legacy',
      'transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  iife: {
    presets: [
      'flow',
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      'transform-decorators-legacy',
      'transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  min: {
    presets: [
      'flow',
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      'transform-decorators-legacy',
    ],
    runtimeHelpers: true,
    babelrc: false,
  },
};
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default function(mode) {
  return {
    input: 'src/index.js',
    external(id) {
      return !/min|umd|iife/.test(mode) && externalRegExp.test(id);
    },
    plugins: [
      babel(babelConfig[mode]),
      flow(),
      resolve({
        customResolveOptions: {
          moduleDirectory: [ 'src', 'node_modules' ],
        },
      }),
      commonjs(),
      replace({
        'process.env.VERSION': `'${version}'`,
      }),
    ],
  };
}
