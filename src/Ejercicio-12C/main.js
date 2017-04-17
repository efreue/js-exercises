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
    increment: function(countChip) {
        return ++countChip;
    },
    decrement: function(countChip) {
        return (countChip > 1) ? --countChip : 0;
    },
    create: function() {
        var oneChip;
        var countChip = 1,
        oneChip = createElement('div');
        oneChip.id = 'chip_id';
        oneChip.className = "circle";
        oneChip.onclick = function(e){
            var totalChip = this.innerHTML;
            if(e.ctrlKey){
               this.innerHTML = chip.decrement(totalChip);
               if(this.innerHTML == "0") {
                   chip.delete(this);
               }
            } else {
               this.innerHTML = chip.increment(totalChip);
            }
        }
        oneChip.innerHTML = countChip;
        return oneChip;
    },
    delete: function(chipRem) {
        chipRem.parentElement.removeChild(chipRem);
        //this.remove;
    }
}

var createNewChip = function() {
        var newChip = new chip.create();
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

var createButton = function() {
    var button = createElement('input');
    button.setAttribute('type', 'button')
    button.className = "container-button";
    button.setAttribute('value', 'Delete All Chip');
    button.onclick = function() {
        deleteAllChip();
    };
    return button;
}
window.addEventListener(
    "load",
    function() {
        var divContent = createElement('div');
        divContent.className = "container-div";
        config.table = createTable(4,4);
        var divShowCell = createElement('div');
        divShowCell.className = "container-show-div";
        divShowCell.id = "divResultCell";
        var button = createButton();
        divContent.appendChild(config.table);
        divContent.appendChild(divShowCell);
        divContent.appendChild(button);
        document.body.appendChild(divContent);
    }
);
