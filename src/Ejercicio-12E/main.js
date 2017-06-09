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


var Board = {
    chipsByCells: [],
    setChip: function(rows, columns, number, chip) {
        Board.chipsByCells[rows][columns] = {chip: chip, number: number};
    },
    getChip: function(rows, columns) {
        return Board.chipsByCells[rows][columns].chip;
    },
    getNumberChip: function(rows, columns) {
        return Board.chipsByCells[rows][columns].num;
    },
    initialize: function(rows, columns) {
        for (var i = 0; i <= rows - 1; i++) {
            Board.chipsByCells[i] = [];
            for (var j = 0; j <= columns - 1; j++) {
                Board.chipsByCells[i][j] = {chip: null, number: 0};
            }
        }
    },
    hasAnyChip: function() {
        var hasChip = 0;
        for(var i = config.countRows - 1; 0 <= i; i--) {
            for(var j = config.countCols - 1;0 <= j; j--) {
                chip = Board.getChip(i,j);
                if (chip !== null) {
                    hasChip = 1;
                    break
                }
            }
            if (hasChip === 1) {
                break;
            }
        }
        return hasChip;
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
