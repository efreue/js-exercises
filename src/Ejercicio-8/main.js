var Config = {
	listFileJS: ["data-1.json","data-2.json","data-3.json"], //agregar los archivos json que deberan analizarse
    id_ElementDom: ["listJson", "containJson","imgJson"]
};
var JsonData = function(fileJS) {
	this.objs = new XMLHttpRequest();
	this.objs.onload = function() {
		if(this.status == 200) {
			var arrDataJson = JSON.parse(this.responseText); //cargo en un array el contenido del archivo json
			return arrDataJson;
		}
	};
	this.objs.open("GET", fileJS, true);
	this.objs.send();
};
var Css = {
	add: function (node, className) {
    	node.className += " " + className;
	},
	del: function (node, className) {
    	node.className = node.className.replace(className, "");
	},
	contains: function (node, className) {
    	return node.className.search(className) != -1;
	}
};
var App = {
	dataJS1:[],
	dataJS2:[],
	dataJS3:[],
	obJsLoad1: null,
	obJsLoad2: null,
	obJsLoad3: null,
	textHtml: "",
	btnJsonSelected: "",
	generateHTML: function(atributeShow, node, dataJS) {
		var newContent = "";
		if (atributeShow === "files") {
            for (i=0; i < Config.listFileJS.length; i++) {
                newContent += '<button class="roundButton" onclick="App.managerContentJson(this,'+Config.id_ElementDom[0]+')">'+Config.listFileJS[i]+'</button>';
            }
        }
        else if (atributeShow === "title") { //recorro el contenido del json
			for (i = 0; i < dataJS.length; i++) {
					newContent += '<button class="roundButton" onclick="App.managerContentJson(this,'+Config.id_ElementDom[1]+')">'+dataJS[i].title+'</button>';
			}
		}
        else if (atributeShow === "img") { //recorro el contenido del json
			for (i = 0; i < dataJS.length; i++) {
				if (node.textContent === dataJS[i].title) {
					newContent += '<img src = "'+ dataJS[i].img +'" class="clsImg" onclick="App.imageClick("'+dataJS[i].dest+'")"></img>';
				}
			}
        }
		return newContent;
	},
	showHTML: function(idElement, txtHtml) {
		document.getElementById(idElement).innerHTML = txtHtml;
	},
	clearImg: function(className) {
		var imgExists = document.getElementById(Config.id_ElementDom[2]);
		while (imgExists.firstChild) {
			imgExists.removeChild(imgExists.firstChild);
		}
	},
	managerSelectedButton: function(idDiv, className, node) {
		var buttonSel;
		if (idDiv.id === Config.id_ElementDom[0]){
			buttonSel = document.getElementById(Config.id_ElementDom[0]).getElementsByClassName(className)[0];
			if (buttonSel && Css.contains(buttonSel, className)) {
				Css.del(buttonSel,className);
			}
			Css.add(node,className);
		}
        else if (idDiv.id === Config.id_ElementDom[1]) {
			buttonSel = document.getElementById(Config.id_ElementDom[1]).getElementsByClassName(className)[0];
			if (buttonSel && Css.contains(buttonSel, className)) {
				Css.del(buttonSel,className);
			}
			Css.add(node,className);
		}
	},
	managerChildsElementDivs: function(node, idDiv, dataJS) {
		if (idDiv.id === Config.id_ElementDom[0]) {
			App.textHtml = App.generateHTML("title", node, dataJS);
			App.showHTML(Config.id_ElementDom[1],App.textHtml);
		}
		else if (idDiv.id === Config.id_ElementDom[1]) {
			App.textHtml = App.generateHTML("img", node, dataJS);
			App.showHTML(Config.id_ElementDom[2],App.textHtml);
		}

	},
	managerContentJson: function(node,idDiv) {
		var className = "Buttonselected"
        App.managerSelectedButton(idDiv, className, node);
		App.clearImg("clsImg");
		if (node.textContent === Config.listFileJS[0]) {
			if (App.dataJS1.length == 0) {
				App.dataJS1 = App.obJsLoad1.objs.onload();
			}
			App.managerChildsElementDivs(node, idDiv, App.dataJS1);
			App.btnJsonSelected = Config.listFileJS[0];
		}
		else if (node.textContent === Config.listFileJS[1]) {
			if (App.dataJS2.length == 0) {
				App.dataJS2 = App.obJsLoad2.objs.onload();
			}
			App.managerChildsElementDivs(node, idDiv, App.dataJS2);
			App.btnJsonSelected = Config.listFileJS[1];
		}
		else if (node.textContent === Config.listFileJS[2]) {
			if (App.dataJS3.length == 0) {
				App.dataJS3 = App.obJsLoad3.objs.onload();
			}
			App.managerChildsElementDivs(node, idDiv, App.dataJS3);
			App.btnJsonSelected = Config.listFileJS[2];
		}
		else if (App.btnJsonSelected === Config.listFileJS[0]) {
			App.managerChildsElementDivs(node, idDiv, App.dataJS1);
		}
		else if (App.btnJsonSelected === Config.listFileJS[1]) {
			App.managerChildsElementDivs(node, idDiv, App.dataJS2);
		}
		else if (App.btnJsonSelected === Config.listFileJS[2]) {
			App.managerChildsElementDivs(node, idDiv, App.dataJS3);
		}
	},
	imageClick: function(url) {
		window.location.href = url;
	},
	init: function(){
		//show files json exists in html
		App.textHtml = App.generateHTML("files",null, null);
		App.showHTML(Config.id_ElementDom[0], App.textHtml);
        //instancio objetos json
		App.obJsLoad1 = new JsonData(Config.listFileJS[0]);
		App.obJsLoad2 = new JsonData(Config.listFileJS[1]);
		App.obJsLoad3 = new JsonData(Config.listFileJS[2]);
	}
};
