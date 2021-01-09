const fs = require('fs')

function readFileList(path, filesList) {
    let files = fs.readdirSync(path)
    files.forEach(function (itm, index) {
        let stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {
            let obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }
    })
}
const getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
        let filesList = [];
        readFileList(path, filesList);
        return filesList;
    }
}

module.exports = { getFiles }
