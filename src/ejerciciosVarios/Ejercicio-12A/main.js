var cleanLowerHierarchy = function(element) {
     if(element === 'div') {
        document.getElementById('TableX').value = '';
        document.getElementById('TableY').value = '';
        document.getElementById('RowX3').value = '';
        document.getElementById('RowY3').value = '';
        document.getElementById('RowX2').value = '';
        document.getElementById('RowY2').value = '';
        document.getElementById('RowX1').value = '';
        document.getElementById('RowY1').value = '';
     }

     if(element === 'table') {
        document.getElementById('RowX3').value = '';
        document.getElementById('RowY3').value = '';
        document.getElementById('RowX2').value = '';
        document.getElementById('RowY2').value = '';
        document.getElementById('RowX1').value = '';
        document.getElementById('RowY1').value = '';
     }

    if(element === 'row3') {
        document.getElementById('RowX2').value = '';
        document.getElementById('RowY2').value = '';
        document.getElementById('RowX1').value = '';
        document.getElementById('RowY1').value = '';
    }

     if(element === 'row2') {
        document.getElementById('RowX3').value = '';
        document.getElementById('RowY3').value = '';
        document.getElementById('RowX1').value = '';
        document.getElementById('RowY1').value = '';
    }
        if(element === 'row1') {
        document.getElementById('RowX3').value = '';
        document.getElementById('RowY3').value = '';
        document.getElementById('RowX2').value = '';
        document.getElementById('RowY2').value = '';
    }
}

var createElement = function(name) {
    return document.createElement(name);
};

var doTransparent = function(node) {
    node.className.replace("hidden", "");
    node.className += " transparent";
};

var doHidden = function(node) {
    node.className.replace("transparent", "");
    node.className += " hidden";
};

var getCircle = function(id, posLeft, posTop, color) {
    var circle = createElement('div');
    circle.id = id;
    circle.className = "shape " + color;
    circle.style.left = posLeft + "px";
    circle.style.top = posTop + "px";
    return circle;
};

var addBall = function() {
    var table = document.getElementById('table');
    table.appendChild(getCircle(0, 20, 135, 'red'));
    table.appendChild(getCircle(1, 100, 40, 'red'));
    table.appendChild(getCircle(2, 175, 40, 'red'));
    table.appendChild(getCircle(3, 250, 40, 'red'));

    table.appendChild(getCircle(4, 100, 90, 'violet'));
    table.appendChild(getCircle(5, 135, 90, 'orange'));
    table.appendChild(getCircle(6, 175, 90, 'violet'));
    table.appendChild(getCircle(7, 215, 90, 'orange'));
    table.appendChild(getCircle(8, 250, 90, 'violet'));

    table.appendChild(getCircle(9, 100, 135, 'red'));
    table.appendChild(getCircle(10, 175, 135, 'red'));
    table.appendChild(getCircle(11, 250, 135, 'red'));

    table.appendChild(getCircle(12, 100, 190, 'violet'));
    table.appendChild(getCircle(13, 135, 190, 'orange'));
    table.appendChild(getCircle(14, 175, 190, 'violet'));
    table.appendChild(getCircle(15, 215, 190, 'orange'));
    table.appendChild(getCircle(16, 250, 190, 'violet'));

    table.appendChild(getCircle(17, 100, 235, 'red'));
    table.appendChild(getCircle(18, 175, 235, 'red'));
    table.appendChild(getCircle(19, 250, 235, 'red'));

    table.appendChild(getCircle(20, 100, 290, 'green'));
    table.appendChild(getCircle(21, 135, 290, 'blue'));
    table.appendChild(getCircle(22, 175, 290, 'green'));
    table.appendChild(getCircle(23, 215, 290, 'blue'));
    table.appendChild(getCircle(24, 250, 290, 'green'));

}
var positionMouse = function(element, event) {
   var x = event.pageX - document.getElementById(element).offsetLeft;
    var y = event.pageY - document.getElementById(element).offsetTop;

    if(element === 'div') {
        document.getElementById('DivX').value = x;
        document.getElementById('DivY').value = y;
    }

    if(element === 'table') {
        document.getElementById('TableX').value = x;
        document.getElementById('TableY').value = y;
    }

    if(element === 'row3') {
        document.getElementById('RowX3').value = x;
        document.getElementById('RowY3').value = y;
    }

    if(element === 'row2') {
        document.getElementById('RowX2').value = x;
        document.getElementById('RowY2').value = y;
    }

    if(element === 'row1') {
        document.getElementById('RowX1').value = x;
        document.getElementById('RowY1').value = y;
    }

};



/*
var dimensionElement = function(element) {
    if(element === 'div') {
        document.getElementById('DivX').value = document.getElementById(element).offsetWidth;
        document.getElementById('DivY').value = document.getElementById(element).offsetHeight;
    }

    if(element === 'table') {
        document.getElementById('TableX').value = document.getElementById(element).offsetWidth;
        document.getElementById('TableY').value = document.getElementById(element).offsetHeight;
    }

    if(element === 'row3') {
        document.getElementById('RowX3').value = document.getElementById(element).offsetWidth;
        document.getElementById('RowY3').value = document.getElementById(element).offsetHeight;
    }

    if(element === 'row2') {
        document.getElementById('RowX2').value = document.getElementById(element).offsetWidth;
        document.getElementById('RowY2').value = document.getElementById(element).offsetHeight;
    }

     if(element === 'row1') {
        document.getElementById('RowX1').value = document.getElementById(element).offsetWidth;
        document.getElementById('RowY1').value = document.getElementById(element).offsetHeight;
    }
}
*/
