var Config = {
	path: "./data/",
	fileNameSelected: "",
	divIdSelected: ""
};

var setFileNameJsSelected = function(fileNameJs) {
	Config.fileNameSelected = fileNameJs;
};

var setDivIdSelected = function(divId) {
	Config.divIdSelected = divId;
};

var getListNameFileJS = function() {
	var listFile=[];
	var file = "";
	for(i=1; i <= 30; i++) {
		file = "data-" + i + ".json";
		listFile.push(file);
	}
	return listFile;
};

var getFirstNameFileJS = function(getListNameFileJS) {
	var listFile = getListNameFileJS();
	var fileName = "";
	if(listFile.length > 0){
		fileName = listFile[1];
	}
	return listFile;
};

var getURL = function(fileName, path) {
	var url = path + fileName;
    return url;
};

var getDataJS = function(fileName, divId, text) {
	var arrDataJson = JSON.parse(text);
	if (arrDataJson.length > 0)
	{
		console.log(arrDataJson["1"].title);
		console.log(fileName);
		console.log(divId);
		//getHTMLDataJS(arrDataJson);
	}
};

var generateHttpRequest = function(fileName, divId, path, getURL, getDataJS) {
	var url = getURL(fileName, path);
	var objs = new XMLHttpRequest();
	objs.onload = function() {
		if(this.status == 200) {
			getDataJS(fileName, divId, this.responseText);
		}
	};
	objs.open("GET", url, true);
	objs.send();
};

var showHTML = function(textHTML){
	if(Config.divIdSelected ==="listJson") {
		document.getElementById("listJson").innerHTML = textHTML;
	}
}

var getHTMLListFileNameJS = function(getListNameFileJS) {
	var newContent = "";
	var listFiles = getListNameFileJS();
	for (i=0; i < listFiles.length; i++) {
		newContent += '<button class="roundButton"';
		newContent += 'onclick=generateHttpRequest("'+listFiles[i]+'",';
		newContent += '"listJson","'+Config.path+'",getURL,getDataJS)>';
		newContent += listFiles[i]+'</button>';
	}
	return newContent;
};

var App = {
	init: function() {
		var HTMLText = getHTMLListFileNameJS(getListNameFileJS);
		setFileNameJsSelected(getFirstNameFileJS);
		setDivIdSelected("listJson");
		showHTML(HTMLText);
	}
}
