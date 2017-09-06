var Config = {
    rows: 3,
    cols: 12
};
var Dom = {
    createElement: function(type, cssClass, clickCallBack) {
        var element = document.createElement(type);
        element.className = cssClass;
        if (clickCallBack) {
            element.onclick = clickCallBack;
        }
        return element;
    },
    createTable: function(rows, columns, cssClass, clickCallBack) {
        var table = Dom.createElement(
            'table',
            cssClass,
            function(e) {
                clickCallBack
            }
        );
        for (var i = rows; i >= 1; i--) {
            table.appendChild(
                Board.createRow(i, columns - 1)
            );
        }
        return table;
    },
    createRow: function() {
        return Dom.createElement('tr');
    },
    createCell: function(cssClass) {
        return Dom.createElement(
            'td',
            cssClass
        );
    }
};

var ColumnZero = {
    getCell: function(number) {
        var td = Dom.createCell('container-cell0');
        td.setAttribute('rowspan', 3);
        td.appendChild(
            getCircle(number)
        );
        return td
    }
}

var Board = {
    create: function() {
        var divContent = Dom.createElement('div', 'container-div');
        Board.element = Dom.createTable(Config.rows, Config.cols);
        divContent.appendChild(Board.element);
        document.body.appendChild(divContent);
     },
    createRow: function(numberRow, numberCells) {
        var tr = Dom.createRow();
        if (numberRow == 3) {
            tr.appendChild(
                ColumnZero.getCell(0)
            );
        }
        for (var i = 0; i <= numberCells; i++) {
            tr.appendChild(
                Board.getCell(numberRow)
            );
            numberRow += 3;
        }
        return tr;
    },
    getCell: function(number) {
        var td = Dom.createCell('container-cell');
        td.appendChild(
            getCircle(number)
        );
        return td;
    }
};

var getCircle = function(number) {
    var circle = Dom.createElement('div');
    circle.textContent = number;
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

window.addEventListener('load', Board.create);
