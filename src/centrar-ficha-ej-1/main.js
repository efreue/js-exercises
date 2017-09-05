var Element = {
    create: function(type) {
        var element = document.createElement(type);
        document.body.appendChild(element);

        var self = {
            create: Element.create,
            setCss: function(className) {
                element.className = className;
                return self;
            },
            move: function(x, y) {
                element.style.left = x + 'px';
                element.style.top = y + 'px';
                return self;
            },
            setSize: function(width, height) {
                element.style.width = width + 'px';
                element.style.height = height + 'px';
                return self;
            },
            center: function(targetSelector) {
                // complete
                return self;
            }
        };
        return self;
    }
};

Element
    .create('div')
    .setCss('rect rect-1')
    .move(150, 100)
    .setSize(400, 250)

    .create('div')
    .setCss('rect rect-2')
    .move(740, 120)
    .setSize(170, 350)

    .create('div')
    .setCss('rect rect-3')
    .move(120, 580)
    .setSize(190, 50)

    .create('div')
    .setCss('box box-1')
    .center('rect-1')
    .setSize(60, 60)

    .create('div')
    .setCss('box box-2')
    .center('rect-2')
    .setSize(60, 60)

    .create('div')
    .setCss('box box-3')
    .center('rect-3')
    .setSize(60, 60);

