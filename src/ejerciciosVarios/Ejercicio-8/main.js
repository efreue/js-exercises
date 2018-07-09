var Config = {
	path: "./data/",
	div1: "listJson",
	div2: "containJson",
	div3: "imgJson",
	initial: 0
};

var httpRequest = function(url, callback) {
	var ajax = new XMLHttpRequest();
	ajax.onload = function() {
		if(this.status == 200) {
			callback(JSON.parse(ajax.responseText));
		}
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

var ManagerData = {
	dataFile: null,
	getListFileName: function() {
		var listFile = [];
		var file = "";
		for(var i = 1; i <= 30; i++) {
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
	setData: function(data) {
		ManagerData.dataFile = data;
	},
	getImgData: function(btnTitleSel) {
		var dataImg = [];
		for (var i = 0; i < ManagerData.dataFile.length; i++) {
			if (btnTitleSel === ManagerData.dataFile[i].title) {
				dataImg.push(ManagerData.dataFile[i].img);
				dataImg.push(ManagerData.dataFile[i].dest);
			}
		}
		return dataImg;
	}
};

var Button = {
	selected: function(showInDiv, buttonSel) {
		var className = "Buttonselected";
		var listbuttons = document.getElementById(showInDiv).getElementsByClassName("roundButton");
		var lastButtonSel = document.getElementById(showInDiv).getElementsByClassName(className)[0];
		if (lastButtonSel && Css.contains(lastButtonSel, className)) {
			Css.del(lastButtonSel, className);
		}
		for(var i = 0; i < listbuttons.length; i++) {
			if(listbuttons[i].textContent === buttonSel) {
				Css.add(listbuttons[i], className);
			}
		}
	},
	add: function(div, nameBtn) {
		var btn = document.createElement("button");
		var textBtn = document.createTextNode(nameBtn);
		Css.add(btn, "roundButton");
		btn.onclick = function() {
			Button.selected(div, nameBtn);
			if(div === Config.div1) {
				httpRequest(ManagerData.getUrl(Config.path, nameBtn), function(data, nameBtnOrigin) {
					ManagerData.setData(data);
					ManagerContainer.clearData(Config.div2);
					ManagerContainer.clearData(Config.div3);
					ManagerContainer.listButton(Config.div2, ManagerData.getTitleData(data));
					if(Config.initial == 0) {
						Button.add(Config.div2, ManagerData.dataFile[0].title).onclick();
					}
					Config.initial = 1;
				});
			}
			if(div === Config.div2) {
				ManagerContainer.clearData(Config.div3);
				ManagerContainer.showData(Config.div3, Image.add(Config.div3, nameBtn));
			}
		};
		btn.appendChild(textBtn);
		return btn;
	}
};

var Image = {
	add: function(div, nameBtnSelected) {
		var data = ManagerData.getImgData(nameBtnSelected);
		var element = document.createElement("img");
		element.setAttribute('src', data[0]);
		element.onclick = function() {
			//window.location.href = data[1];
			window.open(data[1]);
		};
		Css.add(element, "clsImg");
		return element;
	}
};

var ManagerContainer = {
	showData: function(parentDiv, element) {
		document.getElementById(parentDiv).appendChild(element);
	},
	clearData: function(parentDiv) {
		var div = document.getElementById(parentDiv);
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
	},
	listButton: function(div, data) {
		for(var i = 0; i < data.length; i++) {
			ManagerContainer.showData(div, Button.add(div, data[i]));
		}
	}
};

var App = {
	init: function() {
		var listFiles = ManagerData.getListFileName();
		ManagerStateHttp.showStatus(Config.div1);
		ManagerContainer.clearData(Config.div1);
		ManagerContainer.listButton(Config.div1, listFiles);
		Button.selected(Config.div1, listFiles[0]);
		Button.add(Config.div1, listFiles[0]).onclick();
	}
};
