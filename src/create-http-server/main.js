//en browser ejecutar localhost:8000/Partidos.txt
var http = require('http');
var fs = require('fs');
var url = require('url');

var File = {
    encoding: 'utf-8',
    /*
    exists: function(path) {
        if (fs.existsSync(path)) {
            return true;
        } 
        return false;
    },
    */
   exists: function(path) {
    return (!fs.existsSync(path)) ? false : true;
   },
    getData: function(path) {
        return fs.readFileSync(path, File.encoding);    
    }
}; 

var onRequest = {
    path: '',
    start: function(request, response) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        onRequest.path = onRequest.getPath(request.url);
        if (File.exists(onRequest.path)) {
            response.write(File.getData(onRequest.path));
        }
        else {
            response.writeHead(404);
            response.write('File not Found');
        }
        response.end();    
    },
    getPath: function(urlReq) {
        return '.' + url.parse(urlReq).pathname;
    }
};

var server = http.createServer(onRequest.start);
server.listen(8000);
console.log('server started');