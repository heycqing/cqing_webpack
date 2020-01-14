
const webpack = require('webpack');
const util = require('./util/function')

const htmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const friendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports =  {
  entry: {
    app: util.resolvePathJoin('../src/static/app.js'),
  },
  output: {
    path: util.resolvePathJoin('../dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/chunks/[name].js',
    publicPath: '/public/',
    library: 'dll_library'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [util.resolvePathJoin('src')]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: ('image/[name].[hash:7].[ext]')
          }
        },
        {
          loader: 'image-webpack-loader',
        }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: ('fonts/[name].[hash:7].[ext]')
        }
      },
    
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new friendlyErrorsPlugin(),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/page/index.html'
    }),
  ]
}
