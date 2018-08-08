const http = require('http');
const fs = require('fs');
const url = require('url');

var File = {
    getData: function(path) {
       return fs.readFileSync(path, 'utf-8');
    },
    insertData: function(file, content) {
       fs.appendFileSync(file, content, 'utf-8');
    },
    validateExistsFile: function(path) {
       return (!fs.existsSync(path)) ? false : true;
    }
};

const FileRequest = {
    fileName: 'partidos.txt',
    start: function(request, response) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        var path = FileRequest.getLocation(request.url);
        if (File.validateExistsFile(path)) {
            //obtengo parametros del path
            var urlParams = url.parse(request.url, true).query;
            if (typeof param.id != 'undefined' || typeof param.team != 'undefined') {
                var paramText = param.id + ' ' + param.team + "\r\n";
                File.insertData(path, paramText);
            }
            response.write(File.getData(path));
        }
        else {
            response.writeHead(404);
            response.write('File not Found');
        }
        response.end();
    },
    getLocation: function(path) {
        var dir;
        var currentPath = __dirname;
        if (url.parse(path).pathname === '/') {
            dir = currentPath + url.parse(path).pathname + FileRequest.fileName;
        }
        else {
            dir = currentPath + url.parse(path).pathname;
        }
        return dir;
    }
};

var server = http.createServer(FileRequest.start);
server.listen(8000);
console.log('server started');