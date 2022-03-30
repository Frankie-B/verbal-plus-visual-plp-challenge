import TerserJSPlugin from 'terser-webpack-plugin';
import merge from 'webpack-merge';
import common from './webpack.common';

export default merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        test: /\.(js|js.liquid)?$/,
      }),
    ],
  },
});
