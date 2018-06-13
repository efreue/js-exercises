var StartGame = function() {
    var Board = document.querySelector('.board');
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
            Data.changePlayer();
        }        
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