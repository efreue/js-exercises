var start = function() {
    var divContent = createElement('div');
    var table = createElement('table');

    divContent.className = "container-roulette";
    table.className = "container-board green";

    for (var i = 0; i <= 2; i++) {
        table.appendChild(
            createRow(3-i, 11)
        );
    }
    divContent.appendChild(table);
    showElement(divContent);
};

var createRow = function(numberRow, numberCells) {
    var tr = createElement('tr');
    var value = 3 - numberRow;

    tr.className = "border-disappear";

    if (value == 0) {
        tr.appendChild(
            createCell(value)
        );
    }

    for(var i = 0; i <= numberCells; i++ ) {
        tr.appendChild(
            createCell(numberRow)
        );
        numberRow += 3;
    }
    return tr;
}

var createCell = function(numCell) {
    var td = createElement('td');

    td.className = "container-board";

    if (numCell == 0) {
        td.setAttribute('rowspan', 3);
    }
    td.appendChild(getCircle(numCell));
    return td;
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

var createElement = function(name) {
    return document.createElement(name);
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

var showElement = function(element) {
    document.body.appendChild(element);
};

window.addEventListener("load", start);
