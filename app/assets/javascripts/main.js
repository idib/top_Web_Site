
var z;
var y;
var q = 0;
$(function (){
	z = document.getElementsByClassName('slid');
	y = 0;
	z[0].className = "slid active";
});


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
