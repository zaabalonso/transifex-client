function save(item) {
	var playlistArray = getStoreArray("history");
	if(!contains(playlistArray, item)){
		playlistArray.push(item);
		localStorage.setItem("history", JSON.stringify(playlistArray));
	}
}

function remove(item) {
	var playlistArray = getStoreArray("history");
	if(contains(playlistArray, item)){
		playlistArray.pop(item);
		localStorage.setItem("history", JSON.stringify(playlistArray));
	}
}

function contains(a, obj) {
	  var i = a.length;
	  while (i--) {
		  if (a[i] === obj) {
		  	return true;
		  }
	  }
	return false;
}

function loadPlaylist() {
	var playlistArray = getSavedSongs();
	var ul = document.getElementById("history");
	if (playlistArray != null) {
		for (var i = 0; i < playlistArray.length; i++) {
			var li = document.createElement("li");
			var button = document.createElement("button");
			var removebutton = document.createElement("button");
			
			removebutton.setAttribute('type','button');
			removebutton.setAttribute('value','remove project');
			removebutton.setAttribute('class','delete');
			removebutton.setAttribute("onClick","onClick(\"" + playlistArray[i] + "\")");
			removebutton.innerHTML = 'remove project';

		button.setAttribute('type','button');
			button.setAttribute('value','go to project');
			button.setAttribute('class','goToPath');
			//			button.setAttribute("onclick","onClick(\"" + playlistArray[i] + "\")");
			button.setAttribute("onClick","$(this).MessageBox('" + playlistArray[i] + "')");
			button.innerHTML = 'go to project';
			li.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + playlistArray[i];
			li.appendChild(button);
			li.appendChild(removebutton);

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

