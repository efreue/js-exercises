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


var selectedColumn = function(showInDiv, ColSel) {
    var className = "ColSelected";
    var tableCol = document.getElementById(showInDiv).getElementsByClassName("tblCar");
    var lastColSel = document.getElementById(showInDiv).getElementsByClassName(className)[0];
    if (lastColSel && Css.contains(lastColSel, className)) {
        Css.del(lastColSel, className);
    }
    for(var i = 0; i < tableCol.length; i++) {
        if(tableCol[i].textContent === ColSel.innerHTML) {
            Css.add(tableCol[i], className);
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
            var tableCol = document.getElementById("cars");
             var tableCol = document.getElementById("cars");
            var tableTh = tableCol.firstElementChild.getElementsByClassName("colTbl");
            for(var j=0; j < tableTh.length; j++) {
                tableTh[j].onclick = function() {
                    for(var i = 0; i < tableCol.rows.length; i++){
                		element.sort_table('cars', i, 1);
                	};
                }
             };
        });
    },
    this.sort_table = function(tbody, col, asc) {
        var rows = tbody.rows,
        i, j, cells, clen;
        rlen = rows.length,
        arr = new Array();
        // fill the array with values from the table
        for (i = 0; i < rlen; i++) {
            cells = rows[i].cells;
            clen = cells.length;
            arr[i] = new Array();
            for (j = 0; j < clen; j++) {
                arr[i][j] = cells[j].innerHTML;
            }
        }
        // sort the array by the specified column number (col) and order (asc)
        arr.sort(function (a, b) {
            return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
        });
        // replace existing rows with new rows created from the sorted array
        for (i = 0; i < rlen; i++) {
            rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
        }
    }
};

var Views = {
	dataView: null,
	createViews: function() {
		Views.dataView = new View('listcars', 'Template/list-car.hbs');
    },
    showDataItem: function(dataItem) {
        Views.dataView.addTable(dataItem);
        //alert(dataItem[0].car_model);
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
