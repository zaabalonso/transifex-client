var lastReportTime = 0;
var glossesArray = new Array();
var resID;


function onClick(yihaaa){
	resID = yihaaa;
	handleButtonClick(yihaaa);
}


function handleRefresh(url) {
	//
	//We are getting data using JSONP
	//
	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src", url);
	newScriptElement.setAttribute("id", "jsonp");
	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0];
	if (oldScriptElement == null) {
		head.appendChild(newScriptElement);
	}
	else {
		head.replaceChild(newScriptElement, oldScriptElement);
	}	
}

function updateStats(stats) {
	var salesDiv = document.getElementById("stats");
	var newData = [];

	for ( var s in stats )
	{
    		var data = stats[s];
    		data.language = s;
    		newData.push(data.language);
    	}

	//the sorting shit
	//
	newData.sort(function(a,b){
		if (parseInt(stats[a].completed,10) < parseInt(stats[b].completed, 10))
	              return -1;
	      	if ( parseInt(stats[a].completed ,10) > parseInt(stats[b].completed,10))
	              return 1;
	      	return 0;
	});


	//getting stat data on the screen dynamicly
	//
	if(!salesDiv.firstChild){
	for (var i = 0; i < newData.length; i++) {
		var glossa = newData[i];
		var stat = stats[glossa];

		var div = document.createElement("div");
		div.setAttribute("id", "progressbar");
		var indicator = document.createElement("label");
		indicator.setAttribute("id","indicator");
		var left = document.createElement("div");
		left.setAttribute("id","left");
		var right = document.createElement("div");
		right.setAttribute("id","right");

		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "name";
		checkbox.value = "value";
		checkbox.id = glossa;

		glossesArray[i]=glossa;
		div.appendChild(left);
		div.appendChild(right);	
		left.appendChild(checkbox);
		left.appendChild(indicator);		
		var zaab = parseInt(stat.completed, 10);
		
		//
		//I dont display every stat.completed value cause the div on values below 35 is below 35px so no space for lang and stats.completed
		//
		if(zaab < 35){
			indicator.innerHTML = glossa;
		}else{
			indicator.innerHTML = glossa + " : " + stat.completed;
			}
	        right.innerHTML= stat.last_update;	
		indicator.style.width = stat.completed;
		
		if (salesDiv.childElementCount == 0) {
			salesDiv.appendChild(div);
		}
		else {
			salesDiv.insertBefore(div, salesDiv.firstChild);
		}

	}
		
	}
	//We need that to suport live stats refresh in the future!
	//
	if (stats.length > 0) {
		lastReportTime = stats[stats.length-1].time;


	}
}

function handleButtonClick(e) {

	//
	//taking data from the transifex server as a json form!
	//
	var splitThem = e.split(".");
	var projectName = splitThem[0];
	var resourceName = splitThem[1];
	if (projectName == "" || resourceName =="") {
		alert("Please enter a project");
	}
	else {
		var url = "https://{{ username }}:{{ password }}@www.transifex.com/api/2/project/" + projectName + "/resource/" + resourceName + "/stats/" +
				"?callback=updateStats" +
				"&random=" + (new Date()).getTime();
		handleRefresh(url);
	}
}

$(document).ready(function() {
	$('#pull').click(function(){
	
	var flag=false;

	for (var k=0; k<glossesArray.length; k++)
	{
		var checkBox = document.getElementById(glossesArray[k]);
		var languaheLink;
		if(checkBox.checked){
			if(flag){
				languaheLink = languaheLink + "-" + glossesArray[k];
			}else{
				languaheLink = glossesArray[k];
				flag=true;
			}
		}
	}
	//alert(languaheLink);
	var superurl = languaheLink + "-" + resID;

		$.ajax({
		type: "POST",
		url: "http://localhost:5000/tx/_pull",
		data: {
			"name": superurl
		},
		success: function(data){
			alert("translations have been downloaded!");
					
	}
 });

});
	$('#push').click(function(){

		var flag=false;

		for (var l=0; l<glossesArray.length; l++){
			var checkBox = document.getElementById(glossesArray[l]);
			var languaheLink;
			if(checkBox.checked){
				if(flag){
					languaheLink =languaheLink + "-" + glossesArray[l];
				}else{
					languaheLink = glossesArray[l];
					flag = true;
				}
			}
		}
		var superurl = languaheLink + "-" + resID;
		$.ajax({
			type: "POST",
			url: "http://localhost:5000/tx/_push",
			data: {
				"locales" : superurl
			},
			success: function(data){
					 alert("translations have been pushed!");
			}
		});
	});
});
