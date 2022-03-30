/**
 * Deploy node function
 * @desc Build files and deploys to server
 */

import buildLiquidAssets from './components/build-liquid-assets';
import { makeDir, buildWebpack, deploy } from './components/theme-commands';

makeDir();

(async () => {
  await buildLiquidAssets();
  await buildWebpack();
  deploy();
})().catch( e => { console.error(e) });
