var config = {
    cellWidth: 50,
    cellHeight: 50,
    chipWidth: 35,
    chipHeight: 35
};

var createElement = function(name) {
    return document.createElement(name);
};

var getChip = function() {
    var chip;
    deleteChip();
    chip = createElement('div');
    chip.id = 'chip_id';
    chip.className = "circle"
    return chip;
};

var deleteChip = function() {
    var chip = document.getElementsByClassName('circle');
    for(var i = chip.length - 1; 0 <= i; i--) {
        if(chip[i] && chip[i].parentElement) {
            chip[i].parentElement.removeChild(chip[i]);
        }
    }
};

var showChip = function(cell, chip) {
    var table = document.getElementsByTagName('table')[0];
    var marginLeft = (config.cellWidth - config.chipWidth);
    var marginTop = (config.cellHeight - config.chipHeight);

    chip.style.top = (cell.row * config.cellHeight) + marginTop;
    chip.style.left = (cell.column * config.cellWidth) + marginLeft;
    table.appendChild(chip);
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
    var table = document.getElementsByTagName('table')[0];
    var x = (e.clientX - table.offsetLeft);
    var y = (e.clientY - table.offsetTop);
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
            getChip()
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
        var tblNew = getTable(4,4);
        var divShowCell = createElement('div');
        divShowCell.className = "container-show-div";
        divShowCell.id = "divResultCell";
        divContent.appendChild(tblNew);
        divContent.appendChild(divShowCell);
        document.body.appendChild(divContent);
    }
);
