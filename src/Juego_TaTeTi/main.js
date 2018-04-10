function StartGame() {
    var Board = document.querySelector('.board');
    var startButton = document.getElementById('startGame');
    startButton.addEventListener('click', game.start);
    Board.addEventListener('click', Cell.getPosition);

}

var Cell = {
    getPosition: function(event) {
        var element = event.target;
        var positionElement = element.dataset;
        if (positionElement && positionElement.row) {
            console.log('PositionElement', positionElement.row, positionElement.col);
        }        
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
    }
};

window.addEventListener('load', StartGame);
