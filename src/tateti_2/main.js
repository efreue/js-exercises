var StartGame = function() {
    var Board = document.querySelector('.board');
    var Clear = document.getElementById('clearGame');
    Clear.addEventListener('click', Game.clear);
    Board.addEventListener('click', Game.onClickCell);
};

var Data = {
    player: 'X',
    matrix: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    output: function() {
        return Data.matrix;
    },
    input: function(row, column) {
        if (Data.setValue(row, column)) {
            if (Data.checkGame(row, column)) {
                var lblMessage = document.getElementById('stateGame');
                lblMessage.textContent = 'Win Player ' + Data.player;
                console.log('gano ', Data.player);
            } else {
                Data.changePlayer();
            }            
        }        
    },
    checkGame: function(row, column) {
        var matrix = Data.matrix;
        var symbol = Data.player;
        var checks = [
            Data.checkRow(matrix, row, symbol),
            Data.checkColumn(matrix, column, symbol),
            Data.checkDiagonal(matrix, symbol),
            Data.checkInvertedDiagonal(matrix, symbol)
        ];
        return checks.reduce(function(previous, current) {
            return previous + current; 
        }, false);        
    },
    checkRow: function(matrix, row, symbol) {
        var row = matrix[row];
        var length = row.length;
        for (var i = 0; i < length; i++) {
            if (row[i] !== symbol) {
                return false;
            }
        }
        return true;
    },
    checkColumn: function(matrix, column, symbol) {
        var length = matrix.length;
        for (var i = 0; i < length; i++) {
            if (matrix[i][column] !== symbol) {
                return false;
            }
        }
        return true;
    },
    checkDiagonal: function(matrix, symbol) {
        //se analiza las posiciones 00, 11, 22
        var length = matrix.length;
        for (var i = 0; i < length; i++) {
            if (matrix[i][i] !== symbol) {
                return false;
            }
        }
        return true;
    },
    checkInvertedDiagonal: function(matrix, symbol) {
        //se analiza las posiciones 02, 11, 20
        var length = matrix.length;
        var j = length - 1;
        for (var i = 0; i < length; i++) {            
            if (matrix[i][j] !== symbol) {
                return false;
            }
            j--;
        }
        return true;
    },
    setValue: function(row, column) {
        var matrix = Data.matrix;
        if (matrix[row][column] === null) {
            matrix[row][column] = Data.player;
            return true;
        }        
        return false;
    },
    changePlayer: function() {
        Data.player = Data.player === 'X' ? 'O' : 'X'; 
    }
};

var Game = {
    onClickCell: function(event) {
        var target = event.target;
        var dataset = target.dataset;
        //console.log(dataset);
        //console.log('target', target);    
        if (dataset && dataset.row) {
            Data.input(dataset.row, dataset.column);
            Game.play();
        }
    },
    play: function() {
        var data = new Data.output();
        Game.render(data);
    },
    clear: function() {
        var board = document.getElementsByClassName('cell');
        var matrix = Data.matrix;
        //limpio board
        for(i = 0; i < board.length; i++) {
            board[i].textContent = '';
        }
        //limpio matrix
        for (i = 0; i < matrix.length; i++) {
            for(j = 0; j < matrix[i].length; j++) {
                if (typeof matrix[i][j] !== 'undefined' && matrix[i][j] !== null) {
                    matrix[i][j] = null;
                }                
            }
        }
        var lblMessage = document.getElementById('stateGame');
        lblMessage.textContent = '';
    },
    render: function(matrix) {
        var values = matrix.reduce(
            function(array, row, rowIndex) {
                return array.concat(
                    row.map(
                        function(cell, cellIndex) {
                            return {
                                value: cell,
                                id: 'cell-' + rowIndex + '-' + cellIndex
                            };
                        }
                    )
                );
            },
            //el valor inicial se pasa vacio
            []
        )
        //console.log(values);
        values.forEach(function(cell){
            var cellElement = document.getElementById(cell.id);
            var valueCell = ''; 
            if(cell.value != null) {
                valueCell = cell.value
            }
            cellElement.innerHTML = valueCell;
        });
    }
};
window.addEventListener('load', StartGame);