//funcion que asigna los comportamientos que deben tener los nodos
var addBehaviorNodes = function() {
    var nodes = document.body.getElementsByClassName('selectable');
    if (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].zIndex = "-1";
            if (Css.contains(nodes[i], "positionable")) {
                nodes[i].onclick = function() {
                    if(Css.contains(this, "positionable")) {
                        if(!Css.contains(this, "selected")) {
                            Css.add(this, "selected");
                        }
                        else {
                            Css.del(this, "selected");
                        }
                    }
                };
                nodes[i].onmouseout = function() {
                    if(Css.contains(this, "selected")) {
                        if(!Css.contains(this, "positioned")) {
                            Css.add(this, "positioned");
                        }
                    }
                };
                nodes[i].ondblclick = function() {
                    restorePosition(this);
                };
            }
        }
    }
};

var moveElementPositioned = function(e) {
    var evento = e || window.event;
    var node = document.body.getElementsByClassName("selected")[0];
	if (node && evento.type === 'mousemove') {
		var getNewMouseCoordinates = getMouseCoordinates(evento);
		setPosition(node, getNewMouseCoordinates);

};

var getMouseCoordinates = function(evento) {
    var ie = navigator.userAgent.toLowerCase().indexOf('msie') != -1;
    var coordinateXabsolute, coordinateYabsolute;
    if (ie) {
        if (document.documentElement && document.documentElement.scrollTop) {
            coordinateXabsolute = evento.clientX + document.documentElement.scrollLeft;
            coordinateYabsolute = evento.clientY + document.documentElement.scrollTop;
        }
        else {
            coordinateXabsolute = evento.clientX + document.body.scrollLeft;
            coordinateYabsolute = evento.clientY + document.body.scrollTop;
       }
    }
    else {
       coordinateXabsolute = evento.pageX;
       coordinateYabsolute = evento.pageY;
    }
	return {
		posX: coordinateXabsolute,
		posY: coordinateYabsolute
	};
};

var setPosition = function(node, MouseCoordinates) {
	node.style.left = (MouseCoordinates.posX - node.parentNode.getBoundingClientRect().left) - 30;
	node.style.top = (MouseCoordinates.posY - node.parentNode.getBoundingClientRect().top) - 30;
};

var restorePosition = function(node) {
    if (Css.contains(node, "positioned")) {
       Css.del(node, "positioned");
       Css.del(node, "selected");
    }
};

//creo objeto Css que agrupa funciones
var Css = {
	add: function (node, className) {
    	node.className += " " + className;
	},
	del: function (node, className) {
    	node.className = node.className.replace(className, "");
	},
	contains: function (node, className) {
    	return node.className.search(className) != -1;
	}
};

window.onload = addBehaviorNodes;
document.onmousemove = moveElementPositioned;
