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
            ball.style.left = 
        }
    }
};
