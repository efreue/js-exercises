var Config = {
    rows: 3,
    cols: 12,
    width: 100,
    height: 100
};

var Dom = {
    createElement: function(type, cssClass, clickCallBack) {
        var element = document.createElement(type);
        if(cssClass) {
            element.className = cssClass;
        }

        if (clickCallBack) {
            element.onclick = clickCallBack;
        }
        return element;
    }
};

var Table = {
    create: function(rows, columns) {
        var table = Dom.createElement('table');
        for (var i = rows; i >= 1; i--) {
            table.appendChild(
                Table.addRow(i, columns - 1)
            );
        }
        return table;
    },
    addRow: function(numberRow, number) {
        var tr = Dom.createElement('tr');
        if (numberRow === Config.rows) {
            tr.appendChild(
                Board.addFirstColumn('cells', 0)
            );
        }
        for (var i = 0; i <= number; i++) {
            tr.appendChild(
                Table.addCell(numberRow)
            );
            numberRow += 3;
        }
        return tr;
    },
    addCell: function(number) {
        var td = Dom.createElement('td', 'cells');
        td.appendChild(
            getCircle(number)
        );
        td.style.width = (Config.width) + 'px';
        td.style.height = (Config.height) + 'px';
        return td;
    }
};

var getCircle = function(number) {
    var circle = Dom.createElement('div');
    circle.className = "shape num-white " + getColor(number);
    circle.textContent = number;
    circle.style.width = (Config.width - (Config.width/4)) + 'px'
    circle.style.height = (Config.height - (Config.height/4)) + 'px'
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
    create: function() {
        var divContent = Dom.createElement('div', 'container-div');
        var element = Table.create(Config.rows, Config.cols);
        divContent.appendChild(element);
        divContent.style.width = (Config.width * Config.Cols) + 'px';
        divContent.style.height = (Config.height * Config.rows) + 'px';
        document.body.appendChild(divContent);
    },
    addFirstColumn: function(cssClass, number) {
        var td = Table.addCell(number);
        td.setAttribute('rowspan', Config.rows);
        return td;
    }
};

window.addEventListener('load', Board.create);
