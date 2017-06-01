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

var htmlCreateDiv = function(styleDiv, idDiv) {
    var divNew = htmlCreateElement('div');
    divNew.className = styleDiv;
    divNew.id = idDiv;
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
        chip.show(chip.add(e));
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

var board = {
    chipsByCells: [],
    initialize: function(rows, cols) {
        board.chipsByCells = [];
        for (var i = 0; i <= rows - 1; i++) {
            board.chipsByCells[i] = [];
            for (var j = 0; j <= cols - 1; j++) {
                board.chipsByCells[i][j] = 0;
            }
        }
    },
    getNumberChip: function(rows, cols) {
        return board.chipsByCells[rows][cols];
    },
    setNumberChip: function(rows, cols, num) {
        board.chipsByCells[rows][cols] = num;
    }
};

var chip = {
    create: function(row, col, init) {
        var oneChip = htmlCreateElement('div');
        oneChip.id = 'chip_id';
        oneChip.className = "circle";
        oneChip.onclick = function(e) {
            var cellSelected = getSelectedCell(e);
            var numChip = board.getNumberChip(cellSelected.row, cellSelected.column);
            if (e.ctrlKey && numChip > 0) {
                if (((numChip > 1) ? numChip-- : 0) == 0) {
                    chip.delete(this);
                    numChip--;
                }
            }
            else {
                numChip++;
            }
            board.setNumberChip(cellSelected.row, cellSelected.column, numChip);
            this.textContent = numChip;
            this.innerHTML = numChip;
        };
        board.setNumberChip(row, col, init);
        oneChip.innerHTML = init;
        oneChip.textContent = init;
        return oneChip;
    },
    add: function(e) {
        var oneChip = null;
        var cellSelected = getSelectedCell(e);
        var numChip = board.getNumberChip(cellSelected.row, cellSelected.column);
        if (numChip === 0 && e.ctrlKey === false) {
            numChip++;
            oneChip = chip.create(cellSelected.row, cellSelected.column, numChip);
        }
        return {
            row: cellSelected.row,
            col: cellSelected.column,
            oneChip: oneChip
        };
    },
    show: function(chipCreated) {
        var marginLeft = (config.cellWidth - config.chipWidth);
        var marginTop = (config.cellHeight - config.chipHeight);
        chipCreated.oneChip.style.top = (chipCreated.row * config.cellHeight) + marginTop;
        chipCreated.oneChip.style.left = (chipCreated.col * config.cellWidth) + marginLeft;
        document.body.appendChild(chipCreated.oneChip);
    },
    delete: function(chipDel) {
        chipDel.parentElement.removeChild(chipDel);
    }
}

var deleteAllChip = function() {
    var chips = document.getElementsByClassName('circle');
    for(var i = chips.length - 1; 0 <= i; i--) {
        if(chips[i] && chips[i].parentElement) {
            chip.delete(chips[i]);
        }
    }
    board.initialize(config.countRows, config.countCols);
};

var addNewChip = function() {
    var element = document.getElementsByClassName("label-board");
    var row = parseInt(element[0].value);
    var col = parseInt(element[1].value);
    var numChip = board.getNumberChip(row, col);
    numChip++;
    //chip.show(chip.create(row, col, numChip));
};

var delNewChip = function() {
    alert('armar logica');
}

window.addEventListener(
    "load",
    function() {
        var tbl = null;
        var divContent = htmlCreateDiv("container-div", "divContainerId");
        tbl = htmlCreateTable(config.countRows, config.countCols);
        var divDefineCell = htmlCreateDiv("container-show-div", "divResultCell");
        var button = htmlCreateButton("container-button", 'Delete All Chip', deleteAllChip);
        divContent.appendChild(tbl);
        divContent.appendChild(divDefineCell);
        divContent.appendChild(button);
        document.body.appendChild(divContent);
        board.initialize(config.countRows, config.countCols);

    }
);
