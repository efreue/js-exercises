var Config = {
    rows: 3,
    cols: 13,
    width: 100,
    height: 100,
    top: 80,
    left: 30,
	borderCircle: 3
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
                Board.addFirstColumn( 0, numberColumn, numberRow)
            );
        }
		numberRow = Config.rows - (numberRow - 1);
        for (var i = 0; i < numberColumn; i++) {
            tr.appendChild(
                Table.addCell(numberCircle, i, numberRow, false)
            );
            numberCircle += 3;
        }
        return tr;
    },
    addCell: function (numberCircle, numberCol, numberRow, isFirstColumn) {
        var td = Dom.createElement('td', 'cells');
		var sizeTd = Table.getSize();
        td.appendChild(
            Circle.getElement(numberCircle, numberCol, numberRow, sizeTd.width, sizeTd.height, isFirstColumn)
        );
        td.style.width = (sizeTd.width + 'px');
        td.style.height = (sizeTd.height + 'px');
        return td;
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
		circle.className = "shape num-white " + getColor(number);
		circle.style.border = (Config.borderCircle + 'px  solid');
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
	getElement: function(number, numberCol, numberRow, widthCell, heightCell, isFirstColumn) {
		var circle = Circle.add(number);
        var sizeCircle = Circle.getSize();
		var borderCircle = Circle.getBorder();
		var positionCircle = getPositionCentered(numberCol, numberRow, widthCell, heightCell, sizeCircle, borderCircle, isFirstColumn);
		circle.style.width = (sizeCircle.width + 'px');
		circle.style.height = (sizeCircle.height + 'px');
		circle.style.top = (positionCircle.top + 'px');
		circle.style.left = (positionCircle.left + 'px');
		return circle;
	}
};

var Chip = {
    create: function () {
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
    }
};

var getPositionCentered = function(numberCol, numberRow, widthCell, heightCell, sizeElement, borderElement, isFirstColumn) {
	var x;
	var y;
	if (isFirstColumn) {
		y = ((((numberRow * heightCell)) / 2) - (sizeElement.height / 2));
		x = (widthCell / 2) - (sizeElement.width / 2) - borderElement;
	} else {
		y = ((numberRow * heightCell) - (heightCell / 2) - (sizeElement.height / 2));
		x = widthCell + (((numberCol + 1) * widthCell) - (widthCell / 2) - (sizeElement.width / 2) - borderElement);
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
    create: function () {
        var divContent = Dom.createElement('div', 'container-div');
        var element = Table.create(Config.rows, Config.cols);
        var chip = Chip.create();
        chip.element.style.top = '10px';  /*sacar*/
        chip.element.style.left = '30px'; /*sacar*/
        chip.element.textContent = '1';  /*sacar*/
        divContent.appendChild(element);
        divContent.appendChild(chip.element); /*sacar*/
        divContent.style.width = ((Config.width * Config.cols) + 'px');
        divContent.style.height = ((Config.height * Config.rows) + 'px');
        divContent.style.top = (Config.top + 'px');
        divContent.style.left = (Config.left + 'px');
        document.body.appendChild(divContent);

    },
    addFirstColumn: function (numberCircle, numberCol, numberRow) {
		var td = Table.addCell(numberCircle, numberCol, numberRow, true);
	    td.setAttribute('rowspan', Config.rows);
        return td;
    }
};

window.addEventListener('load', Board.create);
