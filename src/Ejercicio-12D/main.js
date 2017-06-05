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
        Chip.show(Chip.add(e));
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
}

var Board = {
    chipsByCells: [],
    initialize: function(rows, cols) {
        Board.chipsByCells = [];
        for (var i = 0; i <= rows - 1; i++) {
            Board.chipsByCells[i] = [];
            for (var j = 0; j <= cols - 1; j++) {
                Board.chipsByCells[i][j] = 0;
            }
        }
    },
    getNumberChip: function(rows, cols) {
        return Board.chipsByCells[rows][cols];
    },
    setNumberChip: function(rows, cols, num) {
        Board.chipsByCells[rows][cols] = num;
    }
};

var Chip = {
    create: function(row, col, init) {
        var chip = htmlCreateDiv("circle");
        chip.onclick = function(e) {
            var cellSelected = getSelectedCell(e);
            var numChip = Board.getNumberChip(cellSelected.row, cellSelected.column);
            if (e.ctrlKey && numChip > 0) {
                if (((numChip > 1) ? numChip-- : 0) == 0) {
                    Chip.delete(this);
                    numChip--;
                }
            }
            else {
                numChip++;
            }
            Board.setNumberChip(cellSelected.row, cellSelected.column, numChip);
            this.textContent = numChip;
            this.innerHTML = numChip;
        };
        Board.setNumberChip(row, col, init);
        chip.textContent = init;
        return chip;
    },
    add: function(e) {
        var cellSelected = getSelectedCell(e);
        var chip = null;
        if (e.ctrlKey === false) {
            chip = Chip.get(cellSelected.row, cellSelected.column);
        }
        return chip;
    },
    get: function(row, col) {
        var chip = null;
        var numChip = Board.getNumberChip(row, col);
        if (numChip === 0) {
            numChip++;
            chip = Chip.create(row, col, numChip);
        }
        return {
            row: row,
            col: col,
            chip: chip
        };
    },
    /*set: function(row, col, num) {

    },*/
    show: function(chipCreated) {
        var marginLeft = (config.cellWidth - config.chipWidth);
        var marginTop = (config.cellHeight - config.chipHeight);
        chipCreated.chip.style.top = (chipCreated.row * config.cellHeight) + marginTop;
        chipCreated.chip.style.left = (chipCreated.col * config.cellWidth) + marginLeft;
        document.body.appendChild(chipCreated.chip);
    },
    delete: function(chipDel) {
        chipDel.parentElement.removeChild(chipDel);
    }
}

var deleteAllChip = function() {
    var chips = document.getElementsByClassName('circle');
    for(var i = chips.length - 1; 0 <= i; i--) {
        if(chips[i] && chips[i].parentElement) {
            Chip.delete(chips[i]);
        }
    }
    Board.initialize(config.countRows, config.countCols);
};

var addNewChip = function() {
    var element = document.getElementsByClassName("label-board");
    var row = parseInt(element[0].value);
    var col = parseInt(element[1].value);
    var numChip = Board.getNumberChip(row, col);
    numChip++;
    Chip.show(Chip.get(row, col));
};

var delNewChip = function() {
    alert('armar logica');
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
