
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpack_base_config = require('./webpack.config.base')

const ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

/**
 * 当前是运行本地开发的webpack配置
 * 当前任务是为webpack配置本地开发的服务
 */

module.exports = merge(webpack_base_config ,{
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader',
                ],
              },
              {
                test: /\.less$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'less-loader',
                ],
              }
        ]
    },
    devServer: {
        publicPath: '/public/',
        compress: true,
        port: 9000,
        open: true,
        openPage: 'public/',
        inline: true,
    },
    plugins:[
        new ModuleConcatPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
 })
