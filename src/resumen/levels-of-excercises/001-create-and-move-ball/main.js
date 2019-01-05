var Config = {
    step: 24
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
        elementShowBall.appendChild(ball);
        App.allBalls.push(ball);
    }
};

var App = {
    allBalls:[],
    inicialize: function() {
        var grandParentBoard = Element.create("div", "grandParentBoard", "");
        var contentButton = Element.create("div", "parentFooter", "");
        var parentBoard = Element.create("div", "parentBoard", "");
        var childBoard = Element.create("div", "childBoard", "");
        
        childBoard.setAttribute("id", "spaceShowBall");
        grandParentBoard.appendChild(parentBoard);
        grandParentBoard.appendChild(contentButton);
        parentBoard.appendChild(childBoard);
        contentButton.appendChild(
            Element.create(
                "button", 
                "buttons", 
                "Add",
                function(e) {
                    Ball.create();
                }
            )
        );
        contentButton.appendChild(Element.create("button", "buttons", "Pause"));
        contentButton.appendChild(Element.create("button", "buttons", "Play"))
        document.body.appendChild(grandParentBoard);
    } 
};

window.addEventListener('load', App.inicialize);