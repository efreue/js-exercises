var Css = {
	add: function(node, className) {
		node.className += " " + className;
	}
};

var Config = {
	maxXPosition: 800,
	step: 24,
	interval: 80,
	initLeft: 100,
	initTop: 100,
	increaseTop: 90,
	countBall: 0,
	acumulateTop: function () {
		return Config.initTop += Config.increaseTop;
	}
};

var Ball = function(initLeft, initTop, element) {
	this.element = element;
	this.x = initLeft;
	this.y = initTop;
	this.moveLeft = function() {
		var x = this.x + Config.step;
		if(x < Config.maxXPosition) {
			this.x = x;
			this.element.style.left = this.x + 'px';
		}
	};
	this.moveTop = function() {
		this.element.style.top = this.y + 'px';
	}
};

var App = {
	createBall: function() {
		var setTopBall = 0;
		var element = document.createElement("div");
		Css.add(element, "ball");
		document.body.appendChild(element);
		if (Config.countBall == 0) {
			setTopBall = Config.initTop;
		}
		else {
			setTopBall = Config.acumulateTop();
		}
		Config.countBall+=1;
		var ball = new Ball(Config.initLeft, setTopBall, element);

		ball.moveTop();
		ball.moveLeft();
	}
}
