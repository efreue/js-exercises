var StartGame = function() {
    var board = document.querySelector('.board');
    var clear = document.getElementById('clearGame');
    clear.addEventListener('click', Game.clear);
    board.addEventListener('click', Game.onClickCell);
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
                Game.hasWinner = true;
            } else {
                Game.hasWinner = false;
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
            return  previous || current; //false or true = true 
        }, false);        
    },
    checkRow: function(matrix, row, symbol) {
        var indexRow = Number(row);
        var row = matrix[indexRow];
        var length = row.length;
        for (var i = 0; i < length; i++) {
            if (row[i] !== symbol) {
                return false;
            }
        }

        //si llega aqui, puedo colorear las celdas ya que es el ganador
        for (var i = 0; i < length; i++) {
            if (row[i] === symbol) {
                Board.colored(indexRow, i);
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
        //si llega aqui, puedo colorear las celdas ya que es el ganador
        for (var i = 0; i < length; i++) {
            if (matrix[i][column] === symbol) {
                Board.colored(i, Number(column));
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

        //si llega aqui, puedo colorear las celdas ya que es el ganador
        for (var i = 0; i < length; i++) {
            if (matrix[i][i] === symbol) {
                Board.colored(i, i);
            }
        }
        return true;
    },
    checkInvertedDiagonal: function(matrix, symbol) {
        //se analiza las posiciones 02, 11, 20
        var length = matrix.length;
        for (var i = 0, j = length - 1; i < length; i++, j--) {            
            if (matrix[i][j] !== symbol) {
                return false;
            }
        }

        //si llega aqui, puedo colorear las celdas ya que es el ganador
        for (var i = 0, j = length - 1; i < length; i++, j--) {
            if (matrix[i][j] === symbol) {
                Board.colored(i, j);
            }
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

var Board = {
    colored: function(row, column) {
        var id = "[data-row = '" + row + "'][data-column = '" + column + "']";
        var cell = document.querySelector(id);
        cell.className = "cell winColor";
    }
};

var Game = {
    hasWinner: false,
    onClickCell: function(event) {
        var target = event.target;
        var dataset = target.dataset;
        //console.log('target', target);    
        //console.log(dataset);
        if (dataset && dataset.row) {
            if (Game.hasWinner === false) {
                Data.input(dataset.row, dataset.column);
                Game.play();
            }
        }
    },
    play: function() {
        var data = new Data.output();
        Game.render(data);
    },
    clear: function() {
        var board = document.getElementsByClassName('cell');
        //limpio board
        for(i = 0; i < board.length; i++) {
            board[i].textContent = '';
            board[i].className = 'cell';
        }
        //limpio matrix
        Data.matrix = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        var lblMessage = document.getElementById('stateGame');
        lblMessage.textContent = '';
        Game.hasWinner = false;
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