var Config = {
	path: "./data/",
	idElementDom: ["listJson", "containJson","imgJson"],
	loadedButtons: false
};
var getListUrls = function() {
	var listUrls=[];
	var url = "";
	for(i=1; i <= 30; i++) {
		url = "data-" + i + ".json";
		listUrls.push(url);
	}
	return listUrls;
};

var generateHTML = function(atributeShow, dataJS) {
	var newContent = "";
	if (atributeShow === "files") {
		for (i=0; i < dataJS.length; i++) {
			newContent += '<button class="roundButton"';
			newContent += 'onclick="obtainDataSelect('+dataJS[i]+','+Config.idElementDom[0]+')">';
			newContent += dataJS[i]+'</button>';
		}
	}
	return newContent;
};

var showHTML = function(idElement, txtHtml) {
	document.getElementById(idElement).innerHTML = txtHtml;
}

var obtainDataSelect = function(btnName, idDiv){
	console.log(btnName);
	console.log(idDiv);
};

var App = {
	init: function() {
		var listUrl = getListUrls();
		var textHTML = generateHTML("files", listUrl);
		showHTML(Config.idElementDom[0], textHTML);
	}
};
/*
listar_botones
obtener_data_boton_seleccionado
mostrar_data_boton_seleccionado
*/
