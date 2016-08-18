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
	if (App.interval !== null){
		document.getElementById("stop").disabled = false;
	}
	if (App.paused == 1) {
			return;
	}
	else {
		for(var i = 0; i< App.ball.length; i++) {
			var x = App.ball[i].x + Config.step;
			if(x < Config.maxXPosition) {
				App.ball[i].x = x;
				App.ball[i].element.style.left = App.ball[i].x + 'px';
			}
		}
	}
};

var App = {
	paused: 0,
	cont: 0,
	ball:[],
	interval: null,
	onEnterFrame: function() {
		if (App.ball[App.cont -1]) {
			App.ball[App.cont - 1].updateLeft();
		}
	},
	start: function() {
		App.interval = setInterval(App.onEnterFrame, Config.interval);
	},
	stop: function() {
		if (App.interval) {
			clearInterval(App.interval);
			App.interval = null;
			App.ActiveButton("stop");
		}
	},
	pause: function() {
		App.paused = 1;
		App.ActiveButton("pause");
	},
	reStart: function() {
		App.paused = 0;
		App.ActiveButton("reStart");
	},
	ActiveButton: function(idButton) {
		switch(idButton) {
			case "stop":
				document.getElementById("pause").disabled = true;
				document.getElementById("reStart").disabled = true;
				break;
			case "pause":
				document.getElementById("pause").disabled = true;
				document.getElementById("reStart").disabled = false;
				break;
			case "reStart":
				document.getElementById("pause").disabled = false;
				document.getElementById("reStart").disabled = true;
				break;
			case "add":
				document.getElementById("pause").disabled = false;
				document.getElementById("reStart").disabled = true;
				break;
		}


	},
	createBall: function() {
		var element = document.createElement("div");
		Css.add(element, "ball");
		document.body.appendChild(element);
		App.ball[App.cont] = new Ball(Config.initLeft, Config.initTop, element);
		App.cont += 1;
		if (App.paused == 1) {
			App.reStart();
		}
		if (App.interval === null) {
			App.start();
		}
		App.ActiveButton("add");
	}
};
