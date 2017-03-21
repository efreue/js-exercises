var createElement = function(name) {
    return document.createElement(name);
};

var getSelectedCellNumber = function(e) {
    var table = document.getElementsByTagName('table')[0];
    var x = (e.clientX - table.offsetLeft);
    var y = (e.clientY - table.offsetTop);
    console.log(' y = ' + y + ' x = ' + x + ' table.offsetLeft = ' + table.offsetLeft +  ' table.offsetTop = ' + table.offsetTop);
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
        var tblNew = getTable(2,2);
        divContent.appendChild(tblNew);
        document.body.appendChild(divContent);
    }
);
