const { version, name, author, license, dependencies } = require('../package.json');
const cpx = require('cpx');
const path = require('path');
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
import postcss from 'rollup-plugin-postcss';
import string from 'rollup-plugin-string';
// PostCSS plugins
import cssnano from 'cssnano';
import base64 from 'postcss-base64';
cpx.copy(path.resolve(__dirname, '../src/*.css'), path.resolve(__dirname, '../lib/esnext'));
cpx.copy(path.resolve(__dirname, '../src/image/*'), path.resolve(__dirname, '../lib/esnext/image'));

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
    exclude: /node_modules\/(?!flv\.js)/,
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
    exclude: /node_modules\/(?!flv\.js)/,
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
    exclude: /node_modules\/(?!flv\.js)/,
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
    exclude: /node_modules\/(?!flv\.js)/,
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
    exclude: /node_modules\/(?!flv\.js)/,
    runtimeHelpers: true,
    babelrc: false,
  },
};
const externalRegExp = new RegExp(`/(${Object.keys(dependencies).join('|')})/`);
export default function(mode) {
  return {
    input: 'lib/esnext/index.js',
    external(id) {
      const isExternal = id === 'chimee' || id === 'chimee-plugin-gesture' || (!/min|umd|iife/.test(mode) && externalRegExp.test(id));
      return mode === 'common' ? isExternal && id.indexOf('lodash-es') < 0 : isExternal;
    },
    plugins: [
      string({
        include: '**/image/*.svg',
      }),
      babel(babelConfig[mode]),
      postcss({
        plugins: [
          base64({
            extensions: [ '.svg', 'png' ],
            root: './src/',
          }),
          cssnano(),
        ],
        extensions: [ '.css' ],
        extract: true,
      }),
      commonjs(),
      replace({
        'process.env.VERSION': `'${version}'`,
      }),
      resolve({
        preferBuiltins: !/min|umd|iife/.test(mode),
      }),
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
