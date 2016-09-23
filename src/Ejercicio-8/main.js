var Config = {
	path: "./data/",
	parentFileNameSelected: ""
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


var getURL = function(fileName, path) {
	var url = path + fileName;
    return url;
};

var generateHTMLDataJS = function(parentFileName, fileNameSel, divIdSel, dataJS) {
	var newContent = "";
	var divIdShow = ""
	if (divIdSel === "listJson") {
		divIdShow = "containJson";
		for (i=0; i < dataJS.length; i++) {
			newContent += '<button class="roundButton"';
			newContent += 'onclick=generateHttpRequest("'+parentFileName+'","'+dataJS[i].title+'",';
			newContent += '"'+divIdShow+'","'+Config.path+'",getURL,getDataJS)>';
			newContent += dataJS[i].title+'</button>';
		}
	}
	if (divIdSel === "containJson") {
		divIdShow = "imgJson";
		for (i=0; i < dataJS.length; i++) {
			if(fileNameSel === dataJS[i].title) {
				newContent += '<img src = "'+ dataJS[i].img.toString() +'"';
				newContent += 'class="clsImg" onclick="imageClick("'+dataJS[i].dest.toString()+'")"></img>';
			}
		}
	}
	showHTML(divIdShow, newContent);
};


var getDataJS = function(parentFileName, fileName, divId, text) {
	var arrDataJson = JSON.parse(text);
	if (arrDataJson.length > 0)
	{
		if (divId === "listJson") {
			Config.parentFileNameSelected = fileName;
		}
		generateHTMLDataJS(parentFileName, fileName, divId, arrDataJson);
	}
};


var generateHttpRequest = function(parentFileName, fileName, divId, path, getURL, getDataJS) {
	var url = getURL(parentFileName, path);
	var objs = new XMLHttpRequest();
	objs.onload = function() {
		if(this.status == 200) {
			getDataJS(parentFileName, fileName, divId, this.responseText);
		}
	};
	objs.open("GET", url, true);
	objs.send();
};

var showHTML = function(divIdSelected, textHTML){
	document.getElementById(divIdSelected).innerHTML = textHTML;
};


var getHTMLListFileNameJS = function(getListNameFileJS) {
	var newContent = ""
	var listFiles = getListNameFileJS();
	for (i=0; i < listFiles.length; i++) {
		newContent += '<button class="roundButton"';
		newContent += 'onclick=generateHttpRequest("'+listFiles[i]+'","'+listFiles[i]+'",';
		newContent += '"listJson","'+Config.path+'",getURL,getDataJS)>';
		newContent += listFiles[i]+'</button>';
	}
	return newContent;
};

var App = {
	init: function() {
		var HTMLText = getHTMLListFileNameJS(getListNameFileJS);
		var divIdSelected = "listJson";
		showHTML(divIdSelected, HTMLText);
	}
};
