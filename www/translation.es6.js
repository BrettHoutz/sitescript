//PLACEHOLDER - Sample sitescript translation

var bool = false;

__e.__ins(ss__index().__hasInit(__e=>{
	__e.title = 'My Page';
	__e.__ins(ss__h1().__hasInit('Title'));
	__e.__ins("Paragraph one");
	var p7 = "Paragraph seven.";
	__e.__ins("Paragraph two");
	__e.__ins(getAString());
	__e.__ins(customContent().__hasInit(__e=>{
		__e.__ins("Paragraph five");
		__e.__ins("Paragraph six");
	}));
	__e.__ins(ss__ul().__hasInit(__e=>{
		__e.__ins("List item one.");
		__e.__ins("List item two.");
	}));
	__e.__ins(p7);
	var list2 = ss__ul();
	if(bool) __e.__ins("Will this show up?");
	__e.__ins(list2);
	if(bool) __e.__ins("Will this?");
	__e.__ins(ss__ul().__hasInit(__e=>{
		__e.__ins("List item four.");
		bool = true;
	}));
	if(bool) __e.__ins("What about this?");
	__e.__ins(list2.__has(__e=>{
		__e.__ins("List item three.");
	}));
	__e.__ins(ss__ul().__hasInit('List item five.'));
	__e.__ins(ss__link('http://tumblr.com').__hasInit(__e=>{
		__e.__ins(ss__para().__hasInit('link para 1'));
		__e.__ins(ss__p().__hasInit('link para 2'));
	}));
}));

__e.__ins(ss__dir('subdir').__hasInit(__e=>{
	__e.__ins(ss__index().__hasInit('page'));
	__e.__ins(ss__page('second').__hasInit('page2'));
	
}));

function getAString(){
	return 'Paragraph three';
}

function falseContent(){let __f=()=>{let __e=new __C();
	__e.__add("Don't show this!");
	return;
return __e;};return __f();}

function customContent(){let __f=()=>{let __e=new __C();
	__e.contentFilter = ss__Filters.p_strings;
	__e.__add("Paragraph four");
	__e.__yield();
return __e;};return __f();}
