const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {

  mode: 'production',

  output: { // 配置输出选项
    filename: '[name].js', // 配置输出的文件名
  },

  // 压缩js与css
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
  ],
});

