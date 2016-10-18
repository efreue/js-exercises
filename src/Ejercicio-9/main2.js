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

var getUrl = function(fileName) {
	return './data/' + fileName;
};

var getFileNames = function() {
	var listFile = [];
	var file = "";
	for(var i = 1; i <= 30; i++) {
		file = "data-" + i + ".json";
		listFile.push(file);
	}
	return listFile;
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

var View = function(id) {
	var element = document.getElementById(id);

	this.addButton = function(text, callback) {
		var btn = document.createElement("button");
		btn.onclick = callback;
		btn.innerHTML = text;
		Css.add(btn, "roundButton");
		element.appendChild(btn);
	};
	this.addImage = function(src) {
		var img = document.createElement('img');
		img.src = src;
		Css.add(img, "clsImg");
		element.appendChild(img);
	};
	this.clear = function() {
		element.innerHTML = '';
	};
};

var Views = {
	dataView: null,
	titleView: null,
	imageView: null,

	createViews: function() {
		Views.dataView = new View('listJson');
		Views.titleView = new View('containJson');
		Views.imageView = new View('imgJson');
	},

	showDataItem: function(fileName, callback) {
		Views.dataView.addButton(fileName, function() {
			callback(fileName);
		});
	},
	showTitle: function(dataItem, callback) {
		Views.titleView.addButton(dataItem.title, function() {
			callback(dataItem);
		});
	},
	showImage: function(src) {
		Views.imageView.addImage(src);
	}
};

var ContentManager = {
	listData: function() {
		var fileNames = getFileNames();
		for(var i = 0; i < fileNames.length; i++) {
			Views.showDataItem(fileNames[i], function(fileName) {
				httpRequest(getUrl(fileName), function(data) {
					ContentManager.listTitles(data);
				});
			});
		}
	},
	listTitles: function(data) {
		Views.titleView.clear();
		for(var i = 0; i < data.length; i++) {
			Views.showTitle(data[i], ContentManager.showImage);
		}
	},
	showImage: function(dataItem) {
		Views.imageView.clear();
		Views.showImage(dataItem.img);
	}
};

var App = {
	init: function() {
		Views.createViews();
		ContentManager.listData();
	}
};
