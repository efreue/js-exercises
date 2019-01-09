var Config = {
    step: 24,
    interval: 80
};

var Css = {
    add(node, className) {
        node.className += ` ${className}`;
    }
};

var Element = {
    create(typeElement, cssClass, txtElement, callback) {
        var elem = document.createElement(typeElement);
        elem.innerText = txtElement;
        if (callback) {
            elem.onclick = callback;
        }
        return elem;
    },
    disable(obj) {
        obj.disabled = true;
        Css.add(obj, 'disabled');
    },
    enable(obj) {
        obj.disabled = false;
        obj.className.remove('disabled');
    }
};

var Ball = {
    create: (elementContent) => {
        let ball = Element.create('div', 'ball', '');
        ball.directionX = 'left';
        ball.directionY = 'down';
        elementContent.appendChild(ball);
        App.allBalls.push(ball);
    },
    changePositionX(ball, dirX, positionX) {
        ball.directionX = dirX;
        if (dirX == 'left') {
            ball.style.left = `${positionX}px`;
        } else {
            (positionX >= 0) ? ball.style.left = `${positionX}px` : ball.directionX = 'left';
        }
    },
    changePositionY(ball, dirY, positionY) {
        ball.directionY = dirY;
        if (dirY == 'down') {
            ball.style.top = `${positionY}px`;
        } else {
            (positionY >= 0) ? ball.style.top = `${positionY}px` : ball.directionY = 'down';
        }
    },
    moveX(ball, elementParent) {
        let screenSizeX = elementParent.clientWidth - ball.clientWidth - 40;
        var positionX = ball.offsetLeft;
        if ((positionX <= screenSizeX) && (ball.directionX == 'left')) {
            positionX += Config.step;
            Ball.changePositionX(ball, 'left', positionX);
        } else {
            positionX -= Config.step;
            Ball.changePositionX(ball, 'right', positionX);
        }
    },
    moveY(ball, elementParent) {
        let screenSizeY = elementParent.clientHeight - ball.clientHeight - 40;
        var positionY = ball.offsetTop;
        if ((positionY <= screenSizeY) && (ball.directionY == 'down')) {
            positionY += Config.step;
            Ball.changePositionY(ball, 'down', positionY);
        } else {
            positionY -= Config.step;
            Ball.changePositionY(ball, 'top', positionY);
        }
    },
    move(ball) {
        if (App.started === 1) {
            let content = document.getElementById('parentBoard');
            Ball.moveX(ball, content);
            Ball.moveY(ball, content);
        }
    }
};

var Button = {
    add() {
        Element.enable(document.getElementById('btnPlay'));
        Element.enable(document.getElementById('btnPause'));
        Ball.create(document.getElementById('spaceShowBall'));
    },
    play() {
        Element.enable(document.getElementById('btnadd'));
        Element.disable(document.getElementById('btnPlay'));
        Element.enable(document.getElementById('btnPause'));
        App.startBall();
    },
    pause() {
        Element.disable(document.getElementById('btnadd'));
        Element.enable(document.getElementById('btnPlay'));
        Element.disable(document.getElementById('btnPause'));
        App.started = 0;
    }
}

var App = {
    started: 0,
    allBalls: [],
    inicialize() {
        let grandParentBoard = Element.create('div', 'grandParentBoard', '');
        let contentButton = Element.create('div', 'parentFooter', '');
        let parentBoard = Element.create('div', 'parentBoard', '');
        let childBoard = Element.create('div', 'childBoard', '');
        let btnAdd = Element.create(
            'button',
            'buttons',
            'Add',
            (e) => {
                Button.add();
            }
        );
        let btnPause = Element.create(
            'button',
            'buttons',
            'Pause',
            (e) => {
                Button.pause();
            }
        );
        let btnPlay = Element.create(
            'button',
            'buttons',
            'Play',
            (e) => {
                Button.play();
            }
        );
        parentBoard.setAttribute('id', 'parentBoard');
        btnAdd.setAttribute('id', 'btnAdd');
        btnPause.setAttribute('id', 'btnPause');
        btnPlay.setAttribute('id', 'btnPlay');
        childBoard.setAttribute('id', 'spaceShowBall');
        grandParentBoard.appendChild(parentBoard);
        grandParentBoard.appendChild(contentButton);
        parentBoard.appendChild(childBoard);
        contentButton.appendChild(btnAdd);
        contentButton.appendChild(btnPause);
        contentButton.appendChild(btnPlay);
        document.body.appendChild(grandParentBoard);
    },
    startBall() {
        App.started = 1;
        let id = setInterval(App.moveBall, Config.interval);
        if (id > 1) {
            clearInterval(id);
        }            
    },
    moveBall() {
        App.allBalls.forEach((index) => {
            Ball.move(App.allBalls[index])
        }); 
    }
};
window.addEventListener('load', App.inicialize);