function StartGame() {
    var Board = document.querySelector('.board');
    Board.addEventListener('click', Cell.getPosition);
}

var Cell = {
    getPosition: function(event) {
        var element = event.target;
        var positionElement = element.dataset;
        console.log('element', positionCell);
    }
};

window.addEventListener('load', StartGame);
