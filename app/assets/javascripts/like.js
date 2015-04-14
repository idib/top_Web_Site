function like (el, site_id) {
	$.post("/sites/like/"+site_id);
	el = $(el);
	var classname = "like ";
	var counter = el.parent().parent().find(".like-counter");
	
	if(el.hasClass("pressed")){
		counter.html(+counter.html()-1);
	}else {
		classname += "pressed";
		window.eee=$(el);
		counter.html(+counter.html()+1);
	}
	$(el).attr('class',classname);
}