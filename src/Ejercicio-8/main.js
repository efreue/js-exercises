var Config = {
	path: "./data/",
	initialize: false
};

var getListFileNameJS = function() {
	var listFile=[];
	var file = "";
	for(i=1; i <= 30; i++) {
		file = "data-" + i + ".json";
		listFile.push(file);
	}
	return listFile;
};

var Css = {
	add: function(node, className) {
    	node.className += " " + className;
	},
	del: function(node, className) {
    	node.className = node.className.replace(className, "");
	},
	contains: function(node, className) {
    	return node.className.search(className) != -1;
	}
};

var hiddeStatus = function(className, divIdSel) {
	var node = document.getElementById(divIdSel).getElementsByClassName("styleText")[0];
	if(node) {
		if(!Css.contains(node, className)) {
			Css.add(node, className);
		}
	};
};

var selectedButton = function(divIdSel, buttonParam) {
	var className = "Buttonselected";
	var findButtonParam = false;
	var buttonSel = document.getElementById(divIdSel).getElementsByClassName(className)[0];
	var nodes = document.getElementById(divIdSel).getElementsByClassName("roundButton");
	if (buttonSel && Css.contains(buttonSel, className)) {
		Css.del(buttonSel,className);
	}
	for(i=0; i < nodes.length; i++) {
		if(nodes[i].textContent === buttonParam) {
			findButtonParam = true
			Css.add(nodes[i],className);
		}
	}
	if (Config.initialize == false) {
		if(findButtonParam == false) {
			Css.add(nodes["0"],className);
		}
		nodes[0].click();
	}
};

var getFirstFileNameJS = function() {
	var FileName="";
	var i = 1;
	FileName = "data-" + i + ".json";
	return FileName;
};


var getURL = function(fileName, path) {
	var url = path + fileName;
    return url;
};

var clearImg = function(className) {
	var imgExists = document.getElementById("imgJson");
	while (imgExists.firstChild) {
		imgExists.removeChild(imgExists.firstChild);
	}
};

var clearContainer = function(className) {
	var imgExists = document.getElementById("containJson");
	while (imgExists.firstChild) {
		imgExists.removeChild(imgExists.firstChild);
	}
	imgExists.innerHTML='<p id="l2" class="styleText">Loading...</p>'
};

var generateHTMLDataJS = function(parentFileName, fileNameSel, divIdSel, dataJS) {
	var newContent = "";
	var divIdShow = ""
	if (divIdSel === "listJson") {
		selectedButton(divIdSel, fileNameSel);
		clearContainer("containJson");
		clearImg("clsImg");
		divIdShow = "containJson";
		for (i=0; i < dataJS.length; i++) {
			newContent += '<button class="roundButton"';
			newContent += 'onclick=generateHttpRequest("'+parentFileName+'","'+dataJS[i].title+'",';
			newContent += '"'+divIdShow+'","'+Config.path+'",getURL,getDataJS)>';
			newContent += dataJS[i].title+'</button>';
		}
	}
	if (divIdSel === "containJson") {
		selectedButton(divIdSel, fileNameSel);
		divIdShow = "imgJson";
		for (i=0; i < dataJS.length; i++) {
			if(fileNameSel === dataJS[i].title) {
				newContent += '<img src = "'+ dataJS[i].img.toString() +'" ';
				newContent += 'class="clsImg" onclick=imageClick("'+dataJS[i].dest+'")>';
				newContent += '</img>';
			}
		}
	}
	showHTML(divIdShow, newContent, fileNameSel);
	Config.initialize = true;
};

var getDataJS = function(parentFileName, fileName, divId, text) {
	var arrDataJson = JSON.parse(text);
	if (arrDataJson.length > 0)
	{
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


var showHTML = function(divIdSelected, textHTML, fileNameSel){
	hiddeStatus("textHidden",divIdSelected);
	document.getElementById(divIdSelected).innerHTML = textHTML;
	selectedButton(divIdSelected, fileNameSel);
};


var getHTMLListFileNameJS = function(getListFileNameJS) {
	var newContent = ""
	var listFiles = getListFileNameJS();
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
		var HTMLText = getHTMLListFileNameJS(getListFileNameJS);
		var divIdSelected = "listJson";
		var FirstFileName = getFirstFileNameJS();
		showHTML(divIdSelected, HTMLText, FirstFileName);
		generateHttpRequest(FirstFileName, FirstFileName, divIdSelected, Config.path, getURL, getDataJS);
	}
};
