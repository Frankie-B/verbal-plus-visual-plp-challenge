/**
 * Dev Deploy node function
 * @desc Build files and deploys to server
 */
import devBuildLiquidAssets from './components/dev-build-liquid-assets';
import { makeDir, devBuildWebpack, deploy } from './components/theme-commands';

makeDir();

(async () => {
  await devBuildLiquidAssets();
  await devBuildWebpack();
  deploy();
})().catch( e => { console.error(e) });
