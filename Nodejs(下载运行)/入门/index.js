// var http = require("http");
var server = require("./modules/server");
var router = require("./modules/route");
var requestHandlers = require("./modules/requestHandlers");
var handle = {
  "/": requestHandlers.start,
  "/start": requestHandlers.start,
  "/upload": requestHandlers.upload,
  "/show": requestHandlers.show
}

server.start(router.route, handle);