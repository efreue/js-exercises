var config = {
    cellWidth: 50,
    cellHeight: 50,
    chipWidth: 35,
    chipHeight: 35,
    countRows: 4,
    countCols: 4
};

var htmlCreateElement = function(name) {
    return document.createElement(name);
};

var htmlCreateDiv = function(styleDiv) {
    var divNew = htmlCreateElement('div');
    divNew.className = styleDiv;
    return divNew;
};

var htmlCreateTable = function(rows, cols){
    var tblNew = htmlCreateElement('table');
    tblNew.id = 'tableId';
    for (var i = 0; i <= rows - 1; i++) {
        tblNew.appendChild(
            htmlCreateRow(i, cols - 1)
        )
    }
    return tblNew;
};

var htmlCreateButton = function(styleBtn, nameBtn, funBtn) {
    var button = htmlCreateElement('input');
    button.setAttribute('type', 'button')
    button.className = styleBtn;
    button.setAttribute('value', nameBtn);
    button.onclick = function() {
        funBtn();
    };
    return button;
};

var htmlCreateCell = function() {
    var td = htmlCreateElement('td');
    td.className = "container-cell";
    td.onclick = function(e){
        Chip.show(Chip.generate(e));
    };
    return td;
};

var htmlCreateRow = function(numberRow, numberCells) {
    var tr = htmlCreateElement('tr');
    for(var i = 0; i <= numberCells; i++) {
        tr.appendChild(
            htmlCreateCell()
        )
    }
    return tr;
};

/*logica chips and cells*/

var clearSelectedCell = function() {
    var divResul = document.getElementById('divResultCell');
    divResul.textContent = '';
};


var clearLabelRowCol = function() {
    var element = document.getElementsByClassName("label-board");
    element[0].value = "";
    element[0].placeholder = "row";
    element[1].value = "";
    element[1].placeholder = "column";
};


var getSelectedCell = function(e) {
    var table = document.getElementById('tableId');
    var xCoord = (e.clientX - table.offsetLeft);
    var yCoord = (e.clientY - table.offsetTop);
    return {
        row: Math.floor(yCoord / config.cellHeight),
        column: Math.floor(xCoord / config.cellWidth)
    };
}

var Board = {
    chipsByCells: [],
    initialize: function(rows, cols) {
        Board.chipsByCells = [];
        for (var i = 0; i <= rows - 1; i++) {
            Board.chipsByCells[i] = [];
            for (var j = 0; j <= cols - 1; j++) {
                Board.chipsByCells[i][j] = {chipSel: null, num: 0};
            }
        }
    },
    delete: function() {
        var chip = null;
        for(var i = config.countRows - 1; 0 <= i; i--) {
            for(var j = config.countCols - 1;0 <= j; j--) {
                chip = Board.chipsByCells[i][j].chipSel;
                if (chip !== null) {
                    Board.setChipSel(i,j,0,null);
                    Chip.delete(chip);
                }

            }
        }
    },
    getNumberChip: function(rows, cols) {
        return Board.chipsByCells[rows][cols].num;
    },
    getChipSel: function(rows, cols) {
        return Board.chipsByCells[rows][cols].chipSel;
    },
    setChipSel: function(rows, cols, num, chipSel) {
        Board.chipsByCells[rows][cols] = {chipSel: chipSel, num: num};
    },
    existsSomeChip: function() {
        var chip = null;
        var existChip = 0;
        for(var i = config.countRows - 1; 0 <= i; i--) {
            for(var j = config.countCols - 1;0 <= j; j--) {
                chip = Board.chipsByCells[i][j].chipSel;
                if (chip !== null) {
                    existChip = 1;
                    break
                }

            }
            if (existChip === 1) {
                break;
            }
        }
        return existChip;
    }
};

var Chip = {
    create: function(row, col, init) {
        var chip = htmlCreateDiv("circle");
        chip.onclick = function(e) {
            var cellSelected = getSelectedCell(e);
            var numChip = Board.getNumberChip(cellSelected.row, cellSelected.column);
            if (e.ctrlKey && numChip > 0) {
                numChip = Chip.rest(numChip);
                if (numChip <= 0)  {
                    Chip.delete(this);
                }
            }
            else {
                numChip++;
            }
            Board.setChipSel(cellSelected.row, cellSelected.column, numChip, this);
            this.textContent = numChip;
        };
        Board.setChipSel(row, col, init, chip);
        chip.textContent = init;
        return chip;
    },
    generate: function(e) {
        var cellSelected = getSelectedCell(e);
        var chip = null;
        if (e.ctrlKey === false) {
            chip = Chip.get(cellSelected.row, cellSelected.column, 0);
        } else {
            chip = Chip.get(cellSelected.row, cellSelected.column, 1);
        }
        return chip;
    },
    rest: function(numChip, chip) {
        if (((numChip > 1) ? numChip-- : 0) == 0) {
            numChip--;
        }
        return numChip;
    },
    get: function(row, col, del) {
        var chip = null;
        var numChip = Board.getNumberChip(row, col);
        if (numChip === 0) {
            numChip++;
            chip = Chip.create(row, col, numChip);
        }
        else {
            chip = Board.getChipSel(row, col);
            if (del === 0) {
                	numChip++;
            } else {
                var numChip = Chip.rest(numChip);
                if (numChip <= 0)  {
                    Chip.delete(chip);
                }
            }
            Board.setChipSel(row, col, numChip, chip);
            if (numChip > 0)  {
                chip.textContent = numChip;
            } else  {
                chip = null;
            }
        }
        showSelectedCell(row, col);
        return {
            row: row,
            col: col,
            chip: chip
        };
    },
    show: function(chipCreated) {
        if (chipCreated.chip !== null) {
            var marginLeft = (config.cellWidth - config.chipWidth);
            var marginTop = (config.cellHeight - config.chipHeight);
            chipCreated.chip.style.top = (chipCreated.row * config.cellHeight) + marginTop;
            chipCreated.chip.style.left = (chipCreated.col * config.cellWidth) + marginLeft;
            document.body.appendChild(chipCreated.chip);
        }
    },
    delete: function(chipDel) {
        chipDel.parentElement.removeChild(chipDel);
    }
}

var showSelectedCell = function(row, col) {
    var divResul = document.getElementById('divResultCell');
    divResul.textContent = 'column: ' + col + ' row: ' + row;
};


var deleteAllChip = function() {
    var existsChip = Board.existsSomeChip();
    if(existsChip === 1) {
        Board.delete();
    } else {
        alert("No hay fichas para borrar");
    }
    clearLabelRowCol();
    clearSelectedCell();
};

var getRowColInserted = function() {
    var element = document.getElementsByClassName("label-board");
    var row = parseInt(element[0].value);
    var col = parseInt(element[1].value);
    return {
        row: row,
        col: col
    }
}


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

var addNewChip = function() {
    var position = getRowColInserted();
    if(validateRowCol(position.row, position.col) === 1) {
        var chipSel = Chip.get(position.row, position.col, 0);
        Chip.show(chipSel);
    }
};

var delNewChip = function() {
    var existsChip = Board.existsSomeChip();
    if(existsChip === 1) {
        var position = getRowColInserted();
        if(validateRowCol(position.row, position.col) === 1) {
            var chipSel = Board.getChipSel(position.row, position.col);
            var numChip = Board.getNumberChip(position.row, position.col);
            numChip = Chip.rest(numChip);
            if (numChip <= 0)  {
                Chip.delete(chipSel);
                Board.setChipSel(position.row, position.col, 0, null);
            } else {
                Board.setChipSel(position.row, position.col, numChip, chipSel);
            }
            chipSel.textContent = numChip;
        }
    } else {
        alert("No hay fichas para borrar");
    }
}

window.addEventListener(
    "load",
    function() {
        var tbl = null;
        var divContent = htmlCreateDiv("container-div");
        tbl = htmlCreateTable(config.countRows, config.countCols);
        var divDefineCell = htmlCreateDiv("container-show-div");
        var button = htmlCreateButton("container-button", 'Delete All Chip', deleteAllChip);
        divContent.appendChild(tbl);
        divContent.appendChild(divDefineCell);
        divContent.appendChild(button);
        document.body.appendChild(divContent);
        Board.initialize(config.countRows, config.countCols);

    }
);
