//import {createServer as httpCreateServer} from "http.js";
const http = require('http');
const fs = require('fs');
const url = require('url');

const FileRequest = {
    start: (request, response) => {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        const pathLocation = FileRequest.getLocation(request.url);
        if (fs.existsSync(pathLocation)) {
            const urlParams = url.parse(request.url, true).query;
            if (typeof urlParams.id !== 'undefined' || typeof urlParams.team !== 'undefined') {
                fs.appendFileSync(
                    pathLocation,
                    urlParams.id + " " + urlParams.team + "\r\n",
                    'utf-8'
                );
            }
            response.write(fs.readFileSync(pathLocation, 'utf-8'));
        } 
        else {
            response.writeHead(404);
            response.write('File not Found');
        }
        response.end();
    },
    getLocation: (path) => {
      return  __dirname + url.parse(path).pathname + (url.parse(path).pathname == '/' ? 'partidos.txt': '');
    }
};

http.createServer(FileRequest.start).listen(8000);
console.log('server started');