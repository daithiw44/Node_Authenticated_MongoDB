exports.writeRes = function(res,ctype, arg) {
	res.writeHead(200, 'OK', {'content-type': ctype});
		res.write('{"result":' + arg + '}');
		res.end();
}




