var Config = {
    rows: 3,
    cols: 13,
    width: 100,
    height: 100,
    top: 70,
    left: 30,
    borderCircle: 3,
    paddingContainer: 20
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
    }
};

var Table = {
    create: function(rows, columns) {
        var table = Dom.createElement(
			'table',
			'hand'
		);
        for (var i = rows; i >= 1; i--) {
            table.appendChild(
                Table.addRow(i, columns - 1)
            );
        }
        return table;
    },
    addRow: function(row, col) {
        var tr = Dom.createElement('tr');
        var number = row;
        if (row === Config.rows) {
            tr.appendChild(
                Board.addFirstColumn( 0, col, row)
            );
        }
		row = Config.rows - (row - 1);
        for (var i = 0; i < col; i++) {
            tr.appendChild(
                Table.addCell(number, i, row, false)
            );
            number += 3;
        }
        return tr;
    },
    addCell: function(number, col, row, isFirstColumn) {
        var td = Dom.createElement('td', 'cells');
		var sizeCell = Table.getSizeCell();
        td.appendChild(
            Table.getCircle(number, col, row, isFirstColumn, Circle.add)
        );
        Table.setSizeCell(td, sizeCell);
        return td;
    },
	getSizeCell: function() {
		return {
			width: Config.width,
			height: Config.height
		};
	},
    setSizeCell: function(element, size) {
        element.style.width = (size.width + 'px');
        element.style.height = (size.height + 'px');
    },
    getCircle: function(number, col, row, isFirstColumn, callback) {
        var element = callback(number);
        var innerElement = {
            size: Circle.getSize(),
            border: Circle.getBorder()                        
        };
        var outerElement = {
           size: Table.getSizeCell()                       
        }; 
		var positionCircle = getCenteredPosition(col, row, outerElement, innerElement, isFirstColumn);
        Circle.setSize(element, innerElement.size);
        Circle.setPosition(element, positionCircle);
		return element;
    }
};

var Circle = {
	add: function(number) {
		var circle = Dom.createElement('div');
		circle.className = "shape num-white " + getColor(number);
		circle.style.border = (Circle.getBorder() + 'px  solid');
		circle.textContent = number;
        return circle;
	},
    getSize: function() {
		return {
            width: (Config.width - (Config.width / 4)),
            height: (Config.height - (Config.height / 4))
        };
    },
	getBorder: function() {
		return Config.borderCircle;
	},
    setSize: function(element, size) {
        element.style.width = (size.width + 'px');
		element.style.height = (size.height + 'px');

    },
    setPosition: function(element, position) {
		element.style.top = (position.top + 'px');
		element.style.left = (position.left + 'px');
    }
};

var Casino = {
	getPositionChip: function(ev) {
		var positionBoard = Board.getPosition(ev);
	}
};

var Player = {
	addChip: function(element) {
		Chip.increment(element);
	},
	removeChip: function(element) {
		Chip.decrement(element);
	}
};

var Chip = {
    create: function() {
        return {
            element: Dom.createElement(
                'div',
                'chip-circle'
            ),
            number: 0
        };
    },
	getSize: function() {
         return {
            width: ((Config.width - (Config.width / 4)) / 2),
            height: ((Config.height - (Config.height / 4)) / 2)
        };
    },
	increment: function(chip) {
        chip.number++;
        Chip.update(chip);
    },
	decrement: function(chip) {
        chip.number--;
        Chip.update(chip);
    },
	update: function(chip) {
        chip.element.textContent = chip.number;
    }
};

var getCenteredPosition = function(col, row, outerElement, innerElement, isFirstColumn) {
	var x;
    var y;    
	if (isFirstColumn) {
		y = ((((row * outerElement.size.height)) / 2) - (innerElement.size.height / 2)) + Config.paddingContainer;
		x = (outerElement.size.width / 2) - (innerElement.size.width / 2) - innerElement.border + Config.paddingContainer;
	} else {
		y = ((row * outerElement.size.height) - (outerElement.size.height / 2) - (innerElement.size.height / 2)) + Config.paddingContainer;
		x = outerElement.size.width + (((col + 1) * outerElement.size.width) - (outerElement.size.width / 2) - (innerElement.size.width / 2) - innerElement.border) + Config.paddingContainer;
	}
	return {
		left: x,
		top: y
	};
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
/*
var casino
//el jugador agrega fichas, quita fichas en el board
var Player = {
};
//create, increment, decrement, deleted,
var Chip = {

};

var virtualTable = {

};
*/

var Board = {
    create: function() {
        var divContent = Dom.createElement('div', 'container-div', Casino.getPositionChip);
        divContent.style.padding = (Board.getPaddingContainer() + 'px');
        Board.element = Table.create(Config.rows, Config.cols);
        var chip = Chip.create();
        chip.element.style.top = '10px';  /*sacar*/
        chip.element.style.left = '30px'; /*sacar*/
        chip.element.textContent = '1';  /*sacar*/
        divContent.appendChild(Board.element);
        divContent.appendChild(chip.element); /*sacar*/
        divContent.style.width = ((Config.width * Config.cols) + 'px');
        divContent.style.height = ((Config.height * Config.rows) + 'px');
        divContent.style.top = (Config.top + 'px');
        divContent.style.left = (Config.left + 'px');
        document.body.appendChild(divContent);
    },
    addFirstColumn: function (number, col, row) {
		var td = Table.addCell(number, col, row, true);
	    td.setAttribute('rowspan', Config.rows);
        return td;
    },
	getPosition: function(ev) {
		return Utils.getCoordsFromEvent(ev);
    },
    getPaddingContainer: function() {
		return Config.paddingContainer;
	}
};

var Utils = {
    getCoordsFromEvent: function(e) {
        return {
            x: e.clientX - (Board.element.offsetLeft),
            y: e.clientY - (Board.element.offsetTop)
        };
    }
};

window.addEventListener('load', Board.create);
