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


var View = function(id, templateUrl) {
	var element = document.getElementById(id);
    this.showData = function(dataItem) {
        var template = Handlebars.compile(dataItem);
        element.innerHTML = template(JSON.parse(dataItem));
    }
};

var Views = {
	dataView: null,
	createViews: function() {
		Views.dataView = new View('listcars', 'Template/list-car.hbs');
    },
    sortBy: function(dataItem, colName) {
        dataItem.sort(
            function(a, b) {
                if(a[colName].toUpperCase() < b[colName].toUpperCase()) {
                    return -1;
                }

                if(a[colName].toUpperCase() > b[colName].toUpperCase()) {
                    return 1;
                }
                return 0;
            }
        );
    },
    getData: function(colNameSel) {
        httpRequest(
            "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
            function(data) {
                Views.dataView.showData(
                    Views.sortBy(
                        data,
                        function(colNameSel) {
                            var atrib;
                            if (colNameSel == "Car Model") {
                                atrib = "car_model";
                            }
                            if (colNameSel == "Driver Name" ) {
                                atrib = "driver_name";
                            }
                            if (colNameSel == "Plate Id") {
                                atrib = "plate_id";
                            }
                            return atrib;
                        }
                    )
                );
            }
        )
    }
}

var App = {
	init: function() {
        Views.createViews();
        Views.getData("Driver Name");
	}
};
