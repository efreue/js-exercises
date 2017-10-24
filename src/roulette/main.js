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
        td.appendChild(
            getCircle(numberCircle, numberCol, numberRow, isFirstColumn)
        );
        td.style.width = (Config.width + 'px');
        td.style.height = (Config.height + 'px');
        return td;
    }
};

var getCircle = function (number, numberCol, numberRow, isFirstColumn) {
    var circle = Dom.createElement('div');
	var positionCircle;
	var widthCircle = (Config.width - (Config.width / 4));
	var heightCircle = (Config.height - (Config.height / 4));
    circle.className = "shape num-white " + getColor(number);
    circle.style.border = (Config.borderCircle + 'px  solid');
	circle.textContent = number;
	circle.style.width = (widthCircle + 'px');
    circle.style.height = (heightCircle + 'px');
	positionCircle = getValueCentered(numberCol, numberRow, widthCircle, heightCircle, isFirstColumn);
    circle.style.top = (positionCircle.y + 'px');
    circle.style.left = (positionCircle.x + 'px');
    return circle;
};

var getValueCentered = function(numberCol, numberRow, widthElement, heightElement, isFirstColumn) {
	var x;
	var y;
	if (isFirstColumn) {
		y = ((((numberRow * Config.height)) / 2) - (heightElement / 2));
		x = (Config.width / 2) - (widthElement / 2) - Config.borderCircle;
	} else {
		y = ((numberRow * Config.height) - (Config.height / 2) - (heightElement / 2));
		x = Config.width + (((numberCol + 1) * Config.width) - (Config.width / 2) - (widthElement / 2) - Config.borderCircle);
	}
	return {
		x: x,
		y: y
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


var Board = {
    create: function () {
        var divContent = Dom.createElement('div', 'container-div');
        var element = Table.create(Config.rows, Config.cols);
        divContent.appendChild(element);
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
