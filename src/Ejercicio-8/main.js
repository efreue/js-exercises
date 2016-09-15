var config = {
	path:"./data/",

};
var filesNamesJS = '{ "filesJS" : [' +
'{ "name":"data-1"},' +
'{ "name":"data-2"},' +
'{ "name":"data-3"},' +
'{ "name":"data-4"},' +
'{ "name":"data-5"},' +
'{ "name":"data-6"},' +
'{ "name":"data-7"},' +
'{ "name":"data-8"},' +
'{ "name":"data-9"},' +
'{ "name":"data-10"},' +
'{ "name":"data-11"},' +
'{ "name":"data-12"},' +
'{ "name":"data-13"},' +
'{ "name":"data-14"},' +
'{ "name":"data-15"},' +
'{ "name":"data-16"},' +
'{ "name":"data-17"},' +
'{ "name":"data-18"},' +
'{ "name":"data-19"},' +
'{ "name":"data-20"},' +
'{ "name":"data-21"},' +
'{ "name":"data-22"},' +
'{ "name":"data-23"},' +
'{ "name":"data-24"},' +
'{ "name":"data-25"},' +
'{ "name":"data-26"},' +
'{ "name":"data-27"},' +
'{ "name":"data-28"},' +
'{ "name":"data-29"},' +
'{ "name":"data-30"} ]}';

var listFilesNameJS = function(strFilesNames){
	return this.JSON.parse(strFilesNames);
};
var objAjax = function(fileJS) {
	this.objs = new XMLHttpRequest();
	this.objs.onload = function() {
		if(this.status == 200) {
			var arrDataJson = JSON.parse(this.responseText);
		}
	};
	this.objs.open("GET", fileJS, true);
	this.objs.send();
};
var App = {
	init: function(){
		var objList = listFilesNameJS(filesNamesJS);
		var pathFile = config.path + objList.filesJS["0"].name + ".json";
		objAjax(pathFile);
	}
};
