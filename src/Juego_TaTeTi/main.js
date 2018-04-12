var Config = {
    chip_start: 'X'
};

function StartGame() {
    var Board = document.querySelector('.board');
    var startButton = document.getElementById('startGame');
    startButton.addEventListener('click', game.start);
    Board.addEventListener('click', game.play);
    
    //console.log(LetterSelected.get());
    
}


var Cell = {
    getPosition: function(event) {
        var element = event.target;
        var positionElement = element.dataset;
        //console.log('PositionElement', positionElement.row, positionElement.col);
        if (positionElement && positionElement.row) {
            return {
                row: positionElement.row,
                col: positionElement.col
            }
        }        
    }
};


var LetterSelected =  {
    p_Letter: '',    
    get: function() {
        return LetterSelected.p_Letter
    },
    set: function(letter) {
        LetterSelected.p_Letter = letter;
    }
}; 


var Chip = {
    add: function(cellSelected, letter) {
        var id = 'cell-' + cellSelected.row + '-' + cellSelected.col;
        var cellDiv = document.getElementById(id);
        cellDiv.textContent = letter;
    }
};

var game = {
    matriz:[
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    getMatriz: function() {
        return game.matriz;
    },    
    start: function() {
        console.log('start');
    },
    play: function(event) {
        var let;
        if (LetterSelected.get() === '') {
            LetterSelected.set(Config.chip_start);        
            let = LetterSelected.get();
        } 
        else {
            if(LetterSelected.get() === 'X') {
                let = 'O';   
                LetterSelected.set(let); 
            }
            else {
                let = 'X';   
                LetterSelected.set(let);     
            }
        }

        var cellSel = Cell.getPosition(event);
        Chip.add(cellSel, let);
        //console.log('start');
    }
};

window.addEventListener('load', StartGame);
