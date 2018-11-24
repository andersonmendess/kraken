window.onload = function() {
	if(localStorage.getItem('accent') != null){
		var color = localStorage.getItem('accent')
		document.getElementsByTagName("body")[0].style.setProperty("--accent",color)
		$("meta[name='theme-color']").attr("content", color);
		$("meta[name='msapplication-TileColor']").attr("content", color);
	}
};

function setColor(obj) {
   var color = $(obj).attr("data-hex");
   localStorage.setItem('accent',color)
   document.getElementsByTagName("body")[0].style.setProperty("--accent",color)
	$("meta[name='theme-color']").attr("content", color);
	$("meta[name='msapplication-TileColor']").attr("content", color);

 }

function setBg(obj) {

}
