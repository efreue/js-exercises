var addNewBall = function() {
    var newBall = document.createElement("div");
    Css.add(newBall, "ball");
    document.body.appendChild(newBall);
    initialMoveBall(newBall);
};

var Css = {
	add: function (node, className) {
    	node.className += " " + className;
	}
};

var initialMoveBall = function(newBall) {
	var i = 24;
    while (newBall.getBoundingClientRect().left <= 800){
		setInterval(moveBall(newBall, i), 80);
	}
	alert(newBall.style.left);
};

var moveBall = function(newBall, i) {
	newBall.style.left = newBall.getBoundingClientRect().left + i;
};

