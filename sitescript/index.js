var babel = require('babel-core');
var vm = require('vm');
var fs = require('fs');

module.exports = {
	build: function(dir){
		var sandbox = {};
		var tp = fs.readFileSync('./sitescript/engine.js');
		tp += fs.readFileSync('./sitescript/elements.js');
		tp += fs.readFileSync('./sitescript/aliases.js');
		tp += babel.transformFileSync('./sitescript/translation.es6.js').code;
		tp += "var RESULT = __ROOT.__get();";
		vm.runInNewContext(tp, sandbox);
		return sandbox.RESULT;
	},
	get: function(name, args){
		
	}
}
