var Config = {
    cellWidthHeigth: 50,
    cellQuarter: 12.5,
    rows: 3,
    cols: 12,
    rowsAux: 6,
    colsAux: 36
};

var Dom = {
    createElement: function(type, cssClass, clickCallback) {
        var element = document.createElement(type);
        element.className = cssClass;
        if(clickCallback) {
            element.onclick = clickCallback;
        }
        return element;
    },
    createTable: function(rows, cols){
        var table = Dom.createElement('table');
        for (var i = rows; i >= 1; i--) {
            table.appendChild(
                Dom.createRow(i, cols - 1)
            );
        }
        return table;
    },
    createCell: function() {
        return Dom.createElement(
            'td',
            'container-cell'
        );
    },
    getColumnCero: function(numberCell) {
        var td = Dom.createCell();
        td.setAttribute('rowspan', 3);
        td.appendChild(getCircle(numberCell));
        return td;
    },
    getCell: function(numberCell) {
        var td = Dom.createCell();
        td.appendChild(getCircle(numberCell));
        return td;
    },
    createRow: function(numberRow, numberCells) {
        var tr = Dom.createElement('tr');
        if (numberRow == 3) {
            tr.appendChild(
                Dom.getColumnCero(0)
            );
        }

        for(var i = 0; i <= numberCells; i++) {
            tr.appendChild(
                Dom.getCell(numberRow)
            );
            numberRow += 3;
        }
        return tr;
    }
};

var getCircle = function(number) {
    var circle = Dom.createElement('div');
    circle.className = "shape num-white horizontal-centered-text " + getColor(number);
    circle.textContent = number;

    if(number == 0) {
        circle.className += " border-disappear";
    }
    return circle;
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

var Board = {
    chips: [],
    create: function() {
        var divContent = Dom.createElement('div', 'container-div');
        Board.element = Dom.createTable(Config.rows, Config.cols);
        divContent.appendChild(Board.element);
        document.body.appendChild(divContent);
        for(var i = 0; i < Config.rowsAux; i++) {
            Board.chips.push(new Array(Config.colsAux));
        }
    }
};

window.addEventListener('load', Board.create);
