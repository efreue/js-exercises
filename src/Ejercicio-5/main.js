var Css = {
	add: function (node, className) {
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

EventBall.prototype.startmoveLeft = function(newBall,idInterval) {
	var posMove = parseInt(newBall.style.left);
	if (( posMove + Config.step) < Config.maxXPosition) {
			newBall.style.left = posMove + Config.step + 'px';
	}
	else {
		this.StopMoveLeft(idInterval);
	}
};


var PlayBall = function(newBall) {
	var myBall = new EventBall(newBall);
	var	leftPos = myBall.getPosition(newBall)
	newBall.style.left = leftPos;
	var idInterval = setInterval(myBall.startmoveLeft, 80, newBall, idInterval);
};


var addNewBall = function() {
    var newBall = document.createElement("div");
    Css.add(newBall, "ball");
    document.body.appendChild(newBall);
	PlayBall(newBall);
};

