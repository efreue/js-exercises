var config = {
    cellWidth: 50,
    cellHeight: 50,
    chipWidth: 35,
    chipHeight: 35,
    table:null
};

var createElement = function(name) {
    return document.createElement(name);
};

var deleteAllChip = function() {
    var chip = document.getElementsByClassName('circle');
    for(var i = chip.length - 1; 0 <= i; i--) {
        if(chip[i] && chip[i].parentElement) {
            chip[i].parentElement.removeChild(chip[i]);
        }
    }
};

var showChip = function(cell, newChip, e) {
    var marginLeft = (config.cellWidth - config.chipWidth);
    var marginTop = (config.cellHeight - config.chipHeight);
    newChip.style.top = (cell.row * config.cellHeight) + marginTop;
    newChip.style.left = (cell.column * config.cellWidth) + marginLeft;
    var numChip = parseInt(newChip.textContent);
    newChip.onclick(e, numChip);
    if (parseInt(newChip.textContent) > 0) {
        config.table.appendChild(newChip);
    }
};

var chip = {
    create: function(init) {
        var oneChip;
        oneChip = createElement('div');
        oneChip.id = 'chip_id';
        oneChip.className = "circle";
        oneChip.onclick = function(e, numChip) {
            if (numChip == undefined) {
                numChip = parseInt(this.textContent);
            }
            if(e.ctrlKey){
               if(((numChip > 1) ? numChip-- : 0) == 0) {
                   chip.delete(this);
                   chips.delete(this);
                   numChip--;
               }
            } else {
               numChip++;
            }
            this.textContent = numChip;
            this.innerHTML = numChip;
        }
        oneChip.innerHTML = init;
        oneChip.textContent = init;
        return oneChip;
    },
    delete: function(chipRem) {
        chipRem.parentElement.removeChild(chipRem);
    }
}

var chips = {
    allCells:[],
    allChips:[],
    add: function(cell) {
        var oneChip = chips.getChipExists(cell);
        if (oneChip == null) {
            oneChip = new chip.create(0);
            chips.allCells.push(cell);
            chips.allChips.push(oneChip);
        }

        return oneChip;
    },
    getChipExists: function(cell) {
        var chipExists = null;
        for (var i=0; i < chips.allCells.length; i++) {
            if((cell.column == chips.allCells[i].column) && (cell.row == chips.allCells[i].row)) {
                chipExists = chips.allChips[i];
                break;
            }
        }
        return chipExists;
    },
    delete: function(oneChip) {
        for (var i=0; i < chips.allChips.length; i++) {
            if(oneChip === chips.allChips[i]) {
                chips.allChips.splice(i,1);
                chips.allCells.splice(i,1);
            }
        }
    }
};

var getCell = function(xCoord, yCoord) {
    return {
        row: Math.floor(yCoord / config.cellHeight),
        column: Math.floor(xCoord / config.cellWidth)
    };
};

var showSelectedCell = function(cell) {
    var divResul = document.getElementById('divResultCell');
    divResul.textContent = 'column: ' + cell.column + ' row: ' + cell.row;
};

var getSelectedCell = function(e) {
    var x = (e.clientX - config.table.offsetLeft);
    var y = (e.clientY - config.table.offsetTop);
    var cell = getCell(x, y);
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

var createLabel = function(styleLbl, valuebl) {
    var label = createElement('input');
    label.setAttribute('type', 'text')
    label.className = styleLbl;
    label.setAttribute('value', valuebl);
    label.onclick = function() {
        this.value = '';
    };
    return label;
}

var createButton = function(styleBtn, nameBtn, funBtn) {
    var button = createElement('input');
    button.setAttribute('type', 'button')
    button.className = styleBtn;
    button.setAttribute('value', nameBtn);
    button.onclick = function() {
        funBtn();
    };
    return button;
}

var createDiv = function(styleDiv, idDiv) {
    var divNew = createElement('div');
    divNew.className = styleDiv;
    divNew.id = idDiv;
    return divNew;
}

var addNewChip = function() {
    alert('prueba btn add');
};

var createBoardChip = function() {
        var divBoardNew = createDiv("container-board-div", "divBoardId");
        var labelRow = createLabel("label-board", "row");
        var labelCol = createLabel("label-board", "column");
        var btnAdd = createButton("container-board-btn", "Add", addNewChip);
        var btnRemove = createButton("container-board-btn", "Remove", addNewChip);
        divBoardNew.appendChild(labelRow);
        divBoardNew.appendChild(labelCol);
        divBoardNew.appendChild(btnAdd);
        divBoardNew.appendChild(btnRemove);

        return divBoardNew;
}
window.addEventListener(
    "load",
    function() {
        var divContent = createDiv("container-div", "divContainerId");
        config.table = createTable(4,4);
        var divShowCell = createDiv("container-show-div", "divResultCell");
        var divBoard = createBoardChip();
        var button = createButton("container-button", 'Delete All Chip', deleteAllChip);
        divContent.appendChild(config.table);
        divContent.appendChild(divBoard);
        divContent.appendChild(divShowCell);
        divContent.appendChild(button);
        document.body.appendChild(divContent);
    }
);
