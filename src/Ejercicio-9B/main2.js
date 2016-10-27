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
	return './data/' + fileName.textContent;
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
    addOnclickItem: function(fileName, callback) {
        fileName.onclick = callback;
    }
};

var ContentManager = {
	listData: function() {
		var fileNames = getFileNames();
        var source= "{{#each this}}<button type='button' class='roundButton'>{{this}}</button><br>{{/each}}"
        var template= Handlebars.compile(source);
        var output = template(fileNames);
        document.getElementById("listJson").innerHTML += output;
        var listBtn = document.querySelectorAll(".roundButton");
        for(var i = 0; i < listBtn.length; i++) {
            Views.addOnclickItem(listBtn[i], function(fileName) {
				httpRequest(getUrl(fileName), function(data) {
					ContentManager.listTitles(data);
				});
			});
		}
	},
    listTitles: function(data) {
		Views.titleView.clear();
		alert(data.length);
	}
};

var App = {
	init: function() {
		Views.createViews();
		ContentManager.listData();
	}
};
