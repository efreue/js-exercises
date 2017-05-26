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
        alert('llamar a funcion')
    };
    return td;
};

var createRow = function(numberRow, numberCells) {
    var tr = createElement('tr');
    for(var i = 0; i <= numberCells; i++) {
        tr.appendChild(
            createCell()
        )
        board.addCells(numberRow, i);
    }
    return tr;
};

var board = {
    allCells: [],
    allChipsToCell: [],
    addCells: function(row, cell) {
        board.allCells.push(row, cell);
    },
    validateCell: function(row, cell) {
        var exists = false;
        if (board.allCells.indexOf(row,cell) != -1)
            exists = true;
        return exists;
    },
    addChip: function(oneChip, row, cell) {
        if(board.validateCell(row, cell)) {
            board.asignChipToCell(row, cell, oneChip)
        }
    },
    asignChipToCell: function(row, cell, oneChip) {
        var chipsCell = new Array(
            row,
            cell,
            new Array(oneChip)
        );
        return chipsCell;
    }
};

var asignChipToCell = function(row, cell)  {
    var oneChip = null;
    var chipsCell = new Array(
        new Array(oneChip)
    );

    return chipsCell;
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
