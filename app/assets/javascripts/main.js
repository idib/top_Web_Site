"use strict";
var labs = {data: []};
var sites = {data: []};
var user = {status:"unauthorized", hasntSite: false, showForm: false};
$.get("/users/whoami").done(function (data) {
	user.status = data.status;
});

var router;

var redirectMain = function () {
	router.setRoute("/");
};

var serverError = function () {
	swal({title: "Прервана связь с сервером", type: "error",  timer: 1200,   showConfirmButton: false});
}

var setHttp = function (link) {
    if (link.search(/^http[s]?\:\/\//) == -1) {
        link = 'http://' + link;
    }
    return link;
}

var like = function (el, site_id) {
	$.post("/sites/like/"+site_id);
	el = $(el);
	var classname = "like ";
	var value = el.parent().find(".like-value");
	
	if(el.hasClass("pressed")){
		value.html(+value.html()-1);
	}else {
		classname += "pressed";
		value.html(+value.html()+1);
	}
	$(el).attr('class',classname);
}

var openLabForm = function () {
	$('#add-lab-btn').animate({ width: 'hide' },500, 
		function(){ 
			$('#lab-form').animate({ width: 'show' },500)
		});
}
var closeLabForm = function () {
	$('#lab-form').animate({ width: 'hide' },500, 
		function(){
			$('#add-lab-btn').animate({ width: 'show' },500)
		});
}
var openSiteForm = function () {
	$('#add-site-btn').animate({ width: 'hide' },500, 
		function(){ 
			$('#site-form').animate({ width: 'show' },500)
		});
}
var closeSiteForm = function () {
	$('#site-form').animate({ width: 'hide' },500, 
		function(){
			$('#add-site-btn').animate({ width: 'show' },500);
			user.showForm = user.hasntSite;
		});
}

var openAddLabForm = function () {
	$('#lab-form form').attr('action','/labs');
	$('#lab-form #lab_task').val("");
	$('#lab-form [name="_method"]').val("post");
	openLabForm();
}
var openEditLabForm = function (labId, labTask) {
	$('#lab-form #new_lab').attr('action','/labs/' + labId);
	$('#lab-form #lab_task').val(labTask);
	$('#lab-form [name="_method"]').val("put");
	$("html, body").animate({ scrollTop: $('#lab-list').offset().top-30 }, 1000);
	openLabForm();
}
var openAddSiteForm = function (labId) {
	$('#site-form form').attr('action','/labs/' + labId + "/sites");
	$('#site-form #site_name').val("");
	$('#site-form #site_link').val("");
	$('#site-form #site_upload_site').wrap('<form>').closest('form').get(0).reset();
	$('#site-form #site_upload_site').unwrap();
	$('#site-form [name="screens[]"]').remove();
	$('#site-form .preview').html("");
	$('#site-form [name="_method"]').val("post");
	openSiteForm();
}
var openEditSiteForm = function (labId, site) {
	$('#site-form form').attr('action','/labs/' + labId + "/sites/"+site.id);
	$('#site-form #site_name').val(site.name);
	$('#site-form #site_link').val(site.link);
	$('#site-form #static-delete').attr("data-site-id", site.id);
	$('#site-form #full-delete').attr("data-site-id", site.id);
	$('#site-form #site_upload_site').wrap('<form>').closest('form').get(0).reset();
	$('#site-form #site_upload_site').unwrap();
	$('#site-form [name="screens[]"]').remove();
	$('#site-form .preview').html("");
	var screensCopy = []
	for (var i = 0; i < site.screens.length; i++) {
			screensCopy.push(site.screens[i]);
	}
	if(site.first_screen)
		screensCopy.unshift(site.first_screen);
	$.each(screensCopy, function (idx, screen) {
		var img = $("<img/>");
		img.attr("src", screen.bad);
		var delBtn = $('<div class="delete-screen">X</div>');
		delBtn.attr("data-screen-url", screen.id);
		delBtn.attr("data-site-id", site.id);
		$('#site-form .preview').append(
			$("<div/>").append(img, delBtn)
		);	
	});
	$('#site-form [name="_method"]').val("put");
	user.showForm = true;
	openSiteForm();
}



//switch from active slide to load-screen, wait for ajax load and switch to slideId
var ajaxSlideTo = function (deferred, slideId, cb){
	var active = $('.active-list');
	var switchSlide = $(slideId);
	var loadScreen = $("#load-screen");
	if(active.is(switchSlide)){
		deferred.done(cb)
	}else {
		var direction = -3000;//move to left
		if(active.is($("#site-list"))){//site-list goes away to right
			direction = 3000; //move to right
		}
		active.animate({"margin-left": ""+ direction},500).hide(0,
			function () {
				loadScreen
				.show(0,
					function () {
						deferred.done(
							function (data) {
								cb(data);
								loadScreen
								.hide(0,
									function () {
										switchSlide
										.animate({"margin-left": ""+ -direction}, 0)
										.show(0)
										.animate({"margin-left": "0"},500, function () {
											active.removeClass("active-list");
											switchSlide.addClass("active-list");
										});
									});
							});
						
					});
			});
	}
	deferred.fail(serverError);
};

rivets.formatters.labLink = function(labId) {
	return '/#/'+labId;
}
rivets.formatters.likeClickHandler = function(siteId) {
	return "like(this," + siteId + ")";
}
rivets.formatters.editLabHandler = function(lab) {
	return "openEditLabForm("+lab.id + ",'" + lab.task + "')";
}
rivets.formatters.addSiteHandler = function(labId) {
	return "openAddSiteForm(" + labId + ")";
}
rivets.formatters.editSiteHandler = function(siteIndex, labId) {
	return "openEditSiteForm(" + labId + ",sites.data[" + siteIndex + "])";
}
rivets.formatters.siteUrl = function(site) {
	var url = site.link || site.hosted;
	if(url){
		url = setHttp(url);
	}else {
		url = "javascript:void(0)";	
	} 
	return url;
}
rivets.formatters.likeCssClass = function(userLikedSite) {
	var classname = "like ";
	if(userLikedSite){
		classname += "pressed";
	}
	return classname;
}
rivets.formatters.isAuthorized = function(userStatus) {
	return userStatus != "unauthorized" ;
}
rivets.formatters.isAdmin = function(userStatus) {
	return userStatus == "admin" ;
}

var routes = {
	'/': function () {
		closeSiteForm();
		ajaxSlideTo($.get("/labs"), "#lab-list", 
			function (data) {
				labs.data = data;
			});
	},
	'/table': function () {
		ajaxSlideTo($.get("/labs/table"), "#table-view", 
			function (data) {
				$("#table-view .result-table").html(data);
				var dynatable = $('#site-table').dynatable({
					features: {
						paginate: false,
						recordCount: false,
						search: false
					},
					inputs: { 
						queries: $('#search-lab, #search-group')
					}
				}).data('dynatable');
			});
	},
	'/:lab_id': function (labId) {
		labId = +labId;
		if(isNaN(labId)){
			redirectMain();
			return;
		}
		ajaxSlideTo($.get("/labs/" + labId), "#site-list",
			function (data) {
				sites.labId = labId;
				sites.data = data.sites;
				user.showForm = user.hasntSite = data.user_hasnt_site;
			});
	}
};

router = Router(routes);

$(function (){
	//csrf protection
	$.ajaxSetup({
		headers: {
			'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
		}
	});

	$('.cloudinary-fileupload').bind('fileuploadprogress', function(e, data) { 
		$('.progress_bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%'); 
		$('.progress_bar').text(Math.round((data.loaded * 100.0) / data.total) + '%'); 
	});

	$('.preview').on("click", ".delete-screen", function () {
		var el = $(this);
		var screen_url = el.attr('data-screen-url');
		var siteId = el.attr('data-site-id');
		$.ajax({ method: "DELETE",
			url: "/sites/"+ siteId+ "/delete_screen",
			data: { screen_url: screen_url}});
		el.parent().remove();
	});

	$('#static-delete').click(function (e) {
		e.preventDefault();
		var el = $(this);
		var siteId = el.attr('data-site-id');
		$.ajax({ method: "DELETE",
			url: "/sites/"+ siteId+ "/delete_static"})
		.done(function () {
			swal({title: "Сайт удалён с хостинга", type: "success",  timer: 1200,   showConfirmButton: false});
		});
		el.remove();
	});

	$('#full-delete').click(function () {
		if(confirm("Вы уверены?")){
			var el = $(this);
			var siteId = el.attr('data-site-id');
			$.ajax({ method: "DELETE",
				url:  "/labs/" + sites.labId + "/sites/" + siteId})
			.done(function () {
				swal({title: "Сайт полностью удалён", type: "success",  timer: 1200,   showConfirmButton: false});
				document.location.reload();
			});
			el.remove();
		}
	});

	$("#lab-list").animate({"margin-left": "3000"}, 0).hide(0);
	$("#site-list").animate({"margin-left": "3000"}, 0).hide(0);
	$("#load-screen").hide(0);
	$(".active-list").animate({"margin-left": "0"},0).show(0);
	router.init("/").configure({notfound: redirectMain});

	rivets.bind($('#pages'), 
		{user: user,
			labs: labs,
			sites: sites});
});