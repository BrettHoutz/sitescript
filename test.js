var ss = require("./sitescript");
var express = require('express');

var app = express();

ss("./www/", function(site){
	app.get('/*', function (req, res){
		res.send(site.get(req.url.substring(1)));
	});

	var server = app.listen(3000, function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log('App listening at http://%s:%s', host, port);
	});
});