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

var htmlCreateTable = function(rows, columns){
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
        Chip.show(Chip.get(getSelectedCell(e)));
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
var getSelectedCell = function(e) {
    var table = document.getElementById('tableId');
    var xCoord = (e.clientX - table.offsetLeft);
    var yCoord = (e.clientY - table.offsetTop);
    return {
        row: Math.floor(yCoord / config.cellHeight),
        column: Math.floor(xCoord / config.cellWidth)
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
};

var Chip = {
    create: function(row, column, init) {
        var chip = htmlCreateDiv("circle");
        chip.onclick = function(e) {
            var cellSelected = getSelectedCell(e);
            var numberChip = Board.getNumberChip(cellSelected.row, cellSelected.column);
            if (e.ctrlKey) {
                if (numberChip > 1)  {
                    numberChip--;
                }
                else {
                    Chip.delete(this, row, column);
                    return;
                }
            }
            else {
                numberChip++;
            }
            this.textContent = numberChip;
            Board.setChip(row, column, numberChip, this);
        };
        chip.textContent = init;
        Board.setChip(row, column, init, chip);
        return chip;
    },
    get: function(cell) {
        var chip = Board.getChip(cell.row, cell.column);
        if(chip === null) {
            chip = Chip.create(cell.row, cell.column, 1);
        }
        return {chip: chip, row: cell.row, column: cell.column};
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
            document.body.appendChild(chipSel.chip);
        }
    }
};

var removeChips = function() {
    alert('prueba');
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
