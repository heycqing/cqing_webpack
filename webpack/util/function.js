let path = require('path')

exports.resolvePathJoin = (dirpath) => {
    // 返回根目录再去拼接路径
    return path.join(__dirname, '..', dirpath)
}   