window.onload = function () {
    Go();
	addEventListener("keyup", function(event) {
		if (event.keyCode == 37)	//←
		{
			clpr(sli_c,true);
		}
	});
}

var depht = 1;
var shift_left = 0;
var sli_p = 0;
var sli_c = 0;
var user_is_admin = false
var sli = [{
	"parent": 0,
	"child": 1
}];
var this_active;

function Go() {
	var elems = document.getElementsByTagName('*');
	for( var elem, i = 0; elem = elems[ i++ ]; ) {
		$(elem).attr('data-sli="1"');
	}
	a = document.getElementsByClassName("box_b");
	for(i = 0; i < a.length; i++)
	{
		$(a[i]).attr("data-id-slider",i + 1);
		if(a[i].className.indexOf("active") > -1)
		{
			this_active = i + 1;
		}
		$(a[i]).find(".like").height($(a[i]).find(".buyers>img").height());
		$(a[i]).find(".like").css("top","0px");
	}
	$("#pool_slider").height($(".box_b.active_b > .buyers > img").height());
	update_shift_left(0);
	updateheg();
}

function like_intercept()
{
	$(".like").onclick(function(){
		
	});
}

function update_shift_left(id){
	shift_left = $('#' + id).width()/2;
	$('#' + id).css("left","calc(50% - "+shift_left +"px)");
}

function update__left(id){
	shift_left = $('#' + id).width()/2;
	$('#' + id).css("left","-"+shift_left +"px");
}

function update__left_left(id){
	shift_left = $('#' + id).width()/2;
	$('#' + id).css("left","-100%");
}


function update__right(id){
	shift_left = $('#' + id).width()/2;
	$('#' + id).css("left","calc(100% - "+shift_left +"px)");
}

function updateheg(){
	$(".box.active").each(function(){
		var a = $(this).parent();
		if($(a).height() < $(this).height())
		{
			$(a).height($(this).height() + 120);
		}
	});
	$(".parent_box>.like").each(function(){
		var a = $(this).parent();
		$(this).height($(a).height() - 60);
	});
}

function prerv(thz){
	var th = $(thz).parent(".parent_box")
	console.log($(th).attr("data-active"));
	if($(th).attr("data-active") == 1)
	{
		console.log($(th).attr("data-active"));
		var a = $(th).find(".box.active")[0];
		var b = $(th).find(".box.hid")[0];
		$(a).attr("data-height",$(a).height());
		$(a).removeClass("active").addClass("hid");
		$(b).removeClass("hid").addClass("active");
		setTimeout(function() { $(th).height($(b).height() + 120);}, 500)
		$(th).attr("data-active",2);
		$(th).find(".psacv").height($(b).height() + 60);
		return 0;
	}
	if($(th).attr("data-active") == 2)
	{
		var a = $(th).find(".box.active")[0];
		var b = $(th).find(".box.hid")[0];
		$(th).height(parseInt($(b).attr("data-height")) + 120);
		setTimeout(function() { 
			console.log($(th).attr("data-active"));
			$(a).removeClass("active").addClass("hid");
			$(b).removeClass("hid").addClass("active");
		}, 500);
		$(th).attr("data-active",1);
		return 0;
	}
}

function btn_go(btn){
	if (this_active < parseInt(btn.id.substr(4)))
	{
		var a = document.getElementById("box_" + this_active.toString());
		a.className = "box_b box_l";
		document.getElementById("box_" + btn.id.substr(4)).className = "box_b active_b";
		document.getElementById("btn_" + this_active.toString()).className = "attitude";
		document.getElementById("btn_" + btn.id.substr(4)).className = "attitude active";
		document.getElementById("pool_slider").style.height = document.getElementById("box_" + btn.id.substr(4)).offsetHeight + "px";
		this_active = parseInt(btn.id.substr(4));
	}
	if (this_active > parseInt(btn.id.substr(4)))
	{
		var a = document.getElementById("box_" + this_active.toString());
		a.className = "box_b box_r";
		document.getElementById("box_" + btn.id.substr(4)).className = "box_b active_b";
		document.getElementById("btn_" + this_active.toString()).className = "attitude";
		document.getElementById("btn_" + btn.id.substr(4)).className = "attitude active";
		document.getElementById("pool_slider").style.height = document.getElementById("box_" + btn.id.substr(4)).offsetHeight + "px";
		this_active = parseInt(btn.id.substr(4));
	}
}


function find_parent(str)
{
	if(sli.length>0)
	{
		for(var i = 0; i < sli.length; i++)
		{
			if(sli[i].child == str)
			{
				return sli[i].parent
			}
		}
	}
	return -1;
}

function find_children(str)
{
	if(sli.length>0)
	{
		for(var i = 0; i < sli.length; i++)
		{
			if(sli[i].parent == str)
			{
				return sli[i].parent
			}
		}
	}
	return -1;
}

function find_children(str,i)
{
	if(sli.length>0)
	{
		for(i; i < sli.length; i++)
		{
			if(sli[i].parent == str)
			{
				return sli[i].parent
			}
		}
	}
	return -1;
}

function clnx(th){
	if(depht > 3)
	{
		return;
	}
	depht++;
	sli_p = $(th).parents(".container").attr("id");
	sli_c = $(th).attr("data-this");
	update__left(sli_p);
	update__left_left(find_parent(sli_p));
	console.log(sli_p);
	$("#" + sli_p + " > .phov").addClass("active").css("height",$(document).height() + $("#" + sli_p).height());
	$('body,html').animate({
        scrollTop: 0
    }, 1000);
	$("#" + sli_p).attr("data-shift",$(th).offset().top);
	$("#" + sli_p).css("top", 100 - $(th).offset().top);
	if($("#" + sli_c)[0])
	{
		update_shift_left(sli_c);
		$("#" + sli_c + " > .hid.sli").removeClass("hid").addClass("active").css("height","100%");
	}else{
		var z = sli_c;
		$("#conter").append('<div id="' + z + '" class="container an_on" style="left: 0%; top:0px;"><div class="phov" onclick="clpr(this)"></div><div class="active sli"></div></div>');
		console.log(z);
		update_shift_left(z);
		console.log(sli.length);
		var qz = sli.length;
		$("#" + z + " > .active.sli").append('<img src="477.gif" class=""/>');
		switch (depht)
		{
			case 2:
				jQuery.ajax({
					url:     "labs/", 
					type:     "GET",
					dataType: "json",
					success: function(labs) {
						$("#" + z + " > .active.sli>img").fadeOut();
						if(user_is_admin)
						{
							qz++;
							sli.push({ 
								"parent":z,
								"child":qz
							});
							$("#" + z + " > .active.sli").append('<div class="row"><div class=" parent_box col-md-6 col-ms-6 col-sx-6 col-md-offset-3 col-ms-offset-3 col-sx-offset-3 text-center" " data-active="1" style="height: 403px;"><div class="box active" onclick="prerv(this)"><img src="31.png" class="plus"></div><div class="box hid"><div class="psacvр1" onclick=""><form class="new_lab fr" id="new_lab" action="/labs" accept-charset="UTF-8" method="post" onclick="re"><input name="utf8" type="hidden" value="?"><input type="hidden" name="authenticity_token" value="IXgYCx9N9ofAa6gRcQkS3gpzlpmo86feWWOqnB6oTAalMklHUunrMFawSTdBUkwWCQBpDEvc4WfTeiP/yGJoKA=="><p>Задание:</p><input type="text" name="lab[task]" id="lab_task"><input type="submit" name="commit" value="Отправить" onclick="lab_f(th)"></form></div></div></div></div>');
						}
						for(i = 0; i < labs.length; i++)
						{
							qz++;
							sli.push({ 
								"parent":z,
								"child":qz
							});
							$("#" + z + " > .active.sli").append('<div class="row" onclick="clnx(this)" data-num="' + labs[i].number + '"><div class=" parent_box col-md-6 col-ms-6 col-sx-6 col-md-offset-3 col-ms-offset-3 col-sx-offset-3 text-center" data-active="1"><div class="box active">' + labs[i].name + '</div></div></div>');
						}
					},
					error: function(response) {
						$("#" + z + " > .active.sli>img").fadeOut();
						$("body").append('<p class="alert alert-danger">Прервана связь с сервером.</p>');
					}
				});
			break;
			case 3:
				jQuery.ajax({
					url:     "labs/"+ $(th).attr('data-num'), 
					type:     "POST",
					dataType: "json", 
					success: function(labs) {
						$("#" + z + " > .active.sli>img").fadeOut();
						if(response.is_ok)
						{
							$("#" + z + " > .active.sli").append('<div class="row"><div class=" parent_box col-md-6 col-ms-6 col-sx-6 col-md-offset-3 col-ms-offset-3 col-sx-offset-3 text-center"  data-active="1"><div class="box active" onclick="prerv(this)"><img src="31.png" class="plus"></div><div class="box hid"><form class="new_site" id="new_site" enctype="multipart/form-data" action="" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="?"><input type="hidden" name="authenticity_token" value="hwhL0MsaPcLixtRj39CUWnVede6pNrfIWLF2mjVnoKMDQhqchr4gdXQdNUXvi8qSdi2Ke0oZ8XHSqP/5462EjQ=="><p>Название сайта</p><input type="text" name="site[name]" id="site_name" value="' + response.site_name + '"><p>Ссылка на сайт</p><input type="text" name="site[link]" id="site_link" value="' + response.site_link + '"><p>Или загрузите статический сайт в виде ZIP архива</p><input type="file" name="site[upload_site]" id="site_upload_site"><p>Загрузите свои скрины:</p><input multiple="multiple" type="file" name="file" data-url="https://api.cloudinary.com/v1_1/doy3kofpg/auto/upload" data-form-data="{&quot;timestamp&quot;:1430513029,&quot;callback&quot;:&quot;https://top-web-site.herokuapp.com/cloudinary_cors.html&quot;,&quot;signature&quot;:&quot;91db2546e6cfaf67a7db79f6aa82463dd7d7ea74&quot;,&quot;api_key&quot;:&quot;554139465466377&quot;}" data-cloudinary-field="screens[]" class="cloudinary-fileupload"><div class="preview"></div><div class="progress_bar" style="background-color: red;height: 20px;width:0;"></div><input type="submit" name="commit" value="Отправить" onclick="rab_f(th)" data-num="' +  $(th).attr('data-num') + '"></form></div></div></div>');
						}else{
							qz++;
							sli.push({ 
								"parent":z,
								"child":qz
							});
							$("#" + z + " > .active.sli").append('<div class="row"><div class=" parent_box col-md-6 col-ms-6 col-sx-6 col-md-offset-3 col-ms-offset-3 col-sx-offset-3 text-center"  data-active="1"><div class="box active" onclick="prerv(this)"><img src="31.png" class="plus"></div><div class="box hid"><form class="new_site" id="new_site" enctype="multipart/form-data" action="" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="?"><input type="hidden" name="authenticity_token" value="hwhL0MsaPcLixtRj39CUWnVede6pNrfIWLF2mjVnoKMDQhqchr4gdXQdNUXvi8qSdi2Ke0oZ8XHSqP/5462EjQ=="><p>Название сайта</p><input type="text" name="site[name]" id="site_name"><p>Ссылка на сайт</p><input type="text" name="site[link]" id="site_link"><p>Или загрузите статический сайт в виде ZIP архива</p><input type="file" name="site[upload_site]" id="site_upload_site"><p>Загрузите свои скрины:</p><input multiple="multiple" type="file" name="file" data-url="https://api.cloudinary.com/v1_1/doy3kofpg/auto/upload" data-form-data="{&quot;timestamp&quot;:1430513029,&quot;callback&quot;:&quot;https://top-web-site.herokuapp.com/cloudinary_cors.html&quot;,&quot;signature&quot;:&quot;91db2546e6cfaf67a7db79f6aa82463dd7d7ea74&quot;,&quot;api_key&quot;:&quot;554139465466377&quot;}" data-cloudinary-field="screens[]" class="cloudinary-fileupload"><div class="preview"></div><div class="progress_bar" style="background-color: red;height: 20px;width:0;"></div><input type="submit" name="commit" value="Отправить" onclick="rab_f(th)" data-num="' +  $(th).attr('data-num') + '"></form></div></div></div>');
							qz++;
							sli.push({ 
								"parent":z,
								"child":qz
							});
							$("#" + z + " > .active.sli").append('<div class="row"  onclick="clnx(this)" data-this="' + qz + '" ></div>');
						}
						for(i = 0; i < labs.length; i++)
						{
							qz++;
							sli.push({ 
								"parent":z,
								"child":qz
							});
							$("#" + z + " > .active.sli").append('<div class="row"  onclick="clnx(this)" data-this="' + qz + '" ><div class=" parent_box col-md-6 col-ms-6 col-sx-6 col-md-offset-3 col-ms-offset-3 col-sx-offset-3 text-center" data-active="1"><div class="box active">' + labs[i].name + '</div></div></div>');
						}
					},
					error: function(response) {
						$("#" + z + " > .active.sli>img").fadeOut();
						$("body").append('<p class="alert alert-danger">Прервана связь с сервером.</p>');
					}
				});
			break;
			case 4:
				jQuery.ajax({
					url:     "labs/"+ $(th).attr('data-num'), 
					type:     "POST",
					dataType: "json", 
					success: function(labs) {
						$("#" + z + " > .active.sli>img").fadeOut();
						for(i = 0; i < labs.length; i++)
						{
							qz++;
							sli.push({ 
								"parent":z,
								"child":qz
							});
							$("#" + z + " > .active.sli").append('<div class="row" onclick="clnx(this)" data-num="' + labs[i].number + '"><div class=" parent_box col-md-6 col-ms-6 col-sx-6 col-md-offset-3 col-ms-offset-3 col-sx-offset-3 text-center" data-active="1"><div class="box active"><img src="'+ labs[i].scr +'" class="pic"/></div><div class="like"><img src="like.png" class="comments"><div class="context"></div></div></div></div><div class="row" onclick="clnx(this)" data-num="' + labs[i].number + '"><div class=" parent_box col-md-6 col-ms-6 col-sx-6 col-md-offset-3 col-ms-offset-3 col-sx-offset-3 text-center" data-active="1"><div class="box active">' + labs[i].name + '</div></div></div><div class="row" onclick="clnx(this)" data-num="' + labs[i].number + '"><div class=" parent_box col-md-6 col-ms-6 col-sx-6 col-md-offset-3 col-ms-offset-3 col-sx-offset-3 text-center" data-active="1"><div class="box active">ссылка<a href="' + labs[i].link + '"></a></div></div></div>');
							
						}
					},
					error: function(response) {
						$("#" + z + " > .active.sli>img").fadeOut();
						$("body").append('<p class="alert alert-danger">Прервана связь с сервером.</p>');
					}
				});
			break;
		}
		setTimeout(function() { updateheg();
		}, 100);
	}
	
}




function clpr(th,mod){
	if(depht > 1)
	{
		depht--;
		sli_c =$(th).parent().attr("id");
		if (mod != undefined)
		{
			sli_c = find_parent(th);
		}
		var fjghlxn = parseInt($("#" + sli_c).css("left"));
		if(isNaN(fjghlxn))
		{
			fjghlxn = 0;
		}
		console.log(fjghlxn);
		
		$('body,html').animate({
			scrollTop: $("#" + sli_c).attr("data-shift")
		}, 700);
		update__left(find_parent(sli_c));
		update_shift_left(sli_c);
		$("#" + sli_c + " > .phov").removeClass("active").css("height",0);
		$("#" + sli_c).css("top",0);
		for(var i = 0; i < sli.length; i++)
		{
			console.log(sli_c);
			if(sli_c == sli[i].parent)
			{
				update__right(sli[i].child);
				$("#" + sli[i].child + " > .active.sli").removeClass("active").addClass("hid").css("height",0).parents(".container ").css("height",0);
			}
		}
	}
}

function clup(){
	if(depht == 4)
	{
		sli_p = find_parent(th);
		for(var i = 0; i < sli.length; i++)
		{
			if(sli_p == sli[i].parent && sli_c > sli[i].child)
			{
				$('#' + sli_c).css("top",-$('#' + sli_c).height());
				setTimeout(function(){
					$('#' + sli_c).removeClass("an_on");
					$('#' + sli_c).css("top","0px");
				}, 600);
				return 0;
			}
		}
	}
}

function AjaxFormRequest() {
	jQuery.ajax({
		url:     "/users/sign_in", 
		type:     "POST",
		dataType: "html",
		data: jQuery("#new_user").serialize(), 
		success: function(response) {
			$("body").append('<p class="alert alert-success ">Вход в систему выполнен.</p>');
		},
		error: function(response) {
			$("body").append('<p class="alert alert-danger">Неверный логин или пароль.</p>');
		}
	});
	jQuery.ajax({
		url:     "/users/whoami", 
		type:     "GET",
		dataType: "json",
		data: jQuery("#new_user").serialize(), 
		success: function(response) {
			user_is_admin = response.is_admin;
		}
	});
}


function lab_f(th){
	jQuery.ajax({
		url:     "/labs", 
		type:     "POST",
		dataType: "html",
		data: jQuery(th).parent().serialize(), 
		success: function(response) {
			$("body").append('<p class="alert alert-success ">Данные отправлены на сервер.</p>');
		},
		error: function(response) {
			$("body").append('<p class="alert alert-danger">Прервана связь с сервером.</p>');
		}
	});
}

function rab_f(th){
	jQuery.ajax({
		url:     "/labs/" + $(th).attr("data-num") + "sites", 
		type:     "POST",
		dataType: "html",
		data: jQuery(th).parent().serialize(), 
		success: function(response) {
			$("body").append('<p class="alert alert-success ">Данные отправлены на сервер.</p>');
			var z = $(th).parents(".row");
			z = $('[data-num="'+z.attr("data-num")++ + ']');
			z.click("clnx(this)");
			z.append('<div class=" parent_box col-md-6 col-ms-6 col-sx-6 col-md-offset-3 col-ms-offset-3 col-sx-offset-3 text-center" data-active="1"><div class="box active">' + $(th).parent().find("#site_name").val()+ '</div></div>');
		},
		error: function(response) {
			$("body").append('<p class="alert alert-danger">Прервана связь с сервером.</p>');
		}
	});
}
