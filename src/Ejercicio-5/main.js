var addNewBall = function() {
    var second = 24;
	var MaxPositionLeft = 800;
	var newBall = document.createElement("div");
    Css.add(newBall, "ball");
    document.body.appendChild(newBall);
	PlayBall(newBall, second, MaxPositionLeft);
};

var Css = {
	add: function (node, className) {
    	node.className += " " + className;
	}
};

var PlayBall = function(newBall, second, MaxPositionLeft) {
	var IdInterval = setInterval(MoveBallLeft, 80);
	function MoveBallLeft() {
		startMoveBall(newBall, second, MaxPositionLeft);
	}

	var startMoveBall = function(newBall, second, MaxPositionLeft) {
		var LeftPos = newBall.getBoundingClientRect().left;
		if (LeftPos < MaxPositionLeft)
		{
			newBall.style.left = (LeftPos + second) + 'px';
		}
		else
		{
			newBall.style.left = MaxPositionLeft + 'px';
			StopMoveBall(IdInterval);
		}
	}

	var StopMoveBall = function (IdInterval) {
		clearInterval(IdInterval);
	}
};
