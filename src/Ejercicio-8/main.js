var Config = {
	path: "./data/data-"
};
var Url = function() {
	this.id="",
	this.name= "",
	this.path= ""
};
var Css = {
	add: function(node, className) {
    	node.className += " " + className
	},
	del: function(node, className) {
    	node.className = node.className.replace(className, "")
	},
	contains: function(node, className) {
    	return node.className.search(className) != -1
	}
};
var objAjax = function(fileJS, getFileDataJS, getStatusHttp) {
	this.objs = new XMLHttpRequest();
	this.objs.onload = function() {
		if(this.status == 200) {
			getFileDataJS(this.responseText);
		}
		getStatusHttp(this.status);
	};
	getStatusHttp(this.status);
	this.objs.open("GET", fileJS, true);
	this.objs.send();
};
var App = {
	getInformationServer: function() {
		var listUrls=[];
		var objData = new Url();
		for(var i=1; i <= 30; i++) {
			objData.id= i
			objData.name= "data-" + i
			objData.path= Config.path + i + ".json"
			listUrls.push(objData)
		}
		return listUrls;
	},
	showHTML: function(idElement, txtHtml) {
		document.getElementById(idElement).innerHTML = txtHtml;
	},
	hiddeStatus: function(status, node) {
		if (status === 200) {
			if(!Css.contains(node, "textHidden")) {
				Css.add(node, "textHidden");
			}
		}
		else {
			if(Css.contains(node, "textHidden")) {
				Css.del(node, "textHidden");
			}
		}
	},
	getStatusHttp: function(statusRequest) {
		var nodes = document.body.getElementsByClassName("styleText");
        var textStatus = "Loading...";
		if (statusRequest != 200) {
			if (statusRequest != 0) {
				textStatus = "Error loading page";
			}
		}
		if (nodes.length > 0) {
			for(var i=0; i < nodes.length; i++) {
          		App.hiddeStatus(statusRequest, nodes[i]);
				App.showHTML(nodes[i].parentNode.id, textStatus);
			}
        }
    },
	getFileDataJS: function(text) {
		var arrDataJson = JSON.parse(text);
		if (arrDataJson.length > 0)
		{
			console.log(arrDataJson["0"].title);
		}

	},
	init: function() {
		var urls = App.getInformationServer();
		objAjax(urls["0"].path, App.getFileDataJS, App.getStatusHttp);
	}
};
