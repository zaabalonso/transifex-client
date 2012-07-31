/* playlist.js */

window.onload = init;

function init() {
	var button = document.getElementById("spotButton");
	button.onclick = handleButtonClick;

	loadPlaylist();
}

function handleButtonClick(e) {
	var textInput = document.getElementById("Spot your project files");
	var songName = textInput.value;
	//alert("Adding " + songName);

	if (songName == "") {
		alert("Please spot your project files");
	}
	else {
		//alert("Adding " + songName);
		var li = document.createElement("li");
		li.innerHTML = songName;
		var ul = document.getElementById("history");
		ul.appendChild(li);

		// for Ready Bake
		save(songName);
	}
}


