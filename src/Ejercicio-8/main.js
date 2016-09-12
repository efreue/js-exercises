var Config = {
	listFileJS: ["data-1.json","data-2.json"], //agregar los archivos json que deberan analizarse
	id_ElementDom1: 'listJson',
	id_ElementDom2: 'containJson'
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
	getJsonExists: function() {
		var newContent = "";
		for (i=0; i < Config.listFileJS.length; i++) {
			newContent += '<button class="roundButton" onclick="App.getContentJson(this,listJson)">'+Config.listFileJS[i]+'</button>';
		}
		return newContent;
	},
	generateHTML: function(atributeShow) {
		var newContent = "";
		//recorro el contenido del json
		if (atributeShow === "title") {
			for (i = 0; i < App.dataJS1.length; i++) {
					newContent += '<button class="roundButton" onclick="App.getContentJson(this,listJson)">'+App.dataJS1[i].title+'</button>';
			}
		}
		App.textHtml = newContent;
	},
	showHTML: function(idElement, txtHtml) {
		document.getElementById(idElement).innerHTML = txtHtml;
	},
	managerJsonInElement: function(idDiv) {
		var fileJsonUse;
		if (idDiv.id === Config.id_ElementDom1) {
			fileJsonUse = Config.listFileJS[0];
		}
		else if (idDiv.id === Config.id_ElementDom2) {
			fileJsonUse = Config.listFileJS[1]
		} else {
			fileJsonUse = Config.listFileJS[2]
		}

		return fileJsonUse;
	},
	managerSelectedButton: function(idDiv, className, node) {
		var buttonSel;
		if (idDiv.id === Config.id_ElementDom1){
			buttonSel = document.getElementsByClassName(className)[0];
			if (buttonSel && Css.contains(buttonSel, className)) {
				Css.del(buttonSel,className);
			}
			Css.add(node,className);
		}
	},
	getContentJson: function(node,idDiv) {
		var className = "Buttonselected"
		var fileJsonSel;
		App.managerSelectedButton(idDiv, className, node);
		if (idDiv.id === Config.id_ElementDom1) {
			fileJsonSel = App.managerJsonInElement(idDiv);
			App.dataJS1 = App.obJsLoad1.objs.onload();
			App.generateHTML("title");
			App.showHTML(Config.id_ElementDom2,App.textHtml);
		}s
	},
	init: function(){
		var textHtml = "";
		//show files json exists in html
		textHtml = App.getJsonExists();
		App.showHTML(Config.id_ElementDom1,textHtml);
		App.obJsLoad1 = new JsonData(Config.listFileJS[0]); //instancio objeto json
		App.obJsLoad2 = new JsonData(Config.listFileJS[1]); //instancio objeto json
	}
};
