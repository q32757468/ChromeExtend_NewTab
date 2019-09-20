const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

//配置信息
module.exports = merge(common, {
  mode: 'development',
  output: { // 配置输出选项
    filename: '[name].js', // 配置输出的文件名
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    open: true,
  },
})

