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

var showChip = function(cell, chip) {
    var marginLeft = (config.cellWidth - config.chipWidth);
    var marginTop = (config.cellHeight - config.chipHeight);

    chip.style.top = (cell.row * config.cellHeight) + marginTop;
    chip.style.left = (cell.column * config.cellWidth) + marginLeft;
    config.table.appendChild(chip);
};


var chip = {
    create: function(countChip) {
        var oneChip;
        oneChip = createElement('div');
        oneChip.id = 'chip_id';
        oneChip.className = "circle";
        oneChip.onclick = function(e) {
            if(e.ctrlKey){
               if(((countChip > 1) ? --countChip : 0) == 0) {
                   chip.delete(this);
               }
            } else {
               ++countChip;
            }
            this.innerHTML = countChip;
        }
        oneChip.innerHTML = countChip;
        return oneChip;
    },
    delete: function(chipRem) {
        chipRem.parentElement.removeChild(chipRem);
    }
}

var createNewChip = function() {
        var newChip = new chip.create(1);
        return newChip;
    }


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
            createNewChip()
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
