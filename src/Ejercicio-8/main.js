var Config = {
	path: "./data/"
};

var callServer = function(url, callback) {
	var ajax = new XMLHttpRequest();
	ajax.onload = function() {
		if(this.status == 200) {
			callback(JSON.parse(ajax.responseText));
		};
	};
	ajax.open("GET", url, true);
	ajax.send();
};

var listUrl = function() {

};

var App = {
	listFileServer: function(){
		var listFile=[];
		var file = "";
		for(i=1; i <= 30; i++) {
			file = "data-" + i + ".json";
			listFile.push(file);
		}
		return listFile;
	},
	init: function(){
		var listFiles = this.listFileServer();
		var url = Config.path + listFiles[0];
		callServer(url,
				   function(data) {
					alert(data["0"].title);
					});
	}
};
