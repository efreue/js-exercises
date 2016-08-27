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
	stepTop: 90,
	firstClickButtonAdd: 0,
	increaseTop: 0
};

var Ball = function(initLeft, initTop, element) {
	this.element = element;
	this.x = initLeft;
	this.element.style.top = initTop + 'px';
	this.endDiagonalyTopDown = 0;
	this.endDirectionWidthLeft = 0;
	this.setScreenWidth = function() {
		return document.body.clientWidth;
	};
	this.setScreenHeight = function() {
		return document.body.clientHeight;
	};
	this.moveLeft = function (posLeft, direction) {
		if (direction === "left") {;
			if(posLeft + Config.step <= this.setScreenWidth()) {
				this.element.style.left = posLeft + Config.step + 'px';
			}
			else {
				this.endDirectionWidthLeft = 1;
			}
		}
		else {
			if(posLeft - Config.step >= 0) {
				this.element.style.left = posLeft - Config.step + 'px';
			}
			else {
				this.endDirectionWidthLeft = 0;
			}
		}
	};
	this.moveDiagonalyDown = function(posTop, direction) {
		if (direction === "down") {
			if (posTop + Config.step <= this.setScreenHeight()) {
				this.element.style.top = posTop + Config.step + 'px';
			}
			else {
				this.endDiagonalyTopDown = 1;
			}
		}
		else {
			if (posTop - Config.step >= 0) {
				this.element.style.top = posTop - Config.step + 'px';
			}
			else {
				this.endDiagonalyTopDown = 0;
			}
		}
	};
	this.move = function() {
		if (App.paused === 0) {
			var posLeft = this.element.offsetLeft;
			var posHight = this.element.offsetTop;

			if (this.endDirectionWidthLeft == 0) {
				this.moveLeft(posLeft,"left");
			}
			if (this.endDiagonalyTopDown == 0) {
				this.moveDiagonalyDown(posHight,"down");
			}
			if (this.endDiagonalyTopDown == 1) {
				this.moveDiagonalyDown(posHight,"top");
			}
			if (this.endDirectionWidthLeft == 1) {
				this.moveLeft(posLeft,"right");
			}
		}
	};
};
var App = {
	paused: 0,
	interval: null,
	allElements:[],
	createBall: function() {
		var element = document.createElement("div");
		Css.add(element, "ball");
		document.body.appendChild(element);
		if (Config.firstClickButtonAdd == 0) {
			Config.increaseTop = Config.initTop;
		}
		else {
			Config.increaseTop += Config.stepTop;
		}
		var ball = new Ball(Config.initLeft, Config.increaseTop, element);
		App.allElements.push(ball);
		if (Config.firstClickButtonAdd == 0) {
			App.enableButton("pause");
			App.disableButton("play");
			App.start();
			Config.firstClickButtonAdd = 1;
		}
	},
	moveElement: function() {
		for (var i=0; i < App.allElements.length; i++) {
			App.allElements[i].move();
		}
	},
	start: function() {
		App.interval = setInterval(App.moveElement, Config.interval);
	},
	pause: function() {
		App.paused = 1;
		App.disableButton("pause");
		App.enableButton("play");
	},
	play: function() {
		App.paused = 0;
		App.disableButton("play");
		App.enableButton("pause");
	},
	disableButton: function(idButton) {
		document.getElementById(idButton).disabled = true;
	},
	enableButton: function(idButton) {
		document.getElementById(idButton).disabled = false;
	}
}
