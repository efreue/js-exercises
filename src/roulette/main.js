var Config = {
    rows: 3,
    cols: 12,
    width: '100px',
    height: '100px'
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
    create: function(rows, columns, cssClass, callback) {
        var table = Dom.createElement(
            'table',
            cssClass,
            callback
        );
        var tr = Rows.create();
        table.appendChild(
            tr.appendChild(
                FirstColumn.create('cells', 0)
            )
        );
        for (var i = rows; i >= 1; i--) {
            table.appendChild(
                Rows.getRows(i, columns - 1)
            );
        }
    }
};

var Rows = {
    create: function() {
        return Dom.createElement('tr');
    },
    getRows: function(numberRow, number) {
        var tr = Rows.create();
        for (var i = 0; i <= number; i++) {
            tr.appendChild(
                Rows.getCell(numberRow)
            );
            numberRow += 3;
        }
        return tr;
    },
    getCell: function(number) {
        var td = Dom.createElement('td');
        td.appendChild(
            getCircle(number)
        );
        td.style.width = Config.width;
        td.style.height = Config.height;
        return td;
    }
};

var FirstColumn = {
    create: function(cssClass, number) {
        var th = Dom.createElement('th', cssClass);
        th.setAttribute('rowspan', Config.rows);
        th.appendChild(
            getCircle(number)
        );
        th.style.width = Config.width;
        th.style.height = Config.height;
        return th;
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
        divContent.style.width = Config.width;
        divContent.style.height = Config.height;
        document.body.appendChild(divContent);
    }
};

window.addEventListener('load', Board.create);
