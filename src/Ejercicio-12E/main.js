var config = {
    cellWidth: 50,
    cellHeight: 50,
    chipWidth: 35,
    chipHeight: 35,
    countRows: 4,
    countColumns: 4
};

var htmlCreateElement = function(name) {
    return document.createElement(name);
};

var htmlCreateDiv = function(styleDiv) {
    var divNew = htmlCreateElement('div');
    divNew.className = styleDiv;
    return divNew;
};

var htmlCreateTable = function(rows, columns) {
    var tblNew = htmlCreateElement('table');
    tblNew.id = 'tableId';
    for (var i = 0; i <= rows - 1; i++) {
        tblNew.appendChild(
            htmlCreateRow(i, columns - 1)
        )
    }
    return tblNew;
};

var htmlCreateButton = function(styleBtn, nameBtn, callback) {
    var button = htmlCreateElement('input');
    button.setAttribute('type', 'button')
    button.className = styleBtn;
    button.setAttribute('value', nameBtn);
    button.onclick = function() {
        callback();
    };
    return button;
};

var htmlCreateCell = function() {
    var td = htmlCreateElement('td');
    td.className = "container-cell";
    td.onclick = function(e){
        Chip.show(
            Chip.get(
                getSelectedCell(e)
            )
        );
    };
    return td;
};

var htmlCreateRow = function(numberRow, numberCells) {
    var tr = htmlCreateElement('tr');
    for (var i = 0; i <= numberCells; i++) {
        tr.appendChild(
            htmlCreateCell()
        )
    }
    return tr;
};

var getElementByClass = function(name) {
    return document.getElementsByClassName(name);
};

var getElementId = function(name) {
    return document.getElementById(name);
};


/*logica chips and cells*/
var getSelectedCell = function(e) {
    var table = getElementId('tableId');
    var xCoord = (e.clientX - table.offsetLeft);
    var yCoord = (e.clientY - table.offsetTop);
    return {
        row: Math.floor(yCoord / config.cellHeight),
        column: Math.floor(xCoord / config.cellWidth),
        substractChip: e.ctrlKey
    };
};

var Board = {
    chipsByCells: [],
    initialize: function(rows, columns) {
        for (var i = 0; i <= rows - 1; i++) {
            Board.chipsByCells[i] = [];
            for (var j = 0; j <= columns - 1; j++) {
                Board.chipsByCells[i][j] = {chip: null, number: 0};
            }
        }
    },
    setChip: function(rows, columns, number, chip) {
        Board.chipsByCells[rows][columns] = {chip: chip, number: number};
    },
    getChip: function(rows, columns) {
        return Board.chipsByCells[rows][columns].chip;
    },
    getNumberChip: function(rows, columns) {
        return Board.chipsByCells[rows][columns].number;
    },
    existsSomeChip: function() {
        var existChip = 0;
        for(var i = config.countRows - 1; 0 <= i; i--) {
            for(var j = config.countColumns - 1;0 <= j; j--) {
                if (Board.getChip(i, j) !== null) {
                    existChip = 1;
                    break
                }
            }
            if (existChip === 1) {
                break;
            }
        }
        return existChip;
    },
    removeChips: function() {
        for(var i = config.countRows - 1; 0 <= i; i--) {
            for(var j = config.countColumns - 1;0 <= j; j--) {
                if (Board.getChip(i, j) !== null) {
                    Chip.delete(Board.getChip(i, j), i, j);
                }
            }
        }
    }
};

var Chip = {
    create: function(cell) {
        var chip = htmlCreateDiv("circle");
        chip.onclick = function(e) {
            var cellSelected = getSelectedCell(e);
            Chip.update(this, cellSelected);
        };
        var numberChip = Board.getNumberChip(cell.row, cell.column);
        numberChip++;
        chip.textContent = numberChip;
        Board.setChip(cell.row, cell.column, numberChip, chip);
        return chip;
    },
    get: function(cell) {
        var chip = Board.getChip(cell.row, cell.column);
        if(chip === null) {
            if (cell.substractChip === false) {
                chip = Chip.create(cell);
            }
        } else {
            Chip.update(chip, cell)
            chip = Board.getChip(cell.row, cell.column);
        }
        return {chip: chip, row: cell.row, column: cell.column};
    },
    update: function(chip, cell) {
        var chipWasDeleted = false;
        var number = Board.getNumberChip(cell.row, cell.column);
        if (cell.substractChip) {
            if (number > 1)  {
                number--;
            }
            else {
                Chip.delete(chip, cell.row, cell.column);
                chipWasDeleted = true;
            }
        }
        else {
            number++;
        }
        if (chipWasDeleted === false) {
            chip.textContent = number;
            Board.setChip(cell.row, cell.column, number, chip);
        }
    },
    delete: function(chipDel, row, column) {
        Board.setChip(row, column, 0, null);
        chipDel.parentElement.removeChild(chipDel);
    },
    show: function(chipSel) {
        if (chipSel.chip !== null) {
            var marginLeft = (config.cellWidth - config.chipWidth);
            var marginTop = (config.cellHeight - config.chipHeight);
            chipSel.chip.style.top = (chipSel.row * config.cellHeight) + marginTop;
            chipSel.chip.style.left = (chipSel.column * config.cellWidth) + marginLeft;
            showSelectedCell(chipSel.row, chipSel.column);
            document.body.appendChild(chipSel.chip);
        }
    }
};

var getRowColumnInserted = function(substractChip) {
    var element = getElementByClass("label-board");
    var row = parseInt(element[0].value);
    var column = parseInt(element[1].value);
    return {
        row: row,
        column: column,
        substractChip: substractChip
    }
};

var validateRowCol = function (row, col) {
    var msg = 'ok';
    if(isNaN(row) || isNaN(col)) {
        msg = 'Debe definir una fila y columna valida';
    } else {
        if((row >= config.countRows || row < 0) || (col >= config.countCols || col < 0)) {
            msg = 'Los valores para la fila estan entre (0,' + config.countRows + '), y para la columna entre (0,' + config.countCols + ')';
        }
    }
    if (msg !== 'ok') {
        alert(msg);
        return 0;
    }
    else {
        return 1;
    }
};
var addChip = function() {
    var cell = getRowColumnInserted(false);
    if(validateRowCol(cell.row, cell.column) === 1) {
        Chip.show(Chip.get(cell));
    }
};
var removeChip = function() {
    var cell = getRowColumnInserted(true);
    if(validateRowCol(cell.row, cell.column) === 1) {
        if(Board.getChip(cell.row, cell.column) !== null) {
            Chip.show(Chip.get(cell));
        }
    }
};

var removeChips = function() {
    var existsChip = Board.existsSomeChip();
    if (existsChip === 1) {
        Board.removeChips();
    } else {
        alert("No hay fichas para borrar");
    }
    clearLabelRowCol();
    clearSelectedCell();
};

var clearLabelRowCol = function() {
    var element = getElementByClass("label-board");
    element[0].value = "";
    element[0].placeholder = "row";
    element[1].value = "";
    element[1].placeholder = "column";
};

var clearSelectedCell = function() {
    var divResul = getElementId('divResultCell');
    divResul.textContent = '';
};

var showSelectedCell = function(row, column) {
    var divResul = getElementId('divResultCell');
    divResul.textContent = 'column: ' + column + ' row: ' + row;
};

window.addEventListener(
    "load",
    function() {
        var board = null;
        var divContent = htmlCreateDiv("container-div");
        board = htmlCreateTable(config.countRows, config.countColumns);
        var divDefineCell = htmlCreateDiv("container-show-cell");
        var button = htmlCreateButton("container-button", 'Delete All Chip', removeChips);
        divContent.appendChild(board);
        divContent.appendChild(divDefineCell);
        divContent.appendChild(button);
        document.body.appendChild(divContent);
        Board.initialize(config.countRows, config.countColumns);
    }
);
