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

var generateHTML = function(element) {
	var newContent = "";
	//recorro el contenido del json
	for (var i = 0; i < element.length; i++) {
		newContent += '<div class="container positioned">';
		newContent += '<p class="center">'+element[i].title+'</p><br>';
		newContent += '<img src="'+ element[i].img +'" class="icon positionable">';
		newContent += '</div">';
	}
	//Actualizando la pagina con el nuevo contenido
	document.getElementById('content').innerHTML = newContent;
};
