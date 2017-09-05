var Element = {
    create: function(attributes) {
        var element = document.createElement(attributes.type);
        document.body.appendChild(element);

        if(attributes.position) {
            element.style.left = attributes.position[0] + 'px';
            element.style.top = attributes.position[1] + 'px';
        }
        if(attributes.size) {
            element.style.width = attributes.size[0] + 'px';
            element.style.height = attributes.size[1] + 'px';
        }
        if(attributes.css) {
            element.className = attributes.css;
        }
        if(attributes.y) {
            element.style.top = attributes.y + 'px';
        }
        if(attributes.centerSelector) {
            // complete
        }
        return element;
    }
};

Element.create({
    type: 'div',
    css: 'rect rect-1',
    position: [150, 100],
    size: [400, 250]
});
Element.create({
    type: 'div',
    css: 'rect rect-2',
    position: [740, 580],
    size: [190, 50]
});
Element.create({
    type: 'div',
    css: 'rect rect-3',
    position: [120, 580],
    size: [190, 50]
});
Element.create({
    type: 'div',
    css: 'box box-1',
    centerSelector: 'rect-1',
    size: [60, 60]
});
Element.create({
    type: 'div',
    css: 'box box-2',
    centerSelector: 'rect-2',
    size: [60, 60]
});
Element.create({
    type: 'div',
    css: 'box box-3',
    centerSelector: 'rect-3',
    size: [60, 60]
});
