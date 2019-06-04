const { version, name, author, license, dependencies } = require('../package.json');
export const banner = `
/**
 * ${name} v${version}
 * (c) 2017-${(new Date().getFullYear())} ${author}
 * Released under ${license}
 */
`;
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import visualizer from 'rollup-plugin-visualizer';
import builtins from 'rollup-plugin-node-builtins';
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
    exclude: /node_modules/,
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
    plugins: [[ '@babel/plugin-transform-runtime' ]],
    exclude: /node_modules/,
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
    plugins: [
      [ '@babel/plugin-transform-runtime' ],
    ],
    exclude: /node_modules/,
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
    exclude: /node_modules/,
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
    plugins: [
      [ '@babel/plugin-transform-runtime', { useESModules: true }],
    ],
    exclude: /node_modules/,
    runtimeHelpers: true,
    babelrc: false,
  },
};
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default function(mode) {
  return {
    input: 'lib/esnext/index.js',
    external(id) {
      const isExternal = !/min|umd|iife/.test(mode) && externalRegExp.test(id);
      return mode === 'common' ? isExternal && id.indexOf('lodash-es') < 0 : isExternal;
    },
    plugins: [
      babel(babelConfig[mode]),
      commonjs({
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          'node_modules/events/events.js': [ 'EventEmitter' ],
        },
      }),
      replace({
        'process.env.VERSION': `'${version}'`,
      }),
      resolve({
        preferBuiltins: !/min|umd|iife/.test(mode),
      }),
      builtins(),
      visualizer({
        filename: `bundle-size/${mode}.html`,
      }),
    ],
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning); // this requires Rollup 0.46
    },
    watch: {
      clearScreen: false,
    },
  };
}
