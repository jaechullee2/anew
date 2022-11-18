// sig_test.js

'use strict';
var http=require('http');
var server=http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('Hello World\n');
}).listen(3000, '0.0.0.0');

console.log('server started');
var signal = {
	'SIGIHT': 2,
	'SIGTERM': 15
};

function shutdown(signal, value) {
	server.colse(function () {
		console.log('server stopped by ' + signal);
		process.exit(128 + value);
	});
}

Object.keys(signal).forEach(function (signal) {
	process.on(signal, function () {
		shutdown(signal, signals[signal]);
	});
});
