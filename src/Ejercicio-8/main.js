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
	getListTitleData: function(data) {
		var listTitle = [];
		for(var i = 0; i < data.length; i++) {
			listTitle.push(data[i].title);
		}
		return listTitle;
	},
	getFirstTitleData: function(data) {
		var firstTitle = [];
		var i = 0;
		firstTitle.push(data[i].title);
		return firstTitle;
	},
	getTitleData: function(data, titleFind) {
		var titleData = [];
		for(var i = 0; i < data.length; i++) {
			if(titleData[i].textContent === titleFind)
				titleData.push(data[i].title);
		}
		return titleData;
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
	selectedButton: function(parentDiv, buttonSel) {
		var className = "Buttonselected";
		var listbuttons = document.getElementById(parentDiv).getElementsByClassName("roundButton");
		var lastButtonSel = document.getElementById(parentDiv).getElementsByClassName(className)[0];
		if (lastButtonSel && Css.contains(lastButtonSel, className)) {
			Css.del(lastButtonSel,className);
		}
		for(i=0; i < listbuttons.length; i++) {
			if(listbuttons[i].textContent === buttonSel) {
				Css.add(listbuttons[i],className);
			}
		}
	}/*,
	addOnClick: function(parentDiv) {
		var listButtons = [];
		if (parentDiv === Config.parentDiv1 || parentDiv === Config.parentDiv2)
			listButtons = document.getElementById(parentDiv).getElementsByClassName("roundButton");
		for (i = 0; i < listButtons.length; i++) {
			listButtons[i].onclick = function(this) {
				Div.obtaingData(parentDiv, this);
			}
		}
	}*/
};

var ManagerStateHttp = {
	showStatus: function(parentDiv) {
		var element = document.getElementById(parentDiv);
		var child = document.createElement("p");
		var txt = document.createTextNode("Loading...");
		child.id = "l1";
		child.className = "styleText";
		child.appendChild(txt);
		element.appendChild(child);
	}
};

var Div = {
	showData: function (parentDiv, data) {
		for(i = 0; i < data.length; i++) {
			document.getElementById(parentDiv).appendChild(data[i]);
		}
	},
	clearData: function(parentDiv) {
		var div = document.getElementById(parentDiv);
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
	},
	managerData: function(elementSelected, data) {
		Div.clearData(Config.parentDiv1);
		Div.showData(Config.parentDiv1,	Html.createButtonHtml(data));
		Html.selectedButton(Config.parentDiv1, elementSelected[0]);
		//Html.addOnClick(Config.parentDiv1);
	},
	obtaingData: function(parentDiv, elementSelected) {
		var listFiles = Json.getListFileNameJson();
		var fileJson = listFiles[0];
		if (elementSelected != null)
			fileJson = elementSelected;
		var url = Json.getUrl(Config.path, fileJson);
		ManagerStateHttp.showStatus(Config.parentDiv1);
		httpRequest(url, function(data) {
			if (elementSelected != null) {
				Div.managerData(Json.getTitleData(data, elementSelected), Json.getListTitleData(data));
			} else {
				Div.managerData(Json.getFirstTitleData(data), Json.getListTitleData(data));
			}
		});
	}
};

var App = {
	init: function() {
		Div.obtaingData(Config.parentDiv1,null);
	}
};
