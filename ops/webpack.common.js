/**
 * Common webpack config
 * @desc Shared webpack config between Development and Production
 * Path = node package for accessing local paths
 * Glob = similar to regex
 * MiniCssExtractPlugin = extract css from js files https://webpack.js.org/plugins/mini-css-extract-plugin/
 * Chalk = Visual console.logs
 */

import path from 'path';
import glob from 'glob';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';

/**
  * Define input and output paths
*/
const PATHS = {
  src: path.resolve(__dirname, '../src'),
  output: path.resolve(__dirname, '../dist'),
};


/**
 * Merged settings
 * @desc Visit https://webpack.js.org/configuration/ for full list of options
 * Entry = which files are processed by webpack.
 * Output = Use [name] to dynamically pass filename
 * Optimization = Automatically create a bundled file named when a minimum of 2 chunks
 * are shared between files. Also known as file splitting. Vendors file automatically created from
 * node_module imports. These files should be the core external files used across the site.
 * Plugins = Extendable options defined here. See more popular plugins https://webpack.js.org/plugins/
 * Module = Determine rules of how files will be processed and in what order functions will
 * be applied to them.
*/
export default {
  entry: glob.sync(`${PATHS.src}/assets/scripts/templates/*.js`)
    .reduce((x, y) => Object.assign(x, {
      [y.split('/').reverse()[0].split('.')[0]]: y,
    }), {}),
  output: {
    filename: '[name].bundle.js',
    path: `${PATHS.output}/assets`,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        theme: {
          name: 'theme',
          chunks: 'all',
          minChunks: 2,
          maxSize: 0,
          minSize: 0,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: '[name].bundle.js',
          chunks: 'all',
          minChunks: 3,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].scss.liquid',
    }),
    new ProgressBarPlugin({
      width: 33,
      complete: `${chalk.hex('#6849E3').bold('█')}`,
      incomplete: `${chalk.white.bold('█')}`,
      format: `:bar ${chalk.hex('#6849E3').bold(':percent')} (:elapsed seconds)`,
      clear: false,
      summary: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
              }],
            ],
          },
        },
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                { search: "'{{", replace: '{{' },
                { search: "}}'", replace: '}}' },
              ],
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `@import  "${PATHS.src}/assets/styles/utility/variables";\n `,
            },
          },
        ],
      },
    ],
  },
};
