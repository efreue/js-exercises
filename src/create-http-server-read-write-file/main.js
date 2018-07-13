var http = require('http');
var fs = require('fs');
var url = require('url');

var onRequest = {
    rootFile: './create-http-server-read-write-file',
    fileName: 'partidos.txt',
    path: '',
    start: function(request, response) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        
        if (onRequest.validateExistsFile(url.parse(request.url).pathname)) {
            console.log('vamoos: ' + onRequest.path);
        } else {
            response.writeHead(404);
            response.write('File not Found');
        }
    },
    validateExistsFile: function(path) {
        var pathFile;
        if (path === '/' || path === ('/' + onRequest.fileName)) {
            pathFile = onRequest.rootFile + '/' + onRequest.fileName;
        }
        onRequest.path = pathFile;
        return (!fs.existsSync(pathFile)) ? false: true;
    }
};

var server = http.createServer(onRequest.start);
server.listen(8000);
console.log('server started');