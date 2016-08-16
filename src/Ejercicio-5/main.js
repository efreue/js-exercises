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
	initTop: 100
};

var Ball = function(initLeft, initTop, element) {
	this.element = element;
	this.x = initLeft;
	this.y = initTop;
};

Ball.prototype.updateLeft = function() {
	var x = this.x + Config.step;
	if(x < Config.maxXPosition) {
		this.x = x;
		this.element.style.left = this.x + 'px';
	}
};

var App = {
	interval: null,
	onEnterFrame: function() {
		ball.updateLeft();
	},
	start: function() {
		App.interval = setInterval(App.onEnterFrame, Config.interval);
	},
	stop: function() {
		clearInterval(App.interval);
	},
	createBall: function() {
		var element = document.createElement("div");
		Css.add(element, "ball");
		document.body.appendChild(element);
		window.ball = new Ball(Config.initLeft, Config.initTop, element);
	}
};
