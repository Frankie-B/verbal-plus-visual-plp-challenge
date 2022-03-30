import TerserJSPlugin from 'terser-webpack-plugin';
import merge from 'webpack-merge';
import common from './webpack.common';

export default merge(common, {
  mode: 'development',
  devtool: 'none',
  optimization: {
    minimize: false,
    minimizer: [
      new TerserJSPlugin({
        test: /\.(js|js.liquid)?$/,
      }),
    ],
  },
});
