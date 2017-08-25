var Config = {
    cellWidthHeigth: 100,
    cellQuarter: 25,
    rows: 3,
    cols: 12,
    rowsAux: 6,
    colsAux: 36
};

var Dom = {
    createElement: function(type, cssClass, clickCallback) {
        var element = document.createElement(type);
        element.className = cssClass;
        if (clickCallback) {
            element.onclick = clickCallback;
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
            'container-cell'
        );
    },
    getColumnCero: function(numberCell) {
        var td = Dom.createCell();
        td.setAttribute('rowspan', 3);
        td.appendChild(getCircle(numberCell));
        return td;
    },
    getCell: function(numberCell) {
        var td = Dom.createCell();
        td.appendChild(getCircle(numberCell));
        return td;
    },
    createRow: function(numberRow, numberCells) {
        var tr = Dom.createElement('tr');
        if (numberRow == 3) {
            tr.appendChild(
                Dom.getColumnCero(0)
            );
        }

        for (var i = 0; i <= numberCells; i++) {
            tr.appendChild(
                Dom.getCell(numberRow)
            );
            numberRow += 3;
        }
        return tr;
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

var getCircle = function(number) {
    var circle = Dom.createElement('div');
    circle.className = "shape num-white horizontal-centered-text " + getColor(number);
    circle.textContent = number;

    if (number == 0) {
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

var Chip = {
    define: function(ev) {
        var position = Cells.getPosition(ev);
        var cell = Cells.getCell(position.coordCol, position.coordRow)
        var chip = Board.chips[cell.row][cell.col];
        if (!chip) {
            chip = Chip.create();
            Chip.add(chip, cell, position);
            Chip.show(chip, position);
        }
        if (ev.ctrlKey) {
            if (chip.number > 1) {
                Chip.decrement(chip);
            }
            else {
                Chip.delete(chip);
                Chip.add(null, cell, position);
            }
        }
        else {
            Chip.increment(chip);
        }
    },
    add: function(chip, cell, position) {
        Board.addChip(cell.row, cell.col, chip);
    },
    create: function() {
        return {
            element: Dom.createElement(
                'div',
                'circle',
                function(e) {
                    Chip.define(e);
                }
            ),
            number: 0
        }
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
    },
    delete: function(chipDel) {
        chipDel.element.parentElement.removeChild(chipDel.element);
    },
    show: function(chip, position) {
            chip.element.style.top = position.coordRow;
            chip.element.style.left = position.coordCol;
    }
};

var Cells = {
    getCell: function(coordCol, coordRow) {
        var col = Math.floor(coordCol / Config.cellQuarter);
        var row = Math.floor(coordRow / (Config.cellQuarter * 2));
        return {
            row: row,
            col: col
        };
    },
    getPosition: function(ev) {
        var positionBoard = Board.getPosition(ev);
        var limitCellCol =  Cells.getLimitCol(positionBoard);
        var limitCellRow =  Cells.getLimitRow(positionBoard);
        var coordCol = (limitCellCol.minCellCol + limitCellCol.maxCellCol) / 2;
        var coordRow = (limitCellRow.minCellRow + limitCellRow.maxCellRow) / 2;

        if (coordCol <= (Config.cellQuarter * 2)) {
            coordRow =  ((Config.cellWidthHeigth * 2) + Config.cellWidthHeigth)/2;
            coordCol = ((Config.cellWidthHeigth) / 2);
        }
        return {
            coordRow: coordRow,
            coordCol: coordCol
        };
     },
    getLimitCol: function(positionBoard) {
        var minCellColAux;
        var maxCellColAux;
        var col = Math.floor(positionBoard.coordCol / Config.cellWidthHeigth);
        var minCellCol = (col * Config.cellWidthHeigth);
        var maxCellCol = (minCellCol + Config.cellWidthHeigth);

        if (minCellCol <= positionBoard.coordCol) {
            if ((minCellCol + Config.cellQuarter) <= positionBoard.coordCol) {
                if ((maxCellCol - Config.cellQuarter) <= positionBoard.coordCol) {
                    minCellColAux = (maxCellCol - Config.cellQuarter);
                    maxCellColAux = (maxCellCol + Config.cellQuarter);
                }
                else {
                    minCellColAux = (minCellCol + Config.cellQuarter);
                    maxCellColAux = (maxCellCol - Config.cellQuarter);
                }
            }
            else {
                minCellColAux = (minCellCol -  Config.cellQuarter);
                maxCellColAux = (minCellCol + Config.cellQuarter);
            }
        }
        return {
            minCellCol: minCellColAux + 20,
            maxCellCol: maxCellColAux + 20
        };
    },
    getLimitRow: function(positionBoard) {
        var minCellRowAux;
        var maxCellRowAux;
        var row = Math.floor(positionBoard.coordRow / Config.cellWidthHeigth);
        var minCellRow = (row * Config.cellWidthHeigth);
        var maxCellRow = (minCellRow + Config.cellWidthHeigth);

         if (minCellRow <= positionBoard.coordRow) {
            if ((minCellRow + Config.cellQuarter) <= positionBoard.coordRow) {
                if ((maxCellRow - Config.cellQuarter) <= positionBoard.coordRow) {
                    minCellRowAux = (maxCellRow - Config.cellQuarter);
                    maxCellRowAux = (maxCellRow + Config.cellQuarter);
                }
                else {
                    minCellRowAux = (minCellRow + Config.cellQuarter);
                    maxCellRowAux = (maxCellRow - Config.cellQuarter);
                }
            }
            else {
                minCellRowAux = (minCellRow -  Config.cellQuarter);
                maxCellRowAux = (minCellRow + Config.cellQuarter);
            }
        }
        return {
            minCellRow: minCellRowAux + 20,
            maxCellRow: maxCellRowAux + 20
        };
    }
};

var Board = {
    chips: [],
    addChip: function(row, col, chip) {
        Board.chips[row][col] = chip;
        if (chip != null) {
            document.body.appendChild(chip.element);
        }
    },
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
        var divContent = Dom.createElement('div', 'container-div');
        Board.element = Dom.createTable(Config.rows, Config.cols, Chip.define);
        divContent.appendChild(Board.element);
        document.body.appendChild(divContent);
        for (var i = 0; i <= Config.rowsAux; i++) {
            Board.chips.push(new Array(Config.colsAux));
        }
    }
};

window.addEventListener('load', Board.create);
