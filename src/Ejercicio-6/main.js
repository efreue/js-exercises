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
	this.move = function() {
		if (App.paused == 1) {
			return;
		}
		else {
			var x = this.element.offsetLeft	+ Config.step;
			var y = this.element.offsetTop	+ Config.step;
			if(x <= document.body.clientWidth) {
				this.element.style.left = x + 'px';
			}
			if(y <= document.body.clientHeight) {
				this.element.style.top = y + 'px';
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
