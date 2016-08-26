var Css = {
	add: function(node, className) {
		node.className += " " + className;
	}
};

var Config = {
	step: 24,
	interval: 80,
	initLeft: 100,
	initTop: 100,
	increaseTop: 90,
	firstClickButtonAdd: 0,
	acumulateTop: function () {
		return Config.initTop += Config.increaseTop;
	}
};

var Ball = function(initLeft, initTop, element) {
	this.element = element;
	this.x = initLeft;
	this.y = initTop;
	this.endDiagonalyTopDown = 0;
	this.endDiagonalyTopUp = 0;
	this.endDirectionWidthLeft = 0;
	this.endDirectionWidthRight = 0;
	this.setScreenWidth = function() {
		return document.body.clientWidth;
	}
	this.setScreenHeight = function() {
		return document.body.clientHeight;
	}
	this.moveLeft = function (posLeft, direction) {
		if (direction === "left") {;
			var l = posLeft + Config.step;
			if(l <= this.setScreenWidth()) {
				this.element.style.left = l + 'px';
				this.endDirectionWidthLeft = 0;
			}
			else {
				this.endDirectionWidthLeft = 1;
			}
		}
		else {
			var r = posLeft - Config.step;
			if(r >= this.setScreenHeight()) {
				this.element.style.left = r + 'px';
				this.endDirectionWidthRight = 0;
			}
			else {
				this.endDirectionWidthRight = 1;
			}
		}
	}
	this.moveDiagonalyDown = function(posTop, direction) {
		if (direction === "down") {
			var d = posTop + Config.step;
			if (d <= this.setScreenHeight()) {
				this.element.style.top = d + 'px';
				this.endDiagonalyTopDown = 0;
			}
			else {
				this.endDiagonalyTopDown = 1;
			}
		}
		else {
			var t = posTop - Config.step;
			if (t >= this.setScreenHeight()) {
				this.element.style.top = d + 'px';
				this.endDiagonalyTopUp = 0;
			}
			else {
				this.endDiagonalyTopUp = 1;
			}

		}

	}
	this.move = function() {
		if (App.paused == 1) {
			return;
		}
		else {
			var posLeft = this.element.offsetLeft;
			var posHight = this.element.offsetTop;

			if (this.endDirectionWidthLeft == 0) {
				this.moveLeft(posLeft,"left");
			}
			if (this.endDiagonalyTopDown == 0) {
				this.moveDiagonalyDown(posHight,"down");
			}

		}
	}
};

var App = {
	paused: 0,
	interval: null,
	createBall: function() {
		var setTopBall = 0;
		var element = document.createElement("div");
		element.className = "clsBall";
		Css.add(element, "ball");
		document.body.appendChild(element);
		if (Config.firstClickButtonAdd == 0) {
			setTopBall = Config.initTop;
		}
		else {
			setTopBall = Config.acumulateTop();
		}
		var ball = new Ball(Config.initLeft, setTopBall, element);
		if (Config.firstClickButtonAdd == 0) {
			App.activeButton("add");
			App.start(ball);
			Config.firstClickButtonAdd = 1;
		}
	},
	moveObj: function(ball) {
		ball.move();
	},
	start: function(ball) {
		App.interval = setInterval(App.moveObj, Config.interval, ball);
	},
	pause: function() {
		App.paused = 1;
		App.activeButton("pause");
	},
	play: function() {
		App.paused = 0;
		App.activeButton("play");
	},
	activeButton: function(idButton) {
		switch(idButton) {
			case "pause":
				document.getElementById("pause").disabled = true;
				document.getElementById("play").disabled = false;
				break;
			case "play":
				document.getElementById("pause").disabled = false;
				document.getElementById("play").disabled = true;
				break;
			case "add":
				document.getElementById("pause").disabled = false;
				document.getElementById("play").disabled = true;
				break;
		}
	}
}
