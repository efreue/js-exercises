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
};

var Views = {
	dataView: null,
	createViews: function() {
		Views.dataView = new View('listcars', 'Template/list-car.hbs');
    },
    showDataItem: function(dataItem) {
        alert(dataItem[0].car_model);
    }
}

var App = {
	init: function() {
		httpRequest(
            "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json",
            function(data) {
                Views.createViews();
                Views.showDataItem(JSON.parse(data));
        })

	}
};
