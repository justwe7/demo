/* 多入口 */
var globby = require('globby');
var fs = require("fs");
var path = require("path");

let fileList = globby.sync(['!{node_modules}/**', './**/*.html'])
let arr = []
fileList.forEach(function(entry) {
  console.log(entry);
  arr.push(entry)
  // basename = path.basename(entry, path.extname(entry));
});
let fd = fs.openSync(path.resolve(__dirname, "./entry.json"), "w");
fs.writeSync(fd, JSON.stringify(arr), 0, "utf-8");
fs.closeSync(fd);


// const pages = ['']

exports.pages = function () {
  var templates = getEntry("./src/htmls/html/*.html");
  let pages = [];
  let json = {};

  for (var pathname in templates) {
    // console.log(pathname);
    
    // 配置生成的html文件，定义路径等
    var conf = {
      multihtmlCatch: true, // 开启多入口缓存
      filename: pathname.split("/")[pathname.split("/").length-1] + ".html",
      template: templates[pathname], // 模板路径
      chunks: [pathname, "vendor", "manifest"], // 每个html引用的js模块
      inject: true // js插入位置
    };
      if (pathname.includes("rate") || pathname.split("/")[1] == 'income') {//rate页面不插入js只复制模板
      conf.chunks = []
    }
    pages.push(new HtmlWebpackPlugin(conf));
    json[pathname] = pathname.split("/").pop() + ".html";
  // writePage(pathname)
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  }

  let fd = fs.openSync(path.resolve(__dirname, "../src/entry.json"), "w");
  fs.writeSync(fd, JSON.stringify(json), 0, "utf-8");
  fs.closeSync(fd);
  return pages;
};

function writePage(entries) {
  let json = {};
  
  json[entries] = entries.split("/").pop() + ".html";
  console.log(json);

  //同步写入文件
  let fd = fs.openSync(path.resolve(__dirname, "../src/entry.json"), "w");
  fs.writeSync(fd, JSON.stringify(json), 0, "utf-8");
  fs.closeSync(fd);
}


function getEntry(globPath) {
  var entries = {},
    basename,
    tmp,
    pathname;

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split("/").splice(-3);
    pathname = tmp.splice(0, 1) + "/" + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  return entries;
}
