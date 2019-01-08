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
    }
};

var Ball = {
    create: function() {
        var elementShowBall = document.getElementById("spaceShowBall");
        var ball = Element.create("div", "ball","");
        ball.directionX = "left";
        elementShowBall.appendChild(ball);
        App.allBalls.push(ball);
    },
    moveY: function(element) {
        if (App.started === 1) {
            var content = document.getElementById('parentBoard');
            var screenSizeX = content.clientWidth - element.clientWidth;
            var positionX = element.offsetLeft;
            if ((positionX <= screenSizeX) && (element.directionX == "left")) {
                element.directionX = "left";
                positionX += Config.step;
                element.style.left = positionX + 'px';
            } else {
                element.directionX = "right"
                positionX -= Config.step;
                if (positionX >= 0) {
                    element.style.left = positionX + 'px';
                }
                else {
                    element.directionX = "left";
                }
            }
        }
        
    }
};

var Button = {
    add: function() {
        document.getElementById('btnPlay').disabled = false;
        document.getElementById('btnPause').disabled = true;
        Ball.create();
    },
    play: function() {
        document.getElementById('btnPlay').disabled = true;
        document.getElementById('btnPause').disabled = false;
        App.startBall();
        //alert('click play');
    },
    pause: function() {
        document.getElementById('btnPlay').disabled = false;
        document.getElementById('btnPause').disabled = true;
        App.started = 0;
        alert('click pause');
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
    },
    moveBall: function() {
        for(var i = 0; i < App.allBalls.length; i++) {
            Ball.moveY(App.allBalls[i]);
        }
    }
};

window.addEventListener('load', App.inicialize);