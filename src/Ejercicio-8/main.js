var config = {
	path: "./data/data-"
};
var getUrl = function(id) {
    var url = config.path + id + ".json";
    return url;
}

var objAjax = function(fileJS) {
	this.objs = new XMLHttpRequest();
	this.objs.onload = function() {
		if(this.status == 200) {
			var arrDataJson = JSON.parse(this.responseText);
            App.showDataInHTML(this.status, arrDataJson);
		}
        else {
           App.showStatusAjax(this.status);
        }
	};
	this.objs.open("GET", fileJS, true);
	this.objs.send();
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
var App = {
	showStatusAjax: function(statusRequest) {
        var nodes = document.body.getElementsByClassName("styleText");
        var mens = "Error loading page";
        if (nodes.length > 0) {
            if (statusRequest != 200) {
                if (statusRequest == 0) {
                    mens = "Loading..."
                }
            }
            for(var i=0; i < nodes.length; i++) {
                if (statusRequest != 200) {
                    nodes[i].innerHTML = mens;
                    if (Css.contains(nodes[i], "textHidden")) {
                         Css.del(nodes[i], "textHidden")
                    }
                }
                else {
                    if(!Css.contains(nodes[i], "textHidden")) {
                        Css.add(nodes[i], "textHidden")
                    }
                }
            }
        }
    },
    showDataInHTML: function(statusRequest, dataJS) {
        App.showStatusAjax (statusRequest);
    },
    init: function() {
		var url = getUrl("1");
        objAjax(url);
	}
};
