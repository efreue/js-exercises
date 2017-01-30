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


var changePositionFicha = function(event) {
    var ficha = document.getElementById("ficha");
    ficha.style.left = event.pageX + "px";
    ficha.style.top = event.pageY + "px";

}

var positionMouse = function(element, event) {
    var ficha = document.getElementById("ficha");
    var x = event.pageX - document.getElementById(element).offsetLeft;
    var y = event.pageY - document.getElementById(element).offsetTop;

    ficha.style.left = event.pageX + "px";
    ficha.style.top = event.pageY + "px";

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
