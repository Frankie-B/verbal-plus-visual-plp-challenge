/**
 * Theme commands
 * @desc List of commands used to build, compile, watch, and deploy. Executes webpack
 */

import readline from 'readline';
import read from 'read-yaml';
import chalk from 'chalk';
import webpack from 'webpack';
import path from 'path';
import { ensureDir } from 'fs-extra';
import themeKit from '@shopify/themekit';
import browserSync from 'browser-sync';

import prod from '../webpack.prod';
import dev from '../webpack.dev';

const config = read.sync('config.yml');
const themeID = config.theme.theme_id;
const storeURL = config.theme.store;

const { log } = console;

const prodWebpack= webpack(prod);
const devWebpack = webpack(dev);

const PATHS = {
  output: path.resolve(__dirname, '../../dist'),
};

/**
 * Compile command via Webpack
 * @desc Compiles with production environment for webpack
 * @func Checks for errors or warnings before building.
 * @returns Pass or Fail. On pass - build files are generated.
 */
export const buildWebpack = async () => {
  await new Promise((resolve, reject) => {
    log(chalk.bgHex('#6849E3').white('[Webpack JavaScript + Stylesheets]'));
    prodWebpack.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        reject(err);
        return;
      }

      if (stats.hasErrors()) {
        stats.toJson().errors.forEach((errors) => {
          log(errors);
        })
        log('\n⚠️ ', chalk.bgHex('#E35A49').white('[ERROR: WEBPACK FAILED]\n'))
        reject(err);
        return;
      }
  
      if (stats.hasWarnings()) {
        stats.toJson().warnings.forEach((warning) => {
          log(warning);
        })
        log('\n⚠️ ', chalk.bgHex('#E35A49').white('[WARNING: WEBPACK SUCCEEDED WITH WARNINGS]\n'));
      }

      log('✨', chalk.bgHex('#51A766').white('[Build Complete]'));
      // log(stats.toString({
      //   chunks: false,
      //   cached: false,
      //   children: false,
      //   modules: false,
      //   colors: true,
      // }));
      resolve('done');
      return stats;
    });
  });
};

/**
 * DEV Compile command via Webpack
 * @desc Compiles with production environment for webpack
 * @func Checks for errors or warnings before building.
 * @returns Pass or Fail. On pass - build files are generated.
 */
export const devBuildWebpack = async () => {
  await new Promise((resolve, reject) => {
    log(chalk.bgHex('#6849E3').white('[Webpack JavaScript + Stylesheets]'));
    devWebpack.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        reject(err);
        return;
      }

      if (stats.hasErrors()) {
        stats.toJson().errors.forEach((errors) => {
          log(errors);
        })
        log('\n⚠️ ', chalk.bgHex('#E35A49').white('[ERROR: WEBPACK FAILED]\n'))
        reject(err);
        return;
      }
  
      if (stats.hasWarnings()) {
        stats.toJson().warnings.forEach((warning) => {
          log(warning);
        })
        log('\n⚠️ ', chalk.bgHex('#E35A49').white('[WARNING: WEBPACK SUCCEEDED WITH WARNINGS]\n'));
      }

      log('✨', chalk.bgHex('#51A766').white('[Dev Build Complete]'));
      // log(stats.toString({
      //   chunks: false,
      //   cached: false,
      //   children: false,
      //   modules: false,
      //   colors: true,
      // }));
      resolve('done');
      return stats;
    });
  });
};

/**
 * Watch command via Webpack
 * @desc Watches with development environment for webpack
 * Aggregate timeout, waits for multiple saves before rebuild
 * @func Checks for errors or warnings before building.
 * @returns Pass or Fail. On pass - build files are generated.
 */
export const watchWebpack = async () => {
  await new Promise((resolve, reject) => {
    log(chalk.bgHex('#6849E3').white('[Watch JavaScript + Stylesheets]'));
    devWebpack.watch({
      aggregateTimeout: 1000,
    }, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        reject(err);
        return err;
      }

      if (stats.hasErrors()) {
        stats.toJson().errors.forEach((errors) => {
          log(errors);
        })
        log('\n⚠️ ', chalk.bgHex('#E35A49').white('[ERROR: WEBPACK FAILED]\n'));
        reject(err);
        return;
      }

      if (stats.hasWarnings()) {
        stats.toJson().warnings.forEach((warning) => {
          log(warning);
        })
        log('\n⚠️ ', chalk.bgHex('#E35A49').white('[WARNING: WEBPACK SUCCEEDED WITH WARNINGS]\n'));
      }

      log('✨', chalk.bgHex('#51A766').white('[Webpack Complete]'));
      resolve('done');
      return;
    });
  });
};

/**
 * Ensure dist exists command
 * @desc If no dist folder is found create one
 */
export const makeDir = () => {
  ensureDir(PATHS.output);
};

/**
 * Watch command via Themekit
 * @desc Establish connection with Shopify store via Watch
 * @func Checks for errors or warnings before building.
 * @returns Pass or Fail. On pass - build files are generated.
 */
export const themeKitWatch = () => {
  log('🛍 ', chalk.bgHex('#3AA8B5').white('[Start Themekit Watch]\n'));
  themeKit
    .command('watch', {
      env: 'theme',
      dir: PATHS.output,
      notify: 'theme.update'
    })
    .catch((err) => {
      console.error('Error', err);
    });
};

/**
 * Open command via Themekit
 * @desc Open Shopify Store
 */
export const open = () => {
  themeKit
    .command('open', {
      env: 'theme',
    })
    .catch((err) => {
      console.error('Error', err);
    });
};

/**
 * Deploy command via Themekit
 * @desc Deploys to Shopify Store then opens store
 */
export const deploy = async () => {
  const ask =  (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(
      (resolve) => {
        process.stdout.write('\x07');
        rl.question(query, (ans) => {
          rl.close();
          resolve(ans);
        })
      }
    );
  };

  const answer = await ask(`\n🚢 ${chalk.bgHex('#6849E3').white(`[Press RETURN to deploy to ${themeID} on ${storeURL}]`)}`);

  log('\n🛍 ', chalk.bgHex('#3AA8B5').white('[Start Themekit Deploy]'));
  log('\n⚠️ ', chalk.bgHex('#E35A49').white('[WARNING: STOPPING DEPLOYMENT CAN RESULT IN FILE LOSS]\n'));
  themeKit
    .command('deploy', {
      env: 'theme',
      dir: `${PATHS.output}`,
    })
    .then(() => {
      log('\n🥳', chalk.bgHex('#51A766').white('[Deploy Complete]\n'));
      open();
    })
    .catch((err) => {
      console.error('Error', err);
    });
};

export const startbrowserSync = () => {
  log('🔁', chalk.bgHex('#3AA8B5').white('[Start Browser Sync]\n'));
  browserSync.create().init({
    files: 'theme.update',
    proxy: `https://${storeURL}?preview_theme_id=${themeID}`,
    reloadDelay: 2000,
    middleware: [
      (req, res, next) => {
        // Shopify sites with redirection enabled for custom domains force redirection
        // to that domain. `?_fd=0` prevents that forwarding.
        // ?pb=0 hides the Shopify preview bar
        const prefix = req.url.indexOf('?') > -1 ? '&' : '?';
        const queryStringComponents = ['_fd=0&pb=0'];

        req.url += prefix + queryStringComponents.join('&');
        next();
      }
    ],
    snippetOptions: {
      rule: {
        match: /<head[^>]*>/i,
        fn: (snippet, match) => match + snippet,
      },
    },
  });
};
