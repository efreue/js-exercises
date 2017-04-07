var createElement = function(name) {
    return document.createElement(name);
};

var rouletteChip = function() {
    var chip = createElement('div');
    chip.id = 'chip_id';
    chip.className="circle"
    return chip;
}

var showChip = function(cell, chip) {
    var table = document.getElementsByTagName('table')[0];
    console.log('column: ' + cell.row + ' row: ' + cell.column);
    chip.style.left = 10;
    chip.style.top = 10;
    table.appendChild(chip);
}

var selectCell = function(xCoord, yCoord, cellWidth, cellHeight) {
    return {
        row: Math.floor(xCoord/cellWidth),
        column: Math.floor(yCoord/cellHeight)
    };
};

var showSelectedCell = function(cell) {
    var divResul = document.getElementById('divResultCell');
    divResul.textContent = 'column: ' + cell.row + ' row: ' + cell.column;
}



var getSelectedCellNumber = function(e) {
    var table = document.getElementsByTagName('table')[0];
    var x = (e.clientX - table.offsetLeft);
    var y = (e.clientY - table.offsetTop);
    var cell = selectCell(x, y, 50, 50);
    showSelectedCell(cell);
    return cell;
}

var createCell = function() {
    var td = createElement('td');
    td.className = "container-cell";
    td.onclick = function(e){
        showChip(getSelectedCellNumber(e), rouletteChip());
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

var getTable = function(rows, cols){
    var table = createElement('table');
    for (var i = 0; i <= rows - 1; i++) {
        table.appendChild(
            createRow(i, cols - 1)
        )
    }
    return table;
};

window.addEventListener(
    "load",
    function() {
        var divContent = createElement('div');
        divContent.className = "container-div";
        var tblNew = getTable(4,3);
        var divShowCell = createElement('div');
        divShowCell.className = "container-show-div";
        divShowCell.id = "divResultCell";
        divContent.appendChild(tblNew);
        divContent.appendChild(divShowCell);
        document.body.appendChild(divContent);
    }
);
