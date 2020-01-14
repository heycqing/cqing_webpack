const webpack = require('webpack');
const util = require('./util/function')

// 注意，必须要先编译Dll并生成manifest.json后再编译业务代码；
// 而以后每次修改Dll并重新编译后，也要重新编译一下业务代码。

module.exports = {
    entry: {
      dll: ['react', 'classname']
    },
    plugins:[
        new webpack.DllPlugin({
            path: util.resolvePathJoin('../build/dll.manifest.json'),
            name: 'dll_library',
            context: util.resolvePathJoin('../build')
          }),
          new webpack.DllReferencePlugin({
            context: util.resolvePathJoin('../build'),
            manifest: require('../build/dll.manifest.json'), // 指定manifest.json
            name: 'dll_library',
          }),
    ]
}