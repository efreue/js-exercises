var Config = {
    chip_start: 'X'
};

function StartGame() {
    var Board = document.querySelector('.board');
    Board.addEventListener('click', game.addChip);
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
        if(Letter.get() === '') {
            Letter.set(Config.chip_start);
        }
        else {
            if(Letter.get() === 'X') {
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
    add: function(cellSelected, letterSelected) {
        var id = 'cell-' + cellSelected.row + '-' + cellSelected.col;
        var cellDiv = document.getElementById(id);
        cellDiv.textContent = letterSelected;
    }
};


var game = {
    addChip: function(event) {
        var letterSelected  = Letter.selected();
        var cellSelected = Cell.getPosition(event);
        Chip.add(cellSelected, letterSelected);
    }
};

window.addEventListener('load', StartGame);