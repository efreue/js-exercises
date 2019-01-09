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
        
    }
}