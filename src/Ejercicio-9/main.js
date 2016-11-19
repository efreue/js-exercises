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

var getUrl = function(listFiles, titleFile) {
    for(var i = 0; i < listFiles.length; i++) {
        if(listFiles[i].name == titleFile.toLowerCase()) {
            return listFiles[i].url;
        }
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


var View = function(id, templateUrl) {
	var element = document.getElementById(id);

    this.addButton = function(dataItem, callback) {
        httpRequest(templateUrl, function(data) {
            var template = Handlebars.compile(data);
            element.innerHTML = template(dataItem);
            var listBtn = element.getElementsByClassName("roundButton");
            for(var i = 0; i < listBtn.length; i++) {
                listBtn[i].onclick = callback;

            }
        });
    },

    this.addContentButton = function(dataItem) {
        httpRequest(templateUrl, function(data) {
            var template = Handlebars.compile(data);
            element.innerHTML = template(dataItem);
            //agrego evento onclick al link que muestra imagen
            var linkImg = element.getElementsByClassName("linkTeam");
            for(var i = 0; i < linkImg.length; i++) {
                linkImg[i].onclick = function(){
                    var url = this.firstElementChild.attributes[1].value;
                    var img = document.createElement('img');
                    img.src = url;
                    Css.add(img, "clsImg");
                    var divImg = document.getElementById("imgJson");
                    divImg.innerHTML='';
                    divImg.appendChild(img);
                }
            };
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
    dataViewAux: null,
	titleViewAux: null,

    createViews: function() {
		Views.dataView = new View('listJson', 'Templates/list-btn.hbs');
		Views.titleView = new View('containJson', 'Templates/list-team.hbs');
        Views.imageView = new View('imgJson', 'Templates/list-team.hbs');
        Views.dataViewAux = new View('listJsonAux', 'Templates/list-btn.hbs');
        Views.titleViewAux = new View('containJsonAux', 'Templates/list-team-aux.hbs');
	},

    showDataItem: function(dataItem) {
		Views.dataView.addButton(
            dataItem,
            function() {
                selectedButton('listJson', this);
                httpRequest(
                    getUrl(dataItem, this.innerText),
                    function(data) {
                        Views.titleView.clear();
                        Views.imageView.clear();
                        Views.titleView.addContentButton(JSON.parse(data))
                })
            }
        );

        Views.dataViewAux.addButton(
            dataItem,
            function() {
                selectedButton('listJsonAux', this);
                httpRequest(
                    getUrl(dataItem, this.innerText),
                    function(data) {
                        Views.titleViewAux.addContentButton(JSON.parse(data));
                })
            }
        );
    }

};


var App = {
	init: function() {
		Views.createViews();
		Views.showDataItem(getFileNames());
	}
};
