getColorForNumber = function(number) {
    var color = '';
    switch(number) {
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
        case 27:
        case 30:
        case 32:
        case 34:
        case 36:
            color = 'red';
            break;
        default:
            color = 'black';
    }
    return color;
};


var getObject = function(name) {
    return document.createElement(name);
};

var setClassName = function(element, className) {
    element.className += " " + className;
}

var getCircle = function(number, callback) {
    var circle = getObject('div');

    setClassName(circle, "shape");
    setClassName(circle, callback(number));
    setClassName(circle, "num-white");
    setClassName(circle, "horizontal-centered-text");

    circle.textContent = number;

    return circle;
};

var getCell = function(number, callback) {
    var tableCell = getObject('td');

    if (number == 0) {
        tableCell.setAttribute('rowspan', 3);
    }

    tableCell.className = "container-board";
    tableCell.appendChild(callback);
    return tableCell;
};

var getRow = function() {
        var row = getObject('tr');

        row.className = "container-board";
        row.className = "green";

        return row;
};

var getTable = function() {
    var table = getObject('table');
    table.setAttribute('id', 'board');
    table.className = "container-board";
    return table;
}

var getRuletteContent = function() {
    var divContent = getObject('div');
    divContent.setAttribute('id', 'roulette');
    divContent.className = "container-roulette";
    return divContent;
};

var showElement = function(element) {
    document.body.appendChild(element);
};

var loadCell = function(numCell) {
    return getCell (
        numCell,
        getCircle(numCell, getColorForNumber)
    )
};

var loadRow = function(NumberRow, NumberCells) {
    var tableRow = getRow();
    var cellValue = 0;
    if (NumberRow == 0) {
        tableRow.appendChild(
            loadCell(cellValue)
        )
    }
    for(var i = 0; i <= NumberCells; i++ ) {
        if (NumberRow == 0) {
            cellValue += 3;
        }
        if ( NumberRow == 1) {
            if (i == 0) {
                cellValue += 2;
            }
            else {
                cellValue += 3;
            }

        }
        if ( NumberRow == 2) {
            if (cellValue == 0) {
                cellValue += 1;
            }
            else {
                cellValue += 3;
            }

        }
        tableRow.appendChild(
            loadCell(cellValue)
        );
    }
    return tableRow;
}

var start = function() {
    var ruletteContent = getRuletteContent();
    var table = getTable();
    for (var i = 0; i <= 2; i++) {
        table.appendChild(
            loadRow(i, 11)
        );
    }
    ruletteContent.appendChild(table)
    showElement(ruletteContent);
};

window.addEventListener("load", start);
