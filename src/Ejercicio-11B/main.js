var viewModel = function(first, last, people) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);

    this.people = ko.observableArray(people);
};

//se define que se ejecuta cuando se carga la pagina
var init = function() {
    ko.applyBindings(new viewModel(
        "Emiliano",
        "Freue",
        [
                { firstName: 'Emi', lastName: 'Bertington' },
                { firstName: 'Charles', lastName: 'Charlesforth' },
                { firstName: 'Denise', lastName: 'Dentiste' }
        ]
    ));
};

window.onload = init;


