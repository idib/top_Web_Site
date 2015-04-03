window.onload = function(){
	Go()
}

var q = 0;

function Go(){
	var name = document.getElementById('menu').getElementsByClassName('selected');
	var a = 0;
	for(i = 0; i < name.length; i++)
	{
		name[i].style.top = i*100 + 30 + "px";
		name[i].style.zIndex = 133*i;
	}

}

function formIn(){
	if(q == 0)
	{
		document.getElementById("logPanel").className = "panel active";
		q++;
	}else{
		document.getElementById("logPanel").className = "panel";
		q--;
	}
	
}

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