var StartGame = function() {
    var Board = document.querySelector('.board');
    Board.addEventListener('click', Game.onClickCell);
};

var Game = {
    onClickCell: function(event) {
        var target = event.target;
        var dataset = target.dataset;
        //console.log(dataset);
        //console.log('target', target);    
        if (dataset && dataset.row) {
            console.log('pos', dataset.row, dataset.column);
        }
    }
};
window.addEventListener('load', StartGame);