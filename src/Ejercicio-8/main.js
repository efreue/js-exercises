var Config = {
	path: "./data/data-",
	id_ElementDom: ["listJson", "containJson","imgJson"]
};
var getUrl = function(id) {
    var url = Config.path + id + ".json"
    return url
};
var getListUrls = function() {
	var listUrls=[];
	var url = "";
	for(i=1; i <= 30; i++) {
		url = "data-" + i + ".json";
		listUrls.push(url);
	}
	return listUrls;
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
var objAjax = function(listUrl, getUrl, idUrlFind, atributeShow, node, getFileDataJS, getStatusHttp, generateHTML, showHTML) {
	this.fileJS = getUrl(idUrlFind);
	this.objs = new XMLHttpRequest();
	this.objs.onload = function() {
		if(this.status == 200) {
			this.dataJS = getFileDataJS(this.responseText);
			if(atributeShow === "files") {
				this.textHTML = generateHTML("files", node, listUrl);
			}
			getStatusHttp(this.status);
			showHTML(Config.id_ElementDom[0],this.textHTML);
		}
		else {
			getStatusHttp(this.status);
		}
	};
	getStatusHttp(this.status);
	this.objs.open("GET", this.fileJS, true);
	this.objs.send();
};
var App = {
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
	getFileDataJS: function(text) {
		var arrDataJson = JSON.parse(text);
		if (arrDataJson.length > 0)
		{
			return arrDataJson;
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
				App.showHTML(nodes[i].id, textStatus);
			}
		}
	},
	generateHTML: function(atributeShow, node, dataJS) {
		var newContent = "";
		if (atributeShow === "files") {
            for (i=0; i < dataJS.length; i++) {
				newContent += '<button class="roundButton"'
				newContent += 'onclick="App.contentLogic('+i+',this)">'
				newContent += dataJS[i]+'</button>';
            }
        }
        return newContent;
	},
	contentLogic: function(idUrlFind, atributeShow, node) {
		var listUrl = getListUrls();
		objAjax(listUrl, getUrl, idUrlFind, atributeShow, node, App.getFileDataJS, App.getStatusHttp, App.generateHTML, App.showHTML);
	},
	init: function() {
		var atributeShow= "files";
		var node = null;
		App.contentLogic("1", atributeShow, node);
	}
};
