var Config = {
    step: 24,
    interval: 80
};

var Css = {
    add: function(node, className) {
        node.className += " " + className;
    }
};

var Element = {
    create: function(typeElement, cssClass, txtElement, callback) {
        var elem = document.createElement(typeElement);
        Css.add(elem, cssClass);
        elem.innerText = txtElement;
        if (callback) {
            elem.onclick = callback;
        }
        return elem;
    },
    disable: function(obj) {
        obj.disable = true;
        Css.add(obj, 'disabled');
    },
    enable: function(obj) {
        obj.disable = false;
        obj.classList.remove('disabled');
    }
};

var Ball = {
    create: function(elementContent) {
        var ball = Element.create("div", "ball","");
        ball.directionX = "left";
        ball.directionY = "down";
        elementContent.appendChild(ball);
        App.allBalls.push(ball);
    },
    changePositionX: function(ball, dirX, positionX) {
        ball.directionX = dirX;
        if (dirX == "left") {
            ball.style.left = positionX + 'px';
        } else {
            if (positionX >= 0) {
                ball.style.left = positionX + 'px';
            } else {
                ball.directionX = "left";
            }
        }
    }, 
    changePositionY: function(ball, dirY, positionY) {
        ball.directionY = dirY;
        if (dirY == "down") {
            ball.style.top = positionY + 'px';
        } else {
            if (positionY >= 0) {
                ball.style.top = positionY + 'px';
            } else {
                ball.directionY = "down";
            }
        }
    }, 
    moveX: function(ball, elementParent) {
        var screenSizeX = elementParent.clientWidth - ball.clientWidth - 40;
        var positionX = ball.offsetLeft;
        if ((positionX <= screenSizeX) && (ball.directionX == "left")) {
            positionX += Config.step;
            Ball.changePositionX(ball, "left", positionX);            
        } else {
            positionX -= Config.step;
            Ball.changePositionX(ball, "right", positionX);                        
        }
    },
    moveY: function(ball, elementParent) {
        var screenSizeY = elementParent.clientHeight - ball.clientHeight - 40;
        var positionY = ball.offsetTop;
        if ((positionY <= screenSizeY) && (ball.directionY == "down")) {
            positionY += Config.step;
            Ball.changePositionY(ball, "down", positionY);
        } else {
            positionY -= Config.step;
            Ball.changePositionY(ball, "top", positionY);
        }
    },
    move: function(ball) {
        if (App.started === 1) {
            var content = document.getElementById('parentBoard');
            Ball.moveX(ball, content);
            Ball.moveY(ball, content);
        }
    }
};

var Button = {
    add: function() {
        (App.started == 0) ? Element.enable(document.getElementById('btnPlay')) : Element.disable(document.getElementById('btnPlay'));
        Ball.create(document.getElementById("spaceShowBall"));
    },
    play: function() {
        Element.enable(document.getElementById('btnAdd'));
        Element.disable(document.getElementById('btnPlay'));
        Element.enable(document.getElementById('btnPause'));
        App.startBall();
    },
    pause: function() {
        Element.disable(document.getElementById('btnAdd'));
        Element.enable(document.getElementById('btnPlay'));
        Element.disable(document.getElementById('btnPause'));
        App.started = 0;
    }
};

var App = {
    started: 0,
    allBalls:[],
    inicialize: function() {
        var grandParentBoard = Element.create("div", "grandParentBoard", "");
        var contentButton = Element.create("div", "parentFooter", "");
        var parentBoard = Element.create("div", "parentBoard", "");
        var childBoard = Element.create("div", "childBoard", "");
        var btnAdd = Element.create(
            "button", 
            "buttons", 
            "Add",
            function(e) {
                Button.add();
            }
        );
        var btnPause = Element.create(
            "button", 
            "buttons", 
            "Pause",
            function(e) {
                Button.pause();
            }
        );
        var btnPlay = Element.create(
            "button", 
            "buttons", 
            "Play",
            function(e) {
                Button.play();
            }
        );
        parentBoard.setAttribute("id", 'parentBoard');
        btnAdd.setAttribute("id", 'btnAdd');
        btnPause.setAttribute("id", 'btnPause');
        btnPlay.setAttribute("id", 'btnPlay');
        childBoard.setAttribute("id", 'spaceShowBall');
        grandParentBoard.appendChild(parentBoard);
        grandParentBoard.appendChild(contentButton);
        parentBoard.appendChild(childBoard);
        contentButton.appendChild(btnAdd);
        contentButton.appendChild(btnPause);
        contentButton.appendChild(btnPlay);
        document.body.appendChild(grandParentBoard);
    },
    startBall: function() {
        App.started = 1;
        var id = setInterval(App.moveBall, Config.interval);
        if (id > 1) {
            clearInterval(id);
        }            
    },
    moveBall: function() {
        for(var i = 0; i < App.allBalls.length; i++) {
            Ball.move(App.allBalls[i]);
        }
    }
};
window.addEventListener('load', App.inicialize);