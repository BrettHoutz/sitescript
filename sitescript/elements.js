///p
function ss__para(){
	return new __Simple('@p', 'p');
}

///header1
function ss__h1(){
	return new __Simple('@h1', 'h1');
}

///a
function ss__link(href){
	var e = new __Contained('a');
	e.href = href;
	e.__yield();
	return e;
}

///ul
function ss__ulist(){
	var e = new __Contained('ul');
	e.contentFilter = ss__Filters.list;
	e.__yield();
	return e;
}

function ss__page(){
	var e = new __Page();
	e.__yield();
	return e;
}

function ss__index(){
	var e = new __Page();
	e.filename = 'index';
	e.__yield();
	return e;
}

function ss__dir(name){
	var e = new __Dir(name);
	return e;
}
