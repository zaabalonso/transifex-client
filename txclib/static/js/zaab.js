window.onload = init;

function init() {
	//var button = document.getElementById("spotButton");
	//button.onclick = handleButtonClick;
	loadPlaylist();
}
		

function onClick(restoredpath){

	remove(restoredpath);
	document.location.reload(true);
}

$(document).ready(function() {
	$('#spotButton').click(function(){
		var filepathz = document.getElementById("filepathz");
		var path = filepathz.value;
		if (path == ""){
			alert("give a filepath!");
		}else{
			path = path.replace(/\//g,'-');	

			$.ajax({
			type: "POST",
			url: "http://localhost:5000/tx/pathpicker/",
			data: {
				"name": path
			},
			success: function(data){
				if(data=="success"){
					var superpath = path.replace(/\//g,"-");
					save(superpath);
					window.open("http://localhost:5000/tx/changepathpage/" + superpath,"_self",false);
				}else if(data=="failed"){
					alert ("no such path");
				}
			}
			});
		}		
	});
	(function($) {
	     $.fn.MessageBox = function(msg) {
		return this.each(function(){
			$.ajax({
				type:"POST",
				url: "http://localhost:5000/tx/pathpicker/",
				data: {
					"name": msg
				},
				success: function(data){
						if(data=="success"){
							var superpath = msg.replace(/\//g,"-");
						 	window.open("http://localhost:5000/tx/changepathpage/" + superpath,"_self",false);
					 }else if(data=="failed"){
						 alert ("no such path");
					 }
					 
				}

			});
		
		})
	};
	 })(jQuery); 


});



