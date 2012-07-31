var ACTIONS={
  push:{
    url: '/_push',
    text: 'Pushed'
  },
  pull:{
    url: '/_pull',
    text: 'Pulled'
  },
  rename:{
    url: '/_rename',
    text: 'Renamed'
  },
  modify_expr:{
    url: '/_modify_expr',
    text: 'Modified'
  }
}

var lastReportTime = 0;
var glossesArray = new Array();
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
//	alert(yihaaa);
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
	
	var superurl = "http://localhost:5000/tx/_push/" + languageLink;
	window.open (superurl,"_self",false);
}

function handleRefresh(url) {
	console.log("here");
	
	
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
	//alert(projectName + " fucks " + resourceName);
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


$(function() {

  /* AJAX for pull */
  $('.actions a').click(function(ev){
    var $this = $(this);
    var action = $(this).attr('data-action');
    $.ajax({
      url: SCRIPT_ROOT + ACTIONS[action].url,
      data: {
        resource: $this.attr('data-id')
      },
      beforeSend: function(){
        $this.hide();
        var $status = $this.next();
        $status.text("Working");
        $status.addClass("i16 loading");
        $status.show();  
      },
      success: function(data) {
        var $status = $this.next();
        $status.removeClass("loading");
        if (data.result == "OK") {
          $this.remove();
          $status.text(ACTIONS[action].text);
          $status.removeClass("i16 loading");
          $status.addClass('action_ok');
          $status.show();
        }
      },
      error: function(request, options, error) {
        var $status = $this.next();
        $this.remove();
        $status.removeClass("i16 loading");
        $status.addClass("ajax_error");
        $status.text("Error");
        $status.attr('title', request.status + ': ' + error);
      }
    });
    ev.preventDefault();
  });

  /* Highlight rows */
  $("input.rowcheckbox").click(function() { 
    $(this).parent().parent().toggleClass('highlight');
  });

  /* AJAX: Modify resource */
  $('.resname.edit').editable(ACTIONS["rename"].url, {
    id: 'elementid',
    style: 'display: inline',
    tooltip: 'Click to edit...',
    callback: function(value, settings) {
      /* Refresh the whole row with new resource IDs */
      location.reload();
    }
  }, {  });

  /* AJAX: Modify resource expression */
  $('.resexpr.edit').editable(function(value, settings) {
    var $this = $(this);

    $.ajax({
      type : "POST",
      cache : false,
      url: ACTIONS["modify_expr"].url,
      dataType: 'json',
      data: { 'res_id': $this.attr('data-id'),
              'value': value },
      success: function(data) {
        location.reload();
      }
    }); /* /ajax */

    return value.replace('<lang>', '<span class="lang">&lt;lang&gt;</span>');
  }, {
    style: 'display: inline',
    tooltip: 'Click to edit...',
    data: function(value, settings) {
      return value.replace('<span class="lang">&lt;lang&gt;</span>', '<lang>');
    },
  });
});

