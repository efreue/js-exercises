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
	this.interval = 0;
	this.finish = 0;
};

Ball.prototype.setInterval = function(idIntervalBall) {
	this.interval = idIntervalBall;
}

Ball.prototype.updateLeft = function() {
	var x = this.x + Config.step;
	if(x < Config.maxXPosition) {
		this.x = x;
		this.element.style.left = this.x + 'px';
	}
};

var App = {
	ball: null,
	interval: null,
	onEnterFrame: function() {
		if (ball.interval == 0) {
			ball.setInterval(App.terval);
		}
		ball.updateLeft();
		if (ball.finish == 1) {
			App.stop();
		}
	},
	start: function() {
		App.terval = setInterval(App.onEnterFrame, Config.interval);
	},
	stop: function() {
		clearInterval(ball.interval);
	},
	createBall: function() {
		var element = document.createElement("div");
		Css.add(element, "ball");
		document.body.appendChild(element);
		ball = new Ball(Config.initLeft, Config.initTop, element);
		App.start();
	}
};
