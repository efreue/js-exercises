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

var selectColumnTitle = function(divId, selectedColumnId) {
    var className = "hidden-column";
    var listColumn = document.getElementById(divId).getElementsByClassName("selected-column");
    var lastSelectedColumn = document.getElementById(divId).getElementsByClassName(className)[0];
    if (lastSelectedColumn && Css.contains(lastSelectedColumn, className)) {
        Css.del(lastSelectedColumn, className);
    }
    for(var i = 0; i < listColumn.length; i++) {
        if(listColumn[i].id === selectedColumnId) {
            Css.del(listColumn[i], className);
        }
        else {
            Css.add(listColumn[i], className);
        }
    }
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

var View = function(mainDivId, templateUrl) {
	var element = document.getElementById(mainDivId);
    this.showData = function(dataSorted, selectedColumnTitle) {
        httpRequest(templateUrl, function(dataTemplateString) {
            var template = Handlebars.compile(dataTemplateString);
            element.innerHTML = template(dataSorted);
            var selectedColumnId = Views.getColumnId('listcars', selectedColumnTitle);
            selectColumnTitle('listcars', selectedColumnId);
            //agrego evento onclick a las celdas de la primer fila
            var listColumn = element.getElementsByClassName("title-column-table");
            for(var i = 0; i < listColumn.length; i++) {
                listColumn[i].onclick = function() {
                    var selectedColumnTitle = this.innerText.trimRight();
                    Views.getData(selectedColumnTitle, Views.dataView.showData);
                };
            }
        });
    };
};

var Views = {
	dataView: null,
	createViews: function() {
		Views.dataView = new View('listcars', 'Template/list-car.hbs');
    },
    sortBy: function(data, nameColumnSelected) {
       return data.sort(
            function(a, b) {
                if(a[nameColumnSelected].toUpperCase() < b[nameColumnSelected].toUpperCase()) {
                    return -1;
                }
                if(a[nameColumnSelected].toUpperCase() > b[nameColumnSelected].toUpperCase()) {
                    return 1;
                }
                return 0;
            }
        );
    },
    getSelectedColumn: function(selectedColumnTitle) {
        var nameRealColumn;
        if (selectedColumnTitle == "Car Model") {
            nameRealColumn = "car_model";
        }
        if (selectedColumnTitle == "Driver Name" ) {
            nameRealColumn = "driver_name";
        }
        if (selectedColumnTitle == "Plate Id") {
            nameRealColumn = "plate_id";
        }
        return nameRealColumn;
    },
    getColumnId: function(divId, selectedColumnTitle) {
        var idTitleColumn;
        var listColumn = document.getElementById(divId).getElementsByClassName("title-column-table");
        for(var i = 0; i < listColumn.length; i++) {
            if(listColumn[i].innerText.trimRight() === selectedColumnTitle) {
                idTitleColumn = listColumn[i].id;
            }
        }
        return idTitleColumn;
    },
    getData: function(selectedColumnTitle, callback) {
        httpRequest(
            "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
            function(data) {
                var columnName = Views.getSelectedColumn(selectedColumnTitle);
                callback(
                    Views.sortBy(
                        JSON.parse(data),
                        columnName
                    ),
                    selectedColumnTitle
                );
            }
        );
    }
};

var App = {
	init: function() {
        Views.createViews();
        Views.getData("Driver Name", Views.dataView.showData);
	}
};
