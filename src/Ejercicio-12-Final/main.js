var Config = {
    cellWidth: 50,
    cellHeight: 50,
    chipWidth: 35,
    chipHeight: 35,
    rows: 3,
    cols: 12,
    substractChip: 0
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
    createCell: function(numberCol) {
        var td;
        td = Dom.createElement(
                'td',
                'container-cell',
                function(e){
                    var boardCoords = Board.toBoardCoords(
                        Utils.getCoordsFromEvent(e)
                    );
                    if(e.ctrlKey) {
                        Config.substractChip = 1;
                    }
                    else {
                        Config.substractChip = 0;
                    }
                    Chip.add(boardCoords.row, boardCoords.column);
                }
            );
        if (numberCol == 0) {
            td.setAttribute('rowspan', 3);
        }
        td.appendChild(getCircle(numberCol));
        return td;
    },
    createRow: function(numberRow, numberCells) {
        var tr = Dom.createElement('tr');
        if (numberRow == 3) {
            tr.appendChild(
                Dom.createCell(0)
            );
        }

        for(var i = 0; i <= numberCells; i++) {
            tr.appendChild(
                Dom.createCell(numberRow)
            );
            numberRow += 3;
        }
        return tr;
    }
};

var Utils = {
    getCoordsFromEvent: function(e) {
        return {
            x: e.clientX - Board.element.offsetLeft,
            y: e.clientY - Board.element.offsetTop
        };
    }
};

var Chip = {
    create: function() {
        return {
            element: Dom.createElement('div', 'circle', function(e) {
                var boardCoords = Board.toBoardCoords(
                    Utils.getCoordsFromEvent(e)
                );
                if(e.ctrlKey) {
                    Config.substractChip = 1;
                }
                else {
                    Config.substractChip = 0;
                }
                Chip.add(boardCoords.row, boardCoords.column);
            }),
            number: 0
        };
    },
    update: function(chip) {
        chip.element.textContent = chip.number;
    },
    increment: function(chip) {
        chip.number++;
        Chip.update(chip);
    },
    decrement: function(chip) {
        chip.number--;
        Chip.update(chip);
    },
    move: function(chip, row, col) {
        var marginLeft = (Config.cellWidth - Config.chipWidth);
        var marginTop = (Config.cellHeight - Config.chipHeight);
        chip.element.style.top = (row * Config.cellHeight) + marginTop;
        chip.element.style.left = (col * Config.cellWidth) + marginLeft;
    },
    add: function(row, col) {
        var chip = Board.chips[row][col];
        if(!chip) {
            chip = Chip.create();
            Board.addChip(row, col, chip);
        }
        if (Config.substractChip === 1) {
            if (chip.number > 1)  {
                Chip.decrement(chip);
            }
            else {
                Chip.delete(chip, row, col);
                Board.addChip(row, col, undefined);
            }
        }
        else {
            Chip.increment(chip);
        }
        Chip.move(chip, row, col);
    },
    delete: function(chipDel, row, column) {
        chipDel.element.parentElement.removeChild(chipDel.element);
    }
};

var Board = {
    chips: [],
    addChip: function(row, col, chip) {
        Board.chips[row][col] = chip;
        document.body.appendChild(chip.element);
    },
    toBoardCoords: function(absoluteCoords) {
        return {
            row: Math.floor(absoluteCoords.y / Config.cellHeight),
            column: Math.floor(absoluteCoords.x / Config.cellWidth)
        };
    },
    create: function() {
        var divContent = Dom.createElement('div', 'container-div');
        Board.element = Dom.createTable(Config.rows, Config.cols);
        divContent.appendChild(Board.element);
        document.body.appendChild(divContent);
         for(var i = 0; i < Config.rows; i++) {
            Board.chips.push(new Array(Config.cols));
        }
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

window.addEventListener('load', Board.create);
