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
	this.element.style.left = initLeft + 'px';
	this.element.style.top = initTop + 'px';
    this.posx = initLeft;
    this.posy = initTop;
	this.directionY = "down";
	this.directionX = "left";
	this.getScreenWidth = function() {
		return document.body.clientWidth;
	};
	this.getScreenHeight = function() {
		return document.body.clientHeight;
	};
	this.moveX = function (direction) {
		var screenSizeX;
		if (direction === "left") {;
			screenSizeX = this.getScreenWidth() - this.element.clientWidth;
			this.posx += Config.step;
			if(this.posx < screenSizeX) {
				this.element.style.left = this.posx + 'px';
			}
			else {
				this.element.style.left = screenSizeX + 'px';
				this.directionX = "right";
			}
		}
		else if(direction === "right") {
			this.posx -= Config.step;
			if(this.posx > 0) {
				this.element.style.left = this.posx + 'px';
			}
			else {
				this.element.style.left = 0 + 'px';
				this.directionX = "left";
			}
		}
	};
	this.moveY = function(direction) {
		var screenSizeY;
		if (direction === "down") {
			screenSizeY =  this.getScreenHeight() - this.element.clientHeight;
			this.posy += Config.step;
			if (this.posy <= screenSizeY ) {
				this.element.style.top = this.posy + 'px';
			}
			else {
				this.directionY = "top";
			}
		}
		else if (direction === "top") {
			this.posy -= Config.step;
			if (this.posy >= 0) {
				this.element.style.top = this.posy + 'px';
			}
			else {
				this.directionY = "down";
			}
		}
	};
	this.move = function() {
		if (App.paused === 0) {
			this.moveX(this.directionX);
			this.moveY(this.directionY);
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
			App.allElements[i].move(App.allElements[i]);
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
