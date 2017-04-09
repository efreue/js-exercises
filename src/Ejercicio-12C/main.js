var createElement = function(name) {
    return document.createElement(name);
};

var rouletteChip = function() {
    var chip;
    deleteChip();
    chip = createElement('div');
    chip.id = 'chip_id';
    chip.className="circle"
    return chip;
}

var deleteChip = function() {
    var chip = document.getElementsByClassName('circle');
    if(chip.length > 0) {
        for(var j=0; j <= chip.length - 1; j++) {
            chip[j].style.display='none';
        }
    }
}

var showChip = function(cell, chip, cellWidth, cellHeight) {
    var table = document.getElementsByTagName('table')[0];
    var moveLeft = 0;
    var moveTop = 0
    if(cell.column == cell.row) {
        moveLeft = ((cell.column/3) * cellWidth);
        moveTop = ((cell.row/3) * cellHeight);
    } else {
        if(cell.column > cell.row) {
            moveLeft = (cell.column * cellWidth);
            moveTop = ((cell.row/3) * cellHeight);
        } else {
            moveLeft = ((cell.column/3) * cellWidth);
            moveTop = (cell.row * cellHeight);
        }
    }
    chip.style.left = moveLeft;
    chip.style.top = moveTop;
    console.log('row: ' + cell.row + ' column: ' + cell.column + ' cellWidth: ' + cellWidth + ' cellHeight: ' + cellHeight + ' LEFT: ' + chip.style.left + ' TOP: ' + chip.style.top);
    table.appendChild(chip);
}

var GetCell = function(xCoord, yCoord, cellWidth, cellHeight) {
    return {
        row: Math.floor(yCoord/cellHeight) + 1,
        column: Math.floor(xCoord/cellWidth) + 1
    };
};

var showSelectedCell = function(cell) {
    var divResul = document.getElementById('divResultCell');
    divResul.textContent = 'column: ' + cell.column + ' row: ' + cell.row;
}



var getSelectedCellNumber = function(e, cellWidth, cellHeight) {
    var table = document.getElementsByTagName('table')[0];
    var x = (e.clientX - table.offsetLeft);
    var y = (e.clientY - table.offsetTop);
    var cell = GetCell(x, y, cellWidth, cellHeight);
    showSelectedCell(cell);
    return cell;
}

var createCell = function() {
    var td = createElement('td');
    td.className = "container-cell";
    td.onclick = function(e){
        showChip(getSelectedCellNumber(e,50,50), rouletteChip(), 50,50);
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
