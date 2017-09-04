var Dom = {
    CreateElement: function(type, cssClass, clickCallBack) {
        var element = document.createElement(type);
        element.className = cssClass;
        if (clickCallBack) {
            element.onclick = clickCallBack;
        }
        return element;
    },
    createDiv: function(cssClass, clickCallBack) {
        var div = Dom.CreateElement('div', cssClass, clickCallBack);
        return div;
    },
    show: function(object) {
        document.body.appendChild(object);
    }
};

var centerPosition = function(circle, square) {
    var centerWidth = (circle.offsetWidth - square[0].offsetWidth) / 2;
    circle.style.top = square[0].offsetTop - centerWidth;
    circle.style.left = square[0].offsetLeft - centerWidth;
}

var circle = {
    create: function(cssClass) {
        return Dom.createDiv(cssClass);
    },
    small: function() {
        var circle1 = circle.create('small');
        Dom.show(circle1);
        var squareSmall = document.getElementsByClassName('positionSquare1');
        centerPosition(circle1, squareSmall);
    },
    medium: function() {
        var circle2 =circle.create('medium');
        Dom.show(circle2);
        var squareMedium = document.getElementsByClassName('positionSquare2');
        centerPosition(circle2, squareMedium);
    },
    tall: function() {
        var circle3 =circle.create('tall');
        Dom.show(circle3);
        var squareTall = document.getElementsByClassName('positionSquare3');
        centerPosition(circle3, squareTall);
    }
};

var container = {
    create: function() {
        var square1 = Dom.createDiv('square positionSquare1', circle.small);
        var square2 = Dom.createDiv('square positionSquare2', circle.medium);
        var square3 = Dom.createDiv('square positionSquare3', circle.tall);
        Dom.show(square1);
        Dom.show(square2);
        Dom.show(square3);
    }
};

window.addEventListener('load', container.create);
