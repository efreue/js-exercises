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

var App = {
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
                "Add Ball",
                function(e) {
                    App.createBall();
                }
            )
        );
        contentButton.appendChild(Element.create("button", "buttons", "Pause Ball"));
        document.body.appendChild(grandParentBoard);
    },
    createBall: function() {
        var elementShowBall = document.getElementById("spaceShowBall");
        elementShowBall.appendChild(Element.create("div", "ball",""));
    } 
};

window.addEventListener('load', App.inicialize);