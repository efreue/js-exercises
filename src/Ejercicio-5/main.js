var Css = {
	add: function(node, className) {
    	node.className += " " + className;
	}
};

var Config = {
	maxXPosition: 800,
	step: 24
};

var EventBall = function(newBall) {};

EventBall.prototype.getPosition = function(newBall) {
	return newBall.getBoundingClientRect().left;
};

EventBall.prototype.stopMoveLeft = function(idInterval) {
	clearInterval(idInterval);
};

EventBall.prototype.startMoveLeft = function(newBall, myBall) {
	var idInterval = setInterval(myBall.startMoveLeft, 80, newBall, myBall);
	var posMove = parseInt(newBall.style.left);
	if ((posMove + Config.step) < Config.maxXPosition) {
		newBall.style.left = posMove + Config.step + 'px';
	}
	else {
		myBall.stopMoveLeft(idInterval);
	}
};

var PlayBall = function(newBall) {
	var myBall = new EventBall(newBall);
	newBall.style.left = myBall.getPosition(newBall);
	myBall.startMoveLeft(newBall,myBall);
};

var addNewBall = function() {
    var newBall = document.createElement("div");
    Css.add(newBall, "ball");
    document.body.appendChild(newBall);
	PlayBall(newBall);
};

