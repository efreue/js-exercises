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
        httpRequest(templateUrl, function(dataTemplateString) {
            var template = Handlebars.compile(dataTemplateString);
            element.innerHTML = template(dataItem);
            //agrego evento onclick a las celdas de la primer fila
            var tblHd = element.getElementsByClassName("colTbl");
            for(var i = 0; i < tblHd.length; i++) {
                tblHd[i].onclick = function() {
                    var col = this.innerHTML;
                    Views.getData(col, Views.dataView.showData);
                };
            }
        });
    }
};

var Views = {
	dataView: null,
	createViews: function() {
		Views.dataView = new View('listcars', 'Template/list-car.hbs');
    },
    sortBy: function(dataItem, colName) {
       return dataItem.sort(
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
    getColUse: function(colNameSel) {
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
    },
    getData: function(colNameSel, callback) {
        httpRequest(
            "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
            function(data) {
                var colN = Views.getColUse(colNameSel);
                callback(
                    Views.sortBy(
                        JSON.parse(data),
                        colN
                    )
                );
            }
        )
    }
}

var App = {
	init: function() {
        Views.createViews();
        Views.getData("Driver Name", Views.dataView.showData);
	}
};
