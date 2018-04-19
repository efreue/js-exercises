var Config = {
    chipStart: 'X'
};

var StartGame = function() {
    var Board = document.querySelector('.board');
    var ClearButton = document.getElementById('clearGame');
    Board.addEventListener('click', Game.play);
    ClearButton.addEventListener('click', Game.Initialize)
};

var Square = {
    get: function(element) {
        var element = event.target.dataset;
        if (element && element.row) {
            return {
                row: element.row,
                col: element.col
            };
        } else {
            return null;
        }
    }
};

var Symbol = {
    privalue: '',
    get: function() {
        return Symbol.privalue;
    },
    set: function(extvalue) {
        Symbol.privalue = extvalue;
    },
    selected: function() {
        if (Symbol.get() === '') {
            Symbol.set(Config.chipStart);
        } else if (Symbol.get() === 'X') {
            Symbol.set('O');
        } else {
            Symbol.set('X');
        }
        return Symbol.get();
    }
};

var Matrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

var Chip = {
    increment: 0,
    create: function(square) {
        var id = "[data-row = '" + square.row + "'][data-col = '" + square.col + "']"; 
        var button = document.querySelector(id);
        if (button.textContent === '') {
            button.textContent = Symbol.selected();
            return button;
        } else {
            return null;
        }
    },
    setCount: function() {
        Chip.increment += 1;
    },
    getCount: function() {
        return Chip.increment;
    }
};

var Game = {
    play: function(event) {
        var squareSelected = Square.get(event);
        if (squareSelected !== null) {
            var privchip = Chip.create(squareSelected);
            if (privchip !== null) {
                Chip.setCount();
                Game.addMatrix(squareSelected.row, squareSelected.col, privchip.textContent);
            }
        }
    },
    addMatrix: function(row, col, symbol) {
        Matrix[row][col] = symbol;
    },
    Initialize: function() {
        var buttons = document.getElementsByClassName('cell');
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].textContent = '';
        }
        //falta limpiar matrix
    } 
};

window.addEventListener('load', StartGame);