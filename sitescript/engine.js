/** GLOBAL VARS */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var __tabs = 0;
var __filenum = 0;
var __YIELDKEY = Math.random();
var __ATTRS = {
	href: 'href',
	target: 'href'
};
function __getTabs() {
	var res = '';
	for (var i = 0; i < __tabs; i++) {
		res += '\t';
	}
	return res;
}
function __none() {
	return;
}
function __anonElem() {
	return new __Complex();
}
function __checkElement(content) {
	if (typeof content == 'object') {
		if (content.hasOwnProperty('__isElement')) {
			return true;
		}
	}
	return false;
}
function __checkPage(content) {
	if (typeof content == 'object') {
		if (content.hasOwnProperty('__isPage')) {
			return true;
		}
	}
	return false;
}
function __checkDir(content) {
	if (typeof content == 'object') {
		if (content.hasOwnProperty('__isDir')) {
			return true;
		}
	}
	return false;
}
function __checkCompilable(content) {
	if (typeof content == 'object') {
		if (content.hasOwnProperty('__compilable')) {
			return true;
		}
	}
	return false;
}

/** CONTENT FILTERS */
var ss__Filters = {
	p_strings: function p_strings(c) {
		if (typeof c == 'string') {
			return __getTabs() + '<p>' + c + '</p>\n';
		} else {
			return c.__getHTML();
		}
	},
	list: function list(c) {
		if (typeof c == 'string') {
			return __getTabs() + '<li>' + c + '</li>\n';
		} else {
			var res = __getTabs() + '<li>\n';
			__tabs++;
			res += c.__getHTML();
			__tabs--;
			res += __getTabs() + '</li>\n';
			return res;
		}
	},
	none: function none(c) {
		if (typeof c == 'string') {
			return __getTabs() + c + '\n';
		}
		return c.__getHTML();
	}
};

/** TYPES */

var __All = function __All() {
	_classCallCheck(this, __All);

	this.__isElement = true;
};

var __Simple = (function (_All) {
	_inherits(__Simple, _All);

	function __Simple(name, html) {
		_classCallCheck(this, __Simple);

		_get(Object.getPrototypeOf(__Simple.prototype), 'constructor', this).call(this);
		this.__contentString = '';
		this.__html = html;
	}

	_createClass(__Simple, [{
		key: '__has',
		value: function __has(has) {
			this.__contentString = has;
		}
	}, {
		key: '__hasInit',
		value: function __hasInit(has) {
			this.__contentString = has;
			return this;
		}
	}, {
		key: '__getHTML',
		value: function __getHTML() {
			if (typeof this.__contentString != 'string') {
				return '';
			}
			var res = __getTabs() + '<' + this.__html;
			for (var attr in __ATTRS) {
				if (__ATTRS.hasOwnProperty(attr) && this.hasOwnProperty(attr)) {
					res += ' ' + attrs[attr] + '="' + this.attr + '"';
				}
			}
			res += '>';
			return res + this.__contentString + '</' + this.__html + '>\n';
		}
	}]);

	return __Simple;
})(__All);

var __Complex = (function (_All2) {
	_inherits(__Complex, _All2);

	function __Complex() {
		_classCallCheck(this, __Complex);

		_get(Object.getPrototypeOf(__Complex.prototype), 'constructor', this).call(this);
		this.__contentList = [];
		this.__insertpos = 0;
		this.__yf = __none;
		this.contentFilter = ss__Filters.none;
		this.__compilable = true;
	}

	_createClass(__Complex, [{
		key: '__ins',
		value: function __ins(content) {
			if (__checkElement(content)) {
				content.__parent = this;
			}
			this.__contentList.splice(this.__insertpos, 0, content);
			this.__insertpos++;
		}
	}, {
		key: '__add',
		value: function __add(content) {
			if (__checkElement(content)) {
				content.__parent = this;
			}
			this.__contentList.push(content);
		}
	}, {
		key: '__has',
		value: function __has(has) {
			if (typeof has == 'string') {
				this.__yf = function (e) {
					e.__ins(has);
				};
			} else {
				this.__yf = has;
			}
			this.__insertpos = this.__contentList.length;
		}
	}, {
		key: '__hasInit',
		value: function __hasInit(has) {
			this.__has(has);
			return this;
		}
	}, {
		key: '__yield',
		value: function __yield() {
			this.__contentList.push(__YIELDKEY);
		}
	}, {
		key: '__compile',
		value: function __compile() {
			var c = null;
			var i = 0;
			while (i < this.__contentList.length) {
				c = this.__contentList[i];
				if (c == null) {
					this.__contentList.splice(i, 1);
					continue;
				}
				if (c == __YIELDKEY) {
					this.__contentList.splice(i, 1);
					this.__yf(this);
					continue;
				}
				if (__checkElement(c)) {
					if (__checkCompilable(c)) c.__compile();
				} else if (typeof c != 'string') {
					this.__contentList.splice(i, 1); //ERROR: used some other invalid
					continue;
				}
				i++;
			}
		}
	}, {
		key: '__getHTML',
		value: function __getHTML() {
			var res = "";
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.__contentList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var c = _step.value;

					res += this.contentFilter(c);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return res;
		}
	}]);

	return __Complex;
})(__All);

var __Contained = (function (_Complex) {
	_inherits(__Contained, _Complex);

	function __Contained(html) {
		_classCallCheck(this, __Contained);

		_get(Object.getPrototypeOf(__Contained.prototype), 'constructor', this).call(this);
		this.__html = html;
	}

	_createClass(__Contained, [{
		key: '__getHTML',
		value: function __getHTML() {
			var res = __getTabs() + '<' + this.__html;
			for (var attr in __ATTRS) {
				if (__ATTRS.hasOwnProperty(attr) && this.hasOwnProperty(attr)) {
					res += ' ' + __ATTRS[attr] + '="' + this[attr] + '"';
				}
			}
			res += '>\n';
			__tabs++;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.__contentList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var c = _step2.value;

					res += this.contentFilter(c);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			__tabs--;
			res += __getTabs() + '</' + this.__html + '>\n';
			return res;
		}
	}]);

	return __Contained;
})(__Complex);

var __Page = (function (_Complex2) {
	_inherits(__Page, _Complex2);

	function __Page() {
		_classCallCheck(this, __Page);

		_get(Object.getPrototypeOf(__Page.prototype), 'constructor', this).call(this);
		this.__isPage = true;
		this.filename = 'page' + String(__filenum);
		__filenum++;
		this.contentFilter = ss__Filters.p_strings;
	}

	_createClass(__Page, [{
		key: '__getHTML',
		value: function __getHTML() {
			this.__compile();
			var res = '<!DOCTYPE html>\n<html>\n\t<head>\n';
			__tabs = 2;
			res = this.__addHead(res);
			res += '\t</head>\n\t<body>\n';

			res = this.__addBody(res);
			res += '\t</body>\n</html>\n';
			return res;
		}
	}, {
		key: '__addHead',
		value: function __addHead(res) {
			if (this.hasOwnProperty('title')) {
				if (typeof this.title != 'string') {} else {
					res += __getTabs() + '<title>' + this.title + '</title>\n';
				}
			}
			return res;
		}
	}, {
		key: '__addBody',
		value: function __addBody(res) {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.__contentList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var c = _step3.value;

					res += this.contentFilter(c);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3['return']) {
						_iterator3['return']();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return res;
		}
	}]);

	return __Page;
})(__Complex);

var __Dir = (function () {
	function __Dir(name) {
		_classCallCheck(this, __Dir);

		this.name = name;
		this.__isDir = true;
		this.__contentList = [];
		this.__yf = __none;
		this.__yield();
		this.__compilable = true;
	}

	/* VALUES FOR SCRIPT */

	_createClass(__Dir, [{
		key: '__ins',
		value: function __ins(content) {
			this.__add(content);
		}
	}, {
		key: '__add',
		value: function __add(content) {
			if (__checkDir(content) || __checkPage(content)) {
				content.__parent = this;
				this.__contentList.push(content);
			}
		}
	}, {
		key: '__has',
		value: function __has(has) {
			this.__yf = has;
		}
	}, {
		key: '__hasInit',
		value: function __hasInit(has) {
			this.__has(has);
			return this;
		}
	}, {
		key: '__yield',
		value: function __yield() {
			this.__contentList.push(__YIELDKEY);
		}
	}, {
		key: '__compile',
		value: function __compile() {
			var i = 0;
			while (i < this.__contentList.length) {
				if (this.__contentList[i] == __YIELDKEY) {
					this.__contentList.splice(i, 1);
					this.__yf(this);
					continue;
				}
				i++;
			}
		}
	}, {
		key: '__get',
		value: function __get() {
			this.__compile();
			var res = {};
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = this.__contentList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var c = _step4.value;

					if (__checkDir(c)) {
						res[c.name] = c.__get();
					} else {

						res[c.filename] = c.__getHTML();
					}
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4['return']) {
						_iterator4['return']();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			return res;
		}
	}]);

	return __Dir;
})();

var __ROOT = ss__dir('');
var __e = __ROOT;
var __C = __Complex;