var Config = {
	fileJS: "data.json",
	id_ElementDom: 'content'
};

var readJsonData = function(){
	var xmlhttp = new XMLHttpRequest(); // Creo el objeto XMLHttpRequest
	xmlhttp.onload = function() {
		if(this.status == 200) {
			//cargo en un array el contenido del archivo json
			var arrDataJson = JSON.parse(this.responseText);
			App.dataJS = arrDataJson;
		}
	};
	//se prepara la peticion al servidor
	xmlhttp.open("GET", Config.fileJS, true);
	//se envia peticion
	xmlhttp.send();
}

var App = {
	dataJS:[],
	textHtml:"",
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
		App.generateHTML();
		App.showHTML();
	}
};


/*
'content'
var readDataJson = function() {
	var xmlhttp = new XMLHttpRequest(); // Creo el objeto XMLHttpRequest
	var url = "data.json";
	xmlhttp.onload = function() {
		if(this.status == 200) {
			//cargo en un array el contenido del archivo json
			var arrDataJson = JSON.parse(this.responseText);
			generateHTML(arrDataJson);
		}
	};
	//se prepara la peticion al servidor
	xmlhttp.open("GET", url, true);
	//se envia peticion
	xmlhttp.send();
};
*/
/*
var generateHTML = function(element, idElementDom) {
	var newContent = "";
	//recorro el contenido del json
	for (i = 0; i < element.length; i++) {
		newContent += '<div class="container positioned">';
		newContent += '<p class="center">'+element[i].title+'</p>';
		newContent += '<img src="'+ element[i].img +'" class="icon"><br>';
		newContent += '</div">';
	}

	return newContent;
			//Actualizando la pagina con el nuevo contenido
//	document.getElementById(idElementDom).innerHTML = newContent;

};
*/
