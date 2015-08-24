/** GLOBAL VARS */
var __tabs = 0;
var __filenum = 0;
const __YIELDKEY = Math.random();
const __ATTRS = {
	href: 'href',
	target: 'href',
};
function __getTabs(){
	let res = '';
	for(let i=0;i<__tabs;i++){
		res += '\t';
	}
	return res;
}
function __none(){
	return;
}
function __anonElem(){
	return new __Complex();
}
function __checkElement(content){
	if(typeof content=='object'){
		if(content.hasOwnProperty('__isElement')){
			return true;
		}
	}
	return false;
}
function __checkPage(content){
	if(typeof content=='object'){
		if(content.hasOwnProperty('__isPage')){
			return true;
		}
	}
	return false;
}
function __checkDir(content){
	if(typeof content=='object'){
		if(content.hasOwnProperty('__isDir')){
			return true;
		}
	}
	return false;
}
function __checkCompilable(content){
	if(typeof content=='object'){
		if(content.hasOwnProperty('__compilable')){
			return true;
		}
	}
	return false;
}

/** CONTENT FILTERS */
var ss__Filters = {
	p_strings: function(c){
		if(typeof c == 'string'){
			return __getTabs() + '<p>' + c + '</p>\n';
		}else {
			return c.__getHTML();
		}
	},
	list: function(c){
		if(typeof c == 'string'){
			return __getTabs() + '<li>' + c + '</li>\n';
		}else {
			let res =  __getTabs() + '<li>\n';
			__tabs++;
			res += c.__getHTML();
			__tabs--;
			res += __getTabs() + '</li>\n';
			return res;
		}
	},
	none: function(c){
		if(typeof c == 'string'){
			return __getTabs() + c + '\n';
		}
		return c.__getHTML();
	}
}

/** TYPES */
class __All {
	constructor(){
		this.__isElement = true;
	}
}
class __Simple extends __All {
	constructor(name, html){
		super();
		this.__contentString = '';
		this.__html = html;
	}
	__has(has){
		this.__contentString = has;
	}
	__hasInit(has){
		this.__contentString = has;
		return this;
	}
	__getHTML(){
		if(typeof this.__contentString != 'string'){
			return '';
		}
		let res = __getTabs()+'<'+this.__html;
		for(let attr in __ATTRS){
			if(__ATTRS.hasOwnProperty(attr) && this.hasOwnProperty(attr)){
				res += ' '+attrs[attr]+'="'+this.attr+'"';
			}
		}
		res += '>';
		return res + this.__contentString + '</' + this.__html + '>\n';
	}
}
class __Complex extends __All {
	constructor(){
		super();
		this.__contentList = [];
		this.__insertpos = 0;
		this.__yf = __none;
		this.contentFilter = ss__Filters.none;
		this.__compilable = true;
	}
	__ins(content){
		if(__checkElement(content)){
			content.__parent = this;
		}
		this.__contentList.splice(this.__insertpos, 0, content);
		this.__insertpos++;
	}
	__add(content){
		if(__checkElement(content)){
			content.__parent = this;
		}
		this.__contentList.push(content);
	}
	__has(has){
		if(typeof has=='string'){
			this.__yf = function(e){
				e.__ins(has);
			}
		}else{
			this.__yf = has;
		}
		this.__insertpos = this.__contentList.length;
	}
	__hasInit(has){
		this.__has(has);
		return this;
	}
	__yield(){
		this.__contentList.push(__YIELDKEY);
	}
	__compile(){
		let c = null;
		let i = 0;
		while(i<this.__contentList.length){
			c = this.__contentList[i];
			if(c == null){
				this.__contentList.splice(i, 1);
				continue;
			}
			if(c == __YIELDKEY){
				this.__contentList.splice(i, 1);
				this.__yf(this);
				continue;
			}
			if(__checkElement(c)){
				if(__checkCompilable(c)) c.__compile();
			}else if(typeof c != 'string'){
				this.__contentList.splice(i, 1); //ERROR: used some other invalid 
				continue;
			}
			i++;
		}
		
	}
	__getHTML(){
		let res = "";
		for(let c of this.__contentList){
			res += this.contentFilter(c);
		}
		return res;
	}
}
class __Contained extends __Complex {
	constructor(html){
		super();
		this.__html = html;
	}
	__getHTML(){
		let res = __getTabs() + '<'+this.__html;
		for(let attr in __ATTRS){
			if(__ATTRS.hasOwnProperty(attr) && this.hasOwnProperty(attr)){
				res += ' '+__ATTRS[attr]+'="'+this[attr]+'"';
			}
		}
		res += '>\n';
		__tabs++;
		for(let c of this.__contentList){
			res += this.contentFilter(c);
		}
		__tabs--;
		res += __getTabs() + '</' + this.__html + '>\n';
		return res;
	}
}
class __Page extends __Complex {
	constructor(){
		super();
		this.__isPage = true;
		this.filename = 'page'+String(__filenum);
		__filenum++;
		this.contentFilter = ss__Filters.p_strings;
	}
	__getHTML(){
		this.__compile();
		let res = '<!DOCTYPE html>\n<html>\n\t<head>\n';
		__tabs = 2;
		res = this.__addHead(res);
		res += '\t</head>\n\t<body>\n';
		
		res = this.__addBody(res);
		res += '\t</body>\n</html>\n';
		return res;
	}
	__addHead(res){
		if(this.hasOwnProperty('title')){
			if(typeof this.title != 'string'){
				
			}else{
				res += __getTabs() + '<title>' + this.title + '</title>\n'
			}
		}
		return res;
	}
	__addBody(res){
		for(let c of this.__contentList){
			res += this.contentFilter(c);
		}
		return res;
	}
}
class __Dir {
	constructor(name){
		this.name = name;
		this.__isDir = true;
		this.__contentList = [];
		this.__yf = __none;
		this.__yield();
		this.__compilable = true;
	}
	__ins(content){
		this.__add(content);
	}
	__add(content){
		if(__checkDir(content) || __checkPage(content)){
			content.__parent = this;
			this.__contentList.push(content);
		}
	}
	__has(has){
		this.__yf = has;
	}
	__hasInit(has){
		this.__has(has);
		return this;
	}
	__yield(){
		this.__contentList.push(__YIELDKEY);
	}
	__compile(){
		let i = 0;
		while(i<this.__contentList.length){
			if(this.__contentList[i] == __YIELDKEY){
				this.__contentList.splice(i, 1);
				this.__yf(this);
				continue;
			}
			i++;
		}
	}
	__get(){
		this.__compile();
		let res = {};
		for(let c of this.__contentList){
			if(__checkDir(c)){
				res[c.name] = c.__get();
			}else{
				
				res[c.filename] = c.__getHTML();
			}
		}
		return res;
	}
}

/* VALUES FOR SCRIPT */
const __ROOT = ss__dir('');
let __e = __ROOT;
const __C = __Complex;
