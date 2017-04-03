var createElement = function(name) {
    return document.createElement(name);
};

var selectCell = function(xCoord, yCoord, cellWidth, cellHeight) {
    var cellRow;
    var cellCol;
    cellWidth -= 2;
    if (xCoord < cellWidth ) {
        cellCol = 0;
    }
    else {
        if(xCoord >= cellWidth){
            cellCol = Math.trunc(xCoord/cellWidth);
        }
    }

    if (yCoord < cellHeight) {
        cellrow = 0;
    }
    else {
        if(yCoord >= cellHeight){
            cellRow = Math.trunc(yCoord/cellHeight);
        }
    }
    console.log('row: ' + cellRow + ', column: ' + cellCol);
    return {row: cellRow, column: cellCol};
};

var getSelectedCellNumber = function(e) {
    var table = document.getElementsByTagName('table')[0];
    var x = (e.clientX - table.offsetLeft);
    var y = (e.clientY - table.offsetTop);
    var r = [];

    r = selectCell(x, y, 50, 50);
}

var createCell = function() {
    var td = createElement('td');
    td.className = "container-cell";
    td.onclick = function(e){
        getSelectedCellNumber(e);
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
        divContent.appendChild(tblNew);
        divContent.appendChild(divShowCell);
        document.body.appendChild(divContent);
    }
);
