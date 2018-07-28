var http = require('http');
var fs = require('fs');
var url = require('url');

var File = {
    getData: function(path) {
       return fs.readFileSync(path, 'utf-8');
    },
    insertData: function(file, content) {
        fs.writeFileSync(file,content,'utf-8');
    },
    validateExistsFile: function(path) {
        console.log(path);
        return (!fs.existsSync(path)) ? false: true;
    }
};

var onRequest = {
    fileName: 'partidos.txt',
    path: '',
    start: function(request, response) {
        var content = '';
        response.writeHead(200, {'Content-Type': 'text/plain'});
        onRequest.path = onRequest.getLocation(request.url); 
        if (File.validateExistsFile(onRequest.path)) {
            content = File.getData(onRequest.path);
            if (content.length > 0) {
                content += "\r\n"
            }
            //obtengo parametros del path
            var param = url.parse(request.url, true);
            if (param.query.id !== undefined || param.query.team !== undefined) {
                var paramText = param.query.id + ' ' + param.query.team;
                content += paramText;
                File.insertData(onRequest.path, content);
            }
            response.write(File.getData(onRequest.path));
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
            dir = currentPath + url.parse(path).pathname + onRequest.fileName;
        } 
        else {
            dir = currentPath + url.parse(path).pathname;
        }
        return dir;
    }    
};

var server = http.createServer(onRequest.start);
server.listen(8000);
console.log('server started');