var Config = {
	path: "./data/",
    parentDiv1: "listJson",
    parentDiv2: "containJson",
    parentDiv3: "imgJson"
};

var Json = {
    getListFileNameJson: function() {
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
    obtaingData: function(url) {
		httpRequest(url, function(data) {
			return data;
		});
	}
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

var Html = {
	createButton: function(showInDiv, data) {
		var listButtons = [];
		for(i = 0; i < data.length; i++) {
			var element = document.createElement("button");
            var textBtn = "";
            if (showInDiv === "div1") {
                textBtn = document.createTextNode(data[i]);
            }
            else if (showInDiv === "div2") {
                textBtn = document.createTextNode(data[i].title);
            }
            Css.add(element,"roundButton");
            element.appendChild(textBtn);
            listButtons.push(element);
		}
		return listButtons;
	},
    selectedButton: function(showInDiv, buttonSel) {
		var className = "Buttonselected";
		var listbuttons = document.getElementById(showInDiv).getElementsByClassName("roundButton");
		var lastButtonSel = document.getElementById(showInDiv).getElementsByClassName(className)[0];
		if (lastButtonSel && Css.contains(lastButtonSel, className)) {
			Css.del(lastButtonSel,className);
		}
		for(i=0; i < listbuttons.length; i++) {
			if(listbuttons[i].textContent === buttonSel) {
				Css.add(listbuttons[i],className);
			}
		}
	}
};

var ManagerDivs = {
    showData: function (parentDiv, listElement) {
		for(i = 0; i < listElement.length; i++) {
			document.getElementById(parentDiv).appendChild(listElement[i]);
		}
	},
	clearData: function(parentDiv) {
		var div = document.getElementById(parentDiv);
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
	}
};

var Div2 = {
    name: "containJson",
    initialize: function(elementSelected) {
        var url = Json.getUrl(Config.path, elementSelected);
		ManagerStateHttp.showStatus(Div2.name);
        httpRequest(url, function(data, elementSelected) {
            ManagerDivs.clearData(Div2.name);
            ManagerDivs.showData(Div2.name, Html.createButton("div2", data));
            Html.selectedButton(Div2.name, data[0].title);
        })
    }
};


var Div1 = {
    name: "listJson",
    initialize: function() {
        var listFiles = Json.getListFileNameJson();
		var fileJson = listFiles[0];
		ManagerStateHttp.showStatus(Div1.name);
        ManagerDivs.clearData(Div1.name);
        ManagerDivs.showData(Div1.name, Html.createButton("div1", listFiles));
        Html.selectedButton(Div1.name, fileJson);
        Div2.initialize(fileJson);
    }
};



var App = {
	init: function() {
		Div1.initialize();

	}
};
