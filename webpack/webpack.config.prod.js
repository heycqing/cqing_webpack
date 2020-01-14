
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpack_dev_config = require('./webpack.config.base')

const miniCssExtractPlugin = require('mini-css-extract-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const imageMinPlugin = require('imagemin-webpack-plugin').default
const cssnano = require('cssnano')

/**
 * 当前是在预生产和生产环境的webpack打包配置
 * 主要是 压缩、去除无用的console、去除注释和优化
 */


module.exports = merge(webpack_dev_config, {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            miniCssExtractPlugin.loader,
            'css-loader',
          ],
        }, 
        {
          test: /\.less$/,
          use: [
            miniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
          ],
        }
      ]
    },
    plugins: [
      new uglifyJsPlugin({
        test: /\.js(\?.*)?$/g,    
        sourceMap: false,
        uglifyOptions:{
          output:{
            comments: false, 
            beautify: false, 
          },
          compress: {
            drop_console: true, 
            collapse_vars: true, 
            reduce_vars:true 
          },
          warnings: false,
        }
      }),
      new optimizeCssPlugin({
        assetNameRegExp: /\.less\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          safe: true,
          autoprefixer: false,
        },
        canPrint: true,
      }),
      new imageMinPlugin({
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      }),
    
      new miniCssExtractPlugin({
        filename: 'css/[name].[hash:7].css',
        chunkFilename: 'css/[id].[hash:7].css',
      }),
      new webpack.optimize.AggressiveSplittingPlugin()
    ]
})
