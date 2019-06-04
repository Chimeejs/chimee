const {
  version,
  name,
  author,
  license,
  dependencies,
} = require('../package.json');
export const banner = `
/**
 * ${name} v${version}
 * (c) 2017-${(new Date()).getFullYear()} ${author}
 * Released under ${license}
 * Built ad ${new Date()}
 */
`;
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const babelConfig = {
  common: {
    presets: [
      [ '@babel/preset-env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    plugins: [ '@babel/plugin-transform-runtime' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  es: {
    presets: [
      [ '@babel/preset-env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    plugins: [ '@babel/plugin-transform-runtime' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  umd: {
    presets: [
      [ '@babel/preset-env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    plugins: [ '@babel/plugin-transform-runtime' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  iife: {
    presets: [
      [ '@babel/preset-env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    exclude: 'node_modules/**',
    plugins: [ ],
    babelrc: false,
  },
  min: {
    presets: [
      [ '@babel/preset-env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    plugins: [ ],
    exclude: 'node_modules/**',
    babelrc: false,
  },
};
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default function(mode) {
  return {
    input: 'ts-out/index.js',
    external(id) {
      const isExternal = !/min|umd|iife/.test(mode) && externalRegExp.test(id);
      return mode === 'common' ? isExternal && id.indexOf('lodash-es') < 0 : isExternal;
    },
    plugins: [
      babel(babelConfig[mode]),
      commonjs(),
      resolve({
        customResolveOptions: {
          moduleDirectory: [ 'ts-out', 'node_modules' ],
        },
      }),
    ],
  };
}
