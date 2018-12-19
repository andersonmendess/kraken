window.onload = function() {
	if(localStorage.getItem('accent') != null){
		var color = localStorage.getItem('accent')
		handlerBg(localStorage.getItem('bg'))
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
	var color = $(obj).attr("data-hex");
	localStorage.setItem('bg',color)
	handlerBg(color);

}

function handlerBg(hex){
	if(hex == "#FFF"){
		document.getElementsByTagName("body")[0].style.setProperty("--background",hex)
		document.getElementsByTagName("body")[0].style.setProperty("--card","#ddd")
		document.getElementsByTagName("body")[0].style.setProperty("--text","black")
	}else{
		document.getElementsByTagName("body")[0].style.setProperty("--background",hex)
		document.getElementsByTagName("body")[0].style.setProperty("--card","var(--accent)")
		document.getElementsByTagName("body")[0].style.setProperty("--text","var(--accent)")
	}
}