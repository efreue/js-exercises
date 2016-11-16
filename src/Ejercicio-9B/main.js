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

var file = function(nameFile, urlFile) {
    this.name = nameFile;
    this.url = urlFile;
};

var getUrl = function(listFiles, titleFile) {
    for(var i = 0; i < listFiles.length; i++) {
        if(listFiles[i].name == titleFile.toLowerCase()) {
            return listFiles[i].url;
        }
    }
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
        var objFile = new file(fileTitle, fileUrl);
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

var selectedButton = function(showInDiv, buttonSel) {
    var className = "Buttonselected";
    var listbuttons = document.getElementById(showInDiv).getElementsByClassName("roundButton");
    var lastButtonSel = document.getElementById(showInDiv).getElementsByClassName(className)[0];
    if (lastButtonSel && Css.contains(lastButtonSel, className)) {
        Css.del(lastButtonSel, className);
    }
    for(var i = 0; i < listbuttons.length; i++) {
        if(listbuttons[i].textContent === buttonSel.innerHTML) {
            Css.add(listbuttons[i], className);
        }
    }
};


var View = function(id) {
	var element = document.getElementById(id);

    this.addButton = function(fileNames) {
        httpRequest('Templates/list-btn.hbs', function(data) {
            var template = Handlebars.compile(data);
            var output = template(fileNames);
            element.innerHTML += output;

            var listBtn = element.querySelectorAll(".roundButton");
            for(var i = 0; i < listBtn.length; i++) {
                listBtn[i].onclick = function() {
                    var url = getUrl(fileNames, this.innerText);
                    selectedButton(element.id, this)

                    httpRequest(url, function(data) {
                        data = JSON.parse(data);
                        ContentManager.listTitlesAndContent(data, element);
                    });
                };
            }
        });
    },

    this.addContentButton = function(UrlTemplate, dataTeam) {
        httpRequest(UrlTemplate, function(data) {
                    var template = Handlebars.compile(data);
                    var output = template(dataTeam);
                    element.innerHTML += output;
        });
    },

    this.clear = function() {
		element.innerHTML = '';
	}
};

var Views = {
	dataView: null,
	titleView: null,
	imageView: null,

    dataViewAux: null,
	titleViewAux: null,

    createViews: function() {
		Views.dataView = new View('listJson');
		Views.titleView = new View('containJson');
        Views.dataViewAux = new View('listJsonAux');
        Views.titleViewAux = new View('containJsonAux');
	},

    showDataItem: function(fileName) {
		Views.dataView.addButton(fileName);
        Views.dataViewAux.addButton(fileName);
    },

    showTitleAndContent: function(dataItem, element) {
        if (element.id ==  'listJson') {
            Views.titleView.clear();
            Views.titleView.addContentButton('Templates/list-team.hbs', dataItem);
        }

        if (element.id ==  'listJsonAux') {
            Views.titleViewAux.clear();
            Views.titleViewAux.addContentButton('Templates/list-teamAux.hbs', dataItem);
        }
	}
};

var ContentManager = {
	listData: function() {
		var fileNames = getFileNames();
        Views.showDataItem(fileNames);
	},

    listTitlesAndContent: function(data, element) {
        Views.showTitleAndContent(data, element);
    }
};
var App = {
	init: function() {
		Views.createViews();
		ContentManager.listData();
	}
};
