/* 获取文件入口 */
var globby = require('globby');
var fs = require("fs");
var path = require("path");

let fileList = globby.sync(['!{node_modules}/**', './**/*.html', '!{home}/**'])

var oPathInfo = {}
fileList.forEach(function(path) {
  var arr = path.split('/');
  if (arr.length > 1) {
    // var keys = []
    var keys = arr.slice(0);
    var lastItem = keys.pop()

    var target = {},filderName
    keys.forEach((filder, index) => {
      if (index == 0) {
        filderName = filder
        target = oPathInfo[filder] || {}
        // console.log(filder, target);
        if (keys.length == 1) {
          target[lastItem] = path
        }
      } else {
          // console.log(target[filder]);
        if (!target[filder]) {
          target[filder] = {}
        }
        if (index === keys.length-1) {
          target[filder][lastItem] = path
        }
    // console.log(target);
        // target = target[filder]
      }
    })
    // target[lastItem] = path
    oPathInfo[filderName] = target
    
  } else {//如果长度是1 就是单文件路径
    oPathInfo[path] = path
  }

});

let fd = fs.openSync(path.resolve(__dirname, "./entry.json"), "w");
fs.writeSync(fd, JSON.stringify(oPathInfo), 0, "utf-8");
fs.closeSync(fd);