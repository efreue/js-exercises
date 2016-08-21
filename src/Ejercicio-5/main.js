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
	this.positionDown = function() {
		this.element.style.top = this.y + 'px';
	};
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
		ball.positionDown();
		if (Config.firstClickButtonAdd == 0) {
			App.activeButton("add");
			App.start();
			Config.firstClickButtonAdd = 1;
		}
	},
	updateLeft: function() {
		if (App.paused == 1) {
			return;
		}
		else {
			var nodes = document.getElementsByClassName("clsBall");
			for (var i=0; i< nodes.length; i++) {
				var x = nodes[i].offsetLeft	+ Config.step;
				if(x < Config.maxXPosition) {
					nodes[i].style.left = x + 'px';
				}
			}
		}
	},
	start: function() {
		App.interval = setInterval(App.updateLeft, Config.interval);
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
