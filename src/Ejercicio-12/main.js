getColorForNumber = function(number) {
    var color = '';
    if(number == 0) {
        color = 'green';
    }
    else if(number % 2 == 0) {
        if((number <= 10) || (number >= 20 && number <= 28)) {
            color = 'black';
        }
        else {
            color = 'red';
        }
    }
    else if ((number <= 9) || (number >= 19 && number <= 27)) {
        color = 'red';
    }
    else {
		color = 'black';
	}

    return color;
};

var getObject = function(name) {
    return document.createElement(name);
};

var getCircle = function(number, callback) {
    var circle = getObject('div');

    circle.className = "shape";
    circle.className += " " + callback(number);
    circle.className += " num-white";
    circle.className += " horizontal-centered-text";
    circle.textContent = number;

    if(number == 0) {
        circle.className += " border-disappear";
    }

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
    table.className = "container-board";
    return table;
}

var getRuletteContent = function() {
    var divContent = getObject('div');
    divContent.className = "container-roulette";
    return divContent;
};

var showElement = function(element) {
    document.body.appendChild(element);
};

var createCell = function(numCell) {
    return getCell (
        numCell,
        getCircle(numCell, getColorForNumber)
    )
};

var createRow = function(NumberRow, numberCells) {
    var tableRow = getRow();
    var increase = 3;
    var cellValue = 0;

    if (NumberRow == 0 ) {
        tableRow.appendChild(
            createCell(cellValue)
        )
        cellValue = 3;
    }
    else if (NumberRow == 1) {
        cellValue = 2;
    }
    else {
        cellValue = 1;
    }

    for(var i = 0; i <= numberCells; i++ ) {
        tableRow.appendChild(
            createCell(cellValue)
        );
        cellValue += increase;
    }
    return tableRow;
}

var start = function() {
    var ruletteContent = getRuletteContent();
    var table = getTable();

    for (var i = 0; i <= 2; i++) {
        table.appendChild(
            createRow(i, 11)
        );
    }

    ruletteContent.appendChild(table);
    showElement(ruletteContent);
};

window.addEventListener("load", start);
