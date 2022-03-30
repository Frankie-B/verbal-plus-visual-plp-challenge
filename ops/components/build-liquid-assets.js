import { removeSync, copy, outputFileSync } from 'fs-extra';
import path from 'path';
import { readFileSync } from 'fs';
import glob from 'glob';
import chalk from 'chalk';
import { minify } from 'html-minifier';

const { log } = console;

log('🏗 ', chalk.bgHex('#3AA8B5').white('[Start Build]\n'));

// Add files to this array that you don't want to minify
const UNMINIFIED_LIQUID_FILES = [
  "src/sections/product-list-filters.liquid",
  "src/sections/swatches.liquid",
]

/**
  @desc Define input and output paths
*/
const PATHS = {
  src: path.resolve(__dirname, '../../src'),
  output: path.resolve(__dirname, '../../dist'),
};

/**
  @desc Clear current dist directory
*/
log(chalk.bgHex('#6849E3').white('[Clear Distribution]'));
removeSync(path.resolve(__dirname, '../../dist'));

/**
  @desc Synchronously pipe all required files
*/
log(chalk.bgHex('#6849E3').white('[Rebuild Distribution]'));

/**
  @desc Minify liquid with html-minifier
*/

const minifyLiquid = (file) => {
  const content = readFileSync(file, 'utf8');
  if (UNMINIFIED_LIQUID_FILES.find(fileName => file.includes(fileName))) {
    return content
  } else {
    const output = minify(content, {
      collapseWhitespace: true,
      decodeEntities: true,
      minifyJS: true,
      removeComments: true,
      removeRedundantAttributes: true,
      ignoreCustomFragments: [/{%(.*?)%}/g, /{{(.*?)}}/g],
    });
    return output;
  }
};

const fetchFiles = (extension, callback) => {
  glob(`${PATHS.src}/**/*.${extension}`,
    callback);
};

const minifyFlattenLiquidFiles = async () => {
  log(chalk.bgHex('#6849E3').white('[Minify + Flatten Liquid]'));
  await new Promise((resolve, reject) => {
    fetchFiles('liquid', (err, res) => {
      const files = res;
      files.forEach((file) => {
        const minifiedFile = minifyLiquid(file);
        const splitPath = file.split('/src/')[1].split('/');
        const splitPathRev = file.split('/src/')[1].split('/').reverse();
        let flattenedPath = `${splitPath[0]}/${splitPathRev[0]}`
        if (file.includes('/customers/')) {
          flattenedPath = `${splitPath[0]}/customers/${splitPathRev[0]}`;
        }
        const output = `${PATHS.output}/${flattenedPath}`;
        outputFileSync(output, minifiedFile, (error) => {
          if (error) {
            reject(error);
            log(error)
            throw error;
          }
        });
      });
    });
    resolve('done');
  });
};

/**
  @desc Flatten all assets files
*/

const assets = (callback) => {
  glob(`${PATHS.src}/assets/**/*`, { ignore: [`${PATHS.src}/assets/{scripts,styles}`, `${PATHS.src}/assets/{scripts,styles}/**/*`] },
    callback);
};

const flattenAssets = async () => {
  log(chalk.bgHex('#6849E3').white('[Flatten Assets]'));
  await new Promise((resolve, reject) => {
    assets((err, res) => {
      const assetFiles = res;
      assetFiles.forEach((dir) => {
        const output = dir.split('/').reverse()[0];
        const hasExtension = output.indexOf('.') >= 0;
        if (hasExtension) {
          copy(`${dir}`, `${PATHS.output}/assets/${output}`);
        }
      });
    });
    resolve('done');
  });
};

/**
  @desc Copying config and locales
*/

const copyJSONFiles = async () => {
  log(chalk.bgHex('#6849E3').white('[Copy Config + Locales]'));
  await new Promise((resolve, reject) => {
    fetchFiles('json', (err, res) => {
      const files = res;
      files.forEach((file) => {
        const output = `${PATHS.output}/${file.split('/src/')[1]}`;
        copy(file, output);
      });
    });
    resolve('done');
  });
};

export default async () => {
  await minifyFlattenLiquidFiles();
  await flattenAssets();
  await copyJSONFiles();
};
