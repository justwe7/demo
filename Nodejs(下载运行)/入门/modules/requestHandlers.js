/* 事件处理模块 */

var exec = require("child_process").exec;
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
  console.log("响应事件 输入");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
  /* exec("find /",
    { timeout: 3000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(stdout);
      response.end();
    }); */
}

/**
 *接收post发送的数据
 *
 * @author huaxi.li
 * @date 2019-04-14
 * @param {*} response
 * @param {*} postData
 */
function upload(response, request) {
  console.log("响应事件 'upload' was called.");
  var form = new formidable.IncomingForm();
  form.uploadDir = resolve("../img");
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log(files);
    try{
	    // fs.renameSync(files.upload.path, "tmp/test.png");
      fs.renameSync(files.upload.path, './img/1.jpg');
    }catch(e){
      console.log(e);
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}

function show(response, request) {
  console.log("Request handler 'show' was called.");
  fs.readFile(resolve('../img/1.jpg'), "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}
exports.start = start;
exports.upload = upload;
exports.show = show;