var Config = {
	fileJS: "data.json",
	id_ElementDom: 'content'
};
var JsonData = function() {
	this.objs = new XMLHttpRequest();
	this.objs.onload = function(){
		if(this.status == 200) {
			var arrDataJson = JSON.parse(this.responseText); //cargo en un array el contenido del archivo json
			return arrDataJson;
		}
	};
	this.objs.open("GET", Config.fileJS, true);
	this.objs.send();		
};
var App = {
	dataJS:[],
	obJsLoad: new JsonData(), //instancio objeto json
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
		App.dataJS = App.obJsLoad.objs.onload();
		App.generateHTML();
		App.showHTML();
	}
};
