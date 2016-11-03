var httpRequest = function(url, callback) {
	var ajax = new XMLHttpRequest();
	ajax.onload = function() {
		if(this.status == 200) {
			callback(ajax.responseText);
		}
	};
	ajax.open("GET", url, true);
	ajax.send();
};

var getUrl = function(files, idFind) {
	var url = "";
	for(var i=0; i < files.length; i++) {
		if(i = idFind) {
			url = files[i].url;
		}
	}
	return url;
};

var file = function(nameFile, urlFile){
    this.name = nameFile;
    this.url = urlFile;
};

var getFileNames = function() {
	var listFile = [];
	var fileName = "";
    var fileTitle = "";
    var fileTitle = "";

    for(var i = 1; i <= 30; i++) {
		fileName = "data-" + i + ".json";
        fileTitle = "data " + i
        fileUrl = './data/' + fileName;
        var objFile = new file(fileTitle, getUrl(fileName));
        listFile.push(objFile);
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
        httpRequest('Templates/list-btn.hbs', function(data) {
                    var template= Handlebars.compile(data);
                    var output = template(fileNames);
                    element.innerHTML += output;

                    var listBtn = document.querySelectorAll(".roundButton");
                    for(var i = 0; i < listBtn.length; i++) {
                        var url = fileNames[i].url;
                        listBtn[i].onclick = function(url) {
                            httpRequest(url, function(data) {
                                data = JSON.parse(data);
                                ContentManager.listTitlesAndContent(data);
                            });
                        };
                    }
        });
    },
    this.addContentButton = function(dataTeam) {
        httpRequest('Templates/list-team.hbs', function(data) {
                    var template= Handlebars.compile(data);
                    var output = template(dataTeam);
                    element.innerHTML += output;
        });
    },

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
	},

};

var ContentManager = {
	listData: function() {
		var fileNames = getFileNames();
        Views.showDataItem(fileNames);
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
