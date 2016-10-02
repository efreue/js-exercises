var Config = {
	path: "./data/"
};

var httpRequest = function(url, callback) {
	var ajax = new XMLHttpRequest();
	ajax.onload = function() {
		if(this.status == 200) {
			callback(JSON.parse(ajax.responseText));
		};
	};
	ajax.open("GET", url, true);
	ajax.send();
};

var Css = {
	add: function(node, className) {
    	node.className += " " + className;
	},
	del: function(node, className) {
    	node.className = node.className.replace(className, "");
	},
	contains: function(node, className) {
    	return node.className.search(className) != -1;
	}
};

var App = {
	getListFileNameJson: function(){
		var listFile = [];
		var file = "";
		for(var i=1; i <= 30; i++) {
			file = "data-" + i + ".json";
			listFile.push(file);
		}
		return listFile;
	},
	getUrl: function(path, fileName) {
		return path + fileName;
	},
	getTitleData: function(data) {
		var listTitle = [];
		for(var i = 0; i < data.length; i++) {
			listTitle.push(data[i].title);
		}
		return listTitle;
	},
	createButtonHtml: function(data) {
		var listButtons = [];
		for(i = 0; i < data.length; i++) {
			var element = document.createElement("button");
			var textBtn = document.createTextNode(data[i]);
			Css.add(element,"roundButton");
			element.appendChild(textBtn);
			listButtons.push(element);
		}
		return listButtons;
	},
	showDataInDiv1: function(data) {
		for(i = 0; i < data.length; i++) {
			document.getElementById("listJson").appendChild(data[i]);
		}
	},
   init: function(){
		var listFiles = this.getListFileNameJson();
		var url = App.getUrl(Config.path, listFiles[0]);
		httpRequest(url, function(data) {
			App.showDataInDiv1(
				App.createButtonHtml(App.getTitleData(data)));
		});
	}
};
