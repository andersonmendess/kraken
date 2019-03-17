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
		// white
		document.getElementsByTagName("body")[0].style.setProperty("--background",hex)
		document.getElementsByTagName("body")[0].style.setProperty("--card","white")
		document.getElementsByTagName("body")[0].style.setProperty("--text","black")
	}else if(hex == '#000'){
		// black
		document.getElementsByTagName("body")[0].style.setProperty("--background",hex)
		document.getElementsByTagName("body")[0].style.setProperty("--card","#060606")
		document.getElementsByTagName("body")[0].style.setProperty("--text","white")
	}else{
		document.getElementsByTagName("body")[0].style.setProperty("--background",hex)
		document.getElementsByTagName("body")[0].style.setProperty("--card","#1C1C1C")
		document.getElementsByTagName("body")[0].style.setProperty("--text","#FFF")
	}
}