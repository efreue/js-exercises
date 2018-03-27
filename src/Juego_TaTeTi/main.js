function StartGame() {
    var Board = document.querySelector('.board');
    Board.addEventListener('click', Cell.getPosition);
}

var Cell = {
    getPosition: function(event) {
        var element = event.target;
        var positionElement = element.dataset;
        console.log('element', positionElement);
    }
};a
/*
var game = {
    matriz:[
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    getMatriz: function() {
        return this.matriz;
    },
    loadMatriz: function(cell) {
        
    },
    start: function() {
        var play = new this.matriz();
        play.getMatriz();
    }

};
*/
window.addEventListener('load', StartGame);
