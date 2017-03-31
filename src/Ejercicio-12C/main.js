var createElement = function(name) {
    return document.createElement(name);
};

var getSelectedCellNumber = function(e) {
    var table = document.getElementsByTagName('table')[0];
    var x = (e.clientX - table.offsetLeft);
    var y = (e.clientY - table.offsetTop);

    var startW = 0;
    var endW = 0;
    var startH = 0;
    var endH = 0;
    var findCell = 0;

    /*console.log(' y = ' + y + ' x = ' + x + ' rows = ' + table.rows.length + ' cols = ' + table.rows[0].cells.length + ' widthTable = ' + table.offsetWidth + ' colWidth = ' + table.rows[0].cells[0].offsetWidth);
      */
    console.log(' posWidth = ' + x + ' posHeight = ' + y);
    for(i = 0; i <= (table.rows.length - 1); i++) {
        if(i == 0) {
            startW = i;
        } else {
            startW = endW + 1;
        }
        endW = (startW + table.rows[i].cells[i].offsetWidth) - 1;

        for(j = 0; j <= (table.rows[0].cells.length - 1); j++) {
            if(j == 0) {
                startH = j;
            } else {
                startH = endH + 1;
            }
            endH = (startH + table.rows[i].cells[j].offsetHeight) - 1;
            if ((x >= startW && x <= endW ) && (y >= startH && y <= endH)) {
                console.log('row = ' + i + ' col = ' + j + ' width = ' + startW + ' - ' + endW + ' height = ' + startH + ' - ' + endH);
                findCell = 1;
                break
            }
        }
        if (findCell == 1) {
            break;
        }

    }
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
