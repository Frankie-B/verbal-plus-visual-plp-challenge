/**
 * Build node function
 * @desc Build files into dist folder
 */

import buildLiquidAssets from './components/build-liquid-assets';
import { makeDir, buildWebpack } from './components/theme-commands';

makeDir();

(async () => {
  await buildLiquidAssets();
  await buildWebpack();
})().catch( e => { console.error(e) });
