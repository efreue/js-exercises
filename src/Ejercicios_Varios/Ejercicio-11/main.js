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

var Css = {
	add: function(node, className) {
		node.className += " " + className;
	},
	del: function(node, className) {
		node.className = node.className.replace(className, "");
	},
	contains: function(node, className) {
		return node.className.search(className) != -1;
	}
};


var selectColumn = function(selectedColumnId) {
    var className = "hidden-column";
    var listColumn = document.getElementsByClassName("selected-column");
    for(var i = 0; i < listColumn.length; i++) {
        if(listColumn[i].id === selectedColumnId) {
            Css.del(listColumn[i], className);
        }
        else {
            if (!Css.contains(listColumn[i], className))
                Css.add(listColumn[i], className);
        }
    }
};


var viewModel = function(listCars) {
    this.cars = ko.observableArray(listCars);
    this.sortDataByCarModel = function() {
        this.cars.sort(
            function(left, right) {
                return left.car_model == right.car_model ? 0 : (left.car_model < right.car_model ? -1 : 1)
        });
        selectColumn('0');
    };
    this.sortDataByDriverName = function() {
        this.cars.sort(
            function(left, right) {
                return left.driver_name == right.driver_name ? 0 : (left.driver_name < right.driver_name ? -1 : 1)
        });
        selectColumn('1');
    };
    this.sortDataByPlateId = function() {
        this.cars.sort(
            function(left, right) {
                return left.plate_id == right.plate_id ? 0 : (left.plate_id < right.plate_id ? -1 : 1)
        });
        selectColumn('2');
    };
};

var model;
var App = {
	init: function() {
        httpRequest(
            "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
            function(data) {
                var listCars = JSON.parse(data);
                model = new viewModel(listCars);
                model.sortDataByDriverName(listCars);
                ko.applyBindings(model);
            }
        );
    }
};

window.onload = App.init;

