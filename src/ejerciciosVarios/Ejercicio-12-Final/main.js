var Config = {
    cellWidthHeigth: 50,
    cellQuarter: 12.5,
    rows: 3,
    cols: 12,
    rowsAux: 6,
    colsAux: 36,
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
                    Chip.add(boardCoords.coordRow, boardCoords.coordCol);
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
                Chip.add(boardCoords.coordRow, boardCoords.coordCol);
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
    move: function(chip, col, coordRow, coordCol) {
        var positionChip= Chip.newCalculatePosition(coordRow, coordCol);
        return positionChip;
    },
    add: function(coordRow, coordCol) {
        var position = Chip.newCalculatePosition(coordRow, coordCol);
        var setRowCol = TableAux.getCell(position.coordLeft, position.coordTop)
        var col = setRowCol.col;
        var row = setRowCol.row;

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
        Chip.showChip(
            chip,
            Chip.move(chip, col, coordRow, coordCol)
        );
    },
    delete: function(chipDel, row, column) {
        chipDel.element.parentElement.removeChild(chipDel.element);
    },
    newCalculatePosition: function(posLeft, posTop) {
        var moveTop = TableAux.getPositionCol(posTop) - 5;
        var moveLeft = TableAux.getPositionRow(posLeft) - 5;
        if(moveLeft <= 50) {
            moveTop = ((Config.cellWidthHeigth * 2) + Config.cellWidthHeigth)/2;
            moveLeft = ((Config.cellWidthHeigth) / 2) - 5;
        }
        return {
            coordTop: moveTop,
            coordLeft: moveLeft
        };
    },
    showChip: function(chip, position) {
            chip.element.style.top = position.coordTop;
            chip.element.style.left = position.coordLeft;
    }
};

var TableAux = {
     getPositionRow: function(coordLeft) {
        var minCellRowAux = TableAux.getRangeRow(coordLeft).minCellRowAux;
        var maxCellRowAux = TableAux.getRangeRow(coordLeft).maxCellRowAux;
        var cellX = (maxCellRowAux + minCellRowAux) / 2;

        return cellX;
    },
    getPositionCol: function(coordTop) {
        var minCellColAux = TableAux.getRangeCol(coordTop).minCellColAux;
        var maxCellColAux = TableAux.getRangeCol(coordTop).maxCellColAux;
        var cellY = (maxCellColAux + minCellColAux) / 2;

        return cellY;
    },
    getRangeRow: function(coordLeft) {
        var minCellRowAux;
        var maxCellRowAux;
        var row = Math.floor(coordLeft / Config.cellWidthHeigth);
        var minCellRow = (row * Config.cellWidthHeigth);
        var maxCellRow = (minCellRow + Config.cellWidthHeigth);

        if (minCellRow <= coordLeft) {
            if ((minCellRow + Config.cellQuarter) <= coordLeft) {
                if((maxCellRow - Config.cellQuarter) <= coordLeft) {
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
            minCellRowAux: minCellRowAux,
            maxCellRowAux: maxCellRowAux
        };
    },
    getRangeCol: function(coordTop) {
        var minCellColAux;
        var maxCellColAux;
        var col = Math.floor(coordTop / Config.cellWidthHeigth);
        var minCellCol = (col * Config.cellWidthHeigth);
        var maxCellCol = (minCellCol + Config.cellWidthHeigth);

        if (minCellCol <= coordTop) {
            if ((minCellCol + Config.cellQuarter) <= coordTop) {
                if((maxCellCol - Config.cellQuarter) <= coordTop) {
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
            minCellColAux: minCellColAux,
            maxCellColAux: maxCellColAux
        };
    },
    getCell: function(posLeft, posTop) {
        var col = Math.floor(posLeft / 25);
        var row = Math.floor(posTop / 25);
        return {
            row: row,
            col: col
        };
    }
}

var Board = {
    chips: [],
    addChip: function(row, col, chip) {
        Board.chips[row][col] = chip;
        if (typeof(chip) != "undefined") {
            document.body.appendChild(chip.element);
        }
    },
    toBoardCoords: function(absoluteCoords) {
        return {
            coordRow: absoluteCoords.x,
            coordCol: absoluteCoords.y
        };
    },
    create: function() {
        var divContent = Dom.createElement('div', 'container-div');
        Board.element = Dom.createTable(Config.rows, Config.cols);
        divContent.appendChild(Board.element);
        document.body.appendChild(divContent);
         for(var i = 0; i < Config.rowsAux; i++) {
            Board.chips.push(new Array(Config.colsAux));
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
