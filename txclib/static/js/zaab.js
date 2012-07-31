window.onload = init;

function init() {
	var button = document.getElementById("spotButton");
	button.onclick = handleButtonClick;
		
	loadPlaylist();

}
function handleButtonClick(e) {
	var filepathz = document.getElementById("filepathz");

	var path = filepathz.value;

	if (path == "") {
		alert("give a filepath!");
	}else{
		
		
		var li = document.createElement("li");
		
		li.innerHTML = "Project path :" + path;
		var ul = document.getElementById("history");
		ul.appendChild(li);
		
		save(path);

		
		path = path.replace(/\//g,'-');
		var url = "http://localhost:5000/tx/checkme/" + path;
		window.open (url,'_self',false);


	}
}

function onClick(restoredpath){
	pathHandler(restoredpath);
	//alert(restoredpath);
}

function pathHandler(superpath){
	superpath = superpath.replace(/\//g,"-");
	var superurl = "http://localhost:5000/tx/pathpicker/" + superpath;
	window.open (superurl,"_self",false);

}


