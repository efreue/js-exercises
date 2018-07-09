var httpRequest = function(url, callback) {
	var ajax = new XMLHttpRequest();
	ajax.onload = function() {
		if(this.status == 200) {
			callback(ajax.responseText);
		}
	};
	ajax.open("GET", url, true);
	ajax.send();
};

var viewModel = function(first, last, people, listCars) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);

    this.people = ko.observableArray(people);
    this.cars = ko.observableArray(listCars);
};

//se define que se ejecuta cuando se carga la pagina
var init = function() {
    httpRequest (  "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
        function(data) {
            ko.applyBindings(new viewModel(
                "Emiliano",
                "Freue",
                [
                        { firstName: 'Emi', lastName: 'Bertington' },
                        { firstName: 'Charles', lastName: 'Charlesforth' },
                        { firstName: 'Denise', lastName: 'Dentiste' }
                ],
                JSON.parse(data)
            ))
        }
    );
};

window.onload = init;


