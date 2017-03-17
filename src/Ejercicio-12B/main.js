var tableTdAux = [];

var createElement = function(name) {
    return document.createElement(name);
};

var selectedRangeCell = function(startLeft, endLeft, startTop, endTop) {
    this.startLeft = startLeft;
    this.startTop = startTop;
    this.endLeft = endLeft;
    this.endTop = endTop;
}


var createCell = function(numCell) {
    var td = createElement('td');
    if (numCell == 0) {
        td.setAttribute('rowspan', 4);
    }
    td.className = "container-board";
    td.appendChild(getCircle(numCell));
    td.onclick = function(e){
        getMousePosition(e);
    };
    return td;
};

var createCellAux = function(numCell) {
    var td = createElement('td');

    td.className = "container-board-aux";
    td.style.width = 25;
    td.style.height = 32;
    /*td.onclick = function(e){
        getMousePosition(e);
    };*/
    return td;
};


var getMousePosition = function(e) {
    var table = document.getElementsByTagName('table')[0];
    var x = e.clientX - table.offsetLeft;
    var y = e.clientY - table.offsetTop;
    console.log(' y = ' + y + ' x = ' + x + ' table.offsetLeft = ' + table.offsetLeft +  ' totalTbl = ' + tableTdAux.length);
    var chip;

    var chipAux = document.getElementsByClassName('circle');
    if(chipAux.length > 0) {
        for(var j=0; j <= chipAux.length - 1; j++) {
            chipAux[j].style.display='none';
        }
    }

    for(var i = 0; i < tableTdAux.length; i++) {
        if((y >= tableTdAux[i].startTop && y <= tableTdAux[i].endTop) && (x >= tableTdAux[i].startLeft && x <= tableTdAux[i].endLeft)) {
            /*console.log('celda = ' + i + ' startH = ' + tableTdAux[i].startTop + ' endH = ' + tableTdAux[i].endTop + ' startL = ' + tableTdAux[i].startLeft + ' endL = ' + tableTdAux[i].endLeft + ' offsetLeft = ' + table.offsetLeft + ' offsetTop = ' + table.offsetTop );*/
            chip = getRuletteChip();
            chip.className="circle"
            chip.style.left = tableTdAux[i].startLeft + table.offsetLeft;
            chip.style.top = tableTdAux[i].startTop + table.offsetTop;
            table.appendChild(chip);
        }
    }
};

var generateTableAux = function(tdWidth, tdHeight, cols, rows, PostitionTopTable, PostitionLeftTable) {
    var tblAux = [];
    var minTdTop = parseInt(tdHeight * 0.25);
    var minTdLeft = parseInt(tdWidth * 0.25);
    var minTdWidth = parseInt(tdWidth * 0.5);
    var minTdHeigth = parseInt(tdHeight * 0.5);
    var colsNew = (cols * 2);
    var rowsNew = (rows * 2)
    /*
    console.log('minTdWidth = ' + minTdWidth + ' minTdHeigth = ' + minTdHeigth + ' colsNew = ' + colsNew + ' rowsNew = ' + rowsNew + ' PostitionTopTable = ' + PostitionTopTable + ' minTdTop = ' + minTdTop + ' PostitionLeftTable = ' + PostitionLeftTable + ' minTdLeft = ' + minTdLeft);
    */
    var startL = 0;
    var endL = 0;
    var startH = 0;
    var endH = 0;
    var numCell = 0;
    for(var i = 0; i <= rowsNew - 1 ; i++) {
        if(startH == 0) {
            startH = (minTdTop) ;
             endH = (startH + minTdHeigth);
        }
        else {
            startH += minTdHeigth;
            endH = (startH + minTdHeigth);
            if(i < rowsNew - 1) {
                endH -= 1;
            }
        }
        for(var j = 0; j <= colsNew; j++) {
            if(startL == 0) {
                startL = (minTdLeft + tdWidth);
                endL = (startL + minTdWidth);
            }
            else {
                startL += minTdWidth + 1;
                endL = (startL + minTdWidth);
            }

            //agregar objeto
            console.log('celda = ' + numCell  + ' startH = ' + startH + ' endH = ' + endH + ' startL = ' + startL + ' endL = ' + endL);
            var row = new selectedRangeCell(startL, endL, startH, endH);
            tblAux.push(row);
            numCell += 1;

        }
        startL = 0;
    }
     tableTdAux = tblAux;
};

var createColourRow = function(numberRow, numberCells) {
    var tr = createElement('tr');

    for(var i = 0; i <= numberCells; i++ ) {
        tr.appendChild(
            createCell(numberRow)
        );
        numberRow += 3;
    }
    return tr;
};

var createColourRowAux = function(numberRow, numberCells) {
    var tr = createElement('tr');

    for(var i = 0; i <= numberCells; i++ ) {
        tr.appendChild(
            createCellAux(numberRow)
        );
        numberRow += 3;
    }
    return tr;
};


var createZeroRow = function() {
    var tr = createElement('tr');
    tr.appendChild(
        createCell(0)
    );
    return tr;
};

var getColor = function(num) {
    var color = '';
    switch(num) {
        case 0:
            color = 'green';
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 9:
        case 12:
        case 14:
        case 16:
        case 18:
        case 19:
        case 21:
        case 23:
        case 25:
        case 32:
        case 27:
        case 30:
        case 34:
        case 36:
            color = 'red';
            break;
        default:
            color = 'black';
            break;
    }
    return color;
};

var getRuletteChip = function() {
    var chip = createElement('div');
    chip.id = 'chipRule';
    return chip;
}


var getCircle = function(number) {
    var circle = createElement('div');

    circle.className = "shape num-white horizontal-centered-text " + getColor(number);
    circle.textContent = number;

    if(number == 0) {
        circle.className += " border-disappear";
    }
    return circle;
};

window.addEventListener(
    "load",
    function() {
        var divContent = createElement('div');
        var table = createElement('table');
        var tableAux = createElement('table');
        tableAux.id = 'tblAux';
        divContent.className = "container-roulette";
        table.appendChild(createZeroRow());

        for (var i = 3; i >= 1; i--) {
            table.appendChild(
                createColourRow(i, 11)
            );
        }

        for (var i = 6; i >= 1; i--) {
            tableAux.appendChild(
                createColourRowAux(i, 22)
            );
        }
        divContent.appendChild(table);
        divContent.appendChild(tableAux);
        document.body.appendChild(divContent);

        var tblA = document.getElementById('tblAux');
        //tblA.style.position='absolute';
        tblA.style.left = tblA.offsetLeft + 78;
        tblA.style.top = 105;
        var tablePrin = document.getElementsByTagName('table')[0];

        generateTableAux(65, 65, 11, 3, tablePrin.offsetTop, tablePrin.offsetLeft);
    }
);


