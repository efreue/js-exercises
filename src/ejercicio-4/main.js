var getNodesMatchingCss = function(className) {
    var storeCssNode = [];
    var matchingNodes = [];
    var nodes = document.body.getElementsByTagName('*');   
    for (var i = 0; i < nodes.length; i++){
        storeCssNode = nodes[i].className.split(' ');
        for(var j = 0; j < storeCssNode.length; j++) {
            if (storeCssNode[j] === className) {
                matchingNodes.push(nodes[i]);
            }
            break;
        }
    }
    return matchingNodes;
};

//funcion que asigna los comportamientos que deben tener los nodos
var addBehaviorNodes = function (nodes) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].zIndex = "-1";
        nodes[i].onclick = function() {
            if(validCssNode(this,"positionable")) {
                if(!validCssNode(this,"selected")) {
                    addCssNode (this, "selected");
                }
                else {
                    delCssNode (this, "selected");
                }
            }
        }
        nodes[i].onmouseout = function() {
            if(validCssNode(this,"selected")) {
                if(!validCssNode(this,"positioned")) {
                        addCssNode (this, "positioned");
                }
            }
        }
        nodes[i].ondblclick = function() {
            moveNodePositionOrigin (this);            
        }
    }
};

var moveElementPositioned = function(e) {
    var evento = e || window.event;
    var node = document.body.getElementsByClassName("selected")[0];
    if (node != undefined) {
        switch (evento.type) {
            case 'mousemove':
                var ie = navigator.userAgent.toLowerCase().indexOf('msie') != -1;
                var coordenadaXabsoluta, coordenadaYabsoluta;
                if (ie) {
                    if (document.documentElement && document.documentElement.scrollTop) { 
                        coordenadaXabsoluta = evento.clientX + document.documentElement.scrollLeft;
                        coordenadaYabsoluta = evento.clientY + document.documentElement.scrollTop;
                    }
                    else { 
                        coordenadaXabsoluta = evento.clientX + document.body.scrollLeft;
                        coordenadaYabsoluta = evento.clientY + document.body.scrollTop;
                    }
                }
                else {
                    coordenadaXabsoluta = evento.pageX;
                    coordenadaYabsoluta = evento.pageY;
                }
                node.style.left =  (coordenadaXabsoluta - node.parentNode.getBoundingClientRect().left) - 30; 
                node.style.top = (coordenadaYabsoluta - node.parentNode.getBoundingClientRect().top) - 30;
                break;
        }
    }
};


var moveNodePositionOrigin = function(node) {
    if (validCssNode(node, "positioned")) {
       delCssNode(node, "positioned");
       delCssNode(node, "selected");    
    }
};

//agregar clase al nodo
var addCssNode = function (node, className) {
    node.className += " " + className;
};

//borrar clase del nodo
var delCssNode = function (node, className) {
    node.className = node.className.replace(className,"");  
};

//valido si existe o no la clase en el nodo
var validCssNode = function (node, className) {
    return node.className.search(className) != -1;    
};

window.onload = function() {
    var nodes = getNodesMatchingCss ("selectable");
    addBehaviorNodes (nodes);
};
document.onmousemove = moveElementPositioned;