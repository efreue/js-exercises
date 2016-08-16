var Css = {
	add: function(node, className) {
    	node.className += " " + className;
	}
};

var Config = {
	maxXPosition: window.innerWidth,
	maxYPosition: window.innerHeight,
	step: 24,
	direction: "left"
};

var EventBall = function(newBall) {};

EventBall.prototype.getPositionLeft = function(newBall) {
	return newBall.getBoundingClientRect().left;
};

EventBall.prototype.getPositionTop = function(newBall) {
	return newBall.getBoundingClientRect().top;
};

EventBall.prototype.stopMove = function(idInterval) {
	clearInterval(idInterval);
};

EventBall.prototype.startMove = function(newBall, myBall) {
	var idInterval = setInterval(myBall.startMove, 80, newBall, myBall);
	var posMoveLeft = parseInt(newBall.style.left);
	var posMoveTop = parseInt(newBall.style.top);
	var directionBall = Config.direction;
	switch (directionBall) {
		case "left":
			if ((posMoveLeft + Config.step) < Config.maxXPosition) {
				newBall.style.left = posMoveLeft + Config.step + 'px';
			}
			else {
				myBall.stopMove(idInterval);
				Config.direction = "diagonalRight"
			}
			break;
		case "diagonalRight":
			if (((posMoveLeft - Config.step) > 0) && ((posMoveTop - Config.step) > 0)) {
				newBall.style.left = posMoveLeft - Config.step + 'px';
				newBall.style.top = posMoveTop - Config.step + 'px';
			}
			else {
				myBall.stopMove(idInterval);
				Config.direction = "chau"
			}
			break;
		defaul:
			break;
	}

};

var PlayBall = function(newBall) {
	var myBall = new EventBall(newBall);
	newBall.style.left = myBall.getPositionLeft(newBall);
	newBall.style.top = myBall.getPositionTop(newBall);
	myBall.startMove(newBall,myBall);
};

var addNewBall = function() {
    var newBall = document.createElement("div");
    Css.add(newBall, "ball");
    document.body.appendChild(newBall);
	PlayBall(newBall);
};

