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
        document.body.appendChild(
            Element.create(
                "button", 
                "buttons", 
                "Add Ball",
                function(e) {
                    App.createBall();
                }
            )
        );
        document.body.appendChild(Element.create("button", "buttons", "Pause Ball"));
    },
    createBall: function() {
        document.body.appendChild(Element.create("div", "ball",""));
    } 
};

window.addEventListener('load', App.inicialize);