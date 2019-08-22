/* 获取文件入口 */
var globby = require("globby");
var fs = require("fs");
var path = require("path");

// let fileList = globby.sync([
//   "!{node_modules}/**",
//   "./**/*.html",
//   "!{home}/**",
//   "!{oldDemo}/**",
//   "!{弹性盒模型}/**"
// ]);
let fileList = globby.sync(["!{node_modules}/**", "./**/*.html", "!{home}/**", "!index.html"]);

var oPathInfo = {};
fileList.forEach(function(path) {
  //一轮的遍历肯定会推一个 html文件  目录层级划分需要在 filders 来处理
  var arr = path.split("/");
  if (arr.length > 1) {
    var filders = arr.slice(0);
    var lastItem = filders.pop();
    var target = {},
      level1FilderName;
    filders.forEach((filder, index) => {
      if (index === 0) {
        //如果当前遍历项下标是0，就是顶级的key（根目录） 先预存obj的值，有值引用，无值初始化
        level1FilderName = filder;
        target = oPathInfo[filder] || {};
        // console.log(filder, target);
        if (filders.length === 1) {
          //如果目录层级只有一级说明 它只是暴露在顶层的html文件
          target[lastItem] = path;
        }
      } else {
        if (!target[filder]) {
          // 上一级的闭包内已经存在了 obj的一级引用，应该是有所有的嵌套数据，
          //如果找不到说明obj下的xxx.xxx.xxx这种层级还不存在，所以初始化
          target[filder] = {};
        }
        /* 如果能找到这个目录 ，并且当前遍历项不是最后一项 可以忽略   */
        if (index === filders.length - 1) {
          //如果是最后一项 给当前的层级对象赋值key value
          target[filder][lastItem] = path;
        } else {
          // target = target[filder]
        }
        // target = target[filder]
      }
    });
    // target[lastItem] = path
    oPathInfo[level1FilderName] = target;
  } else {
    //如果长度是1 就是单文件路径
    oPathInfo[path] = path;
  }
});

let fd = fs.openSync(path.resolve(__dirname, "./entry.json"), "w");
fs.writeSync(fd, JSON.stringify(oPathInfo), 0, "utf-8");
fs.closeSync(fd, function(err, res) {
  console.log(err, res);
});
