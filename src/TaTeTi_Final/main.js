var Config = {
    chip_start: 'X'
};

function StartGame() {
    var Board = document.querySelector('.board');
    var clearButton = document.getElementById('clearGame');
    Board.addEventListener('click', Game.addChip);
    clearButton.addEventListener('click', Chip.remove);
};

var Cell = {
    getPosition: function(event) {
        var element = event.target.dataset;
        //console.log('PositionElement', element.row, element.col);
        if (element && element.row) {
            return {
                row: element.row,
                col: element.col
            }
        }        
    }
};

var Letter =  {
    value: '',    
    get: function() {
        return Letter.value
    },
    set: function(letter) {
        Letter.value = letter;
    },
    selected: function() {
        if (Letter.get() === '') {
            Letter.set(Config.chip_start);
        }
        else {
            if (Letter.get() === 'X') {
                Letter.set('O');
            }
            else {
                Letter.set('X');
            }
        }
        return Letter.get();
    }
}; 


var Chip = {
    increment: 0,
    add: function(cellSelected) {
        var id = 'cell-' + cellSelected.row + '-' + cellSelected.col;
        var cellDiv = document.getElementById(id);
        if (cellDiv.textContent === '') {
            cellDiv.textContent = Letter.selected();
            Game.addItemList(cellSelected, cellDiv.textContent);
            if(Chip.getCount() >= 5) {
                console.log('comienza analisis de matriz');
            }
        }        
    },
    remove: function() {
       console.log('clear chips');
    },
    setCount: function() {
        Chip.increment += 1;
    },
    getCount: function() {
        return Chip.increment;
    }
};

var ListLetters = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];



var Game = {
    addItemList: function(cell, letter) {
        ListLetters[cell.row] [cell.col] = letter;
        Chip.setCount();
        console.log(ListLetters);
    },
    addChip: function(event) {        
        var cellSelected = Cell.getPosition(event);
        Chip.add(cellSelected);
    }
};

window.addEventListener('load', StartGame);