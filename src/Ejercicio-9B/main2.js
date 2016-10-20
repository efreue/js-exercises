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

var View = function(id) {
	var element = document.getElementById(id);

	this.addButton = function(text) {
		var btn = document.createElement("button");
		btn.innerHTML = text;
		Css.add(btn, "roundButton");
		element.appendChild(btn);
	};
	this.clear = function() {
		element.innerHTML = '';
	};
};

//TEMPLATE PERSONS
var generateTemplate = function() {
    var source = document.getElementById("viewsTemplate").innerHTML;
    var template = Handlebars.compile(source);
    var data = {views: [
        {fileName: "Miguel"},
        {fileName: "Juan"}
    ]};
    var output = template(data);
    return output;
    //document.getElementById("listJson").innerHTML += output;
};

//Se utiliza el evento DOMContentLoaded para esperar a que se cargue el html antes de hacer referencia a los mismos
if (document.addEventListener) {
    document.addEventListener( "DOMContentLoaded", function(){
         generateTemplate();
    }, false );
} else if ( document.attachEvent ) { // IE
    document.attachEvent("onreadystatechange", function(){
        if ( document.readyState === "complete" ) {
            generateTemplate();
        }
    });
}

var Views = {
    dataView: null,

    createViews: function() {
		Views.dataView = new View('listJson');
	},

    showDataItem: function(fileName, callback) {
		Views.dataView.addButton(fileName);
	}
};

var ContentManager = {
	listData: function() {
		var fileNames = generateTemplate();
		for(var i = 0; i < fileNames.length; i++) {
			Views.showDataItem(fileNames[i]);
		}
	}
};

var App = {
	init: function() {
		Views.createViews();
		ContentManager.listData();
	}
};
