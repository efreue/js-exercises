var Config = {
	path: "./data/"
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

var Button = {
    add: function(nameBtn) {
        var element = document.createElement("button");
        var textBtn = document.createTextNode(nameBtn);
        Css.add(element,"roundButton");
        element.appendChild(textBtn);
        return element;
    },
    selected: function(showInDiv, buttonSel) {
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
    showData: function (parentDiv, element) {
		document.getElementById(parentDiv).appendChild(element);
	},
	clearData: function(parentDiv) {
		var div = document.getElementById(parentDiv);
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
	},
    obtainDataToOtherDiv: function(divOrigin, nameBtnOrigin, divDest) {
        var url = Json.getUrl(Config.path, Div1.getNameBtnSelected());
        ManagerStateHttp.showStatus(divDest);
        httpRequest(url, function(data, nameBtnOrigin) {
            alert(data[0].title);
        })
    }
};

var Div1 = {
    name: "listJson",
    nameBtnSelected: "",
    getNameBtnSelected: function() {
        return Div1.nameBtnSelected;
    },
    setNameBtnSelected: function(btn) {
        Div1.nameBtnSelected = btn;
    },
    addButton: function(nameBtn) {
        return Button.add(nameBtn);
    },
    selectedButton: function(div, nameBtn) {
        Button.selected(div, nameBtn);
        Div1.setNameBtnSelected(nameBtn);
    },
    listButton: function(div, data) {
        for(var i = 0; i< data.length; i++) {
            ManagerDivs.showData(Div1.name, Div1.addButton(data[i]));
        }
    },
    initialize: function() {
        var listFiles = Json.getListFileNameJson();
		var fileJson = listFiles[0];
		ManagerStateHttp.showStatus(Div1.name);
        ManagerDivs.clearData(Div1.name);
        Div1.listButton(Div1.nae, listFiles);
        Div1.selectedButton(Div1.name, fileJson);
        ManagerDivs.obtainDataToOtherDiv(Div1.name, fileJson, "containJson");
    }
};



var App = {
	init: function() {
		Div1.initialize();

	}
};
