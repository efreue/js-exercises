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

var selectedTitleColumn = function(divId, idTitleColumnSelected) {
    var className = "hidden-column";
    var allTitleColumns = document.getElementById(divId).getElementsByClassName("selected-column");
    var lastTitleColumnSelected = document.getElementById(divId).getElementsByClassName(className)[0];
    if (lastTitleColumnSelected && Css.contains(lastTitleColumnSelected, className)) {
        Css.del(lastTitleColumnSelected, className);
    }
    for(var i = 0; i < allTitleColumns.length; i++) {
        if(allTitleColumns[i].id === idTitleColumnSelected) {
            Css.del(allTitleColumns[i], className);
        }
        else {
            Css.add(allTitleColumns[i], className);
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
    this.showData = function(dataSorted, titleColumnSelected) {
        httpRequest(templateUrl, function(dataTemplateString) {
            var template = Handlebars.compile(dataTemplateString);
            element.innerHTML = template(dataSorted);
            var idTitleColumnSelected = Views.getIdTitleColumnSelected('listcars',titleColumnSelected);
            selectedTitleColumn('listcars', idTitleColumnSelected);
            //agrego evento onclick a las celdas de la primer fila
            var allTitlesColumns = element.getElementsByClassName("title-column-table");
            for(var i = 0; i < allTitlesColumns.length; i++) {
                allTitlesColumns[i].onclick = function() {
                    var titleColumnSelected = this.innerText.trimRight();
                    Views.getData(titleColumnSelected, Views.dataView.showData);
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
    getNameRealColumnSelected: function(titleColumnSelected) {
        var nameRealColumn;
        if (titleColumnSelected == "Car Model") {
            nameRealColumn = "car_model";
        }
        if (titleColumnSelected == "Driver Name" ) {
            nameRealColumn = "driver_name";
        }
        if (titleColumnSelected == "Plate Id") {
            nameRealColumn = "plate_id";
        }
        return nameRealColumn;
    },
    getIdTitleColumnSelected: function(divId, titleColumnSelected) {
        var idTitleColumn;
        var allTitleColumns = document.getElementById(divId).getElementsByClassName("title-column-table");
        for(var i = 0; i < allTitleColumns.length; i++) {
            if(allTitleColumns[i].innerText.trimRight() === titleColumnSelected) {
                idTitleColumn = allTitleColumns[i].id;
            }
        }
        return idTitleColumn;
    },
    getData: function(titleColumnSelected, callback) {
        httpRequest(
            "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
            function(data) {
                var nameRealColumnSelected = Views.getNameRealColumnSelected(titleColumnSelected);
                callback(
                    Views.sortBy(
                        JSON.parse(data),
                        nameRealColumnSelected
                    ),
                    titleColumnSelected
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
