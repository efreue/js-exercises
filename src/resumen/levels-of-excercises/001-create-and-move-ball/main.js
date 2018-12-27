var Css = {
    add: function(name, className) {
        Node.className += " " + className;
    }
};

var Element = {
    add: function(typeElement, nameCls, textElem) {
        var elem = document.createElement(typeElement);
        Css.add(elem, nameCls);
        elem.innerText = textElem;
        document.body.appendChild(elem);
    }
};

var App = {
    inicialize: function() {
        Element.add("button", "buttons", "Add Ball");
    }
};

window.onload = App.inicialize;