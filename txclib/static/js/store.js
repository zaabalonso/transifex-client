function save(item) {
	var playlistArray = getStoreArray("history");
	playlistArray.push(item);
	localStorage.setItem("history", JSON.stringify(playlistArray));
}

function loadPlaylist() {
	var playlistArray = getSavedSongs();
	var ul = document.getElementById("history");
	if (playlistArray != null) {
		for (var i = 0; i < playlistArray.length; i++) {
			var li = document.createElement("li");
			var button = document.createElement("button");
			
			button.setAttribute('type','button');
			button.setAttribute('value','go to project');
			button.setAttribute('class','goToPath');
			button.setAttribute("onclick","onClick(\"" + playlistArray[i] + "\")");
			button.innerHTML = 'go to project';
			li.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + playlistArray[i];
			li.appendChild(button);

			ul.appendChild(li);
	
		}
	}
}

function getSavedSongs() {
	return getStoreArray("history");
}

function getStoreArray(key) {
	var playlistArray = localStorage.getItem(key);
	if (playlistArray == null || playlistArray == "") {
		playlistArray = new Array();
	}
	else {
		playlistArray = JSON.parse(playlistArray);
	}
	return playlistArray;
}

