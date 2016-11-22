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
        alert(dataItem);
    }
}

var App = {
	init: function() {
		Views.createViews();
        Views.showDataItem(
            function()
            {
                var url = "https://gist.githubusercontent.com/z4y4ts/7170953/raw/7a2b09105b69de8673c4c3acd2b256b83a171dcf/cars.json";
                httpRequest(
                    url,
                    function(data) {
                        JSON.parse(data);
                })
            })
	}
};
