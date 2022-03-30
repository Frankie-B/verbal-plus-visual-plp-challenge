/**
 * Watch node function
 * @desc Imports and executes functions required for watching theme
 */

import watchLiquidAssets from './components/watch-liquid-assets';
import { makeDir, watchWebpack, themeKitWatch, startbrowserSync } from './components/theme-commands';
import chalk from 'chalk';

const { log } = console;

makeDir();

(async () => {
  await watchLiquidAssets();
  await watchWebpack();
  themeKitWatch();
  startbrowserSync();
})().catch( e => { console.error(e) });