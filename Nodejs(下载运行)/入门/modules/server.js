var http = require("http");
var url = require("url");

/**
 * server响应
 *
 * @author huaxi.li
 * @date 2019-04-14
 * @param {*} req 服务端接收
 * @param {*} res 服务端发送
 * 
 *{ protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?a=1',
  query: 'a=1',
  pathname: '/abc',
  path: '/abc?a=1',
  href: '/abc?a=1' }
 * 
 */


const server = (route, handle) => {
  function onReq(req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname === '/favicon.ico') {
      return;
    }

    console.log("Request for " + pathname + " received.");
    // route(handle, pathname, res, req);
    res.write('正正');
    res.end();

    /* res.writeHead(200, {"Content-Type": "text/plain"})
    res.write(content)
    res.end() */
  }
  http.createServer(onReq).listen(7878)
} 

exports.start = server;