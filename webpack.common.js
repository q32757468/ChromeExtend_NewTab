const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');

//读取chrome插件的配置文件，配合插件将其打包输出
let manifestData = fs.readFileSync('./src/manifest.json');
// 注意得到的结果一定要使用toString方法转化为字符串，不然就会是特定的二进制文件，然后还需要通过JSON.parse()方法对其再进行转换，否则输出的json文件会带有转义字符
let manifestObj = JSON.parse(manifestData.toString());

//配置信息
module.exports = {

  entry: {// 项目入口文件
    index: './src/index.js',
    popup: './src/popup.js',
    background: './src/background.js'
  },
  output: { // 配置输出选项
    path: path.resolve(__dirname, 'dist'), // 配置输出的路径
    // filename: '[name].js', // 分别配置dev与prod
  },

  module: {
    noParse: [/jquery/, /react\.min\.js$/],  //当webpack打包时忽略这些文件，因为没有采用模块化开发，同时建议通过cdn的方式来引入非模块化的文件
    rules: [ // 匹配规则

      //匹配图片
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: ['url-loader?outputPath=assets/images&limit=8192&name=[contenthash].[ext]&fallback=file-loader']
      },

      //匹配字体
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: ['file-loader?outputPath=fonts']
      },
      //json
      {
        test: /\.(json)$/,
        use: ['json-loader?outputPath=./']
      },

      // 抽离css并压缩
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'fast-css-loader']
      },

      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'fast-css-loader', 'fast-sass-loader']
      },

    ],
  },

  // 通过externals可以检索外部依赖，而不需要本地依赖也能通过 import引用。
  externals: {
    echarts: 'echarts',
  },

  //抽出第三方库文件
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [

    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),//圆文件路径
      filename: 'index.html',//自动生成的HTML文件的名称
      chunks: ['index', 'vendors'],
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/popup.html'),//圆文件路径
      filename: 'popup.html',//自动生成的HTML文件的名称
      chunks: ['popup', 'vendors'],
    }),

    // 抽离css
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css'
    }),
    //打包出json文件
    new GenerateJsonPlugin('manifest.json', manifestObj),

  ],

}

