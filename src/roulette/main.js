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
    circle.textContent = number;
    return circle;
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
