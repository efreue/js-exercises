var getUrl = function(fileName) {
	return './data/' + fileName;
};

var getFileNames = function() {
	var listFile = [];
	var file = "";
	for(var i = 1; i <= 30; i++) {
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

var generateTemplate = function() {
    var randomList= getFileNames();
    var source= "{{#each this}}<button type='button' class='roundButton'>{{this}}</button><br>{{/each}}";
    var template= Handlebars.compile(source);
    //console.log(template(randomList));
    var output = template(randomList);
    document.getElementById("listJson").innerHTML += output;
};
