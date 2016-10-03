var Config = {
	path: "./data/",
    parentDiv1: "listJson",
    parentDiv2: "containJson",
    parentDiv3: "imgJson"
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

var Json = {
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
	}
};

var Html = {
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
	showDataInDiv: function(parentDiv, data) {
		for(i = 0; i < data.length; i++) {
			document.getElementById(parentDiv).appendChild(data[i]);
		}
	},
    hiddeStatus: function(parentDiv, className) {
        var node = document.getElementById(parentDiv).getElementsByClassName("styleText")[0];
        if(node) {
            if(!Css.contains(node, className)) {
                Css.add(node, className);
            }
        }
    }
};

var App = {
	init: function() {
		var listFiles = Json.getListFileNameJson();
		var url = Json.getUrl(Config.path, listFiles[0]);
		httpRequest(url, function(data) {
			Html.hiddeStatus(Config.parentDiv1,"textHidden");
            Html.showDataInDiv(Config.parentDiv1,
				Html.createButtonHtml(Json.getTitleData(data))
            );
		});
	}
};
