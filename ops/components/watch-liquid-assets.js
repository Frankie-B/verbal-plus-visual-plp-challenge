/**
 * Watch function for non-webpack processed files
 * @desc Files not processed by webpack will be piped with Chokidar
 */

import { copy } from 'fs-extra';
import fs from 'fs';
import path from 'path';
import slash from 'slash';
import glob from 'glob';
import chalk from 'chalk';
import chokidar from 'chokidar';

const { log } = console;

log('👀', chalk.bgHex('#3AA8B5').white('[Start Watch]\n'));

/**
  @desc Define input and output paths
*/
const PATHS = {
  src: path.resolve(__dirname, '../../src'),
  output: path.resolve(__dirname, '../../dist'),
};

/**
 * Copy files
 * @desc Copy files to dist folder and flattens subfolders
 */
const copyFile = (output, filePath) => {
  const splitPath = output.split('/');
  const splitPathRev = output.split('/').reverse();
  let flattenedPath = `${splitPath[0]}/${splitPathRev[0]}`
  if (output.includes('/customers/')) {
    flattenedPath = `${splitPath[0]}/customer/${splitPathRev[0]}`;
  }
  copy(`${filePath}`, `${PATHS.output}/${flattenedPath}`);
};

/**
 * Delete files
 * @desc Delete files from dist folder
 */
const unlinkFile = (output) => {
  const splitPath = output.split('/');
  const splitPathRev = output.split('/').reverse();
  let flattenedPath = `${splitPath[0]}/${splitPathRev[0]}`
  if (output.includes('/customers/')) {
    flattenedPath = `${splitPath[0]}/customer/${splitPathRev[0]}`;
  }
  fs.unlinkSync(`${PATHS.output}/${flattenedPath}`);
};

/**
 * Ignored files
 * @desc Ignored files which are processed by webpack.
 */
let ignorePaths;
const ignoreAssets = async () => {
  await new Promise((resolve, reject) => {
    glob(`${PATHS.src}/assets/{scripts,styles}`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        const assetFiles = [...res];
        ignorePaths = assetFiles;
        resolve('done');
        return res;
      });
  });
};

/**
 * Watch files with Chokidar
 * @desc Chokidar watches on add, change and delete. Ignore paths passed in.
 * https://github.com/paulmillr/chokidar
 */
const watcher = async () => {
  log(chalk.bgHex('#6849E3').white('[Watch Liquid + Assets]'));
  await new Promise((resolve, reject) => {
    const watch = chokidar.watch(`${PATHS.src}`, {
      persistent: true,
      usePolling: true,
      ignored: ignorePaths,
      interval: 1000,
      ignoreInitial: true,
    });
    watch
      .on('add', (filePath) => {
        const output = slash(filePath).split('/src/')[1];
        copyFile(output, slash(filePath));
        log(chalk.bgHex('#51A766').white(`[${output} added]`));
      })
      .on('change', (filePath) => {
        const output = slash(filePath).split('/src/')[1];
        copyFile(output, slash(filePath));
        log(chalk.bgHex('#51A766').white(`[${output} changed]`));
      })
      .on('unlink', (filePath) => {
        const output = slash(filePath).split('/src/')[1];
        unlinkFile(output);
        log(chalk.bgHex('#51A766').white(`[${output} unlinked]`));
      });
    resolve('done');
  });
};

export default async () => {
  await ignoreAssets();
  await watcher();
};
