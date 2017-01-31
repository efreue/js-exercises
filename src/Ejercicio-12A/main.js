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

var getCircle = function(id, posLeft, posTop) {
    var circle = createElement('div');
    circle.id = id;
    circle.className = "shape red ";
    circle.style.left = posLeft + "px";
    circle.style.top = posTop + "px";
    return circle;
};

var addBall = function() {
    var table = document.getElementById('table');
    table.appendChild(getCircle(0, 20,150));
    table.appendChild(getCircle(1, 100,40));
    table.appendChild(getCircle(2, 175,40));
    table.appendChild(getCircle(3, 250,40));

    table.appendChild(getCircle(4, 255,90));
    table.appendChild(getCircle(5, 212,90));

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
