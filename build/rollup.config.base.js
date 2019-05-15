const { version, name, author, license, dependencies } = require('../package.json');
export const banner = `
/**
 * ${name} v${version}
 * (c) 2017-${(new Date().getFullYear())} ${author}
 * Released under ${license}
 */
`;
import flow from 'rollup-plugin-flow-no-whitespace';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import visualizer from 'rollup-plugin-visualizer';
const babelConfig = {
  common: {
    presets: [
      '@babel/preset-flow',
      [ '@babel/env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    exclude: 'node_modules/**',
    plugins: [
      [ '@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      'lodash',
      '@babel/plugin-transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  es: {
    presets: [
      '@babel/preset-flow',
      [ '@babel/env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    exclude: 'node_modules/**',
    plugins: [
      [ '@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      'lodash',
      '@babel/plugin-transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  esm: {
    presets: [
      '@babel/preset-flow',
      [ '@babel/env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    exclude: 'node_modules/**',
    plugins: [
      [ '@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      'lodash',
      '@babel/plugin-transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  umd: {
    presets: [
      '@babel/preset-flow',
      [ '@babel/env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    exclude: 'node_modules/**',
    plugins: [
      [ '@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      'lodash',
      '@babel/plugin-transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  iife: {
    presets: [
      '@babel/preset-flow',
      [ '@babel/env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    exclude: 'node_modules/**',
    plugins: [
      [ '@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      'lodash',
      '@babel/plugin-transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  min: {
    presets: [
      '@babel/preset-flow',
      [ '@babel/env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
    ],
    exclude: 'node_modules/**',
    plugins: [
      [ '@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      'lodash',
    ],
    runtimeHelpers: true,
    babelrc: false,
  },
};
const externalRegExp = new RegExp('^(' + Object.keys(dependencies).join('|') + ')$');
export default function(mode) {
  return {
    // input: 'ts-out/index.js',
    input: 'lib/esnext/index.js',
    external(id) {
      return !/min|umd|iife|esm/.test(mode) && externalRegExp.test(id);
    },
    plugins: [
      babel(babelConfig[mode]),
      flow(),
      commonjs({
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          'node_modules/events/events.js': [ 'EventEmitter' ],
        },
      }),
      replace({
        'process.env.PLAYER_VERSION': `'${version}'`,
      }),
      resolve({
        customResolveOptions: {
          moduleDirectory: /min|umd|iife|esm/.test(mode) ? [ 'src', 'node_modules' ] : [ 'src' ],
        },
        preferBuiltins: false,
      }),
      visualizer({
        filename: `bundle-size/${mode}.html`,
      }),
    ],
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning); // this requires Rollup 0.46
    },
  };
}
