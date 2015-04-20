window.onload = function(){
	Go()
}

var z;
var y;
var q = 0;

function Go(){
	var name = document.getElementById('menu').getElementsByClassName('selected');
	var a = 0;
	for(i = 0; i < name.length; i++)
	{
		name[i].style.top = i*100 + 30 + "px";
		name[i].style.zIndex = 133*i;
	}
	z = document.getElementsByClassName('slid');
	y = 0;
	z[0].className = "slid active";
}

function prev(){
	if(y == 0)
	{
		z[y].className = "slid";
		y = z.length - 1;
		z[y].className = "slid active";
	}else{
		z[y].className = "slid";
		y--;
		z[y].className = "slid active";
	}
}

function next(){
	if(y == z.length - 1)
	{
		z[y].className = "slid";
		y = 0;
		z[y].className = "slid active";
	}else{
		z[y].className = "slid";
		y++;
		z[y].className = "slid active";
	}
}
