//import {createServer as httpCreateServer} from "http.js";
const {createServer} = require('http');
const {existsSync, appendFileSync, readFileSync} = require('fs');
const {parse} = require('url');

const FileRequest = {
    start: (request, response) => {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        const pathLocation = FileRequest.getLocation(request.url);
        if (existsSync(pathLocation)) {
            const urlParams = parse(request.url, true).query;
            if (typeof urlParams.id !== 'undefined' || typeof urlParams.team !== 'undefined') {
                appendFileSync(
                    pathLocation,
                    urlParams.id + " " + urlParams.team + "\r\n",
                    'utf-8'
                );
            }
            response.write(readFileSync(pathLocation, 'utf-8'));
        }
        else {
            response.writeHead(404);
            response.write('File not Found');
        }
        response.end();
    },
    getLocation: (path) => {
        return __dirname + parse(path).pathname + (parse(path).pathname == '/' ? 'partidos.txt' : '');
    }
};

createServer(FileRequest.start).listen(8000);
console.log('server started');