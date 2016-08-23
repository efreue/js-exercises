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
	firstClickButtonAdd: 0,
	acumulateTop: function () {
		return Config.initTop += Config.increaseTop;
	}
};

var Ball = function(initLeft, initTop, element) {
	this.element = element;
	this.x = initLeft;
	this.y = initTop;
	this.move = function() {
		this.element.style.top = this.y + 'px';
		if (App.paused == 1) {
			return;
		}
		else {
			var x = this.element.offsetLeft	+ Config.step;
			if(x <= Config.maxXPosition) {
				this.element.style.left = x + 'px';
			}
		}
	}
};

var App = {
	paused: 0,
	interval: null,
	allElements:[],
	createBall: function() {
		var setTopBall = 0;
		var element = document.createElement("div");
		Css.add(element, "ball");
		document.body.appendChild(element);
		if (Config.firstClickButtonAdd == 0) {
			setTopBall = Config.initTop;
		}
		else {
			setTopBall = Config.acumulateTop();
		}
		var ball = new Ball(Config.initLeft, setTopBall, element);
		App.allElements.push(ball);

		if (Config.firstClickButtonAdd == 0) {
			App.activeButton("add");
			App.start(App.allElements);
			Config.firstClickButtonAdd = 1;
		}
	},
	moveElement: function(allBalls) {
		for (var i=0; i < allBalls.length; i++) {
			allBalls[i].move();
		}
	},
	start: function(allBalls) {
				App.interval = setInterval(App.moveElement, Config.interval, allBalls);
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
