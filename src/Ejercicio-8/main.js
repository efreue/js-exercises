var config = {
	path: "./data/data-",
	id_ElementDom: ["listJson", "containJson","imgJson"]
};
var getUrl = function(id) {
    var url = config.path + id + ".json"
    return url
};
var getListUrls = function() {
	var listUrls=[];
	var url = "";
	for(i=1; i <= 30; i++) {
		url = config.path + i + ".json";
		listUrls.push(url);
	}
	return listUrls;
}
var Css = {
	add: function(node, className) {
    	node.className += " " + className
	},
	del: function(node, className) {
    	node.className = node.className.replace(className, "")
	},
	contains: function(node, className) {
    	return node.className.search(className) != -1
	}
};
var objAjax = function(fileJS) {
	this.objs = new XMLHttpRequest();
	this.objs.onload = function() {
		if(this.status == 200) {
			var arrDataJson = JSON.parse(this.responseText);
			App.processingData(this.status, arrDataJson);
		}
        else {
           App.showStatusAjax(this.status);
        }
	};
	this.objs.open("GET", fileJS, true);
	this.objs.send();
};

var App = {
	textHtml: "",
	loadListUrls: true,
	modifyingElement: function(node, atributeShow, statusAjax) {
		if (atributeShow === 'showStatus') {
			if(Css.contains(node, "textHidden")) {
				Css.del(node, "textHidden");
			}
			node.innerHTML = statusAjax;
		}
	},
	showStatusAjax: function(statusRequest) {
        var nodes = document.body.getElementsByClassName("styleText");
        var textStatus = "Loading...";
		if (statusRequest != 200) {
			if (statusRequest != 0) {
				textStatus = "Error loading page";
			}
		}
        if (nodes.length > 0) {
			for(var i=0; i < nodes.length; i++) {
          		App.modifyingElement(nodes[i], "showStatus", textStatus);
			}
        }
    },
	generateHTML: function(atributeShow, node, dataJS) {
		var newContent = "";
		if (atributeShow === "loadUrls") {
			if (node.length > 0) {
				for (i=0; i < node.length; i++) {
                	newContent += '<button class="roundButton" onclick="App.managerContentJson(this,'+config.id_ElementDom[0]+')">'+node[i]+'</button>';
            	}
			}
        }
		return newContent;
	},
	showHTML: function(idElement, txtHtml) {
		document.getElementById(idElement).innerHTML = txtHtml;
	},
    processingData: function(statusRequest, dataJS) {
        App.showStatusAjax (statusRequest);
		if(App.loadListUrls == true) {
			var listUrls = getListUrls();
			App.textHtml = App.generateHTML("loadUrls",listUrls,null);
			App.showHTML(config.id_ElementDom[0],App.textHtml);
			App.loadListUrls = false;
		}

    },
    init: function() {
		var url = getUrl("1");
        objAjax(url, true);
	}
};
