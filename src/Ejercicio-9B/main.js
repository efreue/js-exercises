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

    this.addButton = function(fileNames) {
        var source= "{{#each this}}<button type='button' class='roundButton'>{{this}}</button><br>{{/each}}"
        var template= Handlebars.compile(source);
        var output = template(fileNames);
        element.innerHTML += output;
    };
    this.addContentButton = function(dataTeam) {
        var source= "<div class='team'>{{#each this}}{{title}}<br>{{/each}}</div>"
        var template= Handlebars.compile(source);
        var output = template(dataTeam);
        element.innerHTML += output;
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

    showDataItem: function(fileName) {
		Views.dataView.addButton(fileName);

    },

    showTitleAndContent: function(dataItem) {
        Views.titleView.addContentButton(dataItem);
        //alert(dataItem.title);
		//Views.titleView.addButton(dataItem.title);
	}
};

var ContentManager = {
	listData: function() {
		var fileNames = getFileNames();
        var fileName = '';
        Views.showDataItem(fileNames);
        var listBtn = document.querySelectorAll(".roundButton");
        for(var i = 0; i < listBtn.length; i++) {
            listBtn[i].onclick = function() {
                httpRequest(getUrl(this.textContent), function(data) {
                    ContentManager.listTitlesAndContent(data);
                });
            };
        }
	},

    listTitlesAndContent: function(data) {
        Views.titleView.clear();
        Views.showTitleAndContent(data);

    }
};

var App = {
	init: function() {
		Views.createViews();
		ContentManager.listData();
	}
};
