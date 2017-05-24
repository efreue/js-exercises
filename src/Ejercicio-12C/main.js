var config = {
    cellWidth: 50,
    cellHeight: 50,
    chipWidth: 35,
    chipHeight: 35,
    countRows: 4,
    countCols: 4,
    table: null
};

var createElement = function(name) {
    return document.createElement(name);
};

var deleteAllChip = function() {
    var chip = document.getElementsByClassName('circle');
    for(var i = chip.length - 1; 0 <= i; i--) {
        if(chip[i] && chip[i].parentElement) {
            chips.delete(chip[i]);
            chip[i].parentElement.removeChild(chip[i]);
        }
    }
};

var chip = {
    create: function(init) {
        var oneChip;
        oneChip = createElement('div');
        oneChip.id = 'chip_id';
        oneChip.className = "circle";
        oneChip.onclick = function(e, numChip, delChip) {
            if (numChip == undefined) {
                numChip = parseInt(this.textContent);
            }
            if(typeof(e) != "undefined") {
                if (e.ctrlKey){
                   if(((numChip > 1) ? numChip-- : 0) == 0) {
                       chip.delete(this);
                       chips.delete(this);
                       numChip--;
                   }
                }
                else {
                   numChip++;
                }
            }
            else {
                if(delChip == 1) {
                    if(((numChip > 1) ? numChip-- : 0) == 0) {
                       chip.delete(this);
                       chips.delete(this);
                       numChip--;
                    }
                } else {
                    numChip++;
                }

            }
            this.textContent = numChip;
            this.innerHTML = numChip;
        }
        oneChip.innerHTML = init;
        oneChip.textContent = init;
        return oneChip;
    },
    delete: function(chipRem) {
        chips.delete(chipRem);
        chipRem.parentElement.removeChild(chipRem);
    }
};

var CellAndChip = function(cell, oneChip)  {
    var matriz = new Array(
        new Array(cell),
        new Array(oneChip)
    );
    return matriz;
};

var chips = {
    matrizCellChip:[],
    add: function(cell, delChip) {
        var oneChip = chips.getChipExists(cell);
        if (oneChip == null && (delChip == 0 || delChip == undefined)) {
            oneChip = new chip.create(0);
            chips.matrizCellChip.push(CellAndChip(cell, oneChip));
        }
        return oneChip;
    },
    getChipExists: function(cell) {
        var chipExists = null;
        for (var i = 0; i < chips.matrizCellChip.length; i++) {
            if((cell.column == chips.matrizCellChip[i][0][0].column) && (cell.row == chips.matrizCellChip[i][0][0].row)) {
                chipExists = chips.matrizCellChip[i][1][0];
                break;
            }
        }
        return chipExists;
    },
    delete: function(oneChip) {
        for (var i = 0; i < chips.matrizCellChip.length; i++) {
            if(oneChip === chips.matrizCellChip[i][1][0]) {
                chips.matrizCellChip.splice(i, 1);
            }
        }
        if(chips.matrizCellChip.length == 0) {
            clearSelectedCell();
            clearLabelRowCol();
        }
    }
};

var showChip = function(cell, newChip, e, delChip) {
    var marginLeft = (config.cellWidth - config.chipWidth);
    var marginTop = (config.cellHeight - config.chipHeight);
    newChip.style.top = (cell.row * config.cellHeight) + marginTop;
    newChip.style.left = (cell.column * config.cellWidth) + marginLeft;
    var numChip = parseInt(newChip.textContent);
    newChip.onclick(e, numChip, delChip);
    if (parseInt(newChip.textContent) > 0) {
        config.table.appendChild(newChip);
    }
};

var getCell = {
    withCoord: function(e) {
        var xCoord = (e.clientX - config.table.offsetLeft);
        var yCoord = (e.clientY - config.table.offsetTop);
        return {
            row: Math.floor(yCoord / config.cellHeight),
            column: Math.floor(xCoord / config.cellWidth)
        };
    },
    withColRow: function(row, col){
        return {
            row: row,
            column: col
        };
    }
};

var showSelectedCell = function(cell) {
    var divResul = document.getElementById('divResultCell');
    divResul.textContent = 'column: ' + cell.column + ' row: ' + cell.row;
};

var clearSelectedCell = function(cell) {
    var divResul = document.getElementById('divResultCell');
    divResul.textContent = '';
};

var getSelectedCell = function(e, col, row) {
    var cell;
    if(col == undefined && row == undefined) {
        cell = getCell.withCoord(e);
    } else {
        cell = getCell.withColRow(col,row);
    }
    showSelectedCell(cell);
    return cell;
};

var createCell = function() {
    var td = createElement('td');
    td.className = "container-cell";
    td.onclick = function(e){
        showChip(
            getSelectedCell(e),
            chips.add(getSelectedCell(e)),
            e
        );
    };
    return td;
};

var createRow = function(numberRow, numberCells) {
    var tr = createElement('tr');
    for(var i = 0; i <= numberCells; i++) {
        tr.appendChild(
            createCell()
        )
    }
    return tr;
};

var createTable = function(rows, cols){
    var tblNew = createElement('table');
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

var createDiv = function(styleDiv, idDiv) {
    var divNew = createElement('div');
    divNew.className = styleDiv;
    divNew.id = idDiv;
    return divNew;
};

var clearLabelRowCol = function() {
    var element = document.getElementsByClassName("label-board");
    element[0].value = "";
    element[0].placeholder = "row";
    element[1].value = "";
    element[1].placeholder = "column";
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

var logicButtonAddDelChip = function(delChip) {
    var element = document.getElementsByClassName("label-board");
    var row = parseInt(element[0].value);
    var col = parseInt(element[1].value);
    var validOk = validateRowCol(row, col)
    if (validOk == 1) {
        var cell = getSelectedCell(null, col, row);
        var chip = chips.add(cell, delChip);
        if(chip != null) {
            showChip(cell, chip, undefined, delChip);
        }
        else {
            alert('No existe ficha en la ceda seleccionada');
        }
    }
}

var addNewChip = function() {
    logicButtonAddDelChip(0);
};

var delNewChip = function() {
    logicButtonAddDelChip(1);
};

window.addEventListener(
    "load",
    function() {
        var divContent = createDiv("container-div", "divContainerId");
        config.table = createTable(config.countRows, config.countCols);
        var divShowCell = createDiv("container-show-div", "divResultCell");
        var button = createButton("container-button", 'Delete All Chip', deleteAllChip);
        divContent.appendChild(config.table);
        divContent.appendChild(divShowCell);
        divContent.appendChild(button);
        document.body.appendChild(divContent);
    }
);
