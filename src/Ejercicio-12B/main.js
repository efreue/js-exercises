var createElement = function(name) {
    return document.createElement(name);
};

var positionMouse = function(element, e) {
    var x = e.clientX - 40;
    var y = e.clientY - 90;
    //    console.log("x = " + x + " y = " + y);

};

var rangeTdSelected = function(startLeft, endLeft, startTop, endTop) {
    this.startLeft = startLeft;
    this.endLeft = endLeft;
    this.startTop = startTop;
    this.endTop = endTop;
}

var generateTableAux = function(tdWidth, tdHeight, cols, rows) {
    var halfTdWidth = tdWidth * 0.5;
    var quarterTdWidth = tdWidth * 0.25;
    var halfTdHeigth = tdHeight * 0.5;

    var colsNew = (cols * 2) - 3;
    var rowsNew = (rows * 2);
    var minTdLeft = tdWidth + quarterTdWidth;
    var minTdTop = tdHeight * 0.25;
    //console.log('minTdLeft = ' + minTdLeft + ' minTdTop = ' + minTdTop + ' colsNew = ' + colsNew + ' rowsNew = ' + rowsNew);
    var TotCell = (colsNew * rowsNew) - 1;
    var startL = 0;
    var startT = 0;
    /*
    for(var i = 0; i <= TotCell; i++) {
        if
    }
    */
}

var createCell = function(numCell) {
    var td = createElement('td');
    if (numCell == 0) {
        td.setAttribute('rowspan', 4);
    }
    td.className = "container-board";
    td.appendChild(getCircle(numCell));
    td.id = numCell;
    td.onclick = function(e){
        positionMouse(this.id, e);
    };
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

        divContent.className = "container-roulette";
        table.appendChild(createZeroRow());

        for (var i = 3; i >= 1; i--) {
            table.appendChild(
                createColourRow(i, 11)
            );
        }
        divContent.appendChild(table);
        generateTableAux(50, 100, 13, 3);
        document.body.appendChild(divContent);
    }
);
