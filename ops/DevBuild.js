/**
 * Dev Build node function
 * @desc Build files into dist folder
 */

import devBuildLiquidAssets from './components/dev-build-liquid-assets';
import { makeDir, devBuildWebpack } from './components/theme-commands';
import chalk from 'chalk';

const { log } = console;

makeDir();

(async () => {
  await devBuildLiquidAssets();
  await devBuildWebpack();
})().catch( e => { console.error(e) });