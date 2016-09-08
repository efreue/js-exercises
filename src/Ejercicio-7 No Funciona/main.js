var Config = {
	fileJS: "data.json",
	id_ElementDom: 'content'
};
var JsonData = function() {
	this.read = function() {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", Config.fileJS, true);
		xmlhttp.send(null);
		if (xmlhttp.status == 0)  return xmlhttp.responseText;
	};
};
var App = {
	dataJS:[],
	xmlhttp: null,
	generateHTML: function() {
		var newContent = "";
		//recorro el contenido del json
		for (i = 0; i < App.dataJS.length; i++) {
			newContent += '<div class="container positioned">';
			newContent += '<p class="center">'+App.dataJS[i].title+'</p>';
			newContent += '<img src="'+ App.dataJS[i].img +'" class="icon"><br>';
			newContent += '</div">';
		}
		App.textHtml = newContent;
	},
	showHTML: function() {
		document.getElementById(Config.id_ElementDom).innerHTML = App.textHtml;
	},
	init: function(){
		var obJs = new JsonData();
		App.xmlhttp = obJs.read();
		if (App.xmlhttp != "") {
			App.dataJS = JSON.parse(App.xmlhttp);
			App.generateHTML();
			App.showHTML();
		};
	}
};
