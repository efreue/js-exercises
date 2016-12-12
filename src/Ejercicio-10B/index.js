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

var selectedColumn = function(showInDiv, colSel) {
    var className = "hiddenSelCol";
    var tableCols = document.getElementById(showInDiv).getElementsByClassName("colSel");
    var lastColSel = document.getElementById(showInDiv).getElementsByClassName(className)[0];
    if (lastColSel && Css.contains(lastColSel, className)) {
        Css.del(lastColSel, className);
    }
    for(var i = 0; i < tableCols.length; i++) {
        if(tableCols[i].id === colSel) {
            Css.del(tableCols[i], className);
        }
        else {
            Css.add(tableCols[i], className);
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


var View = function(id, templateUrl) {
	var element = document.getElementById(id);
    this.showData = function(dataItem, colNameSel) {
        httpRequest(templateUrl, function(dataTemplateString) {
            var template = Handlebars.compile(dataTemplateString);
            element.innerHTML = template(dataItem);
            var colId = Views.getColId('listcars',colNameSel);
            selectedColumn('listcars', colId)
            //agrego evento onclick a las celdas de la primer fila
            var tblHd = element.getElementsByClassName("colTbl");
            for(var i = 0; i < tblHd.length; i++) {
                tblHd[i].onclick = function() {
                    var colNameSel = this.innerText.trimRight();
                    Views.getData(colNameSel, Views.dataView.showData);
                };
            };
        });
    };
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
    getColId: function(showInDiv, colNameSel) {
        var colId;
        var tableCols = document.getElementById(showInDiv).getElementsByClassName("colTbl");
        for(var i = 0; i < tableCols.length; i++) {
            if(tableCols[i].innerText.trimRight() === colNameSel) {
                colId = tableCols[i].id;
            }
        }
        return colId;
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
                    ),
                    colNameSel
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
