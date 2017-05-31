var config = {
    cellWidth: 50,
    cellHeight: 50,
    chipWidth: 35,
    chipHeight: 35,
    countRows: 4,
    countCols: 4
};

var createElement = function(name) {
    return document.createElement(name);
};

var createDiv = function(styleDiv, idDiv) {
    var divNew = createElement('div');
    divNew.className = styleDiv;
    divNew.id = idDiv;
    return divNew;
};

var createTable = function(rows, cols){
    var tblNew = createElement('table');
    tblNew.id = 'tableId';
    for (var i = 0; i <= rows - 1; i++) {
        tblNew.appendChild(
            createRow(i, cols - 1)
        )
    }
    return tblNew;
};

var createButton = function(styleBtn, nameBtn, funBtn) {
    var button = createElement('input');
    button.setAttribute('type', 'button')
    button.className = styleBtn;
    button.setAttribute('value', nameBtn);
    button.onclick = function() {
        funBtn();
    };
    return button;
};

var createCell = function() {
    var td = createElement('td');
    td.className = "container-cell";
    td.onclick = function(e){
        //alert('llamar a funcion')
        chip.show(chip.add(e));
    };
    return td;
};

var createRow = function(numberRow, numberCells) {
    var tr = createElement('tr');
    for(var i = 0; i <= numberCells; i++) {
        tr.appendChild(
            createCell()
        )
        cellNew.add(numberRow, i);
    }
    return tr;
};

var cellNew = {
    allCells: [],
    add: function(row, cell) {
        cellNew.allCells.push(row, cell);
    },
    validate: function(row, cell) {
        var exists = false;
        if (cellNew.allCells.indexOf(row, cell) != -1) {
            exists = true;
        }
        return exists;
    },
    getSelectedCell: function(e) {
        var table = document.getElementById('tableId');
        var xCoord = (e.clientX - table.offsetLeft);
        var yCoord = (e.clientY - table.offsetTop);
        return {
            row: Math.floor(yCoord / config.cellHeight),
            column: Math.floor(xCoord / config.cellWidth)
        };
    }
};

var chip = {
    create: function(init) {
        var oneChip = createElement('div');
        oneChip.id = 'chip_id';
        oneChip.className = "circle";
        oneChip.onclick = function(e) {
            var numChip = parseInt(this.textContent);
            if (e.ctrlKey) {
                if (((numChip > 1) ? numChip-- : 0) == 0) {
                    chip.delete(this);
                    numChip--;
                }
            }
            else {
                numChip++;
            }
            this.textContent = numChip;
            this.innerHTML = numChip;
        };
        oneChip.innerHTML = init;
        oneChip.textContent = init;
        return oneChip;
    },
    add: function(e) {
        var oneChip = null;
        var oneCell = cellNew.getSelectedCell(e);
        if(cellNew.validate(oneCell.row, oneCell.column)) {
            if(board.getChip(oneCell.row, oneCell.column) != null) {
                oneChip = board.allChipsToCell[oneCell.row, oneCell.column]
            }
            else {
                oneChip = chip.create(1);
            }
            board.asignChipToCell(oneCell.row, oneCell.column, oneChip);
        }
        return {
            row: oneCell.row,
            col: oneCell.column,
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
        //verificar como obtener el row y col del chip a borrar de la matriz
        //board.delete(0,0,chipDel);
    }
};

var board = {
    allChipsToCell: [],
    asignChipToCell: function(row, cell, oneChip) {
        var chipsCell = new Array(
            row,
            cell,
            new Array(oneChip)
        );
        return chipsCell;
    },
    getChip: function(row, cell) {
        var oneChip = null;
        if (board.allChipsToCell.indexOf(row, cell) != -1) {
            oneChip = board.allChipsToCell[row, cell];
        }
        return oneChip;
    },
    validate: function(row, cell, oneChip) {
        var exists = false;
        if (board.asignChipToCell.indexOf(row, cell, oneChip) != -1) {
            exists = true;
        }
        return exists;
    },
    delete: function(row, cell, oneChip) {
        var index = board.allChipsToCell.indexOf(row, cell, oneChip);
        board.allChipsToCell.splice(index);

    }
};

window.addEventListener(
    "load",
    function() {
        var tbl = null;
        var divContent = createDiv("container-div", "divContainerId");
        tbl = createTable(config.countRows, config.countCols);
        var divShowCell = createDiv("container-show-div", "divResultCell");
        //var button = createButton("container-button", 'Delete All Chip', deleteAllChip);
        divContent.appendChild(tbl);
        divContent.appendChild(divShowCell);
        //divContent.appendChild(button);
        document.body.appendChild(divContent);
    }
);
