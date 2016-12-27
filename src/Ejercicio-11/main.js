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

var viewModel = function(listCars) {
    this.cars = ko.observableArray(listCars);
    this.sortTableByColumn1 = function() {
        this.cars.reverse();
    };
    this.sortTableByColumn2 = function() {
        console.log('sort 2');
    };
};

var model;
var App = {
	init: function() {
        httpRequest(
            "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
            function(data) {
                model = new viewModel(JSON.parse(data));
                ko.applyBindings(model);
            }
        );
        //Views.createViews();
        //sortTableByColumn2();
	}
};

window.onload = App.init;

