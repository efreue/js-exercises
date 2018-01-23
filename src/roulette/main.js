var Config = {
    rows: 3,
    cols: 12,
    width: 100,
    height: 100,
    top: 60,
    left: 20,
    borderCircle: 3
};

var Utils = {
    getCoordsFromEvent: function(e) {
        return {
            x: e.clientX - (Board.element.offsetLeft),
            y: e.clientY - (Board.element.offsetTop)
        };
    }
};

var Dom = {
    createElement: function(type, cssClass, clickCallBack) {
        var element = document.createElement(type);
        if (cssClass) {
            element.className = cssClass;
        }

        if (clickCallBack) {
            element.onclick = clickCallBack;
        }
        return element;
    },
    createTable: function(rows, cols, clickCallback){
        var table = Dom.createElement(
            'table',
            'hand',
            function(e) {
                clickCallback(e);
            }
        );
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
            'cells'
        );
    },
    createRow: function(numberRow, numberCells) {
        var tr = Dom.createElement('tr');
        if (numberRow == 3) {
            tr.appendChild(
                Cells.addFirstColumn()
            );
        }

        for (var i = 0; i <= numberCells; i++) {
            tr.appendChild(
                Cells.add(numberRow)
            );
            numberRow += 3;
        }
        return tr;
    }
};

var Cells = {
    addFirstColumn: function() {
        var td = Cells.create();
        td.setAttribute('rowspan', 3);
        td.appendChild(Circle.add(0));
        return td;
    },
    add: function(numberCell) {
        var td = Cells.create();
        td.appendChild(Circle.add(numberCell));
        return td;
    },
    create: function() {
        var element = Dom.createCell();
        var sizeCell = Cells.getSize();
        element.style.width = (sizeCell.width + 'px');
        element.style.height = (sizeCell.height + 'px');
        return element;
    },
    getSize: function() {
		return {
            width: Config.width,
            height: Config.height
        };
    }
};

var Circle = {
    add: function(number) {
        var circle = Dom.createElement('div');
        var sizeCircle = Circle.getSize();

        circle.className = "shape num-white horizontal-centered-text " + getColor(number);
        circle.textContent = number;
    
        if (number == 0) {
            circle.style.border = (Config.borderCircle + 'px  solid');
        }
        circle.style.width = (sizeCircle.width + 'px');
        circle.style.height = (sizeCircle.height+ 'px');
        return circle;
    },
    getSize: function() {
		return {
            width: (Config.width - (Config.width / 4)),
            height: (Config.height - (Config.height / 4))
        };
    }
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


var Player = {
    bettingChip: function(ev) {
        var positionBoard = Board.getPosition(ev);
    }
};

var Board = {
    getPosition: function(ev) {
        var boardCoords = Board.toBoardCoords(
            Utils.getCoordsFromEvent(ev)
        );
        return boardCoords;
    },
    toBoardCoords: function(absoluteCoords) {
        return {
            coordCol: absoluteCoords.x,
            coordRow: absoluteCoords.y
        };
    },
    create: function() {
        var content = Dom.createElement('div', 'container-board');
        Board.element = Dom.createTable(Config.rows, Config.cols, Player.bettingChip);
        content.style.top = (Config.top + 'px');
        content.style.left = (Config.left + 'px');
        content.appendChild(Board.element);
        document.body.appendChild(content);
    }    
};

window.addEventListener('load', Board.create);