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
	stepTop: 90,
	firstClickButtonAdd: 0,
	increaseTop: 0
};

var Ball = function(initLeft, initTop, element) {
	this.element = element;
	this.x = initLeft;
	this.element.style.top = initTop + 'px';
	this.move = function() {
		if (App.paused === 0) {
			var x = this.element.offsetLeft	+ Config.step;
			if(x <= Config.maxXPosition) {
				this.element.style.left = x + 'px';
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
			App.EnableButton("pause");
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
		App.EnableButton("play");
	},
	play: function() {
		App.paused = 0;
		App.disableButton("play");
		App.EnableButton("pause");
	},
	disableButton: function(idButton) {
		document.getElementById(idButton).disabled = true;
	},
	EnableButton: function(idButton) {
		document.getElementById(idButton).disabled = false;
	}

}
