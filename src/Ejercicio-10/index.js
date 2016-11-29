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

var selectedColumn = function(showInDiv, ColSel) {
    var tableCol = document.getElementById(showInDiv).getElementsByClassName("colTbl");

    for(var i = 0; i < tableCol.length; i++) {
        if(tableCol[i].innerHTML === ColSel) {
            tableCol[i].innerHTML += " #";
        }
        else {
            var colN = tableCol[i].innerHTML.replace("#","");
            tableCol[i].innerHTML = colN;
        }
    }
};


var View = function(id, templateUrl) {
	var element = document.getElementById(id);
    this.addTable = function(dataItem) {
        httpRequest(templateUrl, function(data) {
            var template = Handlebars.compile(data);
            element.innerHTML = template(dataItem);
            //agrego evento onclick a las celdas de la primer fila
            var tblHd = element.getElementsByClassName("colTbl");
            for(var i = 0; i < tblHd.length; i++) {
                tblHd[i].onclick = function() {
                    var col = this.innerHTML;
                    col.replace(" #","");
                    selectedColumn('listcars', col);
                    httpRequest(
                        "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
                        function(data) {
                            Views.showDataItem(JSON.parse(data), col)
                    })
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
    showDataItem: function(dataItem, col) {
        Views.dataView.addTable(
            dataItem.sort(function(item1, item2) {
                var Item1 = null;
                var Item2 = null;
                if (col == "Car Model") {
                    Item1 = item1.car_model.toUpperCase(); // ignore upper and lowercase
                    Item2 = item2.car_model.toUpperCase(); // ignore upper and lowercase
                }
                if (col == "Driver Name" ) {
                    Item1 = item1.driver_name.toUpperCase(); // ignore upper and lowercase
                    Item2 = item2.driver_name.toUpperCase(); // ignore upper and lowercase
                }

                if (col == "Plate Id") {
                    Item1 = item1.plate_id.toUpperCase(); // ignore upper and lowercase
                    Item2 = item2.plate_id.toUpperCase(); // ignore upper and lowercase
                }
                if (Item1 < Item2) {
                    return -1;
                }
                if (Item1 > Item2) {
                    return 1;
                }
                // names must be equal
                return 0;
            })
        );
    }
}

var App = {
	init: function() {
		httpRequest(
            "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
            function(data) {
                Views.createViews();
                Views.showDataItem(
                    JSON.parse(data)
                );
        })
	}
};
