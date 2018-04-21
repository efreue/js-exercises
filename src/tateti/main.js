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
    existWin:null,
    play: function(event) {
        var squareSelected;
        if (Game.getWin() === 0 || Game.getWin() === null || Game.getWin() === 'undefined') {
            squareSelected = Square.get(event);
            if (squareSelected !== null) {
                var privchip = Chip.create(squareSelected);
                if (privchip !== null) {
                    Chip.setCount();
                    Game.addMatrix(squareSelected.row, squareSelected.col, privchip.textContent);
                    if (Chip.getCount() >= 5) {
                        var symbolWin = Game.getWinners();
                        if (symbolWin === 'X' || symbolWin === 'O') {
                            var lblMensaje = document.getElementById('stateGame');
                            lblMensaje.textContent = 'Win Player ' + symbolWin;     
                            Game.setWin(1);   
                        }                         
                    }
                }
            }
        }        
    },
    getWinners: function() {
        if 
        (
            ((Matrix[0][0] === Matrix[0][1]) && (Matrix[0][0] === Matrix[0][2])) ||
            ((Matrix[0][0] === Matrix[1][1]) && (Matrix[0][0] === Matrix[2][2])) ||
            ((Matrix[0][0] === Matrix[1][0]) && (Matrix[0][0] === Matrix[2][0]))
        ) {
            return Matrix[0][0];
        } else if ((Matrix[0][1] === Matrix[1][1]) && (Matrix[0][1] === Matrix[2][1])) {
            return Matrix[0][1];
        } else if ((Matrix[0][2] === Matrix[1][2]) && (Matrix[0][2] === Matrix[2][2])) {
            return Matrix[0][2];
        } else if ((Matrix[1][0] === Matrix[1][1]) && (Matrix[1][0] === Matrix[1][2])) {
            return Matrix[1][0];
        } else if ((Matrix[2][0] === Matrix[2][1]) && (Matrix[2][0] === Matrix[2][2])) { 
            return Matrix[2][0];
        } else if ((Matrix[2][0] === Matrix[1][1]) && (Matrix[2][0] === Matrix[0][2])) { 
            return Matrix[2][0];
        } else {
            return '';
        }
    },
    addMatrix: function(row, col, symbol) {
        Matrix[row][col] = symbol;
    },
    Initialize: function() {
        var i,j;
        var lblMensaje = document.getElementById('stateGame');
        lblMensaje.textContent = '';
        Game.setWin(0);
        Chip.increment = 0;
        var buttons = document.getElementsByClassName('cell');
        for(i = 0; i < buttons.length; i++) {
            buttons[i].textContent = '';
        }
        //falta limpiar matrix
        for (i = 0; i < Matrix.length; i++) {
            for(j = 0; j < Matrix[i].length; j++) {
                if (typeof Matrix[i][j] !== 'undefined' && Matrix[i][j] !== null) {
                    Matrix[i][j] = null;
                }                
            }
        }
    },
    setWin: function(value) {
        Game.existWin = value;
    },
    getWin: function() {
        return Game.existWin;
    } 
};

window.addEventListener('load', StartGame);