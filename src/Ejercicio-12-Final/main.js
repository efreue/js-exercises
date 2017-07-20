var Config = {
    cellWidthHeigth: 50,
    cellQuarter: 12.5,
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
                    Chip.add(boardCoords.row, boardCoords.column, boardCoords.coordRow, boardCoords.coordCol);
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
                Chip.add(boardCoords.row, boardCoords.column, boardCoords.coordRow, boardCoords.coordCol);
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
        if(col === 0) {
            chip.element.style.top = ((Config.cellWidthHeigth * 2) + Config.cellWidthHeigth)/2;
            chip.element.style.left = ((Config.cellWidthHeigth) / 2) - 5;
        } else {
            Chip.newCalculatePosition(chip, coordRow, coordCol)
        }

    },
    add: function(row, col, coordRow, coordCol) {
        row = (col == 0)? 1 :row;
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
        Chip.move(chip, col, coordRow, coordCol);
    },
    delete: function(chipDel, row, column) {
        chipDel.element.parentElement.removeChild(chipDel.element);
    },
    newCalculatePosition: function(chip, posLeft, posTop) {
        chip.element.style.top = TableAux.getCellCol(posTop) - 5;
        chip.element.style.left = TableAux.getCellRow(posLeft) - 5;
    }
};

var TableAux = {
    getCellRow: function(coordLeft) {
        var minCellRowAux;
        var maxCellRowAux;

        //1) Determinar Nro Row de tabla original
        var row = Math.floor(coordLeft / Config.cellWidthHeigth);
        //2) Determinar limites de la celda de la tabla original
        var minCellRow = (row * Config.cellWidthHeigth);
        var maxCellRow = (minCellRow + Config.cellWidthHeigth);

        //3) Determinar limites de la celda en la tabla auxiliar
        //Calculo a nivel de Row
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
        var cellX = (maxCellRowAux + minCellRowAux) / 2;
        return cellX;
    },
    getCellCol: function(coordTop) {
        var minCellColAux;
        var maxCellColAux;

        //1) Determinar Nro Columna de tabla original
        var col = Math.floor(coordTop / Config.cellWidthHeigth);
        //2) Determinar limites de la celda de la tabla original
        var minCellCol = (col * Config.cellWidthHeigth);
        var maxCellCol = (minCellCol + Config.cellWidthHeigth);
        //3) Determinar limites de la celda en la tabla auxiliar
        //Calculo a nivel de Col
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
        var cellY = (maxCellColAux + minCellColAux) / 2;
        return cellY;
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
            row: Math.floor(absoluteCoords.y / Config.cellWidthHeigth),
            column: Math.floor(absoluteCoords.x / Config.cellWidthHeigth),
            coordRow: absoluteCoords.x,
            coordCol: absoluteCoords.y
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
