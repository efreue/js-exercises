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
    createBall: function() {
        var element = document.createElement('div');
        Css.add(element, 'ball');
        Css.add(element, 'red');
        document.body.appendChild(element);
    }
}

window.onload = App.createBall;
