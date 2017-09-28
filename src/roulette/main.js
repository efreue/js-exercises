var Config = {
    rows: 3,
    cols: 12,
    width: 100,
    height: 100,
    top: 30,
    left: 30
};

var Dom = {
    createElement: function (type, cssClass, clickCallBack) {
        var element = document.createElement(type);
        if (cssClass) {
            element.className = cssClass;
        }

        if (clickCallBack) {
            element.onclick = clickCallBack;
        }
        return element;
    }
};

var Table = {
    create: function (rows, columns) {
        var table = Dom.createElement('table');
        for (var i = rows; i >= 1; i--) {
            table.appendChild(
                Table.addRow(i, columns - 1)
            );
        }
        return table;
    },
    addRow: function (numberRow, numberColumn) {
        var tr = Dom.createElement('tr');
        var numberCircle = numberRow;
        if (numberRow === Config.rows) {
            tr.appendChild(
                Board.addFirstColumn('cells', 0)
            );
        }
        for (var i = 0; i <= numberColumn; i++) {
            tr.appendChild(
                Table.addCell(numberCircle)
            );
            numberCircle += 3;
        }
        return tr;
    },
    addCell: function (numberCircle) {
        var td = Dom.createElement('td', 'cells');
        td.appendChild(
            getCircle(numberCircle)
        );
        td.style.width = (Config.width + 'px');
        td.style.height = (Config.height + 'px');
        return td;
    }
};

var getCircle = function (number) {
    var circle = Dom.createElement('div');
    circle.className = "shape num-white " + getColor(number);
    circle.textContent = number;
    circle.style.width = ((Config.width - (Config.width / 4)) + 'px');
    circle.style.height = ((Config.height - (Config.height / 4)) + 'px');
    //circle.style.top = ((Config.top +  (Config.height / 2)) - (circle.offsetHeight / 2) + 'px');
    return circle;
};

var getColor = function (num) {
    var color = '';
    switch (num) {
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
    create: function () {
        var divContent = Dom.createElement('div', 'container-div');
        var element = Table.create(Config.rows, Config.cols);
        divContent.appendChild(element);
        divContent.style.width = ((Config.width * Config.Cols) + 'px');
        divContent.style.height = ((Config.height * Config.rows) + 'px');
        divContent.style.top = (Config.top + 'px');
        divContent.style.left =  (Config.left + 'px');
        document.body.appendChild(divContent);
    },
    addFirstColumn: function (cssClass, number) {
        var td = Table.addCell(number);
        td.setAttribute('rowspan', Config.rows);
        return td;
    }
};

window.addEventListener('load', Board.create);
