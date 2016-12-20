var viewModel = function(first, last, people) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);

    this.people = ko.observable(people);
};

//se define que se ejecuta cuando se carga la pagina
var init = function() {
    var nodes = document.body.getElementsByClassName('FullNameExample');
    if(nodes) {
        ko.applyBindings(new viewModel(
            "Emiliano",
            "Freue",
            {
                people: [
                    { firstName: 'Bert', lastName: 'Bertington' },
                    { firstName: 'Charles', lastName: 'Charlesforth' },
                    { firstName: 'Denise', lastName: 'Dentiste' }
                ]
            }));
    }
};

window.onload = init;


