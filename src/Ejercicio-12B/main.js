var createElement = function(name) {
    return document.createElement(name);
};

var createCell = function(numCell) {
    var td = createElement('td');
    if (numCell == 0) {
        td.setAttribute('rowspan', 4);
    }
    td.className = "container-board";
    td.appendChild(getCircle(numCell));
    return td;
};

var createCellAux = function(numCell) {
    var td = createElement('td');

    td.className = "container-board-aux";
    td.style.width = 25;
    td.style.height = 32;
    return td;
};


var createColourRow = function(numberRow, numberCells) {
    var tr = createElement('tr');

    for(var i = 0; i <= numberCells; i++ ) {
        tr.appendChild(
            createCell(numberRow)
        );
        numberRow += 3;
    }
    return tr;
};

var createColourRowAux = function(numberRow, numberCells) {
    var tr = createElement('tr');

    for(var i = 0; i <= numberCells; i++ ) {
        tr.appendChild(
            createCellAux(numberRow)
        );
        numberRow += 3;
    }
    return tr;
};


var createZeroRow = function() {
    var tr = createElement('tr');
    tr.appendChild(
        createCell(0)
    );
    return tr;
};

var getColor = function(num) {
    var color = '';
    switch(num) {
        case 0:
            color = 'green';
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 9:
        case 12:
        case 14:
        case 16:
        case 18:
        case 19:
        case 21:
        case 23:
        case 25:
        case 32:
        case 27:
        case 30:
        case 34:
        case 36:
            color = 'red';
            break;
        default:
            color = 'black';
            break;
    }
    return color;
};

var getCircle = function(number) {
    var circle = createElement('div');

    circle.className = "shape num-white horizontal-centered-text " + getColor(number);
    circle.textContent = number;

    if(number == 0) {
        circle.className += " border-disappear";
    }
    return circle;
};

window.addEventListener(
    "load",
    function() {
        var divContent = createElement('div');
        var table = createElement('table');
        var tableAux = createElement('table');
        tableAux.id = 'tblAux';
        divContent.className = "container-roulette";
        table.appendChild(createZeroRow());

        for (var i = 3; i >= 1; i--) {
            table.appendChild(
                createColourRow(i, 11)
            );
        }

        for (var i = 6; i >= 1; i--) {
            tableAux.appendChild(
                createColourRowAux(i, 22)
            );
        }
        divContent.appendChild(table);
        divContent.appendChild(tableAux);
        document.body.appendChild(divContent);

        var tblA = document.getElementById('tblAux');
        tblA.style.position='absolute';
        tblA.style.left = tblA.offsetLeft + 78;
        tblA.style.top = 105;
    }
);


