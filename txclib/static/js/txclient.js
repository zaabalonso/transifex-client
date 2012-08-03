

var lastReportTime = 0;
var glossesArray = new Array();
var resID;
//window.onload = init;

//function init() {
//	var button = document.querySelectorAll("input.pickMeUp");
//	var counterZ = 
//	resID = button[].name;
//	alert(button[0].id);
//	button.onclick = handleButtonClick;
//	var pickMeUp = document.getElementById("pickMeUp");
//	button.onclick = pickMeHandler;
//}

function onClick(yihaaa){
	resID = yihaaa;
	handleButtonClick(yihaaa);
}

function pushClick(){
	var flag=false;
	
	for (var j=0; j<glossesArray.length; j++)
	{
		var checkBox = document.getElementById(glossesArray[j]);
		var languageLink;

		if(checkBox.checked){
			if(flag){
				languageLink = languageLink + "-" + glossesArray[j];
			}else{
				languageLink = glossesArray[j];
				flag = true;
			}		
		}


	}
	
	var superurl = "http://localhost:5000/tx/_push/" + languageLink + "-" + resID;
	window.open (superurl,"_self",false);
}

function pullClick(){
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
	var superurl = "http://localhost:5000/tx/_pull/" + languaheLink + "-" + resID;
	window.open (superurl,"_self",false);
}



function handleRefresh(url) {
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
    
    /*
for(var k=0; k<newData.length-1; k++)
    {    
	    newData.sort(function(a,b){return stats[newData[k]].completed - stats[newData[k+1]].completed});
    }		

*/
//gia to sorting alla den doulevei!

	for (var i = 0; i < newData.length; i++) {
		var glossa = newData[i];
		var stat = stats[glossa];

		var div = document.createElement("div");
		div.setAttribute("id", "progressbar");
		var indicator = document.createElement("label");
		indicator.setAttribute("id","indicator");
		
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "name";
		checkbox.value = "value";
		checkbox.id = glossa;

		glossesArray[i]=glossa;

		div.appendChild(checkbox);
		div.appendChild(indicator);
				
		var zaab = parseInt(stat.completed, 10);
			//console.log(zaab);

		if(zaab < 35){
			indicator.innerHTML = glossa;
		}else{
			indicator.innerHTML = glossa + " : " + stat.completed;
			} 
		indicator.style.width = stat.completed;
		//indicator.innerHTML = glossa + " : " + stat.completed;
		
		if (salesDiv.childElementCount == 0) {
			salesDiv.appendChild(div);
		}
		else {
			salesDiv.insertBefore(div, salesDiv.firstChild);
		}

	}
			//alert(zaab);

	if (stats.length > 0) {
		lastReportTime = stats[stats.length-1].time;


	}
}

function handleButtonClick(e) {
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
