var Config = {
	listFileJS: ["data-1.json","data-2.json"], //agregar los archivos json que deberan analizarse
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
//creo objeto Css que agrupa funciones
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
	obJsLoad1: null, //instancio objeto json
	obJsLoad2: null, //instancio objeto json
	obJsLoad3: null, //instancio objeto json
	textHtml: "",
	generateHTML: function(atributeShow) {
		var newContent = "";
		if (atributeShow === "files") {
            for (i=0; i < Config.listFileJS.length; i++) {
                newContent += '<button class="roundButton" onclick="App.getContentJson(this,'+Config.id_ElementDom[0]+')">'+Config.listFileJS[i]+'</button>';
            }
        }
        else if (atributeShow === "title") { //recorro el contenido del json
			for (i = 0; i < App.dataJS1.length; i++) {
					newContent += '<button class="roundButton" onclick="App.getContentJson(this,'+Config.id_ElementDom[1]+')">'+App.dataJS1[i].title+'</button>';
			}
		}
        else if (atributeShow === "img") { //recorro el contenido del json
			newContent += '<button class="roundButton" onclick="App.getContentJson(this,'+Config.id_ElementDom[2]+')">'+App.dataJS1[0].img+'</button>';
        }
		return newContent;
	},
	showHTML: function(idElement, txtHtml) {
		document.getElementById(idElement).innerHTML = txtHtml;
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
	getContentJson: function(node,idDiv) {
		var className = "Buttonselected"
        App.managerSelectedButton(idDiv, className, node);
        if (App.dataJS1.length == 0) {
            App.dataJS1 = App.obJsLoad1.objs.onload();
        }
        if (App.dataJS2.length == 0) {
            App.dataJS2 = App.obJsLoad2.objs.onload();
        }

		if (idDiv.id === Config.id_ElementDom[0]) {

			App.textHtml = App.generateHTML("title");
			App.showHTML(Config.id_ElementDom[1],App.textHtml);
		}
        else if (idDiv.id === Config.id_ElementDom[1]) {

			App.textHtml = App.generateHTML("img");
			App.showHTML(Config.id_ElementDom[2],App.textHtml);
		}
        ;
	},
	init: function(){
		//show files json exists in html
		App.textHtml = App.generateHTML("files");
		App.showHTML(Config.id_ElementDom[0], App.textHtml);
        //instancio objetos json
		App.obJsLoad1 = new JsonData(Config.listFileJS[0]);
		App.obJsLoad2 = new JsonData(Config.listFileJS[1]);
	}
};
