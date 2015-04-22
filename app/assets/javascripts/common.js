$(function () {
	var menu_items = document.getElementById('menu').getElementsByClassName('selected');
	var a = 0;
	for(i = 0; i < menu_items.length; i++)
	{
		menu_items[i].style.top = i*80 + 30 + "px";
		menu_items[i].style.zIndex = 133*i;
	}
});
var panel_visible = false;

function formIn(){
	if(panel_visible)
	{
		document.getElementById("logPanel").className = "panel";
		panel_visible=false;
	}else{
		document.getElementById("logPanel").className = "panel active";
		panel_visible=true;
	}
}