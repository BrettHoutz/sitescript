var babel = require('babel-core');
var vm = require('vm');
var fs = require('fs');
var recursive = require('recursive-readdir');

var site = null;

module.exports = function(dir, callback){
	var sandbox = {};
	var tp = fs.readFileSync('./sitescript/engine.js');
	tp += fs.readFileSync('./sitescript/elements.js');
	tp += fs.readFileSync('./sitescript/aliases.js');
	recursive(dir, function(err, files){
		if(err) throw err;
		var ss = files.filter(function(f){
			return f.substr(-7) == ".es6.js"
		}).sort(function(a, b){
			var al = a.split('/');
			var bl = b.split('/');
			var r = al.length - bl.length;
			if(r !== 0) return r;
			if(al[al.length -1] == "index.es6.js") return -1;
			if(bl[bl.length -1] == "index.es6.js") return 1;
			return a > b ? -1 : 1;

		});
		for(var i=0;i<ss.length;i++){
			tp += babel.transformFileSync(ss[i]).code;
		}
		tp += "var RESULT = __ROOT.__get();";
		vm.runInNewContext(tp, sandbox);
		site = sandbox.RESULT;
		callback({
			get: function(name, args){
				var page = site;
				var struct = name.split('/');
				for(var i=0;i<struct.length;i++){
					page = page[struct[i] || "index"]
				}
				if(!page) return "";
				if(typeof page != "string") page = page.index;
				return page;
			}
		});
	});
};
